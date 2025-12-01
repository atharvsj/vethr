// // import React, { useState } from 'react';
// // import {
// //   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
// //   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, InputLabel, FormControl
// // } from '@mui/material';

// // const payslipData = [
// //   { id: 1, name: 'Surendra Burte', email: '---', netPayable: 18152, salaryMonth: 'April, 2024', payDate: 'April, 2024' },
// //   { id: 2, name: 'Snehal Bhandwalkar', email: 'snehal@vetrinahealthcare.com', netPayable: 63824, salaryMonth: 'April, 2024', payDate: 'April, 2024' },
// //   { id: 3, name: 'Snehal Bhandwalkar', email: 'snehal@vetrinahealthcare.com', netPayable: 63824, salaryMonth: 'May, 2024', payDate: 'May, 2024' },
// //   { id: 4, name: 'Nutan Pishantot', email: 'npishantot@gmail.com', netPayable: 31533, salaryMonth: 'April, 2024', payDate: 'April, 2024' },
// //   { id: 5, name: 'Nutan Pishantot', email: 'npishantot@gmail.com', netPayable: 31533, salaryMonth: 'June, 2024', payDate: 'June, 2024' },
// //   { id: 6, name: 'Kumar Patil', email: 'patilvetrina@gmail.com', netPayable: 86115, salaryMonth: 'April, 2024', payDate: 'April, 2024' },
// //   { id: 7, name: 'Abhishek Kamble', email: '---', netPayable: 10105, salaryMonth: 'February, 2024', payDate: 'February, 2024' },
// //   { id: 8, name: 'Abhilasha Gaikwad', email: 'abhilasha@vetrinahealthcare.com', netPayable: 102367, salaryMonth: 'April, 2024', payDate: 'April, 2024' },
// // ];

// // const PayslipHistory = () => {
// //   const [entriesPerPage, setEntriesPerPage] = useState(5);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
// //   const [page, setPage] = useState(1);
// //   const [hoveredEmployeeId, setHoveredEmployeeId] = useState(null);
// //   const handleSort = (key) => {
// //     setSortConfig((prevConfig) => ({
// //       key,
// //       direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
// //     }));
// //   };

// //   const sortedData = [...payslipData]
// //     .filter((item) =>
// //       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase())
// //     )
// //     .sort((a, b) => {
// //       if (!sortConfig.key) return 0;
// //       const aValue = a[sortConfig.key]?.toString().toLowerCase();
// //       const bValue = b[sortConfig.key]?.toString().toLowerCase();
// //       if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
// //       if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
// //       return 0;
// //     });

// //   const totalPages = Math.ceil(sortedData.length / entriesPerPage);

// //   const handleChangePage = (event, value) => {
// //     setPage(value);
// //   };

// //   const paginatedData = sortedData.slice((page - 1) * entriesPerPage, page * entriesPerPage);

// //   const getSortArrow = (columnKey) => {
// //     if (sortConfig.key !== columnKey) return <span style={{ fontSize: 12, color: '#9ca3af' }}>⇅</span>;
// //     return <span style={{ fontSize: 12, color: '#4b5563' }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
// //   };

// //   return (
// //     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
// //       <Typography variant="h6" mb={2}>Payslip History</Typography>

// //       {/* Controls */}
// //       <Grid container spacing={2} mb={2} justifyContent="space-between">
// //         <Grid item xs={12} sm={6} md={3}>
// //           <FormControl fullWidth size="small">
// //             <InputLabel>Show</InputLabel>
// //             <Select
// //               value={entriesPerPage}
// //               onChange={(e) => {
// //                 setEntriesPerPage(Number(e.target.value));
// //                 setPage(1); // Reset page when changing entries per page
// //               }}
// //               label="Show"
// //             >
// //               {[5, 10, 25, 50, 100].map((number) => (
// //                 <MenuItem key={number} value={number}>{number}</MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //         </Grid>

// //         <Grid item xs={12} sm={6} md={3}>
// //           <TextField
// //             fullWidth
// //             size="small"
// //             label="Search"
// //             value={searchQuery}
// //             onChange={(e) => {
// //               setSearchQuery(e.target.value);
// //               setPage(1); // Reset to page 1 when search
// //             }}
// //           />
// //         </Grid>

// //         <Grid item xs={12} sm={12} md={3} display="flex" alignItems="center">
// //           <Button
// //             variant="contained"
// //             sx={{ bgcolor: '#7C3AED', textTransform: 'none' }}
// //             fullWidth
// //           >
// //             Search
// //           </Button>
// //         </Grid>
// //       </Grid>

// //       {/* Table */}
// //       <TableContainer component={Paper}>
// //         <Table size="small">
// //           <TableHead sx={{ backgroundColor: '#f9fafb' }}>
// //             <TableRow>
// //               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
// //                 <Box display="flex" alignItems="center" gap={0.5}>
// //                   {getSortArrow('name')} Employee
// //                 </Box>
// //               </TableCell>

// //               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netPayable')}>
// //                 <Box display="flex" alignItems="center" gap={0.5}>
// //                   {getSortArrow('netPayable')} Net Payable
// //                 </Box>
// //               </TableCell>

// //               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('salaryMonth')}>
// //                 <Box display="flex" alignItems="center" gap={0.5}>
// //                   {getSortArrow('salaryMonth')} Salary Month
// //                 </Box>
// //               </TableCell>

// //               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payDate')}>
// //                 <Box display="flex" alignItems="center" gap={0.5}>
// //                   {getSortArrow('payDate')} Pay Date
// //                 </Box>
// //               </TableCell>
// //             </TableRow>
// //           </TableHead>

// //           <TableBody>
// //   {paginatedData.map((item) => (
// //     <TableRow key={item.id}>
// //       <TableCell
// //         onMouseEnter={() => setHoveredEmployeeId(item.id)}
// //         onMouseLeave={() => setHoveredEmployeeId(null)}
// //       >
// //         {hoveredEmployeeId === item.id ? (
// //           <Button
// //             size="small"
// //             variant="contained"
// //             sx={{
// //               textTransform: 'none',
// //               fontSize: '10px',
// //               padding: '2px 8px',
// //               backgroundColor: '#7C3AED',
// //               borderRadius: '12px',
// //               minWidth: 'auto',
// //             }}
// //           >
// //             View Payslip
// //           </Button>
// //         ) : (
// //           <Box display="flex" alignItems="center" gap={1}>
// //             <Avatar src="/user.png" sx={{ width: 30, height: 30 }} />
// //             <Box>
// //               <Typography variant="body2">{item.name}</Typography>
// //               {item.email !== '---' && (
// //                 <Typography variant="caption" color="text.secondary">{item.email}</Typography>
// //               )}
// //             </Box>
// //           </Box>
// //         )}
// //       </TableCell>

// //       <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>
// //         ₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
// //       </TableCell>

// //       <TableCell>{item.salaryMonth}</TableCell>

// //       <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>
// //         {item.payDate}
// //       </TableCell>
// //     </TableRow>
// //   ))}
// // </TableBody>

// //         </Table>
// //       </TableContainer>

// //       {/* Pagination */}
// //       <Box display="flex" justifyContent="flex-end" mt={2}>
// //         <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
// //           <Grid item>
// //             <Button
// //               variant="outlined"
// //               size="small"
// //               onClick={() => setPage(page - 1)}
// //               disabled={page === 1}
// //               sx={{
// //                 color: '#7C3AED',
// //                 borderColor: '#7C3AED',
// //                 '&:hover': {
// //                   backgroundColor: '#7C3AED',
// //                   borderColor: '#7C3AED',
// //                   color: 'white',
// //                 },
// //               }}
// //             >
// //               Previous
// //             </Button>
// //           </Grid>

// //           <Grid item>
// //             Page {page} of {Math.max(1, Math.ceil(sortedData.length / entriesPerPage))}
// //           </Grid>

// //           <Grid item>
// //             <Button
// //               variant="outlined"
// //               size="small"
// //               onClick={() => setPage(page + 1)}
// //               disabled={page >= Math.ceil(sortedData.length / entriesPerPage)}
// //               sx={{
// //                 color: '#7C3AED',
// //                 borderColor: '#7C3AED',
// //                 '&:hover': {
// //                   backgroundColor: '#7C3AED',
// //                   borderColor: '#7C3AED',
// //                   color: 'white',
// //                 },
// //               }}
// //             >
// //               Next
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default PayslipHistory;



// import React, { useState, useRef } from 'react';
// import {
//   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, InputLabel, FormControl,
//   Dialog, DialogActions, DialogContent, DialogTitle
// } from '@mui/material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // --- Augmented data with full payslip details ---
// const payslipData = [
//   { 
//     id: 1, name: 'Surendra Burte', email: '---', netPayable: 18152, salaryMonth: 'April, 2024', payDate: '30 April, 2024',
//     details: {
//       employeeId: 'V0123', department: 'Operations', dateOfJoining: '15/03/2022', designation: 'Field Executive',
//       location: 'Pune', payableDays: 30, bankName: 'HDFC Bank', bankAcNo: '12345678901', pfUan: '101234567890',
//       esicNo: '2012345678', panNo: 'FGHIJ5678K',
//       basic: 12000, hra: 4800, medical: 1250, conveyance: 1600,
//       pf: 1440, tds: 0, otherDeduction: 58, mlwf: 0, advance: 0,
//       totalEarnings: 19650, totalDeductions: 1498,
//     }
//   },
//   { 
//     id: 2, name: 'Snehal Bhandwalkar', email: 'snehal@vetrinahealthcare.com', netPayable: 63824, salaryMonth: 'April, 2024', payDate: '30 April, 2024',
//     details: {
//       employeeId: 'V0456', department: 'Sales', dateOfJoining: '10/01/2021', designation: 'Sales Manager',
//       location: 'Mumbai', payableDays: 30, bankName: 'ICICI Bank', bankAcNo: '23456789012', pfUan: '102345678901',
//       esicNo: '2023456789', panNo: 'GHIJK6789L',
//       basic: 40000, hra: 20000, medical: 1250, conveyance: 1600,
//       pf: 1800, tds: 5000, otherDeduction: 100, mlwf: 26, advance: 2000,
//       totalEarnings: 62850, totalDeductions: 8926, // Net payable is earnings - deductions
//     }
//   },
//   // Add more detailed employee data here...
// ];

// const PayslipHistory = () => {
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
//   const [page, setPage] = useState(1);
//   const [hoveredEmployeeId, setHoveredEmployeeId] = useState(null);

//   // --- State and Ref for Payslip Dialog ---
//   const [isPayslipOpen, setIsPayslipOpen] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const payslipRef = useRef();

//   // --- Handlers for Dialog and PDF ---
//   const handleOpenPayslip = (payslipRecord) => {
//     setSelectedPayslipRecord(payslipRecord);
//     setIsPayslipOpen(true);
//   };

//   const handleClosePayslip = () => {
//     setIsPayslipOpen(false);
//     setSelectedPayslipRecord(null);
//   };

//   const handleDownloadPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;

//     // Hide buttons during capture
//     const actions = input.querySelector('.payslip-actions');
//     if(actions) actions.style.display = 'none';

//     html2canvas(input, { scale: 2 }) // Use scale for better resolution
//       .then((canvas) => {
//         // Show buttons again after capture
//         if(actions) actions.style.display = 'flex';

//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const ratio = canvasWidth / canvasHeight;
//         let newWidth = pdfWidth;
//         let newHeight = newWidth / ratio;

//         if (newHeight > pdfHeight) {
//           newHeight = pdfHeight;
//           newWidth = newHeight * ratio;
//         }

//         const x = (pdfWidth - newWidth) / 2;
//         const y = 0;
        
//         pdf.addImage(imgData, 'PNG', x, y, newWidth, newHeight);
//         pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
//       });
//   };

//   const handleSort = (key) => {
//     setSortConfig((prevConfig) => ({
//       key,
//       direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
//     }));
//   };

//   const sortedData = [...payslipData]
//     .filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];
//       const valA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
//       const valB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
//       if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });

//   const paginatedData = sortedData.slice((page - 1) * entriesPerPage, page * entriesPerPage);

//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey) return <span style={{ fontSize: 12, color: '#9ca3af' }}>⇅</span>;
//     return <span style={{ fontSize: 12, color: '#4b5563' }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
//   };

//   return (
//     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
//       <Typography variant="h6" mb={2}>Payslip History</Typography>
      
//       {/* Controls */}
//       <Grid container spacing={2} mb={2} justifyContent="space-between">
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Show</InputLabel><Select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setPage(1); }} label="Show">{[5, 10, 25, 50, 100].map((number) => (<MenuItem key={number} value={number}>{number}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={3}><TextField fullWidth size="small" label="Search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} /></Grid>
//         <Grid item xs={12} sm={12} md={3} display="flex" alignItems="center"><Button variant="contained" sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>
//       </Grid>
      
//       {/* Table */}
//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//             <TableRow>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} Employee</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netPayable')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netPayable')} Net Payable</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('salaryMonth')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('salaryMonth')} Salary Month</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payDate')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payDate')} Pay Date</Box></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell onMouseEnter={() => setHoveredEmployeeId(item.id)} onMouseLeave={() => setHoveredEmployeeId(null)}>
//                   {hoveredEmployeeId === item.id ? (
//                     <Button onClick={() => handleOpenPayslip(item)} size="small" variant="contained" sx={{ textTransform: 'none', fontSize: '10px', padding: '2px 8px', backgroundColor: '#7C3AED', borderRadius: '12px', minWidth: 'auto' }}>View Payslip</Button>
//                   ) : (
//                     <Box display="flex" alignItems="center" gap={1}><Avatar src="/user.png" sx={{ width: 30, height: 30 }} /><Box><Typography variant="body2">{item.name}</Typography>{item.email !== '---' && (<Typography variant="caption" color="text.secondary">{item.email}</Typography>)}</Box></Box>
//                   )}
//                 </TableCell>
//                 <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
//                 <TableCell>{item.salaryMonth}</TableCell>
//                 <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>{item.payDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       {/* Pagination */}
//       <Box display="flex" justifyContent="flex-end" mt={2}>
//         <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 1} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Previous</Button></Grid>
//           <Grid item>Page {page} of {Math.max(1, Math.ceil(sortedData.length / entriesPerPage))}</Grid>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedData.length / entriesPerPage)} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Next</Button></Grid>
//         </Grid>
//       </Box>

//       {/* --- Payslip Dialog --- */}
//       <Dialog open={isPayslipOpen} onClose={handleClosePayslip} maxWidth="md" fullWidth>
//         <Box ref={payslipRef}>
//           <DialogTitle>Pay Slip - {selectedPayslipRecord?.name}</DialogTitle>
//           <DialogContent>
//             {selectedPayslipRecord && (
//               <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                 <Grid container spacing={2}><Grid item xs={6}><Typography variant="h6" gutterBottom>Vetrina Healthcare Pvt. Ltd.</Typography><Typography variant="body2">Pay Slip For Month: {selectedPayslipRecord.salaryMonth}</Typography></Grid><Grid item xs={6}><Typography variant="body2" align="right">Salary Payment Date: {selectedPayslipRecord.payDate}</Typography></Grid></Grid>
//                 <Grid container spacing={2} sx={{ mt: 2 }}><Grid item xs={6}><Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography><Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography><Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography><Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography><Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography><Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography><Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography></Grid><Grid item xs={6}><Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography><Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography><Typography variant="body2"><strong>PF UAN:</strong> {selectedPayslipRecord.details.pfUan}</Typography><Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography><Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography></Grid></Grid>
//                 <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.basic.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.pf.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.hra.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.tds.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.medical.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.otherDeduction.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.conveyance.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.mlwf.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">0.00</TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.advance.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Total</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Total</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</strong></TableCell></TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}><Typography variant="body2"><strong>Total Earnings:</strong> ₹{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</Typography><Typography variant="body2"><strong>Total Deductions:</strong> ₹{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</Typography><Typography variant="body2"><strong>Take Home:</strong> ₹{selectedPayslipRecord.netPayable.toFixed(2)}</Typography></Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punjai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
//               </Box>
//             )}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions">
//           <Button onClick={handleClosePayslip} sx={{ color: '#7C3AED' }}>Close</Button>
//           <Button variant="contained" onClick={handleDownloadPdf} sx={{ bgcolor: '#4f46e5' }}>Download PDF</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#7C3AED', borderColor: '#7C3AED' }}>Print</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default PayslipHistory;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, InputLabel, FormControl,
//   Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress
// } from '@mui/material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import axiosInstance from '../../utils/axiosInstance'; // Make sure this path is correct

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// // Helper to transform the detailed payslip API response
// const transformPayslipDetails = (apiDetail) => {
//   if (!apiDetail) return null;
  
//   const netPay = apiDetail.net_pay || 0;
//   const totalEarnings = apiDetail.total_earnings || 0;
//   const totalDeductions = apiDetail.total_deduction || 0;

//   return {
//     name: apiDetail.employee_name,
//     netPayable: netPay,
//     salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
//     payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//     details: {
//       employeeId: apiDetail.employee_id,
//       department: apiDetail.department_name,
//       dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//       designation: apiDetail.designation_name,
//       leaves: 'N/A', // New field with placeholder
//       location: apiDetail.location || 'N/A',
//       payableDays: apiDetail.payable_days,
//       bankName: apiDetail.bank_name || 'N/A',
//       bankAcNo: apiDetail.bank_account_number || 'N/A',
//       pfNo: apiDetail.pf_number || 'N/A', // Renamed from pfUan
//       uanNo: 'N/A', // New field with placeholder
//       esicNo: apiDetail.esic_number || 'N/A',
//       panNo: apiDetail.pan_number || 'N/A',
//       basic: apiDetail.basic_plus_da || 0,
//       hra: apiDetail.hra || 0,
//       medical: apiDetail.medical_allowance || 0,
//       conveyance: apiDetail.conveyance_allowance || 0,
//       arrears: apiDetail.arrears || 0,
//       pf: apiDetail.pf || 0,
//       esic: apiDetail.esic || 0, // Added ESIC from API
//       tds: apiDetail.tds || 0,
//       otherDeduction: apiDetail.other_deduction || 0,
//       mlwf: apiDetail.mlwf || 0,
//       advance: 0, // Not in API response, default to 0
//       totalEarnings: totalEarnings,
//       totalDeductions: totalDeductions,
//     }
//   };
// };

// const PayslipHistory = () => {
//   const [payslipHistory, setPayslipHistory] = useState([]);
//   const [tableLoading, setTableLoading] = useState(true);
//   const [dialogLoading, setDialogLoading] = useState(false);
  
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
//   const [page, setPage] = useState(1);
//   const [hoveredEmployeeId, setHoveredEmployeeId] = useState(null);

//   const [isPayslipOpen, setIsPayslipOpen] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const payslipRef = useRef();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setTableLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payslip_history/');
//         if (response.data.status === 'success' && Array.isArray(response.data.data)) {
//           const transformedData = response.data.data.map(item => ({
//             id: item.payroll_report_id,
//             payroll_report_id: item.payroll_report_id,
//             name: item.employee_name,
//             netPayable: item.net_pay,
//             salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
//             payDate: new Date(item.pay_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//           }));
//           setPayslipHistory(transformedData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch payslip history:", error);
//         setPayslipHistory([]);
//       } finally {
//         setTableLoading(false);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleOpenPayslip = async (payslipRecord) => {
//     setIsPayslipOpen(true);
//     setDialogLoading(true);
//     setSelectedPayslipRecord(null);
//     try {
//       const response = await axiosInstance.post('/api/payslip/', {
//         payroll_report_id: String(payslipRecord.payroll_report_id)
//       });
//       if (response.data.status === 'success' && response.data.data.length > 0) {
//         const transformedDetails = transformPayslipDetails(response.data.data[0]);
//         setSelectedPayslipRecord(transformedDetails);
//       }
//     } catch (error) {
//       console.error("Failed to fetch payslip details:", error);
//     } finally {
//       setDialogLoading(false);
//     }
//   };

//   const handleClosePayslip = () => { setIsPayslipOpen(false); setSelectedPayslipRecord(null); };

//   const handleDownloadPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;
//     const actions = input.querySelector('.payslip-actions');
//     if(actions) actions.style.display = 'none';
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       if(actions) actions.style.display = 'flex';
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       let newWidth = pdfWidth; let newHeight = newWidth / ratio;
//       if (newHeight > pdfHeight) { newHeight = pdfHeight; newWidth = newHeight * ratio; }
//       const x = (pdfWidth - newWidth) / 2;
//       pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight);
//       pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
//     });
//   };

//   const handleSort = (key) => setSortConfig((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const sortedData = [...payslipHistory]
//     .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase()))
//     .sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       const aValue = a[sortConfig.key]; const bValue = b[sortConfig.key];
//       const valA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
//       const valB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
//       if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });

//   const paginatedData = sortedData.slice((page - 1) * entriesPerPage, page * entriesPerPage);

//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey) return <span style={{ fontSize: 12, color: '#9ca3af' }}>⇅</span>;
//     return <span style={{ fontSize: 12, color: '#4b5563' }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
//   };

//   return (
//     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
//       <Typography variant="h6" mb={2}>Payslip History</Typography>
//       <Grid container spacing={2} mb={2} justifyContent="space-between">
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Show</InputLabel><Select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setPage(1); }} label="Show">{[5, 10, 25, 50, 100].map((number) => (<MenuItem key={number} value={number}>{number}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={3}><TextField fullWidth size="small" label="Search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} /></Grid>
//         <Grid item xs={12} sm={12} md={3} display="flex" alignItems="center"><Button variant="contained" sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>
//       </Grid>
//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//             <TableRow>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} Employee</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netPayable')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netPayable')} Net Payable</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('salaryMonth')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('salaryMonth')} Salary Month</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payDate')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payDate')} Pay Date</Box></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableLoading ? (
//               <TableRow><TableCell colSpan={4} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell onMouseEnter={() => setHoveredEmployeeId(item.id)} onMouseLeave={() => setHoveredEmployeeId(null)}>
//                     {hoveredEmployeeId === item.id ? (
//                       <Button onClick={() => handleOpenPayslip(item)} size="small" variant="contained" sx={{ textTransform: 'none', fontSize: '10px', padding: '2px 8px', backgroundColor: '#7C3AED', borderRadius: '12px', minWidth: 'auto' }}>View Payslip</Button>
//                     ) : (
//                       <Box display="flex" alignItems="center" gap={1}><Avatar src="/user.png" sx={{ width: 30, height: 30 }} /><Box><Typography variant="body2">{item.name}</Typography>{item.email !== '---' && (<Typography variant="caption" color="text.secondary">{item.email}</Typography>)}</Box></Box>
//                     )}
//                   </TableCell>
//                   <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
//                   <TableCell>{item.salaryMonth}</TableCell>
//                   <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>{item.payDate}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={4} align="center">No payslip history found.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box display="flex" justifyContent="flex-end" mt={2}>
//         <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 1} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Previous</Button></Grid>
//           <Grid item>Page {page} of {Math.max(1, Math.ceil(sortedData.length / entriesPerPage))}</Grid>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedData.length / entriesPerPage)} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Next</Button></Grid>
//         </Grid>
//       </Box>

//       <Dialog open={isPayslipOpen} onClose={handleClosePayslip} maxWidth="md" fullWidth>
//         <Box ref={payslipRef}>
//           <DialogTitle>Pay Slip - {selectedPayslipRecord?.name}</DialogTitle>
//           <DialogContent>
//             {dialogLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}><CircularProgress /></Box>
//             ) : selectedPayslipRecord ? (
//               <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                 <Grid container spacing={2}><Grid item xs={6}><Typography variant="h6" gutterBottom>Vetrina Healthcare Pvt. Ltd.</Typography><Typography variant="body2">Pay Slip For Month: {selectedPayslipRecord.salaryMonth}</Typography></Grid><Grid item xs={6}><Typography variant="body2" align="right">Salary Payment Date: {selectedPayslipRecord.payDate}</Typography></Grid></Grid>
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography>
//                     <Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography>
//                     <Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography>
//                     <Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography>
//                     <Typography variant="body2"><strong>Leaves:</strong> {selectedPayslipRecord.details.leaves}</Typography>
//                     <Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography>
//                     <Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography>
//                     <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography>
//                     <Typography variant="body2"><strong>PF No:</strong> {selectedPayslipRecord.details.pfNo}</Typography>
//                     <Typography variant="body2"><strong>UAN No:</strong> {selectedPayslipRecord.details.uanNo}</Typography>
//                     <Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography>
//                     <Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography>
//                   </Grid>
//                 </Grid>
//                 <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.basic.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.pf.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.hra.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.esic.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.medical.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.tds.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.conveyance.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.otherDeduction.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.arrears.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.mlwf.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.advance.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</TableCell></TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}><Typography variant="body2"><strong>Total Earnings:</strong> ₹{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</Typography><Typography variant="body2"><strong>Total Deductions:</strong> ₹{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</Typography><Typography variant="body2"><strong>Take Home:</strong> ₹{selectedPayslipRecord.netPayable.toFixed(2)}</Typography></Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
//               </Box>
//             ) : <Typography>Could not load payslip details.</Typography>}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions">
//           <Button onClick={handleClosePayslip} sx={{ color: '#7C3AED' }}>Close</Button>
//           <Button variant="contained" onClick={handleDownloadPdf} sx={{ bgcolor: '#4f46e5' }} disabled={dialogLoading || !selectedPayslipRecord}>Download PDF</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#7C3AED', borderColor: '#7C3AED' }} disabled={dialogLoading || !selectedPayslipRecord}>Print</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default PayslipHistory;
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, InputLabel, FormControl,
//   Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress
// } from '@mui/material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import axiosInstance from '../../utils/axiosInstance'; // Make sure this path is correct

// // IMPORTANT: Adjust this path to correctly point to your logo file from this component's directory.
// import vetrinaLogo from '../../viewsSuperAdmin/vetrinalogo.png'; 

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// // Helper to transform the detailed payslip API response
// const transformPayslipDetails = (apiDetail) => {
//   if (!apiDetail) return null;
  
//   const netPay = apiDetail.net_pay || 0;
//   const totalEarnings = apiDetail.total_earnings || 0;
//   const totalDeductions = apiDetail.total_deduction || 0;

//   return {
//     name: apiDetail.employee_name,
//     netPayable: netPay,
//     salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
//     payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//     details: {
//       employeeId: apiDetail.employee_id,
//       department: apiDetail.department_name,
//       dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//       designation: apiDetail.designation_name,
//       leaves: 'N/A', 
//       location: apiDetail.location || 'N/A',
//       payableDays: apiDetail.payable_days,
//       bankName: apiDetail.bank_name || 'N/A',
//       bankAcNo: apiDetail.bank_account_number || 'N/A',
//       pfNo: apiDetail.pf_number || 'N/A', 
//       uanNo: 'N/A', 
//       esicNo: apiDetail.esic_number || 'N/A',
//       panNo: apiDetail.pan_number || 'N/A',
//       basic: apiDetail.basic_plus_da || 0,
//       hra: apiDetail.hra || 0,
//       medical: apiDetail.medical_allowance || 0,
//       conveyance: apiDetail.conveyance_allowance || 0,
//       arrears: apiDetail.arrears || 0,
//       pf: apiDetail.pf || 0,
//       esic: apiDetail.esic || 0, 
//       tds: apiDetail.tds || 0,
//       otherDeduction: apiDetail.other_deduction || 0,
//       mlwf: apiDetail.mlwf || 0,
//       advance: 0, 
//       totalEarnings: totalEarnings,
//       totalDeductions: totalDeductions,
//     }
//   };
// };

// const PayslipHistory = () => {
//   const [payslipHistory, setPayslipHistory] = useState([]);
//   const [tableLoading, setTableLoading] = useState(true);
//   const [dialogLoading, setDialogLoading] = useState(false);
  
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
//   const [page, setPage] = useState(1);
//   const [hoveredEmployeeId, setHoveredEmployeeId] = useState(null);

//   const [isPayslipOpen, setIsPayslipOpen] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const payslipRef = useRef();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setTableLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payslip_history/');
//         if (response.data.status === 'success' && Array.isArray(response.data.data)) {
//           const transformedData = response.data.data.map(item => ({
//             id: item.payroll_report_id,
//             payroll_report_id: item.payroll_report_id,
//             name: item.employee_name,
//             netPayable: item.net_pay,
//             salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
//             payDate: new Date(item.pay_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//           }));
//           setPayslipHistory(transformedData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch payslip history:", error);
//         setPayslipHistory([]);
//       } finally {
//         setTableLoading(false);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleOpenPayslip = async (payslipRecord) => {
//     setIsPayslipOpen(true);
//     setDialogLoading(true);
//     setSelectedPayslipRecord(null);
//     try {
//       const response = await axiosInstance.post('/api/payslip/', {
//         payroll_report_id: String(payslipRecord.payroll_report_id)
//       });
//       if (response.data.status === 'success' && response.data.data.length > 0) {
//         const transformedDetails = transformPayslipDetails(response.data.data[0]);
//         setSelectedPayslipRecord(transformedDetails);
//       }
//     } catch (error) {
//       console.error("Failed to fetch payslip details:", error);
//     } finally {
//       setDialogLoading(false);
//     }
//   };

//   const handleClosePayslip = () => { setIsPayslipOpen(false); setSelectedPayslipRecord(null); };

//   const handleDownloadPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;
//     const actions = input.querySelector('.payslip-actions');
//     if(actions) actions.style.display = 'none';
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       if(actions) actions.style.display = 'flex';
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       let newWidth = pdfWidth; let newHeight = newWidth / ratio;
//       if (newHeight > pdfHeight) { newHeight = pdfHeight; newWidth = newHeight * ratio; }
//       const x = (pdfWidth - newWidth) / 2;
//       pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight);
//       pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
//     });
//   };

//   const handleSort = (key) => setSortConfig((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const sortedData = [...payslipHistory]
//     .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase()))
//     .sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       const aValue = a[sortConfig.key]; const bValue = b[sortConfig.key];
//       const valA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
//       const valB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
//       if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });

//   const paginatedData = sortedData.slice((page - 1) * entriesPerPage, page * entriesPerPage);

//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey) return <span style={{ fontSize: 12, color: '#9ca3af' }}>⇅</span>;
//     return <span style={{ fontSize: 12, color: '#4b5563' }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
//   };

//   return (
//     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
//       <Typography variant="h6" mb={2}>Payslip History</Typography>
//       <Grid container spacing={2} mb={2} justifyContent="space-between">
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Show</InputLabel><Select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setPage(1); }} label="Show">{[5, 10, 25, 50, 100].map((number) => (<MenuItem key={number} value={number}>{number}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={3}><TextField fullWidth size="small" label="Search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} /></Grid>
//         <Grid item xs={12} sm={12} md={3} display="flex" alignItems="center"><Button variant="contained" sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>
//       </Grid>
//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//             <TableRow>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} Employee</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netPayable')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netPayable')} Net Payable</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('salaryMonth')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('salaryMonth')} Salary Month</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payDate')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payDate')} Pay Date</Box></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableLoading ? (
//               <TableRow><TableCell colSpan={4} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell onMouseEnter={() => setHoveredEmployeeId(item.id)} onMouseLeave={() => setHoveredEmployeeId(null)}>
//                     {hoveredEmployeeId === item.id ? (
//                       <Button onClick={() => handleOpenPayslip(item)} size="small" variant="contained" sx={{ textTransform: 'none', fontSize: '10px', padding: '2px 8px', backgroundColor: '#7C3AED', borderRadius: '12px', minWidth: 'auto' }}>View Payslip</Button>
//                     ) : (
//                       <Box display="flex" alignItems="center" gap={1}><Avatar src="/user.png" sx={{ width: 30, height: 30 }} /><Box><Typography variant="body2">{item.name}</Typography>{item.email !== '---' && (<Typography variant="caption" color="text.secondary">{item.email}</Typography>)}</Box></Box>
//                     )}
//                   </TableCell>
//                   <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
//                   <TableCell>{item.salaryMonth}</TableCell>
//                   <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>{item.payDate}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={4} align="center">No payslip history found.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box display="flex" justifyContent="flex-end" mt={2}>
//         <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 1} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Previous</Button></Grid>
//           <Grid item>Page {page} of {Math.max(1, Math.ceil(sortedData.length / entriesPerPage))}</Grid>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedData.length / entriesPerPage)} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Next</Button></Grid>
//         </Grid>
//       </Box>

//       <Dialog open={isPayslipOpen} onClose={handleClosePayslip} maxWidth="md" fullWidth>
//         <Box ref={payslipRef}>
//           <DialogTitle>Pay Slip</DialogTitle>
//           <DialogContent>
//             {dialogLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}><CircularProgress /></Box>
//             ) : selectedPayslipRecord ? (
//               <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                 {/* --- MODIFIED HEADER --- */}
//                 <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//                   {/* Left Side: Logo */}
//                   <Grid item xs={4}>
//                     <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: '140px', height: 'auto' }} />
//                   </Grid>
//                   {/* Right Side: Company Details and Dates, Aligned to the Right */}
//                   <Grid item xs={8} sx={{ textAlign: 'right' }}>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
//                       Vetrina Healthcare Pvt. Ltd.
//                     </Typography>
//                     <Typography variant="body2">
//                       Pay Slip For Month: {selectedPayslipRecord.salaryMonth}
//                     </Typography>
//                     <Typography variant="body2">
//                       Salary Payment Date: {selectedPayslipRecord.payDate}
//                     </Typography>
//                   </Grid>
//                 </Grid>

//                 {/* --- REST OF THE PAYSLIP (Unchanged) --- */}
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography>
//                     <Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography>
//                     <Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography>
//                     <Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography>
//                     <Typography variant="body2"><strong>Leaves:</strong> {selectedPayslipRecord.details.leaves}</Typography>
//                     <Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography>
//                     <Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography>
//                     <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography>
//                     <Typography variant="body2"><strong>PF No:</strong> {selectedPayslipRecord.details.pfNo}</Typography>
//                     <Typography variant="body2"><strong>UAN No:</strong> {selectedPayslipRecord.details.uanNo}</Typography>
//                     <Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography>
//                     <Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography>
//                   </Grid>
//                 </Grid>
//                 <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.basic.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.pf.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.hra.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.esic.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.medical.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.tds.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.conveyance.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.otherDeduction.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.arrears.toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.mlwf.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{selectedPayslipRecord.details.advance.toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</TableCell></TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}><Typography variant="body2"><strong>Total Earnings:</strong> ₹{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</Typography><Typography variant="body2"><strong>Total Deductions:</strong> ₹{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</Typography><Typography variant="body2"><strong>Take Home:</strong> ₹{selectedPayslipRecord.netPayable.toFixed(2)}</Typography></Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
//               </Box>
//             ) : <Typography>Could not load payslip details.</Typography>}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions">
//           <Button onClick={handleClosePayslip} sx={{ color: '#7C3AED' }}>Close</Button>
//           <Button variant="contained" onClick={handleDownloadPdf} sx={{ bgcolor: '#4f46e5' }} disabled={dialogLoading || !selectedPayslipRecord}>Download PDF</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#7C3AED', borderColor: '#7C3AED' }} disabled={dialogLoading || !selectedPayslipRecord}>Print</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default PayslipHistory;













// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Container, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, MenuItem, Typography, Avatar, Select, InputLabel, FormControl,
//   Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress
// } from '@mui/material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import axiosInstance from '../../utils/axiosInstance'; // Make sure this path is correct

// // IMPORTANT: Adjust this path to correctly point to your logo file from this component's directory.
// import vetrinaLogo from '../../viewsSuperAdmin/vetrinalogo.png';

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// // Helper to transform the detailed payslip API response
// const transformPayslipDetails = (apiDetail) => {
//   if (!apiDetail) return null;
  
//   const netPay = apiDetail.net_pay || 0;
//   const totalEarnings = apiDetail.total_earnings || 0;
//   const totalDeductions = apiDetail.total_deduction || 0;

//   return {
//     name: apiDetail.employee_name,
//     netPayable: netPay,
//     salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
//     payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//     details: {
//       employeeId: apiDetail.employee_id,
//       department: apiDetail.department_name,
//       dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//       designation: apiDetail.designation_name,
//       leaves: 'N/A', 
//       location: apiDetail.location || 'N/A',
//       payableDays: apiDetail.payable_days,
//       bankName: apiDetail.bank_name || 'N/A',
//       bankAcNo: apiDetail.bank_account_number || 'N/A',
//       pfNo: apiDetail.pf_number || 'N/A', 
//       uanNo: 'N/A', 
//       esicNo: apiDetail.esic_number || 'N/A',
//       panNo: apiDetail.pan_number || 'N/A',
//       basic: apiDetail.basic_plus_da || 0,
//       hra: apiDetail.hra || 0,
//       medical: apiDetail.medical_allowance || 0,
//       conveyance: apiDetail.conveyance_allowance || 0,
//       arrears: apiDetail.arrears || 0,
//       pf: apiDetail.pf || 0,
//       esic: apiDetail.esic || 0, 
//       pt: apiDetail.pt || 0,
//       tds: apiDetail.tds || 0,
//       otherDeduction: apiDetail.other_deduction || 0,
//       mlwf: apiDetail.mlwf || 0,
//       advance: 0, 
//       totalEarnings: totalEarnings,
//       totalDeductions: totalDeductions,
//     }
//   };
// };

// const PayslipHistory = () => {
//   const [payslipHistory, setPayslipHistory] = useState([]);
//   const [tableLoading, setTableLoading] = useState(true);
//   const [dialogLoading, setDialogLoading] = useState(false);
  
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
//   const [page, setPage] = useState(1);
//   const [hoveredEmployeeId, setHoveredEmployeeId] = useState(null);

//   const [isPayslipOpen, setIsPayslipOpen] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const payslipRef = useRef();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setTableLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payslip_history/');
//         if (response.data.status === 'success' && Array.isArray(response.data.data)) {
//           const transformedData = response.data.data.map(item => ({
//             id: item.payroll_report_id,
//             payroll_report_id: item.payroll_report_id,
//             name: item.employee_name,
//             netPayable: item.net_pay,
//             salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
//             payDate: new Date(item.pay_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//           }));
//           setPayslipHistory(transformedData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch payslip history:", error);
//         setPayslipHistory([]);
//       } finally {
//         setTableLoading(false);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleOpenPayslip = async (payslipRecord) => {
//     setIsPayslipOpen(true);
//     setDialogLoading(true);
//     setSelectedPayslipRecord(null); // Clear previous record
//     try {
//       const response = await axiosInstance.post('/api/payslip/', {
//         payroll_report_id: String(payslipRecord.payroll_report_id)
//       });
//       if (response.data.status === 'success' && response.data.data.length > 0) {
//         const transformedDetails = transformPayslipDetails(response.data.data[0]);
//         setSelectedPayslipRecord(transformedDetails);
//       }
//     } catch (error) {
//       console.error("Failed to fetch payslip details:", error);
//     } finally {
//       setDialogLoading(false);
//     }
//   };

//   const handleClosePayslip = () => { setIsPayslipOpen(false); setSelectedPayslipRecord(null); };

//   const handleDownloadPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;
//     const actions = input.querySelector('.payslip-actions');
//     if(actions) actions.style.display = 'none';
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       if(actions) actions.style.display = 'flex';
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       let newWidth = pdfWidth; let newHeight = newWidth / ratio;
//       if (newHeight > pdfHeight) { newHeight = pdfHeight; newWidth = newHeight * ratio; }
//       const x = (pdfWidth - newWidth) / 2;
//       pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight);
//       pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
//     });
//   };

//   const handleSort = (key) => setSortConfig((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));

//   const sortedData = [...payslipHistory]
//     .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase()))
//     .sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       const aValue = a[sortConfig.key]; const bValue = b[sortConfig.key];
//       const valA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
//       const valB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;
//       if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });

//   const paginatedData = sortedData.slice((page - 1) * entriesPerPage, page * entriesPerPage);

//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey) return <span style={{ fontSize: 12, color: '#9ca3af' }}>⇅</span>;
//     return <span style={{ fontSize: 12, color: '#4b5563' }}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
//   };

//   return (
//     <Container sx={{ backgroundColor: '#fff', p: 3, borderRadius: 3, boxShadow: 2 }}>
//       <Typography variant="h6" mb={2}>Payslip History</Typography>
//       <Grid container spacing={2} mb={2} justifyContent="space-between">
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Show</InputLabel><Select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setPage(1); }} label="Show">{[5, 10, 25, 50, 100].map((number) => (<MenuItem key={number} value={number}>{number}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={3}><TextField fullWidth size="small" label="Search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }} /></Grid>
//         <Grid item xs={12} sm={12} md={3} display="flex" alignItems="center"><Button variant="contained" sx={{ bgcolor: '#7C3AED', textTransform: 'none' }} fullWidth>Search</Button></Grid>
//       </Grid>
//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//             <TableRow>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('name')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('name')} Employee</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('netPayable')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('netPayable')} Net Payable</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('salaryMonth')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('salaryMonth')} Salary Month</Box></TableCell>
//               <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleSort('payDate')}><Box display="flex" alignItems="center" gap={0.5}>{getSortArrow('payDate')} Pay Date</Box></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableLoading ? (
//               <TableRow><TableCell colSpan={4} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell onMouseEnter={() => setHoveredEmployeeId(item.id)} onMouseLeave={() => setHoveredEmployeeId(null)}>
//                     {hoveredEmployeeId === item.id ? (
//                       <Button onClick={() => handleOpenPayslip(item)} size="small" variant="contained" sx={{ textTransform: 'none', fontSize: '10px', padding: '2px 8px', backgroundColor: '#7C3AED', borderRadius: '12px', minWidth: 'auto' }}>View Payslip</Button>
//                     ) : (
//                       <Box display="flex" alignItems="center" gap={1}><Avatar src="/user.png" sx={{ width: 30, height: 30 }} /><Box><Typography variant="body2">{item.name}</Typography></Box></Box>
//                     )}
//                   </TableCell>
//                   <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
//                   <TableCell>{item.salaryMonth}</TableCell>
//                   <TableCell sx={{ color: '#7C3AED', fontWeight: 600 }}>{item.payDate}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={4} align="center">No payslip history found.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box display="flex" justifyContent="flex-end" mt={2}>
//         <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page - 1)} disabled={page === 1} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Previous</Button></Grid>
//           <Grid item>Page {page} of {Math.max(1, Math.ceil(sortedData.length / entriesPerPage))}</Grid>
//           <Grid item><Button variant="outlined" size="small" onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(sortedData.length / entriesPerPage)} sx={{ color: '#7C3AED', borderColor: '#7C3AED', '&:hover': { backgroundColor: '#7C3AED', borderColor: '#7C3AED', color: 'white' } }}>Next</Button></Grid>
//         </Grid>
//       </Box>

//       <Dialog open={isPayslipOpen} onClose={handleClosePayslip} maxWidth="md" fullWidth>
//         <Box ref={payslipRef}>
//           <DialogTitle>Pay Slip</DialogTitle>
//           <DialogContent>
//             {dialogLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}><CircularProgress /></Box>
//             ) : selectedPayslipRecord ? (
//               <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                 <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//                   <Grid item xs={4}>
//                     <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: '140px', height: 'auto' }} />
//                   </Grid>
//                   <Grid item xs={8} sx={{ textAlign: 'right' }}>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
//                       Vetrina Healthcare Pvt. Ltd.
//                     </Typography>
//                     <Typography variant="body2">
//                       Pay Slip For Month: {selectedPayslipRecord.salaryMonth}
//                     </Typography>
//                     <Typography variant="body2">
//                       Salary Payment Date: {selectedPayslipRecord.payDate}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography>
//                     <Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography>
//                     <Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography>
//                     <Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography>
//                     <Typography variant="body2"><strong>Leaves:</strong> {selectedPayslipRecord.details.leaves}</Typography>
//                     <Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography>
//                     <Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography>
//                     <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography>
//                     <Typography variant="body2"><strong>PF No:</strong> {selectedPayslipRecord.details.pfNo}</Typography>
//                     <Typography variant="body2"><strong>UAN No:</strong> {selectedPayslipRecord.details.uanNo}</Typography>
//                     <Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography>
//                     <Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography>
//                   </Grid>
//                 </Grid>
//                <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//   <Table size="small">
//     <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
//     <TableBody>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic + DA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.basic ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pf ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.hra ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.esic ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.medical ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PT</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pt ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.conveyance ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.tds ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.arrears ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.otherDeduction ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.mlwf ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.advance ?? 0).toFixed(2)}</TableCell></TableRow>
//         <TableRow><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</TableCell></TableRow>
//     </TableBody>
//   </Table>
// </TableContainer>

// {/* --- ADDED REMARK SECTION --- */}
// <Box sx={{ mt: 1, px: 1 }}>
//   <Typography variant="body2">
//     <strong>Remark:</strong> NA
//   </Typography>
// </Box>

// <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//     <Typography variant="body2"><strong>Total Earnings:</strong> ₹{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</Typography>
//     <Typography variant="body2"><strong>Total Deductions:</strong> ₹{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</Typography>
//     <Typography variant="body2"><strong>Take Home:</strong> ₹{(selectedPayslipRecord?.netPayable ?? 0).toFixed(2)}</Typography>
// </Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
//               </Box>
//             ) : <Typography>Could not load payslip details.</Typography>}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions">
//           <Button onClick={handleClosePayslip} sx={{ color: '#7C3AED' }}>Close</Button>
//           <Button variant="contained" onClick={handleDownloadPdf} sx={{ bgcolor: '#4f46e5' }} disabled={dialogLoading || !selectedPayslipRecord}>Download PDF</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#7C3AED', borderColor: '#7C3AED' }} disabled={dialogLoading || !selectedPayslipRecord}>Print</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default PayslipHistory;













// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
//   CircularProgress, TablePagination, Skeleton, IconButton, InputAdornment, useTheme, 
//   useMediaQuery, Grid // Fixed: Added Grid to the import list
// } from '@mui/material';
// import { Search as SearchIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance'; // Make sure this path is correct

// // IMPORTANT: Adjust this path to correctly point to your logo file from this component's directory.
// import vetrinaLogo from '../../viewsSuperAdmin/vetrinalogo.png';

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// // Helper to transform the detailed payslip API response (no changes needed here)
// const transformPayslipDetails = (apiDetail) => {
//   if (!apiDetail) return null;
//   const netPay = apiDetail.net_pay || 0;
//   const totalEarnings = apiDetail.total_earnings || 0;
//   const totalDeductions = apiDetail.total_deduction || 0;

//   return {
//     name: apiDetail.employee_name,
//     netPayable: netPay,
//     salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
//     payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//     details: {
//       employeeId: apiDetail.employee_id,
//       department: apiDetail.department_name,
//       dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//       designation: apiDetail.designation_name,
//       leaves: 'N/A', 
//       location: apiDetail.location || 'N/A',
//       payableDays: apiDetail.payable_days,
//       bankName: apiDetail.bank_name || 'N/A',
//       bankAcNo: apiDetail.bank_account_number || 'N/A',
//       pfNo: apiDetail.pf_number || 'N/A', 
//       uanNo: 'N/A', 
//       esicNo: apiDetail.esic_number || 'N/A',
//       panNo: apiDetail.pan_number || 'N/A',
//       basic: apiDetail.basic_plus_da || 0,
//       hra: apiDetail.hra || 0,
//       medical: apiDetail.medical_allowance || 0,
//       conveyance: apiDetail.conveyance_allowance || 0,
//       arrears: apiDetail.arrears || 0,
//       pf: apiDetail.pf || 0,
//       esic: apiDetail.esic || 0, 
//       pt: apiDetail.pt || 0,
//       tds: apiDetail.tds || 0,
//       otherDeduction: apiDetail.other_deduction || 0,
//       mlwf: apiDetail.mlwf || 0,
//       advance: 0, 
//       totalEarnings: totalEarnings,
//       totalDeductions: totalDeductions,
//     }
//   };
// };

// const PayslipHistory = () => {
//   const [payslipHistory, setPayslipHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dialogLoading, setDialogLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isPayslipOpen, setIsPayslipOpen] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const payslipRef = useRef();

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payslip_history/');
//         if (response.data.status === 'success' && Array.isArray(response.data.data)) {
//           const transformedData = response.data.data.map(item => ({
//             id: item.payroll_report_id,
//             payroll_report_id: item.payroll_report_id,
//             name: item.employee_name,
//             netPayable: item.net_pay,
//             salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
//             payDate: new Date(item.pay_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//           }));
//           setPayslipHistory(transformedData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch payslip history:", error);
//         setPayslipHistory([]);
//         Swal.fire({
//             icon: 'error',
//             title: 'Fetch Error',
//             text: 'Could not fetch payslip history. Please try again later.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleOpenPayslip = async (payslipRecord) => {
//     setIsPayslipOpen(true);
//     setDialogLoading(true);
//     setSelectedPayslipRecord(null);
//     try {
//       const response = await axiosInstance.post('/api/payslip/', {
//         payroll_report_id: String(payslipRecord.payroll_report_id)
//       });
//       if (response.data.status === 'success' && response.data.data.length > 0) {
//         const transformedDetails = transformPayslipDetails(response.data.data[0]);
//         setSelectedPayslipRecord(transformedDetails);
//       } else {
//         throw new Error('No payslip data found');
//       }
//     } catch (error) {
//       console.error("Failed to fetch payslip details:", error);
//       handleClosePayslip();
//       Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Could not load payslip details.',
//           timer: 3000,
//           showConfirmButton: false,
//       });
//     } finally {
//       setDialogLoading(false);
//     }
//   };

//   const handleClosePayslip = () => { setIsPayslipOpen(false); setSelectedPayslipRecord(null); };

//   const handleDownloadPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;
//     const actions = input.querySelector('.payslip-actions-buttons');
//     if(actions) actions.style.display = 'none';
    
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       if(actions) actions.style.display = 'flex';
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       let newWidth = pdfWidth; let newHeight = newWidth / ratio;
//       if (newHeight > pdfHeight) { newHeight = pdfHeight; newWidth = newHeight * ratio; }
//       const x = (pdfWidth - newWidth) / 2;
//       pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight);
//       pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
//     });
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = payslipHistory.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.salaryMonth.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold' }} mb={2}>
//         Payslip History 
//       </Typography>

//       <Box display="flex" justifyContent="flex-end" mb={2}>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? '100%' : 'auto' }}
//         />
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               {/* Added Sr No. column header */}
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '5%' }}>SR NO.</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMPLOYEE</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NET PAYABLE</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SALARY MONTH</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PAY DATE</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   {/* Added Skeleton for Sr No. */}
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={40} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((item, index) => (
//                 <TableRow key={item.id} hover>
//                   {/* Added cell with calculated Sr No. */}
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{item.name}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#8C257C' }}>₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{item.salaryMonth}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{item.payDate}</TableCell>
//                   <TableCell align="center">
//                      <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton onClick={() => handleOpenPayslip(item)} size="small" sx={{ color: '#8C257C' }}>
//                             <VisibilityIcon />
//                         </IconButton>
//                      </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               // Updated colSpan to 6
//               <TableRow><TableCell colSpan={6} align="center">No payslip history found.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       <Box
//         sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: isMobile ? 'column' : 'row',
//             gap: 2,
//             mt: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             '& .MuiSvgIcon-root': { color: '#8C257C' },
//             '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                 color: 'text.secondary',
//             },
//           }}
//         />
//       </Box>

//       <Dialog open={isPayslipOpen} onClose={handleClosePayslip} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Pay Slip</DialogTitle>
//         <Box ref={payslipRef}>
//           <DialogContent>
//             {dialogLoading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}><CircularProgress sx={{color: '#8C257C'}}/></Box>
//             ) : selectedPayslipRecord ? (
//                 <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                     <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//                     <Grid item xs={4}>
//                         <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: '140px', height: 'auto' }} />
//                     </Grid>
//                     <Grid item xs={8} sx={{ textAlign: 'right' }}>
//                         <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
//                         Vetrina Healthcare Pvt. Ltd.
//                         </Typography>
//                         <Typography variant="body2">Pay Slip For Month: {selectedPayslipRecord.salaryMonth}</Typography>
//                         <Typography variant="body2">Salary Payment Date: {selectedPayslipRecord.payDate}</Typography>
//                     </Grid>
//                     </Grid>
//                     <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography>
//                     <Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography>
//                     <Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography>
//                     <Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography>
//                     <Typography variant="body2"><strong>Leaves:</strong> {selectedPayslipRecord.details.leaves}</Typography>
//                     <Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography>
//                     <Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography>
//                     <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography>
//                     <Typography variant="body2"><strong>PF No:</strong> {selectedPayslipRecord.details.pfNo}</Typography>
//                     <Typography variant="body2"><strong>UAN No:</strong> {selectedPayslipRecord.details.uanNo}</Typography>
//                     <Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography>
//                     <Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography>
//                   </Grid>
//                 </Grid>
//                <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic + DA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.basic ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pf ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.hra ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.esic ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.medical ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PT</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pt ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.conveyance ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.tds ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.arrears ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.otherDeduction ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.mlwf ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.advance ?? 0).toFixed(2)}</TableCell></TableRow>
//                         <TableRow><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</TableCell></TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ mt: 1, px: 1 }}><Typography variant="body2"><strong>Remark:</strong> NA</Typography></Box>
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                     <Typography variant="body2"><strong>Total Earnings:</strong> ₹{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</Typography>
//                     <Typography variant="body2"><strong>Total Deductions:</strong> ₹{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</Typography>
//                     <Typography variant="body2"><strong>Take Home:</strong> ₹{(selectedPayslipRecord?.netPayable ?? 0).toFixed(2)}</Typography>
//                 </Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
//               </Box>
//             ) : <Typography>Could not load payslip details.</Typography>}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions-buttons">
//           <Button onClick={handleClosePayslip} sx={{ color: '#757575' }}>Close</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#8C257C', borderColor: '#8C257C', '&:hover': {borderColor: '#6d1d60', color: '#6d1d60'} }} disabled={dialogLoading || !selectedPayslipRecord}>Print</Button>
//           <Button variant="contained" onClick={handleDownloadPdf} sx={{ bgcolor: '#8C257C', color: 'white', '&:hover': { bgcolor: '#6d1d60' } }} disabled={dialogLoading || !selectedPayslipRecord}>Download PDF</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default PayslipHistory;



import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
  CircularProgress, TablePagination, Skeleton, IconButton, InputAdornment, useTheme,
  useMediaQuery, Grid
} from '@mui/material';
import { Search as SearchIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosInstance';

import vetrinaLogo from '../../viewsSuperAdmin/vetrinalogo.png';

const allMonths = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

const transformPayslipDetails = (apiDetail) => {
  if (!apiDetail) return null;
  const netPay = apiDetail.net_pay || 0;
  const totalEarnings = apiDetail.total_earnings || 0;
  const totalDeductions = apiDetail.total_deduction || 0;

  return {
    name: apiDetail.employee_name,
    netPayable: netPay,
    salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
    payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    details: {
      employeeId: apiDetail.employee_id,
      department: apiDetail.department_name,
      dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      designation: apiDetail.designation_name,
      leaves: 'N/A',
      location: apiDetail.location || 'N/A',
      payableDays: apiDetail.payable_days,
      bankName: apiDetail.bank_name || 'N/A',
      bankAcNo: apiDetail.bank_account_number || 'N/A',
      pfNo: apiDetail.pf_number || 'N/A',
      uanNo: 'N/A',
      esicNo: apiDetail.esic_number || 'N/A',
      panNo: apiDetail.pan_number || 'N/A',
      basic: apiDetail.basic_plus_da || 0,
      hra: apiDetail.hra || 0,
      medical: apiDetail.medical_allowance || 0,
      conveyance: apiDetail.conveyance_allowance || 0,
      arrears: apiDetail.arrears || 0,
      pf: apiDetail.pf || 0,
      esic: apiDetail.esic || 0,
      pt: apiDetail.pt || 0,
      tds: apiDetail.tds || 0,
      otherDeduction: apiDetail.other_deduction || 0,
      mlwf: apiDetail.mlwf || 0,
      advance: 0,
      totalEarnings: totalEarnings,
      totalDeductions: totalDeductions,
    }
  };
};

const PayslipHistory = () => {
  const [payslipHistory, setPayslipHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);
  const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
  const payslipRef = useRef();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/payslip_history/');
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          const transformedData = response.data.data.map(item => ({
            id: item.payroll_report_id,
            payroll_report_id: item.payroll_report_id,
            name: item.employee_name,
            netPayable: item.net_pay,
            salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
            payDate: new Date(item.pay_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          }));
          setPayslipHistory(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch payslip history:", error);
        setPayslipHistory([]);
        Swal.fire({
            icon: 'error',
            title: 'Fetch Error',
            text: 'Could not fetch payslip history. Please try again later.',
            timer: 3000,
            showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleOpenPayslip = async (payslipRecord) => {
    setIsPayslipOpen(true);
    setDialogLoading(true);
    setSelectedPayslipRecord(null);
    try {
      const response = await axiosInstance.post('/api/payslip/', {
        payroll_report_id: String(payslipRecord.payroll_report_id)
      });
      if (response.data.status === 'success' && response.data.data.length > 0) {
        const transformedDetails = transformPayslipDetails(response.data.data[0]);
        setSelectedPayslipRecord(transformedDetails);
      } else {
        throw new Error('No payslip data found');
      }
    } catch (error) {
      console.error("Failed to fetch payslip details:", error);
      handleClosePayslip();
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not load payslip details.',
          timer: 3000,
          showConfirmButton: false,
      });
    } finally {
      setDialogLoading(false);
    }
  };

  const handleClosePayslip = () => { setIsPayslipOpen(false); setSelectedPayslipRecord(null); };

  const handleDownloadPdf = () => {
    const input = payslipRef.current;
    if (!input) return;
    const actions = input.querySelector('.payslip-actions-buttons');
    if(actions) actions.style.display = 'none';
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      if(actions) actions.style.display = 'flex';
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let newWidth = pdfWidth; let newHeight = newWidth / ratio;
      if (newHeight > pdfHeight) { newHeight = pdfHeight; newWidth = newHeight * ratio; }
      const x = (pdfWidth - newWidth) / 2;
      pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight);
      pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
    });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = payslipHistory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.salaryMonth.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold' }} mb={2}>
        Payslip History
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ backgroundColor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '5%' }}>SR NO.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMPLOYEE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>NET PAYABLE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SALARY MONTH</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PAY DATE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center"><Skeleton variant="rectangular" width={40} height={30} /></TableCell>
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{item.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#8C257C' }}>₹{item.netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{item.salaryMonth}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{item.payDate}</TableCell>
                  <TableCell align="center">
                     <Box display="flex" justifyContent="center" gap={0.5}>
                        <IconButton onClick={() => handleOpenPayslip(item)} size="small" sx={{ color: '#8C257C' }}>
                            <VisibilityIcon />
                        </IconButton>
                     </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={6} align="center">No payslip history found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            mt: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 25]}
          sx={{
            '& .MuiSvgIcon-root': { color: '#8C257C' },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: 'text.secondary',
            },
          }}
        />
      </Box>

      <Dialog open={isPayslipOpen} onClose={handleClosePayslip} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Pay Slip</DialogTitle>
        <Box ref={payslipRef}>
          <DialogContent>
            {dialogLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}><CircularProgress sx={{color: '#8C257C'}}/></Box>
            ) : selectedPayslipRecord ? (
                <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={4}>
                        <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: '140px', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'right' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                        Vetrina Healthcare Pvt. Ltd.
                        </Typography>
                        <Typography variant="body2">Pay Slip For Month: {selectedPayslipRecord.salaryMonth}</Typography>
                        <Typography variant="body2">Salary Payment Date: {selectedPayslipRecord.payDate}</Typography>
                    </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography>
                    <Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography>
                    <Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography>
                    <Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography>
                    <Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography>
                    <Typography variant="body2"><strong>Leaves:</strong> {selectedPayslipRecord.details.leaves}</Typography>
                    <Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography>
                    <Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography>
                    <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography>
                    <Typography variant="body2"><strong>PF No:</strong> {selectedPayslipRecord.details.pfNo}</Typography>
                    <Typography variant="body2"><strong>UAN No:</strong> {selectedPayslipRecord.details.uanNo}</Typography>
                    <Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography>
                    <Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography>
                  </Grid>
                </Grid>
               <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
                  <Table size="small">
                    <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
                    <TableBody>
                        <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic + DA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.basic ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pf ?? 0).toFixed(2)}</TableCell></TableRow>
                        <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.hra ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.esic ?? 0).toFixed(2)}</TableCell></TableRow>
                        <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.medical ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PT</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pt ?? 0).toFixed(2)}</TableCell></TableRow>
                        <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.conveyance ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.tds ?? 0).toFixed(2)}</TableCell></TableRow>
                        <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.arrears ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.otherDeduction ?? 0).toFixed(2)}</TableCell></TableRow>
                        {selectedPayslipRecord?.details?.mlwf > 0 && (
                          <TableRow>
                            <TableCell sx={{ border: "1px solid #000" }}></TableCell>
                            <TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell>
                            <TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell>
                            <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord.details.mlwf).toFixed(2)}</TableCell>
                          </TableRow>
                        )}
                        <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.advance ?? 0).toFixed(2)}</TableCell></TableRow>
                        <TableRow><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 1, px: 1 }}><Typography variant="body2"><strong>Remark:</strong> NA</Typography></Box>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Typography variant="body2"><strong>Total Earnings:</strong> ₹{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</Typography>
                    <Typography variant="body2"><strong>Total Deductions:</strong> ₹{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</Typography>
                    <Typography variant="body2"><strong>Take Home:</strong> ₹{(selectedPayslipRecord?.netPayable ?? 0).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
              </Box>
            ) : <Typography>Could not load payslip details.</Typography>}
          </DialogContent>
        </Box>
        <DialogActions className="payslip-actions-buttons">
          <Button onClick={handleClosePayslip} sx={{ color: '#757575' }}>Close</Button>
          <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#8C257C', borderColor: '#8C257C', '&:hover': {borderColor: '#6d1d60', color: '#6d1d60'} }} disabled={dialogLoading || !selectedPayslipRecord}>Print</Button>
          <Button variant="contained" onClick={handleDownloadPdf} sx={{ bgcolor: '#8C257C', color: 'white', '&:hover': { bgcolor: '#6d1d60' } }} disabled={dialogLoading || !selectedPayslipRecord}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayslipHistory;