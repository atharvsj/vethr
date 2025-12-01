// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
//     Paper,
//     Container
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper function to format dates, handling nulls and invalid formats
// const formatDate = (dateString) => {
//     if (!dateString || dateString === "NA") return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// // Helper function to interpret Gender codes
// const formatGender = (genderCode) => {
//     if (genderCode === "1") return "Male";
//     if (genderCode === "2") return "Female";
//     return "N/A";
// };

// const HrMasterDataReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     const [selectedStatus, setSelectedStatus] = useState("Active");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // Function to fetch data when the "Generate Report" button is clicked
//     const handleFetchReport = async () => {
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         try {
//             const response = await axiosInstance.post("/api/hr-master-data/", {
//                 status: selectedStatus,
//             });
//             if (response.data && response.data.status === "success") {
//                 const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//                 setReportData(rawData);
//             } else {
//                 throw new Error("Invalid data format from server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch HR master data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Function to handle exporting the report to an Excel file
//     const handleExport = () => {
//         if (reportData.length === 0) return;

//         // The API provides user-friendly keys, so we can use them directly
//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "HR_Master_Report");
//         XLSX.writeFile(workbook, `HR_Master_Report_${selectedStatus}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // Client-side filtering logic
//     const filteredData = reportData.filter((row) => {
//         const s = searchTerm.toLowerCase();
//         return (
//             row["Employee ID"]?.toLowerCase().includes(s) ||
//             row["Name"]?.toLowerCase().includes(s) ||
//             row["Department"]?.toLowerCase().includes(s) ||
//             row["Designation"]?.toLowerCase().includes(s) ||
//             row["Manager Name"]?.toLowerCase().includes(s)
//         );
//     });

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     // Define columns based on the keys in the response for consistent ordering
//     const columns = [
//         "SR. NO.", "Employee ID", "Name", "Gender", "Date of Birth", "Age",
//         "Marital Status", "Blood Group", "Department", "Designation", "Division",
//         "D.O.J.", "Work Duration", "Manager Name", "CTC", "Gross Salary", "Status"
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 HR Master Data Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                             <MenuItem value={100}>100</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Status</InputLabel>
//                         <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}>
//                             <MenuItem value={"Active"}>Active</MenuItem>
//                             <MenuItem value={"Inactive"}>Inactive</MenuItem>
//                             <MenuItem value={"All"}>All</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle}>
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((colName) => (
//                                 <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center">Please select a status and click Generate Report.</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell>{row["Employee ID"]}</TableCell>
//                                     <TableCell>{row["Name"]}</TableCell>
//                                     <TableCell>{formatGender(row["Gender"])}</TableCell>
//                                     <TableCell>{formatDate(row["Date of Birth"])}</TableCell>
//                                     <TableCell>{row["Age"]}</TableCell>
//                                     <TableCell>{row["Marital Status"]}</TableCell>
//                                     <TableCell>{row["Blood Group"]}</TableCell>
//                                     <TableCell>{row["Department"]}</TableCell>
//                                     <TableCell>{row["Designation"]}</TableCell>
//                                     <TableCell>{row["Division"]}</TableCell>
//                                     <TableCell>{formatDate(row["D.O.J."])}</TableCell>
//                                     <TableCell>{row["Work Duration"]}</TableCell>
//                                     <TableCell>{row["Manager Name"]}</TableCell>
//                                     <TableCell>{row["CTC"]}</TableCell>
//                                     <TableCell>{row["Gross Salary"]}</TableCell>
//                                     <TableCell>{row["Status"]}</TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={{
//                         backgroundColor: "#9c27b0", // vibrant purple
//                         "&:hover": { backgroundColor: "#7b1fa2" }, // darker shade on hover
//                     }} >Previous</Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={{
//                         backgroundColor: "#9c27b0", // vibrant purple
//                         "&:hover": { backgroundColor: "#7b1fa2" }, // darker shade on hover
//                     }}>Next</Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default HrMasterDataReport;   /////



// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
//     Paper,
//     Container
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper function to format dates, handling nulls and invalid formats
// const formatDate = (dateString) => {
//     if (!dateString || dateString === "NA") return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     // FIXED: Corrected the typo from toLocaleDateDateString to toLocaleDateString
//     return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// // Helper function to interpret Gender codes
// const formatGender = (genderCode) => {
//     if (genderCode === "1") return "Male";
//     if (genderCode === "2") return "Female";
//     return "N/A";
// };

// // Helper function to format any cell's data based on its column name
// const formatCellData = (columnName, value) => {
//     switch (columnName) {
//         case "Gender":
//             return formatGender(value);
//         case "Date of Birth":
//         case "D.O.J.":
//         case "Date of Confirmation":
//         case "Date of Exit":
//         case "Resignation Date":
//             return formatDate(value);
//         default:
//             return value || value === 0 ? value : "N/A";
//     }
// };

// const HrMasterDataReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [columns, setColumns] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         if (!selectedStatus) {
//             setError("Please select a status to generate the report.");
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         setColumns([]);
//         try {
//             const response = await axiosInstance.post("/api/hr-master-data/", {
//                 status: selectedStatus,
//             });
//             if (response.data && response.data.status === "success") {
//                 const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//                 setReportData(rawData);

//                 if (rawData.length > 0) {
//                     const dynamicColumns = Object.keys(rawData[0]);
//                     setColumns(["SR. NO.", ...dynamicColumns]);
//                 }

//             } else {
//                 throw new Error("Invalid data format from server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch HR master data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "HR_Master_Report");
//         XLSX.writeFile(workbook, `HR_Master_Report_${selectedStatus}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) => {
//         const s = searchTerm.toLowerCase();
//         return (
//             row["Employee ID"]?.toLowerCase().includes(s) ||
//             row["Name"]?.toLowerCase().includes(s) ||
//             row["Department"]?.toLowerCase().includes(s) ||
//             row["Designation"]?.toLowerCase().includes(s) ||
//             row["Manager Name"]?.toLowerCase().includes(s)
//         );
//     });

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 HR Master Data Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem><MenuItem value={100}>100</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Status</InputLabel>
//                         <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}>
//                             <MenuItem value={"Active"}>Active</MenuItem>
//                             <MenuItem value={"Inactive"}>Inactive</MenuItem>
//                             <MenuItem value={"All"}>All</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedStatus}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((colName) => (
//                                 <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center">Please select a status and click Generate Report.</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     {columns.map((colName) => {
//                                         if (colName === "SR. NO.") {
//                                             return <TableCell key={colName}>{page * rowsPerPage + index + 1}</TableCell>;
//                                         }
//                                         return <TableCell key={colName}>{formatCellData(colName, row[colName])}</TableCell>;
//                                     })}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//                         Previous
//                     </Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//                         Next
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default HrMasterDataReport;/////





// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Grid,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
//     Paper,
//     Container
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export

// // Helper function to format dates, handling nulls and invalid formats
// const formatDate = (dateString) => {
//     if (!dateString || dateString === "NA") return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// // Helper function to interpret Gender codes
// const formatGender = (genderCode) => {
//     if (genderCode === "1") return "Male";
//     if (genderCode === "2") return "Female";
//     return "N/A";
// };

// // Helper function to format any cell's data based on its column name
// const formatCellData = (columnName, value) => {
//     switch (columnName) {
//         case "Gender":
//             return formatGender(value);
//         case "Date of Birth":
//         case "D.O.J.":
//         case "Date of Confirmation":
//         case "Date of Exit":
//         case "Resignation Date":
//             return formatDate(value);
//         default:
//             return value || value === 0 ? value : "N/A";
//     }
// };

// const HrMasterDataReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [columns, setColumns] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         if (!selectedStatus) {
//             setError("Please select a status to generate the report.");
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         setColumns([]);
//         try {
//             const response = await axiosInstance.post("/api/hr-master-data/", {
//                 status: selectedStatus,
//             });
//             if (response.data && response.data.status === "success") {
//                 const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//                 setReportData(rawData);

//                 if (rawData.length > 0) {
//                     const dynamicColumns = Object.keys(rawData[0]);
//                     setColumns(["SR. NO.", ...dynamicColumns]);
//                 }

//             } else {
//                 throw new Error("Invalid data format from server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch HR master data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleExport = () => {
//         if (reportData.length === 0) return;
//         const dataToExport = reportData.map((row, index) => ({
//             "SR. NO.": index + 1,
//             ...row,
//         }));
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "HR_Master_Report");
//         XLSX.writeFile(workbook, `HR_Master_Report_${selectedStatus}.xlsx`);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) => {
//         const s = searchTerm.toLowerCase();
//         return (
//             row["Employee ID"]?.toLowerCase().includes(s) ||
//             row["Name"]?.toLowerCase().includes(s) ||
//             row["Department"]?.toLowerCase().includes(s) ||
//             row["Designation"]?.toLowerCase().includes(s) ||
//             row["Manager Name"]?.toLowerCase().includes(s)
//         );
//     });

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 HR Master Data Report
//             </Typography>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem><MenuItem value={100}>100</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Status</InputLabel>
//                         <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}>
//                             <MenuItem value={"Active"}>Active</MenuItem>
//                             <MenuItem value={"Inactive"}>Inactive</MenuItem>
//                             <MenuItem value={"All"}>All</MenuItem>
//                         </Select>
//                     </FormControl>

//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedStatus}
//                     >
//                         Generate Report
//                     </Button>

//                     {reportData.length > 0 && (
//                         <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle}>
//                             Export Report
//                         </Button>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField fullWidth size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
//                 </Grid>
//             </Grid>

//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((colName) => (
//                                 <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center">Please select a status and click Generate Report.</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     {columns.map((colName) => {
//                                         if (colName === "SR. NO.") {
//                                             return <TableCell key={colName}>{page * rowsPerPage + index + 1}</TableCell>;
//                                         }
//                                         return <TableCell key={colName}>{formatCellData(colName, row[colName])}</TableCell>;
//                                     })}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//                         Previous
//                     </Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//                         Next
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default HrMasterDataReport;










// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Grid,
//     Paper,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Button,
//     Container
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// import * as XLSX from "xlsx"; // For Excel export
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // Helper function to format dates, handling nulls and invalid formats
// const formatDate = (dateString) => {
//     if (!dateString || dateString === "NA") return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
// };

// // Helper function to interpret Gender codes
// const formatGender = (genderCode) => {
//     if (genderCode === "1") return "Male";
//     if (genderCode === "2") return "Female";
//     return "N/A";
// };

// // Helper function to format any cell's data based on its column name
// const formatCellData = (columnName, value) => {
//     switch (columnName) {
//         case "Gender":
//             return formatGender(value);
//         case "Date of Birth":
//         case "D.O.J.":
//         case "Date of Confirmation":
//         case "Date of Exit":
//         case "Resignation Date":
//             return formatDate(value);
//         default:
//             return value || value === 0 ? value : "N/A";
//     }
// };

// const HrMasterDataReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [columns, setColumns] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState("All"); // Set initial status to "All"
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         // This check is important for subsequent manual clicks
//         if (!selectedStatus) {
//             setError("Please select a status to generate the report.");
//             setHasSearched(true);
//             setReportData([]);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);
//         setColumns([]);
//         try {
//             const response = await axiosInstance.post("/api/hr-master-data/", {
//                 status: selectedStatus,
//             });
//             if (response.data && response.data.status === "success") {
//                 const rawData = Array.isArray(response.data.data) ? response.data.data : [];
//                 setReportData(rawData);

//                 if (rawData.length > 0) {
//                     const dynamicColumns = Object.keys(rawData[0]);
//                     setColumns(["SR. NO.", ...dynamicColumns]);
//                 }

//             } else {
//                 throw new Error("Invalid data format from server.");
//             }
//         } catch (err) {
//             setError("Failed to fetch HR master data. Please try again later.");
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch the report automatically when the component loads for the first time
//     useEffect(() => {
//         handleFetchReport();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);


//     const handleExportExcel = () => {
//         if (reportData.length === 0) return;
//         const dataToExport = reportData.map((row, index) => {
//             let exportedRow = { "SR. NO.": page * rowsPerPage + index + 1 };
//             columns.slice(1).forEach(colName => {
//                 exportedRow[colName] = formatCellData(colName, row[colName]);
//             });
//             return exportedRow;
//         });
//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "HR_Master_Report");
//         XLSX.writeFile(workbook, `HR_Master_Report_${selectedStatus}.xlsx`);
//     };

//     const handleExportPdf = () => {
//         if (reportData.length === 0) return;

//         const doc = new jsPDF();
//         const tableColumn = columns.map(col => col);
//         const tableRows = [];

//         reportData.forEach((row, index) => {
//             const rowData = [
//                 page * rowsPerPage + index + 1,
//                 ...columns.slice(1).map(colName => formatCellData(colName, row[colName]))
//             ];
//             tableRows.push(rowData);
//         });

//         doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 20,
//             theme: 'grid',
//             headStyles: { fillColor: [75, 85, 99] }, // Gray color for header
//             styles: { fontSize: 8 },
//         });
//         doc.text("HR Master Data Report", 14, 15);
//         doc.save(`HR_Master_Report_${selectedStatus}.pdf`);
//     };


//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = reportData.filter((row) => {
//         const s = searchTerm.toLowerCase();
//         return (
//             row["Employee ID"]?.toString().toLowerCase().includes(s) ||
//             row["Name"]?.toLowerCase().includes(s) ||
//             row["Department"]?.toLowerCase().includes(s) ||
//             row["Designation"]?.toLowerCase().includes(s) ||
//             row["Manager Name"]?.toLowerCase().includes(s)
//         );
//     });

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h4" fontWeight="bold" mb={5}>
//                 HR Master Data Report
//             </Typography>
//             <Paper sx={{ p: 2, mb: 2 }}>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={3}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows Per Page</InputLabel>
//                         <Select value={rowsPerPage} label="Rows Per Page" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                             <MenuItem value={100}>100</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Status</InputLabel>
//                         <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}>
//                             <MenuItem value={"Active"}>Active</MenuItem>
//                             <MenuItem value={"Inactive"}>Inactive</MenuItem>
//                             <MenuItem value={"All"}>All</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedStatus || loading}
//                     >
//                         {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Report"}
//                     </Button>
//                 </Grid>
//             </Grid>

//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 2 }}>
//                     {reportData.length > 0 && (
//                         <>
//                             <Button variant="contained" onClick={handleExportExcel} sx={purpleButtonStyle}>
//                                 Excel
//                             </Button>
//                             <Button variant="contained" onClick={handleExportPdf} sx={purpleButtonStyle}>
//                                  PDF
//                             </Button>
//                         </>
//                     )}
//                 </Grid>
//                 <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <TextField
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         sx={{ maxWidth: '400px' }}
//                     />
//                 </Grid>
//             </Grid>
//                         </Paper>


//             <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((colName) => (
//                                 <TableCell key={colName} sx={{ backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center">Please select a status and click Generate Report.</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row["Employee ID"] + index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                                     {columns.map((colName) => {
//                                         if (colName === "SR. NO.") {
//                                             return <TableCell key={colName}>{page * rowsPerPage + index + 1}</TableCell>;
//                                         }
//                                         return <TableCell key={colName}>{formatCellData(colName, row[colName])}</TableCell>;
//                                     })}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length || 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//                         Previous
//                     </Button>
//                     <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//                         Next
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default HrMasterDataReport;










import React, { useState, useEffect, useMemo } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';

import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// --- HELPER FUNCTIONS (No Change) ---
const formatDate = (dateString) => {
    if (!dateString || dateString === "NA") return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB");
};
const formatGender = (genderCode) => {
    if (genderCode === "1") return "Male";
    if (genderCode === "2") return "Female";
    return "N/A";
};
const formatCellData = (columnName, value) => {
    switch (columnName) {
        case "Gender": return formatGender(value);
        case "Date of Birth": case "D.O.J.": case "Date of Confirmation":
        case "Date of Exit": case "Resignation Date": return formatDate(value);
        default: return value || value === 0 ? value : "N/A";
    }
};

const HrMasterDataReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading to true
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [columns, setColumns] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    const handleFetchReport = async (statusToFetch = selectedStatus) => {
        if (!statusToFetch) {
            setError("Please select a status to generate the report.");
            setHasSearched(true);
            setReportData([]);
            return;
        }
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setReportData([]);
        setColumns([]);
        try {
            const response = await axiosInstance.post("/api/hr-master-data/", { status: statusToFetch });
            if (response.data?.status === "success" && Array.isArray(response.data.data)) {
                const rawData = response.data.data;
                setReportData(rawData);
                if (rawData.length > 0) {
                    setColumns(["SR. NO.", ...Object.keys(rawData[0])]);
                }
            } else {
                throw new Error("Invalid data format from server.");
            }
        } catch (err) {
            setError("Failed to fetch HR master data. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };

    useEffect(() => {
        handleFetchReport("All"); // Fetch "All" on initial component load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    const onGenerateClick = () => handleFetchReport(selectedStatus);

    // --- EXPORT FUNCTIONALITY ---
    const handleExportExcel = () => {
        const dataToExport = filteredData.map((row, index) => {
            let exportedRow = { "SR. NO.": index + 1 };
            columns.slice(1).forEach(colName => {
                exportedRow[colName] = formatCellData(colName, row[colName]);
            });
            return exportedRow;
        });
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "HR_Master_Report");
        XLSX.writeFile(workbook, `HR_Master_Report_${selectedStatus}.xlsx`);
    };

    const handleExportPdf = () => {
        const doc = new jsPDF({ orientation: "landscape" });
        doc.text(`HR Master Data Report - Status: ${selectedStatus}`, 14, 15);
        
        const tableColumn = columns;
        const tableRows = filteredData.map((row, index) => {
            return [index + 1, ...columns.slice(1).map(colName => formatCellData(colName, row[colName]))];
        });

        doc.autoTable({
            head: [tableColumn], body: tableRows, startY: 20,
            headStyles: { fillColor: [140, 37, 124] }, // primaryColor in RGB
            theme: 'grid', styles: { fontSize: 5, cellPadding: 1 }
        });
        doc.save(`HR_Master_Report_${selectedStatus}.pdf`);
    };

    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                HR Master Data Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
                    <FormControl sx={{ minWidth: 180 }} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select value={selectedStatus} label="Status" onChange={(e) => setSelectedStatus(e.target.value)}>
                            <MenuItem value={"Active"}>Active</MenuItem>
                            <MenuItem value={"Inactive"}>Inactive</MenuItem>
                            <MenuItem value={"All"}>All</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={onGenerateClick} disabled={!selectedStatus || loading}
                        sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate Report
                    </Button>
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                     <Stack direction="row" spacing={1}>
                        <Button variant="outlined" onClick={handleExportPdf} startIcon={<PictureAsPdfIcon />} disabled={filteredData.length === 0}
                            sx={{ borderColor: primaryColor, color: primaryColor, '&:hover': { borderColor: primaryButtonHover, backgroundColor: '#fdf3fb' }}}>
                            PDF
                        </Button>
                        <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />} disabled={filteredData.length === 0}
                            sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' }}}>
                            Excel
                        </Button>
                    </Stack>
                    <TextField size="small" variant="outlined" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}
                        sx={{ width: isMobile ? '100%' : 'auto' }} />
                </Stack>
            </Paper>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map(colName => <TableCell key={colName} sx={headerCellStyle}>{colName}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            [...Array(rowsPerPage)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {[...Array(columns.length || 10)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow><TableCell colSpan={columns.length || 1} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
                        ) : !hasSearched ? (
                             <TableRow><TableCell colSpan={columns.length || 1} align="center">Please select a status and click Generate.</TableCell></TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow key={row["Employee ID"] || index} hover>
                                    {columns.map(colName => {
                                        if (colName === "SR. NO.") return <TableCell key={colName} align="center">{page * rowsPerPage + index + 1}</TableCell>;
                                        return <TableCell key={colName}>{formatCellData(colName, row[colName])}</TableCell>;
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length || 1} align="center">No data available for the selected criteria.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- NEW STYLED PAGINATION --- */}
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
                                    sx={{
                                        backgroundColor: '#8C257C', color: 'white', borderRadius: '4px',
                                        '&:hover': { backgroundColor: '#8C257C' },
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '& .MuiSvgIcon-root': { color: 'white' },
                                    }}>
                                    {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Typography variant="body2" color="text.secondary">
                               {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                            </Typography>
                        </Box>
                        <Pagination
                            count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1}
                            onChange={handlePaginationChange} showFirstButton showLastButton
                            sx={{
                                '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } },
                                '& .MuiPaginationItem-page': {
                                    color: primaryColor, '&.Mui-selected': {
                                        backgroundColor: primaryColor, color: 'white',
                                        '&:hover': { backgroundColor: secondaryColor }
                                    },
                                },
                                 '& .MuiPaginationItem-icon': { color: primaryColor }
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HrMasterDataReport;