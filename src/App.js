import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { Line, Pie} from 'react-chartjs-2'; // import the line chart
import Papa from 'papaparse'; // for csv parsing
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';


//register Chart.js components
ChartJS.register( LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement);

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showAssetAllocator, setShowAssetAllocator] = useState(false);
  const [showEconomicScenarioGenerator, setShowEconomicScenarioGenerator] = useState(false);

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

  const handleAssetAllocatorClick = () => {
    setShowAssetAllocator(true);
  };

  const handleEconomicScenarioGeneratorClick = () => {
    setShowEconomicScenarioGenerator(true);
  };

  const handleBackToDashboard = () => {
    setShowAssetAllocator(false);
    setShowResearch(false);
    setShowEconomicScenarioGenerator(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  }

  if (isLoggedIn) {
    return (
      <div>
        {showResearch ? (
          <Research onBackClick={handleBackToDashboard} />
        ) : showAssetAllocator ? (
          <AssetAllocator onBackClick={handleBackToDashboard} />
        ) : showEconomicScenarioGenerator ? (
          <EconomicScenarioGenerator onBackClick={handleBackToDashboard} />
        ) : ( 
          <Dashboard onResearchClick={handleResearchClick} onAssetAllocatorClick={handleAssetAllocatorClick} onEconomicScenarioGeneratorClick={handleEconomicScenarioGeneratorClick} onLogout={handleLogout} />
        )}
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
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
      <footer className="footer">
        <img src="/metlife_logo.png" alt="MetLife Investment Management" />
      </footer>
    </div>
  );
}

function Dashboard({ onResearchClick, onAssetAllocatorClick, onEconomicScenarioGeneratorClick, onLogout }) {
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
        <div className="dashboard-item" onClick={onAssetAllocatorClick} style={{ cursor: 'pointer'}}>
          Asset Allocator
        </div>
        <div className="dashboard-item" onClick={onEconomicScenarioGeneratorClick} style={{ cursor: 'pointer'}}>
          Economic Scenario Generator (ESG)
          </div>
        <div className="dashboard-item">More to come!</div>
      </div>
      <button onClick={onLogout} className="logout-button">Logout</button>
      <footer className="footer">
        <img src="/metlife_logo.png" alt="MetLife Investment Management" />
      </footer>
    </div>
  );
}


function Research({ onBackClick }) {
  const [selectedSection, setSelectedSection] = useState('All'); //Track selected section
  const [all, setall] = useState('All');
  const [frequency, setFrequency] = useState('All');
  const [type, setType] = useState('All');
  const [spreadsheetData, setSpreadsheetData] = useState(null);

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

  const handleSpreadsheetClick = (file) => {
    fetch(file)
      .then((res) => res.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setSpreadsheetData(parsedData);
      });
  };

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
                <a href={pdf.file} target="_blank" rel="noopener noreferrer">View</a>
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
                <p>{pdf.date}</p>
                {pdf.all === 'Spreadsheet' ? (
                  <button onClick={() => handleSpreadsheetClick(pdf.file)}>View Spreadsheet</button>
                ) : (
                  <a href={pdf.file} target="_blank" rel="noopener noreferrer">View PDF</a>
                )}
              </div>
            ))}
          </div>
          {spreadsheetData && (
        <div className="spreadsheet-viewer">
          <h3>Spreadsheet Data:</h3>
          <table>
            <tbody>
              {spreadsheetData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    )}
      
      <button className='back-button' onClick={onBackClick}>
        Back to Dashboard
        </button>
    </div>
  );
}

const AssetAllocator = ({ onBackClick }) => {
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [yScale, setYScale] = useState({ min: null, max: null});

  useEffect(() => {
    //Automatically read the CSV file from public folder
    fetch('/data/RealLevel_short.csv') //CSV file in the public folder for Line chart
      .then((response) => response.text())
      .then((csvData) => processLineChartCSV(csvData));

    fetch('/data/weights_output_13W.csv') //CSV file in the public folder for Pie chart
      .then((response) => response.text())
      .then((csvData) => processPieChartCSV(csvData));
  }, []);

  const processLineChartCSV = (csvData) => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (parsedData) => {
        const labels = [];
        const datasets = [];
        let minY = Infinity;
        let maxY = -Infinity;

        //Initialize datasets for each column except 'date'
        parsedData.data.forEach((row) => {
        labels.push(row['date']);
        Object.keys(row).forEach((column) => {
          if (column !== 'date') {
            if (!datasets[column]) {
              datasets[column] = [];
            }
            const value = row[column];
            datasets[column].push(value);
            // Update min and max for Y-axis scaling
            if (value < minY) minY = value;
            if (value > maxY) maxY = value;
          }
        });
      });

      //Define a color palette
      const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ];

      //Prepare data for chart.js format
      const chartData = {
        labels,
        datasets: Object.keys(datasets).map((key, index) => ({
          label: key,
          data: datasets[key],
          fill: false,
          borderColor: colors[index % colors.length], //Assign a color from the palette
          tension: 0.1,
        })),
      };

      setLineChartData(chartData);
      setYScale({ min: minY, max: maxY });
    },
  });
};

const processPieChartCSV = (csvData) => {
  Papa.parse(csvData, {
    header: false,
    skipEmptyLines: true,
    dynamicTyping: true,
    complete: (parsedData) => {
      const data = parsedData.data;

      const labels = data[0].slice(1); //Exclude first column for labels
      const lastRow = data[data.length - 1];
      const values = lastRow.slice(1); //Exclude first column (date)

      const chartData = {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      setPieChartData(chartData);
    },
  });
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Real Level short',
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: yScale.min,   
      max: yScale.max,
    },
  },
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Weights Outputs',
    },
  },
}

return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {lineChartData && (
      <div style={{ width: '80%', margin: '20px 0'}}>
        <h3>Line Chart</h3>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    )}
    {pieChartData && (
        <div style={{ width: '50%', margin: '20px 0'}}>
          <h3>Pie Chart</h3>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      )}
    <button onClick={onBackClick} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
      Back to Dashboard
    </button>
  </div>
  );
};

const EconomicScenarioGenerator = ({ onBackClick }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [selectedRow, setselectedRow] = useState(0);
  const [chartData, setchartData] = useState(null);

  useEffect(() => {
    //load the three CSV files
    Promise.all([
      fetch('/ESG/EUGOV10Y.csv').then((res) => res.text()),
      fetch('/ESG/Flt_CMBS_BBB.csv').then((res) => res.text()),
      fetch('/ESG/JPYTONAR6M.csv').then((res) => res.text()),
    ])
    .then(([csv1, csv2, csv3]) => {
      parseCSV(csv1, setData1);
      parseCSV(csv2, setData2);
      parseCSV(csv3, setData3);
    });

  }, []);

  

  const parseCSV = (csvData, setData) => {
    Papa.parse(csvData, {
      header: false, //No Headers
      dynamicTyping: true,
      complete: (parsedData) => {
        const rows = parsedData.data.filter(
          (row) => row.length > 0 && row.every((value) => typeof value === 'number')
        ); //Exclude empty or invalid rows
        setData(rows);
      },
    });
  };

  const updateChart = useCallback(() => {
    if (!data1[selectedRow] || !data2[selectedRow] || !data3[selectedRow]) {
      console.error("Row data is undefined. Please check the selected row and CSV files.");
      return;
    }

    const row1 = data1[selectedRow];
    const row2 = data2[selectedRow];
    const row3 = data3[selectedRow];

    if (!row1.length || !row2.length || !row3.length) {
      console.error("One of the rows is empty. Please check the CSV files.");
      return;
    }

    const xValues = Array.from({ length: row1.length }, (_, i) => i + 1); //x-axis: indices

    const datasets = [
      {
        label: 'EUGOV10Y',
        data: row1,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Flt_CMBS_BBB',
        data: row2,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
      {
        label: 'JPYTONAR6M',
        data: row3,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
    ];

    setchartData({
      labels: xValues,
      datasets,
    });
  });

  const handleRowChange = (e) => {
    setselectedRow(Number(e.target.value));
  };

  useEffect(() => {
    if (data1.length > 0 && data2.length > 0 && data3.length > 0) {
      updateChart();
    }
  }, [data1, data2, data3, selectedRow, updateChart]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Economic Scenario Generator (ESG)</h2>
      <div>
        <label>Select Row: </label>
        <select onChange={handleRowChange} value={selectedRow}>
          {data1.map((_, index) => (
            <option key={index} value={index}>
              Row {index + 1}
            </option>
          ))}
        </select>
      </div>
      {chartData && (
        <div style={{ width: '80%', margin: '20px 0' }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'ESG module'},
              },
              scales: {
                y: { beginAtZero: false },
              },
            }}
          />
        </div>
      )}
      <button onClick={onBackClick} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default App;
