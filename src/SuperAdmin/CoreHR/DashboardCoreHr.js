// // import React from "react";
// // import {
// //   Box,
// //   Container,
// //   Divider,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// // } from "@mui/material";

// // // Dummy data for the table
// // const departmentsData = [
// //   { id: 1, name: "Engineering", employees: 75 },
// //   { id: 2, name: "Human Resources", employees: 12 },
// //   { id: 3, name: "Sales & Marketing", employees: 45 },
// //   { id: 4, name: "Finance", employees: 20 },
// //   { id: 5, name: "Customer Support", employees: 30 },
// //   { id: 6, name: "Operations", employees: 55 },
// // ];

// // const gradeData = [
// //   { id: 1, name: "Staff", employees: 75 },
// //   { id: 2, name: "Executive", employees: 2 },
// //   { id: 3, name: "Consultant", employees: 2 },
// // ];

// // function DashboardCoreHr() {
// //   return (
// //     <Container>
// //       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// //         {/* --- Main Header with Title and Add Button --- */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             p: 2,
// //             borderBottom: 1,
// //             borderColor: "divider",
// //           }}
// //         >
// //           <Typography variant="h6" component="h1">
// //             Department wise manpower
// //           </Typography>
// //         </Box>

// //         {/* TableContainer with Paper gives it a clean, contained look */}
// //         <TableContainer component={Paper}>
// //           <Table aria-label="department wise manpower table">
// //             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
// //                 <TableCell align="right" sx={{ fontWeight: "bold" }}>
// //                   No of Employees
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {departmentsData.map((row) => (
// //                 <TableRow
// //                   key={row.id}
// //                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
// //                 >
// //                   <TableCell component="th" scope="row">
// //                     {row.id}
// //                   </TableCell>
// //                   <TableCell>{row.name}</TableCell>
// //                   <TableCell align="right">{row.employees}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>
// //       <Divider sx={{ my: 3 }} />
// //       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// //         {/* --- Main Header with Title and Add Button --- */}
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             p: 2,
// //             borderBottom: 1,
// //             borderColor: "divider",
// //           }}
// //         >
// //           <Typography variant="h6" component="h1">
// //             Grade wise manpower
// //           </Typography>
// //         </Box>

// //         {/* TableContainer with Paper gives it a clean, contained look */}
// //         <TableContainer component={Paper}>
// //           <Table aria-label="department wise manpower table">
// //             <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
// //                 <TableCell align="right" sx={{ fontWeight: "bold" }}>
// //                   No of Employees
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {gradeData.map((row) => (
// //                 <TableRow
// //                   key={row.id}
// //                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
// //                 >
// //                   <TableCell component="th" scope="row">
// //                     {row.id}
// //                   </TableCell>
// //                   <TableCell>{row.name}</TableCell>
// //                   <TableCell align="right">{row.employees}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>
// //     </Container>
// //   );
// // }

// // export default DashboardCoreHr;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Divider,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";

// function DashboardCoreHr() {
//   const [departments, setDepartments] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loadingDepartments, setLoadingDepartments] = useState(true);
//   const [loadingGrades, setLoadingGrades] = useState(true);

//   // Fetch Department data
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setLoadingDepartments(false);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   // Fetch Grade data
//   useEffect(() => {
//     const fetchGrades = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/grade/"
//         );
//         setGrades(response.data);
//       } catch (error) {
//         console.error("Error fetching grades:", error);
//       } finally {
//         setLoadingGrades(false);
//       }
//     };
//     fetchGrades();
//   }, []);

//   return (
//     <Container>
//       {/* Department Section */}
//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" component="h1">
//             Department wise manpower
//           </Typography>
//         </Box>

//         <TableContainer component={Paper}>
//           {loadingDepartments ? (
//             <Box sx={{ p: 3, textAlign: "center" }}>
//               <Typography>Loading...</Typography>
//             </Box>
//           ) : (
//             <Table aria-label="department wise manpower table">
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                     No of Employees
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {departments.map((dept, index) => (
//                   <TableRow
//                     key={dept.department_id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{dept.department_name}</TableCell>
//                     <TableCell align="right">
//                       {dept.active_employee_count}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//       </Paper>

//       <Divider sx={{ my: 3 }} />

//       {/* Grade Section */}
//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" component="h1">
//             Grade wise manpower
//           </Typography>
//         </Box>

//         <TableContainer component={Paper}>
//           {loadingGrades ? (
//             <Box sx={{ p: 3, textAlign: "center" }}>
//               <Typography>Loading...</Typography>
//             </Box>
//           ) : (
//             <Table aria-label="grade wise manpower table">
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                     Grade Code
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {grades.map((grade, index) => (
//                   <TableRow
//                     key={grade.grade_id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{grade.grade_name}</TableCell>
//                     <TableCell align="right">{grade.grade_code}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//       </Paper>
//     </Container>
//   );
// }

// export default DashboardCoreHr;






// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Divider,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";

// function DashboardCoreHr() {
//   const [departments, setDepartments] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loadingDepartments, setLoadingDepartments] = useState(true);
//   const [loadingGrades, setLoadingGrades] = useState(true);

//   // Fetch Department data
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setLoadingDepartments(false);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   // Fetch Grade data
//   useEffect(() => {
//     const fetchGrades = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/grade/"
//         );
//         setGrades(response.data);
//       } catch (error) {
//         console.error("Error fetching grades:", error);
//       } finally {
//         setLoadingGrades(false);
//       }
//     };
//     fetchGrades();
//   }, []);

//   return (
//     <Container>
//       {/* Department Section */}
//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" component="h1">
//             Department wise manpower
//           </Typography>
//         </Box>

//         <TableContainer component={Paper}>
//           {loadingDepartments ? (
//             <Box sx={{ p: 3, textAlign: "center" }}>
//               <Typography>Loading...</Typography>
//             </Box>
//           ) : (
//             <Table aria-label="department wise manpower table">
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                     No of Employees
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {departments.map((dept, index) => (
//                   <TableRow
//                     key={dept.department_id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{dept.department_name}</TableCell>
//                     <TableCell align="right">
//                       {dept.active_employee_count}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//       </Paper>

//       <Divider sx={{ my: 3 }} />

//       {/* Grade Section */}
//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" component="h1">
//             Grade wise manpower
//           </Typography>
//         </Box>

//         <TableContainer component={Paper}>
//           {loadingGrades ? (
//             <Box sx={{ p: 3, textAlign: "center" }}>
//               <Typography>Loading...</Typography>
//             </Box>
//           ) : (
//             <Table aria-label="grade wise manpower table">
//               <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Grade</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                     Grade Code
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {grades.map((grade, index) => (
//                   <TableRow
//                     key={grade.grade_id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{grade.grade_name}</TableCell>
//                     <TableCell align="right">{grade.grade_code}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//       </Paper>
//     </Container>
//   );
// }

// export default DashboardCoreHr;






// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Container,
//   Divider,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
//   TextField,
//   TablePagination,
// } from "@mui/material";
// import axios from "axios";

// // Define brand colors for easy reuse
// const brandColors = {
//   primary: "#8C257C", // Purple
//   accent: "#F58E35",  // Orange
// };

// // Custom styles for the focused state of the TextField
// const searchTextFieldStyles = {
//   "& .MuiOutlinedInput-root": {
//     "&.Mui-focused fieldset": {
//       borderColor: brandColors.accent,
//     },
//   },
//   "& label.Mui-focused": {
//     color: brandColors.accent,
//   },
// };

// function DashboardCoreHr() {
//   // State for original data and loading
//   const [departments, setDepartments] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loadingDepartments, setLoadingDepartments] = useState(true);
//   const [loadingGrades, setLoadingGrades] = useState(true);

//   // --- State for Department Table ---
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
//   const [departmentPage, setDepartmentPage] = useState(0);
//   const [departmentRowsPerPage, setDepartmentRowsPerPage] = useState(10);

//   // --- State for Grade Table ---
//   const [gradeSearchTerm, setGradeSearchTerm] = useState("");
//   const [gradePage, setGradePage] = useState(0);
//   const [gradeRowsPerPage, setGradeRowsPerPage] = useState(10);

//   // Fetch Department data
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       } finally {
//         setLoadingDepartments(false);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   // Fetch Grade data
//   useEffect(() => {
//     const fetchGrades = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/grade/"
//         );
//         setGrades(response.data);
//       } catch (error) {
//         console.error("Error fetching grades:", error);
//       } finally {
//         setLoadingGrades(false);
//       }
//     };
//     fetchGrades();
//   }, []);

//   // --- Memoized Filtering and Pagination Logic for Departments ---
//   const filteredDepartments = useMemo(() => {
//     return departments.filter((dept) =>
//       dept.department_name
//         .toLowerCase()
//         .includes(departmentSearchTerm.toLowerCase())
//     );
//   }, [departments, departmentSearchTerm]);

//   const paginatedDepartments = useMemo(() => {
//     return filteredDepartments.slice(
//       departmentPage * departmentRowsPerPage,
//       departmentPage * departmentRowsPerPage + departmentRowsPerPage
//     );
//   }, [filteredDepartments, departmentPage, departmentRowsPerPage]);

//   // --- Memoized Filtering and Pagination Logic for Grades ---
//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (grade) =>
//         grade.grade_name
//           .toLowerCase()
//           .includes(gradeSearchTerm.toLowerCase()) ||
//         grade.grade_code.toLowerCase().includes(gradeSearchTerm.toLowerCase())
//     );
//   }, [grades, gradeSearchTerm]);

//   const paginatedGrades = useMemo(() => {
//     return filteredGrades.slice(
//       gradePage * gradeRowsPerPage,
//       gradePage * gradeRowsPerPage + gradeRowsPerPage
//     );
//   }, [filteredGrades, gradePage, gradeRowsPerPage]);

//   // --- Handlers for Department Table ---
//   const handleDepartmentSearchChange = (event) => {
//     setDepartmentSearchTerm(event.target.value);
//     setDepartmentPage(0);
//   };

//   const handleDepartmentPageChange = (event, newPage) => {
//     setDepartmentPage(newPage);
//   };

//   const handleDepartmentRowsPerPageChange = (event) => {
//     setDepartmentRowsPerPage(parseInt(event.target.value, 10));
//     setDepartmentPage(0);
//   };

//   // --- Handlers for Grade Table ---
//   const handleGradeSearchChange = (event) => {
//     setGradeSearchTerm(event.target.value);
//     setGradePage(0);
//   };

//   const handleGradePageChange = (event, newPage) => {
//     setGradePage(newPage);
//   };

//   const handleGradeRowsPerPageChange = (event) => {
//     setGradeRowsPerPage(parseInt(event.target.value, 10));
//     setGradePage(0);
//   };

//   return (
//     <Container>
//       {/* Department Section */}
//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" component="h1">
//             Department wise manpower
//           </Typography>
//           <TextField
//             label="Search Department"
//             variant="outlined"
//             size="small"
//             value={departmentSearchTerm}
//             onChange={handleDepartmentSearchChange}
//             sx={searchTextFieldStyles}
//           />
//         </Box>

//         <TableContainer>
//           {loadingDepartments ? (
//             <Box sx={{ p: 3, textAlign: "center" }}>
//               <CircularProgress sx={{ color: brandColors.accent }} />
//             </Box>
//           ) : (
//             <Table aria-label="department wise manpower table">
//               <TableHead sx={{ backgroundColor: brandColors.primary }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                     Sr No.
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                     Department
//                   </TableCell>
//                   <TableCell
//                     align="right"
//                     sx={{ fontWeight: "bold", color: "white" }}
//                   >
//                     No of Employees
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedDepartments.length > 0 ? (
//                   paginatedDepartments.map((dept, index) => (
//                     <TableRow
//                       key={dept.department_id}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <TableCell>
//                         {departmentPage * departmentRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell>{dept.department_name}</TableCell>
//                       <TableCell align="right">
//                         {dept.active_employee_count}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No departments found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredDepartments.length}
//           rowsPerPage={departmentRowsPerPage}
//           page={departmentPage}
//           onPageChange={handleDepartmentPageChange}
//           onRowsPerPageChange={handleDepartmentRowsPerPageChange}
//         />
//       </Paper>

//       <Divider sx={{ my: 3 }} />

//       {/* Grade Section */}
//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             borderBottom: 1,
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="h6" component="h1">
//             Grade wise manpower
//           </Typography>
//           <TextField
//             label="Search Grade"
//             variant="outlined"
//             size="small"
//             value={gradeSearchTerm}
//             onChange={handleGradeSearchChange}
//             sx={searchTextFieldStyles}
//           />
//         </Box>

//         <TableContainer>
//           {loadingGrades ? (
//             <Box sx={{ p: 3, textAlign: "center" }}>
//               <CircularProgress sx={{ color: brandColors.accent }} />
//             </Box>
//           ) : (
//             <Table aria-label="grade wise manpower table">
//               <TableHead sx={{ backgroundColor: brandColors.primary }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                     Sr No.
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                     Grade
//                   </TableCell>
//                   <TableCell
//                     align="right"
//                     sx={{ fontWeight: "bold", color: "white" }}
//                   >
//                     Grade Code
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedGrades.length > 0 ? (
//                   paginatedGrades.map((grade, index) => (
//                     <TableRow
//                       key={grade.grade_id}
//                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                     >
//                       <TableCell>
//                         {gradePage * gradeRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell>{grade.grade_name}</TableCell>
//                       <TableCell align="right">{grade.grade_code}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No grades found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredGrades.length}
//           rowsPerPage={gradeRowsPerPage}
//           page={gradePage}
//           onPageChange={handleGradePageChange}
//           onRowsPerPageChange={handleGradeRowsPerPageChange}
//         />
//       </Paper>
//     </Container>
//   );
// }

// export default DashboardCoreHr;




// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Skeleton,
//   TextField,
//   TablePagination,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";
// import axios from "axios";

// // Define brand colors for easy reuse
// const themePurple = "#8C257C";

// function DashboardCoreHr() {
//   // --- MUI Theme and Responsiveness ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State for original data and loading
//   const [departments, setDepartments] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- State for Department Table ---
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
//   const [departmentPage, setDepartmentPage] = useState(0);
//   const [departmentRowsPerPage, setDepartmentRowsPerPage] = useState(5);

//   // --- State for Grade Table ---
//   const [gradeSearchTerm, setGradeSearchTerm] = useState("");
//   const [gradePage, setGradePage] = useState(0);
//   const [gradeRowsPerPage, setGradeRowsPerPage] = useState(5);

//   // Fetch Department and Grade data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [departmentResponse, gradeResponse] = await Promise.all([
//           axios.get("https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"),
//           axios.get("https://tdtlworld.com/hrms-backend/api/grade/"),
//         ]);
//         setDepartments(departmentResponse.data || []);
//         setGrades(gradeResponse.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // --- Memoized Filtering for Departments ---
//   const filteredDepartments = useMemo(() => {
//     return departments.filter((dept) =>
//       dept.department_name
//         .toLowerCase()
//         .includes(departmentSearchTerm.toLowerCase())
//     );
//   }, [departments, departmentSearchTerm]);

//   // --- Memoized Filtering for Grades ---
//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (grade) =>
//         grade.grade_name
//           .toLowerCase()
//           .includes(gradeSearchTerm.toLowerCase()) ||
//         grade.grade_code.toLowerCase().includes(gradeSearchTerm.toLowerCase())
//     );
//   }, [grades, gradeSearchTerm]);


//   // --- Render Table Body with Skeletons ---
//   const renderTableSkeletons = (rows, columns) => {
//     return Array.from(new Array(rows)).map((_, index) => (
//       <TableRow key={index}>
//         {Array.from(new Array(columns)).map((_, colIndex) => (
//           <TableCell key={colIndex}>
//             <Skeleton variant="text" />
//           </TableCell>
//         ))}
//       </TableRow>
//     ));
//   };
  
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//       {/* Department Section */}
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 4   }}>
//             Department Wise Manpower
//         </Typography>


//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//             <TextField
//                 size="small"
//                 placeholder="Search..."
//                 value={departmentSearchTerm}
//                 onChange={(e) => {
//                     setDepartmentSearchTerm(e.target.value);
//                     setDepartmentPage(0);
//                 }}
//                 sx={{ width: isMobile ? "100%" : "auto" }}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//             />
//         </Box>

//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themePurple }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>Department</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
//                     No of Employees
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     renderTableSkeletons(departmentRowsPerPage, 3)
//                 ) : (
//                     (departmentRowsPerPage > 0
//                         ? filteredDepartments.slice(departmentPage * departmentRowsPerPage, departmentPage * departmentRowsPerPage + departmentRowsPerPage)
//                         : filteredDepartments
//                     ).map((dept, index) => (
//                     <TableRow key={dept.department_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>
//                         {departmentPage * departmentRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{dept.department_name}</TableCell>
//                       <TableCell align="right" sx={{ fontSize: '0.95rem' }}>
//                         {dept.active_employee_count}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//                 {!loading && filteredDepartments.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No departments found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>
        
//         <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredDepartments.length > 0 ? departmentPage * departmentRowsPerPage + 1 : 0} to {Math.min((departmentPage + 1) * departmentRowsPerPage, filteredDepartments.length)} of {filteredDepartments.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredDepartments.length}
//                 rowsPerPage={departmentRowsPerPage}
//                 page={departmentPage}
//                 onPageChange={(e, newPage) => setDepartmentPage(newPage)}
//                 onRowsPerPageChange={(e) => {
//                     setDepartmentRowsPerPage(parseInt(e.target.value, 10));
//                     setDepartmentPage(0);
//                 }}
//                 labelDisplayedRows={() => ''}
//                 sx={{ '& .MuiSvgIcon-root': { color: themePurple } }}
//             />
//         </Box>
//       </Box>

//       {/* Grade Section */}
//        <Box component={Paper} p={3}>
//         <Typography variant="h5" sx={{ color: themePurple, fontWeight: "bold", mb: 2 }}>
//             Grade Wise Manpower
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//             <TextField
//                 size="small"
//                 placeholder="Search..."
//                 value={gradeSearchTerm}
//                 onChange={(e) => {
//                     setGradeSearchTerm(e.target.value);
//                     setGradePage(0);
//                 }}
//                 sx={{ width: isMobile ? "100%" : "auto" }}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//             />
//         </Box>

//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themePurple }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>Grade</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
//                     Grade Code
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     renderTableSkeletons(gradeRowsPerPage, 3)
//                 ) : (
//                     (gradeRowsPerPage > 0
//                         ? filteredGrades.slice(gradePage * gradeRowsPerPage, gradePage * gradeRowsPerPage + gradeRowsPerPage)
//                         : filteredGrades
//                     ).map((grade, index) => (
//                     <TableRow key={grade.grade_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>
//                         {gradePage * gradeRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{grade.grade_name}</TableCell>
//                       <TableCell align="right" sx={{ fontSize: '0.95rem' }}>{grade.grade_code}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//                  {!loading && filteredGrades.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No grades found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>
        
//          <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredGrades.length > 0 ? gradePage * gradeRowsPerPage + 1 : 0} to {Math.min((gradePage + 1) * gradeRowsPerPage, filteredGrades.length)} of {filteredGrades.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredGrades.length}
//                 rowsPerPage={gradeRowsPerPage}
//                 page={gradePage}
//                 onPageChange={(e, newPage) => setGradePage(newPage)}
//                 onRowsPerPageChange={(e) => {
//                     setGradeRowsPerPage(parseInt(e.target.value, 10));
//                     setGradePage(0);
//                 }}
//                 labelDisplayedRows={() => ''}
//                 sx={{ '& .MuiSvgIcon-root': { color: themePurple } }}
//             />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default DashboardCoreHr;






// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Skeleton,
//   TextField,
//   TablePagination,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";
// import axios from "axios";

// // Define brand colors for easy reuse
// const themePurple = "#8C257C";

// function DashboardCoreHr() {
//   // --- MUI Theme and Responsiveness ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State for original data and loading
//   const [departments, setDepartments] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- State for Department Table ---
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
//   const [departmentPage, setDepartmentPage] = useState(0);
//   const [departmentRowsPerPage, setDepartmentRowsPerPage] = useState(5);

//   // --- State for Grade Table ---
//   const [gradeSearchTerm, setGradeSearchTerm] = useState("");
//   const [gradePage, setGradePage] = useState(0);
//   const [gradeRowsPerPage, setGradeRowsPerPage] = useState(5);

//   // Fetch Department and Grade data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [departmentResponse, gradeResponse] = await Promise.all([
//           axios.get("https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"),
//           axios.get("https://tdtlworld.com/hrms-backend/api/grade/"),
//         ]);
//         setDepartments(departmentResponse.data || []);
//         setGrades(gradeResponse.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // --- Memoized Filtering for Departments ---
//   const filteredDepartments = useMemo(() => {
//     return departments.filter((dept) =>
//       dept.department_name
//         .toLowerCase()
//         .includes(departmentSearchTerm.toLowerCase())
//     );
//   }, [departments, departmentSearchTerm]);

//   // --- Memoized Filtering for Grades ---
//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (grade) =>
//         grade.grade_name
//           .toLowerCase()
//           .includes(gradeSearchTerm.toLowerCase()) ||
//         grade.grade_code.toLowerCase().includes(gradeSearchTerm.toLowerCase())
//     );
//   }, [grades, gradeSearchTerm]);


//   // --- Render Table Body with Skeletons ---
//   const renderTableSkeletons = (rows, columns) => {
//     return Array.from(new Array(rows)).map((_, index) => (
//       <TableRow key={index}>
//         {Array.from(new Array(columns)).map((_, colIndex) => (
//           <TableCell key={colIndex}>
//             <Skeleton variant="text" />
//           </TableCell>
//         ))}
//       </TableRow>
//     ));
//   };
  
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//       {/* Department Section */}
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}>
//             Department Wise Manpower
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//             <TextField
//                 size="small"
//                 placeholder="Search..."
//                 value={departmentSearchTerm}
//                 onChange={(e) => {
//                     setDepartmentSearchTerm(e.target.value);
//                     setDepartmentPage(0);
//                 }}
//                 sx={{ width: isMobile ? "100%" : "auto" }}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//             />
//         </Box>

//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themePurple }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>DEPARTMENT</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
//                     NO OF EMPLOYEES
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     renderTableSkeletons(departmentRowsPerPage, 3)
//                 ) : (
//                     (departmentRowsPerPage > 0
//                         ? filteredDepartments.slice(departmentPage * departmentRowsPerPage, departmentPage * departmentRowsPerPage + departmentRowsPerPage)
//                         : filteredDepartments
//                     ).map((dept, index) => (
//                     <TableRow key={dept.department_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>
//                         {departmentPage * departmentRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{dept.department_name}</TableCell>
//                       <TableCell align="right" sx={{ fontSize: '0.95rem' }}>
//                         {dept.active_employee_count}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//                 {!loading && filteredDepartments.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No departments found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>
        
//         <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredDepartments.length > 0 ? departmentPage * departmentRowsPerPage + 1 : 0} to {Math.min((departmentPage + 1) * departmentRowsPerPage, filteredDepartments.length)} of {filteredDepartments.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredDepartments.length}
//                 rowsPerPage={departmentRowsPerPage}
//                 page={departmentPage}
//                 onPageChange={(e, newPage) => setDepartmentPage(newPage)}
//                 onRowsPerPageChange={(e) => {
//                     setDepartmentRowsPerPage(parseInt(e.target.value, 10));
//                     setDepartmentPage(0);
//                 }}
//                 labelDisplayedRows={() => ''}
//                 sx={{ '& .MuiSvgIcon-root': { color: themePurple } }}
//             />
//         </Box>
//       </Box>

//       {/* Grade Section */}
//        <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}>
//             Grade Wise Manpower
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//             <TextField
//                 size="small"
//                 placeholder="Search..."
//                 value={gradeSearchTerm}
//                 onChange={(e) => {
//                     setGradeSearchTerm(e.target.value);
//                     setGradePage(0);
//                 }}
//                 sx={{ width: isMobile ? "100%" : "auto" }}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//             />
//         </Box>

//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themePurple }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "white" }}>GRADE</TableCell>
//                   <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
//                     GRADE CODE
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     renderTableSkeletons(gradeRowsPerPage, 3)
//                 ) : (
//                     (gradeRowsPerPage > 0
//                         ? filteredGrades.slice(gradePage * gradeRowsPerPage, gradePage * gradeRowsPerPage + gradeRowsPerPage)
//                         : filteredGrades
//                     ).map((grade, index) => (
//                     <TableRow key={grade.grade_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>
//                         {gradePage * gradeRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{grade.grade_name}</TableCell>
//                       <TableCell align="right" sx={{ fontSize: '0.95rem' }}>{grade.grade_code}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//                  {!loading && filteredGrades.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No grades found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>
        
//          <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredGrades.length > 0 ? gradePage * gradeRowsPerPage + 1 : 0} to {Math.min((gradePage + 1) * gradeRowsPerPage, filteredGrades.length)} of {filteredGrades.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredGrades.length}
//                 rowsPerPage={gradeRowsPerPage}
//                 page={gradePage}
//                 onPageChange={(e, newPage) => setGradePage(newPage)}
//                 onRowsPerPageChange={(e) => {
//                     setGradeRowsPerPage(parseInt(e.target.value, 10));
//                     setGradePage(0);
//                 }}
//                 labelDisplayedRows={() => ''}
//                 sx={{ '& .MuiSvgIcon-root': { color: themePurple } }}
//             />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default DashboardCoreHr;











// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Skeleton,
//   TextField,
//   TablePagination,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";
// import axios from "axios";

// // Define brand colors for easy reuse
// const themePurple = "#8C257C";

// function DashboardCoreHr() {
//   // --- MUI Theme and Responsiveness ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State for original data and loading
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- State for Department Table ---
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
//   const [departmentPage, setDepartmentPage] = useState(0);
//   const [departmentRowsPerPage, setDepartmentRowsPerPage] = useState(5);

//   // --- State for Designation Table ---
//   const [designationSearchTerm, setDesignationSearchTerm] = useState("");
//   const [designationPage, setDesignationPage] = useState(0);
//   const [designationRowsPerPage, setDesignationRowsPerPage] = useState(5);

//   // --- State for Grade Table ---
//   const [gradeSearchTerm, setGradeSearchTerm] = useState("");
//   const [gradePage, setGradePage] = useState(0);
//   const [gradeRowsPerPage, setGradeRowsPerPage] = useState(5);

//   // Fetch Department, Designation, and Grade data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [departmentResponse, designationResponse, gradeResponse] =
//           await Promise.all([
//             axios.get(
//               "https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"
//             ),
//             axios.get(
//               "https://tdtlworld.com/hrms-backend/get_designationwise_count/"
//             ),
//             axios.get("https://tdtlworld.com/hrms-backend/api/grade/"),
//           ]);
//         setDepartments(departmentResponse.data || []);
//         setDesignations(designationResponse.data.data || []);
//         setGrades(gradeResponse.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // --- Memoized Filtering for Departments ---
//   const filteredDepartments = useMemo(() => {
//     return departments.filter((dept) =>
//       dept.department_name
//         .toLowerCase()
//         .includes(departmentSearchTerm.toLowerCase())
//     );
//   }, [departments, departmentSearchTerm]);

//   // --- Memoized Filtering for Designations ---
//   const filteredDesignations = useMemo(() => {
//     return designations.filter((desg) =>
//       desg.designation_name
//         .toLowerCase()
//         .includes(designationSearchTerm.toLowerCase())
//     );
//   }, [designations, designationSearchTerm]);

//   // --- Memoized Filtering for Grades ---
//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (grade) =>
//         grade.grade_name
//           .toLowerCase()
//           .includes(gradeSearchTerm.toLowerCase()) ||
//         grade.grade_code.toLowerCase().includes(gradeSearchTerm.toLowerCase())
//     );
//   }, [grades, gradeSearchTerm]);

//   // --- Render Table Body with Skeletons ---
//   const renderTableSkeletons = (rows, columns) => {
//     return Array.from(new Array(rows)).map((_, index) => (
//       <TableRow key={index}>
//         {Array.from(new Array(columns)).map((_, colIndex) => (
//           <TableCell key={colIndex}>
//             <Skeleton variant="text" />
//           </TableCell>
//         ))}
//       </TableRow>
//     ));
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//       {/* Department Section */}
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
//         >
//           Department Wise Manpower
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={departmentSearchTerm}
//             onChange={(e) => {
//               setDepartmentSearchTerm(e.target.value);
//               setDepartmentPage(0);
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead sx={{ backgroundColor: themePurple }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   DEPARTMENT
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ fontWeight: "bold", color: "white" }}
//                 >
//                   NO OF EMPLOYEES
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
//                 ? renderTableSkeletons(departmentRowsPerPage, 3)
//                 : (departmentRowsPerPage > 0
//                     ? filteredDepartments.slice(
//                         departmentPage * departmentRowsPerPage,
//                         departmentPage * departmentRowsPerPage +
//                           departmentRowsPerPage
//                       )
//                     : filteredDepartments
//                   ).map((dept, index) => (
//                     <TableRow
//                       key={dept.department_id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
//                       }}
//                     >
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {departmentPage * departmentRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {dept.department_name}
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
//                         {dept.active_employee_count}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               {!loading && filteredDepartments.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexDirection: isMobile ? "column" : "row",
//             p: 2,
//             borderTop: "1px solid rgba(224, 224, 224, 1)",
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing{" "}
//             {filteredDepartments.length > 0
//               ? departmentPage * departmentRowsPerPage + 1
//               : 0}{" "}
//             to{" "}
//             {Math.min(
//               (departmentPage + 1) * departmentRowsPerPage,
//               filteredDepartments.length
//             )}{" "}
//             of {filteredDepartments.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredDepartments.length}
//             rowsPerPage={departmentRowsPerPage}
//             page={departmentPage}
//             onPageChange={(e, newPage) => setDepartmentPage(newPage)}
//             onRowsPerPageChange={(e) => {
//               setDepartmentRowsPerPage(parseInt(e.target.value, 10));
//               setDepartmentPage(0);
//             }}
//             labelDisplayedRows={() => ""}
//             sx={{ "& .MuiSvgIcon-root": { color: themePurple } }}
//           />
//         </Box>
//       </Box>

//       {/* Designation Section */}
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
//         >
//           Designation Wise Manpower
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={designationSearchTerm}
//             onChange={(e) => {
//               setDesignationSearchTerm(e.target.value);
//               setDesignationPage(0);
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead sx={{ backgroundColor: themePurple }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   DESIGNATION
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ fontWeight: "bold", color: "white" }}
//                 >
//                   NO OF EMPLOYEES
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
//                 ? renderTableSkeletons(designationRowsPerPage, 3)
//                 : (designationRowsPerPage > 0
//                     ? filteredDesignations.slice(
//                         designationPage * designationRowsPerPage,
//                         designationPage * designationRowsPerPage +
//                           designationRowsPerPage
//                       )
//                     : filteredDesignations
//                   ).map((desg, index) => (
//                     <TableRow
//                       key={desg.designation_id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
//                       }}
//                     >
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {designationPage * designationRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {desg.designation_name}
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
//                         {desg.total_users}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               {!loading && filteredDesignations.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No designations found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexDirection: isMobile ? "column" : "row",
//             p: 2,
//             borderTop: "1px solid rgba(224, 224, 224, 1)",
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing{" "}
//             {filteredDesignations.length > 0
//               ? designationPage * designationRowsPerPage + 1
//               : 0}{" "}
//             to{" "}
//             {Math.min(
//               (designationPage + 1) * designationRowsPerPage,
//               filteredDesignations.length
//             )}{" "}
//             of {filteredDesignations.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredDesignations.length}
//             rowsPerPage={designationRowsPerPage}
//             page={designationPage}
//             onPageChange={(e, newPage) => setDesignationPage(newPage)}
//             onRowsPerPageChange={(e) => {
//               setDesignationRowsPerPage(parseInt(e.target.value, 10));
//               setDesignationPage(0);
//             }}
//             labelDisplayedRows={() => ""}
//             sx={{ "& .MuiSvgIcon-root": { color: themePurple } }}
//           />
//         </Box>
//       </Box>

//       {/* Grade Section */}
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
//         >
//           Grade Wise Manpower
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={gradeSearchTerm}
//             onChange={(e) => {
//               setGradeSearchTerm(e.target.value);
//               setGradePage(0);
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead sx={{ backgroundColor: themePurple }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   GRADE
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ fontWeight: "bold", color: "white" }}
//                 >
//                   GRADE CODE
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
//                 ? renderTableSkeletons(gradeRowsPerPage, 3)
//                 : (gradeRowsPerPage > 0
//                     ? filteredGrades.slice(
//                         gradePage * gradeRowsPerPage,
//                         gradePage * gradeRowsPerPage + gradeRowsPerPage
//                       )
//                     : filteredGrades
//                   ).map((grade, index) => (
//                     <TableRow
//                       key={grade.grade_id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
//                       }}
//                     >
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {gradePage * gradeRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {grade.grade_name}
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
//                         {grade.grade_code}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               {!loading && filteredGrades.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No grades found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexDirection: isMobile ? "column" : "row",
//             p: 2,
//             borderTop: "1px solid rgba(224, 224, 224, 1)",
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing{" "}
//             {filteredGrades.length > 0
//               ? gradePage * gradeRowsPerPage + 1
//               : 0}{" "}
//             to{" "}
//             {Math.min(
//               (gradePage + 1) * gradeRowsPerPage,
//               filteredGrades.length
//             )}{" "}
//             of {filteredGrades.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredGrades.length}
//             rowsPerPage={gradeRowsPerPage}
//             page={gradePage}
//             onPageChange={(e, newPage) => setGradePage(newPage)}
//             onRowsPerPageChange={(e) => {
//               setGradeRowsPerPage(parseInt(e.target.value, 10));
//               setGradePage(0);
//             }}
//             labelDisplayedRows={() => ""}
//             sx={{ "& .MuiSvgIcon-root": { color: themePurple } }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default DashboardCoreHr;





// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Skeleton,
//   TextField,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
//   FormControl, // Added import
//   Select,      // Added import
//   MenuItem,    // Added import
//   Pagination,  // Added import
// } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";
// import axios from "axios";

// // Define brand colors for easy reuse
// const themePurple = "#8C257C";
// const themePurpleDark = "#6d1d60";
// const themeOrange = "#F58E35";

// function DashboardCoreHr() {
//   // --- MUI Theme and Responsiveness ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State for original data and loading
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- State for Department Table ---
//   const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
//   const [departmentPage, setDepartmentPage] = useState(0);
//   const [departmentRowsPerPage, setDepartmentRowsPerPage] = useState(5);

//   // --- State for Designation Table ---
//   const [designationSearchTerm, setDesignationSearchTerm] = useState("");
//   const [designationPage, setDesignationPage] = useState(0);
//   const [designationRowsPerPage, setDesignationRowsPerPage] = useState(5);

//   // --- State for Grade Table ---
//   const [gradeSearchTerm, setGradeSearchTerm] = useState("");
//   const [gradePage, setGradePage] = useState(0);
//   const [gradeRowsPerPage, setGradeRowsPerPage] = useState(5);

//   // Fetch Department, Designation, and Grade data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [departmentResponse, designationResponse, gradeResponse] =
//           await Promise.all([
//             axios.get(
//               "https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"
//             ),
//             axios.get(
//               "https://tdtlworld.com/hrms-backend/get_designationwise_count/"
//             ),
//             axios.get("https://tdtlworld.com/hrms-backend/api/grade/"),
//           ]);
//         setDepartments(departmentResponse.data || []);
//         setDesignations(designationResponse.data.data || []);
//         setGrades(gradeResponse.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // --- Memoized Filtering for Departments ---
//   const filteredDepartments = useMemo(() => {
//     return departments.filter((dept) =>
//       dept.department_name
//         .toLowerCase()
//         .includes(departmentSearchTerm.toLowerCase())
//     );
//   }, [departments, departmentSearchTerm]);

//   // --- Memoized Filtering for Designations ---
//   const filteredDesignations = useMemo(() => {
//     return designations.filter((desg) =>
//       desg.designation_name
//         .toLowerCase()
//         .includes(designationSearchTerm.toLowerCase())
//     );
//   }, [designations, designationSearchTerm]);

//   // --- Memoized Filtering for Grades ---
//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (grade) =>
//         grade.grade_name
//           .toLowerCase()
//           .includes(gradeSearchTerm.toLowerCase()) ||
//         grade.grade_code.toLowerCase().includes(gradeSearchTerm.toLowerCase())
//     );
//   }, [grades, gradeSearchTerm]);
    
//   // --- Department Pagination Logic ---
//   const handleDepartmentPaginationChange = (event, newPage) => {
//     setDepartmentPage(newPage - 1);
//   };
//   const handleDepartmentRowsPerPageChange = (event) => {
//     setDepartmentRowsPerPage(parseInt(event.target.value, 10));
//     setDepartmentPage(0);
//   };
//   const departmentStartEntry = filteredDepartments.length > 0 ? departmentPage * departmentRowsPerPage + 1 : 0;
//   const departmentEndEntry = Math.min((departmentPage + 1) * departmentRowsPerPage, filteredDepartments.length);

//   // --- Designation Pagination Logic ---
//   const handleDesignationPaginationChange = (event, newPage) => {
//     setDesignationPage(newPage - 1);
//   };
//   const handleDesignationRowsPerPageChange = (event) => {
//     setDesignationRowsPerPage(parseInt(event.target.value, 10));
//     setDesignationPage(0);
//   };
//   const designationStartEntry = filteredDesignations.length > 0 ? designationPage * designationRowsPerPage + 1 : 0;
//   const designationEndEntry = Math.min((designationPage + 1) * designationRowsPerPage, filteredDesignations.length);

//   // --- Grade Pagination Logic ---
//   const handleGradePaginationChange = (event, newPage) => {
//     setGradePage(newPage - 1);
//   };
//   const handleGradeRowsPerPageChange = (event) => {
//     setGradeRowsPerPage(parseInt(event.target.value, 10));
//     setGradePage(0);
//   };
//   const gradeStartEntry = filteredGrades.length > 0 ? gradePage * gradeRowsPerPage + 1 : 0;
//   const gradeEndEntry = Math.min((gradePage + 1) * gradeRowsPerPage, filteredGrades.length);


//   // --- Render Table Body with Skeletons ---
//   const renderTableSkeletons = (rows, columns) => {
//     return Array.from(new Array(rows)).map((_, index) => (
//       <TableRow key={index}>
//         {Array.from(new Array(columns)).map((_, colIndex) => (
//           <TableCell key={colIndex}>
//             <Skeleton variant="text" />
//           </TableCell>
//         ))}
//       </TableRow>
//     ));
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//       {/* Department Section */}
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
//         >
//           Department Wise Manpower
//         </Typography>
        
//         {/* ... (Search bar remains the same) */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={departmentSearchTerm}
//             onChange={(e) => {
//               setDepartmentSearchTerm(e.target.value);
//               setDepartmentPage(0);
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead sx={{ backgroundColor: themePurple }}>
//                 {/* ... (Table head remains the same) */}
//                  <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   DEPARTMENT
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ fontWeight: "bold", color: "white" }}
//                 >
//                   NO OF EMPLOYEES
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
//                 ? renderTableSkeletons(departmentRowsPerPage, 3)
//                 : (departmentRowsPerPage > 0
//                     ? filteredDepartments.slice(
//                         departmentPage * departmentRowsPerPage,
//                         departmentPage * departmentRowsPerPage +
//                           departmentRowsPerPage
//                       )
//                     : filteredDepartments
//                   ).map((dept, index) => (
//                     <TableRow
//                       key={dept.department_id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
//                       }}
//                     >
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {departmentPage * departmentRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {dept.department_name}
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
//                         {dept.active_employee_count}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               {!loading && filteredDepartments.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* START: New Styled Pagination for Departments */}
//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Skeleton variant="text" width={200} />
//                   <Skeleton variant="rectangular" width={300} height={40} />
//               </Box>
//           ) : (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <FormControl variant="outlined" size="small">
//                           <Select
//                               value={departmentRowsPerPage}
//                               onChange={handleDepartmentRowsPerPageChange}
//                               sx={{
//                                   backgroundColor: themePurple,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   '&:hover': { backgroundColor: themePurpleDark },
//                                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                   '& .MuiSvgIcon-root': { color: 'white' },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                          {`Showing ${departmentStartEntry} to ${departmentEndEntry} of ${filteredDepartments.length} results`}
//                       </Typography>
//                   </Box>
//                   <Pagination
//                       count={Math.ceil(filteredDepartments.length / departmentRowsPerPage)}
//                       page={departmentPage + 1}
//                       onChange={handleDepartmentPaginationChange}
//                       showFirstButton showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root:hover': { backgroundColor: themeOrange, color: 'white' },
//                           '& .MuiPaginationItem-page': {
//                               color: themePurple,
//                               '&.Mui-selected': {
//                                   backgroundColor: themePurple,
//                                   color: 'white',
//                                   '&:hover': { backgroundColor: themeOrange }
//                               },
//                           },
//                            '& .MuiPaginationItem-icon': { color: themePurple }
//                       }}
//                   />
//               </Box>
//           )}
//       </Box>
//       {/* END: New Styled Pagination for Departments */}
//       </Box>

//       {/* Designation Section */}
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
//         >
//           Designation Wise Manpower
//         </Typography>
        
//         {/* ... (Search bar remains the same) */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={designationSearchTerm}
//             onChange={(e) => {
//               setDesignationSearchTerm(e.target.value);
//               setDesignationPage(0);
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead sx={{ backgroundColor: themePurple }}>
//               {/* ... (Table head remains the same) */}
//                <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   DESIGNATION
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ fontWeight: "bold", color: "white" }}
//                 >
//                   NO OF EMPLOYEES
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
//                 ? renderTableSkeletons(designationRowsPerPage, 3)
//                 : (designationRowsPerPage > 0
//                     ? filteredDesignations.slice(
//                         designationPage * designationRowsPerPage,
//                         designationPage * designationRowsPerPage +
//                           designationRowsPerPage
//                       )
//                     : filteredDesignations
//                   ).map((desg, index) => (
//                     <TableRow
//                       key={desg.designation_id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
//                       }}
//                     >
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {designationPage * designationRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {desg.designation_name}
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
//                         {desg.total_users}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               {!loading && filteredDesignations.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No designations found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* START: New Styled Pagination for Designations */}
//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Skeleton variant="text" width={200} />
//                   <Skeleton variant="rectangular" width={300} height={40} />
//               </Box>
//           ) : (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <FormControl variant="outlined" size="small">
//                           <Select
//                               value={designationRowsPerPage}
//                               onChange={handleDesignationRowsPerPageChange}
//                               sx={{
//                                   backgroundColor: themePurple,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   '&:hover': { backgroundColor: themePurpleDark },
//                                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                   '& .MuiSvgIcon-root': { color: 'white' },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                          {`Showing ${designationStartEntry} to ${designationEndEntry} of ${filteredDesignations.length} results`}
//                       </Typography>
//                   </Box>
//                   <Pagination
//                       count={Math.ceil(filteredDesignations.length / designationRowsPerPage)}
//                       page={designationPage + 1}
//                       onChange={handleDesignationPaginationChange}
//                       showFirstButton showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root:hover': { backgroundColor: themeOrange, color: 'white' },
//                           '& .MuiPaginationItem-page': {
//                               color: themePurple,
//                               '&.Mui-selected': {
//                                   backgroundColor: themePurple,
//                                   color: 'white',
//                                   '&:hover': { backgroundColor: themeOrange }
//                               },
//                           },
//                            '& .MuiPaginationItem-icon': { color: themePurple }
//                       }}
//                   />
//               </Box>
//           )}
//         </Box>
//         {/* END: New Styled Pagination for Designations */}
//       </Box>

//       {/* Grade Section */}
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
//         >
//           Grade Wise Manpower
//         </Typography>

//         {/* ... (Search bar remains the same) */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={gradeSearchTerm}
//             onChange={(e) => {
//               setGradeSearchTerm(e.target.value);
//               setGradePage(0);
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead sx={{ backgroundColor: themePurple }}>
//                {/* ... (Table head remains the same) */}
//                <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                   GRADE
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ fontWeight: "bold", color: "white" }}
//                 >
//                   GRADE CODE
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading
//                 ? renderTableSkeletons(gradeRowsPerPage, 3)
//                 : (gradeRowsPerPage > 0
//                     ? filteredGrades.slice(
//                         gradePage * gradeRowsPerPage,
//                         gradePage * gradeRowsPerPage + gradeRowsPerPage
//                       )
//                     : filteredGrades
//                   ).map((grade, index) => (
//                     <TableRow
//                       key={grade.grade_id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
//                       }}
//                     >
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {gradePage * gradeRowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {grade.grade_name}
//                       </TableCell>
//                       <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
//                         {grade.grade_code}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               {!loading && filteredGrades.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No grades found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* START: New Styled Pagination for Grades */}
//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Skeleton variant="text" width={200} />
//                   <Skeleton variant="rectangular" width={300} height={40} />
//               </Box>
//           ) : (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <FormControl variant="outlined" size="small">
//                           <Select
//                               value={gradeRowsPerPage}
//                               onChange={handleGradeRowsPerPageChange}
//                               sx={{
//                                   backgroundColor: themePurple,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   '&:hover': { backgroundColor: themePurpleDark },
//                                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                   '& .MuiSvgIcon-root': { color: 'white' },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                          {`Showing ${gradeStartEntry} to ${gradeEndEntry} of ${filteredGrades.length} results`}
//                       </Typography>
//                   </Box>
//                   <Pagination
//                       count={Math.ceil(filteredGrades.length / gradeRowsPerPage)}
//                       page={gradePage + 1}
//                       onChange={handleGradePaginationChange}
//                       showFirstButton showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root:hover': { backgroundColor: themeOrange, color: 'white' },
//                           '& .MuiPaginationItem-page': {
//                               color: themePurple,
//                               '&.Mui-selected': {
//                                   backgroundColor: themePurple,
//                                   color: 'white',
//                                   '&:hover': { backgroundColor: themeOrange }
//                               },
//                           },
//                            '& .MuiPaginationItem-icon': { color: themePurple }
//                       }}
//                   />
//               </Box>
//           )}
//         </Box>
//         {/* END: New Styled Pagination for Grades */}
//       </Box>
//     </Box>
//   );
// }

// export default DashboardCoreHr;




import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";

const themePurple = "#8C257C";
const themePurpleDark = "#6d1d60";
const themeOrange = "#F58E35";

function DashboardCoreHr() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const [departmentSearchTerm, setDepartmentSearchTerm] = useState("");
  const [departmentPage, setDepartmentPage] = useState(0);
  const [departmentRowsPerPage, setDepartmentRowsPerPage] = useState(5);

  const [designationSearchTerm, setDesignationSearchTerm] = useState("");
  const [designationPage, setDesignationPage] = useState(0);
  const [designationRowsPerPage, setDesignationRowsPerPage] = useState(5);

  const [gradeSearchTerm, setGradeSearchTerm] = useState("");
  const [gradePage, setGradePage] = useState(0);
  const [gradeRowsPerPage, setGradeRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [departmentResponse, designationResponse, gradeResponse] =
          await Promise.all([
            axios.get(
              "https://tdtlworld.com/hrms-backend/api/company-setup-dashboard/"
            ),
            axios.get(
              "https://tdtlworld.com/hrms-backend/get_designationwise_count/"
            ),
            axios.get(
              "https://tdtlworld.com/hrms-backend/get_gradewise_count/"
            ),
          ]);
        setDepartments(departmentResponse.data || []);
        setDesignations(designationResponse.data.data || []);
        setGrades(gradeResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) =>
      dept.department_name
        .toLowerCase()
        .includes(departmentSearchTerm.toLowerCase())
    );
  }, [departments, departmentSearchTerm]);

  const filteredDesignations = useMemo(() => {
    return designations.filter((desg) =>
      desg.designation_name
        .toLowerCase()
        .includes(designationSearchTerm.toLowerCase())
    );
  }, [designations, designationSearchTerm]);

  const filteredGrades = useMemo(() => {
    return grades.filter((grade) =>
      grade.grade_name
        .toLowerCase()
        .includes(gradeSearchTerm.toLowerCase())
    );
  }, [grades, gradeSearchTerm]);

  const handleDepartmentPaginationChange = (event, newPage) => {
    setDepartmentPage(newPage - 1);
  };
  const handleDepartmentRowsPerPageChange = (event) => {
    setDepartmentRowsPerPage(parseInt(event.target.value, 10));
    setDepartmentPage(0);
  };
  const departmentStartEntry = filteredDepartments.length > 0 ? departmentPage * departmentRowsPerPage + 1 : 0;
  const departmentEndEntry = Math.min((departmentPage + 1) * departmentRowsPerPage, filteredDepartments.length);

  const handleDesignationPaginationChange = (event, newPage) => {
    setDesignationPage(newPage - 1);
  };
  const handleDesignationRowsPerPageChange = (event) => {
    setDesignationRowsPerPage(parseInt(event.target.value, 10));
    setDesignationPage(0);
  };
  const designationStartEntry = filteredDesignations.length > 0 ? designationPage * designationRowsPerPage + 1 : 0;
  const designationEndEntry = Math.min((designationPage + 1) * designationRowsPerPage, filteredDesignations.length);

  const handleGradePaginationChange = (event, newPage) => {
    setGradePage(newPage - 1);
  };
  const handleGradeRowsPerPageChange = (event) => {
    setGradeRowsPerPage(parseInt(event.target.value, 10));
    setGradePage(0);
  };
  const gradeStartEntry = filteredGrades.length > 0 ? gradePage * gradeRowsPerPage + 1 : 0;
  const gradeEndEntry = Math.min((gradePage + 1) * gradeRowsPerPage, filteredGrades.length);

  const renderTableSkeletons = (rows, columns) => {
    return Array.from(new Array(rows)).map((_, index) => (
      <TableRow key={index}>
        {Array.from(new Array(columns)).map((_, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton variant="text" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box component={Paper} p={3}>
        <Typography
          variant="h4"
          sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
        >
          Department Wise Manpower
        </Typography>
        
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={departmentSearchTerm}
            onChange={(e) => {
              setDepartmentSearchTerm(e.target.value);
              setDepartmentPage(0);
            }}
            sx={{ width: isMobile ? "100%" : "auto" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <TableHead sx={{ backgroundColor: themePurple }}>
                 <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  SR. NO.
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  DEPARTMENT
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  NO OF EMPLOYEES
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? renderTableSkeletons(departmentRowsPerPage, 3)
                : (departmentRowsPerPage > 0
                    ? filteredDepartments.slice(
                        departmentPage * departmentRowsPerPage,
                        departmentPage * departmentRowsPerPage +
                          departmentRowsPerPage
                      )
                    : filteredDepartments
                  ).map((dept, index) => (
                    <TableRow
                      key={dept.department_id}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      }}
                    >
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {departmentPage * departmentRowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {dept.department_name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
                        {dept.active_employee_count}
                      </TableCell>
                    </TableRow>
                  ))}
              {!loading && filteredDepartments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No departments found.
                  </TableCell>
                </TableRow>
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
                          <Select
                              value={departmentRowsPerPage}
                              onChange={handleDepartmentRowsPerPageChange}
                              sx={{
                                  backgroundColor: themePurple,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: themePurpleDark },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${departmentStartEntry} to ${departmentEndEntry} of ${filteredDepartments.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredDepartments.length / departmentRowsPerPage)}
                      page={departmentPage + 1}
                      onChange={handleDepartmentPaginationChange}
                      showFirstButton showLastButton
                      sx={{
                          '& .MuiPaginationItem-root:hover': { backgroundColor: themeOrange, color: 'white' },
                          '& .MuiPaginationItem-page': {
                              color: themePurple,
                              '&.Mui-selected': {
                                  backgroundColor: themePurple,
                                  color: 'white',
                                  '&:hover': { backgroundColor: themeOrange }
                              },
                          },
                           '& .MuiPaginationItem-icon': { color: themePurple }
                      }}
                  />
              </Box>
          )}
      </Box>
      </Box>

      <Box component={Paper} p={3}>
        <Typography
          variant="h4"
          sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
        >
          Designation Wise Manpower
        </Typography>
        
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={designationSearchTerm}
            onChange={(e) => {
              setDesignationSearchTerm(e.target.value);
              setDesignationPage(0);
            }}
            sx={{ width: isMobile ? "100%" : "auto" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <TableHead sx={{ backgroundColor: themePurple }}>
               <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  SR. NO.
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  DESIGNATION
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  NO OF EMPLOYEES
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? renderTableSkeletons(designationRowsPerPage, 3)
                : (designationRowsPerPage > 0
                    ? filteredDesignations.slice(
                        designationPage * designationRowsPerPage,
                        designationPage * designationRowsPerPage +
                          designationRowsPerPage
                      )
                    : filteredDesignations
                  ).map((desg, index) => (
                    <TableRow
                      key={desg.designation_id}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      }}
                    >
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {designationPage * designationRowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {desg.designation_name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
                        {desg.total_users}
                      </TableCell>
                    </TableRow>
                  ))}
              {!loading && filteredDesignations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No designations found.
                  </TableCell>
                </TableRow>
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
                          <Select
                              value={designationRowsPerPage}
                              onChange={handleDesignationRowsPerPageChange}
                              sx={{
                                  backgroundColor: themePurple,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: themePurpleDark },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${designationStartEntry} to ${designationEndEntry} of ${filteredDesignations.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredDesignations.length / designationRowsPerPage)}
                      page={designationPage + 1}
                      onChange={handleDesignationPaginationChange}
                      showFirstButton showLastButton
                      sx={{
                          '& .MuiPaginationItem-root:hover': { backgroundColor: themeOrange, color: 'white' },
                          '& .MuiPaginationItem-page': {
                              color: themePurple,
                              '&.Mui-selected': {
                                  backgroundColor: themePurple,
                                  color: 'white',
                                  '&:hover': { backgroundColor: themeOrange }
                              },
                          },
                           '& .MuiPaginationItem-icon': { color: themePurple }
                      }}
                  />
              </Box>
          )}
        </Box>
      </Box>

      <Box component={Paper} p={3}>
        <Typography
          variant="h4"
          sx={{ color: themePurple, fontWeight: "bold", mb: 4 }}
        >
          Grade Wise Manpower
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={gradeSearchTerm}
            onChange={(e) => {
              setGradeSearchTerm(e.target.value);
              setGradePage(0);
            }}
            sx={{ width: isMobile ? "100%" : "auto" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <TableHead sx={{ backgroundColor: themePurple }}>
               <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  SR. NO.
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  GRADE
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  NO OF EMPLOYEES
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? renderTableSkeletons(gradeRowsPerPage, 3)
                : (gradeRowsPerPage > 0
                    ? filteredGrades.slice(
                        gradePage * gradeRowsPerPage,
                        gradePage * gradeRowsPerPage + gradeRowsPerPage
                      )
                    : filteredGrades
                  ).map((grade, index) => (
                    <TableRow
                      key={grade.grade_id}
                      sx={{
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      }}
                    >
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {gradePage * gradeRowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {grade.grade_name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "0.95rem" }}>
                        {grade.total_users}
                      </TableCell>
                    </TableRow>
                  ))}
              {!loading && filteredGrades.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No grades found.
                  </TableCell>
                </TableRow>
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
                          <Select
                              value={gradeRowsPerPage}
                              onChange={handleGradeRowsPerPageChange}
                              sx={{
                                  backgroundColor: themePurple,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: themePurpleDark },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${gradeStartEntry} to ${gradeEndEntry} of ${filteredGrades.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredGrades.length / gradeRowsPerPage)}
                      page={gradePage + 1}
                      onChange={handleGradePaginationChange}
                      showFirstButton showLastButton
                      sx={{
                          '& .MuiPaginationItem-root:hover': { backgroundColor: themeOrange, color: 'white' },
                          '& .MuiPaginationItem-page': {
                              color: themePurple,
                              '&.Mui-selected': {
                                  backgroundColor: themePurple,
                                  color: 'white',
                                  '&:hover': { backgroundColor: themeOrange }
                              },
                          },
                           '& .MuiPaginationItem-icon': { color: themePurple }
                      }}
                  />
              </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardCoreHr;