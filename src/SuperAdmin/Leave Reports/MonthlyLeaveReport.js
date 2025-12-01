// import React, { useEffect, useState, useMemo } from "react";
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
// } from "@mui/material";
// import * as XLSX from 'xlsx';

// const MonthlyLeaveReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchQuery, setSearchQuery] = useState("");

//   const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 5 + i);

//   // --- API Fetching Logic ---
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(
//           "https://tdtlworld.com/hrms-backend/api/leave/monthly-report/",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ year: selectedYear }),
//           }
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching monthly leave report:", err);
//         setError("Failed to load data. Please try again.");
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [selectedYear]);

//   // --- Client-side Filtering Logic ---
//   const filteredData = useMemo(() => {
//     if (!searchQuery) return reportData;
//     return reportData.filter(row =>
//       Object.values(row).some(value =>
//         String(value).toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [reportData, searchQuery]);

//   // --- Define table columns in the correct order ---
//   const columns = [
//     { id: 'Sr No', label: 'Sr No', minWidth: 70 },
//     { id: 'Employee ID', label: 'Employee ID' },
//     { id: 'Name', label: 'Name', minWidth: 170 },
//     { id: 'Department', label: 'Department' },
//     { id: 'Designation', label: 'Designation' },
//     { id: 'Division', label: 'Division' },
//     { id: 'Sub-Division', label: 'Sub-Division' },
//     { id: 'Level', label: 'Level' },
//     { id: 'Headquarter', label: 'Headquarter' },
//     { id: 'Line Manager', label: 'Line Manager' },
//     { id: 'D.O.J', label: 'D.O.J' },
//     { id: 'Jan', label: 'Jan' },
//     { id: 'Feb', label: 'Feb' },
//     { id: 'March', label: 'Mar' }, // API key is "March", display is "Mar"
//     { id: 'Apr', label: 'Apr' },
//     { id: 'May', label: 'May' },
//     { id: 'June', label: 'June' }, // API key is "June", display is "June"
//     { id: 'July', label: 'July' }, // API key is "July", display is "July"
//     { id: 'Aug', label: 'Aug' },
//     { id: 'Sept', label: 'Sept' },
//     { id: 'Oct', label: 'Oct' },
//     { id: 'Nov', label: 'Nov' },
//     { id: 'Dec', label: 'Dec' },
//     { id: 'Total', label: 'Total' },
//   ];

//   // --- Excel Export Functionality ---
//   const handleExport = () => {
//     // Reorder the keys for export to match the table display
//     const dataToExport = filteredData.map(row => {
//       const orderedRow = {};
//       columns.forEach(col => {
//         if (col.id !== 'Sr No') { // Don't export Sr No
//           orderedRow[col.label] = row[col.id] ?? '-';
//         }
//       });
//       return orderedRow;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
//     XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* --- Top Controls --- */}
//       <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold", color: '#111827' }}>
//           Monthly Leave Report
//         </Typography>
//         <Stack direction="row" spacing={2} alignItems="center">
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Year</InputLabel>
//             <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
//               {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={handleExport}
//             disabled={filteredData.length === 0}
//             sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#512da8' } }}
//           >
//             Export Report
//           </Button>
//         </Stack>
//       </Stack>

//       {/* --- Main Content --- */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress sx={{ color: '#673ab7' }} /></Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : (
//         <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
//           <Table stickyHeader sx={{ minWidth: 2800, '& .MuiTableCell-root': { border: '1px solid #e0e0e0' } }}>
//             <TableHead>
//               <TableRow>
//                 {columns.map(col => (
//                   <TableCell
//                     key={col.id}
//                     sx={{
//                       fontWeight: 'bold',
//                       backgroundColor: '#e3f2fd',
//                       textAlign: 'center',
//                       minWidth: col.minWidth
//                     }}
//                   >
//                     {col.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((row, index) => (
//                   <TableRow key={row['Employee ID'] || index} hover>
//                     {columns.map(col => {
//                       let value = col.id === 'Sr No' ? index + 1 : row[col.id];
//                       // Use 'March' key from API for 'Mar' column, etc.
//                       if (col.id === 'March') value = row['March'];
//                       if (col.id === 'June') value = row['June'];
//                       if (col.id === 'July') value = row['July'];
//                       return (
//                         <TableCell key={col.id} align={col.id === 'Sr No' || isNaN(value) ? 'left' : 'center'}>
//                           {value ?? '-'}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     {reportData.length > 0 ? "No results found" : "No data available for the selected year."}
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

// export default MonthlyLeaveReport;    ////  







// import React, { useEffect, useState, useMemo } from "react";
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
// } from "@mui/material";
// import * as XLSX from 'xlsx';

// const MonthlyLeaveReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchQuery, setSearchQuery] = useState("");

//   const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 5 + i);

//   // --- API Fetching Logic ---
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(
//           "https://tdtlworld.com/hrms-backend/api/leave/monthly-report/",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ year: selectedYear }),
//           }
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching monthly leave report:", err);
//         setError("Failed to load data. Please try again.");
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [selectedYear]);

//   // --- Client-side Filtering Logic ---
//   const filteredData = useMemo(() => {
//     if (!searchQuery) return reportData;
//     return reportData.filter(row =>
//       Object.values(row).some(value =>
//         String(value).toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [reportData, searchQuery]);

//   // --- Define table columns in the correct order ---
//   const columns = [
//     { id: 'Sr No', label: 'Sr No', minWidth: 70 },
//     { id: 'Employee ID', label: 'Employee ID' },
//     { id: 'Name', label: 'Name', minWidth: 170 },
//     { id: 'Department', label: 'Department' },
//     { id: 'Designation', label: 'Designation' },
//     { id: 'Division', label: 'Division' },
//     { id: 'Sub-Division', label: 'Sub-Division' },
//     { id: 'Level', label: 'Level' },
//     { id: 'Headquarter', label: 'Headquarter' },
//     { id: 'Line Manager', label: 'Line Manager' },
//     { id: 'D.O.J', label: 'D.O.J' },
//     { id: 'Jan', label: 'Jan' },
//     { id: 'Feb', label: 'Feb' },
//     { id: 'March', label: 'Mar' }, // API key is "March", display is "Mar"
//     { id: 'Apr', label: 'Apr' },
//     { id: 'May', label: 'May' },
//     { id: 'June', label: 'June' }, // API key is "June", display is "June"
//     { id: 'July', label: 'July' }, // API key is "July", display is "July"
//     { id: 'Aug', label: 'Aug' },
//     { id: 'Sept', label: 'Sept' },
//     { id: 'Oct', label: 'Oct' },
//     { id: 'Nov', label: 'Nov' },
//     { id: 'Dec', label: 'Dec' },
//     { id: 'Total', label: 'Total' },
//   ];

//   // --- Excel Export Functionality ---
//   const handleExport = () => {
//     // Reorder the keys for export to match the table display
//     const dataToExport = filteredData.map(row => {
//       const orderedRow = {};
//       columns.forEach(col => {
//         if (col.id !== 'Sr No') { // Don't export Sr No
//           orderedRow[col.label] = row[col.id] ?? '-';
//         }
//       });
//       return orderedRow;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
//     XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* --- Top Controls --- */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold", color: '#111827', mb: 2 }}>
//           Monthly Leave Report
//         </Typography>
//         <Stack direction="row" spacing={2} alignItems="center">
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Year</InputLabel>
//             <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
//               {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={handleExport}
//             disabled={filteredData.length === 0}
//             sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#512da8' } }}
//           >
//             Export Report
//           </Button>
//         </Stack>
//       </Box>

//       {/* --- Main Content --- */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress sx={{ color: '#673ab7' }} /></Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : (
//         <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
//           <Table stickyHeader sx={{ minWidth: 2800, '& .MuiTableCell-root': { border: '1px solid #e0e0e0' } }}>
//             <TableHead>
//               <TableRow>
//                 {columns.map(col => (
//                   <TableCell
//                     key={col.id}
//                     sx={{
//                       fontWeight: 'bold',
//                       backgroundColor: '#e3f2fd',
//                       textAlign: 'center',
//                       minWidth: col.minWidth
//                     }}
//                   >
//                     {col.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((row, index) => (
//                   <TableRow key={row['Employee ID'] || index} hover>
//                     {columns.map(col => {
//                       let value = col.id === 'Sr No' ? index + 1 : row[col.id];
//                       // Use 'March' key from API for 'Mar' column, etc.
//                       if (col.id === 'March') value = row['March'];
//                       if (col.id === 'June') value = row['June'];
//                       if (col.id === 'July') value = row['July'];
//                       return (
//                         <TableCell key={col.id} align={col.id === 'Sr No' || isNaN(value) ? 'left' : 'center'}>
//                           {value ?? '-'}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     {reportData.length > 0 ? "No results found" : "No data available for the selected year."}
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

// export default MonthlyLeaveReport;    //// 





// import React, { useState, useMemo } from "react";
// import {
//   Box, Typography, Table, TableBody, TableCell, TableContainer, Container,
//   TableHead, TableRow, CircularProgress, Alert, Grid, FormControl,
//   InputLabel, Select, MenuItem, TextField, Button, Paper,
// } from "@mui/material";
// import * as XLSX from 'xlsx';

// const MonthlyLeaveReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // MODIFIED: Generate years in descending order (e.g., 2024, 2023, 2022...)
//   const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

//   const handleGenerateReport = async () => {
//     if (!selectedYear) {
//       setError("Please select a year to generate the report.");
//       setHasSearched(true);
//       setReportData([]);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);
//     try {
//       const res = await fetch("https://tdtlworld.com/hrms-backend/api/leave/monthly-report/", {
//         method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ year: selectedYear }),
//       });
//       if (!res.ok) { throw new Error(`HTTP error! Status: ${res.status}`); }
//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching monthly leave report:", err);
//       setError("Failed to load data. Please try again.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//       setPage(0);
//     }
//   };

//   const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
//   const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

//   const filteredData = useMemo(() => {
//     if (!searchTerm) return reportData;
//     return reportData.filter(row =>
//       Object.values(row).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   }, [reportData, searchTerm]);

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const columns = [
//     { id: 'Sr No', label: 'Sr No' }, { id: 'Employee ID', label: 'Employee ID' }, { id: 'Name', label: 'Name' },
//     { id: 'Department', label: 'Department' }, { id: 'Designation', label: 'Designation' }, { id: 'Division', label: 'Division' },
//     { id: 'Sub-Division', label: 'Sub-Division' }, { id: 'Level', label: 'Level' }, { id: 'Headquarter', label: 'Headquarter' },
//     { id: 'Line Manager', label: 'Line Manager' }, { id: 'D.O.J', label: 'D.O.J' }, { id: 'Jan', label: 'Jan' },
//     { id: 'Feb', label: 'Feb' }, { id: 'March', label: 'Mar' }, { id: 'Apr', label: 'Apr' }, { id: 'May', label: 'May' },
//     { id: 'June', label: 'June' }, { id: 'July', label: 'July' }, { id: 'Aug', label: 'Aug' }, { id: 'Sept', label: 'Sept' },
//     { id: 'Oct', label: 'Oct' }, { id: 'Nov', label: 'Nov' }, { id: 'Dec', label: 'Dec' }, { id: 'Total', label: 'Total' },
//   ];
//   const totalColumnCount = columns.length;

//   const handleExport = () => {
//     const dataToExport = filteredData.map((row, index) => {
//       const orderedRow = { "Sr No": index + 1 };
//       columns.slice(1).forEach(col => { orderedRow[col.label] = row[col.id] ?? '-'; });
//       return orderedRow;
//     });
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
//     XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
//   };

//   const purpleButtonStyle = { backgroundColor: "#673ab7", color: "#fff", height: 40, "&:hover": { backgroundColor: "#5e35b1" } };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>Monthly Leave Report</Typography>
//       <Grid container spacing={2} mb={2} alignItems="center">
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem><MenuItem value={100}>100</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel>Year</InputLabel>
//             <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)} displayEmpty>
//               <MenuItem value="" disabled><em></em></MenuItem>
//               {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//             </Select>
//           </FormControl>
//           <Button variant="contained" onClick={handleGenerateReport} sx={purpleButtonStyle} disabled={!selectedYear || loading}>Generate Report</Button>
//           <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>Export Report</Button>
//         </Grid>
//         <Grid item xs={12} sm={12} md={2}>
//           <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper} sx={{ maxHeight: 700, borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader sx={{ minWidth: 2800, '& .MuiTableCell-root': { border: '1px solid #e0e0e0' } }}>
//           <TableHead>
//             <TableRow>
//               {columns.map(col => (
//                 <TableCell key={col.id} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>
//                   {col.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (<TableRow><TableCell colSpan={totalColumnCount} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (<TableRow><TableCell colSpan={totalColumnCount} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : !hasSearched ? (<TableRow><TableCell colSpan={totalColumnCount} align="center">Please select a year and click Generate Report.</TableCell></TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row['Employee ID'] || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   {columns.map(col => {
//                     const value = col.id === 'Sr No' ? page * rowsPerPage + index + 1 : row[col.id];
//                     return (
//                       <TableCell key={col.id} align={col.id === 'Sr No' || isNaN(value) ? 'left' : 'center'}>
//                         {value ?? '-'}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))
//             ) : (<TableRow><TableCell colSpan={totalColumnCount} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//             <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//             <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//           </Box>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default MonthlyLeaveReport;











import React, { useState, useMemo } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Alert, Stack,
  FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
  Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import * as XLSX from 'xlsx';

const MonthlyLeaveReport = () => {
  // --- Hooks for State, Theme, and Responsiveness ---
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryColor = "#8C257C";
  const primaryButtonHover = "#6d1d60";
  const secondaryColor = "#F58E35";

  // --- Data Fetching ---
  const handleGenerateReport = async () => {
    if (!selectedYear) {
      setError("Please select a year to generate the report.");
      setHasSearched(true);
      setReportData([]);
      return;
    }
    setLoading(true); setError(null); setHasSearched(true); setReportData([]);
    try {
      const res = await fetch("https://tdtlworld.com/hrms-backend/api/leave/monthly-report/", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ year: selectedYear }),
      });
      if (!res.ok) { throw new Error(`HTTP error! Status: ${res.status}`); }
      const data = await res.json();
      setReportData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching monthly leave report:", err);
      setError("Failed to load data. Please try again.");
      setReportData([]);
    } finally {
      setLoading(false);
      setPage(0);
    }
  };

  // --- Constants and Options ---
  const yearOptions = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
  const columns = [
    { id: 'Sr No', label: 'Sr No' }, { id: 'Employee ID', label: 'Employee ID' }, { id: 'Name', label: 'Name' },
    { id: 'Department', label: 'Department' }, { id: 'Designation', label: 'Designation' }, { id: 'Division', label: 'Division' },
    { id: 'Sub-Division', label: 'Sub-Division' }, { id: 'Level', label: 'Level' }, { id: 'Headquarter', label: 'Headquarter' },
    { id: 'Line Manager', label: 'Line Manager' }, { id: 'D.O.J', label: 'D.O.J' }, { id: 'Jan', label: 'Jan' },
    { id: 'Feb', label: 'Feb' }, { id: 'March', label: 'Mar' }, { id: 'Apr', label: 'Apr' }, { id: 'May', label: 'May' },
    { id: 'June', label: 'June' }, { id: 'July', label: 'July' }, { id: 'Aug', label: 'Aug' }, { id: 'Sept', label: 'Sept' },
    { id: 'Oct', label: 'Oct' }, { id: 'Nov', label: 'Nov' }, { id: 'Dec', label: 'Dec' }, { id: 'Total', label: 'Total' },
  ];

  // --- Memoized Calculations & Event Handlers ---
  const filteredData = useMemo(() => reportData.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))), [reportData, searchTerm]);
  const paginatedData = useMemo(() => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredData, page, rowsPerPage]);

  const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
  const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
  const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

  // --- EXPORT FUNCTIONALITY ---
  const handleExport = () => {
    const dataToExport = filteredData.map((row, index) => {
      const orderedRow = { "Sr No": index + 1 };
      columns.slice(1).forEach(col => { orderedRow[col.label] = row[col.id] ?? '-'; });
      return orderedRow;
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyLeaveReport");
    XLSX.writeFile(workbook, `Monthly_Leave_Report_${selectedYear}.xlsx`);
  };

  // --- STYLING & CONSTANTS ---
  const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center', border: '1px solid #ddd' };
  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>Monthly Leave Report</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2}>
          <FormControl size="small" sx={{ minWidth: 200, flexGrow: 1 }}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
              {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
          <Button variant="contained" onClick={handleGenerateReport} disabled={!selectedYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>Generate Report</Button>
          <Button variant="outlined" onClick={handleExport} startIcon={<GridOnIcon />} disabled={filteredData.length === 0} sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>Export</Button>
        </Stack>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {hasSearched && (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 700, overflowX: 'auto' }}>
            <Table stickyHeader sx={{ minWidth: 2800 }}>
              <TableHead>
                <TableRow>
                  {columns.map(col => (<TableCell key={col.id} sx={headerCellStyle}>{col.label}</TableCell>))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [...Array(rowsPerPage)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map(col => <TableCell key={col.id}><Skeleton variant="text" /></TableCell>)}
                    </TableRow>
                  ))
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <TableRow key={row['Employee ID'] || index} hover>
                      {columns.map(col => {
                        const value = col.id === 'Sr No' ? page * rowsPerPage + index + 1 : row[col.id];
                        return (
                          <TableCell key={col.id} align={isNaN(value) ? 'left' : 'center'}>
                            {value ?? '-'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={columns.length} align="center">{error ? error : "No data available for the selected criteria."}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredData.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl variant="outlined" size="small">
                    <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: '#8C257C', color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: '#8C257C' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                      {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <Typography variant="body2" color="text.secondary">{`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}</Typography>
                </Box>
                <TextField size="small" variant="outlined" placeholder="Search in results..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
                <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default MonthlyLeaveReport;