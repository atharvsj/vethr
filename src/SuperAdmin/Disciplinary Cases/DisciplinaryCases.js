// // import React, { useState } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   TextField,
// //   Button,
// //   Box,
// //   Paper,
// //   Typography,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   MenuItem,
// //   Select,
// //   InputLabel,
// //   FormControl,
// // } from "@mui/material";

// // // Sample Data (This will be replaced with actual API data or state management later)
// // const initialCases = [
// //   {
// //     id: 1,
// //     employee: "John Doe",
// //     caseType: "Misconduct",
// //     caseDate: "2023-10-15",
// //     subject: "Late for Work",
// //     caseBy: "HR",
// //   },
// //   {
// //     id: 2,
// //     employee: "Jane Smith",
// //     caseType: "Harassment",
// //     caseDate: "2023-11-05",
// //     subject: "Inappropriate Behavior",
// //     caseBy: "Manager",
// //   },
// //   {
// //     id: 3,
// //     employee: "Bob Johnson",
// //     caseType: "Absenteeism",
// //     caseDate: "2023-09-28",
// //     subject: "Unapproved Leave",
// //     caseBy: "HR",
// //   },
// //   {
// //     id: 4,
// //     employee: "Alice Brown",
// //     caseType: "Performance Issue",
// //     caseDate: "2023-11-20",
// //     subject: "Low Sales",
// //     caseBy: "Manager",
// //   },
// //   {
// //     id: 5,
// //     employee: "Charlie Davis",
// //     caseType: "Theft",
// //     caseDate: "2023-08-30",
// //     subject: "Stolen Equipment",
// //     caseBy: "Security",
// //   },
// //   {
// //     id: 6,
// //     employee: "Eve White",
// //     caseType: "Misconduct",
// //     caseDate: "2023-07-12",
// //     subject: "Fighting in Office",
// //     caseBy: "HR",
// //   },
// //   {
// //     id: 7,
// //     employee: "David Wilson",
// //     caseType: "Absenteeism",
// //     caseDate: "2023-10-25",
// //     subject: "Unauthorized Absence",
// //     caseBy: "HR",
// //   },
// //   {
// //     id: 8,
// //     employee: "Grace Lee",
// //     caseType: "Harassment",
// //     caseDate: "2023-09-10",
// //     subject: "Verbal Abuse",
// //     caseBy: "Manager",
// //   },
// //   {
// //     id: 9,
// //     employee: "Oscar Scott",
// //     caseType: "Performance Issue",
// //     caseDate: "2023-06-05",
// //     subject: "Failed Targets",
// //     caseBy: "Manager",
// //   },
// //   {
// //     id: 10,
// //     employee: "Ivy Clark",
// //     caseType: "Misconduct",
// //     caseDate: "2023-05-01",
// //     subject: "Unprofessional Behavior",
// //     caseBy: "HR",
// //   },
// //   {
// //     id: 11,
// //     employee: "Liam Martinez",
// //     caseType: "Theft",
// //     caseDate: "2023-02-25",
// //     subject: "Stealing Supplies",
// //     caseBy: "Security",
// //   },
// // ];

// // // Predefined employee names for the dropdown
// // const employeeNames = [
// //   "John Doe",
// //   "Jane Smith",
// //   "Bob Johnson",
// //   "Alice Brown",
// //   "Charlie Davis",
// //   "Eve White",
// //   "David Wilson",
// //   "Grace Lee",
// //   "Oscar Scott",
// //   "Ivy Clark",
// //   "Liam Martinez",
// //   "New Employee X", // Example of additional employees
// //   "New Employee Y",
// // ];

// // // Predefined case types
// // const caseTypes = [
// //   "Misconduct",
// //   "Harassment",
// //   "Absenteeism",
// //   "Performance Issue",
// //   "Theft",
// //   "Insubordination",
// //   "Policy Violation",
// // ];

// // // Predefined "Case By" options
// // const caseByOptions = ["HR", "Admin", "Manager", "Security", "Peer"];

// // export default function DisciplinaryCases() {
// //   const [cases, setCases] = useState(initialCases);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [showDialog, setShowDialog] = useState(false); // State to toggle Dialog visibility
// //   const [newCase, setNewCase] = useState({
// //     employee: "",
// //     caseType: "",
// //     caseDate: "",
// //     subject: "",
// //     caseBy: "",
// //   });

// //   // Filter the cases based on search query
// //   const filteredCases = cases.filter((row) => {
// //     return (
// //       row.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       row.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       row.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       row.caseBy.toLowerCase().includes(searchQuery.toLowerCase()) // Added caseBy to filter
// //     );
// //   });

// //   const handleSearchChange = (event) => {
// //     setSearchQuery(event.target.value);
// //     setPage(0); // Reset to first page on new search
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleAddNewCase = () => {
// //     setShowDialog(true); // Open the dialog form
// //   };

// //   const handleCloseDialog = () => {
// //     setShowDialog(false); // Close the dialog
// //     setNewCase({ // Reset form on close
// //       employee: "",
// //       caseType: "",
// //       caseDate: "",
// //       subject: "",
// //       caseBy: "",
// //     });
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewCase({ ...newCase, [name]: value });
// //   };

// //   const handleSubmit = () => {
// //     // Basic validation
// //     if (!newCase.employee || !newCase.caseType || !newCase.caseDate || !newCase.subject || !newCase.caseBy) {
// //         alert("Please fill in all fields.");
// //         return;
// //     }

// //     const newCaseData = {
// //       id: cases.length > 0 ? Math.max(...cases.map(c => c.id)) + 1 : 1, // More robust ID generation
// //       ...newCase,
// //     };
// //     setCases([newCaseData, ...cases]); // Add new case to the top of the list
// //     handleCloseDialog(); // Close the form after submitting
// //     // setNewCase is called in handleCloseDialog to reset form
// //   };

// //   return (
// //     <Box sx={{ padding: 3 }}>
// //       <Typography variant="h4" gutterBottom>
// //         Disciplinary Cases
// //       </Typography>

// //       {/* Search Bar and Add Button Container */}
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           marginBottom: 2,
// //           flexWrap: "wrap", // Allow wrapping on smaller screens
// //           gap: 2, // Add gap between items
// //         }}
// //       >
// //         <TextField
// //           label="Search Cases"
// //           variant="outlined"
// //           value={searchQuery}
// //           onChange={handleSearchChange}
// //           sx={{ width: { xs: "100%", sm: "auto" }, flexGrow: {sm: 1} }} // Flexible width
// //         />
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           onClick={handleAddNewCase}
// //           sx={{ width: { xs: "100%", sm: "auto" } }} // Full width on xs
// //         >
// //           Add New Case
// //         </Button>
// //       </Box>

// //       {/* Dialog for Add New Case Form */}
// //       <Dialog
// //         open={showDialog}
// //         onClose={handleCloseDialog}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle>Add New Case</DialogTitle>
// //         <DialogContent>
// //           {/* Employee Dropdown */}
// //           <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 1 }}>
// //             <InputLabel id="employee-select-label">Employee</InputLabel>
// //             <Select
// //               labelId="employee-select-label"
// //               label="Employee"
// //               name="employee"
// //               value={newCase.employee}
// //               onChange={handleInputChange}
// //             >
// //               {employeeNames.map((name, index) => (
// //                 <MenuItem key={index} value={name}>
// //                   {name}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           {/* Case Type Dropdown */}
// //           <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //             <InputLabel id="case-type-select-label">Case Type</InputLabel>
// //             <Select
// //               labelId="case-type-select-label"
// //               label="Case Type"
// //               name="caseType"
// //               value={newCase.caseType}
// //               onChange={handleInputChange}
// //             >
// //               {caseTypes.map((type, index) => (
// //                 <MenuItem key={index} value={type}>
// //                   {type}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <TextField
// //             label="Subject"
// //             variant="outlined"
// //             fullWidth
// //             name="subject"
// //             value={newCase.subject}
// //             onChange={handleInputChange}
// //             sx={{ marginBottom: 2 }}
// //             multiline
// //             rows={3}
// //           />

// //           {/* Case By Dropdown */}
// //           <FormControl fullWidth sx={{ marginBottom: 2 }}>
// //             <InputLabel id="case-by-select-label">Case By</InputLabel>
// //             <Select
// //               labelId="case-by-select-label"
// //               label="Case By"
// //               name="caseBy"
// //               value={newCase.caseBy}
// //               onChange={handleInputChange}
// //             >
// //               {caseByOptions.map((option, index) => (
// //                 <MenuItem key={index} value={option}>
// //                   {option}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           {/* Case Date Input */}
// //           <TextField
// //             label="Case Date"
// //             variant="outlined"
// //             type="date"
// //             fullWidth
// //             name="caseDate"
// //             value={newCase.caseDate}
// //             onChange={handleInputChange}
// //             sx={{ marginBottom: 2 }}
// //             InputLabelProps={{
// //               shrink: true, // Ensures label stays above the field
// //             }}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseDialog} color="secondary">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmit} color="primary" variant="contained">
// //             Submit
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Table with Paginated Data */}
// //       <TableContainer
// //         component={Paper}
// //         sx={{ maxHeight: 'calc(100vh - 300px)', overflow: "auto" }} // Adjusted max height
// //       >
// //         <Table stickyHeader aria-label="disciplinary cases table">
// //           <TableHead>
// //             <TableRow>
// //               <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold' }}>Case Type</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold' }}>Case Date</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
// //               <TableCell sx={{ fontWeight: 'bold' }}>Case By</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {filteredCases.length > 0 ? (
// //               filteredCases
// //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //               .map((row) => (
// //                 <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
// //                   <TableCell>{row.employee}</TableCell>
// //                   <TableCell>{row.caseType}</TableCell>
// //                   <TableCell>{new Date(row.caseDate).toLocaleDateString()}</TableCell>
// //                   <TableCell>{row.subject}</TableCell>
// //                   <TableCell>{row.caseBy}</TableCell>
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell colSpan={5} align="center">
// //                   No cases found.
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Pagination */}
// //       {filteredCases.length > 0 && (
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 15, 25]}
// //           component="div"
// //           count={filteredCases.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       )}
// //     </Box>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   Button,
//   Box,
//   Paper,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";
// const EMPLOYEE_DROPDOWN_URL = `${API_BASE_URL}/employee-dropdown/`;
// const CASE_TYPES_URL = `${API_BASE_URL}/api/case-types/`;
// const STAFF_ROLE_DROPDOWN_URL = `${API_BASE_URL}/api/staffrole-dropdown/`;
// const DISCIPLINARY_CASES_URL = `${API_BASE_URL}/api/disciplinary-cases/`;
// const CASE_DROPDOWN_URL = `${API_BASE_URL}/api/case-types/`; // For table data

// const COMPANY_ID_FOR_POST = 2; // As per example payload

// const initialNewCaseState = {
//   employee: "", // Stores employee ID (value from dropdown)
//   caseType: "", // Stores case type ID (value from dropdown)
//   caseDate: new Date().toISOString().split("T")[0], // Default to today
//   subject: "",
//   description: "", // Added description field
//   caseBy: "", // Stores staff role ID (value from dropdown)
// };

// export default function DisciplinaryCases() {
//   const [cases, setCases] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [showDialog, setShowDialog] = useState(false);
//   const [newCase, setNewCase] = useState(initialNewCaseState);

//   const [employeeDropdownData, setEmployeeDropdownData] = useState([]);
//   const [caseTypeDropdownData, setCaseTypeDropdownData] = useState([]);
//   const [staffRoleDropdownData, setStaffRoleDropdownData] = useState([]);

//   const [isLoading, setIsLoading] = useState(false); // For table loading
//   const [isSubmitting, setIsSubmitting] = useState(false); // For dialog submission
//   const [error, setError] = useState(null); // For general page errors
//   const [dialogError, setDialogError] = useState(null); // For dialog specific errors

//   const fetchAllInitialData = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const [
//         empRes,
//         ctRes,
//         srRes,
//         casesRes,
//       ] = await Promise.all([
//         fetch(EMPLOYEE_DROPDOWN_URL),
//         fetch(CASE_TYPES_URL),
//         fetch(STAFF_ROLE_DROPDOWN_URL),
//         fetch(CASE_DROPDOWN_URL),
//       ]);

//       if (!empRes.ok) throw new Error(`Failed to fetch employees: ${empRes.statusText}`);
//       if (!ctRes.ok) throw new Error(`Failed to fetch case types: ${ctRes.statusText}`);
//       if (!srRes.ok) throw new Error(`Failed to fetch staff roles: ${srRes.statusText}`);
//       if (!casesRes.ok) throw new Error(`Failed to fetch disciplinary cases: ${casesRes.statusText}`);

//       const empData = await empRes.json();
//       const ctData = await ctRes.json();
//       const srData = await srRes.json();
//       const rawCasesData = await casesRes.json();

//       setEmployeeDropdownData(empData);
//       setCaseTypeDropdownData(ctData);
//       setStaffRoleDropdownData(srData);

//       // Create maps for efficient lookup
//       const caseTypeMap = ctData.reduce((acc, curr) => {
//         acc[curr.value] = curr.label;
//         return acc;
//       }, {});
//       const staffRoleMap = srData.reduce((acc, curr) => {
//         acc[curr.value] = curr.label;
//         return acc;
//       }, {});

//       const transformedCases = rawCasesData.map(item => ({
//         id: item.warning_id,
//         employee: item.employee_name,
//         caseType: caseTypeMap[item.warning_type_id] || `Unknown (ID: ${item.warning_type_id})`,
//         caseDate: item.warning_date,
//         subject: item.subject,
//         caseBy: staffRoleMap[item.warning_by] || `Unknown (ID: ${item.warning_by})`,
//         // description: item.description, // Not displayed in table as per current UI
//       }));
//       setCases(transformedCases);

//     } catch (e) {
//       console.error("Error fetching initial data:", e);
//       setError(e.message || "An unknown error occurred while fetching data.");
//       setCases([]); // Clear cases on error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllInitialData();
//   }, []);


//   const filteredCases = cases.filter((row) => {
//     const searchTerm = searchQuery.toLowerCase();
//     return (
//       (row.employee && row.employee.toLowerCase().includes(searchTerm)) ||
//       (row.caseType && row.caseType.toLowerCase().includes(searchTerm)) ||
//       (row.subject && row.subject.toLowerCase().includes(searchTerm)) ||
//       (row.caseBy && row.caseBy.toLowerCase().includes(searchTerm))
//     );
//   });

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddNewCase = () => {
//     setNewCase(initialNewCaseState); // Reset form
//     setDialogError(null); // Clear previous dialog errors
//     setShowDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setShowDialog(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewCase({ ...newCase, [name]: value });
//     if (dialogError) setDialogError(null); // Clear error on input change
//   };

//   const handleSubmit = async () => {
//     // Basic validation
//     if (!newCase.employee || !newCase.caseType || !newCase.caseDate || !newCase.subject || !newCase.description || !newCase.caseBy) {
//       setDialogError("Please fill in all fields.");
//       return;
//     }
//     setDialogError(null);
//     setIsSubmitting(true);

//     const payload = {
//       company_id: COMPANY_ID_FOR_POST,
//       Warning_to: parseInt(newCase.employee), // Ensure it's a number if API expects int
//       Warning_by: parseInt(newCase.caseBy),   // Ensure it's a number
//       warning_date: newCase.caseDate,
//       attachment: null, // As per requirement
//       subject: newCase.subject,
//       description: newCase.description,
//       warning_type_id: parseInt(newCase.caseType), // Ensure it's a number
//     };

//     try {
//       const response = await fetch(DISCIPLINARY_CASES_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Add Authorization headers if needed:
//           // 'Authorization': `Bearer ${your_token_here}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
//         throw new Error(errorData.message || `Failed to add case. Status: ${response.status}`);
//       }

//       // const result = await response.json(); // Process result if needed
//       // console.log("Case added successfully:", result);

//       handleCloseDialog();
//       fetchAllInitialData(); // Re-fetch all data to update the table and potentially dropdowns
//       // Or, if API returns the created object, append it to `cases` state with proper mapping
//       // For simplicity and consistency, re-fetching is robust.

//     } catch (e) {
//       console.error("Error submitting new case:", e);
//       setDialogError(e.message || "An unknown error occurred while saving the case.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Disciplinary Cases
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ marginBottom: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 2,
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         <TextField
//           label="Search Cases"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           sx={{ width: { xs: "100%", sm: "auto" }, flexGrow: { sm: 1 } }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddNewCase}
//           sx={{ width: { xs: "100%", sm: "auto" } }}
//         >
//           Add New Case
//         </Button>
//       </Box>

//       <Dialog
//         open={showDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Add New Case</DialogTitle>
//         <DialogContent>
//           {dialogError && (
//             <Alert severity="error" sx={{ marginBottom: 2 }}>
//               {dialogError}
//             </Alert>
//           )}
//           {/* Employee Dropdown */}
//           <FormControl fullWidth sx={{ marginBottom: 2, marginTop: 1 }}>
//             <InputLabel id="employee-select-label">Employee</InputLabel>
//             <Select
//               labelId="employee-select-label"
//               label="Employee"
//               name="employee" // Corresponds to key in newCase state
//               value={newCase.employee}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="">
//                 <em>Select Employee</em>
//               </MenuItem>
//               {employeeDropdownData.map((emp) => (
//                 <MenuItem key={emp.value} value={emp.value}> {/* Use emp.value for ID */}
//                   {emp.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {/* Case Type Dropdown */}
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel id="case-type-select-label">Case Type</InputLabel>
//             <Select
//               labelId="case-type-select-label"
//               label="Case Type"
//               name="caseType" // Corresponds to key in newCase state
//               value={newCase.caseType}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="">
//                 <em>Select Case Type</em>
//               </MenuItem>
//               {caseTypeDropdownData.map((type) => (
//                 <MenuItem key={type.value} value={type.value}> {/* Use type.value for ID */}
//                   {type.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Subject"
//             variant="outlined"
//             fullWidth
//             name="subject"
//             value={newCase.subject}
//             onChange={handleInputChange}
//             sx={{ marginBottom: 2 }}
//           />

//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             name="description"
//             value={newCase.description}
//             onChange={handleInputChange}
//             sx={{ marginBottom: 2 }}
//             multiline
//             rows={3}
//           />

//           {/* Case By Dropdown */}
//           <FormControl fullWidth sx={{ marginBottom: 2 }}>
//             <InputLabel id="case-by-select-label">Case By</InputLabel>
//             <Select
//               labelId="case-by-select-label"
//               label="Case By"
//               name="caseBy" // Corresponds to key in newCase state
//               value={newCase.caseBy}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="">
//                 <em>Select Case By</em>
//               </MenuItem>
//               {staffRoleDropdownData.map((role) => (
//                 <MenuItem key={role.value} value={role.value}> {/* Use role.value for ID */}
//                   {role.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Case Date"
//             variant="outlined"
//             type="date"
//             fullWidth
//             name="caseDate"
//             value={newCase.caseDate}
//             onChange={handleInputChange}
//             sx={{ marginBottom: 2 }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary" disabled={isSubmitting}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isSubmitting}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {isLoading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 300px)' }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           <TableContainer
//             sx={{ maxHeight: 'calc(100vh - 350px)', overflow: "auto" }} // Adjusted max height
//           >
//             <Table stickyHeader aria-label="disciplinary cases table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Case Type</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Case Date</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Case By</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCases.length > 0 ? (
//                   filteredCases
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((row) => (
//                     <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell>{row.employee}</TableCell>
//                       <TableCell>{row.caseType}</TableCell>
//                       <TableCell>{new Date(row.caseDate).toLocaleDateString()}</TableCell>
//                       <TableCell>{row.subject}</TableCell>
//                       <TableCell>{row.caseBy}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       {searchQuery ? "No cases match your search." : "No cases found."}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredCases.length > 0 && (
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 15, 25]}
//               component="div"
//               count={filteredCases.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           )}
//         </Paper>
//       )}
//     </Box>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Skeleton,
  Grid,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  SupervisorAccount as SupervisorIcon,
} from "@mui/icons-material"

const API_BASE_URL = "https://tdtlworld.com/hrms-backend"
const EMPLOYEE_DROPDOWN_URL = `${API_BASE_URL}/employee-dropdown/`
const CASE_TYPES_URL = `${API_BASE_URL}/api/case-types/`
const STAFF_ROLE_DROPDOWN_URL = `${API_BASE_URL}/api/staffrole-dropdown/`
const DISCIPLINARY_CASES_URL = `${API_BASE_URL}/api/disciplinary-cases/`

const COMPANY_ID_FOR_POST = 2

const initialNewCaseState = {
  employee: "",
  caseType: "",
  caseDate: new Date().toISOString().split("T")[0],
  subject: "",
  description: "",
  caseBy: "",
}

// Skeleton component for table rows
const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={120} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="rounded" width={80} height={24} />
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={100} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={200} />
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={100} />
      </Box>
    </TableCell>
  </TableRow>
)

export default function DisciplinaryCases() {
  const [cases, setCases] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showDialog, setShowDialog] = useState(false)
  const [newCase, setNewCase] = useState(initialNewCaseState)

  const [employeeDropdownData, setEmployeeDropdownData] = useState([])
  const [caseTypeDropdownData, setCaseTypeDropdownData] = useState([])
  const [staffRoleDropdownData, setStaffRoleDropdownData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [dialogError, setDialogError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const fetchAllInitialData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [empRes, ctRes, srRes, casesRes] = await Promise.all([
        fetch(EMPLOYEE_DROPDOWN_URL),
        fetch(CASE_TYPES_URL),
        fetch(STAFF_ROLE_DROPDOWN_URL),
        fetch(DISCIPLINARY_CASES_URL),
      ])

      if (!empRes.ok) throw new Error(`Failed to fetch employees: ${empRes.statusText} (${empRes.status})`)
      if (!ctRes.ok) throw new Error(`Failed to fetch case types: ${ctRes.statusText} (${ctRes.status})`)
      if (!srRes.ok) throw new Error(`Failed to fetch staff roles: ${srRes.statusText} (${srRes.status})`)
      if (!casesRes.ok)
        throw new Error(`Failed to fetch disciplinary cases for table: ${casesRes.statusText} (${casesRes.status})`)

      const empData = await empRes.json()
      const ctData = await ctRes.json()
      const srData = await srRes.json()
      const rawCasesData = await casesRes.json()

      setEmployeeDropdownData(empData)
      setCaseTypeDropdownData(ctData)
      setStaffRoleDropdownData(srData)

      const caseTypeMap = ctData.reduce((acc, curr) => {
        acc[curr.value] = curr.label
        return acc
      }, {})
      const staffRoleMap = srData.reduce((acc, curr) => {
        acc[curr.value] = curr.label
        return acc
      }, {})

      const transformedCases = rawCasesData.map((item) => ({
        id: item.warning_id,
        employee: item.employee_name,
        caseType: caseTypeMap[item.warning_type_id] || `Unknown Type (ID: ${item.warning_type_id})`,
        caseDate: item.warning_date,
        subject: item.subject,
        caseBy: staffRoleMap[item.Warning_by] || `Unknown By (ID: ${item.Warning_by})`,
      }))
      setCases(transformedCases)
    } catch (e) {
      console.error("Error fetching initial data:", e)
      setError(e.message || "An unknown error occurred while fetching data.")
      setCases([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllInitialData()
  }, [refreshKey])

  const filteredCases = cases.filter((row) => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      (row.employee && row.employee.toLowerCase().includes(searchTerm)) ||
      (row.caseType && row.caseType.toLowerCase().includes(searchTerm)) ||
      (row.subject && row.subject.toLowerCase().includes(searchTerm)) ||
      (row.caseBy && row.caseBy.toLowerCase().includes(searchTerm))
    )
  })

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleAddNewCase = () => {
    setNewCase(initialNewCaseState)
    setDialogError(null)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCase({ ...newCase, [name]: value })
    if (dialogError) setDialogError(null)
  }

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  const handleSubmit = async () => {
    if (
      !newCase.employee ||
      !newCase.caseType ||
      !newCase.caseDate ||
      !newCase.subject ||
      !newCase.description ||
      !newCase.caseBy
    ) {
      setDialogError("Please fill in all fields.")
      return
    }
    setDialogError(null)
    setIsSubmitting(true)

    const payload = {
      company_id: COMPANY_ID_FOR_POST,
      Warning_to: Number.parseInt(newCase.employee),
      Warning_by: Number.parseInt(newCase.caseBy),
      warning_date: newCase.caseDate,
      attachment: null,
      subject: newCase.subject,
      description: newCase.description,
      warning_type_id: Number.parseInt(newCase.caseType),
    }

    try {
      const response = await fetch(DISCIPLINARY_CASES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }))
        const detail = errorData.detail || (typeof errorData === "string" ? errorData : null)
        const messages = errorData.message || (errorData.messages ? errorData.messages.join(", ") : null)
        const nonFieldErrors = errorData.non_field_errors ? errorData.non_field_errors.join(", ") : null

        let errorMessage = detail || messages || nonFieldErrors
        if (!errorMessage) {
          errorMessage = Object.values(errorData).flat().join("; ") || `Failed to add case. Status: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      handleCloseDialog()
      fetchAllInitialData()
    } catch (e) {
      console.error("Error submitting new case:", e)
      setDialogError(e.message || "An unknown error occurred while saving the case.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCaseTypeColor = (caseType) => {
    const lowerCaseType = caseType.toLowerCase()
    if (lowerCaseType.includes("warning")) return "warning"
    if (lowerCaseType.includes("violation")) return "error"
    if (lowerCaseType.includes("misconduct")) return "error"
    if (lowerCaseType.includes("performance")) return "info"
    return "default"
  }

  return (
    <Box sx={{ paddingLeft: { xs: 2, sm: 3 }, paddingRight: { xs: 2, sm: 3 }, paddingBottom: { xs: 2, sm: 3 } }}>
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, rgba(36, 73, 239, 0.05) 0%, rgba(218, 18, 202, 0.05) 100%)",
          borderLeft: "4px solid",
          borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333" }}>
            Disciplinary Cases
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all disciplinary cases across the organization
          </Typography>
        </CardContent>
      </Card>

      {error && !isLoading && (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          {`Error loading data: ${error}`}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: { xs: "100%", sm: "auto" },
            flexGrow: { sm: 1 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(36, 73, 239, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(218, 18, 202, 0.7)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="Search by employee, case type, subject..."
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip title="Refresh Data">
            <IconButton
              onClick={handleRefresh}
              color="primary"
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(36, 73, 239, 0.04)",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleAddNewCase}
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)",
              color: "white",
              borderRadius: 2,
              padding: "10px 24px",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(36, 73, 239, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(36, 73, 239, 0.4)",
                transform: "translateY(-2px)",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add New Case
          </Button>
        </Box>
      </Box>

      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={400}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon />
            Add New Case
          </Box>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          {dialogError && (
            <Alert
              severity="error"
              sx={{
                marginBottom: 3,
                borderRadius: 2,
              }}
            >
              {dialogError}
            </Alert>
          )}

          {/* Properly aligned form using Grid */}
          <Grid container spacing={3}>
            {/* First Row - Employee and Case Type */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="employee-select-label">Employee</InputLabel>
                <Select
                  labelId="employee-select-label"
                  label="Employee"
                  name="employee"
                  value={newCase.employee}
                  onChange={handleInputChange}
                  startAdornment={<PersonIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>Select Employee</em>
                  </MenuItem>
                  {employeeDropdownData.map((emp) => (
                    <MenuItem key={emp.value} value={emp.value}>
                      {emp.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="case-type-select-label">Case Type</InputLabel>
                <Select
                  labelId="case-type-select-label"
                  label="Case Type"
                  name="caseType"
                  value={newCase.caseType}
                  onChange={handleInputChange}
                  startAdornment={<CategoryIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>Select Case Type</em>
                  </MenuItem>
                  {caseTypeDropdownData.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Second Row - Subject */}
            <Grid item xs={12}>
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                name="subject"
                value={newCase.subject}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Third Row - Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                value={newCase.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Provide detailed information about the case..."
              />
            </Grid>

            {/* Fourth Row - Case By and Case Date */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="case-by-select-label">Case By</InputLabel>
                <Select
                  labelId="case-by-select-label"
                  label="Case By"
                  name="caseBy"
                  value={newCase.caseBy}
                  onChange={handleInputChange}
                  startAdornment={<SupervisorIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>Select Case By</em>
                  </MenuItem>
                  {staffRoleDropdownData.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Case Date"
                variant="outlined"
                type="date"
                fullWidth
                name="caseDate"
                value={newCase.caseDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "text.secondary",
              borderRadius: 2,
              px: 3,
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              background: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)",
              color: "white",
              borderRadius: 2,
              px: 3,
              "&:hover": {
                boxShadow: "0 4px 12px rgba(36, 73, 239, 0.3)",
              },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit Case"}
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading ? (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "#f5f5f7",
                      borderBottom: "2px solid rgba(36, 73, 239, 0.1)",
                      fontWeight: "bold",
                      color: "#333",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Case Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Case Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Case By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(new Array(5)).map((_, index) => (
                  <TableRowSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : !error && cases.length === 0 && !searchQuery ? (
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px dashed rgba(0,0,0,0.1)",
          }}
        >
          <WarningIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No disciplinary cases available at the moment.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add New Case" to create your first disciplinary case record.
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <TableContainer sx={{ maxHeight: "calc(100vh - 350px)", overflow: "auto" }}>
            <Table stickyHeader aria-label="disciplinary cases table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "#f5f5f7",
                      borderBottom: "2px solid rgba(36, 73, 239, 0.1)",
                      fontWeight: "bold",
                      color: "#333",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Case Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Case Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Case By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCases.length > 0 ? (
                  filteredCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "rgba(36, 73, 239, 0.04)",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PersonIcon sx={{ mr: 1, color: "rgba(36, 73, 239, 0.7)", fontSize: 20 }} />
                          <Typography variant="body2">{row.employee}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.caseType}
                          color={getCaseTypeColor(row.caseType)}
                          size="small"
                          sx={{
                            fontWeight: 500,
                            borderRadius: 1.5,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
                          {new Date(row.caseDate).toLocaleDateString()}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={row.subject} arrow>
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: { xs: 120, sm: 200, md: 300 },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.subject}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <SupervisorIcon sx={{ mr: 1, color: "rgba(218, 18, 202, 0.7)", fontSize: 20 }} />
                          {row.caseBy}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchQuery
                          ? "No cases match your search."
                          : error
                            ? "Error loading data."
                            : "No cases found."}
                      </Typography>
                      {searchQuery && (
                        <Button
                          variant="text"
                          onClick={() => setSearchQuery("")}
                          sx={{ mt: 1, color: "rgba(36, 73, 239, 0.89)" }}
                        >
                          Clear Search
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredCases.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={filteredCases.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  margin: 0,
                },
              }}
            />
          )}
        </Paper>
      )}
    </Box>
  )
}
