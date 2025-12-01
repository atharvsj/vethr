// // "use client"

// // import { useState, useEffect } from "react"
// // import axiosInstance from "../../utils/axiosInstance"
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Paper,
// //   TextField,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Modal,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Stack,
// // } from "@mui/material"
// // import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material"

// // export default function Designation() {
// //   const [department, setDepartment] = useState("")
// //   const [designationName, setDesignationName] = useState("")
// //   const [designationCode, setDesignationCode] = useState("") // Added designation code state
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [designations, setDesignations] = useState([])
// //   const [editingDesignation, setEditingDesignation] = useState(null)
// //   const [openModal, setOpenModal] = useState(false)
// //   const [description, setDescription] = useState("")
// //   const [departments, setDepartments] = useState([])

// //   const API_URL = "https://tdtlworld.com/hrms-backend/ci_designations/"

// //   useEffect(() => {
// //     fetchDesignations()
// //     fetchDepartments()
// //   }, [])

// //   const fetchDepartments = async () => {
// //     try {
// //       const response = await axiosInstance.get("/api/desig_dept_dropdown")
// //       setDepartments(response.data.dept_data || [])
// //     } catch (error) {
// //       console.error("Error fetching departments:", error.response || error.message)
// //     }
// //   }

// //   const getDepartmentName = (id) => {
// //     const dept = departments.find((d) => d.dept_id === id)
// //     return dept ? dept.dept_name : "Unknown"
// //   }

// //   const fetchDesignations = async () => {
// //     try {
// //       const response = await axiosInstance.get(API_URL)
// //       const mappedData = response.data.map((item) => ({
// //         id: item.designation_id,
// //         departmentId: item.department,
// //         designation: item.designation_name,
// //         code: item.designation_code, // Added designation code
// //         description: item.description,
// //       }))
// //       setDesignations(mappedData)
// //     } catch (error) {
// //       console.error("Error fetching designations:", error.response || error.message)
// //     }
// //   }

// //   const handleDepartmentChange = (event) => setDepartment(event.target.value)
// //   const handleDesignationNameChange = (event) => setDesignationName(event.target.value)
// //   const handleDesignationCodeChange = (event) => setDesignationCode(event.target.value) // Added handler for code
// //   const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase())
// //   const handleDescriptionChange = (event) => setDescription(event.target.value)

// //   const handleAddDesignation = async () => {
// //     if (department && designationName && designationCode && description) {
// //       // Added code to validation
// //       try {
// //         await axiosInstance.post(API_URL, {
// //           company_id: 2, // Hardcoded company_id
// //           designation_name: designationName,
// //           designation_code: designationCode, // Added designation code
// //           department_name: department, // department ID
// //           description,
// //           created_at: new Date().toISOString().split("T")[0], // Send only date part if backend expects date
// //         })
// //         await fetchDesignations()
// //         resetForm()
// //         setOpenModal(false)
// //       } catch (error) {
// //         console.error("Error adding designation:", error.response || error.message)
// //         alert(`Error: ${error.response?.data?.detail || error.message || "Failed to add designation"}`)
// //       }
// //     } else {
// //       alert("Please fill out Department, Designation Code, Designation Name, and Description.")
// //     }
// //   }

// //   const handleEditDesignation = (designation) => {
// //     setEditingDesignation(designation)
// //     setDepartment(designation.departmentId)
// //     setDesignationName(designation.designation)
// //     setDesignationCode(designation.code || "") // Added code
// //     setDescription(designation.description || "")
// //     setOpenModal(true)
// //   }

// //   const handleSaveEdit = async () => {
// //     if (!editingDesignation) return
// //     if (department && designationName && designationCode && description) {
// //       // Added code to validation
// //       try {
// //         await axiosInstance.patch(`${API_URL}${editingDesignation.id}/`, {
// //           company_id: 2, // Hardcoded company_id
// //           designation_name: designationName,
// //           designation_code: designationCode, // Added designation code
// //           department_name: Number.parseInt(department),
// //           description,
// //         })
// //         await fetchDesignations()
// //         resetForm()
// //         setOpenModal(false)
// //       } catch (error) {
// //         console.error("Error updating designation:", error.response || error.message)
// //         alert(`Error: ${error.response?.data?.detail || error.message || "Failed to update designation"}`)
// //       }
// //     } else {
// //       alert("Please fill out Department, Designation Code, Designation Name, and Description.")
// //     }
// //   }

// //   const handleDeleteDesignation = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this designation?")) return
// //     try {
// //       await axiosInstance.delete(`${API_URL}${id}/`)
// //       await fetchDesignations()
// //     } catch (error) {
// //       console.error("Error deleting designation:", error)
// //       alert(`Error: ${error.response?.data?.detail || error.message || "Failed to delete designation"}`)
// //     }
// //   }

// //   const resetForm = () => {
// //     setDepartment("")
// //     setDesignationName("")
// //     setDesignationCode("") // Added reset for code
// //     setDescription("")
// //     setEditingDesignation(null)
// //   }

// //   const filteredDesignations = designations.filter(
// //     (designation) =>
// //       (designation.designation && designation.designation.toLowerCase().includes(searchTerm)) ||
// //       (getDepartmentName(designation.departmentId) &&
// //         getDepartmentName(designation.departmentId).toLowerCase().includes(searchTerm)) ||
// //       (designation.code && designation.code.toLowerCase().includes(searchTerm)), // Added search by code
// //   )

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 2 }}>
// //       <Paper elevation={3} sx={{ p: 3 }}>
// //         <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
// //           Designation Management
// //         </Typography>

// //         <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
// //           <TextField
// //             variant="outlined"
// //             fullWidth
// //             placeholder="Search by Designation, Code or Department"
// //             value={searchTerm}
// //             onChange={handleSearchChange}
// //             InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} /> }}
// //             sx={{ flexGrow: 1 }}
// //           />
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<AddIcon />}
// //             onClick={() => {
// //               resetForm()
// //               setOpenModal(true)
// //             }}
// //             sx={{ minWidth: "220px" }}
// //           >
// //             Add New Designation
// //           </Button>
// //         </Stack>

// //         <TableContainer>
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Department</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Designation Code</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Designation</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200", textAlign: "center" }}>
// //                   Actions
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {filteredDesignations.length > 0 ? (
// //                 filteredDesignations.map((designation) => (
// //                   <TableRow key={designation.id} hover>
// //                     <TableCell>{getDepartmentName(designation.departmentId)}</TableCell>
// //                     <TableCell>{designation.code || "N/A"}</TableCell>
// //                     <TableCell>{designation.designation}</TableCell>
// //                     <TableCell sx={{ textAlign: "center" }}>
// //                       <IconButton color="primary" onClick={() => handleEditDesignation(designation)} size="small">
// //                         <EditIcon />
// //                       </IconButton>
// //                       <IconButton color="error" onClick={() => handleDeleteDesignation(designation.id)} size="small">
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={4} align="center">
// //                     No designations found.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>

// //       <Modal
// //         open={openModal}
// //         onClose={() => {
// //           setOpenModal(false)
// //           resetForm()
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             width: { xs: "90%", sm: 450 },
// //             bgcolor: "background.paper",
// //             p: 3,
// //             borderRadius: 2,
// //             boxShadow: 24,
// //           }}
// //         >
// //           <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
// //             {editingDesignation ? "Edit Designation" : "Add New Designation"}
// //           </Typography>

// //           <FormControl fullWidth margin="normal" required>
// //             <InputLabel id="department-select-label">Department</InputLabel>
// //             <Select
// //               labelId="department-select-label"
// //               value={department}
// //               onChange={handleDepartmentChange}
// //               label="Department"
// //             >
// //               <MenuItem value="">
// //                 <em>Select Department</em>
// //               </MenuItem>
// //               {departments.map((dept) => (
// //                 <MenuItem key={dept.dept_id} value={dept.dept_id}>
// //                   {dept.dept_name}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <TextField
// //             fullWidth
// //             required
// //             label="Designation Code"
// //             value={designationCode}
// //             onChange={handleDesignationCodeChange}
// //             variant="outlined"
// //             margin="normal"
// //           />

// //           <TextField
// //             fullWidth
// //             required
// //             label="Designation Name"
// //             value={designationName}
// //             onChange={handleDesignationNameChange}
// //             variant="outlined"
// //             margin="normal"
// //           />

// //           <TextField
// //             fullWidth
// //             required
// //             label="Description"
// //             value={description}
// //             onChange={handleDescriptionChange}
// //             variant="outlined"
// //             margin="normal"
// //             multiline
// //             rows={3}
// //           />
// //           <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
// //             <Button
// //               variant="outlined"
// //               onClick={() => {
// //                 setOpenModal(false)
// //                 resetForm()
// //               }}
// //             >
// //               Cancel
// //             </Button>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={editingDesignation ? handleSaveEdit : handleAddDesignation}
// //             >
// //               {editingDesignation ? "Save Changes" : "Add Designation"}
// //             </Button>
// //           </Stack>
// //         </Box>
// //       </Modal>
// //     </Container>
// //   )
// // }



// // import React, { useState, useEffect } from "react";
// // import axiosInstance from "../../utils/axiosInstance";
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Paper,
// //   TextField,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Modal,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Stack,
// //   CircularProgress, // Added for loading state
// // } from "@mui/material";
// // import {
// //   Add as AddIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Search as SearchIcon,
// // } from "@mui/icons-material";

// // export default function Designation() {
// //   // State for form fields
// //   const [department, setDepartment] = useState("");
// //   const [designationName, setDesignationName] = useState("");
// //   const [code, setCode] = useState("");
// //   const [description, setDescription] = useState("");

// //   // State for component logic
// //   const [loading, setLoading] = useState(true); // Added for loading state
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [designations, setDesignations] = useState([]);
// //   const [departments, setDepartments] = useState([]);
// //   const [editingDesignation, setEditingDesignation] = useState(null);
// //   const [openModal, setOpenModal] = useState(false);

// //   useEffect(() => {
// //     // Fetch both simultaneously for better performance
// //     Promise.all([fetchDesignations(), fetchDepartments()]).finally(() => {
// //         setLoading(false);
// //     });
// //   }, []);

// //   const fetchDepartments = async () => {
// //     try {
// //       const response = await axiosInstance.get("api/desig_dept_dropdown/");
// //       setDepartments(response.data.dept_data || []);
// //     } catch (error) {
// //       console.error("Error fetching departments:", error.response || error.message);
// //     }
// //   };

// //   const getDepartmentName = (id) => {
// //     const dept = departments.find((d) => d.dept_id === id);
// //     return dept ? dept.dept_name : "Unknown";
// //   };

// //   const fetchDesignations = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.get("ci_designations/");
// //       // --- FIX #1: Correctly map departmentId to the numeric ID from the API ---
// //       const mappedData = response.data.map((item) => ({
// //         id: item.designation_id,
// //         departmentId: item.department_id, // Use the ID for logic and state
// //         code: item.designation_code,
// //         designation: item.designation_name,
// //         description: item.description,
// //       }));
// //       setDesignations(mappedData);
// //     } catch (error) {
// //       console.error("Error fetching designations:", error.response || error.message);
// //     } finally {
// //         setLoading(false);
// //     }
// //   };

// //   // State change handlers
// //   const handleDepartmentChange = (event) => setDepartment(event.target.value);
// //   const handleCodeChange = (event) => setCode(event.target.value);
// //   const handleDesignationNameChange = (event) => setDesignationName(event.target.value);
// //   const handleSearchChange = (event) => setSearchTerm(event.target.value.toLowerCase());
// //   const handleDescriptionChange = (event) => setDescription(event.target.value);

// //   const handleAddDesignation = async () => {
// //     if (department && designationName && code && description) {
// //       try {
// //         await axiosInstance.post("ci_designations/", {
// //           company_id: 2, // Hardcoded as requested
// //           department_id: department, // The state now holds the ID directly
// //           designation_code: code,
// //           designation_name: designationName,
// //           description,
// //           created_at: new Date().toISOString().split('T')[0],
// //         });
// //         await fetchDesignations();
// //         resetFormAndCloseModal();
// //       } catch (error) {
// //         console.error("Error adding designation:", error.response || error.message);
// //         alert(`Error: ${error.response?.data?.detail || 'Failed to add designation'}`);
// //       }
// //     } else {
// //       alert("Please fill out all required fields.");
// //     }
// //   };

// //   // --- FIX #2: This function will now work correctly because the mapping is fixed ---
// //   const handleEditDesignation = (designation) => {
// //     setEditingDesignation(designation);
// //     setDepartment(designation.departmentId); // Sets the department ID (e.g., 1, 2)
// //     setCode(designation.code || "");
// //     setDesignationName(designation.designation || "");
// //     setDescription(designation.description || "");
// //     setOpenModal(true);
// //   };

// //   const handleSaveEdit = async () => {
// //     if (!editingDesignation) return;
// //     if (department && designationName && code && description) {
// //       try {
// //         await axiosInstance.patch(`ci_designations/${editingDesignation.id}/`, {
// //           company_id: 2,
// //           department_id: department, // Send the correct ID
// //           designation_code: code,
// //           designation_name: designationName,
// //           description,
// //         });
// //         await fetchDesignations();
// //         resetFormAndCloseModal();
// //       } catch (error) {
// //         console.error("Error updating designation:", error.response || error.message);
// //         alert(`Error: ${error.response?.data?.detail || 'Failed to update designation'}`);
// //       }
// //     } else {
// //       alert("Please fill out all required fields.");
// //     }
// //   };

// //   const handleDeleteDesignation = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this designation?")) return;
// //     try {
// //       await axiosInstance.delete(`ci_designations/${id}/`);
// //       await fetchDesignations();
// //     } catch (error) {
// //       console.error("Error deleting designation:", error);
// //       alert(`Error: ${error.response?.data?.detail || 'Failed to delete designation'}`);
// //     }
// //   };

// //   const resetFormAndCloseModal = () => {
// //     setDepartment("");
// //     setDesignationName("");
// //     setDescription("");
// //     setCode("");
// //     setEditingDesignation(null);
// //     setOpenModal(false);
// //   };

// //   const filteredDesignations = designations.filter(
// //     (d) =>
// //       (d.designation && d.designation.toLowerCase().includes(searchTerm)) ||
// //       (getDepartmentName(d.departmentId) && getDepartmentName(d.departmentId).toLowerCase().includes(searchTerm)) ||
// //       (d.code && d.code.toLowerCase().includes(searchTerm))
// //   );

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 2 }}>
// //       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
// //         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
// //           Designation Management
// //         </Typography>

// //         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
// //           <TextField
// //             variant="outlined"
// //             fullWidth
// //             placeholder="Search by Designation, Department, or Code"
// //             value={searchTerm}
// //             onChange={handleSearchChange}
// //             InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} /> }}
// //             sx={{ flexGrow: 1 }}
// //           />
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             startIcon={<AddIcon />}
// //             onClick={() => {
// //               setEditingDesignation(null);
// //               setOpenModal(true);
// //             }}
// //             sx={{ minWidth: '220px' }}
// //           >
// //             Add New Designation
// //           </Button>
// //         </Stack>

// //         <TableContainer>
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>Department</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>Code</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>Designation</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200', textAlign: 'center' }}>Actions</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {loading ? (
// //                 <TableRow>
// //                   <TableCell colSpan={4} align="center">
// //                     <CircularProgress />
// //                   </TableCell>
// //                 </TableRow>
// //               ) : filteredDesignations.length > 0 ? (
// //                 filteredDesignations.map((designation) => (
// //                   <TableRow key={designation.id} hover>
// //                     {/* --- FIX #3: Use the helper function to display the department name --- */}
// //                     <TableCell>{getDepartmentName(designation.departmentId)}</TableCell>
// //                     <TableCell>{designation.code}</TableCell>
// //                     <TableCell>{designation.designation}</TableCell>
// //                     <TableCell sx={{ textAlign: 'center' }}>
// //                       <IconButton color="primary" onClick={() => handleEditDesignation(designation)} size="small">
// //                         <EditIcon />
// //                       </IconButton>
// //                       <IconButton color="error" onClick={() => handleDeleteDesignation(designation.id)} size="small">
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={4} align="center">
// //                     No designations found.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>

// //       <Modal open={openModal} onClose={resetFormAndCloseModal}>
// //         <Box
// //           sx={{
// //             position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
// //             width: { xs: '90%', sm: 450 }, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24,
// //           }}
// //         >
// //           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2}}>
// //             {editingDesignation ? "Edit Designation" : "Add New Designation"}
// //           </Typography>

// //           <FormControl fullWidth margin="normal" required>
// //             <InputLabel id="department-select-label">Department</InputLabel>
// //             <Select labelId="department-select-label" value={department} onChange={handleDepartmentChange} label="Department">
// //               <MenuItem value=""><em>Select Department</em></MenuItem>
// //               {departments.map((dept) => (
// //                 <MenuItem key={dept.dept_id} value={dept.dept_id}>
// //                   {dept.dept_name}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <TextField fullWidth required label="Designation Name" value={designationName} onChange={handleDesignationNameChange} variant="outlined" margin="normal"/>
// //           <TextField fullWidth required label="Designation Code" value={code} onChange={handleCodeChange} variant="outlined" margin="normal"/>
// //           <TextField fullWidth required label="Description" value={description} onChange={handleDescriptionChange} variant="outlined" margin="normal" multiline rows={3}/>

// //           <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
// //              <Button variant="outlined" onClick={resetFormAndCloseModal}>Cancel</Button>
// //             <Button variant="contained" color="primary" onClick={editingDesignation ? handleSaveEdit : handleAddDesignation}>
// //               {editingDesignation ? "Save Changes" : "Add Designation"}
// //             </Button>
// //           </Stack>
// //         </Box>
// //       </Modal>
// //     </Container>
// //   );
// // }   ////// 





// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Modal,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// export default function Designation() {
//   // State for form fields
//   const [department, setDepartment] = useState("");
//   const [designationName, setDesignationName] = useState("");
//   const [code, setCode] = useState("");
//   const [description, setDescription] = useState("");

//   // State for component logic
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [designations, setDesignations] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [editingDesignation, setEditingDesignation] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   // --- NEW: State for pagination ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     Promise.all([fetchDesignations(), fetchDepartments()]).finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("api/desig_dept_dropdown/");
//       setDepartments(response.data.dept_data || []);
//     } catch (error) {
//       console.error("Error fetching departments:", error.response || error.message);
//     }
//   };

//   const getDepartmentName = (id) => {
//     const dept = departments.find((d) => d.dept_id === id);
//     return dept ? dept.dept_name : "Unknown";
//   };

//   const fetchDesignations = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("ci_designations/");
//       const mappedData = response.data.map((item) => ({
//         id: item.designation_id,
//         departmentId: item.department_id,
//         code: item.designation_code,
//         designation: item.designation_name,
//         description: item.description,
//       }));
//       setDesignations(mappedData);
//     } catch (error) {
//       console.error("Error fetching designations:", error.response || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handlers
//   const handleDepartmentChange = (event) => setDepartment(event.target.value);
//   const handleCodeChange = (event) => setCode(event.target.value);
//   const handleDesignationNameChange = (event) => setDesignationName(event.target.value);
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//     setPage(0); // --- UPDATED: Reset to first page on search ---
//   };
//   const handleDescriptionChange = (event) => setDescription(event.target.value);

//   // --- NEW: Handler for changing rows per page ---
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // CRUD operations remain the same
//   const handleAddDesignation = async () => {
//     if (department && designationName && code && description) {
//       try {
//         await axiosInstance.post("ci_designations/", {
//           company_id: 2,
//           department_id: department,
//           designation_code: code,
//           designation_name: designationName,
//           description,
//           created_at: new Date().toISOString().split('T')[0],
//         });
//         await fetchDesignations();
//         resetFormAndCloseModal();
//       } catch (error) {
//         console.error("Error adding designation:", error.response || error.message);
//         alert(`Error: ${error.response?.data?.detail || 'Failed to add designation'}`);
//       }
//     } else {
//       alert("Please fill out all required fields.");
//     }
//   };

//   const handleEditDesignation = (designation) => {
//     setEditingDesignation(designation);
//     setDepartment(designation.departmentId);
//     setCode(designation.code || "");
//     setDesignationName(designation.designation || "");
//     setDescription(designation.description || "");
//     setOpenModal(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!editingDesignation) return;
//     if (department && designationName && code && description) {
//       try {
//         await axiosInstance.patch(`ci_designations/${editingDesignation.id}/`, {
//           company_id: 2,
//           department_id: department,
//           designation_code: code,
//           designation_name: designationName,
//           description,
//         });
//         await fetchDesignations();
//         resetFormAndCloseModal();
//       } catch (error) {
//         console.error("Error updating designation:", error.response || error.message);
//         alert(`Error: ${error.response?.data?.detail || 'Failed to update designation'}`);
//       }
//     } else {
//       alert("Please fill out all required fields.");
//     }
//   };

//   const handleDeleteDesignation = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this designation?")) return;
//     try {
//       await axiosInstance.delete(`ci_designations/${id}/`);
//       await fetchDesignations();
//     } catch (error) {
//       console.error("Error deleting designation:", error);
//       alert(`Error: ${error.response?.data?.detail || 'Failed to delete designation'}`);
//     }
//   };

//   const resetFormAndCloseModal = () => {
//     setDepartment("");
//     setDesignationName("");
//     setDescription("");
//     setCode("");
//     setEditingDesignation(null);
//     setOpenModal(false);
//   };

//   const filteredDesignations = designations.filter(
//     (d) =>
//       (d.designation && d.designation.toLowerCase().includes(searchTerm)) ||
//       (getDepartmentName(d.departmentId) && getDepartmentName(d.departmentId).toLowerCase().includes(searchTerm)) ||
//       (d.code && d.code.toLowerCase().includes(searchTerm))
//   );

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   // --- NEW: Calculations for pagination ---
//   const paginatedData = filteredDesignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredDesignations.length / rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
//           Designation Management
//         </Typography>

//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
//           <TextField
//             variant="outlined"
//             fullWidth
//             placeholder="Search by Designation, Department, or Code"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} /> }}
//             sx={{ flexGrow: 1 }}
//           />
//           <Button
//             variant="contained"
//             sx={purpleButtonStyle}
//             startIcon={<AddIcon />}
//             onClick={() => {
//               setEditingDesignation(null);
//               setOpenModal(true);
//             }}
//           >
//             Add New Designation
//           </Button>
//         </Stack>

//         {/* --- NEW: Rows per page dropdown --- */}
//         <Box sx={{ mb: 2 }}>
//           <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', width: '80px' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Department</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Code</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Designation</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center' }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center"><CircularProgress /></TableCell>
//                 </TableRow>
//                 // --- UPDATED: Map over paginatedData ---
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((designation, index) => (
//                   <TableRow key={designation.id} hover>
//                     {/* --- UPDATED: SR. NO. calculation --- */}
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{getDepartmentName(designation.departmentId)}</TableCell>
//                     <TableCell>{designation.code}</TableCell>
//                     <TableCell>{designation.designation}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}>
//                       <IconButton sx={{ color: '#673ab7' }} onClick={() => handleEditDesignation(designation)} size="small">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDeleteDesignation(designation.id)} size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No designations found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* --- NEW: Pagination controls --- */}
//       {filteredDesignations.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={() => setPage(p => p - 1)}
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
//             onClick={() => setPage(p => p + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle}
//           >
//             Next
//           </Button>
//         </Box>
//       )}

//       {/* Modal remains the same */}
//       <Modal open={openModal} onClose={resetFormAndCloseModal}>
//         <Box
//           sx={{
//             position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
//             width: { xs: '90%', sm: 450 }, bgcolor: "background.paper", p: 3, borderRadius: 2, boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
//             {editingDesignation ? "Edit Designation" : "Add New Designation"}
//           </Typography>

//           <FormControl fullWidth margin="normal" required>
//             <InputLabel id="department-select-label">Department</InputLabel>
//             <Select labelId="department-select-label" value={department} onChange={handleDepartmentChange} label="Department">
//               <MenuItem value=""><em>Select Department</em></MenuItem>
//               {departments.map((dept) => (
//                 <MenuItem key={dept.dept_id} value={dept.dept_id}>
//                   {dept.dept_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField fullWidth required label="Designation Name" value={designationName} onChange={handleDesignationNameChange} variant="outlined" margin="normal" />
//           <TextField fullWidth required label="Designation Code" value={code} onChange={handleCodeChange} variant="outlined" margin="normal" />
//           <TextField fullWidth required label="Description" value={description} onChange={handleDescriptionChange} variant="outlined" margin="normal" multiline rows={3} />

//           <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
//             <Button variant="outlined" onClick={resetFormAndCloseModal}>Cancel</Button>
//             <Button variant="contained" sx={purpleButtonStyle} onClick={editingDesignation ? handleSaveEdit : handleAddDesignation}>
//               {editingDesignation ? "Save Changes" : "Add Designation"}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//     </Container>
//   );
// }








// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Modal,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// export default function Designation() {
//   // State for form fields
//   const [department, setDepartment] = useState("");
//   const [designationName, setDesignationName] = useState("");
//   const [code, setCode] = useState("");
//   const [description, setDescription] = useState("");

//   // State for component logic
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [designations, setDesignations] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [editingDesignation, setEditingDesignation] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   // --- NEW: State for pagination ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     Promise.all([fetchDesignations(), fetchDepartments()]).finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("api/desig_dept_dropdown/");
//       setDepartments(response.data.dept_data || []);
//     } catch (error) {
//       console.error(
//         "Error fetching departments:",
//         error.response || error.message
//       );
//     }
//   };

//   const getDepartmentName = (id) => {
//     const dept = departments.find((d) => d.dept_id === id);
//     return dept ? dept.dept_name : "Unknown";
//   };

//   const fetchDesignations = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("ci_designations/");
//       const mappedData = response.data.map((item) => ({
//         id: item.designation_id,
//         departmentId: item.department_id,
//         code: item.designation_code,
//         designation: item.designation_name,
//         description: item.description,
//       }));
//       setDesignations(mappedData);
//     } catch (error) {
//       console.error(
//         "Error fetching designations:",
//         error.response || error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handlers
//   const handleDepartmentChange = (event) => setDepartment(event.target.value);
//   const handleCodeChange = (event) => setCode(event.target.value);
//   const handleDesignationNameChange = (event) =>
//     setDesignationName(event.target.value);
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//     setPage(0); // --- UPDATED: Reset to first page on search ---
//   };
//   const handleDescriptionChange = (event) => setDescription(event.target.value);

//   // --- NEW: Handler for changing rows per page ---
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // CRUD operations remain the same
//   const handleAddDesignation = async () => {
//     if (department && designationName && code && description) {
//       try {
//         await axiosInstance.post("ci_designations/", {
//           company_id: 2,
//           department_id: department,
//           designation_code: code,
//           designation_name: designationName,
//           description,
//           created_at: new Date().toISOString().split("T")[0],
//         });
//         await fetchDesignations();
//         resetFormAndCloseModal();
//       } catch (error) {
//         console.error(
//           "Error adding designation:",
//           error.response || error.message
//         );
//         alert(
//           `Error: ${
//             error.response?.data?.detail || "Failed to add designation"
//           }`
//         );
//       }
//     } else {
//       alert("Please fill out all required fields.");
//     }
//   };

//   const handleEditDesignation = (designation) => {
//     setEditingDesignation(designation);
//     setDepartment(designation.departmentId);
//     setCode(designation.code || "");
//     setDesignationName(designation.designation || "");
//     setDescription(designation.description || "");
//     setOpenModal(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!editingDesignation) return;
//     if (department && designationName && code && description) {
//       try {
//         await axiosInstance.patch(`ci_designations/${editingDesignation.id}/`, {
//           company_id: 2,
//           department_id: department,
//           designation_code: code,
//           designation_name: designationName,
//           description,
//         });
//         await fetchDesignations();
//         resetFormAndCloseModal();
//       } catch (error) {
//         console.error(
//           "Error updating designation:",
//           error.response || error.message
//         );
//         alert(
//           `Error: ${
//             error.response?.data?.detail || "Failed to update designation"
//           }`
//         );
//       }
//     } else {
//       alert("Please fill out all required fields.");
//     }
//   };

//   const handleDeleteDesignation = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this designation?"))
//       return;
//     try {
//       await axiosInstance.delete(`ci_designations/${id}/`);
//       await fetchDesignations();
//     } catch (error) {
//       console.error("Error deleting designation:", error);
//       alert(
//         `Error: ${
//           error.response?.data?.detail || "Failed to delete designation"
//         }`
//       );
//     }
//   };

//   const resetFormAndCloseModal = () => {
//     setDepartment("");
//     setDesignationName("");
//     setDescription("");
//     setCode("");
//     setEditingDesignation(null);
//     setOpenModal(false);
//   };

//   const filteredDesignations = designations.filter(
//     (d) =>
//       (d.designation && d.designation.toLowerCase().includes(searchTerm)) ||
//       (getDepartmentName(d.departmentId) &&
//         getDepartmentName(d.departmentId).toLowerCase().includes(searchTerm)) ||
//       (d.code && d.code.toLowerCase().includes(searchTerm))
//   );

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   // --- NEW: Calculations for pagination ---
//   const paginatedData = filteredDesignations.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredDesignations.length / rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         <Typography
//           variant="h5"
//           gutterBottom
//           sx={{ fontWeight: "bold", mb: 2 }}
//         >
//           Designation Management
//         </Typography>

//         <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
//           <TextField
//             variant="outlined"
//             fullWidth
//             placeholder="Search by Designation, Department, or Code"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             InputProps={{
//               startAdornment: (
//                 <SearchIcon sx={{ mr: 1, color: "action.active" }} />
//               ),
//             }}
//             sx={{ flexGrow: 1 }}
//           />
//           <Button
//             variant="contained"
//             sx={purpleButtonStyle}
//             startIcon={<AddIcon />}
//             onClick={() => {
//               setEditingDesignation(null);
//               setOpenModal(true);
//             }}
//           >
//             Add New Designation
//           </Button>
//         </Stack>

//         {/* --- NEW: Rows per page dropdown --- */}
//         <Box sx={{ mb: 2 }}>
//           <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               label="Rows"
//               onChange={handleRowsPerPageChange}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#e3f2fd",
//                     width: "80px",
//                   }}
//                 >
//                   SR. NO.
//                 </TableCell>
//                 <TableCell
//                   sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}
//                 >
//                   Department
//                 </TableCell>
//                 <TableCell
//                   sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}
//                 >
//                   Code
//                 </TableCell>
//                 <TableCell
//                   sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}
//                 >
//                   Designation
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#e3f2fd",
//                     textAlign: "center",
//                   }}
//                 >
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : // --- UPDATED: Map over paginatedData ---
//               paginatedData.length > 0 ? (
//                 paginatedData.map((designation, index) => (
//                   <TableRow key={designation.id} hover>
//                     {/* --- UPDATED: SR. NO. calculation --- */}
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>
//                       {getDepartmentName(designation.departmentId)}
//                     </TableCell>
//                     <TableCell>{designation.code}</TableCell>
//                     <TableCell>{designation.designation}</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       <IconButton
//                         sx={{ color: "#673ab7" }}
//                         onClick={() => handleEditDesignation(designation)}
//                         size="small"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDesignation(designation.id)}
//                         size="small"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No designations found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* --- NEW: Pagination controls --- */}
//       {filteredDesignations.length > 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             p: 2,
//             gap: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={() => setPage((p) => p - 1)}
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
//             onClick={() => setPage((p) => p + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle}
//           >
//             Next
//           </Button>
//         </Box>
//       )}

//       {/* Modal remains the same */}
//       <Modal open={openModal} onClose={resetFormAndCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 450 },
//             bgcolor: "background.paper",
//             p: 3,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ fontWeight: "bold", mb: 2 }}
//           >
//             {editingDesignation ? "Edit Designation" : "Add New Designation"}
//           </Typography>

//           <FormControl fullWidth margin="normal" required>
//             <InputLabel id="department-select-label">Department</InputLabel>
//             <Select
//               labelId="department-select-label"
//               value={department}
//               onChange={handleDepartmentChange}
//               label="Department"
//             >
//               <MenuItem value="">
//                 <em>Select Department</em>
//               </MenuItem>
//               {departments.map((dept) => (
//                 <MenuItem key={dept.dept_id} value={dept.dept_id}>
//                   {dept.dept_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             required
//             label="Designation Name"
//             value={designationName}
//             onChange={handleDesignationNameChange}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             required
//             label="Designation Code"
//             value={code}
//             onChange={handleCodeChange}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             required
//             label="Description"
//             value={description}
//             onChange={handleDescriptionChange}
//             variant="outlined"
//             margin="normal"
//             multiline
//             rows={3}
//           />

//           <Stack
//             direction="row"
//             spacing={2}
//             justifyContent="flex-end"
//             sx={{ mt: 3 }}
//           >
//             <Button variant="outlined" onClick={resetFormAndCloseModal}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               sx={purpleButtonStyle}
//               onClick={
//                 editingDesignation ? handleSaveEdit : handleAddDesignation
//               }
//             >
//               {editingDesignation ? "Save Changes" : "Add Designation"}
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>
//     </Container>
//   );
// }









// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Stack,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
//   TablePagination,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import Swal from "sweetalert2";

// export default function Designation() {
//   const THEME_PRIMARY = "#8C257C";
//   const THEME_PRIMARY_DARK = "#6d1d60";
//   const THEME_SECONDARY = "#F58E35";

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [department, setDepartment] = useState("");
//   const [designationName, setDesignationName] = useState("");
//   const [code, setCode] = useState("");
//   const [description, setDescription] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [designations, setDesignations] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [editingDesignation, setEditingDesignation] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     Promise.all([fetchDesignations(), fetchDepartments()]).finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("api/desig_dept_dropdown/");
//       setDepartments(response.data.dept_data || []);
//     } catch (error) {
//       console.error("Error fetching departments:", error.response || error.message);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to fetch departments",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const getDepartmentName = (id) => {
//     const dept = departments.find((d) => d.dept_id === id);
//     return dept ? dept.dept_name : "Unknown";
//   };

//   const fetchDesignations = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("ci_designations/");
//       const mappedData = response.data.map((item) => ({
//         id: item.designation_id,
//         departmentId: item.department_id,
//         code: item.designation_code,
//         designation: item.designation_name,
//         description: item.description,
//       }));
//       setDesignations(mappedData);
//     } catch (error) {
//       console.error("Error fetching designations:", error.response || error.message);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to fetch designations",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDepartmentChange = (event) => setDepartment(event.target.value);
//   const handleCodeChange = (event) => setCode(event.target.value);
//   const handleDesignationNameChange = (event) => setDesignationName(event.target.value);
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//     setPage(0);
//   };
//   const handleDescriptionChange = (event) => setDescription(event.target.value);

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddDesignation = async () => {
//     if (department && designationName && code && description) {
//       setSubmitting(true);
//       try {
//         await axiosInstance.post("ci_designations/", {
//           company_id: 2,
//           department_id: department,
//           designation_code: code,
//           designation_name: designationName,
//           description,
//           created_at: new Date().toISOString().split("T")[0],
//         });
//         await fetchDesignations();
//         resetFormAndCloseDialog();
//         Swal.fire({ icon: "success", title: "Added", text: "Designation added", timer: 3000, showConfirmButton: false });
//       } catch (error) {
//         console.error("Error adding designation:", error.response || error.message);
//         Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.detail || "Failed to add designation", timer: 3000, showConfirmButton: false });
//       } finally {
//         setSubmitting(false);
//       }
//     } else {
//       Swal.fire({ icon: "info", title: "Required", text: "Please fill out all required fields.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleEditDesignation = (designation) => {
//     setEditingDesignation(designation);
//     setDepartment(designation.departmentId);
//     setCode(designation.code || "");
//     setDesignationName(designation.designation || "");
//     setDescription(designation.description || "");
//     setOpenDialog(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!editingDesignation) return;
//     if (department && designationName && code && description) {
//       setSubmitting(true);
//       try {
//         await axiosInstance.patch(`ci_designations/${editingDesignation.id}/`, {
//           company_id: 2,
//           department_id: department,
//           designation_code: code,
//           designation_name: designationName,
//           description,
//         });
//         await fetchDesignations();
//         resetFormAndCloseDialog();
//         Swal.fire({ icon: "success", title: "Updated", text: "Designation updated", timer: 3000, showConfirmButton: false });
//       } catch (error) {
//         console.error("Error updating designation:", error.response || error.message);
//         Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.detail || "Failed to update designation", timer: 3000, showConfirmButton: false });
//       } finally {
//         setSubmitting(false);
//       }
//     } else {
//       Swal.fire({ icon: "info", title: "Required", text: "Please fill out all required fields.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleDeleteDesignation = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will delete the designation.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: THEME_PRIMARY,
//       cancelButtonColor: "#757575",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosInstance.delete(`ci_designations/${id}/`);
//         await fetchDesignations();
//         Swal.fire({ icon: "success", title: "Deleted", text: "Designation deleted", timer: 3000, showConfirmButton: false });
//       } catch (error) {
//         console.error("Error deleting designation:", error);
//         Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.detail || "Failed to delete designation", timer: 3000, showConfirmButton: false });
//       }
//     }
//   };

//   const resetFormAndCloseDialog = () => {
//     setDepartment("");
//     setDesignationName("");
//     setDescription("");
//     setCode("");
//     setEditingDesignation(null);
//     setOpenDialog(false);
//   };

//   const filteredDesignations = designations.filter(
//     (d) =>
//       (d.designation && d.designation.toLowerCase().includes(searchTerm)) ||
//       (getDepartmentName(d.departmentId) && getDepartmentName(d.departmentId).toLowerCase().includes(searchTerm)) ||
//       (d.code && d.code.toLowerCase().includes(searchTerm))
//   );

//   const paginatedData = filteredDesignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const startItem = filteredDesignations.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endItem = Math.min((page + 1) * rowsPerPage, filteredDesignations.length);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: THEME_PRIMARY, fontWeight: "bold", mb: 5
          
//          }}>
//           Designation 
//         </Typography>

//         <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
//           <Box display="flex" gap={2} alignItems="center">
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => { setEditingDesignation(null); setOpenDialog(true); }}
//               sx={{ backgroundColor: THEME_PRIMARY, color: "#fff", "&:hover": { backgroundColor: THEME_PRIMARY_DARK } }}
//             >
//               Add New
//             </Button>
//           </Box>

//           <TextField
//             size="small"
//             placeholder="Search by Designation, Department, or Code"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             sx={{ width: isMobile ? "100%" : 360 }}
//             InputProps={{
//               startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
//             }}
//           />
//         </Stack>

//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }} stickyHeader>
//           <TableHead>
//   <TableRow>
//     {['SR. NO.', 'Department', 'Code', 'Designation', 'Actions'].map((header) => (
//       <TableCell
//         key={header}
//         sx={{
//           backgroundColor: '#8C257C',
//           color: '#FFFFFF',
//           fontWeight: 'bold',
//           textTransform: 'uppercase',
//           textAlign: header === 'Actions' ? 'center' : 'left',
//         }}
//       >
//         {header}
//       </TableCell>
//     ))}
//   </TableRow>
// </TableHead>

//             <TableBody>
//               {loading ? (
//                 Array.from({ length: rowsPerPage }).map((_, idx) => (
//                   <TableRow key={idx} hover>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <Skeleton variant="rectangular" width={120} height={30} />
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((designation, index) => (
//                   <TableRow key={designation.id} hover sx={{ fontSize: "0.95rem" }}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{getDepartmentName(designation.departmentId)}</TableCell>
//                     <TableCell>{designation.code}</TableCell>
//                     <TableCell>{designation.designation}</TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton sx={{ color: THEME_PRIMARY }} size="small" onClick={() => handleEditDesignation(designation)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton sx={{ color: "#d32f2f" }} size="small" onClick={() => handleDeleteDesignation(designation.id)}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">No designations found.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box display={isMobile ? "block" : "flex"} justifyContent="space-between" alignItems="center" mt={2} gap={2}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {startItem} to {endItem} of {filteredDesignations.length} results
//           </Typography>

//           <TablePagination
//             component="div"
//             count={filteredDesignations.length}
//             page={page}
//             onPageChange={(_, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleRowsPerPageChange}
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             labelRowsPerPage="Rows"
//             sx={{ 
//               ":.MuiTablePagination-toolbar": { justifyContent: isMobile ? "center" : "flex-end" },
              
//             }}
//           />
//         </Box>

//         <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={resetFormAndCloseDialog}>
//           <DialogTitle sx={{ color: THEME_PRIMARY, fontWeight: "bold" }}>{editingDesignation ? "Edit Designation" : "Add New Designation"}</DialogTitle>
//           <DialogContent>
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel id="department-select-label">Department</InputLabel>
//               <Select labelId="department-select-label" value={department} onChange={handleDepartmentChange} label="Department">
//                 <MenuItem value=""><em>Select Department</em></MenuItem>
//                 {departments.map((dept) => (
//                   <MenuItem key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <TextField fullWidth required label="Designation Name" value={designationName} onChange={handleDesignationNameChange} variant="outlined" margin="normal" />
//             <TextField fullWidth required label="Designation Code" value={code} onChange={handleCodeChange} variant="outlined" margin="normal" />
//             <TextField fullWidth required label="Description" value={description} onChange={handleDescriptionChange} variant="outlined" margin="normal" multiline rows={3} />

//             <Box mt={1}>
//               <input type="file" accept=".pdf" />
//             </Box>
//           </DialogContent>
//           <DialogActions sx={{ px: 3, pb: 2 }}>
//             <Button sx={{ backgroundColor: "#757575", color: "#fff", "&:hover": { backgroundColor: "#bdbdbd" } }} onClick={resetFormAndCloseDialog}>
//               Cancel
//             </Button>
//             <Button sx={{ backgroundColor: THEME_PRIMARY, color: "#fff", "&:hover": { backgroundColor: THEME_PRIMARY_DARK } }} onClick={editingDesignation ? handleSaveEdit : handleAddDesignation}>
//               {submitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : editingDesignation ? "Save" : "Save"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Container>
//   );
// }




import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Skeleton,
  TablePagination,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

export default function Designation() {
  const THEME_PRIMARY = "#8C257C";
  const THEME_PRIMARY_DARK = "#6d1d60";
  // const THEME_SECONDARY = "#F58E35"; // Unused

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [department, setDepartment] = useState("");
  const [designationName, setDesignationName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editingDesignation, setEditingDesignation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    Promise.all([fetchDesignations(), fetchDepartments()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get("api/desig_dept_dropdown/");
      setDepartments(response.data.dept_data || []);
    } catch (error) {
      console.error("Error fetching departments:", error.response || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch departments",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const getDepartmentName = (id) => {
    const dept = departments.find((d) => d.dept_id === id);
    return dept ? dept.dept_name : "Unknown";
  };

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("ci_designations/");
      const mappedData = response.data.map((item) => ({
        id: item.designation_id,
        departmentId: item.department_id,
        code: item.designation_code,
        designation: item.designation_name,
        description: item.description,
      }));
      
      // FIX: Sort by ID descending to show recent added entries on top
      mappedData.sort((a, b) => b.id - a.id);
      
      setDesignations(mappedData);
    } catch (error) {
      console.error("Error fetching designations:", error.response || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch designations",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentChange = (event) => setDepartment(event.target.value);
  const handleCodeChange = (event) => setCode(event.target.value);
  const handleDesignationNameChange = (event) => setDesignationName(event.target.value);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(0);
  };
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddDesignation = async () => {
    // FIX: Alert logic for missing fields
    if (department && designationName && code && description) {
      setSubmitting(true);
      try {
        await axiosInstance.post("ci_designations/", {
          company_id: 2,
          department_id: department,
          designation_code: code,
          designation_name: designationName,
          description,
          created_at: new Date().toISOString().split("T")[0],
        });
        await fetchDesignations();
        resetFormAndCloseDialog();
        Swal.fire({ icon: "success", title: "Added", text: "Designation added", timer: 3000, showConfirmButton: false });
      } catch (error) {
        console.error("Error adding designation:", error.response || error.message);
        Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.detail || "Failed to add designation", timer: 3000, showConfirmButton: false });
      } finally {
        setSubmitting(false);
      }
    } else {
      // Alert appears in front if fields are missing
      Swal.fire({ icon: "warning", title: "Missing Fields", text: "Please fill out all required fields.", confirmButtonColor: THEME_PRIMARY });
    }
  };

  const handleEditDesignation = (designation) => {
    setEditingDesignation(designation);
    setDepartment(designation.departmentId);
    setCode(designation.code || "");
    setDesignationName(designation.designation || "");
    setDescription(designation.description || "");
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!editingDesignation) return;
    if (department && designationName && code && description) {
      setSubmitting(true);
      try {
        await axiosInstance.patch(`ci_designations/${editingDesignation.id}/`, {
          company_id: 2,
          department_id: department,
          designation_code: code,
          designation_name: designationName,
          description,
        });
        await fetchDesignations();
        resetFormAndCloseDialog();
        Swal.fire({ icon: "success", title: "Updated", text: "Designation updated", timer: 3000, showConfirmButton: false });
      } catch (error) {
        console.error("Error updating designation:", error.response || error.message);
        Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.detail || "Failed to update designation", timer: 3000, showConfirmButton: false });
      } finally {
        setSubmitting(false);
      }
    } else {
       // Alert appears in front if fields are missing
       Swal.fire({ icon: "warning", title: "Missing Fields", text: "Please fill out all required fields.", confirmButtonColor: THEME_PRIMARY });
    }
  };

  const handleDeleteDesignation = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the designation.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: THEME_PRIMARY,
      cancelButtonColor: "#757575",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`ci_designations/${id}/`);
        await fetchDesignations();
        Swal.fire({ icon: "success", title: "Deleted", text: "Designation deleted", timer: 3000, showConfirmButton: false });
      } catch (error) {
        console.error("Error deleting designation:", error);
        Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.detail || "Failed to delete designation", timer: 3000, showConfirmButton: false });
      }
    }
  };

  const resetFormAndCloseDialog = () => {
    setDepartment("");
    setDesignationName("");
    setDescription("");
    setCode("");
    setEditingDesignation(null);
    setOpenDialog(false);
  };

  const filteredDesignations = designations.filter(
    (d) =>
      (d.designation && d.designation.toLowerCase().includes(searchTerm)) ||
      (getDepartmentName(d.departmentId) && getDepartmentName(d.departmentId).toLowerCase().includes(searchTerm)) ||
      (d.code && d.code.toLowerCase().includes(searchTerm))
  );

  const paginatedData = filteredDesignations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const startItem = filteredDesignations.length === 0 ? 0 : page * rowsPerPage + 1;
  const endItem = Math.min((page + 1) * rowsPerPage, filteredDesignations.length);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: THEME_PRIMARY, fontWeight: "bold", mb: 5 }}>
          Designation
        </Typography>

        <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" gap={2} alignItems="center">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => { setEditingDesignation(null); setOpenDialog(true); }}
              sx={{ backgroundColor: THEME_PRIMARY, color: "#fff", "&:hover": { backgroundColor: THEME_PRIMARY_DARK } }}
            >
              Add New
            </Button>
          </Box>

          <TextField
            size="small"
            placeholder="Search by Designation, Department, or Code"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: isMobile ? "100%" : 360 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
            }}
          />
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }} stickyHeader>
            <TableHead>
              <TableRow>
                {['SR. NO.', 'Department', 'Code', 'Designation', 'Actions'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: '#8C257C',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      textAlign: header === 'Actions' ? 'center' : 'left',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <Skeleton variant="rectangular" width={120} height={30} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((designation, index) => (
                  <TableRow key={designation.id} hover sx={{ fontSize: "0.95rem" }}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{getDepartmentName(designation.departmentId)}</TableCell>
                    <TableCell>{designation.code}</TableCell>
                    <TableCell>{designation.designation}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <IconButton sx={{ color: THEME_PRIMARY }} size="small" onClick={() => handleEditDesignation(designation)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton sx={{ color: "#d32f2f" }} size="small" onClick={() => handleDeleteDesignation(designation.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No designations found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display={isMobile ? "block" : "flex"} justifyContent="space-between" alignItems="center" mt={2} gap={2}>
          <Typography variant="body2" color="text.secondary">
            Showing {startItem} to {endItem} of {filteredDesignations.length} results
          </Typography>

          <TablePagination
            component="div"
            count={filteredDesignations.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 15, 25]}
            labelRowsPerPage="Rows"
            sx={{
              ":.MuiTablePagination-toolbar": { justifyContent: isMobile ? "center" : "flex-end" },
            }}
          />
        </Box>

        <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={resetFormAndCloseDialog}>
          <DialogTitle sx={{ color: THEME_PRIMARY, fontWeight: "bold" }}>{editingDesignation ? "Edit Designation" : "Add New Designation"}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="department-select-label">Department</InputLabel>
              <Select labelId="department-select-label" value={department} onChange={handleDepartmentChange} label="Department">
                <MenuItem value=""><em>Select Department</em></MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth required label="Designation Name" value={designationName} onChange={handleDesignationNameChange} variant="outlined" margin="normal" />
            <TextField fullWidth required label="Designation Code" value={code} onChange={handleCodeChange} variant="outlined" margin="normal" />
            <TextField fullWidth required label="Description" value={description} onChange={handleDescriptionChange} variant="outlined" margin="normal" multiline rows={3} />
            
            {/* FIX: Upload option removed from here */}

          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button sx={{ backgroundColor: "#757575", color: "#fff", "&:hover": { backgroundColor: "#bdbdbd" } }} onClick={resetFormAndCloseDialog}>
              Cancel
            </Button>
            <Button sx={{ backgroundColor: THEME_PRIMARY, color: "#fff", "&:hover": { backgroundColor: THEME_PRIMARY_DARK } }} onClick={editingDesignation ? handleSaveEdit : handleAddDesignation}>
              {submitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}