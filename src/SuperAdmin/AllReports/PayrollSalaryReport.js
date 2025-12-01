// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
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
//     Paper,
//     Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// const PayrollSalaryReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // Function to fetch data when the "Generate Report" button is clicked
//     const handleFetchReport = async () => {
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const payload = {
//                 // Ensure month is a zero-padded string as per the example
//                 month: String(selectedMonth).padStart(2, '0'),
//                 year: String(selectedYear),
//             };
//             const response = await axiosInstance.post("/apis/get_employee_payroll_salary_report/", payload);
//             // The API returns a direct array
//             const rawData = Array.isArray(response.data) ? response.data : [];
//             setReportData(rawData);
//         } catch (err) {
//             setError("Failed to fetch payroll salary report. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Function to handle exporting the report to an Excel file
//     const handleExport = () => {
//         if (reportData.length === 0) return;

//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll_Report");
//         XLSX.writeFile(workbook, `Payroll_Salary_Report_${selectedYear}_${selectedMonth}.xlsx`);
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
//         Object.values(row).some(value =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const columns = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
//         '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
//         '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     const currentYear = new Date().getFullYear();
//     const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);
//     const monthOptions = Array.from({ length: 12 }, (_, i) => ({
//         value: i + 1,
//         label: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
//     }));

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Payroll Salary Report
//             </Typography>

//             {/* --- SINGLE-LINE CONTROLS BAR --- */}
//             <Grid container spacing={2} mb={2} alignItems="center" justifyContent="space-between">
//                 {/* Left-aligned controls */}
//                 <Grid item>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Rows</InputLabel>
//                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                 <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl sx={{ minWidth: 120 }} variant="outlined" size="small">
//                             <InputLabel>Year</InputLabel>
//                             <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
//                                 {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                         <FormControl sx={{ minWidth: 150 }} variant="outlined" size="small">
//                             <InputLabel>Month</InputLabel>
//                             <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//                                 {monthOptions.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                         <Button variant="contained" onClick={handleFetchReport} sx={{ ...purpleButtonStyle, height: 40 }}>
//                             Generate Report
//                         </Button>
//                         {reportData.length > 0 && (
//                             <Button variant="contained" onClick={handleExport} sx={{ ...purpleButtonStyle, height: 40 }}>
//                                 Export Report
//                             </Button>
//                         )}
//                     </Box>
//                 </Grid>

//                 {/* Right-aligned Search */}
//                 <Grid item>
//                     <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} sx={{ width: 250 }} />
//                 </Grid>
//             </Grid>

//             {/* --- TABLE & PAGINATION --- */}
//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>SR. NO.</TableCell>
//                             {columns.map((colName) => <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName.replace(/_/g, ' ')}</TableCell>)}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center">Please select a year and month, then click Generate Report.</TableCell></TableRow>
//                         ) : filteredData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.employee_id + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                     {columns.map(colName => (
//                                         <TableCell key={colName}>{row[colName] ?? 'N/A'}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default PayrollSalaryReport;   ///








// import React, { useState, useMemo } from "react"; // Added useMemo
// import {
//     Box,
//     Typography,
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
//     Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // NEW: Helper function to generate financial year options dynamically in descending order
// const generateFinancialYearOptions = () => {
//     const years = [];
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth(); // 0 = January, 3 = April

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//     // Generate last 6 financial years
//     for (let i = 0; i < 6; i++) {
//         years.push(String(latestFinancialYearStart - i));
//     }
//     // FIXED: Added the missing return statement
//     return years;
// };


// const PayrollSalaryReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
//     const [selectedMonth, setSelectedMonth] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // Function to fetch data when the "Generate Report" button is clicked
//     const handleFetchReport = async () => {
//         if (!selectedFinancialYear || !selectedMonth) {
//             setError("Please select both a Financial Year and a Month.");
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const payload = {
//                 month: String(selectedMonth).padStart(2, '0'),
//                 year: String(selectedFinancialYear),
//             };
//             const response = await axiosInstance.post("/apis/get_employee_payroll_salary_report/", payload);
//             const rawData = Array.isArray(response.data) ? response.data : [];
//             setReportData(rawData);
//         } catch (err) {
//             setError("Failed to fetch payroll salary report. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//             setPage(0); // Reset to first page on new search
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
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll_Report");
//         XLSX.writeFile(workbook, `Payroll_Salary_Report_${selectedFinancialYear}_${selectedMonth}.xlsx`);
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
//         Object.values(row).some(value =>
//             String(value).toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const columns = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7', color: '#fff', height: 40,
//         '&:hover': { backgroundColor: '#5e35b1' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
//     const monthOptions = Array.from({ length: 12 }, (_, i) => ({
//         value: i + 1,
//         label: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
//     }));

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Payroll Salary Report 
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center" justifyContent="space-between">
//                 <Grid item>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                         <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Rows</InputLabel>
//                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                 <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl sx={{ minWidth: 150 }} variant="outlined" size="small">
//                             <InputLabel>Financial Year</InputLabel>
//                             <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
//                                 {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                         <FormControl sx={{ minWidth: 150 }} variant="outlined" size="small">
//                             <InputLabel>Month</InputLabel>
//                             <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//                                 {monthOptions.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                         <Button
//                             variant="contained"
//                             onClick={handleFetchReport}
//                             sx={purpleButtonStyle}
//                             disabled={!selectedFinancialYear || !selectedMonth || loading}
//                         >
//                             Generate Report
//                         </Button>
//                         {reportData.length > 0 && (
//                             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//                                 Export Report
//                             </Button>
//                         )}
//                     </Box>
//                 </Grid>

//                 <Grid item>
//                     <TextField variant="outlined" size="small" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} sx={{ width: 250 }} />
//                 </Grid>
//             </Grid>

//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>SR. NO.</TableCell>
//                             {columns.map((colName) => <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName.replace(/_/g, ' ')}</TableCell>)}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center">Please select a financial year and month, then click Generate Report.</TableCell></TableRow>
//                         ) : filteredData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.employee_id ? `${row.employee_id}-${index}` : index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                     {columns.map(colName => (
//                                         <TableCell key={colName}>{row[colName] ?? 'N/A'}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length + 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//                 </Box>
//             )}
//         </Container>
//     );
// };

// export default PayrollSalaryReport;








import React, { useState, useMemo } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from "xlsx";

// Helper function to generate financial year options
const generateFinancialYearOptions = () => {
    const years = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    for (let i = 0; i < 6; i++) {
        years.push(String(latestFinancialYearStart - i));
    }
    return years;
};

const PayrollSalaryReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching ---
    const handleFetchReport = async () => {
        if (!selectedFinancialYear || !selectedMonth) {
            setError("Please select both a Financial Year and a Month.");
            setHasSearched(true);
            setReportData([]);
            return;
        }
        setLoading(true); setError(null); setHasSearched(true); setReportData([]);
        try {
            const payload = {
                month: String(selectedMonth).padStart(2, '0'),
                year: String(selectedFinancialYear),
            };
            const response = await axiosInstance.post("/apis/get_employee_payroll_salary_report/", payload);
            setReportData(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            setError("Failed to fetch payroll salary report. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    // --- Constants and Options ---
    const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
    const monthOptions = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(0, i).toLocaleString('en-US', { month: 'long' }) }));
    const columns = useMemo(() => (reportData.length > 0 ? Object.keys(reportData[0]) : []), [reportData]);

    // --- Memoized Calculations & Event Handlers ---
    const filteredData = useMemo(() => reportData.filter((row) => Object.values(row).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))), [reportData, searchTerm]);
    const paginatedData = useMemo(() => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredData, page, rowsPerPage]);

    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

    // --- EXPORT FUNCTIONALITY ---
    const handleExport = () => {
        if (filteredData.length === 0) return;
        const dataToExport = filteredData.map((row, index) => ({
            "SR. NO.": index + 1,
            ...row,
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll_Report");
        XLSX.writeFile(workbook, `Payroll_Salary_Report_${selectedFinancialYear}_${selectedMonth}.xlsx`);
    };

    // --- STYLING & CONSTANTS ---
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textTransform: 'uppercase', whiteSpace: 'nowrap' };
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Payroll Salary Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2} flexWrap="wrap">
                    <FormControl size="small" sx={{ minWidth: 200, flexGrow: 1 }}>
                        <InputLabel>Financial Year</InputLabel>
                        <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
                            {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 200, flexGrow: 1 }}>
                        <InputLabel>Month</InputLabel>
                        <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
                            {monthOptions.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={handleFetchReport} disabled={!selectedFinancialYear || !selectedMonth || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
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
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerCellStyle}>SR. NO.</TableCell>
                                    {columns.map((colName) => <TableCell key={colName} sx={headerCellStyle}>{colName.replace(/_/g, ' ')}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            {[...Array(columns.length || 15)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                        </TableRow>
                                    ))
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((row, index) => (
                                        <TableRow key={row.employee_id ? `${row.employee_id}-${index}` : index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            {columns.map(colName => <TableCell key={colName}>{row[colName] ?? 'N/A'}</TableCell>)}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={columns.length + 1} align="center">{error ? error : "No data available for the selected criteria."}</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {filteredData.length > 0 && (
                        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <FormControl variant="outlined" size="small">
                                        <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: '#8C257C', color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: '#8C257C' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                                            {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Typography variant="body2" color="text.secondary">{`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}</Typography>
                                </Box>
                                <TextField size="small" variant="outlined" placeholder="Search in results..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
                                <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default PayrollSalaryReport;