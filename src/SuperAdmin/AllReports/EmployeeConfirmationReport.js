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
//   // Using Paper for better container styling
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper function to format dates
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   // Basic check for an invalid date
//   if (isNaN(date.getTime())) return "N/A";
//   return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// // Helper function to interpret employee status
// const formatStatus = (status) => {
//   if (status === 1) return "Active";
//   if (status === 0) return "Inactive";
//   return "N/A";
// };

// const EmployeeConfirmationReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // State for filters and pagination
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Function to fetch data when the "Generate Report" button is clicked
//   const handleFetchReport = async () => {
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);
//     try {
//       const response = await axiosInstance.get(
//         `/apis/get_employee_confirmation_get_report/?year=${selectedYear}`
//       );
//       // The actual data is inside the 'data' key of the response
//       const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//       setReportData(rawData);
//     } catch (err) {
//       setError("Failed to fetch confirmation report. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle exporting the report to an Excel file
//   const handleExport = () => {
//     if (reportData.length === 0) return;

//     // Prepare data for export, including SR. NO. and formatted values
//     const dataToExport = reportData.map((row, index) => ({
//       "SR. NO.": index + 1,
//       "Employee ID": row.employee_id || "N/A",
//       "Employee Name": row.employee_name || "N/A",
//       "Department": row.department_name || "N/A",
//       "Designation": row.designation_name || "N/A",
//       "Division": row.division_name || "N/A",
//       "Manager Name": row.manager_name?.trim() || "N/A",
//       "Date of Joining": formatDate(row.date_of_joining),
//       "Phase 1 Total": row.phase1_total,
//       "Phase 2 Total": row.phase2_total,
//       "Phase 3 Total": row.phase3_total,
//       "Phase 4 Total": row.phase4_total,
//       "Average Score": row.average_score,
//       "KRA/KPI Total": row.kra_kpi_total,
//       "Status": formatStatus(row.employee_status),
//       "Confirmation Date": formatDate(row.confirmation_date),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "ConfirmationReport");
//     XLSX.writeFile(workbook, `EmployeeConfirmationReport_${selectedYear}.xlsx`);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to first page on new search
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Client-side filtering logic
//   const filteredData = reportData.filter((row) => {
//     const s = searchTerm.toLowerCase();
//     // Search across multiple relevant fields
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

//   const currentYear = new Date().getFullYear();
//   const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + 1 - i); // Future and past years

//   const columns = [
//     { id: "sr_no", label: "SR. NO." },
//     { id: "employee_id", label: "Employee ID" },
//     { id: "employee_name", label: "Employee Name" },
//     { id: "department_name", label: "Department" },
//     { id: "designation_name", label: "Designation" },
//     { id: "division_name", label: "Division" },
//     { id: "manager_name", label: "Manager" },
//     { id: "date_of_joining", label: "Joining Date" },
//     { id: "phase1_total", label: "Phase 1" },
//     { id: "phase2_total", label: "Phase 2" },
//     { id: "phase3_total", label: "Phase 3" },
//     { id: "phase4_total", label: "Phase 4" },
//     { id: "average_score", label: "Average Score" },
//     { id: "kra_kpi_total", label: "KRA/KPI Total" },
//     { id: "employee_status", label: "Status" },
//     { id: "confirmation_date", label: "Confirmation Date" },
//   ];

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//      <Container disableGutters>

//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Employee Confirmation Report
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

//           <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle}>
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
//               <TableRow><TableCell colSpan={columns.length} align="center">Please select a year and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.user_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.employee_id || "N/A"}</TableCell>
//                   <TableCell>{row.employee_name || "N/A"}</TableCell>
//                   <TableCell>{row.department_name || "N/A"}</TableCell>
//                   <TableCell>{row.designation_name || "N/A"}</TableCell>
//                   <TableCell>{row.division_name || "N/A"}</TableCell>
//                   <TableCell>{row.manager_name?.trim() || "N/A"}</TableCell>
//                   <TableCell>{formatDate(row.date_of_joining)}</TableCell>
//                   <TableCell>{row.phase1_total}</TableCell>
//                   <TableCell>{row.phase2_total}</TableCell>
//                   <TableCell>{row.phase3_total}</TableCell>
//                   <TableCell>{row.phase4_total}</TableCell>
//                   <TableCell>{row.average_score}</TableCell>
//                   <TableCell>{row.kra_kpi_total ?? "N/A"}</TableCell>
//                   <TableCell>{formatStatus(row.employee_status)}</TableCell>
//                   <TableCell>{formatDate(row.confirmation_date)}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Bottom-Right: Pagination Controls */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page - 1)}
//             disabled={page === 0}  sx={{
//    backgroundColor: "#9c27b0", // vibrant purple
//    "&:hover": { backgroundColor: "#7b1fa2" },}}
//           >
//             Previous
//           </Button>
//           <Typography>
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setPage(page + 1)}
//             disabled={page >= pageCount - 1}  sx={{
//    backgroundColor: "#9c27b0", // vibrant purple
//    "&:hover": { backgroundColor: "#7b1fa2" },}}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>

//     </Container>
//   );
// };

// export default EmployeeConfirmationReport;     ///




// import React, { useState, useMemo } from "react"; // Added useMemo
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
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper function to format dates
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "N/A";
//   return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// // Helper function to interpret employee status
// const formatStatus = (status) => {
//   if (status === 1) return "Active";
//   if (status === 0) return "Inactive";
//   return "N/A";
// };

// // NEW: Helper function to generate financial year options dynamically
// const generateFinancialYearOptions = () => {
//   const years = [];
//   const now = new Date();
//   const currentYear = now.getFullYear();
//   const currentMonth = now.getMonth(); // 0 = January, 3 = April

//   // Financial year starts in April. If current month is Jan-Mar, the FY started last year.
//   let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//   // Generate last 6 financial years
//   for (let i = 0; i < 6; i++) {
//     years.push(String(latestFinancialYearStart - i));
//   }
//   return years;
// };

// const EmployeeConfirmationReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // State for filters and pagination
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Function to fetch data when the "Generate Report" button is clicked
//   const handleFetchReport = async () => {
//     // Validation to ensure a year is selected
//     if (!selectedFinancialYear) {
//       setError("Please select a financial year.");
//       setHasSearched(true);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);
//     try {
//       const response = await axiosInstance.get(
//         `/apis/get_employee_confirmation_get_report/?year=${selectedFinancialYear}`
//       );
//       // Corrected the path to the data array in the response
//       const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//       setReportData(rawData);
//     } catch (err) {
//       setError("Failed to fetch confirmation report. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle exporting the report to an Excel file
//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     const dataToExport = reportData.map((row, index) => ({
//       "SR. NO.": index + 1,
//       "Employee ID": row.employee_id || "N/A",
//       "Employee Name": row.employee_name || "N/A",
//       "Department": row.department_name || "N/A",
//       "Designation": row.designation_name || "N/A",
//       "Division": row.division_name || "N/A",
//       "Sub Division": row.sub_division || "N/A",
//       "Level": row.level || "N/A",
//       "Headquarter": row.headquarter || "N/A",
//       "Manager Name": row.manager_name?.trim() || "N/A",
//       "Date of Joining": formatDate(row.date_of_joining),
//       "Phase 1 Total": row.phase1_total,
//       "Phase 2 Total": row.phase2_total,
//       "Phase 3 Total": row.phase3_total,
//       "Phase 4 Total": row.phase4_total,
//       "Average Score": row.average_score,
//       "KRA/KPI Total": row.kra_kpi_total,
//       "Status": formatStatus(row.employee_status),
//       "Confirmation Date": formatDate(row.confirmation_date),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "ConfirmationReport");
//     XLSX.writeFile(workbook, `EmployeeConfirmationReport_${selectedFinancialYear}.xlsx`);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

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

//   const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

//   // Columns updated to include new fields
//   const columns = [
//     { id: "sr_no", label: "SR. NO." },
//     { id: "employee_id", label: "Employee ID" },
//     { id: "employee_name", label: "Employee Name" },
//     { id: "department_name", label: "Department" },
//     { id: "designation_name", label: "Designation" },
//     { id: "division_name", label: "Division" },
//     { id: "sub_division", label: "Sub Division" },
//     { id: "level", label: "Level" },
//     { id: "headquarter", label: "Headquarter" },
//     { id: "manager_name", label: "Manager" },
//     { id: "date_of_joining", label: "Joining Date" },
//     { id: "phase1_total", label: "Phase 1" },
//     { id: "phase2_total", label: "Phase 2" },
//     { id: "phase3_total", label: "Phase 3" },
//     { id: "phase4_total", label: "Phase 4" },
//     { id: "average_score", label: "Average Score" },
//     { id: "kra_kpi_total", label: "KRA/KPI Total" },
//     { id: "employee_status", label: "Status" },
//     { id: "confirmation_date", label: "Confirmation Date" },
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
//         Employee Confirmation Report
//       </Typography>

//       <Grid container spacing={2} mb={2} alignItems="center">
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

//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//           <FormControl sx={{ minWidth: 150 }} size="small">
//             <InputLabel>Financial Year</InputLabel>
//             <Select
//               value={selectedFinancialYear}
//               label="Financial Year"
//               onChange={(e) => setSelectedFinancialYear(e.target.value)}
//             >
//               {financialYearOptions.map((year) => (
//                 <MenuItem key={year} value={year}>
//                   {`${year}-${parseInt(year) + 1}`}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Button
//             variant="contained"
//             onClick={handleFetchReport}
//             sx={purpleButtonStyle}
//             disabled={!selectedFinancialYear || loading}
//           >
//             Generate Report
//           </Button>

//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//               Export Report
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
//               <TableRow><TableCell colSpan={columns.length} align="center">Please select a financial year and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.user_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   {/* TableCells are now correctly mapped to the JSON response including new fields */}
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.employee_id ?? "N/A"}</TableCell>
//                   <TableCell>{row.employee_name ?? "N/A"}</TableCell>
//                   <TableCell>{row.department_name ?? "N/A"}</TableCell>
//                   <TableCell>{row.designation_name ?? "N/A"}</TableCell>
//                   <TableCell>{row.division_name ?? "N/A"}</TableCell>
//                   <TableCell>{row.sub_division ?? "N/A"}</TableCell>
//                   <TableCell>{row.level ?? "N/A"}</TableCell>
//                   <TableCell>{row.headquarter ?? "N/A"}</TableCell>
//                   <TableCell>{row.manager_name?.trim() ?? "N/A"}</TableCell>
//                   <TableCell>{formatDate(row.date_of_joining)}</TableCell>
//                   <TableCell>{row.phase1_total ?? "N/A"}</TableCell>
//                   <TableCell>{row.phase2_total ?? "N/A"}</TableCell>
//                   <TableCell>{row.phase3_total ?? "N/A"}</TableCell>
//                   <TableCell>{row.phase4_total ?? "N/A"}</TableCell>
//                   <TableCell>{row.average_score ?? "N/A"}</TableCell>
//                   <TableCell>{row.kra_kpi_total ?? "N/A"}</TableCell>
//                   <TableCell>{formatStatus(row.employee_status)}</TableCell>
//                   <TableCell>{formatDate(row.confirmation_date)}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
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

// export default EmployeeConfirmationReport;









import React, { useState, useMemo, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Alert, Stack,
  FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
  Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
import * as XLSX from "xlsx";

// --- HELPER FUNCTIONS (No Change) ---
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-GB");
};
const formatStatus = (status) => {
  if (status === 1) return "Active";
  if (status === 0) return "Inactive";
  return "N/A";
};
const generateFinancialYearOptions = () => {
  const years = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
  for (let i = 0; i < 6; i++) {
    years.push(String(latestFinancialYearStart - i));
  }
  return years;
};

const EmployeeConfirmationReport = () => {
  // --- Hooks for State, Theme, and Responsiveness ---
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryColor = "#8C257C";
  const primaryButtonHover = "#6d1d60";
  const secondaryColor = "#F58E35";
  
  const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
  
  // --- Data Fetching and Effects ---
  const handleFetchReport = async () => {
    if (!selectedFinancialYear) {
      setError("Please select a financial year.");
      setHasSearched(true);
      setReportData([]);
      return;
    }
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setReportData([]);
    try {
      const response = await axiosInstance.get(`/apis/get_employee_confirmation_get_report/?year=${selectedFinancialYear}`);
      const rawData = Array.isArray(response.data.data) ? response.data.data : [];
      setReportData(rawData);
    } catch (err) {
      setError("Failed to fetch confirmation report. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      setPage(0);
    }
  };

  // --- Memoized Calculations for Performance ---
  const filteredData = useMemo(() => {
    if (!searchTerm) return reportData;
    const s = searchTerm.toLowerCase();
    return reportData.filter((row) =>
        Object.values(row).some(value => 
            String(value).toLowerCase().includes(s)
        )
    );
  }, [reportData, searchTerm]);

  const paginatedData = useMemo(() => {
      return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  // --- Event Handlers ---
  const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
  const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

  // --- EXPORT FUNCTIONALITY ---
  const handleExportExcel = () => {
    const dataToExport = filteredData.map((row, index) => ({
      "SR. NO.": index + 1, "Employee ID": row.employee_id, "Employee Name": row.employee_name,
      "Department": row.department_name, "Designation": row.designation_name, "Division": row.division_name,
      "Sub Division": row.sub_division, "Level": row.level, "Headquarter": row.headquarter,
      "Manager Name": row.manager_name?.trim(), "Date of Joining": formatDate(row.date_of_joining),
      "Phase 1 Total": row.phase1_total, "Phase 2 Total": row.phase2_total, "Phase 3 Total": row.phase3_total,
      "Phase 4 Total": row.phase4_total, "Average Score": row.average_score, "KRA/KPI Total": row.kra_kpi_total,
      "Status": formatStatus(row.employee_status), "Confirmation Date": formatDate(row.confirmation_date),
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ConfirmationReport");
    XLSX.writeFile(workbook, `EmployeeConfirmationReport_${selectedFinancialYear}.xlsx`);
  };

  const columns = [
    "SR. NO.", "Employee ID", "Employee Name", "Department", "Designation", "Division",
    "Sub Division", "Level", "Headquarter", "Manager", "Joining Date", "Phase 1", "Phase 2",
    "Phase 3", "Phase 4", "Average Score", "KRA/KPI Total", "Status", "Confirmation Date",
  ];
  const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };
  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
        Employee Confirmation Report
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>Financial Year</InputLabel>
            <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
              {financialYearOptions.map((year) => (
                <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleFetchReport} disabled={!selectedFinancialYear || loading}
            sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
            Generate Report
          </Button>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
          <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />} disabled={filteredData.length === 0}
            sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
            Export to Excel
          </Button>
          <TextField size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
            sx={{ width: isMobile ? '100%' : 'auto' }} />
        </Stack>
      </Paper>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>{columns.map((label) => <TableCell key={label} sx={headerCellStyle}>{label}</TableCell>)}</TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(rowsPerPage)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {[...Array(columns.length)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                </TableRow>
              ))
            ) : error ? (
              <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
            ) : !hasSearched ? (
              <TableRow><TableCell colSpan={columns.length} align="center">Please select a financial year and click Generate.</TableCell></TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={row.user_id || index} hover>
                  <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.employee_id ?? "N/A"}</TableCell>
                  <TableCell>{row.employee_name ?? "N/A"}</TableCell>
                  <TableCell>{row.department_name ?? "N/A"}</TableCell>
                  <TableCell>{row.designation_name ?? "N/A"}</TableCell>
                  <TableCell>{row.division_name ?? "N/A"}</TableCell>
                  <TableCell>{row.sub_division ?? "N/A"}</TableCell>
                  <TableCell>{row.level ?? "N/A"}</TableCell>
                  <TableCell>{row.headquarter ?? "N/A"}</TableCell>
                  <TableCell>{row.manager_name?.trim() ?? "N/A"}</TableCell>
                  <TableCell>{formatDate(row.date_of_joining)}</TableCell>
                  <TableCell align="center">{row.phase1_total ?? "N/A"}</TableCell>
                  <TableCell align="center">{row.phase2_total ?? "N/A"}</TableCell>
                  <TableCell align="center">{row.phase3_total ?? "N/A"}</TableCell>
                  <TableCell align="center">{row.phase4_total ?? "N/A"}</TableCell>
                  <TableCell align="center">{row.average_score ?? "N/A"}</TableCell>
                  <TableCell align="center">{row.kra_kpi_total ?? "N/A"}</TableCell>
                  <TableCell>{formatStatus(row.employee_status)}</TableCell>
                  <TableCell>{formatDate(row.confirmation_date)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="rectangular" width={300} height={40} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl variant="outlined" size="small">
                <Select value={rowsPerPage} onChange={handleRowsPerPageChange}
                  sx={{ backgroundColor: '#8C257C', color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: '#8C257C' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                  {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">{`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}</Typography>
            </Box>
            <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
              sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeConfirmationReport;