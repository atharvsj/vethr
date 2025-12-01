// // import React, { useState, useEffect, useMemo } from 'react';
// // import axios from 'axios';
// // import {
// //     Box, Typography, Table, TableBody, TableCell, TableContainer, Container,
// //     TableHead, TableRow, CircularProgress, Alert, Grid, FormControl,
// //     InputLabel, Select, MenuItem, TextField, Button, Paper
// // } from '@mui/material';
// // import * as XLSX from 'xlsx';

// // const EmployeeAttirationReportAdmin = () => {
// //     const [reportData, setReportData] = useState([]);
// //     const [departments, setDepartments] = useState([]);
// //     const [divisions, setDivisions] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [hasSearched, setHasSearched] = useState(false);
// //     const [financialYear, setFinancialYear] = useState(''); // Empty by default
// //     const [department, setDepartment] = useState(''); // Empty by default
// //     const [division, setDivision] = useState(''); // Empty by default
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(15); // Adjusted for more rows

// //     useEffect(() => {
// //         const fetchDropdownData = async () => {
// //             try {
// //                 const [deptRes, divRes] = await Promise.all([
// //                     axios.get('https://tdtlworld.com/hrms-backend/api/departments/dropdown/'),
// //                     axios.get('https://tdtlworld.com/hrms-backend/api/division/')
// //                 ]);
// //                 if (deptRes.data?.status === true) setDepartments(deptRes.data.data);
// //                 if (Array.isArray(divRes.data)) setDivisions(divRes.data);
// //             } catch (error) {
// //                 console.error("Error fetching dropdown data:", error);
// //                 setError("Failed to load filter options. Please refresh.");
// //             }
// //         };
// //         fetchDropdownData();
// //     }, []);

// //     const processReportData = (rawData) => {
// //         if (!rawData || rawData.length === 0) return [];
// //         const processedData = [];
// //         const quarterRoman = ['I', 'II', 'III', 'IV'];
// //         rawData.forEach((row, index) => {
// //             processedData.push({ ...row, type: 'month' });
// //             if ((index + 1) % 3 === 0) {
// //                 const quarterIndex = Math.floor(index / 3);
// //                 const quarterMonths = rawData.slice(quarterIndex * 3, (quarterIndex * 3) + 3);
// //                 processedData.push({
// //                     'Sr No': `Q ${quarterRoman[quarterIndex]}`, Month: '', Start: quarterMonths[0].Start,
// //                     'New Joinees': quarterMonths.reduce((s, i) => s + i['New Joinees'], 0), Exit: quarterMonths.reduce((s, i) => s + i.Exit, 0),
// //                     End: quarterMonths[2].End, 'Attrition Rate (%)': quarterMonths.reduce((s, i) => s + i['Attrition Rate (%)'], 0), type: 'summary'
// //                 });
// //             }
// //         });
// //         processedData.push({
// //             'Sr No': 'Grand Total', Month: '', Start: rawData[0].Start, 'New Joinees': rawData.reduce((s, i) => s + i['New Joinees'], 0),
// //             Exit: rawData.reduce((s, i) => s + i.Exit, 0), End: rawData[rawData.length - 1].End,
// //             'Attrition Rate (%)': rawData.reduce((s, i) => s + i['Attrition Rate (%)'], 0), type: 'summary'
// //         });
// //         return processedData;
// //     };

// //     const handleGenerateReport = async () => {
// //         if (!financialYear || !department || !division) {
// //             setError("Please select all three filters: Year, Department, and Division.");
// //             setHasSearched(true);
// //             return;
// //         }
// //         setLoading(true);
// //         setError(null);
// //         setHasSearched(true);
// //         setReportData([]);
// //         try {
// //             const year = financialYear.split('-')[0];
// //             const url = `https://tdtlworld.com/hrms-backend/api/employee-attrition-report/?year=${year}`;
// //             const response = await axios.get(url);
// //             if (response.data && Array.isArray(response.data)) {
// //                 setReportData(processReportData(response.data));
// //             } else {
// //                 setError('Received invalid data format from the server.');
// //             }
// //         } catch (err) {
// //             console.error("Error fetching report data:", err);
// //             setError('Failed to fetch the report. Please try again.');
// //         } finally {
// //             setLoading(false);
// //             setPage(0);
// //         }
// //     };

// //     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 15)); setPage(0); };

// //     const paginatedData = reportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //     const pageCount = Math.ceil(reportData.length / rowsPerPage);

// //     const handleExport = () => {
// //         if (reportData.length === 0) return;
// //         const worksheet = XLSX.utils.json_to_sheet(reportData);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "AttritionReport");
// //         XLSX.writeFile(workbook, `Attrition_Report_${financialYear}.xlsx`);
// //     };

// //     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };
// //     const tableHeaders = ['Sr No', 'Month', 'Employees at Start', 'New Joinees', 'Exit', 'Employees at End', 'Attrition Rate (%)'];

// //     return (
// //         <Container disableGutters>
// //             <Typography variant="h6" fontWeight="bold" mb={2}>Employee Attrition Report</Typography>
// //             <Grid container spacing={2} mb={2} alignItems="center">
// //                 <Grid item xs={12} sm={4} md={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Rows</InputLabel>
// //                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //                             <MenuItem value={15}>15</MenuItem><MenuItem value={30}>30</MenuItem><MenuItem value={50}>50</MenuItem>
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
// //                     <FormControl sx={{ minWidth: 150 }} size="small">
// //                         <InputLabel>Financial Year</InputLabel>
// //                         <Select value={financialYear} label="Financial Year" onChange={(e) => setFinancialYear(e.target.value)} displayEmpty>
// //                             <MenuItem value="" disabled><em></em></MenuItem>
// //                             <MenuItem value="2023-2024">2023-2024</MenuItem><MenuItem value="2022-2023">2022-2023</MenuItem>
// //                         </Select>
// //                     </FormControl>
// //                     <FormControl sx={{ minWidth: 150 }} size="small">
// //                         <InputLabel>Department</InputLabel>
// //                         <Select value={department} label="Department" onChange={(e) => setDepartment(e.target.value)} displayEmpty>
// //                             <MenuItem value="" disabled><em></em></MenuItem>
// //                             {departments.map(d => <MenuItem key={d.department_id} value={d.department_id}>{d.department_name}</MenuItem>)}
// //                         </Select>
// //                     </FormControl>
// //                     <FormControl sx={{ minWidth: 150 }} size="small">
// //                         <InputLabel>Division</InputLabel>
// //                         <Select value={division} label="Division" onChange={(e) => setDivision(e.target.value)} displayEmpty>
// //                             <MenuItem value="" disabled><em></em></MenuItem>
// //                             {divisions.map(d => <MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>)}
// //                         </Select>
// //                     </FormControl>
// //                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle} disabled={!financialYear || !department || !division || loading}>Generate</Button>
// //                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={reportData.length === 0}>Export</Button>
// //                 </Grid>
// //                 <Grid item xs={12} sm={12} md={2}></Grid> {/* Empty grid item for spacing */}
// //             </Grid>

// //             <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
// //                 <Table stickyHeader>
// //                     <TableHead>
// //                         <TableRow>
// //                             {tableHeaders.map(header => (<TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header}</TableCell>))}
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {loading ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
// //                         ) : error ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
// //                         ) : !hasSearched ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select filters and click Generate.</TableCell></TableRow>
// //                         ) : paginatedData.length > 0 ? (
// //                             paginatedData.map(row => (
// //                                 <TableRow key={row['Sr No']} sx={row.type === 'summary' ? { '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } } : { "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
// //                                     <TableCell align="center">{row['Sr No']}</TableCell><TableCell align="center">{row.Month}</TableCell>
// //                                     <TableCell align="center">{row.Start}</TableCell><TableCell align="center">{row['New Joinees']}</TableCell>
// //                                     <TableCell align="center">{row.Exit}</TableCell><TableCell align="center">{row.End}</TableCell>
// //                                     <TableCell align="center">{row['Attrition Rate (%)']}</TableCell>
// //                                 </TableRow>
// //                             ))
// //                         ) : (<TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {reportData.length > 0 && (
// //                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //                         <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
// //                         <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
// //                         <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
// //                     </Box>
// //                 </Box>
// //             )}
// //         </Container>
// //     );
// // }

// // export default EmployeeAttirationReportAdmin;     /////// 


// // import React, { useState, useEffect, useMemo } from 'react';
// // import axios from 'axios';
// // import {
// //     Box, Typography, Table, TableBody, TableCell, TableContainer,
// //     TableHead, TableRow, CircularProgress, Alert, FormControl,
// //     InputLabel, Select, MenuItem, Button, Paper, Stack, TextField
// // } from '@mui/material';
// // import * as XLSX from 'xlsx';

// // // DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS
// // const generateYearOptions = () => {
// //     const years = [];
// //     const now = new Date();
// //     const currentYear = now.getFullYear();
// //     const currentMonth = now.getMonth();

// //     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

// //     // Generate last 10 financial years
// //   for (let i = 0; i < 6; i++) {
// //     years.push(String(latestFinancialYearStart - i));
// //   }
// // };


// // const EmployeeAttirationReportAdmin = () => {
// //     const [reportData, setReportData] = useState([]);
// //     const [departments, setDepartments] = useState([]);
// //     const [divisions, setDivisions] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [hasSearched, setHasSearched] = useState(false);
// //     const [financialYear, setFinancialYear] = useState('');
// //     const [department, setDepartment] = useState('');
// //     const [division, setDivision] = useState('');
// //     const [searchTerm, setSearchTerm] = useState('');
// //     // REMOVED: State for pagination is no longer needed
// //     // const [page, setPage] = useState(0);
// //     // const [rowsPerPage, setRowsPerPage] = useState(15);

// //     const yearOptions = useMemo(() => generateYearOptions(), []);

// //     useEffect(() => {
// //         const fetchDropdownData = async () => {
// //             try {
// //                 const [deptRes, divRes] = await Promise.all([
// //                     axios.get('https://tdtlworld.com/hrms-backend/api/departments/dropdown/'),
// //                     axios.get('https://tdtlworld.com/hrms-backend/api/division/')
// //                 ]);
// //                 if (deptRes.data?.status === true) setDepartments(deptRes.data.data);
// //                 if (Array.isArray(divRes.data)) setDivisions(divRes.data);
// //             } catch (error) {
// //                 console.error("Error fetching dropdown data:", error);
// //                 setError("Failed to load filter options. Please refresh.");
// //             }
// //         };
// //         fetchDropdownData();
// //     }, []);

// //     const processReportData = (rawData) => {
// //         if (!rawData || rawData.length === 0) return [];
// //         const processedData = [];
// //         // CHANGED: Re-added Roman numerals array
// //         const quarterRoman = ['I', 'II', 'III', 'IV'];

// //         rawData.forEach((row, index) => {
// //             processedData.push({ ...row, type: 'month' });
// //             const quarterIndex = Math.floor(index / 3);

// //             // FIXED: Added 'quarterIndex < 4' to prevent creating 'Q 5' or higher
// //             if ((index + 1) % 3 === 0 && quarterIndex < 4) {
// //                 const quarterMonths = rawData.slice(quarterIndex * 3, (quarterIndex * 3) + 3);

// //                 if (quarterMonths.length > 0) {
// //                     processedData.push({
// //                         // CHANGED: Using Roman numerals again
// //                         'Sr No': `Q ${quarterRoman[quarterIndex]}`,
// //                         Month: '',
// //                         Start: quarterMonths[0].Start,
// //                         'New Joinees': quarterMonths.reduce((s, i) => s + i['New Joinees'], 0),
// //                         Exit: quarterMonths.reduce((s, i) => s + i.Exit, 0),
// //                         End: quarterMonths[quarterMonths.length - 1].End,
// //                         'Attrition Rate (%)': quarterMonths.reduce((s, i) => s + i['Attrition Rate (%)'], 0),
// //                         type: 'summary'
// //                     });
// //                 }
// //             }
// //         });

// //         if (rawData.length > 0) {
// //             processedData.push({
// //                 'Sr No': 'Grand Total', Month: '', Start: rawData[0].Start,
// //                 'New Joinees': rawData.reduce((s, i) => s + i['New Joinees'], 0),
// //                 Exit: rawData.reduce((s, i) => s + i.Exit, 0),
// //                 End: rawData[rawData.length - 1].End,
// //                 'Attrition Rate (%)': rawData.reduce((s, i) => s + i['Attrition Rate (%)'], 0),
// //                 type: 'summary'
// //             });
// //         }
// //         return processedData;
// //     };

// //     const handleGenerateReport = async () => {
// //         if (!financialYear || (!department && !division)) {
// //             setError("Please select a Year and either a Department or a Division.");
// //             setHasSearched(true);
// //             return;
// //         }
// //         setLoading(true);
// //         setError(null);
// //         setHasSearched(true);
// //         setReportData([]);
// //         try {
// //             const year = financialYear.split('-')[0];
// //             let url = `https://tdtlworld.com/hrms-backend/api/employee-attrition-report/?year=${year}`;
// //             if (department) { url += `&department_id=${department}`; }
// //             else if (division) { url += `&division_id=${division}`; }
// //             const response = await axios.get(url);
// //             if (response.data && Array.isArray(response.data)) {
// //                 setReportData(processReportData(response.data));
// //             } else {
// //                 setReportData([]);
// //             }
// //         } catch (err) {
// //             console.error("Error fetching report data:", err);
// //             setError('Failed to fetch the report. Please try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const filteredData = useMemo(() => {
// //         if (!searchTerm) {
// //             return reportData;
// //         }
// //         return reportData.filter(row =>
// //             (row.Month && row.Month.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //             (row['Sr No'] && String(row['Sr No']).toLowerCase().includes(searchTerm.toLowerCase()))
// //         );
// //     }, [reportData, searchTerm]);

// //     const handleExport = () => {
// //         if (filteredData.length === 0) return;
// //         const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "AttritionReport");
// //         XLSX.writeFile(workbook, `Attrition_Report_${financialYear}.xlsx`);
// //     };

// //     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };
// //     const tableHeaders = ['Sr No', 'Month', 'Employees at Start', 'New Joinees', 'Exit', 'Employees at End', 'Attrition Rate (%)'];

// //     return (
// //         <Box p={3}>
// //             <Typography variant="h5" fontWeight="bold" mb={3}>Employee Attrition Rate Report</Typography>
// //             <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} mb={3} alignItems="center" justifyContent="space-between">
// //                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" flexWrap="wrap">
// //                     {/* REMOVED: Rows per page dropdown */}
// //                     <FormControl sx={{ minWidth: 160 }} size="small">
// //                         <InputLabel>Financial Year</InputLabel>
// //                         <Select value={financialYear} label="Financial Year" onChange={(e) => setFinancialYear(e.target.value)}>
// //                             {yearOptions.map(year => (
// //                                 <MenuItem key={year} value={`${year}-${parseInt(year) + 1}`}>
// //                                     {`${year}-${parseInt(year) + 1}`}
// //                                 </MenuItem>
// //                             ))}
// //                         </Select>
// //                     </FormControl>
// //                     <FormControl sx={{ minWidth: 160 }} size="small">
// //                         <InputLabel>Department</InputLabel>
// //                         <Select value={department} label="Department" disabled={!!division}
// //                             onChange={(e) => { setDepartment(e.target.value); setDivision(''); }}>
// //                             <MenuItem value=""><em>None</em></MenuItem>
// //                             {departments.map(d => <MenuItem key={d.department_id} value={d.department_id}>{d.department_name}</MenuItem>)}
// //                         </Select>
// //                     </FormControl>
// //                     <FormControl sx={{ minWidth: 160 }} size="small">
// //                         <InputLabel>Division</InputLabel>
// //                         <Select value={division} label="Division" disabled={!!department}
// //                             onChange={(e) => { setDivision(e.target.value); setDepartment(''); }}>
// //                             <MenuItem value=""><em>None</em></MenuItem>
// //                             {divisions.map(d => <MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>)}
// //                         </Select>
// //                     </FormControl>
// //                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle}
// //                         disabled={!financialYear || (!department && !division) || loading}>
// //                         Generate
// //                     </Button>
// //                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>Export</Button>
// //                 </Stack>
// //                 <TextField
// //                     size="small"
// //                     variant="outlined"
// //                     placeholder="Search..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     sx={{ width: { xs: '100%', lg: 'auto' } }}
// //                 />
// //             </Stack>

// //             <TableContainer component={Paper}>
// //                 <Table stickyHeader>
// //                     <TableHead>
// //                         <TableRow>
// //                             {tableHeaders.map(header => (<TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header}</TableCell>))}
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {loading ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
// //                         ) : error ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
// //                         ) : !hasSearched ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select filters and click Generate.</TableCell></TableRow>
// //                             // CHANGED: Use filteredData directly as there is no pagination
// //                         ) : filteredData.length > 0 ? (
// //                             filteredData.map((row, index) => (
// //                                 <TableRow key={`${row['Sr No']}-${index}`} sx={row.type === 'summary' ? { '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } } : { "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
// //                                     <TableCell align="center">{row['Sr No']}</TableCell><TableCell align="center">{row.Month}</TableCell>
// //                                     <TableCell align="center">{row.Start}</TableCell><TableCell align="center">{row['New Joinees']}</TableCell>
// //                                     <TableCell align="center">{row.Exit}</TableCell><TableCell align="center">{row.End}</TableCell>
// //                                     <TableCell align="center">{row['Attrition Rate (%)']}</TableCell>
// //                                 </TableRow>
// //                             ))
// //                         ) : (<TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {/* REMOVED: Pagination controls */}
// //         </Box>
// //     );
// // }

// // export default EmployeeAttirationReportAdmin;       ////// 






// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import {
//     Box, Typography, Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, CircularProgress, Alert, FormControl,
//     InputLabel, Select, MenuItem, Button, Paper, Stack, TextField,
//     Tooltip // 1. Import Tooltip
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// // DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS
// const generateYearOptions = () => {
//     const years = [];
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth();

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//     for (let i = 0; i < 6; i++) {
//         years.push(String(latestFinancialYearStart - i));
//     }
//     return years; // The original fix is still here
// };

// const EmployeeAttirationReportAdmin = () => {
//     // ... all your existing state and functions are here ...
//     const [reportData, setReportData] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [divisions, setDivisions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [financialYear, setFinancialYear] = useState('');
//     const [department, setDepartment] = useState('');
//     const [division, setDivision] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');

//     const yearOptions = useMemo(() => generateYearOptions(), []);

//     useEffect(() => {
//         const fetchDropdownData = async () => {
//             try {
//                 const [deptRes, divRes] = await Promise.all([
//                     axios.get('https://tdtlworld.com/hrms-backend/api/departments/dropdown/'),
//                     axios.get('https://tdtlworld.com/hrms-backend/api/division/')
//                 ]);
//                 if (deptRes.data?.status === true) setDepartments(deptRes.data.data);
//                 if (Array.isArray(divRes.data)) setDivisions(divRes.data);
//             } catch (error) {
//                 console.error("Error fetching dropdown data:", error);
//                 setError("Failed to load filter options. Please refresh.");
//             }
//         };
//         fetchDropdownData();
//     }, []);

//     const processReportData = (rawData) => {
//         if (!rawData || rawData.length === 0) return [];
//         const processedData = [];
//         const quarterRoman = ['I', 'II', 'III', 'IV'];

//         rawData.forEach((row, index) => {
//             processedData.push({ ...row, type: 'month' });
//             const quarterIndex = Math.floor(index / 3);

//             if ((index + 1) % 3 === 0 && quarterIndex < 4) {
//                 const quarterMonths = rawData.slice(quarterIndex * 3, (quarterIndex * 3) + 3);

//                 if (quarterMonths.length > 0) {
//                     processedData.push({
//                         'Sr No': `Q ${quarterRoman[quarterIndex]}`,
//                         Month: '',
//                         Start: quarterMonths[0].Start,
//                         'New Joinees': quarterMonths.reduce((s, i) => s + i['New Joinees'], 0),
//                         Exit: quarterMonths.reduce((s, i) => s + i.Exit, 0),
//                         End: quarterMonths[quarterMonths.length - 1].End,
//                         'Attrition Rate (%)': quarterMonths.reduce((s, i) => s + i['Attrition Rate (%)'], 0),
//                         type: 'summary'
//                     });
//                 }
//             }
//         });

//         if (rawData.length > 0) {
//             processedData.push({
//                 'Sr No': 'Grand Total', Month: '', Start: rawData[0].Start,
//                 'New Joinees': rawData.reduce((s, i) => s + i['New Joinees'], 0),
//                 Exit: rawData.reduce((s, i) => s + i.Exit, 0),
//                 End: rawData[rawData.length - 1].End,
//                 'Attrition Rate (%)': rawData.reduce((s, i) => s + i['Attrition Rate (%)'], 0),
//                 type: 'summary'
//             });
//         }
//         return processedData;
//     };

//     const handleGenerateReport = async () => {
//         if (!financialYear || (!department && !division)) {
//             setError("Please select a Year and either a Department or a Division.");
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const year = financialYear.split('-')[0];
//             let url = `https://tdtlworld.com/hrms-backend/api/employee-attrition-report/?year=${year}`;
//             if (department) { url += `&department_id=${department}`; }
//             else if (division) { url += `&division_id=${division}`; }
//             const response = await axios.get(url);
//             if (response.data && Array.isArray(response.data)) {
//                 setReportData(processReportData(response.data));
//             } else {
//                 setReportData([]);
//             }
//         } catch (err) {
//             console.error("Error fetching report data:", err);
//             setError('Failed to fetch the report. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredData = useMemo(() => {
//         if (!searchTerm) {
//             return reportData;
//         }
//         return reportData.filter(row =>
//             (row.Month && row.Month.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row['Sr No'] && String(row['Sr No']).toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//     }, [reportData, searchTerm]);

//     const handleExport = () => {
//         if (filteredData.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "AttritionReport");
//         XLSX.writeFile(workbook, `Attrition_Report_${financialYear}.xlsx`);
//     };

//     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };
//     const tableHeaders = ['Sr No', 'Month', 'Employees at Start', 'New Joinees', 'Exit', 'Employees at End', 'Attrition Rate (%)'];

//     return (
//         <Box p={3}>
//             <Typography variant="h5" fontWeight="bold" mb={3}>Employee Attrition Rate Report</Typography>
//             <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} mb={3} alignItems="center" justifyContent="space-between">
//                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" flexWrap="wrap">
//                     <FormControl sx={{ minWidth: 160 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select value={financialYear} label="Financial Year" onChange={(e) => setFinancialYear(e.target.value)}>
//                             {yearOptions.map(year => (
//                                 <MenuItem key={year} value={`${year}-${parseInt(year) + 1}`}>
//                                     {`${year}-${parseInt(year) + 1}`}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>

//                     {/* 2. Wrap the Department FormControl with Tooltip */}
//                     <Tooltip title={division ? "Clear Division to select a Department" : ""}>
//                         <FormControl sx={{ minWidth: 160 }} size="small">
//                             <InputLabel>Department</InputLabel>
//                             <Select
//                                 value={department}
//                                 label="Department"
//                                 disabled={!!division} // Logic remains the same
//                                 onChange={(e) => { setDepartment(e.target.value); setDivision(''); }}
//                             >
//                                 <MenuItem value=""><em>None</em></MenuItem>
//                                 {departments.map(d => <MenuItem key={d.department_id} value={d.department_id}>{d.department_name}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                     </Tooltip>

//                     {/* 3. Wrap the Division FormControl with Tooltip */}
//                     <Tooltip title={department ? "Clear Department to select a Division" : ""}>
//                         <FormControl sx={{ minWidth: 160 }} size="small">
//                             <InputLabel>Division</InputLabel>
//                             <Select
//                                 value={division}
//                                 label="Division"
//                                 disabled={!!department} // Logic remains the same
//                                 onChange={(e) => { setDivision(e.target.value); setDepartment(''); }}
//                             >
//                                 <MenuItem value=""><em>None</em></MenuItem>
//                                 {divisions.map(d => <MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                     </Tooltip>

//                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle}
//                         disabled={!financialYear || (!department && !division) || loading}>
//                         Generate
//                     </Button>
//                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>Export</Button>
//                 </Stack>
//                 <TextField
//                     size="small"
//                     variant="outlined"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     sx={{ width: { xs: '100%', lg: 'auto' } }}
//                 />
//             </Stack>

//             {/* ... Rest of your component (TableContainer, etc.) remains the same ... */}
//             <TableContainer component={Paper}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {tableHeaders.map(header => (<TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header}</TableCell>))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select filters and click Generate.</TableCell></TableRow>
//                         ) : filteredData.length > 0 ? (
//                             filteredData.map((row, index) => (
//                                 <TableRow key={`${row['Sr No']}-${index}`} sx={row.type === 'summary' ? { '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } } : { "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
//                                     <TableCell align="center">{row['Sr No']}</TableCell><TableCell align="center">{row.Month}</TableCell>
//                                     <TableCell align="center">{row.Start}</TableCell><TableCell align="center">{row['New Joinees']}</TableCell>
//                                     <TableCell align="center">{row.Exit}</TableCell><TableCell align="center">{row.End}</TableCell>
//                                     <TableCell align="center">{row['Attrition Rate (%)']}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (<TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// }

// export default EmployeeAttirationReportAdmin;













// import React, { useState, useEffect, useMemo } from 'react';

// import axios from 'axios';

// import {

//     Box, Typography, Table, TableBody, TableCell, TableContainer,

//     TableHead, TableRow, CircularProgress, Alert, FormControl,

//     InputLabel, Select, MenuItem, Button, Paper, Stack, TextField,

//     Tooltip,

//     Autocomplete // 1. Import Autocomplete

// } from '@mui/material';

// import * as XLSX from 'xlsx';

 

// // DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS

// const generateYearOptions = () => {

//     const years = [];

//     const now = new Date();

//     const currentYear = now.getFullYear();

//     const currentMonth = now.getMonth();

 

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

 

//     for (let i = 0; i < 6; i++) {

//         years.push(String(latestFinancialYearStart - i));

//     }

//     return years;

// };

 

// // Props to ensure dropdowns open downwards

// const menuProps = {

//   anchorOrigin: {

//     vertical: "bottom",

//     horizontal: "left"

//   },

//   transformOrigin: {

//     vertical: "top",

//     horizontal: "left"

//   },

//   getContentAnchorEl: null

// };

 

// const EmployeeAttirationReportAdmin = () => {

//     const [reportData, setReportData] = useState([]);

//     const [departments, setDepartments] = useState([]);

//     const [divisions, setDivisions] = useState([]);

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState(null);

//     const [hasSearched, setHasSearched] = useState(false);

//     const [financialYear, setFinancialYear] = useState('');

//     const [department, setDepartment] = useState('');

//     const [division, setDivision] = useState('');

//     const [searchTerm, setSearchTerm] = useState('');

 

//     const yearOptions = useMemo(() => generateYearOptions(), []);

 

//     useEffect(() => {

//         const fetchDropdownData = async () => {

//             try {

//                 const [deptRes, divRes] = await Promise.all([

//                     axios.get('https://tdtlworld.com/hrms-backend/api/departments/dropdown/'),

//                     axios.get('https://tdtlworld.com/hrms-backend/api/division/')

//                 ]);

//                 if (deptRes.data?.status === true) setDepartments(deptRes.data.data);

//                 if (Array.isArray(divRes.data)) setDivisions(divRes.data);

//             } catch (error) {

//                 console.error("Error fetching dropdown data:", error);

//                 setError("Failed to load filter options. Please refresh.");

//             }

//         };

//         fetchDropdownData();

//     }, []);

 

//     const processReportData = (rawData) => {

//         if (!rawData || rawData.length === 0) return [];

//         const processedData = [];

//         const quarterRoman = ['I', 'II', 'III', 'IV'];

 

//         rawData.forEach((row, index) => {

//             processedData.push({ ...row, type: 'month' });

//             const quarterIndex = Math.floor(index / 3);

 

//             if ((index + 1) % 3 === 0 && quarterIndex < 4) {

//                 const quarterMonths = rawData.slice(quarterIndex * 3, (quarterIndex * 3) + 3);

 

//                 if (quarterMonths.length > 0) {

//                     processedData.push({

//                         'Sr No': `Q ${quarterRoman[quarterIndex]}`,

//                         Month: '',

//                         Start: quarterMonths[0].Start,

//                         'New Joinees': quarterMonths.reduce((s, i) => s + i['New Joinees'], 0),

//                         Exit: quarterMonths.reduce((s, i) => s + i.Exit, 0),

//                         End: quarterMonths[quarterMonths.length - 1].End,

//                         'Attrition Rate (%)': quarterMonths.reduce((s, i) => s + i['Attrition Rate (%)'], 0),

//                         type: 'summary'

//                     });

//                 }

//             }

//         });

 

//         if (rawData.length > 0) {

//             processedData.push({

//                 'Sr No': 'Grand Total', Month: '', Start: rawData[0].Start,

//                 'New Joinees': rawData.reduce((s, i) => s + i['New Joinees'], 0),

//                 Exit: rawData.reduce((s, i) => s + i.Exit, 0),

//                 End: rawData[rawData.length - 1].End,

//                 'Attrition Rate (%)': rawData.reduce((s, i) => s + i['Attrition Rate (%)'], 0),

//                 type: 'summary'

//             });

//         }

//         return processedData;

//     };

 

//     const handleGenerateReport = async () => {

//         if (!financialYear || (!department && !division)) {

//             setError("Please select a Year and either a Department or a Division.");

//             setHasSearched(true);

//             return;

//         }

//         setLoading(true);

//         setError(null);

//         setHasSearched(true);

//         setReportData([]);

//         try {

//             const year = financialYear.split('-')[0];

//             let url = `https://tdtlworld.com/hrms-backend/api/employee-attrition-report/?year=${year}`;

//             if (department) { url += `&department_id=${department}`; }

//             else if (division) { url += `&division_id=${division}`; }

//             const response = await axios.get(url);

//             if (response.data && Array.isArray(response.data)) {

//                 setReportData(processReportData(response.data));

//             } else {

//                 setReportData([]);

//             }

//         } catch (err) {

//             console.error("Error fetching report data:", err);

//             setError('Failed to fetch the report. Please try again.');

//         } finally {

//             setLoading(false);

//         }

//     };

 

//     const filteredData = useMemo(() => {

//         if (!searchTerm) {

//             return reportData;

//         }

//         return reportData.filter(row =>

//             (row.Month && row.Month.toLowerCase().includes(searchTerm.toLowerCase())) ||

//             (row['Sr No'] && String(row['Sr No']).toLowerCase().includes(searchTerm.toLowerCase()))

//         );

//     }, [reportData, searchTerm]);

 

//     const handleExport = () => {

//         if (filteredData.length === 0) return;

//         const worksheet = XLSX.utils.json_to_sheet(filteredData);

//         const workbook = XLSX.utils.book_new();

//         XLSX.utils.book_append_sheet(workbook, worksheet, "AttritionReport");

//         XLSX.writeFile(workbook, `Attrition_Report_${financialYear}.xlsx`);

//     };

 

//     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };

//     const tableHeaders = ['Sr No', 'Month', 'Employees at Start', 'New Joinees', 'Exit', 'Employees at End', 'Attrition Rate (%)'];

 

//     return (

//         <Box p={3}>

//             <Typography variant="h5" fontWeight="bold" mb={3}>Employee Attrition Rate Report</Typography>

//             <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} mb={3} alignItems="center" justifyContent="space-between">

//                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" flexWrap="wrap">

//                     <FormControl sx={{ minWidth: 160 }} size="small">

//                         <InputLabel>Financial Year</InputLabel>

//                         <Select

//                             value={financialYear}

//                             label="Financial Year"

//                             onChange={(e) => setFinancialYear(e.target.value)}

//                             MenuProps={menuProps} // Ensure dropdown opens downwards

//                         >

//                             {yearOptions.map(year => (

//                                 <MenuItem key={year} value={`${year}-${parseInt(year) + 1}`}>

//                                     {`${year}-${parseInt(year) + 1}`}

//                                 </MenuItem>

//                             ))}

//                         </Select>

//                     </FormControl>

 

//                     {/* 2. Replace Department Select with Autocomplete for search functionality */}

//                     <Tooltip title={division ? "Clear Division to select a Department" : ""}>

//                         {/* Autocomplete needs a wrapper for the Tooltip to work when disabled */}

//                         <Box sx={{ minWidth: 160 }}>

//                             <Autocomplete

//                                 options={departments}

//                                 getOptionLabel={(option) => option.department_name}

//                                 value={departments.find(d => d.department_id === department) || null}

//                                 onChange={(event, newValue) => {

//                                     setDepartment(newValue ? newValue.department_id : '');

//                                     setDivision(''); // Keep existing logic

//                                 }}

//                                 disabled={!!division}

//                                 size="small"

//                                 renderInput={(params) => <TextField {...params} label="Department" />}

//                                 isOptionEqualToValue={(option, value) => option.department_id === value.department_id}

//                             />

//                         </Box>

//                     </Tooltip>

 

//                     <Tooltip title={department ? "Clear Department to select a Division" : ""}>

//                         <FormControl sx={{ minWidth: 160 }} size="small">

//                             <InputLabel>Division</InputLabel>

//                             <Select

//                                 value={division}

//                                 label="Division"

//                                 disabled={!!department}

//                                 onChange={(e) => { setDivision(e.target.value); setDepartment(''); }}

//                                 MenuProps={menuProps} // Ensure dropdown opens downwards

//                             >

//                                 <MenuItem value=""><em>None</em></MenuItem>

//                                 {divisions.map(d => <MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>)}

//                             </Select>

//                         </FormControl>

//                     </Tooltip>

 

//                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle}

//                         disabled={!financialYear || (!department && !division) || loading}>

//                         Generate

//                     </Button>

//                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>Export</Button>

//                 </Stack>

//                 <TextField

//                     size="small"

//                     variant="outlined"

//                     placeholder="Search..."

//                     value={searchTerm}

//                     onChange={(e) => setSearchTerm(e.target.value)}

//                     sx={{ width: { xs: '100%', lg: 'auto' } }}

//                 />

//             </Stack>

 

//             <TableContainer component={Paper}>

//                 <Table stickyHeader>

//                     <TableHead>

//                         <TableRow>

//                             {tableHeaders.map(header => (<TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header}</TableCell>))}

//                         </TableRow>

//                     </TableHead>

//                     <TableBody>

//                         {loading ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>

//                         ) : error ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>

//                         ) : !hasSearched ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select filters and click Generate.</TableCell></TableRow>

//                         ) : filteredData.length > 0 ? (

//                             filteredData.map((row, index) => (

//                                 <TableRow key={`${row['Sr No']}-${index}`} sx={row.type === 'summary' ? { '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } } : { "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>

//                                     <TableCell align="center">{row['Sr No']}</TableCell><TableCell align="center">{row.Month}</TableCell>

//                                     <TableCell align="center">{row.Start}</TableCell><TableCell align="center">{row['New Joinees']}</TableCell>

//                                     <TableCell align="center">{row.Exit}</TableCell><TableCell align="center">{row.End}</TableCell>

//                                     <TableCell align="center">{row['Attrition Rate (%)']}</TableCell>

//                                 </TableRow>

//                             ))

//                         ) : (<TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>

//                         )}

//                     </TableBody>

//                 </Table>

//             </TableContainer>

//         </Box>

//     );

// }

 

// export default EmployeeAttirationReportAdmin;











import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// --- MUI Imports ---
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Tooltip, Autocomplete
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';

// --- Library Imports for Exporting ---
import * as XLSX from 'xlsx';

// --- DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS ---
const generateYearOptions = () => {
    const years = [];
    // CORRECTED LINE: Removed the extra 'new'
    const now = new Date(); 
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    for (let i = 0; i < 6; i++) {
        years.push(String(latestFinancialYearStart - i));
    }
    return years;
};

// Props to ensure dropdowns open downwards (No Change)
const menuProps = {
  anchorOrigin: { vertical: "bottom", horizontal: "left" },
  transformOrigin: { vertical: "top", horizontal: "left" },
  getContentAnchorEl: null
};

const EmployeeAttritionReportAdmin = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [financialYear, setFinancialYear] = useState('');
    const [department, setDepartment] = useState('');
    const [division, setDivision] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const yearOptions = useMemo(() => generateYearOptions(), []);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [deptRes, divRes] = await Promise.all([
                    axios.get('https://tdtlworld.com/hrms-backend/api/departments/dropdown/'),
                    axios.get('https://tdtlworld.com/hrms-backend/api/division/')
                ]);
                if (deptRes.data?.status === true) setDepartments(deptRes.data.data);
                if (Array.isArray(divRes.data)) setDivisions(divRes.data);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
                setError("Failed to load filter options. Please refresh.");
            }
        };
        fetchDropdownData();
    }, []);

    const processReportData = (rawData) => {
        if (!rawData || rawData.length === 0) return [];
        const processedData = [];
        const quarterRoman = ['I', 'II', 'III', 'IV'];
        rawData.forEach((row, index) => {
            processedData.push({ ...row, type: 'month' });
            const quarterIndex = Math.floor(index / 3);
            if ((index + 1) % 3 === 0 && quarterIndex < 4) {
                const quarterMonths = rawData.slice(quarterIndex * 3, (quarterIndex * 3) + 3);
                if (quarterMonths.length > 0) {
                    processedData.push({
                        'Sr No': `Q ${quarterRoman[quarterIndex]}`, Month: '', Start: quarterMonths[0].Start,
                        'New Joinees': quarterMonths.reduce((s, i) => s + i['New Joinees'], 0),
                        Exit: quarterMonths.reduce((s, i) => s + i.Exit, 0), End: quarterMonths[quarterMonths.length - 1].End,
                        'Attrition Rate (%)': quarterMonths.reduce((s, i) => s + i['Attrition Rate (%)'], 0), type: 'summary'
                    });
                }
            }
        });
        if (rawData.length > 0) {
            processedData.push({
                'Sr No': 'Grand Total', Month: '', Start: rawData[0].Start,
                'New Joinees': rawData.reduce((s, i) => s + i['New Joinees'], 0),
                Exit: rawData.reduce((s, i) => s + i.Exit, 0), End: rawData[rawData.length - 1].End,
                'Attrition Rate (%)': rawData.reduce((s, i) => s + i['Attrition Rate (%)'], 0), type: 'summary'
            });
        }
        return processedData;
    };

    const handleGenerateReport = async () => {
        if (!financialYear || (!department && !division)) {
            setError("Please select a Year and either a Department or a Division.");
            setHasSearched(true); setReportData([]); return;
        }
        setLoading(true); setError(null); setHasSearched(true); setReportData([]);
        try {
            const year = financialYear.split('-')[0];
            let url = `https://tdtlworld.com/hrms-backend/api/employee-attrition-report/?year=${year}`;
            if (department) { url += `&department_id=${department}`; }
            else if (division) { url += `&division_id=${division}`; }
            const response = await axios.get(url);
            setReportData(response.data && Array.isArray(response.data) ? processReportData(response.data) : []);
        } catch (err) {
            console.error("Error fetching report data:", err);
            setError('Failed to fetch the report. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // --- Memoized Calculations for Performance ---
    const filteredData = useMemo(() => {
        if (!searchTerm) return reportData;
        return reportData.filter(row =>
            (row.Month && row.Month.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row['Sr No'] && String(row['Sr No']).toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [reportData, searchTerm]);

    // --- EXPORT FUNCTIONALITY ---
    const handleExportExcel = () => {
        if (filteredData.length === 0) return;
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "AttritionReport");
        XLSX.writeFile(workbook, `Attrition_Report_${financialYear}.xlsx`);
    };

    const tableHeaders = ['Sr No', 'Month', 'Employees at Start', 'New Joinees', 'Exit', 'Employees at End', 'Attrition Rate (%)'];
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Employee Attrition Rate Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
                    <FormControl sx={{ minWidth: 180 }} size="small">
                        <InputLabel>Financial Year</InputLabel>
                        <Select value={financialYear} label="Financial Year" onChange={(e) => setFinancialYear(e.target.value)} MenuProps={menuProps}>
                            {yearOptions.map(year => (
                                <MenuItem key={year} value={`${year}-${parseInt(year) + 1}`}>
                                    {`${year}-${parseInt(year) + 1}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Tooltip title={division ? "Clear Division to select a Department" : ""}>
                        <Box sx={{ minWidth: 180 }}>
                            <Autocomplete
                                options={departments} getOptionLabel={(option) => option.department_name}
                                value={departments.find(d => d.department_id === department) || null}
                                onChange={(event, newValue) => { setDepartment(newValue ? newValue.department_id : ''); setDivision(''); }}
                                disabled={!!division} size="small"
                                renderInput={(params) => <TextField {...params} label="Department" />}
                                isOptionEqualToValue={(option, value) => option.department_id === value.department_id}
                            />
                        </Box>
                    </Tooltip>

                    <Tooltip title={department ? "Clear Department to select a Division" : ""}>
                        <FormControl sx={{ minWidth: 180 }} size="small">
                            <InputLabel>Division</InputLabel>
                            <Select value={division} label="Division" disabled={!!department}
                                onChange={(e) => { setDivision(e.target.value); setDepartment(''); }} MenuProps={menuProps}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {divisions.map(d => <MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Tooltip>

                    <Button variant="contained" onClick={handleGenerateReport}
                        disabled={!financialYear || (!department && !division) || loading}
                        sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate
                    </Button>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />}
                        disabled={filteredData.length === 0}
                        sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Excel
                    </Button>
                    <TextField size="small" variant="outlined" placeholder="Search..."
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: isMobile ? '100%' : 'auto' }}
                    />
                </Stack>
            </Paper>

            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map(header => (<TableCell key={header} sx={headerCellStyle}>{header}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            [...Array(10)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {tableHeaders.map((_, cellIndex) => (<TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>))}
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
                        ) : !hasSearched ? (
                            <TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select filters and click Generate.</TableCell></TableRow>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
                                <TableRow key={`${row['Sr No']}-${index}`}
                                    sx={row.type === 'summary'
                                        ? { '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f0f0f0' } }
                                        : { '&:hover': { backgroundColor: '#f5f5f5' } }
                                    }>
                                    <TableCell align="center">{row['Sr No']}</TableCell>
                                    <TableCell align="center">{row.Month}</TableCell>
                                    <TableCell align="center">{row.Start}</TableCell>
                                    <TableCell align="center">{row['New Joinees']}</TableCell>
                                    <TableCell align="center">{row.Exit}</TableCell>
                                    <TableCell align="center">{row.End}</TableCell>
                                    <TableCell align="center">{row['Attrition Rate (%)']}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default EmployeeAttritionReportAdmin;