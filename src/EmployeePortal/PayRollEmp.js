// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Select,
//   MenuItem,
//   Grid,
//   Card,
//   CardContent,
//   Button,
// } from '@mui/material';

// function PayrollPage() {
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleEntriesChange = (event) => {
//     setEntriesPerPage(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header Section */}
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
//       >
//         Payroll
//       </Typography>
//       <Typography
//         variant="h6"
//         gutterBottom
//         sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
//       >
//         Pay Slip History
//       </Typography>

//       {/* Employee Details Section */}
//       <Card sx={{ mb: 4, p: 2 }}>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                 Emp. Id:
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 1368
//               </Typography>
//               <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                 Emp. Name:
//               </Typography>
//               <Typography variant="body2">Prasad Shinde</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                 Designation:
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Software Engineer
//               </Typography>
//               <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                 UAN No.:
//               </Typography>
//               <Typography variant="body2">N/A</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Entries & Search Section */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
//             Show
//           </Typography>
//           <Select
//             value={entriesPerPage}
//             onChange={handleEntriesChange}
//             size="small"
//             sx={{ minWidth: 80 }}
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//           <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
//             entries
//           </Typography>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{ maxWidth: 300 }}
//         />
//       </Box>

//       {/* Table Section */}
//       <TableContainer component={Paper} sx={{ mb: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold' }}>SALARY MONTH</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>NET PAYABLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold' }}>PAY DATE</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell colSpan={3} align="center">
//                 No records available
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Buttons */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <Button variant="contained" disabled sx={{ mr: 1 }}>
//           Previous
//         </Button>
//         <Button variant="contained" disabled>
//           Next
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default PayrollPage;
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Typography,
//   Card,
//   CardContent,
//   Select,
//   InputLabel,
//   FormControl,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   CircularProgress,
// } from "@mui/material";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axiosInstance from "../utils/axiosInstance"; // Corrected Path

// // IMPORTANT: Adjust this path to correctly point to your logo file
// import vetrinaLogo from "./vetrinalogo.png"; // Corrected Path

// const allMonths = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// // Helper to transform the detailed payslip API response (re-used from admin)
// const transformPayslipDetails = (apiDetail) => {
//   if (!apiDetail) return null;

//   const netPay = apiDetail.net_pay || 0;
//   const totalEarnings = apiDetail.total_earnings || 0;
//   const totalDeductions = apiDetail.total_deduction || 0;

//   return {
//     name: apiDetail.employee_name,
//     netPayable: netPay,
//     salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
//     payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString(
//       "en-GB",
//       { day: "numeric", month: "long", year: "numeric" }
//     ),
//     details: {
//       employeeId: apiDetail.employee_id,
//       department: apiDetail.department_name,
//       dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString(
//         "en-GB",
//         { day: "numeric", month: "long", year: "numeric" }
//       ),
//       designation: apiDetail.designation_name,
//       leaves: "N/A",
//       location: apiDetail.location || "N/A",
//       payableDays: apiDetail.payable_days,
//       bankName: apiDetail.bank_name || "N/A",
//       bankAcNo: apiDetail.bank_account_number || "N/A",
//       pfNo: apiDetail.pf_number || "N/A",
//       uanNo: apiDetail.uan_number || "N/A",
//       esicNo: apiDetail.esic_number || "N/A",
//       panNo: apiDetail.pan_number || "N/A",
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
//     },
//   };
// };

// function PayrollPage() {
//   // States for data and UI control
//   const [payslipHistory, setPayslipHistory] = useState([]);
//   const [employeeDetails, setEmployeeDetails] = useState({
//     id: "...",
//     name: "...",
//     designation: "...",
//     uan: "...",
//   });
//   const [tableLoading, setTableLoading] = useState(true);
//   const [dialogLoading, setDialogLoading] = useState(false);

//   // States for table functionality
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "payDate",
//     direction: "desc",
//   }); // Default sort by most recent
//   const [page, setPage] = useState(1);

//   // States for payslip dialog
//   const [isPayslipOpen, setIsPayslipOpen] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const payslipRef = useRef();

//   // Fetch payslip history on component mount
//   useEffect(() => {
//     // --- NEW: Get Employee ID from Local Storage ---
//     const loggedInEmployeeId = localStorage.getItem("loggedInUser");

//     if (!loggedInEmployeeId) {
//       console.error("Employee ID not found in local storage.");
//       setTableLoading(false);
//       setEmployeeDetails({
//         id: "N/A",
//         name: "Unknown User",
//         designation: "N/A",
//         uan: "N/A",
//       });
//       return;
//     }

//     const fetchHistory = async () => {
//       setTableLoading(true);
//       try {
//         const response = await axiosInstance.get("/api/payslip_history/");
//         if (
//           response.data.status === "success" &&
//           Array.isArray(response.data.data)
//         ) {
//           // --- NEW: Filter the results for the logged-in user ---
//           const userHistory = response.data.data.filter(
//             (item) => item.employee_id === loggedInEmployeeId
//           );

//           const transformedData = userHistory.map((item) => ({
//             id: item.payroll_report_id,
//             payroll_report_id: item.payroll_report_id,
//             netPayable: item.net_pay,
//             salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
//             payDate: new Date(item.pay_date).toLocaleDateString("en-GB", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//             }),
//             rawPayDate: item.pay_date, // Keep raw date for sorting
//           }));
//           setPayslipHistory(transformedData);

//           // Populate employee details card from the first record found
//           if (userHistory.length > 0) {
//             const firstRecord = userHistory[0];
//             setEmployeeDetails((prev) => ({
//               ...prev,
//               id: firstRecord.employee_id,
//               name: firstRecord.employee_name,
//             }));
//           } else {
//             setEmployeeDetails((prev) => ({
//               ...prev,
//               id: loggedInEmployeeId,
//               name: "User (No Payslip Data)",
//             }));
//           }
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

//   // Handler to open and fetch detailed payslip
//   const handleOpenPayslip = async (payslipRecord) => {
//     setIsPayslipOpen(true);
//     setDialogLoading(true);
//     setSelectedPayslipRecord(null);
//     try {
//       const response = await axiosInstance.post("/api/payslip/", {
//         payroll_report_id: String(payslipRecord.payroll_report_id),
//       });
//       if (response.data.status === "success" && response.data.data.length > 0) {
//         const transformedDetails = transformPayslipDetails(
//           response.data.data[0]
//         );
//         setSelectedPayslipRecord(transformedDetails);

//         // Update employee card with more details if available from the detailed call
//         setEmployeeDetails((prev) => ({
//           ...prev,
//           designation:
//             transformedDetails.details.designation || prev.designation,
//           uan: transformedDetails.details.uanNo || prev.uan,
//         }));
//       }
//     } catch (error) {
//       console.error("Failed to fetch payslip details:", error);
//     } finally {
//       setDialogLoading(false);
//     }
//   };

//   const handleClosePayslip = () => {
//     setIsPayslipOpen(false);
//     setSelectedPayslipRecord(null);
//   };

//   // Handler for PDF download
//   const handleDownloadPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;
//     const actions = input.querySelector(".payslip-actions");
//     if (actions) actions.style.display = "none";

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       if (actions) actions.style.display = "flex";
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       let newWidth = pdfWidth;
//       let newHeight = newWidth / ratio;
//       if (newHeight > pdfHeight) {
//         newHeight = pdfHeight;
//         newWidth = newHeight * ratio;
//       }
//       const x = (pdfWidth - newWidth) / 2;
//       pdf.addImage(imgData, "PNG", x, 0, newWidth, newHeight);
//       pdf.save(
//         `Payslip-${selectedPayslipRecord.name.replace(
//           " ",
//           "_"
//         )}-${selectedPayslipRecord.salaryMonth.replace(", ", "_")}.pdf`
//       );
//     });
//   };

//   // Sorting and Filtering Logic
//   const handleSort = (key) =>
//     setSortConfig((prev) => ({
//       key,
//       direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
//     }));

//   const sortedData = [...payslipHistory]
//     .filter((item) =>
//       item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (!sortConfig.key) return 0;
//       let aValue = a[sortConfig.key];
//       let bValue = b[sortConfig.key];

//       // Handle date sorting properly
//       if (sortConfig.key === "payDate") {
//         aValue = new Date(a.rawPayDate);
//         bValue = new Date(b.rawPayDate);
//       }

//       const valA = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
//       const valB = typeof bValue === "string" ? bValue.toLowerCase() : bValue;

//       if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//       if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });

//   const paginatedData = sortedData.slice(
//     (page - 1) * entriesPerPage,
//     page * entriesPerPage
//   );

//   const getSortArrow = (columnKey) => {
//     if (sortConfig.key !== columnKey)
//       return <span style={{ fontSize: 12, color: "#9ca3af" }}>⇅</span>;
//     return (
//       <span style={{ fontSize: 12, color: "#4b5563" }}>
//         {sortConfig.direction === "asc" ? "▲" : "▼"}
//       </span>
//     );
//   };

//   return (
//     <Container
//       sx={{
//         backgroundColor: "#fff",
//         p: 3,
//         borderRadius: 3,
//         boxShadow: 2,
//         mt: 4,
//       }}
//     >
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//         Pay Slip History
//       </Typography>

//       <Card sx={{ mb: 4, p: 2, bgcolor: "#f9fafb" }}>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">
//                 <strong>Emp. ID:</strong> {employeeDetails.id}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>
//                 <strong>Emp. Name:</strong> {employeeDetails.name}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="body1">
//                 <strong>Designation:</strong> {employeeDetails.designation}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>
//                 <strong>UAN No.:</strong> {employeeDetails.uan}
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Grid
//         container
//         spacing={2}
//         mb={2}
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Grid item xs={12} sm={6} md={4}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Show</InputLabel>
//             <Select
//               value={entriesPerPage}
//               onChange={(e) => {
//                 setEntriesPerPage(Number(e.target.value));
//                 setPage(1);
//               }}
//               label="Show"
//             >
//               {[5, 10, 25, 50].map((number) => (
//                 <MenuItem key={number} value={number}>
//                   {number} entries
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Search by Salary Month"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setPage(1);
//             }}
//           />
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//             <TableRow>
//               <TableCell
//                 sx={{ cursor: "pointer", fontWeight: "bold" }}
//                 onClick={() => handleSort("salaryMonth")}
//               >
//                 <Box display="flex" alignItems="center" gap={0.5}>
//                   {getSortArrow("salaryMonth")} SALARY MONTH
//                 </Box>
//               </TableCell>
//               <TableCell
//                 sx={{ cursor: "pointer", fontWeight: "bold" }}
//                 onClick={() => handleSort("netPayable")}
//               >
//                 <Box display="flex" alignItems="center" gap={0.5}>
//                   {getSortArrow("netPayable")} NET PAYABLE
//                 </Box>
//               </TableCell>
//               <TableCell
//                 sx={{ cursor: "pointer", fontWeight: "bold" }}
//                 onClick={() => handleSort("payDate")}
//               >
//                 <Box display="flex" alignItems="center" gap={0.5}>
//                   {getSortArrow("payDate")} PAY DATE
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold" }} align="center">
//                 ACTIONS
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableLoading ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((item) => (
//                 <TableRow key={item.id} hover>
//                   <TableCell>{item.salaryMonth}</TableCell>
//                   <TableCell sx={{ color: "#7C3AED", fontWeight: 600 }}>
//                     ₹
//                     {item.netPayable.toLocaleString("en-IN", {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     })}
//                   </TableCell>
//                   <TableCell>{item.payDate}</TableCell>
//                   <TableCell align="center">
//                     <Button
//                       onClick={() => handleOpenPayslip(item)}
//                       size="small"
//                       variant="contained"
//                       sx={{
//                         textTransform: "none",
//                         fontSize: "12px",
//                         padding: "2px 10px",
//                         backgroundColor: "#7C3AED",
//                         borderRadius: "12px",
//                       }}
//                     >
//                       View Payslip
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No payslip history found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mt={2}
//       >
//         <Typography variant="body2">
//           Showing{" "}
//           {paginatedData.length > 0 ? (page - 1) * entriesPerPage + 1 : 0} to{" "}
//           {Math.min(page * entriesPerPage, sortedData.length)} of{" "}
//           {sortedData.length} entries
//         </Typography>
//         <Box>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             sx={{ mr: 1 }}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setPage(page + 1)}
//             disabled={page >= Math.ceil(sortedData.length / entriesPerPage)}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>

//       {/* Payslip Dialog/Modal */}
//       <Dialog
//         open={isPayslipOpen}
//         onClose={handleClosePayslip}
//         maxWidth="md"
//         fullWidth
//       >
//         <Box ref={payslipRef}>
//           <DialogTitle>Pay Slip</DialogTitle>
//           <DialogContent>
//             {dialogLoading ? (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 400,
//                 }}
//               >
//                 <CircularProgress />
//               </Box>
//             ) : selectedPayslipRecord ? (
//               <Box
//                 sx={{
//                   p: { xs: 1, sm: 2 },
//                   border: "2px solid #000",
//                   borderRadius: 1,
//                   bgcolor: "background.paper",
//                 }}
//               >
//                 <Grid
//                   container
//                   spacing={2}
//                   alignItems="center"
//                   justifyContent="space-between"
//                 >
//                   <Grid item xs={4}>
//                     <img
//                       src={vetrinaLogo}
//                       alt="Vetrina Logo"
//                       style={{ maxWidth: "140px", height: "auto" }}
//                     />
//                   </Grid>
//                   <Grid item xs={8} sx={{ textAlign: "right" }}>
//                     <Typography
//                       variant="h5"
//                       sx={{ fontWeight: "bold" }}
//                       gutterBottom
//                     >
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
//                     <Typography variant="body2">
//                       <strong>Employee ID:</strong>{" "}
//                       {selectedPayslipRecord.details.employeeId}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Employee Name:</strong>{" "}
//                       {selectedPayslipRecord.name}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Department:</strong>{" "}
//                       {selectedPayslipRecord.details.department}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Date of Joining:</strong>{" "}
//                       {selectedPayslipRecord.details.dateOfJoining}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Designation:</strong>{" "}
//                       {selectedPayslipRecord.details.designation}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Payable Days:</strong>{" "}
//                       {selectedPayslipRecord.details.payableDays}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2">
//                       <strong>Bank Name:</strong>{" "}
//                       {selectedPayslipRecord.details.bankName}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Bank A/c No:</strong>{" "}
//                       {selectedPayslipRecord.details.bankAcNo}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>PF No:</strong>{" "}
//                       {selectedPayslipRecord.details.pfNo}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>UAN No:</strong>{" "}
//                       {selectedPayslipRecord.details.uanNo}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>ESIC No:</strong>{" "}
//                       {selectedPayslipRecord.details.esicNo}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>PAN No:</strong>{" "}
//                       {selectedPayslipRecord.details.panNo}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           <strong>Earning Title</strong>
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           <strong>Current Month</strong>
//                         </TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           <strong>Deduction Title</strong>
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           <strong>Current Month</strong>
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           Basic
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.basic.toFixed(2)}
//                         </TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           PF
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.pf.toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           HRA
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.hra.toFixed(2)}
//                         </TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           ESIC
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.esic.toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           Medical
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.medical.toFixed(2)}
//                         </TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           TDS
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.tds.toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           Conveyance
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.conveyance.toFixed(2)}
//                         </TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           Other Deduction
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.otherDeduction.toFixed(
//                             2
//                           )}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           Arrears
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.arrears.toFixed(2)}
//                         </TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           MLWF
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.mlwf.toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                         ></TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         ></TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>
//                           Advance
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.advance.toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell
//                           sx={{ border: "1px solid #000", fontWeight: "bold" }}
//                         >
//                           Total
//                         </TableCell>
//                         <TableCell
//                           sx={{ border: "1px solid #000", fontWeight: "bold" }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.totalEarnings.toFixed(
//                             2
//                           )}
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             border: "1.2px solid #000",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Total
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             border: "1.2px solid #000",
//                             fontWeight: "bold",
//                           }}
//                           align="right"
//                         >
//                           {selectedPayslipRecord.details.totalDeductions.toFixed(
//                             2
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box
//                   sx={{
//                     mt: 2,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <Typography variant="body2">
//                     <strong>Total Earnings:</strong> ₹
//                     {selectedPayslipRecord.details.totalEarnings.toFixed(2)}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Total Deductions:</strong> ₹
//                     {selectedPayslipRecord.details.totalDeductions.toFixed(2)}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Take Home:</strong> ₹
//                     {selectedPayslipRecord.netPayable.toFixed(2)}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}>
//                   <Typography variant="body2">
//                     <strong>
//                       Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai
//                       Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj
//                       Kondhwa Road, Katraj, Pune - 411046.
//                     </strong>
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{ mt: 1, display: "block" }}
//                   >
//                     This is an electronically generated pay slip and does not
//                     require any signature.
//                   </Typography>
//                 </Box>
//               </Box>
//             ) : (
//               <Typography>
//                 Could not load payslip details. Please try again.
//               </Typography>
//             )}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions">
//           <Button onClick={handleClosePayslip} sx={{ color: "#7C3AED" }}>
//             Close
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleDownloadPdf}
//             sx={{ bgcolor: "#4f46e5" }}
//             disabled={dialogLoading || !selectedPayslipRecord}
//           >
//             Download PDF
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => window.print()}
//             sx={{ color: "#7C3AED", borderColor: "#7C3AED" }}
//             disabled={dialogLoading || !selectedPayslipRecord}
//           >
//             Print
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default PayrollPage;








import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TablePagination,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axiosInstance from "../utils/axiosInstance"; // Corrected Path

// IMPORTANT: Adjust this path to correctly point to your logo file
import vetrinaLogo from "./vetrinalogo.png"; // Corrected Path

const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Helper to transform the detailed payslip API response
const transformPayslipDetails = (apiDetail) => {
  if (!apiDetail) return null;

  const netPay = apiDetail.net_pay || 0;
  const totalEarnings = apiDetail.total_earnings || 0;
  const totalDeductions = apiDetail.total_deduction || 0;

  return {
    name: apiDetail.employee_name,
    netPayable: netPay,
    salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
    payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString(
      "en-GB",
      { day: "numeric", month: "long", year: "numeric" }
    ),
    details: {
      employeeId: apiDetail.employee_id,
      department: apiDetail.department_name,
      dateOfJoining: new Date(apiDetail.date_of_joining).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
      ),
      designation: apiDetail.designation_name,
      leaves: "N/A",
      location: apiDetail.location || "N/A",
      payableDays: apiDetail.payable_days,
      bankName: apiDetail.bank_name || "N/A",
      bankAcNo: apiDetail.bank_account_number || "N/A",
      pfNo: apiDetail.pf_number || "N/A",
      uanNo: apiDetail.uan_number || "N/A",
      esicNo: apiDetail.esic_number || "N/A",
      panNo: apiDetail.pan_number || "N/A",
      basic: apiDetail.basic_plus_da || 0,
      hra: apiDetail.hra || 0,
      medical: apiDetail.medical_allowance || 0,
      conveyance: apiDetail.conveyance_allowance || 0,
      arrears: apiDetail.arrears || 0,
      pf: apiDetail.pf || 0,
      esic: apiDetail.esic || 0,
      tds: apiDetail.tds || 0,
      otherDeduction: apiDetail.other_deduction || 0,
      mlwf: apiDetail.mlwf || 0,
      advance: 0,
      totalEarnings: totalEarnings,
      totalDeductions: totalDeductions,
    },
  };
};

function PayrollPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // States for data and UI control
  const [payslipHistory, setPayslipHistory] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    id: "...",
    name: "...",
    designation: "...",
    uan: "...",
  });
  const [tableLoading, setTableLoading] = useState(true);
  const [dialogLoading, setDialogLoading] = useState(false);

  // States for table functionality
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "payDate",
    direction: "desc",
  });
  const [page, setPage] = useState(0); // TablePagination is 0-based

  // States for payslip dialog
  const [isPayslipOpen, setIsPayslipOpen] = useState(false);
  const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
  const payslipRef = useRef();

  useEffect(() => {
    const loggedInEmployeeId = localStorage.getItem("loggedInUser");

    if (!loggedInEmployeeId) {
      console.error("Employee ID not found in local storage.");
      setTableLoading(false);
      setEmployeeDetails({
        id: "N/A",
        name: "Unknown User",
        designation: "N/A",
        uan: "N/A",
      });
      return;
    }

    const fetchHistory = async () => {
      setTableLoading(true);
      try {
        const response = await axiosInstance.get("/api/payslip_history/");
        if (
          response.data.status === "success" &&
          Array.isArray(response.data.data)
        ) {
          const userHistory = response.data.data.filter(
            (item) => item.employee_id === loggedInEmployeeId
          );

          const transformedData = userHistory.map((item) => ({
            id: item.payroll_report_id,
            payroll_report_id: item.payroll_report_id,
            netPayable: item.net_pay,
            salaryMonth: `${allMonths[item.month - 1]}, ${item.year}`,
            payDate: new Date(item.pay_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            rawPayDate: item.pay_date,
          }));
          setPayslipHistory(transformedData);

          if (userHistory.length > 0) {
            const firstRecord = userHistory[0];
            setEmployeeDetails((prev) => ({
              ...prev,
              id: firstRecord.employee_id,
              name: firstRecord.employee_name,
            }));
          } else {
            setEmployeeDetails((prev) => ({
              ...prev,
              id: loggedInEmployeeId,
              name: "User (No Payslip Data)",
            }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch payslip history:", error);
        setPayslipHistory([]);
      } finally {
        setTableLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleOpenPayslip = async (payslipRecord) => {
    setIsPayslipOpen(true);
    setDialogLoading(true);
    setSelectedPayslipRecord(null);
    try {
      const response = await axiosInstance.post("/api/payslip/", {
        payroll_report_id: String(payslipRecord.payroll_report_id),
      });
      if (response.data.status === "success" && response.data.data.length > 0) {
        const transformedDetails = transformPayslipDetails(
          response.data.data[0]
        );
        setSelectedPayslipRecord(transformedDetails);

        setEmployeeDetails((prev) => ({
          ...prev,
          designation:
            transformedDetails.details.designation || prev.designation,
          uan: transformedDetails.details.uanNo || prev.uan,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch payslip details:", error);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleClosePayslip = () => {
    setIsPayslipOpen(false);
    setSelectedPayslipRecord(null);
  };

  const handleDownloadPdf = () => {
    const input = payslipRef.current;
    if (!input) return;
    const actions = input.querySelector(".payslip-actions");
    if (actions) actions.style.display = "none";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      if (actions) actions.style.display = "flex";
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let newWidth = pdfWidth;
      let newHeight = newWidth / ratio;
      if (newHeight > pdfHeight) {
        newHeight = pdfHeight;
        newWidth = newHeight * ratio;
      }
      const x = (pdfWidth - newWidth) / 2;
      pdf.addImage(imgData, "PNG", x, 0, newWidth, newHeight);
      pdf.save(
        `Payslip-${selectedPayslipRecord.name.replace(
          " ",
          "_"
        )}-${selectedPayslipRecord.salaryMonth.replace(", ", "_")}.pdf`
      );
    });
  };

  const handleSort = (key) =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));

  const sortedData = [...payslipHistory]
    .filter((item) =>
      item.salaryMonth.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === "payDate") {
        aValue = new Date(a.rawPayDate);
        bValue = new Date(b.rawPayDate);
      }
      const valA = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
      const valB = typeof bValue === "string" ? bValue.toLowerCase() : bValue;
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getSortArrow = (columnKey) => {
    if (sortConfig.key !== columnKey)
      return <span style={{ fontSize: 12, color: "#d1d5db" }}>⇅</span>;
    return (
      <span style={{ fontSize: 12, color: "#ffffff" }}>
        {sortConfig.direction === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <Box component={Paper} p={3}>
      <Typography
        variant="h5"
        sx={{ color: "#8C257C", fontWeight: "bold", mb: 2 }}
      >
        Pay Slip History
      </Typography>

      <Card sx={{ mb: 4, bgcolor: "#f9fafb" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Emp. ID:</strong> {employeeDetails.id}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Emp. Name:</strong> {employeeDetails.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Designation:</strong> {employeeDetails.designation}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>UAN No.:</strong> {employeeDetails.uan}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          mb: 2,
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0); // Reset to first page on search
          }}
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

      <TableContainer sx={{ whiteSpace: "nowrap" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ "& .MuiTableCell-root": { bgcolor: "#8C257C" } }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                SR. NO.
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer", color: "white", fontWeight: "bold" }}
                onClick={() => handleSort("salaryMonth")}
              >
                <Box display="flex" alignItems="center" gap={0.5}>
                  {getSortArrow("salaryMonth")} SALARY MONTH
                </Box>
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer", color: "white", fontWeight: "bold" }}
                onClick={() => handleSort("netPayable")}
              >
                <Box display="flex" alignItems="center" gap={0.5}>
                  {getSortArrow("netPayable")} NET PAYABLE
                </Box>
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer", color: "white", fontWeight: "bold" }}
                onClick={() => handleSort("payDate")}
              >
                <Box display="flex" alignItems="center" gap={0.5}>
                  {getSortArrow("payDate")} PAY DATE
                </Box>
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableLoading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={30}
                      sx={{ borderRadius: "12px", margin: "auto" }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ fontSize: "0.95rem" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>
                    {item.salaryMonth}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#8C257C", fontWeight: 600, fontSize: "0.95rem" }}
                  >
                    ₹
                    {item.netPayable.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>
                    {item.payDate}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleOpenPayslip(item)}
                      size="small"
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        fontSize: "12px",
                        padding: "4px 12px",
                        backgroundColor: "#8C257C",
                        borderRadius: "12px",
                        "&:hover": {
                          backgroundColor: "#6d1d60",
                        },
                      }}
                    >
                      View Payslip
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No payslip history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        sx={{
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "text.secondary",
          },
          "& .MuiSvgIcon-root": {
            color: "#8C257C",
          },
        }}
      />

      <Dialog
        open={isPayslipOpen}
        onClose={handleClosePayslip}
        maxWidth="md"
        fullWidth
      >
        <Box ref={payslipRef}>
          <DialogTitle sx={{ color: "#8C257C", fontWeight: "bold" }}>
            Pay Slip
          </DialogTitle>
          <DialogContent>
            {dialogLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <CircularProgress sx={{ color: "#8C257C" }} />
              </Box>
            ) : selectedPayslipRecord ? (
              <Box
                sx={{
                  p: { xs: 1, sm: 2 },
                  border: "2px solid #000",
                  borderRadius: 1,
                  bgcolor: "background.paper",
                }}
              >
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={4}>
                    <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: "140px", height: "auto" }} />
                  </Grid>
                  <Grid item xs={8} sx={{ textAlign: "right" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
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
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell>
                        <TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell>
                        <TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell>
                        <TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Dynamically generate rows */}
                      {[
                        { earn: "Basic", ded: "PF", earnVal: "basic", dedVal: "pf" },
                        { earn: "HRA", ded: "ESIC", earnVal: "hra", dedVal: "esic" },
                        { earn: "Medical", ded: "TDS", earnVal: "medical", dedVal: "tds" },
                        { earn: "Conveyance", ded: "Other Deduction", earnVal: "conveyance", dedVal: "otherDeduction" },
                        { earn: "Arrears", ded: "MLWF", earnVal: "arrears", dedVal: "mlwf" },
                        { earn: "", ded: "Advance", earnVal: null, dedVal: "advance" },
                      ].map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ border: "1px solid #000" }}>{row.earn}</TableCell>
                          <TableCell sx={{ border: "1px solid #000" }} align="right">{row.earnVal ? selectedPayslipRecord.details[row.earnVal].toFixed(2) : ""}</TableCell>
                          <TableCell sx={{ border: "1px solid #000" }}>{row.ded}</TableCell>
                          <TableCell sx={{ border: "1px solid #000" }} align="right">{row.dedVal ? selectedPayslipRecord.details[row.dedVal].toFixed(2) : ""}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }}>Total</TableCell>
                        <TableCell sx={{ border: "1px solid #000", fontWeight: "bold" }} align="right">{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</TableCell>
                        <TableCell sx={{ border: "1.2px solid #000", fontWeight: "bold" }}>Total</TableCell>
                        <TableCell sx={{ border: "1.2px solid #000", fontWeight: "bold" }} align="right">{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <Typography variant="body2"><strong>Total Earnings:</strong> ₹{selectedPayslipRecord.details.totalEarnings.toFixed(2)}</Typography>
                  <Typography variant="body2"><strong>Total Deductions:</strong> ₹{selectedPayslipRecord.details.totalDeductions.toFixed(2)}</Typography>
                  <Typography variant="body2"><strong>Take Home:</strong> ₹{selectedPayslipRecord.netPayable.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Typography variant="body2">
                    <strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                    This is an electronically generated pay slip and does not require any signature.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography>Could not load payslip details. Please try again.</Typography>
            )}
          </DialogContent>
        </Box>
        <DialogActions className="payslip-actions">
          <Button onClick={handleClosePayslip} sx={{ color: "#757575" }}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleDownloadPdf}
            sx={{
              bgcolor: "#8C257C",
              color: "white",
              "&:hover": { bgcolor: "#6d1d60" },
            }}
            disabled={dialogLoading || !selectedPayslipRecord}
          >
            Download PDF
          </Button>
          <Button
            variant="outlined"
            onClick={() => window.print()}
            sx={{ color: "#8C257C", borderColor: "#8C257C" }}
            disabled={dialogLoading || !selectedPayslipRecord}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PayrollPage;