// // import React, { useState, useMemo } from 'react';
// // import {
// //     Box, Typography, Table, TableBody, TableCell, TableContainer,
// //     TableHead, TableRow, CircularProgress, Alert,
// //     TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem, Paper
// // } from '@mui/material';
// // import axiosInstance from "../../utils/axiosInstance";
// // import * as XLSX from 'xlsx';

// // // Helper function to format dates, handling nulls
// // const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return "N/A";
// //     return date.toLocaleDateString("en-GB");
// // };

// // // Main component
// // const EmployeeMasterDataReport = () => {
// //     const [reportData, setReportData] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [hasSearched, setHasSearched] = useState(false);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);

// //     // Structure for the complex table headers
// //     const headerGroups = [
// //         { name: 'Basic Info', colspan: 5, subHeaders: ['Sr No.', 'Employee ID', 'Name', 'Contact Number (Personal)', 'Email Id (Personal)'] },
// //         { name: 'Personal Details', colspan: 7, subHeaders: ['Gender', 'Date of Birth', 'Age', 'Marital Status', 'Blood Group', 'Education', 'Degree'] },
// //         { name: 'Permanent Address', colspan: 7, subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] },
// //         { name: 'Work Details', colspan: 8, subHeaders: ['Department', 'Designation', 'Division', 'Sub-Division', 'Headquarter', 'Line Manager', 'D.O.J.', 'Status'] },
// //         { name: 'Bank Account Details', colspan: 6, subHeaders: ['Account Holder Name', 'Account Number', 'Bank Name', 'IFSC', 'Swift Code', 'Bank Branch'] },
// //         { name: 'Emergency Contact', colspan: 2, subHeaders: ['Emergency Contact Name', 'Emergency Contact Number'] },
// //         { name: 'Employment Lifecycle', colspan: 2, subHeaders: ['Exit Date', 'No. of Asset Allocated'] },
// //     ];
// //     // Flatten subHeaders for data mapping
// //     const flatHeaders = headerGroups.flatMap(g => g.subHeaders);

// //     const handleFetchReport = async () => {
// //         setLoading(true);
// //         setError(null);
// //         setHasSearched(true);
// //         setReportData([]);
// //         try {
// //             const response = await axiosInstance.get("/api/employee_master_report/");
// //             const rawData = Array.isArray(response.data) ? response.data : [];
// //             setReportData(rawData);
// //         } catch (err) {
// //             setError("Failed to fetch master data. Please try again later.");
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //             setPage(0);
// //         }
// //     };

// //     const handleExport = () => {
// //         if (filteredData.length === 0) return;
// //         const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Master_Report");
// //         XLSX.writeFile(workbook, "Employee_Master_Report.xlsx");
// //     };

// //     const handleSearchChange = (event) => {
// //         setSearchTerm(event.target.value);
// //         setPage(0);
// //     };

// //     const handleRowsPerPageChange = (event) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     const filteredData = useMemo(() =>
// //         reportData.filter(row =>
// //             (row["Name"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //             (row["Employee ID"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //             (row["Department"]?.toLowerCase().includes(searchTerm.toLowerCase()))
// //         ),
// //         [reportData, searchTerm]
// //     );

// //     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

// //     const purpleButtonStyle = {
// //         backgroundColor: '#673ab7',
// //         color: '#fff',
// //         height: 40,
// //         '&:hover': { backgroundColor: '#5e35b1' },
// //         '&.Mui-disabled': { backgroundColor: '#b39ddb', color: '#f5f5f5' }
// //     };

// //     const headerCellStyle = { fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center', border: '1px solid #ddd' };
// //     const cellStyle = { border: '1px solid #ddd', whiteSpace: 'nowrap' };

// //     return (
// //         <Container maxWidth={false} disableGutters>
// //             {/* Changed my={2} to mb={2} for consistency with the reference component */}
// //             <Typography variant="h5" fontWeight="bold" mb={2}>
// //                 Employee Master Data Report
// //             </Typography>

// //             {/* This Grid layout correctly matches the one in PTReport.js */}
// //             <Grid container spacing={2} mb={2} alignItems="center">
// //                 <Grid item xs={12} sm={4} md={2}>
// //                     <FormControl fullWidth size="small">
// //                         <InputLabel>Rows</InputLabel>
// //                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //                             <MenuItem value={10}>10</MenuItem>
// //                             <MenuItem value={25}>25</MenuItem>
// //                             <MenuItem value={50}>50</MenuItem>
// //                             <MenuItem value={100}>100</MenuItem>
// //                         </Select>
// //                     </FormControl>
// //                 </Grid>
// //                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
// //                     <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle} disabled={loading}>
// //                         Generate Report
// //                     </Button>
// //                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>
// //                         Export Report
// //                     </Button>
// //                 </Grid>
// //                 <Grid item xs={12} sm={12} md={2}>
// //                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
// //                 </Grid>
// //             </Grid>

// //             <TableContainer component={Paper} sx={{ maxHeight: '70vh', borderRadius: 2, boxShadow: 2 }}>
// //                 <Table stickyHeader size="small">
// //                     <TableHead>
// //                         <TableRow>
// //                             {headerGroups.map((group) => (
// //                                 <TableCell key={group.name} colSpan={group.colspan} sx={headerCellStyle}>
// //                                     {group.name}
// //                                 </TableCell>
// //                             ))}
// //                         </TableRow>
// //                         <TableRow>
// //                             {flatHeaders.map((subHeader) => (
// //                                 <TableCell key={subHeader} sx={headerCellStyle}>{subHeader}</TableCell>
// //                             ))}
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {loading ? (
// //                             <TableRow><TableCell colSpan={flatHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
// //                         ) : error ? (
// //                             <TableRow><TableCell colSpan={flatHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
// //                         ) : !hasSearched ? (
// //                             <TableRow><TableCell colSpan={flatHeaders.length} align="center">Click "Generate Report" to view data.</TableCell></TableRow>
// //                         ) : paginatedData.length > 0 ? (
// //                             paginatedData.map((row, index) => (
// //                                 <TableRow key={row["Employee ID"] || index}>
// //                                     {flatHeaders.map(header => {
// //                                         let cellValue = row[header] ?? "N/A";
// //                                         if (header === 'Sr No.') cellValue = page * rowsPerPage + index + 1;
// //                                         if (header === 'Date of Birth' || header === 'D.O.J.' || header === 'Exit Date') cellValue = formatDate(cellValue);
// //                                         if (header === 'Gender') cellValue = row[header] === "1" ? "Male" : (row[header] === "2" ? "Female" : "N/A");
// //                                         return <TableCell key={header} sx={cellStyle}>{cellValue}</TableCell>;
// //                                     })}
// //                                 </TableRow>
// //                             ))
// //                         ) : (
// //                             <TableRow><TableCell colSpan={flatHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {filteredData.length > 0 && (
// //                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
// //                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
// //                         Previous
// //                     </Button>
// //                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
// //                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
// //                         Next 
// //                     </Button>
// //                 </Box>
// //             )}
// //         </Container>
// //     );
// // };

// // export default EmployeeMasterDataReport;  








// // import React, { useState, useMemo } from 'react';
// // import {
// //     Box, Typography, Table, TableBody, TableCell, TableContainer,
// //     TableHead, TableRow, CircularProgress, Alert,
// //     TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem
// // } from '@mui/material';
// // import axiosInstance from "../../utils/axiosInstance";
// // import * as XLSX from 'xlsx';

// // // Helper function to format dates, handling nulls
// // const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return "N/A";
// //     return date.toLocaleDateString("en-GB");
// // };

// // // Main component
// // const EmployeeMasterDataReport = () => {
// //     const [reportData, setReportData] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [hasSearched, setHasSearched] = useState(false);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(10);

// //     const headerGroups = [
// //         { name: 'Basic Info', colspan: 5, subHeaders: ['Sr No.', 'Employee ID', 'Name', 'Contact Number (Personal)', 'Email Id (Personal)'] },
// //         { name: 'Personal Details', colspan: 7, subHeaders: ['Gender', 'Date of Birth', 'Age', 'Marital Status', 'Blood Group', 'Education', 'Degree'] },
// //         { name: 'Permanent Address', colspan: 7, subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] },
// //         { name: 'Work Details', colspan: 8, subHeaders: ['Department', 'Designation', 'Division', 'Sub-Division', 'Headquarter', 'Line Manager', 'D.O.J.', 'Status'] },
// //         { name: 'Bank Account Details', colspan: 6, subHeaders: ['Account Holder Name', 'Account Number', 'Bank Name', 'IFSC', 'Swift Code', 'Bank Branch'] },
// //         { name: 'Emergency Contact', colspan: 2, subHeaders: ['Emergency Contact Name', 'Emergency Contact Number'] },
// //         { name: 'Employment Lifecycle', colspan: 2, subHeaders: ['Exit Date', 'No. of Asset Allocated'] },
// //     ];
// //     const flatHeaders = headerGroups.flatMap(g => g.subHeaders);

// //     const handleFetchReport = async () => {
// //         setLoading(true);
// //         setError(null);
// //         setHasSearched(true);
// //         setReportData([]);
// //         try {
// //             const response = await axiosInstance.get("/api/employee_master_report/");
// //             setReportData(Array.isArray(response.data) ? response.data : []);
// //         } catch (err) {
// //             setError("Failed to fetch master data. Please try again later.");
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //             setPage(0);
// //         }
// //     };

// //     const handleExport = () => {
// //         if (filteredData.length === 0) return;
// //         const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Master_Report");
// //         XLSX.writeFile(workbook, "Employee_Master_Report.xlsx");
// //     };

// //     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
// //     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

// //     const filteredData = useMemo(() =>
// //         reportData.filter(row =>
// //             (row["Name"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //             (row["Employee ID"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //             (row["Department"]?.toLowerCase().includes(searchTerm.toLowerCase()))
// //         ),
// //         [reportData, searchTerm]
// //     );

// //     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

// //     const purpleButtonStyle = {
// //         backgroundColor: '#673ab7', color: '#fff', height: 40,
// //         '&:hover': { backgroundColor: '#5e35b1' },
// //         '&.Mui-disabled': { backgroundColor: '#b39ddb', color: '#f5f5f5' }
// //     };

// //     const headerCellStyle = { fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center', border: '1px solid #ddd' };
// //     const cellStyle = { border: '1px solid #ddd' };

// //     return (
// //         <Container disableGutters>
// //             <Box p={2}>
// //                 <Typography variant="h5" fontWeight="bold" mb={2}>
// //                     Employee Master Data Report
// //                 </Typography>

// //                 {/* --- FIXED: Replaced layout with the consistent Grid system --- */}
// //                 <Grid container spacing={2} mb={2} alignItems="center">
// //                     {/* Rows Dropdown */}
// //                     <Grid item xs={12} sm={4} md={2}>
// //                         <FormControl fullWidth size="small">
// //                             <InputLabel>Rows</InputLabel>
// //                             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //                                 <MenuItem value={10}>10</MenuItem>
// //                                 <MenuItem value={25}>25</MenuItem>
// //                                 <MenuItem value={50}>50</MenuItem>
// //                             </Select>
// //                         </FormControl>
// //                     </Grid>

// //                     {/* Action Buttons */}
// //                     <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
// //                         <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle} disabled={loading}>
// //                             Generate Report
// //                         </Button>
// //                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>
// //                             Export Report
// //                         </Button>
// //                     </Grid>

// //                     {/* Search Field */}
// //                     <Grid item xs={12} sm={12} md={2}>
// //                         <TextField
// //                             fullWidth
// //                             variant="outlined"
// //                             size="small"
// //                             placeholder="Search..."
// //                             value={searchTerm}
// //                             onChange={handleSearchChange}
// //                         />
// //                     </Grid>
// //                 </Grid>

// //                 {/* --- TABLE & PAGINATION --- */}
// //                 <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2, maxHeight: '70vh' }}>
// //                     <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
// //                         <TableHead>
// //                             <TableRow>
// //                                 {headerGroups.map((group) => (
// //                                     <TableCell key={group.name} colSpan={group.colspan} sx={headerCellStyle}>
// //                                         {group.name}
// //                                     </TableCell>
// //                                 ))}
// //                             </TableRow>
// //                             <TableRow>
// //                                 {flatHeaders.map((subHeader) => (
// //                                     <TableCell key={subHeader} sx={{ ...headerCellStyle, top: 57 }}>{subHeader}</TableCell>
// //                                 ))}
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {loading ? (
// //                                 <TableRow><TableCell colSpan={flatHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
// //                             ) : error ? (
// //                                 <TableRow><TableCell colSpan={flatHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
// //                             ) : !hasSearched ? (
// //                                 <TableRow><TableCell colSpan={flatHeaders.length} align="center">Click "Generate Report" to view data.</TableCell></TableRow>
// //                             ) : paginatedData.length > 0 ? (
// //                                 paginatedData.map((row, index) => (
// //                                     <TableRow key={row["Employee ID"] || index}>
// //                                         {flatHeaders.map(header => {
// //                                             let cellValue = row[header] ?? "N/A";
// //                                             if (header === 'Sr No.') cellValue = page * rowsPerPage + index + 1;
// //                                             if (header === 'Date of Birth' || header === 'D.O.J.' || header === 'Exit Date') cellValue = formatDate(cellValue);
// //                                             if (header === 'Gender') cellValue = row[header] === "1" ? "Male" : (row[header] === "2" ? "Female" : "N/A");
// //                                             return <TableCell key={header} sx={cellStyle}>{cellValue}</TableCell>;
// //                                         })}
// //                                     </TableRow>
// //                                 ))
// //                             ) : (
// //                                 <TableRow><TableCell colSpan={flatHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
// //                             )}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>

// //                 {filteredData.length > 0 && (
// //                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
// //                         <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
// //                             Previous
// //                         </Button>
// //                         <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
// //                         <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
// //                             Next
// //                         </Button>
// //                     </Box>
// //                 )}
// //             </Box>
// //         </Container>
// //     );
// // };

// // export default EmployeeMasterDataReport;  ////




// import React, { useState, useMemo, useEffect } from 'react';
// import {
//     Box, Typography, Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, CircularProgress, Alert,
//     TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem,
//     Autocomplete
// } from '@mui/material';
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from 'xlsx';

// // Helper function to format dates, handling nulls
// const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB");
// };

// // Main component
// const EmployeeMasterDataReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [departments, setDepartments] = useState([]);
//     const [designations, setDesignations] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [selectedDepartment, setSelectedDepartment] = useState(null);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);

//     useEffect(() => {
//         const loadDropdowns = async () => {
//             try {
//                 const [depRes, desRes] = await Promise.all([
//                     axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),
//                     axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),
//                 ]);
//                 setDepartments(depRes?.data?.data || []);
//                 setDesignations(desRes?.data?.data || []);
//             } catch (e) {
//                 setError("Failed to load dropdowns");
//             }
//         };
//         loadDropdowns();
//     }, []);

//     // Fetch employees when department and designation are selected
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {
//                 try {
//                     const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;
//                     const res = await axiosInstance.get(url);
//                     const data = res?.data?.data || res?.data || [];
//                     setEmployees(data);
//                     setSelectedEmployee(null); // Reset employee selection when department/designation changes
//                 } catch (e) {
//                     setError("Failed to load employees for the selected criteria.");
//                     console.error("Error fetching employees:", e);
//                 }
//             } else {
//                 setEmployees([]);
//                 setSelectedEmployee(null);
//             }
//         };

//         fetchEmployees();
//     }, [selectedDepartment, selectedDesignation]);

//     const headerGroups = [
//         {
//             name: 'Search By',
//             colspan: 2,
//             subHeaders: ['Sr No.', 'Employee ID']
//         },
//         {
//             name: 'Personal Details',
//             colspan: 15,
//             subHeaders: [
//                 'Contact Number (Personal)', 'Email Id (Personal)', 'Date of Birth', 'Marital Status', 'Blood Group',
//                 'Gender', 'Age', 'Education', 'Degree', 'Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'
//             ]
//         },
//         {
//             name: 'Permanent Address',
//             colspan: 7,
//             subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code']
//         },
//         {
//             name: 'Correspondence Address',
//             colspan: 7,
//             subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code']
//         },
//         {
//             name: 'Work Details',
//             colspan: 15,
//             subHeaders: [
//                 'Contact Number (Company)', 'Email Id (Company)', 'Department', 'Designation', 'Division',
//                 'Sub-Division', 'Level', 'Headquarter', 'Line Manager', 'D.O.J.', 'Office Shift', 'Status',
//                 'Role', 'Holiday Hub', 'Driving License Number'
//             ]
//         },
//         {
//             name: 'Work place Address',
//             colspan: 7,
//             subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code']
//         },
//         {
//             name: 'Document & Compliance',
//             colspan: 7,
//             subHeaders: [
//                 'Aadhar No.', 'PAN No.', 'UAN No.', 'Vehicle No.', 'License Agreement',
//                 'Employee Agreement Holder Name', 'Employee Agreement Number'
//             ]
//         },
//         {
//             name: 'Bank account details',
//             colspan: 7,
//             subHeaders: [
//                 'Account Holder Name', 'Account Number', 'Bank Name', 'IFSC Code', 'Swift Code',
//                 'Bank Branch', 'Bank Address'
//             ]
//         },
//         {
//             name: 'Emergency Family Contact Number',
//             colspan: 2,
//             subHeaders: ['Emergency Contact Name', 'Emergency Contact Number']
//         },
//         {
//             name: 'Employment Lifecycle',
//             colspan: 8,
//             subHeaders: [
//                 'Last Working Date', 'Confirmation Date', 'Probation Date', 'Resignation Date',
//                 'Termination Date', 'Exit Date', 'Exit Type', 'Exit Reason'
//             ]
//         },
//         {
//             name: 'Asset Allocation',
//             colspan: 5,
//             subHeaders: [
//                 'No. of Asset Allocated', 'Asset Name', 'Asset Category', 'Manufacturer', 'Serial Number'
//             ]
//         },
//     ];

//     const flatHeaders = headerGroups.flatMap(g => g.subHeaders);

//     const handleFetchReport = async () => {
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             let url = "https://tdtlworld.com/hrms-backend/apis/employee_master_report/";

//             // Add filters if selected
//             const params = new URLSearchParams();
//             if (selectedDepartment?.department_id) {
//                 params.append('department', selectedDepartment.department_id);
//             }
//             if (selectedDesignation?.designation_id) {
//                 params.append('designation', selectedDesignation.designation_id);
//             }
//             if (selectedEmployee?.employee_id) {
//                 params.append('employee', selectedEmployee.employee_id);
//             }

//             if (params.toString()) {
//                 url += `?${params.toString()}`;
//             }

//             const response = await axiosInstance.get(url);
//             setReportData(Array.isArray(response.data?.data || response.data) ? (response.data?.data || response.data) : []);
//         } catch (err) {
//             setError("Failed to fetch master data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     const handleExport = () => {
//         if (filteredData.length === 0) return;
//         const worksheet = XLSX.utils.json_to_sheet(filteredData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Master_Report");
//         XLSX.writeFile(workbook, "Employee_Master_Report.xlsx");
//     };

//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

//     const filteredData = useMemo(() =>
//         reportData.filter(row =>
//             (row.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row.department_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row.designation_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row.contact_number?.toLowerCase().includes(searchTerm.toLowerCase()))
//         ),
//         [reportData, searchTerm]
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const purpleButtonStyle = {
//         backgroundColor: '#673ab7', color: '#fff', height: 40,
//         '&:hover': { backgroundColor: '#5e35b1' },
//         '&.Mui-disabled': { backgroundColor: '#b39ddb', color: '#f5f5f5' }
//     };

//     const headerCellStyle = {
//         fontWeight: 'bold',
//         backgroundColor: '#e3f2fd',
//         textAlign: 'center',
//         border: '1px solid #ddd',
//         whiteSpace: 'nowrap'
//     };

//     const cellStyle = {
//         border: '1px solid #ddd',
//         whiteSpace: 'nowrap',
//         fontSize: '0.75rem'
//     };

//     return (
//         <Container disableGutters>
//             <Box p={2}>
//                 <Typography variant="h5" fontWeight="bold" mb={2}>
//                     Employee Master Data Report
//                 </Typography>

//                 {/* Filter Section */}
//                 <Grid container spacing={2} mb={2}>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Autocomplete
//                             options={departments}
//                             value={selectedDepartment}
//                             onChange={(_, v) => setSelectedDepartment(v)}
//                             getOptionLabel={(o) => `${o.department_name}`}
//                             renderInput={(params) => <TextField {...params} label="Select Department" size="small" />}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Autocomplete
//                             options={designations}
//                             value={selectedDesignation}
//                             onChange={(_, v) => setSelectedDesignation(v)}
//                             getOptionLabel={(o) => `${o.designation_name} `}
//                             renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Autocomplete
//                             options={employees}
//                             value={selectedEmployee}
//                             onChange={(_, v) => setSelectedEmployee(v)}
//                             getOptionLabel={(o) => `${o.employee_name} `}
//                             disabled={!selectedDepartment || !selectedDesignation}
//                             renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}
//                         />
//                     </Grid>
//                 </Grid>

//                 {/* Controls Section */}
//                 <Grid container spacing={2} mb={2} alignItems="center">
//                     {/* Rows Dropdown */}
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

//                     {/* Action Buttons */}
//                     <Grid item xs={12} sm={4} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                         <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle} disabled={loading}>
//                             Generate Report
//                         </Button>
//                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>
//                             Export Report
//                         </Button>
//                     </Grid>

//                     {/* Search Field */}
//                     <Grid item xs={12} sm={4} md={2}>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                             placeholder="Search..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                         />
//                     </Grid>
//                 </Grid>

//                 {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//                 {/* Table Container - FIXED POSITION PROPERTY */}
//                 <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                     <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                         <TableHead>
//                             {/* Main Header Row */}
//                             <TableRow>
//                                 {headerGroups.map((group) => (
//                                     <TableCell key={group.name} colSpan={group.colspan} sx={headerCellStyle}>
//                                         {group.name}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>

//                             {/* Sub Header Row */}
//                             <TableRow>
//                                 {flatHeaders.map((subHeader) => (
//                                     <TableCell key={subHeader} sx={{ ...headerCellStyle, top: 57 }}>
//                                         {subHeader}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={flatHeaders.length} align="center">
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : error ? (
//                                 <TableRow>
//                                     <TableCell colSpan={flatHeaders.length} align="center">
//                                         <Alert severity="error">{error}</Alert>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : !hasSearched ? (
//                                 <TableRow>
//                                     <TableCell colSpan={flatHeaders.length} align="center">
//                                         Select filters and click "Generate Report" to view data.
//                                     </TableCell>
//                                 </TableRow>
//                             ) : paginatedData.length > 0 ? (
//                                 paginatedData.map((row, index) => (
//                                     <TableRow key={row.employee_id || index}>
//                                         {/* Search By */}
//                                         <TableCell sx={cellStyle}>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.employee_id}</TableCell>

//                                         {/* Personal Details */}
//                                         <TableCell sx={cellStyle}>{row.personal_contact_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_email || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.date_of_birth)}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.marital_status || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.blood_group || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.gender === "1" ? "Male" : (row.gender === "2" ? "Female" : "N/A")}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.age || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.education || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.degree || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_address || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_country || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_state || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_district || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_tehsil || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_village || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.personal_pin_code || 'N/A'}</TableCell>

//                                         {/* Permanent Address */}
//                                         <TableCell sx={cellStyle}>{row.permanent_address || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.permanent_country || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.permanent_state || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.permanent_district || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.permanent_tehsil || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.permanent_village || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.permanent_pin_code || 'N/A'}</TableCell>

//                                         {/* Correspondence Address */}
//                                         <TableCell sx={cellStyle}>{row.correspondence_address || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.correspondence_country || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.correspondence_state || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.correspondence_district || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.correspondence_tehsil || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.correspondence_village || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.correspondence_pin_code || 'N/A'}</TableCell>

//                                         {/* Work Details */}
//                                         <TableCell sx={cellStyle}>{row.company_contact_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.company_email || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.department_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.designation_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.division || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.sub_division || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.level || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.headquarter || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.line_manager || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.date_of_joining)}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.office_shift || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.employment_status || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.role || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.holiday_hub || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.driving_license_number || 'N/A'}</TableCell>

//                                         {/* Work place Address */}
//                                         <TableCell sx={cellStyle}>{row.work_address || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.work_country || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.work_state || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.work_district || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.work_tehsil || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.work_village || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.work_pin_code || 'N/A'}</TableCell>

//                                         {/* Document & Compliance */}
//                                         <TableCell sx={cellStyle}>{row.aadhar_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.pan_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.uan_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.vehicle_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.license_agreement || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.agreement_holder_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.agreement_number || 'N/A'}</TableCell>

//                                         {/* Bank account details */}
//                                         <TableCell sx={cellStyle}>{row.account_holder_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.account_number || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.bank_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.ifsc_code || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.swift_code || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.bank_branch || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.bank_address || 'N/A'}</TableCell>

//                                         {/* Emergency Family Contact Number */}
//                                         <TableCell sx={cellStyle}>{row.emergency_contact_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.emergency_contact_number || 'N/A'}</TableCell>

//                                         {/* Employment Lifecycle */}
//                                         <TableCell sx={cellStyle}>{formatDate(row.last_working_date)}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.confirmation_date)}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.probation_date)}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.resignation_date)}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.termination_date)}</TableCell>
//                                         <TableCell sx={cellStyle}>{formatDate(row.exit_date)}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.exit_type || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.exit_reason || 'N/A'}</TableCell>

//                                         {/* Asset Allocation */}
//                                         <TableCell sx={cellStyle}>{row.assets_allocated_count || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.asset_name || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.asset_category || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.manufacturer || 'N/A'}</TableCell>
//                                         <TableCell sx={cellStyle}>{row.serial_number || 'N/A'}</TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={flatHeaders.length} align="center">
//                                         No data available for the selected criteria.
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {filteredData.length > 0 && (
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page - 1)}
//                             disabled={page === 0}
//                             sx={purpleButtonStyle}
//                         >
//                             Previous
//                         </Button>
//                         <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(page + 1)}
//                             disabled={page >= pageCount - 1}
//                             sx={purpleButtonStyle}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 )}
//             </Box>
//         </Container>
//     );
// };

// export default EmployeeMasterDataReport;
















// import React, { useState, useMemo, useEffect } from 'react';

// import {

//     Box, Typography, Table, TableBody, TableCell, TableContainer,

//     TableHead, TableRow, CircularProgress, Alert,

//     TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem,

//     Autocomplete

// } from '@mui/material';

// import axiosInstance from "../../utils/axiosInstance";

// import * as XLSX from 'xlsx';

 

// // Helper function to format dates, handling nulls

// const formatDate = (dateString) => {

//     if (!dateString) return "N/A";

//     const date = new Date(dateString);

//     if (isNaN(date.getTime())) return "N/A";

//     return date.toLocaleDateString("en-GB");

// };

 

// // Main component

// const EmployeeMasterDataReport = () => {

//     const [reportData, setReportData] = useState([]);

//     const [loading, setLoading] = useState(false);

//     const [error, setError] = useState(null);

//     const [hasSearched, setHasSearched] = useState(false);

//     const [searchTerm, setSearchTerm] = useState("");

//     const [page, setPage] = useState(0);

//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const [departments, setDepartments] = useState([]);

//     const [designations, setDesignations] = useState([]);

//     const [employees, setEmployees] = useState([]);

//     const [selectedDepartment, setSelectedDepartment] = useState(null);

//     const [selectedDesignation, setSelectedDesignation] = useState(null);

//     const [selectedEmployee, setSelectedEmployee] = useState(null);

 

//     useEffect(() => {

//         const loadDropdowns = async () => {

//             try {

//                 const [depRes, desRes] = await Promise.all([

//                     axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),

//                     axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),

//                 ]);

//                 setDepartments(depRes?.data?.data || []);

//                 setDesignations(desRes?.data?.data || []);

//             } catch (e) {

//                 setError("Failed to load dropdowns");

//             }

//         };

//         loadDropdowns();

//     }, []);

 

//     // Fetch employees when department and designation are selected

//     useEffect(() => {

//         const fetchEmployees = async () => {

//             if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {

//                 try {

//                     const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;

//                     const res = await axiosInstance.get(url);

//                     const data = res?.data?.data || res?.data || [];

//                     setEmployees(data);

//                     setSelectedEmployee(null); // Reset employee selection when department/designation changes

//                 } catch (e) {

//                     setError("Failed to load employees for the selected criteria.");

//                     console.error("Error fetching employees:", e);

//                 }

//             } else {

//                 setEmployees([]);

//                 setSelectedEmployee(null);

//             }

//         };

 

//         fetchEmployees();

//     }, [selectedDepartment, selectedDesignation]);

 

//     const headerGroups = [

//         {

//             name: 'Search By',

//             colspan: 2,

//             subHeaders: ['Sr No.', 'Employee ID']

//         },

//         {

//             name: 'Personal Details',

//             colspan: 15,

//             subHeaders: [

//                 'Contact Number (Personal)', 'Email Id (Personal)', 'Date of Birth', 'Marital Status', 'Blood Group',

//                 'Gender', 'Age', 'Education', 'Degree', 'Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'

//             ]

//         },

//         {

//             name: 'Permanent Address',

//             colspan: 7,

//             subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code']

//         },

//         {

//             name: 'Correspondence Address',

//             colspan: 7,

//             subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code']

//         },

//         {

//             name: 'Work Details',

//             colspan: 15,

//             subHeaders: [

//                 'Contact Number (Company)', 'Email Id (Company)', 'Department', 'Designation', 'Division',

//                 'Sub-Division', 'Level', 'Headquarter', 'Line Manager', 'D.O.J.', 'Office Shift', 'Status',

//                 'Role', 'Holiday Hub', 'Driving License Number'

//             ]

//         },

//         {

//             name: 'Work place Address',

//             colspan: 7,

//             subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code']

//         },

//         {

//             name: 'Document & Compliance',

//             colspan: 7,

//             subHeaders: [

//                 'Aadhar No.', 'PAN No.', 'UAN No.', 'Vehicle No.', 'License Agreement',

//                 'Employee Agreement Holder Name', 'Employee Agreement Number'

//             ]

//         },

//         {

//             name: 'Bank account details',

//             colspan: 7,

//             subHeaders: [

//                 'Account Holder Name', 'Account Number', 'Bank Name', 'IFSC Code', 'Swift Code',

//                 'Bank Branch', 'Bank Address'

//             ]

//         },

//         {

//             name: 'Emergency Family Contact Number',

//             colspan: 2,

//             subHeaders: ['Emergency Contact Name', 'Emergency Contact Number']

//         },

//         {

//             name: 'Employment Lifecycle',

//             colspan: 8,

//             subHeaders: [

//                 'Last Working Date', 'Confirmation Date', 'Probation Date', 'Resignation Date',

//                 'Termination Date', 'Exit Date', 'Exit Type', 'Exit Reason'

//             ]

//         },

//         {

//             name: 'Asset Allocation',

//             colspan: 5,

//             subHeaders: [

//                 'No. of Asset Allocated', 'Asset Name', 'Asset Category', 'Manufacturer', 'Serial Number'

//             ]

//         },

//     ];

 

//     const flatHeaders = headerGroups.flatMap(g => g.subHeaders);

 

//     const handleFetchReport = async () => {

//         setLoading(true);

//         setError(null);

//         setHasSearched(true);

//         setReportData([]);

//         try {

//             let url = "https://tdtlworld.com/hrms-backend/apis/employee_master_report/";

 

//             // Add filters if selected

//             const params = new URLSearchParams();

//             if (selectedDepartment?.department_id) {

//                 params.append('department', selectedDepartment.department_id);

//             }

//             if (selectedDesignation?.designation_id) {

//                 params.append('designation', selectedDesignation.designation_id);

//             }

//             if (selectedEmployee?.employee_id) {

//                 params.append('employee', selectedEmployee.employee_id);

//             }

 

//             if (params.toString()) {

//                 url += `?${params.toString()}`;

//             }

 

//             const response = await axiosInstance.get(url);

//             setReportData(Array.isArray(response.data?.data || response.data) ? (response.data?.data || response.data) : []);

//         } catch (err) {

//             setError("Failed to fetch master data. Please try again later.");

//             console.error(err);

//         } finally {

//             setLoading(false);

//             setPage(0);

//         }

//     };

 

//     const handleExport = () => {

//         if (filteredData.length === 0) return;

//         const worksheet = XLSX.utils.json_to_sheet(filteredData);

//         const workbook = XLSX.utils.book_new();

//         XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Master_Report");

//         XLSX.writeFile(workbook, "Employee_Master_Report.xlsx");

//     };

 

//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };

//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

 

//     const filteredData = useMemo(() =>

//         reportData.filter(row =>

//             (row.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||

//             (row.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())) ||

//             (row.department_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||

//             (row.designation_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||

//             (row.contact_number?.toLowerCase().includes(searchTerm.toLowerCase()))

//         ),

//         [reportData, searchTerm]

//     );

 

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

 

//     const purpleButtonStyle = {

//         backgroundColor: '#673ab7', color: '#fff', height: 40,

//         '&:hover': { backgroundColor: '#5e35b1' },

//         '&.Mui-disabled': { backgroundColor: '#b39ddb', color: '#f5f5f5' }

//     };

 

//     const headerCellStyle = {

//         fontWeight: 'bold',

//         backgroundColor: '#e3f2fd',

//         textAlign: 'center',

//         border: '1px solid #ddd',

//         whiteSpace: 'nowrap'

//     };

 

//     const cellStyle = {

//         border: '1px solid #ddd',

//         whiteSpace: 'nowrap',

//         fontSize: '0.75rem'

//     };

 

//     return (

//         <Container disableGutters>

//             <Box p={2}>

//                 <Typography variant="h5" fontWeight="bold" mb={2}>

//                     Employee Master Data Report =

//                 </Typography>

 

//                 {/* Filter Section */}

//                 <Grid container spacing={2} mb={2}>

//                     <Grid item xs={12} sm={6} md={3}>

//                         <Autocomplete

//                             options={departments}

//                             value={selectedDepartment}

//                             onChange={(_, v) => setSelectedDepartment(v)}

//                             getOptionLabel={(o) => `${o.department_name}`}

//                             renderInput={(params) => <TextField {...params} label="Select Department" size="small" />}

//                         />

//                     </Grid>

//                     <Grid item xs={12} sm={6} md={3}>

//                         <Autocomplete

//                             options={designations}

//                             value={selectedDesignation}

//                             onChange={(_, v) => setSelectedDesignation(v)}

//                             getOptionLabel={(o) => `${o.designation_name} `}

//                             renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />}

//                         />

//                     </Grid>

//                     <Grid item xs={12} sm={6} md={3}>

//                         <Autocomplete

//                             options={employees}

//                             value={selectedEmployee}

//                             onChange={(_, v) => setSelectedEmployee(v)}

//                             getOptionLabel={(o) => `${o.employee_name} `}

//                             disabled={!selectedDepartment || !selectedDesignation}

//                             renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}

//                         />

//                     </Grid>

//                 </Grid>

 

//                 {/* Controls Section */}

//                 <Grid container spacing={2} mb={2} alignItems="center">

//                     {/* Rows Dropdown */}

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

 

//                     {/* Action Buttons */}

//                     <Grid item xs={12} sm={4} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>

//                         <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle} disabled={loading}>

//                             Generate Report

//                         </Button>

//                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>

//                             Export Report

//                         </Button>

//                     </Grid>

 

//                     {/* Search Field */}

//                     <Grid item xs={12} sm={4} md={2}>

//                         <TextField

//                             fullWidth

//                             variant="outlined"

//                             size="small"

//                             placeholder="Search..."

//                             value={searchTerm}

//                             onChange={handleSearchChange}

//                         />

//                     </Grid>

//                 </Grid>

 

//                 {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

 

//                 {/* Table Container - FIXED POSITION PROPERTY */}

//                 <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>

//                     <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>

//                         <TableHead>

//                             {/* Main Header Row */}

//                             <TableRow>

//                                 {headerGroups.map((group) => (

//                                     <TableCell key={group.name} colSpan={group.colspan} sx={headerCellStyle}>

//                                         {group.name}

//                                     </TableCell>

//                                 ))}

//                             </TableRow>

 

//                             {/* Sub Header Row */}

//                             <TableRow>

//                                 {flatHeaders.map((subHeader) => (

//                                     <TableCell key={subHeader} sx={{ ...headerCellStyle, top: 57 }}>

//                                         {subHeader}

//                                     </TableCell>

//                                 ))}

//                             </TableRow>

//                         </TableHead>

 

//                         <TableBody>

//                             {loading ? (

//                                 <TableRow>

//                                     <TableCell colSpan={flatHeaders.length} align="center">

//                                         <CircularProgress />

//                                     </TableCell>

//                                 </TableRow>

//                             ) : error ? (

//                                 <TableRow>

//                                     <TableCell colSpan={flatHeaders.length} align="center">

//                                         <Alert severity="error">{error}</Alert>

//                                     </TableCell>

//                                 </TableRow>

//                             ) : !hasSearched ? (

//                                 <TableRow>

//                                     <TableCell colSpan={flatHeaders.length} align="center">

//                                         Select filters and click "Generate Report" to view data.

//                                     </TableCell>

//                                 </TableRow>

//                             ) : paginatedData.length > 0 ? (

//                                 paginatedData.map((row, index) => (

//                                     <TableRow key={row.employee_id || index}>

//                                         {/* Search By */}

//                                         <TableCell sx={cellStyle}>{page * rowsPerPage + index + 1}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.employee_id}</TableCell>

 

//                                         {/* Personal Details */}

//                                         <TableCell sx={cellStyle}>{row.personal_contact_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_email || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.date_of_birth)}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.marital_status || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.blood_group || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.gender === "1" ? "Male" : (row.gender === "2" ? "Female" : "N/A")}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.age || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.education || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.degree || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_address || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_country || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_state || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_district || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_tehsil || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_village || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.personal_pin_code || 'N/A'}</TableCell>

 

//                                         {/* Permanent Address */}

//                                         <TableCell sx={cellStyle}>{row.permanent_address || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.permanent_country || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.permanent_state || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.permanent_district || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.permanent_tehsil || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.permanent_village || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.permanent_pin_code || 'N/A'}</TableCell>

 

//                                         {/* Correspondence Address */}

//                                         <TableCell sx={cellStyle}>{row.correspondence_address || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.correspondence_country || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.correspondence_state || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.correspondence_district || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.correspondence_tehsil || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.correspondence_village || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.correspondence_pin_code || 'N/A'}</TableCell>

 

//                                         {/* Work Details */}

//                                         <TableCell sx={cellStyle}>{row.company_contact_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.company_email || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.department_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.designation_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.division || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.sub_division || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.level || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.headquarter || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.line_manager || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.date_of_joining)}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.office_shift || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.employment_status || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.role || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.holiday_hub || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.driving_license_number || 'N/A'}</TableCell>

 

//                                         {/* Work place Address */}

//                                         <TableCell sx={cellStyle}>{row.work_address || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.work_country || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.work_state || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.work_district || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.work_tehsil || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.work_village || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.work_pin_code || 'N/A'}</TableCell>

 

//                                         {/* Document & Compliance */}

//                                         <TableCell sx={cellStyle}>{row.aadhar_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.pan_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.uan_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.vehicle_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.license_agreement || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.agreement_holder_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.agreement_number || 'N/A'}</TableCell>

 

//                                         {/* Bank account details */}

//                                         <TableCell sx={cellStyle}>{row.account_holder_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.account_number || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.bank_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.ifsc_code || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.swift_code || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.bank_branch || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.bank_address || 'N/A'}</TableCell>

 

//                                         {/* Emergency Family Contact Number */}

//                                         <TableCell sx={cellStyle}>{row.emergency_contact_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.emergency_contact_number || 'N/A'}</TableCell>

 

//                                         {/* Employment Lifecycle */}

//                                         <TableCell sx={cellStyle}>{formatDate(row.last_working_date)}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.confirmation_date)}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.probation_date)}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.resignation_date)}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.termination_date)}</TableCell>

//                                         <TableCell sx={cellStyle}>{formatDate(row.exit_date)}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.exit_type || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.exit_reason || 'N/A'}</TableCell>

 

//                                         {/* Asset Allocation */}

//                                         <TableCell sx={cellStyle}>{row.assets_allocated_count || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.asset_name || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.asset_category || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.manufacturer || 'N/A'}</TableCell>

//                                         <TableCell sx={cellStyle}>{row.serial_number || 'N/A'}</TableCell>

//                                     </TableRow>

//                                 ))

//                             ) : (

//                                 <TableRow>

//                                     <TableCell colSpan={flatHeaders.length} align="center">

//                                         No data available for the selected criteria.

//                                     </TableCell>

//                                 </TableRow>

//                             )}

//                         </TableBody>

//                     </Table>

//                 </TableContainer>

 

//                 {filteredData.length > 0 && (

//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>

//                         <Button

//                             variant="contained"

//                             onClick={() => setPage(page - 1)}

//                             disabled={page === 0}

//                             sx={purpleButtonStyle}

//                         >

//                             Previous

//                         </Button>

//                         <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>

//                         <Button

//                             variant="contained"

//                             onClick={() => setPage(page + 1)}

//                             disabled={page >= pageCount - 1}

//                             sx={purpleButtonStyle}

//                         >

//                             Next

//                         </Button>

//                     </Box>

//                 )}

//             </Box>

//         </Container>

//     );

// };

 

// export default EmployeeMasterDataReport;













import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Autocomplete, Skeleton, useTheme, useMediaQuery, Pagination
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from 'xlsx';

// --- HELPER FUNCTION (No Change) ---
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB");
};

const EmployeeMasterDataReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    useEffect(() => {
        const loadDropdowns = async () => {
            try {
                const [depRes, desRes] = await Promise.all([
                    axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),
                    axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),
                ]);
                setDepartments(depRes?.data?.data || []);
                setDesignations(desRes?.data?.data || []);
            } catch (e) { setError("Failed to load dropdowns"); }
        };
        loadDropdowns();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {
                try {
                    const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;
                    const res = await axiosInstance.get(url);
                    setEmployees(res?.data?.data || res?.data || []);
                } catch (e) {
                    setError("Failed to load employees for the selected criteria.");
                    console.error("Error fetching employees:", e);
                }
            } else { setEmployees([]); }
            setSelectedEmployee(null); // Reset employee on filter change
        };
        fetchEmployees();
    }, [selectedDepartment, selectedDesignation]);

    const handleFetchReport = async () => {
        setLoading(true); setError(null); setHasSearched(true); setReportData([]);
        try {
            const params = new URLSearchParams();
            if (selectedDepartment?.department_id) params.append('department', selectedDepartment.department_id);
            if (selectedDesignation?.designation_id) params.append('designation', selectedDesignation.designation_id);
            if (selectedEmployee?.employee_id) params.append('employee', selectedEmployee.employee_id);
            
            const url = `https://tdtlworld.com/hrms-backend/apis/employee_master_report/?${params.toString()}`;
            const response = await axiosInstance.get(url);
            setReportData(Array.isArray(response.data?.data) ? response.data.data : []);
        } catch (err) {
            setError("Failed to fetch master data. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    const headerGroups = [ { name: 'Search By', colspan: 2, subHeaders: ['Sr No.', 'Employee ID'] }, { name: 'Personal Details', colspan: 16, subHeaders: ['Contact Number (Personal)', 'Email Id (Personal)', 'Date of Birth', 'Marital Status', 'Blood Group', 'Gender', 'Age', 'Education', 'Degree', 'Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] }, { name: 'Permanent Address', colspan: 7, subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] }, { name: 'Correspondence Address', colspan: 7, subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] }, { name: 'Work Details', colspan: 15, subHeaders: ['Contact Number (Company)', 'Email Id (Company)', 'Department', 'Designation', 'Division', 'Sub-Division', 'Level', 'Headquarter', 'Line Manager', 'D.O.J.', 'Office Shift', 'Status', 'Role', 'Holiday Hub', 'Driving License Number'] }, { name: 'Work place Address', colspan: 7, subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] }, { name: 'Document & Compliance', colspan: 7, subHeaders: ['Aadhar No.', 'PAN No.', 'UAN No.', 'Vehicle No.', 'License Agreement', 'Employee Agreement Holder Name', 'Employee Agreement Number'] }, { name: 'Bank account details', colspan: 7, subHeaders: ['Account Holder Name', 'Account Number', 'Bank Name', 'IFSC Code', 'Swift Code', 'Bank Branch', 'Bank Address'] }, { name: 'Emergency Family Contact Number', colspan: 2, subHeaders: ['Emergency Contact Name', 'Emergency Contact Number'] }, { name: 'Employment Lifecycle', colspan: 8, subHeaders: ['Last Working Date', 'Confirmation Date', 'Probation Date', 'Resignation Date', 'Termination Date', 'Exit Date', 'Exit Type', 'Exit Reason'] }, { name: 'Asset Allocation', colspan: 5, subHeaders: ['No. of Asset Allocated', 'Asset Name', 'Asset Category', 'Manufacturer', 'Serial Number'] }, ];
    const flatHeaders = useMemo(() => headerGroups.flatMap(g => g.subHeaders), []);

    // --- Memoized Calculations & Event Handlers ---++
    const filteredData = useMemo(() => reportData.filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))), [reportData, searchTerm]);
    const paginatedData = useMemo(() => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredData, page, rowsPerPage]);
    
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

    // --- EXPORT FUNCTIONALITY ---
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Master_Report");
        XLSX.writeFile(workbook, "Employee_Master_Report.xlsx");
    };

    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center', border: '1px solid #ddd', whiteSpace: 'nowrap' };
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Employee Master Data Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2} flexWrap="wrap">
                    <Autocomplete options={departments} value={selectedDepartment} onChange={(_, v) => setSelectedDepartment(v)} getOptionLabel={(o) => o.department_name} renderInput={(params) => <TextField {...params} label="Select Department" size="small" />} sx={{ minWidth: 200, flexGrow: 1 }} />
                    <Autocomplete options={designations} value={selectedDesignation} onChange={(_, v) => setSelectedDesignation(v)} getOptionLabel={(o) => o.designation_name} renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />} sx={{ minWidth: 200, flexGrow: 1 }} />
                    <Autocomplete options={employees} value={selectedEmployee} onChange={(_, v) => setSelectedEmployee(v)} getOptionLabel={(o) => o.employee_name} disabled={!selectedDepartment || !selectedDesignation} renderInput={(params) => <TextField {...params} label="Select Employee (Optional)" size="small" />} sx={{ minWidth: 200, flexGrow: 1 }} />
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={handleFetchReport} disabled={loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
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
                                <TableRow>{headerGroups.map((group) => <TableCell key={group.name} colSpan={group.colspan} sx={headerCellStyle}>{group.name}</TableCell>)}</TableRow>
                                <TableRow>{flatHeaders.map((subHeader) => <TableCell key={subHeader} sx={{ ...headerCellStyle, top: 57 }}>{subHeader}</TableCell>)}</TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {[...Array(flatHeaders.length)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                        </TableRow>
                                    ))
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((row, index) => (
                                        <TableRow key={row.employee_id || index} hover>
                                            {/* Data cells - ensure order matches flatHeaders */}
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell><TableCell>{row.employee_id || 'N/A'}</TableCell>
                                            <TableCell>{row.personal_contact_number || 'N/A'}</TableCell><TableCell>{row.personal_email || 'N/A'}</TableCell><TableCell>{formatDate(row.date_of_birth)}</TableCell><TableCell>{row.marital_status || 'N/A'}</TableCell><TableCell>{row.blood_group || 'N/A'}</TableCell><TableCell>{row.gender === "1" ? "Male" : (row.gender === "2" ? "Female" : "N/A")}</TableCell><TableCell>{row.age || 'N/A'}</TableCell><TableCell>{row.education || 'N/A'}</TableCell><TableCell>{row.degree || 'N/A'}</TableCell><TableCell>{row.personal_address || 'N/A'}</TableCell><TableCell>{row.personal_country || 'N/A'}</TableCell><TableCell>{row.personal_state || 'N/A'}</TableCell><TableCell>{row.personal_district || 'N/A'}</TableCell><TableCell>{row.personal_tehsil || 'N/A'}</TableCell><TableCell>{row.personal_village || 'N/A'}</TableCell><TableCell>{row.personal_pin_code || 'N/A'}</TableCell>
                                            <TableCell>{row.permanent_address || 'N/A'}</TableCell><TableCell>{row.permanent_country || 'N/A'}</TableCell><TableCell>{row.permanent_state || 'N/A'}</TableCell><TableCell>{row.permanent_district || 'N/A'}</TableCell><TableCell>{row.permanent_tehsil || 'N/A'}</TableCell><TableCell>{row.permanent_village || 'N/A'}</TableCell><TableCell>{row.permanent_pin_code || 'N/A'}</TableCell>
                                            <TableCell>{row.correspondence_address || 'N/A'}</TableCell><TableCell>{row.correspondence_country || 'N/A'}</TableCell><TableCell>{row.correspondence_state || 'N/A'}</TableCell><TableCell>{row.correspondence_district || 'N/A'}</TableCell><TableCell>{row.correspondence_tehsil || 'N/A'}</TableCell><TableCell>{row.correspondence_village || 'N/A'}</TableCell><TableCell>{row.correspondence_pin_code || 'N/A'}</TableCell>
                                            <TableCell>{row.company_contact_number || 'N/A'}</TableCell><TableCell>{row.company_email || 'N/A'}</TableCell><TableCell>{row.department_name || 'N/A'}</TableCell><TableCell>{row.designation_name || 'N/A'}</TableCell><TableCell>{row.division || 'N/A'}</TableCell><TableCell>{row.sub_division || 'N/A'}</TableCell><TableCell>{row.level || 'N/A'}</TableCell><TableCell>{row.headquarter || 'N/A'}</TableCell><TableCell>{row.line_manager || 'N/A'}</TableCell><TableCell>{formatDate(row.date_of_joining)}</TableCell><TableCell>{row.office_shift || 'N/A'}</TableCell><TableCell>{row.employment_status || 'N/A'}</TableCell><TableCell>{row.role || 'N/A'}</TableCell><TableCell>{row.holiday_hub || 'N/A'}</TableCell><TableCell>{row.driving_license_number || 'N/A'}</TableCell>
                                            <TableCell>{row.work_address || 'N/A'}</TableCell><TableCell>{row.work_country || 'N/A'}</TableCell><TableCell>{row.work_state || 'N/A'}</TableCell><TableCell>{row.work_district || 'N/A'}</TableCell><TableCell>{row.work_tehsil || 'N/A'}</TableCell><TableCell>{row.work_village || 'N/A'}</TableCell><TableCell>{row.work_pin_code || 'N/A'}</TableCell>
                                            <TableCell>{row.aadhar_number || 'N/A'}</TableCell><TableCell>{row.pan_number || 'N/A'}</TableCell><TableCell>{row.uan_number || 'N/A'}</TableCell><TableCell>{row.vehicle_number || 'N/A'}</TableCell><TableCell>{row.license_agreement || 'N/A'}</TableCell><TableCell>{row.agreement_holder_name || 'N/A'}</TableCell><TableCell>{row.agreement_number || 'N/A'}</TableCell>
                                            <TableCell>{row.account_holder_name || 'N/A'}</TableCell><TableCell>{row.account_number || 'N/A'}</TableCell><TableCell>{row.bank_name || 'N/A'}</TableCell><TableCell>{row.ifsc_code || 'N/A'}</TableCell><TableCell>{row.swift_code || 'N/A'}</TableCell><TableCell>{row.bank_branch || 'N/A'}</TableCell><TableCell>{row.bank_address || 'N/A'}</TableCell>
                                            <TableCell>{row.emergency_contact_name || 'N/A'}</TableCell><TableCell>{row.emergency_contact_number || 'N/A'}</TableCell>
                                            <TableCell>{formatDate(row.last_working_date)}</TableCell><TableCell>{formatDate(row.confirmation_date)}</TableCell><TableCell>{formatDate(row.probation_date)}</TableCell><TableCell>{formatDate(row.resignation_date)}</TableCell><TableCell>{formatDate(row.termination_date)}</TableCell><TableCell>{formatDate(row.exit_date)}</TableCell><TableCell>{row.exit_type || 'N/A'}</TableCell><TableCell>{row.exit_reason || 'N/A'}</TableCell>
                                            <TableCell>{row.assets_allocated_count || 'N/A'}</TableCell><TableCell>{row.asset_name || 'N/A'}</TableCell><TableCell>{row.asset_category || 'N/A'}</TableCell><TableCell>{row.manufacturer || 'N/A'}</TableCell><TableCell>{row.serial_number || 'N/A'}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={flatHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
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

export default EmployeeMasterDataReport;