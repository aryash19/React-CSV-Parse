import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import data1 from "./assets/axis.csv"
import data2 from "./assets/hdfc.csv"
import data3 from "./assets/icici.csv"


function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const csvFiles = [
        data1,
        data2,
        data3,
      ]; // Update with the correct paths to your CSV files

      const allData = [];

      for (const file of csvFiles) {
        const response = await fetch(file);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            allData.push(...result.data);
          },
        });
      }

      setCsvData(allData);
    };

    fetchData();
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  // Add more styles here
  };

  const tableHeaderStyle = {
    backgroundColor: "#6D95E0",
    color: "#fff",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
    padding: "15px",
    textAlign: "left",
  };

  const tableCellStyle = {
    padding: "15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  };




  return (
    <div>
      <h2>Combined CSV Data</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((header, index) => (
                <th key={index} style={tableHeaderStyle}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((cell, index) => (
                <td key={index} style={tableCellStyle}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
