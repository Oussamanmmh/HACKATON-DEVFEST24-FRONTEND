"use client";
import Image from "next/image";
import leakTestImage from "@/public/images/weldingimage.svg"; // Replace with correct image path for Leak Test machine
import view from "@/public/images/view.svg";
import thresholds from "@/public/images/thresholds.svg";
import reports from "@/public/images/reports.svg";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import * as XLSX from "xlsx"; // For Excel export

const Page = () => {
  const [machine, setMachine] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/logs/leak_test_005"
      );
      setMachine(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create 10 rows of sample data
  const rows = machine.slice(0, 10).map((entry) => ({
    test_pressure: entry?.sensorData?.test_pressure + " bar",
    pressure_drop: entry?.sensorData?.pressure_drop + " bar",
    leak_rate: entry?.sensorData?.leak_rate + " ml/min",
    test_duration: entry?.sensorData?.test_duration + " seconds",
    temperature: entry?.sensorData?.temperature + "°C",
    pass_fail_status: entry?.sensorData?.status,
    fluid_type: entry?.sensorData?.fluid_type,
    seal_condition: entry?.sensorData?.seal_condition,
    test_cycle_count: entry?.sensorData?.test_cycle_count,
    timestamp: new Date(entry?.sensorData?.timestamp).toLocaleString(),
  }));

  // Function to download JSON
  const handleDownloadJSON = () => {
    const jsonBlob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "leak_test_005_report.json"; // Set the filename
    link.click();
  };

  // Function to download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows); // Convert JSON to worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "leak_test_005_report.xlsx"); // Set the filename
  };

  return (
    <div className="bg-[#F5F6FA] p-5">
      {/* Machine Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="flex justify-center items-center">
          <Image
            alt="Leak Test Machine"
            src={leakTestImage}
            className="w-64 h-64"
          />
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">Leak Test Machines</p>
          <p className="text-lg mb-2">
            <strong>Machine ID:</strong> {machine[0]?.machine_id}
          </p>
          <p className="text-lg mb-2">
            <strong>Machine Type:</strong>{" "}
            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-semibold">
              {machine[0]?.machineType}
            </span>
          </p>
          <p className="bg-[#E18E3A] text-white inline-block py-1 px-3 mb-2">
            {machine[0]?.status}
          </p>
          <p className="text-lg mb-4">
            Leak test machines are used to ensure that components like fuel
            tanks, engines, and air conditioning systems are properly sealed and
            do not leak. Here's an expanded view of the sensor data for leak
            tests:
          </p>
          <div className="text-[#996127]">
            <p className="font-semibold mb-2">Warnings:</p>
            {machine && machine[0]?.warnings?.length > 0 ? (
              machine[0].warnings.map((warning, index) => (
                <p key={index}>{warning}</p>
              ))
            ) : (
              <p>No warnings available</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <Link href="/machines/leaktestslogs/leaktests">
          <button className="bg-[#815EEA] text-white w-full py-4 rounded-lg shadow-lg hover:bg-purple-700 transition flex flex-col items-center">
            <p className="text-xl mb-1">View Real-Time Metrics</p>
            <Image alt="view" src={view} width={30} height={30} />
          </button>
        </Link>

        <button
          onClick={handleDownloadJSON}
          className="bg-[#CFEDDA] text-[#518B66] w-full py-4 rounded-lg shadow-lg hover:bg-green-200 transition flex flex-col items-center"
        >
          <p className="text-xl mb-1">Download JSON Report</p>
          <Image alt="reports" src={reports} width={30} height={30} />
        </button>

        <button
          onClick={handleDownloadExcel}
          className="bg-[#BBBEFC] text-[#494D88] w-full py-4 rounded-lg shadow-lg hover:bg-blue-200 transition flex flex-col items-center"
        >
          <p className="text-xl mb-1">Download Excel Report</p>
          <Image alt="thresholds" src={thresholds} width={30} height={30} />
        </button>
      </div>

      {/* Expanded Schema Section */}
      <div>
        <p className="text-2xl font-bold mb-4">Expanded Schema</p>
        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table sx={{ minWidth: 650 }} aria-label="machine data table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Test Pressure (bar)</TableCell>
                <TableCell align="right">Pressure Drop (bar)</TableCell>
                <TableCell align="right">Leak Rate (ml/min)</TableCell>
                <TableCell align="right">Test Duration (seconds)</TableCell>
                <TableCell align="right">Temperature (°C)</TableCell>
                <TableCell align="right">Pass/Fail Status</TableCell>
                <TableCell align="right">Fluid Type</TableCell>
                <TableCell align="right">Seal Condition</TableCell>
                <TableCell align="right">Test Cycle Count</TableCell>
                <TableCell align="right">Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.test_pressure}</TableCell>
                  <TableCell align="right">{row.pressure_drop}</TableCell>
                  <TableCell align="right">{row.leak_rate}</TableCell>
                  <TableCell align="right">{row.test_duration}</TableCell>
                  <TableCell align="right">{row.temperature}</TableCell>
                  <TableCell align="right">{row.pass_fail_status}</TableCell>
                  <TableCell align="right">{row.fluid_type}</TableCell>
                  <TableCell align="right">{row.seal_condition}</TableCell>
                  <TableCell align="right">{row.test_cycle_count}</TableCell>
                  <TableCell align="right">{row.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Page;
