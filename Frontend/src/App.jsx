import React, { useState } from 'react';
import './index.css';

function App() {
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [branchName, setBranchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Basic validation to check if all inputs are provided
    if (!rank || !category || !gender || !branchName) {
      alert('Please fill all the fields');
      return;
    }

    // Validate rank is a valid positive whole number
    const rankNum = Number(rank);
    if (!Number.isInteger(rankNum) || rankNum <= 0) {
      alert('Please enter a valid rank (positive whole number)');
      return;
    }

    // Sanity check upper bound, adjust based on actual max EAMCET rank range
    if (rankNum > 500000) {
      alert('Rank seems too high, please check and re-enter');
      return;
    }

    // Format the category and gender exactly as required by the backend API
    const categoryGender = `${category} \n${gender}`;
    
    // Reset state before making a new API call
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('https://eamcet-college-predictor-api2.vercel.app/api/predict-colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rank: rankNum, categoryGender, branchName })
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data); // Store the predicted colleges
      } else {
        setError(data.error || 'An error occurred while fetching data');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>EAMCET College Predictor</h1>

      <div className="container">
        <div className="form-group">
          <label htmlFor="rank">EAMCET Rank</label>
          <input 
            type="number" 
            id="rank" 
            min="1"
            placeholder="Enter your rank" 
            value={rank} 
            onChange={(e) => setRank(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="OC">OC</option>
            <option value="BC_A">BC_A</option>
            <option value="BC_B">BC_B</option>
            <option value="BC_C">BC_C</option>
            <option value="BC_D">BC_D</option>
            <option value="BC_E">BC_E</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS GEN OU </option>
            <option value="EWS">EWS GIRLS OU</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="BOYS">BOYS</option>
            <option value="GIRLS">GIRLS</option>
            <option value="GEN OU">EWS GEN OU</option>
            <option value="GIRLS OU">EWS GIRLS OU</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select id="branch" value={branchName} onChange={(e) => setBranchName(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="COMPUTER SCIENCE AND ENGINEERING">CSE- COMPUTER SCIENCE AND ENGINEERING</option>
            <option value="COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)">CSM- COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)</option>
            <option value="COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)">CSD-COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)</option>
            <option value="COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)">CSC-COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)</option>
            <option value="ELECTRONICS AND COMMUNICATION ENGINEERING">ECE</option>
            <option value="ELECTRONICS COMMUNICATION AND INSTRUMENTATION ENGINEERING\n">ECI - ELECTRONICS COMMUNICATION AND INSTRUMENTATION ENGINEERING</option>
            <option value="ELECTRONICS AND INSTRUMENTATION ENGINEERING\n">EIE- ELECTRONICS AND INSTRUMENTATION ENGINEERING</option>
            <option value="ELECTRONICS AND COMPUTER ENGINEERING">ELECTRONICS AND COMPUTER ENGINEERING</option>
            <option value="ELECTRICAL AND ELECTRONICS ENGINEERING">EEE</option>
            <option value="MECHANICAL ENGINEERING">Mechanical</option>
            <option value="CIVIL ENGINEERING">Civil</option>
            <option value="ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING">AIM(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)</option>
            <option value="ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING">(AID)ARTIFICIAL INTELLIGENCE AND DATA SCIENCE</option>
            <option value="COMPUTER SCIENCE AND BUSINESS SYSTEM">COMPUTER SCIENCE AND BUSINESS SYSTEM</option>
            <option value="INFORMATION TECHNOLOGY">IT</option>
            <option value="CSE (IoT AND CYBER SECURITY INCLUDING BLOCK CHAIN TECHNOLOGY)">CIC (CSE-IoT AND CYBER SECURITY INCLUDING BLOCK CHAIN TECHNOLOGY)</option>
            <option value="MINING ENGINEERING">MINING ENGINEERING(MIN)</option>
            <option value="BIO-MEDICAL ENGINEERING">BIO-MEDICAL ENGINEERING(BME)</option>
            <option value="PHARMACEUTICAL ENGINEERING">PHARMACEUTICAL ENGINEERING(PHE)</option>
            <option value="AGRICULTURAL ENGINEERING">AGRICULTURAL ENGINEERING(AGR)</option>
            <option value="BIO-TECHNOLOGY">BIO-TECHNOLOGY(BIO)</option>
            <option value="CHEMICAL ENGINEERING">CHEMICAL ENGINEERING(CHE)</option>
            <option value="DAIRYING">DAIRYING</option>
            <option value="FOOD TECHNOLOGY">FOOD TECHNOLOGY(FDT)</option>
            <option value="COMPUTER SCIENCE & DESIGN">(CSG)COMPUTER SCIENCE & DESIGN</option>
            <option value="COMPUTER SCIENCE AND ENGINEERING (IOT)">CSO-COMPUTER SCIENCE AND ENGINEERING (IOT)</option>
            <option value="BUILDING SERVICES ENGG">BUILDING SERVICES ENGG(BSE)</option>
            <option value="DIGITAL TECHNIQUES FOR DESIGN AND PLANNING">DTD-DIGITAL TECHNIQUES FOR DESIGN AND PLANNING</option>
            <option value="B.PLANNING">PLG- B.PLANNING</option>
            <option value="GEO INFORMATICS">GEO- GEO INFORMATICS</option>
            <option value="METALLURGICAL ENGINEERING">METALLURGICAL ENGINEERING</option>
            <option value="BTECH MECHANICAL WITH MTECH MANUFACTURING  SYSTEMS">MMS- BTECH MECHANICAL WITH MTECH MANUFACTURING  SYSTEMS</option>
            <option value="BTECH MECHANICAL WITH MTECH THERMAL ENGG">BTECH MECHANICAL WITH MTECH THERMAL ENGG</option>
            <option value="TEXTILE TECHNOLOGY / TEXTILE ENGINEERING">TEX-TEXTILE TECHNOLOGY / TEXTILE ENGINEERING</option>
            <option value="AERONAUTICAL ENGINEERING\n">AERONAUTICAL ENGINEERING</option>
          </select>
        </div>

        <button id="submitButton" onClick={handleSubmit} disabled={loading}>Predict Colleges</button>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading....</p>
        </div>
      )}

      {error && (
        <div id="results">
          <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>
        </div>
      )}

      {results && (
        <div id="results">
          {Object.keys(results).length === 0 ? (
            <p style={{ textAlign: 'center' }}>No results found.</p>
          ) : (
            Object.keys(results).map(phase => (
              <div key={phase}>
                <h3>{phase}</h3>
                {results[phase].map((college, idx) => (
                  <div className="college-item" key={idx}>
                    <strong>{college['Institute Name']}</strong>
                    Branch: {college['Branch Name']}<br />
                    Location: {college.Place}<br />
                    Fee: {college['Tuition Fee']}<br />
                    Closing Rank: {college[`${category} \n${gender}`] || 'N/A'}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}

      <footer className="footer">
        <p>
          CRAFTED WITH <i style={{ color: "rgb(226, 36, 43)", fontSize: "1.1rem" }} className="fa-solid fa-heart"></i> BY <a style={{ color: "rgb(255, 90, 95)" }} href="https://www.instagram.com/saikiran_sugurthi.dev/">saikiran_sugurthi.dev</a>
        </p>
        <div>
          <a href="https://www.instagram.com/saikiran_sugurthi.dev/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram" style={{ fontSize: "1.6rem" }}></i>
          </a>
          &nbsp;&nbsp;
          <a href="https://www.linkedin.com/in/saikiran-sugurthi/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin" style={{ fontSize: "1.6rem" }}></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;