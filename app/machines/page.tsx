"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image for machine icons

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Function to create the rows dynamically
function createData(
  machinename: string,
  machineId: string,
  energy: string,
  maintenance: string,
  status: string,
  docs: string,
  path: string
) {
  return { machinename, machineId, energy, maintenance, status, docs, path };
}

// Array of row data for the table
const rows = [
  createData(
    "Welding Robots",
    "welding_robot_006",
    "200$ (High)",
    "20k$ (Medium)",
    "running",
    "docs",
    "/weldingmachinelogs"
  ),
  createData(
    "Leak Tests",
    "leak_tests_005",
    "200$ (Medium)",
    "20k$ (Medium)",
    "running",
    "docs",
    "/leaktestslogs"
  ),
  createData(
    "CNC Machines",
    "cnc_milling_004",
    "200$ (High)",
    "30K$ (Medium)",
    "maintenance",
    "docs",
    "/cncmachineslogs"
  ),
  createData(
    "AGVs",
    "agv_003",
    "200$ (Low)",
    "20k$ (Medium)",
    "running",
    "docs",
    "/agvslogs"
  ),
  createData(
    "Painting Robots",
    "painting_robot_002",
    "200$ (Medium)",
    "100K$ (Medium)",
    "running",
    "docs",
    "/paintingrobotslogs"
  ),
  createData(
    "Stamping Presses",
    "stamping_press_001",
    "200$ (Medium)",
    "14k$ (Medium)",
    "maintenance",
    "docs",
    "/stampingpresseslogs"
  ),
];

// Status color-coding helper function
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "running":
      return "bg-green-500 text-white px-3 py-1 rounded-full";
    case "maintenance":
      return "bg-blue-500 text-white px-3 py-1 rounded-full";
    case "out of order":
      return "bg-red-500 text-white px-3 py-1 rounded-full";
    default:
      return "bg-gray-500 text-white px-3 py-1 rounded-full";
  }
};

// Icons for machines (you can replace these with actual image paths)
const machineIcons: { [key: string]: string } = {
  "Welding Robots": "/images/weldingimage.svg",
  "Leak Tests": "/images/weldingimage.svg",
  "CNC Machines": "/images/weldingimage.svg",
  AGVs: "/images/weldingimage.svg",
  "Painting Robots": "/images/weldingimage.svg",
  "Stamping Presses": "/images/weldingimage.svg",
};

export default function AdvancedTable() {
  return (
    <TableContainer component={Paper} className="p-6 shadow-lg">
      <Table sx={{ minWidth: 650 }} aria-label="machine-table">
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="text-lg font-bold">Machine Name</TableCell>
            <TableCell align="center" className="text-lg font-bold">
              Machine ID
            </TableCell>
            <TableCell align="center" className="text-lg font-bold">
              Energy Cost /hour
            </TableCell>
            <TableCell align="center" className="text-lg font-bold">
              Maintenance Cost /year
            </TableCell>
            <TableCell align="center" className="text-lg font-bold">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.machinename}>
              {/* Machine name with icon */}
              <TableCell component="th" scope="row">
                <div className="flex items-center">
                  <Image
                    src={machineIcons[row.machinename]}
                    alt={row.machinename}
                    width={40}
                    height={40}
                    className="mr-4"
                  />
                  <Link href={row.path}>
                    <p className="font-semibold">{row.machinename}</p>
                  </Link>
                </div>
              </TableCell>

              {/* Machine ID */}
              <TableCell align="center">
                <p>{row.machineId}</p>
              </TableCell>

              {/* Energy Cost */}
              <TableCell align="center">
                <p>{row.energy}</p>
              </TableCell>

              {/* Maintenance Cost */}
              <TableCell align="center">
                <p>{row.maintenance}</p>
              </TableCell>

              {/* Status with dynamic background color */}
              <TableCell align="center">
                <span className={getStatusStyle(row.status)}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
