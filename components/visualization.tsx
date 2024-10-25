// /components/CSVTable.js
"use client"
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ChartStamp from './chartvisualization/chartStamp';
import ChartWelding from './chartvisualization/chartwelding';


const datavisualization = () => {
    interface CSVRow {
        Timestamp: string;
        KPI_Value: string;
        KPI_Name: string;
    }

    const [data, setData] = useState<CSVRow[]>([]);
    const [stampingPressEfficiency, setStampingPressEfficiency] = useState([]);
    const [weldingRobotEfficiency, setWeldingRobotEfficiency] = useState([]);
    // const kpiNames = [
    //     "Stamping Press Efficiency",
    //     "Welding Robot Efficiency",
    //     "CNC Machine Utilization",
    //     "Painting Robot Performance",
    //     "Assembly Line Speed",
    //     "Quality Control Defect Rate",
    //     "Material Waste Percentage",
    //     "Machine Downtime",
    //     "Operator Efficiency",
    //     "Inventory Turnover Rate",
    //     "Production Yield Rate",
    //     "Maintenance Cost per Unit",
    //     "Energy Consumption per Unit"
    // ];
    

    useEffect(() => {
        // Example for reading CSV from public folder or URL
        const fetchData = async () => {
            const response = await fetch('/test_set_rec.csv'); // Ensure the file is in the 'public' folder
        
            // Create a stream reader
            const reader = response.body?.getReader();
            const chunks = []; // Array to hold the Uint8Array chunks
        
            while (true) {
                const { done, value } = await reader?.read() || {};
                if (done) break; // Exit the loop when done reading
        
                chunks.push(value); // Accumulate each chunk
            }
        
            // Concatenate all chunks into a single Uint8Array
            const fullUint8Array = new Uint8Array(chunks.reduce((acc, chunk) => acc + (chunk?.length || 0), 0));
            let offset = 0;
            for (let chunk of chunks) {
                if (chunk) {
                    fullUint8Array.set(chunk, offset);
                    offset += chunk.length;
                }
            }
        
            // Decode the complete CSV file
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(fullUint8Array);
            const parsedData = Papa.parse(csv, { header: true });
            console.log(parsedData.data)
            setData(parsedData.data ); // Assuming CSVRow is the appropriate type
            const filteredData = parsedData.data.filter((item: CSVRow) => item.KPI_Name === "Stamping Press Efficiency");
            setStampingPressEfficiency(filteredData);
            const filteredData2 = parsedData.data.filter((item: CSVRow) => item.KPI_Name === "Welding Robot Efficiency");
            setWeldingRobotEfficiency(filteredData2);
        };
        

        fetchData();
    }, []);

    return (
        <div>
            
            <ChartStamp data={stampingPressEfficiency} />

            <ChartWelding data={weldingRobotEfficiency} />
        </div>
    );
};

export default datavisualization;
