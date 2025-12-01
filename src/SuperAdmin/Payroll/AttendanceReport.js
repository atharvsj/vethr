import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const AttendanceReport = () => {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  // Sample data (replace with API data if needed)
  const initialData = [
    {
      id: "V0001",
      name: "Mangesh Ghadigaonkar",
      monthly: Array(12).fill(0),
      total: 0,
    },
    {
      id: "V0006",
      name: "Kumar Patil",
      monthly: [26, 21, 22, 22, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 91,
    },
    {
      id: "V0017",
      name: "Ganesh Mohite",
      monthly: [25, 20, 24, 22, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 91,
    },
    {
      id: "V0020",
      name: "Rupali Mali",
      monthly: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 1,
    },
    {
      id: "V0075",
      name: "Shailesh Jadhav",
      monthly: Array(12).fill(0),
      total: 0,
    },
    {
      id: "V0077",
      name: "Akshada Chavan",
      monthly: [20, 19, 14, 6, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 75,
    },
    {
      id: "V0089",
      name: "Yogesh Bisen",
      monthly: [22, 17, 18, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 59,
    },
    {
      id: "V0123",
      name: "Ashish Sahare",
      monthly: [1, 9, 18, 4, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 32,
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const handleEntriesChange = (e) => {
    setEntries(e.target.value);
    setPage(0); // Reset to first page on change
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const filteredData = initialData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * entries, page * entries + entries);

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        Attendance Report
      </Typography>

      {/* Top Controls */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          Show{" "}
          <Select
            size="small"
            value={entries}
            onChange={handleEntriesChange}
            sx={{ mx: 1, minWidth: 70 }}
          >
            {[5, 10, 25, 50].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>{" "}
          entries
        </Grid>

        <Grid item>
          <TextField
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center">SR NO</TableCell>
              <TableCell>EMPLOYEE ID/NAME</TableCell>
              {months.map((month) => (
                <TableCell key={month} align="center">
                  {month}
                </TableCell>
              ))}
              <TableCell align="center">TOTAL</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{page * entries + index + 1}</TableCell>
                <TableCell>{`${row.id} / ${row.name}`}</TableCell>
                {row.monthly.map((val, idx) => (
                  <TableCell key={idx} align="center">
                    {val}
                  </TableCell>
                ))}
                <TableCell align="center">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Buttons */}
        <Box sx={{ mt: 2, p: 2 }}>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
                sx={{
                  color: '#7C3AED',
                  borderColor: '#7C3AED',
                  '&:hover': {
                    backgroundColor: '#7C3AED',
                    borderColor: '#7C3AED',
                    color: 'white',
                  },
                  '&.Mui-disabled': {
                    color: '#ccc',
                    borderColor: '#ccc',
                  }
                }}
              >
                Previous
              </Button>
            </Grid>
            <Grid item>
              Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / entries))}
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= Math.ceil(filteredData.length / entries) - 1}
                sx={{
                  color: '#7C3AED',
                  borderColor: '#7C3AED',
                  '&:hover': {
                    backgroundColor: '#7C3AED',
                    borderColor: '#7C3AED',
                    color: 'white',
                  },
                  '&.Mui-disabled': {
                    color: '#ccc',
                    borderColor: '#ccc',
                  }
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default AttendanceReport;
