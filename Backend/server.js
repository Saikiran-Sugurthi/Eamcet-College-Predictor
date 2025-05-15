require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'Eamcet_Cleaned_data';
const client = new MongoClient(mongoUri);


const phases = ['First_Phase', 'Second_Phase', 'Final_Phase'];

function calculateRankRange(rank) {
  if (rank < 10000) return [Math.max(1, rank - 2000), rank + 2000];
  if (rank < 50000) return [rank - 5000, rank + 5000];
  return [rank - 10000, rank + 10000];
}

app.post('/api/predict-colleges', async (req, res) => {
  try {
    const { rank, categoryGender, branchName } = req.body;
    const numericRank = Number(rank);
    
    let [minRank, maxRank] = calculateRankRange(numericRank);

    await client.connect();
    const db = client.db(dbName);
    const results = {};

    for (const phase of phases) {
      let colleges = [];
      let currentMaxRank = maxRank;
      
     
      for (let attempt = 0; attempt < 3; attempt++) {
        colleges = await db.collection(phase).find({
          [categoryGender]: { $gte: minRank, $lte: currentMaxRank },
          "Branch Name": branchName
        })
        .sort({ [categoryGender]: 1 })
        .project({
          "Institute Name": 1,
          "Place": 1,
          "College Type": 1,
          "Branch Name": 1,
          "Tuition Fee": 1,
          [categoryGender]: 1,
          _id: 0
        })
        .limit(50)
        .toArray();

        if (colleges.length >= 3) break;
        currentMaxRank += 5000; 
      }

      results[phase] = colleges;
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  } finally {
    await client.close();
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port 5000"));
