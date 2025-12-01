// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance"; // adjust path as needed

// export default function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [reportData, setReportData] = useState(null);
//   const [employeeList, setEmployeeList] = useState([]);

//   const months = [
//     { value: "01", label: "January" },
//     { value: "02", label: "February" },
//     { value: "03", label: "March" },
//     { value: "04", label: "April" },
//     { value: "05", label: "May" },
//     { value: "06", label: "June" },
//     { value: "07", label: "July" },
//     { value: "08", label: "August" },
//     { value: "09", label: "September" },
//     { value: "10", label: "October" },
//     { value: "11", label: "November" },
//     { value: "12", label: "December" },
//   ];

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

//   // Fetch employee list on mount
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axiosInstance.get(
//           "employee-dropdown/"
//         );
//         setEmployeeList(response.data || []);
//       } catch (error) {
//         console.error("Failed to load employees", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleSearch = async () => {
//     if (selectedEmployee && selectedYear && selectedMonth) {
//       try {
//         const response = await axiosInstance.post(
//           "api/monthly_report/",
//           {
//             employee_id: selectedEmployee,
//             year: selectedYear,
//             month: selectedMonth,
//           }
//         );
//         setReportData(response.data?.data || []);
//       } catch (error) {
//         console.error("Error fetching report:", error);
//         alert("Failed to fetch report data");
//       }
//     } else {
//       alert("Please select employee, year and month");
//     }
//   };


//   const calculateTotalWork = (clockIn, clockOut) => {
//     if (!clockIn || !clockOut) return "";

//     const [inHour, inMinute] = clockIn.split(":").map(Number);
//     let [outHour, outMinute] = clockOut.split(":").map(Number);

//     // Treat clockOut as PM (e.g., 7:00 → 19:00)
//     if (outHour < 12) {
//       outHour += 12;
//     }

//     const today = new Date();
//     const clockInTime = new Date(today.setHours(inHour, inMinute, 0, 0));
//     const clockOutTime = new Date(today.setHours(outHour, outMinute, 0, 0));

//     const diffMs = clockOutTime - clockInTime;
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     return `${String(diffHours).padStart(2, "0")}:${String(diffMinutes).padStart(2, "0")}`;
//   };






//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "present":
//         return "#4CAF50";
//       case "absent":
//         return "#F44336";
//       case "holiday":
//         return "#FF9800";
//       case "off saturday":
//         return "#2196F3";
//       default:
//         return "#757575";
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 4 }}>
//         View Monthly Report
//       </Typography>

//       <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
//         {/* Employee Select */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: "#f5f5f5",
//             p: 1,
//             borderRadius: 1,
//             flex: 1,
//           }}
//         >
//           <Typography sx={{ color: "#666", minWidth: 80 }}>Employee</Typography>
//           <Select
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//             sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Employee
//             </MenuItem>
//             {employeeList.map((emp) => (
//               <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                 {emp.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Year Select */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: "#f5f5f5",
//             p: 1,
//             borderRadius: 1,
//             flex: 1,
//           }}
//         >
//           <Typography sx={{ color: "#666", minWidth: 80 }}>Year</Typography>
//           <Select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Year
//             </MenuItem>
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year.toString()}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Month Select */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: "#f5f5f5",
//             p: 1,
//             borderRadius: 1,
//             flex: 1,
//           }}
//         >
//           <Typography sx={{ color: "#666", minWidth: 80 }}>Month</Typography>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Month
//             </MenuItem>
//             {months.map((month) => (
//               <MenuItem key={month.value} value={month.value}>
//                 {month.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Search Button */}
//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           sx={{
//             px: 4,
//             py: 1,
//             bgcolor: "#1976d2",
//             "&:hover": { bgcolor: "#1565c0" },
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       {/* Report Table */}
//       {reportData && reportData.length > 0 && (
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>PUNCH IN</TableCell>
//                 <TableCell>PUNCH OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.day}</TableCell>
//                   <TableCell>{row.date}</TableCell>
//                   <TableCell>
//                     <Typography
//                       sx={{ color: getStatusColor(row.status), fontWeight: 500 }}
//                     >
//                       {row.status}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>{row.clock_in || "--"}</TableCell>
//                   <TableCell>{row.clock_out || "--"}</TableCell>
//                   <TableCell>{calculateTotalWork(row.clock_in, row.clock_out)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {reportData && reportData.length === 0 && (
//         <Typography sx={{ mt: 2, color: "#999" }}>
//           No data available for selected employee/month/year.
//         </Typography>
//       )}
//     </Box>
//   );
// }  //





// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance"; // adjust path as needed

// // Helper function to format 24-hour time to 12-hour AM/PM format
// const formatTo12Hour = (timeString) => {
//   // Request 3: Handle null, undefined, '00:00', or 'N/A'
//   if (!timeString || timeString === "00:00" || timeString === "N/A") {
//     return "--";
//   }

//   try {
//     const [hour, minute] = timeString.split(":");
//     let h = parseInt(hour, 10);
//     const suffix = h >= 12 ? "PM" : "AM";

//     h = h % 12;
//     h = h ? h : 12; // Convert hour '0' to '12' for midnight

//     const formattedHour = String(h).padStart(2, "0");

//     return `${formattedHour}:${minute} ${suffix}`;
//   } catch (error) {
//     // Return '--' if timeString is in an unexpected format
//     return "--";
//   }
// };

// // Helper function to calculate total work hours from 24-hour time strings
// const calculateTotalWork = (clockIn, clockOut) => {
//   // Request 3: Handle null, undefined, '00:00', or 'N/A'
//   if (!clockIn || !clockOut || clockIn === "00:00" || clockOut === "00:00" || clockIn === "N/A" || clockOut === "N/A") {
//     return "--";
//   }

//   try {
//     const baseDate = "2000-01-01"; // Use a fixed date to avoid DST issues
//     const clockInTime = new Date(`${baseDate}T${clockIn}`);
//     let clockOutTime = new Date(`${baseDate}T${clockOut}`);

//     // Simple check for an overnight shift
//     if (clockOutTime < clockInTime) {
//       clockOutTime.setDate(clockOutTime.getDate() + 1);
//     }

//     const diffMs = clockOutTime - clockInTime;

//     if (isNaN(diffMs) || diffMs < 0) return "--";

//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     return `${String(diffHours).padStart(2, "0")}:${String(
//       diffMinutes
//     ).padStart(2, "0")}`;
//   } catch (error) {
//     // In case of invalid time format
//     return "--";
//   }
// };

// export default function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [reportData, setReportData] = useState(null);
//   const [employeeList, setEmployeeList] = useState([]);

//   const months = [
//     { value: "01", label: "January" },
//     { value: "02", label: "February" },
//     { value: "03", label: "March" },
//     { value: "04", label: "April" },
//     { value: "05", label: "May" },
//     { value: "06", label: "June" },
//     { value: "07", label: "July" },
//     { value: "08", label: "August" },
//     { value: "09", label: "September" },
//     { value: "10", label: "October" },
//     { value: "11", label: "November" },
//     { value: "12", label: "December" },
//   ];

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

//   // Fetch employee list on mount
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axiosInstance.get("employee-dropdown/");
//         setEmployeeList(response.data || []);
//       } catch (error) {
//         console.error("Failed to load employees", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleSearch = async () => {
//     if (selectedEmployee && selectedYear && selectedMonth) {
//       try {
//         const response = await axiosInstance.post("api/monthly_report/", {
//           employee_id: selectedEmployee,
//           year: selectedYear,
//           month: selectedMonth,
//         });
//         setReportData(response.data?.data || []);
//       } catch (error) {
//         console.error("Error fetching report:", error);
//         alert("Failed to fetch report data");
//       }
//     } else {
//       alert("Please select employee, year and month");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "present":
//         return "#4CAF50";
//       case "absent":
//         return "#F44336";
//       case "holiday":
//         return "#FF9800";
//       case "off saturday":
//         return "#2196F3";
//       default:
//         return "#757575";
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 4 }}>
//         View Monthly Report
//       </Typography>

//       <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
//         {/* Employee Select */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: "#f5f5f5",
//             p: 1,
//             borderRadius: 1,
//             flex: 1,
//           }}
//         >
//           <Typography sx={{ color: "#666", minWidth: 80 }}>Employee</Typography>
//           <Select
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//             sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Employee
//             </MenuItem>
//             {employeeList.map((emp) => (
//               <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                 {emp.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Year Select */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: "#f5f5f5",
//             p: 1,
//             borderRadius: 1,
//             flex: 1,
//           }}
//         >
//           <Typography sx={{ color: "#666", minWidth: 80 }}>Year</Typography>
//           <Select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Year
//             </MenuItem>
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year.toString()}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Month Select */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             bgcolor: "#f5f5f5",
//             p: 1,
//             borderRadius: 1,
//             flex: 1,
//           }}
//         >
//           <Typography sx={{ color: "#666", minWidth: 80 }}>Month</Typography>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Month
//             </MenuItem>
//             {months.map((month) => (
//               <MenuItem key={month.value} value={month.value}>
//                 {month.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Search Button */}
//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           sx={{
//             px: 4,
//             py: 1,
//             bgcolor: "#1976d2",
//             "&:hover": { bgcolor: "#1565c0" },
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       {/* Report Table */}
//       {reportData && reportData.length > 0 && (
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                 {/* Request 1: Added SR column header */}
//                 <TableCell>SR</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>PUNCH IN</TableCell>
//                 <TableCell>PUNCH OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.map((row, index) => (
//                 <TableRow key={index}>
//                   {/* Request 1: Added SR column data */}
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.day}</TableCell>
//                   <TableCell>{row.date}</TableCell>
//                   <TableCell>
//                     <Typography
//                       sx={{ color: getStatusColor(row.status), fontWeight: 500 }}
//                     >
//                       {row.status}
//                     </Typography>
//                   </TableCell>
//                   {/* Request 2 & 3: Format time to 12-hour and handle invalid values */}
//                   <TableCell>{formatTo12Hour(row.clock_in)}</TableCell>
//                   <TableCell>{formatTo12Hour(row.clock_out)}</TableCell>
//                   {/* Request 3: Use robust calculation and handle invalid values */}
//                   <TableCell>
//                     {calculateTotalWork(row.clock_in, row.clock_out)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {reportData && reportData.length === 0 && (
//         <Typography sx={{ mt: 2, color: "#999" }}>
//           No data available for selected employee/month/year.
//         </Typography>
//       )}
//     </Box>
//   );
// }   /// //////







// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance"; // adjust path as needed

// // Helper function to format 24-hour time to 12-hour AM/PM format
// const formatTo12Hour = (timeString) => {
//   // Request 3: Handle null, undefined, '00:00', or 'N/A'
//   if (!timeString || timeString === "00:00" || timeString === "N/A") {
//     return "--";
//   }

//   try {
//     const [hour, minute] = timeString.split(":");
//     let h = parseInt(hour, 10);
//     const suffix = h >= 12 ? "PM" : "AM";

//     h = h % 12;
//     h = h ? h : 12; // Convert hour '0' to '12' for midnight

//     const formattedHour = String(h).padStart(2, "0");

//     return `${formattedHour}:${minute} ${suffix}`;
//   } catch (error) {
//     // Return '--' if timeString is in an unexpected format
//     return "--";
//   }
// };

// // Helper function to calculate total work hours from 24-hour time strings
// const calculateTotalWork = (clockIn, clockOut) => {
//   // Request 3: Handle null, undefined, '00:00', or 'N/A'
//   if (!clockIn || !clockOut || clockIn === "00:00" || clockOut === "00:00" || clockIn === "N/A" || clockOut === "N/A") {
//     return "--";
//   }

//   try {
//     const baseDate = "2000-01-01"; // Use a fixed date to avoid DST issues
//     const clockInTime = new Date(`${baseDate}T${clockIn}`);
//     let clockOutTime = new Date(`${baseDate}T${clockOut}`);

//     // Simple check for an overnight shift
//     if (clockOutTime < clockInTime) {
//       clockOutTime.setDate(clockOutTime.getDate() + 1);
//     }

//     const diffMs = clockOutTime - clockInTime;

//     if (isNaN(diffMs) || diffMs < 0) return "--";

//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     return `${String(diffHours).padStart(2, "0")}:${String(
//       diffMinutes
//     ).padStart(2, "0")}`;
//   } catch (error) {
//     // In case of invalid time format
//     return "--";
//   }
// };

// export default function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [reportData, setReportData] = useState(null);
//   const [employeeList, setEmployeeList] = useState([]);

//   const months = [
//     { value: "01", label: "January" },
//     { value: "02", label: "February" },
//     { value: "03", label: "March" },
//     { value: "04", label: "April" },
//     { value: "05", label: "May" },
//     { value: "06", label: "June" },
//     { value: "07", label: "July" },
//     { value: "08", label: "August" },
//     { value: "09", label: "September" },
//     { value: "10", label: "October" },
//     { value: "11", label: "November" },
//     { value: "12", label: "December" },
//   ];

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

//   // Fetch employee list on mount
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axiosInstance.get("employee-dropdown/");
//         setEmployeeList(response.data || []);
//       } catch (error) {
//         console.error("Failed to load employees", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleSearch = async () => {
//     if (selectedEmployee && selectedYear && selectedMonth) {
//       try {
//         const response = await axiosInstance.post("api/monthly_report/", {
//           employee_id: selectedEmployee,
//           year: selectedYear,
//           month: selectedMonth,
//         });
//         setReportData(response.data?.data || []);
//       } catch (error)        {
//         console.error("Error fetching report:", error);
//         alert("Failed to fetch report data");
//       }
//     } else {
//       alert("Please select employee, year and month");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "present":
//         return "#7C3AED"; // UPDATED COLOR
//       case "absent":
//         return "#F44336"; // Kept for consistency
//       case "holiday":
//         return "#FF9800"; // Kept for consistency
//       case "off saturday":
//         return "#2196F3"; // Kept for consistency
//       default:
//         return "#757575";
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 4 }}>
//         View Monthly Report
//       </Typography>

//    <Grid container spacing={2} sx={{ mb: 4 }}>
//   {/* Employee Select */}
//   <Grid item xs={12} sm={6} md={3}>
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         p: 1,
//         borderRadius: 1,
//       }}
//     >
//       <Typography sx={{ color: "#666", minWidth: 80 }}>Employee</Typography>
//       <Select
//         value={selectedEmployee}
//         onChange={(e) => setSelectedEmployee(e.target.value)}
//         sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//         displayEmpty
//       >
//         <MenuItem value="" disabled>
//           Select Employee
//         </MenuItem>
//         {employeeList.map((emp) => (
//           <MenuItem key={emp.emp_id} value={emp.emp_id}>
//             {emp.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </Box>
//   </Grid>

//   {/* Year Select */}
//   <Grid item xs={12} sm={6} md={3}>
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         p: 1,
//         borderRadius: 1,
//       }}
//     >
//       <Typography sx={{ color: "#666", minWidth: 80 }}>Year</Typography>
//       <Select
//         value={selectedYear}
//         onChange={(e) => setSelectedYear(e.target.value)}
//         sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//         displayEmpty
//       >
//         <MenuItem value="" disabled>
//           Select Year
//         </MenuItem>
//         {yearOptions.map((year) => (
//           <MenuItem key={year} value={year.toString()}>
//             {year}
//           </MenuItem>
//         ))}
//       </Select>
//     </Box>
//   </Grid>

//   {/* Month Select */}
//   <Grid item xs={12} sm={6} md={3}>
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         p: 1,
//         borderRadius: 1,
//       }}
//     >
//       <Typography sx={{ color: "#666", minWidth: 80 }}>Month</Typography>
//       <Select
//         value={selectedMonth}
//         onChange={(e) => setSelectedMonth(e.target.value)}
//         sx={{ flex: 1, bgcolor: "white", "& .MuiSelect-select": { py: 1 } }}
//         displayEmpty
//       >
//         <MenuItem value="" disabled>
//           Select Month
//         </MenuItem>
//         {months.map((month) => (
//           <MenuItem key={month.value} value={month.value}>
//             {month.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </Box>
//   </Grid>

//   {/* Search Button */}
//   <Grid item xs={12} sm={6} md={3}>
//     <Button
//       fullWidth
//       variant="contained"
//       onClick={handleSearch}
//       sx={{
//         px: 4,
//         py: 1.5,
//         bgcolor: "#7C3AED",
//         "&:hover": { bgcolor: "#6D28D9" },
//       }}
//     >
//       Search
//     </Button>
//   </Grid>
// </Grid>


//       {/* Report Table */}
//       {reportData && reportData.length > 0 && (
//         <TableContainer component={Paper} sx={{ mt: 2 , width: "100%",       // ✅ Fit container width
//       overflowX: "auto", }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                 {/* Request 1: Added SR column header */}
//                 <TableCell>SR</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>PUNCH IN</TableCell>
//                 <TableCell>PUNCH OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.map((row, index) => (
//                 <TableRow key={index}>
//                   {/* Request 1: Added SR column data */}
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.day}</TableCell>
//                   <TableCell>{row.date}</TableCell>
//                   <TableCell>
//                     <Typography
//                       sx={{ color: getStatusColor(row.status), fontWeight: 500 }}
//                     >
//                       {row.status}
//                     </Typography>
//                   </TableCell>
//                   {/* Request 2 & 3: Format time to 12-hour and handle invalid values */}
//                   <TableCell>{formatTo12Hour(row.clock_in)}</TableCell>
//                   <TableCell>{formatTo12Hour(row.clock_out)}</TableCell>
//                   {/* Request 3: Use robust calculation and handle invalid values */}
//                   <TableCell>
//                     {calculateTotalWork(row.clock_in, row.clock_out)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {reportData && reportData.length === 0 && (
//         <Typography sx={{ mt: 2, color: "#999" }}>
//           No data available for selected employee/month/year.
//         </Typography>
//       )}
//     </Box>
//   );
// }













// import React, { useState, useEffect } from "react";

// import {

//   Box,

//   Typography,

//   Button,

//   Select,

//   MenuItem,

//   Paper,

//   Table,

//   TableBody,

//   TableCell,

//   TableContainer,

//   TableHead,

//   TableRow,

//   Grid,

//   TextField,

// } from "@mui/material";

// import Autocomplete from "@mui/material/Autocomplete";

// import axiosInstance from "../utils/axiosInstance"; // adjust path as needed

 

// // Helper function to format 24-hour time to 12-hour AM/PM format

// const formatTo12Hour = (timeString) => {

//   if (!timeString || timeString === "00:00" || timeString === "N/A") {

//     return "--";

//   }

 

//   try {

//     const [hour, minute] = timeString.split(":");

//     let h = parseInt(hour, 10);

//     const suffix = h >= 12 ? "PM" : "AM";

 

//     h = h % 12;

//     h = h ? h : 12; // Convert hour '0' to '12' for midnight

 

//     const formattedHour = String(h).padStart(2, "0");

 

//     return `${formattedHour}:${minute} ${suffix}`;

//   } catch (error) {

//     return "--";

//   }

// };

 

// // Helper function to calculate total work hours from 24-hour time strings

// const calculateTotalWork = (clockIn, clockOut) => {

//   if (

//     !clockIn ||

//     !clockOut ||

//     clockIn === "00:00" ||

//     clockOut === "00:00" ||

//     clockIn === "N/A" ||

//     clockOut === "N/A"

//   ) {

//     return "--";

//   }

 

//   try {

//     const baseDate = "2000-01-01"; // Use a fixed date to avoid DST issues

//     const clockInTime = new Date(`${baseDate}T${clockIn}`);

//     let clockOutTime = new Date(`${baseDate}T${clockOut}`);

 

//     // Simple check for an overnight shift

//     if (clockOutTime < clockInTime) {

//       clockOutTime.setDate(clockOutTime.getDate() + 1);

//     }

 

//     const diffMs = clockOutTime - clockInTime;

 

//     if (isNaN(diffMs) || diffMs < 0) return "--";

 

//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

 

//     return `${String(diffHours).padStart(2, "0")}:${String(

//       diffMinutes

//     ).padStart(2, "0")}`;

//   } catch (error) {

//     return "--";

//   }

// };

 

// export default function MonthlyReport() {

//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const [selectedYear, setSelectedYear] = useState("");

//   const [selectedMonth, setSelectedMonth] = useState("");

//   const [reportData, setReportData] = useState(null);

//   const [employeeList, setEmployeeList] = useState([]);

 

//   const months = [

//     { value: "01", label: "January" },

//     { value: "02", label: "February" },

//     { value: "03", label: "March" },

//     { value: "04", label: "April" },

//     { value: "05", label: "May" },

//     { value: "06", label: "June" },

//     { value: "07", label: "July" },

//     { value: "08", label: "August" },

//     { value: "09", label: "September" },

//     { value: "10", label: "October" },

//     { value: "11", label: "November" },

//     { value: "12", label: "December" },

//   ];

 

//   const currentYear = new Date().getFullYear();

//   const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

 

//   // Fetch employee list on mount

//   useEffect(() => {

//     const fetchEmployees = async () => {

//       try {

//         const response = await axiosInstance.get("employee-dropdown/");

//         setEmployeeList(response.data || []);

//       } catch (error) {

//         console.error("Failed to load employees", error);

//       }

//     };

 

//     fetchEmployees();

//   }, []);

 

//   const handleSearch = async () => {

//     if (selectedEmployee && selectedYear && selectedMonth) {

//       try {

//         const response = await axiosInstance.post("api/monthly_report/", {

//           employee_id: selectedEmployee.emp_id,

//           year: selectedYear,

//           month: selectedMonth,

//         });

//         setReportData(response.data?.data || []);

//       } catch (error) {

//         console.error("Error fetching report:", error);

//         alert("Failed to fetch report data");

//       }

//     } else {

//       alert("Please select employee, year and month");

//     }

//   };

 

//   const getStatusColor = (status) => {

//     switch (status?.toLowerCase()) {

//       case "present":

//         return "#7C3AED";

//       case "absent":

//         return "#F44336";

//       case "holiday":

//         return "#FF9800";

//       case "off saturday":

//         return "#2196F3";

//       default:

//         return "#757575";

//     }

//   };

 

//   return (

//     <Box sx={{ p: { xs: 2, md: 3 } }}> {/* Responsive padding */}

//       <Typography variant="h5" sx={{ mb: { xs: 2, md: 4 } }}> {/* Responsive margin */}

//         View Monthly Report

//       </Typography>

 

//       <Paper

//         elevation={3}

//         sx={{

//           p: { xs: 2, md: 3 },

//           mb: { xs: 2, md: 4 },

//           borderRadius: 2,

//           bgcolor: "#fff",

//         }}

//       >

//         <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">

//           {/* Employee Select - Now using Autocomplete */}

//           <Grid item xs={12} sm={6} md={3}>

//             <Box

//               sx={{

//                 display: "flex",

//                 alignItems: "center",

//                 gap: 1,

//                 borderRadius: 1,

//               }}

//             >

//               <Typography sx={{ color: "#666", minWidth: { xs: "auto", sm: 60 } }}> {/* Responsive minWidth */}

//                 Employee

//               </Typography>

//               <Autocomplete

//                 value={selectedEmployee}

//                 onChange={(event, newValue) => {

//                   setSelectedEmployee(newValue);

//                 }}

//                 options={employeeList}

//                 getOptionLabel={(option) => option.label || ""}

//                 isOptionEqualToValue={(option, value) =>

//                   option.emp_id === value.emp_id

//                 }

//                 sx={{

//                   flex: 1,

//                   bgcolor: "white",

//                   width: { sm: "calc(100% - 80px)", md: "calc(100% - 76px)" }, // Adjusted width, added 6px more for md breakpoint

//                 }}

//                 renderInput={(params) => (

//                   <TextField

//                     {...params}

//                     placeholder="Select Employee"

//                     variant="outlined"

//                     size="small"

//                     sx={{

//                       "& .MuiOutlinedInput-root": {

//                         padding: "4px 9px",

//                       },

//                       "& .MuiInputBase-input": {

//                         py: 0.8,

//                       },

//                     }}

//                   />

//                 )}

//               />

//             </Box>

//           </Grid>

 

//           {/* Year Select */}

//           <Grid item xs={12} sm={6} md={3}>

//             <Box

//               sx={{

//                 display: "flex",

//                 alignItems: "center",

//                 gap: 1,

//                 borderRadius: 1,

//               }}

//             >

//               <Typography sx={{ color: "#666", minWidth: { xs: "auto", sm: 60 } }}>

//                 Year

//               </Typography>

//               <Select

//                 value={selectedYear}

//                 onChange={(e) => setSelectedYear(e.target.value)}

//                 sx={{

//                   flex: 1,

//                   bgcolor: "white",

//                   "& .MuiSelect-select": { py: 1 },

//                   width: { sm: "calc(100% - 60px)" }, // Responsive width

//                 }}

//                 displayEmpty

//                 MenuProps={{

//                   anchorOrigin: {

//                     vertical: "bottom",

//                     horizontal: "left",

//                   },

//                   transformOrigin: {

//                     vertical: "top",

//                     horizontal: "left",

//                   },

//                   PaperProps: {

//                     style: {

//                       maxHeight: 200,

//                     },

//                   },

//                 }}

//               >

//                 <MenuItem value="" disabled>

//                   Select Year

//                 </MenuItem>

//                 {yearOptions.map((year) => (

//                   <MenuItem key={year} value={year.toString()}>

//                     {year}

//                   </MenuItem>

//                 ))}

//               </Select>

//             </Box>

//           </Grid>

 

//           {/* Month Select */}

//           <Grid item xs={12} sm={6} md={3}>

//             <Box

//               sx={{

//                 display: "flex",

//                 alignItems: "center",

//                 gap: 1,

//                 borderRadius: 1,

//               }}

//             >

//               <Typography sx={{ color: "#666", minWidth: { xs: "auto", sm: 60 } }}>

//                 Month

//               </Typography>

//               <Select

//                 value={selectedMonth}

//                 onChange={(e) => setSelectedMonth(e.target.value)}

//                 sx={{

//                   flex: 1,

//                   bgcolor: "white",

//                   "& .MuiSelect-select": { py: 1 },

//                   width: { sm: "calc(100% - 60px)" }, // Responsive width

//                 }}

//                 displayEmpty

//                 MenuProps={{

//                   anchorOrigin: {

//                     vertical: "bottom",

//                     horizontal: "left",

//                   },

//                   transformOrigin: {

//                     vertical: "top",

//                     horizontal: "left",

//                   },

//                   PaperProps: {

//                     style: {

//                       maxHeight: 200,

//                     },

//                   },

//                 }}

//               >

//                 <MenuItem value="" disabled>

//                   Select Month

//                 </MenuItem>

//                 {months.map((month) => (

//                   <MenuItem key={month.value} value={month.value}>

//                     {month.label}

//                   </MenuItem>

//                 ))}

//               </Select>

//             </Box>

//           </Grid>

 

//           {/* Search Button */}

//           <Grid item xs={12} sm={6} md={3}>

//             <Button

//               fullWidth

//               variant="contained"

//               onClick={handleSearch}

//               size="small"

//               sx={{

//                 px: { xs: 2, sm: 3 }, // Responsive padding

//                 py: { xs: 0.8, sm: 1.2 }, // Responsive padding

//                 bgcolor: "#7C3AED",

//                 "&:hover": { bgcolor: "#6D28D9" },

//               }}

//             >

//               Search

//             </Button>

//           </Grid>

//         </Grid>

//       </Paper>

 

//       {/* Report Table */}

//       {reportData && reportData.length > 0 && (

//         <TableContainer

//           component={Paper}

//           sx={{ mt: { xs: 2, md: 3 }, width: "100%", overflowX: "auto" }}

//         >

//           <Table>

//             <TableHead>

//               <TableRow sx={{ bgcolor: "#f5f5f5" }}>

//                 <TableCell>SR</TableCell>

//                 <TableCell>DAY</TableCell>

//                 <TableCell>DATE</TableCell>

//                 <TableCell>STATUS</TableCell>

//                 <TableCell>PUNCH IN</TableCell>

//                 <TableCell>PUNCH OUT</TableCell>

//                 <TableCell>TOTAL WORK</TableCell>

//               </TableRow>

//             </TableHead>

//             <TableBody>

//               {reportData.map((row, index) => (

//                 <TableRow key={index}>

//                   <TableCell>{index + 1}</TableCell>

//                   <TableCell>{row.day}</TableCell>

//                   <TableCell>{row.date}</TableCell>

//                   <TableCell>

//                     <Typography

//                       sx={{

//                         color: getStatusColor(row.status),

//                         fontWeight: 500,

//                       }}

//                     >

//                       {row.status}

//                     </Typography>

//                   </TableCell>

//                   <TableCell>{formatTo12Hour(row.clock_in)}</TableCell>

//                   <TableCell>{formatTo12Hour(row.clock_out)}</TableCell>

//                   <TableCell>

//                     {calculateTotalWork(row.clock_in, row.clock_out)}

//                   </TableCell>

//                 </TableRow>

//               ))}

//             </TableBody>

//           </Table>

//         </TableContainer>

//       )}

 

//       {reportData && reportData.length === 0 && (

//         <Typography sx={{ mt: { xs: 2, md: 3 }, color: "#999" }}>

//           No data available for selected employee/month/year.

//         </Typography>

//       )}

//     </Box>

//   );

// }

 








// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   TextField,
//   useTheme,
//   useMediaQuery,
//   TablePagination,
//   Skeleton,
// } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import axiosInstance from "../utils/axiosInstance"; // adjust path as needed

// // Helper function to format 24-hour time to 12-hour AM/PM format
// const formatTo12Hour = (timeString) => {
//   if (!timeString || timeString === "00:00" || timeString === "N/A") {
//     return "--";
//   }

//   try {
//     const [hour, minute] = timeString.split(":");
//     let h = parseInt(hour, 10);
//     const suffix = h >= 12 ? "PM" : "AM";

//     h = h % 12;
//     h = h ? h : 12; // Convert hour '0' to '12' for midnight

//     const formattedHour = String(h).padStart(2, "0");

//     return `${formattedHour}:${minute} ${suffix}`;
//   } catch (error) {
//     return "--";
//   }
// };

// // Helper function to calculate total work hours from 24-hour time strings
// const calculateTotalWork = (clockIn, clockOut) => {
//   if (
//     !clockIn ||
//     !clockOut ||
//     clockIn === "00:00" ||
//     clockOut === "00:00" ||
//     clockIn === "N/A" ||
//     clockOut === "N/A"
//   ) {
//     return "--";
//   }

//   try {
//     const baseDate = "2000-01-01"; // Use a fixed date to avoid DST issues
//     const clockInTime = new Date(`${baseDate}T${clockIn}`);
//     let clockOutTime = new Date(`${baseDate}T${clockOut}`);

//     if (clockOutTime < clockInTime) {
//       clockOutTime.setDate(clockOutTime.getDate() + 1);
//     }

//     const diffMs = clockOutTime - clockInTime;

//     if (isNaN(diffMs) || diffMs < 0) return "--";

//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     return `${String(diffHours).padStart(2, "0")}:${String(
//       diffMinutes
//     ).padStart(2, "0")}`;
//   } catch (error) {
//     return "--";
//   }
// };

// export default function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [reportData, setReportData] = useState(null);
//   const [employeeList, setEmployeeList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const months = [
//     { value: "01", label: "January" },
//     { value: "02", label: "February" },
//     { value: "03", label: "March" },
//     { value: "04", label: "April" },
//     { value: "05", label: "May" },
//     { value: "06", label: "June" },
//     { value: "07", label: "July" },
//     { value: "08", label: "August" },
//     { value: "09", label: "September" },
//     { value: "10", label: "October" },
//     { value: "11", label: "November" },
//     { value: "12", label: "December" },
//   ];

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axiosInstance.get("employee-dropdown/");
//         setEmployeeList(response.data || []);
//       } catch (error) {
//         console.error("Failed to load employees", error);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleSearch = async () => {
//     if (selectedEmployee && selectedYear && selectedMonth) {
//       setLoading(true);
//       setReportData(null);
//       setPage(0);
//       try {
//         const response = await axiosInstance.post("api/monthly_report/", {
//           employee_id: selectedEmployee.emp_id,
//           year: selectedYear,
//           month: selectedMonth,
//         });
//         setReportData(response.data?.data || []);
//       } catch (error) {
//         console.error("Error fetching report:", error);
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//         // Replace alert with a more modern notification system if available
//         console.warn("Please select employee, year and month");
//     }
//   };
 
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "present":
//         return "#4CAF50";
//       case "absent":
//         return "#F44336";
//       case "holiday":
//         return "#FF9800";
//       case "off saturday":
//         return "#2196F3";
//       default:
//         return "#757575";
//     }
//   };

//   const SkeletonLoader = () => (
//     <TableBody>
//       {[...Array(rowsPerPage)].map((_, index) => (
//         <TableRow key={index}>
//           <TableCell><Skeleton variant="text" /></TableCell>
//           <TableCell><Skeleton variant="text" /></TableCell>
//           <TableCell><Skeleton variant="text" /></TableCell>
//           <TableCell><Skeleton variant="text" /></TableCell>
//           <TableCell><Skeleton variant="text" /></TableCell>
//           <TableCell><Skeleton variant="text" /></TableCell>
//           <TableCell><Skeleton variant="text" /></TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   );

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 6 }}>
//         View Monthly Report
//       </Typography>

//       <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Autocomplete
//             fullWidth
//             value={selectedEmployee}
//             onChange={(event, newValue) => {
//               setSelectedEmployee(newValue);
//             }}
//             options={employeeList}
//             getOptionLabel={(option) => option.label || ""}
//             isOptionEqualToValue={(option, value) => option.emp_id === value.emp_id}
//             renderInput={(params) => (
//               <TextField {...params} placeholder="Select Employee" size="small" />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Select
//             fullWidth
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             displayEmpty
//             size="small"
//           >
//             <MenuItem value="" disabled>Select Year</MenuItem>
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
//             ))}
//           </Select>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Select
//             fullWidth
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             displayEmpty
//             size="small"
//           >
//             <MenuItem value="" disabled>Select Month</MenuItem>
//             {months.map((month) => (
//               <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
//             ))}
//           </Select>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <Button
//             fullWidth
//             variant="contained"
//             onClick={handleSearch}
//             sx={{
//               bgcolor: "#8C257C",
//               color: "white",
//               "&:hover": { bgcolor: "#6d1d60" },
//             }}
//           >
//             Search
//           </Button>
//         </Grid>
//       </Grid>
     
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "#8C257C" }}>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR. NO.</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>DAY</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>DATE</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>PUNCH IN</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>PUNCH OUT</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>TOTAL WORK</TableCell>
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <SkeletonLoader />
//           ) : (
//             reportData && reportData.length > 0 && (
//               <TableBody>
//                 {reportData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row, index) => (
//                     <TableRow key={index} hover>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{row.day}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{row.date}</TableCell>
//                       <TableCell>
//                         <Typography
//                           sx={{
//                             color: getStatusColor(row.status),
//                             fontWeight: 500,
//                             fontSize: '0.95rem'
//                           }}
//                         >
//                           {row.status}
//                         </Typography>
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{formatTo12Hour(row.clock_in)}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{formatTo12Hour(row.clock_out)}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>
//                         {calculateTotalWork(row.clock_in, row.clock_out)}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             )
//           )}
//         </Table>
//       </TableContainer>

//       {reportData && reportData.length === 0 && !loading && (
//         <Typography sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}>
//           No data available for the selected criteria.
//         </Typography>
//       )}

//       {reportData && reportData.length > 0 && !loading && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexDirection: isMobile ? "column" : "row",
//             mt: 2,
//             gap: 2
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, reportData.length)} of {reportData.length} results
//           </Typography>
//           <TablePagination
//             component="div"
//             count={reportData.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             sx={{
//                 '& .Mui-selected': {
//                     color: '#8C257C',
//                 },
//                 '& .MuiTablePagination-selectIcon': {
//                     color: '#8C257C',
//                 },
//                 '& .MuiIconButton-root': {
//                     color: '#8C257C'
//                 },
//                 '& .Mui-disabled': {
//                     color: 'rgba(140, 37, 124, 0.5)'
//                 }
//             }}
//           />
//         </Box>
//       )}
//     </Box>
//   );
// }



import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  useTheme,
  useMediaQuery,
  TablePagination,
  Skeleton,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axiosInstance from "../utils/axiosInstance";

const formatTo12Hour = (timeString) => {
  if (!timeString || timeString === "00:00" || timeString === "N/A") {
    return "--";
  }

  try {
    const [hour, minute] = timeString.split(":");
    let h = parseInt(hour, 10);
    const suffix = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;

    const formattedHour = String(h).padStart(2, "0");

    return `${formattedHour}:${minute} ${suffix}`;
  } catch (error) {
    return "--";
  }
};

const calculateTotalWork = (clockIn, clockOut) => {
  if (
    !clockIn ||
    !clockOut ||
    clockIn === "00:00" ||
    clockOut === "00:00" ||
    clockIn === "N/A" ||
    clockOut === "N/A"
  ) {
    return "--";
  }

  try {
    const baseDate = "2000-01-01"; 
    const clockInTime = new Date(`${baseDate}T${clockIn}`);
    let clockOutTime = new Date(`${baseDate}T${clockOut}`);

    if (clockOutTime < clockInTime) {
      clockOutTime.setDate(clockOutTime.getDate() + 1);
    }

    const diffMs = clockOutTime - clockInTime;

    if (isNaN(diffMs) || diffMs < 0) return "--";

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${String(diffHours).padStart(2, "0")}:${String(
      diffMinutes
    ).padStart(2, "0")}`;
  } catch (error) {
    return "--";
  }
};

export default function MonthlyReport() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [reportData, setReportData] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("employee-dropdown/");
        setEmployeeList(response.data || []);
      } catch (error) {
        console.error("Failed to load employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    if (selectedEmployee && selectedYear && selectedMonth) {
      setLoading(true);
      setReportData(null);
      setPage(0);
      try {
        const response = await axiosInstance.post("api/monthly_report/", {
          employee_id: selectedEmployee.emp_id,
          year: selectedYear,
          month: selectedMonth,
        });
        setReportData(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching report:", error);
        setReportData([]);
      } finally {
        setLoading(false);
      }
    } else {
        console.warn("Please select employee, year and month");
    }
  };
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "#4CAF50";
      case "absent":
        return "#F44336";
      case "holiday":
        return "#FF9800";
      case "off saturday":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const SkeletonLoader = () => (
    <TableBody>
      {[...Array(rowsPerPage)].map((_, index) => (
        <TableRow key={index}>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 6 }}>
        View Monthly Report
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Autocomplete
            fullWidth
            value={selectedEmployee}
            onChange={(event, newValue) => {
              setSelectedEmployee(newValue);
            }}
            options={employeeList}
            getOptionLabel={(option) => option.label ? `${option.label} (${option.emp_id})` : ""}
            isOptionEqualToValue={(option, value) => option.emp_id === value.emp_id}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Employee" size="small" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            fullWidth
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="" disabled>Select Year</MenuItem>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            fullWidth
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="" disabled>Select Month</MenuItem>
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSearch}
            sx={{
              bgcolor: "#8C257C",
              color: "white",
              "&:hover": { bgcolor: "#6d1d60" },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
     
      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#8C257C" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR. NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DAY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PUNCH IN</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>PUNCH OUT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>TOTAL WORK</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <SkeletonLoader />
          ) : (
            reportData && reportData.length > 0 && (
              <TableBody>
                {reportData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell sx={{ fontSize: '0.95rem' }}>{row.day}</TableCell>
                      <TableCell sx={{ fontSize: '0.95rem' }}>{row.date}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: getStatusColor(row.status),
                            fontWeight: 500,
                            fontSize: '0.95rem'
                          }}
                        >
                          {row.status}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.95rem' }}>{formatTo12Hour(row.clock_in)}</TableCell>
                      <TableCell sx={{ fontSize: '0.95rem' }}>{formatTo12Hour(row.clock_out)}</TableCell>
                      <TableCell sx={{ fontSize: '0.95rem' }}>
                        {calculateTotalWork(row.clock_in, row.clock_out)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )
          )}
        </Table>
      </TableContainer>

      {reportData && reportData.length === 0 && !loading && (
        <Typography sx={{ mt: 2, color: "text.secondary", textAlign: "center" }}>
          No data available for the selected criteria.
        </Typography>
      )}

      {reportData && reportData.length > 0 && !loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            mt: 2,
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, reportData.length)} of {reportData.length} results
          </Typography>
          <TablePagination
            component="div"
            count={reportData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 25]}
            sx={{
                '& .Mui-selected': {
                    color: '#8C257C',
                },
                '& .MuiTablePagination-selectIcon': {
                    color: '#8C257C',
                },
                '& .MuiIconButton-root': {
                    color: '#8C257C'
                },
                '& .Mui-disabled': {
                    color: 'rgba(140, 37, 124, 0.5)'
                }
            }}
          />
        </Box>
      )}
    </Box>
  );
}