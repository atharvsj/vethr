// // // // // // // // import React, { useState } from "react";
// // // // // // // // import {
// // // // // // // //   Container, Grid, Button, TextField, Select, MenuItem, InputLabel, FormControl,
// // // // // // // //   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel
// // // // // // // // } from "@mui/material";

// // // // // // // // const months = [
// // // // // // // //   "January", "February", "March", "April", "May", "June",
// // // // // // // //   "July", "August", "September", "October", "November", "December"
// // // // // // // // ];
// // // // // // // // const years = [2023, 2024, 2025];

// // // // // // // // const payrollData = [
// // // // // // // //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR" },
// // // // // // // //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales" },
// // // // // // // //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales" },
// // // // // // // //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase" },
// // // // // // // //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT" },
// // // // // // // //   { id: 6, empId: "V0022", name: "Pooja Jadhav", dept: "IT" },
// // // // // // // //   { id: 7, empId: "V0023", name: "Shubham Kulkarni", dept: "Admin" },
// // // // // // // // ];

// // // // // // // // const columnHeaders = [
// // // // // // // //   { id: "srNo", label: "Sr. No." },
// // // // // // // //   { id: "empId", label: "Employee ID" },
// // // // // // // //   { id: "name", label: "Employee Name" },
// // // // // // // //   { id: "dept", label: "Department" },
// // // // // // // //   { id: "payableDays", label: "Payable Days" },
// // // // // // // //   { id: "basic", label: "Basic" },
// // // // // // // //   { id: "hra", label: "HRA" },
// // // // // // // //   { id: "conveyance", label: "Conveyance Allowance" },
// // // // // // // //   { id: "medical", label: "Medical Allowance" },
// // // // // // // //   { id: "arrearsE", label: "Arrears" },
// // // // // // // //   { id: "totalEarnings", label: "Total Earnings" },
// // // // // // // //   { id: "pf", label: "PF" },
// // // // // // // //   { id: "esics", label: "ESICS" },
// // // // // // // //   { id: "pt", label: "PT" },
// // // // // // // //   { id: "mlwf", label: "MLWF" },
// // // // // // // //   { id: "advance", label: "Advance" },
// // // // // // // //   { id: "tds", label: "TDS" },
// // // // // // // //   { id: "arrearsD", label: "Arrears" },
// // // // // // // //   { id: "totalDeduction", label: "Total Deduction" },
// // // // // // // //   { id: "netPay", label: "Net Pay" },
// // // // // // // // ];

// // // // // // // // const PayrollReport = () => {
// // // // // // // //   const [month, setMonth] = useState("");
// // // // // // // //   const [year, setYear] = useState("");
// // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // //   const [page, setPage] = useState(0);
// // // // // // // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // // // // // // //   const [orderBy, setOrderBy] = useState("name");
// // // // // // // //   const [order, setOrder] = useState("asc");

// // // // // // // //   const handleSort = (property) => {
// // // // // // // //     const isAsc = orderBy === property && order === "asc";
// // // // // // // //     setOrder(isAsc ? "desc" : "asc");
// // // // // // // //     setOrderBy(property);
// // // // // // // //   };

// // // // // // // //   const getComparator = (order, orderBy) => {
// // // // // // // //     return (a, b) => {
// // // // // // // //       let aVal = orderBy === "srNo" ? a.id : a[orderBy] || "";
// // // // // // // //       let bVal = orderBy === "srNo" ? b.id : b[orderBy] || "";
// // // // // // // //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// // // // // // // //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// // // // // // // //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// // // // // // // //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// // // // // // // //       return 0;
// // // // // // // //     };
// // // // // // // //   };

// // // // // // // //   const filteredData = payrollData.filter(emp =>
// // // // // // // //     emp.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // // //     emp.empId.toLowerCase().includes(search.toLowerCase())
// // // // // // // //   );

// // // // // // // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy));

// // // // // // // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // // // // // // //   const handleChangeRowsPerPage = (event) => {
// // // // // // // //     setRowsPerPage(parseInt(event.target.value, 10));
// // // // // // // //     setPage(0);
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Container sx={{ mt: 4, maxWidth: "100vw", overflowX: "hidden" }}>
// // // // // // // //       <h2 style={{ marginBottom: '16px' }}>Payroll Report All Employee</h2>

// // // // // // // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 1 }}>
// // // // // // // //         <Grid item xs={12} sm={2}>
// // // // // // // //           <FormControl fullWidth size="small">
// // // // // // // //             <InputLabel>Month</InputLabel>
// // // // // // // //             <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month">
// // // // // // // //               {months.map((m) => (
// // // // // // // //                 <MenuItem key={m} value={m}>{m}</MenuItem>
// // // // // // // //               ))}
// // // // // // // //             </Select>
// // // // // // // //           </FormControl>
// // // // // // // //         </Grid>
// // // // // // // //         <Grid item xs={12} sm={2}>
// // // // // // // //           <FormControl fullWidth size="small">
// // // // // // // //             <InputLabel>Year</InputLabel>
// // // // // // // //             <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
// // // // // // // //               {years.map((y) => (
// // // // // // // //                 <MenuItem key={y} value={y}>{y}</MenuItem>
// // // // // // // //               ))}
// // // // // // // //             </Select>
// // // // // // // //           </FormControl>
// // // // // // // //         </Grid>
// // // // // // // //         <Grid item xs={12} sm={2}>
// // // // // // // //           <Button variant="contained" fullWidth sx={{
// // // // // // // //             backgroundColor: '#7C3AED',
// // // // // // // //             color: '#fff',
// // // // // // // //             '&:hover': { backgroundColor: '#6D28D9' },
// // // // // // // //           }}>
// // // // // // // //             Submit
// // // // // // // //           </Button>
// // // // // // // //         </Grid>
// // // // // // // //       </Grid>

// // // // // // // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // // // // // // //         <Grid item xs={12} sm={2}>
// // // // // // // //           <Button variant="outlined" fullWidth sx={{
// // // // // // // //             color: '#7C3AED',
// // // // // // // //             borderColor: '#7C3AED',
// // // // // // // //             '&:hover': {
// // // // // // // //               backgroundColor: '#7C3AED',
// // // // // // // //               color: 'white',
// // // // // // // //               borderColor: '#7C3AED',
// // // // // // // //             },
// // // // // // // //           }}>
// // // // // // // //             Download Excel
// // // // // // // //           </Button>
// // // // // // // //         </Grid>
// // // // // // // //         <Grid item xs={12} sm={3} sx={{ marginLeft: 'auto' }}>
// // // // // // // //           <TextField
// // // // // // // //             label="Search"
// // // // // // // //             variant="outlined"
// // // // // // // //             size="small"
// // // // // // // //             fullWidth
// // // // // // // //             value={search}
// // // // // // // //             onChange={(e) => setSearch(e.target.value)}
// // // // // // // //           />
// // // // // // // //         </Grid>
// // // // // // // //       </Grid>

// // // // // // // //       <TableContainer component={Paper} sx={{ maxHeight: "60vh", overflow: "auto" }}>
// // // // // // // //         <Table stickyHeader size="small">
// // // // // // // //           <TableHead>
// // // // // // // //             <TableRow>
// // // // // // // //               <TableCell colSpan={7} />
// // // // // // // //               <TableCell align="center" colSpan={2} sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
// // // // // // // //                 Total Earnings
// // // // // // // //               </TableCell>
// // // // // // // //               <TableCell colSpan={3} />
// // // // // // // //               <TableCell align="center" colSpan={4} sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
// // // // // // // //                 Total Deductions
// // // // // // // //               </TableCell>
// // // // // // // //               <TableCell />
// // // // // // // //             </TableRow>
// // // // // // // //             <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
// // // // // // // //               {columnHeaders.map((col) => (
// // // // // // // //                 <TableCell
// // // // // // // //                   key={col.id}
// // // // // // // //                   sortDirection={orderBy === col.id ? order : false}
// // // // // // // //                   sx={{
// // // // // // // //                     fontWeight: 'bold',
// // // // // // // //                     textTransform: 'uppercase',
// // // // // // // //                     whiteSpace: 'nowrap',
// // // // // // // //                     minWidth: col.label.length * 9,
// // // // // // // //                   }}
// // // // // // // //                 >
// // // // // // // //                   <TableSortLabel
// // // // // // // //                     active={orderBy === col.id}
// // // // // // // //                     direction={orderBy === col.id ? order : 'asc'}
// // // // // // // //                     onClick={() => handleSort(col.id)}
// // // // // // // //                   >
// // // // // // // //                     {col.label}
// // // // // // // //                   </TableSortLabel>
// // // // // // // //                 </TableCell>
// // // // // // // //               ))}
// // // // // // // //             </TableRow>
// // // // // // // //           </TableHead>

// // // // // // // //           <TableBody>
// // // // // // // //             {sortedData
// // // // // // // //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// // // // // // // //               .map((emp) => (
// // // // // // // //                 <TableRow key={emp.empId}>
// // // // // // // //                   <TableCell sx={{ whiteSpace: 'nowrap' }}>{sortedData.indexOf(emp) + 1}</TableCell>
// // // // // // // //                   <TableCell sx={{ whiteSpace: 'nowrap' }}>{emp.empId}</TableCell>
// // // // // // // //                   <TableCell sx={{ whiteSpace: 'nowrap' }}>{emp.name}</TableCell>
// // // // // // // //                   <TableCell sx={{ whiteSpace: 'nowrap' }}>{emp.dept}</TableCell>
// // // // // // // //                   {Array.from({ length: columnHeaders.length - 4 }).map((_, i) => (
// // // // // // // //                     <TableCell key={i} sx={{ whiteSpace: 'nowrap', minWidth: 80 }}></TableCell>
// // // // // // // //                   ))}
// // // // // // // //                 </TableRow>
// // // // // // // //               ))}
// // // // // // // //           </TableBody>
// // // // // // // //         </Table>
// // // // // // // //       </TableContainer>

// // // // // // // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // // // // // // //         <Grid item>
// // // // // // // //           <Grid container alignItems="center" spacing={1}>
// // // // // // // //             <Grid item>
// // // // // // // //               <span style={{ fontSize: 14 }}>Rows per page:</span>
// // // // // // // //             </Grid>
// // // // // // // //             <Grid item>
// // // // // // // //               <FormControl size="small">
// // // // // // // //                 <Select
// // // // // // // //                   value={rowsPerPage}
// // // // // // // //                   onChange={handleChangeRowsPerPage}
// // // // // // // //                   displayEmpty
// // // // // // // //                   inputProps={{ 'aria-label': 'Rows per page' }}
// // // // // // // //                   sx={{ minWidth: 80 }}
// // // // // // // //                 >
// // // // // // // //                   {[5, 10, 25].map((rows) => (
// // // // // // // //                     <MenuItem key={rows} value={rows}>
// // // // // // // //                       {rows}
// // // // // // // //                     </MenuItem>
// // // // // // // //                   ))}
// // // // // // // //                 </Select>
// // // // // // // //               </FormControl>
// // // // // // // //             </Grid>
// // // // // // // //           </Grid>
// // // // // // // //         </Grid>

// // // // // // // //         <Grid item>
// // // // // // // //           <Grid container spacing={1} alignItems="center">
// // // // // // // //             <Grid item>
// // // // // // // //               <Button
// // // // // // // //                 variant="outlined"
// // // // // // // //                 size="small"
// // // // // // // //                 onClick={() => handleChangePage(null, page - 1)}
// // // // // // // //                 disabled={page === 0}
// // // // // // // //                 sx={{
// // // // // // // //                   color: '#7C3AED',
// // // // // // // //                   borderColor: '#7C3AED',
// // // // // // // //                   '&:hover': {
// // // // // // // //                     backgroundColor: '#7C3AED',
// // // // // // // //                     borderColor: '#7C3AED',
// // // // // // // //                     color: 'white',
// // // // // // // //                   }
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 Previous
// // // // // // // //               </Button>
// // // // // // // //             </Grid>
// // // // // // // //             <Grid item>
// // // // // // // //               Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}
// // // // // // // //             </Grid>
// // // // // // // //             <Grid item>
// // // // // // // //               <Button
// // // // // // // //                 variant="outlined"
// // // // // // // //                 size="small"
// // // // // // // //                 onClick={() => handleChangePage(null, page + 1)}
// // // // // // // //                 disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
// // // // // // // //                 sx={{
// // // // // // // //                   color: '#7C3AED',
// // // // // // // //                   borderColor: '#7C3AED',
// // // // // // // //                   '&:hover': {
// // // // // // // //                     backgroundColor: '#7C3AED',
// // // // // // // //                     borderColor: '#7C3AED',
// // // // // // // //                     color: 'white',
// // // // // // // //                   }
// // // // // // // //                 }}
// // // // // // // //               >
// // // // // // // //                 Next
// // // // // // // //               </Button>
// // // // // // // //             </Grid>
// // // // // // // //           </Grid>
// // // // // // // //         </Grid>
// // // // // // // //       </Grid>
// // // // // // // //     </Container>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PayrollReport;




// // // // // // // import { useState, useEffect } from "react"
// // // // // // // import {
// // // // // // //   Container,
// // // // // // //   Grid,
// // // // // // //   Button,
// // // // // // //   TextField,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   InputLabel,
// // // // // // //   FormControl,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow,
// // // // // // //   Paper,
// // // // // // //   TableSortLabel,
// // // // // // //   Dialog,
// // // // // // //   DialogTitle,
// // // // // // //   DialogContent,
// // // // // // //   DialogActions,
// // // // // // //   DialogContentText,
// // // // // // //   Alert,
// // // // // // //   Snackbar,
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Tooltip,
// // // // // // // } from "@mui/material"
// // // // // // // import { Lock, LockOpen, Download, Search } from "@mui/icons-material"

// // // // // // // const months = [
// // // // // // //   "January",
// // // // // // //   "February",
// // // // // // //   "March",
// // // // // // //   "April",
// // // // // // //   "May",
// // // // // // //   "June",
// // // // // // //   "July",
// // // // // // //   "August",
// // // // // // //   "September",
// // // // // // //   "October",
// // // // // // //   "November",
// // // // // // //   "December",
// // // // // // // ]

// // // // // // // const years = [2023, 2024, 2025]

// // // // // // // const initialPayrollData = [
// // // // // // //   {
// // // // // // //     id: 1,
// // // // // // //     empId: "V0001",
// // // // // // //     name: "Mangesh Ghadigaonkar",
// // // // // // //     dept: "HR",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 25000,
// // // // // // //     hra: 12500,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 3000,
// // // // // // //     esics: 750,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 2500,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 2,
// // // // // // //     empId: "V0006",
// // // // // // //     name: "Kumar Patil",
// // // // // // //     dept: "Sales",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 22000,
// // // // // // //     hra: 11000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 2640,
// // // // // // //     esics: 660,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 2000,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 3,
// // // // // // //     empId: "V0017",
// // // // // // //     name: "Ganesh Mohite",
// // // // // // //     dept: "Sales",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 20000,
// // // // // // //     hra: 10000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 2400,
// // // // // // //     esics: 600,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 1800,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 4,
// // // // // // //     empId: "V0020",
// // // // // // //     name: "Rupali Mali",
// // // // // // //     dept: "Purchase",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 18000,
// // // // // // //     hra: 9000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 2160,
// // // // // // //     esics: 540,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 1500,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 5,
// // // // // // //     empId: "V0021",
// // // // // // //     name: "Sameer Pawar",
// // // // // // //     dept: "IT",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 30000,
// // // // // // //     hra: 15000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 3600,
// // // // // // //     esics: 900,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 3500,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 6,
// // // // // // //     empId: "V0022",
// // // // // // //     name: "Pooja Jadhav",
// // // // // // //     dept: "IT",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 28000,
// // // // // // //     hra: 14000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 3360,
// // // // // // //     esics: 840,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 3000,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 7,
// // // // // // //     empId: "V0023",
// // // // // // //     name: "Shubham Kulkarni",
// // // // // // //     dept: "Admin",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 24000,
// // // // // // //     hra: 12000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 2880,
// // // // // // //     esics: 720,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 2200,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // // ]

// // // // // // // const columnHeaders = [
// // // // // // //   { id: "srNo", label: "Sr. No.", width: 80 },
// // // // // // //   { id: "empId", label: "Employee ID", width: 120 },
// // // // // // //   { id: "name", label: "Employee Name", width: 200 },
// // // // // // //   { id: "dept", label: "Department", width: 120 },
// // // // // // //   { id: "payableDays", label: "Payable Days", width: 120 },
// // // // // // //   { id: "basic", label: "Basic", width: 100 },
// // // // // // //   { id: "hra", label: "HRA", width: 100 },
// // // // // // //   { id: "conveyance", label: "Conveyance", width: 120 },
// // // // // // //   { id: "medical", label: "Medical", width: 100 },
// // // // // // //   { id: "arrearsE", label: "Arrears", width: 100, editable: true },
// // // // // // //   { id: "totalEarnings", label: "Total Earnings", width: 130 },
// // // // // // //   { id: "pf", label: "PF", width: 100 },
// // // // // // //   { id: "esics", label: "ESICS", width: 100 },
// // // // // // //   { id: "pt", label: "PT", width: 80 },
// // // // // // //   { id: "mlwf", label: "MLWF", width: 100, editable: true },
// // // // // // //   { id: "advance", label: "Advance", width: 100, editable: true },
// // // // // // //   { id: "tds", label: "TDS", width: 100, editable: true },
// // // // // // //   { id: "arrearsD", label: "Arrears", width: 100, editable: true },
// // // // // // //   { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true },
// // // // // // //   { id: "totalDeduction", label: "Total Deduction", width: 140 },
// // // // // // //   { id: "netPay", label: "Net Pay", width: 120 },
// // // // // // // ]

// // // // // // // const PayrollReport = () => {
// // // // // // //   const [month, setMonth] = useState("")
// // // // // // //   const [year, setYear] = useState("")
// // // // // // //   const [search, setSearch] = useState("")
// // // // // // //   const [page, setPage] = useState(0)
// // // // // // //   const [rowsPerPage, setRowsPerPage] = useState(5)
// // // // // // //   const [orderBy, setOrderBy] = useState("name")
// // // // // // //   const [order, setOrder] = useState("asc")
// // // // // // //   const [payrollData, setPayrollData] = useState(initialPayrollData)
// // // // // // //   const [isFrozen, setIsFrozen] = useState(false)
// // // // // // //   const [freezeDialog, setFreezeDialog] = useState(false)
// // // // // // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false)
// // // // // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

// // // // // // //   // Calculate totals for each employee
// // // // // // //   const calculateTotals = (employee) => {
// // // // // // //     const totalEarnings =
// // // // // // //       (employee.basic || 0) +
// // // // // // //       (employee.hra || 0) +
// // // // // // //       (employee.conveyance || 0) +
// // // // // // //       (employee.medical || 0) +
// // // // // // //       (employee.arrearsE || 0)

// // // // // // //     const totalDeduction =
// // // // // // //       (employee.pf || 0) +
// // // // // // //       (employee.esics || 0) +
// // // // // // //       (employee.pt || 0) +
// // // // // // //       (employee.mlwf || 0) +
// // // // // // //       (employee.advance || 0) +
// // // // // // //       (employee.tds || 0) +
// // // // // // //       (employee.arrearsD || 0) +
// // // // // // //       (employee.otherDeduction || 0)

// // // // // // //     const netPay = totalEarnings - totalDeduction

// // // // // // //     return {
// // // // // // //       ...employee,
// // // // // // //       totalEarnings,
// // // // // // //       totalDeduction,
// // // // // // //       netPay,
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // Update payroll data with calculations
// // // // // // //   useEffect(() => {
// // // // // // //     const updatedData = payrollData.map(calculateTotals)
// // // // // // //     if (JSON.stringify(updatedData) !== JSON.stringify(payrollData)) {
// // // // // // //       setPayrollData(updatedData)
// // // // // // //     }
// // // // // // //   }, [])

// // // // // // //   const handleInputChange = (empId, field, value) => {
// // // // // // //     if (isFrozen) {
// // // // // // //       setSnackbar({
// // // // // // //         open: true,
// // // // // // //         message: "Data is frozen. Please unfreeze to make changes.",
// // // // // // //         severity: "warning",
// // // // // // //       })
// // // // // // //       return
// // // // // // //     }

// // // // // // //     const numericValue = Number.parseFloat(value) || 0
// // // // // // //     setPayrollData((prevData) =>
// // // // // // //       prevData.map((emp) => (emp.empId === empId ? calculateTotals({ ...emp, [field]: numericValue }) : emp)),
// // // // // // //     )
// // // // // // //   }

// // // // // // //   const handleSort = (property) => {
// // // // // // //     const isAsc = orderBy === property && order === "asc"
// // // // // // //     setOrder(isAsc ? "desc" : "asc")
// // // // // // //     setOrderBy(property)
// // // // // // //   }

// // // // // // //   const getComparator = (order, orderBy) => {
// // // // // // //     return (a, b) => {
// // // // // // //       let aVal = orderBy === "srNo" ? a.id : a[orderBy] || ""
// // // // // // //       let bVal = orderBy === "srNo" ? b.id : b[orderBy] || ""

// // // // // // //       if (typeof aVal === "string") aVal = aVal.toLowerCase()
// // // // // // //       if (typeof bVal === "string") bVal = bVal.toLowerCase()

// // // // // // //       if (aVal < bVal) return order === "asc" ? -1 : 1
// // // // // // //       if (aVal > bVal) return order === "asc" ? 1 : -1
// // // // // // //       return 0
// // // // // // //     }
// // // // // // //   }

// // // // // // //   const filteredData = payrollData.filter(
// // // // // // //     (emp) =>
// // // // // // //       emp.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // //       emp.empId.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // //       emp.dept.toLowerCase().includes(search.toLowerCase()),
// // // // // // //   )

// // // // // // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy))

// // // // // // //   const handleChangePage = (event, newPage) => setPage(newPage)

// // // // // // //   const handleChangeRowsPerPage = (event) => {
// // // // // // //     setRowsPerPage(Number.parseInt(event.target.value, 10))
// // // // // // //     setPage(0)
// // // // // // //   }

// // // // // // //   const handleFreezeData = () => {
// // // // // // //     setIsFrozen(true)
// // // // // // //     setFreezeDialog(false)
// // // // // // //     setSnackbar({
// // // // // // //       open: true,
// // // // // // //       message: "Payroll data has been frozen successfully!",
// // // // // // //       severity: "success",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleUnfreezeData = () => {
// // // // // // //     setIsFrozen(false)
// // // // // // //     setUnfreezeDialog(false)
// // // // // // //     setSnackbar({
// // // // // // //       open: true,
// // // // // // //       message: "Payroll data has been unfrozen. You can now make changes.",
// // // // // // //       severity: "info",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleDownloadExcel = () => {
// // // // // // //     // Simulate Excel download
// // // // // // //     setSnackbar({
// // // // // // //       open: true,
// // // // // // //       message: "Excel file download started!",
// // // // // // //       severity: "success",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const renderEditableCell = (employee, field, value) => {
// // // // // // //     const column = columnHeaders.find((col) => col.id === field)
// // // // // // //     if (!column?.editable) {
// // // // // // //       return (
// // // // // // //         <TableCell
// // // // // // //           key={field}
// // // // // // //           sx={{
// // // // // // //             whiteSpace: "nowrap",
// // // // // // //             minWidth: column?.width || 100,
// // // // // // //             textAlign: "right",
// // // // // // //             fontWeight: field.includes("total") || field === "netPay" ? "bold" : "normal",
// // // // // // //             backgroundColor: field.includes("total") || field === "netPay" ? "#f5f5f5" : "transparent",
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           {typeof value === "number"
// // // // // // //             ? value.toLocaleString("en-IN", {
// // // // // // //                 style: "currency",
// // // // // // //                 currency: "INR",
// // // // // // //                 minimumFractionDigits: 0,
// // // // // // //                 maximumFractionDigits: 0,
// // // // // // //               })
// // // // // // //             : value}
// // // // // // //         </TableCell>
// // // // // // //       )
// // // // // // //     }

// // // // // // //     return (
// // // // // // //       <TableCell
// // // // // // //         key={field}
// // // // // // //         sx={{
// // // // // // //           whiteSpace: "nowrap",
// // // // // // //           minWidth: column?.width || 100,
// // // // // // //           padding: "4px",
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         <TextField
// // // // // // //           size="small"
// // // // // // //           type="number"
// // // // // // //           value={value || 0}
// // // // // // //           onChange={(e) => handleInputChange(employee.empId, field, e.target.value)}
// // // // // // //           disabled={isFrozen}
// // // // // // //           sx={{
// // // // // // //             width: "100%",
// // // // // // //             "& .MuiInputBase-input": {
// // // // // // //               textAlign: "right",
// // // // // // //               padding: "4px 8px",
// // // // // // //               fontSize: "0.875rem",
// // // // // // //             },
// // // // // // //             "& .MuiInputBase-root": {
// // // // // // //               backgroundColor: isFrozen ? "#f5f5f5" : "white",
// // // // // // //             },
// // // // // // //           }}
// // // // // // //           inputProps={{
// // // // // // //             min: 0,
// // // // // // //             step: 0.01,
// // // // // // //           }}
// // // // // // //         />
// // // // // // //       </TableCell>
// // // // // // //     )
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // // // // // //       {/* Header */}
// // // // // // //       <Box sx={{ mb: 3 }}>
// // // // // // //         <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
// // // // // // //           Payroll Report - All Employees
// // // // // // //         </Typography>

// // // // // // //         {/* Status Indicator */}
// // // // // // //         <Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>
// // // // // // //           {isFrozen
// // // // // // //             ? "Payroll data is currently FROZEN. No changes can be made."
// // // // // // //             : "Payroll data is ACTIVE. You can make changes to editable fields."}
// // // // // // //         </Alert>
// // // // // // //       </Box>

// // // // // // //       {/* Controls Row 1 - Month, Year, Submit */}
// // // // // // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // // // // // //         <Grid item xs={12} sm={6} md={3}>
// // // // // // //           <FormControl fullWidth size="small">
// // // // // // //             <InputLabel>Month</InputLabel>
// // // // // // //             <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>
// // // // // // //               {months.map((m) => (
// // // // // // //                 <MenuItem key={m} value={m}>
// // // // // // //                   {m}
// // // // // // //                 </MenuItem>
// // // // // // //               ))}
// // // // // // //             </Select>
// // // // // // //           </FormControl>
// // // // // // //         </Grid>

// // // // // // //         <Grid item xs={12} sm={6} md={3}>
// // // // // // //           <FormControl fullWidth size="small">
// // // // // // //             <InputLabel>Year</InputLabel>
// // // // // // //             <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>
// // // // // // //               {years.map((y) => (
// // // // // // //                 <MenuItem key={y} value={y}>
// // // // // // //                   {y}
// // // // // // //                 </MenuItem>
// // // // // // //               ))}
// // // // // // //             </Select>
// // // // // // //           </FormControl>
// // // // // // //         </Grid>

// // // // // // //         <Grid item xs={12} sm={6} md={2}>
// // // // // // //           <Button
// // // // // // //             variant="contained"
// // // // // // //             fullWidth
// // // // // // //             disabled={!month || !year || isFrozen}
// // // // // // //             sx={{
// // // // // // //               backgroundColor: "#7C3AED",
// // // // // // //               color: "#fff",
// // // // // // //               "&:hover": { backgroundColor: "#6D28D9" },
// // // // // // //               "&:disabled": { backgroundColor: "#ccc" },
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             Submit
// // // // // // //           </Button>
// // // // // // //         </Grid>

// // // // // // //         {/* Freeze/Unfreeze Button */}
// // // // // // //         <Grid item xs={12} sm={6} md={4}>
// // // // // // //           <Box sx={{ display: "flex", gap: 1 }}>
// // // // // // //             <Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Freeze data to prevent changes"}>
// // // // // // //               <Button
// // // // // // //                 variant={isFrozen ? "outlined" : "contained"}
// // // // // // //                 color={isFrozen ? "warning" : "success"}
// // // // // // //                 startIcon={isFrozen ? <LockOpen /> : <Lock />}
// // // // // // //                 onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))}
// // // // // // //                 sx={{ flex: 1 }}
// // // // // // //               >
// // // // // // //                 {isFrozen ? "Unfreeze Data" : "Freeze Data"}
// // // // // // //               </Button>
// // // // // // //             </Tooltip>
// // // // // // //           </Box>
// // // // // // //         </Grid>
// // // // // // //       </Grid>

// // // // // // //       {/* Controls Row 2 - Download, Search */}
// // // // // // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // // // // // //         <Grid item xs={12} sm={6} md={3}>
// // // // // // //           <Button
// // // // // // //             variant="outlined"
// // // // // // //             fullWidth
// // // // // // //             startIcon={<Download />}
// // // // // // //             onClick={handleDownloadExcel}
// // // // // // //             sx={{
// // // // // // //               color: "#7C3AED",
// // // // // // //               borderColor: "#7C3AED",
// // // // // // //               "&:hover": {
// // // // // // //                 backgroundColor: "#7C3AED",
// // // // // // //                 color: "white",
// // // // // // //                 borderColor: "#7C3AED",
// // // // // // //               },
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             Download Excel
// // // // // // //           </Button>
// // // // // // //         </Grid>

// // // // // // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}>
// // // // // // //           <TextField
// // // // // // //             label="Search Employee"
// // // // // // //             variant="outlined"
// // // // // // //             size="small"
// // // // // // //             fullWidth
// // // // // // //             value={search}
// // // // // // //             onChange={(e) => setSearch(e.target.value)}
// // // // // // //             InputProps={{
// // // // // // //               startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
// // // // // // //             }}
// // // // // // //           />
// // // // // // //         </Grid>
// // // // // // //       </Grid>

// // // // // // //       {/* Payroll Table */}
// // // // // // //       <TableContainer
// // // // // // //         component={Paper}
// // // // // // //         sx={{
// // // // // // //           maxHeight: "70vh",
// // // // // // //           overflow: "auto",
// // // // // // //           border: "1px solid #e0e0e0",
// // // // // // //           borderRadius: 2,
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         <Table stickyHeader size="small">
// // // // // // //           <TableHead>
// // // // // // //             {/* Header Row 1 - Group Headers */}
// // // // // // //             <TableRow>
// // // // // // //               <TableCell colSpan={5} sx={{ backgroundColor: "#f8f9fa" }} />
// // // // // // //               <TableCell
// // // // // // //                 align="center"
// // // // // // //                 colSpan={5}
// // // // // // //                 sx={{
// // // // // // //                   fontWeight: "bold",
// // // // // // //                   textTransform: "uppercase",
// // // // // // //                   backgroundColor: "#e3f2fd",
// // // // // // //                   borderLeft: "2px solid #2196f3",
// // // // // // //                   borderRight: "2px solid #2196f3",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 TOTAL EARNINGS
// // // // // // //               </TableCell>
// // // // // // //               <TableCell colSpan={1} sx={{ backgroundColor: "#f8f9fa" }} />
// // // // // // //               <TableCell
// // // // // // //                 align="center"
// // // // // // //                 colSpan={8}
// // // // // // //                 sx={{
// // // // // // //                   fontWeight: "bold",
// // // // // // //                   textTransform: "uppercase",
// // // // // // //                   backgroundColor: "#ffebee",
// // // // // // //                   borderLeft: "2px solid #f44336",
// // // // // // //                   borderRight: "2px solid #f44336",
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 TOTAL DEDUCTIONS
// // // // // // //               </TableCell>
// // // // // // //               <TableCell colSpan={1} sx={{ backgroundColor: "#f8f9fa" }} />
// // // // // // //             </TableRow>

// // // // // // //             {/* Header Row 2 - Column Headers */}
// // // // // // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // // // // // //               {columnHeaders.map((col) => (
// // // // // // //                 <TableCell
// // // // // // //                   key={col.id}
// // // // // // //                   sortDirection={orderBy === col.id ? order : false}
// // // // // // //                   sx={{
// // // // // // //                     fontWeight: "bold",
// // // // // // //                     textTransform: "uppercase",
// // // // // // //                     whiteSpace: "nowrap",
// // // // // // //                     minWidth: col.width || 100,
// // // // // // //                     backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5",
// // // // // // //                     borderBottom: "2px solid #dee2e6",
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <TableSortLabel
// // // // // // //                     active={orderBy === col.id}
// // // // // // //                     direction={orderBy === col.id ? order : "asc"}
// // // // // // //                     onClick={() => handleSort(col.id)}
// // // // // // //                   >
// // // // // // //                     {col.label}
// // // // // // //                     {col.editable && (
// // // // // // //                       <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>
// // // // // // //                         (Editable)
// // // // // // //                       </Typography>
// // // // // // //                     )}
// // // // // // //                   </TableSortLabel>
// // // // // // //                 </TableCell>
// // // // // // //               ))}
// // // // // // //             </TableRow>
// // // // // // //           </TableHead>

// // // // // // //           <TableBody>
// // // // // // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // // // // // //               <TableRow
// // // // // // //                 key={emp.empId}
// // // // // // //                 sx={{
// // // // // // //                   "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
// // // // // // //                   "&:hover": { backgroundColor: "#f0f0f0" },
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
// // // // // // //                   {page * rowsPerPage + index + 1}
// // // // // // //                 </TableCell>
// // // // // // //                 <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold", color: "#1976d2" }}>{emp.empId}</TableCell>
// // // // // // //                 <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "medium" }}>{emp.name}</TableCell>
// // // // // // //                 <TableCell sx={{ whiteSpace: "nowrap" }}>{emp.dept}</TableCell>

// // // // // // //                 {/* Render all other columns */}
// // // // // // //                 {columnHeaders.slice(4).map((col) => renderEditableCell(emp, col.id, emp[col.id]))}
// // // // // // //               </TableRow>
// // // // // // //             ))}
// // // // // // //           </TableBody>
// // // // // // //         </Table>
// // // // // // //       </TableContainer>

// // // // // // //       {/* Pagination */}
// // // // // // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // // // // // //         <Grid item>
// // // // // // //           <Grid container alignItems="center" spacing={1}>
// // // // // // //             <Grid item>
// // // // // // //               <Typography variant="body2">Rows per page:</Typography>
// // // // // // //             </Grid>
// // // // // // //             <Grid item>
// // // // // // //               <FormControl size="small">
// // // // // // //                 <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>
// // // // // // //                   {[5, 10, 25, 50].map((rows) => (
// // // // // // //                     <MenuItem key={rows} value={rows}>
// // // // // // //                       {rows}
// // // // // // //                     </MenuItem>
// // // // // // //                   ))}
// // // // // // //                 </Select>
// // // // // // //               </FormControl>
// // // // // // //             </Grid>
// // // // // // //           </Grid>
// // // // // // //         </Grid>

// // // // // // //         <Grid item>
// // // // // // //           <Grid container spacing={1} alignItems="center">
// // // // // // //             <Grid item>
// // // // // // //               <Button
// // // // // // //                 variant="outlined"
// // // // // // //                 size="small"
// // // // // // //                 onClick={() => handleChangePage(null, page - 1)}
// // // // // // //                 disabled={page === 0}
// // // // // // //                 sx={{
// // // // // // //                   color: "#7C3AED",
// // // // // // //                   borderColor: "#7C3AED",
// // // // // // //                   "&:hover": {
// // // // // // //                     backgroundColor: "#7C3AED",
// // // // // // //                     borderColor: "#7C3AED",
// // // // // // //                     color: "white",
// // // // // // //                   },
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 Previous
// // // // // // //               </Button>
// // // // // // //             </Grid>
// // // // // // //             <Grid item>
// // // // // // //               <Typography variant="body2">
// // // // // // //                 Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}
// // // // // // //               </Typography>
// // // // // // //             </Grid>
// // // // // // //             <Grid item>
// // // // // // //               <Button
// // // // // // //                 variant="outlined"
// // // // // // //                 size="small"
// // // // // // //                 onClick={() => handleChangePage(null, page + 1)}
// // // // // // //                 disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
// // // // // // //                 sx={{
// // // // // // //                   color: "#7C3AED",
// // // // // // //                   borderColor: "#7C3AED",
// // // // // // //                   "&:hover": {
// // // // // // //                     backgroundColor: "#7C3AED",
// // // // // // //                     borderColor: "#7C3AED",
// // // // // // //                     color: "white",
// // // // // // //                   },
// // // // // // //                 }}
// // // // // // //               >
// // // // // // //                 Next
// // // // // // //               </Button>
// // // // // // //             </Grid>
// // // // // // //           </Grid>
// // // // // // //         </Grid>
// // // // // // //       </Grid>

// // // // // // //       {/* Freeze Confirmation Dialog */}
// // // // // // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}>
// // // // // // //         <DialogTitle>
// // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // //             <Lock color="warning" />
// // // // // // //             Freeze Payroll Data
// // // // // // //           </Box>
// // // // // // //         </DialogTitle>
// // // // // // //         <DialogContent>
// // // // // // //           <DialogContentText>
// // // // // // //             Are you sure you want to freeze the payroll data? Once frozen, no changes can be made to any editable fields
// // // // // // //             until you unfreeze the data.
// // // // // // //           </DialogContentText>
// // // // // // //         </DialogContent>
// // // // // // //         <DialogActions>
// // // // // // //           <Button onClick={() => setFreezeDialog(false)}>Cancel</Button>
// // // // // // //           <Button onClick={handleFreezeData} variant="contained" color="warning">
// // // // // // //             Freeze Data
// // // // // // //           </Button>
// // // // // // //         </DialogActions>
// // // // // // //       </Dialog>

// // // // // // //       {/* Unfreeze Confirmation Dialog */}
// // // // // // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}>
// // // // // // //         <DialogTitle>
// // // // // // //           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // // // // //             <LockOpen color="success" />
// // // // // // //             Unfreeze Payroll Data
// // // // // // //           </Box>
// // // // // // //         </DialogTitle>
// // // // // // //         <DialogContent>
// // // // // // //           <DialogContentText>
// // // // // // //             Are you sure you want to unfreeze the payroll data? This will allow changes to be made to all editable
// // // // // // //             fields.
// // // // // // //           </DialogContentText>
// // // // // // //         </DialogContent>
// // // // // // //         <DialogActions>
// // // // // // //           <Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button>
// // // // // // //           <Button onClick={handleUnfreezeData} variant="contained" color="success">
// // // // // // //             Unfreeze Data
// // // // // // //           </Button>
// // // // // // //         </DialogActions>
// // // // // // //       </Dialog>

// // // // // // //       {/* Snackbar for notifications */}
// // // // // // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
// // // // // // //         <Alert
// // // // // // //           onClose={() => setSnackbar({ ...snackbar, open: false })}
// // // // // // //           severity={snackbar.severity}
// // // // // // //           sx={{ width: "100%" }}
// // // // // // //         >
// // // // // // //           {snackbar.message}
// // // // // // //         </Alert>
// // // // // // //       </Snackbar>
// // // // // // //     </Container>
// // // // // // //   )
// // // // // // // }

// // // // // // // export default PayrollReport


// // // // // // // import { useState, useEffect } from "react"
// // // // // // // import {
// // // // // // //   Container,
// // // // // // //   Grid,
// // // // // // //   Button,
// // // // // // //   TextField,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   InputLabel,
// // // // // // //   FormControl,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow,
// // // // // // //   Paper,
// // // // // // //   TableSortLabel,
// // // // // // //   Dialog,
// // // // // // //   DialogTitle,
// // // // // // //   DialogContent,
// // // // // // //   DialogActions,
// // // // // // //   DialogContentText,
// // // // // // //   Alert,
// // // // // // //   Snackbar,
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Tooltip,
// // // // // // // } from "@mui/material"
// // // // // // // import { Lock, LockOpen, Download, Search, Save } from "@mui/icons-material"

// // // // // // // // Full list of months for dynamic generation
// // // // // // // const allMonths = [
// // // // // // //   "January",
// // // // // // //   "February",
// // // // // // //   "March",
// // // // // // //   "April",
// // // // // // //   "May",
// // // // // // //   "June",
// // // // // // //   "July",
// // // // // // //   "August",
// // // // // // //   "September",
// // // // // // //   "October",
// // // // // // //   "November",
// // // // // // //   "December",
// // // // // // // ]

// // // // // // // // **MODIFIED**: Initial payroll data with PF capped at 1800
// // // // // // // const initialPayrollData = [
// // // // // // //   {
// // // // // // //     id: 1,
// // // // // // //     empId: "V0001",
// // // // // // //     name: "Mangesh Ghadigaonkar",
// // // // // // //     dept: "HR",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 25000,
// // // // // // //     hra: 12500,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 750,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 2500,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 2,
// // // // // // //     empId: "V0006",
// // // // // // //     name: "Kumar Patil",
// // // // // // //     dept: "Sales",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 22000,
// // // // // // //     hra: 11000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 660,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 2000,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 3,
// // // // // // //     empId: "V0017",
// // // // // // //     name: "Ganesh Mohite",
// // // // // // //     dept: "Sales",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 20000,
// // // // // // //     hra: 10000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 600,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 1800,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 4,
// // // // // // //     empId: "V0020",
// // // // // // //     name: "Rupali Mali",
// // // // // // //     dept: "Purchase",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 18000,
// // // // // // //     hra: 9000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 540,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 1500,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 5,
// // // // // // //     empId: "V0021",
// // // // // // //     name: "Sameer Pawar",
// // // // // // //     dept: "IT",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 30000,
// // // // // // //     hra: 15000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 900,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 3500,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 6,
// // // // // // //     empId: "V0022",
// // // // // // //     name: "Pooja Jadhav",
// // // // // // //     dept: "IT",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 28000,
// // // // // // //     hra: 14000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 840,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 3000,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // //   {
// // // // // // //     id: 7,
// // // // // // //     empId: "V0023",
// // // // // // //     name: "Shubham Kulkarni",
// // // // // // //     dept: "Admin",
// // // // // // //     payableDays: 30,
// // // // // // //     basic: 24000,
// // // // // // //     hra: 12000,
// // // // // // //     conveyance: 2000,
// // // // // // //     medical: 1500,
// // // // // // //     arrearsE: 0,
// // // // // // //     pf: 1800, // Capped
// // // // // // //     esics: 720,
// // // // // // //     pt: 200,
// // // // // // //     mlwf: 0,
// // // // // // //     advance: 0,
// // // // // // //     tds: 2200,
// // // // // // //     arrearsD: 0,
// // // // // // //     otherDeduction: 0,
// // // // // // //   },
// // // // // // // ]

// // // // // // // // **MODIFIED**: Column headers include a new "Actions" column
// // // // // // // const columnHeaders = [
// // // // // // //   { id: "srNo", label: "Sr. No.", width: 80 },
// // // // // // //   { id: "empId", label: "Employee ID", width: 120 },
// // // // // // //   { id: "name", label: "Employee Name", width: 200 },
// // // // // // //   { id: "dept", label: "Department", width: 120 },
// // // // // // //   { id: "payableDays", label: "Payable Days", width: 120 },
// // // // // // //   { id: "basic", label: "Basic", width: 100 },
// // // // // // //   { id: "hra", label: "HRA", width: 100 },
// // // // // // //   { id: "conveyance", label: "Conveyance", width: 120 },
// // // // // // //   { id: "medical", label: "Medical", width: 100 },
// // // // // // //   { id: "arrearsE", label: "Arrears", width: 100, editable: true },
// // // // // // //   { id: "totalEarnings", label: "Total Earnings", width: 130 },
// // // // // // //   { id: "pf", label: "PF", width: 100 },
// // // // // // //   { id: "esics", label: "ESICS", width: 100 },
// // // // // // //   { id: "pt", label: "PT", width: 80 },
// // // // // // //   { id: "mlwf", label: "MLWF", width: 100, editable: true },
// // // // // // //   { id: "advance", label: "Advance", width: 100, editable: true },
// // // // // // //   { id: "tds", label: "TDS", width: 100, editable: true },
// // // // // // //   { id: "arrearsD", label: "Arrears", width: 100, editable: true },
// // // // // // //   { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true },
// // // // // // //   { id: "totalDeduction", label: "Total Deduction", width: 140 },
// // // // // // //   { id: "netPay", label: "Net Pay", width: 120 },
// // // // // // //   { id: "actions", label: "Actions", width: 150 }, // **NEW**
// // // // // // // ]

// // // // // // // const PayrollReport = () => {
// // // // // // //   const [month, setMonth] = useState("")
// // // // // // //   const [year, setYear] = useState("")
// // // // // // //   const [availableMonths, setAvailableMonths] = useState(allMonths)
// // // // // // //   const [availableYears, setAvailableYears] = useState([])
// // // // // // //   const [search, setSearch] = useState("")
// // // // // // //   const [page, setPage] = useState(0)
// // // // // // //   const [rowsPerPage, setRowsPerPage] = useState(5)
// // // // // // //   const [orderBy, setOrderBy] = useState("name")
// // // // // // //   const [order, setOrder] = useState("asc")
// // // // // // //   const [payrollData, setPayrollData] = useState([])
// // // // // // //   const [isFrozen, setIsFrozen] = useState(false)
// // // // // // //   const [freezeDialog, setFreezeDialog] = useState(false)
// // // // // // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false)
// // // // // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

// // // // // // //   // **MODIFIED**: Calculate totals for each employee, excluding Arrears from Total Deduction
// // // // // // //   const calculateTotals = (employee) => {
// // // // // // //     const totalEarnings =
// // // // // // //       (employee.basic || 0) +
// // // // // // //       (employee.hra || 0) +
// // // // // // //       (employee.conveyance || 0) +
// // // // // // //       (employee.medical || 0) +
// // // // // // //       (employee.arrearsE || 0)

// // // // // // //     const totalDeduction =
// // // // // // //       (employee.pf || 0) +
// // // // // // //       (employee.esics || 0) +
// // // // // // //       (employee.pt || 0) +
// // // // // // //       (employee.mlwf || 0) +
// // // // // // //       (employee.advance || 0) +
// // // // // // //       (employee.tds || 0) +
// // // // // // //       // (employee.arrearsD || 0) + // **REMOVED** as per request
// // // // // // //       (employee.otherDeduction || 0)

// // // // // // //     const netPay = totalEarnings - totalDeduction

// // // // // // //     return { ...employee, totalEarnings, totalDeduction, netPay }
// // // // // // //   }

// // // // // // //   // **NEW**: Effect to initialize data and dynamic date dropdowns
// // // // // // //   useEffect(() => {
// // // // // // //     // Set initial payroll data with calculated totals
// // // // // // //     setPayrollData(initialPayrollData.map(calculateTotals))

// // // // // // //     // Set up dynamic years
// // // // // // //     const currentYear = new Date().getFullYear()
// // // // // // //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear + i)
// // // // // // //     setAvailableYears(yearsArray)
// // // // // // //     setYear(currentYear)

// // // // // // //     // Set up dynamic months for the current year
// // // // // // //     const currentMonthIndex = new Date().getMonth()
// // // // // // //     const remainingMonths = allMonths.slice(currentMonthIndex)
// // // // // // //     setAvailableMonths(remainingMonths)
// // // // // // //     setMonth(allMonths[currentMonthIndex])
// // // // // // //   }, [])

// // // // // // //   // **NEW**: Effect to update available months when the year changes
// // // // // // //   useEffect(() => {
// // // // // // //     const currentYear = new Date().getFullYear()
// // // // // // //     const currentMonthIndex = new Date().getMonth()

// // // // // // //     if (year === currentYear) {
// // // // // // //       const remainingMonths = allMonths.slice(currentMonthIndex)
// // // // // // //       setAvailableMonths(remainingMonths)
// // // // // // //       // If the current month is not in the new list, reset it
// // // // // // //       if (!remainingMonths.includes(month)) {
// // // // // // //         setMonth(remainingMonths[0])
// // // // // // //       }
// // // // // // //     } else {
// // // // // // //       setAvailableMonths(allMonths)
// // // // // // //     }
// // // // // // //   }, [year, month])

// // // // // // //   const handleInputChange = (empId, field, value) => {
// // // // // // //     if (isFrozen) {
// // // // // // //       setSnackbar({
// // // // // // //         open: true,
// // // // // // //         message: "Data is frozen. Please unfreeze to make changes.",
// // // // // // //         severity: "warning",
// // // // // // //       })
// // // // // // //       return
// // // // // // //     }
// // // // // // //     const numericValue = Number.parseFloat(value) || 0
// // // // // // //     setPayrollData((prevData) =>
// // // // // // //       prevData.map((emp) => (emp.empId === empId ? calculateTotals({ ...emp, [field]: numericValue }) : emp)),
// // // // // // //     )
// // // // // // //   }

// // // // // // //   // **NEW**: Handler for the "Save Changes" button on each row
// // // // // // //   const handleSaveChanges = (empId) => {
// // // // // // //     const employee = payrollData.find((e) => e.empId === empId)
// // // // // // //     // In a real application, you would send this data to a backend API
// // // // // // //     console.log("Saving changes for:", employee)
// // // // // // //     setSnackbar({
// // // // // // //       open: true,
// // // // // // //       message: `Changes for ${employee.name} saved successfully!`,
// // // // // // //       severity: "success",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleSort = (property) => {
// // // // // // //     const isAsc = orderBy === property && order === "asc"
// // // // // // //     setOrder(isAsc ? "desc" : "asc")
// // // // // // //     setOrderBy(property)
// // // // // // //   }

// // // // // // //   const getComparator = (order, orderBy) => {
// // // // // // //     return (a, b) => {
// // // // // // //       if (orderBy === "actions") return 0 // Don't sort by the actions column
// // // // // // //       let aVal = orderBy === "srNo" ? a.id : a[orderBy] || ""
// // // // // // //       let bVal = orderBy === "srNo" ? b.id : b[orderBy] || ""

// // // // // // //       if (typeof aVal === "string") aVal = aVal.toLowerCase()
// // // // // // //       if (typeof bVal === "string") bVal = bVal.toLowerCase()

// // // // // // //       if (aVal < bVal) return order === "asc" ? -1 : 1
// // // // // // //       if (aVal > bVal) return order === "asc" ? 1 : -1
// // // // // // //       return 0
// // // // // // //     }
// // // // // // //   }

// // // // // // //   const filteredData = payrollData.filter(
// // // // // // //     (emp) =>
// // // // // // //       emp.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // //       emp.empId.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // //       emp.dept.toLowerCase().includes(search.toLowerCase()),
// // // // // // //   )

// // // // // // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy))

// // // // // // //   const handleChangePage = (event, newPage) => setPage(newPage)

// // // // // // //   const handleChangeRowsPerPage = (event) => {
// // // // // // //     setRowsPerPage(Number.parseInt(event.target.value, 10))
// // // // // // //     setPage(0)
// // // // // // //   }

// // // // // // //   const handleFreezeData = () => {
// // // // // // //     setIsFrozen(true)
// // // // // // //     setFreezeDialog(false)
// // // // // // //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" })
// // // // // // //   }

// // // // // // //   const handleUnfreezeData = () => {
// // // // // // //     setIsFrozen(false)
// // // // // // //     setUnfreezeDialog(false)
// // // // // // //     setSnackbar({
// // // // // // //       open: true,
// // // // // // //       message: "Payroll data has been unfrozen. You can now make changes.",
// // // // // // //       severity: "info",
// // // // // // //     })
// // // // // // //   }

// // // // // // //   const handleDownloadExcel = () => {
// // // // // // //     setSnackbar({ open: true, message: "Excel file download started!", severity: "success" })
// // // // // // //   }

// // // // // // //   const renderCell = (employee, column) => {
// // // // // // //     const { id: field, editable } = column
// // // // // // //     const value = employee[field]

// // // // // // //     if (field === "actions") {
// // // // // // //       return (
// // // // // // //         <TableCell key={field} sx={{ padding: "4px" }}>
// // // // // // //           <Button
// // // // // // //             variant="contained"
// // // // // // //             size="small"
// // // // // // //             color="primary"
// // // // // // //             startIcon={<Save />}
// // // // // // //             onClick={() => handleSaveChanges(employee.empId)}
// // // // // // //             disabled={isFrozen}
// // // // // // //           >
// // // // // // //             Save
// // // // // // //           </Button>
// // // // // // //         </TableCell>
// // // // // // //       )
// // // // // // //     }

// // // // // // //     if (editable) {
// // // // // // //       return (
// // // // // // //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }}>
// // // // // // //           <TextField
// // // // // // //             size="small"
// // // // // // //             type="number"
// // // // // // //             value={value || 0}
// // // // // // //             onChange={(e) => handleInputChange(employee.empId, field, e.target.value)}
// // // // // // //             disabled={isFrozen}
// // // // // // //             sx={{
// // // // // // //               width: "100%",
// // // // // // //               "& .MuiInputBase-input": { textAlign: "right", padding: "4px 8px", fontSize: "0.875rem" },
// // // // // // //               "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" },
// // // // // // //             }}
// // // // // // //             inputProps={{ min: 0, step: 0.01 }}
// // // // // // //           />
// // // // // // //         </TableCell>
// // // // // // //       )
// // // // // // //     }

// // // // // // //     // **MODIFIED**: Logic for non-editable cells, with special handling for 'payableDays'
// // // // // // //     return (
// // // // // // //       <TableCell
// // // // // // //         key={field}
// // // // // // //         sx={{
// // // // // // //           whiteSpace: "nowrap",
// // // // // // //           minWidth: column.width,
// // // // // // //           textAlign: typeof value === "number" && field !== "payableDays" ? "right" : "left",
// // // // // // //           fontWeight: field.includes("total") || field === "netPay" ? "bold" : "normal",
// // // // // // //           backgroundColor: field.includes("total") || field === "netPay" ? "#f5f5f5" : "transparent",
// // // // // // //         }}
// // // // // // //       >
// // // // // // //         {field === "payableDays"
// // // // // // //           ? value
// // // // // // //           : typeof value === "number"
// // // // // // //           ? value.toLocaleString("en-IN", {
// // // // // // //               style: "currency",
// // // // // // //               currency: "INR",
// // // // // // //               minimumFractionDigits: 2,
// // // // // // //               maximumFractionDigits: 2,
// // // // // // //             })
// // // // // // //           : value}
// // // // // // //       </TableCell>
// // // // // // //     )
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // // // // // //       {/* Header */}
// // // // // // //       <Box sx={{ mb: 3 }}>
// // // // // // //         <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
// // // // // // //           Payroll Report - All Employees
// // // // // // //         </Typography>
// // // // // // //         <Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>
// // // // // // //           {isFrozen
// // // // // // //             ? "Payroll data is currently FROZEN. No changes can be made."
// // // // // // //             : "Payroll data is ACTIVE. You can make changes to editable fields."}
// // // // // // //         </Alert>
// // // // // // //       </Box>

// // // // // // //       {/* Controls Row 1 - Month, Year, Submit, Freeze */}
// // // // // // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // // // // // //         <Grid item xs={12} sm={6} md={3}>
// // // // // // //           <FormControl fullWidth size="small">
// // // // // // //             <InputLabel>Month</InputLabel>
// // // // // // //             <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>
// // // // // // //               {availableMonths.map((m) => (
// // // // // // //                 <MenuItem key={m} value={m}>
// // // // // // //                   {m}
// // // // // // //                 </MenuItem>
// // // // // // //               ))}
// // // // // // //             </Select>
// // // // // // //           </FormControl>
// // // // // // //         </Grid>
// // // // // // //         <Grid item xs={12} sm={6} md={3}>
// // // // // // //           <FormControl fullWidth size="small">
// // // // // // //             <InputLabel>Year</InputLabel>
// // // // // // //             <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>
// // // // // // //               {availableYears.map((y) => (
// // // // // // //                 <MenuItem key={y} value={y}>
// // // // // // //                   {y}
// // // // // // //                 </MenuItem>
// // // // // // //               ))}
// // // // // // //             </Select>
// // // // // // //           </FormControl>
// // // // // // //         </Grid>
// // // // // // //         <Grid item xs={12} sm={6} md={2}>
// // // // // // //           <Button variant="contained" fullWidth disabled={!month || !year || isFrozen} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>
// // // // // // //             Submit
// // // // // // //           </Button>
// // // // // // //         </Grid>
// // // // // // //         <Grid item xs={12} sm={6} md={4}>
// // // // // // //           <Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Freeze data to prevent changes"}>
// // // // // // //             <Button
// // // // // // //               variant={isFrozen ? "outlined" : "contained"}
// // // // // // //               color={isFrozen ? "warning" : "success"}
// // // // // // //               startIcon={isFrozen ? <LockOpen /> : <Lock />}
// // // // // // //               onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))}
// // // // // // //               fullWidth
// // // // // // //             >
// // // // // // //               {isFrozen ? "Unfreeze Data" : "Freeze Data"}
// // // // // // //             </Button>
// // // // // // //           </Tooltip>
// // // // // // //         </Grid>
// // // // // // //       </Grid>

// // // // // // //       {/* Controls Row 2 - Download, Search */}
// // // // // // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // // // // // //         <Grid item xs={12} sm={6} md={3}>
// // // // // // //           <Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>
// // // // // // //             Download Excel
// // // // // // //           </Button>
// // // // // // //         </Grid>
// // // // // // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}>
// // // // // // //           <TextField
// // // // // // //             label="Search Employee"
// // // // // // //             variant="outlined"
// // // // // // //             size="small"
// // // // // // //             fullWidth
// // // // // // //             value={search}
// // // // // // //             onChange={(e) => setSearch(e.target.value)}
// // // // // // //             InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }}
// // // // // // //           />
// // // // // // //         </Grid>
// // // // // // //       </Grid>

// // // // // // //       {/* Payroll Table */}
// // // // // // //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// // // // // // //         <Table stickyHeader size="small">
// // // // // // //           <TableHead>
// // // // // // //             {/* Header Row 1 - Group Headers **MODIFIED** with correct colSpans */}
// // // // // // //             <TableRow>
// // // // // // //               <TableCell align="center" colSpan={5} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell>
// // // // // // //               <TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell>
// // // // // // //               <TableCell align="center" colSpan={9} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell>
// // // // // // //               <TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell>
// // // // // // //             </TableRow>
// // // // // // //             {/* Header Row 2 - Column Headers */}
// // // // // // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // // // // // //               {columnHeaders.map((col) => (
// // // // // // //                 <TableCell
// // // // // // //                   key={col.id}
// // // // // // //                   sortDirection={orderBy === col.id ? order : false}
// // // // // // //                   sx={{
// // // // // // //                     fontWeight: "bold",
// // // // // // //                     textTransform: "uppercase",
// // // // // // //                     whiteSpace: "nowrap",
// // // // // // //                     minWidth: col.width,
// // // // // // //                     backgroundColor: col.editable ? "#fff3cd" : col.id === "actions" ? "#f5f5f5" : "#f5f5f5",
// // // // // // //                     borderBottom: "2px solid #dee2e6",
// // // // // // //                   }}
// // // // // // //                 >
// // // // // // //                   <TableSortLabel
// // // // // // //                     active={orderBy === col.id}
// // // // // // //                     direction={orderBy === col.id ? order : "asc"}
// // // // // // //                     onClick={() => handleSort(col.id)}
// // // // // // //                     disabled={col.id === "actions"}
// // // // // // //                   >
// // // // // // //                     {col.label}
// // // // // // //                     {col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}
// // // // // // //                   </TableSortLabel>
// // // // // // //                 </TableCell>
// // // // // // //               ))}
// // // // // // //             </TableRow>
// // // // // // //           </TableHead>

// // // // // // //           <TableBody>
// // // // // // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // // // // // //               <TableRow key={emp.empId} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0" } }}>
// // // // // // //                 <TableCell>{page * rowsPerPage + index + 1}</TableCell>
// // // // // // //                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>{emp.empId}</TableCell>
// // // // // // //                 <TableCell sx={{ fontWeight: "medium" }}>{emp.name}</TableCell>
// // // // // // //                 <TableCell>{emp.dept}</TableCell>
// // // // // // //                 {/* Render all other columns */}
// // // // // // //                 {columnHeaders.slice(4).map((col) => renderCell(emp, col))}
// // // // // // //               </TableRow>
// // // // // // //             ))}
// // // // // // //           </TableBody>
// // // // // // //         </Table>
// // // // // // //       </TableContainer>

// // // // // // //       {/* Pagination */}
// // // // // // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // // // // // //         <Grid item>
// // // // // // //           <Grid container alignItems="center" spacing={1}>
// // // // // // //             <Grid item><Typography variant="body2">Rows per page:</Typography></Grid>
// // // // // // //             <Grid item>
// // // // // // //               <FormControl size="small">
// // // // // // //                 <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>
// // // // // // //                   {[5, 10, 25, 50].map((rows) => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}
// // // // // // //                 </Select>
// // // // // // //               </FormControl>
// // // // // // //             </Grid>
// // // // // // //           </Grid>
// // // // // // //         </Grid>
// // // // // // //         <Grid item>
// // // // // // //           <Grid container spacing={1} alignItems="center">
// // // // // // //             <Grid item>
// // // // // // //               <Button variant="outlined" size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button>
// // // // // // //             </Grid>
// // // // // // //             <Grid item><Typography variant="body2">Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</Typography></Grid>
// // // // // // //             <Grid item>
// // // // // // //               <Button variant="outlined" size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>Next</Button>
// // // // // // //             </Grid>
// // // // // // //           </Grid>
// // // // // // //         </Grid>
// // // // // // //       </Grid>

// // // // // // //       {/* Dialogs and Snackbar */}
// // // // // // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}>
// // // // // // //         <DialogTitle><Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Lock color="warning" />Freeze Payroll Data</Box></DialogTitle>
// // // // // // //         <DialogContent><DialogContentText>Are you sure you want to freeze the payroll data? Once frozen, no changes can be made.</DialogContentText></DialogContent>
// // // // // // //         <DialogActions>
// // // // // // //           <Button onClick={() => setFreezeDialog(false)}>Cancel</Button>
// // // // // // //           <Button onClick={handleFreezeData} variant="contained" color="warning">Freeze Data</Button>
// // // // // // //         </DialogActions>
// // // // // // //       </Dialog>
// // // // // // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}>
// // // // // // //         <DialogTitle><Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><LockOpen color="success" />Unfreeze Payroll Data</Box></DialogTitle>
// // // // // // //         <DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow changes to be made.</DialogContentText></DialogContent>
// // // // // // //         <DialogActions>
// // // // // // //           <Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button>
// // // // // // //           <Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button>
// // // // // // //         </DialogActions>
// // // // // // //       </Dialog>
// // // // // // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
// // // // // // //         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
// // // // // // //       </Snackbar>
// // // // // // //     </Container>
// // // // // // //   )
// // // // // // // }

// // // // // // // export default PayrollReport;


// // // // // // import { useState, useEffect } from "react"
// // // // // // import {
// // // // // //   Container,
// // // // // //   Grid,
// // // // // //   Button,
// // // // // //   TextField,
// // // // // //   Select,
// // // // // //   MenuItem,
// // // // // //   InputLabel,
// // // // // //   FormControl,
// // // // // //   Table,
// // // // // //   TableBody,
// // // // // //   TableCell,
// // // // // //   TableContainer,
// // // // // //   TableHead,
// // // // // //   TableRow,
// // // // // //   Paper,
// // // // // //   TableSortLabel,
// // // // // //   Dialog,
// // // // // //   DialogTitle,
// // // // // //   DialogContent,
// // // // // //   DialogActions,
// // // // // //   DialogContentText,
// // // // // //   Alert,
// // // // // //   Snackbar,
// // // // // //   Box,
// // // // // //   Typography,
// // // // // //   Tooltip,
// // // // // // } from "@mui/material"
// // // // // // import { Lock, LockOpen, Download, Search, Save, Check } from "@mui/icons-material" // **MODIFIED**: Imported Check icon

// // // // // // // Full list of months for dynamic generation
// // // // // // const allMonths = [
// // // // // //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // // // // // ]

// // // // // // // Initial payroll data with PF capped at 1800
// // // // // // const initialPayrollData = [
// // // // // //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR", payableDays: 30, basic: 25000, hra: 12500, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 750, pt: 200, mlwf: 0, advance: 0, tds: 2500, arrearsD: 0, otherDeduction: 0 },
// // // // // //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales", payableDays: 30, basic: 22000, hra: 11000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 660, pt: 200, mlwf: 0, advance: 0, tds: 2000, arrearsD: 0, otherDeduction: 0 },
// // // // // //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales", payableDays: 30, basic: 20000, hra: 10000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 600, pt: 200, mlwf: 0, advance: 0, tds: 1800, arrearsD: 0, otherDeduction: 0 },
// // // // // //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase", payableDays: 30, basic: 18000, hra: 9000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 540, pt: 200, mlwf: 0, advance: 0, tds: 1500, arrearsD: 0, otherDeduction: 0 },
// // // // // //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT", payableDays: 30, basic: 30000, hra: 15000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 900, pt: 200, mlwf: 0, advance: 0, tds: 3500, arrearsD: 0, otherDeduction: 0 },
// // // // // //   { id: 6, empId: "V0022", name: "Pooja Jadhav", dept: "IT", payableDays: 30, basic: 28000, hra: 14000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 840, pt: 200, mlwf: 0, advance: 0, tds: 3000, arrearsD: 0, otherDeduction: 0 },
// // // // // //   { id: 7, empId: "V0023", name: "Shubham Kulkarni", dept: "Admin", payableDays: 30, basic: 24000, hra: 12000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 720, pt: 200, mlwf: 0, advance: 0, tds: 2200, arrearsD: 0, otherDeduction: 0 },
// // // // // // ]

// // // // // // // Column headers include a new "Actions" column
// // // // // // const columnHeaders = [
// // // // // //   { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESICS", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100, editable: true }, { id: "advance", label: "Advance", width: 100, editable: true }, { id: "tds", label: "TDS", width: 100, editable: true }, { id: "arrearsD", label: "Arrears", width: 100, editable: true }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },
// // // // // // ]

// // // // // // const PayrollReport = () => {
// // // // // //   const [month, setMonth] = useState("")
// // // // // //   const [year, setYear] = useState("")
// // // // // //   const [availableMonths, setAvailableMonths] = useState(allMonths)
// // // // // //   const [availableYears, setAvailableYears] = useState([])
// // // // // //   const [search, setSearch] = useState("")
// // // // // //   const [page, setPage] = useState(0)
// // // // // //   const [rowsPerPage, setRowsPerPage] = useState(5)
// // // // // //   const [orderBy, setOrderBy] = useState("name")
// // // // // //   const [order, setOrder] = useState("asc")
// // // // // //   const [payrollData, setPayrollData] = useState([])
// // // // // //   const [isFrozen, setIsFrozen] = useState(false)
// // // // // //   const [freezeDialog, setFreezeDialog] = useState(false)
// // // // // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false)
// // // // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
// // // // // //   // **NEW**: State to track which rows have been saved
// // // // // //   const [savedRows, setSavedRows] = useState(new Set())

// // // // // //   // Calculate totals for each employee
// // // // // //   const calculateTotals = (employee) => {
// // // // // //     const totalEarnings = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + (employee.medical || 0) + (employee.arrearsE || 0)
// // // // // //     const totalDeduction = (employee.pf || 0) + (employee.esics || 0) + (employee.pt || 0) + (employee.mlwf || 0) + (employee.advance || 0) + (employee.tds || 0) + (employee.otherDeduction || 0)
// // // // // //     const netPay = totalEarnings - totalDeduction
// // // // // //     return { ...employee, totalEarnings, totalDeduction, netPay }
// // // // // //   }

// // // // // //   // Effect to initialize data and dynamic date dropdowns
// // // // // //   useEffect(() => {
// // // // // //     setPayrollData(initialPayrollData.map(calculateTotals))
// // // // // //     const currentYear = new Date().getFullYear()
// // // // // //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear + i)
// // // // // //     setAvailableYears(yearsArray)
// // // // // //     setYear(currentYear)
// // // // // //     const currentMonthIndex = new Date().getMonth()
// // // // // //     const remainingMonths = allMonths.slice(currentMonthIndex)
// // // // // //     setAvailableMonths(remainingMonths)
// // // // // //     setMonth(allMonths[currentMonthIndex])
// // // // // //   }, [])

// // // // // //   // Effect to update available months when the year changes
// // // // // //   useEffect(() => {
// // // // // //     const currentYear = new Date().getFullYear()
// // // // // //     const currentMonthIndex = new Date().getMonth()
// // // // // //     if (year === currentYear) {
// // // // // //       const remainingMonths = allMonths.slice(currentMonthIndex)
// // // // // //       setAvailableMonths(remainingMonths)
// // // // // //       if (!remainingMonths.includes(month)) {
// // // // // //         setMonth(remainingMonths[0])
// // // // // //       }
// // // // // //     } else {
// // // // // //       setAvailableMonths(allMonths)
// // // // // //     }
// // // // // //   }, [year, month])

// // // // // //   // **MODIFIED**: handleInputChange now resets the saved state for the edited row
// // // // // //   const handleInputChange = (empId, field, value) => {
// // // // // //     if (isFrozen) {
// // // // // //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" })
// // // // // //       return
// // // // // //     }

// // // // // //     // When a value changes, remove the row from the 'saved' set to re-enable the save button
// // // // // //     setSavedRows((prev) => {
// // // // // //       const newSet = new Set(prev)
// // // // // //       newSet.delete(empId)
// // // // // //       return newSet
// // // // // //     })

// // // // // //     const numericValue = Number.parseFloat(value) || 0
// // // // // //     setPayrollData((prevData) => prevData.map((emp) => (emp.empId === empId ? calculateTotals({ ...emp, [field]: numericValue }) : emp)))
// // // // // //   }

// // // // // //   // **MODIFIED**: handleSaveChanges now updates the savedRows state
// // // // // //   const handleSaveChanges = (empId) => {
// // // // // //     const employee = payrollData.find((e) => e.empId === empId)
// // // // // //     console.log("Saving changes for:", employee) // In a real app, you'd make an API call here.
    
// // // // // //     // Add the row to the 'saved' set
// // // // // //     setSavedRows((prev) => new Set(prev).add(empId))
    
// // // // // //     // Show the success alert
// // // // // //     setSnackbar({
// // // // // //       open: true,
// // // // // //       message: `Changes for ${employee.name} saved successfully!`,
// // // // // //       severity: "success",
// // // // // //     })
// // // // // //   }

// // // // // //   const handleSort = (property) => {
// // // // // //     const isAsc = orderBy === property && order === "asc"
// // // // // //     setOrder(isAsc ? "desc" : "asc")
// // // // // //     setOrderBy(property)
// // // // // //   }

// // // // // //   const getComparator = (order, orderBy) => {
// // // // // //     return (a, b) => {
// // // // // //       if (orderBy === "actions") return 0
// // // // // //       let aVal = orderBy === "srNo" ? a.id : a[orderBy] || ""
// // // // // //       let bVal = orderBy === "srNo" ? b.id : b[orderBy] || ""
// // // // // //       if (typeof aVal === "string") aVal = aVal.toLowerCase()
// // // // // //       if (typeof bVal === "string") bVal = bVal.toLowerCase()
// // // // // //       if (aVal < bVal) return order === "asc" ? -1 : 1
// // // // // //       if (aVal > bVal) return order === "asc" ? 1 : -1
// // // // // //       return 0
// // // // // //     }
// // // // // //   }

// // // // // //   const filteredData = payrollData.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()) || emp.dept.toLowerCase().includes(search.toLowerCase()))
// // // // // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy))
// // // // // //   const handleChangePage = (event, newPage) => setPage(newPage)
// // // // // //   const handleChangeRowsPerPage = (event) => {
// // // // // //     setRowsPerPage(Number.parseInt(event.target.value, 10))
// // // // // //     setPage(0)
// // // // // //   }
// // // // // //   const handleFreezeData = () => {
// // // // // //     setIsFrozen(true)
// // // // // //     setFreezeDialog(false)
// // // // // //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" })
// // // // // //   }
// // // // // //   const handleUnfreezeData = () => {
// // // // // //     setIsFrozen(false)
// // // // // //     setUnfreezeDialog(false)
// // // // // //     setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" })
// // // // // //   }
// // // // // //   const handleDownloadExcel = () => {
// // // // // //     setSnackbar({ open: true, message: "Excel file download started!", severity: "success" })
// // // // // //   }

// // // // // //   // **MODIFIED**: renderCell now handles the dynamic state of the Save button
// // // // // //   const renderCell = (employee, column) => {
// // // // // //     const { id: field, editable } = column
// // // // // //     const value = employee[field]

// // // // // //     if (field === "actions") {
// // // // // //       const isSaved = savedRows.has(employee.empId)
// // // // // //       return (
// // // // // //         <TableCell key={field} sx={{ padding: "4px" }}>
// // // // // //           <Button
// // // // // //             variant="contained"
// // // // // //             size="small"
// // // // // //             color={isSaved ? "success" : "primary"}
// // // // // //             startIcon={isSaved ? <Check /> : <Save />}
// // // // // //             onClick={() => handleSaveChanges(employee.empId)}
// // // // // //             disabled={isFrozen || isSaved}
// // // // // //             sx={{ width: "100px" }}
// // // // // //           >
// // // // // //             {isSaved ? "Saved" : "Save"}
// // // // // //           </Button>
// // // // // //         </TableCell>
// // // // // //       )
// // // // // //     }

// // // // // //     if (editable) {
// // // // // //       return (
// // // // // //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }}>
// // // // // //           <TextField
// // // // // //             size="small"
// // // // // //             type="number"
// // // // // //             value={value || 0}
// // // // // //             onChange={(e) => handleInputChange(employee.empId, field, e.target.value)}
// // // // // //             disabled={isFrozen}
// // // // // //             sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }}
// // // // // //             inputProps={{ min: 0, step: 0.01 }}
// // // // // //           />
// // // // // //         </TableCell>
// // // // // //       )
// // // // // //     }

// // // // // //     return (
// // // // // //       <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: typeof value === "number" && field !== "payableDays" ? "right" : "left", fontWeight: field.includes("total") || field === "netPay" ? "bold" : "normal", backgroundColor: field.includes("total") || field === "netPay" ? "#f5f5f5" : "transparent" }}>
// // // // // //         {field === "payableDays" ? value : typeof value === "number" ? value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}
// // // // // //       </TableCell>
// // // // // //     )
// // // // // //   }

// // // // // //   return (
// // // // // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // // // // //       <Box sx={{ mb: 3 }}>
// // // // // //         <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography>
// // // // // //         <Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>
// // // // // //           {isFrozen ? "Payroll data is currently FROZEN. No changes can be made." : "Payroll data is ACTIVE. You can make changes to editable fields."}
// // // // // //         </Alert>
// // // // // //       </Box>

// // // // // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // // // // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{availableMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// // // // // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// // // // // //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth disabled={!month || !year || isFrozen} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>Submit</Button></Grid>
// // // // // //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Freeze data to prevent changes"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "success"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Freeze Data"}</Button></Tooltip></Grid>
// // // // // //       </Grid>

// // // // // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // // // // //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// // // // // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search Employee" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// // // // // //       </Grid>

// // // // // //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// // // // // //         <Table stickyHeader size="small">
// // // // // //           <TableHead>
// // // // // //             <TableRow><TableCell align="center" colSpan={5} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={9} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>
// // // // // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // // // // //               {columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={col.id === "actions"}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}
// // // // // //             </TableRow>
// // // // // //           </TableHead>
// // // // // //           <TableBody>
// // // // // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // // // // //               <TableRow key={emp.empId} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0" } }}>
// // // // // //                 <TableCell>{page * rowsPerPage + index + 1}</TableCell>
// // // // // //                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>{emp.empId}</TableCell>
// // // // // //                 <TableCell sx={{ fontWeight: "medium" }}>{emp.name}</TableCell>
// // // // // //                 <TableCell>{emp.dept}</TableCell>
// // // // // //                 {columnHeaders.slice(4).map((col) => renderCell(emp, col))}
// // // // // //               </TableRow>
// // // // // //             ))}
// // // // // //           </TableBody>
// // // // // //         </Table>
// // // // // //       </TableContainer>

// // // // // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // // // // //         <Grid item><Grid container alignItems="center" spacing={1}><Grid item><Typography variant="body2">Rows per page:</Typography></Grid><Grid item><FormControl size="small"><Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>{[5, 10, 25, 50].map((rows) => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}</Select></FormControl></Grid></Grid></Grid>
// // // // // //         <Grid item><Grid container spacing={1} alignItems="center"><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button></Grid><Grid item><Typography variant="body2">Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</Typography></Grid><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>Next</Button></Grid></Grid></Grid>
// // // // // //       </Grid>

// // // // // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle><Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Lock color="warning" />Freeze Payroll Data</Box></DialogTitle><DialogContent><DialogContentText>Are you sure you want to freeze the payroll data? Once frozen, no changes can be made.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="warning">Freeze Data</Button></DialogActions></Dialog>
// // // // // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle><Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><LockOpen color="success" />Unfreeze Payroll Data</Box></DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow changes to be made.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
// // // // // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert></Snackbar>
// // // // // //     </Container>
// // // // // //   )
// // // // // // }

// // // // // // export default PayrollReport



// // // // // import { useState, useEffect } from "react"
// // // // // import {
// // // // //   Container,
// // // // //   Grid,
// // // // //   Button,
// // // // //   TextField,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   InputLabel,
// // // // //   FormControl,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   Paper,
// // // // //   TableSortLabel,
// // // // //   Dialog,
// // // // //   DialogTitle,
// // // // //   DialogContent,
// // // // //   DialogActions,
// // // // //   DialogContentText,
// // // // //   Alert,
// // // // //   Snackbar,
// // // // //   Box,
// // // // //   Typography,
// // // // //   Tooltip,
// // // // //   Divider,
// // // // // } from "@mui/material"
// // // // // import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance } from "@mui/icons-material"

// // // // // const allMonths = [
// // // // //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // // // // ]

// // // // // // **MODIFIED**: Data now includes banking and statutory details
// // // // // const initialPayrollData = [
// // // // //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR", payableDays: 30, basic: 25000, hra: 12500, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 750, pt: 200, mlwf: 0, advance: 0, tds: 2500, arrearsD: 0, otherDeduction: 0, accountTitle: "Mangesh S Ghadigaonkar", accountNumber: "12345678901", bankName: "HDFC Bank", ifscCode: "HDFC0001234", bankBranch: "Mumbai Central", pfNumber: "MH/PUN/12345", panNumber: "ABCDE1234F", esicNumber: "1234567890" },
// // // // //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales", payableDays: 30, basic: 22000, hra: 11000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 660, pt: 200, mlwf: 0, advance: 0, tds: 2000, arrearsD: 0, otherDeduction: 0, accountTitle: "Kumar V Patil", accountNumber: "23456789012", bankName: "ICICI Bank", ifscCode: "ICIC0002345", bankBranch: "Pune", pfNumber: "MH/PUN/23456", panNumber: "BCDEF2345G", esicNumber: "2345678901" },
// // // // //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales", payableDays: 30, basic: 20000, hra: 10000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 600, pt: 200, mlwf: 0, advance: 0, tds: 1800, arrearsD: 0, otherDeduction: 0, accountTitle: "Ganesh R Mohite", accountNumber: "34567890123", bankName: "Axis Bank", ifscCode: "AXIS0003456", bankBranch: "Nashik", pfNumber: "MH/PUN/34567", panNumber: "CDEFG3456H", esicNumber: "3456789012" },
// // // // //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase", payableDays: 30, basic: 18000, hra: 9000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 540, pt: 200, mlwf: 0, advance: 0, tds: 1500, arrearsD: 0, otherDeduction: 0, accountTitle: "Rupali P Mali", accountNumber: "45678901234", bankName: "State Bank of India", ifscCode: "SBIN0004567", bankBranch: "Mumbai", pfNumber: "MH/PUN/45678", panNumber: "DEFG45678I", esicNumber: "4567890123" },
// // // // //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT", payableDays: 30, basic: 30000, hra: 15000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 900, pt: 200, mlwf: 0, advance: 0, tds: 3500, arrearsD: 0, otherDeduction: 0, accountTitle: "Sameer K Pawar", accountNumber: "56789012345", bankName: "Kotak Mahindra Bank", ifscCode: "KKBK0005678", bankBranch: "Bengaluru", pfNumber: "MH/PUN/56789", panNumber: "EFGHI5678J", esicNumber: "5678901234" },
// // // // // ];

// // // // // const columnHeaders = [
// // // // //   { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESICS", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100, editable: true }, { id: "advance", label: "Advance", width: 100, editable: true }, { id: "tds", label: "TDS", width: 100, editable: true }, { id: "arrearsD", label: "Arrears", width: 100, editable: true }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },
// // // // // ];

// // // // // const PayrollReport = () => {
// // // // //   const [month, setMonth] = useState("");
// // // // //   const [year, setYear] = useState("");
// // // // //   const [availableMonths, setAvailableMonths] = useState(allMonths);
// // // // //   const [availableYears, setAvailableYears] = useState([]);
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [page, setPage] = useState(0);
// // // // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // // // //   const [orderBy, setOrderBy] = useState("name");
// // // // //   const [order, setOrder] = useState("asc");
// // // // //   const [payrollData, setPayrollData] = useState([]);
// // // // //   const [isFrozen, setIsFrozen] = useState(false);
// // // // //   const [freezeDialog, setFreezeDialog] = useState(false);
// // // // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
// // // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
// // // // //   const [savedRows, setSavedRows] = useState(new Set());
// // // // //   // **NEW**: State for the employee details dialog
// // // // //   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
// // // // //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// // // // //   const calculateTotals = (employee) => {
// // // // //     const totalEarnings = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + (employee.medical || 0) + (employee.arrearsE || 0);
// // // // //     const totalDeduction = (employee.pf || 0) + (employee.esics || 0) + (employee.pt || 0) + (employee.mlwf || 0) + (employee.advance || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);
// // // // //     const netPay = totalEarnings - totalDeduction;
// // // // //     return { ...employee, totalEarnings, totalDeduction, netPay };
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     setPayrollData(initialPayrollData.map(calculateTotals));
// // // // //     const currentYear = new Date().getFullYear();
// // // // //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear + i);
// // // // //     setAvailableYears(yearsArray);
// // // // //     setYear(currentYear);
// // // // //     const currentMonthIndex = new Date().getMonth();
// // // // //     const remainingMonths = allMonths.slice(currentMonthIndex);
// // // // //     setAvailableMonths(remainingMonths);
// // // // //     setMonth(allMonths[currentMonthIndex]);
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const currentYear = new Date().getFullYear();
// // // // //     const currentMonthIndex = new Date().getMonth();
// // // // //     if (year === currentYear) {
// // // // //       const remainingMonths = allMonths.slice(currentMonthIndex);
// // // // //       setAvailableMonths(remainingMonths);
// // // // //       if (!remainingMonths.includes(month)) {
// // // // //         setMonth(remainingMonths[0]);
// // // // //       }
// // // // //     } else {
// // // // //       setAvailableMonths(allMonths);
// // // // //     }
// // // // //   }, [year, month]);

// // // // //   const handleInputChange = (empId, field, value) => {
// // // // //     if (isFrozen) {
// // // // //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
// // // // //       return;
// // // // //     }
// // // // //     setSavedRows((prev) => {
// // // // //       const newSet = new Set(prev);
// // // // //       newSet.delete(empId);
// // // // //       return newSet;
// // // // //     });
// // // // //     const numericValue = Number.parseFloat(value) || 0;
// // // // //     setPayrollData((prevData) => prevData.map((emp) => (emp.empId === empId ? calculateTotals({ ...emp, [field]: numericValue }) : emp)));
// // // // //   };

// // // // //   const handleSaveChanges = (empId) => {
// // // // //     const employee = payrollData.find((e) => e.empId === empId);
// // // // //     console.log("Saving changes for:", employee);
// // // // //     setSavedRows((prev) => new Set(prev).add(empId));
// // // // //     setSnackbar({ open: true, message: `Changes for ${employee.name} saved successfully!`, severity: "success" });
// // // // //   };

// // // // //   // **NEW**: Handler to open the details dialog
// // // // //   const handleRowClick = (employee) => {
// // // // //     setSelectedEmployee(employee);
// // // // //     setDetailsDialogOpen(true);
// // // // //   };

// // // // //   // **NEW**: Handler to close the details dialog
// // // // //   const handleDetailsDialogClose = () => {
// // // // //     setDetailsDialogOpen(false);
// // // // //     setSelectedEmployee(null);
// // // // //   };

// // // // //   const handleSort = (property) => {
// // // // //     const isAsc = orderBy === property && order === "asc";
// // // // //     setOrder(isAsc ? "desc" : "asc");
// // // // //     setOrderBy(property);
// // // // //   };

// // // // //   const getComparator = (order, orderBy) => {
// // // // //     return (a, b) => {
// // // // //       if (orderBy === "actions") return 0;
// // // // //       let aVal = orderBy === "srNo" ? a.id : a[orderBy] || "";
// // // // //       let bVal = orderBy === "srNo" ? b.id : b[orderBy] || "";
// // // // //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// // // // //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// // // // //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// // // // //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// // // // //       return 0;
// // // // //     };
// // // // //   };

// // // // //   const filteredData = payrollData.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()) || emp.dept.toLowerCase().includes(search.toLowerCase()));
// // // // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy));
// // // // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // // // //   const handleChangeRowsPerPage = (event) => {
// // // // //     setRowsPerPage(Number.parseInt(event.target.value, 10));
// // // // //     setPage(0);
// // // // //   };
// // // // //   const handleFreezeData = () => {
// // // // //     setIsFrozen(true);
// // // // //     setFreezeDialog(false);
// // // // //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" });
// // // // //   };
// // // // //   const handleUnfreezeData = () => {
// // // // //     setIsFrozen(false);
// // // // //     setUnfreezeDialog(false);
// // // // //     setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" });
// // // // //   };
// // // // //   const handleDownloadExcel = () => {
// // // // //     setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
// // // // //   };

// // // // //   const renderCell = (employee, column) => {
// // // // //     const { id: field, editable } = column;
// // // // //     const value = employee[field];

// // // // //     // Clicks on action buttons should not trigger the row click
// // // // //     if (field === "actions") {
// // // // //       const isSaved = savedRows.has(employee.empId);
// // // // //       return (
// // // // //         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // // // //           <Button variant="contained" size="small" color={isSaved ? "success" : "primary"} startIcon={isSaved ? <Check /> : <Save />} onClick={() => handleSaveChanges(employee.empId)} disabled={isFrozen || isSaved} sx={{ width: "100px" }}>
// // // // //             {isSaved ? "Saved" : "Save"}
// // // // //           </Button>
// // // // //         </TableCell>
// // // // //       );
// // // // //     }

// // // // //     // Clicks on editable fields should not trigger the row click
// // // // //     if (editable) {
// // // // //       return (
// // // // //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // // // //           <TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} />
// // // // //         </TableCell>
// // // // //       );
// // // // //     }

// // // // //     return (
// // // // //       <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: typeof value === "number" && field !== "payableDays" ? "right" : "left", fontWeight: field.includes("total") || field === "netPay" ? "bold" : "normal", backgroundColor: field.includes("total") || field === "netPay" ? "#f5f5f5" : "transparent" }}>
// // // // //         {field === "payableDays" ? value : typeof value === "number" ? value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}
// // // // //       </TableCell>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // // // //       {/* Header and Controls */}
// // // // //       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? "Payroll data is currently FROZEN." : "Payroll data is ACTIVE."}</Alert></Box>
// // // // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // // // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{availableMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// // // // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// // // // //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth disabled={!month || !year || isFrozen} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>Submit</Button></Grid>
// // // // //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data" : "Freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "success"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Freeze Data"}</Button></Tooltip></Grid>
// // // // //       </Grid>
// // // // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // // // //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// // // // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search Employee" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// // // // //       </Grid>

// // // // //       {/* Payroll Table */}
// // // // //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// // // // //         <Table stickyHeader size="small">
// // // // //           <TableHead>
// // // // //             <TableRow><TableCell align="center" colSpan={5} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={9} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>
// // // // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // // // //               {columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={col.id === "actions"}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}
// // // // //             </TableRow>
// // // // //           </TableHead>
// // // // //           <TableBody>
// // // // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // // // //               <TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>
// // // // //                 <TableCell>{page * rowsPerPage + index + 1}</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>{emp.empId}</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: "medium" }}>{emp.name}</TableCell>
// // // // //                 <TableCell>{emp.dept}</TableCell>
// // // // //                 {columnHeaders.slice(4).map((col) => renderCell(emp, col))}
// // // // //               </TableRow>
// // // // //             ))}
// // // // //           </TableBody>
// // // // //         </Table>
// // // // //       </TableContainer>

// // // // //       {/* Pagination */}
// // // // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // // // //         <Grid item><Grid container alignItems="center" spacing={1}><Grid item><Typography variant="body2">Rows per page:</Typography></Grid><Grid item><FormControl size="small"><Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>{[5, 10, 25, 50].map((rows) => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}</Select></FormControl></Grid></Grid></Grid>
// // // // //         <Grid item><Grid container spacing={1} alignItems="center"><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button></Grid><Grid item><Typography variant="body2">Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</Typography></Grid><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>Next</Button></Grid></Grid></Grid>
// // // // //       </Grid>

// // // // //       {/* Dialogs */}
// // // // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Freeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to freeze the payroll data?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="warning">Freeze Data</Button></DialogActions></Dialog>
// // // // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>

// // // // //       {/* **NEW**: Employee Details Dialog */}
// // // // //       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>
// // // // //         {selectedEmployee && (
// // // // //           <>
// // // // //             <DialogTitle>
// // // // //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // // //                 <AccountBalance color="primary" />
// // // // //                 <Box>
// // // // //                     <Typography variant="h6" component="div">{selectedEmployee.name}</Typography>
// // // // //                     <Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             </DialogTitle>
// // // // //             <DialogContent dividers>
// // // // //                 <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking Details</Typography>
// // // // //                 <Grid container spacing={2}>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid>
// // // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid>
              
// // // // //                 </Grid>
              
                    
// // // // //             </DialogContent>
// // // // //             <DialogActions>
// // // // //               <Button onClick={handleDetailsDialogClose}>Close</Button>
// // // // //             </DialogActions>
// // // // //           </>
// // // // //         )}
// // // // //       </Dialog>
      
// // // // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert></Snackbar>
// // // // //     </Container>
// // // // //   );
// // // // // };

// // // // // export default PayrollReport;





// // // // import { useState, useEffect } from "react"
// // // // import {
// // // //   Container,
// // // //   Grid,
// // // //   Button,
// // // //   TextField,
// // // //   Select,
// // // //   MenuItem,
// // // //   InputLabel,
// // // //   FormControl,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   Paper,
// // // //   TableSortLabel,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   DialogContentText,
// // // //   Alert,
// // // //   Snackbar,
// // // //   Box,
// // // //   Typography,
// // // //   Tooltip,
// // // // } from "@mui/material"
// // // // import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance } from "@mui/icons-material"

// // // // const allMonths = [
// // // //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // // // ]

// // // // // **MODIFIED**: Data now includes designation, gender, esic applicability, and banking/statutory details
// // // // const initialPayrollData = [
// // // //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR", designation: "Manager", gender: "Male", esicApplicable: "No", payableDays: 30, basic: 25000, hra: 12500, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 750, pt: 200, mlwf: 0, tds: 2500, otherDeduction: 0, accountTitle: "Mangesh S Ghadigaonkar", accountNumber: "12345678901", bankName: "HDFC Bank", ifscCode: "HDFC0001234", bankBranch: "Mumbai Central", pfNumber: "MH/PUN/12345", panNumber: "ABCDE1234F", esicNumber: "1234567890" },
// // // //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales", designation: "Executive", gender: "Male", esicApplicable: "No", payableDays: 30, basic: 22000, hra: 11000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 660, pt: 200, mlwf: 0, tds: 2000, otherDeduction: 0, accountTitle: "Kumar V Patil", accountNumber: "23456789012", bankName: "ICICI Bank", ifscCode: "ICIC0002345", bankBranch: "Pune", pfNumber: "MH/PUN/23456", panNumber: "BCDEF2345G", esicNumber: "2345678901" },
// // // //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales", designation: "Trainee", gender: "Male", esicApplicable: "Yes", payableDays: 30, basic: 20000, hra: 10000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 600, pt: 200, mlwf: 0, tds: 1800, otherDeduction: 0, accountTitle: "Ganesh R Mohite", accountNumber: "34567890123", bankName: "Axis Bank", ifscCode: "AXIS0003456", bankBranch: "Nashik", pfNumber: "MH/PUN/34567", panNumber: "CDEFG3456H", esicNumber: "3456789012" },
// // // //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase", designation: "Associate", gender: "Female", esicApplicable: "Yes", payableDays: 30, basic: 18000, hra: 9000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 540, pt: 200, mlwf: 0, tds: 1500, otherDeduction: 0, accountTitle: "Rupali P Mali", accountNumber: "45678901234", bankName: "State Bank of India", ifscCode: "SBIN0004567", bankBranch: "Mumbai", pfNumber: "MH/PUN/45678", panNumber: "DEFG45678I", esicNumber: "4567890123" },
// // // //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT", designation: "Developer", gender: "Male", esicApplicable: "No", payableDays: 30, basic: 30000, hra: 15000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, esics: 900, pt: 200, mlwf: 0, tds: 3500, otherDeduction: 0, accountTitle: "Sameer K Pawar", accountNumber: "56789012345", bankName: "Kotak Mahindra Bank", ifscCode: "KKBK0005678", bankBranch: "Bengaluru", pfNumber: "MH/PUN/56789", panNumber: "EFGHI5678J", esicNumber: "5678901234" },
// // // // ];

// // // // // **MODIFIED**: Column headers updated for new structure
// // // // const columnHeaders = [
// // // //   // EMPLOYEE DETAILS (9)
// // // //   { id: "srNo", label: "Sr. No.", width: 80 },
// // // //   { id: "empId", label: "Employee ID", width: 120 },
// // // //   { id: "name", label: "Employee Name", width: 200 },
// // // //   { id: "dept", label: "Department", width: 120 },
// // // //   { id: "designation", label: "Designation", width: 150 },
// // // //   { id: "gender", label: "Gender", width: 100 },
// // // //   { id: "grossSalary", label: "Gross Salary", width: 130 },
// // // //   { id: "payableDays", label: "Payable Days", width: 120 },
// // // //   { id: "esicApplicable", label: "ESIC (Y/N)", width: 100 },
// // // //   // EARNINGS (6)
// // // //   { id: "basic", label: "Basic", width: 100 },
// // // //   { id: "hra", label: "HRA", width: 100 },
// // // //   { id: "conveyance", label: "Conveyance", width: 120 },
// // // //   { id: "medical", label: "Medical", width: 100 },
// // // //   { id: "arrearsE", label: "Arrears", width: 100, editable: true },
// // // //   { id: "grossEarning", label: "Gross Earning", width: 130 },
// // // //   // DEDUCTIONS (7)
// // // //   { id: "pf", label: "PF", width: 100 },
// // // //   { id: "esics", label: "ESIC", width: 100 },
// // // //   { id: "pt", label: "PT", width: 80 },
// // // //   { id: "mlwf", label: "MLWF", width: 100, editable: true },
// // // //   { id: "tds", label: "TDS", width: 100, editable: true },
// // // //   { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true },
// // // //   { id: "totalDeduction", label: "Total Deduction", width: 140 },
// // // //   // SUMMARY & ACTIONS (2)
// // // //   { id: "netPay", label: "Net Pay", width: 120 },
// // // //   { id: "actions", label: "Actions", width: 150 },
// // // // ];

// // // // const PayrollReport = () => {
// // // //   const [month, setMonth] = useState("");
// // // //   const [year, setYear] = useState("");
// // // //   const [availableMonths, setAvailableMonths] = useState(allMonths);
// // // //   const [availableYears, setAvailableYears] = useState([]);
// // // //   const [search, setSearch] = useState("");
// // // //   const [page, setPage] = useState(0);
// // // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // // //   const [orderBy, setOrderBy] = useState("name");
// // // //   const [order, setOrder] = useState("asc");
// // // //   const [payrollData, setPayrollData] = useState([]);
// // // //   const [isFrozen, setIsFrozen] = useState(false);
// // // //   const [freezeDialog, setFreezeDialog] = useState(false);
// // // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
// // // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
// // // //   const [savedRows, setSavedRows] = useState(new Set());
// // // //   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
// // // //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// // // //   // **MODIFIED**: Rewritten to handle new calculations
// // // //   const calculateTotals = (employee) => {
// // // //     const grossSalary = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + (employee.medical || 0);
// // // //     const grossEarning = grossSalary + (employee.arrearsE || 0);
// // // //     const esicDeduction = employee.esicApplicable === 'Yes' ? (employee.esics || 0) : 0;
// // // //     const totalDeduction = (employee.pf || 0) + esicDeduction + (employee.pt || 0) + (employee.mlwf || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);
// // // //     const netPay = grossEarning - totalDeduction;
// // // //     return { ...employee, grossSalary, grossEarning, totalDeduction, netPay };
// // // //   };

// // // //   useEffect(() => {
// // // //     setPayrollData(initialPayrollData.map(calculateTotals));
// // // //     const currentYear = new Date().getFullYear();
// // // //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear + i);
// // // //     setAvailableYears(yearsArray);
// // // //     setYear(currentYear);
// // // //     const currentMonthIndex = new Date().getMonth();
// // // //     const remainingMonths = allMonths.slice(currentMonthIndex);
// // // //     setAvailableMonths(remainingMonths);
// // // //     setMonth(allMonths[currentMonthIndex]);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const currentYear = new Date().getFullYear();
// // // //     const currentMonthIndex = new Date().getMonth();
// // // //     if (year === currentYear) {
// // // //       const remainingMonths = allMonths.slice(currentMonthIndex);
// // // //       setAvailableMonths(remainingMonths);
// // // //       if (!remainingMonths.includes(month)) {
// // // //         setMonth(remainingMonths[0]);
// // // //       }
// // // //     } else {
// // // //       setAvailableMonths(allMonths);
// // // //     }
// // // //   }, [year, month]);

// // // //   const handleInputChange = (empId, field, value) => {
// // // //     if (isFrozen) {
// // // //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
// // // //       return;
// // // //     }
// // // //     setSavedRows((prev) => {
// // // //       const newSet = new Set(prev);
// // // //       newSet.delete(empId);
// // // //       return newSet;
// // // //     });
// // // //     const numericValue = Number.parseFloat(value) || 0;
// // // //     setPayrollData((prevData) => prevData.map((emp) => (emp.empId === empId ? calculateTotals({ ...emp, [field]: numericValue }) : emp)));
// // // //   };

// // // //   const handleSaveChanges = (empId) => {
// // // //     const employee = payrollData.find((e) => e.empId === empId);
// // // //     console.log("Saving changes for:", employee);
// // // //     setSavedRows((prev) => new Set(prev).add(empId));
// // // //     setSnackbar({ open: true, message: `Changes for ${employee.name} saved successfully!`, severity: "success" });
// // // //   };

// // // //   const handleRowClick = (employee) => {
// // // //     setSelectedEmployee(employee);
// // // //     setDetailsDialogOpen(true);
// // // //   };

// // // //   const handleDetailsDialogClose = () => {
// // // //     setDetailsDialogOpen(false);
// // // //     setSelectedEmployee(null);
// // // //   };

// // // //   const handleSort = (property) => {
// // // //     const isAsc = orderBy === property && order === "asc";
// // // //     setOrder(isAsc ? "desc" : "asc");
// // // //     setOrderBy(property);
// // // //   };

// // // //   const getComparator = (order, orderBy) => {
// // // //     return (a, b) => {
// // // //       if (orderBy === "actions" || orderBy === 'srNo') return 0;
// // // //       let aVal = a[orderBy] || "";
// // // //       let bVal = b[orderBy] || "";
// // // //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// // // //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// // // //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// // // //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// // // //       return 0;
// // // //     };
// // // //   };

// // // //   // **MODIFIED**: Search now includes designation
// // // //   const filteredData = payrollData.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()) || emp.dept.toLowerCase().includes(search.toLowerCase()) || emp.designation.toLowerCase().includes(search.toLowerCase()));
// // // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy));
// // // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // // //   const handleChangeRowsPerPage = (event) => {
// // // //     setRowsPerPage(Number.parseInt(event.target.value, 10));
// // // //     setPage(0);
// // // //   };
// // // //   const handleFreezeData = () => {
// // // //     setIsFrozen(true);
// // // //     setFreezeDialog(false);
// // // //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" });
// // // //   };
// // // //   const handleUnfreezeData = () => {
// // // //     setIsFrozen(false);
// // // //     setUnfreezeDialog(false);
// // // //     setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" });
// // // //   };
// // // //   const handleDownloadExcel = () => {
// // // //     setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
// // // //   };

// // // //   // **REFACTORED**: Centralized cell rendering logic for maintainability
// // // //   const renderCell = (employee, column, index) => {
// // // //     const { id: field, editable } = column;
// // // //     const value = employee[field];

// // // //     if (field === "srNo") {
// // // //       return <TableCell key={field}>{page * rowsPerPage + index + 1}</TableCell>;
// // // //     }
    
// // // //     if (field === "actions") {
// // // //       const isSaved = savedRows.has(employee.empId);
// // // //       return (
// // // //         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // // //           <Button variant="contained" size="small" color={isSaved ? "success" : "primary"} startIcon={isSaved ? <Check /> : <Save />} onClick={() => handleSaveChanges(employee.empId)} disabled={isFrozen || isSaved} sx={{ width: "100px" }}>
// // // //             {isSaved ? "Saved" : "Save"}
// // // //           </Button>
// // // //         </TableCell>
// // // //       );
// // // //     }
    
// // // //     if (editable) {
// // // //       return (
// // // //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // // //           <TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} />
// // // //         </TableCell>
// // // //       );
// // // //     }
    
// // // //     if (field === 'esics' && employee.esicApplicable === 'No') {
// // // //       return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// // // //     }

// // // //     const isNumeric = typeof value === "number";
// // // //     const isCalculated = ['grossSalary', 'grossEarning', 'totalDeduction', 'netPay'].includes(field);
// // // //     let displayValue = value;
// // // //     if (isNumeric && field !== 'payableDays') {
// // // //       displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
// // // //     }

// // // //     return (
// // // //       <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated ? "bold" : (field === 'empId' ? 'bold' : (field === 'name' ? 'medium' : 'normal')), backgroundColor: isCalculated ? "#f5f5f5" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>
// // // //         {displayValue}
// // // //       </TableCell>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // // //       {/* Header and Controls */}
// // // //       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? "Payroll data is currently FROZEN." : "Payroll data is ACTIVE."}</Alert></Box>
// // // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{availableMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// // // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// // // //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth disabled={!month || !year || isFrozen} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>Submit</Button></Grid>
// // // //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data" : "Freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "success"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Freeze Data"}</Button></Tooltip></Grid>
// // // //       </Grid>
// // // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // // //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// // // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search Employee" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// // // //       </Grid>

// // // //       {/* Payroll Table */}
// // // //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// // // //         <Table stickyHeader size="small">
// // // //           <TableHead>
// // // //             {/* **MODIFIED**: ColSpans are updated for the new column groups */}
// // // //             <TableRow>
// // // //                 <TableCell align="center" colSpan={9} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell>
// // // //                 <TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell>
// // // //                 <TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell>
// // // //                 <TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell>
// // // //             </TableRow>
// // // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // // //               {columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={col.id === "actions" || col.id === 'srNo'}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}
// // // //             </TableRow>
// // // //           </TableHead>
// // // //           <TableBody>
// // // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // // //               <TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>
// // // //                  {/* **REFACTORED**: A clean loop using the centralized renderCell function */}
// // // //                 {columnHeaders.map((col) => renderCell(emp, col, index))}
// // // //               </TableRow>
// // // //             ))}
// // // //           </TableBody>
// // // //         </Table>
// // // //       </TableContainer>

// // // //       {/* Pagination */}
// // // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // // //         <Grid item><Grid container alignItems="center" spacing={1}><Grid item><Typography variant="body2">Rows per page:</Typography></Grid><Grid item><FormControl size="small"><Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>{[5, 10, 25, 50].map((rows) => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}</Select></FormControl></Grid></Grid></Grid>
// // // //         <Grid item><Grid container spacing={1} alignItems="center"><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button></Grid><Grid item><Typography variant="body2">Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</Typography></Grid><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>Next</Button></Grid></Grid></Grid>
// // // //       </Grid>

// // // //       {/* Dialogs */}
// // // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Freeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to freeze the payroll data?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="warning">Freeze Data</Button></DialogActions></Dialog>
// // // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
      
// // // //       {/* Employee Details Dialog (unchanged, but still works) */}
// // // //       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>
// // // //         {selectedEmployee && (
// // // //           <>
// // // //             <DialogTitle>
// // // //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // //                 <AccountBalance color="primary" />
// // // //                 <Box>
// // // //                     <Typography variant="h6" component="div">{selectedEmployee.name}</Typography>
// // // //                     <Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography>
// // // //                 </Box>
// // // //               </Box>
// // // //             </DialogTitle>
// // // //             <DialogContent dividers>
// // // //                 <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography>
// // // //                 <Grid container spacing={2}>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid>
// // // //                     <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid>
// // // //                 </Grid>
// // // //             </DialogContent>
// // // //             <DialogActions>
// // // //               <Button onClick={handleDetailsDialogClose}>Close</Button>
// // // //             </DialogActions>
// // // //           </>
// // // //         )}
// // // //       </Dialog>
      
// // // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert></Snackbar>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default PayrollReport;

// // // import { useState, useEffect } from "react"
// // // import {
// // //   Container,
// // //   Grid,
// // //   Button,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   InputLabel,
// // //   FormControl,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   TableSortLabel,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   DialogContentText,
// // //   Alert,
// // //   Snackbar,
// // //   Box,
// // //   Typography,
// // //   Tooltip,
// // // } from "@mui/material"
// // // import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance } from "@mui/icons-material"

// // // const allMonths = [
// // //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // // ]

// // // // **MODIFIED**: Data now includes a fixed grossSalary. Basic/HRA are for reference.
// // // const initialPayrollData = [
// // //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR", designation: "Manager", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 41000, basic: 25000, hra: 12500, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 2500, otherDeduction: 0, accountTitle: "Mangesh S Ghadigaonkar", accountNumber: "12345678901", bankName: "HDFC Bank", ifscCode: "HDFC0001234", bankBranch: "Mumbai Central", pfNumber: "MH/PUN/12345", panNumber: "ABCDE1234F", esicNumber: "1234567890" },
// // //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales", designation: "Executive", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 36500, basic: 22000, hra: 11000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 2000, otherDeduction: 0, accountTitle: "Kumar V Patil", accountNumber: "23456789012", bankName: "ICICI Bank", ifscCode: "ICIC0002345", bankBranch: "Pune", pfNumber: "MH/PUN/23456", panNumber: "BCDEF2345G", esicNumber: "2345678901" },
// // //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales", designation: "Trainee", gender: "Male", esicApplicable: "Yes", payableDays: 30, grossSalary: 20500, basic: 12000, hra: 6000, conveyance: 1000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 1800, otherDeduction: 0, accountTitle: "Ganesh R Mohite", accountNumber: "34567890123", bankName: "Axis Bank", ifscCode: "AXIS0003456", bankBranch: "Nashik", pfNumber: "MH/PUN/34567", panNumber: "CDEFG3456H", esicNumber: "3456789012" },
// // //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase", designation: "Associate", gender: "Female", esicApplicable: "Yes", payableDays: 30, grossSalary: 19500, basic: 11000, hra: 5500, conveyance: 1500, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 1500, otherDeduction: 0, accountTitle: "Rupali P Mali", accountNumber: "45678901234", bankName: "State Bank of India", ifscCode: "SBIN0004567", bankBranch: "Mumbai", pfNumber: "MH/PUN/45678", panNumber: "DEFG45678I", esicNumber: "4567890123" },
// // //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT", designation: "Developer", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 48500, basic: 30000, hra: 15000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 3500, otherDeduction: 0, accountTitle: "Sameer K Pawar", accountNumber: "56789012345", bankName: "Kotak Mahindra Bank", ifscCode: "KKBK0005678", bankBranch: "Bengaluru", pfNumber: "MH/PUN/56789", panNumber: "EFGHI5678J", esicNumber: "5678901234" },
// // // ];

// // // // **MODIFIED**: Column headers reordered and updated
// // // const columnHeaders = [
// // //   // EMPLOYEE DETAILS (9)
// // //   { id: "srNo", label: "Sr. No.", width: 80 },
// // //   { id: "empId", label: "Employee ID", width: 120 },
// // //   { id: "name", label: "Employee Name", width: 200 },
// // //   { id: "dept", label: "Department", width: 120 },
// // //   { id: "designation", label: "Designation", width: 150 },
// // //   { id: "gender", label: "Gender", width: 100 },
// // //   { id: "grossSalary", label: "Gross Salary", width: 130, editable: true },
// // //   { id: "payableDays", label: "Payable Days", width: 120 },
// // //   { id: "esicApplicable", label: "ESIC (Y/N)", width: 120, editable: true }, // Editable flag for custom rendering
// // //   // EARNINGS (6)
// // //   { id: "basic", label: "Basic", width: 100 },
// // //   { id: "hra", label: "HRA", width: 100 },
// // //   { id: "conveyance", label: "Conveyance", width: 120 },
// // //   { id: "medical", label: "Medical", width: 100 },
// // //   { id: "arrearsE", label: "Arrears", width: 100, editable: true },
// // //   { id: "totalEarnings", label: "Total Earnings", width: 130 },
// // //   // DEDUCTIONS (7)
// // //   { id: "pf", label: "PF", width: 100 },
// // //   { id: "esics", label: "ESIC", width: 100 },
// // //   { id: "pt", label: "PT", width: 80 },
// // //   { id: "mlwf", label: "MLWF", width: 100, editable: true },
// // //   { id: "tds", label: "TDS", width: 100, editable: true },
// // //   { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true },
// // //   { id: "totalDeduction", label: "Total Deduction", width: 140 },
// // //   // SUMMARY & ACTIONS (2)
// // //   { id: "netPay", label: "Net Pay", width: 120 },
// // //   { id: "actions", label: "Actions", width: 150 },
// // // ];

// // // const PayrollReport = () => {
// // //   const [month, setMonth] = useState("");
// // //   const [year, setYear] = useState("");
// // //   const [availableMonths, setAvailableMonths] = useState(allMonths);
// // //   const [availableYears, setAvailableYears] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [page, setPage] = useState(0);
// // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // //   const [orderBy, setOrderBy] = useState("name");
// // //   const [order, setOrder] = useState("asc");
// // //   const [payrollData, setPayrollData] = useState([]);
// // //   const [isFrozen, setIsFrozen] = useState(false);
// // //   const [freezeDialog, setFreezeDialog] = useState(false);
// // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
// // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
// // //   const [savedRows, setSavedRows] = useState(new Set());
// // //   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
// // //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// // //   // **REWRITTEN**: Calculation logic updated for new structure
// // //   const calculateTotals = (employee) => {
// // //     const grossSalary = employee.grossSalary || 0;
// // //     const totalEarnings = grossSalary + (employee.arrearsE || 0);
// // //     // ESIC is 0.75% of Gross Salary if applicable
// // //     const esicsDeduction = employee.esicApplicable === 'Yes' ? Math.round(grossSalary * 0.0075) : 0;
// // //     const totalDeduction = (employee.pf || 0) + esicsDeduction + (employee.pt || 0) + (employee.mlwf || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);
// // //     const netPay = totalEarnings - totalDeduction;
// // //     // Return updated employee object with all calculated fields
// // //     return { ...employee, esics: esicsDeduction, totalEarnings, totalDeduction, netPay };
// // //   };

// // //   useEffect(() => {
// // //     setPayrollData(initialPayrollData.map(calculateTotals));
// // //     const currentYear = new Date().getFullYear();
// // //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear + i);
// // //     setAvailableYears(yearsArray);
// // //     setYear(currentYear);
// // //     const currentMonthIndex = new Date().getMonth();
// // //     setMonth(allMonths[currentMonthIndex]);
// // //   }, []);

// // //   useEffect(() => {
// // //     const currentYear = new Date().getFullYear();
// // //     const currentMonthIndex = new Date().getMonth();
// // //     if (year === currentYear) {
// // //       const remainingMonths = allMonths.slice(currentMonthIndex);
// // //       setAvailableMonths(remainingMonths);
// // //       if (!remainingMonths.includes(month)) {
// // //         setMonth(remainingMonths[0]);
// // //       }
// // //     } else {
// // //       setAvailableMonths(allMonths);
// // //     }
// // //   }, [year, month]);
  
// // //   const unSaveRow = (empId) => {
// // //      setSavedRows((prev) => {
// // //       const newSet = new Set(prev);
// // //       newSet.delete(empId);
// // //       return newSet;
// // //     });
// // //   }

// // //   // **NEW**: Handler for changing ESIC applicability
// // //   const handleEsicChange = (empId, value) => {
// // //     if (isFrozen) return;
// // //     unSaveRow(empId);
// // //     setPayrollData((prevData) =>
// // //       prevData.map((emp) =>
// // //         emp.empId === empId ? calculateTotals({ ...emp, esicApplicable: value }) : emp
// // //       )
// // //     );
// // //   };

// // //   const handleInputChange = (empId, field, value) => {
// // //     if (isFrozen) {
// // //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
// // //       return;
// // //     }
// // //     unSaveRow(empId);
// // //     const numericValue = Number.parseFloat(value) || 0;
// // //     setPayrollData((prevData) => prevData.map((emp) => (emp.empId === empId ? calculateTotals({ ...emp, [field]: numericValue }) : emp)));
// // //   };

// // //   const handleSaveChanges = (empId) => {
// // //     const employee = payrollData.find((e) => e.empId === empId);
// // //     console.log("Saving changes for:", employee);
// // //     setSavedRows((prev) => new Set(prev).add(empId));
// // //     setSnackbar({ open: true, message: `Changes for ${employee.name} saved successfully!`, severity: "success" });
// // //   };

// // //   const handleRowClick = (employee) => {
// // //     setSelectedEmployee(employee);
// // //     setDetailsDialogOpen(true);
// // //   };

// // //   const handleDetailsDialogClose = () => {
// // //     setDetailsDialogOpen(false);
// // //     setSelectedEmployee(null);
// // //   };

// // //   const handleSort = (property) => {
// // //     const isAsc = orderBy === property && order === "asc";
// // //     setOrder(isAsc ? "desc" : "asc");
// // //     setOrderBy(property);
// // //   };

// // //   const getComparator = (order, orderBy) => {
// // //     return (a, b) => {
// // //       if (["actions", "srNo"].includes(orderBy)) return 0;
// // //       let aVal = a[orderBy] || "";
// // //       let bVal = b[orderBy] || "";
// // //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// // //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// // //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// // //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// // //       return 0;
// // //     };
// // //   };

// // //   const filteredData = payrollData.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()) || emp.dept.toLowerCase().includes(search.toLowerCase()) || emp.designation.toLowerCase().includes(search.toLowerCase()));
// // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy));
// // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // //   const handleChangeRowsPerPage = (event) => {
// // //     setRowsPerPage(Number.parseInt(event.target.value, 10));
// // //     setPage(0);
// // //   };
// // //   const handleFreezeData = () => {
// // //     setIsFrozen(true);
// // //     setFreezeDialog(false);
// // //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" });
// // //   };
// // //   const handleUnfreezeData = () => {
// // //     setIsFrozen(false);
// // //     setUnfreezeDialog(false);
// // //     setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" });
// // //   };
// // //   const handleDownloadExcel = () => {
// // //     setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
// // //   };

// // //   // **REFACTORED**: Enhanced cell rendering to handle new editable types
// // //   const renderCell = (employee, column, index) => {
// // //     const { id: field, editable } = column;
// // //     const value = employee[field];

// // //     if (field === "srNo") {
// // //       return <TableCell key={field}>{page * rowsPerPage + index + 1}</TableCell>;
// // //     }
    
// // //     if (field === "actions") {
// // //       const isSaved = savedRows.has(employee.empId);
// // //       return (
// // //         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // //           <Button variant="contained" size="small" color={isSaved ? "success" : "primary"} startIcon={isSaved ? <Check /> : <Save />} onClick={() => handleSaveChanges(employee.empId)} disabled={isFrozen || isSaved} sx={{ width: "100px" }}>
// // //             {isSaved ? "Saved" : "Save"}
// // //           </Button>
// // //         </TableCell>
// // //       );
// // //     }
    
// // //     // **NEW**: Custom renderer for ESIC dropdown
// // //     if (field === 'esicApplicable') {
// // //         return (
// // //             <TableCell key={field} sx={{ padding: "0px 4px" }} onClick={(e) => e.stopPropagation()}>
// // //                 <FormControl fullWidth size="small" sx={{"& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" }}}>
// // //                     <Select value={value} onChange={(e) => handleEsicChange(employee.empId, e.target.value)} disabled={isFrozen}>
// // //                         <MenuItem value="Yes">Yes</MenuItem>
// // //                         <MenuItem value="No">No</MenuItem>
// // //                     </Select>
// // //                 </FormControl>
// // //             </TableCell>
// // //         );
// // //     }

// // //     if (editable) {
// // //       return (
// // //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // //           <TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} />
// // //         </TableCell>
// // //       );
// // //     }
    
// // //     if (field === 'esics' && employee.esicApplicable === 'No') {
// // //       return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// // //     }

// // //     const isNumeric = typeof value === "number";
// // //     const isCalculated = ['totalEarnings', 'totalDeduction', 'netPay'].includes(field);
// // //     let displayValue = value;
// // //     if (isNumeric && field !== 'payableDays') {
// // //       displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
// // //     }

// // //     return (
// // //       <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : (field === 'name' ? 'medium' : 'normal')), backgroundColor: isCalculated ? "#f5f5f5" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>
// // //         {displayValue}
// // //       </TableCell>
// // //     );
// // //   };

// // //   return (
// // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // //       {/* Header and Controls */}
// // //       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? "Payroll data is currently FROZEN." : "Payroll data is ACTIVE."}</Alert></Box>
// // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{availableMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// // //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth disabled={!month || !year || isFrozen} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>Submit</Button></Grid>
// // //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data" : "Freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "success"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Freeze Data"}</Button></Tooltip></Grid>
// // //       </Grid>
// // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search Employee" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// // //       </Grid>

// // //       {/* Payroll Table */}
// // //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// // //         <Table stickyHeader size="small">
// // //           <TableHead>
// // //             {/* ColSpans are updated for the new column groups */}
// // //             <TableRow>
// // //                 <TableCell align="center" colSpan={9} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell>
// // //                 <TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell>
// // //                 <TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell>
// // //                 <TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell>
// // //             </TableRow>
// // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // //               {columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // //               <TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>
// // //                 {columnHeaders.map((col) => renderCell(emp, col, index))}
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>

// // //       {/* Pagination & Dialogs etc. (unchanged) */}
// // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // //         <Grid item><Grid container alignItems="center" spacing={1}><Grid item><Typography variant="body2">Rows per page:</Typography></Grid><Grid item><FormControl size="small"><Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>{[5, 10, 25, 50].map((rows) => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}</Select></FormControl></Grid></Grid></Grid>
// // //         <Grid item><Grid container spacing={1} alignItems="center"><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button></Grid><Grid item><Typography variant="body2">Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</Typography></Grid><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>Next</Button></Grid></Grid></Grid>
// // //       </Grid>
// // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Freeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to freeze the payroll data?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="warning">Freeze Data</Button></DialogActions></Dialog>
// // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
// // //       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>
// // //         {selectedEmployee && (
// // //           <>
// // //             <DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle>
// // //             <DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent>
// // //             <DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions>
// // //           </>
// // //         )}
// // //       </Dialog>
// // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert></Snackbar>
// // //     </Container>
// // //   );
// // // };

// // // export default PayrollReport;




// // // import { useState, useEffect, useCallback } from "react"
// // // import {
// // //   Container,
// // //   Grid,
// // //   Button,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   InputLabel,
// // //   FormControl,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   TableSortLabel,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   DialogContentText,
// // //   Alert,
// // //   Snackbar,
// // //   Box,
// // //   Typography,
// // //   Tooltip,
// // // } from "@mui/material"
// // // import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material"

// // // const allMonths = [
// // //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // // ]

// // // // Base employee data. Calculations will be performed on this.
// // // const baseEmployeeData = [
// // //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR", designation: "Manager", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 41000, basic: 25000, hra: 12500, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 2500, otherDeduction: 0, accountTitle: "Mangesh S Ghadigaonkar", accountNumber: "12345678901", bankName: "HDFC Bank", ifscCode: "HDFC0001234", bankBranch: "Mumbai Central", pfNumber: "MH/PUN/12345", panNumber: "ABCDE1234F", esicNumber: "1234567890" },
// // //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales", designation: "Executive", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 36500, basic: 22000, hra: 11000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 2000, otherDeduction: 0, accountTitle: "Kumar V Patil", accountNumber: "23456789012", bankName: "ICICI Bank", ifscCode: "ICIC0002345", bankBranch: "Pune", pfNumber: "MH/PUN/23456", panNumber: "BCDEF2345G", esicNumber: "2345678901" },
// // //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales", designation: "Trainee", gender: "Male", esicApplicable: "Yes", payableDays: 30, grossSalary: 20500, basic: 12000, hra: 6000, conveyance: 1000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 1800, otherDeduction: 0, accountTitle: "Ganesh R Mohite", accountNumber: "34567890123", bankName: "Axis Bank", ifscCode: "AXIS0003456", bankBranch: "Nashik", pfNumber: "MH/PUN/34567", panNumber: "CDEFG3456H", esicNumber: "3456789012" },
// // //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase", designation: "Associate", gender: "Female", esicApplicable: "Yes", payableDays: 28, grossSalary: 19500, basic: 11000, hra: 5500, conveyance: 1500, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 1500, otherDeduction: 0, accountTitle: "Rupali P Mali", accountNumber: "45678901234", bankName: "State Bank of India", ifscCode: "SBIN0004567", bankBranch: "Mumbai", pfNumber: "MH/PUN/45678", panNumber: "DEFG45678I", esicNumber: "4567890123" },
// // //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT", designation: "Developer", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 48500, basic: 30000, hra: 15000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 0, tds: 3500, otherDeduction: 0, accountTitle: "Sameer K Pawar", accountNumber: "56789012345", bankName: "Kotak Mahindra Bank", ifscCode: "KKBK0005678", bankBranch: "Bengaluru", pfNumber: "MH/PUN/56789", panNumber: "EFGHI5678J", esicNumber: "5678901234" },
// // // ];

// // // // **MODIFIED**: Column headers updated to include "Gross Earning"
// // // const columnHeaders = [
// // //   // EMPLOYEE DETAILS (10)
// // //   { id: "srNo", label: "Sr. No.", width: 80 },
// // //   { id: "empId", label: "Employee ID", width: 120 },
// // //   { id: "name", label: "Employee Name", width: 200 },
// // //   { id: "dept", label: "Department", width: 120 },
// // //   { id: "designation", label: "Designation", width: 150 },
// // //   { id: "gender", label: "Gender", width: 100 },
// // //   { id: "grossSalary", label: "Gross Salary", width: 130, editable: true },
// // //   { id: "payableDays", label: "Payable Days", width: 120 },
// // //   { id: "esicApplicable", label: "ESIC (Y/N)", width: 120, editable: true },
// // //   { id: "grossEarning", label: "Gross Earning", width: 140 }, // **NEW COLUMN**
// // //   // EARNINGS (6)
// // //   { id: "basic", label: "Basic", width: 100 },
// // //   { id: "hra", label: "HRA", width: 100 },
// // //   { id: "conveyance", label: "Conveyance", width: 120 },
// // //   { id: "medical", label: "Medical", width: 100 },
// // //   { id: "arrearsE", label: "Arrears", width: 100, editable: true },
// // //   { id: "totalEarnings", label: "Total Earnings", width: 130 },
// // //   // DEDUCTIONS (7)
// // //   { id: "pf", label: "PF", width: 100 },
// // //   { id: "esics", label: "ESIC", width: 100 },
// // //   { id: "pt", label: "PT", width: 80 },
// // //   { id: "mlwf", label: "MLWF", width: 100, editable: true },
// // //   { id: "tds", label: "TDS", width: 100, editable: true },
// // //   { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true },
// // //   { id: "totalDeduction", label: "Total Deduction", width: 140 },
// // //   // SUMMARY & ACTIONS (2)
// // //   { id: "netPay", label: "Net Pay", width: 120 },
// // //   { id: "actions", label: "Actions", width: 150 },
// // // ];

// // // // **REFACTORED**: Centralized calculation logic into a pure function
// // // const calculatePayrollMetrics = (employee, monthStr, yearNum) => {
// // //   // Helper to get the number of days in the selected month
// // //   const getDaysInMonth = (year, month) => {
// // //     if (!year || !month) return 30; // Fallback for safety
// // //     const monthIndex = allMonths.indexOf(month);
// // //     return new Date(year, monthIndex + 1, 0).getDate();
// // //   };

// // //   const daysInMonth = getDaysInMonth(yearNum, monthStr);
// // //   const grossSalary = employee.grossSalary || 0;
// // //   const payableDays = employee.payableDays || 0;

// // //   // 1. Calculate Gross Earning (Pro-rata salary for the month)
// // //   const grossEarning = daysInMonth > 0 ? Math.round((grossSalary / daysInMonth) * payableDays) : 0;

// // //   // 2. Calculate Total Earnings
// // //   const totalEarnings = grossEarning + (employee.arrearsE || 0);

// // //   // 3. Calculate ESIC deduction (based on Gross Earning, not Gross Salary)
// // //   const esicsDeduction = employee.esicApplicable === 'Yes' ? Math.round(grossEarning * 0.0075) : 0;

// // //   // 4. Calculate Total Deductions
// // //   const totalDeduction = (employee.pf || 0) + esicsDeduction + (employee.pt || 0) + (employee.mlwf || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);

// // //   // 5. Calculate Net Pay
// // //   const netPay = totalEarnings - totalDeduction;

// // //   // Return a new employee object with all calculated fields
// // //   return { ...employee, grossEarning, esics: esicsDeduction, totalEarnings, totalDeduction, netPay };
// // // };


// // // const PayrollReport = () => {
// // //   const [month, setMonth] = useState("");
// // //   const [year, setYear] = useState("");
// // //   const [availableMonths, setAvailableMonths] = useState(allMonths);
// // //   const [availableYears, setAvailableYears] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [page, setPage] = useState(0);
// // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // //   const [orderBy, setOrderBy] = useState("name");
// // //   const [order, setOrder] = useState("asc");
// // //   const [payrollData, setPayrollData] = useState([]);
// // //   const [isFrozen, setIsFrozen] = useState(false);
// // //   const [freezeDialog, setFreezeDialog] = useState(false);
// // //   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
// // //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
// // //   const [savedRows, setSavedRows] = useState(new Set());
// // //   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
// // //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// // //   // Memoized calculation function to prevent re-creation on every render
// // //   const calculateRow = useCallback((employee) => {
// // //     return calculatePayrollMetrics(employee, month, year);
// // //   }, [month, year]);

// // //   useEffect(() => {
// // //     const currentYear = new Date().getFullYear();
// // //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear + i);
// // //     setAvailableYears(yearsArray);
// // //     const currentMonthIndex = new Date().getMonth();
    
// // //     // Set initial state
// // //     const initialYear = currentYear;
// // //     const initialMonth = allMonths[currentMonthIndex];
// // //     setYear(initialYear);
// // //     setMonth(initialMonth);

// // //     // Set initial data with calculations for the current month/year
// // //     setPayrollData(baseEmployeeData.map(emp => calculatePayrollMetrics(emp, initialMonth, initialYear)));
// // //   }, []);

// // //   useEffect(() => {
// // //     const currentYear = new Date().getFullYear();
// // //     const currentMonthIndex = new Date().getMonth();
// // //     if (year === currentYear) {
// // //       const remainingMonths = allMonths.slice(currentMonthIndex);
// // //       setAvailableMonths(remainingMonths);
// // //       if (!remainingMonths.includes(month)) {
// // //         setMonth(remainingMonths[0]);
// // //       }
// // //     } else {
// // //       setAvailableMonths(allMonths);
// // //     }
// // //   }, [year, month]);
  
// // //   const unSaveRow = (empId) => {
// // //      setSavedRows((prev) => {
// // //       const newSet = new Set(prev);
// // //       newSet.delete(empId);
// // //       return newSet;
// // //     });
// // //   }

// // //   const handleEsicChange = (empId, value) => {
// // //     if (isFrozen) return;
// // //     unSaveRow(empId);
// // //     setPayrollData((prevData) =>
// // //       prevData.map((emp) =>
// // //         emp.empId === empId ? calculateRow({ ...emp, esicApplicable: value }) : emp
// // //       )
// // //     );
// // //   };

// // //   const handleInputChange = (empId, field, value) => {
// // //     if (isFrozen) {
// // //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
// // //       return;
// // //     }
// // //     unSaveRow(empId);
// // //     const numericValue = Number.parseFloat(value) || 0;
// // //     setPayrollData((prevData) => prevData.map((emp) => (emp.empId === empId ? calculateRow({ ...emp, [field]: numericValue }) : emp)));
// // //   };

// // //   // **NEW**: Handler for the Submit button to regenerate the report
// // //   const handleGenerateReport = () => {
// // //     setPayrollData(prevData => prevData.map(emp => calculateRow(emp)));
// // //     setSavedRows(new Set()); // Reset saved status for the new report period
// // //     setSnackbar({ open: true, message: `Report successfully generated for ${month} ${year}.`, severity: "info" });
// // //   };

// // //   const handleSaveChanges = (empId) => {
// // //     const employee = payrollData.find((e) => e.empId === empId);
// // //     console.log("Saving changes for:", employee);
// // //     setSavedRows((prev) => new Set(prev).add(empId));
// // //     setSnackbar({ open: true, message: `Changes for ${employee.name} saved successfully!`, severity: "success" });
// // //   };

// // //   const handleRowClick = (employee) => {
// // //     setSelectedEmployee(employee);
// // //     setDetailsDialogOpen(true);
// // //   };
// // //   const handleDetailsDialogClose = () => {
// // //     setDetailsDialogOpen(false);
// // //     setSelectedEmployee(null);
// // //   };
// // //   const handleSort = (property) => {
// // //     const isAsc = orderBy === property && order === "asc";
// // //     setOrder(isAsc ? "desc" : "asc");
// // //     setOrderBy(property);
// // //   };
// // //   const getComparator = (order, orderBy) => {
// // //     return (a, b) => {
// // //       if (["actions", "srNo"].includes(orderBy)) return 0;
// // //       let aVal = a[orderBy] || "";
// // //       let bVal = b[orderBy] || "";
// // //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// // //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// // //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// // //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// // //       return 0;
// // //     };
// // //   };
// // //   const filteredData = payrollData.filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()) || emp.dept.toLowerCase().includes(search.toLowerCase()) || emp.designation.toLowerCase().includes(search.toLowerCase()));
// // //   const sortedData = [...filteredData].sort(getComparator(order, orderBy));
// // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // //   const handleChangeRowsPerPage = (event) => {
// // //     setRowsPerPage(Number.parseInt(event.target.value, 10));
// // //     setPage(0);
// // //   };
// // //   const handleFreezeData = () => {
// // //     setIsFrozen(true);
// // //     setFreezeDialog(false);
// // //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" });
// // //   };
// // //   const handleUnfreezeData = () => {
// // //     setIsFrozen(false);
// // //     setUnfreezeDialog(false);
// // //     setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" });
// // //   };
// // //   const handleDownloadExcel = () => {
// // //     setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
// // //   };

// // //   const renderCell = (employee, column, index) => {
// // //     const { id: field, editable } = column;
// // //     const value = employee[field];

// // //     if (field === "srNo") {
// // //       return <TableCell key={field}>{page * rowsPerPage + index + 1}</TableCell>;
// // //     }
    
// // //     if (field === "actions") {
// // //       const isSaved = savedRows.has(employee.empId);
// // //       return (
// // //         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // //           <Button variant="contained" size="small" color={isSaved ? "success" : "primary"} startIcon={isSaved ? <Check /> : <Save />} onClick={() => handleSaveChanges(employee.empId)} disabled={isFrozen || isSaved} sx={{ width: "100px" }}>
// // //             {isSaved ? "Saved" : "Save"}
// // //           </Button>
// // //         </TableCell>
// // //       );
// // //     }
    
// // //     if (field === 'esicApplicable') {
// // //         return (
// // //             <TableCell key={field} sx={{ padding: "0px 4px" }} onClick={(e) => e.stopPropagation()}>
// // //                 <FormControl fullWidth size="small" sx={{"& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" }}}>
// // //                     <Select value={value} onChange={(e) => handleEsicChange(employee.empId, e.target.value)} disabled={isFrozen}>
// // //                         <MenuItem value="Yes">Yes</MenuItem>
// // //                         <MenuItem value="No">No</MenuItem>
// // //                     </Select>
// // //                 </FormControl>
// // //             </TableCell>
// // //         );
// // //     }

// // //     if (editable) {
// // //       return (
// // //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// // //           <TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} />
// // //         </TableCell>
// // //       );
// // //     }
    
// // //     if (field === 'esics' && employee.esicApplicable === 'No') {
// // //       return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// // //     }

// // //     const isNumeric = typeof value === "number";
// // //     const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);
// // //     let displayValue = value;
// // //     if (isNumeric && field !== 'payableDays') {
// // //       displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
// // //     }

// // //     return (
// // //       <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : (field === 'name' ? 'medium' : 'normal')), backgroundColor: isCalculated ? "#f5f5f5" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>
// // //         {displayValue}
// // //       </TableCell>
// // //     );
// // //   };

// // //   return (
// // //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// // //       {/* Header and Controls */}
// // //       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE."}</Alert></Box>
// // //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{availableMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// // //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// // //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth disabled={!month || !year || isFrozen} onClick={handleGenerateReport} startIcon={<Send/>} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>Submit</Button></Grid>
// // //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to make changes" : "Freeze data to prevent changes"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "success"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Freeze Data"}</Button></Tooltip></Grid>
// // //       </Grid>
// // //       <Grid container spacing={2} sx={{ mb: 2 }}>
// // //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// // //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search Employee" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// // //       </Grid>

// // //       {/* Payroll Table */}
// // //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// // //         <Table stickyHeader size="small">
// // //           <TableHead>
// // //             {/* **MODIFIED**: ColSpans updated for the new column */}
// // //             <TableRow>
// // //                 <TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell>
// // //                 <TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell>
// // //                 <TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell>
// // //                 <TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell>
// // //             </TableRow>
// // //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// // //               {columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((emp, index) => (
// // //               <TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>
// // //                 {columnHeaders.map((col) => renderCell(emp, col, index))}
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>

// // //       {/* Pagination & Dialogs etc. */}
// // //       <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
// // //         <Grid item><Grid container alignItems="center" spacing={1}><Grid item><Typography variant="body2">Rows per page:</Typography></Grid><Grid item><FormControl size="small"><Select value={rowsPerPage} onChange={handleChangeRowsPerPage} sx={{ minWidth: 80 }}>{[5, 10, 25, 50].map((rows) => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}</Select></FormControl></Grid></Grid></Grid>
// // //         <Grid item><Grid container spacing={1} alignItems="center"><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button></Grid><Grid item><Typography variant="body2">Page {page + 1} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}</Typography></Grid><Grid item><Button variant="outlined" size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>Next</Button></Grid></Grid></Grid>
// // //       </Grid>
// // //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Freeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to freeze the payroll data for {month} {year}? This will prevent further edits.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="warning">Freeze Data</Button></DialogActions></Dialog>
// // //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
// // //       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>
// // //         {selectedEmployee && (
// // //           <>
// // //             <DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle>
// // //             <DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent>
// // //             <DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions>
// // //           </>
// // //         )}
// // //       </Dialog>
// // //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert></Snackbar>
// // //     </Container>
// // //   );
// // // };

// // // export default PayrollReport;



// // import { useState, useEffect, useCallback } from "react";
// // import {
// //   Container,
// //   Grid,
// //   Button,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   TableSortLabel,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   DialogContentText,
// //   Alert,
// //   Snackbar,
// //   Box,
// //   Typography,
// //   Tooltip,
// // } from "@mui/material";
// // import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material";

// // const allMonths = [
// //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // ];

// // // Base employee data. Calculations will be performed on this.
// // const baseEmployeeData = [
// //   { id: 1, empId: "V0001", name: "Mangesh Ghadigaonkar", dept: "HR", designation: "Manager", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 41000, basic: 25000, hra: 12500, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 12, tds: 2500, otherDeduction: 0, accountTitle: "Mangesh S Ghadigaonkar", accountNumber: "12345678901", bankName: "HDFC Bank", ifscCode: "HDFC0001234", bankBranch: "Mumbai Central", pfNumber: "MH/PUN/12345", panNumber: "ABCDE1234F", esicNumber: "1234567890" },
// //   { id: 2, empId: "V0006", name: "Kumar Patil", dept: "Sales", designation: "Executive", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 36500, basic: 22000, hra: 11000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 12, tds: 2000, otherDeduction: 0, accountTitle: "Kumar V Patil", accountNumber: "23456789012", bankName: "ICICI Bank", ifscCode: "ICIC0002345", bankBranch: "Pune", pfNumber: "MH/PUN/23456", panNumber: "BCDEF2345G", esicNumber: "2345678901" },
// //   { id: 3, empId: "V0017", name: "Ganesh Mohite", dept: "Sales", designation: "Trainee", gender: "Male", esicApplicable: "Yes", payableDays: 30, grossSalary: 20500, basic: 12000, hra: 6000, conveyance: 1000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 12, tds: 1800, otherDeduction: 0, accountTitle: "Ganesh R Mohite", accountNumber: "34567890123", bankName: "Axis Bank", ifscCode: "AXIS0003456", bankBranch: "Nashik", pfNumber: "MH/PUN/34567", panNumber: "CDEFG3456H", esicNumber: "3456789012" },
// //   { id: 4, empId: "V0020", name: "Rupali Mali", dept: "Purchase", designation: "Associate", gender: "Female", esicApplicable: "Yes", payableDays: 28, grossSalary: 19500, basic: 11000, hra: 5500, conveyance: 1500, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 12, tds: 1500, otherDeduction: 0, accountTitle: "Rupali P Mali", accountNumber: "45678901234", bankName: "State Bank of India", ifscCode: "SBIN0004567", bankBranch: "Mumbai", pfNumber: "MH/PUN/45678", panNumber: "DEFG45678I", esicNumber: "4567890123" },
// //   { id: 5, empId: "V0021", name: "Sameer Pawar", dept: "IT", designation: "Developer", gender: "Male", esicApplicable: "No", payableDays: 30, grossSalary: 48500, basic: 30000, hra: 15000, conveyance: 2000, medical: 1500, arrearsE: 0, pf: 1800, pt: 200, mlwf: 12, tds: 3500, otherDeduction: 0, accountTitle: "Sameer K Pawar", accountNumber: "56789012345", bankName: "Kotak Mahindra Bank", ifscCode: "KKBK0005678", bankBranch: "Bengaluru", pfNumber: "MH/PUN/56789", panNumber: "EFGHI5678J", esicNumber: "5678901234" },
// // ];

// // // **MODIFIED**: Column headers updated to remove editability from certain fields.
// // const columnHeaders = [
// //   // EMPLOYEE DETAILS (10)
// //   { id: "srNo", label: "Sr. No.", width: 80 },
// //   { id: "empId", label: "Employee ID", width: 120 },
// //   { id: "name", label: "Employee Name", width: 200 },
// //   { id: "dept", label: "Department", width: 120 },
// //   { id: "designation", label: "Designation", width: 150 },
// //   { id: "gender", label: "Gender", width: 100 },
// //   { id: "grossSalary", label: "Gross Salary", width: 130 }, // Not editable
// //   { id: "payableDays", label: "Payable Days", width: 120 },
// //   { id: "esicApplicable", label: "ESIC (Y/N)", width: 120 }, // Not editable
// //   { id: "grossEarning", label: "Gross Earning", width: 140 },
// //   // EARNINGS (6)
// //   { id: "basic", label: "Basic", width: 100 },
// //   { id: "hra", label: "HRA", width: 100 },
// //   { id: "conveyance", label: "Conveyance", width: 120 },
// //   { id: "medical", label: "Medical", width: 100 },
// //   { id: "arrearsE", label: "Arrears", width: 100, editable: true },
// //   { id: "totalEarnings", label: "Total Earnings", width: 130 },
// //   // DEDUCTIONS (7)
// //   { id: "pf", label: "PF", width: 100 },
// //   { id: "esics", label: "ESIC", width: 100 },
// //   { id: "pt", label: "PT", width: 80 },
// //   { id: "mlwf", label: "MLWF", width: 100 }, // Not editable
// //   { id: "tds", label: "TDS", width: 100 }, // Not editable
// //   { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true },
// //   { id: "totalDeduction", label: "Total Deduction", width: 140 },
// //   // SUMMARY & ACTIONS (2)
// //   { id: "netPay", label: "Net Pay", width: 120 },
// //   { id: "actions", label: "Actions", width: 150 },
// // ];

// // // **REFACTORED**: Centralized calculation logic with new conditional medical allowance.
// // const calculatePayrollMetrics = (employee, monthStr, yearNum) => {
// //   const getDaysInMonth = (year, month) => {
// //     if (!year || !month) return 30;
// //     return new Date(year, allMonths.indexOf(month) + 1, 0).getDate();
// //   };

// //   const daysInMonth = getDaysInMonth(yearNum, monthStr);
// //   const payableDays = employee.payableDays || 0;

// //   // 1. **MODIFIED**: Determine medical allowance based on ESIC status.
// //   const medicalEarning = employee.esicApplicable === 'Yes' ? 0 : (employee.medical || 0);
  
// //   // 2. Determine the gross salary components that are eligible for earning.
// //   const grossSalaryForProrata = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + medicalEarning;

// //   // 3. Calculate Gross Earning (Pro-rata salary for the month based on eligible components).
// //   const grossEarning = daysInMonth > 0 ? Math.round((grossSalaryForProrata / daysInMonth) * payableDays) : 0;

// //   // 4. Calculate Total Earnings.
// //   const totalEarnings = grossEarning + (employee.arrearsE || 0);

// //   // 5. Calculate ESIC deduction (based on Gross Earning).
// //   const esicsDeduction = employee.esicApplicable === 'Yes' ? Math.round(grossEarning * 0.0075) : 0;

// //   // 6. Calculate Total Deductions.
// //   const totalDeduction = (employee.pf || 0) + esicsDeduction + (employee.pt || 0) + (employee.mlwf || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);

// //   // 7. Calculate Net Pay.
// //   const netPay = totalEarnings - totalDeduction;

// //   // Return a new employee object with all calculated fields and the conditional medical value.
// //   return { ...employee, medical: medicalEarning, grossEarning, esics: esicsDeduction, totalEarnings, totalDeduction, netPay };
// // };

// // const PayrollReport = () => {
// //   const [month, setMonth] = useState("");
// //   const [year, setYear] = useState("");
// //   const [availableYears, setAvailableYears] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [orderBy, setOrderBy] = useState("name");
// //   const [order, setOrder] = useState("asc");
// //   const [payrollData, setPayrollData] = useState([]);
// //   const [isFrozen, setIsFrozen] = useState(false);
// //   const [freezeDialog, setFreezeDialog] = useState(false);
// //   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
// //   const [updatedRows, setUpdatedRows] = useState(new Set());
// //   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
// //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// //   const calculateRow = useCallback((employee) => {
// //     return calculatePayrollMetrics(employee, month, year);
// //   }, [month, year]);
  
// //   useEffect(() => {
// //     const currentYear = new Date().getFullYear();
// //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
// //     setAvailableYears(yearsArray);
// //     const initialYear = currentYear;
// //     const initialMonth = allMonths[new Date().getMonth()];
// //     setYear(initialYear);
// //     setMonth(initialMonth);
// //     setPayrollData(baseEmployeeData.map(emp => calculatePayrollMetrics(emp, initialMonth, initialYear)));
// //   }, []);

// //   const markRowAsNotUpdated = (empId) => {
// //      setUpdatedRows((prev) => {
// //       const newSet = new Set(prev);
// //       newSet.delete(empId);
// //       return newSet;
// //     });
// //   }

// //   const handleInputChange = (empId, field, value) => {
// //     if (isFrozen) {
// //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
// //       return;
// //     }
// //     markRowAsNotUpdated(empId);
// //     const numericValue = Number.parseFloat(value) || 0;
// //     // Find the original base employee data to recalculate from scratch
// //     const baseEmp = baseEmployeeData.find(e => e.empId === empId);
// //     setPayrollData((prevData) => 
// //       prevData.map((emp) =>
// //         emp.empId === empId ? calculateRow({ ...baseEmp, ...emp, [field]: numericValue }) : emp
// //       )
// //     );
// //   };
  
// //   const handleGenerateReport = () => {
// //     const freshData = baseEmployeeData.map(emp => calculateRow(emp));
// //     setPayrollData(freshData);
// //     setUpdatedRows(new Set());
// //     setIsFrozen(false);
// //     setSnackbar({ open: true, message: `Report successfully generated for ${month} ${year}.`, severity: "info" });
// //   };
  
// //   const handleUpdateChanges = (empId) => {
// //     const employee = payrollData.find((e) => e.empId === empId);
// //     console.log("Updating record for:", employee);
// //     setUpdatedRows((prev) => new Set(prev).add(empId));
// //     setSnackbar({ open: true, message: `Record for ${employee.name} has been updated.`, severity: "success" });
// //   };

// //   const handleRowClick = (employee) => {
// //     setSelectedEmployee(employee);
// //     setDetailsDialogOpen(true);
// //   };

// //   const getComparator = (order, orderBy) => {
// //     return (a, b) => {
// //       if (["actions", "srNo"].includes(orderBy)) return 0;
// //       let aVal = a[orderBy] || "";
// //       let bVal = b[orderBy] || "";
// //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// //       return 0;
// //     };
// //   };

// //   const sortedData = [...payrollData]
// //     .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()))
// //     .sort(getComparator(order, orderBy));

// //   const renderCell = (employee, column, index) => {
// //     const { id: field, editable } = column;
// //     const value = employee[field];

// //     if (field === "srNo") {
// //       return <TableCell key={field}>{index + 1}</TableCell>;
// //     }
    
// //     if (field === "actions") {
// //       const isUpdated = updatedRows.has(employee.empId);
// //       return (
// //         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// //           <Button variant="contained" size="small" color={isUpdated ? "success" : "primary"} startIcon={isUpdated ? <Check /> : <Save />} onClick={() => handleUpdateChanges(employee.empId)} disabled={isFrozen || isUpdated} sx={{ width: "120px" }}>
// //             {isUpdated ? "Updated" : "Update"}
// //           </Button>
// //         </TableCell>
// //       );
// //     }
    
// //     if (editable) {
// //       return (
// //         <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// //           <TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} />
// //         </TableCell>
// //       );
// //     }
    
// //     if (field === 'esics' && employee.esicApplicable === 'No') {
// //       return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// //     }
    
// //     if (field === 'medical' && employee.esicApplicable === 'Yes') {
// //        return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// //     }

// //     const isNumeric = typeof value === "number";
// //     const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);
// //     let displayValue = value;
// //     if (isNumeric && field !== 'payableDays') {
// //       displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
// //     }

// //     return (
// //       <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : 'normal'), backgroundColor: isCalculated ? "#f0f4f8" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>
// //         {displayValue}
// //       </TableCell>
// //     );
// //   };
  
// //   // Other handlers (sorting, dialogs, etc.)
// //   const handleSort = (property) => {
// //     const isAsc = orderBy === property && order === "asc";
// //     setOrder(isAsc ? "desc" : "asc");
// //     setOrderBy(property);
// //   };
// //   const handleFreezeData = () => {
// //     setIsFrozen(true);
// //     setFreezeDialog(false);
// //     setSnackbar({ open: true, message: "Payroll data has been frozen successfully!", severity: "success" });
// //   };
// //   const handleUnfreezeData = () => {
// //     setIsFrozen(false);
// //     setUnfreezeDialog(false);
// //     setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" });
// //   };
// //   const handleDownloadExcel = () => setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
// //   const handleDetailsDialogClose = () => setDetailsDialogOpen(false);


// //   return (
// //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// //       <Box sx={{ mb: 3 }}>
// //         <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography>
// //         <Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>
// //             {isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE. Changes can be made."}
// //         </Alert>
// //       </Box>

// //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{allMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth onClick={handleGenerateReport} startIcon={<Send/>} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>Submit</Button></Grid>
// //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Freeze data to prevent changes"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "error"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Freeze Data"}</Button></Tooltip></Grid>
// //       </Grid>
// //       <Grid container spacing={2} sx={{ mb: 2 }}>
// //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search by Name or ID" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// //       </Grid>

// //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// //         <Table stickyHeader size="small">
// //           <TableHead>
// //             <TableRow>
// //                 <TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell>
// //                 <TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell>
// //                 <TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell>
// //                 <TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell>
// //             </TableRow>
// //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
// //               {columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {sortedData.map((emp, index) => (
// //               <TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>
// //                 {columnHeaders.map((col) => renderCell(emp, col, index))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Dialogs and Snackbar */}
// //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Confirm Freeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to freeze the payroll data for {month} {year}? This will prevent further edits and lock all records.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="error">Freeze Data</Button></DialogActions></Dialog>
// //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Confirm Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits to be made again.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
// //       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>
// //         {selectedEmployee && (
// //           <>
// //             <DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle>
// //             <DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent>
// //             <DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions>
// //           </>
// //         )}
// //       </Dialog>
// //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">{snackbar.message}</Alert></Snackbar>
// //     </Container>
// //   );
// // };

// // export default PayrollReport;



// // import { useState, useEffect, useCallback } from "react";
// // import {
// //   Container,
// //   Grid,
// //   Button,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   TableSortLabel,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   DialogContentText,
// //   Alert,
// //   Snackbar,
// //   Box,
// //   Typography,
// //   Tooltip,
// //   CircularProgress,
// // } from "@mui/material";
// // import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material";
// // import  axiosInstance from  "../../utils/axiosInstance";  // Make sure this path is correct

// // const allMonths = [
// //   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// // ];

// // // Helper to transform API response to component state
// // const transformApiToState = (apiData) => {
// //   return apiData.map(apiEmp => ({
// //     payroll_report_id: apiEmp["payroll_report_id"], // Critical for updates
// //     id: apiEmp["Sr. No."],
// //     empId: apiEmp["Employee ID"],
// //     name: apiEmp["Employee Name"],
// //     dept: apiEmp["Department"],
// //     designation: apiEmp["Designation"],
// //     gender: apiEmp["M/F"],
// //     grossSalary: apiEmp["Gross Salary"],
// //     payableDays: apiEmp["Days"],
// //     esicApplicable: apiEmp["ESIC Applicable"],
// //     grossEarning: apiEmp["Gross Earning"],
// //     basic: apiEmp["Basic"],
// //     hra: apiEmp["HRA"],
// //     conveyance: apiEmp["Conveyance"],
// //     medical: apiEmp["Medical"],
// //     arrearsE: apiEmp["Arrears"],
// //     totalEarnings: apiEmp["Total Earnings"],
// //     pf: apiEmp["PF"],
// //     esics: apiEmp["ESICS"],
// //     pt: apiEmp["PT"],
// //     mlwf: apiEmp["MLWF"],
// //     tds: apiEmp["TDS"],
// //     otherDeduction: apiEmp["Other Deduction"],
// //     totalDeduction: apiEmp["Total Deduction"],
// //     netPay: apiEmp["Net Pay"],
// //     ctc: apiEmp["CTC"],
// //     // Fields for the details dialog (will be empty if not in this API response)
// //     accountTitle: apiEmp["accountTitle"] || "N/A",
// //     accountNumber: apiEmp["accountNumber"] || "N/A",
// //     bankName: apiEmp["bankName"] || "N/A",
// //     ifscCode: apiEmp["ifscCode"] || "N/A",
// //     bankBranch: apiEmp["bankBranch"] || "N/A",
// //     pfNumber: apiEmp["pfNumber"] || "N/A",
// //     panNumber: apiEmp["panNumber"] || "N/A",
// //     esicNumber: apiEmp["esicNumber"] || "N/A",
// //   }));
// // };

// // // Helper to transform component state to API payload
// // const transformStateToApi = (emp, monthStr, yearNum) => ({
// //     payroll_report_id: emp.payroll_report_id || undefined, // Send only for updates
// //     employee_id: emp.empId,
// //     employee_name: emp.name,
// //     gender: emp.gender ? emp.gender.charAt(0).toUpperCase() : 'M',
// //     // IMPORTANT: The GET API does not provide IDs. These are placeholders.
// //     // In a real-world scenario, the GET API should also return these IDs.
// //     department_id: emp.department_id || "3",
// //     designation_id: emp.designation_id || "6",
// //     month: allMonths.indexOf(monthStr) + 1,
// //     year: yearNum,
// //     gross_salary: emp.grossSalary,
// //     payable_days: emp.payableDays,
// //     esic_applicable: emp.esicApplicable ? emp.esicApplicable.charAt(0).toUpperCase() : 'N',
// //     gross_earning: emp.grossEarning,
// //     basic_plus_da: emp.basic,
// //     hra: emp.hra,
// //     medical_allowance: emp.medical,
// //     conveyance_allowance: emp.conveyance,
// //     arrears: emp.arrearsE,
// //     total_earnings: emp.totalEarnings,
// //     pf: emp.pf,
// //     esic: emp.esics,
// //     pt: emp.pt,
// //     mlwf: emp.mlwf,
// //     tds: emp.tds,
// //     other_deduction: emp.otherDeduction,
// //     total_deduction: emp.totalDeduction,
// //     net_pay: emp.netPay,
// //     ctc: emp.ctc,
// //     status: "G", // 'G' for Generated
// // });

// // const columnHeaders = [
// //   { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "designation", label: "Designation", width: 150 }, { id: "gender", label: "Gender", width: 100 }, { id: "grossSalary", label: "Gross Salary", width: 130 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "esicApplicable", label: "ESIC (Y/N)", width: 120 }, { id: "grossEarning", label: "Gross Earning", width: 140 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESIC", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100 }, { id: "tds", label: "TDS", width: 100 }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },
// // ];

// // const calculatePayrollMetrics = (employee, monthStr, yearNum) => {
// //   const getDaysInMonth = (year, month) => new Date(year, allMonths.indexOf(month) + 1, 0).getDate();
// //   const daysInMonth = getDaysInMonth(yearNum, monthStr);
// //   const payableDays = employee.payableDays || 0;
// //   const medicalEarning = employee.esicApplicable === 'Yes' ? 0 : (employee.medical || 0);
// //   const grossSalaryForProrata = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + medicalEarning;
// //   const grossEarning = daysInMonth > 0 ? Math.round((grossSalaryForProrata / daysInMonth) * payableDays) : 0;
// //   const totalEarnings = grossEarning + (employee.arrearsE || 0);
// //   const esicsDeduction = employee.esicApplicable === 'Yes' ? Math.round(grossEarning * 0.0075) : 0;
// //   const totalDeduction = (employee.pf || 0) + esicsDeduction + (employee.pt || 0) + (employee.mlwf || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);
// //   const netPay = totalEarnings - totalDeduction;
// //   return { ...employee, medical: medicalEarning, grossEarning, esics: esicsDeduction, totalEarnings, totalDeduction, netPay };
// // };

// // const PayrollReport = () => {
// //   const [month, setMonth] = useState("");
// //   const [year, setYear] = useState("");
// //   const [availableYears, setAvailableYears] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [orderBy, setOrderBy] = useState("name");
// //   const [order, setOrder] = useState("asc");
// //   const [payrollData, setPayrollData] = useState([]);
// //   const [isFrozen, setIsFrozen] = useState(false);
// //   const [freezeDialog, setFreezeDialog] = useState(false);
// //   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
// //   const [updatedRows, setUpdatedRows] = useState(new Set());
// //   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
// //   const [selectedEmployee, setSelectedEmployee] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const currentYear = new Date().getFullYear();
// //     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
// //     setAvailableYears(yearsArray);
// //     setYear(currentYear);
// //     setMonth(allMonths[new Date().getMonth()]);
// //   }, []);

// //   const calculateRow = useCallback((employee) => {
// //     return calculatePayrollMetrics(employee, month, year);
// //   }, [month, year]);

// //   const handleInputChange = (empId, field, value) => {
// //     if (isFrozen) {
// //       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
// //       return;
// //     }
// //     const numericValue = Number.parseFloat(value) || 0;
// //     setPayrollData((prevData) =>
// //       prevData.map((emp) => {
// //         if (emp.empId === empId) {
// //           // Create a new object to avoid direct mutation
// //           const updatedEmp = { ...emp, [field]: numericValue };
// //           return calculateRow(updatedEmp);
// //         }
// //         return emp;
// //       })
// //     );
// //     // Mark as not updated since it's a new change
// //     setUpdatedRows(prev => {
// //         const newSet = new Set(prev);
// //         newSet.delete(empId);
// //         return newSet;
// //     });
// //   };
  
// //   const handleGenerateReport = async () => {
// //     if (!month || !year) {
// //         setSnackbar({ open: true, message: "Please select a month and year.", severity: "error" });
// //         return;
// //     }
// //     setLoading(true);
// //     setPayrollData([]);
// //     const monthIndex = allMonths.indexOf(month) + 1;
// //     const monthParam = monthIndex.toString().padStart(2, '0');

// //     try {
// //         const response = await axiosInstance.get(`/api/payroll_report/${monthParam}/${year}/`);
// //         const transformedData = transformApiToState(response.data);
// //         setPayrollData(transformedData);
// //         setUpdatedRows(new Set());
// //         setIsFrozen(false);
// //         setSnackbar({ open: true, message: `Report successfully generated for ${month} ${year}.`, severity: "info" });
// //     } catch (error) {
// //         console.error("Error fetching payroll report:", error);
// //         setSnackbar({ open: true, message: "Failed to fetch report. No data found or server error.", severity: "error" });
// //     } finally {
// //         setLoading(false);
// //     }
// //   };
  
// //   const handleUpdateChanges = async (empId) => {
// //     const employee = payrollData.find((e) => e.empId === empId);
// //     if (!employee) return;
    
// //     const payload = transformStateToApi(employee, month, year);
    
// //     try {
// //         await axiosInstance.post('/api/save_payroll_report/', payload);
// //         setUpdatedRows((prev) => new Set(prev).add(empId));
// //         setSnackbar({ open: true, message: `Record for ${employee.name} has been saved.`, severity: "success" });
// //     } catch(error) {
// //         console.error("Error saving single employee record:", error);
// //         setSnackbar({ open: true, message: `Failed to save record for ${employee.name}.`, severity: "error" });
// //     }
// //   };

// //   const handleRowClick = (employee) => {
// //     setSelectedEmployee(employee);
// //     setDetailsDialogOpen(true);
// //   };

// //   const getComparator = (order, orderBy) => {
// //     return (a, b) => {
// //       if (["actions", "srNo"].includes(orderBy)) return 0;
// //       let aVal = a[orderBy] || ""; let bVal = b[orderBy] || "";
// //       if (typeof aVal === "string") aVal = aVal.toLowerCase();
// //       if (typeof bVal === "string") bVal = bVal.toLowerCase();
// //       if (aVal < bVal) return order === "asc" ? -1 : 1;
// //       if (aVal > bVal) return order === "asc" ? 1 : -1;
// //       return 0;
// //     };
// //   };

// //   const sortedData = [...payrollData]
// //     .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()))
// //     .sort(getComparator(order, orderBy));

// //   const renderCell = (employee, column, index) => {
// //     const { id: field, editable } = column;
// //     const value = employee[field];
// //     if (field === "srNo") return <TableCell key={field}>{index + 1}</TableCell>;
// //     if (field === "actions") {
// //       const isUpdated = updatedRows.has(employee.empId);
// //       return (
// //         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
// //           <Button variant="contained" size="small" color={isUpdated ? "success" : "primary"} startIcon={isUpdated ? <Check /> : <Save />} onClick={() => handleUpdateChanges(employee.empId)} disabled={isFrozen || isUpdated} sx={{ width: "120px" }}>
// //             {isUpdated ? "Saved" : "Save"}
// //           </Button>
// //         </TableCell>
// //       );
// //     }
// //     if (editable) return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}><TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} /></TableCell>;
// //     if (field === 'esics' && employee.esicApplicable === 'No') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// //     if (field === 'medical' && employee.esicApplicable === 'Yes') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
// //     const isNumeric = typeof value === "number"; const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);
// //     let displayValue = value;
// //     if (isNumeric && field !== 'payableDays') displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
// //     return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : 'normal'), backgroundColor: isCalculated ? "#f0f4f8" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>{displayValue}</TableCell>;
// //   };
  
// //   const handleSort = (property) => { const isAsc = orderBy === property && order === "asc"; setOrder(isAsc ? "desc" : "asc"); setOrderBy(property); };
  
// //   const handleFreezeData = async () => {
// //     if (payrollData.length === 0) {
// //       setSnackbar({ open: true, message: "No data to freeze.", severity: "error" });
// //       setFreezeDialog(false);
// //       return;
// //     }
// //     const payload = payrollData.map(emp => transformStateToApi(emp, month, year));
    
// //     try {
// //         await axiosInstance.post('/api/save_payroll_report/', payload);
// //         setIsFrozen(true);
// //         setFreezeDialog(false);
// //         setSnackbar({ open: true, message: "All payroll data has been saved and frozen successfully!", severity: "success" });
// //     } catch (error) {
// //         console.error("Error freezing/saving all records:", error);
// //         setSnackbar({ open: true, message: "Failed to save all records.", severity: "error" });
// //     }
// //   };

// //   const handleUnfreezeData = () => { setIsFrozen(false); setUnfreezeDialog(false); setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" }); };
// //   const handleDownloadExcel = () => setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
// //   const handleDetailsDialogClose = () => setDetailsDialogOpen(false);

// //   return (
// //     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
// //       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE. Changes can be made."}</Alert></Box>
// //       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
// //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{allMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth onClick={handleGenerateReport} disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send/>} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>{loading ? "Loading..." : "Submit"}</Button></Grid>
// //         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Save all records and freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "error"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Save & Freeze All"}</Button></Tooltip></Grid>
// //       </Grid>
// //       <Grid container spacing={2} sx={{ mb: 2 }}>
// //         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
// //         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search by Name or ID" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
// //       </Grid>
// //       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
// //         <Table stickyHeader size="small">
// //           <TableHead>
// //             <TableRow><TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>
// //             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>{columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}</TableRow>
// //           </TableHead>
// //           <TableBody>{sortedData.map((emp, index) => (<TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>{columnHeaders.map((col) => renderCell(emp, col, index))}</TableRow>))}</TableBody>
// //         </Table>
// //       </TableContainer>
// //       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Confirm Save & Freeze Payroll</DialogTitle><DialogContent><DialogContentText>This will save all current records and lock the data for {month} {year} to prevent further edits. Are you sure?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="error">Save & Freeze</Button></DialogActions></Dialog>
// //       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Confirm Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits to be made again.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
// //       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>{selectedEmployee && (<><DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle><DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent><DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions></>)}</Dialog>
// //       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">{snackbar.message}</Alert></Snackbar>
// //     </Container>
// //   );
// // };

// // export default PayrollReport;



// import { useState, useEffect, useCallback } from "react";
// import {
//   Container,
//   Grid,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TableSortLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogContentText,
//   Alert,
//   Snackbar,
//   Box,
//   Typography,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// // Helper to transform API response to component state
// const transformApiToState = (apiData) => {
//   return apiData.map(apiEmp => ({
//     payroll_report_id: apiEmp["payroll_report_id"],
//     id: apiEmp["Sr. No."],
//     empId: apiEmp["Employee ID"],
//     name: apiEmp["Employee Name"],
//     dept: apiEmp["Department"],
//     designation: apiEmp["Designation"],
//     gender: apiEmp["M/F"],
//     grossSalary: apiEmp["Gross Salary"],
//     payableDays: apiEmp["Days"],
//     esicApplicable: apiEmp["ESIC Applicable"],
//     grossEarning: apiEmp["Gross Earning"],
//     basic: apiEmp["Basic"],
//     hra: apiEmp["HRA"],
//     conveyance: apiEmp["Conveyance"],
//     medical: apiEmp["Medical"],
//     arrearsE: apiEmp["Arrears"],
//     totalEarnings: apiEmp["Total Earnings"],
//     pf: apiEmp["PF"],
//     // ESICS is treated as a fixed value from the API
//     esics: apiEmp["ESICS"], 
//     pt: apiEmp["PT"],
//     mlwf: apiEmp["MLWF"],
//     tds: apiEmp["TDS"],
//     otherDeduction: apiEmp["Other Deduction"],
//     totalDeduction: apiEmp["Total Deduction"],
//     netPay: apiEmp["Net Pay"],
//     ctc: apiEmp["CTC"],
//     accountTitle: apiEmp["accountTitle"] || "N/A",
//     accountNumber: apiEmp["accountNumber"] || "N/A",
//     bankName: apiEmp["bankName"] || "N/A",
//     ifscCode: apiEmp["ifscCode"] || "N/A",
//     bankBranch: apiEmp["bankBranch"] || "N/A",
//     pfNumber: apiEmp["pfNumber"] || "N/A",
//     panNumber: apiEmp["panNumber"] || "N/A",
//     esicNumber: apiEmp["esicNumber"] || "N/A",
//   }));
// };

// // Helper to transform component state to API payload
// const transformStateToApi = (emp, monthStr, yearNum) => ({
//     payroll_report_id: emp.payroll_report_id || undefined,
//     employee_id: emp.empId,
//     employee_name: emp.name,
//     gender: emp.gender ? emp.gender.charAt(0).toUpperCase() : 'M',
//     department_id: emp.department_id || "3",
//     designation_id: emp.designation_id || "6",
//     month: allMonths.indexOf(monthStr) + 1,
//     year: yearNum,
//     gross_salary: emp.grossSalary,
//     payable_days: emp.payableDays,
//     esic_applicable: emp.esicApplicable ? emp.esicApplicable.charAt(0).toUpperCase() : 'N',
//     gross_earning: emp.grossEarning,
//     basic_plus_da: emp.basic,
//     hra: emp.hra,
//     medical_allowance: emp.medical,
//     conveyance_allowance: emp.conveyance,
//     arrears: emp.arrearsE,
//     total_earnings: emp.totalEarnings,
//     pf: emp.pf,
//     esic: emp.esics, // Send the fixed ESIC value back
//     pt: emp.pt,
//     mlwf: emp.mlwf,
//     tds: emp.tds,
//     other_deduction: emp.otherDeduction,
//     total_deduction: emp.totalDeduction,
//     net_pay: emp.netPay,
//     ctc: emp.ctc,
//     status: "G",
// });

// const columnHeaders = [
//   { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "designation", label: "Designation", width: 150 }, { id: "gender", label: "Gender", width: 100 }, { id: "grossSalary", label: "Gross Salary", width: 130 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "esicApplicable", label: "ESIC (Y/N)", width: 120 }, { id: "grossEarning", label: "Gross Earning", width: 140 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESIC", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100 }, { id: "tds", label: "TDS", width: 100 }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },
// ];

// /**
//  * Recalculates summary fields.
//  * CRITICAL CHANGE: This function NO LONGER calculates the ESIC value.
//  * It treats the `employee.esics` field as a fixed input set by an admin.
//  */
// const calculatePayrollMetrics = (employee, monthStr, yearNum) => {
//   const getDaysInMonth = (year, month) => new Date(year, allMonths.indexOf(month) + 1, 0).getDate();
//   const daysInMonth = getDaysInMonth(yearNum, monthStr);
//   const payableDays = employee.payableDays || 0;
  
//   const medicalEarning = employee.esicApplicable === 'Yes' ? 0 : (employee.medical || 0);
//   const grossSalaryForProrata = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + medicalEarning;
  
//   // Recalculate earnings
//   const grossEarning = daysInMonth > 0 ? Math.round((grossSalaryForProrata / daysInMonth) * payableDays) : 0;
//   const totalEarnings = grossEarning + (employee.arrearsE || 0);

//   // Recalculate deductions using the FIXED ESIC value
//   // The line that calculated ESIC has been REMOVED.
//   const totalDeduction = 
//     (employee.pf || 0) + 
//     (employee.esics || 0) + // Using the existing esics value directly
//     (employee.pt || 0) + 
//     (employee.mlwf || 0) + 
//     (employee.tds || 0) + 
//     (employee.otherDeduction || 0);
    
//   // Recalculate Net Pay
//   const netPay = totalEarnings - totalDeduction;
  
//   // Return the updated employee object, preserving the original 'esics' value
//   return { ...employee, medical: medicalEarning, grossEarning, totalEarnings, totalDeduction, netPay };
// };


// const PayrollReport = () => {
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [availableYears, setAvailableYears] = useState([]);
//   const [search, setSearch] = useState("");
//   const [orderBy, setOrderBy] = useState("name");
//   const [order, setOrder] = useState("asc");
//   const [payrollData, setPayrollData] = useState([]);
//   const [isFrozen, setIsFrozen] = useState(false);
//   const [freezeDialog, setFreezeDialog] = useState(false);
//   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [updatedRows, setUpdatedRows] = useState(new Set());
//   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const currentYear = new Date().getFullYear();
//     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
//     setAvailableYears(yearsArray);
//     setYear(currentYear);
//     setMonth(allMonths[new Date().getMonth()]);
//   }, []);

//   const calculateRow = useCallback((employee) => {
//     return calculatePayrollMetrics(employee, month, year);
//   }, [month, year]);

//   const handleInputChange = (empId, field, value) => {
//     if (isFrozen) {
//       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
//       return;
//     }
//     const numericValue = Number.parseFloat(value) || 0;
//     setPayrollData((prevData) =>
//       prevData.map((emp) => {
//         if (emp.empId === empId) {
//           const updatedEmp = { ...emp, [field]: numericValue };
//           return calculateRow(updatedEmp);
//         }
//         return emp;
//       })
//     );
//     setUpdatedRows(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(empId);
//         return newSet;
//     });
//   };
  
//   const handleGenerateReport = async () => {
//     if (!month || !year) {
//         setSnackbar({ open: true, message: "Please select a month and year.", severity: "error" });
//         return;
//     }
//     setLoading(true);
//     setPayrollData([]);
//     const monthIndex = allMonths.indexOf(month) + 1;
//     const monthParam = monthIndex.toString().padStart(2, '0');

//     try {
//         const response = await axiosInstance.get(`/api/payroll_report/${monthParam}/${year}/`);
//         const transformedData = transformApiToState(response.data);
//         setPayrollData(transformedData);
//         setUpdatedRows(new Set());
//         setIsFrozen(false);
//         setSnackbar({ open: true, message: `Report successfully generated for ${month} ${year}.`, severity: "info" });
//     } catch (error) {
//         console.error("Error fetching payroll report:", error);
//         setSnackbar({ open: true, message: "Failed to fetch report. No data found or server error.", severity: "error" });
//     } finally {
//         setLoading(false);
//     }
//   };
  
//   const handleUpdateChanges = async (empId) => {
//     const employee = payrollData.find((e) => e.empId === empId);
//     if (!employee) return;
    
//     const payload = transformStateToApi(employee, month, year);
    
//     try {
//         await axiosInstance.post('/api/save_payroll_report/', payload);
//         setUpdatedRows((prev) => new Set(prev).add(empId));
//         setSnackbar({ open: true, message: `Record for ${employee.name} has been saved.`, severity: "success" });
//     } catch(error) {
//         console.error("Error saving single employee record:", error);
//         setSnackbar({ open: true, message: `Failed to save record for ${employee.name}.`, severity: "error" });
//     }
//   };

//   const handleRowClick = (employee) => {
//     setSelectedEmployee(employee);
//     setDetailsDialogOpen(true);
//   };

//   const getComparator = (order, orderBy) => {
//     return (a, b) => {
//       if (["actions", "srNo"].includes(orderBy)) return 0;
//       let aVal = a[orderBy] || ""; let bVal = b[orderBy] || "";
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return order === "asc" ? -1 : 1;
//       if (aVal > bVal) return order === "asc" ? 1 : -1;
//       return 0;
//     };
//   };

//   const sortedData = [...payrollData]
//     .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()))
//     .sort(getComparator(order, orderBy));

//   const renderCell = (employee, column, index) => {
//     const { id: field, editable } = column;
//     const value = employee[field];
//     if (field === "srNo") return <TableCell key={field}>{index + 1}</TableCell>;
//     if (field === "actions") {
//       const isUpdated = updatedRows.has(employee.empId);
//       return (
//         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
//           <Button variant="contained" size="small" color={isUpdated ? "success" : "primary"} startIcon={isUpdated ? <Check /> : <Save />} onClick={() => handleUpdateChanges(employee.empId)} disabled={isFrozen || isUpdated} sx={{ width: "120px" }}>
//             {isUpdated ? "Saved" : "Save"}
//           </Button>
//         </TableCell>
//       );
//     }
//     // The `esics` column is now just a display field like `pf` or `pt`
//     if (editable) return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}><TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} /></TableCell>;
//     if (field === 'esics' && employee.esicApplicable === 'No') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
//     if (field === 'medical' && employee.esicApplicable === 'Yes') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
//     const isNumeric = typeof value === "number"; const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);
//     let displayValue = value;
//     if (isNumeric && field !== 'payableDays') displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
//     return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : 'normal'), backgroundColor: isCalculated ? "#f0f4f8" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>{displayValue}</TableCell>;
//   };
  
//   const handleSort = (property) => { const isAsc = orderBy === property && order === "asc"; setOrder(isAsc ? "desc" : "asc"); setOrderBy(property); };
  
//   const handleFreezeData = async () => {
//     if (payrollData.length === 0) {
//       setSnackbar({ open: true, message: "No data to freeze.", severity: "error" });
//       setFreezeDialog(false);
//       return;
//     }
//     const payload = payrollData.map(emp => transformStateToApi(emp, month, year));
    
//     try {
//         await axiosInstance.post('/api/save_payroll_report/', payload);
//         setIsFrozen(true);
//         setFreezeDialog(false);
//         setSnackbar({ open: true, message: "All payroll data has been saved and frozen successfully!", severity: "success" });
//     } catch (error) {
//         console.error("Error freezing/saving all records:", error);
//         setSnackbar({ open: true, message: "Failed to save all records.", severity: "error" });
//     }
//   };

//   const handleUnfreezeData = () => { setIsFrozen(false); setUnfreezeDialog(false); setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" }); };
//   const handleDownloadExcel = () => setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
//   const handleDetailsDialogClose = () => setDetailsDialogOpen(false);

//   return (
//     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
//       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE. Changes can be made."}</Alert></Box>
//       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen}>{allMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth onClick={handleGenerateReport} disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send/>} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>{loading ? "Loading..." : "Submit"}</Button></Grid>
//         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Save all records and freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "error"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Save & Freeze All"}</Button></Tooltip></Grid>
//       </Grid>
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
//         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search by Name or ID" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
//       </Grid>
//       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow><TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>{columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}</TableRow>
//           </TableHead>
//           <TableBody>{sortedData.map((emp, index) => (<TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>{columnHeaders.map((col) => renderCell(emp, col, index))}</TableRow>))}</TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Confirm Save & Freeze Payroll</DialogTitle><DialogContent><DialogContentText>This will save all current records and lock the data for {month} {year} to prevent further edits. Are you sure?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="error">Save & Freeze</Button></DialogActions></Dialog>
//       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Confirm Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits to be made again.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
//       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>{selectedEmployee && (<><DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle><DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent><DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions></>)}</Dialog>
//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">{snackbar.message}</Alert></Snackbar>
//     </Container>
//   );
// };

// export default PayrollReport;


// import { useState, useEffect, useCallback } from "react";

// import {

//   Container,

//   Grid,

//   Button,

//   TextField,

//   Select,

//   MenuItem,

//   InputLabel,

//   FormControl,

//   Table,

//   TableBody,

//   TableCell,

//   TableContainer,

//   TableHead,

//   TableRow,

//   Paper,

//   TableSortLabel,

//   Dialog,

//   DialogTitle,

//   DialogContent,

//   DialogActions,

//   DialogContentText,

//   Alert,

//   Snackbar,

//   Box,

//   Typography,

//   Tooltip,

//   CircularProgress,

// } from "@mui/material";

// import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material";

// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct

 

// const allMonths = [

//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",

// ];

 

// // Helper to transform API response to component state

// const transformApiToState = (apiData) => {

//   return apiData.map(apiEmp => ({

//     payroll_report_id: apiEmp["payroll_report_id"],

//     id: apiEmp["Sr. No."],

//     empId: apiEmp["Employee ID"],

//     name: apiEmp["Employee Name"],

//     dept: apiEmp["Department"],

//     designation: apiEmp["Designation"],

//     gender: apiEmp["M/F"],

//     grossSalary: apiEmp["Gross Salary"],

//     payableDays: apiEmp["Days"],

//     esicApplicable: apiEmp["ESIC Applicable"],

//     grossEarning: apiEmp["Gross Earning"],

//     basic: apiEmp["Basic"],

//     hra: apiEmp["HRA"],

//     conveyance: apiEmp["Conveyance"],

//     medical: apiEmp["Medical"],

//     arrearsE: apiEmp["Arrears"],

//     totalEarnings: apiEmp["Total Earnings"],

//     pf: apiEmp["PF"],

//     // ESICS is treated as a fixed value from the API

//     esics: apiEmp["ESICS"],

//     pt: apiEmp["PT"],

//     mlwf: apiEmp["MLWF"],

//     tds: apiEmp["TDS"],

//     otherDeduction: apiEmp["Other Deduction"],

//     totalDeduction: apiEmp["Total Deduction"],

//     netPay: apiEmp["Net Pay"],

//     ctc: apiEmp["CTC"],

//     accountTitle: apiEmp["accountTitle"] || "N/A",

//     accountNumber: apiEmp["accountNumber"] || "N/A",

//     bankName: apiEmp["bankName"] || "N/A",

//     ifscCode: apiEmp["ifscCode"] || "N/A",

//     bankBranch: apiEmp["bankBranch"] || "N/A",

//     pfNumber: apiEmp["pfNumber"] || "N/A",

//     panNumber: apiEmp["panNumber"] || "N/A",

//     esicNumber: apiEmp["esicNumber"] || "N/A",

//   }));

// };

 

// // Helper to transform component state to API payload

// const transformStateToApi = (emp, monthStr, yearNum) => ({

//     payroll_report_id: emp.payroll_report_id || undefined,

//     employee_id: emp.empId,

//     employee_name: emp.name,

//     gender: emp.gender ? emp.gender.charAt(0).toUpperCase() : 'M',

//     department_id: emp.department_id || "3",

//     designation_id: emp.designation_id || "6",

//     month: allMonths.indexOf(monthStr) + 1,

//     year: yearNum,

//     gross_salary: emp.grossSalary,

//     payable_days: emp.payableDays,

//     esic_applicable: emp.esicApplicable ? emp.esicApplicable.charAt(0).toUpperCase() : 'N',

//     gross_earning: emp.grossEarning,

//     basic_plus_da: emp.basic,

//     hra: emp.hra,

//     medical_allowance: emp.medical,

//     conveyance_allowance: emp.conveyance,

//     arrears: emp.arrearsE,

//     total_earnings: emp.totalEarnings,

//     pf: emp.pf,

//     esic: emp.esics, // Send the fixed ESIC value back

//     pt: emp.pt,

//     mlwf: emp.mlwf,

//     tds: emp.tds,

//     other_deduction: emp.otherDeduction,

//     total_deduction: emp.totalDeduction,

//     net_pay: emp.netPay,

//     ctc: emp.ctc,

//     status: "G",

// });

 

// const columnHeaders = [

//   { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "designation", label: "Designation", width: 150 }, { id: "gender", label: "Gender", width: 100 }, { id: "grossSalary", label: "Gross Salary", width: 130 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "esicApplicable", label: "ESIC (Y/N)", width: 120 }, { id: "grossEarning", label: "Gross Earning", width: 140 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESIC", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100 }, { id: "tds", label: "TDS", width: 100 }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },

// ];

 

// /**

//  * Recalculates summary fields.

//  * CRITICAL CHANGE: This function NO LONGER calculates the ESIC value.

//  * It treats the `employee.esics` field as a fixed input set by an admin.

//  */

// const calculatePayrollMetrics = (employee, monthStr, yearNum) => {

//   const getDaysInMonth = (year, month) => new Date(year, allMonths.indexOf(month) + 1, 0).getDate();

//   const daysInMonth = getDaysInMonth(yearNum, monthStr);

//   const payableDays = employee.payableDays || 0;

 

//   const medicalEarning = employee.esicApplicable === 'Yes' ? 0 : (employee.medical || 0);

//   const grossSalaryForProrata = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + medicalEarning;

 

//   // Recalculate earnings

//   const grossEarning = daysInMonth > 0 ? Math.round((grossSalaryForProrata / daysInMonth) * payableDays) : 0;

//   const totalEarnings = grossEarning + (employee.arrearsE || 0);

 

//   // Recalculate deductions using the FIXED ESIC value

//   // The line that calculated ESIC has been REMOVED.

//   const totalDeduction =

//     (employee.pf || 0) +

//     (employee.esics || 0) + // Using the existing esics value directly

//     (employee.pt || 0) +

//     (employee.mlwf || 0) +

//     (employee.tds || 0) +

//     (employee.otherDeduction || 0);

   

//   // Recalculate Net Pay

//   const netPay = totalEarnings - totalDeduction;

 

//   // Return the updated employee object, preserving the original 'esics' value

//   return { ...employee, medical: medicalEarning, grossEarning, totalEarnings, totalDeduction, netPay };

// };

 

// const PayrollReport = () => {

//   const [month, setMonth] = useState("");

//   const [year, setYear] = useState("");

//   const [availableYears, setAvailableYears] = useState([]);

//   const [search, setSearch] = useState("");

//   const [orderBy, setOrderBy] = useState("name");

//   const [order, setOrder] = useState("asc");

//   const [payrollData, setPayrollData] = useState([]);

//   const [isFrozen, setIsFrozen] = useState(false);

//   const [freezeDialog, setFreezeDialog] = useState(false);

//   const [unfreezeDialog, setUnfreezeDialog] = useState(false);

//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const [updatedRows, setUpdatedRows] = useState(new Set());

//   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const [loading, setLoading] = useState(false);

 

//   useEffect(() => {

//     const currentYear = new Date().getFullYear();

//     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

//     setAvailableYears(yearsArray);

//     setYear(currentYear);

//     setMonth(allMonths[new Date().getMonth()]);

//   }, []);

 

//   const calculateRow = useCallback((employee) => {

//     return calculatePayrollMetrics(employee, month, year);

//   }, [month, year]);

 

//   const handleInputChange = (empId, field, value) => {

//     if (isFrozen) {

//       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });

//       return;

//     }

//     const numericValue = Number.parseFloat(value) || 0;

//     setPayrollData((prevData) =>

//       prevData.map((emp) => {

//         if (emp.empId === empId) {

//           const updatedEmp = { ...emp, [field]: numericValue };

//           return calculateRow(updatedEmp);

//         }

//         return emp;

//       })

//     );

//     setUpdatedRows(prev => {

//         const newSet = new Set(prev);

//         newSet.delete(empId);

//         return newSet;

//     });

//   };

 

//   const handleGenerateReport = async () => {

//     if (!month || !year) {

//         setSnackbar({ open: true, message: "Please select a month and year.", severity: "error" });

//         return;

//     }

//     setLoading(true);

//     setPayrollData([]);

//     const monthIndex = allMonths.indexOf(month) + 1;

//     const monthParam = monthIndex.toString().padStart(2, '0');

 

//     try {

//         const response = await axiosInstance.get(`/api/payroll_report/${monthParam}/${year}/`);

//         const transformedData = transformApiToState(response.data);

//         setPayrollData(transformedData);

//         setUpdatedRows(new Set());

//         setIsFrozen(false);

//         setSnackbar({ open: true, message: `Report successfully generated for ${month} ${year}.`, severity: "info" });

//     } catch (error) {

//         console.error("Error fetching payroll report:", error);

//         setSnackbar({ open: true, message: "Failed to fetch report. No data found or server error.", severity: "error" });

//     } finally {

//         setLoading(false);

//     }

//   };

 

//   const handleUpdateChanges = async (empId) => {

//     const employee = payrollData.find((e) => e.empId === empId);

//     if (!employee) return;

   

//     const payload = transformStateToApi(employee, month, year);

   

//     try {

//         await axiosInstance.post('/api/save_payroll_report/', payload);

//         setUpdatedRows((prev) => new Set(prev).add(empId));

//         setSnackbar({ open: true, message: `Record for ${employee.name} has been saved.`, severity: "success" });

//     } catch(error) {

//         console.error("Error saving single employee record:", error);

//         setSnackbar({ open: true, message: `Failed to save record for ${employee.name}.`, severity: "error" });

//     }

//   };

 

//   const handleRowClick = (employee) => {

//     setSelectedEmployee(employee);

//     setDetailsDialogOpen(true);

//   };

 

//   const getComparator = (order, orderBy) => {

//     return (a, b) => {

//       if (["actions", "srNo"].includes(orderBy)) return 0;

//       let aVal = a[orderBy] || ""; let bVal = b[orderBy] || "";

//       if (typeof aVal === "string") aVal = aVal.toLowerCase();

//       if (typeof bVal === "string") bVal = bVal.toLowerCase();

//       if (aVal < bVal) return order === "asc" ? -1 : 1;

//       if (aVal > bVal) return order === "asc" ? 1 : -1;

//       return 0;

//     };

//   };

 

//   const sortedData = [...payrollData]

//     .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()))

//     .sort(getComparator(order, orderBy));

 

//   const renderCell = (employee, column, index) => {

//     const { id: field, editable } = column;

//     const value = employee[field];

//     if (field === "srNo") return <TableCell key={field}>{index + 1}</TableCell>;

//     if (field === "actions") {

//       const isUpdated = updatedRows.has(employee.empId);

//       return (

//         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>

//           <Button variant="contained" size="small" color={isUpdated ? "success" : "primary"} startIcon={isUpdated ? <Check /> : <Save />} onClick={() => handleUpdateChanges(employee.empId)} disabled={isFrozen || isUpdated} sx={{ width: "120px" }}>

//             {isUpdated ? "Saved" : "Save"}

//           </Button>

//         </TableCell>

//       );

//     }

   

//     if (editable) return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}><TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} /></TableCell>;

//     if (field === 'esics' && employee.esicApplicable === 'No') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;

//     if (field === 'medical' && employee.esicApplicable === 'Yes') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;

//     const isNumeric = typeof value === "number"; const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);

//     let displayValue = value;

//     if (isNumeric && field !== 'payableDays') displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

//     return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : 'normal'), backgroundColor: isCalculated ? "#f0f4f8" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>{displayValue}</TableCell>;

//   };

 

//   const handleSort = (property) => { const isAsc = orderBy === property && order === "asc"; setOrder(isAsc ? "desc" : "asc"); setOrderBy(property); };

 

//   const handleFreezeData = async () => {

//     if (payrollData.length === 0) {

//       setSnackbar({ open: true, message: "No data to freeze.", severity: "error" });

//       setFreezeDialog(false);

//       return;

//     }

//     const payload = payrollData.map(emp => transformStateToApi(emp, month, year));

   

//     try {

//         await axiosInstance.post('/api/save_payroll_report/', payload);

//         setIsFrozen(true);

//         setFreezeDialog(false);

//         setSnackbar({ open: true, message: "All payroll data has been saved and frozen successfully!", severity: "success" });

//     } catch (error) {

//         console.error("Error freezing/saving all records:", error);

//         setSnackbar({ open: true, message: "Failed to save all records.", severity: "error" });

//     }

//   };

 

//   const handleUnfreezeData = () => { setIsFrozen(false); setUnfreezeDialog(false); setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" }); };

//   const handleDownloadExcel = () => setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });

//   const handleDetailsDialogClose = () => setDetailsDialogOpen(false);

 

//   return (

//     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>

//       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE. Changes can be made."}</Alert></Box>

//       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>

//         <Grid item xs={12} sm={6} md={3}>

//           <FormControl fullWidth size="small">

//             <InputLabel>Month</InputLabel>

//             <Select

//               value={month}

//               onChange={(e) => setMonth(e.target.value)}

//               label="Month"

//               disabled={isFrozen}

//               MenuProps={{

//                 anchorOrigin: {

//                   vertical: "bottom",

//                   horizontal: "left",

//                 },

//                 transformOrigin: {

//                   vertical: "top",

//                   horizontal: "left",

//                 },

//                 getContentAnchorEl: null,

//                 PaperProps: {

//                   style: {

//                     maxHeight: 256,

//                   },

//                 },

//               }}

//             >

//               {allMonths.map((m) => (

//                 <MenuItem key={m} value={m}>

//                   {m}

//                 </MenuItem>

//               ))}

//             </Select>

//           </FormControl>

//         </Grid>

//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth onClick={handleGenerateReport} disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send/>} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>{loading ? "Loading..." : "Submit"}</Button></Grid>

//         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Save all records and freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "error"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Save & Freeze All"}</Button></Tooltip></Grid>

//       </Grid>

//       <Grid container spacing={2} sx={{ mb: 2 }}>

//         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>

//         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search by Name or ID" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>

//       </Grid>

//       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>

//         <Table stickyHeader size="small">

//           <TableHead>

//             <TableRow><TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>

//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>{columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}</TableRow>

//           </TableHead>

//           <TableBody>{sortedData.map((emp, index) => (<TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>{columnHeaders.map((col) => renderCell(emp, col, index))}</TableRow>))}</TableBody>

//         </Table>

//       </TableContainer>

//       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Confirm Save & Freeze Payroll</DialogTitle><DialogContent><DialogContentText>This will save all current records and lock the data for {month} {year} to prevent further edits. Are you sure?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="error">Save & Freeze</Button></DialogActions></Dialog>

//       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Confirm Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits to be made again.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>

//       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>{selectedEmployee && (<><DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle><DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent><DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions></>)}</Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">{snackbar.message}</Alert></Snackbar>

//     </Container>

//   );

// };

 

// export default PayrollReport;





// import { useState, useEffect, useCallback } from "react";
// import {
//   Container,
//   Grid,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TableSortLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogContentText,
//   Alert,
//   Snackbar,
//   Box,
//   Typography,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// import Swal from 'sweetalert2';

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// // Helper to transform API response to component state
// const transformApiToState = (apiData) => {
//   return apiData.map(apiEmp => ({
//     payroll_report_id: apiEmp["payroll_report_id"],
//     id: apiEmp["Sr. No."],
//     empId: apiEmp["Employee ID"],
//     name: apiEmp["Employee Name"],
//     dept: apiEmp["Department"],
//     designation: apiEmp["Designation"],
//     gender: apiEmp["M/F"],
//     grossSalary: apiEmp["Gross Salary"],
//     payableDays: apiEmp["Days"],
//     esicApplicable: apiEmp["ESIC Applicable"],
//     grossEarning: apiEmp["Gross Earning"],
//     basic: apiEmp["Basic"],
//     hra: apiEmp["HRA"],
//     conveyance: apiEmp["Conveyance"],
//     medical: apiEmp["Medical"],
//     arrearsE: apiEmp["Arrears"],
//     totalEarnings: apiEmp["Total Earnings"],
//     pf: apiEmp["PF"],
//     // ESICS is treated as a fixed value from the API
//     esics: apiEmp["ESICS"],
//     pt: apiEmp["PT"],
//     mlwf: apiEmp["MLWF"],
//     tds: apiEmp["TDS"],
//     otherDeduction: apiEmp["Other Deduction"],
//     totalDeduction: apiEmp["Total Deduction"],
//     netPay: apiEmp["Net Pay"],
//     ctc: apiEmp["CTC"],
//     accountTitle: apiEmp["accountTitle"] || "N/A",
//     accountNumber: apiEmp["accountNumber"] || "N/A",
//     bankName: apiEmp["bankName"] || "N/A",
//     ifscCode: apiEmp["ifscCode"] || "N/A",
//     bankBranch: apiEmp["bankBranch"] || "N/A",
//     pfNumber: apiEmp["pfNumber"] || "N/A",
//     panNumber: apiEmp["panNumber"] || "N/A",
//     esicNumber: apiEmp["esicNumber"] || "N/A",
//   }));
// };

// // Helper to transform component state to API payload
// const transformStateToApi = (emp, monthStr, yearNum) => ({
//     payroll_report_id: emp.payroll_report_id || undefined,
//     employee_id: emp.empId,
//     employee_name: emp.name,
//     gender: emp.gender ? emp.gender.charAt(0).toUpperCase() : 'M',
//     department_id: emp.department_id || "3",
//     designation_id: emp.designation_id || "6",
//     month: allMonths.indexOf(monthStr) + 1,
//     year: yearNum,
//     gross_salary: emp.grossSalary,
//     payable_days: emp.payableDays,
//     esic_applicable: emp.esicApplicable ? emp.esicApplicable.charAt(0).toUpperCase() : 'N',
//     gross_earning: emp.grossEarning,
//     basic_plus_da: emp.basic,
//     hra: emp.hra,
//     medical_allowance: emp.medical,
//     conveyance_allowance: emp.conveyance,
//     arrears: emp.arrearsE,
//     total_earnings: emp.totalEarnings,
//     pf: emp.pf,
//     esic: emp.esics, // Send the fixed ESIC value back
//     pt: emp.pt,
//     mlwf: emp.mlwf,
//     tds: emp.tds,
//     other_deduction: emp.otherDeduction,
//     total_deduction: emp.totalDeduction,
//     net_pay: emp.netPay,
//     ctc: emp.ctc,
//     status: "G",
// });

// const columnHeaders = [
//   { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "designation", label: "Designation", width: 150 }, { id: "gender", label: "Gender", width: 100 }, { id: "grossSalary", label: "Gross Salary", width: 130 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "esicApplicable", label: "ESIC (Y/N)", width: 120 }, { id: "grossEarning", label: "Gross Earning", width: 140 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESIC", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100 }, { id: "tds", label: "TDS", width: 100 }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },
// ];

// /**
//  * Recalculates summary fields.
//  * CRITICAL CHANGE: This function NO LONGER calculates the ESIC value.
//  * It treats the `employee.esics` field as a fixed input set by an admin.
//  */
// const calculatePayrollMetrics = (employee, monthStr, yearNum) => {
//   const getDaysInMonth = (year, month) => new Date(year, allMonths.indexOf(month) + 1, 0).getDate();
//   const daysInMonth = getDaysInMonth(yearNum, monthStr);
//   const payableDays = employee.payableDays || 0;

//   const medicalEarning = employee.esicApplicable === 'Yes' ? 0 : (employee.medical || 0);
//   const grossSalaryForProrata = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + medicalEarning;

//   // Recalculate earnings
//   const grossEarning = daysInMonth > 0 ? Math.round((grossSalaryForProrata / daysInMonth) * payableDays) : 0;
//   const totalEarnings = grossEarning + (employee.arrearsE || 0);

//   // Recalculate deductions using the FIXED ESIC value
//   // The line that calculated ESIC has been REMOVED.
//   const totalDeduction =
//     (employee.pf || 0) +
//     (employee.esics || 0) + // Using the existing esics value directly
//     (employee.pt || 0) +
//     (employee.mlwf || 0) +
//     (employee.tds || 0) +
//     (employee.otherDeduction || 0);
   
//   // Recalculate Net Pay
//   const netPay = totalEarnings - totalDeduction;

//   // Return the updated employee object, preserving the original 'esics' value
//   return { ...employee, medical: medicalEarning, grossEarning, totalEarnings, totalDeduction, netPay };
// };

// const PayrollReport = () => {
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [availableYears, setAvailableYears] = useState([]);
//   const [search, setSearch] = useState("");
//   const [orderBy, setOrderBy] = useState("name");
//   const [order, setOrder] = useState("asc");
//   const [payrollData, setPayrollData] = useState([]);
//   const [isFrozen, setIsFrozen] = useState(false);
//   const [freezeDialog, setFreezeDialog] = useState(false);
//   const [unfreezeDialog, setUnfreezeDialog] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [updatedRows, setUpdatedRows] = useState(new Set());
//   const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const currentYear = new Date().getFullYear();
//     const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
//     setAvailableYears(yearsArray);
//     setYear(currentYear);
//     setMonth(allMonths[new Date().getMonth()]);
//   }, []);

//   const calculateRow = useCallback((employee) => {
//     return calculatePayrollMetrics(employee, month, year);
//   }, [month, year]);

//   const handleInputChange = (empId, field, value) => {
//     if (isFrozen) {
//       setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
//       return;
//     }
//     const numericValue = Number.parseFloat(value) || 0;
//     setPayrollData((prevData) =>
//       prevData.map((emp) => {
//         if (emp.empId === empId) {
//           const updatedEmp = { ...emp, [field]: numericValue };
//           return calculateRow(updatedEmp);
//         }
//         return emp;
//       })
//     );
//     setUpdatedRows(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(empId);
//         return newSet;
//     });
//   };

//   const handleGenerateReport = async () => {
//     if (!month || !year) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Please select a month and year.',
//         });
//         return;
//     }
//     setLoading(true);
//     setPayrollData([]);
//     const monthIndex = allMonths.indexOf(month) + 1;
//     const monthParam = monthIndex.toString().padStart(2, '0');

//     try {
//         const response = await axiosInstance.get(`/api/payroll_report/${monthParam}/${year}/`);
//         const transformedData = transformApiToState(response.data);
//         setPayrollData(transformedData);
//         setUpdatedRows(new Set());
//         setIsFrozen(false);
//         Swal.fire({
//             icon: 'success',
//             title: 'Success!',
//             text: `Report successfully generated for ${month} ${year}.`,
//         });
//     } catch (error) {
//         console.error("Error fetching payroll report:", error);
//         Swal.fire({
//             icon: 'error',
//             title: 'Network Error',
//             text: 'Failed to fetch report. No data found or server error.',
//         });
//     } finally {
//         setLoading(false);
//     }
//   };

//   const handleUpdateChanges = async (empId) => {
//     const employee = payrollData.find((e) => e.empId === empId);
//     if (!employee) return;
   
//     const payload = transformStateToApi(employee, month, year);
   
//     try {
//         await axiosInstance.post('/api/save_payroll_report/', payload);
//         setUpdatedRows((prev) => new Set(prev).add(empId));
//         setSnackbar({ open: true, message: `Record for ${employee.name} has been saved.`, severity: "success" });
//     } catch(error) {
//         console.error("Error saving single employee record:", error);
//         setSnackbar({ open: true, message: `Failed to save record for ${employee.name}.`, severity: "error" });
//     }
//   };

//   const handleRowClick = (employee) => {
//     setSelectedEmployee(employee);
//     setDetailsDialogOpen(true);
//   };

//   const getComparator = (order, orderBy) => {
//     return (a, b) => {
//       if (["actions", "srNo"].includes(orderBy)) return 0;
//       let aVal = a[orderBy] || ""; let bVal = b[orderBy] || "";
//       if (typeof aVal === "string") aVal = aVal.toLowerCase();
//       if (typeof bVal === "string") bVal = bVal.toLowerCase();
//       if (aVal < bVal) return order === "asc" ? -1 : 1;
//       if (aVal > bVal) return order === "asc" ? 1 : -1;
//       return 0;
//     };
//   };

//   const sortedData = [...payrollData]
//     .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()))
//     .sort(getComparator(order, orderBy));

//   const renderCell = (employee, column, index) => {
//     const { id: field, editable } = column;
//     const value = employee[field];
//     if (field === "srNo") return <TableCell key={field}>{index + 1}</TableCell>;
//     if (field === "actions") {
//       const isUpdated = updatedRows.has(employee.empId);
//       return (
//         <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
//           <Button variant="contained" size="small" color={isUpdated ? "success" : "primary"} startIcon={isUpdated ? <Check /> : <Save />} onClick={() => handleUpdateChanges(employee.empId)} disabled={isFrozen || isUpdated} sx={{ width: "120px" }}>
//             {isUpdated ? "Saved" : "Save"}
//           </Button>
//         </TableCell>
//       );
//     }
   
//     if (editable) return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}><TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} /></TableCell>;
//     if (field === 'esics' && employee.esicApplicable === 'No') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
//     if (field === 'medical' && employee.esicApplicable === 'Yes') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
//     const isNumeric = typeof value === "number"; const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);
//     let displayValue = value;
//     if (isNumeric && field !== 'payableDays') displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
//     return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : 'normal'), backgroundColor: isCalculated ? "#f0f4f8" : "transparent", color: field === 'empId' ? '#1976d2' : 'inherit' }}>{displayValue}</TableCell>;
//   };

//   const handleSort = (property) => { const isAsc = orderBy === property && order === "asc"; setOrder(isAsc ? "desc" : "asc"); setOrderBy(property); };

//   const handleFreezeData = async () => {
//     if (payrollData.length === 0) {
//       setSnackbar({ open: true, message: "No data to freeze.", severity: "error" });
//       setFreezeDialog(false);
//       return;
//     }
//     const payload = payrollData.map(emp => transformStateToApi(emp, month, year));
   
//     try {
//         await axiosInstance.post('/api/save_payroll_report/', payload);
//         setIsFrozen(true);
//         setFreezeDialog(false);
//         setSnackbar({ open: true, message: "All payroll data has been saved and frozen successfully!", severity: "success" });
//     } catch (error) {
//         console.error("Error freezing/saving all records:", error);
//         setSnackbar({ open: true, message: "Failed to save all records.", severity: "error" });
//     }
//   };

//   const handleUnfreezeData = () => { setIsFrozen(false); setUnfreezeDialog(false); setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" }); };
//   const handleDownloadExcel = () => setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
//   const handleDetailsDialogClose = () => setDetailsDialogOpen(false);

//   return (
//     <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
//       <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE. Changes can be made."}</Alert></Box>
//       <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Month</InputLabel>
//             <Select
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               label="Month"
//               disabled={isFrozen}
//               MenuProps={{
//                 anchorOrigin: {
//                   vertical: "bottom",
//                   horizontal: "left",
//                 },
//                 transformOrigin: {
//                   vertical: "top",
//                   horizontal: "left",
//                 },
//                 getContentAnchorEl: null,
//                 PaperProps: {
//                   style: {
//                     maxHeight: 256,
//                   },
//                 },
//               }}
//             >
//               {allMonths.map((m) => (
//                 <MenuItem key={m} value={m}>
//                   {m}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth onClick={handleGenerateReport} disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send/>} sx={{ backgroundColor: "#7C3AED", "&:hover": { backgroundColor: "#6D28D9" } }}>{loading ? "Loading..." : "Submit"}</Button></Grid>
//         <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Save all records and freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "error"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Save & Freeze All"}</Button></Tooltip></Grid>
//       </Grid>
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download />} onClick={handleDownloadExcel} sx={{ color: "#7C3AED", borderColor: "#7C3AED", "&:hover": { backgroundColor: "#F5F3FF" } }}>Download Excel</Button></Grid>
//         <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search by Name or ID" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
//       </Grid>
//       <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow><TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>{columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}</TableRow>
//           </TableHead>
//           <TableBody>{sortedData.map((emp, index) => (<TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>{columnHeaders.map((col) => renderCell(emp, col, index))}</TableRow>))}</TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Confirm Save & Freeze Payroll</DialogTitle><DialogContent><DialogContentText>This will save all current records and lock the data for {month} {year} to prevent further edits. Are you sure?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="error">Save & Freeze</Button></DialogActions></Dialog>
//       <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Confirm Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits to be made again.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
//       <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>{selectedEmployee && (<><DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance color="primary" /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle><DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent><DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions></>)}</Dialog>
//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">{snackbar.message}</Alert></Snackbar>
//     </Container>
//   );
// };

// export default PayrollReport;





import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Alert,
  Snackbar,
  Box,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Lock, LockOpen, Download, Search, Save, Check, AccountBalance, Send } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
import Swal from 'sweetalert2';

const allMonths = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
];

const transformApiToState = (apiData) => {
  return apiData.map(apiEmp => ({
    payroll_report_id: apiEmp["payroll_report_id"],
    id: apiEmp["Sr. No."],
    empId: apiEmp["Employee ID"],
    name: apiEmp["Employee Name"],
    dept: apiEmp["Department"],
    designation: apiEmp["Designation"],
    gender: apiEmp["M/F"],
    grossSalary: apiEmp["Gross Salary"],
    payableDays: apiEmp["Days"],
    esicApplicable: apiEmp["ESIC Applicable"],
    grossEarning: apiEmp["Gross Earning"],
    basic: apiEmp["Basic"],
    hra: apiEmp["HRA"],
    conveyance: apiEmp["Conveyance"],
    medical: apiEmp["Medical"],
    arrearsE: apiEmp["Arrears"],
    totalEarnings: apiEmp["Total Earnings"],
    pf: apiEmp["PF"],
    esics: apiEmp["ESICS"],
    pt: apiEmp["PT"],
    mlwf: apiEmp["MLWF"],
    tds: apiEmp["TDS"],
    otherDeduction: apiEmp["Other Deduction"],
    totalDeduction: apiEmp["Total Deduction"],
    netPay: apiEmp["Net Pay"],
    ctc: apiEmp["CTC"],
    accountTitle: apiEmp["accountTitle"] || "N/A",
    accountNumber: apiEmp["accountNumber"] || "N/A",
    bankName: apiEmp["bankName"] || "N/A",
    ifscCode: apiEmp["ifscCode"] || "N/A",
    bankBranch: apiEmp["bankBranch"] || "N/A",
    pfNumber: apiEmp["pfNumber"] || "N/A",
    panNumber: apiEmp["panNumber"] || "N/A",
    esicNumber: apiEmp["esicNumber"] || "N/A",
  }));
};

const transformStateToApi = (emp, monthStr, yearNum) => ({
    payroll_report_id: emp.payroll_report_id || undefined,
    employee_id: emp.empId,
    employee_name: emp.name,
    gender: emp.gender ? emp.gender.charAt(0).toUpperCase() : 'M',
    department_id: emp.department_id || "3",
    designation_id: emp.designation_id || "6",
    month: allMonths.indexOf(monthStr) + 1,
    year: yearNum,
    gross_salary: emp.grossSalary,
    payable_days: emp.payableDays,
    esic_applicable: emp.esicApplicable ? emp.esicApplicable.charAt(0).toUpperCase() : 'N',
    gross_earning: emp.grossEarning,
    basic_plus_da: emp.basic,
    hra: emp.hra,
    medical_allowance: emp.medical,
    conveyance_allowance: emp.conveyance,
    arrears: emp.arrearsE,
    total_earnings: emp.totalEarnings,
    pf: emp.pf,
    esic: emp.esics,
    pt: emp.pt,
    mlwf: emp.mlwf,
    tds: emp.tds,
    other_deduction: emp.otherDeduction,
    total_deduction: emp.totalDeduction,
    net_pay: emp.netPay,
    ctc: emp.ctc,
    status: "G",
});

const columnHeaders = [
  { id: "srNo", label: "Sr. No.", width: 80 }, { id: "empId", label: "Employee ID", width: 120 }, { id: "name", label: "Employee Name", width: 200 }, { id: "dept", label: "Department", width: 120 }, { id: "designation", label: "Designation", width: 150 }, { id: "gender", label: "Gender", width: 100 }, { id: "grossSalary", label: "Gross Salary", width: 130 }, { id: "payableDays", label: "Payable Days", width: 120 }, { id: "esicApplicable", label: "ESIC (Y/N)", width: 120 }, { id: "grossEarning", label: "Gross Earning", width: 140 }, { id: "basic", label: "Basic", width: 100 }, { id: "hra", label: "HRA", width: 100 }, { id: "conveyance", label: "Conveyance", width: 120 }, { id: "medical", label: "Medical", width: 100 }, { id: "arrearsE", label: "Arrears", width: 100, editable: true }, { id: "totalEarnings", label: "Total Earnings", width: 130 }, { id: "pf", label: "PF", width: 100 }, { id: "esics", label: "ESIC", width: 100 }, { id: "pt", label: "PT", width: 80 }, { id: "mlwf", label: "MLWF", width: 100 }, { id: "tds", label: "TDS", width: 100 }, { id: "otherDeduction", label: "Other Deduction", width: 140, editable: true }, { id: "totalDeduction", label: "Total Deduction", width: 140 }, { id: "netPay", label: "Net Pay", width: 120 }, { id: "actions", label: "Actions", width: 150 },
];

const calculatePayrollMetrics = (employee, monthStr, yearNum) => {
  const getDaysInMonth = (year, month) => new Date(year, allMonths.indexOf(month) + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(yearNum, monthStr);
  const payableDays = employee.payableDays || 0;
  const medicalEarning = employee.esicApplicable === 'Yes' ? 0 : (employee.medical || 0);
  const grossSalaryForProrata = (employee.basic || 0) + (employee.hra || 0) + (employee.conveyance || 0) + medicalEarning;
  const grossEarning = daysInMonth > 0 ? Math.round((grossSalaryForProrata / daysInMonth) * payableDays) : 0;
  const totalEarnings = grossEarning + (employee.arrearsE || 0);
  const totalDeduction = (employee.pf || 0) + (employee.esics || 0) + (employee.pt || 0) + (employee.mlwf || 0) + (employee.tds || 0) + (employee.otherDeduction || 0);
  const netPay = totalEarnings - totalDeduction;
  return { ...employee, medical: medicalEarning, grossEarning, totalEarnings, totalDeduction, netPay };
};

const PayrollReport = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [payrollData, setPayrollData] = useState([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeDialog, setFreezeDialog] = useState(false);
  const [unfreezeDialog, setUnfreezeDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [updatedRows, setUpdatedRows] = useState(new Set());
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPayrollData = useCallback(async (monthName, yearNum) => {
    setLoading(true);
    setPayrollData([]);
    const monthIndex = allMonths.indexOf(monthName) + 1;
    const monthParam = monthIndex.toString().padStart(2, '0');

    try {
        const response = await axiosInstance.get(`/api/payroll_report/${monthParam}/${yearNum}/`);
        const transformedData = transformApiToState(response.data);
        setPayrollData(transformedData);
        setUpdatedRows(new Set());
        setIsFrozen(false);
        return { success: true, monthName, yearNum };
    } catch (error) {
        console.error("Error fetching payroll report:", error);
        return { success: false };
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);
    setAvailableYears(yearsArray);
    
    const currentMonthName = allMonths[new Date().getMonth()];
    setYear(currentYear);
    setMonth(currentMonthName);

    fetchPayrollData(currentMonthName, currentYear).then(result => {
        if(result.success) {
            setSnackbar({ open: true, message: `Report loaded for ${result.monthName} ${result.yearNum}.`, severity: "success" });
        } else {
            setSnackbar({ open: true, message: 'Failed to load initial report.', severity: "error" });
        }
    });
  }, [fetchPayrollData]);

  const calculateRow = useCallback((employee) => {
    return calculatePayrollMetrics(employee, month, year);
  }, [month, year]);

  const handleInputChange = (empId, field, value) => {
    if (isFrozen) {
      setSnackbar({ open: true, message: "Data is frozen. Please unfreeze to make changes.", severity: "warning" });
      return;
    }
    const numericValue = Number.parseFloat(value) || 0;
    setPayrollData((prevData) =>
      prevData.map((emp) => {
        if (emp.empId === empId) {
          const updatedEmp = { ...emp, [field]: numericValue };
          return calculateRow(updatedEmp);
        }
        return emp;
      })
    );
    setUpdatedRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(empId);
        return newSet;
    });
  };

  const handleGenerateReport = async () => {
    if (!month || !year) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a month and year.' });
        return;
    }
    const result = await fetchPayrollData(month, year);
    if (result.success) {
        Swal.fire({ icon: 'success', title: 'Success!', text: `Report successfully generated for ${result.monthName} ${result.yearNum}.` });
    } else {
        Swal.fire({ icon: 'error', title: 'Network Error', text: 'Failed to fetch report. No data found or server error.' });
    }
  };

  const handleUpdateChanges = async (empId) => {
    const employee = payrollData.find((e) => e.empId === empId);
    if (!employee) return;
    const payload = transformStateToApi(employee, month, year);
    try {
        await axiosInstance.post('/api/save_payroll_report/', payload);
        setUpdatedRows((prev) => new Set(prev).add(empId));
        setSnackbar({ open: true, message: `Record for ${employee.name} has been saved.`, severity: "success" });
    } catch(error) {
        console.error("Error saving single employee record:", error);
        setSnackbar({ open: true, message: `Failed to save record for ${employee.name}.`, severity: "error" });
    }
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setDetailsDialogOpen(true);
  };

  const getComparator = (order, orderBy) => {
    return (a, b) => {
      if (["actions", "srNo"].includes(orderBy)) return 0;
      let aVal = a[orderBy] || ""; let bVal = b[orderBy] || "";
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    };
  };

  const sortedData = [...payrollData]
    .filter((emp) => emp.name.toLowerCase().includes(search.toLowerCase()) || emp.empId.toLowerCase().includes(search.toLowerCase()))
    .sort(getComparator(order, orderBy));

  const renderCell = (employee, column, index) => {
    const { id: field, editable } = column;
    const value = employee[field];
    if (field === "srNo") return <TableCell key={field}>{index + 1}</TableCell>;
    if (field === "actions") {
      const isUpdated = updatedRows.has(employee.empId);
      return (
        <TableCell key={field} sx={{ padding: "4px" }} onClick={(e) => e.stopPropagation()}>
          <Button variant="contained" size="small" color={isUpdated ? "success" : "primary"} startIcon={isUpdated ? <Check /> : <Save sx={{ color: 'white' }} />} onClick={() => handleUpdateChanges(employee.empId)} disabled={isFrozen || isUpdated} sx={{ width: "120px", backgroundColor: isUpdated ? 'success.main' : '#8C257C' }}>
            {isUpdated ? "Saved" : "Save"}
          </Button>
        </TableCell>
      );
    }
    if (editable) return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, padding: "4px" }} onClick={(e) => e.stopPropagation()}><TextField size="small" type="number" value={value || 0} onChange={(e) => handleInputChange(employee.empId, field, e.target.value)} disabled={isFrozen} sx={{ width: "100%", "& .MuiInputBase-input": { textAlign: "right" }, "& .MuiInputBase-root": { backgroundColor: isFrozen ? "#f5f5f5" : "white" } }} inputProps={{ min: 0, step: 0.01 }} /></TableCell>;
    if (field === 'esics' && employee.esicApplicable === 'No') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
    if (field === 'medical' && employee.esicApplicable === 'Yes') return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: 'right', color: 'text.secondary' }}>N/A</TableCell>;
    const isNumeric = typeof value === "number"; const isCalculated = ['grossEarning', 'totalEarnings', 'totalDeduction', 'netPay'].includes(field);
    let displayValue = value;
    if (isNumeric && field !== 'payableDays') displayValue = value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return <TableCell key={field} sx={{ whiteSpace: "nowrap", minWidth: column.width, textAlign: isNumeric && field !== 'payableDays' ? "right" : "left", fontWeight: isCalculated || field === 'grossSalary' ? "bold" : (field === 'empId' ? 'bold' : 'normal'), backgroundColor: isCalculated ? "#f0f4f8" : "transparent", color: field === 'empId' ? '#8C257C' : 'inherit' }}>{displayValue}</TableCell>;
  };
  
  const handleSort = (property) => { const isAsc = orderBy === property && order === "asc"; setOrder(isAsc ? "desc" : "asc"); setOrderBy(property); };

  const handleFreezeData = async () => {
    if (payrollData.length === 0) {
      setSnackbar({ open: true, message: "No data to freeze.", severity: "error" });
      setFreezeDialog(false);
      return;
    }
    const payload = payrollData.map(emp => transformStateToApi(emp, month, year));
    try {
        await axiosInstance.post('/api/save_payroll_report/', payload);
        setIsFrozen(true);
        setFreezeDialog(false);
        setSnackbar({ open: true, message: "All payroll data has been saved and frozen successfully!", severity: "success" });
    } catch (error) {
        console.error("Error freezing/saving all records:", error);
        setSnackbar({ open: true, message: "Failed to save all records.", severity: "error" });
    }
  };

  const handleUnfreezeData = () => { setIsFrozen(false); setUnfreezeDialog(false); setSnackbar({ open: true, message: "Payroll data has been unfrozen.", severity: "info" }); };
  const handleDownloadExcel = () => setSnackbar({ open: true, message: "Excel file download started!", severity: "success" });
  const handleDetailsDialogClose = () => setDetailsDialogOpen(false);

  return (
    <Container sx={{ mt: 2, maxWidth: "100vw", overflowX: "hidden" }}>
      <Box sx={{ mb: 3 }}><Typography variant="h4" component="h1" sx={{ mb: 5, fontWeight: "bold" }}>Payroll Report - All Employees</Typography><Alert severity={isFrozen ? "warning" : "info"} sx={{ mb: 2 }} icon={isFrozen ? <Lock /> : <LockOpen />}>{isFrozen ? `Payroll data is FROZEN for ${month} ${year}.` : "Payroll data is ACTIVE. Changes can be made."}</Alert></Box>
      <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Month</InputLabel><Select value={month} onChange={(e) => setMonth(e.target.value)} label="Month" disabled={isFrozen} MenuProps={{ anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, getContentAnchorEl: null, PaperProps: { style: { maxHeight: 256 } } }}>{allMonths.map((m) => (<MenuItem key={m} value={m}>{m}</MenuItem>))}</Select></FormControl></Grid>
        <Grid item xs={12} sm={6} md={3}><FormControl fullWidth size="small"><InputLabel>Year</InputLabel><Select value={year} onChange={(e) => setYear(e.target.value)} label="Year" disabled={isFrozen}>{availableYears.map((y) => (<MenuItem key={y} value={y}>{y}</MenuItem>))}</Select></FormControl></Grid>
        <Grid item xs={12} sm={6} md={2}><Button variant="contained" fullWidth onClick={handleGenerateReport} disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send sx={{ color: 'white' }} />} sx={{ backgroundColor: "#8C257C", "&:hover": { backgroundColor: "#701D63" } }}>{loading ? "Loading..." : "Submit"}</Button></Grid>
        <Grid item xs={12} sm={6} md={4}><Tooltip title={isFrozen ? "Unfreeze data to allow changes" : "Save all records and freeze data"}><Button variant={isFrozen ? "outlined" : "contained"} color={isFrozen ? "warning" : "error"} startIcon={isFrozen ? <LockOpen /> : <Lock />} onClick={() => (isFrozen ? setUnfreezeDialog(true) : setFreezeDialog(true))} fullWidth>{isFrozen ? "Unfreeze Data" : "Save & Freeze All"}</Button></Tooltip></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}><Button variant="outlined" fullWidth startIcon={<Download sx={{ color: '#8C257C' }} />} onClick={handleDownloadExcel} sx={{ color: "#8C257C", borderColor: "#8C257C", "&:hover": { backgroundColor: "rgba(140, 37, 124, 0.04)" } }}>Download Excel</Button></Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ marginLeft: "auto" }}><TextField label="Search by Name or ID" variant="outlined" size="small" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: "action.active" }} /> }} /></Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow><TableCell align="center" colSpan={10} sx={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>EMPLOYEE DETAILS</TableCell><TableCell align="center" colSpan={6} sx={{ backgroundColor: "#e3f2fd", fontWeight: "bold" }}>EARNINGS</TableCell><TableCell align="center" colSpan={7} sx={{ backgroundColor: "#ffebee", fontWeight: "bold" }}>DEDUCTIONS</TableCell><TableCell align="center" colSpan={2} sx={{ backgroundColor: "#e8f5e9", fontWeight: "bold" }}>SUMMARY & ACTIONS</TableCell></TableRow>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>{columnHeaders.map((col) => (<TableCell key={col.id} sortDirection={orderBy === col.id ? order : false} sx={{ fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap", minWidth: col.width, backgroundColor: col.editable ? "#fff3cd" : "#f5f5f5", borderBottom: "2px solid #dee2e6" }}><TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? order : "asc"} onClick={() => handleSort(col.id)} disabled={["actions", "srNo"].includes(col.id)}>{col.label}{col.editable && <Typography variant="caption" sx={{ display: "block", color: "#856404" }}>(Editable)</Typography>}</TableSortLabel></TableCell>))}</TableRow>
          </TableHead>
          <TableBody>{sortedData.map((emp, index) => (<TableRow key={emp.empId} onClick={() => handleRowClick(emp)} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" } }}>{columnHeaders.map((col) => renderCell(emp, col, index))}</TableRow>))}</TableBody>
        </Table>
      </TableContainer>
      <Dialog open={freezeDialog} onClose={() => setFreezeDialog(false)}><DialogTitle>Confirm Save & Freeze Payroll</DialogTitle><DialogContent><DialogContentText>This will save all current records and lock the data for {month} {year} to prevent further edits. Are you sure?</DialogContentText></DialogContent><DialogActions><Button onClick={() => setFreezeDialog(false)}>Cancel</Button><Button onClick={handleFreezeData} variant="contained" color="error">Save & Freeze</Button></DialogActions></Dialog>
      <Dialog open={unfreezeDialog} onClose={() => setUnfreezeDialog(false)}><DialogTitle>Confirm Unfreeze Payroll Data</DialogTitle><DialogContent><DialogContentText>Are you sure you want to unfreeze the payroll data? This will allow edits to be made again.</DialogContentText></DialogContent><DialogActions><Button onClick={() => setUnfreezeDialog(false)}>Cancel</Button><Button onClick={handleUnfreezeData} variant="contained" color="success">Unfreeze Data</Button></DialogActions></Dialog>
      <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="sm" fullWidth>{selectedEmployee && (<><DialogTitle><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccountBalance sx={{ color: '#8C257C' }} /><Box><Typography variant="h6" component="div">{selectedEmployee.name}</Typography><Typography variant="body2" color="text.secondary">Employee ID: {selectedEmployee.empId}</Typography></Box></Box></DialogTitle><DialogContent dividers><Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>Banking & Statutory Details</Typography><Grid container spacing={2}><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Title:</Typography><Typography variant="body1">{selectedEmployee.accountTitle}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Account Number:</Typography><Typography variant="body1">{selectedEmployee.accountNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Name:</Typography><Typography variant="body1">{selectedEmployee.bankName}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">IFSC Code:</Typography><Typography variant="body1">{selectedEmployee.ifscCode}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Bank Branch:</Typography><Typography variant="body1">{selectedEmployee.bankBranch}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PF Number:</Typography><Typography variant="body1">{selectedEmployee.pfNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">PAN Number:</Typography><Typography variant="body1">{selectedEmployee.panNumber}</Typography></Grid><Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">ESIC Number:</Typography><Typography variant="body1">{selectedEmployee.esicNumber}</Typography></Grid></Grid></DialogContent><DialogActions><Button onClick={handleDetailsDialogClose}>Close</Button></DialogActions></>)}</Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}><Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">{snackbar.message}</Alert></Snackbar>
    </Container>
  );
};

export default PayrollReport;