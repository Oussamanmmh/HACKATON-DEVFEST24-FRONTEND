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
import axios from "axios";

// Example rows data (ensure this matches your data structure)


export default function BasicTable() {
  const [rows , setRows] = React.useState([]);
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

  React.useEffect(()=>{
       const fetch = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).userId;
        const token = JSON.parse(localStorage.getItem('user')).token;
         try{
          const response = await axios.get(`http://localhost:4000/tasks/user/${userId}` ,
          {headers: {
            Authorization: `Bearer ${token}`
          }}
          );
          setRows(response.data);
          console.log(response.data);
         }
          catch(err){
            console.log(err);
          }}
          fetch();


    
  },[])

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
                  Priority
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
                  Is done
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.taskTitle}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.taskTitle}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.priority}</TableCell>
                  <TableCell align="right">{row.scheduledDate}</TableCell>
                  <TableCell align="right">{row.taskType}</TableCell>
                  <TableCell align="right">
                    <p
                      className={`w-fit px-3 py-1 rounded-lg ${
                        row.isDone == true
                          ? "bg-green-200 text-green-700"
                         
                          :
                           " bg-red-200 text-red-700 "
                          
                      }}  `}
                    >
                      {row.isDone.toString()}
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
