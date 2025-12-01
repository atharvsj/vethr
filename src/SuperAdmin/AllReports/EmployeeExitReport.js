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

// // Helper to format date strings for display and API (YYYY-MM-DD)
// const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toISOString().split('T')[0];
// };

// const EmployeeExitReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // --- CHANGE 1: Initialize date states to null ---
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     // --- END OF CHANGE ---

//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // Function to fetch data when the "Generate Report" button is clicked
//     const handleFetchReport = async () => {
//         // This check is now handled by the button's disabled state, but it's good for safety
//         if (!fromDate || !toDate) {
//             setError("Please select both a 'From' and 'To' date.");
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const payload = { from: fromDate, to: toDate };
//             const response = await axiosInstance.post("/api/employee-exit-report/", payload);
//             if (response.data && response.data.status === "success") {
//                 const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//                 setReportData(rawData);
//             } else {
//                 throw new Error("Invalid response from server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch employee exit report. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Function to handle exporting the report to an Excel file
//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         // The spread operator `...row` correctly includes all fields from the JSON object.
//         const dataToExport = reportData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Exit_Report");
//         XLSX.writeFile(workbook, `Employee_Exit_Report_${fromDate}_to_${toDate}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) => {
//         const s = searchTerm.toLowerCase();
//         return (
//             row["Name"]?.toLowerCase().includes(s) ||
//             row["Employee ID"]?.toLowerCase().includes(s) ||
//             row["Department"]?.toLowerCase().includes(s) ||
//             row["Designation"]?.toLowerCase().includes(s) ||
//             row["Line Manager"]?.toLowerCase().includes(s)
//         );
//     });

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     // Mapped all fields from the JSON response to the columns array
//     const columns = [
//         "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division",
//         "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J", "Exit Type",
//         "Last Working Date", "Return Asset", "Exit Interview Questionnaire",
//         "Employee Clearance Form", "Full & Final settlement", "Relieving letter",
//         "Experience Letter"
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Employee Exit Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <TextField
//                         label="From"
//                         type="date"
//                         size="small"
//                         value={fromDate || ''} // Use || '' to ensure it's a controlled component
//                         onChange={(e) => {
//                             const newFromDate = e.target.value;
//                             setFromDate(newFromDate);
//                             if (toDate && newFromDate > toDate) {
//                                 setToDate(null);
//                             }
//                         }}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                     <TextField
//                         label="To"
//                         type="date"
//                         size="small"
//                         value={toDate || ''} // Use || ''
//                         onChange={(e) => setToDate(e.target.value)}
//                         InputLabelProps={{ shrink: true }}
//                         inputProps={{ min: fromDate || undefined }}
//                         disabled={!fromDate}
//                     />

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!fromDate || !toDate || loading}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((colName) => (
//                                 <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center">Please select a date range and click Generate Report.</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     {/* Mapped all TableCells to the corresponding data fields */}
//                                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell>{row["Employee ID"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Name"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Department"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Designation"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Division"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Sub-Division"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Level"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Headquarter"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Line Manager"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{formatDate(row["D.O.J"])}</TableCell>
//                                     <TableCell>{row["Exit Type"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{formatDate(row["Last Working Date"])}</TableCell>
//                                     <TableCell>{row["Return Asset"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Exit Interview Questionnaire"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Employee Clearance Form"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Full & Final settlement"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Relieving letter"] ?? 'N/A'}</TableCell>
//                                     <TableCell>{row["Experience Letter"] ?? 'N/A'}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={{
//                         backgroundColor: "#9c27b0", // vibrant purple
//                         "&:hover": { backgroundColor: "#7b1fa2" }, // darker shade on hover
//                     }}>Previous</Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={{
//                         backgroundColor: "#9c27b0", // vibrant purple
//                         "&:hover": { backgroundColor: "#7b1fa2" }, // darker shade on hover
//                     }}>Next</Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default EmployeeExitReport;














import React, { useState, useMemo } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
import * as XLSX from "xlsx";

// --- HELPER FUNCTION (No Change) ---
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    // Returns date in YYYY-MM-DD format, suitable for date inputs
    return date.toISOString().split('T')[0];
};

const EmployeeExitReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    const handleFetchReport = async () => {
        if (!fromDate || !toDate) {
            setError("Please select both a 'From' and 'To' date.");
            setHasSearched(true);
            setReportData([]);
            return;
        }
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setReportData([]);
        try {
            const payload = { from: fromDate, to: toDate };
            const response = await axiosInstance.post("/api/employee-exit-report/", payload);
            if (response.data?.status === "success" && Array.isArray(response.data.data)) {
                setReportData(response.data.data);
            } else {
                throw new Error("Invalid response from server.");
            }
        } catch (err) {
            setError("Failed to fetch employee exit report. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    // --- Memoized Calculations for Performance ---
    const filteredData = useMemo(() => {
        if (!searchTerm) return reportData;
        const s = searchTerm.toLowerCase();
        return reportData.filter((row) =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(s)
            )
        );
    }, [reportData, searchTerm]);

    const paginatedData = useMemo(() => {
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    // --- Event Handlers ---
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

    // --- EXPORT FUNCTIONALITY ---
    const handleExportExcel = () => {
        const dataToExport = filteredData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Exit_Report");
        XLSX.writeFile(workbook, `Employee_Exit_Report_${fromDate}_to_${toDate}.xlsx`);
    };

    const columns = [
        "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division", "Sub-Division", "Level",
        "Headquarter", "Line Manager", "D.O.J", "Exit Type", "Last Working Date", "Return Asset",
        "Exit Interview Questionnaire", "Employee Clearance Form", "Full & Final settlement",
        "Relieving letter", "Experience Letter"
    ];
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Employee Exit Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
                    <TextField
                        label="From" type="date" size="small" value={fromDate || ''}
                        onChange={(e) => {
                            setFromDate(e.target.value);
                            if (toDate && e.target.value > toDate) setToDate(null);
                        }}
                        InputLabelProps={{ shrink: true }} sx={{ minWidth: 180 }}
                    />
                    <TextField
                        label="To" type="date" size="small" value={toDate || ''}
                        onChange={(e) => setToDate(e.target.value)}
                        InputLabelProps={{ shrink: true }} inputProps={{ min: fromDate || undefined }}
                        disabled={!fromDate} sx={{ minWidth: 180 }}
                    />
                    <Button variant="contained" onClick={handleFetchReport} disabled={!fromDate || !toDate || loading}
                        sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate Report
                    </Button>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />} disabled={filteredData.length === 0}
                        sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export to Excel
                    </Button>
                    <TextField size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
                        sx={{ width: isMobile ? '100%' : 'auto' }} />
                </Stack>
            </Paper>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>{columns.map((label) => <TableCell key={label} sx={headerCellStyle}>{label}</TableCell>)}</TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            [...Array(rowsPerPage)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {[...Array(columns.length)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
                        ) : !hasSearched ? (
                            <TableRow><TableCell colSpan={columns.length} align="center">Please select a date range and click Generate.</TableCell></TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow key={row["Employee ID"] || index} hover>
                                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{row["Employee ID"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Name"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Department"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Designation"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Division"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Sub-Division"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Level"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Headquarter"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Line Manager"] ?? 'N/A'}</TableCell>
                                    <TableCell>{formatDate(row["D.O.J"])}</TableCell>
                                    <TableCell>{row["Exit Type"] ?? 'N/A'}</TableCell>
                                    <TableCell>{formatDate(row["Last Working Date"])}</TableCell>
                                    <TableCell>{row["Return Asset"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Exit Interview Questionnaire"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Employee Clearance Form"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Full & Final settlement"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Relieving letter"] ?? 'N/A'}</TableCell>
                                    <TableCell>{row["Experience Letter"] ?? 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormControl variant="outlined" size="small">
                                <Select value={rowsPerPage} onChange={handleRowsPerPageChange}
                                    sx={{ backgroundColor: '#8C257C', color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: '#8C257C' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                                    {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Typography variant="body2" color="text.secondary">{`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}</Typography>
                        </Box>
                        <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
                            sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default EmployeeExitReport;