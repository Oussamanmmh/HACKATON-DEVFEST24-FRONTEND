"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

function createData(
  machinename: string,
  machineId: string,
  energy: string,
  maintenance: string,
  status: string,
  docs : string,
  path : string
) {
  return {machinename, machineId, energy, maintenance, status , docs , path};
}

const rows = [
  createData("welding robots", "welding_robot_006", "200$", "20k$", "running", "docs" , "/weldingmachine"),
  createData("leak tests", "leak_tests_005", "200$", "20k$", "running", "docs" ,"/leaktests"),
  createData("cncmachines", "cnc_milling_004", "200$", "20k$", "running", "docs" , '/cncmachines'),
  createData("agvs", "agv_003", "200$", "20k$", "running", "docs" ,'/agvs'),
  createData("painting robots", "painting_robot_002", "200$", "20k$", "running", "docs" , "/paintingrobots"),
  createData("stamping presses", "stamping_press_001", "200$", "20k$", "running", "docs" , "/stampingpresses"),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>machine Name</TableCell>
            <TableCell align="right">machine id</TableCell>
            <TableCell align="right">energy cost/hour</TableCell>
            <TableCell align="right">maintenance cost/year</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">docs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.machinename}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/machines${row.path}`} >
                {row.machinename}
                </Link>
              </TableCell>
              <TableCell align="right">{row.machineId}</TableCell>
              <TableCell align="right">{row.energy}</TableCell>
              <TableCell align="right">{row.maintenance}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.docs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
