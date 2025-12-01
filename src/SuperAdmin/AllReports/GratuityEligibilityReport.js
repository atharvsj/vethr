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
//     Grid, // Import Grid for the new layout
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
//     Paper,
//     Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// // Helper to format date strings
// const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB");
// };

// const GratuityEligibilityReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for pagination and search
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const response = await axiosInstance.get("/apis/get_employee_gratuity_eligibility_get_report/");
//             const rawData = Array.isArray(response.data) ? response.data : [];
//             setReportData(rawData);
//         } catch (err) {
//             setError("Failed to fetch gratuity report. Please try again later.");
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
//             employee_id: row.employee_id.trim(),
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Gratuity_Report");
//         XLSX.writeFile(workbook, `Gratuity_Eligibility_Report.xlsx`);
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

//     const columns = [
//         "Sr No.", "employee_id", "employee_name", "department_name", "designation_name",
//         "division_name", "sub_division", "level", "headquarter", "Line_Manager",
//         "date_of_joining", "date_of_leaving", "total_service_years", "gratuity_eligibility",
//         "Basic + DA", "gratuity_amount", "employee_status"
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
//         '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
//         '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Gratuity Eligibility Report
//             </Typography>

//             {/* --- RESTRUCTURED CONTROLS BAR --- */}
//             <Grid container spacing={2} mb={2} alignItems="center">
//                 {/* Left: Rows Dropdown */}
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth variant="outlined" size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 {/* Center: Action Buttons */}
//                 <Grid item xs={12} sm={4} md={8}>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
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

//                 {/* Right: Search Field */}
//                 <Grid item xs={12} sm={4} md={2}>
//                     <TextField
//                         fullWidth
//                         variant="outlined"
//                         size="small"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>

//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((colName) => <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName.replace(/_/g, ' ')}</TableCell>)}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center">Click "Generate Report" to view data.</TableCell></TableRow>
//                         ) : filteredData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.user_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell>{row.employee_id?.trim() ?? 'N/A'}</TableCell>
//                                     {columns.slice(2).map(colName => (
//                                         <TableCell key={colName}>
//                                             {colName.includes('date') ? formatDate(row[colName]) : row[colName] ?? 'N/A'}
//                                         </TableCell>
//                                     ))}
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
//                     <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default GratuityEligibilityReport;















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

// --- HELPER FUNCTION (No Change) ---
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB");
};

const GratuityEligibilityReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
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
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setReportData([]);
        try {
            const response = await axiosInstance.get("/apis/get_employee_gratuity_eligibility_get_report/");
            const rawData = Array.isArray(response.data) ? response.data : [];
            setReportData(rawData);
        } catch (err) {
            setError("Failed to fetch gratuity report. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    // --- Memoized Calculations for Performance ---
    const filteredData = useMemo(() => {
        if (!searchTerm) return reportData;
        return reportData.filter((row) =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
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
    const handleExport = () => {
        const dataToExport = filteredData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Gratuity_Report");
        XLSX.writeFile(workbook, `Gratuity_Eligibility_Report.xlsx`);
    };

    const columns = [ "Sr No.", "Employee ID", "Employee Name", "Department", "Designation", "Division", "Sub Division", "Level", "Headquarter", "Line Manager", "Date of Joining", "Date of Leaving", "Total Service (Years)", "Gratuity Eligibility", "Basic + DA", "Gratuity Amount", "Employee Status" ];
    const columnKeys = [ "sr_no", "employee_id", "employee_name", "department_name", "designation_name", "division_name", "sub_division", "level", "headquarter", "Line_Manager", "date_of_joining", "date_of_leaving", "total_service_years", "gratuity_eligibility", "Basic + DA", "gratuity_amount", "employee_status" ];
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Gratuity Eligibility Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} mb={2}>
                    <Button variant="contained" onClick={handleFetchReport} disabled={loading}
                        sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        {loading ? 'Generating...' : 'Generate Report'}
                    </Button>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="outlined" onClick={handleExport} startIcon={<GridOnIcon />}
                        disabled={!hasSearched || loading || filteredData.length === 0}
                        sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export Report
                    </Button>
                    <TextField size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
                        disabled={!hasSearched || loading} sx={{ width: isMobile ? '100%' : 'auto' }} />
                </Stack>
            </Paper>

            {hasSearched && (
                <>
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
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((row, index) => (
                                        <TableRow key={row.employee_id || index} hover>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            {columnKeys.slice(1).map(key => {
                                                const value = key.includes('date') ? formatDate(row[key]) : (row[key] ?? 'N/A');
                                                return <TableCell key={key}>{value}</TableCell>
                                            })}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {filteredData.length > 0 && (
                        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
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
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default GratuityEligibilityReport;