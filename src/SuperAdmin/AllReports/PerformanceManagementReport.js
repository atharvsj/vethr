// import React, { useState, useEffect } from "react";
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
//     Autocomplete,
//     Container,
//     Divider,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// // Helper to format date strings
// const formatDate = (dateString) => {
//     if (!dateString || dateString === "NA") return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB");
// };

// // A clean, side-by-side info row component
// const InfoRow = ({ label, value }) => (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, px: 1 }}>
//         <Typography variant="body2" color="text.secondary">
//             {label}
//         </Typography>
//         <Typography variant="body1" fontWeight="bold" sx={{ textAlign: 'right' }}>
//             {value || "N/A"}
//         </Typography>
//     </Box>
// );

// const PerformanceManagementReport = () => {
//     const [reportMode, setReportMode] = useState('single');
//     const [reportData, setReportData] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await axiosInstance.get("/employee-dropdown/");
//                 if (Array.isArray(response.data)) setEmployees(response.data);
//             } catch (err) {
//                 setError("Could not load employee list.");
//             }
//         };
//         fetchEmployees();
//     }, []);

//     useEffect(() => {
//         const fetchReportData = (employeeId) => {
//             if (typeof employeeId === 'undefined') return;
//             setLoading(true);
//             setError(null);
//             setReportData([]);
//             axiosInstance.post("/api/performance-management-report/", { employee_id: employeeId })
//                 .then(response => {
//                     if (response.data && response.data.status === "success") {
//                         setReportData(Array.isArray(response.data.data) ? response.data.data : []);
//                     } else {
//                         throw new Error("Invalid response from server.");
//                     }
//                 })
//                 .catch(() => setError("Failed to fetch performance report."))
//                 .finally(() => setLoading(false));
//         };

//         if (reportMode === 'all') {
//             fetchReportData(0);
//         } else if (reportMode === 'single' && selectedEmployee) {
//             fetchReportData(selectedEmployee.emp_id);
//         } else {
//             setReportData([]);
//         }
//     }, [reportMode, selectedEmployee]);

//     const handleModeChange = (newMode) => {
//         if (newMode !== null && newMode !== reportMode) {
//             setReportMode(newMode);
//             setSelectedEmployee(null);
//             setError(null);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         let fileName = reportMode === 'single' && reportData[0]
//             ? `Performance_Report_${reportData[0]["Name"].replace(/\s+/g, '_')}.xlsx`
//             : `Performance_Report_All.xlsx`;
//         const dataToExport = reportData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Performance_Report");
//         XLSX.writeFile(workbook, fileName);
//     };

//     const handleSearchChange = (event) => setSearchTerm(event.target.value);
//     const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

//     const filteredData = reportData.filter((row) =>
//         Object.values(row).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const columns = [
//         "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division",
//         "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J",
//         "Financial Year", "PDR"
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
//                 Performance Management Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 {/* Left-aligned controls */}
//                 <Grid item xs={12} sm={8}>
//                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
//                         <Box sx={{ display: 'inline-flex', border: '1px solid #e0e0e0', borderRadius: '20px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
//                             <Button onClick={() => handleModeChange('single')} sx={{ borderRadius: '20px', border: 'none', textTransform: 'none', px: 3, ...(reportMode === 'single' ? purpleButtonStyle : { color: 'grey.700', '&:hover': { backgroundColor: '#e0e0e0' } }) }}>
//                                 Single Employee
//                             </Button>
//                             <Button onClick={() => handleModeChange('all')} sx={{ borderRadius: '20px', border: 'none', textTransform: 'none', px: 3, ...(reportMode === 'all' ? purpleButtonStyle : { color: 'grey.700', '&:hover': { backgroundColor: '#e0e0e0' } }) }}>
//                                 All Employees
//                             </Button>
//                         </Box>
//                         {reportMode === 'single' && (
//                             <Autocomplete
//                                 options={employees}
//                                 getOptionLabel={(option) => option.label}
//                                 value={selectedEmployee}
//                                 onChange={(event, newValue) => setSelectedEmployee(newValue)}
//                                 renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}
//                                 sx={{ width: 300 }}
//                             />
//                         )}
//                     </Box>
//                 </Grid>
//                 {/* Right-aligned controls */}
//                 <Grid item xs={12} sm={4}>
//                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
//                         {reportData.length > 0 && !loading && (
//                             <Button variant="contained" onClick={handleExport} sx={{ ...purpleButtonStyle, height: 40 }}>
//                                 {reportMode === 'single' ? `Export for ${reportData[0]?.Name}` : 'Export for All'}
//                             </Button>
//                         )}
//                     </Box>
//                 </Grid>
//             </Grid>

//             {/* --- DISPLAY SECTION --- */}
//             {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>
//             ) : error ? (
//                 <Alert severity="error">{error}</Alert>
//             ) : reportData.length === 0 ? (
//                 <Typography sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
//                     {reportMode === 'single' ? 'Please select an employee to view their report.' : 'No data available.'}
//                 </Typography>
//             ) : reportMode === 'single' ? (
//                 <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
//                     <Typography variant="h6" component="div" fontWeight={600} sx={{ textAlign: 'center', mb: 1 }}>{reportData[0]["Name"]}</Typography>
//                     <Divider />
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         <Grid item xs={12} md={5.9}>
//                             {Object.entries(reportData[0]).filter(([key]) => key !== 'Name' && key !== 'Employee ID').slice(0, 5).map(([key, value]) => (
//                                 <React.Fragment key={key}><InfoRow label={key} value={key.includes("D.O.J") ? formatDate(value) : value} /><Divider component="div" light /></React.Fragment>
//                             ))}
//                         </Grid>
//                         <Grid item md={0.2} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}><Divider orientation="vertical" /></Grid>
//                         <Grid item xs={12} md={5.9}>
//                             {Object.entries(reportData[0]).filter(([key]) => key !== 'Name' && key !== 'Employee ID').slice(5, 9).map(([key, value]) => (
//                                 <React.Fragment key={key}><InfoRow label={key} value={key.includes("D.O.J") ? formatDate(value) : value} /><Divider component="div" light /></React.Fragment>
//                             ))}
//                         </Grid>
//                     </Grid>
//                 </Paper>
//             ) : (
//                 // --- ALL EMPLOYEES TABLE VIEW ---
//                 <>
//                     {/* --- NEW VIEW CONTROLS BAR (ABOVE TABLE) --- */}
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                         <FormControl size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Rows</InputLabel>
//                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                 <MenuItem value={10}>10</MenuItem>
//                                 <MenuItem value={25}>25</MenuItem>
//                                 <MenuItem value={50}>50</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <TextField size="small" variant="outlined" placeholder="Search in table..." value={searchTerm} onChange={handleSearchChange} sx={{ width: 250 }} />
//                     </Box>

//                     <TableContainer component={Paper}>
//                         <Table stickyHeader size="small" sx={{ minWidth: 2000 }}>
//                             <TableHead><TableRow>{columns.map((colName) => <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>)}</TableRow></TableHead>
//                             <TableBody>
//                                 {paginatedData.map((row, index) => (
//                                     <TableRow key={row["Employee ID"] + index}>
//                                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                         {columns.slice(1).map(colName => (
//                                             <TableCell key={colName}>{colName.includes("D.O.J") ? formatDate(row[colName]) : row[colName] ?? 'N/A'}</TableCell>
//                                         ))}
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//                             <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                             <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//                         </Box>
//                     </Box>
//                 </>
//             )}
//         </Container>
//     );
// };

// export default PerformanceManagementReport;//////



















// import React, { useState, useEffect } from "react";
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
//     Autocomplete,
//     Container,
//     Divider,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// // Helper to format date strings
// const formatDate = (dateString) => {
//     if (!dateString || dateString === "NA") return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB");
// };

// // A clean, side-by-side info row component with a bold label
// const InfoRow = ({ label, value }) => (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, px: 1 }}>
//         <Typography variant="body1" fontWeight="bold">
//             {label}
//         </Typography>
//         <Typography variant="body1" sx={{ textAlign: 'right' }}>
//             {value || "N/A"}
//         </Typography>
//     </Box>
// );

// const PerformanceManagementReport = () => {
//     const [reportMode, setReportMode] = useState('single');
//     const [reportData, setReportData] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await axiosInstance.get("/employee-dropdown/");
//                 if (Array.isArray(response.data)) setEmployees(response.data);
//             } catch (err) {
//                 setError("Could not load employee list.");
//             }
//         };
//         fetchEmployees();
//     }, []);

//     useEffect(() => {
//         const fetchReportData = (employeeId) => {
//             if (typeof employeeId === 'undefined') return;
//             setLoading(true);
//             setError(null);
//             setReportData([]);
//             axiosInstance.post("/api/performance-management-report/", { employee_id: employeeId })
//                 .then(response => {
//                     if (response.data && response.data.status === "success") {
//                         setReportData(Array.isArray(response.data.data) ? response.data.data : []);
//                     } else {
//                         throw new Error("Invalid response from server.");
//                     }
//                 })
//                 .catch(() => setError("Failed to fetch performance report."))
//                 .finally(() => setLoading(false));
//         };

//         if (reportMode === 'all') {
//             fetchReportData(0);
//         } else if (reportMode === 'single' && selectedEmployee) {
//             fetchReportData(selectedEmployee.emp_id);
//         } else {
//             setReportData([]);
//         }
//     }, [reportMode, selectedEmployee]);

//     const handleModeChange = (newMode) => {
//         if (newMode !== null && newMode !== reportMode) {
//             setReportMode(newMode);
//             setSelectedEmployee(null);
//             setError(null);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         let fileName = reportMode === 'single' && reportData[0]
//             ? `Performance_Report_${reportData[0]["Name"].replace(/\s+/g, '_')}.xlsx`
//             : `Performance_Report_All.xlsx`;
//         const dataToExport = reportData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Performance_Report");
//         XLSX.writeFile(workbook, fileName);
//     };

//     const handleSearchChange = (event) => setSearchTerm(event.target.value);
//     const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

//     const filteredData = reportData.filter((row) =>
//         Object.values(row).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const columns = [
//         "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division",
//         "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J",
//         "Financial Year", "PDR"
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: '#9575cd', color: '#fff', transition: 'all 0.3s ease-in-out',
//         '&:hover': { backgroundColor: '#7e57c2', boxShadow: '0 0 15px rgba(149, 117, 205, 0.7)' },
//         '&:active': { backgroundColor: '#673ab7', boxShadow: '0 0 20px rgba(149, 117, 205, 0.9)' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     // Prepare data for the single employee view layout
//     const singleReportFields = reportData.length > 0 && reportMode === 'single'
//         ? Object.entries(reportData[0]).filter(([key]) => !['Name', 'Employee ID'].includes(key))
//         : [];
//     const leftColumnFields = singleReportFields.slice(0, 6);
//     const rightColumnFields = singleReportFields.slice(6);

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 Performance Management Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 {/* Left-aligned controls */}
//                 <Grid item xs={12} sm={8}>
//                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
//                         <Box sx={{ display: 'inline-flex', border: '1px solid #e0e0e0', borderRadius: '20px', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
//                             <Button onClick={() => handleModeChange('single')} sx={{ borderRadius: '20px', border: 'none', textTransform: 'none', px: 3, ...(reportMode === 'single' ? purpleButtonStyle : { color: 'grey.700', '&:hover': { backgroundColor: '#e0e0e0' } }) }}>
//                                 Single Employee
//                             </Button>
//                             <Button onClick={() => handleModeChange('all')} sx={{ borderRadius: '20px', border: 'none', textTransform: 'none', px: 3, ...(reportMode === 'all' ? purpleButtonStyle : { color: 'grey.700', '&:hover': { backgroundColor: '#e0e0e0' } }) }}>
//                                 All Employees
//                             </Button>
//                         </Box>
//                         {reportMode === 'single' && (
//                             <Autocomplete
//                                 options={employees}
//                                 getOptionLabel={(option) => option.label}
//                                 value={selectedEmployee}
//                                 onChange={(event, newValue) => setSelectedEmployee(newValue)}
//                                 renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}
//                                 sx={{ width: 300 }}
//                             />
//                         )}
//                     </Box>
//                 </Grid>
//                 {/* Right-aligned controls */}
//                 <Grid item xs={12} sm={4}>
//                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
//                         {reportData.length > 0 && !loading && (
//                             <Button variant="contained" onClick={handleExport} sx={{ ...purpleButtonStyle, height: 40 }}>
//                                 {reportMode === 'single' ? `Export for ${reportData[0]?.Name}` : 'Export for All'}
//                             </Button>
//                         )}
//                     </Box>
//                 </Grid>
//             </Grid>

//             {/* --- DISPLAY SECTION --- */}
//             {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>
//             ) : error ? (
//                 <Alert severity="error">{error}</Alert>
//             ) : reportData.length === 0 ? (
//                 <Typography sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
//                     {reportMode === 'single' ? 'Please select an employee to view their report.' : 'No data available.'}
//                 </Typography>
//             ) : reportMode === 'single' ? (
//                 <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
//                     <Typography variant="h6" component="div" fontWeight={600} sx={{ textAlign: 'center', mb: 1 }}>{reportData[0]["Name"]}</Typography>
//                     <Divider />
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         <Grid item xs={12} md={5.9}>
//                             {leftColumnFields.map(([key, value], index) => (
//                                 <React.Fragment key={key}>
//                                     <InfoRow label={key} value={key.includes("D.O.J") ? formatDate(value) : value} />
//                                     {index < leftColumnFields.length - 1 && <Divider component="div" light />}
//                                 </React.Fragment>
//                             ))}
//                         </Grid>
//                         <Grid item md={0.2} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
//                             <Divider orientation="vertical" />
//                         </Grid>
//                         <Grid item xs={12} md={5.9}>
//                             {rightColumnFields.map(([key, value], index) => (
//                                 <React.Fragment key={key}>
//                                     <InfoRow label={key} value={key.includes("D.O.J") ? formatDate(value) : value} />
//                                     {index < rightColumnFields.length - 1 && <Divider component="div" light />}
//                                 </React.Fragment>
//                             ))}
//                         </Grid>
//                     </Grid>
//                 </Paper>
//             ) : (
//                 // --- ALL EMPLOYEES TABLE VIEW ---
//                 <>
//                     {/* --- NEW VIEW CONTROLS BAR (ABOVE TABLE) --- */}
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                         <FormControl size="small" sx={{ minWidth: 120 }}>
//                             <InputLabel>Rows</InputLabel>
//                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                                 <MenuItem value={10}>10</MenuItem>
//                                 <MenuItem value={25}>25</MenuItem>
//                                 <MenuItem value={50}>50</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <TextField size="small" variant="outlined" placeholder="Search in table..." value={searchTerm} onChange={handleSearchChange} sx={{ width: 250 }} />
//                     </Box>

//                     <TableContainer component={Paper}>
//                         <Table stickyHeader size="small" sx={{ minWidth: 2000 }}>
//                             <TableHead><TableRow>{columns.map((colName) => <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>)}</TableRow></TableHead>
//                             <TableBody>
//                                 {paginatedData.map((row, index) => (
//                                     <TableRow key={row["Employee ID"] + index}>
//                                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                         {columns.slice(1).map(colName => (
//                                             <TableCell key={colName}>{colName.includes("D.O.J") ? formatDate(row[colName]) : row[colName] ?? 'N/A'}</TableCell>
//                                         ))}
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//                             <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                             <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//                         </Box>
//                     </Box>
//                 </>
//             )}
//         </Container>
//     );
// };

// export default PerformanceManagementReport;








import React, { useState, useEffect, useMemo } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Autocomplete, Divider, CircularProgress, Skeleton,
    useTheme, useMediaQuery, Pagination,Grid
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from "xlsx";

// --- HELPER FUNCTIONS ---
const formatDate = (dateString) => {
    if (!dateString || dateString === "NA") return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB");
};

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, px: 1 }}>
        <Typography variant="body1" fontWeight="bold">{label}</Typography>
        <Typography variant="body1" sx={{ textAlign: 'right' }}>{value || "N/A"}</Typography>
    </Box>
);

const PerformanceManagementReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportMode, setReportMode] = useState('single');
    const [reportData, setReportData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get("/employee-dropdown/");
                if (Array.isArray(response.data)) setEmployees(response.data);
            } catch (err) { setError("Could not load employee list."); }
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchReportData = (employeeId) => {
            setLoading(true);
            setError(null);
            setReportData([]);
            axiosInstance.post("/api/performance-management-report/", { employee_id: employeeId })
                .then(response => {
                    if (response.data?.status === "success" && Array.isArray(response.data.data)) {
                        setReportData(response.data.data);
                    } else { throw new Error("Invalid response from server."); }
                })
                .catch(() => setError("Failed to fetch performance report."))
                .finally(() => setLoading(false));
        };

        if (reportMode === 'all') {
            fetchReportData(0);
        } else if (reportMode === 'single' && selectedEmployee) {
            fetchReportData(selectedEmployee.emp_id);
        } else {
            setReportData([]); // Clear data if no employee is selected in single mode
        }
    }, [reportMode, selectedEmployee]);

    // --- Memoized Calculations and Event Handlers ---
    const filteredData = useMemo(() => {
        if (!searchTerm) return reportData;
        return reportData.filter((row) => Object.values(row).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())));
    }, [reportData, searchTerm]);
    
    const paginatedData = useMemo(() => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredData, page, rowsPerPage]);
    
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

    // --- EXPORT FUNCTIONALITY ---
    const handleExport = () => {
        const fileName = reportMode === 'single' && reportData[0] ? `Performance_Report_${reportData[0]["Name"].replace(/\s+/g, '_')}.xlsx` : `Performance_Report_All.xlsx`;
        const dataToExport = filteredData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Performance_Report");
        XLSX.writeFile(workbook, fileName);
    };

    const columns = ["Sr No.", "Employee ID", "Name", "Department", "Designation", "Division", "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J", "Financial Year", "PDR"];
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    // Prepare data for the single employee view layout
    const singleReportFields = reportData.length > 0 && reportMode === 'single'
        ? Object.entries(reportData[0]).filter(([key]) => !['Name', 'Employee ID'].includes(key))
        : [];
    const leftColumnFields = singleReportFields.slice(0, Math.ceil(singleReportFields.length / 2));
    const rightColumnFields = singleReportFields.slice(Math.ceil(singleReportFields.length / 2));

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Performance Management Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                        <Box sx={{ display: 'inline-flex', border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                            <Button onClick={() => setReportMode('single')} variant={reportMode === 'single' ? 'contained' : 'text'} sx={{ borderRadius: 0, ...(reportMode === 'single' && { backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }) }}>Single</Button>
                            <Button onClick={() => setReportMode('all')} variant={reportMode === 'all' ? 'contained' : 'text'} sx={{ borderRadius: 0, ...(reportMode === 'all' && { backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }) }}>All</Button>
                        </Box>
                        {reportMode === 'single' && (
                            <Autocomplete
                                options={employees} getOptionLabel={(option) => option.label}
                                value={selectedEmployee} onChange={(event, newValue) => setSelectedEmployee(newValue)}
                                renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}
                                sx={{ width: 300 }}
                            />
                        )}
                    </Stack>
                    <Button variant="outlined" onClick={handleExport} startIcon={<GridOnIcon />} disabled={reportData.length === 0 || loading}
                        sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export
                    </Button>
                </Stack>
            </Paper>

            {/* --- Main Display Section --- */}
            {loading && reportMode === 'single' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : reportData.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                    {reportMode === 'single' ? 'Please select an employee to view their report.' : 'No data available for "All Employees".'}
                </Paper>
            ) : reportMode === 'single' ? (
                <Paper sx={{ p: 2, mt: 2, borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight="bold" color={primaryColor} sx={{ textAlign: 'center', mb: 1 }}>{reportData[0]["Name"]}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>Employee ID: {reportData[0]["Employee ID"]}</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={5.9}>{leftColumnFields.map(([key, value]) => <InfoRow key={key} label={key} value={key.includes("D.O.J") ? formatDate(value) : value} />)}</Grid>
                        <Grid item md={0.2} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}><Divider orientation="vertical" /></Grid>
                        <Grid item xs={12} md={5.9}>{rightColumnFields.map(([key, value]) => <InfoRow key={key} label={key} value={key.includes("D.O.J") ? formatDate(value) : value} />)}</Grid>
                    </Grid>
                </Paper>
            ) : ( // "All Employees" Table View
                <>
                    <TableContainer component={Paper}>
                        <Table stickyHeader size="small">
                            <TableHead><TableRow>{columns.map((colName) => <TableCell key={colName} sx={headerCellStyle}>{colName}</TableCell>)}</TableRow></TableHead>
                            <TableBody>
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {[...Array(columns.length)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                        </TableRow>
                                    ))
                                ) : (
                                    paginatedData.map((row, index) => (
                                        <TableRow key={row["Employee ID"] + index} hover>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            {columns.slice(1).map(colName => (
                                                <TableCell key={colName}>{colName.includes("D.O.J") ? formatDate(row[colName]) : row[colName] ?? 'N/A'}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                            <TextField size="small" variant="outlined" placeholder="Search in table..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
                            <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
                                sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default PerformanceManagementReport;