// // // import React, { useState } from "react";
// // // import {
// // //   Table, TableBody, TableCell, TableContainer,
// // //   TableHead, TableRow, Paper, Select,
// // //   MenuItem, Button, IconButton, Typography,
// // //   Box, TextField, FormControl, InputLabel
// // // } from "@mui/material";
// // // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// // // import { useNavigate } from "react-router-dom";
// // // import { styled } from "@mui/material/styles";

// // // // Mock data
// // // const mockData = [
// // //   {
// // //     id: 1,
// // //     employee: "John Doe",
// // //     designation: "Developer",
// // //     doj: "2022-01-01",
// // //     lm: "Jane Smith",
// // //     phase1: 7,
// // //     phase2: 6,
// // //     phase3: 8,
// // //     phase4: 9,
// // //     overall: 8,
// // //     score: 80,
// // //   },
// // //   {
// // //     id: 2,
// // //     employee: "Alice Johnson",
// // //     designation: "Designer",
// // //     doj: "2021-06-15",
// // //     lm: "Robert Brown",
// // //     phase1: null,
// // //     phase2: null,
// // //     phase3: null,
// // //     phase4: null,
// // //     overall: null,
// // //     score: null,
// // //   },
// // // ];

// // // // Styled arrow button with hover color
// // // const StyledArrowButton = styled(IconButton)(({ theme }) => ({
// // //   color: "#616161",
// // //   transition: "color 0.3s",
// // //   "&:hover": {
// // //     color: "#ec466f",
// // //   },
// // // }));

// // // const PerformanceTable = () => {
// // //   const navigate = useNavigate();
// // //   const [hoveredRowId, setHoveredRowId] = useState(null);
// // //   const [statusSelection, setStatusSelection] = useState({});
// // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [currentPage, setCurrentPage] = useState(1);

// // //   const handleStatusChange = (id, value) => {
// // //     setStatusSelection((prev) => ({ ...prev, [id]: value }));
// // //   };

// // //   const handleConfirmStatus = (id) => {
// // //     console.log("Confirmed", id, statusSelection[id]);
// // //   };

// // //   const handleNavigate = (id) => {
// // //   navigate("/hrms/admindashboard/marks/:id");
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "Extend": return "#FFA726";
// // //       case "Confirm": return "#66BB6A";
// // //       case "Terminate": return "#EF5350";
// // //       default: return "";
// // //     }
// // //   };

// // //   const renderBoxedCell = (value) => (
// // //     <Box sx={{
// // //       px: 1, py: 0.5, border: "1px solid #ccc",
// // //       borderRadius: 1, minWidth: 30, textAlign: "center",
// // //     }}>
// // //       {value ?? "-"}
// // //     </Box>
// // //   );

// // //   const filteredData = mockData.filter(item =>
// // //     item.employee.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );
// // //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
// // //   const paginatedData = filteredData.slice(
// // //     (currentPage - 1) * rowsPerPage,
// // //     currentPage * rowsPerPage
// // //   );

// // //   return (
// // //     <Box>
// // //       {/* Header Controls */}
// // //       <Box display="flex" justifyContent="space-between" mb={2} px={1}>
// // //         <FormControl size="small">
// // //           <InputLabel>Rows</InputLabel>
// // //           <Select
// // //             value={rowsPerPage}
// // //             onChange={(e) => { setRowsPerPage(e.target.value); setCurrentPage(1); }}
// // //             label="Rows"
// // //             sx={{ width: 100 }}
// // //           >
// // //             {[5, 10, 15].map((opt) => (
// // //               <MenuItem key={opt} value={opt}>{opt}</MenuItem>
// // //             ))}
// // //           </Select>
// // //         </FormControl>

// // //         <TextField
// // //           size="small"
// // //           label="Search Employee"
// // //           value={searchQuery}
// // //           onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
// // //         />
// // //       </Box>

// // //       {/* Table */}
// // //       <TableContainer component={Paper}>
// // //         <Table>
// // //           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
// // //             <TableRow>
// // //               {[
// // //                 "Sr No", "Employee", "Designation", "DOJ", "LM",
// // //                 "Phase1", "Phase2", "Phase3", "Phase4",
// // //                 "OverallPerformance", "Score", "Status"
// // //               ].map((heading) => (
// // //                 <TableCell key={heading} align="center">
// // //                   <b>{heading}</b>
// // //                 </TableCell>
// // //               ))}
// // //             </TableRow>
// // //           </TableHead>

// // //           <TableBody>
// // //             {paginatedData.map((row, index) => {
// // //               const selectedStatus = statusSelection[row.id] || "";
// // //               return (
// // //                 <TableRow
// // //                   key={row.id}
// // //                   onMouseEnter={() => setHoveredRowId(row.id)}
// // //                   onMouseLeave={() => setHoveredRowId(null)}
// // //                 >
// // //                   <TableCell align="center">
// // //                     {(currentPage - 1) * rowsPerPage + index + 1}
// // //                   </TableCell>

// // //                   <TableCell align="center">
// // //                     {hoveredRowId === row.id ? (
// // //                       <StyledArrowButton onClick={() => handleNavigate(row.id)} size="small">
// // //                         <ArrowForwardIcon fontSize="small" />
// // //                       </StyledArrowButton>
// // //                     ) : (
// // //                       row.employee
// // //                     )}
// // //                   </TableCell>

// // //                   <TableCell align="center">{row.designation}</TableCell>
// // //                   <TableCell align="center">{row.doj}</TableCell>
// // //                   <TableCell align="center">{row.lm}</TableCell>
// // //                   <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
// // //                   <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
// // //                   <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
// // //                   <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
// // //                   <TableCell align="center">{renderBoxedCell(row.overall)}</TableCell>
// // //                   <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>

// // //                   <TableCell align="center">
// // //                     {row.score != null ? (
// // //                       <Box display="flex" alignItems="center" gap={1}>
// // //                         <Select
// // //                           value={selectedStatus}
// // //                           onChange={(e) => handleStatusChange(row.id, e.target.value)}
// // //                           displayEmpty
// // //                           size="small"
// // //                           sx={{
// // //                             minWidth: 100,
// // //                             backgroundColor: getStatusColor(selectedStatus),
// // //                             color: selectedStatus ? "#fff" : "#000",
// // //                             fontWeight: 600,
// // //                             "& .MuiSelect-icon": { color: selectedStatus ? "#fff" : "#000" },
// // //                           }}
// // //                           renderValue={(value) => value || "Action"}
// // //                         >
// // //                           <MenuItem value="Extend">Extend</MenuItem>
// // //                           <MenuItem value="Confirm">Confirm</MenuItem>
// // //                           <MenuItem value="Terminate">Terminate</MenuItem>
// // //                         </Select>

// // //                         {selectedStatus && (
// // //                           <Button
// // //                             variant="contained"
// // //                             size="small"
// // //                             onClick={() => handleConfirmStatus(row.id)}
// // //                           >
// // //                             Confirm
// // //                           </Button>
// // //                         )}
// // //                       </Box>
// // //                     ) : (
// // //                       <Box
// // //                         sx={{
// // //                           backgroundColor: "#ECEFF1",
// // //                           px: 2,
// // //                           py: 0.5,
// // //                           borderRadius: 1,
// // //                           fontWeight: 600,
// // //                           color: "#607D8B",
// // //                           display: "inline-block",
// // //                         }}
// // //                       >
// // //                         Pending
// // //                       </Box>
// // //                     )}
// // //                   </TableCell>
// // //                 </TableRow>
// // //               );
// // //             })}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>

// // //       {/* Pagination */}
// // //       <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
// // //         <Button
// // //           variant="outlined"
// // //           size="small"
// // //           onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
// // //           disabled={currentPage === 1}
// // //         >
// // //           Previous
// // //         </Button>
// // //         <Typography fontWeight={600}>Page {currentPage} of {totalPages}</Typography>
// // //         <Button
// // //           variant="outlined"
// // //           size="small"
// // //           onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
// // //           disabled={currentPage === totalPages}
// // //         >
// // //           Next
// // //         </Button>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default PerformanceTable;
 


// // import React, { useState, useEffect } from "react";
// // import {
// //   Table, TableBody, TableCell, TableContainer,
// //   TableHead, TableRow, Paper, Select,
// //   MenuItem, Button, IconButton, Typography,
// //   Box, TextField, FormControl, InputLabel, CircularProgress
// // } from "@mui/material";
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// // import { useNavigate } from "react-router-dom";
// // import { styled } from "@mui/material/styles";

// // // Styled arrow button with hover color
// // const StyledArrowButton = styled(IconButton)(({ theme }) => ({
// //   color: "#616161",
// //   transition: "color 0.3s",
// //   "&:hover": {
// //     color: "#ec466f",
// //   },
// // }));

// // const PerformanceTableHead = () => {
// //   const navigate = useNavigate();
  
// //   // State for API data, loading, and errors
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // State for UI controls
// //   const [hoveredRowId, setHoveredRowId] = useState(null);
// //   const [statusSelection, setStatusSelection] = useState({});
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
  
// //   // Fetch data from API on component mount
// //   useEffect(() => {
// //     const fetchPerformanceData = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch("https://tdtlworld.com/hrms-backend/apis/get_employee_performance/");
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const apiData = await response.json();

// //         // Transform API data to match the component's expected structure
// //         const transformedData = apiData.map((item, index) => ({
// //           id: index, // Using index as a unique ID for keys
// //           employee: item.full_name,
// //           designation: item.designation_name,
// //           doj: item.date_of_joining,
// //           lm: item.manager_name,
// //           phase1: item.phase_one_points,
// //           phase2: item.phase_two_points,
// //           phase3: item.phase_three_points,
// //           phase4: item.phase_four_points,
// //           overall: item.performance_analysis, // "performance_analysis" as OverallPerformance
// //           score: item.avg_score, // "avg_score" as Score
// //           apiStatus: item.employee_status, // Keep original status for logic
// //         }));

// //         setData(transformedData);
// //         setError(null);
// //       } catch (e) {
// //         setError(e.message);
// //         console.error("Failed to fetch performance data:", e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPerformanceData();
// //   }, []); // Empty dependency array ensures this runs only once on mount

// //   const handleStatusChange = (id, value) => {
// //     setStatusSelection((prev) => ({ ...prev, [id]: value }));
// //   };

// //   const handleConfirmStatus = (id) => {
// //     const employee = data.find(emp => emp.id === id);
// //     const selectedAction = statusSelection[id];
// //     console.log(`Confirming action for ${employee.employee} (ID: ${id}) with status: ${selectedAction}`);
// //     // Here you would typically make a POST/PUT API call to update the status
// //   };

// //   const handleNavigate = (id) => {
// //     // Navigate to a details page, passing the employee ID (index in this case)
// //     navigate(`/hrms/dashboardHead/marks/${id}`);
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "Extend": return "#FFA726"; // Orange
// //       case "Confirm": return "#66BB6A"; // Green
// //       case "Terminate": return "#EF5350"; // Red
// //       default: return "";
// //     }
// //   };
  
// //   // A styled box for displaying a fixed status (e.g., "Confirmed")
// //   const renderStatusBox = (status) => {
// //       const style = {
// //           backgroundColor: "#ECEFF1",
// //           color: "#607D8B",
// //           fontWeight: 600,
// //       };
// //       if (status === "Confirmed") {
// //           style.backgroundColor = "#E8F5E9"; // Light Green
// //           style.color = "#388E3C";
// //       } else if (status === "Terminated") {
// //           style.backgroundColor = "#FFEBEE"; // Light Red
// //           style.color = "#D32F2F";
// //       }
// //       return (
// //           <Box sx={{ px: 2, py: 0.5, borderRadius: 1, display: "inline-block", ...style }}>
// //               {status}
// //           </Box>
// //       );
// //   }

// //   const renderBoxedCell = (value, isPercentage = false) => (
// //     <Box sx={{
// //       px: 1, py: 0.5, border: "1px solid #ccc",
// //       borderRadius: 1, minWidth: 40, textAlign: "center",
// //     }}>
// //       {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
// //     </Box>
// //   );

// //   const filteredData = data.filter(item =>
// //     item.employee.toLowerCase().includes(searchQuery.toLowerCase())
// //   );
// //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
// //   const paginatedData = filteredData.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
// //         <CircularProgress />
// //         <Typography sx={{ ml: 2 }}>Loading Performance Data...</Typography>
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
// //         <Typography color="error">Error: {error}</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box>
// //       {/* Header Controls */}
// //       <Box display="flex" justifyContent="space-between" mb={2} px={1}>
// //         <FormControl size="small">
// //           <InputLabel>Rows</InputLabel>
// //           <Select
// //             value={rowsPerPage}
// //             onChange={(e) => { setRowsPerPage(e.target.value); setCurrentPage(1); }}
// //             label="Rows"
// //             sx={{ width: 100 }}
// //           >
// //             {[5, 10, 15, 25].map((opt) => (
// //               <MenuItem key={opt} value={opt}>{opt}</MenuItem>
// //             ))}
// //           </Select>
// //         </FormControl>

// //         <TextField
// //           size="small"
// //           label="Search Employee"
// //           variant="outlined"
// //           value={searchQuery}
// //           onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
// //         />
// //       </Box>

// //       {/* Table */}
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
// //             <TableRow>
// //               {[
// //                 "Sr No", "Employee", "Designation", "DOJ", "LM",
// //                 "Phase1", "Phase2", "Phase3", "Phase4",
// //                 "Overall", "Score", "Status"
// //               ].map((heading) => (
// //                 <TableCell key={heading} align="center" sx={{ fontWeight: 'bold' }}>
// //                   {heading}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>

// //           <TableBody>
// //             {paginatedData.map((row, index) => {
// //               const selectedStatus = statusSelection[row.id] || "";
// //               return (
// //                 <TableRow
// //                   key={row.id}
// //                   onMouseEnter={() => setHoveredRowId(row.id)}
// //                   onMouseLeave={() => setHoveredRowId(null)}
// //                   sx={{ '&:hover': { backgroundColor: '#f9f9f9' }}}
// //                 >
// //                   <TableCell align="center">
// //                     {(currentPage - 1) * rowsPerPage + index + 1}
// //                   </TableCell>

// //                   <TableCell align="center">
// //                     {hoveredRowId === row.id ? (
// //                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                          <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
// //                          <StyledArrowButton onClick={() => handleNavigate(row.id)} size="small">
// //                            <ArrowForwardIcon fontSize="small" />
// //                          </StyledArrowButton>
// //                       </Box>
// //                     ) : (
// //                       row.employee
// //                     )}
// //                   </TableCell>

// //                   <TableCell align="center">{row.designation}</TableCell>
// //                   <TableCell align="center">{row.doj}</TableCell>
// //                   <TableCell align="center">{row.lm}</TableCell>
// //                   <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
// //                   <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
// //                   <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
// //                   <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
// //                   <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
// //                   <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>

// //                   <TableCell align="center">
// //                     {row.apiStatus === "Pending" ? (
// //                       <Box display="flex" alignItems="center" gap={1} justifyContent="center">
// //                         <Select
// //                           value={selectedStatus}
// //                           onChange={(e) => handleStatusChange(row.id, e.target.value)}
// //                           displayEmpty
// //                           size="small"
// //                           sx={{
// //                             minWidth: 100,
// //                             backgroundColor: getStatusColor(selectedStatus),
// //                             color: selectedStatus ? "#fff" : "#000",
// //                             fontWeight: 600,
// //                             borderRadius: 1,
// //                             "& .MuiSelect-icon": { color: selectedStatus ? "#fff" : "inherit" },
// //                           }}
// //                           renderValue={(value) => value || "Action"}
// //                         >
// //                           <MenuItem value="Confirm">Confirm</MenuItem>
// //                           <MenuItem value="Extend">Extend</MenuItem>
// //                           <MenuItem value="Terminate">Terminate</MenuItem>
// //                         </Select>

// //                         {selectedStatus && (
// //                           <Button
// //                             variant="contained"
// //                             color="primary"
// //                             size="small"
// //                             onClick={() => handleConfirmStatus(row.id)}
// //                           >
// //                             Save
// //                           </Button>
// //                         )}
// //                       </Box>
// //                     ) : (
// //                       renderStatusBox(row.apiStatus)
// //                     )}
// //                   </TableCell>
// //                 </TableRow>
// //               );
// //             })}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Pagination */}
// //       <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
// //         <Button
// //           variant="outlined"
// //           size="small"
// //           onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
// //           disabled={currentPage === 1}
// //         >
// //           Previous
// //         </Button>
// //         <Typography>Page {currentPage} of {totalPages}</Typography>
// //         <Button
// //           variant="outlined"
// //           size="small"
// //           onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
// //           disabled={currentPage === totalPages || totalPages === 0}
// //         >
// //           Next
// //         </Button>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default PerformanceTableHead;





// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper, Select,
//     MenuItem, Button, IconButton, Typography,
//     Box, TextField, FormControl, InputLabel, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Snackbar, Alert, Card,
//     CardContent, CardHeader, Grid, TableFooter,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled, useTheme } from "@mui/material/styles";
// import axios from "axios";
 
// const axiosInstance = axios.create({
//   baseURL: "https://tdtlworld.com/hrms-backend/",
// });
 
// const Phase1 = ({ user_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//       lineManager: "",
//       head: "",
//       hr: "",
//     });
 
//     const [isSaving, setIsSaving] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id) {
//                 setError("User ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const phase1Data = response.data.data.filter(item => item.phase === 1);
 
//                     if (phase1Data.length > 0) {
//                         const loadedParameters = phase1Data.map(item => {
//                             const scores = [item.points_by_lm, item.points_by_head, item.points_by_hr].filter(score => score !== null && score !== undefined);
//                             const sum = scores.reduce((a, b) => a + b, 0);
//                             const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                             return {
//                                 id: item.parameter_id,
//                                 name: item.para_name || ` ${item.para_name}`,
//                                 lm: item.points_by_lm || "",
//                                 head: item.points_by_head || "",
//                                 hr: item.points_by_hr || "",
//                                 average: average,
//                             };
//                         });
//                         setParameters(loadedParameters);
 
//                         const firstRecord = phase1Data[0];
//                         setComments({
//                             lineManager: firstRecord.comment_by_lm || "",
//                             head: firstRecord.comment_by_head || "",
//                             hr: firstRecord.comment_by_hr || "",
//                         });
//                     }
//                 } else {
//                     setError("Failed to fetch data or data is in an invalid format.");
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id]);
 
 
//     const handleChange = (id, field, value) => {
//       const updated = parameters.map((param) => {
//         if (param.id === id) {
//           const newParam = { ...param, [field]: value };
//           const scores = [newParam.lm, newParam.head, newParam.hr]
//             .map(score => parseFloat(score))
//             .filter(score => !isNaN(score));
//           const sum = scores.reduce((a, b) => a + b, 0);
//           const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//           return { ...newParam, average: average };
//         }
//         return param;
//       });
//       setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//       setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//       setIsSaving(true);
//       const payload = {
//         entries: parameters.map(param => ({
//           emp_id: user_id,
//           parameter_id: param.id,
//           phase: 1,
//           points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//           comment_by_lm: comments.lineManager,
//           points_by_head: param.head ? parseInt(param.head, 10) : null,
//           comment_by_head: comments.head,
//           points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//           comment_by_hr: comments.hr,
//         }))
//       };
 
//       try {
//         await axiosInstance.post('apis/save_phasewise_data/', payload);
//         setSnackbar({ open: true, message: "Phase 1 saved successfully!", severity: "success" });
//       } catch (error) {
//         console.error("Failed to save Phase 1 data:", error);
//         setSnackbar({ open: true, message: "Error saving Phase 1 data. Please try again.", severity: "error" });
//       } finally {
//         setIsSaving(false);
//       }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//       if (reason === "clickaway") return;
//       setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//       return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//       <Box>
//         <Typography variant="h6" gutterBottom align="center">
//           Phase 1 Content for Employee ID: {user_id}
//         </Typography>
 
//         <Paper elevation={2} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                 <TableCell align="center"><strong>Sr No</strong></TableCell>
//                 <TableCell align="center"><strong>Parameter</strong></TableCell>
//                 <TableCell align="center"><strong>LM</strong></TableCell>
//                 <TableCell align="center"><strong>Head</strong></TableCell>
//                 <TableCell align="center"><strong>HR</strong></TableCell>
//                 <TableCell align="center"><strong>Average</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {parameters.map((row, index) => (
//                 <TableRow key={row.id}>
//                   <TableCell align="center">{index + 1}</TableCell>
//                   <TableCell align="center">{row.name}</TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.lm}
//                       onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.head}
//                       onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.hr}
//                       onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">{row.average}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
 
//         <Card variant="outlined" sx={{ mt: 3 }}>
//           <CardHeader title="Phase Comments" />
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Line Manager Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.lineManager}
//                   onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Head Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.head}
//                   onChange={(e) => handleCommentChange("head", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="HR Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.hr}
//                   onChange={(e) => handleCommentChange("hr", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
 
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSave} disabled>
//             {isSaving ? <CircularProgress size={24} /> : "Save Phase 1"}
//           </Button>
//         </Box>
 
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
// };
 
// const Phase2 = ({ user_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//       lineManager: "",
//       head: "",
//       hr: "",
//     });
 
//     const [isSaving, setIsSaving] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id) {
//                 setError("User ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const phase2Data = response.data.data.filter(item => item.phase === 2);
 
//                     if (phase2Data.length > 0) {
//                         const loadedParameters = phase2Data.map(item => {
//                             const scores = [item.points_by_lm, item.points_by_head, item.points_by_hr].filter(score => score !== null && score !== undefined);
//                             const sum = scores.reduce((a, b) => a + b, 0);
//                             const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                             return {
//                                 id: item.parameter_id,
//                                 name: item.para_name || ` ${item.para_name}`,
//                                 lm: item.points_by_lm || "",
//                                 head: item.points_by_head || "",
//                                 hr: item.points_by_hr || "",
//                                 average: average,
//                             };
//                         });
//                         setParameters(loadedParameters);
 
//                         const firstRecord = phase2Data[0];
//                         setComments({
//                             lineManager: firstRecord.comment_by_lm || "",
//                             head: firstRecord.comment_by_head || "",
//                             hr: firstRecord.comment_by_hr || "",
//                         });
//                     }
//                 } else {
//                     setError("Failed to fetch data or data is in an invalid format.");
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id]);
 
//     const handleChange = (id, field, value) => {
//       const updated = parameters.map((param) => {
//         if (param.id === id) {
//           const newParam = { ...param, [field]: value };
//           const scores = [newParam.lm, newParam.head, newParam.hr]
//             .map(score => parseFloat(score))
//             .filter(score => !isNaN(score));
//           const sum = scores.reduce((a, b) => a + b, 0);
//           const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//           return { ...newParam, average: average };
//         }
//         return param;
//       });
//       setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//       setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//       setIsSaving(true);
//       const payload = {
//         entries: parameters.map(param => ({
//           emp_id: user_id,
//           parameter_id: param.id,
//           phase: 2,
//           points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//           comment_by_lm: comments.lineManager,
//           points_by_head: param.head ? parseInt(param.head, 10) : null,
//           comment_by_head: comments.head,
//           points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//           comment_by_hr: comments.hr,
//         }))
//       };
 
//       try {
//         await axiosInstance.post('apis/save_phasewise_data/', payload);
//         setSnackbar({ open: true, message: "Phase 2 saved successfully!", severity: "success" });
//       } catch (error) {
//         console.error("Failed to save Phase 2 data:", error);
//         setSnackbar({ open: true, message: "Error saving Phase 2 data. Please try again.", severity: "error" });
//       } finally {
//         setIsSaving(false);
//       }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//       if (reason === "clickaway") return;
//       setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//       return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//       <Box>
//         <Typography variant="h6" gutterBottom align="center">
//           Phase 2 Content for Employee ID: {user_id}
//         </Typography>
 
//         <Paper elevation={2} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                 <TableCell align="center"><strong>Sr No</strong></TableCell>
//                 <TableCell align="center"><strong>Parameter</strong></TableCell>
//                 <TableCell align="center"><strong>LM</strong></TableCell>
//                 <TableCell align="center"><strong>Head</strong></TableCell>
//                 <TableCell align="center"><strong>HR</strong></TableCell>
//                 <TableCell align="center"><strong>Average</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {parameters.map((row, index) => (
//                 <TableRow key={row.id}>
//                   <TableCell align="center">{index + 1}</TableCell>
//                   <TableCell align="center">{row.name}</TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.lm}
//                       onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.head}
//                       onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.hr}
//                       onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">{row.average}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
 
//         <Card variant="outlined" sx={{ mt: 3 }}>
//           <CardHeader title="Phase Comments" />
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Line Manager Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.lineManager}
//                   onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Head Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.head}
//                   onChange={(e) => handleCommentChange("head", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="HR Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.hr}
//                   onChange={(e) => handleCommentChange("hr", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
 
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSave} disabled>
//             {isSaving ? <CircularProgress size={24} /> : "Save Phase 2"}
//           </Button>
//         </Box>
 
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
// };
 
// const Phase3 = ({ user_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//       lineManager: "",
//       head: "",
//       hr: "",
//     });
 
//     const [isSaving, setIsSaving] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id) {
//                 setError("User ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const phase3Data = response.data.data.filter(item => item.phase === 3);
 
//                     if (phase3Data.length > 0) {
//                         const loadedParameters = phase3Data.map(item => {
//                             const scores = [item.points_by_lm, item.points_by_head, item.points_by_hr].filter(score => score !== null && score !== undefined);
//                             const sum = scores.reduce((a, b) => a + b, 0);
//                             const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                             return {
//                                 id: item.parameter_id,
//                                 name: item.para_name || ` ${item.para_name}`,
//                                 lm: item.points_by_lm || "",
//                                 head: item.points_by_head || "",
//                                 hr: item.points_by_hr || "",
//                                 average: average,
//                             };
//                         });
//                         setParameters(loadedParameters);
 
//                         const firstRecord = phase3Data[0];
//                         setComments({
//                             lineManager: firstRecord.comment_by_lm || "",
//                             head: firstRecord.comment_by_head || "",
//                             hr: firstRecord.comment_by_hr || "",
//                         });
//                     }
//                 } else {
//                     setError("Failed to fetch data or data is in an invalid format.");
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id]);
 
//     const handleChange = (id, field, value) => {
//       const updated = parameters.map((param) => {
//         if (param.id === id) {
//           const newParam = { ...param, [field]: value };
//           const scores = [newParam.lm, newParam.head, newParam.hr]
//             .map(score => parseFloat(score))
//             .filter(score => !isNaN(score));
//           const sum = scores.reduce((a, b) => a + b, 0);
//           const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//           return { ...newParam, average: average };
//         }
//         return param;
//       });
//       setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//       setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//       setIsSaving(true);
//       const payload = {
//         entries: parameters.map(param => ({
//           emp_id: user_id,
//           parameter_id: param.id,
//           phase: 3,
//           points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//           comment_by_lm: comments.lineManager,
//           points_by_head: param.head ? parseInt(param.head, 10) : null,
//           comment_by_head: comments.head,
//           points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//           comment_by_hr: comments.hr,
//         }))
//       };
 
//       try {
//         await axiosInstance.post('apis/save_phasewise_data/', payload);
//         setSnackbar({ open: true, message: "Phase 3 saved successfully!", severity: "success" });
//       } catch (error) {
//         console.error("Failed to save Phase 3 data:", error);
//         setSnackbar({ open: true, message: "Error saving Phase 3 data. Please try again.", severity: "error" });
//       } finally {
//         setIsSaving(false);
//       }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//       if (reason === "clickaway") return;
//       setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//       return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//       <Box>
//         <Typography variant="h6" gutterBottom align="center">
//           Phase 3 Content for Employee ID: {user_id}
//         </Typography>
 
//         <Paper elevation={2} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                 <TableCell align="center"><strong>Sr No</strong></TableCell>
//                 <TableCell align="center"><strong>Parameter</strong></TableCell>
//                 <TableCell align="center"><strong>LM</strong></TableCell>
//                 <TableCell align="center"><strong>Head</strong></TableCell>
//                 <TableCell align="center"><strong>HR</strong></TableCell>
//                 <TableCell align="center"><strong>Average</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {parameters.map((row, index) => (
//                 <TableRow key={row.id}>
//                   <TableCell align="center">{index + 1}</TableCell>
//                   <TableCell align="center">{row.name}</TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.lm}
//                       onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.head}
//                       onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.hr}
//                       onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">{row.average}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
 
//         <Card variant="outlined" sx={{ mt: 3 }}>
//           <CardHeader title="Phase Comments" />
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Line Manager Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.lineManager}
//                   onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Head Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.head}
//                   onChange={(e) => handleCommentChange("head", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="HR Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.hr}
//                   onChange={(e) => handleCommentChange("hr", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
 
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSave} disabled>
//             {isSaving ? <CircularProgress size={24} /> : "Save Phase 3"}
//           </Button>
//         </Box>
 
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
// };
 
// const Phase4 = ({ user_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//       lineManager: "",
//       head: "",
//       hr: "",
//     });
 
//     const [isSaving, setIsSaving] = useState(false);
//     const [snackbar, setSnackbar] = useState({
//       open: false,
//       message: "",
//       severity: "success",
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id) {
//                 setError("User ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const phase4Data = response.data.data.filter(item => item.phase === 4);
 
//                     if (phase4Data.length > 0) {
//                         const loadedParameters = phase4Data.map(item => {
//                             const scores = [item.points_by_lm, item.points_by_head, item.points_by_hr].filter(score => score !== null && score !== undefined);
//                             const sum = scores.reduce((a, b) => a + b, 0);
//                             const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                             return {
//                                 id: item.parameter_id,
//                                 name: item.para_name || ` ${item.para_name}`,
//                                 lm: item.points_by_lm || "",
//                                 head: item.points_by_head || "",
//                                 hr: item.points_by_hr || "",
//                                 average: average,
//                             };
//                         });
//                         setParameters(loadedParameters);
 
//                         const firstRecord = phase4Data[0];
//                         setComments({
//                             lineManager: firstRecord.comment_by_lm || "",
//                             head: firstRecord.comment_by_head || "",
//                             hr: firstRecord.comment_by_hr || "",
//                         });
//                     }
//                 } else {
//                     setError("Failed to fetch data or data is in an invalid format.");
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id]);
 
//     const handleChange = (id, field, value) => {
//       const updated = parameters.map((param) => {
//         if (param.id === id) {
//           const newParam = { ...param, [field]: value };
//           const scores = [newParam.lm, newParam.head, newParam.hr]
//             .map(score => parseFloat(score))
//             .filter(score => !isNaN(score));
//           const sum = scores.reduce((a, b) => a + b, 0);
//           const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//           return { ...newParam, average: average };
//         }
//         return param;
//       });
//       setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//       setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//       setIsSaving(true);
//       const payload = {
//         entries: parameters.map(param => ({
//           emp_id: user_id,
//           parameter_id: param.id,
//           phase: 4,
//           points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//           comment_by_lm: comments.lineManager,
//           points_by_head: param.head ? parseInt(param.head, 10) : null,
//           comment_by_head: comments.head,
//           points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//           comment_by_hr: comments.hr,
//         }))
//       };
 
//       try {
//         await axiosInstance.post('apis/save_phasewise_data/', payload);
//         setSnackbar({
//           open: true,
//           message: "Phase 4 parameters saved successfully!",
//           severity: "success",
//         });
//       } catch (error) {
//         console.error("Failed to save Phase 4 parameters:", error);
//         setSnackbar({
//           open: true,
//           message: "Error saving parameters. Please try again.",
//           severity: "error",
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//       if (reason === "clickaway") return;
//       setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//       return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//       <Box>
//         <Typography variant="h6" gutterBottom align="center">
//           Phase 4 Content for Employee ID: {user_id}
//         </Typography>
 
//         <Paper elevation={2} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                 <TableCell align="center"><strong>Sr No</strong></TableCell>
//                 <TableCell align="center"><strong>Parameter</strong></TableCell>
//                 <TableCell align="center"><strong>LM</strong></TableCell>
//                 <TableCell align="center"><strong>Head</strong></TableCell>
//                 <TableCell align="center"><strong>HR</strong></TableCell>
//                 <TableCell align="center"><strong>Average</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {parameters.map((row, index) => (
//                 <TableRow key={row.id}>
//                   <TableCell align="center">{index + 1}</TableCell>
//                   <TableCell align="center">{row.name}</TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.lm}
//                       onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.head}
//                       onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField
//                       type="number"
//                       value={row.hr}
//                       onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                       inputProps={{ min: 0, max: 10 }}
//                       size="small"
//                       disabled
//                     />
//                   </TableCell>
//                   <TableCell align="center">{row.average}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Paper>
 
//         <Card variant="outlined" sx={{ mt: 3 }}>
//           <CardHeader title="Phase Comments" />
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Line Manager Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.lineManager}
//                   onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="Head Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.head}
//                   onChange={(e) => handleCommentChange("head", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   label="HR Comments"
//                   multiline
//                   rows={3}
//                   fullWidth
//                   value={comments.hr}
//                   onChange={(e) => handleCommentChange("hr", e.target.value)}
//                   disabled
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
 
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSave}
//             disabled
//           >
//             {isSaving ? <CircularProgress size={24} /> : "Save Phase 4"}
//           </Button>
//         </Box>
 
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={snackbar.severity}
//             variant="filled"
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
// };
 
// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
 
//     const [overallComments, setOverallComments] = useState({
//         hr: ""
//     });
 
//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 },
//         { kpi: "B", target: 2, ach: 5, rating: 7 },
//         { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);
 
//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 },
//         { parameter: "QCP", totalRating: 10 },
//     ]);
    
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseWiseData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`);
//                 if (response.data.status === "success") {
//                     setPhaseWiseData(response.data.data);
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch phase-wise data:", error);
//                 setError("Could not load phase-wise performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         const fetchAllPhaseComments = async () => {
//             if (!userId) return;
//             try {
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${userId}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = response.data.data.find(item => item.phase === phaseNum);
//                         return {
//                             phase: `Phase ${phaseNum}`,
//                             lm: phaseData?.comment_by_lm || "N/A",
//                             head: phaseData?.comment_by_head || "N/A",
//                             hr: phaseData?.comment_by_hr || "N/A",
//                         };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch all phase comments:", error);
//             }
//         };
 
//         fetchPhaseWiseData();
//         fetchAllPhaseComments();
//     }, [userId]);
    
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//     };
 
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };
 
//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
   
//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = [
//                     'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                     'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                     'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//                 ];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 const maxPhaseScorePerSlot = 40;
//                 const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                 if (totalMaxScore > 0) {
//                     value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 }
//             }
   
//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);
            
//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId, 
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };
 
//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });
 
//         } catch (error) {
//             console.error("Failed to save overall analysis:", error);
//             const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//             setSnackbar({ open: true, message: errorMessage, severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };
    
//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
    
//     let value4AEE = 0;
//     let percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = [
//             'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//             'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//             'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//         ];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         const maxPhaseScorePerSlot = 40;
//         const totalMaxScore = 12 * maxPhaseScorePerSlot;
 
//         if (totalMaxScore > 0) {
//             value4AEE = (totalApiScore / totalMaxScore) * 10;
//             percent4AEE = (totalApiScore / totalMaxScore) * 100;
//         }
//     }
 
//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;
 
//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//                 Performance Analysis Summary
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {phaseWiseData && phaseKeys.map((phase, index) => {
//                                             const lm = phaseWiseData[`phase${index + 1}_lm`] || 0;
//                                             const head = phaseWiseData[`phase${index + 1}_head`] || 0;
//                                             const hr = phaseWiseData[`phase${index + 1}_hr`] || 0;
//                                             return (
//                                                 <TableRow key={phase}>
//                                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                     <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                 </TableRow>
//                                             );
//                                         })}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '15%' }}>KPI</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Target</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Ach</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kpiData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '60%' }}>KRA Parameter</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%' }}>Total Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kraData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card>
//                         <CardHeader title="All Total" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         <TableRow>
//                                             <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                             <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                             <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                             <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                          <CardHeader title="All Phases Comments" />
//                          <CardContent>
//                              <TableContainer>
//                                  <Table>
//                                      <TableHead>
//                                          <TableRow>
//                                              <TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell>
//                                              <TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell>
//                                              <TableCell sx={{ fontWeight: "bold" }}>Head</TableCell>
//                                              <TableCell sx={{ fontWeight: "bold" }}>HR</TableCell>
//                                          </TableRow>
//                                      </TableHead>
//                                      <TableBody>
//                                          {allPhaseComments.map((row, index) => (
//                                              <TableRow key={index}>
//                                                  <TableCell>{row.phase}</TableCell>
//                                                  <TableCell>{row.lm}</TableCell>
//                                                  <TableCell>{row.head}</TableCell>
//                                                  <TableCell>{row.hr}</TableCell>
//                                              </TableRow>
//                                          ))}
//                                      </TableBody>
//                                  </Table>
//                              </TableContainer>
//                          </CardContent>
//                      </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="Overall Comments" />
//                         <CardContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField 
//                                         label="HR final comment" 
//                                         multiline 
//                                         rows={3} 
//                                         fullWidth 
//                                         value={overallComments.hr} 
//                                         onChange={(e) => handleOverallCommentChange("hr", e.target.value)} 
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
 
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
//                     {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Save Overall Analysis'}
//                 </Button>
//             </Box>
 
//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
 
// export const MarksHead = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id } = location.state || {};
 
//     const handleTabChange = (event, newValue) => {
//       setActiveTab(newValue);
//     };
 
//     const renderTabContent = () => {
//       const props = { user_id: user_id, userId: user_id, employeeVId: emp_id };
 
//       switch (activeTab) {
//         case 0: return <Phase1 {...props} />;
//         case 1: return <Phase2 {...props} />;
//         case 2: return <Phase3 {...props} />;
//         case 3: return <Phase4 {...props} />;
//         case 4: return <OverallAnalysis {...props} />;
//         default: return null;
//       }
//     };
 
//     return (
//       <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//         <Box sx={{ mb: 3 }}>
//           <AppBar
//             position="static"
//             sx={{ backgroundColor: "#ffffff", color: "#0d47a1", boxShadow: 2 }}
//           >
//             <Toolbar>
//               <IconButton
//                 edge="start"
//                 color="inherit"
//                 onClick={() => navigate("/hrms/dashboardHead/performanceTable/")}
//                 sx={{ mr: 2 }}
//               >
//                 <ArrowBackIcon />
//               </IconButton>
 
//               <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                 Employee Performance - ID: {id}
//               </Typography>
//             </Toolbar>
//           </AppBar>
 
//           <Box
//             sx={{
//               borderBottom: 1,
//               borderColor: "divider",
//               bgcolor: "#f5f5f5",
//               px: 2,
//               pt: 2,
//             }}
//           >
//             <Paper elevation={2} sx={{ borderRadius: 2, p: 1 }}>
//               <Tabs
//                 value={activeTab}
//                 onChange={handleTabChange}
//                 textColor="primary"
//                 indicatorColor="primary"
//                 centered
//               >
//                 <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                 <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                 <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                 <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                 <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//               </Tabs>
//             </Paper>
//           </Box>
//         </Box>
 
//         <Box px={3} pb={4}>
//           {renderTabContent()}
//         </Box>
//       </Box>
//     );
// };
 
// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": {
//       color: "#ec466f",
//     },
// }));
 
// export const PerformanceTableHead = () => {
//     const navigate = useNavigate();
 
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [statusSelection, setStatusSelection] = useState({});
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
 
//     useEffect(() => {
//       const fetchPerformanceData = async () => {
//         try {
//           setLoading(true);
//           const response = await fetch("https://tdtlworld.com/hrms-backend/apis/get_employee_performance/");
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const apiData = await response.json();
 
//           const transformedData = apiData.map((item, index) => ({
//             id: item.user_id,
//             empId: item.emp_id,
//             employee: item.full_name,
//             designation: item.designation_name,
//             doj: item.date_of_joining,
//             lm: item.manager_name,
//             phase1: item.phase_one_points,
//             phase2: item.phase_two_points,
//             phase3: item.phase_three_points,
//             phase4: item.phase_four_points,
//             overall: item.performance_analysis,
//             score: item.avg_score,
//             apiStatus: item.employee_status,
//           }));
 
//           setData(transformedData);
//           setError(null);
//         } catch (e) {
//           setError(e.message);
//           console.error("Failed to fetch performance data:", e);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchPerformanceData();
//     }, []);
 
//     const handleStatusChange = (id, value) => {
//       setStatusSelection((prev) => ({ ...prev, [id]: value }));
//     };
 
//     const handleConfirmStatus = (id) => {
//       const employee = data.find(emp => emp.id === id);
//       const selectedAction = statusSelection[id];
//       console.log(`Confirming action for ${employee.employee} (ID: ${id}) with status: ${selectedAction}`);
//     };
 
//     const handleNavigate = (id) => {
//       const selectedRow = data.find((emp) => emp.id === id);
//       if (!selectedRow) return;
 
//       navigate(`/hrms/dashboardHead/marks/${selectedRow.id}`, {
//         state: {
//           user_id: selectedRow.id,
//           emp_id: selectedRow.empId,
//         },
//       });
//     };
 
//     const getStatusColor = (status) => {
//       switch (status) {
//         case "Extend": return "#FFA726";
//         case "Confirm": return "#66BB6A";
//         case "Terminate": return "#EF5350";
//         default: return "";
//       }
//     };
 
//     const renderStatusBox = (status) => {
//       const style = {
//         backgroundColor: "#ECEFF1", color: "#607D8B", fontWeight: 600,
//       };
//       if (status === "Confirmed") {
//         style.backgroundColor = "#E8F5E9"; style.color = "#388E3C";
//       } else if (status === "Terminated") {
//         style.backgroundColor = "#FFEBEE"; style.color = "#D32F2F";
//       }
//       return (
//         <Box sx={{ px: 2, py: 0.5, borderRadius: 1, display: "inline-block", ...style }}>
//           {status}
//         </Box>
//       );
//     }
 
//     const renderBoxedCell = (value, isPercentage = false) => (
//       <Box sx={{
//         px: 1, py: 0.5, border: "1px solid #ccc",
//         borderRadius: 1, minWidth: 40, textAlign: "center",
//       }}>
//         {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//       </Box>
//     );
 
//     const filteredData = data.filter(item =>
//       item.employee.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//     const paginatedData = filteredData.slice(
//       (currentPage - 1) * rowsPerPage,
//       currentPage * rowsPerPage
//     );
 
//     if (loading) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Loading Performance Data...</Typography>
//         </Box>
//       );
//     }
 
//     if (error) {
//       return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//           <Typography color="error">Error: {error}</Typography>
//         </Box>
//       );
//     }
 
//     return (
//       <Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5" fontWeight="bold">
//             Performance Table
//           </Typography>
//         </Box>
 
//         <Box display="flex" justifyContent="space-between" mb={2} px={1}>
//           <FormControl size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               onChange={(e) => { setRowsPerPage(e.target.value); setCurrentPage(1); }}
//               label="Rows"
//               sx={{ width: 100 }}
//             >
//               {[5, 10, 15, 25].map((opt) => (
//                 <MenuItem key={opt} value={opt}>{opt}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
 
//           <TextField
//             size="small"
//             label="Search Employee"
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//           />
//         </Box>
 
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableRow>
//                 {[
//                   "Sr No", "Employee", "Designation", "DOJ", "LM",
//                   "Phase1", "Phase2", "Phase3", "Phase4",
//                   "Overall", "Score", "Status"
//                 ].map((heading) => (
//                   <TableCell key={heading} align="center" sx={{ fontWeight: 'bold' }}>
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
 
//             <TableBody>
//               {paginatedData.map((row, index) => {
//                 const selectedStatus = statusSelection[row.id] || "";
//                 return (
//                   <TableRow
//                     key={row.id}
//                     onMouseEnter={() => setHoveredRowId(row.id)}
//                     onMouseLeave={() => setHoveredRowId(null)}
//                     sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
//                   >
//                     <TableCell align="center">
//                       {(currentPage - 1) * rowsPerPage + index + 1}
//                     </TableCell>
 
//                     <TableCell align="center">
//                       {hoveredRowId === row.id ? (
//                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                           <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                           <StyledArrowButton onClick={() => handleNavigate(row.id)} size="small">
//                             <ArrowForwardIcon fontSize="small" />
//                           </StyledArrowButton>
//                         </Box>
//                       ) : (
//                         row.employee
//                       )}
//                     </TableCell>
 
//                     <TableCell align="center">{row.designation}</TableCell>
//                     <TableCell align="center">{row.doj}</TableCell>
//                     <TableCell align="center">{row.lm}</TableCell>
//                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
 
//                     <TableCell align="center">
//                       {row.apiStatus === "Pending" ? (
//                         <Box display="flex" alignItems="center" gap={1} justifyContent="center">
//                           <Select
//                             value={selectedStatus}
//                             onChange={(e) => handleStatusChange(row.id, e.target.value)}
//                             displayEmpty
//                             size="small"
//                             sx={{
//                               minWidth: 100,
//                               backgroundColor: getStatusColor(selectedStatus),
//                               color: selectedStatus ? "#fff" : "#000",
//                               fontWeight: 600,
//                               borderRadius: 1,
//                               "& .MuiSelect-icon": { color: selectedStatus ? "#fff" : "inherit" },
//                             }}
//                             renderValue={(value) => value || "Action"}
//                           >
//                             <MenuItem value="Confirm">Confirm</MenuItem>
//                             <MenuItem value="Extend">Extend</MenuItem>
//                             <MenuItem value="Terminate">Terminate</MenuItem>
//                           </Select>
 
//                           {selectedStatus && (
//                             <Button
//                               variant="contained"
//                               color="primary"
//                               size="small"
//                               onClick={() => handleConfirmStatus(row.id)}
//                             >
//                               Save
//                             </Button>
//                           )}
//                         </Box>
//                       ) : (
//                         renderStatusBox(row.apiStatus)
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
 
//         <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//           <Typography>Page {currentPage} of {totalPages}</Typography>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages || totalPages === 0}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>
//     );
// };




// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper, Select,
//     MenuItem, Button, IconButton, Typography,
//     Box, TextField, FormControl, InputLabel, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Snackbar, Alert, Card,
//     CardContent, CardHeader, Grid, TableFooter,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled, useTheme } from "@mui/material/styles";
// import axios from "axios";
 
// const axiosInstance = axios.create({
//     baseURL: "https://tdtlworld.com/hrms-backend/",
// });
 
// const Phase1 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 1;
 
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;
 
//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }
 
//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
 
//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }
 
//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
 
//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
 
//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });
 
//                 setParameters(loadedParameters);
 
//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });
 
//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
 
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id, designation_id]);
 
 
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 1,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
 
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({ open: true, message: "Phase 1 saved successfully!", severity: "success" });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 1 data:", error);
//             setSnackbar({ open: true, message: "Error saving Phase 1 data. Please try again.", severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 1 Content for Employee ID: {user_id}
//             </Typography>
 
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
 
//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
 
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 1")}
//                 </Button>
//             </Box>
 
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
 
// const Phase2 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 2;
 
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;
 
//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }
 
//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
 
//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }
 
//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
 
//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
 
//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });
 
//                 setParameters(loadedParameters);
 
//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });
 
//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
 
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id, designation_id]);
 
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 2,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
 
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({ open: true, message: "Phase 2 saved successfully!", severity: "success" });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 2 data:", error);
//             setSnackbar({ open: true, message: "Error saving Phase 2 data. Please try again.", severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 2 Content for Employee ID: {user_id}
//             </Typography>
 
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
 
//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
 
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 2")}
//                 </Button>
//             </Box>
 
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
 
// const Phase3 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 3;
 
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;
 
//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }
 
//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
 
//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }
 
//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
 
//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
 
//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });
 
//                 setParameters(loadedParameters);
 
//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });
 
//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
 
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id, designation_id]);
 
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 3,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
 
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({ open: true, message: "Phase 3 saved successfully!", severity: "success" });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 3 data:", error);
//             setSnackbar({ open: true, message: "Error saving Phase 3 data. Please try again.", severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 3 Content for Employee ID: {user_id}
//             </Typography>
 
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
 
//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
 
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 3")}
//                 </Button>
//             </Box>
 
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
 
// const Phase4 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success",
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 4;
 
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;
 
//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }
 
//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
 
//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }
 
//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
 
//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
 
//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });
 
//                 setParameters(loadedParameters);
 
//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });
 
//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
 
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchPhaseData();
//     }, [user_id, designation_id]);
 
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };
 
//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 4,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
 
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({
//                 open: true,
//                 message: "Phase 4 parameters saved successfully!",
//                 severity: "success",
//             });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 4 parameters:", error);
//             setSnackbar({
//                 open: true,
//                 message: "Error saving parameters. Please try again.",
//                 severity: "error",
//             });
//         } finally {
//             setIsSaving(false);
//         }
//     };
 
//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };
 
//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 4 Content for Employee ID: {user_id}
//             </Typography>
 
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
 
//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
 
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSave}
//                     disabled={isSaving || isSaved}
//                 >
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 4")}
//                 </Button>
//             </Box>
 
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity={snackbar.severity}
//                     variant="filled"
//                     sx={{ width: "100%" }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
 
// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isOverallSaved, setIsOverallSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({
//         hr: ""
//     });
 
//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 },
//         { kpi: "B", target: 2, ach: 5, rating: 7 },
//         { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);
 
//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 },
//         { parameter: "QCP", totalRating: 10 },
//     ]);
 
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
 
//     useEffect(() => {
//         const fetchPhaseWiseData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`);
//                 if (response.data.status === "success") {
//                     const data = response.data.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                     if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
//                         setIsOverallSaved(true);
//                     }
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch phase-wise data:", error);
//                 setError("Could not load phase-wise performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         const fetchAllPhaseComments = async () => {
//             if (!userId) return;
//             try {
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${userId}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = response.data.data.find(item => item.phase === phaseNum);
//                         return {
//                             phase: `Phase ${phaseNum}`,
//                             lm: phaseData?.comment_by_lm || "N/A",
//                             head: phaseData?.comment_by_head || "N/A",
//                             hr: phaseData?.comment_by_hr || "N/A",
//                         };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch all phase comments:", error);
//             }
//         };
 
//         fetchPhaseWiseData();
//         fetchAllPhaseComments();
//     }, [userId]);
 
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//     };
 
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };
 
//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };
 
//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
 
//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = [
//                     'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                     'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                     'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//                 ];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 const maxPhaseScorePerSlot = 40;
//                 const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                 if (totalMaxScore > 0) {
//                     value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 }
//             }
 
//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);
 
//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId,
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };
 
//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });
//             setIsOverallSaved(true);
 
//         } catch (error) {
//             console.error("Failed to save overall analysis:", error);
//             const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//             setSnackbar({ open: true, message: errorMessage, severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };
 
//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }
 
//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
 
//     let value4AEE = 0;
//     let percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = [
//             'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//             'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//             'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//         ];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         const maxPhaseScorePerSlot = 40;
//         const totalMaxScore = 12 * maxPhaseScorePerSlot;
 
//         if (totalMaxScore > 0) {
//             value4AEE = (totalApiScore / totalMaxScore) * 10;
//             percent4AEE = (totalApiScore / totalMaxScore) * 100;
//         }
//     }
 
//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;
 
//     const lmTotal = phaseWiseData ?
//         (phaseWiseData.phase1_lm || 0) +
//         (phaseWiseData.phase2_lm || 0) +
//         (phaseWiseData.phase3_lm || 0) +
//         (phaseWiseData.phase4_lm || 0) : 0;
 
//     const headTotal = phaseWiseData ?
//         (phaseWiseData.phase1_head || 0) +
//         (phaseWiseData.phase2_head || 0) +
//         (phaseWiseData.phase3_head || 0) +
//         (phaseWiseData.phase4_head || 0) : 0;
 
//     const hrTotal = phaseWiseData ?
//         (phaseWiseData.phase1_hr || 0) +
//         (phaseWiseData.phase2_hr || 0) +
//         (phaseWiseData.phase3_hr || 0) +
//         (phaseWiseData.phase4_hr || 0) : 0;
 
//     const grandTotal = lmTotal + headTotal + hrTotal;
 
//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//                 Performance Analysis Summary
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="Phase-wise Performance"   titleTypographyProps={{ variant: 'h6' }}  />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small">    
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5"}}>Phase</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Line Manager</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Head</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">HR</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Total</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {phaseWiseData && phaseKeys.map((phase, index) => {
//                                             const lm = phaseWiseData[`phase${index + 1}_lm`] || 0;
//                                             const head = phaseWiseData[`phase${index + 1}_head`] || 0;
//                                             const hr = phaseWiseData[`phase${index + 1}_hr`] || 0;
//                                             const rowTotal = lm + head + hr;
//                                             return (
//                                                 <TableRow key={phase} >
//                                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                     <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{rowTotal.toFixed(1)}</TableCell>
//                                                 </TableRow>
//                                             );
//                                         })}
                                   
//                                         <TableRow sx={{fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
//                                             <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell>
//                                         </TableRow>
//                                         </TableBody>
 
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '15%', backgroundColor: "#f5f5f5" }}>KPI</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Target</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Ach</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kpiData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '60%', backgroundColor: "#f5f5f5" }}>KRA Parameter</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%',backgroundColor: "#f5f5f5" }}>Total Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kraData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card>
//                         <CardHeader title="All Total" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{  backgroundColor: "#f5f5f5", fontWeight: "bold" }}>4AEE Program</TableCell>
//                                             <TableCell sx={{  backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                             <TableCell sx={{  backgroundColor: "#f5f5f5", fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                             <TableCell sx={{  backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                             <TableCell sx={{  backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{  backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         <TableRow sx={{ fontWeight: "bold"}}>
//                                             <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                             <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                             <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                             <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="All Phases Comments" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Phases</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Line Manager</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Head</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>HR</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {allPhaseComments.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell>{row.phase}</TableCell>
//                                                 <TableCell>{row.lm}</TableCell>
//                                                 <TableCell>{row.head}</TableCell>
//                                                 <TableCell>{row.hr}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 {/* <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="Overall Comments" />
//                         <CardContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         label="HR final comment"
//                                         multiline
//                                         rows={3}
//                                         fullWidth
//                                         value={overallComments.hr}
//                                         onChange={(e) => handleOverallCommentChange("hr", e.target.value)}
//                                         disabled={isOverallSaved}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid> */}
//             </Grid>
 
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isOverallSaved}>
//                     {isSaving ? <CircularProgress size={24} color="inherit" /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
//                 </Button>
//             </Box>
 
//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
 
// export const MarksHead = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id, designation_id } = location.state || {};
 
//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };
 
//     const renderTabContent = () => {
//         const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
 
//         switch (activeTab) {
//             case 0: return <Phase1 {...props} />;
//             case 1: return <Phase2 {...props} />;
//             case 2: return <Phase3 {...props} />;
//             case 3: return <Phase4 {...props} />;
//             case 4: return <OverallAnalysis {...props} />;
//             default: return null;
//         }
//     };
 
//     return (
//         <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//             <Box sx={{ mb: 3 }}>
//                 <AppBar
//                     position="static"
//                     sx={{ backgroundColor: "#ffffff", color: "#0d47a1", boxShadow: 2 }}
//                 >
//                     <Toolbar>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             onClick={() => navigate("/hrms/admindashboard/performanceTable")}
//                             sx={{ mr: 2 }}
//                         >
//                             <ArrowBackIcon />
//                         </IconButton>
 
//                         <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                             Employee Performance - ID: {id}
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
 
//                 <Box
//                     sx={{
//                         borderBottom: 1,
//                         borderColor: "divider",
//                         bgcolor: "#f5f5f5",
//                         px: 2,
//                         pt: 2,
//                     }}
//                 >
//                     <Paper elevation={2} sx={{ borderRadius: 2, p: 1 }}>
//                         <Tabs
//                             value={activeTab}
//                             onChange={handleTabChange}
//                             textColor="primary"
//                             indicatorColor="primary"
//                             centered
//                         >
//                             <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                             <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                             <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                             <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                             <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//                         </Tabs>
//                     </Paper>
//                 </Box>
//             </Box>
 
//             <Box px={3} pb={4}>
//                 {renderTabContent()}
//             </Box>
//         </Box>
//     );
// };
 
// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": {
//         color: "#ec466f",
//     },
// }));
 
// export const PerformanceTableHead = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
 
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [statusSelection, setStatusSelection] = useState({});
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
 
//     useEffect(() => {
//         const fetchPerformanceData = async () => {
//             const role_id = localStorage.getItem('userRoleId');
//             const user_id = localStorage.getItem('loggedInEmpId');
 
//             if (!role_id || !user_id) {
//                 setError("User role or ID not found in session. Please log in again.");
//                 setLoading(false);
//                 return;
//             }
 
//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_employee_performance/${role_id}/${user_id}/`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const apiData = await response.json();
 
//                 const transformedData = apiData.map((item, index) => ({
//                     id: item.user_id,
//                     empId: item.emp_id,
//                     employee: item.full_name,
//                     designation: item.designation_name,
//                     designation_id: item.designation_id,
//                     doj: item.date_of_joining,
//                     lm: item.manager_name,
//                     phase1: item.phase_one_points,
//                     phase2: item.phase_two_points,
//                     phase3: item.phase_three_points,
//                     phase4: item.phase_four_points,
//                     overall: item.performance_analysis,
//                     score: item.avg_score,
//                     apiStatus: item.employee_status,
//                 }));
 
//                 setData(transformedData);
//                 setError(null);
//             } catch (e) {
//                 setError(e.message);
//                 console.error("Failed to fetch performance data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPerformanceData();
//     }, []);
 
//     const handleStatusChange = (id, value) => {
//         setStatusSelection((prev) => ({ ...prev, [id]: value }));
//     };
 
//     const handleConfirmStatus = (id) => {
//         const employee = data.find(emp => emp.id === id);
//         const selectedAction = statusSelection[id];
//         console.log(`Confirming action for ${employee.employee} (ID: ${id}) with status: ${selectedAction}`);
//     };
 
//     const handleNavigate = (id) => {
//         const selectedRow = data.find((emp) => emp.id === id);
//         if (!selectedRow) return;
 
//         navigate(`/hrms/admindashboard/marks/${selectedRow.id}`, {
//             state: {
//                 user_id: selectedRow.id,
//                 emp_id: selectedRow.empId,
//                 designation_id: selectedRow.designation_id,
//             },
//         });
//     };
 
//     const getStatusColor = (status) => {
//         switch (status) {
//             case "Extend": return "#FFA726";
//             case "Confirm": return "#66BB6A";
//             case "Terminate": return "#EF5350";
//             default: return "";
//         }
//     };
 
//     const renderStatusBox = (status) => {
//         const style = {
//             backgroundColor: "#ECEFF1", color: "#607D8B", fontWeight: 600,
//         };
//         if (status === "Confirmed") {
//             style.backgroundColor = "#E8F5E9"; style.color = "#388E3C";
//         } else if (status === "Terminated") {
//             style.backgroundColor = "#FFEBEE"; style.color = "#D32F2F";
//         }
//         return (
//             <Box sx={{ px: 2, py: 0.5, borderRadius: 1, display: "inline-block", ...style }}>
//                 {status}
//             </Box>
//         );
//     }
 
//     const renderBoxedCell = (value, isPercentage = false) => (
//         <Box sx={{
//             px: 1, py: 0.5, border: "1px solid #ccc",
//             borderRadius: 1, minWidth: 40, textAlign: "center",
//         }}>
//             {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//         </Box>
//     );
 
//     const filteredData = data.filter(item =>
//         item.employee.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//     const paginatedData = filteredData.slice(
//         (currentPage - 1) * rowsPerPage,
//         currentPage * rowsPerPage
//     );
 
//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                 <CircularProgress />
//                 <Typography sx={{ ml: 2 }}>Loading Performance Data...</Typography>
//             </Box>
//         );
//     }
 
//     if (error) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                 <Typography color="error">Error: {error}</Typography>
//             </Box>
//         );
//     }
 
//     return (
//         <Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h5" fontWeight="bold">
//                     Performance Table
//                 </Typography>
//             </Box>
 
//             <Box display="flex" justifyContent="space-between" mb={2} px={1}>
//                 <FormControl size="small">
//                     <InputLabel>Rows</InputLabel>
//                     <Select
//                         value={rowsPerPage}
//                         onChange={(e) => { setRowsPerPage(e.target.value); setCurrentPage(1); }}
//                         label="Rows"
//                         sx={{ width: 100 }}
//                     >
//                         {[5, 10, 15, 25].map((opt) => (
//                             <MenuItem key={opt} value={opt}>{opt}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
 
//                 <TextField
//                     size="small"
//                     label="Search Employee"
//                     variant="outlined"
//                     value={searchQuery}
//                     onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//                 />
//             </Box>
 
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                         <TableRow>
//                             {[
//                                 "Sr No", "Employee", "Designation", "DOJ", "LM",
//                                 "Phase1", "Phase2", "Phase3", "Phase4",
//                                 "Overall", "Score"
//                             ].map((heading) => (
//                                 <TableCell key={heading} align="center" sx={{ fontWeight: 'bold' }}>
//                                     {heading}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
 
//                     <TableBody>
//                         {paginatedData.map((row, index) => {
//                             const selectedStatus = statusSelection[row.id] || "";
//                             return (
//                                 <TableRow
//                                     key={row.id}
//                                     onMouseEnter={() => setHoveredRowId(row.id)}
//                                     onMouseLeave={() => setHoveredRowId(null)}
//                                     sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
//                                 >
//                                     <TableCell align="center">
//                                         {(currentPage - 1) * rowsPerPage + index + 1}
//                                     </TableCell>
 
//                                     <TableCell align="center">
//                                         {hoveredRowId === row.id ? (
//                                             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                                 <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                                                 <StyledArrowButton onClick={() => handleNavigate(row.id)} size="small">
//                                                     <ArrowForwardIcon fontSize="small" />
//                                                 </StyledArrowButton>
//                                             </Box>
//                                         ) : (
//                                             row.employee
//                                         )}
//                                     </TableCell>
 
//                                     <TableCell align="center">{row.designation}</TableCell>
//                                     <TableCell align="center">{row.doj}</TableCell>
//                                     <TableCell align="center">{row.lm}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
 
//                                     {/* <TableCell align="center">
//                                         {row.apiStatus === "Pending" ? (
//                                             <Box display="flex" alignItems="center" gap={1} justifyContent="center">
//                                                 <Select
//                                                     value={selectedStatus}
//                                                     onChange={(e) => handleStatusChange(row.id, e.target.value)}
//                                                     displayEmpty
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: 100,
//                                                         backgroundColor: getStatusColor(selectedStatus),
//                                                         color: selectedStatus ? "#fff" : "#000",
//                                                         fontWeight: 600,
//                                                         borderRadius: 1,
//                                                         "& .MuiSelect-icon": { color: selectedStatus ? "#fff" : "inherit" },
//                                                     }}
//                                                     renderValue={(value) => value || "Action"}
//                                                 >
//                                                     <MenuItem value="Confirm">Confirm</MenuItem>
//                                                     <MenuItem value="Extend">Extend</MenuItem>
//                                                     <MenuItem value="Terminate">Terminate</MenuItem>
//                                                 </Select>
 
//                                                 {selectedStatus && (
//                                                     <Button
//                                                         variant="contained"
//                                                         color="primary"
//                                                         size="small"
//                                                         onClick={() => handleConfirmStatus(row.id)}
//                                                     >
//                                                         Save
//                                                     </Button>
//                                                 )}
//                                             </Box>
//                                         ) : (
//                                             renderStatusBox(row.apiStatus)
//                                         )}
//                                     </TableCell> */}
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
 
//             <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </Button>
//                 <Typography>Page {currentPage} of {totalPages}</Typography>
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages || totalPages === 0}
//                 >
//                     Next
//                 </Button>
//             </Box>
//         </Box>
//     );
// };







// import React, { useState, useEffect } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper,
//     Button, IconButton, Typography,
//     Box, TextField, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Alert, Card,
//     CardContent, CardHeader, Grid, TablePagination,
//     Skeleton, InputAdornment, useTheme, useMediaQuery, Chip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Axios instance remains unchanged
// const axiosInstance = axios.create({
//     baseURL: "https://tdtlworld.com/hrms-backend/",
// });

// // Helper function to show alerts using SweetAlert2 as requested
// const showAlert = (icon, title, text) => {
//     Swal.fire({
//         icon,
//         title,
//         text,
//         timer: 3000,
//         showConfirmButton: false,
//     });
// };

// const Phase1 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 1;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 // UPDATED: Lock the form if the Line Manager has already saved data.
//                 if (firstRecord && firstRecord.points_by_lm != null && firstRecord.comment_by_lm) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 1,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 1 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 1 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 1: Align</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 {/* UPDATED: Enabled LM score field */}
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 {/* UPDATED: Enabled LM comment field */}
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled={isSaved} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 1")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase2 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 2;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 // UPDATED: Lock the form if the Line Manager has already saved data.
//                 if (firstRecord && firstRecord.points_by_lm != null && firstRecord.comment_by_lm) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 2,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 2 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 2 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 2: Accelerate</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 {/* UPDATED: Enabled LM score field */}
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                  {/* UPDATED: Enabled LM comment field */}
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled={isSaved} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 2")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase3 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 3;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });
                
//                 // UPDATED: Lock the form if the Line Manager has already saved data.
//                 if (firstRecord && firstRecord.points_by_lm != null && firstRecord.comment_by_lm) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 3,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 3 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 3 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 3: Achieve</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 {/* UPDATED: Enabled LM score field */}
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 {/* UPDATED: Enabled LM comment field */}
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled={isSaved} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 3")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase4 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 4;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 // UPDATED: Lock the form if the Line Manager has already saved data.
//                 if (firstRecord && firstRecord.points_by_lm != null && firstRecord.comment_by_lm) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 4,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 4 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 4 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 4: Aspire</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 {/* UPDATED: Enabled LM score field */}
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 {/* UPDATED: Enabled LM comment field */}
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled={isSaved} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 4")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isOverallSaved, setIsOverallSaved] = useState(false);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 }, { kpi: "B", target: 2, ach: 5, rating: 7 }, { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);
//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 }, { parameter: "QCP", totalRating: 10 },
//     ]);
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
//     const [savingAction, setSavingAction] = useState(null);
//     const [actionTaken, setActionTaken] = useState(false);
//     const [employeeStatus, setEmployeeStatus] = useState(null);

//     useEffect(() => {
//         const fetchAllData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const role_id = localStorage.getItem('userRoleId');
//                 const loggedInEmpId = localStorage.getItem('loggedInEmpId');

//                 const [phaseWiseResponse, allCommentsResponse, performanceResponse] = await Promise.all([
//                     axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
//                     axiosInstance.get(`apis/get_phasewise_data/${userId}/`),
//                     axiosInstance.get(`apis/get_employee_performance/${role_id}/${loggedInEmpId}/`)
//                 ]);

//                 if (phaseWiseResponse.data.status === "success") {
//                     const data = phaseWiseResponse.data.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                     if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
//                         setIsOverallSaved(true);
//                     }
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }

//                 if (allCommentsResponse.data.status === "success" && Array.isArray(allCommentsResponse.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = allCommentsResponse.data.data.find(item => item.phase === phaseNum);
//                         return { phase: `Phase ${phaseNum}`, lm: phaseData?.comment_by_lm || "N/A", head: phaseData?.comment_by_head || "N/A", hr: phaseData?.comment_by_hr || "N/A" };
//                     });
//                     setAllPhaseComments(comments);
//                 }

//                 const employeeList = performanceResponse.data;
//                 const currentUserPerformance = Array.isArray(employeeList) ? employeeList.find(emp => emp.user_id === userId) : null;

//                 if (currentUserPerformance && currentUserPerformance.employee_status) {
//                     const status = currentUserPerformance.employee_status.toLowerCase();
//                     if (['confirm', 'extend', 'terminate', 'terminated', 'confirmed', 'extended'].includes(status)) {
//                         setEmployeeStatus(currentUserPerformance.employee_status);
//                         setActionTaken(true);
//                     }
//                 } else {
//                     setActionTaken(false);
//                 }

//             } catch (error) {
//                 setError("Could not load performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllData();
//     }, [userId]);
    
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//             }

//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId,
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };

//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             showAlert("success", "Success!", "Overall analysis saved successfully!");
//             setIsOverallSaved(true);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "An error occurred while saving.";
//             showAlert("error", "Error!", errorMessage);
//         } finally {
//             setIsSaving(false);
//         }
//     };
    
//     const handleFinalAction = async (action) => {
//         const actionText = {
//             confirm: 'Do you want to confirm this employee?',
//             extend: 'Do you want to extend probation for this employee?',
//             terminate: 'This action is final and cannot be undone.'
//         };
    
//         const result = await Swal.fire({
//             title: `Are you sure?`,
//             text: actionText[action],
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: action === 'terminate' ? '#d33' : '#3085d6',
//             cancelButtonColor: '#6c757d',
//             confirmButtonText: `Yes, ${action}!`
//         });
    
//         if (result.isConfirmed) {
//             setSavingAction(action);
//             try {
//                 const payload = {
//                     user_id: userId,
//                     action: action
//                 };
//                 await axiosInstance.patch("apis/final_confirmation_action/", payload);
//                 showAlert("success", "Success!", `Employee status updated to ${action}.`);
//                 setActionTaken(true);
//                 setEmployeeStatus(action);
//             } catch (error) {
//                 const errorMessage = error.response?.data?.message || `An error occurred while updating status.`;
//                 showAlert("error", "Error!", errorMessage);
//             } finally {
//                 setSavingAction(null);
//             }
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
//     let value4AEE = 0, percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         value4AEE = (totalApiScore / 480) * 10;
//         percent4AEE = (totalApiScore / 480) * 100;
//     }
//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;
//     const lmTotal = phaseWiseData ? (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ? (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ? (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}><Card><CardHeader title="Phase-wise Performance" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {phaseWiseData && phaseKeys.map((p, i) => (<TableRow key={p}><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][i]}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_lm`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_head`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_hr`] || 0).toFixed(1)}</TableCell><TableCell align="right">{((phaseWiseData[`phase${i + 1}_lm`] || 0) + (phaseWiseData[`phase${i + 1}_head`] || 0) + (phaseWiseData[`phase${i + 1}_hr`] || 0)).toFixed(1)}</TableCell></TableRow>))}
//                         <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>
//                     </TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KPI" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kpiData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(i, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(i, "target", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(i, "ach", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(i, "rating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KRA" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Total Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kraData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(i, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(i, "totalRating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell></TableRow></TableHead>
//                     <TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell></TableRow></TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead>
//                     <TableBody>{allPhaseComments.map((row, i) => (<TableRow key={i}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//             </Grid>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isOverallSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{color: 'white'}} /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
//                 </Button>
//             </Box>
            
//             {actionTaken ? (
//                 <Box display="flex" justifyContent="center" mt={3}>
//                     <Alert severity="info" sx={{width: 'fit-content'}}>
//                         Final Status: <strong>{employeeStatus ? employeeStatus.toUpperCase() : 'N/A'}</strong>
//                     </Alert>
//                 </Box>
//             ) : (
//                 <Box display="flex" justifyContent="center" gap={2} mt={3}>
//                     <Button variant="contained" color="success" onClick={() => handleFinalAction('confirm')} disabled={!isOverallSaved || savingAction}>
//                         {savingAction === 'confirm' ? <CircularProgress size={24} color="inherit" /> : "Confirm Employee"}
//                     </Button>
//                     <Button variant="contained" color="warning" onClick={() => handleFinalAction('extend')} disabled={!isOverallSaved || savingAction}>
//                         {savingAction === 'extend' ? <CircularProgress size={24} color="inherit" /> : "Extend Probation"}
//                     </Button>
//                     <Button variant="contained" color="error" onClick={() => handleFinalAction('terminate')} disabled={!isOverallSaved || savingAction}>
//                         {savingAction === 'terminate' ? <CircularProgress size={24} color="inherit" /> : "Terminate Employee"}
//                     </Button>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export const MarksHead = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id, designation_id } = location.state || {};

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const renderTabContent = () => {
//         const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
//         switch (activeTab) {
//             case 0: return <Phase1 {...props} />;
//             case 1: return <Phase2 {...props} />;
//             case 2: return <Phase3 {...props} />;
//             case 3: return <Phase4 {...props} />;
//             case 4: return <OverallAnalysis {...props} />;
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#8C257C", color: "#FFFFFF" }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={() => navigate("/hrms/dashboardHead/performanceTable")} sx={{ mr: 2 }} >
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                         Employee Performance - ID: {id}
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5", p: 2 }}>
//                 <Paper elevation={2} sx={{ borderRadius: 2 }}>
//                     <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
//                         <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                         <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//                     </Tabs>
//                 </Paper>
//             </Box>
//             <Box px={3} pb={4} pt={2}>
//                 {renderTabContent()}
//             </Box>
//         </Box>
//     );
// };

// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": { color: "#8C257C" },
// }));

// export const PerformanceTableHead = () => {
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchPerformanceData = async () => {
//             setLoading(true);
//             const role_id = localStorage.getItem('userRoleId');
//             const user_id = localStorage.getItem('loggedInEmpId');
//             if (!role_id || !user_id) {
//                 setError("User role or ID not found. Please log in again.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 const response = await axiosInstance.get(`apis/get_employee_performance/${role_id}/${user_id}/`);
//                 const transformedData = response.data.map(item => ({
//                     id: item.user_id, empId: item.emp_id, employee: item.full_name, designation: item.designation_name, designation_id: item.designation_id,
//                     doj: item.date_of_joining, lm: item.manager_name, phase1: item.phase_one_points, phase2: item.phase_two_points, phase3: item.phase_three_points,
//                     phase4: item.phase_four_points, overall: item.performance_analysis, score: item.avg_score, apiStatus: item.employee_status,
//                 }));
//                 setData(transformedData);
//                 setError(null);
//             } catch (e) {
//                 setError(e.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPerformanceData();
//     }, []);

//     const handleNavigate = (row) => {
//         navigate(`/hrms/dashboardHead/marks/${row.id}`, {
//             state: { user_id: row.id, emp_id: row.empId, designation_id: row.designation_id },
//         });
//     };

//     const renderBoxedCell = (value, isPercentage = false) => (
//         <Box sx={{ px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: 1, minWidth: 40, textAlign: "center" }}>
//             {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//         </Box>
//     );

//     const renderStatusCell = (status) => {
//         let color = "info";
//         let label = "In Progress";
    
//         if (status) {
//             const lowerCaseStatus = status.toLowerCase();
    
//             switch (lowerCaseStatus) {
//                 case 'confirm':
//                 case 'confirmed':
//                     color = "success";
//                     label = "Confirmed";
//                     break;
//                 case 'extend':
//                 case 'extended':
//                     color = "warning";
//                     label = "Extended";
//                     break;
//                 case 'terminate':
//                 case 'terminated':
//                     color = "error";
//                     label = "Terminated";
//                     break;
//                 default:
//                     label = status.charAt(0).toUpperCase() + status.slice(1);
//                     color = "info";
//                     break;
//             }
//         }
        
//         return <Chip label={label} color={color} size="small" />;
//     };

//     const filteredData = data.filter(item =>
//         item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.lm && item.lm.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     if (error) {
//         return <Box component={Paper} p={3}><Alert severity="error">Error: {error}</Alert></Box>;
//     }
    
//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
//                 Performance Table
//             </Typography>

//             <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//                 <Box></Box> 
//                 <TextField
//                     size="small"
//                     placeholder="Search ..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//                     sx={{ width: isMobile ? '100%' : 'auto' }}
//                 />
//             </Box>

//             <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#8C257C" }}>
//                         <TableRow>
//                             {["Sr No", "Employee", "Designation", "DOJ", "LM", "P1", "P2", "P3", "P4", "Overall", "Score", "Status"].map(h => (
//                                 <TableCell key={h} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>{h}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.id} hover onMouseEnter={() => setHoveredRowId(row.id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell align="center">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                                             <StyledArrowButton onClick={() => handleNavigate(row)} size="small" sx={{ visibility: hoveredRowId === row.id ? 'visible' : 'hidden' }}>
//                                                 <ArrowForwardIcon fontSize="small" />
//                                             </StyledArrowButton>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.designation}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.doj}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.lm}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
//                                     <TableCell align="center">{renderStatusCell(row.apiStatus)}</TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={(event, newPage) => setPage(newPage)}
//                 onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
//                 sx={{
//                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                         color: 'text.secondary',
//                         fontSize: '0.875rem'
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: '#8C257C'
//                     }
//                 }}
//             />
//         </Box>
//     );
// };

// export default PerformanceTableHead;





// import React, { useState, useEffect } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper,
//     Button, IconButton, Typography,
//     Box, TextField, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Alert, Card,
//     CardContent, CardHeader, Grid, TablePagination,
//     Skeleton, InputAdornment, useTheme, useMediaQuery, Chip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import axios from "axios";
// import Swal from "sweetalert2";

// const axiosInstance = axios.create({
//     baseURL: "https://tdtlworld.com/hrms-backend/",
// });

// const showAlert = (icon, title, text) => {
//     Swal.fire({
//         icon,
//         title,
//         text,
//         timer: 3000,
//         showConfirmButton: false,
//     });
// };

// const Phase1 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 1;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 1,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 1 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 1 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 1: Align</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 1")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase2 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 2;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 2,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 2 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 2 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 2: Accelerate</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 2")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase3 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 3;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });
                
//                 if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 3,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 3 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 3 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 3: Achieve</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 3")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase4 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 4;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 4,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 4 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 4 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 4: Aspire</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 4")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isOverallSaved, setIsOverallSaved] = useState(false);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 }, { kpi: "B", target: 2, ach: 5, rating: 7 }, { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);
//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 }, { parameter: "QCP", totalRating: 10 },
//     ]);
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
//     const [employeeStatus, setEmployeeStatus] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3');

//         const fetchAllData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const loggedInEmpId = localStorage.getItem('loggedInEmpId');

//                 const [phaseWiseResponse, allCommentsResponse, performanceResponse] = await Promise.all([
//                     axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
//                     axiosInstance.get(`apis/get_phasewise_data/${userId}/`),
//                     axiosInstance.get(`apis/get_employee_performance/${role_id}/${loggedInEmpId}/`)
//                 ]);

//                 if (phaseWiseResponse.data.status === "success") {
//                     const data = phaseWiseResponse.data.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                     if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
//                         setIsOverallSaved(true);
//                     }
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }

//                 if (allCommentsResponse.data.status === "success" && Array.isArray(allCommentsResponse.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = allCommentsResponse.data.data.find(item => item.phase === phaseNum);
//                         return { phase: `Phase ${phaseNum}`, lm: phaseData?.comment_by_lm || "N/A", head: phaseData?.comment_by_head || "N/A", hr: phaseData?.comment_by_hr || "N/A" };
//                     });
//                     setAllPhaseComments(comments);
//                 }

//                 const employeeList = performanceResponse.data;
//                 const currentUserPerformance = Array.isArray(employeeList) ? employeeList.find(emp => emp.user_id === userId) : null;

//                 if (currentUserPerformance && currentUserPerformance.employee_status) {
//                     const status = currentUserPerformance.employee_status.toLowerCase();
//                     if (['confirm', 'extend', 'terminate', 'terminated', 'confirmed', 'extended'].includes(status)) {
//                         setEmployeeStatus(currentUserPerformance.employee_status);
//                     }
//                 }

//             } catch (error) {
//                 setError("Could not load performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllData();
//     }, [userId]);
    
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//             }

//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId,
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };

//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             showAlert("success", "Success!", "Overall analysis saved successfully!");
//             setIsOverallSaved(true);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "An error occurred while saving.";
//             showAlert("error", "Error!", errorMessage);
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
//     let value4AEE = 0, percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         value4AEE = (totalApiScore / 480) * 10;
//         percent4AEE = (totalApiScore / 480) * 100;
//     }
//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;
//     const lmTotal = phaseWiseData ? (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ? (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ? (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}><Card><CardHeader title="Phase-wise Performance" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {phaseWiseData && phaseKeys.map((p, i) => (<TableRow key={p}><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][i]}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_lm`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_head`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_hr`] || 0).toFixed(1)}</TableCell><TableCell align="right">{((phaseWiseData[`phase${i + 1}_lm`] || 0) + (phaseWiseData[`phase${i + 1}_head`] || 0) + (phaseWiseData[`phase${i + 1}_hr`] || 0)).toFixed(1)}</TableCell></TableRow>))}
//                         <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>
//                     </TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KPI" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kpiData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(i, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(i, "target", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(i, "ach", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(i, "rating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KRA" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Total Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kraData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(i, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(i, "totalRating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell></TableRow></TableHead>
//                     <TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell></TableRow></TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead>
//                     <TableBody>{allPhaseComments.map((row, i) => (<TableRow key={i}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//             </Grid>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isOverallSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{color: 'white'}} /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
//                 </Button>
//             </Box>
            
//             {employeeStatus && (
//                 <Box display="flex" justifyContent="center" mt={3}>
//                     <Alert severity="info" sx={{width: 'fit-content'}}>
//                         Final Status: <strong>{employeeStatus.toUpperCase()}</strong>
//                     </Alert>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export const MarksHead = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id, designation_id } = location.state || {};

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const renderTabContent = () => {
//         const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
//         switch (activeTab) {
//             case 0: return <Phase1 {...props} />;
//             case 1: return <Phase2 {...props} />;
//             case 2: return <Phase3 {...props} />;
//             case 3: return <Phase4 {...props} />;
//             case 4: return <OverallAnalysis {...props} />;
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#8C257C", color: "#FFFFFF" }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={() => navigate("/hrms/dashboardHead/performanceTable")} sx={{ mr: 2 }} >
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                         Employee Performance - ID: {id}
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5", p: 2 }}>
//                 <Paper elevation={2} sx={{ borderRadius: 2 }}>
//                     <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
//                         <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                         <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//                     </Tabs>
//                 </Paper>
//             </Box>
//             <Box px={3} pb={4} pt={2}>
//                 {renderTabContent()}
//             </Box>
//         </Box>
//     );
// };

// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": { color: "#8C257C" },
// }));

// export const PerformanceTableHead = () => {
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchPerformanceData = async () => {
//             setLoading(true);
//             const role_id = localStorage.getItem('userRoleId');
//             const user_id = localStorage.getItem('loggedInEmpId');
//             if (!role_id || !user_id) {
//                 setError("User role or ID not found. Please log in again.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 const response = await axiosInstance.get(`apis/get_employee_performance/${role_id}/${user_id}/`);
//                 const transformedData = response.data.map(item => ({
//                     id: item.user_id, empId: item.emp_id, employee: item.full_name, designation: item.designation_name, designation_id: item.designation_id,
//                     doj: item.date_of_joining, lm: item.manager_name, phase1: item.phase_one_points, phase2: item.phase_two_points, phase3: item.phase_three_points,
//                     phase4: item.phase_four_points, overall: item.performance_analysis, score: item.avg_score, apiStatus: item.employee_status,
//                 }));
//                 setData(transformedData);
//                 setError(null);
//             } catch (e) {
//                 setError(e.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPerformanceData();
//     }, []);

//     const handleNavigate = (row) => {
//         navigate(`/hrms/dashboardHead/marks/${row.id}`, {
//             state: { user_id: row.id, emp_id: row.empId, designation_id: row.designation_id },
//         });
//     };

//     const renderBoxedCell = (value, isPercentage = false) => (
//         <Box sx={{ px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: 1, minWidth: 40, textAlign: "center" }}>
//             {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//         </Box>
//     );

//     const renderStatusCell = (status) => {
//         let color = "info";
//         let label = "In Progress";
    
//         if (status) {
//             const lowerCaseStatus = status.toLowerCase();
    
//             switch (lowerCaseStatus) {
//                 case 'confirm':
//                 case 'confirmed':
//                     color = "success";
//                     label = "Confirmed";
//                     break;
//                 case 'extend':
//                 case 'extended':
//                     color = "warning";
//                     label = "Extended";
//                     break;
//                 case 'terminate':
//                 case 'terminated':
//                     color = "error";
//                     label = "Terminated";
//                     break;
//                 default:
//                     label = status.charAt(0).toUpperCase() + status.slice(1);
//                     color = "info";
//                     break;
//             }
//         }
        
//         return <Chip label={label} color={color} size="small" />;
//     };

//     const filteredData = data.filter(item =>
//         item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.lm && item.lm.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     if (error) {
//         return <Box component={Paper} p={3}><Alert severity="error">Error: {error}</Alert></Box>;
//     }
    
//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
//                 Performance Table
//             </Typography>

//             <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//                 <Box></Box> 
//                 <TextField
//                     size="small"
//                     placeholder="Search ..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//                     sx={{ width: isMobile ? '100%' : 'auto' }}
//                 />
//             </Box>

//             <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#8C257C" }}>
//                         <TableRow>
//                             {["Sr No", "Employee", "Designation", "DOJ", "LM", "P1", "P2", "P3", "P4", "Overall", "Score", "Status"].map(h => (
//                                 <TableCell key={h} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>{h}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.id} hover onMouseEnter={() => setHoveredRowId(row.id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell align="center">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                                             <StyledArrowButton onClick={() => handleNavigate(row)} size="small" sx={{ visibility: hoveredRowId === row.id ? 'visible' : 'hidden' }}>
//                                                 <ArrowForwardIcon fontSize="small" />
//                                             </StyledArrowButton>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.designation}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.doj}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.lm}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
//                                     <TableCell align="center">{renderStatusCell(row.apiStatus)}</TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={(event, newPage) => setPage(newPage)}
//                 onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
//                 sx={{
//                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                         color: 'text.secondary',
//                         fontSize: '0.875rem'
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: '#8C257C'
//                     }
//                 }}
//             />
//         </Box>
//     );
// };

// export default PerformanceTableHead;









// import React, { useState, useEffect } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper,
//     Button, IconButton, Typography,
//     Box, TextField, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Alert, Card,
//     CardContent, CardHeader, Grid, TablePagination,
//     Skeleton, InputAdornment, useTheme, useMediaQuery, Chip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import axios from "axios";
// import Swal from "sweetalert2";

// const axiosInstance = axios.create({
//     baseURL: "https://tdtlworld.com/hrms-backend/",
// });

// const showAlert = (icon, title, text) => {
//     Swal.fire({
//         icon,
//         title,
//         text,
//         timer: 3000,
//         showConfirmButton: false,
//     });
// };

// const Phase1 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 1;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });

//                     const hasHeadSaved = allEmployeeData.some(item => item.phase === phaseNumber && item.points_by_head != null);
//                     if (hasHeadSaved) {
//                         setIsSaved(true);
//                     }
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 1,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 1 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 1 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 1: Align</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 1")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase2 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 2;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });

//                     const hasHeadSaved = allEmployeeData.some(item => item.phase === phaseNumber && item.points_by_head != null);
//                     if (hasHeadSaved) {
//                         setIsSaved(true);
//                     }
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });
                
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 2,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 2 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 2 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 2: Accelerate</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 2")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase3 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 3;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
                    
//                     const hasHeadSaved = allEmployeeData.some(item => item.phase === phaseNumber && item.points_by_head != null);
//                     if (hasHeadSaved) {
//                         setIsSaved(true);
//                     }
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });
                
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 3,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 3 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 3 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 3: Achieve</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 3")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase4 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3'); 

//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 4;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });

//                     const hasHeadSaved = allEmployeeData.some(item => item.phase === phaseNumber && item.points_by_head != null);
//                     if (hasHeadSaved) {
//                         setIsSaved(true);
//                     }
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 4,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 4 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 4 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 4: Aspire</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved || !isHead} /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved || !isHead} /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 4")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isOverallSaved, setIsOverallSaved] = useState(false);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 }, { kpi: "B", target: 2, ach: 5, rating: 7 }, { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);
//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 }, { parameter: "QCP", totalRating: 10 },
//     ]);
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
//     const [employeeStatus, setEmployeeStatus] = useState(null);
//     const [isHead, setIsHead] = useState(false);

//     useEffect(() => {
//         const role_id = localStorage.getItem('userRoleId');
//         setIsHead(role_id === '3');

//         const fetchAllData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const loggedInEmpId = localStorage.getItem('loggedInEmpId');

//                 const [phaseWiseResponse, allCommentsResponse, performanceResponse] = await Promise.all([
//                     axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
//                     axiosInstance.get(`apis/get_phasewise_data/${userId}/`),
//                     axiosInstance.get(`apis/get_employee_performance/${role_id}/${loggedInEmpId}/`)
//                 ]);

//                 if (phaseWiseResponse.data.status === "success") {
//                     const data = phaseWiseResponse.data.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                     if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
//                         setIsOverallSaved(true);
//                     }
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }

//                 if (allCommentsResponse.data.status === "success" && Array.isArray(allCommentsResponse.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = allCommentsResponse.data.data.find(item => item.phase === phaseNum);
//                         return { phase: `Phase ${phaseNum}`, lm: phaseData?.comment_by_lm || "N/A", head: phaseData?.comment_by_head || "N/A", hr: phaseData?.comment_by_hr || "N/A" };
//                     });
//                     setAllPhaseComments(comments);
//                 }

//                 const employeeList = performanceResponse.data;
//                 const currentUserPerformance = Array.isArray(employeeList) ? employeeList.find(emp => emp.user_id === userId) : null;

//                 if (currentUserPerformance && currentUserPerformance.employee_status) {
//                     const status = currentUserPerformance.employee_status.toLowerCase();
//                     if (['confirm', 'extend', 'terminate', 'terminated', 'confirmed', 'extended'].includes(status)) {
//                         setEmployeeStatus(currentUserPerformance.employee_status);
//                     }
//                 }

//             } catch (error) {
//                 setError("Could not load performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllData();
//     }, [userId]);
    
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//             }

//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId,
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };

//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             showAlert("success", "Success!", "Overall analysis saved successfully!");
//             setIsOverallSaved(true);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "An error occurred while saving.";
//             showAlert("error", "Error!", errorMessage);
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
//     let value4AEE = 0, percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         value4AEE = (totalApiScore / 480) * 10;
//         percent4AEE = (totalApiScore / 480) * 100;
//     }
//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;
//     const lmTotal = phaseWiseData ? (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ? (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ? (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}><Card><CardHeader title="Phase-wise Performance" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {phaseWiseData && phaseKeys.map((p, i) => (<TableRow key={p}><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][i]}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_lm`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_head`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_hr`] || 0).toFixed(1)}</TableCell><TableCell align="right">{((phaseWiseData[`phase${i + 1}_lm`] || 0) + (phaseWiseData[`phase${i + 1}_head`] || 0) + (phaseWiseData[`phase${i + 1}_hr`] || 0)).toFixed(1)}</TableCell></TableRow>))}
//                         <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>
//                     </TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KPI" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kpiData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(i, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(i, "target", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(i, "ach", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(i, "rating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KRA" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Total Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kraData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(i, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(i, "totalRating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved || !isHead} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell></TableRow></TableHead>
//                     <TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell></TableRow></TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead>
//                     <TableBody>{allPhaseComments.map((row, i) => (<TableRow key={i}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//             </Grid>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isOverallSaved || !isHead}>
//                     {isSaving ? <CircularProgress size={24} sx={{color: 'white'}} /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
//                 </Button>
//             </Box>
            
//             {employeeStatus && (
//                 <Box display="flex" justifyContent="center" mt={3}>
//                     <Alert severity="info" sx={{width: 'fit-content'}}>
//                         Final Status: <strong>{employeeStatus.toUpperCase()}</strong>
//                     </Alert>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export const MarksHead = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id, designation_id } = location.state || {};

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const renderTabContent = () => {
//         const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
//         switch (activeTab) {
//             case 0: return <Phase1 {...props} />;
//             case 1: return <Phase2 {...props} />;
//             case 2: return <Phase3 {...props} />;
//             case 3: return <Phase4 {...props} />;
//             case 4: return <OverallAnalysis {...props} />;
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#8C257C", color: "#FFFFFF" }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={() => navigate("/hrms/dashboardHead/performanceTable")} sx={{ mr: 2 }} >
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                         Employee Performance - ID: {id}
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5", p: 2 }}>
//                 <Paper elevation={2} sx={{ borderRadius: 2 }}>
//                     <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
//                         <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                         <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//                     </Tabs>
//                 </Paper>
//             </Box>
//             <Box px={3} pb={4} pt={2}>
//                 {renderTabContent()}
//             </Box>
//         </Box>
//     );
// };

// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": { color: "#8C257C" },
// }));

// export const PerformanceTableHead = () => {
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchPerformanceData = async () => {
//             setLoading(true);
//             const role_id = localStorage.getItem('userRoleId');
//             const user_id = localStorage.getItem('loggedInEmpId');
//             if (!role_id || !user_id) {
//                 setError("User role or ID not found. Please log in again.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 const response = await axiosInstance.get(`apis/get_employee_performance/${role_id}/${user_id}/`);
//                 const transformedData = response.data.map(item => ({
//                     id: item.user_id, empId: item.emp_id, employee: item.full_name, designation: item.designation_name, designation_id: item.designation_id,
//                     doj: item.date_of_joining, lm: item.manager_name, phase1: item.phase_one_points, phase2: item.phase_two_points, phase3: item.phase_three_points,
//                     phase4: item.phase_four_points, overall: item.performance_analysis, score: item.avg_score, apiStatus: item.employee_status,
//                 }));
//                 setData(transformedData);
//                 setError(null);
//             } catch (e) {
//                 setError(e.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPerformanceData();
//     }, []);

//     const handleNavigate = (row) => {
//         navigate(`/hrms/dashboardHead/marks/${row.id}`, {
//             state: { user_id: row.id, emp_id: row.empId, designation_id: row.designation_id },
//         });
//     };

//     const renderBoxedCell = (value, isPercentage = false) => (
//         <Box sx={{ px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: 1, minWidth: 40, textAlign: "center" }}>
//             {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//         </Box>
//     );

//     const renderStatusCell = (status) => {
//         let color = "info";
//         let label = "In Progress";
    
//         if (status) {
//             const lowerCaseStatus = status.toLowerCase();
    
//             switch (lowerCaseStatus) {
//                 case 'confirm':
//                 case 'confirmed':
//                     color = "success";
//                     label = "Confirmed";
//                     break;
//                 case 'extend':
//                 case 'extended':
//                     color = "warning";
//                     label = "Extended";
//                     break;
//                 case 'terminate':
//                 case 'terminated':
//                     color = "error";
//                     label = "Terminated";
//                     break;
//                 default:
//                     label = status.charAt(0).toUpperCase() + status.slice(1);
//                     color = "info";
//                     break;
//             }
//         }
        
//         return <Chip label={label} color={color} size="small" />;
//     };

//     const filteredData = data.filter(item =>
//         item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (item.lm && item.lm.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     if (error) {
//         return <Box component={Paper} p={3}><Alert severity="error">Error: {error}</Alert></Box>;
//     }
    
//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
//                 Performance Table
//             </Typography>

//             <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//                 <Box></Box> 
//                 <TextField
//                     size="small"
//                     placeholder="Search ..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//                     sx={{ width: isMobile ? '100%' : 'auto' }}
//                 />
//             </Box>

//             <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#8C257C" }}>
//                         <TableRow>
//                             {["Sr No", "Employee", "Designation", "DOJ", "LM", "P1", "P2", "P3", "P4", "Overall", "Score", "Status"].map(h => (
//                                 <TableCell key={h} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>{h}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.id} hover onMouseEnter={() => setHoveredRowId(row.id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell align="center">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                                             <StyledArrowButton onClick={() => handleNavigate(row)} size="small" sx={{ visibility: hoveredRowId === row.id ? 'visible' : 'hidden' }}>
//                                                 <ArrowForwardIcon fontSize="small" />
//                                             </StyledArrowButton>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.designation}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.doj}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.lm}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
//                                     <TableCell align="center">{renderStatusCell(row.apiStatus)}</TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={(event, newPage) => setPage(newPage)}
//                 onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
//                 sx={{
//                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                         color: 'text.secondary',
//                         fontSize: '0.875rem'
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: '#8C257C'
//                     }
//                 }}
//             />
//         </Box>
//     );
// };

// export default PerformanceTableHead;






import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,
    Button, IconButton, Typography,
    Box, TextField, CircularProgress,
    Tabs, Tab, Toolbar, AppBar, Alert, Card,
    CardContent, CardHeader, Grid, TablePagination,
    Skeleton, InputAdornment, useTheme, useMediaQuery, Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: "https://tdtlworld.com/hrms-backend/",
});

const showAlert = (icon, title, text) => {
    Swal.fire({
        icon,
        title,
        text,
        timer: 3000,
        showConfirmButton: false,
    });
};

const Phase1 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 1;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);

    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 1,
                points_by_lm: param.lm !== "" ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head !== "" ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr !== "" ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 1 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 1 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 1: Align</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
                                <TableCell align="center"><strong>Sr No</strong></TableCell>
                                <TableCell align="center"><strong>Parameter</strong></TableCell>
                                <TableCell align="center"><strong>LM</strong></TableCell>
                                <TableCell align="center"><strong>Head</strong></TableCell>
                                <TableCell align="center"><strong>HR</strong></TableCell>
                                <TableCell align="center"><strong>Average</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parameters.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center">{row.average}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved} /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 1")}
                </Button>
            </Box>
        </Box>
    );
};

const Phase2 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 2;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);
    
    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 2,
                points_by_lm: param.lm !== "" ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head !== "" ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr !== "" ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 2 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 2 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 2: Accelerate</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
                        <TableBody>
                            {parameters.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center">{row.average}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved} /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 2")}
                </Button>
            </Box>
        </Box>
    );
};

const Phase3 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 3;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });
                
                if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);
    
    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 3,
                points_by_lm: param.lm !== "" ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head !== "" ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr !== "" ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 3 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 3 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 3: Achieve</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
                        <TableBody>
                            {parameters.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center">{row.average}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved} /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 3")}
                </Button>
            </Box>
        </Box>
    );
};

const Phase4 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 4;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_head != null && firstRecord.comment_by_head) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);
    
    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 4,
                points_by_lm: param.lm !== "" ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head !== "" ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr !== "" ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 4 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 4 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 4: Aspire</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 900 }}>
                        <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
                        <TableBody>
                            {parameters.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                    <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                    <TableCell align="center">{row.average}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled={isSaved} /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 4")}
                </Button>
            </Box>
        </Box>
    );
};

const OverallAnalysis = ({ userId, employeeVId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isOverallSaved, setIsOverallSaved] = useState(false);
    const [allPhaseComments, setAllPhaseComments] = useState([]);
    const [overallComments, setOverallComments] = useState({ hr: "" });
    const [kpiData, setKpiData] = useState([
        { kpi: "A", target: 1, ach: 1, rating: 5 }, { kpi: "B", target: 2, ach: 5, rating: 7 }, { kpi: "C", target: 3, ach: 6, rating: 9 },
    ]);
    const [kraData, setKraData] = useState([
        { parameter: "HADC", totalRating: 10 }, { parameter: "QCP", totalRating: 10 },
    ]);
    const [phaseWiseData, setPhaseWiseData] = useState(null);
    const [employeeStatus, setEmployeeStatus] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!userId) {
                setError("User ID not found.");
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const role_id = localStorage.getItem('userRoleId');
                const loggedInEmpId = localStorage.getItem('loggedInEmpId');

                const [phaseWiseResponse, allCommentsResponse, performanceResponse] = await Promise.all([
                    axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
                    axiosInstance.get(`apis/get_phasewise_data/${userId}/`),
                    axiosInstance.get(`apis/get_employee_performance/${role_id}/${loggedInEmpId}/`)
                ]);

                if (phaseWiseResponse.data.status === "success") {
                    const data = phaseWiseResponse.data.data;
                    setPhaseWiseData(data);
                    setOverallComments({ hr: data.final_hr_comment || "" });
                    if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
                        setIsOverallSaved(true);
                    }
                } else {
                    throw new Error("Failed to fetch phase data.");
                }

                if (allCommentsResponse.data.status === "success" && Array.isArray(allCommentsResponse.data.data)) {
                    const comments = [1, 2, 3, 4].map(phaseNum => {
                        const phaseData = allCommentsResponse.data.data.find(item => item.phase === phaseNum);
                        return { phase: `Phase ${phaseNum}`, lm: phaseData?.comment_by_lm || "N/A", head: phaseData?.comment_by_head || "N/A", hr: phaseData?.comment_by_hr || "N/A" };
                    });
                    setAllPhaseComments(comments);
                }

                const employeeList = performanceResponse.data;
                const currentUserPerformance = Array.isArray(employeeList) ? employeeList.find(emp => emp.user_id === parseInt(userId, 10)) : null;

                if (currentUserPerformance && currentUserPerformance.employee_status) {
                    setEmployeeStatus(currentUserPerformance.employee_status);
                }

            } catch (error) {
                setError("Could not load performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [userId]);
    
    const handleKpiChange = (index, field, value) => {
        const newData = [...kpiData];
        newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
        setKpiData(newData);
    };

    const handleKraChange = (index, field, value) => {
        const newData = [...kraData];
        newData[index][field] = field === "totalRating" ? Number(value) : value;
        setKraData(newData);
    };

    const handleOverallCommentChange = (rater, value) => {
        setOverallComments(prev => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
            const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
            const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
            const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

            let value4AEE = 0;
            if (phaseWiseData) {
                const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
                const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
                value4AEE = (totalApiScore / (12 * 40)) * 10;
            }

            const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
            const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

            const payload = {
                user_id: userId,
                emp_id: employeeVId,
                performance_analysis: overallComments.hr || "No detailed comments provided.",
                kra_kpi_total: kpiKraAverage,
                average: finalAverage,
                percent_achievement: achievementPercentage,
                comment_by_lm: "No comment.",
                comment_by_hr: overallComments.hr || "No comment.",
                comment_by_head: "No comment."
            };

            await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
            showAlert("success", "Success!", "Overall analysis saved successfully!");
            setIsOverallSaved(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred while saving.";
            showAlert("error", "Error!", errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
    const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
    const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
    const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
    const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
    const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
    let value4AEE = 0, percent4AEE = 0;
    if (phaseWiseData) {
        const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
        const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
        value4AEE = (totalApiScore / 480) * 10;
        percent4AEE = (totalApiScore / 480) * 100;
    }
    const valueKpiKra = parseFloat(kpiKraAverage);
    const percentKpiKra = valueKpiKra * 10;
    const totalValue = (value4AEE + valueKpiKra) / 2;
    const percentTotal = totalValue * 10;
    const lmTotal = phaseWiseData ? (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
    const headTotal = phaseWiseData ? (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
    const hrTotal = phaseWiseData ? (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
    const grandTotal = lmTotal + headTotal + hrTotal;

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}><Card><CardHeader title="Phase-wise Performance" /><CardContent><TableContainer sx={{ overflowX: 'auto' }}><Table size="small" sx={{ minWidth: 700 }}>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell></TableRow></TableHead>
                    <TableBody>
                        {phaseWiseData && phaseKeys.map((p, i) => (<TableRow key={p}><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][i]}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_lm`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_head`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_hr`] || 0).toFixed(1)}</TableCell><TableCell align="right">{((phaseWiseData[`phase${i + 1}_lm`] || 0) + (phaseWiseData[`phase${i + 1}_head`] || 0) + (phaseWiseData[`phase${i + 1}_hr`] || 0)).toFixed(1)}</TableCell></TableRow>))}
                        <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>
                    </TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sm={6}><Card><CardHeader title="KPI" /><CardContent><TableContainer sx={{ overflowX: 'auto' }}><Table size="small" sx={{ minWidth: 600 }}>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Rating</TableCell></TableRow></TableHead>
                    <TableBody>{kpiData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(i, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(i, "target", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(i, "ach", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(i, "rating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sm={6}><Card><CardHeader title="KRA" /><CardContent><TableContainer sx={{ overflowX: 'auto' }}><Table size="small" sx={{ minWidth: 600 }}>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Total Rating</TableCell></TableRow></TableHead>
                    <TableBody>{kraData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(i, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(i, "totalRating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer sx={{ overflowX: 'auto' }}><Table>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell></TableRow></TableHead>
                    <TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell></TableRow></TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Phases Comments" /><CardContent><TableContainer sx={{ overflowX: 'auto' }}><Table>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead>
                    <TableBody>{allPhaseComments.map((row, i) => (<TableRow key={i}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isOverallSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{color: 'white'}} /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
                </Button>
            </Box>
            <Box display="flex" justifyContent="center" mt={3}>
                <Alert severity="info" sx={{ width: 'fit-content' }}>
                    Final Status: <strong>{employeeStatus ? employeeStatus.toUpperCase() : 'PENDING FINAL ACTION'}</strong>
                </Alert>
            </Box>
        </Box>
    );
};

export const MarksHead = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation();
    const { user_id, emp_id, designation_id } = location.state || {};

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const renderTabContent = () => {
        const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
        switch (activeTab) {
            case 0: return <Phase1 {...props} />;
            case 1: return <Phase2 {...props} />;
            case 2: return <Phase3 {...props} />;
            case 3: return <Phase4 {...props} />;
            case 4: return <OverallAnalysis {...props} />;
            default: return null;
        }
    };

    return (
        <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
            <AppBar position="static" sx={{ backgroundColor: "#8C257C", color: "#FFFFFF" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate("/hrms/dashboardHead/performanceTable")} sx={{ mr: 2 }} >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Employee Performance - ID: {id}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5", p: 2 }}>
                <Paper elevation={2} sx={{ borderRadius: 2 }}>
                    <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
                        <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
                        <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
                        <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
                        <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
                        <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
                    </Tabs>
                </Paper>
            </Box>
            <Box px={3} pb={4} pt={2}>
                {renderTabContent()}
            </Box>
        </Box>
    );
};

const StyledArrowButton = styled(IconButton)(({ theme }) => ({
    color: "#616161",
    transition: "color 0.3s",
    "&:hover": { color: "#8C257C" },
}));

export const PerformanceTableHead = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            setLoading(true);
            const role_id = localStorage.getItem('userRoleId');
            const user_id = localStorage.getItem('loggedInEmpId');
            if (!role_id || !user_id) {
                setError("User role or ID not found. Please log in again.");
                setLoading(false);
                return;
            }
            try {
                const response = await axiosInstance.get(`apis/get_employee_performance/${role_id}/${user_id}/`);
                const transformedData = response.data.map(item => ({
                    id: item.user_id, empId: item.emp_id, employee: item.full_name, designation: item.designation_name, designation_id: item.designation_id,
                    doj: item.date_of_joining, lm: item.manager_name, phase1: item.phase_one_points, phase2: item.phase_two_points, phase3: item.phase_three_points,
                    phase4: item.phase_four_points, overall: item.performance_analysis, score: item.avg_score, apiStatus: item.employee_status,
                }));
                setData(transformedData);
                setError(null);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformanceData();
    }, []);

    const handleNavigate = (row) => {
        navigate(`/hrms/dashboardHead/marks/${row.id}`, {
            state: { user_id: row.id, emp_id: row.empId, designation_id: row.designation_id },
        });
    };

    const renderBoxedCell = (value, isPercentage = false) => (
        <Box sx={{ px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: 1, minWidth: 40, textAlign: "center" }}>
            {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
        </Box>
    );

    const renderStatusCell = (status) => {
        let color = "info";
        let label = "In Progress";
    
        if (status) {
            const lowerCaseStatus = status.toLowerCase();
    
            switch (lowerCaseStatus) {
                case 'confirm':
                case 'confirmed':
                    color = "success";
                    label = "Confirmed";
                    break;
                case 'extend':
                case 'extended':
                    color = "warning";
                    label = "Extended";
                    break;
                case 'terminate':
                case 'terminated':
                    color = "error";
                    label = "Terminated";
                    break;
                default:
                    label = status.charAt(0).toUpperCase() + status.slice(1);
                    color = "info";
                    break;
            }
        }
        
        return <Chip label={label} color={color} size="small" />;
    };

    const filteredData = data.filter(item =>
        item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.lm && item.lm.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (error) {
        return <Box component={Paper} p={3}><Alert severity="error">Error: {error}</Alert></Box>;
    }
    
    return (
        <Box component={Paper} p={3}>
            <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
                Performance Table
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
                <Box></Box> 
                <TextField
                    size="small"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    sx={{ width: isMobile ? '100%' : 'auto' }}
                />
            </Box>

            <TableContainer sx={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <Table sx={{ minWidth: 1200 }}>
                    <TableHead sx={{ backgroundColor: "#8C257C" }}>
                        <TableRow>
                            {["Sr No", "Employee", "Designation", "DOJ", "LM", "P1", "P2", "P3", "P4", "Overall", "Score", "Status"].map(h => (
                                <TableCell key={h} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>{h}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow key={row.id} hover onMouseEnter={() => setHoveredRowId(row.id)} onMouseLeave={() => setHoveredRowId(null)}>
                                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
                                            <StyledArrowButton onClick={() => handleNavigate(row)} size="small" sx={{ visibility: hoveredRowId === row.id ? 'visible' : 'hidden' }}>
                                                <ArrowForwardIcon fontSize="small" />
                                            </StyledArrowButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.designation}</TableCell>
                                    <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.doj}</TableCell>
                                    <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.lm}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
                                    <TableCell align="center">{renderStatusCell(row.apiStatus)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
                sx={{
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#8C257C'
                    }
                }}
            />
        </Box>
    );
};

export default PerformanceTableHead;
