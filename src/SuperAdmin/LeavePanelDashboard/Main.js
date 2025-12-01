
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import {
// //     Box,
// //     Paper,
// //     Typography,
// //     Table,
// //     TableHead,
// //     TableBody,
// //     TableRow,
// //     TableCell,
// //     TableContainer,
// //     TablePagination,
// //     TextField,
// //     Chip,
// //     CircularProgress,
// // } from "@mui/material";

// // // ===================================================================
// // // 1. Upcoming Holidays Table (Child Component)
// // // ===================================================================
// // const HolidayTable = ({ holiday }) => {
// //     // The API returns a single object for the next holiday.
// //     // We wrap it in an array to use the existing table structure.
// //     const data = holiday ? [holiday] : [];

// //     const getStatusColor = (status) => {
// //         if (status === "Published") return "success";
// //         if (status === "Upcoming") return "info";
// //         return "warning";
// //     };

// //     // Note: Search and pagination are kept for UI consistency, 
// //     // but they are less effective for a single holiday entry.
// //     // If the API ever returns an array, this will work automatically.

// //     return (
// //         <Paper
// //             elevation={3}
// //             sx={{
// //                 p: 3,
// //                 borderRadius: 3,
// //                 width: "100%",
// //                 // backgroundColor: "#fff",
// //             }}
// //         >
// //             {/* --- UI CHANGE: Title and Search Box on the same line --- */}
// //             <Box
// //                 sx={{
// //                     display: 'flex',
// //                     justifyContent: 'space-between',
// //                     alignItems: 'center',
// //                     mb: 2
// //                 }}
// //             >
// //                 <Typography variant="h6" gutterBottom mb={0}>
// //                     Upcoming Public Holidays
// //                 </Typography>
// //                 <TextField
// //                     label="Search"
// //                     size="small"
// //                     // Search is disabled as we only have one item from the API
// //                     disabled
// //                 />
// //             </Box>

// //             <TableContainer>
// //                 <Table>
// //                     <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
// //                         <TableRow>
// //                             <TableCell><b>EVENT NAME</b></TableCell>
// //                             <TableCell><b>START DATE</b></TableCell>
// //                             <TableCell><b>LOCATION</b></TableCell>
// //                             <TableCell><b>STATUS</b></TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {data.length > 0 ? (
// //                             data.map((row, i) => (
// //                                 <TableRow key={i}>
// //                                     {/* --- UPDATED: Using API property names --- */}
// //                                     <TableCell>{row.event_name}</TableCell>
// //                                     <TableCell>{row.start_date}</TableCell>
// //                                     <TableCell>{row.location}</TableCell>
// //                                     <TableCell>
// //                                         <Chip
// //                                             label={row.status}
// //                                             color={getStatusColor(row.status)}
// //                                             size="small"
// //                                         />
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))
// //                         ) : (
// //                             <TableRow>
// //                                 <TableCell colSpan={4} align="center">
// //                                     No upcoming holidays found.
// //                                 </TableCell>
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //         </Paper>
// //     );
// // };


// // // ===================================================================
// // // 2. Leave Type Wise Table (Child Component)
// // // ===================================================================
// // const LeaveTypewiseTable = ({ leaves = [] }) => {
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(5);
// //     const [search, setSearch] = useState("");

// //     const handleChangePage = (_, newPage) => setPage(newPage);
// //     const handleChangeRowsPerPage = (event) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     // --- UPDATED: Filtering by employee_name ---
// //     const filtered = leaves.filter((item) =>
// //         item.employee_name.toLowerCase().includes(search.toLowerCase())
// //     );

// //     const getStatusColor = (status) => {
// //         if (status === "Approved") return "success";
// //         if (status === "Pending") return "warning";
// //         if (status === "Rejected") return "error";
// //         return "default";
// //     };

// //     return (
// //         <Paper
// //             elevation={3}
// //             sx={{ p: 3, borderRadius: 3, mt: 4 }}
// //         >
// //             <Typography variant="h6" gutterBottom>
// //                 Leave Type Wise
// //             </Typography>

// //             <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
// //                 <TextField
// //                     label="Search by Employee Name"
// //                     size="small"
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     sx={{ width: { xs: "100%", sm: "250px" } }}

// //                 />
// //             </Box>

// //             <TableContainer>
// //                 <Table stickyHeader>
// //                     <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
// //                         <TableRow>
// //                             <TableCell><b>EMPLOYEE NAME</b></TableCell>
// //                             <TableCell><b>LEAVE TYPE</b></TableCell>
// //                             <TableCell><b>DURATION</b></TableCell>
// //                             <TableCell><b>NO. OF DAYS</b></TableCell>
// //                             <TableCell><b>REASON</b></TableCell>
// //                             <TableCell><b>STATUS</b></TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {filtered
// //                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                             .map((row) => (
// //                                 <TableRow key={row.leave_id}>
// //                                     {/* --- UPDATED: Using API property names --- */}
// //                                     <TableCell>{row.employee_name}</TableCell>
// //                                     <TableCell>{row.leave_type || 'N/A'}</TableCell>
// //                                     <TableCell>{row.duration}</TableCell>
// //                                     <TableCell align="center">{row.day_count}</TableCell>
// //                                     <TableCell>{row.reason}</TableCell>
// //                                     <TableCell>
// //                                         <Chip
// //                                             label={row.status}
// //                                             color={getStatusColor(row.status)}
// //                                             size="small"
// //                                         />
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         {filtered.length === 0 && (
// //                             <TableRow>
// //                                 <TableCell colSpan={6} align="center">
// //                                     No data available.
// //                                 </TableCell>
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             <TablePagination
// //                 component="div"
// //                 count={filtered.length}
// //                 page={page}
// //                 onPageChange={handleChangePage}
// //                 rowsPerPage={rowsPerPage}
// //                 onRowsPerPageChange={handleChangeRowsPerPage}
// //                 rowsPerPageOptions={[5, 10, 25]}
// //             />
// //         </Paper>
// //     );
// // };

// // // ===================================================================
// // // 3. Department Wise Table (Child Component)
// // // ===================================================================
// // const DepartmentLeaveTable = ({ departmentLeaves = [] }) => {
// //     const [page, setPage] = useState(0);
// //     const [rowsPerPage, setRowsPerPage] = useState(5);
// //     const [search, setSearch] = useState("");

// //     const handleChangePage = (_, newPage) => setPage(newPage);
// //     const handleChangeRowsPerPage = (event) => {
// //         setRowsPerPage(parseInt(event.target.value, 10));
// //         setPage(0);
// //     };

// //     // --- UPDATED: Filtering by employee_name ---
// //     const filteredData = departmentLeaves.filter((row) =>
// //         row.employee_name.toLowerCase().includes(search.toLowerCase())
// //     );

// //     const getStatusColor = (status) => {
// //         if (status === "Approved") return "success";
// //         if (status === "Pending") return "warning";
// //         if (status === "Rejected") return "error";
// //         return "default";
// //     };

// //     return (
// //         <Paper
// //             elevation={3}
// //             sx={{ p: 3, borderRadius: 3, mt: 4 }}
// //         >
// //             <Typography variant="h6" gutterBottom>
// //                 Department Wise Leave
// //             </Typography>

// //             <Box display="flex" justifyContent="flex-end" mb={2}>
// //                 <TextField
// //                     size="small"
// //                     label="Search by Employee Name"
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                     sx={{ width: { xs: "100%", sm: "250px" } }}
// //                 />
// //             </Box>

// //             <TableContainer>
// //                 <Table stickyHeader>
// //                     <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
// //                         <TableRow>
// //                             <TableCell><b>EMPLOYEE NAME</b></TableCell>
// //                             <TableCell><b>DEPARTMENT</b></TableCell>
// //                             <TableCell><b>DURATION</b></TableCell>
// //                             <TableCell><b>NO. OF DAYS</b></TableCell>
// //                             <TableCell><b>REASON</b></TableCell>
// //                             <TableCell><b>STATUS</b></TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {filteredData
// //                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                             .map((row) => (
// //                                 <TableRow key={row.leave_id}>
// //                                     {/* --- UPDATED: Using API property names --- */}
// //                                     <TableCell>{row.employee_name}</TableCell>
// //                                     <TableCell>{row.department_name || 'N/A'}</TableCell>
// //                                     <TableCell>{row.duration}</TableCell>
// //                                     <TableCell align="center">{row.day_count}</TableCell>
// //                                     <TableCell>{row.reason}</TableCell>
// //                                     <TableCell>
// //                                         <Chip
// //                                             label={row.status}
// //                                             color={getStatusColor(row.status)}
// //                                             size="small"
// //                                         />
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         {filteredData.length === 0 && (
// //                             <TableRow>
// //                                 <TableCell colSpan={6} align="center">
// //                                     No data available.
// //                                 </TableCell>
// //                             </TableRow>
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             <TablePagination
// //                 component="div"
// //                 count={filteredData.length}
// //                 page={page}
// //                 onPageChange={handleChangePage}
// //                 rowsPerPage={rowsPerPage}
// //                 onRowsPerPageChange={handleChangeRowsPerPage}
// //                 rowsPerPageOptions={[5, 10, 25]}
// //             />
// //         </Paper>
// //     );
// // };


// // // ===================================================================
// // // Main Parent Component for the Dashboard
// // // ===================================================================
// // const LeaveDashboard = () => {
// //     const [dashboardData, setDashboardData] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     const API_URL = "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";

// //     useEffect(() => {
// //         const fetchDashboardData = async () => {
// //             try {
// //                 setLoading(true);
// //                 const response = await axios.get(API_URL);
// //                 setDashboardData(response.data);
// //                 setError(null);
// //             } catch (err) {
// //                 setError("Failed to fetch leave details. Please try again later.");
// //                 console.error("API Error:", err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchDashboardData();
// //     }, []); // Empty dependency array means this runs once on component mount

// //     if (loading) {
// //         return (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
// //                 <CircularProgress />
// //             </Box>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <Typography color="error" align="center" sx={{ mt: 5 }}>
// //                 {error}
// //             </Typography>
// //         );
// //     }

// //     return (
// //         <Box sx={{ p: 3 }}>
// //             <Typography variant="h4" gutterBottom>
// //                 Leave Details Dashboard
// //             </Typography>

// //             {/* 1. Upcoming Holiday Section */}
// //             <HolidayTable holiday={dashboardData?.upcoming_holiday} />

// //             {/* 2. Leave Type Wise Section */}
// //             {/* <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} /> */}

// //             {/* 3. Department Wise Section */}
// //             {/* <DepartmentLeaveTable departmentLeaves={dashboardData?.department_wise_leaves} /> */}
// //         </Box>
// //     );
// // };

// // export default LeaveDashboard;
// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   TablePagination,
//   TextField,
//   Chip,
//   CircularProgress,
// } from "@mui/material";

// // ===================================================================
// // 1. Upcoming Holidays Table (Child Component) - NO CHANGES
// // ===================================================================
// const HolidayTable = ({ holiday }) => {
//   // The API returns a single object for the next holiday.
//   // We wrap it in an array to use the existing table structure.
//   const data = holiday ? [holiday] : [];

//   const getStatusColor = (status) => {
//     if (status === "Published") return "success";
//     if (status === "Upcoming") return "info";
//     return "warning";
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 3,
//         borderRadius: 3,
//         width: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h6" gutterBottom mb={0}>
//           Upcoming Public Holidays
//         </Typography>
//         <TextField label="Search" size="small" disabled />
//       </Box>

//       <TableContainer>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
//             <TableRow>
//               <TableCell>
//                 <b>EVENT NAME</b>
//               </TableCell>
//               <TableCell>
//                 <b>START DATE</b>
//               </TableCell>
//               <TableCell>
//                 <b>LOCATION</b>
//               </TableCell>
//               <TableCell>
//                 <b>STATUS</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.length > 0 ? (
//               data.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{row.event_name}</TableCell>
//                   <TableCell>{row.start_date}</TableCell>
//                   <TableCell>{row.location}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No upcoming holidays found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// // ===================================================================
// // 2. Leave Type Wise Table (Child Component) - NO CHANGES
// // ===================================================================
// const LeaveTypewiseTable = ({ leaves = [] }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [search, setSearch] = useState("");

//   const handleChangePage = (_, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filtered = leaves.filter((item) =>
//     item.employee_name.toLowerCase().includes(search.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     if (status === "Approved") return "success";
//     if (status === "Pending") return "warning";
//     if (status === "Rejected") return "error";
//     return "default";
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
//       <Typography variant="h6" gutterBottom>
//         Leave Type Wise
//       </Typography>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//         <TextField
//           label="Search by Employee Name"
//           size="small"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>

//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
//             <TableRow>
//               <TableCell>
//                 <b>EMPLOYEE NAME</b>
//               </TableCell>
//               <TableCell>
//                 <b>LEAVE TYPE</b>
//               </TableCell>
//               <TableCell>
//                 <b>DURATION</b>
//               </TableCell>
//               <TableCell>
//                 <b>NO. OF DAYS</b>
//               </TableCell>
//               <TableCell>
//                 <b>REASON</b>
//               </TableCell>
//               <TableCell>
//                 <b>STATUS</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filtered
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow key={row.leave_id}>
//                   <TableCell>{row.employee_name}</TableCell>
//                   <TableCell>{row.leave_type || "N/A"}</TableCell>
//                   <TableCell>{row.duration}</TableCell>
//                   <TableCell align="center">{row.day_count}</TableCell>
//                   <TableCell>{row.reason}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             {filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No data available.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={filtered.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Paper>
//   );
// };

// // ===================================================================
// // 3. Department Wise Leave Report Table (Child Component) - REWRITTEN
// // ===================================================================
// const DepartmentLeaveReportTable = ({ reportData = [] }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [search, setSearch] = useState("");

//   // Helper function to format header titles
//   const formatHeader = (key) => {
//     return key
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   // useMemo will cache the headers so they are not recalculated on every render
//   const leaveTypeHeaders = useMemo(() => {
//     if (!reportData || reportData.length === 0) {
//       return [];
//     }
//     // Get leave type keys from the first entry's leave_breakdown
//     return Object.keys(reportData[0].leave_breakdown);
//   }, [reportData]);

//   const handleChangePage = (_, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = reportData.filter((row) =>
//     row.department_name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Calculate the total number of columns for the "no data" message
//   const totalColumns = 4 + leaveTypeHeaders.length;

//   return (
//     <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
//       <Typography variant="h6" gutterBottom>
//         Department Wise Leave Report
//       </Typography>

//       <Box display="flex" justifyContent="flex-end" mb={2}>
//         <TextField
//           size="small"
//           label="Search by Department Name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>

//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
//             <TableRow>
//               <TableCell>
//                 <b>S.NO.</b>
//               </TableCell>
//               <TableCell>
//                 <b>DEPARTMENT NAME</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>TOTAL EMP</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>EMP ON LEAVE</b>
//               </TableCell>
//               {/* Dynamically create headers for each leave type */}
//               {leaveTypeHeaders.map((header) => (
//                 <TableCell key={header} align="center">
//                   <b>{formatHeader(header)}</b>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <TableRow key={row.department_name + index}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.department_name}</TableCell>
//                     <TableCell align="center">
//                       {row.total_employees ?? "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {row.employees_on_leave}
//                     </TableCell>
//                     {/* Dynamically create cells for each leave type count */}
//                     {leaveTypeHeaders.map((headerKey) => (
//                       <TableCell key={headerKey} align="center">
//                         {row.leave_breakdown[headerKey] ?? 0}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={totalColumns} align="center">
//                   No data available.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Paper>
//   );
// };

// // ===================================================================
// // Main Parent Component for the Dashboard - UPDATED
// // ===================================================================
// const LeaveDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [departmentReport, setDepartmentReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // --- UPDATED: Defined two separate API URLs ---
//   const DASHBOARD_API_URL =
//     "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";
//   const DEPARTMENT_REPORT_API_URL =
//     "https://tdtlworld.com/hrms-backend/department_leave_report/";

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);

//         // --- UPDATED: Fetch both APIs concurrently ---
//         const [dashboardResponse, departmentResponse] = await Promise.all([
//           axios.get(DASHBOARD_API_URL),
//           axios.get(DEPARTMENT_REPORT_API_URL),
//         ]);

//         setDashboardData(dashboardResponse.data);
//         setDepartmentReport(departmentResponse.data); // The response is { "data": [...] }
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch dashboard details. Please try again later.");
//         console.error("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []); // Empty dependency array means this runs once on component mount

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" align="center" sx={{ mt: 5 }}>
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Leave Details Dashboard
//       </Typography>

//       {/* 1. Upcoming Holiday Section */}
//       <HolidayTable holiday={dashboardData?.upcoming_holiday} />

//       {/* 2. Leave Type Wise Section
//       <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} /> */}

//       {/* 3. Department Wise Section - UPDATED */}
//       <DepartmentLeaveReportTable reportData={departmentReport?.data} />
//     </Box>
//   );
// };

// export default LeaveDashboard;



// import React, { useState, useEffect, useMemo } from "react";

// import axios from "axios";

// import {

//   Box,

//   Paper,

//   Typography,

//   Table,

//   TableHead,

//   TableBody,

//   TableRow,

//   TableCell,

//   TableContainer,

//   TablePagination,

//   TextField,

//   Chip,

//   CircularProgress,

//   // Added for better responsive spacing/layout

//   Grid,

// } from "@mui/material";

 

// // ===================================================================

// // 1. Upcoming Holidays Table (Child Component) - NO CHANGES

// // ===================================================================

// const HolidayTable = ({ holiday }) => {

//   // The API returns a single object for the next holiday.

//   // We wrap it in an array to use the existing table structure.

//   const data = holiday ? [holiday] : [];

 

//   const getStatusColor = (status) => {

//     if (status === "Published") return "success";

//     if (status === "Upcoming") return "info";

//     return "warning";

//   };

 

//   return (

//     <Paper

//       elevation={3}

//       sx={{

//         p: { xs: 2, sm: 3 }, // Responsive padding

//         borderRadius: 3,

//         width: "100%", // Ensures it takes full available width

//       }}

//     >

//       <Box

//         sx={{

//           display: "flex",

//           flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger

//           justifyContent: "space-between",

//           alignItems: { xs: "flex-start", sm: "center" }, // Align items responsively

//           mb: 2,

//         }}

//       >

//         <Typography variant="h6" gutterBottom mb={{ xs: 1, sm: 0 }}> {/* Adjust margin for stacking */}

//           Upcoming Public Holidays

//         </Typography>

//         <TextField label="Search" size="small" disabled sx={{ width: { xs: "100%", sm: "auto" } }} /> {/* Full width on xs, auto on sm+ */}

//       </Box>

 

//       <TableContainer> {/* Handles horizontal scrolling for overflowing tables */}

//         <Table>

//           <TableHead sx={{ backgroundColor: "#f5f7fa" }}>

//             <TableRow>

//               <TableCell>

//                 <b>EVENT NAME</b>

//               </TableCell>

//               <TableCell>

//                 <b>START DATE</b>

//               </TableCell>

//               <TableCell>

//                 <b>LOCATION</b>

//               </TableCell>

//               <TableCell>

//                 <b>STATUS</b>

//               </TableCell>

//             </TableRow>

//           </TableHead>

//           <TableBody>

//             {data.length > 0 ? (

//               data.map((row, i) => (

//                 <TableRow key={i}>

//                   <TableCell>{row.event_name}</TableCell>

//                   <TableCell>{row.start_date}</TableCell>

//                   <TableCell>{row.location}</TableCell>

//                   <TableCell>

//                     <Chip

//                       label={row.status}

//                       color={getStatusColor(row.status)}

//                       size="small"

//                     />

//                   </TableCell>

//                 </TableRow>

//               ))

//             ) : (

//               <TableRow>

//                 <TableCell colSpan={4} align="center">

//                   No upcoming holidays found.

//                 </TableCell>

//               </TableRow>

//             )}

//           </TableBody>

//         </Table>

//       </TableContainer>

//     </Paper>

//   );

// };

 

// // ===================================================================

// // 2. Leave Type Wise Table (Child Component) - Minor adjustments

// // ===================================================================

// const LeaveTypewiseTable = ({ leaves = [] }) => {

//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [search, setSearch] = useState("");

 

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {

//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0);

//   };

 

//   const filtered = leaves.filter((item) =>

//     item.employee_name.toLowerCase().includes(search.toLowerCase())

//   );

 

//   const getStatusColor = (status) => {

//     if (status === "Approved") return "success";

//     if (status === "Pending") return "warning";

//     if (status === "Rejected") return "error";

//     return "default";

//   };

 

//   return (

//     <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mt: { xs: 2, sm: 4 } }}> {/* Responsive padding and margin-top */}

//       <Typography variant="h6" gutterBottom>

//         Leave Type Wise

//       </Typography>

 

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>

//         <TextField

//           label="Search by Employee Name"

//           size="small"

//           value={search}

//           onChange={(e) => setSearch(e.target.value)}

//           sx={{ width: { xs: "100%", sm: "250px" } }} // Full width on xs, fixed on sm+

//         />

//       </Box>

 

//       <TableContainer> {/* Handles horizontal scrolling for overflowing tables */}

//         <Table stickyHeader>

//           <TableHead sx={{ backgroundColor: "#f5f7fa" }}>

//             <TableRow>

//               <TableCell>

//                 <b>EMPLOYEE NAME</b>

//               </TableCell>

//               <TableCell>

//                 <b>LEAVE TYPE</b>

//               </TableCell>

//               <TableCell>

//                 <b>DURATION</b>

//               </TableCell>

//               <TableCell>

//                 <b>NO. OF DAYS</b>

//               </TableCell>

//               <TableCell>

//                 <b>REASON</b>

//               </TableCell>

//               <TableCell>

//                 <b>STATUS</b>

//               </TableCell>

//             </TableRow>

//           </TableHead>

//           <TableBody>

//             {filtered

//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

//               .map((row) => (

//                 <TableRow key={row.leave_id}>

//                   <TableCell>{row.employee_name}</TableCell>

//                   <TableCell>{row.leave_type || "N/A"}</TableCell>

//                   <TableCell>{row.duration}</TableCell>

//                   <TableCell align="center">{row.day_count}</TableCell>

//                   <TableCell>{row.reason}</TableCell>

//                   <TableCell>

//                     <Chip

//                       label={row.status}

//                       color={getStatusColor(row.status)}

//                       size="small"

//                     />

//                   </TableCell>

//                 </TableRow>

//               ))}

//             {filtered.length === 0 && (

//               <TableRow>

//                 <TableCell colSpan={6} align="center">

//                   No data available.

//                 </TableCell>

//               </TableRow>

//             )}

//           </TableBody>

//         </Table>

//       </TableContainer>

 

//       <TablePagination

//         component="div"

//         count={filtered.length}

//         page={page}

//         onPageChange={handleChangePage}

//         rowsPerPage={rowsPerPage}

//         onRowsPerPageChange={handleChangeRowsPerPage}

//         rowsPerPageOptions={[5, 10, 25]}

//       />

//     </Paper>

//   );

// };

 

// // ===================================================================

// // 3. Department Wise Leave Report Table (Child Component) - Minor adjustments

// // ===================================================================

// const DepartmentLeaveReportTable = ({ reportData = [] }) => {

//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [search, setSearch] = useState("");

 

//   // Helper function to format header titles

//   const formatHeader = (key) => {

//     return key

//       .replace(/_/g, " ")

//       .replace(/\b\w/g, (char) => char.toUpperCase());

//   };

 

//   // useMemo will cache the headers so they are not recalculated on every render

//   const leaveTypeHeaders = useMemo(() => {

//     if (!reportData || reportData.length === 0) {

//       return [];

//     }

//     // Get leave type keys from the first entry's leave_breakdown

//     return Object.keys(reportData[0].leave_breakdown);

//   }, [reportData]);

 

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {

//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0);

//   };

 

//   const filteredData = reportData.filter((row) =>

//     row.department_name.toLowerCase().includes(search.toLowerCase())

//   );

 

//   // Calculate the total number of columns for the "no data" message

//   const totalColumns = 4 + leaveTypeHeaders.length;

 

//   return (

//     <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mt: { xs: 2, sm: 4 } }}> {/* Responsive padding and margin-top */}

//       <Typography variant="h6" gutterBottom>

//         Department Wise Leave Report

//       </Typography>

 

//       <Box display="flex" justifyContent="flex-end" mb={2}>

//         <TextField

//           size="small"

//           label="Search by Department Name"

//           value={search}

//           onChange={(e) => setSearch(e.target.value)}

//           sx={{ width: { xs: "100%", sm: "250px" } }} // Full width on xs, fixed on sm+

//         />

//       </Box>

 

//       <TableContainer> {/* Handles horizontal scrolling for overflowing tables */}

//         <Table stickyHeader>

//           <TableHead sx={{ backgroundColor: "#f5f7fa" }}>

//             <TableRow>

//               <TableCell>

//                 <b>S.NO.</b>

//               </TableCell>

//               <TableCell>

//                 <b>DEPARTMENT NAME</b>

//               </TableCell>

//               <TableCell align="center">

//                 <b>TOTAL EMP</b>

//               </TableCell>

//               <TableCell align="center">

//                 <b>EMP ON LEAVE</b>

//               </TableCell>

//               {/* Dynamically create headers for each leave type */}

//               {leaveTypeHeaders.map((header) => (

//                 <TableCell key={header} align="center">

//                   <b>{formatHeader(header)}</b>

//                 </TableCell>

//               ))}

//             </TableRow>

//           </TableHead>

//           <TableBody>

//             {filteredData.length > 0 ? (

//               filteredData

//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

//                 .map((row, index) => (

//                   <TableRow key={row.department_name + index}>

//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                     <TableCell>{row.department_name}</TableCell>

//                     <TableCell align="center">

//                       {row.total_employees ?? "N/A"}

//                     </TableCell>

//                     <TableCell align="center">

//                       {row.employees_on_leave}

//                     </TableCell>

//                     {/* Dynamically create cells for each leave type count */}

//                     {leaveTypeHeaders.map((headerKey) => (

//                       <TableCell key={headerKey} align="center">

//                         {row.leave_breakdown[headerKey] ?? 0}

//                       </TableCell>

//                     ))}

//                   </TableRow>

//                 ))

//             ) : (

//               <TableRow>

//                 <TableCell colSpan={totalColumns} align="center">

//                   No data available.

//                 </TableCell>

//               </TableRow>

//             )}

//           </TableBody>

//         </Table>

//       </TableContainer>

 

//       <TablePagination

//         component="div"

//         count={filteredData.length}

//         page={page}

//         onPageChange={handleChangePage}

//         rowsPerPage={rowsPerPage}

//         onRowsPerPageChange={handleChangeRowsPerPage}

//         rowsPerPageOptions={[5, 10, 25]}

//       />

//     </Paper>

//   );

// };

 

// // ===================================================================

// // Main Parent Component for the Dashboard - Minor adjustments for overall layout

// // ===================================================================

// const LeaveDashboard = () => {

//   const [dashboardData, setDashboardData] = useState(null);

//   const [departmentReport, setDepartmentReport] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState(null);

 

//   // --- UPDATED: Defined two separate API URLs ---

//   const DASHBOARD_API_URL =

//     "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";

//   const DEPARTMENT_REPORT_API_URL =

//     "https://tdtlworld.com/hrms-backend/department_leave_report/";

 

//   useEffect(() => {

//     const fetchAllData = async () => {

//       try {

//         setLoading(true);

 

//         // --- UPDATED: Fetch both APIs concurrently ---

//         const [dashboardResponse, departmentResponse] = await Promise.all([

//           axios.get(DASHBOARD_API_URL),

//           axios.get(DEPARTMENT_REPORT_API_URL),

//         ]);

 

//         setDashboardData(dashboardResponse.data);

//         setDepartmentReport(departmentResponse.data); // The response is { "data": [...] }

//         setError(null);

//       } catch (err) {

//         setError("Failed to fetch dashboard details. Please try again later.");

//         console.error("API Error:", err);

//       } finally {

//         setLoading(false);

//       }

//     };

 

//     fetchAllData();

//   }, []); // Empty dependency array means this runs once on component mount

 

//   if (loading) {

//     return (

//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5, p: { xs: 2, sm: 3 } }}> {/* Responsive padding */}

//         <CircularProgress />

//       </Box>

//     );

//   }

 

//   if (error) {

//     return (

//       <Typography color="error" align="center" sx={{ mt: 5, p: { xs: 2, sm: 3 } }}> {/* Responsive padding */}

//         {error}

//       </Typography>

//     );

//   }

 

//   return (

//     <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "1200px", mx: "auto" }}> {/* Responsive padding, max width, and auto margins for centering */}

//       <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}> {/* Responsive font size for title */}

//         Leave Details Dashboard

//       </Typography>

 

//       {/* 1. Upcoming Holiday Section */}

//       <HolidayTable holiday={dashboardData?.upcoming_holiday} />

 

//       {/* 2. Leave Type Wise Section - Uncomment if needed, already made responsive */}

//       {/* <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} /> */}

 

//       {/* 3. Department Wise Section */}

//       <DepartmentLeaveReportTable reportData={departmentReport?.data} />

//     </Box>

//   );

// };

 

// export default LeaveDashboard;











// import React, { useState, useEffect, useMemo, useCallback } from "react";

// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   TablePagination,
//   TextField,
//   Chip,
//   CircularProgress,
//   Grid,
//   Button, // Added for button
//   InputAdornment, // Added for search icon
//   Select, // Added for rows per page
//   MenuItem, // Added for rows per page
//   FormControl, // Added for rows per page
// } from "@mui/material";

// import { createTheme, ThemeProvider } from "@mui/material/styles"; // Added for theme

// import SearchIcon from "@mui/icons-material/Search"; // Added for search icon

// // --- THEME DEFINITION ---

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#7C3AED",

//       dark: "#6D28D9",
//     },

//     warning: {
//       main: "#f59e0b",
//     },

//     error: {
//       main: "#ef4444",
//     },

//     success: {
//       // Added success color

//       main: "#22C55E",
//     },

//     info: {
//       // Added info color

//       main: "#3B82F6",
//     },

//     background: {
//       default: "#f4f6f8",
//     },
//   },

//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: "white",
//         },
//       },
//     },

//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: "600",

//           backgroundColor: "#f9fafb",

//           color: "#374151",

//           textTransform: "uppercase",

//           fontSize: "0.75rem",
//         },
//       },
//     },

//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//         },
//       },
//     },

//     MuiChip: {
//       styleOverrides: {
//         root: {
//           fontWeight: "bold",
//         },

//         colorSuccess: {
//           backgroundColor: "#22C55E",

//           color: "white",
//         },

//         colorWarning: {
//           backgroundColor: "#f59e0b",

//           color: "white",
//         },

//         colorError: {
//           backgroundColor: "#ef4444",

//           color: "white",
//         },

//         colorInfo: {
//           backgroundColor: "#3B82F6",

//           color: "white",
//         },
//       },
//     },

//     MuiTablePagination: {
//       styleOverrides: {
//         toolbar: {
//           paddingLeft: "16px",

//           paddingRight: "16px",

//           "@media (max-width:600px)": {
//             flexDirection: "column",

//             alignItems: "center",

//             "& > *": {
//               marginBottom: "8px",
//             },
//           },
//         },

//         selectLabel: {
//           display: "none",
//         },

//         select: {
//           display: "none",
//         },

//         actions: {
//           "@media (max-width:600px)": {
//             marginLeft: "auto",

//             marginRight: "auto",
//           },
//         },
//       },
//     },
//   },
// });

// // ===================================================================

// // 1. Upcoming Holidays Table (Child Component)

// // ===================================================================

// const HolidayTable = ({ holiday, searchTerm, onSearchTermChange }) => {
//   const data = holiday ? [holiday] : [];

//   const getStatusColor = (status) => {
//     if (status === "Published") return "success";

//     if (status === "Upcoming") return "info";

//     return "warning"; // Default or other statuses
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const filteredData = data.filter((item) => {
//     const searchLower = searchTerm.toLowerCase();

//     return (
//       (item.event_name?.toLowerCase() || "").includes(searchLower) ||
//       (item.country?.toLowerCase() || "").includes(searchLower) ||
//       (item.state?.toLowerCase() || "").includes(searchLower) ||
//       (item.employee_hub?.toLowerCase() || "").includes(searchLower) ||
//       (item.status?.toLowerCase() || "").includes(searchLower)
//     );
//   });

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },

//         borderRadius: 3,

//         width: "100%",

//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Softer shadow
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",

//           flexDirection: { xs: "column", sm: "row" },

//           justifyContent: "space-between",

//           alignItems: { xs: "flex-start", sm: "center" },

//           mb: 2,

//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Upcoming Public Holidays
//         </Typography>

//         <TextField
//           size="small"
//           placeholder="Search holidays..."
//           value={searchTerm}
//           onChange={(e) => onSearchTermChange(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>

//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 <b>Sr. No.</b>
//               </TableCell>

//               <TableCell>
//                 <b>EVENT NAME</b>
//               </TableCell>

//               <TableCell>
//                 <b>START DATE</b>
//               </TableCell>

//               <TableCell>
//                 <b>END DATE</b>
//               </TableCell>

//               <TableCell>
//                 <b>COUNTRY</b>
//               </TableCell>

//               <TableCell>
//                 <b>STATE</b>
//               </TableCell>

//               <TableCell>
//                 <b>EMPLOYEE HUB</b>
//               </TableCell>

//               <TableCell>
//                 <b>STATUS</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{row.event_name}</TableCell>
//                   <TableCell>{formatDate(row.start_date)}</TableCell>
//                   <TableCell>{formatDate(row.end_date)}</TableCell>
//                   <TableCell>{row.country}</TableCell>
//                   <TableCell>{row.state}</TableCell>
//                   <TableCell>{row.employee_hub}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                   No upcoming holidays found or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// // ===================================================================

// // 2. Leave Type Wise Table (Child Component) - Not currently used in main component

// // ===================================================================

// const LeaveTypewiseTable = ({ leaves = [] }) => {
//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [search, setSearch] = useState("");

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0);
//   };

//   const filtered = leaves.filter(
//     (item) =>
//       (item.employee_name?.toLowerCase() || "").includes(
//         search.toLowerCase()
//       ) ||
//       (item.leave_type?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.duration?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.reason?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.status?.toLowerCase() || "").includes(search.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     if (status === "Approved") return "success";

//     if (status === "Pending") return "warning";

//     if (status === "Rejected") return "error";

//     return "default";
//   };

//   const paginatedData = filtered.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         mt: { xs: 2, sm: 4 },
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",

//           flexDirection: { xs: "column", sm: "row" },

//           justifyContent: "space-between",

//           alignItems: { xs: "flex-start", sm: "center" },

//           mb: 2,

//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Leave Type Wise
//         </Typography>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FormControl size="small" sx={{ minWidth: 70 }}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               displayEmpty
//             >
//               <MenuItem value={5}>5</MenuItem>

//               <MenuItem value={10}>10</MenuItem>

//               <MenuItem value={25}>25</MenuItem>

//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <Typography variant="body2" color="textSecondary">
//             entries
//           </Typography>

//           <TextField
//             size="small"
//             placeholder="Search leaves..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);

//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: "250px" } }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 <b>Sr. No.</b>
//               </TableCell>

//               <TableCell>
//                 <b>EMPLOYEE NAME</b>
//               </TableCell>

//               <TableCell>
//                 <b>LEAVE TYPE</b>
//               </TableCell>

//               <TableCell>
//                 <b>DURATION</b>
//               </TableCell>

//               <TableCell align="center">
//                 <b>NO. OF DAYS</b>
//               </TableCell>

//               <TableCell>
//                 <b>REASON</b>
//               </TableCell>

//               <TableCell>
//                 <b>STATUS</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.leave_id}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                   <TableCell>{row.employee_name}</TableCell>

//                   <TableCell>{row.leave_type || "N/A"}</TableCell>

//                   <TableCell>{row.duration}</TableCell>

//                   <TableCell align="center">{row.day_count}</TableCell>

//                   <TableCell>{row.reason}</TableCell>

//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                   No leave data available or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={filtered.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]} // Kept for consistency if ever needed but controlled by custom select
//         labelDisplayedRows={({ from, to, count }) =>
//           `Showing ${from}-${to} of ${count} records`
//         }
//         sx={{
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select": {
//             display: "none",
//           },

//           "& .MuiTablePagination-toolbar": {
//             justifyContent: { xs: "center", sm: "flex-end" },

//             paddingLeft: { xs: 0, sm: 2 },

//             paddingRight: { xs: 0, sm: 2 },
//           },
//         }}
//       />
//     </Paper>
//   );
// };

// // ===================================================================

// // 3. Department Wise Leave Report Table (Child Component)

// // ===================================================================

// const DepartmentLeaveReportTable = ({ reportData = [] }) => {
//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [search, setSearch] = useState("");

//   const formatHeader = (key) => {
//     return key

//       .replace(/_/g, " ")

//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const leaveTypeHeaders = useMemo(() => {
//     if (!reportData || reportData.length === 0) {
//       return [];
//     }

//     // Ensure leave_breakdown exists and is an object

//     const firstRowLeaveBreakdown = reportData[0]?.leave_breakdown;

//     return firstRowLeaveBreakdown ? Object.keys(firstRowLeaveBreakdown) : [];
//   }, [reportData]);

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0);
//   };

//   const filteredData = reportData.filter((row) => {
//     const searchLower = search.toLowerCase();

//     const departmentMatch = (row.department_name?.toLowerCase() || "").includes(
//       searchLower
//     );

//     const leaveBreakdownMatch = Object.entries(row.leave_breakdown || {}).some(
//       ([leaveType, count]) =>
//         formatHeader(leaveType).toLowerCase().includes(searchLower) ||
//         String(count || 0).includes(searchLower)
//     );

//     return (
//       departmentMatch ||
//       leaveBreakdownMatch ||
//       String(row.total_employees ?? "").includes(searchLower) ||
//       String(row.employees_on_leave ?? "").includes(searchLower)
//     );
//   });

//   const totalColumns = 4 + leaveTypeHeaders.length;

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         mt: { xs: 2, sm: 4 },
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",

//           flexDirection: { xs: "column", sm: "row" },

//           justifyContent: "space-between",

//           alignItems: { xs: "flex-start", sm: "center" },

//           mb: 2,

//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Department Wise Leave Report
//         </Typography>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FormControl size="small" sx={{ minWidth: 70 }}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               displayEmpty
//             >
//               <MenuItem value={5}>5</MenuItem>

//               <MenuItem value={10}>10</MenuItem>

//               <MenuItem value={25}>25</MenuItem>

//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <Typography variant="body2" color="textSecondary">
//             entries
//           </Typography>

//           <TextField
//             size="small"
//             placeholder="Search departments..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);

//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: "250px" } }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 <b>Sr. No.</b>
//               </TableCell>

//               <TableCell>
//                 <b>DEPARTMENT NAME</b>
//               </TableCell>

//               <TableCell align="center">
//                 <b>TOTAL EMP</b>
//               </TableCell>

//               <TableCell align="center">
//                 <b>EMP ON LEAVE</b>
//               </TableCell>

//               {leaveTypeHeaders.map((header) => (
//                 <TableCell key={header} align="center">
//                   <b>{formatHeader(header)}</b>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.department_name + index}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                   <TableCell>{row.department_name}</TableCell>

//                   <TableCell align="center">
//                     {row.total_employees ?? "N/A"}
//                   </TableCell>

//                   <TableCell align="center">{row.employees_on_leave}</TableCell>

//                   {leaveTypeHeaders.map((headerKey) => (
//                     <TableCell key={headerKey} align="center">
//                       {row.leave_breakdown[headerKey] ?? 0}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                   No department leave report data available or matching your
//                   search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]} // Kept for consistency if ever needed but controlled by custom select
//         labelDisplayedRows={({ from, to, count }) =>
//           `Showing ${from}-${to} of ${count} records`
//         }
//         sx={{
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select": {
//             display: "none",
//           },

//           "& .MuiTablePagination-toolbar": {
//             justifyContent: { xs: "center", sm: "flex-end" },

//             paddingLeft: { xs: 0, sm: 2 },

//             paddingRight: { xs: 0, sm: 2 },
//           },
//         }}
//       />
//     </Paper>
//   );
// };

// // ===================================================================

// // Main Parent Component for the Dashboard

// // ===================================================================

// const LeaveDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);

//   const [departmentReport, setDepartmentReport] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState(null);

//   const [holidaySearchTerm, setHolidaySearchTerm] = useState("");

//   const DASHBOARD_API_URL =
//     "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";

//   const DEPARTMENT_REPORT_API_URL =
//     "https://tdtlworld.com/hrms-backend/department_leave_report/";

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);

//         const [dashboardResponse, departmentResponse] = await Promise.all([
//           axios.get(DASHBOARD_API_URL),

//           axios.get(DEPARTMENT_REPORT_API_URL),
//         ]);

//         setDashboardData(dashboardResponse.data);

//         setDepartmentReport(departmentResponse.data);

//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch dashboard details. Please try again later.");

//         console.error("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 5,
//           p: { xs: 2, sm: 3 },
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography
//         color="error"
//         align="center"
//         sx={{ mt: 5, p: { xs: 2, sm: 3 } }}
//       >
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           p: { xs: 2, sm: 3 },
//           bgcolor: "background.default",
//           minHeight: "100vh",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           sx={{ fontSize: { xs: "1.8rem", sm: "2.125rem" }, mb: 3 }}
//         >
//           Leave Details Dashboard
//         </Typography>

//         <Grid container spacing={{ xs: 2, md: 4 }}>
//           {/* Holiday Table takes full width */}

//           <Grid item xs={12}>
//             <HolidayTable
//               holiday={dashboardData?.upcoming_holiday}
//               searchTerm={holidaySearchTerm}
//               onSearchTermChange={setHolidaySearchTerm}
//             />
//           </Grid>

//           {/* Leave Type Wise (if uncommented) and Department Wise can be side-by-side or stacked */}

//           {/* Currently, only Department Wise is shown */}

//           <Grid item xs={12}>
//             {" "}
//             {/* Takes full width if no other component beside it */}
//             <DepartmentLeaveReportTable reportData={departmentReport?.data} />
//           </Grid>

//           {/* If you wanted LeaveTypewiseTable:

//           <Grid item xs={12} md={6}>

//             <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} />

//           </Grid>

//           */}
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default LeaveDashboard;






// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   TablePagination,
//   TextField,
//   Chip,
//   CircularProgress,
//   Grid,
//   Button,
//   InputAdornment,
//   Select,
//   MenuItem,
//   FormControl,
//   TableFooter, // Added for totals
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";

// // --- THEME DEFINITION ---
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#7C3AED",
//       dark: "#6D28D9",
//     },
//     warning: {
//       main: "#f59e0b",
//     },
//     error: {
//       main: "#ef4444",
//     },
//     success: {
//       main: "#22C55E",
//     },
//     info: {
//       main: "#3B82F6",
//     },
//     background: {
//       default: "#f4f6f8",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: "white",
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: "600",
//           backgroundColor: "#f9fafb",
//           color: "#374151",
//           textTransform: "uppercase",
//           fontSize: "0.75rem",
//         },
//         footer: {
//             fontWeight: 'bold',
//             backgroundColor: '#f9fafb',
//             fontSize: '0.8rem',
//         }
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           fontWeight: "bold",
//         },
//         colorSuccess: {
//           backgroundColor: "#22C55E",
//           color: "white",
//         },
//         colorWarning: {
//           backgroundColor: "#f59e0b",
//           color: "white",
//         },
//         colorError: {
//           backgroundColor: "#ef4444",
//           color: "white",
//         },
//         colorInfo: {
//           backgroundColor: "#3B82F6",
//           color: "white",
//         },
//       },
//     },
//     MuiTablePagination: {
//       styleOverrides: {
//         toolbar: {
//           paddingLeft: "16px",
//           paddingRight: "16px",
//           "@media (max-width:600px)": {
//             flexDirection: "column",
//             alignItems: "center",
//             "& > *": {
//               marginBottom: "8px",
//             },
//           },
//         },
//         selectLabel: {
//           display: "none",
//         },
//         select: {
//           display: "none",
//         },
//         actions: {
//           "@media (max-width:600px)": {
//             marginLeft: "auto",
//             marginRight: "auto",
//           },
//         },
//       },
//     },
//   },
// });

// // ===================================================================
// // 1. Upcoming Holidays Table (Child Component)
// // ===================================================================
// const HolidayTable = ({ holiday, searchTerm, onSearchTermChange }) => {
//   const data = holiday ? [holiday] : [];

//   const getStatusColor = (status) => {
//     if (status === "Published") return "success";
//     if (status === "Upcoming") return "info";
//     return "warning";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const filteredData = data.filter((item) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       (item.event_name?.toLowerCase() || "").includes(searchLower) ||
//       (item.country?.toLowerCase() || "").includes(searchLower) ||
//       (item.state?.toLowerCase() || "").includes(searchLower) ||
//       (item.employee_hub?.toLowerCase() || "").includes(searchLower) ||
//       (item.status?.toLowerCase() || "").includes(searchLower)
//     );
//   });

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         width: "100%",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 2,
//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Upcoming Public Holidays
//         </Typography>
//         <TextField
//           size="small"
//           placeholder="Search holidays..."
//           value={searchTerm}
//           onChange={(e) => onSearchTermChange(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 <b>Sr. No.</b>
//               </TableCell>
//               <TableCell>
//                 <b>EVENT NAME</b>
//               </TableCell>
//               <TableCell>
//                 <b>START DATE</b>
//               </TableCell>
//               <TableCell>
//                 <b>END DATE</b>
//               </TableCell>
//               <TableCell>
//                 <b>COUNTRY</b>
//               </TableCell>
//               <TableCell>
//                 <b>STATE</b>
//               </TableCell>
//               <TableCell>
//                 <b>EMPLOYEE HUB</b>
//               </TableCell>
//               <TableCell>
//                 <b>STATUS</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{row.event_name}</TableCell>
//                   <TableCell>{formatDate(row.start_date)}</TableCell>
//                   <TableCell>{formatDate(row.end_date)}</TableCell>
//                   <TableCell>{row.country}</TableCell>
//                   <TableCell>{row.state}</TableCell>
//                   <TableCell>{row.employee_hub}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                   No upcoming holidays found or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// // ===================================================================
// // 2. Leave Type Wise Table (Child Component)
// // ===================================================================
// const LeaveTypewiseTable = ({ leaves = [] }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [search, setSearch] = useState("");

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filtered = useMemo(() => leaves.filter(
//     (item) =>
//       (item.employee_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.leave_type?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.duration?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.reason?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.status?.toLowerCase() || "").includes(search.toLowerCase())
//   ), [leaves, search]);

//   const totalDays = useMemo(() =>
//     filtered.reduce((sum, item) => sum + (item.day_count || 0), 0),
//     [filtered]
//   );

//   const getStatusColor = (status) => {
//     if (status === "Approved") return "success";
//     if (status === "Pending") return "warning";
//     if (status === "Rejected") return "error";
//     return "default";
//   };

//   const paginatedData = filtered.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         mt: { xs: 2, sm: 4 },
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 2,
//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Leave Type Wise
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FormControl size="small" sx={{ minWidth: 70 }}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               displayEmpty
//             >
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <Typography variant="body2" color="textSecondary">
//             entries
//           </Typography>
//           <TextField
//             size="small"
//             placeholder="Search leaves..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: "250px" } }}
//           />
//         </Box>
//       </Box>
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 <b>Sr. No.</b>
//               </TableCell>
//               <TableCell>
//                 <b>EMPLOYEE NAME</b>
//               </TableCell>
//               <TableCell>
//                 <b>LEAVE TYPE</b>
//               </TableCell>
//               <TableCell>
//                 <b>DURATION</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>NO. OF DAYS</b>
//               </TableCell>
//               <TableCell>
//                 <b>REASON</b>
//               </TableCell>
//               <TableCell>
//                 <b>STATUS</b>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.leave_id}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.employee_name}</TableCell>
//                   <TableCell>{row.leave_type || "N/A"}</TableCell>
//                   <TableCell>{row.duration}</TableCell>
//                   <TableCell align="center">{row.day_count}</TableCell>
//                   <TableCell>{row.reason}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                   No leave data available or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={4} align="right">
//                 <b>Total Days</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{totalDays}</b>
//               </TableCell>
//               <TableCell colSpan={2}></TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={filtered.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//         labelDisplayedRows={({ from, to, count }) =>
//           `Showing ${from}-${to} of ${count} records`
//         }
//         sx={{
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select": {
//             display: "none",
//           },
//           "& .MuiTablePagination-toolbar": {
//             justifyContent: { xs: "center", sm: "flex-end" },
//             paddingLeft: { xs: 0, sm: 2 },
//             paddingRight: { xs: 0, sm: 2 },
//           },
//         }}
//       />
//     </Paper>
//   );
// };

// // ===================================================================
// // 3. Department Wise Leave Report Table (Child Component)
// // ===================================================================
// const DepartmentLeaveReportTable = ({ reportData = [] }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [search, setSearch] = useState("");

//   const formatHeader = (key) => {
//     return key
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const leaveTypeHeaders = useMemo(() => {
//     if (!reportData || reportData.length === 0) {
//       return [];
//     }
//     const firstRowLeaveBreakdown = reportData[0]?.leave_breakdown;
//     return firstRowLeaveBreakdown ? Object.keys(firstRowLeaveBreakdown) : [];
//   }, [reportData]);

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = useMemo(() => reportData.filter((row) => {
//     const searchLower = search.toLowerCase();
//     const departmentMatch = (row.department_name?.toLowerCase() || "").includes(
//       searchLower
//     );
//     const leaveBreakdownMatch = Object.entries(row.leave_breakdown || {}).some(
//       ([leaveType, count]) =>
//         formatHeader(leaveType).toLowerCase().includes(searchLower) ||
//         String(count || 0).includes(searchLower)
//     );
//     return (
//       departmentMatch ||
//       leaveBreakdownMatch ||
//       String(row.total_employees ?? "").includes(searchLower) ||
//       String(row.employees_on_leave ?? "").includes(searchLower)
//     );
//   }), [reportData, search]);

//   const columnTotals = useMemo(() => {
//     const totals = {
//       total_employees: 0,
//       employees_on_leave: 0,
//       total_leaves_row: 0,
//     };
//     leaveTypeHeaders.forEach((header) => {
//       totals[header] = 0;
//     });

//     filteredData.forEach((row) => {
//       totals.total_employees += row.total_employees ?? 0;
//       totals.employees_on_leave += row.employees_on_leave ?? 0;
     
//       const rowTotal = Object.values(row.leave_breakdown || {}).reduce(
//         (sum, count) => sum + (count || 0),
//         0
//       );
//       totals.total_leaves_row += rowTotal;

//       leaveTypeHeaders.forEach((header) => {
//         totals[header] += row.leave_breakdown?.[header] ?? 0;
//       });
//     });

//     return totals;
//   }, [filteredData, leaveTypeHeaders]);

//   const totalColumns = 5 + leaveTypeHeaders.length;

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         mt: { xs: 2, sm: 4 },
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 2,
//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Department Wise Leave Report
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FormControl size="small" sx={{ minWidth: 70 }}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               displayEmpty
//             >
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <Typography variant="body2" color="textSecondary">
//             entries
//           </Typography>
//           <TextField
//             size="small"
//             placeholder="Search departments..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: "250px" } }}
//           />
//         </Box>
//       </Box>
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 <b>Sr. No.</b>
//               </TableCell>
//               <TableCell>
//                 <b>DEPARTMENT NAME</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>TOTAL EMP</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>EMP ON LEAVE</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>TOTAL LEAVES</b>
//               </TableCell>
//               {leaveTypeHeaders.map((header) => (
//                 <TableCell key={header} align="center">
//                   <b>{formatHeader(header)}</b>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => {
//                 const rowTotalLeaves = Object.values(
//                   row.leave_breakdown || {}
//                 ).reduce((sum, count) => sum + (count || 0), 0);
//                 return (
//                   <TableRow key={row.department_name + index}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.department_name}</TableCell>
//                     <TableCell align="center">
//                       {row.total_employees ?? "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {row.employees_on_leave}
//                     </TableCell>
//                     <TableCell align="center">{rowTotalLeaves}</TableCell>
//                     {leaveTypeHeaders.map((headerKey) => (
//                       <TableCell key={headerKey} align="center">
//                         {row.leave_breakdown[headerKey] ?? 0}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                   No department leave report data available or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={2} align="right">
//                 <b>Grand Total</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{columnTotals.total_employees}</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{columnTotals.employees_on_leave}</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{columnTotals.total_leaves_row}</b>
//               </TableCell>
//               {leaveTypeHeaders.map((header) => (
//                 <TableCell key={header + "-total"} align="center">
//                   <b>{columnTotals[header]}</b>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//         labelDisplayedRows={({ from, to, count }) =>
//           `Showing ${from}-${to} of ${count} records`
//         }
//         sx={{
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select": {
//             display: "none",
//           },
//           "& .MuiTablePagination-toolbar": {
//             justifyContent: { xs: "center", sm: "flex-end" },
//             paddingLeft: { xs: 0, sm: 2 },
//             paddingRight: { xs: 0, sm: 2 },
//           },
//         }}
//       />
//     </Paper>
//   );
// };

// // ===================================================================
// // Main Parent Component for the Dashboard
// // ===================================================================
// const LeaveDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [departmentReport, setDepartmentReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [holidaySearchTerm, setHolidaySearchTerm] = useState("");

//   const DASHBOARD_API_URL =
//     "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";
//   const DEPARTMENT_REPORT_API_URL =
//     "https://tdtlworld.com/hrms-backend/department_leave_report/";

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         const [dashboardResponse, departmentResponse] = await Promise.all([
//           axios.get(DASHBOARD_API_URL),
//           axios.get(DEPARTMENT_REPORT_API_URL),
//         ]);
//         setDashboardData(dashboardResponse.data);
//         setDepartmentReport(departmentResponse.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch dashboard details. Please try again later.");
//         console.error("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllData();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 5,
//           p: { xs: 2, sm: 3 },
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography
//         color="error"
//         align="center"
//         sx={{ mt: 5, p: { xs: 2, sm: 3 } }}
//       >
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           p: { xs: 2, sm: 3 },
//           bgcolor: "background.default",
//           minHeight: "100vh",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           sx={{ fontSize: { xs: "1.8rem", sm: "2.125rem" }, mb: 3 }}
//         >
//           Leave Details Dashboard
//         </Typography>
//         <Grid container spacing={{ xs: 2, md: 4 }}>
//           <Grid item xs={12}>
//             <HolidayTable
//               holiday={dashboardData?.upcoming_holiday}
//               searchTerm={holidaySearchTerm}
//               onSearchTermChange={setHolidaySearchTerm}
//             />
//           </Grid>
         
//           <Grid item xs={12}>
//             <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} />
//           </Grid>

//           <Grid item xs={12}>
//             <DepartmentLeaveReportTable reportData={departmentReport?.data} />
//           </Grid>
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default LeaveDashboard;
















// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   TablePagination,
//   TextField,
//   Chip,
//   CircularProgress,
//   Grid,
//   Button,
//   InputAdornment,
//   Select,
//   MenuItem,
//   FormControl,
//   TableFooter, // Added for totals
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";

// // --- THEME DEFINITION ---
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#8C257C", // Updated Purple
//       dark: "#6D1D5E",
//     },
//     warning: {
//       main: "#F58E35", // Updated Orange
//     },
//     error: {
//       main: "#ef4444",
//     },
//     success: {
//       main: "#22C55E",
//     },
//     info: {
//       main: "#3B82F6",
//     },
//     background: {
//       default: "#f4f6f8",
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: "white",
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: "600",
//           backgroundColor: "#8C257C", // Updated Header BG Color
//           color: "#FFFFFF",           // White text for contrast
//           textTransform: "uppercase",
//           fontSize: "0.75rem",
//         },
//         footer: {
//             fontWeight: 'bold',
//             backgroundColor: '#f9fafb',
//             fontSize: '0.8rem',
//         }
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           fontWeight: "bold",
//         },
//         colorSuccess: {
//           backgroundColor: "#22C55E",
//           color: "white",
//         },
//         colorWarning: {
//           backgroundColor: "#F58E35", // Updated Orange
//           color: "white",
//         },
//         colorError: {
//           backgroundColor: "#ef4444",
//           color: "white",
//         },
//         colorInfo: {
//           backgroundColor: "#3B82F6",
//           color: "white",
//         },
//       },
//     },
//     MuiTablePagination: {
//       styleOverrides: {
//         toolbar: {
//           paddingLeft: "16px",
//           paddingRight: "16px",
//           justifyContent: 'space-between', // Standardized Layout: Info left, Actions right
//           "@media (max-width:600px)": {
//             flexDirection: "column",
//             alignItems: "center",
//             "& > *": {
//               marginBottom: "8px",
//             },
//           },
//         },
//         // Hiding default select as we use a custom one at the top of the table
//         selectLabel: {
//           display: "none",
//         },
//         select: {
//           display: "none",
//         },
//         actions: {
//           "@media (max-width:600px)": {
//             marginLeft: "auto",
//             marginRight: "auto",
//           },
//         },
//       },
//     },
//   },
// });

// // ===================================================================
// // 1. Upcoming Holidays Table (Child Component)
// // ===================================================================
// const HolidayTable = ({ holiday, searchTerm, onSearchTermChange }) => {
//   const data = holiday ? [holiday] : [];

//   const getStatusColor = (status) => {
//     if (status === "Published") return "success";
//     if (status === "Upcoming") return "info";
//     return "warning";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const filteredData = data.filter((item) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       (item.event_name?.toLowerCase() || "").includes(searchLower) ||
//       (item.country?.toLowerCase() || "").includes(searchLower) ||
//       (item.state?.toLowerCase() || "").includes(searchLower) ||
//       (item.employee_hub?.toLowerCase() || "").includes(searchLower) ||
//       (item.status?.toLowerCase() || "").includes(searchLower)
//     );
//   });

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         width: "100%",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 2,
//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Upcoming Public Holidays
//         </Typography>
//         <TextField
//           size="small"
//           placeholder="Search holidays..."
//           value={searchTerm}
//           onChange={(e) => onSearchTermChange(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 Sr. No.
//               </TableCell>
//               <TableCell>EVENT NAME</TableCell>
//               <TableCell>START DATE</TableCell>
//               <TableCell>END DATE</TableCell>
//               <TableCell>COUNTRY</TableCell>
//               <TableCell>STATE</TableCell>
//               <TableCell>EMPLOYEE HUB</TableCell>
//               <TableCell>STATUS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{i + 1}</TableCell>
//                   <TableCell>{row.event_name}</TableCell>
//                   <TableCell>{formatDate(row.start_date)}</TableCell>
//                   <TableCell>{formatDate(row.end_date)}</TableCell>
//                   <TableCell>{row.country}</TableCell>
//                   <TableCell>{row.state}</TableCell>
//                   <TableCell>{row.employee_hub}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                   No upcoming holidays found or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// };

// // ===================================================================
// // 2. Leave Type Wise Table (Child Component)
// // ===================================================================
// const LeaveTypewiseTable = ({ leaves = [] }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10
//   const [search, setSearch] = useState("");

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filtered = useMemo(() => leaves.filter(
//     (item) =>
//       (item.employee_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.leave_type?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.duration?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.reason?.toLowerCase() || "").includes(search.toLowerCase()) ||
//       (item.status?.toLowerCase() || "").includes(search.toLowerCase())
//   ), [leaves, search]);

//   const totalDays = useMemo(() =>
//     filtered.reduce((sum, item) => sum + (item.day_count || 0), 0),
//     [filtered]
//   );

//   const getStatusColor = (status) => {
//     if (status === "Approved") return "success";
//     if (status === "Pending") return "warning";
//     if (status === "Rejected") return "error";
//     return "default";
//   };

//   const paginatedData = filtered.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         mt: { xs: 2, sm: 4 },
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 2,
//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Leave Type Wise
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FormControl size="small" sx={{ minWidth: 70 }}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               displayEmpty
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//               <MenuItem value={100}>100</MenuItem>
//             </Select>
//           </FormControl>
//           <Typography variant="body2" color="textSecondary">
//             entries
//           </Typography>
//           <TextField
//             size="small"
//             placeholder="Search leaves..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: "250px" } }}
//           />
//         </Box>
//       </Box>
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 Sr. No.
//               </TableCell>
//               <TableCell>EMPLOYEE NAME</TableCell>
//               <TableCell>LEAVE TYPE</TableCell>
//               <TableCell>DURATION</TableCell>
//               <TableCell align="center">NO. OF DAYS</TableCell>
//               <TableCell>REASON</TableCell>
//               <TableCell>STATUS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.leave_id}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.employee_name}</TableCell>
//                   <TableCell>{row.leave_type || "N/A"}</TableCell>
//                   <TableCell>{row.duration}</TableCell>
//                   <TableCell align="center">{row.day_count}</TableCell>
//                   <TableCell>{row.reason}</TableCell>
//                   <TableCell>
//                     <Chip
//                       label={row.status}
//                       color={getStatusColor(row.status)}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                   No leave data available or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={4} align="right">
//                 <b>Total Days</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{totalDays}</b>
//               </TableCell>
//               <TableCell colSpan={2}></TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={filtered.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[10, 25, 50, 100]}
//         labelDisplayedRows={({ from, to, count }) =>
//           `Showing ${from} to ${to} of ${count} records`
//         }
//       />
//     </Paper>
//   );
// };

// // ===================================================================
// // 3. Department Wise Leave Report Table (Child Component)
// // ===================================================================
// const DepartmentLeaveReportTable = ({ reportData = [] }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10
//   const [search, setSearch] = useState("");

//   const formatHeader = (key) => {
//     return key
//       .replace(/_/g, " ")
//       .replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const leaveTypeHeaders = useMemo(() => {
//     if (!reportData || reportData.length === 0) {
//       return [];
//     }
//     const firstRowLeaveBreakdown = reportData[0]?.leave_breakdown;
//     return firstRowLeaveBreakdown ? Object.keys(firstRowLeaveBreakdown) : [];
//   }, [reportData]);

//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = useMemo(() => reportData.filter((row) => {
//     const searchLower = search.toLowerCase();
//     const departmentMatch = (row.department_name?.toLowerCase() || "").includes(
//       searchLower
//     );
//     const leaveBreakdownMatch = Object.entries(row.leave_breakdown || {}).some(
//       ([leaveType, count]) =>
//         formatHeader(leaveType).toLowerCase().includes(searchLower) ||
//         String(count || 0).includes(searchLower)
//     );
//     return (
//       departmentMatch ||
//       leaveBreakdownMatch ||
//       String(row.total_employees ?? "").includes(searchLower) ||
//       String(row.employees_on_leave ?? "").includes(searchLower)
//     );
//   }), [reportData, search]);

//   const columnTotals = useMemo(() => {
//     const totals = {
//       total_employees: 0,
//       employees_on_leave: 0,
//       total_leaves_row: 0,
//     };
//     leaveTypeHeaders.forEach((header) => {
//       totals[header] = 0;
//     });

//     filteredData.forEach((row) => {
//       totals.total_employees += row.total_employees ?? 0;
//       totals.employees_on_leave += row.employees_on_leave ?? 0;
     
//       const rowTotal = Object.values(row.leave_breakdown || {}).reduce(
//         (sum, count) => sum + (count || 0),
//         0
//       );
//       totals.total_leaves_row += rowTotal;

//       leaveTypeHeaders.forEach((header) => {
//         totals[header] += row.leave_breakdown?.[header] ?? 0;
//       });
//     });

//     return totals;
//   }, [filteredData, leaveTypeHeaders]);

//   const totalColumns = 5 + leaveTypeHeaders.length;

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: { xs: 2, sm: 3 },
//         borderRadius: 3,
//         mt: { xs: 2, sm: 4 },
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 2,
//           gap: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           gutterBottom
//           mb={{ xs: 1, sm: 0 }}
//         >
//           Department Wise Leave Report
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FormControl size="small" sx={{ minWidth: 70 }}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               displayEmpty
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//               <MenuItem value={100}>100</MenuItem>
//             </Select>
//           </FormControl>
//           <Typography variant="body2" color="textSecondary">
//             entries
//           </Typography>
//           <TextField
//             size="small"
//             placeholder="Search departments..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: "250px" } }}
//           />
//         </Box>
//       </Box>
//       <TableContainer>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: { xs: "auto", sm: "50px" } }}>
//                 Sr. No.
//               </TableCell>
//               <TableCell>DEPARTMENT NAME</TableCell>
//               <TableCell align="center">TOTAL EMP</TableCell>
//               <TableCell align="center">EMP ON LEAVE</TableCell>
//               <TableCell align="center">TOTAL LEAVES</TableCell>
//               {leaveTypeHeaders.map((header) => (
//                 <TableCell key={header} align="center">
//                   {formatHeader(header)}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => {
//                 const rowTotalLeaves = Object.values(
//                   row.leave_breakdown || {}
//                 ).reduce((sum, count) => sum + (count || 0), 0);
//                 return (
//                   <TableRow key={row.department_name + index}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.department_name}</TableCell>
//                     <TableCell align="center">
//                       {row.total_employees ?? "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {row.employees_on_leave}
//                     </TableCell>
//                     <TableCell align="center">{rowTotalLeaves}</TableCell>
//                     {leaveTypeHeaders.map((headerKey) => (
//                       <TableCell key={headerKey} align="center">
//                         {row.leave_breakdown[headerKey] ?? 0}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                   No department leave report data available or matching your search.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={2} align="right">
//                 <b>Grand Total</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{columnTotals.total_employees}</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{columnTotals.employees_on_leave}</b>
//               </TableCell>
//               <TableCell align="center">
//                 <b>{columnTotals.total_leaves_row}</b>
//               </TableCell>
//               {leaveTypeHeaders.map((header) => (
//                 <TableCell key={header + "-total"} align="center">
//                   <b>{columnTotals[header]}</b>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[10, 25, 50, 100]}
//         labelDisplayedRows={({ from, to, count }) =>
//           `Showing ${from} to ${to} of ${count} records`
//         }
//       />
//     </Paper>
//   );
// };

// // ===================================================================
// // Main Parent Component for the Dashboard
// // ===================================================================
// const LeaveDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [departmentReport, setDepartmentReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [holidaySearchTerm, setHolidaySearchTerm] = useState("");

//   const DASHBOARD_API_URL =
//     "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";
//   const DEPARTMENT_REPORT_API_URL =
//     "https://tdtlworld.com/hrms-backend/department_leave_report/";

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         const [dashboardResponse, departmentResponse] = await Promise.all([
//           axios.get(DASHBOARD_API_URL),
//           axios.get(DEPARTMENT_REPORT_API_URL),
//         ]);
//         setDashboardData(dashboardResponse.data);
//         setDepartmentReport(departmentResponse.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch dashboard details. Please try again later.");
//         console.error("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllData();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 5,
//           p: { xs: 2, sm: 3 },
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography
//         color="error"
//         align="center"
//         sx={{ mt: 5, p: { xs: 2, sm: 3 } }}
//       >
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           p: { xs: 2, sm: 3 },
//           bgcolor: "background.default",
//           minHeight: "100vh",
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           gutterBottom
//           sx={{ fontSize: { xs: "1.8rem", sm: "2.125rem" }, mb: 3 }}
//         >
//           Leave Details Dashboard
//         </Typography>
//         <Grid container spacing={{ xs: 2, md: 4 }}>
//           <Grid item xs={12}>
//             <HolidayTable
//               holiday={dashboardData?.upcoming_holiday}
//               searchTerm={holidaySearchTerm}
//               onSearchTermChange={setHolidaySearchTerm}
//             />
//           </Grid>
         
//           <Grid item xs={12}>
//             <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} />
//           </Grid>

//           <Grid item xs={12}>
//             <DepartmentLeaveReportTable reportData={departmentReport?.data} />
//           </Grid>
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default LeaveDashboard;














import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  Chip,
  Grid,
  Button,
  InputAdornment,
  useMediaQuery,
  Skeleton,
  TableFooter,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8C257C",
      dark: "#6d1d60",
    },
    secondary: {
      main: "#F58E35",
    },
  },
  typography: {
    fontFamily: "inherit",
    h5: {
      fontWeight: "bold",
      color: "#8C257C",
    },
    body2: {
      fontSize: "0.95rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#6d1d60",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#8C257C",
          color: "#FFFFFF",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        },
        footer: {
            fontWeight: 'bold',
            backgroundColor: '#f9fafb',
            fontSize: '0.9rem',
        }
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "#8C257C",
        },
        selectIcon: {
          color: "#8C257C",
        },
        actions: {
          color: "#8C257C",
        },
      },
    },
  },
});

const TableSkeleton = ({ columns, rows = 5 }) => {
  return [...Array(rows)].map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {[...Array(columns)].map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton variant="text" />
        </TableCell>
      ))}
    </TableRow>
  ));
};

const HolidayTable = ({ holiday, loading }) => {
  const data = holiday ? [holiday] : [];

  const getStatusColor = (status) => {
    if (status === "Published") return "success";
    if (status === "Upcoming") return "info";
    return "warning";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>EVENT NAME</TableCell>
            <TableCell>START DATE</TableCell>
            <TableCell>END DATE</TableCell>
            <TableCell>COUNTRY</TableCell>
            <TableCell>STATE</TableCell>
            <TableCell>HOLIDAY HUB</TableCell>
            <TableCell>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableSkeleton columns={8} rows={1} />
          ) : data.length > 0 ? (
            data.map((row, i) => (
              <TableRow key={i} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.event_name}</TableCell>
                <TableCell>{formatDate(row.start_date)}</TableCell>
                <TableCell>{formatDate(row.end_date)}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.employee_hub}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={getStatusColor(row.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No upcoming holidays found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const LeaveTypewiseTable = ({ leaves = [], loading, searchTerm }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(
    () =>
      leaves.filter(
        (item) =>
          (item.employee_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (item.leave_type?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (item.duration?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (item.reason?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (item.status?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      ),
    [leaves, searchTerm]
  );

  const totalDays = useMemo(
    () => filtered.reduce((sum, item) => sum + (item.day_count || 0), 0),
    [filtered]
  );

  const getStatusColor = (status) => {
    if (status === "Approved") return "success";
    if (status === "Pending") return "warning";
    if (status === "Rejected") return "error";
    return "default";
  };

  const paginatedData = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>EMPLOYEE NAME</TableCell>
              <TableCell>LEAVE TYPE</TableCell>
              <TableCell>DURATION</TableCell>
              <TableCell align="center">NO. OF DAYS</TableCell>
              <TableCell>REASON</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton columns={7} />
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={row.leave_id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.employee_name}</TableCell>
                  <TableCell>{row.leave_type || "N/A"}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell align="center">{row.day_count}</TableCell>
                  <TableCell>{row.reason}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No leave data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {!loading && filtered.length > 0 && (
            <TableFooter>
                <TableRow>
                <TableCell colSpan={4} align="right">
                    <b>Total Days</b>
                </TableCell>
                <TableCell align="center">
                    <b>{totalDays}</b>
                </TableCell>
                <TableCell colSpan={2}></TableCell>
                </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {Math.min(page * rowsPerPage + 1, filtered.length)} to{" "}
          {Math.min((page + 1) * rowsPerPage, filtered.length)} of {filtered.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 15, 25]}
        />
      </Box>
    </>
  );
};

const DepartmentLeaveReportTable = ({ reportData = [], loading, searchTerm }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const formatHeader = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const leaveTypeHeaders = useMemo(() => {
    if (!reportData || reportData.length === 0) return [];
    const firstRowLeaveBreakdown = reportData[0]?.leave_breakdown;
    return firstRowLeaveBreakdown ? Object.keys(firstRowLeaveBreakdown) : [];
  }, [reportData]);

  const filteredData = useMemo(
    () =>
      reportData.filter((row) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (row.department_name?.toLowerCase() || "").includes(searchLower) ||
          String(row.total_employees ?? "").includes(searchLower) ||
          String(row.employees_on_leave ?? "").includes(searchLower)
        );
      }),
    [reportData, searchTerm]
  );
   
  const columnTotals = useMemo(() => {
    const totals = { total_employees: 0, employees_on_leave: 0, total_leaves_row: 0 };
    leaveTypeHeaders.forEach((header) => { totals[header] = 0; });

    filteredData.forEach((row) => {
      totals.total_employees += row.total_employees ?? 0;
      totals.employees_on_leave += row.employees_on_leave ?? 0;
      const rowTotal = Object.values(row.leave_breakdown || {}).reduce((sum, count) => sum + (count || 0), 0);
      totals.total_leaves_row += rowTotal;
      leaveTypeHeaders.forEach((header) => {
        totals[header] += row.leave_breakdown?.[header] ?? 0;
      });
    });
    return totals;
  }, [filteredData, leaveTypeHeaders]);


  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>DEPARTMENT NAME</TableCell>
              <TableCell align="center">TOTAL EMP</TableCell>
              <TableCell align="center">EMP ON LEAVE</TableCell>
              <TableCell align="center">TOTAL LEAVES</TableCell>
              {leaveTypeHeaders.map((header) => (
                <TableCell key={header} align="center">
                  {formatHeader(header)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableSkeleton columns={5 + leaveTypeHeaders.length} />
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => {
                const rowTotalLeaves = Object.values(
                  row.leave_breakdown || {}
                ).reduce((sum, count) => sum + (count || 0), 0);
                return (
                  <TableRow key={row.department_name + index} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{row.department_name}</TableCell>
                    <TableCell align="center">{row.total_employees ?? "N/A"}</TableCell>
                    <TableCell align="center">{row.employees_on_leave}</TableCell>
                    <TableCell align="center">{rowTotalLeaves}</TableCell>
                    {leaveTypeHeaders.map((headerKey) => (
                      <TableCell key={headerKey} align="center">
                        {row.leave_breakdown[headerKey] ?? 0}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5 + leaveTypeHeaders.length} align="center">
                  No department leave report data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {!loading && filteredData.length > 0 && (
             <TableFooter>
                <TableRow>
                    <TableCell colSpan={2} align="right"><b>Grand Total</b></TableCell>
                    <TableCell align="center"><b>{columnTotals.total_employees}</b></TableCell>
                    <TableCell align="center"><b>{columnTotals.employees_on_leave}</b></TableCell>
                    <TableCell align="center"><b>{columnTotals.total_leaves_row}</b></TableCell>
                    {leaveTypeHeaders.map((header) => (
                        <TableCell key={header + "-total"} align="center"><b>{columnTotals[header]}</b></TableCell>
                    ))}
                </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {Math.min(page * rowsPerPage + 1, filteredData.length)} to{" "}
          {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 15, 25]}
        />
      </Box>
    </>
  );
};

const LeaveDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [departmentReport, setDepartmentReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const DASHBOARD_API_URL = "https://tdtlworld.com/hrms-backend/api/leave-applications-dashboard/";
  const DEPARTMENT_REPORT_API_URL = "https://tdtlworld.com/hrms-backend/department_leave_report/";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [dashboardResponse, departmentResponse] = await Promise.all([
          axios.get(DASHBOARD_API_URL),
          axios.get(DEPARTMENT_REPORT_API_URL),
        ]);
        setDashboardData(dashboardResponse.data);
        setDepartmentReport(departmentResponse.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data loaded successfully!",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch dashboard details.",
          timer: 3000,
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box component={Paper} p={3}>
        <Typography variant="h4" mb={5} color="#8C257C" fontWeight="bold">
          Leave Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          
          <TextField
            size="small"
            placeholder="Search ..."
            value={searchTerm}
            mb={4}
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

        <Grid container spacing={4}>
          <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" color="#8C257C" gutterBottom mb={2}>Upcoming Public Holidays</Typography>
              <HolidayTable holiday={dashboardData?.upcoming_holiday} loading={loading} />
          </Grid>
          <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" color="#8C257C" gutterBottom mb={2}>Leave Type Wise</Typography>
              <LeaveTypewiseTable leaves={dashboardData?.leave_type_wise_leaves} loading={loading} searchTerm={searchTerm} />
          </Grid>
          <Grid item xs={12}>
             <Typography variant="h6" fontWeight="bold" color="#8C257C" gutterBottom mb={2}>Department Wise Leave Report</Typography>
             <DepartmentLeaveReportTable reportData={departmentReport?.data} loading={loading} searchTerm={searchTerm} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default LeaveDashboard;