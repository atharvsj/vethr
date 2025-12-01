
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  Chip,
} from "@mui/material";

const data = [
  { event: "Bakri Eid", date: "07-06-2025", location: "Kerala", status: "Published" },
  { event: "Independence Day", date: "15-08-2025", location: "India", status: "Upcoming" },
  { event: "Christmas", date: "25-12-2025", location: "Goa", status: "Upcoming" },
  // Add more events if needed
];

const HolidayTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    row.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        minWidth: "1100px", // increase width
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upcoming Public Holidays in – <b>Jun 2025</b>
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
            <TableRow>
              <TableCell><b>EVENT NAME</b></TableCell>
              <TableCell><b>START DATE</b></TableCell>
              <TableCell><b>LOCATION</b></TableCell>
              <TableCell><b>STATUS</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.event}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={row.status === "Published" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default HolidayTable;

