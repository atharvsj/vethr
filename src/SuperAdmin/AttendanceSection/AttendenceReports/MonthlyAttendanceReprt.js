


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
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Stack,
// } from "@mui/material";
// import * as XLSX from 'xlsx';

// const MonthlyAttendeceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };
//   const yearOptions = generateYearOptions();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           "https://tdtlworld.com/hrms-backend/api/leave/monthly-report/",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ year: selectedYear }),
//           }
//         );
//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Error fetching leave report:", error);
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [selectedYear]);

//   const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//   const formatDate = (dateString) => {
//     if (!dateString || dateString.length < 10) return dateString;
//     return dateString.substring(0, 10);
//   };

//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
//     XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
//   };

//   return (
//     <Box sx={{ width: '100%', mb: 4, p: 3 }}>
//       {/* --- Title --- */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Monthly Attendence Report
//       </Typography>

//       {/* --- MODIFIED: Controls (Filters and Button) are now inline below the title --- */}
//       <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
//         <FormControl sx={{ minWidth: 120 }} variant="outlined">
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={selectedYear}
//             label="Year"
//             onChange={(e) => setSelectedYear(e.target.value)}
//           >
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button
//           variant="contained"
//           onClick={handleExport}
//           disabled={reportData.length === 0}
//           sx={{
//             backgroundColor: '#673ab7',
//             '&:hover': { backgroundColor: '#512da8' },
//           }}
//         >
//           Export Report
//         </Button>
//       </Stack>


//       {/* --- Table Section (no changes here) --- */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
//           <Table stickyHeader sx={{ minWidth: 2000, '& .MuiTableCell-root': { border: '1px solid rgba(224, 224, 224, 1)' } }} aria-label="monthly leave report table">
//             <TableHead>
//               <TableRow sx={{ "& .MuiTableCell-head": { backgroundColor: "#E6F3FF", fontWeight: "bold", textAlign: 'left' } }}>
//                 <TableCell>Sr No</TableCell>
//                 {headers.map((header) => (
//                   <TableCell key={header}>{header}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.length > 0 ? (
//                 reportData.map((row, index) => (
//                   <TableRow key={row["Employee ID"] || index} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
//                     <TableCell align="left">{index + 1}</TableCell>
//                     {headers.map((header) => {
//                       const cellValue = row[header];
//                       return (
//                         <TableCell key={`${row["Employee ID"]}-${header}`} align="left">
//                           {cellValue === null ? "N/A" : header === "D.O.J" ? formatDate(cellValue) : cellValue}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={headers.length + 1} align="center">
//                     No data available for the selected year.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default MonthlyAttendeceReport;    ///




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
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Stack,
//   TextField,
//   TablePagination,
// } from "@mui/material";
// import * as XLSX from "xlsx";

// const MonthlyAttendeceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchQuery, setSearchQuery] = useState("");

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Generate Year Options (last 5 years)
//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };
//   const yearOptions = generateYearOptions();

//   // Fetch Report Data only when Generate Report is clicked
//   const handleGenerateReport = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/leave/monthly-report/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ year: selectedYear }),
//         }
//       );
//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//       setPage(0); // reset to first page
//     } catch (error) {
//       console.error("Error fetching leave report:", error);
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Table Headers
//   const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//   // Date Formatter
//   const formatDate = (dateString) => {
//     if (!dateString || dateString.length < 10) return dateString;
//     return dateString.substring(0, 10);
//   };

//   // Excel Export
//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
//     XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
//   };

//   // Search filter
//   const filteredData = reportData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 4, p: 3 }}>
//       {/* Title */}
//       <Typography
//         variant="h5"
//         sx={{ fontWeight: "bold", mb: 2, color: "#111827" }}
//       >
//         Monthly Attendance Report
//       </Typography>

//       {/* Controls (Year + Buttons) */}
//       <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
//         <FormControl sx={{ minWidth: 120 }} variant="outlined">
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={selectedYear}
//             label="Year"
//             onChange={(e) => setSelectedYear(e.target.value)}
//           >
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Generate Report Button */}
//         <Button
//           variant="contained"
//           onClick={handleGenerateReport}
//           sx={{
//             backgroundColor: "#673ab7",
//             "&:hover": { backgroundColor: "#512da8" },
//           }}
//         >
//           Generate Report
//         </Button>

//         {/* Export Button */}
//         <Button
//           variant="contained"
//           onClick={handleExport}
//           disabled={reportData.length === 0}
//           sx={{
//             backgroundColor: "#673ab7",
//             "&:hover": { backgroundColor: "#512da8" },
//           }}
//         >
//           Export Excel
//         </Button>
//       </Stack>

//       {/* Search Bar (below filters) */}
//       <Box sx={{ mb: 2 }}>
//         <TextField
//           size="small"
//           variant="outlined"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{
//             width: "300px",
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "purple",
//               },
//               "&:hover fieldset": {
//                 borderColor: "purple",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "purple",
//               },
//             },
//           }}
//         />
//       </Box>

//       {/* Table Section */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress sx={{ color: "#673ab7" }} />
//         </Box>
//       ) : (
//         <Paper>
//           <TableContainer sx={{ maxHeight: 600 }}>
//             <Table
//               stickyHeader
//               sx={{
//                 minWidth: 1500,
//                 "& .MuiTableCell-root": {
//                   border: "1px solid rgba(224, 224, 224, 1)",
//                 },
//               }}
//               aria-label="monthly leave report table"
//             >
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     "& .MuiTableCell-head": {
//                       backgroundColor: "#E6F3FF",
//                       fontWeight: "bold",
//                       textAlign: "left",
//                     },
//                   }}
//                 >
//                   <TableCell>Sr No</TableCell>
//                   {headers.map((header) => (
//                     <TableCell key={header}>{header}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   filteredData
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row, index) => (
//                       <TableRow
//                         key={row["Employee ID"] || index}
//                         sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
//                       >
//                         <TableCell align="left">
//                           {page * rowsPerPage + index + 1}
//                         </TableCell>
//                         {headers.map((header) => {
//                           const cellValue = row[header];
//                           return (
//                             <TableCell
//                               key={`${row["Employee ID"]}-${header}`}
//                               align="left"
//                             >
//                               {cellValue === null
//                                 ? "N/A"
//                                 : header === "D.O.J"
//                                   ? formatDate(cellValue)
//                                   : cellValue}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={headers.length + 1} align="center">
//                       No data available for the selected year.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <TablePagination
//             component="div"
//             count={filteredData.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default MonthlyAttendeceReport;   ///




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
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Stack,
//   TextField,
//   TablePagination,
// } from "@mui/material";
// import * as XLSX from "xlsx";

// const MonthlyAttendeceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchQuery, setSearchQuery] = useState("");

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Generate Year Options (last 5 years)
//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };
//   const yearOptions = generateYearOptions();

//   // Fetch Report Data only when Generate Report is clicked
//   const handleGenerateReport = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/leave/monthly-report/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ year: selectedYear }),
//         }
//       );
//       const data = await res.json();

//       // MODIFICATION: Sort the data by D.O.J in ascending order
//       const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => {
//         if (!a['D.O.J']) return 1; // push nulls to the end
//         if (!b['D.O.J']) return -1;
//         return new Date(a['D.O.J']) - new Date(b['D.O.J']);
//       });

//       setReportData(sortedData);
//       setPage(0); // reset to first page
//     } catch (error) {
//       console.error("Error fetching leave report:", error);
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Table Headers
//   const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//   // Date Formatter
//   const formatDate = (dateString) => {
//     if (!dateString || dateString.length < 10) return dateString;
//     return dateString.substring(0, 10);
//   };

//   // Excel Export
//   const handleExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
//     XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
//   };

//   // Search filter
//   const filteredData = reportData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase())
//   );

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 4, p: 3 }}>
//       {/* Title */}
//       <Typography
//         variant="h5"
//         sx={{ fontWeight: "bold", mb: 2, color: "#111827" }}
//       >
//         Monthly Attendance Report
//       </Typography>

//       {/* Controls (Year + Buttons) */}
//       <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
//         <FormControl sx={{ minWidth: 120 }} variant="outlined">
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={selectedYear}
//             label="Year"
//             onChange={(e) => setSelectedYear(e.target.value)}
//           >
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Generate Report Button */}
//         <Button
//           variant="contained"
//           onClick={handleGenerateReport}
//           sx={{
//             backgroundColor: "#673ab7",
//             "&:hover": { backgroundColor: "#512da8" },
//           }}
//         >
//           Generate Report
//         </Button>

//         {/* Export Button */}
//         <Button
//           variant="contained"
//           onClick={handleExport}
//           disabled={reportData.length === 0}
//           sx={{
//             backgroundColor: "#673ab7",
//             "&:hover": { backgroundColor: "#512da8" },
//           }}
//         >
//           Export Excel
//         </Button>
//       </Stack>

//       {/* Search Bar (below filters) */}
//       <Box sx={{ mb: 2 }}>
//         <TextField
//           size="small"
//           variant="outlined"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{
//             width: "300px",
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "purple",
//               },
//               "&:hover fieldset": {
//                 borderColor: "purple",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "purple",
//               },
//             },
//           }}
//         />
//       </Box>

//       {/* Table Section */}
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress sx={{ color: "#673ab7" }} />
//         </Box>
//       ) : (
//         <Paper>
//           {/* MODIFICATION: Rows per page selector moved on top of the table */}
//           <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//             <Typography variant="body2" sx={{ mr: 1 }}>Rows per page:</Typography>
//             <FormControl size="small" variant="outlined">
//               <Select
//                 value={rowsPerPage}
//                 onChange={handleChangeRowsPerPage}
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <TableContainer sx={{ maxHeight: 600 }}>
//             <Table
//               stickyHeader
//               sx={{
//                 minWidth: 1500,
//                 "& .MuiTableCell-root": {
//                   border: "1px solid rgba(224, 224, 224, 1)",
//                 },
//               }}
//               aria-label="monthly leave report table"
//             >
//               <TableHead>
//                 <TableRow
//                   sx={{
//                     "& .MuiTableCell-head": {
//                       backgroundColor: "#E6F3FF",
//                       fontWeight: "bold",
//                       textAlign: "left",
//                     },
//                   }}
//                 >
//                   <TableCell>Sr No</TableCell>
//                   {headers.map((header) => (
//                     <TableCell key={header}>{header}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   filteredData
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row, index) => (
//                       <TableRow
//                         key={row["Employee ID"] || index}
//                         sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
//                       >
//                         <TableCell align="left">
//                           {page * rowsPerPage + index + 1}
//                         </TableCell>
//                         {headers.map((header) => {
//                           const cellValue = row[header];
//                           return (
//                             <TableCell
//                               key={`${row["Employee ID"]}-${header}`}
//                               align="left"
//                             >
//                               {cellValue === null
//                                 ? "N/A"
//                                 : header === "D.O.J"
//                                   ? formatDate(cellValue)
//                                   : cellValue}
//                             </TableCell>
//                           );
//                         })}
//                       </TableRow>
//                     ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={headers.length + 1} align="center">
//                       No data available for the selected year.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination (now without the rows per page selector) */}
//           <TablePagination
//             component="div"
//             count={filteredData.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             // MODIFICATION: Hiding the default selector
//             rowsPerPageOptions={[]}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default MonthlyAttendeceReport;





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
// import * as XLSX from "xlsx";

// // Helper function to format dates (optional but good practice)
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     // Basic check for an invalid date
//     if (isNaN(date.getTime())) return dateString; // Return original if invalid
//     return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
//   } catch (error) {
//     return dateString; // Return original on error
//   }
// };

// const MonthlyAttendeceReport = () => {
//   // State from your original component
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchTerm, setSearchTerm] = useState("");

//   // States imported from the reference component for better UX
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Generate Year Options
//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };
//   const yearOptions = generateYearOptions();

//   // Fetch Report Data
//   const handleGenerateReport = async () => {
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]); // Clear previous data
//     try {
//       const res = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/leave/monthly-report/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ year: selectedYear }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => {
//         if (!a['D.O.J']) return 1;
//         if (!b['D.O.J']) return -1;
//         return new Date(a['D.O.J']) - new Date(b['D.O.J']);
//       });

//       setReportData(sortedData);
//       setPage(0); // Reset to first page on new data fetch
//     } catch (error) {
//       console.error("Error fetching attendance report:", error);
//       setError("Failed to fetch attendance report. Please try again later.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Excel Export
//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyAttendanceReport");
//     XLSX.writeFile(workbook, `Monthly_Attendance_Report_${selectedYear}.xlsx`);
//   };

//   // Handlers for search and pagination
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Client-side filtering logic
//   const filteredData = reportData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   // Dynamic headers from data
//   const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//   // Consistent button style from reference
//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Monthly Attendance Report
//       </Typography>

//       {/* Controls Layout using Grid - same as reference */}
//       <Grid container spacing={2} mb={2} alignItems="center">
//         {/* Top-Left: Rows per Page Dropdown */}
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         {/* Center: Year Dropdown and Action Buttons */}
//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel>Year</InputLabel>
//             <Select
//               value={selectedYear}
//               label="Year"
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               {yearOptions.map((year) => (
//                 <MenuItem key={year} value={year}>{year}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle}>
//             Generate Report
//           </Button>

//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//               Export Excel
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

//       {/* Table Section */}
//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow>
//               {/* Added Sr No and dynamic headers with consistent styling */}
//               <TableCell sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>Sr No</TableCell>
//               {headers.map((header) => (
//                 <TableCell key={header} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>
//                   {header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : !hasSearched ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center">Please select a year and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row["Employee ID"] || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {headers.map((header) => (
//                     <TableCell key={`${row["Employee ID"]}-${header}`}>
//                       {header === "D.O.J"
//                         ? formatDate(row[header])
//                         : row[header] ?? "N/A"}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Bottom-Right: Custom Pagination Controls */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page - 1)}
//             disabled={page === 0}
//           >
//             Previous
//           </Button>
//           <Typography>
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page + 1)}
//             disabled={page >= pageCount - 1}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default MonthlyAttendeceReport;   ///






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
// import * as XLSX from "xlsx";

// // Helper function to format dates (optional but good practice)
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     // Basic check for an invalid date
//     if (isNaN(date.getTime())) return dateString; // Return original if invalid
//     return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
//   } catch (error) {
//     return dateString; // Return original on error
//   }
// };

// const MonthlyAttendeceReport = () => {
//   // State from your original component
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // MODIFIED: Initialize selectedYear as empty
//   const [selectedYear, setSelectedYear] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // States imported from the reference component for better UX
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Generate Year Options
//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };
//   const yearOptions = generateYearOptions();

//   // Fetch Report Data
//   const handleGenerateReport = async () => {
//     // ADDED: Validation to ensure a year is selected
//     if (!selectedYear) {
//       setError("Please select a year to generate the report.");
//       setHasSearched(true);
//       setReportData([]);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]); // Clear previous data
//     try {
//       const res = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/attendance/monthly-report/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ year: selectedYear }),
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => {
//         if (!a['D.O.J']) return 1;
//         if (!b['D.O.J']) return -1;
//         return new Date(a['D.O.J']) - new Date(b['D.O.J']);
//       });

//       setReportData(sortedData);
//       setPage(0); // Reset to first page on new data fetch
//     } catch (error) {
//       console.error("Error fetching attendance report:", error);
//       setError("Failed to fetch attendance report. Please try again later.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Excel Export
//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyAttendanceReport");
//     XLSX.writeFile(workbook, `Monthly_Attendance_Report_${selectedYear}.xlsx`);
//   };

//   // Handlers for search and pagination
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Client-side filtering logic
//   const filteredData = reportData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   // Dynamic headers from data
//   const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//   // Consistent button style from reference
//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//     "&.Mui-disabled": { // Added for better disabled state appearance
//       backgroundColor: "#b39ddb",
//       color: "#f5f5f5"
//     }
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Monthly Attendance Report
//       </Typography>

//       {/* Controls Layout using Grid - same as reference */}
//       <Grid container spacing={2} mb={2} alignItems="center">
//         {/* Top-Left: Rows per Page Dropdown */}
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         {/* Center: Year Dropdown and Action Buttons */}
//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel>Year</InputLabel>
//             <Select
//               value={selectedYear}
//               label="Year"
//               onChange={(e) => setSelectedYear(e.target.value)}
//               displayEmpty // Important for placeholder to show
//             >
//               <MenuItem value="" disabled>
//                 {/* <em>Select Year</em> */}
//               </MenuItem>
//               {yearOptions.map((year) => (
//                 <MenuItem key={year} value={year}>{year}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Button
//             variant="contained"
//             onClick={handleGenerateReport}
//             sx={purpleButtonStyle}
//             disabled={!selectedYear || loading} // MODIFIED: Disable button if no year or loading
//           >
//             Generate Report
//           </Button>

//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//               Export Excel
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

//       {/* Table Section */}
//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow>
//               {/* Added Sr No and dynamic headers with consistent styling */}
//               <TableCell sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>Sr No</TableCell>
//               {headers.map((header) => (
//                 <TableCell key={header} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>
//                   {header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : !hasSearched ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center">Please select a year and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row["Employee ID"] || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {headers.map((header) => (
//                     <TableCell key={`${row["Employee ID"]}-${header}`}>
//                       {header === "D.O.J"
//                         ? formatDate(row[header])
//                         : row[header] ?? "N/A"}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Bottom-Right: Custom Pagination Controls */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page - 1)}
//             disabled={page === 0}
//             sx={purpleButtonStyle} /* MODIFIED: Added purple style */
//           >
//             Previous
//           </Button>
//           <Typography>
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle} /* MODIFIED: Added purple style */
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default MonthlyAttendeceReport;   ///// 




// import React, { useState, useMemo } from "react";
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
//   TableFooter, // Re-added TableFooter
// } from "@mui/material";
// import * as XLSX from "xlsx";

// // Helper function to format dates
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
//     return date.toLocaleDateString("en-GB");
//   } catch (error) {
//     return dateString;
//   }
// };

// // Helper function to generate financial year options dynamically
// const generateFinancialYearOptions = () => {
//   const years = [];
//   const now = new Date();
//   const currentYear = now.getFullYear();
//   const currentMonth = now.getMonth();

//   let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//   for (let i = 0; i < 10; i++) {
//     years.push(String(latestFinancialYearStart - i));
//   }
//   return years;
// };

// const MonthlyAttendeceReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

//   const handleGenerateReport = async () => {
//     if (!selectedFinancialYear) {
//       setError("Please select a financial year to generate the report.");
//       setHasSearched(true);
//       setReportData([]);
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);
//     try {
//       const res = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/attendance/monthly-report/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ year: selectedFinancialYear }),
//         }
//       );

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();

//       const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => {
//         if (!a['D.O.J']) return 1;
//         if (!b['D.O.J']) return -1;
//         return new Date(a['D.O.J']) - new Date(b['D.O.J']);
//       });

//       setReportData(sortedData);
//       setPage(0);
//     } catch (error) {
//       console.error("Error fetching attendance report:", error);
//       setError("Failed to fetch attendance report. Please try again later.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyAttendanceReport");
//     XLSX.writeFile(workbook, `Monthly_Attendance_Report_${selectedFinancialYear}.xlsx`);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = reportData.filter((row) =>
//     Object.values(row)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

//   // FIXED: Re-added total calculation with more precise logic
//   const totals = useMemo(() => {
//     if (!filteredData.length > 0 || !headers.length > 0) return null;

//     // This list now includes all headers from your image that should not be summed
//     const nonSummableHeaders = [
//       "Employee ID", "Name", "Department", "Designation",
//       "Division", "Sub-Division", "Level", "Headquarter",
//       "Line Manager", "D.O.J."
//     ];

//     const totalRow = headers.reduce((acc, header) => {
//       // If the header is in our non-summable list, leave its total cell blank
//       if (nonSummableHeaders.includes(header)) {
//         acc[header] = "";
//       } else {
//         // Otherwise, sum the column's values
//         acc[header] = filteredData.reduce((sum, row) => {
//           const value = parseFloat(row[header]);
//           return sum + (isNaN(value) ? 0 : value);
//         }, 0);
//       }
//       return acc;
//     }, {});

//     // Intelligently place the "Total" label in the first non-summable column
//     const firstLabelColumn = headers.find(h => nonSummableHeaders.includes(h));
//     if (firstLabelColumn) {
//       totalRow[firstLabelColumn] = "Total";
//     } else if (headers.length > 0) {
//       totalRow[headers[0]] = "Total"; // Fallback
//     }

//     return totalRow;
//   }, [filteredData, headers]);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7", color: "#fff", height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//     "&.Mui-disabled": { backgroundColor: "#b39ddb", color: "#f5f5f5" }
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Monthly Attendance Report
//       </Typography>

//       <Grid container spacing={2} mb={2} alignItems="center">
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//           <FormControl sx={{ minWidth: 150 }} size="small">
//             <InputLabel>Financial Year</InputLabel>
//             <Select
//               value={selectedFinancialYear}
//               label="Financial Year"
//               onChange={(e) => setSelectedFinancialYear(e.target.value)}
//               displayEmpty
//             >
//               {financialYearOptions.map((year) => (
//                 <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={handleGenerateReport}
//             sx={purpleButtonStyle}
//             disabled={!selectedFinancialYear || loading}
//           >
//             Generate Report
//           </Button>
//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//               Export Excel
//             </Button>
//           )}
//         </Grid>
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
//               <TableCell sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>Sr No</TableCell>
//               {headers.map((header) => (
//                 <TableCell key={header} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>
//                   {header}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : !hasSearched ? (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center">Please select a financial year and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row["Employee ID"] || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {headers.map((header) => (
//                     <TableCell key={`${row["Employee ID"]}-${header}`}>
//                       {header === "D.O.J" ? formatDate(row[header]) : row[header] ?? "N/A"}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={headers.length + 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//           {/* RE-ADDED: Table Footer now renders with the corrected logic on the last page */}
//           {totals && !loading && filteredData.length > 0 && page === pageCount - 1 && (
//             <TableFooter>
//               <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f5f5f5', borderTop: '2px solid #ccc' } }}>
//                 <TableCell></TableCell>
//                 {headers.map(header => (
//                   <TableCell key={`total-${header}`}>
//                     {totals[header]}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableFooter>
//           )}
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page - 1)}
//             disabled={page === 0}
//             sx={purpleButtonStyle}
//           >
//             Previous
//           </Button>
//           <Typography>
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default MonthlyAttendeceReport;




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
  CircularProgress,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  TableFooter,
  Paper,
  Pagination,
  Skeleton,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import * as XLSX from "xlsx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-GB");
};

const generateFinancialYearOptions = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  let startYear = currentMonth >= 3 ? currentYear : currentYear - 1;
  for (let i = 0; i < 10; i++) years.push(String(startYear - i));
  return years;
};

const MonthlyAttendeceReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const primaryColor = "#8C257C";
  const primaryHoverColor = "#6d1d60";
  const secondaryColor = "#F58E35";
  const textOnPrimary = "#FFFFFF";

  const primaryButtonStyle = {
    backgroundColor: primaryColor,
    color: textOnPrimary,
    "&:hover": { backgroundColor: primaryHoverColor },
  };

  const handleGenerateReport = async () => {
    if (!selectedFinancialYear) {
      setError("Please select a financial year to generate the report.");
      setHasSearched(true);
      setReportData([]);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    setReportData([]);
    setPage(0);
    try {
      const res = await fetch("https://tdtlworld.com/hrms-backend/api/attendance/monthly-report/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year: selectedFinancialYear }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const sortedData = (Array.isArray(data) ? data : []).sort((a, b) => {
        if (!a['D.O.J']) return 1; if (!b['D.O.J']) return -1;
        return new Date(a['D.O.J']) - new Date(b['D.O.J']);
      });
      setReportData(sortedData);
    } catch (error) {
      console.error("Error fetching report:", error);
      setError("Failed to fetch attendance report. Please try again later.");
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (reportData.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyAttendanceReport");
    XLSX.writeFile(workbook, `Monthly_Attendance_Report_${selectedFinancialYear}.xlsx`);
  };

  const filteredData = reportData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };
  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];
  
  const totals = useMemo(() => {
    if (!filteredData.length || !headers.length) return null;
    const nonSummableHeaders = ["Employee ID", "Name", "Department", "Designation", "Division", "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J."];
    const totalRow = headers.reduce((acc, header) => {
      acc[header] = nonSummableHeaders.includes(header) ? "" : filteredData.reduce((sum, row) => sum + (parseFloat(row[header]) || 0), 0);
      return acc;
    }, {});
    const firstLabelColumn = headers.find(h => nonSummableHeaders.includes(h)) || headers[0];
    if (firstLabelColumn) totalRow[firstLabelColumn] = "Total";
    return totalRow;
  }, [filteredData, headers]);

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 4 }}>
        Monthly Attendance Report
      </Typography>

      <Grid container spacing={2} mb={2} alignItems="center">
        <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Financial Year</InputLabel>
            <Select
              value={selectedFinancialYear}
              label="Financial Year"
              onChange={(e) => setSelectedFinancialYear(e.target.value)}
            >
              {financialYearOptions.map((year) => (
                <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            sx={primaryButtonStyle}
            disabled={!selectedFinancialYear || loading}
          >
            Generate
          </Button>
          {reportData.length > 0 && (
            <Button variant="contained" onClick={handleExport} sx={primaryButtonStyle}>
              Export
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            InputProps={{
                startAdornment: ( <InputAdornment position="start"><SearchIcon /></InputAdornment> ),
            }}
          />
        </Grid>
      </Grid>

      <TableContainer>
        <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: primaryColor, color: textOnPrimary, fontWeight: 'bold' } }}>
              <TableCell>Sr No</TableCell>
              {headers.map((header) => ( <TableCell key={header}>{header}</TableCell> ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={headers.length + 1} align="center"><CircularProgress /></TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell colSpan={headers.length + 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
            ) : !hasSearched ? (
              <TableRow><TableCell colSpan={headers.length + 1} align="center">Please select a financial year and click Generate.</TableCell></TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={row["Employee ID"] || index} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  {headers.map((header) => (
                    <TableCell key={`${row["Employee ID"]}-${header}`}>
                      {header === "D.O.J" ? formatDate(row[header]) : row[header] ?? "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={headers.length + 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
            )}
          </TableBody>
          {totals && !loading && filteredData.length > 0 && page === Math.ceil(filteredData.length / rowsPerPage) - 1 && (
            <TableFooter>
              <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 'bold', backgroundColor: '#f0f0f0', borderTop: '2px solid #ccc' } }}>
                <TableCell></TableCell>
                {headers.map(header => ( <TableCell key={`total-${header}`}>{totals[header]}</TableCell>))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>

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
                            onChange={handleRowsPerPageChange}
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
          )
        )}
      </Box>
    </Box>
  );
};

export default MonthlyAttendeceReport;
