// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// // Master list of all employees
// const allEmployeesMasterList = [
//   { id: "V0020", name: "Rupali Mali" },
//   { id: "V0075", name: "Shailesh Jadhav" },
//   { id: "V0001", name: "Mangesh Ghadigaonkar" },
//   { id: "V0017", name: "Ganesh Mohite" },
//   { id: "V0030", name: "tejas" },
//   { id: "V0040", name: "kartik" },
// ];

// // Initial data for the salary records table (can be empty)
// const initialSalaryRecordsData = [
//   { id: "V0020", name: "Rupali Mali", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0075", name: "Shailesh Jadhav", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0101", name: "Amit Kulkarni", basic: 58, hra: 26, medical: 8, conveyance: 8 },
//   { id: "V0102", name: "Sneha Patil", basic: 62, hra: 24, medical: 7, conveyance: 7 },
//   { id: "V0103", name: "Rajesh Pawar", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0104", name: "Meera Desai", basic: 61, hra: 23, medical: 7, conveyance: 8 },
//   { id: "V0105", name: "Nikhil More", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0106", name: "Komal Bhosale", basic: 60, hra: 26, medical: 7, conveyance: 7 },
//   { id: "V0107", name: "Vishal Shinde", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0108", name: "Pooja Jagtap", basic: 60, hra: 24, medical: 7.5, conveyance: 8 },
//   { id: "V0109", name: "Ashutosh Gokhale", basic: 62, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0110", name: "Bhavna Nair", basic: 58, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0111", name: "Karan Verma", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0112", name: "Neha Shah", basic: 61, hra: 24, medical: 7.5, conveyance: 7.5 },
//   { id: "V0113", name: "Sunil Mane", basic: 60, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0114", name: "Divya Joshi", basic: 59, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0115", name: "Yogesh Kadam", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0116", name: "Priya Sawant", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0117", name: "Rohan Deshmukh", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0118", name: "Anita Shetty", basic: 60, hra: 24, medical: 8, conveyance: 8 }
// ];

// const initialSalaryFormState = {
//   employeeId: "",
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
// };

// const initialGrossFormState = {
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
//   gross: "",
//   ctc: "",
// };


// const PayrollSetup = () => {
//   const [salaryRecords, setSalaryRecords] = useState(initialSalaryRecordsData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [showFormType, setShowFormType] = useState(""); // "salary" | "ctc"
//   const [showCTCTable, setShowCTCTable] = useState(false);

//   const [salaryForm, setSalaryForm] = useState(initialSalaryFormState);
//   const [grossForm, setGrossForm] = useState(initialGrossFormState);

//   // Calculate Total A for the breakup table from Gross & CTC form's B,H,M,C inputs
//   const totalA = () =>
//     parseFloat(grossForm.basic || 0) +
//     parseFloat(grossForm.hra || 0) +
//     parseFloat(grossForm.medical || 0) +
//     parseFloat(grossForm.conveyance || 0);

//   const handleSalaryFormChange = (e) => {
//     const { name, value } = e.target;
//     setSalaryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEmployeeSelectChange = (e) => {
//     // Only update employeeId, keep other fields as user types or blank
//     setSalaryForm((prev) => ({ ...prev, employeeId: e.target.value }));
//   };

//   const handleGrossFormChange = (e) => {
//     const { name, value } = e.target;
//     setGrossForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // REMOVED: useEffect that auto-filled Salary Calculation Form

//   const handleSalaryFormSubmit = () => {
//     if (!salaryForm.employeeId) {
//       alert("Please select an employee.");
//       return;
//     }

//     const selectedEmployeeBase = allEmployeesMasterList.find(emp => emp.id === salaryForm.employeeId);
//     if (!selectedEmployeeBase) {
//         alert("Selected employee not found in master list."); // Should not happen
//         return;
//     }

//     const newRecord = {
//       id: salaryForm.employeeId,
//       name: selectedEmployeeBase.name, // Get name from master list
//       basic: parseFloat(salaryForm.basic) || 0,
//       hra: parseFloat(salaryForm.hra) || 0,
//       medical: parseFloat(salaryForm.medical) || 0,
//       conveyance: parseFloat(salaryForm.conveyance) || 0,
//     };

//     const existingRecordIndex = salaryRecords.findIndex(rec => rec.id === newRecord.id);

//     if (existingRecordIndex > -1) {
//       const updatedRecords = [...salaryRecords];
//       updatedRecords[existingRecordIndex] = newRecord;
//       setSalaryRecords(updatedRecords);
//     } else {
//       setSalaryRecords((prevRecords) => [newRecord, ...prevRecords]);
//     }

//     setSalaryForm(initialSalaryFormState); // Clear form fields
//     setShowFormType(""); // Close the form
//   };


//   const filteredData = salaryRecords.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleNext = () => {
//     if (page < Math.ceil(filteredData.length / rowsPerPage)) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleOpenSalaryForm = () => {
//     setShowFormType("salary");
//     setSalaryForm(initialSalaryFormState); // Reset form
//     setShowCTCTable(false); // Hide CTC table
//   };

//   const handleOpenGrossCtcForm = () => {
//     setShowFormType("ctc");
//     setGrossForm(initialGrossFormState); // Reset form
//     setShowCTCTable(false); // Hide CTC table until submit
//   };

//   const handleCancelSalaryForm = () => {
//     setShowFormType("");
//     setSalaryForm(initialSalaryFormState); // Reset form
//   };

//   const handleGrossCtcFormSubmit = () => {
//     setShowCTCTable(true);
//     setShowFormType("");
//     setGrossForm(initialGrossFormState); // Reset form
//   };

//   const handleCancelGrossCtcForm = () => {
//     setShowFormType("");
//     setGrossForm(initialGrossFormState); // Reset form
//   };


//   return (
//     <Box p={3}> {/* Increased padding for overall page */}
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}> {/* Styled title */}
//         List of Salary Calculation
//       </Typography>

//       {/* Top Button Group & Search */}
//      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} mb={2}>
//       <Grid item>
//         <Grid container spacing={1}>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenSalaryForm}
//             >
//               Add New Record
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleOpenGrossCtcForm}
//             >
//               Gross & CTC
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>



//       {/* Salary Calculation Form */}
//      {showFormType === "salary" && (
//       <Box maxWidth={700} mx="auto"> {/* Centered and narrowed width */}
//         <Paper elevation={3} sx={{ p: 3, mb: 3 }}> {/* Slightly more padding */}
//           <Typography variant="h6" gutterBottom>
//             Salary Calculation Form
//           </Typography>
//           <Grid container spacing={3} mt={1}> {/* Increased spacing between fields */}
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="employee-select-label">Choose an Employee</InputLabel>
//                 <Select
//                   labelId="employee-select-label"
//                   label="Choose an Employee"
//                   name="employeeId"
//                   value={salaryForm.employeeId}
//                   onChange={handleEmployeeSelectChange}
//                 >
//                   <MenuItem value="">
//                     <em>-- Select Employee --</em>
//                   </MenuItem>
//                   {allEmployeesMasterList.map((emp) => (
//                     <MenuItem key={emp.id} value={emp.id}>
//                       {emp.name} ({emp.id})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Basic Salary %"
//                 name="basic"
//                 type="number"
//                 value={salaryForm.basic}
//                 onChange={handleSalaryFormChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="HRA %"
//                 name="hra"
//                 type="number"
//                 value={salaryForm.hra}
//                 onChange={handleSalaryFormChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Medical Allowance %"
//                 name="medical"
//                 type="number"
//                 value={salaryForm.medical}
//                 onChange={handleSalaryFormChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Conveyance Allowance %"
//                 name="conveyance"
//                 type="number"
//                 value={salaryForm.conveyance}
//                 onChange={handleSalaryFormChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                 <Button variant="contained" color="primary" onClick={handleSalaryFormSubmit}>
//                   Submit
//                 </Button>
//                 <Button variant="outlined" color="error" onClick={handleCancelSalaryForm}>
//                   Cancel
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     )}


//       {/* Gross & CTC Form */}
//     {showFormType === "ctc" && (
//       <Box display="flex" justifyContent="center"> {/* Center align to reduce left-right size */}
//         <Paper
//           elevation={3}
//           sx={{
//             p: 3,
//             mb: 3,
//             width: '100%',
//             maxWidth: 900, // Limits width, adjusts based on screen
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Gross Salary and CTC Form
//           </Typography>
//           <Grid container spacing={3} mt={1}> {/* Increased spacing between fields */}
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 name="basic"
//                 label="Basic (Monthly)"
//                 type="number"
//                 fullWidth
//                 value={grossForm.basic}
//                 onChange={handleGrossFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 name="hra"
//                 label="HRA (Monthly)"
//                 type="number"
//                 fullWidth
//                 value={grossForm.hra}
//                 onChange={handleGrossFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 name="medical"
//                 label="MA (Monthly)"
//                 type="number"
//                 fullWidth
//                 value={grossForm.medical}
//                 onChange={handleGrossFormChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={3}>
//               <TextField
//                 name="conveyance"
//                 label="CA (Monthly)"
//                 type="number"
//                 fullWidth
//                 value={grossForm.conveyance}
//                 onChange={handleGrossFormChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="gross"
//                 label="Gross Salary (Manual Input)"
//                 type="number"
//                 fullWidth
//                 value={grossForm.gross}
//                 onChange={handleGrossFormChange}
//                 helperText="Enter if overriding calculated sum."
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 name="ctc"
//                 label="CTC (Manual Input)"
//                 type="number"
//                 fullWidth
//                 value={grossForm.ctc}
//                 onChange={handleGrossFormChange}
//                 helperText="Enter if overriding calculated sum."
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleGrossCtcFormSubmit}
//                 >
//                   Submit
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={handleCancelGrossCtcForm}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Box>
//     )}


//       {/* Salary Breakup Table - This will now appear above the main table if showCTCTable is true */}
//       {showCTCTable && (
//         <Box display="flex" justifyContent="center" mt={4} mb={4}> {/* Center the content with extra margin */}
//     <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 900, position: 'relative' }}>
//      <Button
//             size="small"
//             variant="outlined"
//             color="error"
//             onClick={() => setShowCTCTable(false)}
//             sx={{ position: "absolute", top: 12, right: 12, minWidth: 30, padding: "2px 6px", zIndex: 1 }}
//           >
//             X Close
//           </Button>
//           <Typography variant="h6" gutterBottom align="center"> {/* Changed to h6 */}
//             Salary Breakup (Annexure - I)
//           </Typography>
//           <Typography variant="subtitle2" gutterBottom align="center" sx={{mb:1}}> {/* Subtitle for ESIC */}
//             With ESIC
//           </Typography>
//           <TableContainer>
//             <Table size="small">
//               <TableHead sx={{ backgroundColor: "#e0e0e0" }}> {/* Slightly darker header */}
//                 <TableRow>
//                   <TableCell sx={{fontWeight: 'bold'}}>Details</TableCell>
//                   <TableCell sx={{fontWeight: 'bold'}} align="right">Per Month</TableCell>
//                   <TableCell sx={{fontWeight: 'bold'}} align="right">Per Annum</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {/* Gross Salary now uses totalA() for consistency with Total (A) */}
//                 <TableRow><TableCell sx={{fontWeight: 'bold'}}>Gross Salary</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow><TableCell colSpan={3} sx={{fontWeight: 'bold', pt: 1.5, pb: 0.5}}> (A) Components of Salary</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>Basic+DA</TableCell><TableCell align="right">{parseFloat(grossForm.basic || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.basic || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>HRA</TableCell><TableCell align="right">{parseFloat(grossForm.hra || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.hra || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>Medical</TableCell><TableCell align="right">{parseFloat(grossForm.medical || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.medical || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>Conveyance Allowance</TableCell><TableCell align="right">{parseFloat(grossForm.conveyance || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.conveyance || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow sx={{backgroundColor: 'rgba(0,0,0,0.05)'}}><TableCell sx={{fontWeight: 'bold'}}>Total (A)</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>

//                 <TableRow><TableCell colSpan={3} sx={{fontWeight: 'bold', pt: 1.5, pb: 0.5}}>(B) Benefits</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>PF - Employer Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>ESIC (Employer Contribution @3.25% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0325 * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow sx={{backgroundColor: 'rgba(0,0,0,0.05)'}}><TableCell sx={{fontWeight: 'bold'}}>Total (B)</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{(8 + totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{((8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>

//                 <TableRow><TableCell colSpan={3} sx={{fontWeight: 'bold', pt: 1.5, pb: 0.5}}>(C) Deductions</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>PF - Employee Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>ESIC (Employee Contribution @0.75% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0075).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0075 * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow><TableCell sx={{pl:4}}>PT</TableCell><TableCell align="right">200.00</TableCell><TableCell align="right">2400.00</TableCell></TableRow>
//                 <TableRow sx={{backgroundColor: 'rgba(0,0,0,0.05)'}}><TableCell sx={{fontWeight: 'bold'}}>Total (C)</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{(8 + totalA() * 0.0075 + 200).toFixed(2)}</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{((8 + totalA() * 0.0075 + 200) * 12).toFixed(2)}</TableCell></TableRow>

//                 <TableRow sx={{backgroundColor: 'rgba(0,0,0,0.08)'}}><TableCell sx={{fontWeight: 'bold'}}>Total CTC (per annum) (A+B)</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{/* Monthly part of CTC */ ((totalA() + 8 + totalA() * 0.0325)).toFixed(2)}</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{((totalA() + 8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                 <TableRow sx={{backgroundColor: 'rgba(0,0,0,0.08)'}}><TableCell sx={{fontWeight: 'bold'}}>Net Take Home (A - C)</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{(totalA() - (8 + totalA() * 0.0075 + 200)).toFixed(2)}</TableCell><TableCell align="right" sx={{fontWeight: 'bold'}}>{((totalA() - (8 + totalA() * 0.0075 + 200)) * 12).toFixed(2)}</TableCell></TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           </Paper>
//         </Box>
//       )}

//       {/* Main Table View & Controls */}
//       <Paper elevation={3} sx={{p:2}}> {/* Wrap table and its controls in a Paper */}
//         <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//             <Grid item>
//             <FormControl size="small" variant="outlined"> {/* Added variant */}
//                 <InputLabel id="rows-per-page-label">Show</InputLabel>
//                 <Select
//                 labelId="rows-per-page-label"
//                 value={rowsPerPage}
//                 label="Show"
//                 onChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(1);
//                 }}
//                 >
//                 <MenuItem value={5}>5 entries</MenuItem>
//                 <MenuItem value={10}>10 entries</MenuItem>
//                 <MenuItem value={15}>15 entries</MenuItem>
//                 </Select>
//             </FormControl>
//             </Grid>
//             <Grid item>
//           <TextField
//             size="small"
//             label="Search Records"
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setPage(1);
//             }}
//             sx={{ width: 250 }}
//           />
//         </Grid>
//         </Grid>

//         <TableContainer> {/* Removed component={Paper} as parent Paper is used */}
//             <Table size="small" aria-label="salary records table">
//             <TableHead sx={{ backgroundColor: "#e0e0e0" }}> {/* Slightly darker header */}
//                 <TableRow>
//                 <TableCell sx={{fontWeight: 'bold'}}>EMP ID</TableCell>
//                 <TableCell sx={{fontWeight: 'bold'}}>EMP NAME</TableCell>
//                 <TableCell sx={{fontWeight: 'bold'}} align="right">BASIC %</TableCell>
//                 <TableCell sx={{fontWeight: 'bold'}} align="right">HRA %</TableCell>
//                 <TableCell sx={{fontWeight: 'bold'}} align="right">MEDICAL %</TableCell>
//                 <TableCell sx={{fontWeight: 'bold'}} align="right">CONVEYANCE %</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {paginatedData.map((emp) => (
//                 <TableRow key={emp.id} hover> {/* Added hover effect */}
//                     <TableCell>{emp.id}</TableCell>
//                     <TableCell>{emp.name}</TableCell>
//                     <TableCell align="right">{emp.basic}</TableCell>
//                     <TableCell align="right">{emp.hra}</TableCell>
//                     <TableCell align="right">{emp.medical}</TableCell>
//                     <TableCell align="right">{emp.conveyance}</TableCell>
//                 </TableRow>
//                 ))}
//                 {paginatedData.length === 0 && (
//                 <TableRow>
//                     <TableCell colSpan={6} align="center" sx={{ py: 3 }}> {/* Added padding */}
//                     No records found
//                     </TableCell>
//                 </TableRow>
//                 )}
//             </TableBody>
//             </Table>
//         </TableContainer>

//         {/* Pagination */}
//      <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
//   <Typography variant="body2" color="text.secondary">
//     {filteredData.length > 0
//       ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredData.length)} of ${filteredData.length} records`
//       : "No records found"}
//   </Typography>

//   <Box>
//     <Button
//       onClick={handlePrev}
//       disabled={page === 1 || filteredData.length === 0}
//       size="small"
//       variant={filteredData.length === 0 ? "outlined" : "contained"}
//       sx={{
//         mx: 1,
//         backgroundColor: filteredData.length === 0 ? "transparent" : "#9c27b0",
//         color: filteredData.length === 0 ? "#9c27b0" : "#fff",
//         borderColor: "#9c27b0",
//         '&:hover': {
//           backgroundColor: filteredData.length === 0 ? 'rgba(156, 39, 176, 0.08)' : '#7b1fa2',
//           boxShadow: filteredData.length === 0 ? 'none' : '0 0 8px #ba68c8',
//         },
//         '&:active': {
//           boxShadow: filteredData.length === 0 ? 'none' : '0 0 12px 2px #ce93d8',
//         },
//       }}
//     >
//       Previous
//     </Button>

//     <Typography component="span" mx={1} variant="body2">
//       Page {page} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}
//     </Typography>

//     <Button
//       onClick={handleNext}
//       disabled={page >= Math.ceil(filteredData.length / rowsPerPage) || filteredData.length === 0}
//       size="small"
//       variant={filteredData.length === 0 ? "outlined" : "contained"}
//       sx={{
//         mx: 1,
//         backgroundColor: filteredData.length === 0 ? "transparent" : "#9c27b0",
//         color: filteredData.length === 0 ? "#9c27b0" : "#fff",
//         borderColor: "#9c27b0",
//         '&:hover': {
//           backgroundColor: filteredData.length === 0 ? 'rgba(156, 39, 176, 0.08)' : '#7b1fa2',
//           boxShadow: filteredData.length === 0 ? 'none' : '0 0 8px #ba68c8',
//         },
//         '&:active': {
//           boxShadow: filteredData.length === 0 ? 'none' : '0 0 12px 2px #ce93d8',
//         },
//       }}
//     >
//       Next
//     </Button>
//   </Box>
// </Box>


//       </Paper>
//     </Box>
//   );
// };

// export default PayrollSetup;    //////





// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// // Master list of all employees
// const allEmployeesMasterList = [
//   { id: "V0020", name: "Rupali Mali" },
//   { id: "V0075", name: "Shailesh Jadhav" },
//   { id: "V0001", name: "Mangesh Ghadigaonkar" },
//   { id: "V0017", name: "Ganesh Mohite" },
//   { id: "V0030", name: "tejas" },
//   { id: "V0040", name: "kartik" },
// ];

// // Initial data for the salary records table (can be empty)
// const initialSalaryRecordsData = [
//   { id: "V0020", name: "Rupali Mali", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0075", name: "Shailesh Jadhav", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0101", name: "Amit Kulkarni", basic: 58, hra: 26, medical: 8, conveyance: 8 },
//   { id: "V0102", name: "Sneha Patil", basic: 62, hra: 24, medical: 7, conveyance: 7 },
//   { id: "V0103", name: "Rajesh Pawar", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0104", name: "Meera Desai", basic: 61, hra: 23, medical: 7, conveyance: 8 },
//   { id: "V0105", name: "Nikhil More", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0106", name: "Komal Bhosale", basic: 60, hra: 26, medical: 7, conveyance: 7 },
//   { id: "V0107", name: "Vishal Shinde", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0108", name: "Pooja Jagtap", basic: 60, hra: 24, medical: 7.5, conveyance: 8 },
//   { id: "V0109", name: "Ashutosh Gokhale", basic: 62, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0110", name: "Bhavna Nair", basic: 58, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0111", name: "Karan Verma", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0112", name: "Neha Shah", basic: 61, hra: 24, medical: 7.5, conveyance: 7.5 },
//   { id: "V0113", name: "Sunil Mane", basic: 60, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0114", name: "Divya Joshi", basic: 59, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0115", name: "Yogesh Kadam", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0116", name: "Priya Sawant", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0117", name: "Rohan Deshmukh", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0118", name: "Anita Shetty", basic: 60, hra: 24, medical: 8, conveyance: 8 }
// ];

// const initialSalaryFormState = {
//   employeeId: "",
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
// };

// const initialGrossFormState = {
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
//   gross: "",
//   ctc: "",
// };


// const PayrollSetup = () => {
//   const [salaryRecords, setSalaryRecords] = useState(initialSalaryRecordsData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [showFormType, setShowFormType] = useState(""); // "salary" | "ctc"
//   const [showCTCTable, setShowCTCTable] = useState(false);

//   const [salaryForm, setSalaryForm] = useState(initialSalaryFormState);
//   const [grossForm, setGrossForm] = useState(initialGrossFormState);

//   // --- NEW: Reusable purple button style ---
//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   const totalA = () =>
//     parseFloat(grossForm.basic || 0) +
//     parseFloat(grossForm.hra || 0) +
//     parseFloat(grossForm.medical || 0) +
//     parseFloat(grossForm.conveyance || 0);

//   const handleSalaryFormChange = (e) => {
//     const { name, value } = e.target;
//     setSalaryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEmployeeSelectChange = (e) => {
//     setSalaryForm((prev) => ({ ...prev, employeeId: e.target.value }));
//   };

//   const handleGrossFormChange = (e) => {
//     const { name, value } = e.target;
//     setGrossForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSalaryFormSubmit = () => {
//     if (!salaryForm.employeeId) {
//       alert("Please select an employee.");
//       return;
//     }

//     const selectedEmployeeBase = allEmployeesMasterList.find(emp => emp.id === salaryForm.employeeId);
//     if (!selectedEmployeeBase) {
//       alert("Selected employee not found in master list.");
//       return;
//     }

//     const newRecord = {
//       id: salaryForm.employeeId,
//       name: selectedEmployeeBase.name,
//       basic: parseFloat(salaryForm.basic) || 0,
//       hra: parseFloat(salaryForm.hra) || 0,
//       medical: parseFloat(salaryForm.medical) || 0,
//       conveyance: parseFloat(salaryForm.conveyance) || 0,
//     };

//     const existingRecordIndex = salaryRecords.findIndex(rec => rec.id === newRecord.id);

//     if (existingRecordIndex > -1) {
//       const updatedRecords = [...salaryRecords];
//       updatedRecords[existingRecordIndex] = newRecord;
//       setSalaryRecords(updatedRecords);
//     } else {
//       setSalaryRecords((prevRecords) => [newRecord, ...prevRecords]);
//     }

//     setSalaryForm(initialSalaryFormState);
//     setShowFormType("");
//   };


//   const filteredData = salaryRecords.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleNext = () => {
//     if (page < Math.ceil(filteredData.length / rowsPerPage)) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleOpenSalaryForm = () => {
//     setShowFormType("salary");
//     setSalaryForm(initialSalaryFormState);
//     setShowCTCTable(false);
//   };

//   const handleOpenGrossCtcForm = () => {
//     setShowFormType("ctc");
//     setGrossForm(initialGrossFormState);
//     setShowCTCTable(false);
//   };

//   const handleCancelSalaryForm = () => {
//     setShowFormType("");
//     setSalaryForm(initialSalaryFormState);
//   };

//   const handleGrossCtcFormSubmit = () => {
//     setShowCTCTable(true);
//     setShowFormType("");
//     setGrossForm(initialGrossFormState);
//   };

//   const handleCancelGrossCtcForm = () => {
//     setShowFormType("");
//     setGrossForm(initialGrossFormState);
//   };


//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
//         List of Salary Calculation
//       </Typography>

//       <Grid container justifyContent="flex-end" alignItems="center" spacing={2} mb={2}>
//         <Grid item>
//           <Grid container spacing={1}>
//             <Grid item>
//               {/* --- UPDATED: Button color --- */}
//               <Button variant="contained" sx={purpleButtonStyle} onClick={handleOpenSalaryForm}>
//                 Add New Record
//               </Button>
//             </Grid>
//             <Grid item>
//               {/* --- UPDATED: Button color --- */}
//               <Button variant="contained" sx={purpleButtonStyle} onClick={handleOpenGrossCtcForm}>
//                 Gross & CTC
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {showFormType === "salary" && (
//         <Box maxWidth={700} mx="auto">
//           <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Salary Calculation Form
//             </Typography>
//             <Grid container spacing={3} mt={1}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="employee-select-label">Choose an Employee</InputLabel>
//                   <Select
//                     labelId="employee-select-label"
//                     label="Choose an Employee"
//                     name="employeeId"
//                     value={salaryForm.employeeId}
//                     onChange={handleEmployeeSelectChange}
//                   >
//                     <MenuItem value="">
//                       <em>-- Select Employee --</em>
//                     </MenuItem>
//                     {allEmployeesMasterList.map((emp) => (
//                       <MenuItem key={emp.id} value={emp.id}>
//                         {emp.name} ({emp.id})
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Basic Salary %" name="basic" type="number" value={salaryForm.basic} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="HRA %" name="hra" type="number" value={salaryForm.hra} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Medical Allowance %" name="medical" type="number" value={salaryForm.medical} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Conveyance Allowance %" name="conveyance" type="number" value={salaryForm.conveyance} onChange={handleSalaryFormChange} />
//               </Grid>

//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                   {/* --- UPDATED: Button color --- */}
//                   <Button variant="contained" sx={purpleButtonStyle} onClick={handleSalaryFormSubmit}>
//                     Submit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleCancelSalaryForm}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       )}

//       {showFormType === "ctc" && (
//         <Box display="flex" justifyContent="center">
//           <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%', maxWidth: 900 }}>
//             <Typography variant="h6" gutterBottom>
//               Gross Salary and CTC Form
//             </Typography>
//             <Grid container spacing={3} mt={1}>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="basic" label="Basic (Monthly)" type="number" fullWidth value={grossForm.basic} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="hra" label="HRA (Monthly)" type="number" fullWidth value={grossForm.hra} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="medical" label="MA (Monthly)" type="number" fullWidth value={grossForm.medical} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="conveyance" label="CA (Monthly)" type="number" fullWidth value={grossForm.conveyance} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField name="gross" label="Gross Salary (Manual Input)" type="number" fullWidth value={grossForm.gross} onChange={handleGrossFormChange} helperText="Enter if overriding calculated sum." />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField name="ctc" label="CTC (Manual Input)" type="number" fullWidth value={grossForm.ctc} onChange={handleGrossFormChange} helperText="Enter if overriding calculated sum." />
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                   {/* --- UPDATED: Button color --- */}
//                   <Button variant="contained" sx={purpleButtonStyle} onClick={handleGrossCtcFormSubmit}>
//                     Submit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleCancelGrossCtcForm}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       )}

//       {showCTCTable && (
//         <Box display="flex" justifyContent="center" mt={4} mb={4}>
//           <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 900, position: 'relative' }}>
//             <Button
//               size="small"
//               variant="outlined"
//               color="error"
//               onClick={() => setShowCTCTable(false)}
//               sx={{ position: "absolute", top: 12, right: 12, minWidth: 30, padding: "2px 6px", zIndex: 1 }}
//             >
//               X Close
//             </Button>
//             <Typography variant="h6" gutterBottom align="center">
//               Salary Breakup (Annexure - I)
//             </Typography>
//             <Typography variant="subtitle2" gutterBottom align="center" sx={{ mb: 1 }}>
//               With ESIC
//             </Typography>
//             <TableContainer>
//               <Table size="small">
//                 <TableHead sx={{ backgroundColor: "#e3f2fd" }}> {/* Changed to light blue for consistency */}
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">Per Month</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">Per Annum</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow><TableCell sx={{ fontWeight: 'bold' }}>Gross Salary</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}> (A) Components of Salary</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Basic+DA</TableCell><TableCell align="right">{parseFloat(grossForm.basic || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.basic || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>HRA</TableCell><TableCell align="right">{parseFloat(grossForm.hra || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.hra || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Medical</TableCell><TableCell align="right">{parseFloat(grossForm.medical || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.medical || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Conveyance Allowance</TableCell><TableCell align="right">{parseFloat(grossForm.conveyance || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.conveyance || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (A)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}>(B) Benefits</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PF - Employer Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>ESIC (Employer Contribution @3.25% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0325 * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (B)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(8 + totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}>(C) Deductions</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PF - Employee Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>ESIC (Employee Contribution @0.75% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0075).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0075 * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PT</TableCell><TableCell align="right">200.00</TableCell><TableCell align="right">2400.00</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (C)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(8 + totalA() * 0.0075 + 200).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((8 + totalA() * 0.0075 + 200) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total CTC (per annum) (A+B)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{/* Monthly part of CTC */ ((totalA() + 8 + totalA() * 0.0325)).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() + 8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><TableCell sx={{ fontWeight: 'bold' }}>Net Take Home (A - C)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() - (8 + totalA() * 0.0075 + 200)).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() - (8 + totalA() * 0.0075 + 200)) * 12).toFixed(2)}</TableCell></TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>
//       )}

//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel id="rows-per-page-label">Show</InputLabel>
//               <Select
//                 labelId="rows-per-page-label"
//                 value={rowsPerPage}
//                 label="Show"
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(1);
//                 }}
//               >
//                 <MenuItem value={5}>5 entries</MenuItem>
//                 <MenuItem value={10}>10 entries</MenuItem>
//                 <MenuItem value={15}>15 entries</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item>
//             <TextField
//               size="small"
//               label="Search Records"
//               variant="outlined"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setPage(1);
//               }}
//               sx={{ width: 250 }}
//             />
//           </Grid>
//         </Grid>

//         <TableContainer>
//           <Table size="small" aria-label="salary records table">
//             <TableHead sx={{ backgroundColor: "#e3f2fd" }}> {/* Changed to light blue for consistency */}
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold' }}>EMP ID</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>EMP NAME</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }} align="right">BASIC %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }} align="right">HRA %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }} align="right">MEDICAL %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }} align="right">CONVEYANCE %</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((emp) => (
//                 <TableRow key={emp.id} hover>
//                   <TableCell>{emp.id}</TableCell>
//                   <TableCell>{emp.name}</TableCell>
//                   <TableCell align="right">{emp.basic}</TableCell>
//                   <TableCell align="right">{emp.hra}</TableCell>
//                   <TableCell align="right">{emp.medical}</TableCell>
//                   <TableCell align="right">{emp.conveyance}</TableCell>
//                 </TableRow>
//               ))}
//               {paginatedData.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
//                     No records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="body2" color="text.secondary">
//             {filteredData.length > 0
//               ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredData.length)} of ${filteredData.length} records`
//               : "No records found"}
//           </Typography>

//           <Box>
//             {/* --- UPDATED: Button colors --- */}
//             <Button
//               onClick={handlePrev}
//               disabled={page === 1 || filteredData.length === 0}
//               size="small"
//               variant="contained"
//               sx={purpleButtonStyle}
//             >
//               Previous
//             </Button>
//             <Typography component="span" mx={1} variant="body2">
//               Page {page} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}
//             </Typography>
//             <Button
//               onClick={handleNext}
//               disabled={page >= Math.ceil(filteredData.length / rowsPerPage) || filteredData.length === 0}
//               size="small"
//               variant="contained"
//               sx={purpleButtonStyle}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>

//       </Paper>
//     </Box>
//   );
// };

// export default PayrollSetup;







// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// // Master list of all employees
// const allEmployeesMasterList = [
//   { id: "V0020", name: "Rupali Mali" },
//   { id: "V0075", name: "Shailesh Jadhav" },
//   { id: "V0001", name: "Mangesh Ghadigaonkar" },
//   { id: "V0017", name: "Ganesh Mohite" },
//   { id: "V0030", name: "tejas" },
//   { id: "V0040", name: "kartik" },
// ];

// // Initial data for the salary records table (can be empty)
// const initialSalaryRecordsData = [
//   { id: "V0020", name: "Rupali Mali", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0075", name: "Shailesh Jadhav", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0101", name: "Amit Kulkarni", basic: 58, hra: 26, medical: 8, conveyance: 8 },
//   { id: "V0102", name: "Sneha Patil", basic: 62, hra: 24, medical: 7, conveyance: 7 },
//   { id: "V0103", name: "Rajesh Pawar", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0104", name: "Meera Desai", basic: 61, hra: 23, medical: 7, conveyance: 8 },
//   { id: "V0105", name: "Nikhil More", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0106", name: "Komal Bhosale", basic: 60, hra: 26, medical: 7, conveyance: 7 },
//   { id: "V0107", name: "Vishal Shinde", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0108", name: "Pooja Jagtap", basic: 60, hra: 24, medical: 7.5, conveyance: 8 },
//   { id: "V0109", name: "Ashutosh Gokhale", basic: 62, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0110", name: "Bhavna Nair", basic: 58, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0111", name: "Karan Verma", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0112", name: "Neha Shah", basic: 61, hra: 24, medical: 7.5, conveyance: 7.5 },
//   { id: "V0113", name: "Sunil Mane", basic: 60, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0114", name: "Divya Joshi", basic: 59, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0115", name: "Yogesh Kadam", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0116", name: "Priya Sawant", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0117", name: "Rohan Deshmukh", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0118", name: "Anita Shetty", basic: 60, hra: 24, medical: 8, conveyance: 8 }
// ];

// const initialSalaryFormState = {
//   employeeId: "",
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
// };

// const initialGrossFormState = {
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
//   gross: "",
//   ctc: "",
// };


// const PayrollSetup = () => {
//   const [salaryRecords, setSalaryRecords] = useState(initialSalaryRecordsData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   // --- UPDATED: Default rows per page is now 10 ---
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [showFormType, setShowFormType] = useState(""); // "salary" | "ctc"
//   const [showCTCTable, setShowCTCTable] = useState(false);

//   const [salaryForm, setSalaryForm] = useState(initialSalaryFormState);
//   const [grossForm, setGrossForm] = useState(initialGrossFormState);

//   // --- NEW: Standardized color scheme ---
//   const primaryColor = "#8C257C"; // Purple
//   const secondaryColor = "#F58E35"; // Orange

//   // --- NEW: Reusable primary button style using the new color ---
//   const primaryButtonStyle = {
//     backgroundColor: primaryColor,
//     color: "#fff",
//     "&:hover": { backgroundColor: "#701d63" }, // A darker shade of the primary purple
//   };

//   const totalA = () =>
//     parseFloat(grossForm.basic || 0) +
//     parseFloat(grossForm.hra || 0) +
//     parseFloat(grossForm.medical || 0) +
//     parseFloat(grossForm.conveyance || 0);

//   const handleSalaryFormChange = (e) => {
//     const { name, value } = e.target;
//     setSalaryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEmployeeSelectChange = (e) => {
//     setSalaryForm((prev) => ({ ...prev, employeeId: e.target.value }));
//   };

//   const handleGrossFormChange = (e) => {
//     const { name, value } = e.target;
//     setGrossForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSalaryFormSubmit = () => {
//     if (!salaryForm.employeeId) {
//       alert("Please select an employee.");
//       return;
//     }

//     const selectedEmployeeBase = allEmployeesMasterList.find(emp => emp.id === salaryForm.employeeId);
//     if (!selectedEmployeeBase) {
//       alert("Selected employee not found in master list.");
//       return;
//     }

//     const newRecord = {
//       id: salaryForm.employeeId,
//       name: selectedEmployeeBase.name,
//       basic: parseFloat(salaryForm.basic) || 0,
//       hra: parseFloat(salaryForm.hra) || 0,
//       medical: parseFloat(salaryForm.medical) || 0,
//       conveyance: parseFloat(salaryForm.conveyance) || 0,
//     };

//     const existingRecordIndex = salaryRecords.findIndex(rec => rec.id === newRecord.id);

//     if (existingRecordIndex > -1) {
//       const updatedRecords = [...salaryRecords];
//       updatedRecords[existingRecordIndex] = newRecord;
//       setSalaryRecords(updatedRecords);
//     } else {
//       setSalaryRecords((prevRecords) => [newRecord, ...prevRecords]);
//     }

//     setSalaryForm(initialSalaryFormState);
//     setShowFormType("");
//   };


//   const filteredData = salaryRecords.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleNext = () => {
//     if (page < Math.ceil(filteredData.length / rowsPerPage)) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleOpenSalaryForm = () => {
//     setShowFormType("salary");
//     setSalaryForm(initialSalaryFormState);
//     setShowCTCTable(false);
//   };

//   const handleOpenGrossCtcForm = () => {
//     setShowFormType("ctc");
//     setGrossForm(initialGrossFormState);
//     setShowCTCTable(false);
//   };

//   const handleCancelSalaryForm = () => {
//     setShowFormType("");
//     setSalaryForm(initialSalaryFormState);
//   };

//   const handleGrossCtcFormSubmit = () => {
//     setShowCTCTable(true);
//     setShowFormType("");
//     setGrossForm(initialGrossFormState);
//   };

//   const handleCancelGrossCtcForm = () => {
//     setShowFormType("");
//     setGrossForm(initialGrossFormState);
//   };


//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
//         List of Salary Calculation
//       </Typography>

//       <Grid container justifyContent="flex-end" alignItems="center" spacing={2} mb={2}>
//         <Grid item>
//           <Grid container spacing={1}>
//             <Grid item>
//               {/* --- UPDATED: Button color --- */}
//               <Button variant="contained" sx={primaryButtonStyle} onClick={handleOpenSalaryForm}>
//                 Add New Record
//               </Button>
//             </Grid>
//             <Grid item>
//               {/* --- UPDATED: Button color --- */}
//               <Button variant="contained" sx={primaryButtonStyle} onClick={handleOpenGrossCtcForm}>
//                 Gross & CTC
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {showFormType === "salary" && (
//         <Box maxWidth={700} mx="auto">
//           <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Salary Calculation Form
//             </Typography>
//             <Grid container spacing={3} mt={1}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="employee-select-label">Choose an Employee</InputLabel>
//                   <Select
//                     labelId="employee-select-label"
//                     label="Choose an Employee"
//                     name="employeeId"
//                     value={salaryForm.employeeId}
//                     onChange={handleEmployeeSelectChange}
//                   >
//                     <MenuItem value="">
//                       <em>-- Select Employee --</em>
//                     </MenuItem>
//                     {allEmployeesMasterList.map((emp) => (
//                       <MenuItem key={emp.id} value={emp.id}>
//                         {emp.name} ({emp.id})
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Basic Salary %" name="basic" type="number" value={salaryForm.basic} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="HRA %" name="hra" type="number" value={salaryForm.hra} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Medical Allowance %" name="medical" type="number" value={salaryForm.medical} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Conveyance Allowance %" name="conveyance" type="number" value={salaryForm.conveyance} onChange={handleSalaryFormChange} />
//               </Grid>

//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                   {/* --- UPDATED: Button color --- */}
//                   <Button variant="contained" sx={primaryButtonStyle} onClick={handleSalaryFormSubmit}>
//                     Submit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleCancelSalaryForm}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       )}

//       {showFormType === "ctc" && (
//         <Box display="flex" justifyContent="center">
//           <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%', maxWidth: 900 }}>
//             <Typography variant="h6" gutterBottom>
//               Gross Salary and CTC Form
//             </Typography>
//             <Grid container spacing={3} mt={1}>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="basic" label="Basic (Monthly)" type="number" fullWidth value={grossForm.basic} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="hra" label="HRA (Monthly)" type="number" fullWidth value={grossForm.hra} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="medical" label="MA (Monthly)" type="number" fullWidth value={grossForm.medical} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="conveyance" label="CA (Monthly)" type="number" fullWidth value={grossForm.conveyance} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField name="gross" label="Gross Salary (Manual Input)" type="number" fullWidth value={grossForm.gross} onChange={handleGrossFormChange} helperText="Enter if overriding calculated sum." />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField name="ctc" label="CTC (Manual Input)" type="number" fullWidth value={grossForm.ctc} onChange={handleGrossFormChange} helperText="Enter if overriding calculated sum." />
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                   {/* --- UPDATED: Button color --- */}
//                   <Button variant="contained" sx={primaryButtonStyle} onClick={handleGrossCtcFormSubmit}>
//                     Submit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleCancelGrossCtcForm}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       )}

//       {showCTCTable && (
//         <Box display="flex" justifyContent="center" mt={4} mb={4}>
//           <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 900, position: 'relative' }}>
//             <Button
//               size="small"
//               variant="outlined"
//               color="error"
//               onClick={() => setShowCTCTable(false)}
//               sx={{ position: "absolute", top: 12, right: 12, minWidth: 30, padding: "2px 6px", zIndex: 1 }}
//             >
//               X Close
//             </Button>
//             <Typography variant="h6" gutterBottom align="center">
//               Salary Breakup (Annexure - I)
//             </Typography>
//             <Typography variant="subtitle2" gutterBottom align="center" sx={{ mb: 1 }}>
//               With ESIC
//             </Typography>
//             <TableContainer>
//               <Table size="small">
//                 {/* --- UPDATED: Table Head Color --- */}
//                 <TableHead sx={{ backgroundColor: primaryColor }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Details</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">Per Month</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">Per Annum</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow><TableCell sx={{ fontWeight: 'bold' }}>Gross Salary</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}> (A) Components of Salary</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Basic+DA</TableCell><TableCell align="right">{parseFloat(grossForm.basic || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.basic || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>HRA</TableCell><TableCell align="right">{parseFloat(grossForm.hra || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.hra || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Medical</TableCell><TableCell align="right">{parseFloat(grossForm.medical || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.medical || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Conveyance Allowance</TableCell><TableCell align="right">{parseFloat(grossForm.conveyance || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.conveyance || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (A)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}>(B) Benefits</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PF - Employer Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>ESIC (Employer Contribution @3.25% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0325 * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (B)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(8 + totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}>(C) Deductions</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PF - Employee Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>ESIC (Employee Contribution @0.75% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0075).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0075 * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PT</TableCell><TableCell align="right">200.00</TableCell><TableCell align="right">2400.00</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (C)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(8 + totalA() * 0.0075 + 200).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((8 + totalA() * 0.0075 + 200) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total CTC (per annum) (A+B)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{/* Monthly part of CTC */ ((totalA() + 8 + totalA() * 0.0325)).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() + 8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><TableCell sx={{ fontWeight: 'bold' }}>Net Take Home (A - C)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() - (8 + totalA() * 0.0075 + 200)).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() - (8 + totalA() * 0.0075 + 200)) * 12).toFixed(2)}</TableCell></TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>
//       )}

//       <Paper elevation={3} sx={{ p: 2 }}>
//         {/* --- STANDARDIZED: Search bar on top right, entries on top left --- */}
//         <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel id="rows-per-page-label">Show</InputLabel>
//               <Select
//                 labelId="rows-per-page-label"
//                 value={rowsPerPage}
//                 label="Show"
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(1);
//                 }}
//               >
//                 <MenuItem value={5}>5 entries</MenuItem>
//                 <MenuItem value={10}>10 entries</MenuItem>
//                 <MenuItem value={15}>15 entries</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item>
//             <TextField
//               size="small"
//               label="Search Records"
//               variant="outlined"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setPage(1);
//               }}
//               sx={{ width: 250 }}
//             />
//           </Grid>
//         </Grid>

//         <TableContainer>
//           <Table size="small" aria-label="salary records table">
//             {/* --- UPDATED: Table Head Color --- */}
//             <TableHead sx={{ backgroundColor: primaryColor }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>EMP ID</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>EMP NAME</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">BASIC %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">HRA %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">MEDICAL %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">CONVEYANCE %</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((emp) => (
//                 <TableRow key={emp.id} hover>
//                   <TableCell>{emp.id}</TableCell>
//                   <TableCell>{emp.name}</TableCell>
//                   <TableCell align="right">{emp.basic}</TableCell>
//                   <TableCell align="right">{emp.hra}</TableCell>
//                   <TableCell align="right">{emp.medical}</TableCell>
//                   <TableCell align="right">{emp.conveyance}</TableCell>
//                 </TableRow>
//               ))}
//               {paginatedData.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
//                     No records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* --- STANDARDIZED: Row count on bottom left, pagination on bottom right --- */}
//         <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="body2" color="text.secondary">
//             {filteredData.length > 0
//               ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredData.length)} of ${filteredData.length} records`
//               : "No records found"}
//           </Typography>

//           <Box>
//             {/* --- UPDATED: Button colors --- */}
//             <Button
//               onClick={handlePrev}
//               disabled={page === 1 || filteredData.length === 0}
//               size="small"
//               variant="contained"
//               sx={{ ...primaryButtonStyle, mr: 1 }}
//             >
//               Previous
//             </Button>
//             <Typography component="span" mx={1} variant="body2">
//               Page {page} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}
//             </Typography>
//             <Button
//               onClick={handleNext}
//               disabled={page >= Math.ceil(filteredData.length / rowsPerPage) || filteredData.length === 0}
//               size="small"
//               variant="contained"
//               sx={primaryButtonStyle}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default PayrollSetup;









// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// // Master list of all employees
// const allEmployeesMasterList = [
//   { id: "V0020", name: "Rupali Mali" },
//   { id: "V0075", name: "Shailesh Jadhav" },
//   { id: "V0001", name: "Mangesh Ghadigaonkar" },
//   { id: "V0017", name: "Ganesh Mohite" },
//   { id: "V0030", name: "tejas" },
//   { id: "V0040", name: "kartik" },
// ];

// // Initial data for the salary records table (can be empty)
// const initialSalaryRecordsData = [
//   { id: "V0020", name: "Rupali Mali", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0075", name: "Shailesh Jadhav", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0101", name: "Amit Kulkarni", basic: 58, hra: 26, medical: 8, conveyance: 8 },
//   { id: "V0102", name: "Sneha Patil", basic: 62, hra: 24, medical: 7, conveyance: 7 },
//   { id: "V0103", name: "Rajesh Pawar", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0104", name: "Meera Desai", basic: 61, hra: 23, medical: 7, conveyance: 8 },
//   { id: "V0105", name: "Nikhil More", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0106", name: "Komal Bhosale", basic: 60, hra: 26, medical: 7, conveyance: 7 },
//   { id: "V0107", name: "Vishal Shinde", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0108", name: "Pooja Jagtap", basic: 60, hra: 24, medical: 7.5, conveyance: 8 },
//   { id: "V0109", name: "Ashutosh Gokhale", basic: 62, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0110", name: "Bhavna Nair", basic: 58, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0111", name: "Karan Verma", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0112", name: "Neha Shah", basic: 61, hra: 24, medical: 7.5, conveyance: 7.5 },
//   { id: "V0113", name: "Sunil Mane", basic: 60, hra: 25, medical: 8, conveyance: 7 },
//   { id: "V0114", name: "Divya Joshi", basic: 59, hra: 26, medical: 7.5, conveyance: 8 },
//   { id: "V0115", name: "Yogesh Kadam", basic: 60, hra: 25, medical: 7, conveyance: 7 },
//   { id: "V0116", name: "Priya Sawant", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0117", name: "Rohan Deshmukh", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
//   { id: "V0118", name: "Anita Shetty", basic: 60, hra: 24, medical: 8, conveyance: 8 }
// ];

// const initialSalaryFormState = {
//   employeeId: "",
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
// };

// const initialGrossFormState = {
//   basic: "",
//   hra: "",
//   medical: "",
//   conveyance: "",
//   gross: "",
//   ctc: "",
// };


// const PayrollSetup = () => {
//   const [salaryRecords, setSalaryRecords] = useState(initialSalaryRecordsData);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [showFormType, setShowFormType] = useState(""); // "salary" | "ctc"
//   const [showCTCTable, setShowCTCTable] = useState(false);

//   const [salaryForm, setSalaryForm] = useState(initialSalaryFormState);
//   const [grossForm, setGrossForm] = useState(initialGrossFormState);

//   const primaryColor = "#8C257C"; // Purple
//   const secondaryColor = "#F58E35"; // Orange

//   const primaryButtonStyle = {
//     backgroundColor: primaryColor,
//     color: "#fff",
//     "&:hover": { backgroundColor: "#701d63" },
//   };

//   const totalA = () =>
//     parseFloat(grossForm.basic || 0) +
//     parseFloat(grossForm.hra || 0) +
//     parseFloat(grossForm.medical || 0) +
//     parseFloat(grossForm.conveyance || 0);

//   const handleSalaryFormChange = (e) => {
//     const { name, value } = e.target;
//     setSalaryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEmployeeSelectChange = (e) => {
//     setSalaryForm((prev) => ({ ...prev, employeeId: e.target.value }));
//   };

//   const handleGrossFormChange = (e) => {
//     const { name, value } = e.target;
//     setGrossForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSalaryFormSubmit = () => {
//     if (!salaryForm.employeeId) {
//       alert("Please select an employee.");
//       return;
//     }

//     const selectedEmployeeBase = allEmployeesMasterList.find(emp => emp.id === salaryForm.employeeId);
//     if (!selectedEmployeeBase) {
//       alert("Selected employee not found in master list.");
//       return;
//     }

//     const newRecord = {
//       id: salaryForm.employeeId,
//       name: selectedEmployeeBase.name,
//       basic: parseFloat(salaryForm.basic) || 0,
//       hra: parseFloat(salaryForm.hra) || 0,
//       medical: parseFloat(salaryForm.medical) || 0,
//       conveyance: parseFloat(salaryForm.conveyance) || 0,
//     };

//     const existingRecordIndex = salaryRecords.findIndex(rec => rec.id === newRecord.id);

//     if (existingRecordIndex > -1) {
//       const updatedRecords = [...salaryRecords];
//       updatedRecords[existingRecordIndex] = newRecord;
//       setSalaryRecords(updatedRecords);
//     } else {
//       setSalaryRecords((prevRecords) => [newRecord, ...prevRecords]);
//     }

//     setSalaryForm(initialSalaryFormState);
//     setShowFormType("");
//   };


//   const filteredData = salaryRecords.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emp.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleNext = () => {
//     if (page < Math.ceil(filteredData.length / rowsPerPage)) {
//       setPage(page + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleOpenSalaryForm = () => {
//     setShowFormType("salary");
//     setSalaryForm(initialSalaryFormState);
//     setShowCTCTable(false);
//   };

//   const handleOpenGrossCtcForm = () => {
//     setShowFormType("ctc");
//     setGrossForm(initialGrossFormState);
//     setShowCTCTable(false);
//   };

//   const handleCancelSalaryForm = () => {
//     setShowFormType("");
//     setSalaryForm(initialSalaryFormState);
//   };

//   const handleGrossCtcFormSubmit = () => {
//     setShowCTCTable(true);
//     setShowFormType("");
//     setGrossForm(initialGrossFormState);
//   };

//   const handleCancelGrossCtcForm = () => {
//     setShowFormType("");
//     setGrossForm(initialGrossFormState);
//   };


//   return (
//     <Box p={3}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
//         List of Salary Calculation
//       </Typography>

//       <Grid container justifyContent="flex-end" alignItems="center" spacing={2} mb={2}>
//         <Grid item>
//           <Grid container spacing={1}>
//             <Grid item>
//               <Button variant="contained" sx={primaryButtonStyle} onClick={handleOpenSalaryForm}>
//                 Add New Record
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant="contained" sx={primaryButtonStyle} onClick={handleOpenGrossCtcForm}>
//                 Gross & CTC
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {showFormType === "salary" && (
//         <Box maxWidth={700} mx="auto">
//           <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Salary Calculation Form
//             </Typography>
//             <Grid container spacing={3} mt={1}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id="employee-select-label">Choose an Employee</InputLabel>
//                   <Select
//                     labelId="employee-select-label"
//                     label="Choose an Employee"
//                     name="employeeId"
//                     value={salaryForm.employeeId}
//                     onChange={handleEmployeeSelectChange}
//                   >
//                     <MenuItem value="">
//                       <em>-- Select Employee --</em>
//                     </MenuItem>
//                     {allEmployeesMasterList.map((emp) => (
//                       <MenuItem key={emp.id} value={emp.id}>
//                         {emp.name} ({emp.id})
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Basic Salary %" name="basic" type="number" value={salaryForm.basic} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="HRA %" name="hra" type="number" value={salaryForm.hra} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Medical Allowance %" name="medical" type="number" value={salaryForm.medical} onChange={handleSalaryFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Conveyance Allowance %" name="conveyance" type="number" value={salaryForm.conveyance} onChange={handleSalaryFormChange} />
//               </Grid>

//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                   <Button variant="contained" sx={primaryButtonStyle} onClick={handleSalaryFormSubmit}>
//                     Submit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleCancelSalaryForm}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       )}

//       {showFormType === "ctc" && (
//         <Box display="flex" justifyContent="center">
//           <Paper elevation={3} sx={{ p: 3, mb: 3, width: '100%', maxWidth: 900 }}>
//             <Typography variant="h6" gutterBottom>
//               Gross Salary and CTC Form
//             </Typography>
//             <Grid container spacing={3} mt={1}>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="basic" label="Basic (Monthly)" type="number" fullWidth value={grossForm.basic} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="hra" label="HRA (Monthly)" type="number" fullWidth value={grossForm.hra} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="medical" label="MA (Monthly)" type="number" fullWidth value={grossForm.medical} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12} sm={3}>
//                 <TextField name="conveyance" label="CA (Monthly)" type="number" fullWidth value={grossForm.conveyance} onChange={handleGrossFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField name="gross" label="Gross Salary (Manual Input)" type="number" fullWidth value={grossForm.gross} onChange={handleGrossFormChange} helperText="Enter if overriding calculated sum." />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField name="ctc" label="CTC (Manual Input)" type="number" fullWidth value={grossForm.ctc} onChange={handleGrossFormChange} helperText="Enter if overriding calculated sum." />
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
//                   <Button variant="contained" sx={primaryButtonStyle} onClick={handleGrossCtcFormSubmit}>
//                     Submit
//                   </Button>
//                   <Button variant="outlined" color="error" onClick={handleCancelGrossCtcForm}>
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Box>
//       )}

//       {showCTCTable && (
//         <Box display="flex" justifyContent="center" mt={4} mb={4}>
//           <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 900, position: 'relative' }}>
//             <Button
//               size="small"
//               variant="outlined"
//               color="error"
//               onClick={() => setShowCTCTable(false)}
//               sx={{ position: "absolute", top: 12, right: 12, minWidth: 30, padding: "2px 6px", zIndex: 1 }}
//             >
//               X Close
//             </Button>
//             <Typography variant="h6" gutterBottom align="center">
//               Salary Breakup (Annexure - I)
//             </Typography>
//             <Typography variant="subtitle2" gutterBottom align="center" sx={{ mb: 1 }}>
//               With ESIC
//             </Typography>
//             <TableContainer>
//               <Table size="small">
//                 <TableHead sx={{ backgroundColor: primaryColor }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Details</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">Per Month</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">Per Annum</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableRow><TableCell sx={{ fontWeight: 'bold' }}>Gross Salary</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}> (A) Components of Salary</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Basic+DA</TableCell><TableCell align="right">{parseFloat(grossForm.basic || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.basic || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>HRA</TableCell><TableCell align="right">{parseFloat(grossForm.hra || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.hra || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Medical</TableCell><TableCell align="right">{parseFloat(grossForm.medical || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.medical || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>Conveyance Allowance</TableCell><TableCell align="right">{parseFloat(grossForm.conveyance || 0).toFixed(2)}</TableCell><TableCell align="right">{(parseFloat(grossForm.conveyance || 0) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (A)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalA().toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}>(B) Benefits</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PF - Employer Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>ESIC (Employer Contribution @3.25% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0325 * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (B)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(8 + totalA() * 0.0325).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 1.5, pb: 0.5 }}>(C) Deductions</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PF - Employee Contribution</TableCell><TableCell align="right">8.00</TableCell><TableCell align="right">96.00</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>ESIC (Employee Contribution @0.75% of Total A)</TableCell><TableCell align="right">{(totalA() * 0.0075).toFixed(2)}</TableCell><TableCell align="right">{(totalA() * 0.0075 * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow><TableCell sx={{ pl: 4 }}>PT</TableCell><TableCell align="right">200.00</TableCell><TableCell align="right">2400.00</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.05)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total (C)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(8 + totalA() * 0.0075 + 200).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((8 + totalA() * 0.0075 + 200) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><TableCell sx={{ fontWeight: 'bold' }}>Total CTC (per annum) (A+B)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() + 8 + totalA() * 0.0325)).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() + 8 + totalA() * 0.0325) * 12).toFixed(2)}</TableCell></TableRow>
//                   <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.08)' }}><TableCell sx={{ fontWeight: 'bold' }}>Net Take Home (A - C)</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{(totalA() - (8 + totalA() * 0.0075 + 200)).toFixed(2)}</TableCell><TableCell align="right" sx={{ fontWeight: 'bold' }}>{((totalA() - (8 + totalA() * 0.0075 + 200)) * 12).toFixed(2)}</TableCell></TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>
//       )}

//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Grid container justifyContent="space-between" alignItems="center" mb={2}>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel id="rows-per-page-label">Show</InputLabel>
//               <Select
//                 labelId="rows-per-page-label"
//                 value={rowsPerPage}
//                 label="Show"
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(1);
//                 }}
//               >
//                 <MenuItem value={5}>5 entries</MenuItem>
//                 <MenuItem value={10}>10 entries</MenuItem>
//                 <MenuItem value={15}>15 entries</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item>
//             <TextField
//               size="small"
//               label="Search Records"
//               variant="outlined"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setPage(1);
//               }}
//               sx={{ width: 250 }}
//             />
//           </Grid>
//         </Grid>

//         <TableContainer>
//           <Table size="small" aria-label="salary records table">
//             <TableHead sx={{ backgroundColor: primaryColor }}>
//               <TableRow>
//                 {/* --- NEW: Sr No. column added --- */}
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>EMP ID</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>EMP NAME</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">BASIC %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">HRA %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">MEDICAL %</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#fff' }} align="right">CONVEYANCE %</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* --- UPDATED: Mapping function to include index for Sr. No. --- */}
//               {paginatedData.map((emp, index) => (
//                 <TableRow key={emp.id} hover>
//                   {/* --- NEW: Sr No. cell with dynamic calculation --- */}
//                   <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{emp.id}</TableCell>
//                   <TableCell>{emp.name}</TableCell>
//                   <TableCell align="right">{emp.basic}</TableCell>
//                   <TableCell align="right">{emp.hra}</TableCell>
//                   <TableCell align="right">{emp.medical}</TableCell>
//                   <TableCell align="right">{emp.conveyance}</TableCell>
//                 </TableRow>
//               ))}
//               {paginatedData.length === 0 && (
//                 <TableRow>
//                   {/* --- UPDATED: Colspan increased to 7 --- */}
//                   <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
//                     No records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="body2" color="text.secondary">
//             {filteredData.length > 0
//               ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredData.length)} of ${filteredData.length} records`
//               : "No records found"}
//           </Typography>

//           <Box>
//             <Button
//               onClick={handlePrev}
//               disabled={page === 1 || filteredData.length === 0}
//               size="small"
//               variant="contained"
//               sx={{ ...primaryButtonStyle, mr: 1 }}
//             >
//               Previous
//             </Button>
//             <Typography component="span" mx={1} variant="body2">
//               Page {page} of {Math.max(1, Math.ceil(filteredData.length / rowsPerPage))}
//             </Typography>
//             <Button
//               onClick={handleNext}
//               disabled={page >= Math.ceil(filteredData.length / rowsPerPage) || filteredData.length === 0}
//               size="small"
//               variant="contained"
//               sx={primaryButtonStyle}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default PayrollSetup;




import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Add, Search as SearchIcon } from "@mui/icons-material";
import Swal from "sweetalert2";

// Master list of all employees
const allEmployeesMasterList = [
    { id: "V0020", name: "Rupali Mali" },
    { id: "V0075", name: "Shailesh Jadhav" },
    { id: "V0001", name: "Mangesh Ghadigaonkar" },
    { id: "V0017", name: "Ganesh Mohite" },
    { id: "V0030", name: "tejas" },
    { id: "V0040", name: "kartik" },
];

// Initial data for the salary records table
const initialSalaryRecordsData = [
    { id: "V0020", name: "Rupali Mali", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
    { id: "V0075", name: "Shailesh Jadhav", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
    { id: "V0101", name: "Amit Kulkarni", basic: 58, hra: 26, medical: 8, conveyance: 8 },
    { id: "V0102", name: "Sneha Patil", basic: 62, hra: 24, medical: 7, conveyance: 7 },
    { id: "V0103", name: "Rajesh Pawar", basic: 59, hra: 25, medical: 7.5, conveyance: 7.5 },
    { id: "V0104", name: "Meera Desai", basic: 61, hra: 23, medical: 7, conveyance: 8 },
    { id: "V0105", name: "Nikhil More", basic: 60, hra: 25, medical: 7.5, conveyance: 7.5 },
];

const initialSalaryFormState = {
  employeeId: "",
  basic: "",
  hra: "",
  medical: "",
  conveyance: "",
};

const PayrollSetup = () => {
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [salaryForm, setSalaryForm] = useState(initialSalaryFormState);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- Theme Colors ---
  const primaryColor = "#8C257C";
  const primaryDarkColor = "#6d1d60";

  // --- Styles ---
  const primaryButtonStyle = {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    "&:hover": { backgroundColor: primaryDarkColor },
  };

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setSalaryRecords(initialSalaryRecordsData);
      setLoading(false);
    }, 1500);
  }, []);

  const handleOpenDialog = () => {
    setSalaryForm(initialSalaryFormState);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) return;
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSalaryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSelectChange = (e) => {
    setSalaryForm((prev) => ({ ...prev, employeeId: e.target.value }));
  };

  const handleFormSubmit = () => {
    if (!salaryForm.employeeId) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select an employee.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setIsSubmitting(true);

    const selectedEmployee = allEmployeesMasterList.find(emp => emp.id === salaryForm.employeeId);

    const newRecord = {
      id: salaryForm.employeeId,
      name: selectedEmployee.name,
      basic: parseFloat(salaryForm.basic) || 0,
      hra: parseFloat(salaryForm.hra) || 0,
      medical: parseFloat(salaryForm.medical) || 0,
      conveyance: parseFloat(salaryForm.conveyance) || 0,
    };

    // Simulate API call
    setTimeout(() => {
      const existingRecordIndex = salaryRecords.findIndex(rec => rec.id === newRecord.id);
      if (existingRecordIndex > -1) {
        const updatedRecords = [...salaryRecords];
        updatedRecords[existingRecordIndex] = newRecord;
        setSalaryRecords(updatedRecords);
      } else {
        setSalaryRecords(prevRecords => [newRecord, ...prevRecords]);
      }

      setIsSubmitting(false);
      handleCloseDialog();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Salary record has been saved successfully.",
        timer: 3000,
        showConfirmButton: false,
      });
    }, 1000);
  };

  const filteredData = salaryRecords.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: primaryColor, fontWeight: 'bold', mb: 5 }}>
        Payroll   Setup
      </Typography>

      <Box
        mb={2}
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "stretch" : "center"}
        gap={2}
      >
        <Button
          variant="contained"
          sx={primaryButtonStyle}
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Add New
        </Button>
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: isMobile ? "100%" : "auto" }}
        />
      </Box>

      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table>
          <TableHead sx={{ backgroundColor: primaryColor }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>SR. NO.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>EMP ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>EMP NAME</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }} align="right">BASIC %</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }} align="right">HRA %</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }} align="right">MEDICAL %</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF' }} align="right">CONVEYANCE %</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={120} height={30} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              paginatedData.map((emp, index) => (
                <TableRow key={emp.id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{emp.id}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{emp.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }} align="right">{emp.basic}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }} align="right">{emp.hra}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }} align="right">{emp.medical}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }} align="right">{emp.conveyance}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                        {/* Action buttons can be added here */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
            {!loading && paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        mt={2}
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 15, 25]}
          sx={{
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color: 'text.secondary',
            },
            "& .MuiSvgIcon-root": {
              color: primaryColor,
            },
          }}
        />
      </Box>

      {/* --- Add/Edit Dialog --- */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>
          Add New Salary Record
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="employee-select-label">Choose an Employee</InputLabel>
                <Select
                  labelId="employee-select-label"
                  label="Choose an Employee"
                  name="employeeId"
                  value={salaryForm.employeeId}
                  onChange={handleEmployeeSelectChange}
                >
                  <MenuItem value=""><em>-- Select Employee --</em></MenuItem>
                  {allEmployeesMasterList.map((emp) => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.name} ({emp.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Basic Salary %" name="basic" type="number" value={salaryForm.basic} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="HRA %" name="hra" type="number" value={salaryForm.hra} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Medical Allowance %" name="medical" type="number" value={salaryForm.medical} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Conveyance Allowance %" name="conveyance" type="number" value={salaryForm.conveyance} onChange={handleFormChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            sx={primaryButtonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollSetup;