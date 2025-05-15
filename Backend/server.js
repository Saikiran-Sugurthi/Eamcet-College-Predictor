require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'Eamcet_Cleaned_data';
const client = new MongoClient(uri);

const collections = ['First_Phase', 'Second_Phase', 'Final_Phase'];

// Calculate buffer range based on rank
function getBufferRange(rank) {
  const bufferPercentage = rank < 10000 ? 0.15 : rank < 50000 ? 0.2 : 0.25;
  const minBuffer = rank < 10000 ? 2000 : rank < 50000 ? 5000 : 10000;
  const buffer = Math.max(minBuffer, Math.floor(rank * bufferPercentage));
  return [Math.max(1, rank - buffer), rank + buffer];
}
//test route
app.get("/", (req, res) => {
  res.send("EAMCET College Predictor API is running!!");
});

// College prediction
app.post('/api/predict-colleges', async (req, res) => {
  const { rank, categoryGender, branchName } = req.body;
console.log("Received input:", { rank, categoryGender, branchName });
  if (!rank || !categoryGender || !branchName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const numericRank = Number(rank);
  if (isNaN(numericRank) || numericRank <= 0) {
    return res.status(400).json({ error: 'Rank must be a positive number' });
  }

  const [minRank, maxRank] = getBufferRange(numericRank);

  try {
    await client.connect();
    const db = client.db(dbName);

    const results = {};

    for (const phase of collections) {
      const query = {
        [categoryGender]: { $gte: minRank, $lte: maxRank },
        "Branch Name": branchName
      };

      const data = await db.collection(phase)
        .find(query)
        .sort({ [categoryGender]: 1 })
        .project({
          "Institute Name": 1,
          "Place": 1,
          "Dist Code": 1,
          "College Type": 1,
          "Branch Name": 1,
          "Tuition Fee": 1,
          [categoryGender]: 1,
          _id: 0
        })
        .limit(50)
        .toArray();

      results[phase] = data;
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  } finally {
    await client.close();
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
