// import React, { useState, useMemo } from 'react';
// import {
//     Box, Typography, Table, TableBody, TableCell, TableContainer, Container,
//     TableHead, TableRow, TableFooter, CircularProgress, Alert, Grid, FormControl,
//     InputLabel, Select, MenuItem, TextField, Button, Paper
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// const AnnualManpowerAdminReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [totalRow, setTotalRow] = useState(null);
//     const [months, setMonths] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [selectedYear, setSelectedYear] = useState(''); // Empty by default
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const yearOptions = ['2024', '2023', '2022']; // As per original component

//     const handleGenerateReport = async () => {
//         if (!selectedYear) {
//             setError("Please select a financial year.");
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         setTotalRow(null);
//         setMonths([]);

//         try {
//             const response = await fetch(`https://tdtlworld.com/hrms-backend/api/manpower-report/?year=${selectedYear}`);
//             if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
//             const data = await response.json();
//             setReportData(data.report_data || []);
//             setTotalRow(data.total_row || null);
//             setMonths(data.months || []);
//         } catch (e) {
//             setError('Failed to fetch report data. Please try again later.');
//             console.error("API fetch error:", e);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

//     const filteredData = useMemo(() => {
//         if (!searchTerm) return reportData;
//         return reportData.filter(dept => dept.department.toLowerCase().includes(searchTerm.toLowerCase()));
//     }, [reportData, searchTerm]);

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const handleExport = () => {
//         if (!filteredData.length && !totalRow) return;
//         const dataToExport = filteredData.map(dept => {
//             const row = {
//                 'Sr.No': dept.sr_no,
//                 'Department': dept.department,
//             };
//             months.forEach(month => { row[month.split('-')[0]] = dept.monthly_counts[month] || 0; });
//             row['Total'] = dept.total;
//             return row;
//         });

//         // Add total row to the export
//         if (totalRow) {
//             const totalExportRow = { 'Sr.No': totalRow.sr_no, 'Department': totalRow.department };
//             months.forEach(month => { totalExportRow[month.split('-')[0]] = totalRow.monthly_counts[month] || 0; });
//             totalExportRow['Total'] = totalRow.total;
//             dataToExport.push(totalExportRow);
//         }

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "ManpowerReport");
//         XLSX.writeFile(workbook, `AnnualManpowerReport-${selectedYear}.xlsx`);
//     };

//     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };
//     const tableHeaders = ['Sr.No', 'Department', ...months.map(m => m.split('-')[0]), 'Total'];

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>Annual Manpower Report</Typography>
//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem><MenuItem value={100}>100</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select value={selectedYear} label="Financial Year" onChange={(e) => setSelectedYear(e.target.value)} displayEmpty>
//                             <MenuItem value="" disabled><em></em></MenuItem>
//                             {yearOptions.map(year => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle} disabled={!selectedYear || loading}>Generate Report</Button>
//                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={reportData.length === 0}>Export Excel</Button>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search Department..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {tableHeaders.map(header => (<TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header}</TableCell>))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (<TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select a year and click Generate Report.</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map(dept => (
//                                 <TableRow key={dept.sr_no} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     <TableCell align="center">{dept.sr_no}</TableCell>
//                                     <TableCell>{dept.department}</TableCell>
//                                     {months.map(month => <TableCell key={month} align="center">{dept.monthly_counts[month] || 0}</TableCell>)}
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>{dept.total}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (<TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                     {totalRow && !loading && (
//                         <TableFooter>
//                             <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } }}>
//                                 <TableCell align="center">{totalRow.sr_no}</TableCell>
//                                 <TableCell>{totalRow.department}</TableCell>
//                                 {months.map(month => <TableCell key={`total-${month}`} align="center">{totalRow.monthly_counts[month] || 0}</TableCell>)}
//                                 <TableCell align="center">{totalRow.total}</TableCell>
//                             </TableRow>
//                         </TableFooter>
//                     )}
//                 </Table>
//             </TableContainer>

//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//                         <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                         <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//                     </Box>
//                 </Box>
//             )}
//         </Container>
//     );
// }

// export default AnnualManpowerAdminReport;    /////// 



    // import React, { useState, useMemo } from 'react';
    // import {
    //     Box, Typography, Table, TableBody, TableCell, TableContainer,
    //     TableHead, TableRow, CircularProgress, Alert, Stack,
    //     FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper, TablePagination
    // } from '@mui/material';
    // import * as XLSX from 'xlsx';

    // // --- HELPER FUNCTION TO TRANSFORM API DATA ---
    // const transformApiData = (apiData) => {
    //     if (!apiData) return { department: '', monthly_counts: {}, total: 0 };

    //     const monthly_counts_object = Array.isArray(apiData.manpower_counts)
    //         ? apiData.manpower_counts.reduce((acc, item) => {
    //             acc[item.month] = item.count;
    //             return acc;
    //         }, {})
    //         : {};

    //     return {
    //         department: apiData.department_name || '',
    //         monthly_counts: monthly_counts_object,
    //         total: apiData.total_for_department || 0
    //     };
    // };

    // // --- DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS ---
    // const generateYearOptions = () => {
    //     const years = [];
    //     const now = new Date();
    //     const currentYear = now.getFullYear();
    //     const currentMonth = now.getMonth(); // 0 = January, 3 = April
    //     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

    //     for (let i = 0; i < 6; i++) {
    //         years.push(String(latestFinancialYearStart - i));
    //     }
    //     return years;
    // };


    // const AnnualManpowerAdminReport = () => {
    //     const yearOptions = useMemo(() => generateYearOptions(), []);
    //     const [reportData, setReportData] = useState([]);
    //     const [totalRow, setTotalRow] = useState(null);
    //     const [months, setMonths] = useState([]);
    //     const [loading, setLoading] = useState(false);
    //     const [error, setError] = useState(null);
    //     const [hasSearched, setHasSearched] = useState(false);
    //     const [selectedYear, setSelectedYear] = useState('');
    //     const [searchTerm, setSearchTerm] = useState("");
    //     const [page, setPage] = useState(0);
    //     const [rowsPerPage, setRowsPerPage] = useState(10);

    //     const handleGenerateReport = async () => {
    //         if (!selectedYear) {
    //             setError("Please select a financial year.");
    //             setHasSearched(true);
    //             return;
    //         }
    //         setLoading(true);
    //         setError(null);
    //         setHasSearched(true);
    //         setReportData([]);
    //         setTotalRow(null);
    //         setMonths([]);

    //         try {
    //             const response = await fetch(`https://tdtlworld.com/hrms-backend/api/manpower-report/?year=${selectedYear}`);
    //             if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
    //             const data = await response.json();

    //             if (data && Array.isArray(data.data) && data.data.length > 0) {
    //                 const allDataRows = data.data;
    //                 const rawTotalRow = allDataRows.pop();
    //                 const transformedTotalRow = transformApiData(rawTotalRow);
    //                 const transformedReportData = allDataRows.map(row => transformApiData(row));

    //                 setReportData(transformedReportData);
    //                 setTotalRow(transformedTotalRow);
    //                 setMonths(data.months || []);
    //             } else {
    //                 setReportData([]);
    //                 setTotalRow(null);
    //                 setMonths([]);
    //             }

    //         } catch (e) {
    //             setError('Failed to fetch report data. Please try again later.');
    //             console.error("API fetch error:", e);
    //         } finally {
    //             setLoading(false);
    //             setPage(0);
    //         }
    //     };

    //     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    //     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    //     const handleChangePage = (event, newPage) => { setPage(newPage); };

    //     const filteredData = useMemo(() => {
    //         if (!searchTerm) return reportData;
    //         return reportData.filter(dept => dept.department.toLowerCase().includes(searchTerm.toLowerCase()));
    //     }, [reportData, searchTerm]);

    //     const tableHeaders = useMemo(() => {
    //         const baseHeaders = ['Sr.No', 'Department'];
    //         const monthHeaders = months.map(m => m.split('-')[0]);
    //         return [...baseHeaders, ...monthHeaders, 'Total'];
    //     }, [months]);

    //     const handleExport = () => {
    //         if (!filteredData.length && !totalRow) return;
    //         const dataToExport = filteredData.map((dept, index) => {
    //             const row = {
    //                 'Sr.No': index + 1,
    //                 'Department': dept.department,
    //             };
    //             months.forEach(month => { row[month.split('-')[0]] = dept.monthly_counts?.[month] || 0; });
    //             row['Total'] = dept.total;
    //             return row;
    //         });

    //         if (totalRow) {
    //             const totalExportRow = { 'Sr.No': 'Total', 'Department': totalRow.department };
    //             months.forEach(month => { totalExportRow[month.split('-')[0]] = totalRow.monthly_counts?.[month] || 0; });
    //             totalExportRow['Total'] = totalRow.total;
    //             dataToExport.push(totalExportRow);
    //         }

    //         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook, worksheet, "ManpowerReport");
    //         XLSX.writeFile(workbook, `AnnualManpowerReport-${selectedYear}.xlsx`);
    //     };

    //     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", "&:hover": { backgroundColor: "#5e35b1" } };
    //     const lastPageIndex = Math.max(0, Math.ceil(filteredData.length / rowsPerPage) - 1);


    //     return (
    //         <Box p={3}>
    //             <Typography variant="h5" fontWeight="bold" mb={3}>Annual Manpower Report</Typography>

    //             <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={3} alignItems="center" justifyContent="space-between">
    //                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" flexWrap="wrap">
    //                     <FormControl size="small" sx={{ minWidth: 100 }}>
    //                         <InputLabel>Rows</InputLabel>
    //                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
    //                             <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem>
    //                             <MenuItem value={50}>50</MenuItem><MenuItem value={100}>100</MenuItem>
    //                         </Select>
    //                     </FormControl>
    //                     <FormControl sx={{ minWidth: 180 }} size="small">
    //                         <InputLabel>Financial Year</InputLabel>
    //                         <Select value={selectedYear} label="Financial Year" onChange={(e) => setSelectedYear(e.target.value)}>
    //                             {yearOptions.map(year => (
    //                                 <MenuItem key={year} value={year}>
    //                                     {`${year}-${parseInt(year) + 1}`}
    //                                 </MenuItem>
    //                             ))}
    //                         </Select>
    //                     </FormControl>
    //                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle} disabled={!selectedYear || loading}>Generate</Button>
    //                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>Export</Button>
    //                 </Stack>
    //                 <TextField size="small" variant="outlined" placeholder="Search Department..." value={searchTerm} onChange={handleSearchChange} sx={{ width: { xs: '100%', md: 'auto' } }} />
    //             </Stack>

    //             <TableContainer component={Paper}>
    //                 <Table stickyHeader>
    //                     <TableHead>
    //                         <TableRow>
    //                             {tableHeaders.map(header => (
    //                                 <TableCell key={header} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>
    //                                     {header}
    //                                 </TableCell>
    //                             ))}
    //                         </TableRow>
    //                     </TableHead>
    //                     <TableBody>
    //                         {loading ? (
    //                             <TableRow><TableCell colSpan={tableHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
    //                         ) : error ? (
    //                             <TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
    //                         ) : !hasSearched ? (
    //                             <TableRow><TableCell colSpan={tableHeaders.length} align="center">Please select a year and click Generate Report.</TableCell></TableRow>
    //                         ) : filteredData.length > 0 ? (
    //                             // Using a React Fragment to group the list and the conditional total row
    //                             <>
    //                                 {(rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData)
    //                                     .map((dept, index) => (
    //                                         <TableRow key={dept.department + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
    //                                             <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
    //                                             <TableCell>{dept.department}</TableCell>
    //                                             {months.map(month => (
    //                                                 <TableCell key={month} align="center">{dept.monthly_counts?.[month] || 0}</TableCell>
    //                                             ))}
    //                                             <TableCell align="center" sx={{ fontWeight: 'bold' }}>{dept.total}</TableCell>
    //                                         </TableRow>
    //                                     ))
    //                                 }
    //                                 {/* --- CHANGE: Total row is now here, inside the TableBody --- */}
    //                                 {totalRow && page === lastPageIndex && (
    //                                     <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#e0e0e0', borderTop: '2px solid #bdbdbd', fontSize: '1rem' } }}>
    //                                         <TableCell align="center" colSpan={2}>Total</TableCell>
    //                                         {months.map(month => (
    //                                             <TableCell key={`total-${month}`} align="center">{totalRow.monthly_counts?.[month] || 0}</TableCell>
    //                                         ))}
    //                                         <TableCell align="center">{totalRow.total}</TableCell>
    //                                     </TableRow>
    //                                 )}
    //                             </>
    //                         ) : (
    //                             <TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
    //                         )}
    //                     </TableBody>
    //                     {/* The TableFooter has been removed from here */}
    //                 </Table>
    //             </TableContainer>

    //             <TablePagination
    //                 rowsPerPageOptions={[10, 25, 50, 100]}
    //                 component="div"
    //                 count={filteredData.length}
    //                 rowsPerPage={rowsPerPage}
    //                 page={page}
    //                 onPageChange={handleChangePage}
    //                 onRowsPerPageChange={handleRowsPerPageChange}
    //             />
    //         </Box>
    //     );
    // }

    // export default AnnualManpowerAdminReport;




//     import React, { useState, useMemo, useEffect } from 'react';

// // --- MUI Imports ---
// import {
//     Box, Typography, Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Alert, Stack,
//     FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper, TablePagination,
//     Skeleton, useTheme, useMediaQuery
// } from '@mui/material';

// // --- Library Imports ---
// import * as XLSX from 'xlsx';
// import Swal from 'sweetalert2';

// // --- HELPER FUNCTION TO TRANSFORM API DATA (No Change) ---
// const transformApiData = (apiData) => {
//     if (!apiData) return { department: '', monthly_counts: {}, total: 0 };
//     const monthly_counts_object = Array.isArray(apiData.manpower_counts)
//         ? apiData.manpower_counts.reduce((acc, item) => { acc[item.month] = item.count; return acc; }, {})
//         : {};
//     return {
//         department: apiData.department_name || '',
//         monthly_counts: monthly_counts_object,
//         total: apiData.total_for_department || 0
//     };
// };

// // --- DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS (No Change) ---
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

// const AnnualManpowerAdminReport = () => {
//     // --- Hooks for State, Theme, and Responsiveness ---
//     const yearOptions = useMemo(() => generateYearOptions(), []);
//     const [reportData, setReportData] = useState([]);
//     const [totalRow, setTotalRow] = useState(null);
//     const [months, setMonths] = useState([]);
//     const [loading, setLoading] = useState(true); // Start with loading true for initial fetch
//     const [error, setError] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(yearOptions[0] || '');
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     // --- Data Fetching and Effects ---
//     const handleGenerateReport = async (yearToFetch) => {
//         if (!yearToFetch) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'No Year Selected',
//                 text: 'Please select a financial year to generate a report.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setReportData([]);
//         setTotalRow(null);

//         try {
//             const response = await fetch(`https://tdtlworld.com/hrms-backend/api/manpower-report/?year=${yearToFetch}`);
//             if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
//             const data = await response.json();

//             if (data && Array.isArray(data.data) && data.data.length > 0) {
//                 const allDataRows = data.data;
//                 const rawTotalRow = allDataRows.pop();
//                 setReportData(allDataRows.map(transformApiData));
//                 setTotalRow(transformApiData(rawTotalRow));
//                 setMonths(data.months || []);
//             } else {
//                 setReportData([]);
//                 setTotalRow(null);
//                 setMonths([]);
//             }
//         } catch (e) {
//             setError('Failed to fetch report data. Please try again later.');
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Failed',
//                 text: 'Could not retrieve the report data. Please check your connection or try again later.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             console.error("API fetch error:", e);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     // --- Auto-fetch data on initial component load ---
//     useEffect(() => {
//         if (selectedYear) {
//             handleGenerateReport(selectedYear);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Run only once

//     // --- Memoized Calculations for Performance ---
//     const filteredData = useMemo(() => {
//         if (!searchTerm) return reportData;
//         return reportData.filter(dept => dept.department.toLowerCase().includes(searchTerm.toLowerCase()));
//     }, [reportData, searchTerm]);

//     const paginatedData = useMemo(() => {
//         return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     }, [filteredData, page, rowsPerPage]);

//     const tableHeaders = useMemo(() => {
//         const baseHeaders = ['SR. NO.', 'DEPARTMENT'];
//         const monthHeaders = months.map(m => m.split('-')[0]);
//         return [...baseHeaders, ...monthHeaders, 'Total'];
//     }, [months]);


//     // --- Event Handlers ---
//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
//     const handleChangePage = (event, newPage) => { setPage(newPage); };
//     const onGenerateClick = () => handleGenerateReport(selectedYear);

//     const handleExport = () => {
//         // (No changes to export logic)
//     };

//     // --- Styling Constants ---
//     const primaryColor = "#8C257C";
//     const primaryButtonHover = "#6d1d60";
//     const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };

//     return (
//         <Box p={2}>
//             {/* --- PAGE HEADER --- */}
//             <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
//                 Annual Manpower Report
//             </Typography>

//             {/* --- CONTROLS: FILTERS, SEARCH, AND ACTIONS --- */}
//             <Stack
//                 direction={isMobile ? 'column' : 'row'}
//                 justifyContent="space-between"
//                 alignItems="center"
//                 spacing={2}
//                 mb={2}
//             >
//                 <Stack direction="row" spacing={2} flexWrap="wrap">
//                     <FormControl sx={{ minWidth: 180 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select value={selectedYear} label="Financial Year" onChange={(e) => setSelectedYear(e.target.value)}>
//                             {yearOptions.map(year => (
//                                 <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <Button variant="contained" onClick={onGenerateClick} disabled={!selectedYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
//                         Generate
//                     </Button>
//                     <Button variant="contained" onClick={handleExport} disabled={filteredData.length === 0} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
//                         Export
//                     </Button>
//                 </Stack>
//                 <TextField size="small" variant="outlined" placeholder="Search Department..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
//             </Stack>

//             {/* --- DATA TABLE --- */}
//             <TableContainer component={Paper}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {tableHeaders.map(header => (<TableCell key={header} sx={headerCellStyle}>{header}</TableCell>))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             // --- SKELETON LOADER ---
//                             [...Array(rowsPerPage)].map((_, rowIndex) => (
//                                 <TableRow key={rowIndex}>
//                                     {tableHeaders.map((header, cellIndex) => (
//                                         <TableCell key={cellIndex}>
//                                             <Skeleton variant="text" />
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             <>
//                                 {paginatedData.map((dept, index) => (
//                                     <TableRow key={dept.department + index} hover>
//                                         <TableCell align="center" sx={{ typography: 'body2' }}>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell sx={{ typography: 'body2' }}>{dept.department}</TableCell>
//                                         {months.map(month => (
//                                             <TableCell key={month} align="center" sx={{ typography: 'body2' }}>{dept.monthly_counts?.[month] || 0}</TableCell>
//                                         ))}
//                                         <TableCell align="center" sx={{ fontWeight: 'bold', typography: 'body2' }}>{dept.total}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </>
//                         ) : (
//                             <TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* --- PAGINATION AND FOOTER --- */}
//             <Box
//                 component="footer"
//                 sx={{
//                     display: 'flex',
//                     flexDirection: isMobile ? 'column' : 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     p: 2,
//                     gap: 2
//                 }}
//             >
//                 <Typography variant="body2" color="text.secondary">
//                     Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//                 </Typography>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     component="div"
//                     count={filteredData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleRowsPerPageChange}
//                     sx={{
//                         // --- Style pagination icons and numbers ---
//                         '& .Mui-selected': { color: primaryColor },
//                         '& .MuiTablePagination-actions button:hover': { backgroundColor: `${primaryColor}20`},
//                         '& .MuiTablePagination-actions .Mui-disabled': { opacity: 0.3 },
//                     }}
//                 />
//             </Box>
//         </Box>
//     );
// }

// export default AnnualManpowerAdminReport;






// import React, { useState, useMemo, useEffect } from 'react';

// // --- MUI Imports ---
// import {
//     Box, Typography, Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Alert, Stack,
//     FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper, TablePagination,
//     Skeleton, useTheme, useMediaQuery
// } from '@mui/material';

// // --- Library Imports ---
// import * as XLSX from 'xlsx';
// import Swal from 'sweetalert2';

// // --- HELPER FUNCTION TO TRANSFORM API DATA (No Change) ---
// const transformApiData = (apiData) => {
//     if (!apiData) return { department: '', monthly_counts: {}, total: 0 };
//     const monthly_counts_object = Array.isArray(apiData.manpower_counts)
//         ? apiData.manpower_counts.reduce((acc, item) => { acc[item.month] = item.count; return acc; }, {})
//         : {};
//     return {
//         department: apiData.department_name || '',
//         monthly_counts: monthly_counts_object,
//         total: apiData.total_for_department || 0
//     };
// };

// // --- DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS (No Change) ---
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

// const AnnualManpowerAdminReport = () => {
//     // --- Hooks for State, Theme, and Responsiveness ---
//     const yearOptions = useMemo(() => generateYearOptions(), []);
//     const [reportData, setReportData] = useState([]);
//     const [totalRow, setTotalRow] = useState(null);
//     const [months, setMonths] = useState([]);
//     const [loading, setLoading] = useState(true); // Start with loading true for initial fetch
//     const [error, setError] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(yearOptions[0] || '');
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     // --- Data Fetching and Effects ---
//     const handleGenerateReport = async (yearToFetch) => {
//         if (!yearToFetch) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'No Year Selected',
//                 text: 'Please select a financial year to generate a report.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setReportData([]);
//         setTotalRow(null);

//         try {
//             const response = await fetch(`https://tdtlworld.com/hrms-backend/api/manpower-report/?year=${yearToFetch}`);
//             if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
//             const data = await response.json();

//             if (data && Array.isArray(data.data) && data.data.length > 0) {
//                 const allDataRows = data.data;
//                 const rawTotalRow = allDataRows.pop();
//                 setReportData(allDataRows.map(transformApiData));
//                 setTotalRow(transformApiData(rawTotalRow));
//                 setMonths(data.months || []);
//             } else {
//                 setReportData([]);
//                 setTotalRow(null);
//                 setMonths([]);
//             }
//         } catch (e) {
//             setError('Failed to fetch report data. Please try again later.');
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Failed',
//                 text: 'Could not retrieve the report data. Please check your connection or try again later.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             console.error("API fetch error:", e);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     // --- Auto-fetch data on initial component load ---
//     useEffect(() => {
//         if (selectedYear) {
//             handleGenerateReport(selectedYear);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); // Run only once

//     // --- Memoized Calculations for Performance ---
//     const filteredData = useMemo(() => {
//         if (!searchTerm) return reportData;
//         return reportData.filter(dept => dept.department.toLowerCase().includes(searchTerm.toLowerCase()));
//     }, [reportData, searchTerm]);

//     const paginatedData = useMemo(() => {
//         return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     }, [filteredData, page, rowsPerPage]);

//     // --- *** CHANGE IS HERE *** ---
//     const tableHeaders = useMemo(() => {
//         const baseHeaders = ['SR. NO.', 'DEPARTMENT'];
//         // Capitalize month abbreviations and the 'Total' header
//         const monthHeaders = months.map(m => m.split('-')[0].toUpperCase());
//         return [...baseHeaders, ...monthHeaders, 'TOTAL'];
//     }, [months]);


//     // --- Event Handlers ---
//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
//     const handleChangePage = (event, newPage) => { setPage(newPage); };
//     const onGenerateClick = () => handleGenerateReport(selectedYear);

//     const handleExport = () => {
//         // (No changes to export logic)
//     };

//     // --- Styling Constants ---
//     const primaryColor = "#8C257C";
//     const primaryButtonHover = "#6d1d60";
//     const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };

//     return (
//         <Box p={2}>
//             {/* --- PAGE HEADER --- */}
//             <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
//                 Annual Manpower Report
//             </Typography>

//             {/* --- CONTROLS: FILTERS, SEARCH, AND ACTIONS --- */}
//                             <Paper sx={{ p: 2, mb: 2 }}>
//             <Stack
//                 direction={isMobile ? 'column' : 'row'}
//                 justifyContent="space-between"
//                 alignItems="center"
//                 spacing={2}
//                 mb={2}
//             >
//                 <Stack direction="row" spacing={2} flexWrap="wrap">
//                     <FormControl sx={{ minWidth: 180 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select value={selectedYear} label="Financial Year" onChange={(e) => setSelectedYear(e.target.value)}>
//                             {yearOptions.map(year => (
//                                 <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <Button variant="contained" onClick={onGenerateClick} disabled={!selectedYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
//                         Generate
//                     </Button>
//                     <Button variant="contained" onClick={handleExport} disabled={filteredData.length === 0} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
//                         Export
//                     </Button>
//                 </Stack>
//                 <TextField size="small" variant="outlined" placeholder="Search Department..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
//             </Stack>
//             </Paper>

//             {/* --- DATA TABLE --- */}
//             <TableContainer component={Paper}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {tableHeaders.map(header => (<TableCell key={header} sx={headerCellStyle}>{header}</TableCell>))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             // --- SKELETON LOADER ---
//                             [...Array(rowsPerPage)].map((_, rowIndex) => (
//                                 <TableRow key={rowIndex}>
//                                     {tableHeaders.map((header, cellIndex) => (
//                                         <TableCell key={cellIndex}>
//                                             <Skeleton variant="text" />
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             <>
//                                 {paginatedData.map((dept, index) => (
//                                     <TableRow key={dept.department + index} hover>
//                                         <TableCell align="center" sx={{ typography: 'body2' }}>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell sx={{ typography: 'body2' }}>{dept.department}</TableCell>
//                                         {months.map(month => (
//                                             <TableCell key={month} align="center" sx={{ typography: 'body2' }}>{dept.monthly_counts?.[month] || 0}</TableCell>
//                                         ))}
//                                         <TableCell align="center" sx={{ fontWeight: 'bold', typography: 'body2' }}>{dept.total}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </>
//                         ) : (
//                             <TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* --- PAGINATION AND FOOTER (Already Correctly Implemented) --- */}
//             <Box
//                 component="footer"
//                 sx={{
//                     display: 'flex',
//                     flexDirection: isMobile ? 'column' : 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     p: 2,
//                     gap: 2
//                 }}
//             >
//                 <Typography variant="body2" color="text.secondary">
//                     Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//                 </Typography>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     component="div"
//                     count={filteredData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleRowsPerPageChange}
//                     sx={{
//                         // --- Style pagination icons and numbers ---
//                         '& .Mui-selected': { color: primaryColor },
//                         '& .MuiTablePagination-actions button:hover': { backgroundColor: `${primaryColor}20`},
//                         '& .MuiTablePagination-actions .Mui-disabled': { opacity: 0.3 },
//                     }}
//                 />
//             </Box>
//         </Box>
//     );
// }

// export default AnnualManpowerAdminReport;




import React, { useState, useMemo, useEffect } from 'react';

// --- MUI Imports ---
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Pagination
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';

// --- Library Imports for Exporting ---
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

// --- HELPER FUNCTION TO TRANSFORM API DATA (No Change) ---
const transformApiData = (apiData) => {
    if (!apiData) return { department: '', monthly_counts: {}, total: 0 };
    const monthly_counts_object = Array.isArray(apiData.manpower_counts)
        ? apiData.manpower_counts.reduce((acc, item) => { acc[item.month] = item.count; return acc; }, {})
        : {};
    return {
        department: apiData.department_name || '',
        monthly_counts: monthly_counts_object,
        total: apiData.total_for_department || 0
    };
};

// --- DYNAMICALLY GENERATE FINANCIAL YEAR OPTIONS (No Change) ---
const generateYearOptions = () => {
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

const AnnualManpowerAdminReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const yearOptions = useMemo(() => generateYearOptions(), []);
    const [reportData, setReportData] = useState([]);
    const [totalRow, setTotalRow] = useState(null);
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(yearOptions[0] || '');
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    const handleGenerateReport = async (yearToFetch) => {
        if (!yearToFetch) {
            Swal.fire({
                icon: 'info',
                title: 'No Year Selected',
                text: 'Please select a financial year to generate a report.',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }
        setLoading(true);
        setError(null);
        setReportData([]);
        setTotalRow(null);

        try {
            // NOTE: Using a placeholder. Replace with your actual API endpoint.
            const response = await fetch(`https://tdtlworld.com/hrms-backend/api/manpower-report/?year=${yearToFetch}`);
            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
            const data = await response.json();

            if (data && Array.isArray(data.data) && data.data.length > 0) {
                const allDataRows = data.data;
                const rawTotalRow = allDataRows.pop();
                setReportData(allDataRows.map(transformApiData));
                setTotalRow(transformApiData(rawTotalRow));
                setMonths(data.months || []);
            } else {
                setReportData([]);
                setTotalRow(null);
                setMonths([]);
                Swal.fire('No Data', 'No report data was found for the selected year.', 'info');
            }
        } catch (e) {
            setError('Failed to fetch report data. Please try again later.');
            console.error("API fetch error:", e);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    useEffect(() => {
        if (selectedYear) {
            handleGenerateReport(selectedYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Memoized Calculations for Performance ---
    const filteredData = useMemo(() => {
        if (!searchTerm) return reportData;
        return reportData.filter(dept => dept.department.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [reportData, searchTerm]);
    
    const paginatedData = useMemo(() => {
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const tableHeaders = useMemo(() => {
        const baseHeaders = ['SR. NO.', 'DEPARTMENT'];
        const monthHeaders = months.map(m => m.split('-')[0].toUpperCase());
        return [...baseHeaders, ...monthHeaders, 'TOTAL'];
    }, [months]);

    // --- Event Handlers ---
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };
    const onGenerateClick = () => handleGenerateReport(selectedYear);

    // --- EXPORT FUNCTIONALITY ---
    const handleExportExcel = () => {
        const dataToExport = filteredData.map((dept, index) => {
            const row = { 'SR. NO.': index + 1, 'DEPARTMENT': dept.department };
            months.forEach(month => {
                row[month.split('-')[0].toUpperCase()] = dept.monthly_counts?.[month] || 0;
            });
            row['TOTAL'] = dept.total;
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Manpower Report");
        XLSX.writeFile(workbook, `Manpower_Report_${selectedYear}.xlsx`);
    };

    const handleExportPdf = () => {
        const doc = new jsPDF();
        doc.text(`Annual Manpower Report for ${selectedYear}-${parseInt(selectedYear) + 1}`, 14, 15);
        
        const head = [tableHeaders];
        const body = filteredData.map((dept, index) => {
             const rowData = [
                page * rowsPerPage + index + 1,
                dept.department
            ];
            months.forEach(month => {
                rowData.push(dept.monthly_counts?.[month] || 0);
            });
            rowData.push(dept.total);
            return rowData;
        });

        doc.autoTable({
            head: head,
            body: body,
            startY: 20,
            headStyles: { fillColor: [140, 37, 124] }, // primaryColor in RGB
            theme: 'grid'
        });

        doc.save(`Manpower_Report_${selectedYear}.pdf`);
    };
    
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Annual Manpower Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} mb={2}>
                    <FormControl sx={{ minWidth: 180 }} size="small">
                        <InputLabel>Financial Year</InputLabel>
                        <Select value={selectedYear} label="Financial Year" onChange={(e) => setSelectedYear(e.target.value)}>
                            {yearOptions.map(year => (
                                <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={onGenerateClick} disabled={!selectedYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate
                    </Button>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                     <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={handleExportPdf} startIcon={<PictureAsPdfIcon />} disabled={filteredData.length === 0} sx={{ borderColor: primaryColor, color: primaryColor, '&:hover': { borderColor: primaryButtonHover, backgroundColor: '#fdf3fb' }}}>
                            PDF
                        </Button>
                        <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />} disabled={filteredData.length === 0} sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' }}}>
                            Excel
                        </Button>
                    </Stack>
                    <TextField size="small" variant="outlined" placeholder="Search Department..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
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
                            [...Array(rowsPerPage)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {tableHeaders.map((_, cellIndex) => (<TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>))}
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow><TableCell colSpan={tableHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((dept, index) => (
                                <TableRow key={dept.department + index} hover>
                                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{dept.department}</TableCell>
                                    {months.map(month => (
                                        <TableCell key={month} align="center">{dept.monthly_counts?.[month] || 0}</TableCell>
                                    ))}
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>{dept.total}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={tableHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- NEW STYLED PAGINATION --- */}
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
                                <Select
                                    value={rowsPerPage}
                                    onChange={handleChangeRowsPerPage}
                                    sx={{
                                        backgroundColor: '#8C257C', color: 'white', borderRadius: '4px',
                                        '&:hover': { backgroundColor: '#8C257C' },
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '& .MuiSvgIcon-root': { color: 'white' },
                                    }}
                                >
                                    {[5, 10, 15, 25].map((value) => (
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="body2" color="text.secondary">
                               {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                            </Typography>
                        </Box>
                        <Pagination
                            count={Math.ceil(filteredData.length / rowsPerPage)}
                            page={page + 1}
                            onChange={handlePaginationChange}
                            showFirstButton showLastButton
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    borderRadius: '4px',
                                    '&:hover': { backgroundColor: secondaryColor, color: 'white' }
                                },
                                '& .MuiPaginationItem-page': {
                                    color: primaryColor,
                                    '&.Mui-selected': {
                                        backgroundColor: primaryColor,
                                        color: 'white',
                                        '&:hover': { backgroundColor: secondaryColor }
                                    },
                                },
                                 '& .MuiPaginationItem-icon': { color: primaryColor }
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default AnnualManpowerAdminReport;