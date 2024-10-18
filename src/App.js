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
  const [selectedSection, setSelectedSection] = useState('All'); //Track selected section
  const [all, setall] = useState('All');
  const [frequency, setFrequency] = useState('All');
  const [type, setType] = useState('All');

  // PDF array with frequency and type properties
  const pdfs = [
    
    { title: '2024 Q1 RV - Global', date: '04 Dec 2023', all: 'PDF', frequency: 'Quarterly', type: 'Economic Outlook', file: '/pdfs/2024_Q1_RV-Global.pdf' },
    { title: '2024 Q2 RV- Global', date: 'Mar 2024', all: 'PDF', frequency: 'Quarterly', type: 'Economic Outlook', file: '/pdfs/2024_Q2_RV-Global.pdf' },
    { title: '2024 Q3 RV - Global', date: 'June 2024', all: 'PDF', frequency: 'Quarterly', type: 'Economic Outlook', file: '/pdfs/2024_Q3_RV-Global.pdf' },
    { title: 'MIM Economic Monthly Consumers Keep At It', date: '18 Jul 2023', all: 'PDF', frequency: 'Monthly', type: 'MIM Economic Monthly', file: '/pdfs/MIM_Economic_Monthly_Consumers_Keep_At_It.pdf' },
    { title: 'MIM Economic Monthly Trickle Down Economics to the Rescue July 2024', date: '16 Jul 2024', all: 'PDF', frequency: 'Monthly', type: 'MIM Economic Monthly', file: '/pdfs/MIM_Economic_Monthly_Trickle_Down_Economics_to_the_Rescue_July_2024.pdf' },
    { title: 'MIM Global Economic Weekly 08-16-2024', date: '16 Aug 2024', all: 'PDF', frequency: 'Weekly', type: 'Global Economic Weekly', file: '/pdfs/MIM_Global_Economic_Weekly_08-16-2024.pdf' },
    { title: 'MIM Global Economic Weekly 08-23-2024', date: '23 Aug 2024', all: 'PDF', frequency: 'Weekly', type: 'Global Economic Weekly', file: '/pdfs/MIM_Global_Economic_Weekly_08-23-2024.pdf' },
    { title: 'MIM Global Economic Weekly 08-30-2024', date: '30 Aug 2024', all: 'PDF', frequency: 'Weekly', type: 'Global Economic Weekly', file: '/pdfs/MIM_Global_Economic_Weekly_08-30-2024.pdf' },
    { title: 'MIM Relative Value & Tactical Asset Allocation 1Q2024', date: '04 Jan 2024', all: 'PDF', frequency: 'Quarterly', type: 'MIM Relative Value Tactical Allocation', file: '/pdfs/MIM_Relative_Value_&_Tactical_Asset_Allocation_1Q2024.pdf' },
    { title: 'MIM Relative Value & Tactical Asset Allocation 2Q2024', date: '04 Apr 2024', all: 'PDF', frequency: 'Quarterly', type: 'MIM Relative Value Tactical Allocation', file: '/pdfs/MIM_Relative_Value_&_Tactical_Asset_Allocation_2Q2024.pdf' },
    { title: 'MIM Relative Value & Tactical Asset Allocation 3Q2024', date: '12 Jul 2024', all: 'PDF', frequency: 'Quarterly', type: 'MIM Relative Value Tactical Allocation', file: '/pdfs/MIM-RelativeValue_Tactical_Allocation_3Q2024_1.pdf' },
    { title: 'Spread Comparison 6-28-2024', date: '28 June 2024', all: 'PDF', frequency: 'Monthly', type: 'Spread Comparison', file: '/pdfs/Spread_Comparison_6-28-2024.pdf' },
    { title: 'Spread Comparison 7-26-2024.pdf', date: '26 Jul 2024', all: 'PDF', frequency: 'Monthly', type: 'Spread Comparison', file: '/pdfs/Spread_Comparison_7-26-2024.pdf' },
    { title: 'Spread Comparison 8-30-2024.pdf', date: '30 Aug 2024', all: 'PDF', frequency: 'Monthly', type: 'Spread Comparison', file: '/pdfs/Spread_Comparison_8-30-2024.pdf' },
    { title: 'Farmers TAA - August 5, 2024', date: '05 Aug 2024', all: 'Spreadsheet', frequency: 'Monthly', type: 'Farmers Tactical Asset Allocation', file: '/pdfs/Farmers_TAA-August _5_2024.xlsx' },
    { title: 'Farmers TAA - June 28 2024', date: '28 June 2024', all: 'Spreadsheet', frequency: 'Monthly', type: 'Farmers Tactical Asset Allocation', file: '/pdfs/Farmers_TAA-June_ 28_ 2024.xlsx' },
    { title: 'Farmers TAA - September 2 2024', date: '02 Sept 2024', all: 'Spreadsheet', frequency: 'Monthly', type: 'Farmers Tactical Asset Allocation', file: '/pdfs/Farmers_TAA-September_2_2024.xlsx' },
  ];

  // Function to filter PDFs by selected frequency and type
  const filteredPdfs = pdfs.filter((pdf) => {
    return (
      (all === 'All' || pdf.all === all) &&
      (frequency === 'All' || pdf.frequency === frequency) &&
      (type === 'All' || pdf.type === type)
    );
  });

  return (
    <div className="research-container">
      <h2>Research Publications</h2>

      {/* Navigation Buttons for selecting section */}
      <div className="section-navigation">
        <button onClick={() => setSelectedSection('All')}>All</button>
        <button onClick={() => setSelectedSection('Frequency')}>Filter by Frequency</button>
        <button onClick={() => setSelectedSection('Type')}>Filter by Type</button>
      </div>

      {/* Conditionally show content based on selected section */}
      {selectedSection === 'All' && (
        <div classname="research-section">
          <h3>All</h3>
          <select
            classname="filter-dropdown"
            value={all}
            onChange={(e) => setall(e.target.value)}
          >
            <option value="All">All</option>
            <option value="PDF">PDF</option>
            <option value="Spreadsheet">Spreadsheet</option>
          </select>

          <div className="pdf-list"> 
            {filteredPdfs.map((pdf, index) => (
              <div key={index} className="pdf-item">
                <h4>{pdf.title}</h4>
                <p>{pdf.date} {pdf.author} {pdf.count}</p>
                <a href={pdf.file} target="_blank" rel="noopener noreferrer">View PDF</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSection === 'Frequency' && (
        <div classname="research-section">
          <h3>Filter by Frequency</h3>
          <select
            classname="filter-dropdown"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
          
          <div className="pdf-list">
            {filteredPdfs.map((pdf, index) => (
              <div key={index} className="pdf-item">
                <h4>{pdf.title}</h4>
                <p>{pdf.date} {pdf.author} {pdf.count}</p>
                <a href={pdf.file} target="_blank" rel="noopener noreferrer">View PDF</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSection === 'Type' && (
        <div classname="research-section">
          <h3>Filter by Type</h3>
          <select
            classname="filter-dropdown"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Global Economic Weekly">Global Economic Weekly</option>
            <option value="MIM Economic Monthly">MIM Economic Monthly</option>
            <option value="Spread Comparison">Spread Comparison</option>
            <option value="FARMERS Tactical Asset Allocation">FARMERS Tactical Asset Allocation</option>
            <option value="MIM Relative Value Tactical Allocation">MIM Relative Value Tactical Allocation</option>
            <option value="Economic Outlook">Economic Outlook</option>
          </select>

          <div className="pdf-list">
            {filteredPdfs.map((pdf, index) => (
              <div key={index} className="pdf-item">
                <h4>{pdf.title}</h4>
                <p>{pdf.date} {pdf.author} {pdf.count}</p>
                <a href={pdf.file} target="_blank" rel="noopener noreferrer">View PDF</a>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <button className='back-button' onClick={onBackClick}>
        Back to Dashboard
        </button>
    </div>
  );
}

export default App;
