



// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     Grid,
//     Typography,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     CircularProgress, // Import for loading spinner
//     Alert,            // Import for error messages
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // No longer need dayjs for initial state, but still needed for formatting
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// export default function NewJoinerReport() {
//     // MODIFIED: Initialize dates to null to be empty on load
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [search, setSearch] = useState("");
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     // ADDED: Loading and error states for better UX
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // Fetch API Data
//     const fetchData = async () => {
//         // ADDED: Validation to ensure dates are selected
//         if (!fromDate || !toDate) {
//             setError("Please select both 'From Date' and 'To Date'.");
//             setHasSearched(true);
//             setRows([]);
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setRows([]); // Clear previous data

//         try {
//             const res = await fetch(
//                 "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         from: fromDate.format("YYYY-MM-DD"),
//                         to: toDate.format("YYYY-MM-DD"),
//                     }),
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();
//             setRows(Array.isArray(data) ? data : []);
//             setPage(0); // Reset to first page on new data fetch
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             setError("Failed to fetch report data. Please try again later.");
//             setRows([]); // Set to empty array on error
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Export Excel
//     const exportToExcel = () => {
//         if (rows.length === 0) return; // Don't export if no data
//         const worksheet = XLSX.utils.json_to_sheet(rows);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
//         XLSX.writeFile(workbook, "new_joiner_report.xlsx");
//     };

//     // Filter rows
//     const filteredRows = rows.filter(
//         (row) =>
//             row["Employee ID"]?.toLowerCase().includes(search.toLowerCase()) ||
//             row["Name"]?.toLowerCase().includes(search.toLowerCase())
//     );

//     // Handler for Rows Per Page select
//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // Consistent purple button style
//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7",
//         color: "#fff",
//         "&:hover": { backgroundColor: "#5e35b1" },
//         "&.Mui-disabled": {
//             backgroundColor: "#b39ddb",
//             color: "#f5f5f5"
//         }
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box p={3}>
//                 {/* Title */}
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     New Joiner Report
//                 </Typography>

//                 <Grid container spacing={2} mb={2} alignItems="center">
//                     {/* Top-Left: Rows per Page Dropdown */}
//                     <Grid item xs={12} sm={4} md={2}>
//                         <FormControl fullWidth size="small">
//                             <InputLabel>Rows</InputLabel>
//                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                 <MenuItem value={5}>5</MenuItem>
//                                 <MenuItem value={10}>10</MenuItem>
//                                 <MenuItem value={25}>25</MenuItem>
//                                 <MenuItem value={50}>50</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {/* Center: Date Pickers and Action Buttons */}
//                     <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                         <DatePicker
//                             label="From Date"
//                             value={fromDate}
//                             onChange={(newValue) => setFromDate(newValue)}
//                             slotProps={{ textField: { size: 'small' } }}
//                         />
//                         <DatePicker
//                             label="To Date"
//                             value={toDate}
//                             onChange={(newValue) => setToDate(newValue)}
//                             slotProps={{ textField: { size: 'small' } }}
//                         />
//                         <Button
//                             variant="contained"
//                             sx={purpleButtonStyle}
//                             onClick={fetchData}
//                             // MODIFIED: Disable button if dates are not selected or if loading
//                             disabled={!fromDate || !toDate || loading}
//                         >
//                             Generate Report
//                         </Button>
//                         <Button
//                             variant="contained"
//                             sx={purpleButtonStyle}
//                             onClick={exportToExcel}
//                             disabled={rows.length === 0}
//                         >
//                             Export Excel
//                         </Button>
//                     </Grid>

//                     {/* Top-Right: Search Input Field */}
//                     <Grid item xs={12} sm={12} md={2}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             variant="outlined"
//                             placeholder="Search..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </Grid>
//                 </Grid>

//                 {/* Table */}
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 600 }}>Sr No</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Division</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Sub-Division</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Headquarter</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Line Manager</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>D.O.J</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {/* MODIFIED: Added Loading, Error, and initial states */}
//                             {loading ? (
//                                 <TableRow><TableCell colSpan={11} align="center"><CircularProgress /></TableCell></TableRow>
//                             ) : error ? (
//                                 <TableRow><TableCell colSpan={11} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                             ) : !hasSearched ? (
//                                 <TableRow><TableCell colSpan={11} align="center">Please select a date range and click "Generate Report".</TableCell></TableRow>
//                             ) : filteredRows.length > 0 ? (
//                                 filteredRows
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row, index) => (
//                                         <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell>{row["Employee ID"]}</TableCell>
//                                             <TableCell>{row["Name"]}</TableCell>
//                                             <TableCell>{row["Department"]}</TableCell>
//                                             <TableCell>{row["Designation"]}</TableCell>
//                                             <TableCell>{row["Division"] ?? "N/A"}</TableCell>
//                                             <TableCell>{row["Sub-Division"]}</TableCell>
//                                             <TableCell>{row["Level"]}</TableCell>
//                                             <TableCell>{row["Headquarter"]}</TableCell>
//                                             <TableCell>{row["Line Manager"]}</TableCell>
//                                             <TableCell>{row["D.O.J"]}</TableCell>
//                                         </TableRow>
//                                     ))
//                             ) : (
//                                 <TableRow><TableCell colSpan={11} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* Pagination */}
//                 <TablePagination
//                     component="div"
//                     count={filteredRows.length}
//                     page={page}
//                     onPageChange={(e, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleRowsPerPageChange}
//                     rowsPerPageOptions={[]}
//                 />
//             </Box>
//         </LocalizationProvider>
//     );
// }     /////// 



// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Button,
//     Stack, // CHANGED: Imported Stack for responsive layouts
//     Typography,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     CircularProgress,
//     Alert,
//     TableFooter,
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// export default function NewJoinerReport() {
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [search, setSearch] = useState("");
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     useEffect(() => {
//         if (fromDate && toDate && fromDate.isAfter(toDate)) {
//             setToDate(null);
//         }
//     }, [fromDate, toDate]);

//     const fetchData = async () => {
//         if (!fromDate || !toDate) {
//             setError("Please select both 'From Date' and 'To Date'.");
//             setHasSearched(true);
//             setRows([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setRows([]);
//         try {
//             const res = await fetch(
//                 "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         from: fromDate.format("YYYY-MM-DD"),
//                         to: toDate.format("YYYY-MM-DD"),
//                     }),
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();
//             setRows(Array.isArray(data) ? data : []);
//             setPage(0);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             setError("Failed to fetch report data. Please try again later.");
//             setRows([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const exportToExcel = () => {
//         if (rows.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(rows);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
//         XLSX.writeFile(workbook, "new_joiner_report.xlsx");
//     };

//     const filteredRows = rows.filter(
//         (row) =>
//             row["Employee ID"]?.toLowerCase().includes(search.toLowerCase()) ||
//             row["Name"]?.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7",
//         color: "#fff",
//         padding: '8px 14px',
//         whiteSpace: 'nowrap',
//         "&:hover": { backgroundColor: "#5e35b1" },
//         "&.Mui-disabled": {
//             backgroundColor: "#b39ddb",
//             color: "#f5f5f5"
//         }
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box p={3}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     New Joiner Report
//                 </Typography>

//                 {/* CHANGED: This entire section is now a responsive layout.
//                     - It's a flexbox that becomes a column on small screens (`lg` breakpoint).
//                     - Items inside use `Stack` to wrap and stack gracefully.
//                 */}
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', lg: 'row' }, // Stacks vertically on small screens, row on large
//                         justifyContent: 'space-between',
//                         alignItems: { xs: 'stretch', lg: 'center' }, // Stretches items on small, centers on large
//                         gap: 2,
//                         mb: 3,
//                     }}
//                 >
//                     {/* Group for all the main filters and actions */}
//                     <Stack
//                         direction={{ xs: 'column', sm: 'row' }} // Stacks vertically on extra-small, row on small and up
//                         spacing={2}
//                         alignItems="center"
//                         flexWrap="wrap" // Allows items to wrap to the next line if space is tight
//                     >
//                         <FormControl size="small" sx={{ minWidth: 90 }}>
//                             <InputLabel>Rows</InputLabel>
//                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                 <MenuItem value={5}>5</MenuItem>
//                                 <MenuItem value={10}>10</MenuItem>
//                                 <MenuItem value={25}>25</MenuItem>
//                                 <MenuItem value={50}>50</MenuItem>
//                             </Select>
//                         </FormControl>

//                         <DatePicker
//                             label="From Date"
//                             value={fromDate}
//                             onChange={(newValue) => setFromDate(newValue)}
//                             slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
//                         />
//                         <DatePicker
//                             label="To Date"
//                             value={toDate}
//                             onChange={(newValue) => setToDate(newValue)}
//                             slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
//                             minDate={fromDate}
//                             disabled={!fromDate}
//                         />
//                         <Button
//                             variant="contained"
//                             sx={purpleButtonStyle}
//                             onClick={fetchData}
//                             disabled={!fromDate || !toDate || loading}
//                         >
//                             Generate Report
//                         </Button>
//                         <Button
//                             variant="contained"
//                             sx={purpleButtonStyle}
//                             onClick={exportToExcel}
//                             disabled={rows.length === 0}
//                         >
//                             Export Excel
//                         </Button>
//                     </Stack>

//                     {/* Search field, which will be at the end on large screens or on its own line on small screens */}
//                     <TextField
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         sx={{ width: { xs: '100%', lg: 'auto' }, minWidth: { lg: 220 } }} // Full width on small, auto on large
//                     />
//                 </Box>


//                 {/* Table and Pagination (No changes needed here) */}
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 600 }}>Sr No</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Division</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Sub-Division</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Headquarter</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Line Manager</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>D.O.J</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow><TableCell colSpan={11} align="center"><CircularProgress /></TableCell></TableRow>
//                             ) : error ? (
//                                 <TableRow><TableCell colSpan={11} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                             ) : !hasSearched ? (
//                                 <TableRow><TableCell colSpan={11} align="center">Please select a date range and click "Generate Report".</TableCell></TableRow>
//                             ) : filteredRows.length > 0 ? (
//                                 filteredRows
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row, index) => (
//                                         <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell>{row["Employee ID"]}</TableCell>
//                                             <TableCell>{row["Name"]}</TableCell>
//                                             <TableCell>{row["Department"]}</TableCell>
//                                             <TableCell>{row["Designation"]}</TableCell>
//                                             <TableCell>{row["Division"] ?? "N/A"}</TableCell>
//                                             <TableCell>{row["Sub-Division"]}</TableCell>
//                                             <TableCell>{row["Level"]}</TableCell>
//                                             <TableCell>{row["Headquarter"]}</TableCell>
//                                             <TableCell>{row["Line Manager"]}</TableCell>
//                                             <TableCell>{row["D.O.J"]}</TableCell>
//                                         </TableRow>
//                                     ))
//                             ) : (
//                                 <TableRow><TableCell colSpan={11} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                             )}
//                         </TableBody>
//                         {filteredRows.length > 0 && (
//                             <TableFooter>
//                                 <TableRow>
//                                     <TableCell colSpan={11} align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
//                                         Total Entries: {filteredRows.length}
//                                     </TableCell>
//                                 </TableRow>
//                             </TableFooter>
//                         )}
//                     </Table>
//                 </TableContainer>

//                 <TablePagination
//                     component="div"
//                     count={filteredRows.length}
//                     page={page}
//                     onPageChange={(e, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleRowsPerPageChange}
//                     rowsPerPageOptions={[]}
//                 />
//             </Box>
//         </LocalizationProvider>
//     );
// }     ////// 



// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Button,
//     Typography,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     CircularProgress,
//     Alert,
//     TableFooter,
//     Grid,
//     Stack,
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// export default function NewJoinerReport() {
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [search, setSearch] = useState("");
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     useEffect(() => {
//         if (fromDate && toDate && fromDate.isAfter(toDate)) {
//             setToDate(null);
//         }
//     }, [fromDate, toDate]);

//     const fetchData = async () => {
//         if (!fromDate || !toDate) {
//             setError("Please select both 'From Date' and 'To Date'.");
//             setHasSearched(true);
//             setRows([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setRows([]);
//         try {
//             const res = await fetch(
//                 "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         from: fromDate.format("YYYY-MM-DD"),
//                         to: toDate.format("YYYY-MM-DD"),
//                     }),
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();
//             setRows(Array.isArray(data) ? data : []);
//             setPage(0);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             setError("Failed to fetch report data. Please try again later.");
//             setRows([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const exportToExcel = () => {
//         if (rows.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(rows);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
//         XLSX.writeFile(workbook, "new_joiner_report.xlsx");
//     };

//     const filteredRows = rows.filter(
//         (row) =>
//             row["Employee ID"]?.toLowerCase().includes(search.toLowerCase()) ||
//             row["Name"]?.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7",
//         color: "#fff",
//         padding: '8px 14px',
//         whiteSpace: 'nowrap',
//         textTransform: 'none',
//         "&:hover": { backgroundColor: "#5e3b1" },
//         "&.Mui-disabled": {
//             backgroundColor: "#b39ddb",
//             color: "#f5f5f5"
//         }
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box p={3} sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     New Joiner Report
//                 </Typography>

//                 {/* --- REFACTORED COMPACT & RESPONSIVE FILTER SECTION --- */}
//                 <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>

//                     {/* Group 1: Rows Dropdown and Export Button */}
//                     <Grid item xs={12} sm={4} md="auto">
//                         <Stack spacing={1} sx={{ minWidth: 120 }}>
//                             <FormControl size="small" fullWidth>
//                                 <InputLabel>Rows</InputLabel>
//                                 <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                     <MenuItem value={5}>5</MenuItem>
//                                     <MenuItem value={10}>10</MenuItem>
//                                     <MenuItem value={25}>25</MenuItem>
//                                     <MenuItem value={50}>50</MenuItem>
//                                 </Select>
//                             </FormControl>
//                             <Button
//                                 fullWidth
//                                 variant="contained"
//                                 sx={purpleButtonStyle}
//                                 onClick={exportToExcel}
//                                 disabled={rows.length === 0}
//                             >
//                                 Export Excel
//                             </Button>
//                         </Stack>
//                     </Grid>

//                     {/* Group 2: Date Pickers and Buttons */}
//                     <Grid item xs={12} sm={8} md="auto">
//                         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
//                             <DatePicker
//                                 label="From Date"
//                                 value={fromDate}
//                                 onChange={(newValue) => setFromDate(newValue)}
//                                 slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
//                             />
//                             <DatePicker
//                                 label="To Date"
//                                 value={toDate}
//                                 onChange={(newValue) => setToDate(newValue)}
//                                 slotProps={{ textField: { size: 'small', sx: { minWidth: 180 } } }}
//                                 minDate={fromDate}
//                                 disabled={!fromDate}
//                             />
//                             <Button
//                                 variant="contained"
//                                 sx={{ ...purpleButtonStyle, height: '40px' }}
//                                 onClick={fetchData}
//                                 disabled={!fromDate || !toDate || loading}
//                             >
//                                 Generate Report
//                             </Button>
//                         </Stack>
//                     </Grid>

//                     {/* Group 3: Search Field (compact width) */}
//                     <Grid item xs={12} sm={12} md={3}>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             variant="outlined"
//                             placeholder="Search..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             sx={{ minWidth: 200 }}
//                         />
//                     </Grid>
//                 </Grid>


//                 {/* Table and Pagination */}
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 600 }}>Sr No</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Division</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Sub-Division</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Level</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Headquarter</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>Line Manager</TableCell>
//                                 <TableCell sx={{ fontWeight: 600 }}>D.O.J</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow><TableCell colSpan={11} align="center"><CircularProgress /></TableCell></TableRow>
//                             ) : error ? (
//                                 <TableRow><TableCell colSpan={11} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                             ) : !hasSearched ? (
//                                 <TableRow><TableCell colSpan={11} align="center">Please select a date range and click "Generate Report".</TableCell></TableRow>
//                             ) : filteredRows.length > 0 ? (
//                                 filteredRows
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row, index) => (
//                                         <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell>{row["Employee ID"]}</TableCell>
//                                             <TableCell>{row["Name"]}</TableCell>
//                                             <TableCell>{row["Department"]}</TableCell>
//                                             <TableCell>{row["Designation"]}</TableCell>
//                                             <TableCell>{row["Division"] ?? "N/A"}</TableCell>
//                                             <TableCell>{row["Sub-Division"]}</TableCell>
//                                             <TableCell>{row["Level"]}</TableCell>
//                                             <TableCell>{row["Headquarter"]}</TableCell>
//                                             <TableCell>{row["Line Manager"]}</TableCell>
//                                             <TableCell>{row["D.O.J"]}</TableCell>
//                                         </TableRow>
//                                     ))
//                             ) : (
//                                 <TableRow><TableCell colSpan={11} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                             )}
//                         </TableBody>
//                         {filteredRows.length > 0 && (
//                             <TableFooter>
//                                 <TableRow>
//                                     <TableCell colSpan={11} align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
//                                         Total Entries: {filteredRows.length}
//                                     </TableCell>
//                                 </TableRow>
//                             </TableFooter>
//                         )}
//                     </Table>
//                 </TableContainer>

//                 <TablePagination
//                     component="div"
//                     count={filteredRows.length}
//                     page={page}
//                     onPageChange={(e, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleRowsPerPageChange}
//                     rowsPerPageOptions={[]}
//                 />
//             </Box>
//         </LocalizationProvider>
//     );
// }     /////// 






// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Button,
//     Typography,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     CircularProgress,
//     Alert,
//     TableFooter,
//     Grid,
//     Stack,
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// export default function NewJoinerReport() {
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [search, setSearch] = useState("");
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     useEffect(() => {
//         if (fromDate && toDate && fromDate.isAfter(toDate)) {
//             setToDate(null);
//         }
//     }, [fromDate, toDate]);

//     const fetchData = async () => {
//         if (!fromDate || !toDate) {
//             setError("Please select both 'From Date' and 'To Date'.");
//             setHasSearched(true);
//             setRows([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setRows([]);
//         try {
//             const res = await fetch(
//                 "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         from: fromDate.format("YYYY-MM-DD"),
//                         to: toDate.format("YYYY-MM-DD"),
//                     }),
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();
//             setRows(Array.isArray(data) ? data : []);
//             setPage(0);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             setError("Failed to fetch report data. Please try again later.");
//             setRows([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const exportToExcel = () => {
//         if (rows.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(rows);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
//         XLSX.writeFile(workbook, "new_joiner_report.xlsx");
//     };

//     const filteredRows = rows.filter(
//         (row) =>
//             row["Employee ID"]?.toLowerCase().includes(search.toLowerCase()) ||
//             row["Name"]?.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // More compact button style
//     const purpleButtonStyle = {
//         backgroundColor: "#9c27b0",
//         color: "#fff",
//         textTransform: 'none',
//         padding: '6px 16px', // Reduced vertical padding for smaller height
//         "&:hover": { backgroundColor: "#7b1fa2" },
//         "&.Mui-disabled": {
//             backgroundColor: "#e0e0e0",
//             color: "#bdbdbd"
//         }
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box p={3} sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     New Joiner Report
//                 </Typography>

//                 {/* --- COMPACT FILTER CONTROLS IN A PAPER COMPONENT --- */}
//                 <Paper sx={{ p: 2, mb: 3 }}>
//                     <Grid container spacing={2} alignItems="center" justifyContent="space-between">

//                         {/* Left Group: Report Generation Controls */}
//                         <Grid item xs={12} md="auto">
//                             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
//                                 <FormControl size="small" sx={{ minWidth: 100 }}>
//                                     <InputLabel>Rows</InputLabel>
//                                     <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                         <MenuItem value={5}>5</MenuItem>
//                                         <MenuItem value={10}>10</MenuItem>
//                                         <MenuItem value={25}>25</MenuItem>
//                                         <MenuItem value={50}>50</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                                 <DatePicker
//                                     label="From Date"
//                                     value={fromDate}
//                                     onChange={(newValue) => setFromDate(newValue)}
//                                     slotProps={{ textField: { size: 'small', sx: { width: 170 } } }}
//                                 />
//                                 <DatePicker
//                                     label="To Date"
//                                     value={toDate}
//                                     onChange={(newValue) => setToDate(newValue)}
//                                     slotProps={{ textField: { size: 'small', sx: { width: 170 } } }}
//                                     minDate={fromDate}
//                                     disabled={!fromDate}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     sx={purpleButtonStyle}
//                                     onClick={fetchData}
//                                     disabled={!fromDate || !toDate || loading}
//                                 >
//                                     Generate Report
//                                 </Button>
//                             </Stack>
//                         </Grid>

//                         {/* Right Group: Search and Export Controls */}
//                         <Grid item xs={12} md="auto">
//                             <Stack direction="row" spacing={1.5} alignItems="center">
//                                 <TextField
//                                     size="small"
//                                     variant="outlined"
//                                     placeholder="Search..."
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                     sx={{ width: 220 }}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     sx={purpleButtonStyle}
//                                     onClick={exportToExcel}
//                                     disabled={rows.length === 0}
//                                 >
//                                     Export Excel
//                                 </Button>
//                             </Stack>
//                         </Grid>
//                     </Grid>
//                 </Paper>

//                 {/* Table and Pagination */}
//                 <Paper elevation={2}>
//                     <TableContainer>
//                         <Table stickyHeader>
//                             <TableHead>
//                                 <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#eeeeee', fontWeight: 'bold' } }}>
//                                     <TableCell>Sr No</TableCell>
//                                     <TableCell>Employee ID</TableCell>
//                                     <TableCell>Name</TableCell>
//                                     <TableCell>Department</TableCell>
//                                     <TableCell>Designation</TableCell>
//                                     <TableCell>Division</TableCell>
//                                     <TableCell>Sub-Division</TableCell>
//                                     <TableCell>Level</TableCell>
//                                     <TableCell>Headquarter</TableCell>
//                                     <TableCell>Line Manager</TableCell>
//                                     <TableCell>D.O.J</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow><TableCell colSpan={11} align="center"><CircularProgress /></TableCell></TableRow>
//                                 ) : error ? (
//                                     <TableRow><TableCell colSpan={11} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                                 ) : !hasSearched ? (
//                                     <TableRow><TableCell colSpan={11} align="center">Please select a date range and click "Generate Report".</TableCell></TableRow>
//                                 ) : filteredRows.length > 0 ? (
//                                     filteredRows
//                                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                         .map((row, index) => (
//                                             <TableRow key={index} hover sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}>
//                                                 <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                                 <TableCell>{row["Employee ID"]}</TableCell>
//                                                 <TableCell>{row["Name"]}</TableCell>
//                                                 <TableCell>{row["Department"]}</TableCell>
//                                                 <TableCell>{row["Designation"]}</TableCell>
//                                                 <TableCell>{row["Division"] ?? "N/A"}</TableCell>
//                                                 <TableCell>{row["Sub-Division"]}</TableCell>
//                                                 <TableCell>{row["Level"]}</TableCell>
//                                                 <TableCell>{row["Headquarter"]}</TableCell>
//                                                 <TableCell>{row["Line Manager"]}</TableCell>
//                                                 <TableCell>{row["D.O.J"]}</TableCell>
//                                             </TableRow>
//                                         ))
//                                 ) : (
//                                     <TableRow><TableCell colSpan={11} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                                 )}
//                             </TableBody>
//                             {filteredRows.length > 0 && (
//                                 <TableFooter>
//                                     <TableRow>
//                                         <TableCell colSpan={11} align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
//                                             Total Entries: {filteredRows.length}
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableFooter>
//                             )}
//                         </Table>
//                     </TableContainer>

//                     <TablePagination
//                         component="div"
//                         count={filteredRows.length}
//                         page={page}
//                         onPageChange={(e, newPage) => setPage(newPage)}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={handleRowsPerPageChange}
//                         rowsPerPageOptions={[5, 10, 25, 50]}
//                     />
//                 </Paper>
//             </Box>
//         </LocalizationProvider>
//     );
// }





// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Button,
//     Typography,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     CircularProgress,
//     Grid,
//     Stack,
//     Skeleton,
//     useTheme,
//     useMediaQuery,
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import Swal from 'sweetalert2';

// export default function NewJoinerReport() {
//     const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
//     const [toDate, setToDate] = useState(dayjs());
//     const [search, setSearch] = useState("");
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(true); // Set to true initially for the first load
//     const [hasSearched, setHasSearched] = useState(false);

//     // Responsive Design Hooks
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     // Initial data fetch on component mount
//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const fetchData = async () => {
//         setLoading(true);
//         setHasSearched(true);
//         try {
//             const res = await fetch(
//                 "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         from: fromDate.format("YYYY-MM-DD"),
//                         to: toDate.format("YYYY-MM-DD"),
//                     }),
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();
//             setRows(Array.isArray(data) ? data : []);
//             setPage(0);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Failed',
//                 text: 'Failed to fetch report data. Please try again later.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             setRows([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const exportToExcel = () => {
//         if (filteredRows.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(filteredRows);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
//         XLSX.writeFile(workbook, "new_joiner_report.xlsx");

//         Swal.fire({
//             icon: 'success',
//             title: 'Exported!',
//             text: 'The report has been successfully exported to Excel.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//     };

//     const filteredRows = rows.filter(
//         (row) =>
//             row["Employee ID"]?.toString().toLowerCase().includes(search.toLowerCase()) ||
//             row["Name"]?.toLowerCase().includes(search.toLowerCase())
//     );

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // Style for action buttons as per the design system
//     const primaryButtonStyle = {
//         backgroundColor: "#8C257C",
//         color: "#fff",
//         textTransform: 'none',
//         padding: '6px 16px',
//         "&:hover": { backgroundColor: "#6d1d60" },
//         "&.Mui-disabled": {
//             backgroundColor: "#e0e0e0",
//             color: "#bdbdbd"
//         }
//     };

//     const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box p={2} sx={{  minHeight: '100vh' }}>
//                 <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#8C257C', mb: 4 }}>
//                     New Joiner Report
//                 </Typography>

//                 <Paper sx={{ p: 2, mb: 2 }}>
//                     <Grid container spacing={2} alignItems="center" justifyContent="space-between" direction={isMobile ? "column" : "row"}>
//                         <Grid item xs={12} md="auto">
//                             <Stack direction={isMobile ? "column" : "row"} spacing={1.5} alignItems="center">
//                                 <DatePicker
//                                     label="From Date"
//                                     value={fromDate}
//                                     onChange={(newValue) => setFromDate(newValue)}
//                                     slotProps={{ textField: { size: 'small', fullWidth: isMobile } }}
//                                 />
//                                 <DatePicker
//                                     label="To Date"
//                                     value={toDate}
//                                     onChange={(newValue) => setToDate(newValue)}
//                                     slotProps={{ textField: { size: 'small', fullWidth: isMobile } }}
//                                     minDate={fromDate}
//                                     disabled={!fromDate}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     sx={primaryButtonStyle}
//                                     onClick={fetchData}
//                                     disabled={!fromDate || !toDate || loading}
//                                 >
//                                     {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Report'}
//                                 </Button>
//                             </Stack>
//                         </Grid>
//                         <Grid item xs={12} md="auto">
//                             <Stack direction="row" spacing={1.5} alignItems="center" width={isMobile ? '100%' : 'auto'}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     variant="outlined"
//                                     placeholder="Search by ID or Name..."
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     sx={primaryButtonStyle}
//                                     onClick={exportToExcel}
//                                     disabled={filteredRows.length === 0}
//                                 >
//                                     Export Excel
//                                 </Button>
//                             </Stack>
//                         </Grid>
//                     </Grid>
//                 </Paper>

//                 <Paper elevation={2}>
//                     <TableContainer>
//                         <Table stickyHeader>
//                             <TableHead>
//                                 <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
//                                     <TableCell>Sr No</TableCell>
//                                     <TableCell>Employee ID</TableCell>
//                                     <TableCell>Name</TableCell>
//                                     <TableCell>Department</TableCell>
//                                     <TableCell>Designation</TableCell>
//                                     <TableCell>D.O.J</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : paginatedRows.length > 0 ? (
//                                     paginatedRows.map((row, index) => (
//                                         <TableRow key={row["Employee ID"] || index} hover sx={{ "&:nth-of-type(odd)": { backgroundColor: "" } }}>
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell>{row["Employee ID"]}</TableCell>
//                                             <TableCell>{row["Name"]}</TableCell>
//                                             <TableCell>{row["Department"]}</TableCell>
//                                             <TableCell>{row["Designation"]}</TableCell>
//                                             <TableCell>{row["D.O.J"]}</TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={6} align="center">
//                                             {hasSearched ? "No data available for the selected criteria." : "Please generate a report."}
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>

//                 {/* --- CUSTOM PAGINATION & FOOTER --- */}
//                 {!loading && filteredRows.length > 0 && (
//                     <Box
//                         sx={{
//                             p: 2,
//                             display: 'flex',
//                             flexDirection: isMobile ? 'column' : 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             gap: 2,
//                         }}
//                     >
//                         <Typography variant="body2" color="text.secondary">
//                             Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of {filteredRows.length} results
//                         </Typography>
//                         <TablePagination
//                             component="div"
//                             count={filteredRows.length}
//                             page={page}
//                             onPageChange={handlePageChange}
//                             rowsPerPage={rowsPerPage}
//                             onRowsPerPageChange={handleRowsPerPageChange}
//                             rowsPerPageOptions={[5, 10, 15, 25]}
//                             sx={{
//                                 '& .MuiTypography-root': { color: '#8C257C' },
//                                 '& .MuiSvgIcon-root': { color: '#8C257C' },
//                             }}
//                         />
//                     </Box>
//                 )}
//             </Box>
//         </LocalizationProvider>
//     );
// }




// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Button,
//     Typography,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     CircularProgress,
//     Grid,
//     Stack,
//     Skeleton,
//     useTheme,
//     useMediaQuery,
//     FormControl, // Added import
//     Select,      // Added import
//     MenuItem,    // Added import
//     Pagination   // Added import
// } from "@mui/material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import Swal from 'sweetalert2';

// export default function NewJoinerReport() {
//     const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
//     const [toDate, setToDate] = useState(dayjs());
//     const [search, setSearch] = useState("");
//     const [rows, setRows] = useState([]);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [loading, setLoading] = useState(true);
//     const [hasSearched, setHasSearched] = useState(false);

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const fetchData = async () => {
//         setLoading(true);
//         setHasSearched(true);
//         try {
//             const res = await fetch(
//                 "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         from: fromDate.format("YYYY-MM-DD"),
//                         to: toDate.format("YYYY-MM-DD"),
//                     }),
//                 }
//             );
//             if (!res.ok) {
//                 throw new Error(`HTTP error! status: ${res.status}`);
//             }
//             const data = await res.json();
//             setRows(Array.isArray(data) ? data : []);
//             setPage(0);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Failed',
//                 text: 'Failed to fetch report data. Please try again later.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             setRows([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const exportToExcel = () => {
//         if (filteredRows.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(filteredRows);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
//         XLSX.writeFile(workbook, "new_joiner_report.xlsx");

//         Swal.fire({
//             icon: 'success',
//             title: 'Exported!',
//             text: 'The report has been successfully exported to Excel.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//     };

//     const filteredRows = rows.filter(
//         (row) =>
//             row["Employee ID"]?.toString().toLowerCase().includes(search.toLowerCase()) ||
//             row["Name"]?.toLowerCase().includes(search.toLowerCase())
//     );

//     const handlePageChange = (event, newPage) => {
//         setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const primaryButtonStyle = {
//         backgroundColor: "#8C257C",
//         color: "#fff",
//         textTransform: 'none',
//         padding: '6px 16px',
//         "&:hover": { backgroundColor: "#6d1d60" },
//         "&.Mui-disabled": {
//             backgroundColor: "#e0e0e0",
//             color: "#bdbdbd"
//         }
//     };

//     const exportButtonStyle = { ...primaryButtonStyle, width: 'auto', whiteSpace: 'nowrap' };
    
//     const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
//     // Pagination display logic
//     const startEntry = filteredRows.length > 0 ? page * rowsPerPage + 1 : 0;
//     const endEntry = Math.min((page + 1) * rowsPerPage, filteredRows.length);

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box p={2} sx={{ minHeight: '100vh' }}>
//                 <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#8C257C', mb: 4 }}>
//                     New Joiner Report
//                 </Typography>

//                 <Paper sx={{ p: 2, mb: 2 }}>
//                     <Grid container spacing={2} alignItems="center" justifyContent="space-between" direction={isMobile ? "column" : "row"}>
//                         {/* ... (Your existing header controls: DatePickers, Buttons, Search) ... */}
//                         <Grid item xs={12} md="auto">
//                             <Stack direction={isMobile ? "column" : "row"} spacing={1.5} alignItems="center">
//                                 <DatePicker
//                                     label="From Date"
//                                     value={fromDate}
//                                     onChange={(newValue) => setFromDate(newValue)}
//                                     format="DD-MM-YYYY"
//                                     slotProps={{ textField: { size: 'small', fullWidth: isMobile } }}
//                                 />
//                                 <DatePicker
//                                     label="To Date"
//                                     value={toDate}
//                                     onChange={(newValue) => setToDate(newValue)}
//                                     format="DD-MM-YYYY"
//                                     slotProps={{ textField: { size: 'small', fullWidth: isMobile } }}
//                                     minDate={fromDate}
//                                     disabled={!fromDate}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     sx={primaryButtonStyle}
//                                     onClick={fetchData}
//                                     disabled={!fromDate || !toDate || loading}
//                                 >
//                                     {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Report'}
//                                 </Button>
//                             </Stack>
//                         </Grid>
//                         <Grid item xs={12} md="auto">
//                             <Stack direction="row" spacing={1.5} alignItems="center" width={isMobile ? '100%' : 'auto'}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     variant="outlined"
//                                     placeholder="Search by ID or Name..."
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)}
//                                 />
//                                 <Button
//                                     variant="contained"
//                                     sx={exportButtonStyle}
//                                     onClick={exportToExcel}
//                                     disabled={filteredRows.length === 0}
//                                 >
//                                     Export Excel
//                                 </Button>
//                             </Stack>
//                         </Grid>
//                     </Grid>
//                 </Paper>

//                 <Paper elevation={2}>
//                     <TableContainer>
//                         <Table stickyHeader>
//                              <TableHead>
//                                 <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
//                                     <TableCell>Sr No</TableCell>
//                                     <TableCell>Employee ID</TableCell>
//                                     <TableCell>Name</TableCell>
//                                     <TableCell>Department</TableCell>
//                                     <TableCell>Designation</TableCell>
//                                     <TableCell>D.O.J</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : paginatedRows.length > 0 ? (
//                                     paginatedRows.map((row, index) => (
//                                         <TableRow key={row["Employee ID"] || index} hover>
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell>{row["Employee ID"]}</TableCell>
//                                             <TableCell>{row["Name"]}</TableCell>
//                                             <TableCell>{row["Department"]}</TableCell>
//                                             <TableCell>{row["Designation"]}</TableCell>
//                                             <TableCell>{dayjs(row["D.O.J"]).format('DD-MM-YYYY')}</TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={6} align="center">
//                                             {hasSearched ? "No data available for the selected criteria." : "Please generate a report."}
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
                    
//                     {/* --- START: New Styled Pagination --- */}
//                     <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                         {loading ? (
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <Skeleton variant="text" width={200} />
//                                 <Skeleton variant="rectangular" width={300} height={40} />
//                             </Box>
//                         ) : (
//                            filteredRows.length > 0 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                                     <FormControl variant="outlined" size="small">
//                                         <Select
//                                             value={rowsPerPage}
//                                             onChange={handleRowsPerPageChange}
//                                             sx={{
//                                                 backgroundColor: '#8C257C',
//                                                 color: 'white',
//                                                 borderRadius: '4px',
//                                                 transition: 'background-color 0.3s',
//                                                 '&:hover': {
//                                                     backgroundColor: '#6d1d60',
//                                                 },
//                                                 '& .MuiOutlinedInput-notchedOutline': {
//                                                     border: 'none',
//                                                 },
//                                                 '& .MuiSvgIcon-root': {
//                                                     color: 'white',
//                                                 },
//                                             }}
//                                         >
//                                             {[5, 10, 15, 25].map((value) => (
//                                                 <MenuItem key={value} value={value}>{value}</MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                     <Typography variant="body2" color="text.secondary">
//                                        {`Showing ${startEntry} to ${endEntry} of ${filteredRows.length} results`}
//                                     </Typography>
//                                 </Box>
//                                 <Pagination
//                                     count={Math.ceil(filteredRows.length / rowsPerPage)}
//                                     page={page + 1}
//                                     onChange={handlePageChange}
//                                     showFirstButton
//                                     showLastButton
//                                     sx={{
//                                         '& .MuiPaginationItem-root': {
//                                             borderRadius: '4px',
//                                             transition: 'background-color 0.3s, color 0.3s',
//                                             '&:hover': {
//                                                 backgroundColor: '#F58E35', // Secondary color from example
//                                                 color: 'white',
//                                             }
//                                         },
//                                         '& .MuiPaginationItem-page': {
//                                             color: '#8C257C',
//                                             '&.Mui-selected': {
//                                                 backgroundColor: '#8C257C',
//                                                 color: 'white',
//                                                 '&:hover': {
//                                                     backgroundColor: '#F58E35',
//                                                 }
//                                             },
//                                         },
//                                          '& .MuiPaginationItem-icon': {
//                                             color: '#8C257C',
//                                         }
//                                     }}
//                                 />
//                             </Box>
//                            )
//                         )}
//                     </Box>
//                     {/* --- END: New Styled Pagination --- */}
//                 </Paper>
//             </Box>
//         </LocalizationProvider>
//     );
// }







import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Grid,
    Stack,
    Skeleton,
    useTheme,
    useMediaQuery,
    FormControl,
    Select,
    MenuItem,
    Pagination
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function NewJoinerReport() {
    const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
    const [toDate, setToDate] = useState(dayjs());
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setHasSearched(true);
        try {
            const res = await fetch(
                "https://tdtlworld.com/hrms-backend/api/new-joiner-report/",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        from: fromDate.format("YYYY-MM-DD"),
                        to: toDate.format("YYYY-MM-DD"),
                    }),
                }
            );
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setRows(Array.isArray(data) ? data : []);
            setPage(0);
        } catch (err) {
            console.error("Error fetching data:", err);
            Swal.fire({
                icon: 'error',
                title: 'Fetch Failed',
                text: 'Failed to fetch report data. Please try again later.',
                timer: 3000,
                showConfirmButton: false,
            });
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredRows = rows.filter(
        (row) =>
            row["Employee ID"]?.toString().toLowerCase().includes(search.toLowerCase()) ||
            row["Name"]?.toLowerCase().includes(search.toLowerCase())
    );

    const exportToExcel = () => {
        if (filteredRows.length === 0) return;
        const worksheet = XLSX.utils.json_to_sheet(filteredRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "New Joiner Report");
        XLSX.writeFile(workbook, "new_joiner_report.xlsx");

        Swal.fire({
            icon: 'success',
            title: 'Exported!',
            text: 'The report has been successfully exported to Excel.',
            timer: 3000,
            showConfirmButton: false,
        });
    };

    const exportToPdf = () => {
        if (filteredRows.length === 0) return;

        const doc = new jsPDF();
        doc.text("New Joiner Report", 14, 16);

        const tableColumn = ["Sr No", "Employee ID", "Name", "Department", "Designation", "D.O.J"];
        const tableRows = [];

        filteredRows.forEach((row, index) => {
            const rowData = [
                index + 1,
                row["Employee ID"],
                row["Name"],
                row["Department"],
                row["Designation"],
                dayjs(row["D.O.J"]).format('DD-MM-YYYY'),
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("new_joiner_report.pdf");

        Swal.fire({
            icon: 'success',
            title: 'Exported!',
            text: 'The report has been successfully exported to PDF.',
            timer: 3000,
            showConfirmButton: false,
        });
    };


    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const primaryButtonStyle = {
        backgroundColor: "#8C257C",
        color: "#fff",
        textTransform: 'none',
        padding: '6px 16px',
        "&:hover": { backgroundColor: "#6d1d60" },
        "&.Mui-disabled": {
            backgroundColor: "#e0e0e0",
            color: "#bdbdbd"
        }
    };

    const exportButtonStyle = { ...primaryButtonStyle, width: 'auto', whiteSpace: 'nowrap' };

    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const startEntry = filteredRows.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredRows.length);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box p={2} sx={{ minHeight: '100vh' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#8C257C', mb: 4 }}>
                    New Joiner Report
                </Typography>

                <Paper sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Stack direction={isMobile ? "column" : "row"} spacing={1.5} alignItems="center" >
                                <DatePicker
                                
                                    label="From Date"
                                    value={fromDate}
                                    onChange={(newValue) => setFromDate(newValue)}
                                    format="DD-MM-YYYY"
                                    slotProps={{ textField: { size: 'small', fullWidth: isMobile } }}
                                />
                                <DatePicker
                                    label="To Date"
                                    value={toDate}
                                    onChange={(newValue) => setToDate(newValue)}
                                    format="DD-MM-YYYY"
                                    slotProps={{ textField: { size: 'small', fullWidth: isMobile } }}
                                    minDate={fromDate}
                                    disabled={!fromDate}
                                />
                                <Button
                                    variant="contained"
                                    sx={primaryButtonStyle}
                                    onClick={fetchData}
                                    disabled={!fromDate || !toDate || loading}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Report'}
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Button
                                    variant="contained"
                                    sx={exportButtonStyle}
                                    onClick={exportToPdf}
                                    disabled={filteredRows.length === 0}
                                >
                                     PDF
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={exportButtonStyle}
                                    onClick={exportToExcel}
                                    disabled={filteredRows.length === 0}
                                >
                                     Excel
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                            <TextField
                                sx={{ maxWidth: isMobile ? '100%' : '300px' }}
                                fullWidth
                                size="small"
                                variant="outlined"
                                placeholder="Search by ID or Name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper elevation={2}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
                                    <TableCell>SR. NO.</TableCell>
                                    <TableCell>EMPLOYEE ID</TableCell>
                                    <TableCell>NAME</TableCell>
                                    <TableCell>DEPARTMENT</TableCell>
                                    <TableCell>DESIGNATION</TableCell>
                                    <TableCell>D.O.J</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : paginatedRows.length > 0 ? (
                                    paginatedRows.map((row, index) => (
                                        <TableRow key={row["Employee ID"] || index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{row["Employee ID"]}</TableCell>
                                            <TableCell>{row["Name"]}</TableCell>
                                            <TableCell>{row["Department"]}</TableCell>
                                            <TableCell>{row["Designation"]}</TableCell>
                                            <TableCell>{dayjs(row["D.O.J"]).format('DD-MM-YYYY')}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            {hasSearched ? "No data available for the selected criteria." : "Please generate a report."}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Skeleton variant="text" width={200} />
                                <Skeleton variant="rectangular" width={300} height={40} />
                            </Box>
                        ) : (
                            filteredRows.length > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <FormControl variant="outlined" size="small">
                                            <Select
                                                value={rowsPerPage}
                                                onChange={handleRowsPerPageChange}
                                                sx={{
                                                    backgroundColor: '#8C257C',
                                                    color: 'white',
                                                    borderRadius: '4px',
                                                    transition: 'background-color 0.3s',
                                                    '&:hover': {
                                                        backgroundColor: '#6d1d60',
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: 'none',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: 'white',
                                                    },
                                                }}
                                            >
                                                {[5, 10, 15, 25].map((value) => (
                                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Typography variant="body2" color="text.secondary">
                                            {`Showing ${startEntry} to ${endEntry} of ${filteredRows.length} results`}
                                        </Typography>
                                    </Box>
                                    <Pagination
                                        count={Math.ceil(filteredRows.length / rowsPerPage)}
                                        page={page + 1}
                                        onChange={handlePageChange}
                                        showFirstButton
                                        showLastButton
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                borderRadius: '4px',
                                                transition: 'background-color 0.3s, color 0.3s',
                                                '&:hover': {
                                                    backgroundColor: '#F58E35',
                                                    color: 'white',
                                                }
                                            },
                                            '& .MuiPaginationItem-page': {
                                                color: '#8C257C',
                                                '&.Mui-selected': {
                                                    backgroundColor: '#8C257C',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: '#F58E35',
                                                    }
                                                },
                                            },
                                            '& .MuiPaginationItem-icon': {
                                                color: '#8C257C',
                                            }
                                        }}
                                    />
                                </Box>
                            )
                        )}
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}