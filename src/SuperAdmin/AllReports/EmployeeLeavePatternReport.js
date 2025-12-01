






// import React, { useState, useMemo } from "react"; // Added useMemo
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
// import * as XLSX from "xlsx";

// const EmployeeLeavePatternReport = () => {
//     // State for data, loading, and errors
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     // CHANGED: selectedYear is now empty by default
//     const [selectedYear, setSelectedYear] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         // Validation to ensure a year is selected
//         if (!selectedYear) {
//             setError("Please select a year to generate the report.");
//             setHasSearched(true);
//             setReportData([]); // Clear data on validation failure
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const response = await axiosInstance.post(
//                 "/api/employee_leave_pattern/",
//                 { year: selectedYear }
//             );
//             if (response.data && response.data.status === "success") {
//                 setReportData(Array.isArray(response.data.data) ? response.data.data : []);
//             } else {
//                 throw new Error("Invalid data format received from the server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch leave pattern data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeavePatternReport");
//         XLSX.writeFile(workbook, `EmployeeLeavePatternReport_${selectedYear}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) =>
//         row.month.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const paginatedData = filteredData.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     // CHANGED: Generate years in descending order then reverse for ascending
//     const yearOptions = useMemo(() =>
//         Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).reverse(),
//         []);

//     const columns = [
//         { id: "sr_no", label: "SR. NO." },
//         { id: "month", label: "MONTH" },
//         { id: "CL", label: "CL" },
//         { id: "ML", label: "ML" },
//         { id: "PL", label: "PL" },
//         { id: "MTL", label: "MTL" },
//         { id: "PTL", label: "PTL" },
//         { id: "LWP", label: "LWP" },
//         { id: "Total", label: "TOTAL" },
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7',
//         color: '#fff',
//         height: 40,
//         '&:hover': {
//             backgroundColor: '#5e35b1',
//         },
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Employee Leave Pattern Report
//             </Typography>

//             {/* Controls Bar */}
//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={3} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={5}>5</MenuItem>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//                     <FormControl sx={{ minWidth: 120 }} size="small">
//                         <InputLabel>Year</InputLabel>
//                         <Select
//                             value={selectedYear}
//                             label="Year"
//                             onChange={(e) => setSelectedYear(e.target.value)}
//                         >
//                             {yearOptions.map((year) => (
//                                 <MenuItem key={year} value={year}>{year}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         // CHANGED: Button is disabled until a year is selected
//                         disabled={!selectedYear || loading}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button
//                             variant="contained"
//                             onClick={handleExport}
//                             sx={purpleButtonStyle}
//                         >
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={3} md={2}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search Month..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>

//             {/* Table */}
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 900 }} stickyHeader size="small">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align="center"
//                                     sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
//                             </TableRow>
//                         ) : error ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
//                             </TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     Please select a year and click Generate Report.
//                                 </TableCell>
//                             </TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                                     {columns.map((column) => (
//                                         <TableCell key={column.id} align="center" sx={{ border: "1px solid #ddd" }}>
//                                             {column.id === 'sr_no'
//                                                 ? page * rowsPerPage + index + 1
//                                                 : row[column.id] ?? "N/A"
//                                             }
//                                         </TableCell>
//                                     ))}
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

//             {/* Pagination Controls */}
//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page - 1)}
//                             disabled={page === 0}
//                             sx={purpleButtonStyle}
//                         >
//                             Previous
//                         </Button>
//                         <Typography>
//                             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page + 1)}
//                             disabled={page >= pageCount - 1}
//                             sx={purpleButtonStyle}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default EmployeeLeavePatternReport;   //// 




// import React, { useState, useMemo } from "react";
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
//     TableFooter, // Added TableFooter for the total row
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// const EmployeeLeavePatternReport = () => {
//     // State for data, loading, and errors
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     const [selectedYear, setSelectedYear] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         if (!selectedYear) {
//             setError("Please select a year to generate the report.");
//             setHasSearched(true);
//             setReportData([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const response = await axiosInstance.post(
//                 "/api/employee_leave_pattern/",
//                 { year: selectedYear }
//             );
//             if (response.data && response.data.status === "success") {
//                 setReportData(Array.isArray(response.data.data) ? response.data.data : []);
//             } else {
//                 throw new Error("Invalid data format received from the server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch leave pattern data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeavePatternReport");
//         XLSX.writeFile(workbook, `EmployeeLeavePatternReport_${selectedYear}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) =>
//         row.month.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const paginatedData = filteredData.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     // CHANGED: Generate years in descending order then reverse for ascending
//     const yearOptions = useMemo(() => 
//         Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).reverse(), 
//     []);

//     const columns = [
//         { id: "sr_no", label: "SR. NO." },
//         { id: "month", label: "MONTH" },
//         { id: "CL", label: "CL" },
//         { id: "ML", label: "ML" },
//         { id: "PL", label: "PL" },
//         { id: "MTL", label: "MTL" },
//         { id: "PTL", label: "PTL" },
//         { id: "LWP", label: "LWP" },
//         { id: "Total", label: "TOTAL" },
//     ];

//     // NEW: Calculate totals for numeric columns
//     const totals = useMemo(() => {
//         if (!filteredData.length > 0) return null;

//         const totalRow = {
//             'sr_no': '',
//             'month': 'Total',
//         };

//         const numericColumns = ['CL', 'ML', 'PL', 'MTL', 'PTL', 'LWP', 'Total'];

//         for (const col of numericColumns) {
//             totalRow[col] = filteredData.reduce((sum, row) => {
//                 const value = parseFloat(row[col]);
//                 return sum + (isNaN(value) ? 0 : value);
//             }, 0);
//         }

//         return totalRow;
//     }, [filteredData]);

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7',
//         color: '#fff',
//         height: 40,
//         '&:hover': {
//             backgroundColor: '#5e35b1',
//         },
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Employee Leave Pattern Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={3} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={5}>5</MenuItem>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//                     <FormControl sx={{ minWidth: 120 }} size="small">
//                         <InputLabel>Year</InputLabel>
//                         <Select
//                             value={selectedYear}
//                             label="Year"
//                             onChange={(e) => setSelectedYear(e.target.value)}
//                         >
//                             {yearOptions.map((year) => (
//                                 <MenuItem key={year} value={year}>{year}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedYear || loading}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button
//                             variant="contained"
//                             onClick={handleExport}
//                             sx={purpleButtonStyle}
//                         >
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={3} md={2}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search Month..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 900 }} stickyHeader size="small">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align="center"
//                                     sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
//                             </TableRow>
//                         ) : error ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
//                             </TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     Please select a year and click Generate Report.
//                                 </TableCell>
//                             </TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                                     {columns.map((column) => (
//                                         <TableCell key={column.id} align="center" sx={{ border: "1px solid #ddd" }}>
//                                             {column.id === 'sr_no'
//                                                 ? page * rowsPerPage + index + 1
//                                                 : row[column.id] ?? "N/A"
//                                             }
//                                         </TableCell>
//                                     ))}
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
//                     {/* NEW: Table Footer for Totals, shown only on the last page */}
//                     {totals && !loading && filteredData.length > 0 && page === pageCount - 1 && (
//                         <TableFooter>
//                             <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5', borderTop: '2px solid #ccc' } }}>
//                                 {columns.map(column => (
//                                     <TableCell key={`total-${column.id}`} align="center" sx={{ border: "1px solid #ddd" }}>
//                                         {totals[column.id]}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableFooter>
//                     )}
//                 </Table>
//             </TableContainer>

//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page - 1)}
//                             disabled={page === 0}
//                             sx={purpleButtonStyle}
//                         >
//                             Previous
//                         </Button>
//                         <Typography>
//                             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page + 1)}
//                             disabled={page >= pageCount - 1}
//                             sx={purpleButtonStyle}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default EmployeeLeavePatternReport;    //




// import React, { useState, useMemo } from "react";
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
//     TableFooter,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// // NEW: Helper function to generate financial year options dynamically
// const generateFinancialYearOptions = () => {
//     const years = [];
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth(); // 0 = January, 3 = April

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//     // Generate last 10 financial years in descending order
//     for (let i = 0; i < 6; i++) {
//         years.push(String(latestFinancialYearStart - i));
//     }
//     return years;
// };

// const EmployeeLeavePatternReport = () => {
//     // State for data, loading, and errors
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     // CHANGED: Renamed to selectedFinancialYear and initialized as empty
//     const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         // CHANGED: Validation now checks for financial year
//         if (!selectedFinancialYear) {
//             setError("Please select a financial year to generate the report.");
//             setHasSearched(true);
//             setReportData([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const response = await axiosInstance.post(
//                 "/api/employee_leave_pattern/",
//                 { year: selectedFinancialYear } // API expects the starting year
//             );
//             if (response.data && response.data.status === "success") {
//                 setReportData(Array.isArray(response.data.data) ? response.data.data : []);
//             } else {
//                 throw new Error("Invalid data format received from the server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch leave pattern data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeavePatternReport");
//         XLSX.writeFile(workbook, `EmployeeLeavePatternReport_${selectedFinancialYear}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) =>
//         row.month.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const paginatedData = filteredData.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     // CHANGED: Using the new financial year generator
//     const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

//     const columns = [
//         { id: "sr_no", label: "SR. NO." },
//         { id: "month", label: "MONTH" },
//         { id: "CL", label: "CL" },
//         { id: "ML", label: "ML" },
//         { id: "PL", label: "PL" },
//         { id: "MTL", label: "MTL" },
//         { id: "PTL", label: "PTL" },
//         { id: "LWP", label: "LWP" },
//         { id: "Total", label: "TOTAL" },
//     ];

//     const totals = useMemo(() => {
//         if (!filteredData.length > 0) return null;
//         const totalRow = { 'sr_no': '', 'month': 'Total' };
//         const numericColumns = ['CL', 'ML', 'PL', 'MTL', 'PTL', 'LWP', 'Total'];

//         for (const col of numericColumns) {
//             totalRow[col] = filteredData.reduce((sum, row) => {
//                 const value = parseFloat(row[col]);
//                 return sum + (isNaN(value) ? 0 : value);
//             }, 0);
//         }
//         return totalRow;
//     }, [filteredData]);

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7',
//         color: '#fff',
//         height: 40,
//         '&:hover': {
//             backgroundColor: '#5e35b1',
//         },
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Employee Leave Pattern Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={3} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={5}>5</MenuItem>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//                     {/* CHANGED: This is now the Financial Year dropdown */}
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select
//                             value={selectedFinancialYear}
//                             label="Financial Year"
//                             onChange={(e) => setSelectedFinancialYear(e.target.value)}
//                         >
//                             {financialYearOptions.map((year) => (
//                                 <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedFinancialYear || loading}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button
//                             variant="contained"
//                             onClick={handleExport}
//                             sx={purpleButtonStyle}
//                         >
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={3} md={2}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search Month..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>

//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 900 }} stickyHeader size="small">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align="center"
//                                     sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
//                             </TableRow>
//                         ) : error ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
//                             </TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     Please select a financial year and click Generate Report.
//                                 </TableCell>
//                             </TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                                     {columns.map((column) => (
//                                         <TableCell key={column.id} align="center" sx={{ border: "1px solid #ddd" }}>
//                                             {column.id === 'sr_no'
//                                                 ? page * rowsPerPage + index + 1
//                                                 : row[column.id] ?? "N/A"
//                                             }
//                                         </TableCell>
//                                     ))}
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
//                     {totals && !loading && filteredData.length > 0 && page === pageCount - 1 && (
//                         <TableFooter>
//                             <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5', borderTop: '2px solid #ccc' } }}>
//                                 {columns.map(column => (
//                                     <TableCell key={`total-${column.id}`} align="center" sx={{ border: "1px solid #ddd" }}>
//                                         {totals[column.id]}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableFooter>
//                     )}
//                 </Table>
//             </TableContainer>

//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page - 1)}
//                             disabled={page === 0}
//                             sx={purpleButtonStyle}
//                         >
//                             Previous
//                         </Button>
//                         <Typography>
//                             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page + 1)}
//                             disabled={page >= pageCount - 1}
//                             sx={purpleButtonStyle}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default EmployeeLeavePatternReport;    ///





// import React, { useState, useMemo } from "react";
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
//     TableFooter,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// // Helper function to generate financial year options dynamically
// const generateFinancialYearOptions = () => {
//     const years = [];
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth(); // 0 = January, 3 = April

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//     // Generate last 6 financial years in descending order
//     for (let i = 0; i < 6; i++) {
//         years.push(String(latestFinancialYearStart - i));
//     }
//     return years;
// };

// const EmployeeLeavePatternReport = () => {
//     // State for data, loading, and errors
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters
//     const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");

//     // REMOVED: Pagination states (page, rowsPerPage) are no longer needed

//     const handleFetchReport = async () => {
//         if (!selectedFinancialYear) {
//             setError("Please select a financial year to generate the report.");
//             setHasSearched(true);
//             setReportData([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const response = await axiosInstance.post(
//                 "/api/employee_leave_pattern/",
//                 { year: selectedFinancialYear }
//             );
//             if (response.data && response.data.status === "success") {
//                 setReportData(Array.isArray(response.data.data) ? response.data.data : []);
//             } else {
//                 throw new Error("Invalid data format received from the server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch leave pattern data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Columns definition
//     const columns = [
//         { id: "sr_no", label: "SR. NO." },
//         { id: "month", label: "MONTH" },
//         { id: "CL", label: "CL" },
//         { id: "ML", label: "ML" },
//         { id: "PL", label: "PL" },
//         { id: "MTL", label: "MTL" },
//         { id: "PTL", label: "PTL" },
//         { id: "LWP", label: "LWP" },
//         { id: "Total", label: "TOTAL" },
//     ];

//     // Filtered data based on search term
//     const filteredData = useMemo(() =>
//         reportData.filter((row) =>
//             row.month.toLowerCase().includes(searchTerm.toLowerCase())
//         ), [reportData, searchTerm]);

//     // Totals calculation based on filtered data
//     const totals = useMemo(() => {
//         if (!filteredData.length > 0) return null;
//         const totalRow = { 'sr_no': '', 'month': 'Total' };
//         const numericColumns = ['CL', 'ML', 'PL', 'MTL', 'PTL', 'LWP', 'Total'];

//         for (const col of numericColumns) {
//             totalRow[col] = filteredData.reduce((sum, row) => {
//                 const value = parseFloat(row[col]);
//                 return sum + (isNaN(value) ? 0 : value);
//             }, 0);
//         }
//         return totalRow;
//     }, [filteredData]);

//     // MODIFIED: handleExport function to include totals
//     const handleExport = () => {
//         if (filteredData.length === 0) return;

//         // 1. Map the filtered data to the desired format
//         const dataToExport = filteredData.map((row, index) => {
//             const newRow = {};
//             columns.forEach(col => {
//                 if (col.id === 'sr_no') {
//                     newRow[col.label] = index + 1;
//                 } else {
//                     newRow[col.label] = row[col.id];
//                 }
//             });
//             return newRow;
//         });

//         // 2. If totals exist, create a total row and push it
//         if (totals) {
//             const totalRowForExport = {};
//             columns.forEach(col => {
//                 // Use the column label as the key to match the sheet headers
//                 totalRowForExport[col.label] = totals[col.id];
//             });
//             dataToExport.push(totalRowForExport);
//         }

//         // 3. Generate the Excel file
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeavePatternReport");
//         XLSX.writeFile(workbook, `EmployeeLeavePatternReport_${selectedFinancialYear}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7',
//         color: '#fff',
//         height: 40,
//         '&:hover': {
//             backgroundColor: '#5e35b1',
//         },
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Employee Leave Pattern Report 
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 {/* REMOVED: Rows per page dropdown is gone */}
//                 <Grid item xs={12} sm={3} md={2}></Grid> {/* Empty grid item for spacing */}

//                 <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select
//                             value={selectedFinancialYear}
//                             label="Financial Year"
//                             onChange={(e) => setSelectedFinancialYear(e.target.value)}
//                         >
//                             {financialYearOptions.map((year) => (
//                                 <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedFinancialYear || loading}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button
//                             variant="contained"
//                             onClick={handleExport}
//                             sx={purpleButtonStyle}
//                         >
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={3} md={2}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search Month..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>

//             {/* MODIFIED: Set a maxHeight for scrolling on a single page */}
//             <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
//                 <Table sx={{ minWidth: 900 }} stickyHeader size="small">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align="center"
//                                     sx={{ border: "1px solid #ccc", backgroundColor: "#e3f2fd", fontWeight: 600 }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell>
//                             </TableRow>
//                         ) : error ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell>
//                             </TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length} align="center">
//                                     Please select a financial year and click Generate Report.
//                                 </TableCell>
//                             </TableRow>
//                             // MODIFIED: Render filteredData directly, not paginatedData
//                         ) : filteredData.length > 0 ? (
//                             filteredData.map((row, index) => (
//                                 <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                                     {columns.map((column) => (
//                                         <TableCell key={column.id} align="center" sx={{ border: "1px solid #ddd" }}>
//                                             {column.id === 'sr_no'
//                                                 ? index + 1 // Use direct index
//                                                 : row[column.id] ?? "N/A"
//                                             }
//                                         </TableCell>
//                                     ))}
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
//                     {/* MODIFIED: Condition no longer needs to check for the last page */}
//                     {totals && !loading && filteredData.length > 0 && (
//                         <TableFooter>
//                             <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5', borderTop: '2px solid #ccc' } }}>
//                                 {columns.map(column => (
//                                     <TableCell key={`total-${column.id}`} align="center" sx={{ border: "1px solid #ddd" }}>
//                                         {totals[column.id]}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableFooter>
//                     )}
//                 </Table>
//             </TableContainer>

//             {/* REMOVED: Pagination controls are gone */}
//         </Box>
//     );
// };

// export default EmployeeLeavePatternReport;







import React, { useState, useMemo } from "react";
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TableFooter, Stack, Alert,
    FormControl, InputLabel, Select, MenuItem, TextField, Button,
    Skeleton, useTheme, useMediaQuery
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from "xlsx";

// Helper function to generate financial year options dynamically
const generateFinancialYearOptions = () => {
    const years = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 3 = April
    let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    for (let i = 0; i < 6; i++) {
        years.push(String(latestFinancialYearStart - i));
    }
    return years;
};

const EmployeeLeavePatternReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching ---
    const handleFetchReport = async () => {
        if (!selectedFinancialYear) {
            setError("Please select a financial year to generate the report.");
            setHasSearched(true);
            setReportData([]);
            return;
        }
        setLoading(true); setError(null); setHasSearched(true); setReportData([]);
        try {
            const response = await axiosInstance.post("/api/employee_leave_pattern/", { year: selectedFinancialYear });
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

    // --- Columns & Options ---
    const columns = [
        { id: "sr_no", label: "SR. NO." }, { id: "month", label: "MONTH" },
        { id: "CL", label: "CL" }, { id: "ML", label: "ML" }, { id: "PL", label: "PL" },
        { id: "MTL", label: "MTL" }, { id: "PTL", label: "PTL" }, { id: "LWP", label: "LWP" },
        { id: "Total", label: "TOTAL" },
    ];
    const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

    // --- Memoized Calculations & Event Handlers ---
    const filteredData = useMemo(() => reportData.filter((row) => row.month.toLowerCase().includes(searchTerm.toLowerCase())), [reportData, searchTerm]);
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); };

    const totals = useMemo(() => {
        if (!filteredData.length) return null;
        const totalRow = { 'sr_no': '', 'month': 'Total' };
        const numericColumns = ['CL', 'ML', 'PL', 'MTL', 'PTL', 'LWP', 'Total'];
        for (const col of numericColumns) {
            totalRow[col] = filteredData.reduce((sum, row) => sum + (parseFloat(row[col]) || 0), 0);
        }
        return totalRow;
    }, [filteredData]);

    // --- EXPORT FUNCTIONALITY ---
    const handleExport = () => {
        if (filteredData.length === 0) return;
        const dataToExport = filteredData.map((row, index) => {
            const newRow = {};
            columns.forEach(col => {
                newRow[col.label] = (col.id === 'sr_no') ? index + 1 : row[col.id];
            });
            return newRow;
        });

        if (totals) {
            const totalRowForExport = {};
            columns.forEach(col => { totalRowForExport[col.label] = totals[col.id]; });
            dataToExport.push(totalRowForExport);
        }
        
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LeavePatternReport");
        XLSX.writeFile(workbook, `EmployeeLeavePatternReport_${selectedFinancialYear}.xlsx`);
    };
    
    // --- STYLING & CONSTANTS ---
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center', border: '1px solid #ddd' };

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Employee Leave Pattern Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2}>
                    <FormControl size="small" sx={{ minWidth: 200, flexGrow: 1 }}>
                        <InputLabel>Financial Year</InputLabel>
                        <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
                            {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={handleFetchReport} disabled={!selectedFinancialYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate Report
                    </Button>
                    <Button variant="outlined" onClick={handleExport} startIcon={<GridOnIcon />} disabled={filteredData.length === 0} sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export
                    </Button>
                </Stack>
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {hasSearched && (
                <>
                    <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
                        <Table sx={{ minWidth: 900 }} stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => <TableCell key={column.id} align="center" sx={headerCellStyle}>{column.label}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    [...Array(12)].map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {columns.map((col) => <TableCell key={col.id}><Skeleton variant="text" /></TableCell>)}
                                        </TableRow>
                                    ))
                                ) : filteredData.length > 0 ? (
                                    filteredData.map((row, index) => (
                                        <TableRow key={index} hover>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align="center">
                                                    {column.id === 'sr_no' ? index + 1 : row[column.id] ?? "N/A"}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            {error ? error : "No data available for the selected criteria."}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            {totals && !loading && filteredData.length > 0 && (
                                <TableFooter>
                                    <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5', borderTop: '2px solid #ccc' } }}>
                                        {columns.map(column => (
                                            <TableCell key={`total-${column.id}`} align="center">{totals[column.id]}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableFooter>
                            )}
                        </Table>
                    </TableContainer>

                    {filteredData.length > 0 && (
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder="Search Month..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                sx={{ width: isMobile ? '100%' : 'auto' }}
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default EmployeeLeavePatternReport;