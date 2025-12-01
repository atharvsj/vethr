


// import React, { useState, useMemo } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     Container,
//     TableHead,
//     TableRow,
//     TableFooter,
//     CircularProgress,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Button,
//     Grid,
//     TextField,
//     Alert,
// } from "@mui/material";
// import * as XLSX from 'xlsx';

// const LeaveSummaryReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(''); // MODIFIED: Empty by default
//     const [searchTerm, setSearchTerm] = useState("");
//     const [hasSearched, setHasSearched] = useState(false);

//     // Pagination State
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 5 + i);

//     const handleGenerateReport = async () => {
//         // MODIFIED: Check for selected year
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
//             const url = `https://tdtlworld.com/hrms-backend/apis/get_all_employee_leave_summary_get_report/?year=${selectedYear}`;
//             const res = await fetch(url);
//             if (!res.ok) { throw new Error(`HTTP error! Status: ${res.status}`); }
//             const result = await res.json();
//             if (result.status === 'success' && Array.isArray(result.data)) {
//                 setReportData(result.data);
//             } else {
//                 setReportData([]);
//             }
//         } catch (err) {
//             console.error("Error fetching leave summary report:", err);
//             setError(err.message || "Failed to load data. Please try again.");
//             setReportData([]);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

//     const filteredData = useMemo(() => {
//         if (!searchTerm) return reportData;
//         return reportData.filter(row => JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase()));
//     }, [reportData, searchTerm]);

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const staticHeaders = [
//         { id: 'sr_no', label: 'Sr No' }, { id: 'employee_id', label: 'Employee ID' }, { id: 'employee_name', label: 'Name' },
//         { id: 'department_name', label: 'Department' }, { id: 'designation_name', label: 'Designation' },
//         { id: 'division_name', label: 'Division' }, { id: 'manager_name', label: 'Line Manager' }, { id: 'date_of_joining', label: 'D.O.J' }
//     ];
//     const months = [
//         { name: 'January', abbr: 'Jan' }, { name: 'February', abbr: 'Feb' }, { name: 'March', abbr: 'Mar' },
//         { name: 'April', abbr: 'Apr' }, { name: 'May', abbr: 'May' }, { name: 'June', abbr: 'Jun' }, { name: 'July', abbr: 'Jul' },
//         { name: 'August', abbr: 'Aug' }, { name: 'Sept', abbr: 'Sep' }, { name: 'Oct', abbr: 'Oct' },
//         { name: 'Nov', abbr: 'Nov' }, { name: 'December', abbr: 'Dec' },
//     ];
//     const leaveTypes = ['CL', 'ML', 'PL', 'MTL', 'LWP'];
//     const totalColumnCount = staticHeaders.length + (months.length + 1) * leaveTypes.length;

//     const grandTotals = useMemo(() => {
//         const totals = {};
//         months.forEach(month => {
//             leaveTypes.forEach(lt => {
//                 const key = `${month.abbr}_${lt}`;
//                 totals[key] = filteredData.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
//             });
//         });
//         leaveTypes.forEach(lt => {
//             const key = `total_${lt}`;
//             totals[key] = filteredData.reduce((sum, row) => {
//                 const rowTotal = months.reduce((rowSum, month) => rowSum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0);
//                 return sum + rowTotal;
//             }, 0);
//         });
//         return totals;
//     }, [filteredData]);

//     const handleExport = () => {
//         const dataToExport = filteredData.map((row, index) => {
//             const newRow = { "Sr No": index + 1 };
//             staticHeaders.slice(1).forEach(h => newRow[h.label] = row[h.id] || '-');
//             months.forEach(month => {
//                 leaveTypes.forEach(lt => { newRow[`${month.name} - ${lt}`] = row[`${month.abbr}_${lt}`] ?? 0; });
//             });
//             leaveTypes.forEach(lt => {
//                 newRow[`Total - ${lt}`] = months.reduce((sum, month) => sum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0);
//             });
//             return newRow;
//         });
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveSummary");
//         XLSX.writeFile(workbook, `Leave_Summary_Report_${selectedYear}.xlsx`);
//     };

//     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>  Employee leave Summary Report </Typography>

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
//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 120 }} size="small">
//                         <InputLabel>Year</InputLabel>
//                         <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)} displayEmpty>
//                             <MenuItem value="" disabled><em></em></MenuItem>
//                             {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle} disabled={!selectedYear || loading}>
//                         Generate Report
//                     </Button>
//                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>
//                         Export Excel
//                     </Button>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer component={Paper} sx={{ maxHeight: 700, borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader sx={{ minWidth: 5000, '& .MuiTableCell-root': { border: '1px solid #e0e0e0' } }}>
//                     <TableHead>
//                         <TableRow>
//                             {staticHeaders.map(header => (<TableCell key={header.id} rowSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header.label}</TableCell>))}
//                             {[...months, { name: 'Total' }].map(month => (<TableCell key={month.name} colSpan={leaveTypes.length} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{month.name}</TableCell>))}
//                         </TableRow>
//                         <TableRow>
//                             {[...months, { name: 'Total' }].flatMap((month) => leaveTypes.map(lt => (<TableCell key={`${month.name}-${lt}`} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{lt}</TableCell>)))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (<TableRow><TableCell colSpan={totalColumnCount} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (<TableRow><TableCell colSpan={totalColumnCount} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (<TableRow><TableCell colSpan={totalColumnCount} align="center">Please select a year and click "Generate Report".</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => {
//                                 const totals = {};
//                                 leaveTypes.forEach(lt => { totals[lt] = months.reduce((sum, month) => sum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0); });
//                                 return (
//                                     <TableRow key={row.user_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                         <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                                         {staticHeaders.slice(1).map(h => (<TableCell key={h.id}>{row[h.id] || '-'}</TableCell>))}
//                                         {months.flatMap(month => leaveTypes.map(lt => (<TableCell key={`${month.abbr}_${lt}`} align="center">{row[`${month.abbr}_${lt}`] ?? 0}</TableCell>)))}
//                                         {leaveTypes.map(lt => (<TableCell key={`total_${lt}`} align="center" sx={{ fontWeight: 'bold' }}>{totals[lt]}</TableCell>))}
//                                     </TableRow>
//                                 );
//                             })
//                         ) : (<TableRow><TableCell colSpan={totalColumnCount} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                     {filteredData.length > 0 && (
//                         <TableFooter>
//                             <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } }}>
//                                 <TableCell colSpan={staticHeaders.length} align="right">Grand Total</TableCell>
//                                 {months.flatMap(month => leaveTypes.map(lt => (<TableCell key={`grand-total-${month.abbr}_${lt}`} align="center">{grandTotals[`${month.abbr}_${lt}`]}</TableCell>)))}
//                                 {leaveTypes.map(lt => (<TableCell key={`grand-total-total_${lt}`} align="center" sx={{ backgroundColor: '#e0e0e0' }}>{grandTotals[`total_${lt}`]}</TableCell>))}
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
// };

// export default LeaveSummaryReport;      ///// 





// import React, { useState, useMemo } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     Container,
//     TableHead,
//     TableRow,
//     TableFooter,
//     CircularProgress,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Button,
//     Grid,
//     TextField,
//     Alert,
// } from "@mui/material";
// import * as XLSX from 'xlsx';

// const LeaveSummaryReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedYear, setSelectedYear] = useState('');
//     const [searchTerm, setSearchTerm] = useState("");
//     const [hasSearched, setHasSearched] = useState(false);

//     // Pagination State
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // MODIFIED: Generate years in descending order (current year first)
//     const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

//     const handleGenerateReport = async () => {
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
//             const url = `https://tdtlworld.com/hrms-backend/apis/get_all_employee_leave_summary_get_report/?year=${selectedYear}`;
//             const res = await fetch(url);
//             if (!res.ok) { throw new Error(`HTTP error! Status: ${res.status}`); }
//             const result = await res.json();
//             if (result.status === 'success' && Array.isArray(result.data)) {
//                 setReportData(result.data);
//             } else {
//                 setReportData([]);
//             }
//         } catch (err) {
//             console.error("Error fetching leave summary report:", err);
//             setError(err.message || "Failed to load data. Please try again.");
//             setReportData([]);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//     const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

//     const filteredData = useMemo(() => {
//         if (!searchTerm) return reportData;
//         return reportData.filter(row => JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase()));
//     }, [reportData, searchTerm]);

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const staticHeaders = [
//         { id: 'sr_no', label: 'Sr No' }, { id: 'employee_id', label: 'Employee ID' }, { id: 'employee_name', label: 'Name' },
//         { id: 'department_name', label: 'Department' }, { id: 'designation_name', label: 'Designation' },
//         { id: 'division_name', label: 'Division' }, { id: 'manager_name', label: 'Line Manager' }, { id: 'date_of_joining', label: 'D.O.J' }
//     ];
//     const months = [
//         { name: 'January', abbr: 'Jan' }, { name: 'February', abbr: 'Feb' }, { name: 'March', abbr: 'Mar' },
//         { name: 'April', abbr: 'Apr' }, { name: 'May', abbr: 'May' }, { name: 'June', abbr: 'Jun' }, { name: 'July', abbr: 'Jul' },
//         { name: 'August', abbr: 'Aug' }, { name: 'Sept', abbr: 'Sep' }, { name: 'Oct', abbr: 'Oct' },
//         { name: 'Nov', abbr: 'Nov' }, { name: 'December', abbr: 'Dec' },
//     ];
//     const leaveTypes = ['CL', 'ML', 'PL', 'MTL', 'LWP'];
//     const totalColumnCount = staticHeaders.length + (months.length + 1) * leaveTypes.length;

//     const grandTotals = useMemo(() => {
//         const totals = {};
//         months.forEach(month => {
//             leaveTypes.forEach(lt => {
//                 const key = `${month.abbr}_${lt}`;
//                 totals[key] = filteredData.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
//             });
//         });
//         leaveTypes.forEach(lt => {
//             const key = `total_${lt}`;
//             totals[key] = filteredData.reduce((sum, row) => {
//                 const rowTotal = months.reduce((rowSum, month) => rowSum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0);
//                 return sum + rowTotal;
//             }, 0);
//         });
//         return totals;
//     }, [filteredData]);

//     const handleExport = () => {
//         const dataToExport = filteredData.map((row, index) => {
//             const newRow = { "Sr No": index + 1 };
//             staticHeaders.slice(1).forEach(h => newRow[h.label] = row[h.id] || '-');
//             months.forEach(month => {
//                 leaveTypes.forEach(lt => { newRow[`${month.name} - ${lt}`] = row[`${month.abbr}_${lt}`] ?? 0; });
//             });
//             leaveTypes.forEach(lt => {
//                 newRow[`Total - ${lt}`] = months.reduce((sum, month) => sum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0);
//             });
//             return newRow;
//         });
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveSummary");
//         XLSX.writeFile(workbook, `Leave_Summary_Report_${selectedYear}.xlsx`);
//     };

//     const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}> All Employee leave Summary Report </Typography>

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
//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 120 }} size="small">
//                         <InputLabel>Year</InputLabel>
//                         <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)} displayEmpty>
//                             <MenuItem value="" disabled><em></em></MenuItem>
//                             {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle} disabled={!selectedYear || loading}>
//                         Generate Report
//                     </Button>
//                     <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>
//                         Export Excel
//                     </Button>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer component={Paper} sx={{ maxHeight: 700, borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader sx={{ minWidth: 5000, '& .MuiTableCell-root': { border: '1px solid #e0e0e0' } }}>
//                     <TableHead>
//                         <TableRow>
//                             {staticHeaders.map(header => (<TableCell key={header.id} rowSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{header.label}</TableCell>))}
//                             {[...months, { name: 'Total' }].map(month => (<TableCell key={month.name} colSpan={leaveTypes.length} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{month.name}</TableCell>))}
//                         </TableRow>
//                         <TableRow>
//                             {[...months, { name: 'Total' }].flatMap((month) => leaveTypes.map(lt => (<TableCell key={`${month.name}-${lt}`} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>{lt}</TableCell>)))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (<TableRow><TableCell colSpan={totalColumnCount} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (<TableRow><TableCell colSpan={totalColumnCount} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (<TableRow><TableCell colSpan={totalColumnCount} align="center">Please select a year and click "Generate Report".</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => {
//                                 const totals = {};
//                                 leaveTypes.forEach(lt => { totals[lt] = months.reduce((sum, month) => sum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0); });
//                                 return (
//                                     <TableRow key={row.user_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                         <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                                         {staticHeaders.slice(1).map(h => (<TableCell key={h.id}>{row[h.id] || '-'}</TableCell>))}
//                                         {months.flatMap(month => leaveTypes.map(lt => (<TableCell key={`${month.abbr}_${lt}`} align="center">{row[`${month.abbr}_${lt}`] ?? 0}</TableCell>)))}
//                                         {leaveTypes.map(lt => (<TableCell key={`total_${lt}`} align="center" sx={{ fontWeight: 'bold' }}>{totals[lt]}</TableCell>))}
//                                     </TableRow>
//                                 );
//                             })
//                         ) : (<TableRow><TableCell colSpan={totalColumnCount} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>

//                     {/* MODIFIED: Show Grand Total footer only on the last page */}
//                     {filteredData.length > 0 && page === pageCount - 1 && (
//                         <TableFooter>
//                             <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5' } }}>
//                                 <TableCell colSpan={staticHeaders.length} align="right">Grand Total</TableCell>
//                                 {months.flatMap(month => leaveTypes.map(lt => (<TableCell key={`grand-total-${month.abbr}_${lt}`} align="center">{grandTotals[`${month.abbr}_${lt}`]}</TableCell>)))}
//                                 {leaveTypes.map(lt => (<TableCell key={`grand-total-total_${lt}`} align="center" sx={{ backgroundColor: '#e0e0e0' }}>{grandTotals[`total_${lt}`]}</TableCell>))}
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
// };

// export default LeaveSummaryReport;   //// 







// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   Container,
//   TableHead,
//   TableRow,
//   TableFooter,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Grid,
//   TextField,
//   Alert,
// } from "@mui/material";
// import * as XLSX from "xlsx";

// const LeaveSummaryReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

//   // Helper to format cell values
//   const formatValue = (value) => {
//     return value !== null && value !== undefined && value !== "" ? value : "NA";
//   };

//   const handleGenerateReport = async () => {
//     if (!selectedYear) {
//       setError("Please select a year to generate the report.");
//       setHasSearched(true);
//       setReportData([]);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);

//     try {
//       const url = `https://tdtlworld.com/hrms-backend/apis/get_all_employee_leave_summary_get_report/?year=${selectedYear}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//       const result = await res.json();
//       if (result.status === "success" && Array.isArray(result.data)) {
//         setReportData(result.data);
//       } else {
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error("Error fetching leave summary report:", err);
//       setError(err.message || "Failed to load data. Please try again.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//       setPage(0);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(0);
//   };
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = useMemo(() => {
//     if (!searchTerm) return reportData;
//     return reportData.filter((row) =>
//       JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [reportData, searchTerm]);

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const staticHeaders = [
//     { id: "sr_no", label: "Sr No" },
//     { id: "employee_id", label: "Employee ID" },
//     { id: "employee_name", label: "Name" },
//     { id: "department_name", label: "Department" },
//     { id: "designation_name", label: "Designation" },
//     { id: "division_name", label: "Division" },
//     { id: "sub_division", label: "Sub Division" },
//     { id: "headquarter", label: "Headquarter" },
//     { id: "level", label: "Level" },
//     { id: "manager_name", label: "Line Manager" },
//     { id: "date_of_joining", label: "D.O.J" },
//   ];

//   const months = [
//     { name: "January", abbr: "Jan" },
//     { name: "February", abbr: "Feb" },
//     { name: "March", abbr: "Mar" },
//     { name: "April", abbr: "Apr" },
//     { name: "May", abbr: "May" },
//     { name: "June", abbr: "Jun" },
//     { name: "July", abbr: "Jul" },
//     { name: "August", abbr: "Aug" },
//     { name: "Sept", abbr: "Sep" },
//     { name: "Oct", abbr: "Oct" },
//     { name: "Nov", abbr: "Nov" },
//     { name: "December", abbr: "Dec" },
//   ];

//   const leaveTypes = ["CL", "ML", "PL", "MTL", "LWP"];
//   const totalColumnCount = staticHeaders.length + (months.length + 1) * leaveTypes.length;

//   const grandTotals = useMemo(() => {
//     const totals = {};
//     months.forEach((month) => {
//       leaveTypes.forEach((lt) => {
//         const key = `${month.abbr}_${lt}`;
//         totals[key] = filteredData.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
//       });
//     });
//     leaveTypes.forEach((lt) => {
//       const key = `total_${lt}`;
//       totals[key] = filteredData.reduce((sum, row) => {
//         return (
//           sum +
//           months.reduce((rowSum, month) => rowSum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0)
//         );
//       }, 0);
//     });
//     return totals;
//   }, [filteredData]);

//   const handleExport = () => {
//     const dataToExport = filteredData.map((row, index) => {
//       const newRow = { "Sr No": index + 1 };
//       staticHeaders.slice(1).forEach((h) => (newRow[h.label] = formatValue(row[h.id])));
//       months.forEach((month) => {
//         leaveTypes.forEach(
//           (lt) => (newRow[`${month.name} - ${lt}`] = row[`${month.abbr}_${lt}`] ?? "NA")
//         );
//       });
//       leaveTypes.forEach((lt) => {
//         newRow[`Total - ${lt}`] = months.reduce(
//           (sum, month) => sum + (Number(row[`${month.abbr}_${lt}`]) || 0),
//           0
//         );
//       });
//       return newRow;
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveSummary");
//     XLSX.writeFile(workbook, `Leave_Summary_Report_${selectedYear}.xlsx`);
//   };

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         All Employee Leave Summary Report
//       </Typography>

//       {/* Controls */}
//       <Grid container spacing={2} mb={2} alignItems="center">
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//               <MenuItem value={100}>100</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={8}
//           md={8}
//           sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}
//         >
//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel>Year</InputLabel>
//             <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//               <MenuItem value="" disabled>
//                 <em></em>
//               </MenuItem>
//               {yearOptions.map((year) => (
//                 <MenuItem key={year} value={year}>
//                   {year}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={handleGenerateReport}
//             sx={purpleButtonStyle}
//             disabled={!selectedYear || loading}
//           >
//             Generate Report
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleExport}
//             sx={purpleButtonStyle}
//             disabled={filteredData.length === 0}
//           >
//             Export Excel
//           </Button>
//         </Grid>
//         <Grid item xs={12} sm={12} md={2}>
//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </Grid>
//       </Grid>

//       {/* Table */}
//       <TableContainer component={Paper} sx={{ maxHeight: 700, borderRadius: 2 }}>
//         <Table stickyHeader sx={{ minWidth: 5000 }}>
//           <TableHead>
//             <TableRow>
//               {staticHeaders.map((h) => (
//                 <TableCell key={h.id} rowSpan={2} sx={{ fontWeight: "bold" }}>
//                   {h.label}
//                 </TableCell>
//               ))}
//               {[...months, { name: "Total" }].map((m) => (
//                 <TableCell key={m.name} colSpan={leaveTypes.length} align="center">
//                   {m.name}
//                 </TableCell>
//               ))}
//             </TableRow>
//             <TableRow>
//               {[...months, { name: "Total" }].flatMap((m) =>
//                 leaveTypes.map((lt) => (
//                   <TableCell key={`${m.name}-${lt}`} sx={{ fontWeight: "bold" }} align="center">
//                     {lt}
//                   </TableCell>
//                 ))
//               )}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={totalColumnCount} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : error ? (
//               <TableRow>
//                 <TableCell colSpan={totalColumnCount} align="center">
//                   <Alert severity="error">{error}</Alert>
//                 </TableCell>
//               </TableRow>
//             ) : !hasSearched ? (
//               <TableRow>
//                 <TableCell colSpan={totalColumnCount} align="center">
//                   Please select a year and click "Generate Report".
//                 </TableCell>
//               </TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => {
//                 const totals = {};
//                 leaveTypes.forEach(
//                   (lt) =>
//                     (totals[lt] = months.reduce(
//                       (sum, m) => sum + (Number(row[`${m.abbr}_${lt}`]) || 0),
//                       0
//                     ))
//                 );
//                 return (
//                   <TableRow key={row.user_id}>
//                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                     {staticHeaders.slice(1).map((h) => (
//                       <TableCell key={h.id}>{formatValue(row[h.id])}</TableCell>
//                     ))}
//                     {months.flatMap((m) =>
//                       leaveTypes.map((lt) => (
//                         <TableCell key={`${m.abbr}_${lt}`} align="center">
//                           {row[`${m.abbr}_${lt}`] ?? "NA"}
//                         </TableCell>
//                       ))
//                     )}
//                     {leaveTypes.map((lt) => (
//                       <TableCell key={`total_${lt}`} sx={{ fontWeight: "bold" }} align="center">
//                         {totals[lt]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={totalColumnCount} align="center">
//                   No data available.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>

//           {filteredData.length > 0 && page === pageCount - 1 && (
//             <TableFooter>
//               <TableRow>
//                 <TableCell colSpan={staticHeaders.length} align="right">
//                   Grand Total
//                 </TableCell>
//                 {months.flatMap((m) =>
//                   leaveTypes.map((lt) => (
//                     <TableCell key={`grand-${m.abbr}-${lt}`} align="center">
//                       {grandTotals[`${m.abbr}_${lt}`] || "NA"}
//                     </TableCell>
//                   ))
//                 )}
//                 {leaveTypes.map((lt) => (
//                   <TableCell key={`grand-total-${lt}`} sx={{ fontWeight: "bold" }} align="center">
//                     {grandTotals[`total_${lt}`] || "NA"}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableFooter>
//           )}
//         </Table>
//       </TableContainer>

//       {filteredData.length > 0 && (
//         <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
//           <Button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 0}
//             sx={purpleButtonStyle}
//           >
//             Previous
//           </Button>
//           <Typography sx={{ mx: 2 }}>
//             Page {page + 1} of {pageCount}
//           </Typography>
//           <Button
//             onClick={() => setPage(page + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle}
//           >
//             Next
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default LeaveSummaryReport;










import React, { useState, useMemo } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableFooter, Stack, Alert,
  FormControl, InputLabel, Select, MenuItem, TextField, Button,
  Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import * as XLSX from "xlsx";

const LeaveSummaryReport = () => {
  // --- Hooks for State, Theme, and Responsiveness ---
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryColor = "#8C257C";
  const primaryButtonHover = "#6d1d60";
  const secondaryColor = "#F58E35";

  // --- Constants and Options ---
  const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
  const staticHeaders = [
    { id: "sr_no", label: "Sr No" }, { id: "employee_id", label: "Employee ID" }, { id: "employee_name", label: "Name" },
    { id: "department_name", label: "Department" }, { id: "designation_name", label: "Designation" }, { id: "division_name", label: "Division" },
    { id: "sub_division", label: "Sub Division" }, { id: "headquarter", label: "Headquarter" }, { id: "level", label: "Level" },
    { id: "manager_name", label: "Line Manager" }, { id: "date_of_joining", label: "D.O.J" },
  ];
  const months = [
    { name: "January", abbr: "Jan" }, { name: "February", abbr: "Feb" }, { name: "March", abbr: "Mar" }, { name: "April", abbr: "Apr" },
    { name: "May", abbr: "May" }, { name: "June", abbr: "Jun" }, { name: "July", abbr: "Jul" }, { name: "August", abbr: "Aug" },
    { name: "Sept", abbr: "Sep" }, { name: "Oct", abbr: "Oct" }, { name: "Nov", abbr: "Nov" }, { name: "December", abbr: "Dec" },
  ];
  const leaveTypes = ["CL", "ML", "PL", "MTL", "LWP"];
  const totalColumnCount = staticHeaders.length + (months.length + 1) * leaveTypes.length;

  // --- Helper Functions ---
  const formatValue = (value) => (value !== null && value !== undefined && value !== "" ? value : "N/A");

  // --- Data Fetching ---
  const handleGenerateReport = async () => {
    if (!selectedYear) {
      setError("Please select a year to generate the report.");
      setHasSearched(true);
      setReportData([]);
      return;
    }
    setLoading(true); setError(null); setHasSearched(true); setReportData([]);
    try {
      const url = `https://tdtlworld.com/hrms-backend/apis/get_all_employee_leave_summary_get_report/?year=${selectedYear}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const result = await res.json();
      setReportData(result.status === "success" && Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Error fetching leave summary report:", err);
      setError(err.message || "Failed to load data. Please try again.");
      setReportData([]);
    } finally {
      setLoading(false);
      setPage(0);
    }
  };

  // --- Memoized Calculations & Event Handlers ---
  const filteredData = useMemo(() => reportData.filter((row) => JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())), [reportData, searchTerm]);
  const paginatedData = useMemo(() => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredData, page, rowsPerPage]);
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const grandTotals = useMemo(() => {
    const totals = {};
    months.forEach((month) => {
      leaveTypes.forEach((lt) => {
        const key = `${month.abbr}_${lt}`;
        totals[key] = filteredData.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
      });
    });
    leaveTypes.forEach((lt) => {
      totals[`total_${lt}`] = months.reduce((totalSum, month) => totalSum + (totals[`${month.abbr}_${lt}`] || 0), 0);
    });
    return totals;
  }, [filteredData]);

  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setPage(0); };
  const handleRowsPerPageChange = (e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); };
  const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

  // --- EXPORT FUNCTIONALITY ---
  const handleExport = () => {
    const dataToExport = filteredData.map((row, index) => {
      const newRow = { "Sr No": index + 1 };
      staticHeaders.slice(1).forEach((h) => (newRow[h.label] = formatValue(row[h.id])));
      months.forEach((month) => {
        leaveTypes.forEach((lt) => (newRow[`${month.name} - ${lt}`] = row[`${month.abbr}_${lt}`] ?? "N/A"));
      });
      leaveTypes.forEach((lt) => {
        newRow[`Total - ${lt}`] = months.reduce((sum, month) => sum + (Number(row[`${month.abbr}_${lt}`]) || 0), 0);
      });
      return newRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LeaveSummary");
    XLSX.writeFile(workbook, `Leave_Summary_Report_${selectedYear}.xlsx`);
  };

  // --- STYLING & CONSTANTS ---
  const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center', border: '1px solid #ddd', whiteSpace: 'nowrap' };
  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
        All Employee Leave Summary Report --
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2}>
          <FormControl size="small" sx={{ minWidth: 200, flexGrow: 1 }}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
              {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
          <Button variant="contained" onClick={handleGenerateReport} disabled={!selectedYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
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
          <TableContainer component={Paper} sx={{ maxHeight: 700, overflowX: "auto" }}>
            <Table stickyHeader sx={{ minWidth: 5000 }}>
              <TableHead>
                <TableRow>
                  {staticHeaders.map((h) => <TableCell key={h.id} rowSpan={2} sx={headerCellStyle}>{h.label}</TableCell>)}
                  {[...months, { name: "Total" }].map((m) => <TableCell key={m.name} colSpan={leaveTypes.length} sx={headerCellStyle}>{m.name}</TableCell>)}
                </TableRow>
                <TableRow>
                  {[...months, { name: "Total" }].flatMap((m) =>
                    leaveTypes.map((lt) => <TableCell key={`${m.name}-${lt}`} sx={{ ...headerCellStyle, top: 57 }}>{lt}</TableCell>)
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  [...Array(rowsPerPage)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(totalColumnCount)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                    </TableRow>
                  ))
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => {
                    const totals = {};
                    leaveTypes.forEach((lt) => (totals[lt] = months.reduce((sum, m) => sum + (Number(row[`${m.abbr}_${lt}`]) || 0), 0)));
                    return (
                      <TableRow key={row.user_id} hover>
                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                        {staticHeaders.slice(1).map((h) => <TableCell key={h.id}>{formatValue(row[h.id])}</TableCell>)}
                        {months.flatMap((m) => leaveTypes.map((lt) => <TableCell key={`${m.abbr}_${lt}`} align="center">{row[`${m.abbr}_${lt}`] ?? "N/A"}</TableCell>))}
                        {leaveTypes.map((lt) => <TableCell key={`total_${lt}`} sx={{ fontWeight: "bold" }} align="center">{totals[lt]}</TableCell>)}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow><TableCell colSpan={totalColumnCount} align="center">{error ? error : 'No data available for the selected criteria.'}</TableCell></TableRow>
                )}
              </TableBody>

              {filteredData.length > 0 && page === pageCount - 1 && (
                <TableFooter sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell colSpan={staticHeaders.length} align="right" sx={{ fontWeight: 'bold' }}>Grand Total</TableCell>
                    {months.flatMap((m) => leaveTypes.map((lt) => <TableCell key={`grand-${m.abbr}-${lt}`} sx={{ fontWeight: 'bold' }} align="center">{grandTotals[`${m.abbr}_${lt}`] ?? "0"}</TableCell>))}
                    {leaveTypes.map((lt) => <TableCell key={`grand-total-${lt}`} sx={{ fontWeight: "bold", backgroundColor: '#e0e0e0' }} align="center">{grandTotals[`total_${lt}`] ?? "0"}</TableCell>)}
                  </TableRow>
                </TableFooter>
              )}
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
                <Pagination count={pageCount} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default LeaveSummaryReport;