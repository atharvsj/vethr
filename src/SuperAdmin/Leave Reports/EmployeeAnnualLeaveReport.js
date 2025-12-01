// // import React from "react";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// // } from "@mui/material";

// // const leaveTypes = [
// //     { label: "PRIVILEGE LEAVE (PL)", key: "pl" },
// //     { label: "CASUAL LEAVE (CL)", key: "cl" },
// //     { label: "MEDICAL LEAVE (ML)", key: "ml" },
// //     { label: "MATERNITY LEAVE", key: "maternity" },
// //     { label: "PRIVILEGE LEAVE", key: "pl2" },
// // ];

// // const createLeaveData = (ob, a, c, l, b) => `OB: ${ob} A: ${a} C: ${c} L: ${l} B: ${b}`;

// // const employeeRows = Array.from({ length: 32 }, (_, i) => ({
// //     id: `V${1000 + i}`,
// //     name: `Employee ${i + 1}`,
// //     pl: createLeaveData(10.5, 3, 0, 1, 10.5),
// //     cl: createLeaveData(7, 2, 0, 1, 8),
// //     ml: createLeaveData(15, 1, 0, 1, 15),
// //     maternity: createLeaveData(182, 0, 0, 0, 182),
// //     pl2: createLeaveData(0, 0, 0, 0, 0),
// // }));

// // const EmployeeAnnualLeaveReport = () => {
// //     return (
// //         <Box p={3}>
// //             <Typography variant="h6" fontWeight="bold" mb={2}>
// //                 Employee Annual Leave Report
// //             </Typography>

// //             <Box sx={{ overflowX: "auto" }}>
// //                 <TableContainer component={Paper}>
// //                     <Table sx={{ minWidth: 1600 }} stickyHeader>
// //                         <TableHead>
// //                             <TableRow>
// //                                 <TableCell align="center">SR. NO.</TableCell>
// //                                 <TableCell align="center">EMPLOYEE ID</TableCell>
// //                                 <TableCell align="center">EMPLOYEE NAME</TableCell>
// //                                 {leaveTypes.map((lt, idx) => (
// //                                     <TableCell key={idx} align="center" sx={{ fontWeight: 600 }}>
// //                                         {lt.label}
// //                                     </TableCell>
// //                                 ))}
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {employeeRows.map((emp, index) => (
// //                                 <TableRow key={index}>
// //                                     <TableCell align="center">{index + 1}</TableCell>
// //                                     <TableCell align="center">{emp.id}</TableCell>
// //                                     <TableCell align="center">{emp.name}</TableCell>
// //                                     {leaveTypes.map((lt, idx) => (
// //                                         <TableCell key={idx} align="center">
// //                                             {emp[lt.key]}
// //                                         </TableCell>
// //                                     ))}
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default EmployeeAnnualLeaveReport;





// // import React from "react";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// // } from "@mui/material";

// // const leaveTypes = [
// //     { label: "PRIVILEGE LEAVE (PL)", key: "pl" },
// //     { label: "CASUAL LEAVE (CL)", key: "cl" },
// //     { label: "MEDICAL LEAVE (ML)", key: "ml" },
// //     { label: "MATERNITY LEAVE", key: "maternity" },
// //     { label: "PRIVILEGE LEAVE", key: "pl2" },
// // ];

// // const createLeaveData = (ob, a, c, l, b) => `OB: ${ob} A: ${a} C: ${c} L: ${l} B: ${b}`;

// // const employeeRows = Array.from({ length: 32 }, (_, i) => ({
// //     id: `V${1000 + i}`,
// //     name: `Employee ${i + 1}`,
// //     pl: createLeaveData(10.5, 3, 0, 1, 10.5),
// //     cl: createLeaveData(7, 2, 0, 1, 8),
// //     ml: createLeaveData(15, 1, 0, 1, 15),
// //     maternity: createLeaveData(182, 0, 0, 0, 182),
// //     pl2: createLeaveData(0, 0, 0, 0, 0),
// // }));

// // const EmployeeAnnualLeaveReport = () => {
// //     return (
// //         <Box p={3}>
// //             <Typography variant="h6" fontWeight="bold" mb={2}>
// //                 Employee Annual Leave Report
// //             </Typography>

// //             <Box sx={{ overflowX: "auto" }}>
// //                 <TableContainer component={Paper}>
// //                     <Table sx={{ minWidth: 1600 }} stickyHeader size="small">
// //                         <TableHead>
// //                             <TableRow>
// //                                 <TableCell align="center" sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>
// //                                     SR. NO.
// //                                 </TableCell>
// //                                 <TableCell align="center" sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>
// //                                     EMPLOYEE ID
// //                                 </TableCell>
// //                                 <TableCell align="center" sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>
// //                                     EMPLOYEE NAME
// //                                 </TableCell>
// //                                 {leaveTypes.map((lt, idx) => (
// //                                     <TableCell
// //                                         key={idx}
// //                                         align="center"
// //                                         sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}
// //                                     >
// //                                         {lt.label}
// //                                     </TableCell>
// //                                 ))}
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {employeeRows.map((emp, index) => (
// //                                 <TableRow
// //                                     key={index}
// //                                     sx={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9" }}
// //                                 >
// //                                     <TableCell align="center" sx={{ border: "1px solid #ddd" }}>{index + 1}</TableCell>
// //                                     <TableCell align="center" sx={{ border: "1px solid #ddd" }}>{emp.id}</TableCell>
// //                                     <TableCell align="center" sx={{ border: "1px solid #ddd" }}>{emp.name}</TableCell>
// //                                     {leaveTypes.map((lt, idx) => (
// //                                         <TableCell key={idx} align="center" sx={{ border: "1px solid #ddd" }}>
// //                                             {emp[lt.key]}
// //                                         </TableCell>
// //                                     ))}
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default EmployeeAnnualLeaveReport;
// // import React, { useState, useEffect } from "react";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     CircularProgress,
// //     Alert,
// //     Grid,
// //     FormControl,
// //     InputLabel,
// //     Select,
// //     MenuItem,
// //     TextField,
// //     Button,
// // } from "@mui/material";
// // // You need to have this utility configured to point to your backend
// //  import axiosInstance from "../../utils/axiosInstance";

// // // Mocking axiosInstance for demonstration since I can't make real API calls.
// // // In your project, you would REMOVE this and use your actual import.


// // // Component starts here
// // const EmployeeAnnualLeaveReport = () => {
// //     // State for data, loading, and errors
// //     const [reportData, setReportData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     // State for filters
// //     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// //     const [searchTerm, setSearchTerm] = useState("");

// //     // State for pagination
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);

// //     // Fetch data when year or month changes
// //     useEffect(() => {
// //         const fetchLeaveReport = async () => {
// //             setLoading(true);
// //             setError(null);
// //             try {
// //                 const response = await axiosInstance.get(
// //                     `https://tdtlworld.com/hrms-backend/apis/get_employee_leave_request_report/?year=${selectedYear}&month=${selectedMonth}`
// //                 );
// //                 setReportData(Array.isArray(response.data) ? response.data : []);
// //             } catch (err) {
// //                 setError("Failed to fetch leave report data. Please try again later.");
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchLeaveReport();
// //     }, [selectedYear, selectedMonth]);

// //     // Handle search input changes
// //     const handleSearchChange = (event) => {
// //         setSearchTerm(event.target.value);
// //         setPage(0); // Reset to the first page on a new search
// //     };

// //     // Handle rows per page change
// //     const handleRowsPerPageChange = (event) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     // Filtering logic
// //     const filteredData = reportData.filter((row) => {
// //         const searchLower = searchTerm.toLowerCase();
// //         return (
// //             row.employee_id?.toLowerCase().includes(searchLower) ||
// //             row.full_name?.toLowerCase().includes(searchLower) ||
// //             row.department_name?.toLowerCase().includes(searchLower) ||
// //             row.designation_name?.toLowerCase().includes(searchLower) ||
// //             row.manager_name?.toLowerCase().includes(searchLower) ||
// //             row.leave_type?.toLowerCase().includes(searchLower)
// //         );
// //     });

// //     // Pagination logic
// //     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

// //     // Dynamic year options
// //     const currentYear = new Date().getFullYear();
// //     const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

// //     // Month options
// //     const monthOptions = [
// //         { value: 1, label: "January" }, { value: 2, label: "February" },
// //         { value: 3, label: "March" }, { value: 4, label: "April" },
// //         { value: 5, label: "May" }, { value: 6, label: "June" },
// //         { value: 7, label: "July" }, { value: 8, label: "August" },
// //         { value: 9, label: "September" }, { value: 10, label: "October" },
// //         { value: 11, label: "November" }, { value: 12, label: "December" },
// //     ];

// //     // Custom button style
// //     const purpleButtonStyle = {
// //         backgroundColor: '#673ab7',
// //         color: '#fff',
// //         transition: 'all 0.3s ease-in-out',
// //         '&:hover': {
// //             backgroundColor: '#5e35b1',
// //         },
// //         '&:active': {
// //             backgroundColor: '#512da8',
// //             boxShadow: '0 0 20px rgba(103, 58, 183, 0.8)', // Glow effect
// //         },
// //         '&.Mui-disabled': {
// //             backgroundColor: 'rgba(0, 0, 0, 0.12)'
// //         }
// //     };

// //     return (
// //         <Box p={3}>
// //             <Typography variant="h6" fontWeight="bold" mb={2}>
// //                 Employee Leave Request Report
// //             </Typography>

// //             {/* Filters and Search Bar */}
// //             <Grid container spacing={2} mb={2} alignItems="center">
// //                 <Grid item xs={12} sm={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Year</InputLabel>
// //                         <Select
// //                             value={selectedYear}
// //                             label="Year"
// //                             onChange={(e) => setSelectedYear(e.target.value)}
// //                         >
// //                             {yearOptions.map(year => (
// //                                 <MenuItem key={year} value={year}>{year}</MenuItem>
// //                             ))}
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Month</InputLabel>
// //                         <Select
// //                             value={selectedMonth}
// //                             label="Month"
// //                             onChange={(e) => setSelectedMonth(e.target.value)}
// //                         >
// //                             {monthOptions.map(month => (
// //                                 <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
// //                             ))}
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm />
// //                 <Grid item xs={12} sm={4}>
// //                     <TextField
// //                         fullWidth
// //                         size="small"
// //                         variant="outlined"
// //                         placeholder="Search..."
// //                         value={searchTerm}
// //                         onChange={handleSearchChange}
// //                     />
// //                 </Grid>
// //             </Grid>

// //             {/* Table */}
// //             <TableContainer component={Paper}>
// //                 <Table sx={{ minWidth: 1200 }} stickyHeader size="small">
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>SR. NO.</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>EMPLOYEE ID</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>EMPLOYEE NAME</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>DEPARTMENT</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>DESIGNATION</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>MANAGER</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>LEAVE TYPE</TableCell>
// //                             <TableCell sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>REASON</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {loading ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={8} align="center"><CircularProgress /></TableCell>
// //                             </TableRow>
// //                         ) : error ? (
// //                              <TableRow>
// //                                 <TableCell colSpan={8} align="center"><Alert severity="error">{error}</Alert></TableCell>
// //                             </TableRow>
// //                         ) : paginatedData.length > 0 ? (
// //                             paginatedData.map((row, index) => (
// //                                 <TableRow key={row.user_id + index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{page * rowsPerPage + index + 1}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.employee_id || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.full_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.department_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.designation_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.manager_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.leave_type || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.reason || "N/A"}</TableCell>
// //                                 </TableRow>
// //                             ))
// //                         ) : (
// //                             <TableRow>
// //                                 <TableCell colSpan={8} align="center">No data available for the selected criteria.</TableCell>
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {/* Pagination Controls */}
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
// //                 <FormControl size="small">
// //                     <InputLabel>Rows</InputLabel>
// //                     <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //                         <MenuItem value={5}>5</MenuItem>
// //                         <MenuItem value={10}>10</MenuItem>
// //                         <MenuItem value={25}>25</MenuItem>
// //                         <MenuItem value={50}>50</MenuItem>
// //                     </Select>
// //                 </FormControl>

// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => setPage(page - 1)}
// //                         disabled={page === 0}
// //                         sx={purpleButtonStyle}
// //                     >
// //                         Previous
// //                     </Button>
// //                     <Typography>
// //                         Page {page + 1} of {pageCount}
// //                     </Typography>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => setPage(page + 1)}
// //                         disabled={page >= pageCount - 1}
// //                         sx={purpleButtonStyle}
// //                     >
// //                         Next
// //                     </Button>
// //                 </Box>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default EmployeeAnnualLeaveReport;
// // import React, { useState, useEffect } from "react";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     CircularProgress,
// //     Alert,
// //     Grid,
// //     FormControl,
// //     InputLabel,
// //     Select,
// //     MenuItem,
// //     TextField,
// //     Button,
// // } from "@mui/material";
// // // You need to have this utility configured to point to your backend
// //  import axiosInstance from "../../utils/axiosInstance";

// // // This is a helper function to format dates nicely.
// // const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     // You can customize the format here if needed
// //     return date.toLocaleDateString('en-GB'); // e.g., "dd/mm/yyyy"
// // };

// // // Component starts here
// // const EmployeeAnnualLeaveReport = () => {
// //     // State for data, loading, and errors
// //     const [reportData, setReportData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     // State for filters
// //     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// //     const [searchTerm, setSearchTerm] = useState("");

// //     // State for pagination
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);

// //     // Fetch data when year or month changes
// //     useEffect(() => {
// //         const fetchLeaveReport = async () => {
// //             setLoading(true);
// //             setError(null);
// //             try {
// //                 // The URL is now correctly pointing to your API
// //                 const response = await axiosInstance.get(
// //                     `/apis/get_employee_leave_request_report/?year=${selectedYear}&month=${selectedMonth}`
// //                 );
// //                 setReportData(Array.isArray(response.data) ? response.data : []);
// //             } catch (err) {
// //                 setError("Failed to fetch leave report data. Please try again later.");
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchLeaveReport();
// //     }, [selectedYear, selectedMonth]);

// //     // Handle search input changes
// //     const handleSearchChange = (event) => {
// //         setSearchTerm(event.target.value);
// //         setPage(0); // Reset to the first page on a new search
// //     };

// //     // Handle rows per page change
// //     const handleRowsPerPageChange = (event) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     // Filtering logic updated for the new data structure
// //     const filteredData = reportData.filter((row) => {
// //         const searchLower = searchTerm.toLowerCase();
// //         return (
// //             row.employee_id?.toLowerCase().includes(searchLower) ||
// //             row.department_name?.toLowerCase().includes(searchLower) ||
// //             row.designation_name?.toLowerCase().includes(searchLower) ||
// //             row.manager_name?.toLowerCase().includes(searchLower) ||
// //             row.leave_type?.toLowerCase().includes(searchLower) ||
// //             row.reason?.toLowerCase().includes(searchLower) ||
// //             row.remarks?.toLowerCase().includes(searchLower)
// //         );
// //     });

// //     // Pagination logic
// //     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

// //     // Dynamic year options
// //     const currentYear = new Date().getFullYear();
// //     const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

// //     // Month options
// //     const monthOptions = [
// //         { value: 1, label: "January" }, { value: 2, label: "February" },
// //         { value: 3, label: "March" }, { value: 4, label: "April" },
// //         { value: 5, label: "May" }, { value: 6, label: "June" },
// //         { value: 7, label: "July" }, { value: 8, label: "August" },
// //         { value: 9, label: "September" }, { value: 10, label: "October" },
// //         { value: 11, label: "November" }, { value: 12, label: "December" },
// //     ];

// //     // Custom button style
// //     const purpleButtonStyle = {
// //         backgroundColor: '#673ab7',
// //         color: '#fff',
// //         transition: 'all 0.3s ease-in-out',
// //         '&:hover': {
// //             backgroundColor: '#5e35b1',
// //         },
// //         '&:active': {
// //             backgroundColor: '#512da8',
// //             boxShadow: '0 0 20px rgba(103, 58, 183, 0.8)', // Glow effect
// //         },
// //         '&.Mui-disabled': {
// //             backgroundColor: 'rgba(0, 0, 0, 0.12)'
// //         }
// //     };

// //     // Define table columns based on the new structure
// //     const columns = [
// //         { id: 'sr_no', label: 'SR. NO.' },
// //         { id: 'employee_id', label: 'EMPLOYEE ID' },
// //         { id: 'department_name', label: 'DEPARTMENT' },
// //         { id: 'designation_name', label: 'DESIGNATION' },
// //         { id: 'manager_name', label: 'MANAGER' },
// //         { id: 'date_of_joining', label: 'JOINING DATE' },
// //         { id: 'leave_type', label: 'LEAVE TYPE' },
// //         { id: 'start_date', label: 'START DATE' },
// //         { id: 'end_date', label: 'END DATE' },
// //         { id: 'no_of_days', label: 'NO. OF DAYS' },
// //         { id: 'reason', label: 'REASON' },
// //         { id: 'remarks', label: 'REMARKS' },
// //     ];

// //     return (
// //         <Box p={3}>
// //             <Typography variant="h6" fontWeight="bold" mb={2}>
// //                 Employee Leave Request Report
// //             </Typography>

// //             {/* Filters and Search Bar */}
// //             <Grid container spacing={2} mb={2} alignItems="center">
// //                 <Grid item xs={12} sm={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Year</InputLabel>
// //                         <Select
// //                             value={selectedYear}
// //                             label="Year"
// //                             onChange={(e) => setSelectedYear(e.target.value)}
// //                         >
// //                             {yearOptions.map(year => (
// //                                 <MenuItem key={year} value={year}>{year}</MenuItem>
// //                             ))}
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Month</InputLabel>
// //                         <Select
// //                             value={selectedMonth}
// //                             label="Month"
// //                             onChange={(e) => setSelectedMonth(e.target.value)}
// //                         >
// //                             {monthOptions.map(month => (
// //                                 <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
// //                             ))}
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm />
// //                 <Grid item xs={12} sm={4}>
// //                     <TextField
// //                         fullWidth
// //                         size="small"
// //                         variant="outlined"
// //                         placeholder="Search..."
// //                         value={searchTerm}
// //                         onChange={handleSearchChange}
// //                     />
// //                 </Grid>
// //             </Grid>

// //             {/* Table */}
// //             <TableContainer component={Paper}>
// //                 <Table sx={{ minWidth: 1600 }} stickyHeader size="small">
// //                     <TableHead>
// //                         <TableRow>
// //                             {columns.map((column) => (
// //                                 <TableCell key={column.id} sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>
// //                                     {column.label}
// //                                 </TableCell>
// //                             ))}
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {loading ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
// //                             </TableRow>
// //                         ) : error ? (
// //                              <TableRow>
// //                                 <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
// //                             </TableRow>
// //                         ) : paginatedData.length > 0 ? (
// //                             paginatedData.map((row, index) => (
// //                                 <TableRow key={row.user_id + index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{page * rowsPerPage + index + 1}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.employee_id || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.department_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.designation_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.manager_name?.trim() || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.date_of_joining)}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.leave_type || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.start_date)}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.end_date)}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.no_of_days ?? "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.reason || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.remarks || "N/A"}</TableCell>
// //                                 </TableRow>
// //                             ))
// //                         ) : (
// //                             <TableRow>
// //                                 <TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell>
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {/* Pagination Controls */}
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
// //                 <FormControl size="small">
// //                     <InputLabel>Rows</InputLabel>
// //                     <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //                         <MenuItem value={5}>5</MenuItem>
// //                         <MenuItem value={10}>10</MenuItem>
// //                         <MenuItem value={25}>25</MenuItem>
// //                         <MenuItem value={50}>50</MenuItem>
// //                     </Select>
// //                 </FormControl>

// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => setPage(page - 1)}
// //                         disabled={page === 0}
// //                         sx={purpleButtonStyle}
// //                     >
// //                         Previous
// //                     </Button>
// //                     <Typography>
// //                         Page {page + 1} of {pageCount}
// //                     </Typography>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => setPage(page + 1)}
// //                         disabled={page >= pageCount - 1}
// //                         sx={purpleButtonStyle}
// //                     >
// //                         Next
// //                     </Button>
// //                 </Box>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default EmployeeAnnualLeaveReport;
// // import React, { useState, useEffect } from "react";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     CircularProgress,
// //     Alert,
// //     Grid,
// //     FormControl,
// //     InputLabel,
// //     Select,
// //     MenuItem,
// //     TextField,
// //     Button,
// // } from "@mui/material";
// // // You need to have this utility configured to point to your backend
// //  import axiosInstance from "../../utils/axiosInstance";

// // // This is a helper function to format dates nicely.
// // const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     // You can customize the format here if needed
// //     return date.toLocaleDateString('en-GB'); // e.g., "dd/mm/yyyy"
// // };

// // // Component starts here
// // const EmployeeAnnualLeaveReport = () => {
// //     // State for data, loading, and errors
// //     const [reportData, setReportData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     // State for filters
// //     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
// //     const [searchTerm, setSearchTerm] = useState("");

// //     // State for pagination
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);

// //     // Fetch data when year or month changes
// //     useEffect(() => {
// //         const fetchLeaveReport = async () => {
// //             setLoading(true);
// //             setError(null);
// //             try {
// //                 // The URL is now correctly pointing to your API
// //                 const response = await axiosInstance.get(
// //                     `/apis/get_employee_leave_request_report/?year=${selectedYear}&month=${selectedMonth}`
// //                 );
// //                 setReportData(Array.isArray(response.data) ? response.data : []);
// //             } catch (err) {
// //                 setError("Failed to fetch leave report data. Please try again later.");
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchLeaveReport();
// //     }, [selectedYear, selectedMonth]);

// //     // Handle search input changes
// //     const handleSearchChange = (event) => {
// //         setSearchTerm(event.target.value);
// //         setPage(0); // Reset to the first page on a new search
// //     };

// //     // Handle rows per page change
// //     const handleRowsPerPageChange = (event) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     // Filtering logic updated for the new data structure
// //     const filteredData = reportData.filter((row) => {
// //         const searchLower = searchTerm.toLowerCase();
// //         return (
// //             row.employee_id?.toLowerCase().includes(searchLower) ||
// //             row.department_name?.toLowerCase().includes(searchLower) ||
// //             row.designation_name?.toLowerCase().includes(searchLower) ||
// //             row.manager_name?.toLowerCase().includes(searchLower) ||
// //             row.leave_type?.toLowerCase().includes(searchLower) ||
// //             row.reason?.toLowerCase().includes(searchLower) ||
// //             row.remarks?.toLowerCase().includes(searchLower)
// //         );
// //     });

// //     // Pagination logic
// //     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

// //     // Dynamic year options
// //     const currentYear = new Date().getFullYear();
// //     const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

// //     // Month options
// //     const monthOptions = [
// //         { value: 1, label: "January" }, { value: 2, label: "February" },
// //         { value: 3, label: "March" }, { value: 4, label: "April" },
// //         { value: 5, label: "May" }, { value: 6, label: "June" },
// //         { value: 7, label: "July" }, { value: 8, label: "August" },
// //         { value: 9, label: "September" }, { value: 10, label: "October" },
// //         { value: 11, label: "November" }, { value: 12, label: "December" },
// //     ];

// //     // Custom button style
// //     const purpleButtonStyle = {
// //         backgroundColor: '#673ab7',
// //         color: '#fff',
// //         transition: 'all 0.3s ease-in-out',
// //         '&:hover': {
// //             backgroundColor: '#5e35b1',
// //         },
// //         '&:active': {
// //             backgroundColor: '#512da8',
// //             boxShadow: '0 0 20px rgba(103, 58, 183, 0.8)', // Glow effect
// //         },
// //         '&.Mui-disabled': {
// //             backgroundColor: 'rgba(0, 0, 0, 0.12)'
// //         }
// //     };

// //     // Define table columns based on the new structure
// //     const columns = [
// //         { id: 'sr_no', label: 'SR. NO.' },
// //         { id: 'employee_id', label: 'EMPLOYEE ID' },
// //         { id: 'department_name', label: 'DEPARTMENT' },
// //         { id: 'designation_name', label: 'DESIGNATION' },
// //         { id: 'manager_name', label: 'MANAGER' },
// //         { id: 'date_of_joining', label: 'JOINING DATE' },
// //         { id: 'leave_type', label: 'LEAVE TYPE' },
// //         { id: 'start_date', label: 'START DATE' },
// //         { id: 'end_date', label: 'END DATE' },
// //         { id: 'no_of_days', label: 'NO. OF DAYS' },
// //         { id: 'reason', label: 'REASON' },
// //         { id: 'remarks', label: 'REMARKS' },
// //     ];

// //     return (
// //         <Box p={3}>
// //             <Typography variant="h6" fontWeight="bold" mb={2}>
// //                 Employee Leave Request Report
// //             </Typography>

// //             <Grid container spacing={2} mb={2} alignItems="center">
// //                 <Grid item xs={12} sm={3} md={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Rows</InputLabel>
// //                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //                             <MenuItem value={5}>5</MenuItem>
// //                             <MenuItem value={10}>10</MenuItem>
// //                             <MenuItem value={25}>25</MenuItem>
// //                             <MenuItem value={50}>50</MenuItem>
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>

// //                 <Grid item xs={12} sm={6} md={6}>
// //                     <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
// //                         <FormControl sx={{ minWidth: 120 }} size="small">
// //                             <InputLabel>Year</InputLabel>
// //                             <Select
// //                                 value={selectedYear}
// //                                 label="Year"
// //                                 onChange={(e) => setSelectedYear(e.target.value)}
// //                             >
// //                                 {yearOptions.map(year => (
// //                                     <MenuItem key={year} value={year}>{year}</MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                         <FormControl sx={{ minWidth: 120 }} size="small">
// //                             <InputLabel>Month</InputLabel>
// //                             <Select
// //                                 value={selectedMonth}
// //                                 label="Month"
// //                                 onChange={(e) => setSelectedMonth(e.target.value)}
// //                             >
// //                                 {monthOptions.map(month => (
// //                                     <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
// //                                 ))}
// //                             </Select>
// //                         </FormControl>
// //                     </Box>
// //                 </Grid>

// //                 <Grid item xs={12} sm={3} md={4}>
// //                     <TextField
// //                         fullWidth
// //                         size="small"
// //                         variant="outlined"
// //                         placeholder="Search..."
// //                         value={searchTerm}
// //                         onChange={handleSearchChange}
// //                     />
// //                 </Grid>
// //             </Grid>

// //             {/* --- MODIFICATION HERE --- */}
// //             {/* The TableContainer component is what enables the horizontal scrollbar. */}
// //             {/* By setting `sx={{ overflowX: 'auto' }}`, we make this behavior explicit. */}
// //             <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
// //                 {/* The `minWidth` on the Table ensures that if the screen is too narrow, */}
// //                 {/* the TableContainer will have content to scroll through. */}
// //                 <Table sx={{ minWidth: 1600 }} stickyHeader size="small">
// //                     <TableHead>
// //                         <TableRow>
// //                             {columns.map((column) => (
// //                                 <TableCell key={column.id} sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}>
// //                                     {column.label}
// //                                 </TableCell>
// //                             ))}
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {loading ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
// //                             </TableRow>
// //                         ) : error ? (
// //                              <TableRow>
// //                                 <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
// //                             </TableRow>
// //                         ) : paginatedData.length > 0 ? (
// //                             paginatedData.map((row, index) => (
// //                                 <TableRow key={row.user_id + "-" + index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{page * rowsPerPage + index + 1}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.employee_id || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.department_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.designation_name || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.manager_name?.trim() || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.date_of_joining)}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.leave_type || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.start_date)}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.end_date)}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.no_of_days ?? "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.reason || "N/A"}</TableCell>
// //                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.remarks || "N/A"}</TableCell>
// //                                 </TableRow>
// //                             ))
// //                         ) : (
// //                             <TableRow>
// //                                 <TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell>
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => setPage(page - 1)}
// //                         disabled={page === 0}
// //                         sx={purpleButtonStyle}
// //                     >
// //                         Previous
// //                     </Button>
// //                     <Typography>
// //                         Page {page + 1} of {pageCount > 0 ? pageCount : 1}
// //                     </Typography>
// //                     <Button
// //                         variant="contained"
// //                         onClick={() => setPage(page + 1)}
// //                         disabled={page >= pageCount - 1}
// //                         sx={purpleButtonStyle}
// //                     >
// //                         Next
// //                     </Button>
// //                 </Box>
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default EmployeeAnnualLeaveReport;
// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";

// const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
// };

// const EmployeeAnnualLeaveReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [searchTerm, setSearchTerm] = useState("");

//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         const fetchLeaveReport = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axiosInstance.get(
//                     `/apis/get_employee_leave_request_report/?year=${selectedYear}&month=${selectedMonth}`
//                 );
//                 setReportData(Array.isArray(response.data) ? response.data : []);
//             } catch (err) {
//                 setError("Failed to fetch leave report data. Please try again later.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLeaveReport();
//     }, [selectedYear, selectedMonth]);

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) => {
//         const searchLower = searchTerm.toLowerCase();
//         return (
//             row.employee_id?.toLowerCase().includes(searchLower) ||
//             row.department_name?.toLowerCase().includes(searchLower) ||
//             row.designation_name?.toLowerCase().includes(searchLower) ||
//             row.manager_name?.toLowerCase().includes(searchLower) ||
//             row.leave_type?.toLowerCase().includes(searchLower) ||
//             row.reason?.toLowerCase().includes(searchLower) ||
//             row.remarks?.toLowerCase().includes(searchLower)
//         );
//     });

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const currentYear = new Date().getFullYear();
//     const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

//     const monthOptions = [
//         { value: 1, label: "January" }, { value: 2, label: "February" },
//         { value: 3, label: "March" }, { value: 4, label: "April" },
//         { value: 5, label: "May" }, { value: 6, label: "June" },
//         { value: 7, label: "July" }, { value: 8, label: "August" },
//         { value: 9, label: "September" }, { value: 10, label: "October" },
//         { value: 11, label: "November" }, { value: 12, label: "December" },
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7',
//         color: '#fff',
//         transition: 'all 0.3s ease-in-out',
//         '&:hover': { backgroundColor: '#5e35b1' },
//         '&:active': {
//             backgroundColor: '#512da8',
//             boxShadow: '0 0 20px rgba(103, 58, 183, 0.8)',
//         },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     const columns = [
//         { id: 'sr_no', label: 'SR. NO.' },
//         { id: 'employee_id', label: 'EMPLOYEE ID' },
//         { id: 'department_name', label: 'DEPARTMENT' },
//         { id: 'designation_name', label: 'DESIGNATION' },
//         { id: 'manager_name', label: 'MANAGER' },
//         { id: 'date_of_joining', label: 'JOINING DATE' },
//         { id: 'leave_type', label: 'LEAVE TYPE' },
//         { id: 'start_date', label: 'START DATE' },
//         { id: 'end_date', label: 'END DATE' },
//         { id: 'no_of_days', label: 'NO. OF DAYS' },
//         { id: 'reason', label: 'REASON' },
//         { id: 'remarks', label: 'REMARKS' },
//     ];

//     return (
//         <Box p={3}>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Employee Leave Request Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={3} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={5}>5</MenuItem>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={6}>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
//                         <FormControl sx={{ minWidth: 120 }} size="small">
//                             <InputLabel>Year</InputLabel>
//                             <Select
//                                 value={selectedYear}
//                                 label="Year"
//                                 onChange={(e) => setSelectedYear(e.target.value)}
//                             >
//                                 {yearOptions.map(year => (
//                                     <MenuItem key={year} value={year}>{year}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <FormControl sx={{ minWidth: 120 }} size="small">
//                             <InputLabel>Month</InputLabel>
//                             <Select
//                                 value={selectedMonth}
//                                 label="Month"
//                                 onChange={(e) => setSelectedMonth(e.target.value)}
//                             >
//                                 {monthOptions.map(month => (
//                                     <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Box>
//                 </Grid>

//                 <Grid item xs={12} sm={3} md={4}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>

//             {/* Table with horizontal scroll */}
//             <TableContainer
//                 component={Paper}
//                 sx={{
//                     width: '100%',
//                     overflowX: 'auto',
//                     '&::-webkit-scrollbar': { height: 8 },
//                     '&::-webkit-scrollbar-thumb': {
//                         backgroundColor: '#b0bec5',
//                         borderRadius: 4,
//                     },
//                     '&::-webkit-scrollbar-track': { backgroundColor: '#eceff1' },
//                 }}
//             >
//                 <Table sx={{ minWidth: 1600 }} stickyHeader size="small">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     sx={{
//                                         border: "1px solid #ccc",
//                                         backgroundColor: "#e3f2fd",
//                                         fontWeight: 600
//                                     }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     <CircularProgress />
//                                 </TableCell>
//                             </TableRow>
//                         ) : error ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     <Alert severity="error">{error}</Alert>
//                                 </TableCell>
//                             </TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow
//                                     key={row.user_id + "-" + index}
//                                     sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                                 >
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.employee_id || "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.department_name || "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.designation_name || "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.manager_name?.trim() || "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.date_of_joining)}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.leave_type || "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.start_date)}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.end_date)}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.no_of_days ?? "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.reason || "N/A"}</TableCell>
//                                     <TableCell sx={{ border: "1px solid #ddd" }}>{row.remarks || "N/A"}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     No data available for the selected criteria.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button
//                         variant="contained"
//                         onClick={() => setPage(page - 1)}
//                         disabled={page === 0}
//                         sx={purpleButtonStyle}
//                     >
//                         Previous
//                     </Button>
//                     <Typography>
//                         Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         onClick={() => setPage(page + 1)}
//                         disabled={page >= pageCount - 1}
//                         sx={purpleButtonStyle}
//                     >
//                         Next
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default EmployeeAnnualLeaveReport;
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
  Container,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
};

const EmployeeAnnualLeaveReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchLeaveReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/apis/get_employee_leave_request_report/?year=${selectedYear}&month=${selectedMonth}`
        );
        setReportData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to fetch leave report data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveReport();
  }, [selectedYear, selectedMonth]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = reportData.filter((row) => {
    const s = searchTerm.toLowerCase();
    return (
      row.employee_id?.toLowerCase().includes(s) ||
      row.department_name?.toLowerCase().includes(s) ||
      row.designation_name?.toLowerCase().includes(s) ||
      row.manager_name?.toLowerCase().includes(s) ||
      row.leave_type?.toLowerCase().includes(s) ||
      row.reason?.toLowerCase().includes(s) ||
      row.remarks?.toLowerCase().includes(s)
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const purpleButtonStyle = {
    backgroundColor: "#673ab7",
    color: "#fff",
    transition: "all 0.3s ease-in-out",
    "&:hover": { backgroundColor: "#5e35b1" },
    "&:active": {
      backgroundColor: "#512da8",
      boxShadow: "0 0 20px rgba(103, 58, 183, 0.8)",
    },
    "&.Mui-disabled": { backgroundColor: "rgba(0, 0, 0, 0.12)" },
  };

  const columns = [
    { id: "sr_no", label: "SR. NO." },
    { id: "employee_id", label: "EMPLOYEE ID" },
    { id: "department_name", label: "DEPARTMENT" },
    { id: "designation_name", label: "DESIGNATION" },
    { id: "manager_name", label: "MANAGER" },
    { id: "date_of_joining", label: "JOINING DATE" },
    { id: "leave_type", label: "LEAVE TYPE" },
    { id: "start_date", label: "START DATE" },
    { id: "end_date", label: "END DATE" },
    { id: "no_of_days", label: "NO. OF DAYS" },
    { id: "reason", label: "REASON" },
    { id: "remarks", label: "REMARKS" },
  ];

  return (
    <Container sx={{ width: "100%", overflow: "hidden" }}>
      <Box p={3}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Employee Leave Request Report
        </Typography>

        <Grid container spacing={2} mb={2} alignItems="center">
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Rows</InputLabel>
              <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  label="Month"
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {monthOptions.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3} md={4}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>

        {/* Force horizontal scroll container */}
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper} sx={{ minWidth: "fit-content" }}>
              <Table
                stickyHeader
                size="small"
                sx={{
                  minWidth: 1600, // ensure it can overflow on smaller screens
                  "& th, & td": { whiteSpace: "nowrap" }, // prevent wrap so it really overflows
                }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          border: "1px solid #ccc",
                          backgroundColor: "#e3f2fd",
                          fontWeight: 600,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <Alert severity="error">{error}</Alert>
                      </TableCell>
                    </TableRow>
                  ) : paginatedData.length > 0 ? (
                    paginatedData.map((row, index) => (
                      <TableRow
                        key={row.user_id + "-" + index}
                        sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                      >
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.employee_id || "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.department_name || "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.designation_name || "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.manager_name?.trim() || "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {formatDate(row.date_of_joining)}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.leave_type || "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {formatDate(row.start_date)}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {formatDate(row.end_date)}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.no_of_days ?? "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.reason || "N/A"}
                        </TableCell>
                        <TableCell sx={{ border: "1px solid #ddd" }}>
                          {row.remarks || "N/A"}
                        </TableCell>
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
          </Box>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              sx={purpleButtonStyle}
            >
              Previous
            </Button>
            <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
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
    </Container>
  );
};

export default EmployeeAnnualLeaveReport;
