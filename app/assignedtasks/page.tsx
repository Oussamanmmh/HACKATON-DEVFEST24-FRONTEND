"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

// Example rows data (ensure this matches your data structure)
const rows = [
  {
    name: "Alice",
    task: "Review",
    region: "US",
    deadline: "2024-10-20",
    type: "Critical",
    status: "In Progress",
  },
  {
    name: "Bob",
    task: "Development",
    region: "EU",
    deadline: "2024-11-05",
    type: "Normal",
    status: "Completed",
  },
  {
    name: "Charlie",
    task: "Testing",
    region: "APAC",
    deadline: "2024-10-25",
    type: "High",
    status: "Completed",
  },
  {
    name: "Diana",
    task: "Documentation",
    region: "US",
    deadline: "2024-11-01",
    type: "Low",
    status: "Time out",
  },
  {
    name: "Edward",
    task: "Deployment",
    region: "EU",
    deadline: "2024-10-30",
    type: "Critical",
    status: "In Progress",
  },
];

export default function BasicTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className=" bg-[#F5F6FA] p-5">
      <p className="text-3xl font-bold capitalize mb-10">Assigned Tasks</p>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  Name
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                  align="right"
                >
                  Task
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                  align="right"
                >
                  Region
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                  align="right"
                >
                  Deadline
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                  align="right"
                >
                  Type
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                  align="right"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.task}</TableCell>
                  <TableCell align="right">{row.region}</TableCell>
                  <TableCell align="right">{row.deadline}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">
                    <p
                      className={`w-fit px-3 py-1 rounded-lg ${
                        row.status == "Completed"
                          ? "bg-green-200 text-green-700"
                          : row.status == "In Progress"
                          ? " bg-purple-200 text-purple-700"
                          : row.status == "Time out"
                          ? " bg-red-200 text-red-700"
                          : ""
                      }}  `}
                    >
                      {row.status}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
