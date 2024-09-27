import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResearch, setShowResearch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleResearchClick = () => {
    setShowResearch(true);
  };

  const handleBackToDashboard = () => {
    setShowResearch(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        {showResearch ? <Research onBackClick={handleBackToDashboard} /> : <Dashboard onResearchClick={handleResearchClick} />}
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2 className="portal-title">QCIO Portal</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">SIGN IN</button>
        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
        </div>
      </form>
      <div className="register">
        <p>Don’t have an account? <a href="/register">Register here</a></p>
      </div>
      <footer className="footer">
        <img src="https://www.metlife.com/images/metlife-logo.svg" alt="MetLife Investment Management" />
      </footer>
    </div>
  );
}

function Dashboard({ onResearchClick }) {
  // Function to handle opening Power BI
  const openPowerBI = () => {
    window.open('https://app.powerbi.com/groups/2673eb6f-64b6-4ba2-853a-f3f124c592b7/reports/86d39a1e-b770-4408-9012-885ae47269fd/ReportSection4a97d59c9ccb5a98d184?ctid=ca56a4a5-e300-406a-98ff-7e36a0baac5b&experience=power-bi&clientSideAuth=0', '_blank');
  };
  


  return (
    <div className="dashboard-container">
      <h2>Ways to Navigate Your Financial Futures</h2>
      <div className="dashboard-grid">
        <div className="dashboard-item" onClick={onResearchClick} style={{ cursor: 'pointer' }}>
          Research
        </div>
        <div className="dashboard-item" onClick={openPowerBI} style={{ cursor: 'pointer '}}>
          Dynamic Portfolio Benchmark (DPB)
        </div>
        <div className="dashboard-item">Asset Allocator</div>
        <div className="dashboard-item">Economic Scenario Generator (ESG)</div>
        <div className="dashboard-item">More to come!</div>
      </div>
      <footer className="footer">
        <img src="https://www.metlife.com/images/metlife-logo.svg" alt="MetLife Investment Management" />
      </footer>
    </div>
  );
}


function Research({ onBackClick }) {
  const [frequency, setFrequency] = useState('All');
  const [type, setType] = useState('All');

  const pdfs = [
    { title: 'Securitized Products Weekly: August 2, 2024', date: '02 Aug 2024', author: 'John Sim', count: 14 },
    { title: 'Securitized Products Weekly: July 26, 2024', date: '26 Jul 2024', author: 'John Sim', count: 13 },
    { title: 'Securitized Products Weekly: July 12, 2024', date: '12 Jul 2024', author: 'John Sim', count: 13 },
  ];

  return (
    <div className="research-container">
      <h2>Research Publications</h2>
      <div className="filter-container">
        <div>
          <label htmlFor="frequency">Frequency: </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quaterly">Quaterly</option>
          </select>
        </div>
        <div>
          <label htmlFor="type">Type: </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Type 1">Type1</option>
            <option value="Type 2">Type2</option>
            <option value="Type 3">Type3</option>
            <option value="Type 4">Type4</option>
            <option value="Type 5">Type5</option>
            <option value="Type 6">Type6</option>
          </select>
        </div>
      </div>

      <div className="pdf-list">
        {pdfs.map((pdf, index) => (
          <div key={index} className="pdf-item">
            <h4>{pdf.title}</h4>
            <p>{pdf.date} | {pdf.author}, +{pdf.count}</p>
            <a href={`/path/to/pdf/${pdf.title}`} target="_blank" rel="noopener noreferrer">View PDF</a>
          </div>
        ))}
      </div>

      <button className='back-button' onClick={onBackClick}>
        Back to Dashboard
        </button>
    </div>
  );
}

export default App;
