// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
// //   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, FormControl,
// //   Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, CircularProgress
// // } from '@mui/material';
// // import axiosInstance from "../../utils/axiosInstance"; // Assuming this is your configured axios instance

// // // Helper to access nested properties for sorting
// // const getNestedValue = (obj, path) => path.split('.').reduce((o, k) => (o || {})[k], obj);

// // // Helper to format currency consistently
// // const formatCurrency = (value) => `₹${(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// // const Payroll = () => {
// //   // --- STATE MANAGEMENT ---
// //   const [allEmployees, setAllEmployees] = useState([]);
// //   const [payrollRecords, setPayrollRecords] = useState([]);
// //   const [savedRecords, setSavedRecords] = useState(new Set());
// //   const [selectedEmployee, setSelectedEmployee] = useState('');
// //   const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));
  
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5); // Increased default for better view
// //   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  
// //   const [hoveredRowId, setHoveredRowId] = useState(null);
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [selectedRecordForDialog, setSelectedRecordForDialog] = useState(null);
// //   const [isDialogLoading, setIsDialogLoading] = useState(false);
  
// //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
// //   const [isLoading, setIsLoading] = useState(false);

// //   // --- API INTEGRATION ---

// //   // 1. Fetch all employees for the dropdown on initial load
// //   useEffect(() => {
// //     const fetchAllEmployees = async () => {
// //       try {
// //         const response = await axiosInstance.get('/api/dropdown/employee-role/');
// //         if (response.data && Array.isArray(response.data)) setAllEmployees(response.data);
// //       } catch (error) { console.error("Failed to fetch employee list:", error); }
// //     };
// //     fetchAllEmployees();
// //   }, []);

// //   // 2. Handle the main search to populate the table from /api/payment_info/
// //   const handleSearch = async () => {
// //     setIsLoading(true);
// //     setPayrollRecords([]);
// //     setSavedRecords(new Set());
// //     const [year, month] = selectedMonth.split('-');
// //     const employeesToQuery = selectedEmployee ? allEmployees.filter(emp => emp.employee_id === selectedEmployee) : allEmployees;

// //     try {
// //       const payrollDataPromises = employeesToQuery.map(async (emp) => {
// //         try {
// //           const payload = { employee_id: emp.employee_id, month, year };
// //           const response = await axiosInstance.post('/api/payment_info/', payload);
// //           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) return [];
// //           return response.data.data.map(record => ({
// //               employee_id: emp.employee_id,
// //               name: record.employee_name,
// //               email: record.email || 'N/A',
// //               payslipType: record.payslip_type || 'Per Month',
// //               status: record.status === 'P' ? 'Paid' : 'Un Paid',
// //               payroll_report_id: record.payroll_report_id,
// //               netSalary: record.net_salary || 0,
// //           }));
// //         } catch (err) { return []; }
// //       });
      
// //       const results = await Promise.all(payrollDataPromises);
// //       const flattenedRecords = results.flat();
// //       const initiallySaved = new Set(flattenedRecords.filter(rec => rec.status === 'Paid').map(rec => rec.payroll_report_id));
      
// //       setPayrollRecords(flattenedRecords);
// //       setSavedRecords(initiallySaved);

// //     } catch (error) { console.error("An error occurred during search:", error); } 
// //     finally { setIsLoading(false); }
// //   };

// //   // 3. Handle opening the dialog and fetching/matching the correct salary structure
// //   const handleOpenDialog = async (recordFromTable) => {
// //     setIsDialogOpen(true);
// //     setIsDialogLoading(true);
// //     setSelectedRecordForDialog(null); 
// //     const [year, month] = selectedMonth.split('-');
    
// //     try {
// //       // Step 1: Fetch all possible structures for the employee for that month
// //       const response = await axiosInstance.post('/api/salary_structure/', {
// //         employee_id: recordFromTable.employee_id,
// //         month,
// //         year
// //       });

// //       if (response.data.status === 'success' && Array.isArray(response.data.data) && response.data.data.length > 0) {
// //         const allStructures = response.data.data;
        
// //         // Step 2: Find the specific structure that matches the net pay from the table record
// //         const correctStructure = allStructures.find(
// //           structure => structure.net_pay === recordFromTable.netSalary
// //         );

// //         if (correctStructure) {
// //           // Step 3: We found the match! Set it for the dialog.
// //           setSelectedRecordForDialog(correctStructure);
// //         } else {
// //           throw new Error("Data mismatch: Could not find a salary structure matching the net pay.");
// //         }
// //       } else {
// //          throw new Error("No salary structure data returned from API for this employee.");
// //       }
// //     } catch (error) {
// //       console.error("Error in handleOpenDialog:", error);
// //       setSnackbar({ open: true, message: error.message || 'Could not load salary structure details.', severity: 'error' });
// //     } finally {
// //       setIsDialogLoading(false);
// //     }
// //   };

// //   const handleCloseDialog = () => {
// //     setIsDialogOpen(false);
// //     setSelectedRecordForDialog(null);
// //   };

// //   // 4. Handle LOCAL status change
// //   const handleStatusChange = (payrollReportId, newStatus) => {
// //     setPayrollRecords(prev =>
// //       prev.map(rec => rec.payroll_report_id === payrollReportId ? { ...rec, status: newStatus } : rec)
// //     );
// //     if (newStatus === 'Un Paid') {
// //       setSavedRecords(prev => { const newSet = new Set(prev); newSet.delete(payrollReportId); return newSet; });
// //     }
// //   };

// //   // 5. Handle SAVE button click to update via API
// //   const handleSave = async (record) => {
// //     const payload = { payroll_report_id: record.payroll_report_id, pay_status: record.status === 'Paid' ? 'P' : 'G' };
// //     try {
// //       await axiosInstance.post('/api/update_payment_info/', payload);
// //       setSavedRecords(prev => new Set(prev).add(record.payroll_report_id));
// //       setSnackbar({ open: true, message: `Payment info for ${record.name} saved successfully.`, severity: 'success' });
// //     } catch (error) {
// //       console.error("Failed to save payment info:", error);
// //       setSnackbar({ open: true, message: 'Failed to save payment info.', severity: 'error' });
// //     }
// //   };

// //   // --- UI and Sorting Logic ---
// //   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
// //   const sortedEmployees = [...payrollRecords].sort((a, b) => {
// //     if (!sortConfig.key) return 0;
// //     const aValue = getNestedValue(a, sortConfig.key); const bValue = getNestedValue(b, sortConfig.key);
// //     if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
// //     if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
// //     return 0;
// //   });
// //   const paginatedEmployees = sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// //   const getSortArrow = (columnKey) => {
// //     if (sortConfig.key !== columnKey) return <span style={{ color: '#9ca3af', fontSize: 12 }}>⇅</span>;
// //     return <span style={{ color: '#4b5563', fontSize: 12 }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
// //   };

// //   return (
// //     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
// //       <Grid container spacing={2} mb={3} justifyContent="center"><Grid item xs={12} md={10} lg={8}><Grid container spacing={2}>
// //         <Grid item xs={12} sm={6} md={4}><TextField select fullWidth label="Employee" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} size="small"><MenuItem value="">All Employees</MenuItem>{allEmployees.map((emp) => (<MenuItem key={emp.employee_id} value={emp.employee_id}>{emp.employee_name}</MenuItem>))}</TextField></Grid>
// //         <Grid item xs={12} sm={6} md={4}><TextField fullWidth type="month" label="Select Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} size="small" InputLabelProps={{ shrink: true }} /></Grid>
// //         <Grid item xs={12} sm={12} md={4} display="flex" alignItems="center"><Button variant="contained" onClick={handleSearch} sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>
// //       </Grid></Grid></Grid>
// //       <Typography variant="subtitle1" fontWeight="bold" mb={2}>Payment Info for {selectedMonth}</Typography>
// //       <Grid container spacing={3} mb={3} justifyContent="space-between" alignItems="center"><Grid item xs={12} sm={6}><Box display="flex" alignItems="center" gap={1}><Typography variant="body2" fontWeight="bold">Rows per page:</Typography><FormControl size="small" sx={{ minWidth: 80 }}><Select value={rowsPerPage} onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} displayEmpty>{[3, 5, 10, 20].map((rows) => (<MenuItem key={rows} value={rows}>{rows}</MenuItem>))}</Select></FormControl></Box></Grid></Grid>

// //       <TableContainer component={Paper}><Table size="small"><TableHead sx={{ backgroundColor: '#f3f4f6' }}><TableRow>
// //         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} <span>Employee</span></Box></TableCell>
// //         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payroll_report_id')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payroll_report_id')} <span>Payroll ID</span></Box></TableCell>
// //         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payslipType')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payslipType')} <span>Payslip Type</span></Box></TableCell>
// //         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netSalary')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netSalary')} <span>Net Salary</span></Box></TableCell>
// //         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('status')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('status')} <span>Status</span></Box></TableCell>
// //         <TableCell>Actions</TableCell>
// //       </TableRow></TableHead><TableBody>
// //         {isLoading ? (<TableRow><TableCell colSpan={6} align="center"><CircularProgress /></TableCell></TableRow>) : paginatedEmployees.length > 0 ? (
// //           paginatedEmployees.map((rec) => (
// //             <TableRow key={rec.payroll_report_id} hover>
// //               <TableCell><Box display="flex" alignItems="center" gap={1}><Avatar sx={{ width: 24, height: 24 }} /><Box><Typography variant="body2">{rec.name}</Typography><Typography variant="caption" color="text.secondary">{rec.email}</Typography></Box></Box></TableCell>
// //               <TableCell>{rec.payroll_report_id}</TableCell><TableCell>{rec.payslipType}</TableCell><TableCell sx={{ color: '#7c3aed', fontWeight: 'bold' }}>{formatCurrency(rec.netSalary)}</TableCell>
// //               <TableCell><FormControl fullWidth size="small" variant="outlined"><Select value={rec.status} onChange={(e) => handleStatusChange(rec.payroll_report_id, e.target.value)}
// //                 sx={{ fontSize: 12, fontWeight: 'bold', bgcolor: rec.status === 'Paid' ? '#d1fae5' : '#fee2e2', color: rec.status === 'Paid' ? '#059669' : '#dc2626', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSelect-icon': { color: rec.status === 'Paid' ? '#059669' : '#dc2626' } }}>
// //                 <MenuItem value="Paid">Paid</MenuItem><MenuItem value="Un Paid">Un Paid</MenuItem>
// //               </Select></FormControl></TableCell>
// //               <TableCell>
// //                 <Button onClick={() => handleOpenDialog(rec)} size="small" variant="outlined" sx={{ mr: 1, textTransform: 'none', fontSize: '11px', p: '2px 8px' }}>Structure</Button>
// //                 <Button variant="contained" size="small" onClick={() => handleSave(rec)} disabled={savedRecords.has(rec.payroll_report_id)} sx={{ textTransform: 'none', bgcolor: '#7C3AED', fontSize: '11px' }}>{savedRecords.has(rec.payroll_report_id) ? 'Saved' : 'Save'}</Button>
// //               </TableCell>
// //             </TableRow>
// //           ))
// //         ) : (<TableRow><TableCell colSpan={6} align="center">No data available. Select a month and click Search.</TableCell></TableRow>)}
// //       </TableBody></Table></TableContainer>
// //       <Box sx={{ mt: 2 }}><Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
// //         <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 0} sx={{ color: '#7C3AED', borderColor: '#7C3AED' }}>Previous</Button></Grid>
// //         <Grid item>Page {page + 1} of {Math.max(1, Math.ceil(sortedEmployees.length / rowsPerPage))}</Grid>
// //         <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedEmployees.length / rowsPerPage) - 1} sx={{ color: '#7C3AED', borderColor: '#7C3AED' }}>Next</Button></Grid>
// //       </Grid></Box>

// //       {/* --- REVISED DIALOG TO SHOW CORRECT, MATCHED STRUCTURE --- */}
// //       <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
// //         <DialogTitle>{selectedRecordForDialog ? <Typography variant="h6">Salary Slip - {selectedRecordForDialog.employee_name}</Typography> : "Loading Salary Structure..."}</DialogTitle>
// //         <DialogContent>
// //           {isDialogLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : selectedRecordForDialog ? (
// //             <Grid container spacing={2}>
// //               <Grid item xs={12} md={6}>
// //                 <Paper variant="outlined">
// //                   <Typography variant="subtitle1" sx={{ bgcolor: '#e3f2fd', p: 1, fontWeight: 'bold' }}>Earnings</Typography>
// //                   <TableContainer><Table size="small"><TableBody>
// //                     <TableRow><TableCell>Basic + DA</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.basic_plus_da)}</TableCell></TableRow>
// //                     <TableRow><TableCell>HRA</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.hra)}</TableCell></TableRow>
// //                     <TableRow><TableCell>Medical Allowance</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.medical_allowance)}</TableCell></TableRow>
// //                     <TableRow><TableCell>Conveyance Allowance</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.conveyance_allowance)}</TableCell></TableRow>
// //                     <TableRow><TableCell>Arrears</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.arrears)}</TableCell></TableRow>
// //                     <TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell><strong>Total Earnings</strong></TableCell><TableCell align="right"><strong>{formatCurrency(selectedRecordForDialog.total_earnings)}</strong></TableCell></TableRow>
// //                   </TableBody></Table></TableContainer>
// //                 </Paper>
// //               </Grid>
// //               <Grid item xs={12} md={6}>
// //                 <Paper variant="outlined">
// //                   <Typography variant="subtitle1" sx={{ bgcolor: '#ffebee', p: 1, fontWeight: 'bold' }}>Deductions</Typography>
// //                   <TableContainer><Table size="small"><TableBody>
// //                     <TableRow><TableCell>Provident Fund (PF)</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.pf)}</TableCell></TableRow>
// //                     <TableRow><TableCell>ESIC</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.esic)}</TableCell></TableRow>
// //                     <TableRow><TableCell>TDS</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.tds)}</TableCell></TableRow>
// //                     <TableRow><TableCell>MLWF</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.mlwf)}</TableCell></TableRow>
// //                     <TableRow><TableCell>Other Deduction</TableCell><TableCell align="right">{formatCurrency(selectedRecordForDialog.other_deduction)}</TableCell></TableRow>
// //                     <TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell><strong>Total Deduction</strong></TableCell><TableCell align="right"><strong>{formatCurrency(selectedRecordForDialog.total_deduction)}</strong></TableCell></TableRow>
// //                   </TableBody></Table></TableContainer>
// //                 </Paper>
// //               </Grid>
// //               <Grid item xs={12}>
// //                 <Paper elevation={3} sx={{ mt: 2 }}>
// //                   <Table size="small"><TableBody>
// //                     <TableRow>
// //                       <TableCell><Typography variant="body1"><strong>Gross Salary:</strong></Typography></TableCell>
// //                       <TableCell align="right"><Typography variant="body1">{formatCurrency(selectedRecordForDialog.gross_salary)}</Typography></TableCell>
// //                     </TableRow>
// //                      <TableRow sx={{ borderTop: '2px solid #4caf50' }}>
// //                       <TableCell><Typography variant="h6" component="div">Net Pay (Take Home)</Typography></TableCell>
// //                       <TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{formatCurrency(selectedRecordForDialog.net_pay)}</Typography></TableCell>
// //                     </TableRow>
// //                   </TableBody></Table>
// //                 </Paper>
// //               </Grid>
// //             </Grid>
// //           ) : <Typography>Could not find a matching salary structure for this record.</Typography>}
// //         </DialogContent>
// //         <DialogActions><Button onClick={handleCloseDialog} sx={{ color: '#7C3AED' }}>Close</Button></DialogActions>
// //       </Dialog>
// //       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>
// //     </Container>
// //   );
// // };

// // export default Payroll;

// import React, { useState, useEffect } from 'react';
// import {
//   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, FormControl,
//   Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, CircularProgress
// } from '@mui/material';
// import axiosInstance from "../../utils/axiosInstance"; // Assuming this is your configured axios instance

// // Helper to access nested properties for sorting
// const getNestedValue = (obj, path) => path.split('.').reduce((o, k) => (o || {})[k], obj);

// // Helper to format currency consistently
// const formatCurrency = (value) => `₹${(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// const Payroll = () => {
//   // --- STATE MANAGEMENT ---
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [payrollRecords, setPayrollRecords] = useState([]);
//   const [savedRecords, setSavedRecords] = useState(new Set());
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));
  
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedRecordForDialog, setSelectedRecordForDialog] = useState(null);
//   const [isDialogLoading, setIsDialogLoading] = useState(false);
  
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [isLoading, setIsLoading] = useState(false);

//   // --- API INTEGRATION ---

//   useEffect(() => {
//     const fetchAllEmployees = async () => {
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) setAllEmployees(response.data);
//       } catch (error) { console.error("Failed to fetch employee list:", error); }
//     };
//     fetchAllEmployees();
//   }, []);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setPayrollRecords([]);
//     setSavedRecords(new Set());
//     const [year, month] = selectedMonth.split('-');
//     const employeesToQuery = selectedEmployee ? allEmployees.filter(emp => emp.employee_id === selectedEmployee) : allEmployees;

//     try {
//       const payrollDataPromises = employeesToQuery.map(async (emp) => {
//         try {
//           const payload = { employee_id: emp.employee_id, month, year };
//           const response = await axiosInstance.post('/api/payment_info/', payload);
//           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) return [];
//           return response.data.data.map(record => ({
//               employee_id: emp.employee_id,
//               name: record.employee_name,
//               email: record.email || 'N/A',
//               payslipType: record.payslip_type || 'Per Month',
//               status: record.status === 'P' ? 'Paid' : 'Un Paid',
//               payroll_report_id: record.payroll_report_id,
//               netSalary: record.net_salary || 0,
//           }));
//         } catch (err) { return []; }
//       });
      
//       const results = await Promise.all(payrollDataPromises);
//       const flattenedRecords = results.flat();
//       const initiallySaved = new Set(flattenedRecords.filter(rec => rec.status === 'Paid').map(rec => rec.payroll_report_id));
      
//       setPayrollRecords(flattenedRecords);
//       setSavedRecords(initiallySaved);
//     } catch (error) { console.error("An error occurred during search:", error); } 
//     finally { setIsLoading(false); }
//   };

//   const handleOpenDialog = async (recordFromTable) => {
//     setIsDialogOpen(true);
//     setIsDialogLoading(true);
//     setSelectedRecordForDialog(null); 
//     const [year, month] = selectedMonth.split('-');
    
//     try {
//       const response = await axiosInstance.post('/api/salary_structure/', {
//         employee_id: recordFromTable.employee_id, month, year
//       });

//       if (response.data.status === 'success' && Array.isArray(response.data.data) && response.data.data.length > 0) {
//         const allStructures = response.data.data;
//         const correctStructure = allStructures.find(s => s.net_pay === recordFromTable.netSalary);

//         if (correctStructure) {
//           setSelectedRecordForDialog(correctStructure);
//         } else {
//           throw new Error("Data mismatch: Could not find a structure matching the net pay.");
//         }
//       } else {
//          throw new Error("No salary structure data returned for this employee.");
//       }
//     } catch (error) {
//       console.error("Error in handleOpenDialog:", error);
//       setSnackbar({ open: true, message: error.message, severity: 'error' });
//     } finally {
//       setIsDialogLoading(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedRecordForDialog(null);
//   };

//   const handleStatusChange = (payrollReportId, newStatus) => {
//     setPayrollRecords(prev =>
//       prev.map(rec => rec.payroll_report_id === payrollReportId ? { ...rec, status: newStatus } : rec)
//     );
//     if (newStatus === 'Un Paid') {
//       setSavedRecords(prev => { const newSet = new Set(prev); newSet.delete(payrollReportId); return newSet; });
//     }
//   };

//   const handleSave = async (record) => {
//     const payload = { payroll_report_id: record.payroll_report_id, pay_status: record.status === 'Paid' ? 'P' : 'G' };
//     try {
//       await axiosInstance.post('/api/update_payment_info/', payload);
//       setSavedRecords(prev => new Set(prev).add(record.payroll_report_id));
//       setSnackbar({ open: true, message: `Payment info for ${record.name} saved successfully.`, severity: 'success' });
//     } catch (error) {
//       setSnackbar({ open: true, message: 'Failed to save payment info.', severity: 'error' });
//     }
//   };

//   // --- UI and Sorting Logic ---
//   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
//   const sortedEmployees = [...payrollRecords].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const aValue = getNestedValue(a, sortConfig.key); const bValue = getNestedValue(b, sortConfig.key);
//     if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//     return 0;
//   });
//   const paginatedEmployees = sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey) return <span style={{ color: '#9ca3af', fontSize: 12 }}>⇅</span>;
//     return <span style={{ color: '#4b5563', fontSize: 12 }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
//   };

//   return (
//     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
//       <Grid container spacing={2} mb={3} justifyContent="center"><Grid item xs={12} md={10} lg={8}><Grid container spacing={2}>
//         <Grid item xs={12} sm={6} md={4}><TextField select fullWidth label="Employee" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} size="small"><MenuItem value="">All Employees</MenuItem>{allEmployees.map((emp) => (<MenuItem key={emp.employee_id} value={emp.employee_id}>{emp.employee_name}</MenuItem>))}</TextField></Grid>
//         <Grid item xs={12} sm={6} md={4}><TextField fullWidth type="month" label="Select Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} size="small" InputLabelProps={{ shrink: true }} /></Grid>
//         <Grid item xs={12} sm={12} md={4} display="flex" alignItems="center"><Button variant="contained" onClick={handleSearch} sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>
//       </Grid></Grid></Grid>
//       <Typography variant="subtitle1" fontWeight="bold" mb={2}>Payment Info for {selectedMonth}</Typography>

//       <TableContainer component={Paper}><Table size="small"><TableHead sx={{ backgroundColor: '#f3f4f6' }}><TableRow>
//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} <span>Employee</span></Box></TableCell>
//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payroll_report_id')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payroll_report_id')} <span>Payroll ID</span></Box></TableCell>
//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netSalary')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netSalary')} <span>Net Salary</span></Box></TableCell>
//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('status')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('status')} <span>Status</span></Box></TableCell>
//         <TableCell>Actions</TableCell>
//       </TableRow></TableHead><TableBody>
//         {isLoading ? (<TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>) : paginatedEmployees.length > 0 ? (
//           paginatedEmployees.map((rec) => (
//             <TableRow key={rec.payroll_report_id} hover>
//               <TableCell><Box display="flex" alignItems="center" gap={1}><Avatar sx={{ width: 24, height: 24 }} /><Box><Typography variant="body2">{rec.name}</Typography><Typography variant="caption" color="text.secondary">{rec.email}</Typography></Box></Box></TableCell>
//               <TableCell>{rec.payroll_report_id}</TableCell><TableCell sx={{ color: '#7c3aed', fontWeight: 'bold' }}>{formatCurrency(rec.netSalary)}</TableCell>
//               <TableCell><FormControl fullWidth size="small" variant="outlined"><Select value={rec.status} onChange={(e) => handleStatusChange(rec.payroll_report_id, e.target.value)}
//                 sx={{ fontSize: 12, fontWeight: 'bold', bgcolor: rec.status === 'Paid' ? '#d1fae5' : '#fee2e2', color: rec.status === 'Paid' ? '#059669' : '#dc2626', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSelect-icon': { color: rec.status === 'Paid' ? '#059669' : '#dc2626' } }}>
//                 <MenuItem value="Paid">Paid</MenuItem><MenuItem value="Un Paid">Un Paid</MenuItem>
//               </Select></FormControl></TableCell>
//               <TableCell>
//                 <Button onClick={() => handleOpenDialog(rec)} size="small" variant="outlined" sx={{ mr: 1, textTransform: 'none', fontSize: '11px', p: '2px 8px' }}>Structure</Button>
//                 <Button variant="contained" size="small" onClick={() => handleSave(rec)} disabled={savedRecords.has(rec.payroll_report_id)} sx={{ textTransform: 'none', bgcolor: '#7C3AED', fontSize: '11px' }}>{savedRecords.has(rec.payroll_report_id) ? 'Saved' : 'Save'}</Button>
//               </TableCell>
//             </TableRow>
//           ))
//         ) : (<TableRow><TableCell colSpan={5} align="center">No data available. Select a month and click Search.</TableCell></TableRow>)}
//       </TableBody></Table></TableContainer>
//       <Box sx={{ mt: 2 }}><Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//         <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</Button></Grid>
//         <Grid item>Page {page + 1} of {Math.max(1, Math.ceil(sortedEmployees.length / rowsPerPage))}</Grid>
//         <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedEmployees.length / rowsPerPage) - 1}>Next</Button></Grid>
//       </Grid></Box>

//       {/* --- REVISED DIALOG WITH 3-PART STRUCTURE --- */}
//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
//         <DialogTitle>{selectedRecordForDialog ? `Salary Structure - ${selectedRecordForDialog.employee_name}` : "Loading..."}</DialogTitle>
//         <DialogContent>
//           {isDialogLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : selectedRecordForDialog ? (
//             (() => {
//               const record = selectedRecordForDialog;
//               // --- CALCULATE BENEFITS ---
//               const pfEmployer = record.pf || 0; // Assumption: Employer PF = Employee PF
//               const esicWageBase = (record.esic && record.esic > 0) ? (record.esic / 0.0075) : 0;
//               const esicEmployer = Math.round(esicWageBase * 0.0325);
//               const gratuity = record.gratuity || 0; // Will be 0 unless backend provides it

//               return (
//                 <Grid container spacing={2}>
//                   {/* (A) EARNINGS */}
//                   <Grid item xs={12} md={4}><Paper variant="outlined">
//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(A) Earnings</strong></Typography>
//                     <Table size="small"><TableBody>
//                       <TableRow><TableCell>Basic + DA</TableCell><TableCell align="right">{formatCurrency(record.basic_plus_da)}</TableCell></TableRow>
//                       <TableRow><TableCell>HRA</TableCell><TableCell align="right">{formatCurrency(record.hra)}</TableCell></TableRow>
//                       <TableRow><TableCell>Medical</TableCell><TableCell align="right">{formatCurrency(record.medical_allowance)}</TableCell></TableRow>
//                       <TableRow><TableCell>Conveyance</TableCell><TableCell align="right">{formatCurrency(record.conveyance_allowance)}</TableCell></TableRow>
//                       <TableRow><TableCell>Arrears</TableCell><TableCell align="right">{formatCurrency(record.arrears)}</TableCell></TableRow>
//                     </TableBody></Table>
//                   </Paper></Grid>
//                   {/* (B) BENEFITS */}
//                   <Grid item xs={12} md={4}><Paper variant="outlined">
//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(B) Benefits (Employer)</strong></Typography>
//                     <Table size="small"><TableBody>
//                       <TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(pfEmployer)}</TableCell></TableRow>
//                       <TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(esicEmployer)}</TableCell></TableRow>
//                       <TableRow><TableCell>Gratuity</TableCell><TableCell align="right">{formatCurrency(gratuity)}</TableCell></TableRow>
//                     </TableBody></Table>
//                   </Paper></Grid>
//                   {/* (C) DEDUCTIONS */}
//                   <Grid item xs={12} md={4}><Paper variant="outlined">
//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(C) Deductions (Employee)</strong></Typography>
//                     <Table size="small"><TableBody>
//                       <TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(record.pf)}</TableCell></TableRow>
//                       <TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(record.esic)}</TableCell></TableRow>
//                       <TableRow><TableCell>TDS</TableCell><TableCell align="right">{formatCurrency(record.tds)}</TableCell></TableRow>
//                       <TableRow><TableCell>MLWF</TableCell><TableCell align="right">{formatCurrency(record.mlwf)}</TableCell></TableRow>
//                       <TableRow><TableCell>Other Deduction</TableCell><TableCell align="right">{formatCurrency(record.other_deduction)}</TableCell></TableRow>
//                     </TableBody></Table>
//                   </Paper></Grid>
//                   {/* SUMMARY SECTION */}
//                   <Grid item xs={12}><Paper elevation={3} sx={{ mt: 2 }}>
//                     <Table size="small"><TableBody>
//                       <TableRow><TableCell>Total Earnings (A)</TableCell><TableCell align="right">{formatCurrency(record.total_earnings)}</TableCell></TableRow>
//                       <TableRow><TableCell>Total Deductions (C)</TableCell><TableCell align="right">{formatCurrency(record.total_deduction)}</TableCell></TableRow>
//                       <TableRow sx={{ borderTop: '2px solid #4caf50' }}>
//                         <TableCell><Typography variant="h6" component="div">Net Pay (A - C)</Typography></TableCell>
//                         <TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{formatCurrency(record.net_pay)}</Typography></TableCell>
//                       </TableRow>
//                     </TableBody></Table>
//                   </Paper></Grid>
//                 </Grid>
//               );
//             })()
//           ) : <Typography>Could not find a matching salary structure.</Typography>}
//         </DialogContent>
//         <DialogActions><Button onClick={handleCloseDialog} sx={{ color: '#7C3AED' }}>Close</Button></DialogActions>
//       </Dialog>
//       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>
//     </Container>
//   );
// };

// export default Payroll;
















// import React, { useState, useEffect } from 'react';

// import {

//   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,

//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, FormControl,

//   Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, CircularProgress,

//   Autocomplete // <-- Import Autocomplete

// } from '@mui/material';

// import axiosInstance from "../../utils/axiosInstance"; // Assuming this is your configured axios instance

 

// // Helper to access nested properties for sorting

// const getNestedValue = (obj, path) => path.split('.').reduce((o, k) => (o || {})[k], obj);

 

// // Helper to format currency consistently

// const formatCurrency = (value) => `₹${(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

 

// const Payroll = () => {

//   // --- STATE MANAGEMENT ---

//   const [allEmployees, setAllEmployees] = useState([]);

//   const [payrollRecords, setPayrollRecords] = useState([]);

//   const [savedRecords, setSavedRecords] = useState(new Set());

//   const [selectedEmployee, setSelectedEmployee] = useState('');

//   const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));

 

//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

 

//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const [selectedRecordForDialog, setSelectedRecordForDialog] = useState(null);

//   const [isDialogLoading, setIsDialogLoading] = useState(false);

 

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   const [isLoading, setIsLoading] = useState(false);

 

//   // --- API INTEGRATION ---

 

//   useEffect(() => {

//     const fetchAllEmployees = async () => {

//       try {

//         const response = await axiosInstance.get('/api/dropdown/employee-role/');

//         if (response.data && Array.isArray(response.data)) setAllEmployees(response.data);

//       } catch (error) { console.error("Failed to fetch employee list:", error); }

//     };

//     fetchAllEmployees();

//   }, []);

 

//   const handleSearch = async () => {

//     setIsLoading(true);

//     setPayrollRecords([]);

//     setSavedRecords(new Set());

//     const [year, month] = selectedMonth.split('-');

//     const employeesToQuery = selectedEmployee ? allEmployees.filter(emp => emp.employee_id === selectedEmployee) : allEmployees;

 

//     try {

//       const payrollDataPromises = employeesToQuery.map(async (emp) => {

//         try {

//           const payload = { employee_id: emp.employee_id, month, year };

//           const response = await axiosInstance.post('/api/payment_info/', payload);

//           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) return [];

//           return response.data.data.map(record => ({

//               employee_id: emp.employee_id,

//               name: record.employee_name,

//               email: record.email || 'N/A',

//               payslipType: record.payslip_type || 'Per Month',

//               status: record.status === 'P' ? 'Paid' : 'Un Paid',

//               payroll_report_id: record.payroll_report_id,

//               netSalary: record.net_salary || 0,

//           }));

//         } catch (err) { return []; }

//       });

     

//       const results = await Promise.all(payrollDataPromises);

//       const flattenedRecords = results.flat();

//       const initiallySaved = new Set(flattenedRecords.filter(rec => rec.status === 'Paid').map(rec => rec.payroll_report_id));

     

//       setPayrollRecords(flattenedRecords);

//       setSavedRecords(initiallySaved);

//     } catch (error) { console.error("An error occurred during search:", error); }

//     finally { setIsLoading(false); }

//   };

 

//   const handleOpenDialog = async (recordFromTable) => {

//     setIsDialogOpen(true);

//     setIsDialogLoading(true);

//     setSelectedRecordForDialog(null);

//     const [year, month] = selectedMonth.split('-');

   

//     try {

//       const response = await axiosInstance.post('/api/salary_structure/', {

//         employee_id: recordFromTable.employee_id, month, year

//       });

 

//       if (response.data.status === 'success' && Array.isArray(response.data.data) && response.data.data.length > 0) {

//         const allStructures = response.data.data;

//         const correctStructure = allStructures.find(s => s.net_pay === recordFromTable.netSalary);

 

//         if (correctStructure) {

//           setSelectedRecordForDialog(correctStructure);

//         } else {

//           throw new Error("Data mismatch: Could not find a structure matching the net pay.");

//         }

//       } else {

//          throw new Error("No salary structure data returned for this employee.");

//       }

//     } catch (error) {

//       console.error("Error in handleOpenDialog:", error);

//       setSnackbar({ open: true, message: error.message, severity: 'error' });

//     } finally {

//       setIsDialogLoading(false);

//     }

//   };

 

//   const handleCloseDialog = () => {

//     setIsDialogOpen(false);

//     setSelectedRecordForDialog(null);

//   };

 

//   const handleStatusChange = (payrollReportId, newStatus) => {

//     setPayrollRecords(prev =>

//       prev.map(rec => rec.payroll_report_id === payrollReportId ? { ...rec, status: newStatus } : rec)

//     );

//     if (newStatus === 'Un Paid') {

//       setSavedRecords(prev => { const newSet = new Set(prev); newSet.delete(payrollReportId); return newSet; });

//     }

//   };

 

//   const handleSave = async (record) => {

//     const payload = { payroll_report_id: record.payroll_report_id, pay_status: record.status === 'Paid' ? 'P' : 'G' };

//     try {

//       await axiosInstance.post('/api/update_payment_info/', payload);

//       setSavedRecords(prev => new Set(prev).add(record.payroll_report_id));

//       setSnackbar({ open: true, message: `Payment info for ${record.name} saved successfully.`, severity: 'success' });

//     } catch (error) {

//       setSnackbar({ open: true, message: 'Failed to save payment info.', severity: 'error' });

//     }

//   };

 

//   // --- UI and Sorting Logic ---

//   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const sortedEmployees = [...payrollRecords].sort((a, b) => {

//     if (!sortConfig.key) return 0;

//     const aValue = getNestedValue(a, sortConfig.key); const bValue = getNestedValue(b, sortConfig.key);

//     if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;

//     if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;

//     return 0;

//   });

//   const paginatedEmployees = sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const getSortArrow = (columnKey) => {

//     if (sortConfig.key !== columnKey) return <span style={{ color: '#9ca3af', fontSize: 12 }}>⇅</span>;

//     return <span style={{ color: '#4b5563', fontSize: 12 }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;

//   };

 

//   return (

//     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>

//       <Grid container spacing={2} mb={3} justifyContent="center"><Grid item xs={12} md={10} lg={8}><Grid container spacing={2}>

//         <Grid item xs={12} sm={6} md={4}>

//           {/* --- MODIFIED EMPLOYEE DROPDOWN --- */}

//           <Autocomplete

//             fullWidth

//             size="small"

//             options={[{ employee_id: '', employee_name: 'All Employees' }, ...allEmployees]}

//             getOptionLabel={(option) => option.employee_name}

//             value={

//               allEmployees.find(emp => emp.employee_id === selectedEmployee) ||

//               { employee_id: '', employee_name: 'All Employees' }

//             }

//             onChange={(event, newValue) => {

//               setSelectedEmployee(newValue ? newValue.employee_id : '');

//             }}

//             isOptionEqualToValue={(option, value) => option.employee_id === value.employee_id}

//             renderInput={(params) => <TextField {...params} label="Employee" />}

//             PopperProps={{

//               anchorOrigin: {

//                 vertical: 'bottom',

//                 horizontal: 'left',

//               },

//               transformOrigin: {

//                 vertical: 'top',

//                 horizontal: 'left',

//               },

//             }}

//           />

//         </Grid>

//         <Grid item xs={12} sm={6} md={4}><TextField fullWidth type="month" label="Select Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} size="small" InputLabelProps={{ shrink: true }} /></Grid>

//         <Grid item xs={12} sm={12} md={4} display="flex" alignItems="center"><Button variant="contained" onClick={handleSearch} sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>

//       </Grid></Grid></Grid>

//       <Typography variant="subtitle1" fontWeight="bold" mb={2}>Payment Info for {selectedMonth}</Typography>

 

//       <TableContainer component={Paper}><Table size="small"><TableHead sx={{ backgroundColor: '#f3f4f6' }}><TableRow>

//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} <span>Employee</span></Box></TableCell>

//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payroll_report_id')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payroll_report_id')} <span>Payroll ID</span></Box></TableCell>

//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netSalary')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netSalary')} <span>Net Salary</span></Box></TableCell>

//         <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('status')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('status')} <span>Status</span></Box></TableCell>

//         <TableCell>Actions</TableCell>

//       </TableRow></TableHead><TableBody>

//         {isLoading ? (<TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>) : paginatedEmployees.length > 0 ? (

//           paginatedEmployees.map((rec) => (

//             <TableRow key={rec.payroll_report_id} hover>

//               <TableCell><Box display="flex" alignItems="center" gap={1}><Avatar sx={{ width: 24, height: 24 }} /><Box><Typography variant="body2">{rec.name}</Typography><Typography variant="caption" color="text.secondary">{rec.email}</Typography></Box></Box></TableCell>

//               <TableCell>{rec.payroll_report_id}</TableCell><TableCell sx={{ color: '#7c3aed', fontWeight: 'bold' }}>{formatCurrency(rec.netSalary)}</TableCell>

//               <TableCell><FormControl fullWidth size="small" variant="outlined"><Select value={rec.status} onChange={(e) => handleStatusChange(rec.payroll_report_id, e.target.value)}

//                 sx={{ fontSize: 12, fontWeight: 'bold', bgcolor: rec.status === 'Paid' ? '#d1fae5' : '#fee2e2', color: rec.status === 'Paid' ? '#059669' : '#dc2626', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSelect-icon': { color: rec.status === 'Paid' ? '#059669' : '#dc2626' } }}>

//                 <MenuItem value="Paid">Paid</MenuItem><MenuItem value="Un Paid">Un Paid</MenuItem>

//               </Select></FormControl></TableCell>

//               <TableCell>

//                 <Button onClick={() => handleOpenDialog(rec)} size="small" variant="outlined" sx={{ mr: 1, textTransform: 'none', fontSize: '11px', p: '2px 8px' }}>Structure</Button>

//                 <Button variant="contained" size="small" onClick={() => handleSave(rec)} disabled={savedRecords.has(rec.payroll_report_id)} sx={{ textTransform: 'none', bgcolor: '#7C3AED', fontSize: '11px' }}>{savedRecords.has(rec.payroll_report_id) ? 'Saved' : 'Save'}</Button>

//               </TableCell>

//             </TableRow>

//           ))

//         ) : (<TableRow><TableCell colSpan={5} align="center">No data available. Select a month and click Search.</TableCell></TableRow>)}

//       </TableBody></Table></TableContainer>

//       <Box sx={{ mt: 2 }}><Grid container justifyContent="flex-end" alignItems="center" spacing={1}>

//         <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</Button></Grid>

//         <Grid item>Page {page + 1} of {Math.max(1, Math.ceil(sortedEmployees.length / rowsPerPage))}</Grid>

//         <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedEmployees.length / rowsPerPage) - 1}>Next</Button></Grid>

//       </Grid></Box>

 

//       {/* --- REVISED DIALOG WITH 3-PART STRUCTURE --- */}

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>

//         <DialogTitle>{selectedRecordForDialog ? `Salary Structure - ${selectedRecordForDialog.employee_name}` : "Loading..."}</DialogTitle>

//         <DialogContent>

//           {isDialogLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : selectedRecordForDialog ? (

//             (() => {

//               const record = selectedRecordForDialog;

//               // --- CALCULATE BENEFITS ---

//               const pfEmployer = record.pf || 0; // Assumption: Employer PF = Employee PF

//               const esicWageBase = (record.esic && record.esic > 0) ? (record.esic / 0.0075) : 0;

//               const esicEmployer = Math.round(esicWageBase * 0.0325);

//               const gratuity = record.gratuity || 0; // Will be 0 unless backend provides it

 

//               return (

//                 <Grid container spacing={2}>

//                   {/* (A) EARNINGS */}

//                   <Grid item xs={12} md={4}><Paper variant="outlined">

//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(A) Earnings</strong></Typography>

//                     <Table size="small"><TableBody>

//                       <TableRow><TableCell>Basic + DA</TableCell><TableCell align="right">{formatCurrency(record.basic_plus_da)}</TableCell></TableRow>

//                       <TableRow><TableCell>HRA</TableCell><TableCell align="right">{formatCurrency(record.hra)}</TableCell></TableRow>

//                       <TableRow><TableCell>Medical</TableCell><TableCell align="right">{formatCurrency(record.medical_allowance)}</TableCell></TableRow>

//                       <TableRow><TableCell>Conveyance</TableCell><TableCell align="right">{formatCurrency(record.conveyance_allowance)}</TableCell></TableRow>

//                       <TableRow><TableCell>Arrears</TableCell><TableCell align="right">{formatCurrency(record.arrears)}</TableCell></TableRow>

//                     </TableBody></Table>

//                   </Paper></Grid>

//                   {/* (B) BENEFITS */}

//                   <Grid item xs={12} md={4}><Paper variant="outlined">

//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(B) Benefits (Employer)</strong></Typography>

//                     <Table size="small"><TableBody>

//                       <TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(pfEmployer)}</TableCell></TableRow>

//                       <TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(esicEmployer)}</TableCell></TableRow>

//                       <TableRow><TableCell>Gratuity</TableCell><TableCell align="right">{formatCurrency(gratuity)}</TableCell></TableRow>

//                     </TableBody></Table>

//                   </Paper></Grid>

//                   {/* (C) DEDUCTIONS */}

//                   <Grid item xs={12} md={4}><Paper variant="outlined">

//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(C) Deductions (Employee)</strong></Typography>

//                     <Table size="small"><TableBody>

//                       <TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(record.pf)}</TableCell></TableRow>

//                       <TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(record.esic)}</TableCell></TableRow>

//                       <TableRow><TableCell>TDS</TableCell><TableCell align="right">{formatCurrency(record.tds)}</TableCell></TableRow>

//                       <TableRow><TableCell>MLWF</TableCell><TableCell align="right">{formatCurrency(record.mlwf)}</TableCell></TableRow>

//                       <TableRow><TableCell>Other Deduction</TableCell><TableCell align="right">{formatCurrency(record.other_deduction)}</TableCell></TableRow>

//                     </TableBody></Table>

//                   </Paper></Grid>

//                   {/* SUMMARY SECTION */}

//                   <Grid item xs={12}><Paper elevation={3} sx={{ mt: 2 }}>

//                     <Table size="small"><TableBody>

//                       <TableRow><TableCell>Total Earnings (A)</TableCell><TableCell align="right">{formatCurrency(record.total_earnings)}</TableCell></TableRow>

//                       <TableRow><TableCell>Total Deductions (C)</TableCell><TableCell align="right">{formatCurrency(record.total_deduction)}</TableCell></TableRow>

//                       <TableRow sx={{ borderTop: '2px solid #4caf50' }}>

//                         <TableCell><Typography variant="h6" component="div">Net Pay (A - C)</Typography></TableCell>

//                         <TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{formatCurrency(record.net_pay)}</Typography></TableCell>

//                       </TableRow>

//                     </TableBody></Table>

//                   </Paper></Grid>

//                 </Grid>

//               );

//             })()

//           ) : <Typography>Could not find a matching salary structure.</Typography>}

//         </DialogContent>

//         <DialogActions><Button onClick={handleCloseDialog} sx={{ color: '#7C3AED' }}>Close</Button></DialogActions>

//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>

//     </Container>

//   );

// };

 

// export default Payroll;

 






// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, FormControl,
//   Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress,
//   Autocomplete, TablePagination, Skeleton, useTheme, useMediaQuery
// } from '@mui/material';
// import { Search as SearchIcon } from '@mui/icons-material';
// import Swal from 'sweetalert2';
// import axiosInstance from "../../utils/axiosInstance"; // Assuming this is your configured axios instance

// // Helper to access nested properties for sorting
// const getNestedValue = (obj, path) => path.split('.').reduce((o, k) => (o || {})[k], obj);

// // Helper to format currency consistently
// const formatCurrency = (value) => `₹${(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// const Payroll = () => {
//   // --- STATE MANAGEMENT ---
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [payrollRecords, setPayrollRecords] = useState([]);
//   const [savedRecords, setSavedRecords] = useState(new Set());
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));
//   const [searchTerm, setSearchTerm] = useState('');

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedRecordForDialog, setSelectedRecordForDialog] = useState(null);
//   const [isDialogLoading, setIsDialogLoading] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);

//   // --- RESPONSIVE DESIGN HOOKS ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- API INTEGRATION ---
//   useEffect(() => {
//     const fetchAllEmployees = async () => {
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) setAllEmployees(response.data);
//       } catch (error) { console.error("Failed to fetch employee list:", error); }
//     };
//     fetchAllEmployees();
//   }, []);

//   const handleSearch = async () => {
//     setIsLoading(true);
//     setPayrollRecords([]);
//     setSavedRecords(new Set());
//     setPage(0); // Reset page on new search
//     const [year, month] = selectedMonth.split('-');
//     const employeesToQuery = selectedEmployee ? allEmployees.filter(emp => emp.employee_id === selectedEmployee) : allEmployees;

//     try {
//       const payrollDataPromises = employeesToQuery.map(async (emp) => {
//         try {
//           const payload = { employee_id: emp.employee_id, month, year };
//           const response = await axiosInstance.post('/api/payment_info/', payload);
//           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) return [];
//           return response.data.data.map(record => ({
//             employee_id: emp.employee_id,
//             name: record.employee_name,
//             email: record.email || 'N/A',
//             status: record.status === 'P' ? 'Paid' : 'Un Paid',
//             payroll_report_id: record.payroll_report_id,
//             netSalary: record.net_salary || 0,
//           }));
//         } catch (err) { return []; }
//       });
      
//       const results = await Promise.all(payrollDataPromises);
//       const flattenedRecords = results.flat();
//       const initiallySaved = new Set(flattenedRecords.filter(rec => rec.status === 'Paid').map(rec => rec.payroll_report_id));
      
//       setPayrollRecords(flattenedRecords);
//       setSavedRecords(initiallySaved);
//     } catch (error) {
//       console.error("An error occurred during search:", error);
//       Swal.fire({ icon: 'error', title: 'Search Failed', text: 'Could not fetch payroll data.', timer: 3000, showConfirmButton: false });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOpenDialog = async (recordFromTable) => {
//     setIsDialogOpen(true);
//     setIsDialogLoading(true);
//     setSelectedRecordForDialog(null);
//     const [year, month] = selectedMonth.split('-');
   
//     try {
//       const response = await axiosInstance.post('/api/salary_structure/', {
//         employee_id: recordFromTable.employee_id, month, year
//       });
//       if (response.data.status === 'success' && Array.isArray(response.data.data) && response.data.data.length > 0) {
//         const allStructures = response.data.data;
//         const correctStructure = allStructures.find(s => s.net_pay === recordFromTable.netSalary);
//         if (correctStructure) {
//           setSelectedRecordForDialog(correctStructure);
//         } else {
//           throw new Error("Data mismatch: Could not find a structure matching the net pay.");
//         }
//       } else {
//          throw new Error("No salary structure data returned for this employee.");
//       }
//     } catch (error) {
//       console.error("Error in handleOpenDialog:", error);
//       Swal.fire({ icon: 'error', title: 'Error', text: error.message, timer: 3000, showConfirmButton: false });
//       handleCloseDialog();
//     } finally {
//       setIsDialogLoading(false);
//     }
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedRecordForDialog(null);
//   };

//   const handleStatusChange = (payrollReportId, newStatus) => {
//     setPayrollRecords(prev =>
//       prev.map(rec => rec.payroll_report_id === payrollReportId ? { ...rec, status: newStatus } : rec)
//     );
//     if (newStatus === 'Un Paid') {
//       setSavedRecords(prev => { const newSet = new Set(prev); newSet.delete(payrollReportId); return newSet; });
//     }
//   };

//   const handleSave = async (record) => {
//     const payload = { payroll_report_id: record.payroll_report_id, pay_status: record.status === 'Paid' ? 'P' : 'G' };
//     try {
//       await axiosInstance.post('/api/update_payment_info/', payload);
//       setSavedRecords(prev => new Set(prev).add(record.payroll_report_id));
//       Swal.fire({ icon: 'success', title: 'Saved!', text: `Payment info for ${record.name} saved successfully.`, timer: 3000, showConfirmButton: false });
//     } catch (error) {
//       Swal.fire({ icon: 'error', title: 'Save Failed', text: 'Could not update payment info.', timer: 3000, showConfirmButton: false });
//     }
//   };

//   // --- UI and Data Processing Logic ---
//   const filteredRecords = useMemo(() => {
//     if (!searchTerm) return payrollRecords;
//     return payrollRecords.filter(rec =>
//       rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       rec.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [payrollRecords, searchTerm]);

//   const sortedRecords = useMemo(() => {
//     return [...filteredRecords].sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       const aValue = getNestedValue(a, sortConfig.key);
//       const bValue = getNestedValue(b, sortConfig.key);
//       if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [filteredRecords, sortConfig]);
  
//   const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey) return <span style={{ color: '#e0e0e0', fontSize: 12, opacity: 0.7 }}>⇅</span>;
//     return <span style={{ color: '#FFFFFF', fontSize: 12 }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
//         Payroll Management
//       </Typography>

//       <Grid container spacing={2} mb={3} alignItems="center" justifyContent="space-between">
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={5}>
//               <Autocomplete
//                 fullWidth size="small"
//                 options={[{ employee_id: '', employee_name: 'All Employees' }, ...allEmployees]}
//                 getOptionLabel={(option) => option.employee_name}
//                 value={ allEmployees.find(emp => emp.employee_id === selectedEmployee) || { employee_id: '', employee_name: 'All Employees' } }
//                 onChange={(event, newValue) => setSelectedEmployee(newValue ? newValue.employee_id : '')}
//                 isOptionEqualToValue={(option, value) => option.employee_id === value.employee_id}
//                 renderInput={(params) => <TextField {...params} label="Employee" />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField fullWidth type="month" label="Select Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
//             </Grid>
//             <Grid item xs={12} sm={12} md={3}>
//               <Button variant="contained" onClick={handleSearch} fullWidth sx={{ bgcolor: '#8C257C', color: '#FFFFFF', '&:hover': { bgcolor: '#6d1d60' } }}>Search</Button>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} md={4}>
//            <TextField fullWidth size="small" placeholder="Search Results..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} />
//         </Grid>
//       </Grid>

//       <TableContainer sx={{ whiteSpace: 'nowrap' }}>
//         <Table stickyHeader>
//           <TableHead sx={{ '& .MuiTableCell-root': { bgcolor: '#8C257C', color: '#FFFFFF', fontWeight: 'bold', fontSize: '0.9rem' } }}>
//             <TableRow>
//               <TableCell sx={{ width: 70 }}>SR NO.</TableCell>
//               <TableCell sx={{ cursor: 'pointer', minWidth: 250 }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} Employee</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer', minWidth: 120 }} onClick={() => handleSort('payroll_report_id')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payroll_report_id')} Payroll ID</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer', minWidth: 150 }} onClick={() => handleSort('netSalary')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netSalary')} Net Salary</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer', minWidth: 150 }} onClick={() => handleSort('status')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('status')} Status</Box></TableCell>
//               <TableCell align="center" sx={{minWidth: 180}}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {isLoading ? (
//               [...Array(rowsPerPage)].map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" width="50%" /></TableCell>
//                   <TableCell><Skeleton variant="text" width="80%" /></TableCell>
//                   <TableCell><Skeleton variant="text" width="60%" /></TableCell>
//                   <TableCell><Skeleton variant="text" width="50%" /></TableCell>
//                   <TableCell><Skeleton variant="text" width="70%" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={160} height={30} sx={{borderRadius: 1}} /></TableCell>
//                 </TableRow>
//               ))
//             ) : sortedRecords.length > 0 ? (
//               sortedRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rec, index) => (
//                 <TableRow key={rec.payroll_report_id} hover>
//                   <TableCell sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}><Box display="flex" alignItems="center" gap={1}><Avatar sx={{ width: 32, height: 32, bgcolor: '#8C257C' }}>{rec.name.charAt(0)}</Avatar><Box><Typography variant="body2" fontWeight={500}>{rec.name}</Typography><Typography variant="caption" color="text.secondary">{rec.email}</Typography></Box></Box></TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{rec.payroll_report_id}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem', color: '#8C257C', fontWeight: 'bold' }}>{formatCurrency(rec.netSalary)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}><FormControl fullWidth size="small" variant="outlined"><Select value={rec.status} onChange={(e) => handleStatusChange(rec.payroll_report_id, e.target.value)} sx={{ fontSize: 13, fontWeight: 'bold', bgcolor: rec.status === 'Paid' ? '#d1fae5' : '#fee2e2', color: rec.status === 'Paid' ? '#059669' : '#dc2626', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSelect-icon': { color: rec.status === 'Paid' ? '#059669' : '#dc2626' } }}><MenuItem value="Paid">Paid</MenuItem><MenuItem value="Un Paid">Un Paid</MenuItem></Select></FormControl></TableCell>
//                   <TableCell><Box display="flex" justifyContent="center" gap={0.5}>
//                     <Button onClick={() => handleOpenDialog(rec)} size="small" variant="outlined" sx={{ mr: 1 }}>Structure</Button>
//                     <Button variant="contained" size="small" onClick={() => handleSave(rec)} disabled={savedRecords.has(rec.payroll_report_id)} sx={{ bgcolor: '#8C257C', color: '#FFFFFF', '&:hover': { bgcolor: '#6d1d60' } }}>{savedRecords.has(rec.payroll_report_id) ? 'Saved' : 'Save'}</Button>
//                   </Box></TableCell>
//                 </TableRow>
//               ))
//             ) : (<TableRow><TableCell colSpan={6} align="center">No data available. Select a month and click Search.</TableCell></TableRow>)}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mt: 2, gap: 2 }}>
//         <Typography variant="body2" color="text.secondary">
//           Showing {sortedRecords.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, sortedRecords.length)} of {sortedRecords.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={sortedRecords.length}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{ '& .MuiSvgIcon-root': { color: '#8C257C' }, '& .Mui-selected': { bgcolor: 'rgba(140, 37, 124, 0.1) !important' } }}
//         />
//       </Box>

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//             {selectedRecordForDialog ? `Salary Structure - ${selectedRecordForDialog.employee_name}` : "Loading..."}
//         </DialogTitle>
//         <DialogContent dividers>
//           {isDialogLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{color: '#8C257C'}} /></Box> : selectedRecordForDialog ? (
//             (() => {
//               const record = selectedRecordForDialog;
//               const pfEmployer = record.pf || 0;
//               const esicWageBase = (record.esic && record.esic > 0) ? (record.esic / 0.0075) : 0;
//               const esicEmployer = Math.round(esicWageBase * 0.0325);
//               const gratuity = record.gratuity || 0;

//               return (
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}><Paper variant="outlined">
//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(A) Earnings</strong></Typography>
//                     <Table size="small"><TableBody><TableRow><TableCell>Basic + DA</TableCell><TableCell align="right">{formatCurrency(record.basic_plus_da)}</TableCell></TableRow><TableRow><TableCell>HRA</TableCell><TableCell align="right">{formatCurrency(record.hra)}</TableCell></TableRow><TableRow><TableCell>Medical</TableCell><TableCell align="right">{formatCurrency(record.medical_allowance)}</TableCell></TableRow><TableRow><TableCell>Conveyance</TableCell><TableCell align="right">{formatCurrency(record.conveyance_allowance)}</TableCell></TableRow><TableRow><TableCell>Arrears</TableCell><TableCell align="right">{formatCurrency(record.arrears)}</TableCell></TableRow></TableBody></Table>
//                   </Paper></Grid>
//                   <Grid item xs={12}><Paper variant="outlined">
//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(B) Benefits (Employer)</strong></Typography>
//                     <Table size="small"><TableBody><TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(pfEmployer)}</TableCell></TableRow><TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(esicEmployer)}</TableCell></TableRow><TableRow><TableCell>Gratuity</TableCell><TableCell align="right">{formatCurrency(gratuity)}</TableCell></TableRow></TableBody></Table>
//                   </Paper></Grid>
//                   <Grid item xs={12}><Paper variant="outlined">
//                     <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(C) Deductions (Employee)</strong></Typography>
//                     <Table size="small"><TableBody><TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(record.pf)}</TableCell></TableRow><TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(record.esic)}</TableCell></TableRow><TableRow><TableCell>TDS</TableCell><TableCell align="right">{formatCurrency(record.tds)}</TableCell></TableRow><TableRow><TableCell>MLWF</TableCell><TableCell align="right">{formatCurrency(record.mlwf)}</TableCell></TableRow><TableRow><TableCell>Other Deduction</TableCell><TableCell align="right">{formatCurrency(record.other_deduction)}</TableCell></TableRow></TableBody></Table>
//                   </Paper></Grid>
//                   <Grid item xs={12}><Paper elevation={3} sx={{ mt: 2 }}>
//                     <Table size="small"><TableBody><TableRow><TableCell>Total Earnings (A)</TableCell><TableCell align="right">{formatCurrency(record.total_earnings)}</TableCell></TableRow><TableRow><TableCell>Total Deductions (C)</TableCell><TableCell align="right">{formatCurrency(record.total_deduction)}</TableCell></TableRow><TableRow sx={{ borderTop: '2px solid #4caf50' }}><TableCell><Typography variant="h6" component="div">Net Pay (A - C)</Typography></TableCell><TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{formatCurrency(record.net_pay)}</Typography></TableCell></TableRow></TableBody></Table>
//                   </Paper></Grid>
//                 </Grid>
//               );
//             })()
//           ) : <Typography>Could not find a matching salary structure.</Typography>}
//         </DialogContent>
//         <DialogActions>
//             <Button onClick={handleCloseDialog} sx={{ color: '#757575', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)'} }}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Payroll;


import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, FormControl,
  Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress,
  Autocomplete, TablePagination, Skeleton, useTheme, useMediaQuery
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import axiosInstance from "../../utils/axiosInstance";

const getNestedValue = (obj, path) => path.split('.').reduce((o, k) => (o || {})[k], obj);

const formatCurrency = (value) => `₹${(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const Payroll = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [savedRecords, setSavedRecords] = useState(new Set());
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecordForDialog, setSelectedRecordForDialog] = useState(null);
  const [isDialogLoading, setIsDialogLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axiosInstance.get('/api/dropdown/employee-role/');
        if (response.data && Array.isArray(response.data)) setAllEmployees(response.data);
      } catch (error) { console.error("Failed to fetch employee list:", error); }
    };
    fetchAllEmployees();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setPayrollRecords([]);
    setSavedRecords(new Set());
    setPage(0); 
    const [year, month] = selectedMonth.split('-');
    const employeesToQuery = selectedEmployee ? allEmployees.filter(emp => emp.employee_id === selectedEmployee) : allEmployees;

    try {
      const payrollDataPromises = employeesToQuery.map(async (emp) => {
        try {
          const payload = { employee_id: emp.employee_id, month, year };
          const response = await axiosInstance.post('/api/payment_info/', payload);
          if (response.data.status !== 'success' || !Array.isArray(response.data.data)) return [];
          return response.data.data.map(record => ({
            employee_id: emp.employee_id,
            name: record.employee_name,
            email: record.email || 'N/A',
            status: record.status === 'P' ? 'Paid' : 'Un Paid',
            payroll_report_id: record.payroll_report_id,
            netSalary: record.net_salary || 0,
          }));
        } catch (err) { return []; }
      });
      
      const results = await Promise.all(payrollDataPromises);
      const flattenedRecords = results.flat();
      const initiallySaved = new Set(flattenedRecords.filter(rec => rec.status === 'Paid').map(rec => rec.payroll_report_id));
      
      setPayrollRecords(flattenedRecords);
      setSavedRecords(initiallySaved);
    } catch (error) {
      console.error("An error occurred during search:", error);
      Swal.fire({ icon: 'error', title: 'Search Failed', text: 'Could not fetch payroll data.', timer: 3000, showConfirmButton: false });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = async (recordFromTable) => {
    setIsDialogOpen(true);
    setIsDialogLoading(true);
    setSelectedRecordForDialog(null);
    const [year, month] = selectedMonth.split('-');
   
    try {
      const response = await axiosInstance.post('/api/salary_structure/', {
        employee_id: recordFromTable.employee_id, month, year
      });
      if (response.data.status === 'success' && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const allStructures = response.data.data;
        const correctStructure = allStructures.find(s => s.net_pay === recordFromTable.netSalary);
        if (correctStructure) {
          setSelectedRecordForDialog(correctStructure);
        } else {
          throw new Error("Data mismatch: Could not find a structure matching the net pay.");
        }
      } else {
         throw new Error("No salary structure data returned for this employee.");
      }
    } catch (error) {
      console.error("Error in handleOpenDialog:", error);
      Swal.fire({ icon: 'error', title: 'Error', text: error.message, timer: 3000, showConfirmButton: false });
      handleCloseDialog();
    } finally {
      setIsDialogLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRecordForDialog(null);
  };

  const handleStatusChange = (payrollReportId, newStatus) => {
    setPayrollRecords(prev =>
      prev.map(rec => rec.payroll_report_id === payrollReportId ? { ...rec, status: newStatus } : rec)
    );
    if (newStatus === 'Un Paid') {
      setSavedRecords(prev => { const newSet = new Set(prev); newSet.delete(payrollReportId); return newSet; });
    }
  };

  const handleSave = async (record) => {
    const payload = { payroll_report_id: record.payroll_report_id, pay_status: record.status === 'Paid' ? 'P' : 'G' };
    try {
      await axiosInstance.post('/api/update_payment_info/', payload);
      setSavedRecords(prev => new Set(prev).add(record.payroll_report_id));
      Swal.fire({ icon: 'success', title: 'Saved!', text: `Payment info for ${record.name} saved successfully.`, timer: 3000, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Save Failed', text: 'Could not update payment info.', timer: 3000, showConfirmButton: false });
    }
  };

  const filteredRecords = useMemo(() => {
    if (!searchTerm) return payrollRecords;
    return payrollRecords.filter(rec =>
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [payrollRecords, searchTerm]);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRecords, sortConfig]);
  
  const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  const getSortArrow = (columnKey) => {
    if (sortConfig.key !== columnKey) return <span style={{ color: '#e0e0e0', fontSize: 12, opacity: 0.7 }}>⇅</span>;
    return <span style={{ color: '#FFFFFF', fontSize: 12 }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
        Payroll Management
      </Typography>

      <Grid container spacing={2} mb={3} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={5}>
              <Autocomplete
                fullWidth size="small"
                options={[{ employee_id: '', employee_name: 'All Employees' }, ...allEmployees]}
                getOptionLabel={(option) => option.employee_id ? `${option.employee_name} (${option.employee_id})` : option.employee_name}
                value={ allEmployees.find(emp => emp.employee_id === selectedEmployee) || { employee_id: '', employee_name: 'All Employees' } }
                onChange={(event, newValue) => setSelectedEmployee(newValue ? newValue.employee_id : '')}
                isOptionEqualToValue={(option, value) => option.employee_id === value.employee_id}
                renderInput={(params) => <TextField {...params} label="Employee" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth type="month" label="Select Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Button variant="contained" onClick={handleSearch} fullWidth sx={{ bgcolor: '#8C257C', color: '#FFFFFF', '&:hover': { bgcolor: '#6d1d60' } }}>Search</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
           <TextField fullWidth size="small" placeholder="Search Results..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }} />
        </Grid>
      </Grid>

      <TableContainer sx={{ whiteSpace: 'nowrap' }}>
        <Table stickyHeader>
          <TableHead sx={{ '& .MuiTableCell-root': { bgcolor: '#8C257C', color: '#FFFFFF', fontWeight: 'bold', fontSize: '0.9rem' } }}>
            <TableRow>
              <TableCell sx={{ width: 70 }}>SR NO.</TableCell>
              <TableCell sx={{ cursor: 'pointer', minWidth: 250 }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} Employee</Box></TableCell>
              <TableCell sx={{ cursor: 'pointer', minWidth: 120 }} onClick={() => handleSort('payroll_report_id')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payroll_report_id')} Payroll ID</Box></TableCell>
              <TableCell sx={{ cursor: 'pointer', minWidth: 150 }} onClick={() => handleSort('netSalary')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netSalary')} Net Salary</Box></TableCell>
              <TableCell sx={{ cursor: 'pointer', minWidth: 150 }} onClick={() => handleSort('status')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('status')} Status</Box></TableCell>
              <TableCell align="center" sx={{minWidth: 180}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" width="50%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="50%" /></TableCell>
                  <TableCell><Skeleton variant="text" width="70%" /></TableCell>
                  <TableCell align="center"><Skeleton variant="rectangular" width={160} height={30} sx={{borderRadius: 1}} /></TableCell>
                </TableRow>
              ))
            ) : sortedRecords.length > 0 ? (
              sortedRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rec, index) => (
                <TableRow key={rec.payroll_report_id} hover>
                  <TableCell sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}><Box display="flex" alignItems="center" gap={1}><Avatar sx={{ width: 32, height: 32, bgcolor: '#8C257C' }}>{rec.name.charAt(0)}</Avatar><Box><Typography variant="body2" fontWeight={500}>{rec.name}</Typography><Typography variant="caption" color="text.secondary">{rec.email}</Typography></Box></Box></TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{rec.payroll_report_id}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem', color: '#8C257C', fontWeight: 'bold' }}>{formatCurrency(rec.netSalary)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}><FormControl fullWidth size="small" variant="outlined"><Select value={rec.status} onChange={(e) => handleStatusChange(rec.payroll_report_id, e.target.value)} sx={{ fontSize: 13, fontWeight: 'bold', bgcolor: rec.status === 'Paid' ? '#d1fae5' : '#fee2e2', color: rec.status === 'Paid' ? '#059669' : '#dc2626', borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSelect-icon': { color: rec.status === 'Paid' ? '#059669' : '#dc2626' } }}><MenuItem value="Paid">Paid</MenuItem><MenuItem value="Un Paid">Un Paid</MenuItem></Select></FormControl></TableCell>
                  <TableCell><Box display="flex" justifyContent="center" gap={0.5}>
                    <Button onClick={() => handleOpenDialog(rec)} size="small" variant="outlined" sx={{ mr: 1 }}>Structure</Button>
                    <Button variant="contained" size="small" onClick={() => handleSave(rec)} disabled={savedRecords.has(rec.payroll_report_id)} sx={{ bgcolor: '#8C257C', color: '#FFFFFF', '&:hover': { bgcolor: '#6d1d60' } }}>{savedRecords.has(rec.payroll_report_id) ? 'Saved' : 'Save'}</Button>
                  </Box></TableCell>
                </TableRow>
              ))
            ) : (<TableRow><TableCell colSpan={6} align="center">No data available. Select a month and click Search.</TableCell></TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mt: 2, gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {sortedRecords.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, sortedRecords.length)} of {sortedRecords.length} results
        </Typography>
        <TablePagination
          component="div"
          count={sortedRecords.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 15, 25]}
          sx={{ '& .MuiSvgIcon-root': { color: '#8C257C' }, '& .Mui-selected': { bgcolor: 'rgba(140, 37, 124, 0.1) !important' } }}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
            {selectedRecordForDialog ? `Salary Structure - ${selectedRecordForDialog.employee_name}` : "Loading..."}
        </DialogTitle>
        <DialogContent dividers>
          {isDialogLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{color: '#8C257C'}} /></Box> : selectedRecordForDialog ? (
            (() => {
              const record = selectedRecordForDialog;
              const pfEmployer = record.pf || 0;
              const esicWageBase = (record.esic && record.esic > 0) ? (record.esic / 0.0075) : 0;
              const esicEmployer = Math.round(esicWageBase * 0.0325);
              const gratuity = record.gratuity || 0;

              return (
                <Grid container spacing={2}>
                  <Grid item xs={12}><Paper variant="outlined">
                    <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(A) Earnings</strong></Typography>
                    <Table size="small"><TableBody><TableRow><TableCell>Basic + DA</TableCell><TableCell align="right">{formatCurrency(record.basic_plus_da)}</TableCell></TableRow><TableRow><TableCell>HRA</TableCell><TableCell align="right">{formatCurrency(record.hra)}</TableCell></TableRow><TableRow><TableCell>Medical</TableCell><TableCell align="right">{formatCurrency(record.medical_allowance)}</TableCell></TableRow><TableRow><TableCell>Conveyance</TableCell><TableCell align="right">{formatCurrency(record.conveyance_allowance)}</TableCell></TableRow><TableRow><TableCell>Arrears</TableCell><TableCell align="right">{formatCurrency(record.arrears)}</TableCell></TableRow></TableBody></Table>
                  </Paper></Grid>
                  <Grid item xs={12}><Paper variant="outlined">
                    <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(B) Benefits (Employer)</strong></Typography>
                    <Table size="small"><TableBody><TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(pfEmployer)}</TableCell></TableRow><TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(esicEmployer)}</TableCell></TableRow><TableRow><TableCell>Gratuity</TableCell><TableCell align="right">{formatCurrency(gratuity)}</TableCell></TableRow></TableBody></Table>
                  </Paper></Grid>
                  <Grid item xs={12}><Paper variant="outlined">
                    <Typography variant="subtitle2" sx={{ bgcolor: '#f3f4f6', p: 1 }}><strong>(C) Deductions (Employee)</strong></Typography>
                    <Table size="small"><TableBody><TableRow><TableCell>PF Contribution</TableCell><TableCell align="right">{formatCurrency(record.pf)}</TableCell></TableRow><TableRow><TableCell>ESIC Contribution</TableCell><TableCell align="right">{formatCurrency(record.esic)}</TableCell></TableRow><TableRow><TableCell>TDS</TableCell><TableCell align="right">{formatCurrency(record.tds)}</TableCell></TableRow><TableRow><TableCell>MLWF</TableCell><TableCell align="right">{formatCurrency(record.mlwf)}</TableCell></TableRow><TableRow><TableCell>Other Deduction</TableCell><TableCell align="right">{formatCurrency(record.other_deduction)}</TableCell></TableRow></TableBody></Table>
                  </Paper></Grid>
                  <Grid item xs={12}><Paper elevation={3} sx={{ mt: 2 }}>
                    <Table size="small"><TableBody><TableRow><TableCell>Total Earnings (A)</TableCell><TableCell align="right">{formatCurrency(record.total_earnings)}</TableCell></TableRow><TableRow><TableCell>Total Deductions (C)</TableCell><TableCell align="right">{formatCurrency(record.total_deduction)}</TableCell></TableRow><TableRow sx={{ borderTop: '2px solid #4caf50' }}><TableCell><Typography variant="h6" component="div">Net Pay (A - C)</Typography></TableCell><TableCell align="right"><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#4caf50' }}>{formatCurrency(record.net_pay)}</Typography></TableCell></TableRow></TableBody></Table>
                  </Paper></Grid>
                </Grid>
              );
            })()
          ) : <Typography>Could not find a matching salary structure.</Typography>}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: '#757575', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)'} }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payroll;