// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
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
//   Paper,
//   Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper to format date strings
// const formatDate = (dateString) => {
//   if (!dateString || dateString === "NA") return "N/A";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "N/A";
//   return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// const AnnualAppraisalReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true); // Start loading initially
//   const [error, setError] = useState(null);

//   // State for pagination and search
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Fetch data when the component mounts
//   useEffect(() => {
//     const fetchReport = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axiosInstance.get("/api/annual-appraisal-report/");
//         if (response.data && response.data.status === "success") {
//           const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//           setReportData(rawData);
//         } else {
//           throw new Error("Invalid response format from server.");
//         }
//       } catch (err) {
//         setError("Failed to fetch annual appraisal report. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReport();
//   }, []); // Empty dependency array means this runs only once on mount

//   // Function to handle exporting the report to an Excel file
//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     // The API provides user-friendly keys, we just add a serial number
//     const dataToExport = reportData.map((row, index) => ({
//       "SR. NO.": index + 1,
//       ...row,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Annual_Appraisal_Report");
//     XLSX.writeFile(workbook, `Annual_Appraisal_Report.xlsx`);
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
//   const filteredData = reportData.filter((row) =>
//     Object.values(row).some(value => 
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   // Define columns based on the keys in the response for consistent ordering
//   const columns = [
//     "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division",
//     "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J", "KIP Ach %",
//     "KRA Ach %", "Total Ach %", "Final Rating", "LM Feedback", "HOD Feedback",
//     "HR Feedback", "Employee Comment", "Reccommended Action", "% of Increment", "Status"
//   ];

//   const purpleButtonStyle = {
//     backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
//     '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
//     '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
//     '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//   };

//   return (
//     <Container disableGutters>
//       {/* --- HEADER & EXPORT BUTTON --- */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h6" fontWeight="bold">
//           Annual Appraisal Report
//         </Typography>
//         {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//                 Export Report
//             </Button>
//         )}
//       </Box>

//       {/* --- VIEW CONTROLS BAR (Rows and Search) --- */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <FormControl variant="outlined" size="small" sx={{minWidth: 120}}>
//           <InputLabel>Rows</InputLabel>
//           <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField 
//           variant="outlined" 
//           size="small" 
//           placeholder="Search..." 
//           value={searchTerm} 
//           onChange={handleSearchChange}
//           sx={{width: 300}}
//         />
//       </Box>

//       {/* --- TABLE & PAGINATION --- */}
//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }} >
//           <TableHead>
//             <TableRow>
//               {columns.map((colName) => <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>)}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : filteredData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {columns.slice(1).map(colName => (
//                     <TableCell key={colName}>{colName.includes("D.O.J") ? formatDate(row[colName]) : row[colName] ?? 'N/A'}</TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={columns.length} align="center">No data available.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//           <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//           <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AnnualAppraisalReport;    ////  













// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper to format date strings
// const formatDate = (dateString) => {
//   if (!dateString || dateString === "NA") return "NA";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "NA";
//   return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// const AnnualAppraisalReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [reportGenerated, setReportGenerated] = useState(false);

//   // State for pagination and search
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Fetch data function, to be called on button click
//   const fetchReport = async () => {
//     setLoading(true);
//     setError(null);
//     setReportData([]);
//     try {
//       const response = await axiosInstance.get("/api/annual-appraisal-report/");
//       if (response.data && response.data.status === "success") {
//         const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//         setReportData(rawData);
//       } else {
//         throw new Error("Invalid response format from server.");
//       }
//     } catch (err) {
//       // BUG FIX: The following lines were previously outside the catch block's curly braces.
//       // They have been moved inside to correctly handle errors.
//       setError("Failed to fetch annual appraisal report. Please try again later.");
//       console.error("Error fetching report:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateReport = () => {
//     setReportGenerated(true);
//     fetchReport();
//   };

//   // Function to handle exporting the report to an Excel file
//   const handleExport = () => {
//     // IMPROVEMENT: Export the 'filteredData' so the export matches the user's search.
//     if (filteredData.length === 0) return;

//     const dataToExport = filteredData.map((row, index) => ({
//       "SR. NO.": index + 1, // Use the index from the filtered array for correct numbering
//       ...row,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Annual_Appraisal_Report");
//     XLSX.writeFile(workbook, `Annual_Appraisal_Report.xlsx`);
//   };

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
//     Object.values(row).some(value =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   // Define columns based on the keys in the response for consistent ordering
//   const columns = [
//     "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division",
//     "Sub-Division", "Level", "Headquarter", "Line Manager", "D.O.J", "KIP Ach %",
//     "KRA Ach %", "Total Ach %", "Final Rating", "LM Feedback", "HOD Feedback",
//     "HR Feedback", "Employee Comment", "Reccommended Action", "% of Increment", "Status"
//   ];

//   const purpleButtonStyle = {
//     backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
//     '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
//     '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
//     '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//   };

//   // Style for the "NA" text to make it lighter
//   const naTextStyle = { color: 'rgba(0, 0, 0, 0.54)' };

//   return (
//     <Container disableGutters>
//       {/* --- HEADER --- */}
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h6" fontWeight="bold" textAlign="center">
//           Annual Appraisal Report
//         </Typography>
//       </Box>
      
//       {/* --- ACTION BUTTONS (CENTERED) --- */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
//         <Button 
//             variant="contained" 
//             onClick={handleGenerateReport} 
//             sx={purpleButtonStyle} 
//             disabled={loading}
//         >
//             {loading ? 'Generating...' : 'Generate Report'}
//         </Button>
//         {reportGenerated && reportData.length > 0 && (
//             <Button 
//                 variant="contained" 
//                 onClick={handleExport} 
//                 sx={purpleButtonStyle}
//                 disabled={loading || filteredData.length === 0}
//             >
//                 Export Report
//             </Button>
//         )}
//       </Box>

//       {/* --- VIEW CONTROLS BAR (Rows and Search) --- */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <FormControl variant="outlined" size="small" sx={{minWidth: 120}}>
//           <InputLabel>Rows</InputLabel>
//           <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{width: 300}}
//           disabled={!reportGenerated || loading}
//         />
//       </Box>

//       {/* --- TABLE & PAGINATION --- */}
//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }} >
//           <TableHead>
//             <TableRow>
//               {columns.map((colName) => <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>)}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {!reportGenerated ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   Click 'Generate Report' to view data.
//                 </TableCell>
//               </TableRow>
//             ) : loading ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : filteredData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {columns.slice(1).map(colName => {
//                     const value = colName.includes("D.O.J") ? formatDate(row[colName]) : (row[colName] ?? 'NA');
//                     return (
//                       <TableCell key={colName} sx={value === 'NA' ? naTextStyle : {}}>
//                         {value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   {searchTerm ? `No results found for "${searchTerm}"` : "No data available."}
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Conditionally render pagination */}
//       {reportGenerated && !loading && filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//             <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//             <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//           </Box>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default AnnualAppraisalReport;











import React, { useState, useMemo } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from "xlsx";

// --- HELPER FUNCTION (No Change) ---
const formatDate = (dateString) => {
    if (!dateString || dateString === "NA") return "NA";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "NA";
    return date.toLocaleDateString("en-GB");
};

const AnnualAppraisalReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reportGenerated, setReportGenerated] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    const fetchReport = async () => {
        setLoading(true);
        setError(null);
        setReportData([]);
        try {
            const response = await axiosInstance.get("/api/annual-appraisal-report/");
            if (response.data?.status === "success" && Array.isArray(response.data.data)) {
                setReportData(response.data.data);
            } else {
                throw new Error("Invalid response format from server.");
            }
        } catch (err) {
            setError("Failed to fetch annual appraisal report. Please try again later.");
            console.error("Error fetching report:", err);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    const handleGenerateReport = () => {
        setReportGenerated(true);
        fetchReport();
    };

    // --- Memoized Calculations for Performance ---
    const filteredData = useMemo(() => {
        if (!searchTerm) return reportData;
        return reportData.filter((row) =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
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
    const handleExport = () => {
        if (filteredData.length === 0) return;
        const dataToExport = filteredData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Annual_Appraisal_Report");
        XLSX.writeFile(workbook, `Annual_Appraisal_Report.xlsx`);
    };

    const columns = [
        "Sr No.", "Employee ID", "Name", "Department", "Designation", "Division", "Sub-Division", "Level",
        "Headquarter", "Line Manager", "D.O.J", "KIP Ach %", "KRA Ach %", "Total Ach %", "Final Rating",
        "LM Feedback", "HOD Feedback", "HR Feedback", "Employee Comment", "Reccommended Action",
        "% of Increment", "Status"
    ];
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Annual Appraisal Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} mb={2}>
                    <Button variant="contained" onClick={handleGenerateReport} disabled={loading}
                        sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        {loading ? 'Generating...' : 'Generate Report'}
                    </Button>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="outlined" onClick={handleExport} startIcon={<GridOnIcon />}
                        disabled={!reportGenerated || loading || filteredData.length === 0}
                        sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export Report
                    </Button>
                    <TextField size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
                        disabled={!reportGenerated || loading} sx={{ width: isMobile ? '100%' : 'auto' }} />
                </Stack>
            </Paper>

            {reportGenerated && (
                <>
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
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((row, index) => (
                                        <TableRow key={row["Employee ID"] + index} hover>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            {columns.slice(1).map(colName => {
                                                const value = colName.includes("D.O.J") ? formatDate(row[colName]) : (row[colName] ?? 'NA');
                                                return <TableCell key={colName} sx={value === 'NA' ? { color: 'text.secondary' } : {}}>{value}</TableCell>;
                                            })}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {filteredData.length > 0 && (
                        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
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
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default AnnualAppraisalReport;