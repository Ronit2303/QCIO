import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Asset_Allocator = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
    fetchCsvData();
    }, []);

    const fetchCsvData = () => {
        fetch('${process.env.PUBLIC_URL}/data/RealLevel_short.csv')
            .then(response => response.text())
            .then(data => {
                const parsedData = parseCSV(data);
                setData(parsedData);
            });
    };

    const parseCSV = (data) => {
        const rows = data.split("\n");
        const headers = rows[0].split(",");

        const chartData = rows.slice(1).map(row => {
            const values = row.split(",");
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = isNAN(values[index]) ? values[index] : parseFloat(values[index]);
            });
            return obj;
        });
        return chartData;
    };

    return (
        <div style={{ width: '100%', height: 500, marginTop: '20px' }}>
            <h2>Asset Allocator</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Value" stroke="#8884d8" />
                    {/* Add more <Line /> components if your CSV has mulitple data columns */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AssetAllocator;