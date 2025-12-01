// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// // Sample department data
// const departmentData = [
//   { department: "Human Resource", leaves: [10, 8, 3, 9, 4, 1, 0, 0, 0, 0, 0, 0] },
//   { department: "Operations", leaves: [0, 1, 3, 4, 4, 1, 0, 0, 0, 0, 0, 0] },
//   { department: "Account and Finance", leaves: [1, 2, 6, 3, 6, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Purchase", leaves: [1, 3, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Marketing", leaves: [14, 27, 43, 30, 32, 6, 0, 0, 0, 0, 0, 0] },
//   { department: "QA AND QC", leaves: [0, 2, 5, 3, 0, 2, 0, 0, 0, 0, 0, 0] },
//   { department: "Production", leaves: [4, 4, 3, 5, 1, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Sales", leaves: [136, 120, 123, 76, 102, 26, 0, 0, 0, 0, 0, 0] },
//   { department: "Research & Development", leaves: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Information Technology", leaves: [2, 3, 4, 2, 0, 1, 0, 0, 0, 0, 0, 0] },
//   { department: "Factory", leaves: [1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
// ];

// const months = [
//   "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
//   "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
// ];

// const DepartmentWiseLeaveReport = () => {
//   return (
//     <Box p={3}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Department Wise Leave Report
//       </Typography>

//       <Box sx={{ overflowX: "auto" }}>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 1200 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center" sx={{ fontWeight: 600 }}>SR. NO.</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600 }}>DEPARTMENT</TableCell>
//                 {months.map((month, idx) => (
//                   <TableCell key={idx} align="center" sx={{ fontWeight: 600 }}>{month}</TableCell>
//                 ))}
//                 <TableCell align="center" sx={{ fontWeight: 600 }}>TOTAL</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {departmentData.map((row, index) => {
//                 const total = row.leaves.reduce((acc, val) => acc + val, 0);
//                 return (
//                   <TableRow key={index}>
//                     <TableCell align="center">{index + 1}</TableCell>
//                     <TableCell>{row.department}</TableCell>
//                     {row.leaves.map((val, i) => (
//                       <TableCell key={i} align="center">{val}</TableCell>
//                     ))}
//                     <TableCell align="center" sx={{ fontWeight: 600 }}>{total}</TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default DepartmentWiseLeaveReport;





// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// // Sample department data
// const departmentData = [
//   { department: "Human Resource", leaves: [10, 8, 3, 9, 4, 1, 0, 0, 0, 0, 0, 0] },
//   { department: "Operations", leaves: [0, 1, 3, 4, 4, 1, 0, 0, 0, 0, 0, 0] },
//   { department: "Account and Finance", leaves: [1, 2, 6, 3, 6, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Purchase", leaves: [1, 3, 1, 2, 5, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Marketing", leaves: [14, 27, 43, 30, 32, 6, 0, 0, 0, 0, 0, 0] },
//   { department: "QA AND QC", leaves: [0, 2, 5, 3, 0, 2, 0, 0, 0, 0, 0, 0] },
//   { department: "Production", leaves: [4, 4, 3, 5, 1, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Sales", leaves: [136, 120, 123, 76, 102, 26, 0, 0, 0, 0, 0, 0] },
//   { department: "Research & Development", leaves: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
//   { department: "Information Technology", leaves: [2, 3, 4, 2, 0, 1, 0, 0, 0, 0, 0, 0] },
//   { department: "Factory", leaves: [1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
// ];

// const months = [
//   "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
//   "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
// ];

// const DepartmentWiseLeaveReport = () => {
//   return (
//     <Box p={3}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Department Wise Leave Report
//       </Typography>

//       <Box sx={{ overflowX: "auto" }}>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 1300 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: 600, border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}
//                 >
//                   SR. NO.
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: 600, border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}
//                 >
//                   DEPARTMENT
//                 </TableCell>
//                 {months.map((month, idx) => (
//                   <TableCell
//                     key={idx}
//                     align="center"
//                     sx={{ fontWeight: 600, border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}
//                   >
//                     {month}
//                   </TableCell>
//                 ))}
//                 <TableCell
//                   align="center"
//                   sx={{ fontWeight: 600, border: "1px solid #ccc", backgroundColor: "#e3f2fd" }}
//                 >
//                   TOTAL
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {departmentData.map((row, index) => {
//                 const total = row.leaves.reduce((acc, val) => acc + val, 0);
//                 return (
//                   <TableRow
//                     key={index}
//                     sx={{
//                       backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
//                     }}
//                   >
//                     <TableCell align="center" sx={{ border: "1px solid #ddd" }}>
//                       {index + 1}
//                     </TableCell>
//                     <TableCell sx={{ border: "1px solid #ddd" }}>
//                       {row.department}
//                     </TableCell>
//                     {row.leaves.map((val, i) => (
//                       <TableCell key={i} align="center" sx={{ border: "1px solid #ddd" }}>
//                         {val}
//                       </TableCell>
//                     ))}
//                     <TableCell
//                       align="center"
//                       sx={{ fontWeight: 600, border: "1px solid #ddd" }}
//                     >
//                       {total}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default DepartmentWiseLeaveReport;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
// You would use your actual axiosInstance import
import axiosInstance from "../../utils/axiosInstance";

const EmployeeLeavePatternReport = () => {
  // State for data, loading, and errors
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters and pagination
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch data when the selected year changes
  useEffect(() => {
    const fetchLeavePattern = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.post(
          "/api/employee_leave_pattern/",
          { year: selectedYear }
        );
        if (response.data && response.data.status === "success") {
          setReportData(Array.isArray(response.data.data) ? response.data.data : []);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        setError("Failed to fetch leave pattern data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeavePattern();
  }, [selectedYear]);

  // Handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page when searching
  };

  // Handle changes in the rows per page dropdown
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter data based on the search term (only applies to the month name)
  const filteredData = reportData.filter((row) =>
    row.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  // Generate dynamic year options for the dropdown
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

  // Define table columns based on the API response keys
  const columns = [
    { id: "month", label: "MONTH" },
    { id: "CL", label: "CL" },
    { id: "ML", label: "ML" },
    { id: "PL", label: "PL" },
    { id: "MTL", label: "MTL" },
    { id: "PTL", label: "PTL" },
    { id: "LWP", label: "LWP" },
    { id: "Total", label: "TOTAL" },
  ];
  
  // Custom style for the vibrant purple pagination buttons
  const purpleButtonStyle = {
    backgroundColor: '#673ab7', // Vibrant purple
    color: '#fff',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#5e35b1',
    },
    '&:active': {
        backgroundColor: '#512da8',
        boxShadow: '0 0 20px rgba(103, 58, 183, 0.8)', // Glow effect on click
    },
    '&.Mui-disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Employee Leave Pattern Report
      </Typography>

      {/* Controls Bar */}
      <Grid container spacing={2} mb={2} alignItems="center">
        {/* Top-Left: Rows per Page Dropdown */}
        <Grid item xs={12} sm={3} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Rows</InputLabel>
            <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Center: Year Dropdown */}
        <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Top-Right: Search Input Field */}
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search Month..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center" sx={{ border: "1px solid #ddd" }}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available for the selected criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            sx={purpleButtonStyle}
          >
            Previous
          </Button>
          <Typography>
            Page {page + 1} of {pageCount > 0 ? pageCount : 1}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setPage(page + 1)}
            disabled={page >= pageCount - 1}
            sx={purpleButtonStyle}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeLeavePatternReport;
