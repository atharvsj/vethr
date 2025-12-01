// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import * as XLSX from "xlsx";

// const DailyAttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination states
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           "https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=2025-08-12"
//         );
//         const data = await res.json();
//         setReportData(data);
//       } catch (error) {
//         console.error("Error fetching report:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Pagination calculations
//   const totalPages = Math.ceil(reportData.length / rowsPerPage);
//   const paginatedData = reportData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // Format time to HH:mm (remove seconds)
//   const formatTime = (time) => {
//     if (!time) return "-";
//     return time.slice(0, 5); // show only HH:mm
//   };

//   // Export function
//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       reportData.map((item, index) => ({
//         "Sr No": index + 1,
//         "Employee ID": item.employee_id,
//         "Employee Name": item.employee_name,
//         Department: item.department_name,
//         Designation: item.designation_name,
//         Division: item.division_name || "-",
//         "Manager Name": item.manager_name,
//         "Check In": formatTime(item.check_in_time),
//         "Check Out": formatTime(item.check_out_time),
//         "Late Mark": item.late_mark,
//         "Early Mark": item.early_mark || "-",
//         "Total Hours": item.total_working_hours || "-",
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(workbook, "Attendance_Report.xlsx");
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{ fontWeight: "bold" }}
//       >
//         Employee Daily Attendance Report
//       </Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <>
//           {/* Export Button */}
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//             <Button
//               variant="contained"
//               onClick={handleExport}
//               sx={{
//                 backgroundColor: "#673AB7",
//                 "&:hover": { backgroundColor: "#5E35B1" },
//               }}
//             >
//               Export Report
//             </Button>
//           </Box>

//           {/* Table */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#E6F3FF" }}>
//                 <TableRow>
//                   <TableCell align="center"><b>Sr No</b></TableCell>
//                   <TableCell align="center"><b>Employee ID</b></TableCell>
//                   <TableCell align="center"><b>Employee Name</b></TableCell>
//                   <TableCell align="center"><b>Department</b></TableCell>
//                   <TableCell align="center"><b>Designation</b></TableCell>
//                   <TableCell align="center"><b>Division</b></TableCell>
//                   <TableCell align="center"><b>Manager</b></TableCell>
//                   <TableCell align="center"><b>Punch In</b></TableCell>
//                   <TableCell align="center"><b>Punch Out</b></TableCell>
//                   <TableCell align="center"><b>Late Mark</b></TableCell>
//                   <TableCell align="center"><b>Early Mark</b></TableCell>
//                   <TableCell align="center"><b>Total Hours</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedData.map((row, index) => (
//                   <TableRow
//                     key={index}
//                     sx={{
//                       backgroundColor:
//                         index % 2 === 0 ? "#FFFFFF" : "#F5F9FF",
//                       "&:hover": { backgroundColor: "#EAF3FF" },
//                     }}
//                   >
//                     <TableCell align="center">
//                       {(page - 1) * rowsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell align="center">{row.employee_id}</TableCell>
//                     <TableCell align="center">{row.employee_name}</TableCell>
//                     <TableCell align="center">{row.department_name}</TableCell>
//                     <TableCell align="center">{row.designation_name}</TableCell>
//                     <TableCell align="center">{row.division_name || "-"}</TableCell>
//                     <TableCell align="center">{row.manager_name}</TableCell>
//                     <TableCell align="center">{formatTime(row.check_in_time)}</TableCell>
//                     <TableCell align="center">{formatTime(row.check_out_time)}</TableCell>
//                     <TableCell align="center">{row.late_mark}</TableCell>
//                     <TableCell align="center">{row.early_mark || "-"}</TableCell>
//                     <TableCell align="center">{row.total_working_hours || "-"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination Controls */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mt: 2,
//             }}
//           >
//             {/* Rows Per Page */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Typography>Rows</Typography>
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(e.target.value);
//                   setPage(1);
//                 }}
//                 size="small"
//               >
//                 {[5, 10, 20, 50].map((num) => (
//                   <MenuItem key={num} value={num}>
//                     {num}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Box>

//             {/* Page Info + Buttons */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Button
//                 variant="contained"
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//                 sx={{
//                   backgroundColor: page === 1 ? "#ccc" : "#673AB7",
//                   "&:hover": {
//                     backgroundColor: page === 1 ? "#ccc" : "#5E35B1",
//                   },
//                 }}
//               >
//                 Previous
//               </Button>

//               <Typography>
//                 Page {page} of {totalPages}
//               </Typography>

//               <Button
//                 variant="contained"
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//                 sx={{
//                   backgroundColor:
//                     page === totalPages ? "#ccc" : "#673AB7",
//                   "&:hover": {
//                     backgroundColor:
//                       page === totalPages ? "#ccc" : "#5E35B1",
//                   },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default DailyAttendanceReport;   ///



// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Select,
//   MenuItem,
// } from "@mui/material";
// // --- START OF NEW IMPORTS ---
// import { createTheme, ThemeProvider } from '@mui/material/styles'; // To create the custom theme
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Provider for date picker
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Date library adapter
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // The new DatePicker component
// import dayjs from 'dayjs'; // The date library
// // --- END OF NEW IMPORTS ---
// import * as XLSX from "xlsx";

// // --- START OF THEME CREATION ---
// // Define a theme where the primary color is our desired purple
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#673AB7', // This is the purple color from your buttons
//     },
//   },
// });
// // --- END OF THEME CREATION ---

// const DailyAttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- MODIFIED STATE: Use dayjs object for the date state for better compatibility
//   const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize with today's date as a dayjs object

//   // Pagination states
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);

//   // Modified useEffect to fetch data based on the selectedDate
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Format the dayjs object into a 'YYYY-MM-DD' string for the API call
//         const dateString = selectedDate.format('YYYY-MM-DD');
//         const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;

//         const res = await fetch(apiUrl);
//         const data = await res.json();
//         setReportData(data);
//         setPage(1);
//       } catch (error) {
//         console.error("Error fetching report:", error);
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [selectedDate]); // Re-run effect when the dayjs date object changes

//   // Pagination calculations
//   const totalPages = Math.ceil(reportData.length / rowsPerPage);
//   const paginatedData = reportData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // Format time to HH:mm (remove seconds)
//   const formatTime = (time) => {
//     if (!time) return "-";
//     return time.slice(0, 5);
//   };

//   // Export function
//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       reportData.map((item, index) => ({
//         "Sr No": index + 1,
//         "Employee ID": item.employee_id,
//         "Employee Name": item.employee_name,
//         Department: item.department_name,
//         Designation: item.designation_name,
//         Division: item.division_name || "-",
//         "Manager Name": item.manager_name,
//         "Check In": formatTime(item.check_in_time),
//         "Check Out": formatTime(item.check_out_time),
//         "Late Mark": item.late_mark,
//         "Early Mark": item.early_mark || "-",
//         "Total Hours": item.total_working_hours || "-",
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(workbook, `Attendance_Report_${selectedDate.format('YYYY-MM-DD')}.xlsx`);
//   };

//   return (
//     // Wrap the entire component in the ThemeProvider to apply the purple theme
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3 }}>
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{ fontWeight: "bold" }}
//         >
//           Employee Daily Attendance Report
//         </Typography>

//         {/* Container for Filter and Export Button */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//           {/* --- REPLACED TextField WITH DatePicker --- */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Select Date"
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//               slotProps={{
//                 textField: {
//                   sx: { width: 220 }
//                 }
//               }}
//             />
//           </LocalizationProvider>
//           {/* --- END OF REPLACEMENT --- */}

//           <Button
//             variant="contained"
//             onClick={handleExport}
//             disabled={reportData.length === 0}
//           >
//             Export Report
//           </Button>
//         </Box>

//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {/* Table */}
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: "#E6F3FF" }}>
//                   <TableRow>
//                     <TableCell align="center"><b>Sr No</b></TableCell>
//                     <TableCell align="center"><b>Employee ID</b></TableCell>
//                     <TableCell align="center"><b>Employee Name</b></TableCell>
//                     <TableCell align="center"><b>Department</b></TableCell>
//                     <TableCell align="center"><b>Designation</b></TableCell>
//                     <TableCell align="center"><b>Division</b></TableCell>
//                     <TableCell align="center"><b>Manager</b></TableCell>
//                     <TableCell align="center"><b>Punch In</b></TableCell>
//                     <TableCell align="center"><b>Punch Out</b></TableCell>
//                     <TableCell align="center"><b>Late Mark</b></TableCell>
//                     <TableCell align="center"><b>Early Mark</b></TableCell>
//                     <TableCell align="center"><b>Total Hours</b></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedData.length > 0 ? (
//                     paginatedData.map((row, index) => (
//                       <TableRow
//                         key={index}
//                         sx={{
//                           backgroundColor:
//                             index % 2 === 0 ? "#FFFFFF" : "#F5F9FF",
//                           "&:hover": { backgroundColor: "#EAF3FF" },
//                         }}
//                       >
//                         <TableCell align="center">
//                           {(page - 1) * rowsPerPage + index + 1}
//                         </TableCell>
//                         <TableCell align="center">{row.employee_id}</TableCell>
//                         <TableCell align="center">{row.employee_name}</TableCell>
//                         <TableCell align="center">{row.department_name}</TableCell>
//                         <TableCell align="center">{row.designation_name}</TableCell>
//                         <TableCell align="center">{row.division_name || "-"}</TableCell>
//                         <TableCell align="center">{row.manager_name}</TableCell>
//                         <TableCell align="center">{formatTime(row.check_in_time)}</TableCell>
//                         <TableCell align="center">{formatTime(row.check_out_time)}</TableCell>
//                         <TableCell align="center">{row.late_mark}</TableCell>
//                         <TableCell align="center">{row.early_mark || "-"}</TableCell>
//                         <TableCell align="center">{row.total_working_hours || "-"}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={12} align="center">
//                         No data available for the selected date.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Pagination Controls */}
//             {reportData.length > 0 && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: 2,
//                 }}
//               >
//                 {/* Rows Per Page */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Typography>Rows</Typography>
//                   <Select
//                     value={rowsPerPage}
//                     onChange={(e) => {
//                       setRowsPerPage(e.target.value);
//                       setPage(1);
//                     }}
//                     size="small"
//                   >
//                     {[5, 10, 20, 50].map((num) => (
//                       <MenuItem key={num} value={num}>
//                         {num}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Box>

//                 {/* Page Info + Buttons */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <Button
//                     variant="contained"
//                     disabled={page === 1}
//                     onClick={() => setPage(page - 1)}
//                   >
//                     Previous
//                   </Button>

//                   <Typography>
//                     Page {page} of {totalPages}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     disabled={page === totalPages}
//                     onClick={() => setPage(page + 1)}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default DailyAttendanceReport;   //// 







// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// // Theme for purple color
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#673AB7",
//     },
//   },
// });

// const DailyAttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [showReport, setShowReport] = useState(false);

//   const fetchReport = async () => {
//     setLoading(true);
//     try {
//       const dateString = selectedDate.format("YYYY-MM-DD");
//       const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;

//       const res = await fetch(apiUrl);
//       const data = await res.json();
//       setReportData(data);
//       setPage(1);
//       setShowReport(true);
//     } catch (error) {
//       console.error("Error fetching report:", error);
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalPages = Math.ceil(reportData.length / rowsPerPage);
//   const paginatedData = reportData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const formatTime = (time) => {
//     if (!time) return "-";
//     return time.slice(0, 5);
//   };

//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       reportData.map((item, index) => ({
//         "Sr No": index + 1,
//         "Employee ID": item.employee_id,
//         "Employee Name": item.employee_name,
//         Department: item.department_name,
//         Designation: item.designation_name,
//         Division: item.division_name || "-",
//         "Manager Name": item.manager_name,
//         "Check In": formatTime(item.check_in_time),
//         "Check Out": formatTime(item.check_out_time),
//         "Late Mark": item.late_mark,
//         "Early Mark": item.early_mark || "-",
//         "Total Hours": item.total_working_hours || "-",
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(
//       workbook,
//       `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//           Employee Daily Attendance Report
//         </Typography>

//         {/* Filter + Generate Report Button */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Select Date"
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//               slotProps={{
//                 textField: {
//                   sx: { width: 220 },
//                 },
//               }}
//             />
//           </LocalizationProvider>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={fetchReport}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Generate Report"}
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleExport}
//               disabled={reportData.length === 0}
//             >
//               Export Report
//             </Button>
//           </Box>
//         </Box>

//         {/* Show table only after Generate Report */}
//         {showReport && (
//           <>
//             {loading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <>
//                 {/* Table */}
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead sx={{ backgroundColor: "#E6F3FF" }}>
//                       <TableRow>
//                         <TableCell align="center">
//                           <b>Sr No</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Employee ID</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Employee Name</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Department</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Designation</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Division</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Manager</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Punch In</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Punch Out</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Late Mark</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Early Mark</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Total Hours</b>
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {paginatedData.length > 0 ? (
//                         paginatedData.map((row, index) => (
//                           <TableRow
//                             key={index}
//                             sx={{
//                               backgroundColor:
//                                 index % 2 === 0 ? "#FFFFFF" : "#F5F9FF",
//                               "&:hover": { backgroundColor: "#EAF3FF" },
//                             }}
//                           >
//                             <TableCell align="center">
//                               {(page - 1) * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.employee_id}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.employee_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.department_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.designation_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.division_name || "-"}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.manager_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {formatTime(row.check_in_time)}
//                             </TableCell>
//                             <TableCell align="center">
//                               {formatTime(row.check_out_time)}
//                             </TableCell>
//                             <TableCell align="center">{row.late_mark}</TableCell>
//                             <TableCell align="center">
//                               {row.early_mark || "-"}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.total_working_hours || "-"}
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={12} align="center">
//                             No data available for the selected date.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* Pagination */}
//                 {reportData.length > 0 && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       mt: 2,
//                     }}
//                   >
//                     {/* Rows Per Page */}
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Typography>Rows per page:</Typography>
//                       <Select
//                         value={rowsPerPage}
//                         onChange={(e) => {
//                           setRowsPerPage(e.target.value);
//                           setPage(1);
//                         }}
//                         size="small"
//                       >
//                         {[5, 10, 20, 50].map((num) => (
//                           <MenuItem key={num} value={num}>
//                             {num}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </Box>

//                     {/* Page Info + Buttons */}
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                       <Button
//                         variant="contained"
//                         disabled={page === 1}
//                         onClick={() => setPage(page - 1)}
//                       >
//                         Previous
//                       </Button>

//                       <Typography>
//                         {`${(page - 1) * rowsPerPage + 1}–${Math.min(
//                           page * rowsPerPage,
//                           reportData.length
//                         )} of ${reportData.length}`}
//                       </Typography>

//                       <Button
//                         variant="contained"
//                         disabled={page === totalPages}
//                         onClick={() => setPage(page + 1)}
//                       >
//                         Next
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default DailyAttendanceReport;






// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// // Theme for purple color
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#673AB7",
//     },
//   },
// });

// const DailyAttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [showReport, setShowReport] = useState(false);

//   const fetchReport = async () => {
//     setLoading(true);
//     try {
//       const dateString = selectedDate.format("YYYY-MM-DD");
//       const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;

//       const res = await fetch(apiUrl);
//       const data = await res.json();
//       setReportData(data);
//       setPage(1);
//       setShowReport(true);
//     } catch (error) {
//       console.error("Error fetching report:", error);
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const totalPages = Math.ceil(reportData.length / rowsPerPage);
//   const paginatedData = reportData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // MODIFIED FUNCTION
//   const formatTime = (time) => {
//     if (!time) return "-";
//     // Use dayjs to parse the time string (e.g., "14:30:00") and format it to 12-hour format with AM/PM
//     return dayjs(`2000-01-01T${time}`).format("hh:mm A");
//   };

//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       reportData.map((item, index) => ({
//         "Sr No": index + 1,
//         "Employee ID": item.employee_id,
//         "Employee Name": item.employee_name,
//         Department: item.department_name,
//         Designation: item.designation_name,
//         Division: item.division_name || "-",
//         "Manager Name": item.manager_name,
//         "Check In": formatTime(item.check_in_time),
//         "Check Out": formatTime(item.check_out_time),
//         "Late Mark": item.late_mark,
//         "Early Mark": item.early_mark || "-",
//         "Total Hours": item.total_working_hours || "-",
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(
//       workbook,
//       `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//            Daily Attendance Report
//         </Typography>

//         {/* Filter + Generate Report Button */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Select Date"
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//               slotProps={{
//                 textField: {
//                   sx: { width: 220 },
//                 },
//               }}
//             />
//           </LocalizationProvider>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={fetchReport}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Generate Report"}
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleExport}
//               disabled={reportData.length === 0}
//             >
//               Export Report
//             </Button>
//           </Box>
//         </Box>

//         {/* Show table only after Generate Report */}
//         {showReport && (
//           <>
//             {loading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <>
//                 {/* Table */}
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead sx={{ backgroundColor: "#E6F3FF" }}>
//                       <TableRow>
//                         <TableCell align="center">
//                           <b>Sr No</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Employee ID</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Employee Name</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Department</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Designation</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Division</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Manager</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Punch In</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Punch Out</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Late Mark</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Early Mark</b>
//                         </TableCell>
//                         <TableCell align="center">
//                           <b>Total Hours</b>
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {paginatedData.length > 0 ? (
//                         paginatedData.map((row, index) => (
//                           <TableRow
//                             key={index}
//                             sx={{
//                               backgroundColor:
//                                 index % 2 === 0 ? "#FFFFFF" : "#F5F9FF",
//                               "&:hover": { backgroundColor: "#EAF3FF" },
//                             }}
//                           >
//                             <TableCell align="center">
//                               {(page - 1) * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.employee_id}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.employee_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.department_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.designation_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.division_name || "-"}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.manager_name}
//                             </TableCell>
//                             <TableCell align="center">
//                               {formatTime(row.check_in_time)}
//                             </TableCell>
//                             <TableCell align="center">
//                               {formatTime(row.check_out_time)}
//                             </TableCell>
//                             <TableCell align="center">{row.late_mark}</TableCell>
//                             <TableCell align="center">
//                               {row.early_mark || "-"}
//                             </TableCell>
//                             <TableCell align="center">
//                               {row.total_working_hours || "-"}
//                             </TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={12} align="center">
//                             No data available for the selected date.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* Pagination */}
//                 {reportData.length > 0 && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       mt: 2,
//                     }}
//                   >
//                     {/* Rows Per Page */}
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Typography>Rows per page:</Typography>
//                       <Select
//                         value={rowsPerPage}
//                         onChange={(e) => {
//                           setRowsPerPage(e.target.value);
//                           setPage(1);
//                         }}
//                         size="small"
//                       >
//                         {[5, 10, 20, 50].map((num) => (
//                           <MenuItem key={num} value={num}>
//                             {num}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </Box>

//                     {/* Page Info + Buttons */}
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                       <Button
//                         variant="contained"
//                         disabled={page === 1}
//                         onClick={() => setPage(page - 1)}
//                       >
//                         Previous
//                       </Button>

//                       <Typography>
//                         {`${(page - 1) * rowsPerPage + 1}–${Math.min(
//                           page * rowsPerPage,
//                           reportData.length
//                         )} of ${reportData.length}`}
//                       </Typography>

//                       <Button
//                         variant="contained"
//                         disabled={page === totalPages}
//                         onClick={() => setPage(page + 1)}
//                       >
//                         Next
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default DailyAttendanceReport;  







// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   CircularProgress,
//   Select,
//   MenuItem,
//   TextField, // <-- ADDED: For the search bar
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// // Theme for purple color
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#673AB7",
//     },
//   },
// });

// const DailyAttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // MODIFIED: Date is null by default so the field is empty on page load
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [showReport, setShowReport] = useState(false);
//   // ADDED: State for the search query
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchReport = async () => {
//     if (!selectedDate) {
//       alert("Please select a date first.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const dateString = selectedDate.format("YYYY-MM-DD");
//       const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;

//       const res = await fetch(apiUrl);
//       const data = await res.json();
//       setReportData(data);
//       setPage(1); // Reset to first page on new report
//       setShowReport(true);
//     } catch (error) {
//       console.error("Error fetching report:", error);
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ADDED: Filtering logic based on the search query
//   const filteredData = reportData.filter((item) => {
//     const searchString = searchQuery.toLowerCase();
//     return (
//       item.employee_name?.toLowerCase().includes(searchString) ||
//       item.employee_id?.toString().toLowerCase().includes(searchString) ||
//       item.department_name?.toLowerCase().includes(searchString) ||
//       item.designation_name?.toLowerCase().includes(searchString)
//     );
//   });

//   // MODIFIED: Pagination now works on the filtered data
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const formatTime = (time) => {
//     if (!time) return "00:00";
//     return dayjs(`2000-01-01T${time}`).format("hh:mm A");
//   };

//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(
//       // MODIFIED: Export uses the filtered data
//       filteredData.map((item, index) => ({
//         "Sr No": index + 1,
//         "Employee ID": item.employee_id,
//         Name: item.employee_name,
//         Department: item.department_name,
//         Designation: item.designation_name,
//         Division: item.division_name || "-",
//         "Sub-Division": item.sub_division || "-", // Assuming 'sub_division' from API
//         Level: item.level || "-", // Assuming 'level' from API
//         Headquarter: item.headquarter || "-", // Assuming 'headquarter' from API
//         "Line Manager": item.manager_name,
//         "D.O.J": item.date_of_joining || "-", // Assuming 'date_of_joining' from API
//         "Check In time": formatTime(item.check_in_time),
//         "Check Out time": formatTime(item.check_out_time),
//         "Total working Hours": item.total_working_hours || "00:00",
//         "Late Marks": item.late_mark,
//         "Early Exit": item.early_mark || "-",
//       }))
//     );
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(
//       workbook,
//       `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//           Daily Attendance Report
//         </Typography>

//         {/* --- MODIFIED: Filter + Controls Section --- */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           {/* Left side controls */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Date"
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 slotProps={{
//                   textField: {
//                     sx: { width: 200 },
//                   },
//                 }}
//               />
//             </LocalizationProvider>

//             {/* ADDED: Search Bar */}
//             <TextField
//               label="Search..."
//               variant="outlined"
//               size="medium"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               sx={{ width: 250 }}
//             />
//           </Box>

//           {/* Right side buttons */}
//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={fetchReport}
//               // MODIFIED: Button is disabled if no date is selected
//               disabled={loading || !selectedDate}
//             >
//               {loading ? "Loading..." : "Generate Report"}
//             </Button>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleExport}
//               disabled={reportData.length === 0}
//             >
//               Export Report
//             </Button>
//           </Box>
//         </Box>

//         {/* Show table only after Generate Report */}
//         {showReport && (
//           <>
//             {loading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//                 <CircularProgress />
//               </Box>
//             ) : (
//               <>
//                 {/* ADDED: Top pagination control for "Rows per page" */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
//                   <Typography>Rows per page:</Typography>
//                   <Select
//                     value={rowsPerPage}
//                     onChange={(e) => {
//                       setRowsPerPage(e.target.value);
//                       setPage(1);
//                     }}
//                     size="small"
//                   >
//                     {[10, 20, 50, 100].map((num) => (
//                       <MenuItem key={num} value={num}>
//                         {num}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </Box>

//                 <TableContainer component={Paper}>
//                   <Table>
//                     {/* --- MODIFIED: TableHead updated to match the image --- */}
//                     <TableHead sx={{ backgroundColor: "#E6F3FF" }}>
//                       <TableRow>
//                         <TableCell align="center"><b>Sr No</b></TableCell>
//                         <TableCell align="center"><b>Employee ID</b></TableCell>
//                         <TableCell align="center"><b>Name</b></TableCell>
//                         <TableCell align="center"><b>Department</b></TableCell>
//                         <TableCell align="center"><b>Designation</b></TableCell>
//                         <TableCell align="center"><b>Division</b></TableCell>
//                         <TableCell align="center"><b>Sub-Division</b></TableCell>
//                         <TableCell align="center"><b>Level</b></TableCell>
//                         <TableCell align="center"><b>Headquarter</b></TableCell>
//                         <TableCell align="center"><b>Line Manager</b></TableCell>
//                         <TableCell align="center"><b>D.O.J</b></TableCell>
//                         <TableCell align="center"><b>Check In time</b></TableCell>
//                         <TableCell align="center"><b>Check Out time</b></TableCell>
//                         <TableCell align="center"><b>Total working Hours</b></TableCell>
//                         <TableCell align="center"><b>Late Marks</b></TableCell>
//                         <TableCell align="center"><b>Early Exit</b></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {paginatedData.length > 0 ? (
//                         paginatedData.map((row, index) => (
//                           <TableRow
//                             key={index}
//                             sx={{
//                               backgroundColor:
//                                 index % 2 === 0 ? "#FFFFFF" : "#F5F9FF",
//                               "&:hover": { backgroundColor: "#EAF3FF" },
//                             }}
//                           >
//                             {/* --- MODIFIED: TableBody cells updated to match headers --- */}
//                             <TableCell align="center">{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                             <TableCell align="center">{row.employee_id}</TableCell>
//                             <TableCell align="center">{row.employee_name}</TableCell>
//                             <TableCell align="center">{row.department_name}</TableCell>
//                             <TableCell align="center">{row.designation_name}</TableCell>
//                             <TableCell align="center">{row.division_name || "-"}</TableCell>
//                             <TableCell align="center">{row.sub_division || "-"}</TableCell>
//                             <TableCell align="center">{row.level || "-"}</TableCell>
//                             <TableCell align="center">{row.headquarter || "-"}</TableCell>
//                             <TableCell align="center">{row.manager_name}</TableCell>
//                             <TableCell align="center">{row.date_of_joining || "-"}</TableCell>
//                             <TableCell align="center">{formatTime(row.check_in_time)}</TableCell>
//                             <TableCell align="center">{formatTime(row.check_out_time)}</TableCell>
//                             <TableCell align="center">{row.total_working_hours || "00:00"}</TableCell>
//                             <TableCell align="center">{row.late_mark}</TableCell>
//                             <TableCell align="center">{row.early_mark || "-"}</TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           <TableCell colSpan={16} align="center">
//                             No data available.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* --- MODIFIED: Bottom Pagination Section --- */}
//                 {filteredData.length > 0 && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "flex-end", // Aligned to the right
//                       alignItems: "center",
//                       mt: 2,
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                       <Button
//                         variant="contained"
//                         disabled={page === 1}
//                         onClick={() => setPage(page - 1)}
//                       >
//                         Previous
//                       </Button>
//                       <Typography>
//                         Page {page} of {totalPages}
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         disabled={page === totalPages}
//                         onClick={() => setPage(page + 1)}
//                       >
//                         Next
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default DailyAttendanceReport;   ///




// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   Container,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";

// // Helper function to format time to hh:mm AM/PM
// const formatTime = (time) => {
//   if (!time) return "N/A";
//   return dayjs(`2000-01-01T${time}`).format("hh:mm A");
// };

// // Helper function to format dates
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "N/A";
//   return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// const AttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // State for filters and pagination
//   const [selectedDate, setSelectedDate] = useState(null); // Default to null (empty)
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0); // Use 0-based index
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleGenerateReport = async () => {
//     if (!selectedDate) {
//       setError("Please select a date first.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);

//     try {
//       const dateString = selectedDate.format("YYYY-MM-DD");
//       const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;

//       const res = await fetch(apiUrl);
//       if (!res.ok) {
//         throw new Error(`Failed to fetch: ${res.statusText}`);
//       }

//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//       setPage(0);
//     } catch (err) {
//       setError("Failed to fetch attendance report. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = () => {
//     if (filteredData.length === 0) return;

//     const dataToExport = filteredData.map((item, index) => ({
//       "Sr No": index + 1,
//       "Employee ID": item.employee_id,
//       "Name": item.employee_name,
//       "Department": item.department_name,
//       "Designation": item.designation_name,
//       "Division": item.division_name || "N/A",
//       "Sub-Division": item.sub_division || "N/A",
//       "Level": item.level || "N/A",
//       "Headquarter": item.headquarter || "N/A",
//       "Line Manager": item.manager_name,
//       "D.O.J": formatDate(item.date_of_joining),
//       "Check In time": formatTime(item.check_in_time),
//       "Check Out time": formatTime(item.check_out_time),
//       "Total working Hours": item.total_working_hours || "N/A",
//       "Late Marks": item.late_mark ?? "N/A",
//       "Early Exit": item.early_mark || "N/A",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(workbook, `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to first page on new search
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Client-side filtering
//   const filteredData = reportData.filter((row) => {
//     const s = searchTerm.toLowerCase();
//     return (
//       row.employee_id?.toLowerCase().includes(s) ||
//       row.employee_name?.toLowerCase().includes(s) ||
//       row.department_name?.toLowerCase().includes(s) ||
//       row.designation_name?.toLowerCase().includes(s) ||
//       row.manager_name?.toLowerCase().includes(s)
//     );
//   });

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const columns = [
//     { id: "sr_no", label: "Sr No" }, { id: "employee_id", label: "Employee ID" }, { id: "name", label: "Name" },
//     { id: "department", label: "Department" }, { id: "designation", label: "Designation" }, { id: "division", label: "Division" },
//     { id: "sub_division", label: "Sub-Division" }, { id: "level", label: "Level" }, { id: "headquarter", label: "Headquarter" },
//     { id: "line_manager", label: "Line Manager" }, { id: "doj", label: "D.O.J" }, { id: "check_in", label: "Punch In time" },
//     { id: "check_out", label: "Punch Out time" }, { id: "total_hours", label: "Total working Hours" },
//     { id: "late_marks", label: "Late Marks" }, { id: "early_exit", label: "Early Exit" }
//   ];

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Daily Attendance Report
//       </Typography>

//       <Grid container spacing={2} mb={2} alignItems="center">
//         {/* Top-Left: Rows per Page Dropdown */}
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//               <MenuItem value={100}>100</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         {/* Center: Date Picker and Action Buttons */}
//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               label="Select Date"
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//               slotProps={{ textField: { size: 'small' } }}
//             />
//           </LocalizationProvider>

//           <Button
//             variant="contained"
//             onClick={handleGenerateReport}
//             disabled={loading || !selectedDate}
//             sx={purpleButtonStyle}
//           >
//             Generate Report
//           </Button>

//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//               Export Report
//             </Button>
//           )}
//         </Grid>

//         {/* Top-Right: Search Input Field */}
//         <Grid item xs={12} sm={12} md={2}>
//           <TextField
//             fullWidth
//             size="small"
//             variant="outlined"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </Grid>
//       </Grid>

//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : !hasSearched ? (
//               <TableRow><TableCell colSpan={columns.length} align="center">Please select a date and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.employee_id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.employee_id || "N/A"}</TableCell>
//                   <TableCell>{row.employee_name || "N/A"}</TableCell>
//                   <TableCell>{row.department_name || "N/A"}</TableCell>
//                   <TableCell>{row.designation_name || "N/A"}</TableCell>
//                   <TableCell>{row.division_name || "N/A"}</TableCell>
//                   <TableCell>{row.sub_division || "N/A"}</TableCell>
//                   <TableCell>{row.level || "N/A"}</TableCell>
//                   <TableCell>{row.headquarter || "N/A"}</TableCell>
//                   <TableCell>{row.manager_name || "N/A"}</TableCell>
//                   <TableCell>{formatDate(row.date_of_joining)}</TableCell>
//                   <TableCell>{formatTime(row.check_in_time)}</TableCell>
//                   <TableCell>{formatTime(row.check_out_time)}</TableCell>
//                   <TableCell>{row.total_working_hours || "N/A"}</TableCell>
//                   <TableCell>{row.late_mark ?? "N/A"}</TableCell>
//                   <TableCell>{row.early_mark || "N/A"}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Bottom-Right: Pagination Controls */}
//       {filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Button
//               variant="contained"
//               onClick={() => setPage(page - 1)}
//               disabled={page === 0}
//             >
//               Previous
//             </Button>
//             <Typography>
//               Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => setPage(page + 1)}
//               disabled={page >= pageCount - 1}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default AttendanceReport;







// import React, { useState, useMemo } from "react";
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
//   Grid,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import Swal from "sweetalert2";

// // MUI Icons
// import SearchIcon from "@mui/icons-material/Search";
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import AssessmentIcon from '@mui/icons-material/Assessment';

// // Helper function to format time to hh:mm AM/PM
// const formatTime = (time) => {
//   if (!time) return "N/A";
//   return dayjs(`2000-01-01T${time}`).format("hh:mm A");
// };

// // Helper function to format dates to dd/mm/yyyy
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "N/A";
//   return date.toLocaleDateString("en-GB");
// };

// const AttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Theme-consistent button styles
//   const primaryButtonStyle = {
//     backgroundColor: "#8C257C",
//     color: "#FFFFFF",
//     "&:hover": {
//       backgroundColor: "#6d1d60",
//     },
//   };

//   const handleGenerateReport = async () => {
//     if (!selectedDate) {
//       Swal.fire({
//         icon: "error",
//         title: "Date Missing",
//         text: "Please select a date first.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setLoading(true);
//     setHasSearched(true);
//     setReportData([]);
//     setPage(0);

//     try {
//       const dateString = selectedDate.format("YYYY-MM-DD");
//       const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;
//       const res = await fetch(apiUrl);
//       if (!res.ok) {
//         throw new Error(`Failed to fetch: ${res.statusText}`);
//       }
//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//       if (Array.isArray(data) && data.length === 0) {
//         Swal.fire({
//             icon: 'info',
//             title: 'No Data Found',
//             text: 'There is no attendance data for the selected date.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Request Failed",
//         text: "Failed to fetch the attendance report. Please try again later.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Memoized filtering and pagination for performance
//   const filteredData = useMemo(() =>
//     reportData.filter((row) => {
//       const s = searchTerm.toLowerCase();
//       return (
//         row.employee_id?.toLowerCase().includes(s) ||
//         row.employee_name?.toLowerCase().includes(s) ||
//         row.department_name?.toLowerCase().includes(s) ||
//         row.designation_name?.toLowerCase().includes(s) ||
//         row.manager_name?.toLowerCase().includes(s)
//       );
//     }), [reportData, searchTerm]);

//   const paginatedData = useMemo(() =>
//     filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [filteredData, page, rowsPerPage]
//   );

//   const handleExport = () => {
//     if (filteredData.length === 0) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'No Data to Export',
//             text: 'There is no data to export.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//         return;
//     }
//     const dataToExport = filteredData.map((item, index) => ({
//       "Sr No": page * rowsPerPage + index + 1,
//       "Employee ID": item.employee_id,
//       "Name": item.employee_name,
//       "Department": item.department_name,
//       "Designation": item.designation_name,
//       "Division": item.division_name || "N/A",
//       "Sub-Division": item.sub_division || "N/A",
//       "Level": item.level || "N/A",
//       "Headquarter": item.headquarter || "N/A",
//       "Line Manager": item.manager_name,
//       "D.O.J": formatDate(item.date_of_joining),
//       "Check In time": formatTime(item.check_in_time),
//       "Check Out time": formatTime(item.check_out_time),
//       "Total working Hours": item.total_working_hours || "N/A",
//       "Late Marks": item.late_mark ?? "N/A",
//       "Early Exit": item.early_mark || "N/A",
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(workbook, `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`);
//   };
  
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };
  
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const columns = [
//     { id: "sr_no", label: "Sr No" }, { id: "employee_id", label: "Employee ID" }, { id: "name", label: "Name" },
//     { id: "department", label: "Department" }, { id: "designation", label: "Designation" }, { id: "division", label: "Division" },
//     { id: "sub_division", label: "Sub-Division" }, { id: "level", label: "Level" }, { id: "headquarter", label: "Headquarter" },
//     { id: "line_manager", label: "Line Manager" }, { id: "doj", label: "D.O.J" }, { id: "check_in", label: "Punch In" },
//     { id: "check_out", label: "Punch Out" }, { id: "total_hours", label: "Total Hours" },
//     { id: "late_marks", label: "Late Marks" }, { id: "early_exit", label: "Early Exit" }
//   ];

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h5" fontWeight="bold" color="#8C257C" mb={2}>
//         Daily Attendance Report
//       </Typography>

//       <Stack
//         direction={isMobile ? "column" : "row"}
//         justifyContent="space-between"
//         alignItems="center"
//         spacing={2}
//         mb={2}
//       >
//         <Stack direction="row" spacing={1} alignItems="center" width={isMobile ? "100%" : "auto"}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Date"
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 slotProps={{ textField: { size: 'small' } }}
//               />
//             </LocalizationProvider>
//             <Button
//                 variant="contained"
//                 onClick={handleGenerateReport}
//                 disabled={loading || !selectedDate}
//                 sx={primaryButtonStyle}
//                 startIcon={<AssessmentIcon />}
//             >
//                 Generate
//             </Button>
//             {reportData.length > 0 && (
//                 <Button variant="contained" onClick={handleExport} sx={primaryButtonStyle} startIcon={<FileUploadIcon />}>
//                     Export
//                 </Button>
//             )}
//         </Stack>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   sx={{
//                     backgroundColor: "#8C257C",
//                     color: "#FFFFFF",
//                     fontWeight: "bold",
//                     fontSize: '0.875rem'
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.employee_id || index} hover>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.employee_id || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.employee_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.department_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.designation_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.division_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.sub_division || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.level || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.headquarter || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.manager_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(row.date_of_joining)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{formatTime(row.check_in_time)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{formatTime(row.check_out_time)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.total_working_hours || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.late_mark ?? "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.early_mark || "N/A"}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                     {hasSearched ? "No data available for the selected criteria." : "Please select a date and click 'Generate'."}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           p: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary" mb={isMobile ? 2 : 0}>
//           {hasSearched && `Showing ${filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length} results`}
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           sx={{
//             '& .MuiSelect-icon': {
//               color: '#8C257C'
//             },
//             '& .MuiIconButton-root.Mui-disabled': {
//               color: 'rgba(0, 0, 0, 0.26)'
//             },
//             '& .MuiIconButton-root': {
//               color: '#8C257C'
//             }
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AttendanceReport;









// import React, { useState, useMemo } from "react";
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
//   Grid,
//   TextField,
//   Button,
//   Stack,
//   InputAdornment,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import Swal from "sweetalert2";

// // MUI Icons
// import SearchIcon from "@mui/icons-material/Search";
// import FileUploadIcon from '@mui/icons-material/FileUpload';
// import AssessmentIcon from '@mui/icons-material/Assessment';

// // Helper function to format time to hh:mm AM/PM
// const formatTime = (time) => {
//   if (!time) return "N/A";
//   return dayjs(`2000-01-01T${time}`).format("hh:mm A");
// };

// // Helper function to format dates to dd/mm/yyyy
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "N/A";
//   return date.toLocaleDateString("en-GB");
// };

// const AttendanceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Theme-consistent button styles
//   const primaryButtonStyle = {
//     backgroundColor: "#8C257C",
//     color: "#FFFFFF",
//     "&:hover": {
//       backgroundColor: "#6d1d60",
//     },
//   };

//   const handleGenerateReport = async () => {
//     if (!selectedDate) {
//       Swal.fire({
//         icon: "error",
//         title: "Date Missing",
//         text: "Please select a date first.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setLoading(true);
//     setHasSearched(true);
//     setReportData([]);
//     setPage(0);

//     try {
//       const dateString = selectedDate.format("YYYY-MM-DD");
//       const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;
//       const res = await fetch(apiUrl);
//       if (!res.ok) {
//         throw new Error(`Failed to fetch: ${res.statusText}`);
//       }
//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//       if (Array.isArray(data) && data.length === 0) {
//         Swal.fire({
//             icon: 'info',
//             title: 'No Data Found',
//             text: 'There is no attendance data for the selected date.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Request Failed",
//         text: "Failed to fetch the attendance report. Please try again later.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Memoized filtering and pagination for performance
//   const filteredData = useMemo(() =>
//     reportData.filter((row) => {
//       const s = searchTerm.toLowerCase();
//       return (
//         row.employee_id?.toLowerCase().includes(s) ||
//         row.employee_name?.toLowerCase().includes(s) ||
//         row.department_name?.toLowerCase().includes(s) ||
//         row.designation_name?.toLowerCase().includes(s) ||
//         row.manager_name?.toLowerCase().includes(s)
//       );
//     }), [reportData, searchTerm]);

//   const paginatedData = useMemo(() =>
//     filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [filteredData, page, rowsPerPage]
//   );

//   const handleExport = () => {
//     if (filteredData.length === 0) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'No Data to Export',
//             text: 'There is no data to export.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//         return;
//     }
//     const dataToExport = filteredData.map((item, index) => ({
//       "Sr No": page * rowsPerPage + index + 1,
//       "Employee ID": item.employee_id,
//       "Name": item.employee_name,
//       "Department": item.department_name,
//       "Designation": item.designation_name,
//       "Division": item.division_name || "N/A",
//       "Sub-Division": item.sub_division || "N/A",
//       "Level": item.level || "N/A",
//       "Headquarter": item.headquarter || "N/A",
//       "Line Manager": item.manager_name,
//       "D.O.J": formatDate(item.date_of_joining),
//       "Check In time": formatTime(item.check_in_time),
//       "Check Out time": formatTime(item.check_out_time),
//       "Total working Hours": item.total_working_hours || "N/A",
//       "Late Marks": item.late_mark ?? "N/A",
//       "Early Exit": item.early_mark || "N/A",
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
//     XLSX.writeFile(workbook, `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`);
//   };
  
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };
  
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const columns = [
//     { id: "sr_no", label: "Sr No" }, { id: "employee_id", label: "Employee ID" }, { id: "name", label: "Name" },
//     { id: "department", label: "Department" }, { id: "designation", label: "Designation" }, { id: "division", label: "Division" },
//     { id: "sub_division", label: "Sub-Division" }, { id: "level", label: "Level" }, { id: "headquarter", label: "Headquarter" },
//     { id: "line_manager", label: "Line Manager" }, { id: "doj", label: "D.O.J" }, { id: "check_in", label: "Punch In" },
//     { id: "check_out", label: "Punch Out" }, { id: "total_hours", label: "Total Hours" },
//     { id: "late_marks", label: "Late Marks" }, { id: "early_exit", label: "Early Exit" }
//   ];

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" fontWeight="bold"  mb={4}sx={{color: "#8C257C"}}>
//         Daily Attendance Report
//       </Typography>
      

//       <Stack
//         direction={isMobile ? "column" : "row"}
//         justifyContent="space-between"
//         alignItems="center"
//         spacing={2}
//         mb={2}
//       >
//         <Stack direction="row" spacing={1} alignItems="center" width={isMobile ? "100%" : "auto"}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Date"
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 slotProps={{ textField: { size: 'small' } }}
//               />
//             </LocalizationProvider>
//             <Button
//                 variant="contained"
//                 onClick={handleGenerateReport}
//                 disabled={loading || !selectedDate}
//                 sx={primaryButtonStyle}
//                 startIcon={<AssessmentIcon />}
//             >
//                 Generate
//             </Button>
//             {reportData.length > 0 && (
//                 <Button variant="contained" onClick={handleExport} sx={primaryButtonStyle} startIcon={<FileUploadIcon />}>
//                     Export
//                 </Button>
//             )}
//         </Stack>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   sx={{
//                     backgroundColor: "#8C257C",
//                     color: "#FFFFFF",
//                     fontWeight: "bold",
//                     fontSize: '0.875rem'
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.employee_id || index} hover>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.employee_id || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.employee_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.department_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.designation_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.division_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.sub_division || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.level || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.headquarter || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.manager_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(row.date_of_joining)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{formatTime(row.check_in_time)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{formatTime(row.check_out_time)}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.total_working_hours || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.late_mark ?? "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.early_mark || "N/A"}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                     {hasSearched ? "No data available for the selected criteria." : "Please select a date and click 'Generate'."}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           p: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary" mb={isMobile ? 2 : 0}>
//           {hasSearched && `Showing ${filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length} results`}
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           sx={{
//             '& .MuiSelect-icon': {
//               color: '#8C257C'
//             },
//             '& .MuiIconButton-root.Mui-disabled': {
//               color: 'rgba(0, 0, 0, 0.26)'
//             },
//             '& .MuiIconButton-root': {
//               color: '#8C257C'
//             }
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AttendanceReport;





import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TextField,
  Button,
  InputAdornment,
  // --- START: PAGINATION IMPORTS MODIFIED ---
  Pagination,
  FormControl,
  Select,
  MenuItem,
  // --- END: PAGINATION IMPORTS MODIFIED ---
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Helper functions
const formatTime = (time) => !time ? "N/A" : dayjs(`2000-01-01T${time}`).format("hh:mm A");
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

const AttendanceReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Changed for new style

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  // --- START: EXPANDED COLOR SCHEME ---
  const primaryColor = "#8C257C";
  const primaryHoverColor = "#6d1d60";
  const secondaryColor = "#F58E35"; // Added for hover effects
  const textOnPrimary = "#FFFFFF";
  // --- END: EXPANDED COLOR SCHEME ---

  const primaryButtonStyle = {
    backgroundColor: primaryColor,
    color: textOnPrimary,
    "&:hover": { backgroundColor: primaryHoverColor },
  };

  const handleGenerateReport = async () => {
    if (!selectedDate) {
      Swal.fire({ icon: "error", title: "Date Missing", text: "Please select a date first.", timer: 3000, showConfirmButton: false });
      return;
    }
    setLoading(true);
    setHasSearched(true);
    setReportData([]);
    setPage(0);

    try {
      const dateString = selectedDate.format("YYYY-MM-DD");
      const apiUrl = `https://tdtlworld.com/hrms-backend/apis/get_employee_daily_attendence_get_report/?date=${dateString}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      
      const data = await res.json();
      setReportData(Array.isArray(data) ? data : []);
      if (Array.isArray(data) && data.length === 0) {
        Swal.fire({ icon: 'info', title: 'No Data Found', text: 'There is no attendance data for the selected date.', timer: 3000, showConfirmButton: false });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Request Failed", text: "Failed to fetch the attendance report.", timer: 3000, showConfirmButton: false });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredData = useMemo(() =>
    reportData.filter((row) => {
      const s = searchTerm.toLowerCase();
      return (
        row.employee_id?.toLowerCase().includes(s) ||
        row.employee_name?.toLowerCase().includes(s) ||
        row.department_name?.toLowerCase().includes(s) ||
        row.designation_name?.toLowerCase().includes(s) ||
        row.manager_name?.toLowerCase().includes(s)
      );
    }), [reportData, searchTerm]);

  const paginatedData = useMemo(() =>
    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  const handleExport = () => {
    if (filteredData.length === 0) {
      Swal.fire({ icon: 'warning', title: 'No Data to Export', text: 'There is no data to export.', timer: 3000, showConfirmButton: false });
      return;
    }
    const dataToExport = filteredData.map((item, index) => ({
      "Sr No": index + 1,
      "Employee ID": item.employee_id, "Name": item.employee_name, "Department": item.department_name, "Designation": item.designation_name, "Division": item.division_name || "N/A", "Sub-Division": item.sub_division || "N/A", "Level": item.level || "N/A", "Headquarter": item.headquarter || "N/A", "Line Manager": item.manager_name, "D.O.J": formatDate(item.date_of_joining), "Check In time": formatTime(item.check_in_time), "Check Out time": formatTime(item.check_out_time), "Total working Hours": item.total_working_hours || "N/A", "Late Marks": item.late_mark ?? "N/A", "Early Exit": item.early_mark || "N/A",
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
    XLSX.writeFile(workbook, `Attendance_Report_${selectedDate.format("YYYY-MM-DD")}.xlsx`);
  };
  
  // --- START: NEW PAGINATION HANDLERS AND CALCULATIONS ---
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);
  // --- END: NEW PAGINATION HANDLERS AND CALCULATIONS ---
  
  const columns = [
    { id: "sr_no", label: "Sr No" }, { id: "employee_id", label: "Employee ID" }, { id: "name", label: "Name" },
    { id: "department", label: "Department" }, { id: "designation", label: "Designation" }, { id: "division", label: "Division" },
    { id: "sub_division", label: "Sub-Division" }, { id: "level", label: "Level" }, { id: "headquarter", label: "Headquarter" },
    { id: "line_manager", label: "Line Manager" }, { id: "doj", label: "D.O.J" }, { id: "check_in", label: "Punch In" },
    { id: "check_out", label: "Punch Out" }, { id: "total_hours", label: "Total Hours" },
    { id: "late_marks", label: "Late Marks" }, { id: "early_exit", label: "Early Exit" }
  ];

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" fontWeight="bold" mb={4} sx={{color: primaryColor}}>
        Daily Attendance Report
      </Typography>
      
      <Stack direction={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
        <Stack direction="row" spacing={1} alignItems="center" width={isMobile ? "100%" : "auto"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={handleGenerateReport} disabled={loading || !selectedDate} sx={primaryButtonStyle} startIcon={<AssessmentIcon />}>
                Generate
            </Button>
            {reportData.length > 0 && (
                <Button variant="contained" onClick={handleExport} sx={primaryButtonStyle} startIcon={<FileUploadIcon />}>
                    Export
                </Button>
            )}
        </Stack>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
          }}
          sx={{ width: isMobile ? "100%" : "auto" }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }}
        />
      </Stack>

      <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ backgroundColor: primaryColor, color: textOnPrimary, fontWeight: "bold", fontSize: '0.875rem' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => ( <TableCell key={column.id}><Skeleton variant="text" /></TableCell> ))}
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={row.employee_id || index} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.employee_id || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.employee_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.department_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.designation_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.division_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.sub_division || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.level || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.headquarter || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.manager_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(row.date_of_joining)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{formatTime(row.check_in_time)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{formatTime(row.check_out_time)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.total_working_hours || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.late_mark ?? "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.early_mark || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                    {hasSearched ? "No data available for the selected criteria." : "Please select a date and click 'Generate'."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- START: NEW STYLED PAGINATION (REPLACES TablePagination) --- */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width={200} />
                <Skeleton variant="rectangular" width={300} height={40} />
            </Box>
        ) : (
          filteredData.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            sx={{
                                backgroundColor: primaryColor,
                                color: 'white',
                                borderRadius: '4px',
                                '&:hover': { backgroundColor: primaryHoverColor },
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '& .MuiSvgIcon-root': { color: 'white' },
                            }}
                        >
                            {[5, 10, 25, 50].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
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
                        '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: 'white' },
                        '& .MuiPaginationItem-page': {
                            color: primaryColor,
                            '&.M_selected': {
                                backgroundColor: primaryColor,
                                color: 'white',
                                '&:hover': { backgroundColor: secondaryColor }
                            },
                        },
                         '& .MuiPaginationItem-icon': { color: primaryColor }
                    }}
                />
            </Box>
          )
        )}
      </Box>
      {/* --- END: NEW STYLED PAGINATION --- */}
    </Box>
  );
};

export default AttendanceReport;