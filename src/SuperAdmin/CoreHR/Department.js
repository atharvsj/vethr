// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Grid,
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
// // } from "@mui/material";
// // import { Search, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// // export default function Department() {
// //   const [departments, setDepartments] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [open, setOpen] = useState(false);
// //   const [editOpen, setEditOpen] = useState(false);
// //   const [newDepartment, setNewDepartment] = useState({
// //     name: "",
// //     head: "",
// //     createdDate: "",
// //   });
// //   const [editDepartment, setEditDepartment] = useState(null);

// //   // 🔁 Fetch all departments
// //   const fetchDepartments = async () => {
// //     try {
// //       const response = await axios.get("https://tdtlworld.com/hrms-backend/departments/");
// //       const formattedData = response.data.map((dept) => ({
// //         id: dept.department_id,
// //         name: dept.department_name,
// //         head: dept.department_head,
// //         createdDate: dept.created_at,
// //       }));
// //       setDepartments(formattedData);
// //     } catch (error) {
// //       console.error("Error fetching departments:", error);
// //     }
// //   };


// //   useEffect(() => {
// //     fetchDepartments();
// //   }, []);

// //   const handleSearch = (event) => {
// //     setSearchTerm(event.target.value);
// //   };

// //   const filteredDepartments = departments.filter((department) =>
// //     department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
// //   );


// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);
// //   const handleEditOpen = (department) => {
// //     setEditDepartment(department);
// //     setEditOpen(true);
// //   };
// //   const handleEditClose = () => setEditOpen(false);

// //   // ➕ Add new department
// //   const handleAddDepartment = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");

// //       const payload = {
// //         department_name: newDepartment.name.trim(),
// //         company_id: 2,
// //         department_head: parseInt(newDepartment.head),
// //         created_at: newDepartment.createdDate,
// //         added_by: 3,
// //       };

// //       console.log("Sending payload:", payload);

// //       await axios.post(
// //         "https://tdtlworld.com/hrms-backend/departments/",
// //         payload,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       // ✅ Refresh the list from the server after adding
// //       fetchDepartments();

// //       // Reset form
// //       setNewDepartment({ name: "", companyId: "", head: "", createdDate: "" });
// //       handleClose();
// //     } catch (error) {
// //       console.error("Error adding department:", error);
// //       alert(
// //         error.response?.data
// //           ? JSON.stringify(error.response.data, null, 2)
// //           : "Failed to add department"
// //       );
// //     }
// //   };



// //   // ✏️ Edit department
// //   const handleEditDepartment = async (id, updatedData) => {
// //     const token = localStorage.getItem("accessToken");

// //     if (!token) {
// //       console.error("No access token found. User may not be logged in.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.patch(
// //         `https://tdtlworld.com/hrms-backend/departments/${id}/`,
// //         updatedData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
// //       console.log("Department updated:", response.data);
// //     } catch (error) {
// //       console.error("Error updating department:", error);
// //     }
// //   };

// //   // ❌ Delete department
// //  const handleDeleteDepartment = async (id) => {
// //   try {
// //     const token = localStorage.getItem("accessToken");

// //     const response = await axios.delete(
// //       `https://tdtlworld.com/hrms-backend/departments/${id}/`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     // Optional: remove the deleted item from state
// //     setDepartments(departments.filter((dept) => dept.id !== id));
// //   } catch (error) {
// //     console.error("Error deleting department:", error);
// //     alert("Failed to delete department");
// //   }
// // };



// //   return (
// //     <Container maxWidth="lg">
// //       <Box mt={3} mb={2}>
// //         <Typography variant="h4">Department Management</Typography>
// //       </Box>

// //       <Grid container spacing={2}>
// //         <Grid item xs={12} sm={8}>
// //           <TextField
// //             variant="outlined"
// //             fullWidth
// //             placeholder="Search Department"
// //             value={searchTerm}
// //             onChange={handleSearch}
// //             InputProps={{
// //               startAdornment: <Search sx={{ mr: 1 }} />,
// //             }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
// //             Add New Department
// //           </Button>
// //         </Grid>
// //       </Grid>

// //       <Paper sx={{ mt: 3 }}>
// //         <TableContainer>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>Department Name</TableCell>
// //                 <TableCell>Head</TableCell>
// //                 <TableCell>Created Date</TableCell>
// //                 <TableCell>Actions</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {filteredDepartments.map((department) => (
// //                 <TableRow key={department.id}>
// //                   <TableCell>{department.name}</TableCell>
// //                   <TableCell>{department.head}</TableCell>
// //                   <TableCell>{department.createdDate}</TableCell>
// //                   <TableCell>
// //                     <IconButton color="primary" onClick={() => handleEditOpen(department)}>
// //                       <EditIcon />
// //                     </IconButton>
// //                     <IconButton color="error" onClick={() => handleDeleteDepartment(department.id)}>
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>

// //       {/* Add Department Modal */}
// //       <Modal open={open} onClose={handleClose}>
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             width: 400,
// //             bgcolor: "background.paper",
// //             border: "2px solid #000",
// //             boxShadow: 24,
// //             p: 4,
// //           }}
// //         >
// //           <Typography variant="h6" gutterBottom>
// //             Add New Department
// //           </Typography>
// //           <TextField
// //             fullWidth
// //             label="Department Name"
// //             value={newDepartment.name}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
// //             margin="normal"
// //           />
// //           <TextField
// //             fullWidth
// //             label="Department Head"
// //             value={newDepartment.head}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
// //             margin="normal"
// //           />
// //           <TextField
// //             fullWidth
// //             label="Created Date"
// //             type="date"
// //             value={newDepartment.createdDate}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, createdDate: e.target.value })}
// //             margin="normal"
// //             InputLabelProps={{ shrink: true }}
// //           />
// //           <Button variant="contained" color="primary" fullWidth onClick={handleAddDepartment} sx={{ mt: 2 }}>
// //             Add Department
// //           </Button>
// //         </Box>
// //       </Modal>

// //       {/* Edit Department Modal */}
// //       <Modal open={editOpen} onClose={handleEditClose}>
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             width: 400,
// //             bgcolor: "background.paper",
// //             border: "2px solid #000",
// //             boxShadow: 24,
// //             p: 4,
// //           }}
// //         >
// //           <Typography variant="h6" gutterBottom>
// //             Edit Department
// //           </Typography>
// //           <TextField
// //             fullWidth
// //             label="Department Name"
// //             value={editDepartment?.name || ""}
// //             onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
// //             margin="normal"
// //           />
// //           <TextField
// //             fullWidth
// //             label="Department Head"
// //             value={editDepartment?.head || ""}
// //             onChange={(e) => setEditDepartment({ ...editDepartment, head: e.target.value })}
// //             margin="normal"
// //           />
// //           <TextField
// //             fullWidth
// //             label="Created Date"
// //             type="date"
// //             value={editDepartment?.createdDate || ""}
// //             onChange={(e) => setEditDepartment({ ...editDepartment, createdDate: e.target.value })}
// //             margin="normal"
// //             InputLabelProps={{ shrink: true }}
// //           />
// //            <Button
// //   variant="contained"
// //   color="primary"
// //   fullWidth
// //   onClick={() =>
// //     handleEditDepartment(editDepartment.id, {
// //       department_name: editDepartment.name,
// //       company_id: 2,
// //       department_head: parseInt(editDepartment.head),
// //       added_by: 3,
// //       created_at: editDepartment.createdDate,
// //     }).then(() => {
// //       handleEditClose();
// //       fetchDepartments(); // Refresh the table after editing
// //     })
// //   }
// //   sx={{ mt: 2 }}
// // >

// //             Save Changes
// //           </Button>
// //         </Box>
// //       </Modal>
// //     </Container>
// //   );
// // }





// // import React, { useState, useEffect } from "react";
// // import axiosInstance from "../../utils/axiosInstance"; // Ensure this path is correct
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   // Grid, // Not explicitly used for layout in the top section
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
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   CircularProgress,
// //   Stack, // Used for button layout
// // } from "@mui/material";
// // import { Search, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

// // // Utility function for formatting date for display
// // const formatDisplayDate = (dateString) => {
// //   if (!dateString) return "N/A";
// //   try {
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return dateString; // Return original if invalid
// //     const day = date.getDate().toString().padStart(2, '0');
// //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
// //     const year = date.getFullYear();
// //     return `${day}/${month}/${year}`;
// //   } catch (error) {
// //     return dateString;
// //   }
// // };

// // export default function Department() {
// //   const [departments, setDepartments] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [open, setOpen] = useState(false);
// //   const [editOpen, setEditOpen] = useState(false);
// //   const [newDepartment, setNewDepartment] = useState({
// //     name: "",
// //     head: "", // Will store head ID
// //     createdDate: "",
// //   });
// //   const [editDepartment, setEditDepartment] = useState(null);

// //   // State for employees dropdown
// //   const [employeesDropdown, setEmployeesDropdown] = useState([]);
// //   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
// //   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

// //   // 🔁 Fetch all departments
// //   const fetchDepartments = async () => {
// //     try {
// //       // Use axiosInstance
// //       const response = await axiosInstance.get("/departments/"); 
// //       const formattedData = response.data.map((dept) => ({
// //         id: dept.department_id,
// //         name: dept.department_name,
// //         headId: dept.department_head, 
// //         headName: dept.department_head_name, 
// //         createdDate: dept.created_at,
// //       }));
// //       setDepartments(formattedData);
// //     } catch (error) {
// //       console.error("Error fetching departments:", error.response?.data || error.message);
// //     }
// //   };

// //   // 🔁 Fetch employees for dropdown
// //   const fetchEmployeesDropdown = async () => {
// //     setLoadingEmployeesDropdown(true);
// //     setEmployeesDropdownError(null);
// //     try {
// //       // Use axiosInstance
// //       const response = await axiosInstance.get("/employee-dropdown/"); 
// //       setEmployeesDropdown(response.data || []);
// //     } catch (error) {
// //       console.error("Error fetching employees dropdown:", error.response?.data || error.message);
// //       setEmployeesDropdownError("Failed to load employees.");
// //     } finally {
// //       setLoadingEmployeesDropdown(false);
// //     }
// //   };


// //   useEffect(() => {
// //     fetchDepartments();
// //     fetchEmployeesDropdown();
// //   }, []);

// //   const handleSearch = (event) => {
// //     setSearchTerm(event.target.value);
// //   };

// //   const filteredDepartments = departments.filter((department) =>
// //     department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
// //     department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase())
// //   );


// //   const handleOpen = () => {
// //     setNewDepartment({ name: "", head: "", createdDate: "" });
// //     setOpen(true);
// //   };
// //   const handleClose = () => setOpen(false);

// //   const handleEditOpen = (department) => {
// //     setEditDepartment({
// //         id: department.id,
// //         name: department.name,
// //         head: department.headId ? department.headId.toString() : "", 
// //         createdDate: department.createdDate ? department.createdDate.split('T')[0] : "" 
// //     });
// //     setEditOpen(true);
// //   };
// //   const handleEditClose = () => {
// //     setEditDepartment(null);
// //     setEditOpen(false);
// //   }

// //   // ➕ Add new department
// //   const handleAddDepartment = async () => {
// //     if (!newDepartment.name.trim() || !newDepartment.head || !newDepartment.createdDate) {
// //         alert("Please fill all fields: Name, Head, and Created Date.");
// //         return;
// //     }
// //     try {
// //       // Token might be handled by axiosInstance interceptor, but keeping it explicit if needed for specific calls
// //       const token = localStorage.getItem("accessToken"); 
// //       if (!token && !axiosInstance.defaults.headers.common['Authorization']) { // Check if interceptor already set it
// //         alert("Authentication error: No token found.");
// //         return;
// //       }

// //       const payload = {
// //         department_name: newDepartment.name.trim(),
// //         company_id: 2, 
// //         department_head: parseInt(newDepartment.head), 
// //         created_at: newDepartment.createdDate, 
// //         added_by: 3, 
// //       };

// //       // Use axiosInstance
// //       await axiosInstance.post(
// //         "/departments/", 
// //         payload
// //         // Headers might be handled by interceptor
// //         // { 
// //         //   headers: {
// //         //     Authorization: `Bearer ${token}`, // Redundant if interceptor handles it
// //         //     "Content-Type": "application/json",
// //         //   },
// //         // }
// //       );

// //       fetchDepartments();
// //       setNewDepartment({ name: "", head: "", createdDate: "" });
// //       handleClose();
// //       alert("Department added successfully!");
// //     } catch (error) {
// //       console.error("Error adding department:", error.response?.data || error.message);
// //       alert(
// //         error.response?.data
// //           ? JSON.stringify(error.response.data, null, 2)
// //           : "Failed to add department"
// //       );
// //     }
// //   };

// //   // ✏️ Edit department
// //   const handleEditDepartment = async () => {
// //     if (!editDepartment || !editDepartment.name.trim() || !editDepartment.head || !editDepartment.createdDate) {
// //         alert("Please fill all fields: Name, Head, and Created Date.");
// //         return;
// //     }
// //     // Token might be handled by axiosInstance interceptor
// //     const token = localStorage.getItem("accessToken"); 
// //     if (!token && !axiosInstance.defaults.headers.common['Authorization']) {
// //       console.error("No access token found.");
// //       alert("Authentication error: No token found.");
// //       return;
// //     }

// //     const updatedData = {
// //         department_name: editDepartment.name.trim(),
// //         company_id: 2, 
// //         department_head: parseInt(editDepartment.head), 
// //         added_by: 3, 
// //         created_at: editDepartment.createdDate, 
// //     };

// //     try {
// //       // Use axiosInstance
// //       await axiosInstance.patch(
// //         `/departments/${editDepartment.id}/`, 
// //         updatedData
// //         // Headers might be handled by interceptor
// //         // {
// //         //   headers: {
// //         //     Authorization: `Bearer ${token}`, // Redundant if interceptor handles it
// //         //     "Content-Type": "application/json",
// //         //   },
// //         // }
// //       );
// //       handleEditClose();
// //       fetchDepartments(); 
// //       alert("Department updated successfully!");
// //     } catch (error) {
// //       console.error("Error updating department:", error.response?.data || error.message);
// //       alert(
// //         error.response?.data
// //           ? JSON.stringify(error.response.data, null, 2)
// //           : "Failed to update department"
// //       );
// //     }
// //   };

// //   // ❌ Delete department
// //  const handleDeleteDepartment = async (id) => {
// //   if (!window.confirm("Are you sure you want to delete this department?")) return;
// //   try {
// //     // Token might be handled by axiosInstance interceptor
// //     const token = localStorage.getItem("accessToken"); 
// //     if (!token && !axiosInstance.defaults.headers.common['Authorization']) {
// //         alert("Authentication error: No token found.");
// //         return;
// //     }

// //     // Use axiosInstance
// //     await axiosInstance.delete(
// //       `/departments/${id}/`
// //     //   { // Headers might be handled by interceptor
// //     //     headers: {
// //     //       Authorization: `Bearer ${token}`, // Redundant if interceptor handles it
// //     //     },
// //     //   }
// //     );
// //     fetchDepartments(); 
// //     alert("Department deleted successfully!");
// //   } catch (error) {
// //     console.error("Error deleting department:", error.response?.data || error.message);
// //     alert(
// //         error.response?.data
// //           ? JSON.stringify(error.response.data, null, 2)
// //           : "Failed to delete department"
// //       );
// //   }
// // };

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 2}}>
// //       <Paper elevation={3} sx={{ p: 3 }}>
// //       <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
// //         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold'}}>Department Management</Typography>
// //         <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
// //             Add New Department
// //         </Button>
// //       </Box>

// //       <Box mb={3}>
// //           <TextField
// //             variant="outlined"
// //             fullWidth
// //             placeholder="Search Department by Name or Head"
// //             value={searchTerm}
// //             onChange={handleSearch}
// //             InputProps={{
// //               startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
// //             }}
// //           />
// //         </Box>

// //         <TableContainer>
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>Department Name</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>Head</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>Created Date</TableCell>
// //                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'grey.200', textAlign: 'center' }}>Actions</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {filteredDepartments.length > 0 ? filteredDepartments.map((department) => (
// //                 <TableRow key={department.id} hover>
// //                   <TableCell>{department.name}</TableCell>
// //                   <TableCell>{department.headName || 'N/A'}</TableCell>
// //                   <TableCell>{formatDisplayDate(department.createdDate)}</TableCell>
// //                   <TableCell sx={{ textAlign: 'center' }}>
// //                     <IconButton color="primary" onClick={() => handleEditOpen(department)} size="small">
// //                       <EditIcon />
// //                     </IconButton>
// //                     <IconButton color="error" onClick={() => handleDeleteDepartment(department.id)} size="small">
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               )) : (
// //                 <TableRow>
// //                     <TableCell colSpan={4} align="center">
// //                         No departments found.
// //                     </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>

// //       {/* Add Department Modal */}
// //       <Modal open={open} onClose={handleClose}>
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             width: { xs: '90%', sm: 450 },
// //             bgcolor: "background.paper",
// //             borderRadius: 2,
// //             boxShadow: 24,
// //             p: 3, // Reduced padding slightly
// //           }}
// //         >
// //           <Typography variant="h6" component="h2" gutterBottom sx={{fontWeight: 'bold', mb: 2}}>
// //             Add New Department
// //           </Typography>
// //           <TextField
// //             fullWidth
// //             label="Department Name"
// //             value={newDepartment.name}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
// //             margin="normal"
// //             required
// //           />
// //           <FormControl fullWidth margin="normal" required>
// //             <InputLabel id="department-head-label">Department Head</InputLabel>
// //             <Select
// //               labelId="department-head-label"
// //               label="Department Head"
// //               value={newDepartment.head}
// //               onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
// //               disabled={loadingEmployeesDropdown}
// //             >
// //               <MenuItem value="">
// //                 <em>{loadingEmployeesDropdown ? <CircularProgress size={20}/> : employeesDropdownError || "Select Head"}</em>
// //               </MenuItem>
// //               {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdown.map((emp) => (
// //                 <MenuItem key={emp.value} value={emp.value.toString()}>
// //                   {emp.label}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //           <TextField
// //             fullWidth
// //             label="Created Date"
// //             type="date"
// //             value={newDepartment.createdDate}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, createdDate: e.target.value })}
// //             margin="normal"
// //             InputLabelProps={{ shrink: true }}
// //             required
// //           />
// //           <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
// //             <Button variant="outlined" onClick={handleClose}>Cancel</Button>
// //             <Button variant="contained" color="primary" onClick={handleAddDepartment}>
// //                 Add Department
// //             </Button>
// //           </Stack>
// //         </Box>
// //       </Modal>

// //       {/* Edit Department Modal */}
// //       {editDepartment && (
// //         <Modal open={editOpen} onClose={handleEditClose}>
// //             <Box
// //             sx={{
// //                 position: "absolute",
// //                 top: "50%",
// //                 left: "50%",
// //                 transform: "translate(-50%, -50%)",
// //                 width: { xs: '90%', sm: 450 },
// //                 bgcolor: "background.paper",
// //                 borderRadius: 2,
// //                 boxShadow: 24,
// //                 p: 3, // Reduced padding slightly
// //             }}
// //             >
// //             <Typography variant="h6" component="h2" gutterBottom sx={{fontWeight: 'bold', mb: 2}}>
// //                 Edit Department
// //             </Typography>
// //             <TextField
// //                 fullWidth
// //                 label="Department Name"
// //                 value={editDepartment?.name || ""}
// //                 onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
// //                 margin="normal"
// //                 required
// //             />
// //             <FormControl fullWidth margin="normal" required>
// //                 <InputLabel id="edit-department-head-label">Department Head</InputLabel>
// //                 <Select
// //                 labelId="edit-department-head-label"
// //                 label="Department Head"
// //                 value={editDepartment?.head || ""}
// //                 onChange={(e) => setEditDepartment({ ...editDepartment, head: e.target.value })}
// //                 disabled={loadingEmployeesDropdown}
// //                 >
// //                 <MenuItem value="">
// //                     <em>{loadingEmployeesDropdown ? <CircularProgress size={20}/> : employeesDropdownError || "Select Head"}</em>
// //                 </MenuItem>
// //                 {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdown.map((emp) => (
// //                     <MenuItem key={emp.value} value={emp.value.toString()}>
// //                     {emp.label}
// //                     </MenuItem>
// //                 ))}
// //                 </Select>
// //             </FormControl>
// //             <TextField
// //                 fullWidth
// //                 label="Created Date"
// //                 type="date"
// //                 value={editDepartment?.createdDate || ""}
// //                 onChange={(e) => setEditDepartment({ ...editDepartment, createdDate: e.target.value })}
// //                 margin="normal"
// //                 InputLabelProps={{ shrink: true }}
// //                 required
// //             />
// //             <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
// //                 <Button variant="outlined" onClick={handleEditClose}>Cancel</Button>
// //                 <Button variant="contained" color="primary" onClick={handleEditDepartment}>
// //                     Save Changes
// //                 </Button>
// //             </Stack>
// //             </Box>
// //         </Modal>
// //       )}
// //     </Container>
// //   );
// // }



// // import { useState, useEffect } from "react"
// // import axiosInstance from "../../utils/axiosInstance" // Ensure this path is correct
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
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   CircularProgress,
// //   Stack,
// // } from "@mui/material"
// // import { Search, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material"

// // // Utility function for formatting date for display
// // const formatDisplayDate = (dateString) => {
// //   if (!dateString) return "N/A"
// //   try {
// //     const date = new Date(dateString)
// //     if (isNaN(date.getTime())) return dateString // Return original if invalid
// //     const day = date.getDate().toString().padStart(2, "0")
// //     const month = (date.getMonth() + 1).toString().padStart(2, "0") // Month is 0-indexed
// //     const year = date.getFullYear()
// //     return `${day}/${month}/${year}`
// //   } catch (error) {
// //     return dateString
// //   }
// // }

// // export default function Department() {
// //   const [departments, setDepartments] = useState([])
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [open, setOpen] = useState(false)
// //   const [editOpen, setEditOpen] = useState(false)
// //   const [newDepartment, setNewDepartment] = useState({
// //     name: "",
// //     code: "", // Added department code
// //     head: "", // Will store head ID
// //     createdDate: "",
// //   })
// //   const [editDepartment, setEditDepartment] = useState(null)

// //   // State for employees dropdown
// //   const [employeesDropdown, setEmployeesDropdown] = useState([])
// //   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true)
// //   const [employeesDropdownError, setEmployeesDropdownError] = useState(null)

// //   // 🔁 Fetch all departments
// //   const fetchDepartments = async () => {
// //     try {
// //       // Use axiosInstance
// //       const response = await axiosInstance.get("/departments/")
// //       const formattedData = response.data.map((dept) => ({
// //         id: dept.department_id,
// //         name: dept.department_name,
// //         code: dept.department_code, // Added department code
// //         headId: dept.department_head,
// //         headName: dept.department_head_name,
// //         createdDate: dept.created_at,
// //       }))
// //       setDepartments(formattedData)
// //     } catch (error) {
// //       console.error("Error fetching departments:", error.response?.data || error.message)
// //     }
// //   }

// //   // 🔁 Fetch employees for dropdown
// //   const fetchEmployeesDropdown = async () => {
// //     setLoadingEmployeesDropdown(true)
// //     setEmployeesDropdownError(null)
// //     try {
// //       // Use axiosInstance
// //       const response = await axiosInstance.get("/employee-dropdown/")
// //       setEmployeesDropdown(response.data || [])
// //     } catch (error) {
// //       console.error("Error fetching employees dropdown:", error.response?.data || error.message)
// //       setEmployeesDropdownError("Failed to load employees.")
// //     } finally {
// //       setLoadingEmployeesDropdown(false)
// //     }
// //   }

// //   useEffect(() => {
// //     fetchDepartments()
// //     fetchEmployeesDropdown()
// //   }, [])

// //   const handleSearch = (event) => {
// //     setSearchTerm(event.target.value)
// //   }

// //   const filteredDepartments = departments.filter(
// //     (department) =>
// //       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
// //       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
// //       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase()), // Added search by code
// //   )

// //   const handleOpen = () => {
// //     setNewDepartment({ name: "", code: "", head: "", createdDate: "" }) // Added code field
// //     setOpen(true)
// //   }
// //   const handleClose = () => setOpen(false)

// //   const handleEditOpen = (department) => {
// //     setEditDepartment({
// //       id: department.id,
// //       name: department.name,
// //       code: department.code || "", // Added code field
// //       head: department.headId ? department.headId.toString() : "",
// //       createdDate: department.createdDate ? department.createdDate.split("T")[0] : "",
// //     })
// //     setEditOpen(true)
// //   }
// //   const handleEditClose = () => {
// //     setEditDepartment(null)
// //     setEditOpen(false)
// //   }

// //   // ➕ Add new department
// //   const handleAddDepartment = async () => {
// //     if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head || !newDepartment.createdDate) {
// //       alert("Please fill all fields: Name, Code, Head, and Created Date.")
// //       return
// //     }
// //     try {
// //       // Token might be handled by axiosInstance interceptor, but keeping it explicit if needed for specific calls
// //       const token = localStorage.getItem("accessToken")
// //       if (!token && !axiosInstance.defaults.headers.common["Authorization"]) {
// //         // Check if interceptor already set it
// //         alert("Authentication error: No token found.")
// //         return
// //       }

// //       const payload = {
// //         department_name: newDepartment.name.trim(),
// //         department_code: newDepartment.code.trim(), // Added department code
// //         company_id: 2,
// //         department_head: Number.parseInt(newDepartment.head),
// //         created_at: newDepartment.createdDate,
// //         added_by: 3,
// //       }

// //       // Use axiosInstance
// //       await axiosInstance.post("/departments/", payload)

// //       fetchDepartments()
// //       setNewDepartment({ name: "", code: "", head: "", createdDate: "" }) // Reset with code field
// //       handleClose()
// //       alert("Department added successfully!")
// //     } catch (error) {
// //       console.error("Error adding department:", error.response?.data || error.message)
// //       alert(error.response?.data ? JSON.stringify(error.response.data, null, 2) : "Failed to add department")
// //     }
// //   }

// //   // ✏️ Edit department
// //   const handleEditDepartment = async () => {
// //     if (
// //       !editDepartment ||
// //       !editDepartment.name.trim() ||
// //       !editDepartment.code.trim() ||
// //       !editDepartment.head ||
// //       !editDepartment.createdDate
// //     ) {
// //       alert("Please fill all fields: Name, Code, Head, and Created Date.")
// //       return
// //     }
// //     // Token might be handled by axiosInstance interceptor
// //     const token = localStorage.getItem("accessToken")
// //     if (!token && !axiosInstance.defaults.headers.common["Authorization"]) {
// //       console.error("No access token found.")
// //       alert("Authentication error: No token found.")
// //       return
// //     }

// //     const updatedData = {
// //       department_name: editDepartment.name.trim(),
// //       department_code: editDepartment.code.trim(), // Added department code
// //       company_id: 2,
// //       department_head: Number.parseInt(editDepartment.head),
// //       added_by: 3,
// //       created_at: editDepartment.createdDate,
// //     }

// //     try {
// //       // Use axiosInstance
// //       await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData)
// //       handleEditClose()
// //       fetchDepartments()
// //       alert("Department updated successfully!")
// //     } catch (error) {
// //       console.error("Error updating department:", error.response?.data || error.message)
// //       alert(error.response?.data ? JSON.stringify(error.response.data, null, 2) : "Failed to update department")
// //     }
// //   }

// //   // ❌ Delete department
// //   const handleDeleteDepartment = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this department?")) return
// //     try {
// //       // Token might be handled by axiosInstance interceptor
// //       const token = localStorage.getItem("accessToken")
// //       if (!token && !axiosInstance.defaults.headers.common["Authorization"]) {
// //         alert("Authentication error: No token found.")
// //         return
// //       }

// //       // Use axiosInstance
// //       await axiosInstance.delete(`/departments/${id}/`)
// //       fetchDepartments()
// //       alert("Department deleted successfully!")
// //     } catch (error) {
// //       console.error("Error deleting department:", error.response?.data || error.message)
// //       alert(error.response?.data ? JSON.stringify(error.response.data, null, 2) : "Failed to delete department")
// //     }
// //   }

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 2 }}>
// //       <Paper elevation={3} sx={{ p: 3 }}>
// //         <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
// //           <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
// //             Department Management
// //           </Typography>
// //           <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<AddIcon />}>
// //             Add New Department
// //           </Button>
// //         </Box>

// //         <Box mb={3}>
// //           <TextField
// //             variant="outlined"
// //             fullWidth
// //             placeholder="Search Department by Name, Code or Head"
// //             value={searchTerm}
// //             onChange={handleSearch}
// //             InputProps={{
// //               startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
// //             }}
// //           />
// //         </Box>

// //         <TableContainer>
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Department Code</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Department Name</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Head</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200" }}>Created Date</TableCell>
// //                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "grey.200", textAlign: "center" }}>
// //                   Actions
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {filteredDepartments.length > 0 ? (
// //                 filteredDepartments.map((department) => (
// //                   <TableRow key={department.id} hover>
// //                     <TableCell>{department.code || "N/A"}</TableCell>
// //                     <TableCell>{department.name}</TableCell>
// //                     <TableCell>{department.headName || "N/A"}</TableCell>
// //                     <TableCell>{formatDisplayDate(department.createdDate)}</TableCell>
// //                     <TableCell sx={{ textAlign: "center" }}>
// //                       <IconButton color="primary" onClick={() => handleEditOpen(department)} size="small">
// //                         <EditIcon />
// //                       </IconButton>
// //                       <IconButton color="error" onClick={() => handleDeleteDepartment(department.id)} size="small">
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={5} align="center">
// //                     No departments found.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>

// //       {/* Add Department Modal */}
// //       <Modal open={open} onClose={handleClose}>
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             width: { xs: "90%", sm: 450 },
// //             bgcolor: "background.paper",
// //             borderRadius: 2,
// //             boxShadow: 24,
// //             p: 3, // Reduced padding slightly
// //           }}
// //         >
// //           <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
// //             Add New Department
// //           </Typography>
// //           <TextField
// //             fullWidth
// //             label="Department Code"
// //             value={newDepartment.code}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
// //             margin="normal"
// //             required
// //           />
// //           <TextField
// //             fullWidth
// //             label="Department Name"
// //             value={newDepartment.name}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
// //             margin="normal"
// //             required
// //           />
// //           <FormControl fullWidth margin="normal" required>
// //             <InputLabel id="department-head-label">Department Head</InputLabel>
// //             <Select
// //               labelId="department-head-label"
// //               label="Department Head"
// //               value={newDepartment.head}
// //               onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
// //               disabled={loadingEmployeesDropdown}
// //             >
// //               <MenuItem value="">
// //                 <em>
// //                   {loadingEmployeesDropdown ? <CircularProgress size={20} /> : employeesDropdownError || "Select Head"}
// //                 </em>
// //               </MenuItem>
// //               {!loadingEmployeesDropdown &&
// //                 !employeesDropdownError &&
// //                 employeesDropdown.map((emp) => (
// //                   <MenuItem key={emp.value} value={emp.value.toString()}>
// //                     {emp.label}
// //                   </MenuItem>
// //                 ))}
// //             </Select>
// //           </FormControl>
// //           <TextField
// //             fullWidth
// //             label="Created Date"
// //             type="date"
// //             value={newDepartment.createdDate}
// //             onChange={(e) => setNewDepartment({ ...newDepartment, createdDate: e.target.value })}
// //             margin="normal"
// //             InputLabelProps={{ shrink: true }}
// //             required
// //           />
// //           <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
// //             <Button variant="outlined" onClick={handleClose}>
// //               Cancel
// //             </Button>
// //             <Button variant="contained" color="primary" onClick={handleAddDepartment}>
// //               Add Department
// //             </Button>
// //           </Stack>
// //         </Box>
// //       </Modal>

// //       {/* Edit Department Modal */}
// //       {editDepartment && (
// //         <Modal open={editOpen} onClose={handleEditClose}>
// //           <Box
// //             sx={{
// //               position: "absolute",
// //               top: "50%",
// //               left: "50%",
// //               transform: "translate(-50%, -50%)",
// //               width: { xs: "90%", sm: 450 },
// //               bgcolor: "background.paper",
// //               borderRadius: 2,
// //               boxShadow: 24,
// //               p: 3, // Reduced padding slightly
// //             }}
// //           >
// //             <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
// //               Edit Department
// //             </Typography>
// //             <TextField
// //               fullWidth
// //               label="Department Code"
// //               value={editDepartment?.code || ""}
// //               onChange={(e) => setEditDepartment({ ...editDepartment, code: e.target.value })}
// //               margin="normal"
// //               required
// //             />
// //             <TextField
// //               fullWidth
// //               label="Department Name"
// //               value={editDepartment?.name || ""}
// //               onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
// //               margin="normal"
// //               required
// //             />
// //             <FormControl fullWidth margin="normal" required>
// //               <InputLabel id="edit-department-head-label">Department Head</InputLabel>
// //               <Select
// //                 labelId="edit-department-head-label"
// //                 label="Department Head"
// //                 value={editDepartment?.head || ""}
// //                 onChange={(e) => setEditDepartment({ ...editDepartment, head: e.target.value })}
// //                 disabled={loadingEmployeesDropdown}
// //               >
// //                 <MenuItem value="">
// //                   <em>
// //                     {loadingEmployeesDropdown ? (
// //                       <CircularProgress size={20} />
// //                     ) : (
// //                       employeesDropdownError || "Select Head"
// //                     )}
// //                   </em>
// //                 </MenuItem>
// //                 {!loadingEmployeesDropdown &&
// //                   !employeesDropdownError &&
// //                   employeesDropdown.map((emp) => (
// //                     <MenuItem key={emp.value} value={emp.value.toString()}>
// //                       {emp.label}
// //                     </MenuItem>
// //                   ))}
// //               </Select>
// //             </FormControl>
// //             <TextField
// //               fullWidth
// //               label="Created Date"
// //               type="date"
// //               value={editDepartment?.createdDate || ""}
// //               onChange={(e) => setEditDepartment({ ...editDepartment, createdDate: e.target.value })}
// //               margin="normal"
// //               InputLabelProps={{ shrink: true }}
// //               required
// //             />
// //             <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
// //               <Button variant="outlined" onClick={handleEditClose}>
// //                 Cancel
// //               </Button>
// //               <Button variant="contained" color="primary" onClick={handleEditDepartment}>
// //                 Save Changes
// //               </Button>
// //             </Stack>
// //           </Box>
// //         </Modal>
// //       )}
// //     </Container>
// //   )
// // }    /////// 



// import { useState, useEffect } from "react"
// import axiosInstance from "../../utils/axiosInstance" // Ensure this path is correct
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
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Stack,
// } from "@mui/material"
// import { Search, Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material"

// // Utility function for formatting date for display
// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "N/A"
//   try {
//     const date = new Date(dateString)
//     if (isNaN(date.getTime())) return dateString // Return original if invalid
//     const day = date.getDate().toString().padStart(2, "0")
//     const month = (date.getMonth() + 1).toString().padStart(2, "0") // Month is 0-indexed
//     const year = date.getFullYear()
//     return `${day}/${month}/${year}`
//   } catch (error) {
//     return dateString
//   }
// }

// export default function Department() {
//   const [departments, setDepartments] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [open, setOpen] = useState(false)
//   const [editOpen, setEditOpen] = useState(false)
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     code: "",
//     head: "",
//     createdDate: "",
//   })
//   const [editDepartment, setEditDepartment] = useState(null)
//   const [employeesDropdown, setEmployeesDropdown] = useState([])
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true)
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null)

//   // --- NEW: State for pagination ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("/departments/")
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//         createdDate: dept.created_at,
//       }))
//       setDepartments(formattedData)
//     } catch (error) {
//       console.error("Error fetching departments:", error.response?.data || error.message)
//     }
//   }

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true)
//     setEmployeesDropdownError(null)
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/")
//       setEmployeesDropdown(response.data || [])
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error.response?.data || error.message)
//       setEmployeesDropdownError("Failed to load employees.")
//     } finally {
//       setLoadingEmployeesDropdown(false)
//     }
//   }

//   useEffect(() => {
//     fetchDepartments()
//     fetchEmployeesDropdown()
//   }, [])

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value)
//     setPage(0); // --- UPDATED: Reset to first page on search ---
//   }

//   // --- NEW: Handler for changing rows per page ---
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase()),
//   )

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "", createdDate: "" })
//     setOpen(true)
//   }
//   const handleClose = () => setOpen(false)

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId ? department.headId.toString() : "",
//       createdDate: department.createdDate ? department.createdDate.split("T")[0] : "",
//     })
//     setEditOpen(true)
//   }
//   const handleEditClose = () => {
//     setEditDepartment(null)
//     setEditOpen(false)
//   }

//   const handleAddDepartment = async () => {
//     if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head || !newDepartment.createdDate) {
//       alert("Please fill all fields: Name, Code, Head, and Created Date.")
//       return
//     }
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: Number.parseInt(newDepartment.head),
//         created_at: newDepartment.createdDate,
//         added_by: 3,
//       }

//       await axiosInstance.post("/departments/", payload)
//       fetchDepartments()
//       setNewDepartment({ name: "", code: "", head: "", createdDate: "" })
//       handleClose()
//       alert("Department added successfully!")
//     } catch (error) {
//       console.error("Error adding department:", error.response?.data || error.message)
//       alert(error.response?.data ? JSON.stringify(error.response.data, null, 2) : "Failed to add department")
//     }
//   }

//   const handleEditDepartment = async () => {
//     if (
//       !editDepartment ||
//       !editDepartment.name.trim() ||
//       !editDepartment.code.trim() ||
//       !editDepartment.head ||
//       !editDepartment.createdDate
//     ) {
//       alert("Please fill all fields: Name, Code, Head, and Created Date.")
//       return
//     }

//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: Number.parseInt(editDepartment.head),
//       added_by: 3,
//       created_at: editDepartment.createdDate,
//     }

//     try {
//       await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData)
//       handleEditClose()
//       fetchDepartments()
//       alert("Department updated successfully!")
//     } catch (error) {
//       console.error("Error updating department:", error.response?.data || error.message)
//       alert(error.response?.data ? JSON.stringify(error.response.data, null, 2) : "Failed to update department")
//     }
//   }

//   const handleDeleteDepartment = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this department?")) return
//     try {
//       await axiosInstance.delete(`/departments/${id}/`)
//       fetchDepartments()
//       alert("Department deleted successfully!")
//     } catch (error) {
//       console.error("Error deleting department:", error.response?.data || error.message)
//       alert(error.response?.data ? JSON.stringify(error.response.data, null, 2) : "Failed to delete department")
//     }
//   }

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   // --- NEW: Calculations for pagination ---
//   const paginatedData = filteredDepartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredDepartments.length / rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//             Department Management
//           </Typography>
//           <Button variant="contained" sx={purpleButtonStyle} onClick={handleOpen} startIcon={<AddIcon />}>
//             Add New Department
//           </Button>
//         </Box>

//         <Box mb={3}>
//           <TextField
//             variant="outlined"
//             fullWidth
//             placeholder="Search Department by Name, Code or Head"
//             value={searchTerm}
//             onChange={handleSearch}
//             InputProps={{
//               startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
//             }}
//           />
//         </Box>

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
//                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd", width: '80px' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Department Code</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Department Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Head</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>Created Date</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd", textAlign: "center" }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* --- UPDATED: Map over paginatedData --- */}
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((department, index) => (
//                   <TableRow key={department.id} hover>
//                     {/* --- UPDATED: SR. NO. calculation --- */}
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{department.code || "N/A"}</TableCell>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.headName || "N/A"}</TableCell>
//                     <TableCell>{formatDisplayDate(department.createdDate)}</TableCell>
//                     <TableCell sx={{ textAlign: "center" }}>
//                       <IconButton sx={{ color: '#673ab7' }} onClick={() => handleEditOpen(department)} size="small">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDeleteDepartment(department.id)} size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* --- NEW: Pagination Controls --- */}
//       {filteredDepartments.length > 0 && (
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

//       {/* Modals remain unchanged */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: 450 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 3,
//           }}
//         >
//           <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
//             Add New Department
//           </Typography>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={newDepartment.code}
//             onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={newDepartment.name}
//             onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel id="department-head-label">Department Head</InputLabel>
//             <Select
//               labelId="department-head-label"
//               label="Department Head"
//               value={newDepartment.head}
//               onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? <CircularProgress size={20} /> : employeesDropdownError || "Select Head"}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.value} value={emp.value.toString()}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Created Date"
//             type="date"
//             value={newDepartment.createdDate}
//             onChange={(e) => setNewDepartment({ ...newDepartment, createdDate: e.target.value })}
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             required
//           />
//           <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
//             <Button variant="outlined" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="contained" sx={purpleButtonStyle} onClick={handleAddDepartment}>
//               Add Department
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       {editDepartment && (
//         <Modal open={editOpen} onClose={handleEditClose}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { xs: "90%", sm: 450 },
//               bgcolor: "background.paper",
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 3,
//             }}
//           >
//             <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
//               Edit Department
//             </Typography>
//             <TextField
//               fullWidth
//               label="Department Code"
//               value={editDepartment?.code || ""}
//               onChange={(e) => setEditDepartment({ ...editDepartment, code: e.target.value })}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department Name"
//               value={editDepartment?.name || ""}
//               onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel id="edit-department-head-label">Department Head</InputLabel>
//               <Select
//                 labelId="edit-department-head-label"
//                 label="Department Head"
//                 value={editDepartment?.head || ""}
//                 onChange={(e) => setEditDepartment({ ...editDepartment, head: e.target.value })}
//                 disabled={loadingEmployeesDropdown}
//               >
//                 <MenuItem value="">
//                   <em>
//                     {loadingEmployeesDropdown ? (
//                       <CircularProgress size={20} />
//                     ) : (
//                       employeesDropdownError || "Select Head"
//                     )}
//                   </em>
//                 </MenuItem>
//                 {!loadingEmployeesDropdown &&
//                   !employeesDropdownError &&
//                   employeesDropdown.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>
//                       {emp.label}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Created Date"
//               type="date"
//               value={editDepartment?.createdDate || ""}
//               onChange={(e) => setEditDepartment({ ...editDepartment, createdDate: e.target.value })}
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//             <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
//               <Button variant="outlined" onClick={handleEditClose}>
//                 Cancel
//               </Button>
//               <Button variant="contained" sx={purpleButtonStyle} onClick={handleEditDepartment}>
//                 Save Changes
//               </Button>
//             </Stack>
//           </Box>
//         </Modal>
//       )}
//     </Container>
//   )
// }




















// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";

// // --- STYLED COMPONENTS (for consistency with Role.js) ---

// const VibrantPurpleButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#8A2BE2",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#9932CC",
//   },
//   [theme.breakpoints.down("sm")]: {
//     fontSize: "0.75rem",
//     padding: "6px 12px",
//   },
// }));

// // Styled table header cells to keep them bold and non-wrapping
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   backgroundColor: "#f5f5f5",
// });

// // --- UTILITY FUNCTION ---

// const formatDisplayDate = (dateString) => {
//   // Return "N/A" if the date string is null, undefined, or empty
//   if (!dateString) return "N/A";

//   try {
//     const date = new Date(dateString);

//     // Check if the created Date object is valid.
//     // If the input string is not a valid date format, this will be true.
//     if (isNaN(date.getTime())) {
//       return dateString; // Return the original string if it's not a valid date
//     }

//     // Manually get the parts of the date
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // .getMonth() is 0-indexed, so we add 1
//     const year = date.getFullYear();

//     // Combine them in your desired format
//     return `${day}-${month}-${year}`;

//   } catch (error) {
//     // Fallback to the original string in case of an unexpected error
//     console.error("Error formatting date:", error);
//     return dateString;
//   }
// };

// // --- COMPONENT ---

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     code: "",
//     head: "",
//     createdDate: "",
//   });
//   const [editDepartment, setEditDepartment] = useState(null);
//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] =
//     useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//         createdDate: dept.created_at,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//       });
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase())
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "", createdDate: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId ? department.headId.toString() : "",
//       createdDate: department.createdDate
//         ? department.createdDate.split("T")[0]
//         : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (
//       !newDepartment.name.trim() ||
//       !newDepartment.code.trim() ||
//       !newDepartment.head ||
//       !newDepartment.createdDate
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//       });
//       return;
//     }
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: Number.parseInt(newDepartment.head),
//         created_at: newDepartment.createdDate,
//         added_by: 3,
//       };

//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//       });
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (
//       !editDepartment ||
//       !editDepartment.name.trim() ||
//       !editDepartment.code.trim() ||
//       !editDepartment.head ||
//       !editDepartment.createdDate
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//       });
//       return;
//     }

//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: Number.parseInt(editDepartment.head),
//       added_by: 3,
//       created_at: editDepartment.createdDate,
//     };

//     try {
//       await axiosInstance.patch(
//         `/departments/${editDepartment.id}/`,
//         updatedData
//       );
//       handleEditClose();
//       fetchDepartments();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//       });
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete "${department.name}". This action cannot be undone.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//           });
//         }
//       }
//     });
//   };

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const totalCount = filteredDepartments.length;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 }, width: "100%", mx: "auto" }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//           Department Management
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <VibrantPurpleButton
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Add Department
//           </VibrantPurpleButton>
//         </Box>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           mb={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <FormControl size="small" sx={{ minWidth: 90 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               label="Rows"
//               sx={{ height: 40 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ width: { xs: "100%", sm: "280px" } }}
//           />
//         </Box>

//         {/* ======================= KEY RESPONSIVE FIX HERE ======================= */}
//         <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//           <Table stickyHeader size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Code</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Name</StyledHeaderCell>
//                 <StyledHeaderCell>Head</StyledHeaderCell>
//                 <StyledHeaderCell>Created Date</StyledHeaderCell>
//                 <StyledHeaderCell align="center">Actions</StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((department, index) => (
//                   <TableRow key={department.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{department.code || "N/A"}</TableCell>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.headName || "N/A"}</TableCell>
//                     <TableCell>
//                       {formatDisplayDate(department.createdDate)}
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {/* ======================= END OF RESPONSIVE FIX ======================= */}

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Typography fontSize="0.9rem">
//             Showing <b>{totalCount > 0 ? page * rowsPerPage + 1 : 0}</b> -{" "}
//             <b>{Math.min((page + 1) * rowsPerPage, totalCount)}</b> of{" "}
//             <b>{totalCount}</b> Departments
//           </Typography>

//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//             <Button
//               variant="contained"
//               size="small"
//               disabled={page === 0}
//               onClick={() => setPage((prev) => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//               Page {page + 1}
//             </Typography>
//             <Button
//               variant="contained"
//               size="small"
//               disabled={(page + 1) * rowsPerPage >= totalCount}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Add Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: "bold" }}>
//           Add New Department
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={newDepartment.code}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={newDepartment.name}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={newDepartment.head}
//               onChange={(e) =>
//                 setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.value} value={emp.value.toString()}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Created Date"
//             type="date"
//             value={newDepartment.createdDate}
//             onChange={(e) =>
//               setNewDepartment({
//                 ...newDepartment,
//                 createdDate: e.target.value,
//               })
//             }
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             required
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleClose} color="error">
//             Cancel
//           </Button>
//           <VibrantPurpleButton onClick={handleAddDepartment}>
//             Add
//           </VibrantPurpleButton>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Dialog */}
//       {editDepartment && (
//         <Dialog
//           open={editOpen}
//           onClose={handleEditClose}
//           fullWidth
//           maxWidth="xs"
//         >
//           <DialogTitle sx={{ fontWeight: "bold" }}>Edit Department</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Department Code"
//               value={editDepartment?.code || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, code: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department Name"
//               value={editDepartment?.name || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, name: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel>Department Head</InputLabel>
//               <Select
//                 label="Department Head"
//                 value={editDepartment?.head || ""}
//                 onChange={(e) =>
//                   setEditDepartment({ ...editDepartment, head: e.target.value })
//                 }
//                 disabled={loadingEmployeesDropdown}
//               >
//                 <MenuItem value="">
//                   <em>
//                     {loadingEmployeesDropdown ? (
//                       <CircularProgress size={20} />
//                     ) : (
//                       employeesDropdownError || "Select Head"
//                     )}
//                   </em>
//                 </MenuItem>
//                 {!loadingEmployeesDropdown &&
//                   !employeesDropdownError &&
//                   employeesDropdown.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>
//                       {emp.label}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Created Date"
//               type="date"
//               value={editDepartment?.createdDate || ""}
//               onChange={(e) =>
//                 setEditDepartment({
//                   ...editDepartment,
//                   createdDate: e.target.value,
//                 })
//               }
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//           </DialogContent>
//           <DialogActions sx={{ p: "16px 24px" }}>
//             <Button onClick={handleEditClose} color="error">
//               Cancel
//             </Button>
//             <VibrantPurpleButton onClick={handleEditDepartment}>
//               Save Changes
//             </VibrantPurpleButton>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }








// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";

// // --- STYLED COMPONENTS (with updated theme colors) ---

// const ThemeButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#8C257C", // Applied theme Purple
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#7a216d", // Darker shade of theme Purple for hover
//   },
//   "&.Mui-disabled": { // Style for disabled state to ensure visibility
//     backgroundColor: "rgba(0, 0, 0, 0.12)",
//     color: "rgba(0, 0, 0, 0.26)",
//   },
//   [theme.breakpoints.down("sm")]: {
//     fontSize: "0.75rem",
//     padding: "6px 12px",
//   },
// }));

// // Styled table header cells with the new theme color
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   backgroundColor: "#8C257C", // Applied theme Purple
//   color: "#fff", // Set text color to white for contrast
// });

// // --- UTILITY FUNCTION ---

// const formatDisplayDate = (dateString) => {
//   // Return "N/A" if the date string is null, undefined, or empty
//   if (!dateString) return "N/A";

//   try {
//     const date = new Date(dateString);

//     // Check if the created Date object is valid.
//     if (isNaN(date.getTime())) {
//       return dateString; // Return the original string if it's not a valid date
//     }

//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;

//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return dateString;
//   }
// };

// // --- COMPONENT ---

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     code: "",
//     head: "",
//     createdDate: "",
//   });
//   const [editDepartment, setEditDepartment] = useState(null);
//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] =
//     useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//         createdDate: dept.created_at,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//       });
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase())
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "", createdDate: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId ? department.headId.toString() : "",
//       createdDate: department.createdDate
//         ? department.createdDate.split("T")[0]
//         : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (
//       !newDepartment.name.trim() ||
//       !newDepartment.code.trim() ||
//       !newDepartment.head ||
//       !newDepartment.createdDate
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//       });
//       return;
//     }
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: Number.parseInt(newDepartment.head),
//         created_at: newDepartment.createdDate,
//         added_by: 3,
//       };

//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//       });
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (
//       !editDepartment ||
//       !editDepartment.name.trim() ||
//       !editDepartment.code.trim() ||
//       !editDepartment.head ||
//       !editDepartment.createdDate
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//       });
//       return;
//     }

//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: Number.parseInt(editDepartment.head),
//       added_by: 3,
//       created_at: editDepartment.createdDate,
//     };

//     try {
//       await axiosInstance.patch(
//         `/departments/${editDepartment.id}/`,
//         updatedData
//       );
//       handleEditClose();
//       fetchDepartments();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//       });
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete "${department.name}". This action cannot be undone.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//           });
//         }
//       }
//     });
//   };

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const totalCount = filteredDepartments.length;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 }, width: "100%", mx: "auto" }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//           Department Management
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <ThemeButton
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Add Department
//           </ThemeButton>
//         </Box>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           mb={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <FormControl size="small" sx={{ minWidth: 90 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               label="Rows"
//               sx={{ height: 40 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ width: { xs: "100%", sm: "280px" } }}
//           />
//         </Box>

//         <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//           <Table stickyHeader size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Code</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Name</StyledHeaderCell>
//                 <StyledHeaderCell>Head</StyledHeaderCell>
//                 <StyledHeaderCell>Created Date</StyledHeaderCell>
//                 <StyledHeaderCell align="center">Actions</StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((department, index) => (
//                   <TableRow key={department.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{department.code || "N/A"}</TableCell>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.headName || "N/A"}</TableCell>
//                     <TableCell>
//                       {formatDisplayDate(department.createdDate)}
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: "#F58E35" }} // Applied theme Orange
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Typography fontSize="0.9rem">
//             Showing <b>{totalCount > 0 ? page * rowsPerPage + 1 : 0}</b> -{" "}
//             <b>{Math.min((page + 1) * rowsPerPage, totalCount)}</b> of{" "}
//             <b>{totalCount}</b> Departments
//           </Typography>

//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={page === 0}
//               onClick={() => setPage((prev) => prev - 1)}
//             >
//               Previous
//             </ThemeButton>
//             <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//               Page {page + 1}
//             </Typography>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={(page + 1) * rowsPerPage >= totalCount}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next
//             </ThemeButton>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Add Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: "bold" }}>
//           Add New Department
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={newDepartment.code}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={newDepartment.name}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={newDepartment.head}
//               onChange={(e) =>
//                 setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.value} value={emp.value.toString()}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Created Date"
//             type="date"
//             value={newDepartment.createdDate}
//             onChange={(e) =>
//               setNewDepartment({
//                 ...newDepartment,
//                 createdDate: e.target.value,
//               })
//             }
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             required
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleClose} color="inherit">
//             Cancel
//           </Button>
//           <ThemeButton onClick={handleAddDepartment}>
//             Add
//           </ThemeButton>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Dialog */}
//       {editDepartment && (
//         <Dialog
//           open={editOpen}
//           onClose={handleEditClose}
//           fullWidth
//           maxWidth="xs"
//         >
//           <DialogTitle sx={{ fontWeight: "bold" }}>Edit Department</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Department Code"
//               value={editDepartment?.code || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, code: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department Name"
//               value={editDepartment?.name || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, name: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel>Department Head</InputLabel>
//               <Select
//                 label="Department Head"
//                 value={editDepartment?.head || ""}
//                 onChange={(e) =>
//                   setEditDepartment({ ...editDepartment, head: e.target.value })
//                 }
//                 disabled={loadingEmployeesDropdown}
//               >
//                 <MenuItem value="">
//                   <em>
//                     {loadingEmployeesDropdown ? (
//                       <CircularProgress size={20} />
//                     ) : (
//                       employeesDropdownError || "Select Head"
//                     )}
//                   </em>
//                 </MenuItem>
//                 {!loadingEmployeesDropdown &&
//                   !employeesDropdownError &&
//                   employeesDropdown.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>
//                       {emp.label}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Created Date"
//               type="date"
//               value={editDepartment?.createdDate || ""}
//               onChange={(e) =>
//                 setEditDepartment({
//                   ...editDepartment,
//                   createdDate: e.target.value,
//                 })
//               }
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//           </DialogContent>
//           <DialogActions sx={{ p: "16px 24px" }}>
//             <Button onClick={handleEditClose} color="inherit">
//               Cancel
//             </Button>
//             <ThemeButton onClick={handleEditDepartment}>
//               Save Changes
//             </ThemeButton>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }

















// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";

// // --- STYLED COMPONENTS (with updated theme colors) ---

// const ThemeButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#8C257C", // Applied theme Purple
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#7a216d", // Darker shade of theme Purple for hover
//   },
//   "&.Mui-disabled": { // Style for disabled state to ensure visibility
//     backgroundColor: "rgba(0, 0, 0, 0.12)",
//     color: "rgba(0, 0, 0, 0.26)",
//   },
//   [theme.breakpoints.down("sm")]: {
//     fontSize: "0.75rem",
//     padding: "6px 12px",
//   },
// }));

// // Styled table header cells with the new theme color
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   backgroundColor: "#8C257C", // Applied theme Purple
//   color: "#fff", // Set text color to white for contrast
// });

// // --- UTILITY FUNCTION ---

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "N/A";

//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return dateString;
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return dateString;
//   }
// };

// // --- COMPONENT ---

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     code: "",
//     head: "",
//   });
//   const [editDepartment, setEditDepartment] = useState(null);
//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] =
//     useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head, // This will be the emp_id like "V0992"
//         headName: dept.department_head_name,
//         createdDate: dept.created_at,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//       });
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase())
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId || "", // Use headId which is the emp_id string
//       createdDate: department.createdDate
//         ? department.createdDate.split("T")[0]
//         : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (
//       !newDepartment.name.trim() ||
//       !newDepartment.code.trim() ||
//       !newDepartment.head
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//       });
//       return;
//     }
//     try {
//       // MODIFIED: Removed Number.parseInt() to send the emp_id string directly
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: newDepartment.head,
//         added_by: 3,
//       };

//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//       });
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (
//       !editDepartment ||
//       !editDepartment.name.trim() ||
//       !editDepartment.code.trim() ||
//       !editDepartment.head ||
//       !editDepartment.createdDate
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//       });
//       return;
//     }
    
//     // MODIFIED: Removed Number.parseInt() to send the emp_id string directly
//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: editDepartment.head,
//       added_by: 3,
//       created_at: editDepartment.createdDate,
//     };

//     try {
//       await axiosInstance.patch(
//         `/departments/${editDepartment.id}/`,
//         updatedData
//       );
//       handleEditClose();
//       fetchDepartments();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//       });
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete "${department.name}". This action cannot be undone.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//           });
//         }
//       }
//     });
//   };

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const totalCount = filteredDepartments.length;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 }, width: "100%", mx: "auto" }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//           Department Management
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <ThemeButton
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Add Department
//           </ThemeButton>
//         </Box>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           mb={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <FormControl size="small" sx={{ minWidth: 90 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               label="Rows"
//               sx={{ height: 40 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ width: { xs: "100%", sm: "280px" } }}
//           />
//         </Box>

//         <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//           <Table stickyHeader size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Code</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Name</StyledHeaderCell>
//                 <StyledHeaderCell>Head</StyledHeaderCell>
//                 <StyledHeaderCell>Created Date</StyledHeaderCell>
//                 <StyledHeaderCell align="center">Actions</StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((department, index) => (
//                   <TableRow key={department.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{department.code || "N/A"}</TableCell>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.headName || "N/A"}</TableCell>
//                     <TableCell>
//                       {formatDisplayDate(department.createdDate)}
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: "#F58E35" }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Typography fontSize="0.9rem">
//             Showing <b>{totalCount > 0 ? page * rowsPerPage + 1 : 0}</b> -{" "}
//             <b>{Math.min((page + 1) * rowsPerPage, totalCount)}</b> of{" "}
//             <b>{totalCount}</b> Departments
//           </Typography>

//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={page === 0}
//               onClick={() => setPage((prev) => prev - 1)}
//             >
//               Previous
//             </ThemeButton>
//             <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//               Page {page + 1}
//             </Typography>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={(page + 1) * rowsPerPage >= totalCount}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next
//             </ThemeButton>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Add Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: "bold" }}>
//           Add New Department
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={newDepartment.code}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={newDepartment.name}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={newDepartment.head}
//               onChange={(e) =>
//                 setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleClose} color="inherit">
//             Cancel
//           </Button>
//           <ThemeButton onClick={handleAddDepartment}>
//             Add
//           </ThemeButton>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Dialog */}
//       {editDepartment && (
//         <Dialog
//           open={editOpen}
//           onClose={handleEditClose}
//           fullWidth
//           maxWidth="xs"
//         >
//           <DialogTitle sx={{ fontWeight: "bold" }}>Edit Department</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Department Code"
//               value={editDepartment?.code || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, code: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department Name"
//               value={editDepartment?.name || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, name: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel>Department Head</InputLabel>
//               <Select
//                 label="Department Head"
//                 value={editDepartment?.head || ""}
//                 onChange={(e) =>
//                   setEditDepartment({ ...editDepartment, head: e.target.value })
//                 }
//                 disabled={loadingEmployeesDropdown}
//               >
//                 <MenuItem value="">
//                   <em>
//                     {loadingEmployeesDropdown ? (
//                       <CircularProgress size={20} />
//                     ) : (
//                       employeesDropdownError || "Select Head"
//                     )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Created Date"
//               type="date"
//               value={editDepartment?.createdDate || ""}
//               onChange={(e) =>
//                 setEditDepartment({
//                   ...editDepartment,
//                   createdDate: e.target.value,
//                 })
//               }
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//           </DialogContent>
//           <DialogActions sx={{ p: "16px 24px" }}>
//             <Button onClick={handleEditClose} color="inherit">
//               Cancel
//             </Button>
//             <ThemeButton onClick={handleEditDepartment}>
//               Save Changes
//             </ThemeButton>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }











// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";

// // --- STYLED COMPONENTS (with updated theme colors) ---

// const ThemeButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#8C257C", // Applied theme Purple
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#7a216d", // Darker shade of theme Purple for hover
//   },
//   "&.Mui-disabled": { // Style for disabled state to ensure visibility
//     backgroundColor: "rgba(0, 0, 0, 0.12)",
//     color: "rgba(0, 0, 0, 0.26)",
//   },
//   [theme.breakpoints.down("sm")]: {
//     fontSize: "0.75rem",
//     padding: "6px 12px",
//   },
// }));

// // Styled table header cells with the new theme color
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   backgroundColor: "#8C257C", // Applied theme Purple
//   color: "#fff", // Set text color to white for contrast
// });

// // --- UTILITY FUNCTION ---

// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "N/A";

//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return dateString;
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return dateString;
//   }
// };

// // --- COMPONENT ---

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     code: "",
//     head: "",
//   });
//   const [editDepartment, setEditDepartment] = useState(null);
//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] =
//     useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//         createdDate: dept.created_at,
//       }));

//       // MODIFIED: Sort the data to show the latest entries first
//       const sortedData = formattedData.sort(
//         (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
//       );

//       setDepartments(sortedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//       });
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase())
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId || "",
//       createdDate: department.createdDate
//         ? department.createdDate.split("T")[0]
//         : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (
//       !newDepartment.name.trim() ||
//       !newDepartment.code.trim() ||
//       !newDepartment.head
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//       });
//       return;
//     }
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: newDepartment.head,
//         added_by: 3,
//       };

//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments(); // Refetches and re-sorts data
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//       });
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (
//       !editDepartment ||
//       !editDepartment.name.trim() ||
//       !editDepartment.code.trim() ||
//       !editDepartment.head ||
//       !editDepartment.createdDate
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//       });
//       return;
//     }
    
//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: editDepartment.head,
//       added_by: 3,
//       created_at: editDepartment.createdDate,
//     };

//     try {
//       await axiosInstance.patch(
//         `/departments/${editDepartment.id}/`,
//         updatedData
//       );
//       handleEditClose();
//       fetchDepartments(); // Refetches and re-sorts data
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//       });
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete "${department.name}". This action cannot be undone.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments(); // Refetches and re-sorts data
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//           });
//         }
//       }
//     });
//   };

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const totalCount = filteredDepartments.length;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 }, width: "100%", mx: "auto" }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//           Department Management
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <ThemeButton
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Add Department
//           </ThemeButton>
//         </Box>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           mb={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <FormControl size="small" sx={{ minWidth: 90 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               label="Rows"
//               sx={{ height: 40 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ width: { xs: "100%", sm: "280px" } }}
//           />
//         </Box>

//         <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//           <Table stickyHeader size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Code</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Name</StyledHeaderCell>
//                 <StyledHeaderCell>Head</StyledHeaderCell>
//                 <StyledHeaderCell>Created Date</StyledHeaderCell>
//                 <StyledHeaderCell align="center">Actions</StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((department, index) => (
//                   <TableRow key={department.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{department.code || "N/A"}</TableCell>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.headName || "N/A"}</TableCell>
//                     <TableCell>
//                       {formatDisplayDate(department.createdDate)}
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: "#F58E35" }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Typography fontSize="0.9rem">
//             Showing <b>{totalCount > 0 ? page * rowsPerPage + 1 : 0}</b> -{" "}
//             <b>{Math.min((page + 1) * rowsPerPage, totalCount)}</b> of{" "}
//             <b>{totalCount}</b> Departments
//           </Typography>

//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={page === 0}
//               onClick={() => setPage((prev) => prev - 1)}
//             >
//               Previous
//             </ThemeButton>
//             <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//               Page {page + 1}
//             </Typography>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={(page + 1) * rowsPerPage >= totalCount}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next
//             </ThemeButton>
//           </Box>
//         </Box>
//       </Paper>

//       {/* Add Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: "bold" }}>
//           Add New Department
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={newDepartment.code}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={newDepartment.name}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={newDepartment.head}
//               onChange={(e) =>
//                 setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleClose} color="inherit">
//             Cancel
//           </Button>
//           <ThemeButton onClick={handleAddDepartment}>
//             Add
//           </ThemeButton>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Dialog */}
//       {editDepartment && (
//         <Dialog
//           open={editOpen}
//           onClose={handleEditClose}
//           fullWidth
//           maxWidth="xs"
//         >
//           <DialogTitle sx={{ fontWeight: "bold" }}>Edit Department</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Department Code"
//               value={editDepartment?.code || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, code: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department Name"
//               value={editDepartment?.name || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, name: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel>Department Head</InputLabel>
//               <Select
//                 label="Department Head"
//                 value={editDepartment?.head || ""}
//                 onChange={(e) =>
//                   setEditDepartment({ ...editDepartment, head: e.target.value })
//                 }
//                 disabled={loadingEmployeesDropdown}
//               >
//                 <MenuItem value="">
//                   <em>
//                     {loadingEmployeesDropdown ? (
//                       <CircularProgress size={20} />
//                     ) : (
//                       employeesDropdownError || "Select Head"
//                     )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Created Date"
//               type="date"
//               value={editDepartment?.createdDate || ""}
//               onChange={(e) =>
//                 setEditDepartment({
//                   ...editDepartment,
//                   createdDate: e.target.value,
//                 })
//               }
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//           </DialogContent>
//           <DialogActions sx={{ p: "16px 24px" }}>
//             <Button onClick={handleEditClose} color="inherit">
//               Cancel
//             </Button>
//             <ThemeButton onClick={handleEditDepartment}>
//               Save Changes
//             </ThemeButton>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }






// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";

// const ThemeButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#8C257C",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#7a216d",
//   },
//   "&.Mui-disabled": {
//     backgroundColor: "rgba(0, 0, 0, 0.12)",
//     color: "rgba(0, 0, 0, 0.26)",
//   },
//   [theme.breakpoints.down("sm")]: {
//     fontSize: "0.75rem",
//     padding: "6px 12px",
//   },
// }));

// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   whiteSpace: "nowrap",
//   backgroundColor: "#8C257C",
//   color: "#fff",
// });

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [newDepartment, setNewDepartment] = useState({
//     name: "",
//     code: "",
//     head: "",
//   });
//   const [editDepartment, setEditDepartment] = useState(null);
//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] =
//     useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//       });
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase()?.includes(searchTerm.toLowerCase())
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId ? department.headId.toString() : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (
//       !newDepartment.name.trim() ||
//       !newDepartment.code.trim() ||
//       !newDepartment.head
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//       });
//       return;
//     }
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: Number.parseInt(newDepartment.head),
//         added_by: 3,
//       };

//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//       });
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (
//       !editDepartment ||
//       !editDepartment.name.trim() ||
//       !editDepartment.code.trim() ||
//       !editDepartment.head
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//       });
//       return;
//     }

//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: Number.parseInt(editDepartment.head),
//       added_by: 3,
//     };

//     try {
//       await axiosInstance.patch(
//         `/departments/${editDepartment.id}/`,
//         updatedData
//       );
//       handleEditClose();
//       fetchDepartments();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//       });
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to delete "${department.name}". This action cannot be undone.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//           });
//         }
//       }
//     });
//   };

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const totalCount = filteredDepartments.length;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 }, width: "100%", mx: "auto" }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//           Department Management
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <ThemeButton
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleOpen}
//           >
//             Add Department
//           </ThemeButton>
//         </Box>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           mb={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <FormControl size="small" sx={{ minWidth: 90 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               label="Rows"
//               sx={{ height: 40 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ width: { xs: "100%", sm: "280px" } }}
//           />
//         </Box>

//         <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//           <Table stickyHeader size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Code</StyledHeaderCell>
//                 <StyledHeaderCell>Dept. Name</StyledHeaderCell>
//                 <StyledHeaderCell>Head</StyledHeaderCell>
//                 <StyledHeaderCell align="center">Actions</StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((department, index) => (
//                   <TableRow key={department.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{department.code || "N/A"}</TableCell>
//                     <TableCell>{department.name}</TableCell>
//                     <TableCell>{department.headName || "N/A"}</TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: "#F58E35" }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No departments found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={2}
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Typography fontSize="0.9rem">
//             Showing <b>{totalCount > 0 ? page * rowsPerPage + 1 : 0}</b> -{" "}
//             <b>{Math.min((page + 1) * rowsPerPage, totalCount)}</b> of{" "}
//             <b>{totalCount}</b> Departments
//           </Typography>

//           <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={page === 0}
//               onClick={() => setPage((prev) => prev - 1)}
//             >
//               Previous
//             </ThemeButton>
//             <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//               Page {page + 1}
//             </Typography>
//             <ThemeButton
//               variant="contained"
//               size="small"
//               disabled={(page + 1) * rowsPerPage >= totalCount}
//               onClick={() => setPage((prev) => prev + 1)}
//             >
//               Next
//             </ThemeButton>
//           </Box>
//         </Box>
//       </Paper>

//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: "bold" }}>
//           Add New Department
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={newDepartment.code}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={newDepartment.name}
//             onChange={(e) =>
//               setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={newDepartment.head}
//               onChange={(e) =>
//                 setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.value} value={emp.value.toString()}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleClose} color="inherit">
//             Cancel
//           </Button>
//           <ThemeButton onClick={handleAddDepartment}>
//             Add
//           </ThemeButton>
//         </DialogActions>
//       </Dialog>

//       {editDepartment && (
//         <Dialog
//           open={editOpen}
//           onClose={handleEditClose}
//           fullWidth
//           maxWidth="xs"
//         >
//           <DialogTitle sx={{ fontWeight: "bold" }}>Edit Department</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Department Code"
//               value={editDepartment?.code || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, code: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department Name"
//               value={editDepartment?.name || ""}
//               onChange={(e) =>
//                 setEditDepartment({ ...editDepartment, name: e.target.value })
//               }
//               margin="normal"
//               required
//             />
//             <FormControl fullWidth margin="normal" required>
//               <InputLabel>Department Head</InputLabel>
//               <Select
//                 label="Department Head"
//                 value={editDepartment?.head || ""}
//                 onChange={(e) =>
//                   setEditDepartment({ ...editDepartment, head: e.target.value })
//                 }
//                 disabled={loadingEmployeesDropdown}
//               >
//                 <MenuItem value="">
//                   <em>
//                     {loadingEmployeesDropdown ? (
//                       <CircularProgress size={20} />
//                     ) : (
//                       employeesDropdownError || "Select Head"
//                     )}
//                   </em>
//                 </MenuItem>
//                 {!loadingEmployeesDropdown &&
//                   !employeesDropdownError &&
//                   employeesDropdown.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>
//                       {emp.label}
//                     </MenuItem>
//                   ))}
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions sx={{ p: "16px 24px" }}>
//             <Button onClick={handleEditClose} color="inherit">
//               Cancel
//             </Button>
//             <ThemeButton onClick={handleEditDepartment}>
//               Save Changes
//             </ThemeButton>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// }






// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Skeleton,
//   TablePagination,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import Swal from "sweetalert2";

// // Consistent Theme-based Styling
// const primaryColor = "#8C257C";
// const primaryDarkColor = "#6d1d60";
// const secondaryColor = "#F58E35";
// const textColorOnPrimary = "#FFFFFF";
// const cancelButtonColor = "#757575";

// const StyledHeaderCell = (props) => (
//   <TableCell
//     {...props}
//     sx={{
//       backgroundColor: primaryColor,
//       color: textColorOnPrimary,
//       fontWeight: "bold",
//       whiteSpace: "nowrap",
//     }}
//   />
// );

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [newDepartment, setNewDepartment] = useState({ name: "", code: "", head: "" });
//   const [editDepartment, setEditDepartment] = useState(null);

//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchDepartments = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId ? department.headId.toString() : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2, // As per original code
//         department_head: Number.parseInt(newDepartment.head),
//         added_by: 3, // As per original code
//       };
//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (!editDepartment || !editDepartment.name.trim() || !editDepartment.code.trim() || !editDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2, // As per original code
//       department_head: Number.parseInt(editDepartment.head),
//       added_by: 3, // As per original code
//     };
//     try {
//       await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData);
//       fetchDepartments();
//       handleEditClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert this!`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const renderSkeletons = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell align="center">
//           <Skeleton variant="rectangular" width={70} height={30} />
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
//         Department 
//       </Typography>


//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         gap={2}
//         mb={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpen}
//           sx={{
//             backgroundColor: primaryColor,
//             color: textColorOnPrimary,
//             "&:hover": { backgroundColor: primaryDarkColor },
//             alignSelf: isMobile ? "stretch" : "auto",
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//         />
//       </Box>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow>
//               <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. CODE</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. NAME</StyledHeaderCell>
//               <StyledHeaderCell>HEAD</StyledHeaderCell>
//               <StyledHeaderCell align="center">ACTIONS</StyledHeaderCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               renderSkeletons()
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((department, index) => (
//                 <TableRow key={department.id} hover>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{department.code || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{department.name}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{department.headName || "N/A"}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: secondaryColor }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No departments found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         display="flex"
//         justifyContent={isMobile ? "center" : "space-between"}
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         mt={2}
//         gap={2}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {Math.min(rowsPerPage, paginatedData.length)} of {filteredDepartments.length} results
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           component="div"
//           count={filteredDepartments.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//               color: primaryColor,
//             },
//             "& .MuiSvgIcon-root": {
//               color: primaryColor,
//             },
//           }}
//         />
//       </Box>

//       {/* Add/Edit Dialogs */}
//       <Dialog open={open || editOpen} onClose={editOpen ? handleEditClose : handleClose} fullWidth maxWidth="sm">
//        <DialogTitle sx={{ color: primaryColor, fontWeight: "bold", fontSize: '2.125rem' }}>
//     {editOpen ? "Edit Department" : "Add New Department"}
//       </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={editOpen ? editDepartment?.code : newDepartment.code}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, code: e.target.value })
//                 : setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={editOpen ? editDepartment?.name : newDepartment.name}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, name: e.target.value })
//                 : setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={editOpen ? editDepartment?.head : newDepartment.head}
//               onChange={(e) =>
//                 editOpen
//                   ? setEditDepartment({ ...editDepartment, head: e.target.value })
//                   : setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.value} value={emp.value.toString()}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button
//             onClick={editOpen ? handleEditClose : handleClose}
//             sx={{ color: cancelButtonColor }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={editOpen ? handleEditDepartment : handleAddDepartment}
//             variant="contained"
//             disabled={submitting}
//             sx={{
//               backgroundColor: primaryColor,
//               "&:hover": { backgroundColor: primaryDarkColor },
//             }}
//           >
//             {submitting ? <CircularProgress size={24} sx={{ color: textColorOnPrimary }} /> : (editOpen ? "Save Changes" : "Save")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }









// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Skeleton,
//   TablePagination,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import Swal from "sweetalert2";

// // Consistent Theme-based Styling
// const primaryColor = "#8C257C";
// const primaryDarkColor = "#6d1d60";
// const secondaryColor = "#F58E35";
// const textColorOnPrimary = "#FFFFFF";
// const cancelButtonColor = "#757575";

// const StyledHeaderCell = (props) => (
//   <TableCell
//     {...props}
//     sx={{
//       backgroundColor: primaryColor,
//       color: textColorOnPrimary,
//       fontWeight: "bold",
//       whiteSpace: "nowrap",
//     }}
//   />
// );

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [newDepartment, setNewDepartment] = useState({ name: "", code: "", head: "" });
//   const [editDepartment, setEditDepartment] = useState(null);

//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchDepartments = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: department.headId ? department.headId.toString() : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2, // As per original code
//         department_head: Number.parseInt(newDepartment.head),
//         added_by: 3, // As per original code
//       };
//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (!editDepartment || !editDepartment.name.trim() || !editDepartment.code.trim() || !editDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2, // As per original code
//       department_head: Number.parseInt(editDepartment.head),
//       added_by: 3, // As per original code
//     };
//     try {
//       await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData);
//       fetchDepartments();
//       handleEditClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert this!`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const renderSkeletons = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell align="center" sx={{ py: 2 }}>
//           <Skeleton variant="rectangular" width={70} height={30} />
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
//         Department 
//       </Typography>


//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         gap={2}
//         mb={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpen}
//           sx={{
//             backgroundColor: primaryColor,
//             color: textColorOnPrimary,
//             "&:hover": { backgroundColor: primaryDarkColor },
//             alignSelf: isMobile ? "stretch" : "auto",
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//         />
//       </Box>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow>
//               <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. CODE</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. NAME</StyledHeaderCell>
//               <StyledHeaderCell>HEAD</StyledHeaderCell>
//               <StyledHeaderCell align="center">ACTIONS</StyledHeaderCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               renderSkeletons()
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((department, index) => (
//                 <TableRow key={department.id} hover>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.code || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.name}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.headName || "N/A"}</TableCell>
//                   <TableCell sx={{ py: 2 }}>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: secondaryColor }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
//                   No departments found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         display="flex"
//         justifyContent={isMobile ? "center" : "space-between"}
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         mt={2}
//         gap={2}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {Math.min(rowsPerPage, paginatedData.length)} of {filteredDepartments.length} results
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           component="div"
//           count={filteredDepartments.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//               color: primaryColor,
//             },
//             "& .MuiSvgIcon-root": {
//               color: primaryColor,
//             },
//           }}
//         />
//       </Box>

//       {/* Add/Edit Dialogs */}
//       <Dialog open={open || editOpen} onClose={editOpen ? handleEditClose : handleClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: primaryColor, fontWeight: "bold", fontSize: '2rem' }}>
//           {editOpen ? "Edit Department" : "Add New Department"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={editOpen ? editDepartment?.code : newDepartment.code}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, code: e.target.value })
//                 : setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={editOpen ? editDepartment?.name : newDepartment.name}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, name: e.target.value })
//                 : setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={editOpen ? editDepartment?.head : newDepartment.head}
//               onChange={(e) =>
//                 editOpen
//                   ? setEditDepartment({ ...editDepartment, head: e.target.value })
//                   : setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.value} value={emp.value.toString()}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button
//             onClick={editOpen ? handleEditClose : handleClose}
//             sx={{ color: cancelButtonColor }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={editOpen ? handleEditDepartment : handleAddDepartment}
//             variant="contained"
//             disabled={submitting}
//             sx={{
//               backgroundColor: primaryColor,
//               "&:hover": { backgroundColor: primaryDarkColor },
//             }}
//           >
//             {submitting ? <CircularProgress size={24} sx={{ color: textColorOnPrimary }} /> : (editOpen ? "Save Changes" : "Save")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }















// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Skeleton,
//   TablePagination,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import Swal from "sweetalert2";

// // Consistent Theme-based Styling
// const primaryColor = "#8C257C";
// const primaryDarkColor = "#6d1d60";
// const secondaryColor = "#F58E35";
// const textColorOnPrimary = "#FFFFFF";
// const cancelButtonColor = "#757575";

// const StyledHeaderCell = (props) => (
//   <TableCell
//     {...props}
//     sx={{
//       backgroundColor: primaryColor,
//       color: textColorOnPrimary,
//       fontWeight: "bold",
//       whiteSpace: "nowrap",
//     }}
//   />
// );

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [newDepartment, setNewDepartment] = useState({ name: "", code: "", head: "" });
//   const [editDepartment, setEditDepartment] = useState(null);

//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchDepartments = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     // Find the employee in the dropdown whose numeric 'value' matches the department's 'headId'
//     const headEmployee = employeesDropdown.find(
//       (emp) => emp.value === department.headId?.toString()
//     );

//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       // Set the 'head' for the form to the corresponding 'emp_id'
//       head: headEmployee ? headEmployee.emp_id : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2, // As per original code
//         department_head: newDepartment.head, // Pass the emp_id string
//         added_by: 3, // As per original code
//       };
//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (!editDepartment || !editDepartment.name.trim() || !editDepartment.code.trim() || !editDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2, // As per original code
//       department_head: editDepartment.head, // Pass the emp_id string
//       added_by: 3, // As per original code
//     };
//     try {
//       await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData);
//       fetchDepartments();
//       handleEditClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert this!`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const renderSkeletons = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell align="center" sx={{ py: 2 }}>
//           <Skeleton variant="rectangular" width={70} height={30} />
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
//         Department
//       </Typography>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         gap={2}
//         mb={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpen}
//           sx={{
//             backgroundColor: primaryColor,
//             color: textColorOnPrimary,
//             "&:hover": { backgroundColor: primaryDarkColor },
//             alignSelf: isMobile ? "stretch" : "auto",
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//         />
//       </Box>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow>
//               <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. CODE</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. NAME</StyledHeaderCell>
//               <StyledHeaderCell>HEAD</StyledHeaderCell>
//               <StyledHeaderCell align="center">ACTIONS</StyledHeaderCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               renderSkeletons()
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((department, index) => (
//                 <TableRow key={department.id} hover>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.code || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.name}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.headName || "N/A"}</TableCell>
//                   <TableCell sx={{ py: 2 }}>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: secondaryColor }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
//                   No departments found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         display="flex"
//         justifyContent={isMobile ? "center" : "space-between"}
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         mt={2}
//         gap={2}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {Math.min(rowsPerPage, paginatedData.length)} of {filteredDepartments.length} results
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           component="div"
//           count={filteredDepartments.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//               color: primaryColor,
//             },
//             "& .MuiSvgIcon-root": {
//               color: primaryColor,
//             },
//           }}
//         />
//       </Box>

//       {/* Add/Edit Dialogs */}
//       <Dialog open={open || editOpen} onClose={editOpen ? handleEditClose : handleClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: primaryColor, fontWeight: "bold", fontSize: '2rem' }}>
//           {editOpen ? "Edit Department" : "Add New Department"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={editOpen ? editDepartment?.code : newDepartment.code}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, code: e.target.value })
//                 : setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={editOpen ? editDepartment?.name : newDepartment.name}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, name: e.target.value })
//                 : setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={editOpen ? editDepartment?.head : newDepartment.head}
//               onChange={(e) =>
//                 editOpen
//                   ? setEditDepartment({ ...editDepartment, head: e.target.value })
//                   : setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button
//             onClick={editOpen ? handleEditClose : handleClose}
//             sx={{ color: cancelButtonColor }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={editOpen ? handleEditDepartment : handleAddDepartment}
//             variant="contained"
//             disabled={submitting}
//             sx={{
//               backgroundColor: primaryColor,
//               "&:hover": { backgroundColor: primaryDarkColor },
//             }}
//           >
//             {submitting ? <CircularProgress size={24} sx={{ color: textColorOnPrimary }} /> : (editOpen ? "Save Changes" : "Save")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }





// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Skeleton,
//   Pagination, // <-- Replaced TablePagination with Pagination
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import Swal from "sweetalert2";

// // Consistent Theme-based Styling
// const primaryColor = "#8C257C";
// const primaryDarkColor = "#6d1d60";
// const secondaryColor = "#F58E35";
// const textColorOnPrimary = "#FFFFFF";
// const cancelButtonColor = "#757575";

// const StyledHeaderCell = (props) => (
//   <TableCell
//     {...props}
//     sx={{
//       backgroundColor: primaryColor,
//       color: textColorOnPrimary,
//       fontWeight: "bold",
//       whiteSpace: "nowrap",
//     }}
//   />
// );

// export default function Department() {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [editOpen, setEditOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [newDepartment, setNewDepartment] = useState({ name: "", code: "", head: "" });
//   const [editDepartment, setEditDepartment] = useState(null);

//   const [employeesDropdown, setEmployeesDropdown] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchDepartments = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/departments/");
//       const formattedData = response.data.map((dept) => ({
//         id: dept.department_id,
//         name: dept.department_name,
//         code: dept.department_code,
//         headId: dept.department_head,
//         headName: dept.department_head_name,
//       }));
//       setDepartments(formattedData);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch departments from the server.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEmployeesDropdown = async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get("/employee-dropdown/");
//       setEmployeesDropdown(response.data || []);
//     } catch (error) {
//       console.error("Error fetching employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employees.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchEmployeesDropdown();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   // --- START: Updated Pagination Handlers ---
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   // --- END: Updated Pagination Handlers ---

//   const filteredDepartments = departments.filter(
//     (department) =>
//       department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.headName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       department?.code?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredDepartments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // --- START: Calculation for 'Showing X to Y' text ---
//   const startEntry = filteredDepartments.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredDepartments.length);
//   // --- END: Calculation for 'Showing X to Y' text ---

//   const handleOpen = () => {
//     setNewDepartment({ name: "", code: "", head: "" });
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const handleEditOpen = (department) => {
//     const headEmployee = employeesDropdown.find(
//       (emp) => emp.value === department.headId?.toString()
//     );

//     setEditDepartment({
//       id: department.id,
//       name: department.name,
//       code: department.code || "",
//       head: headEmployee ? headEmployee.emp_id : "",
//     });
//     setEditOpen(true);
//   };
//   const handleEditClose = () => {
//     setEditDepartment(null);
//     setEditOpen(false);
//   };

//   const handleAddDepartment = async () => {
//     if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill all required fields.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     try {
//       const payload = {
//         department_name: newDepartment.name.trim(),
//         department_code: newDepartment.code.trim(),
//         company_id: 2,
//         department_head: newDepartment.head,
//         added_by: 3,
//       };
//       await axiosInstance.post("/departments/", payload);
//       fetchDepartments();
//       handleClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Added",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error adding department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: "Failed to add department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEditDepartment = async () => {
//     if (!editDepartment || !editDepartment.name.trim() || !editDepartment.code.trim() || !editDepartment.head) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please ensure all fields are filled correctly.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setSubmitting(true);
//     const updatedData = {
//       department_name: editDepartment.name.trim(),
//       department_code: editDepartment.code.trim(),
//       company_id: 2,
//       department_head: editDepartment.head,
//       added_by: 3,
//     };
//     try {
//       await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData);
//       fetchDepartments();
//       handleEditClose();
//       Swal.fire({
//         icon: "success",
//         title: "Department Updated",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       console.error("Error updating department:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Error",
//         text: "Failed to update department. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteDepartment = (department) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert this!`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/departments/${department.id}/`);
//           fetchDepartments();
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Department "${department.name}" has been deleted.`,
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         } catch (error) {
//           console.error("Error deleting department:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Deletion Error",
//             text: "Failed to delete department.",
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const renderSkeletons = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
//         <TableCell align="center" sx={{ py: 2 }}>
//           <Skeleton variant="rectangular" width={70} height={30} />
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
//         Department
//       </Typography>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         gap={2}
//         mb={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpen}
//           sx={{
//             backgroundColor: primaryColor,
//             color: textColorOnPrimary,
//             "&:hover": { backgroundColor: primaryDarkColor },
//             alignSelf: isMobile ? "stretch" : "auto",
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//         />
//       </Box>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table stickyHeader size="small">
//           <TableHead>
//             <TableRow>
//               <StyledHeaderCell>SR. NO.</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. CODE</StyledHeaderCell>
//               <StyledHeaderCell>DEPT. NAME</StyledHeaderCell>
//               <StyledHeaderCell>HEAD</StyledHeaderCell>
//               <StyledHeaderCell align="center">ACTIONS</StyledHeaderCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               renderSkeletons()
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((department, index) => (
//                 <TableRow key={department.id} hover>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.code || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.name}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.headName || "N/A"}</TableCell>
//                   <TableCell sx={{ py: 2 }}>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() => handleEditOpen(department)}
//                         size="small"
//                         sx={{ color: secondaryColor }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteDepartment(department)}
//                         size="small"
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
//                   No departments found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* START: New Styled Pagination */}
//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
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
//                               value={rowsPerPage}
//                               onChange={handleChangeRowsPerPage}
//                               sx={{
//                                   backgroundColor: primaryColor,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   '&:hover': { backgroundColor: primaryDarkColor },
//                                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                   '& .MuiSvgIcon-root': { color: 'white' },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                          {`Showing ${startEntry} to ${endEntry} of ${filteredDepartments.length} results`}
//                       </Typography>
//                   </Box>
//                   <Pagination
//                       count={Math.ceil(filteredDepartments.length / rowsPerPage)}
//                       page={page + 1}
//                       onChange={handlePaginationChange}
//                       showFirstButton showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: 'white' },
//                           '& .MuiPaginationItem-page': {
//                               color: primaryColor,
//                               '&.Mui-selected': {
//                                   backgroundColor: primaryColor,
//                                   color: 'white',
//                                   '&:hover': { backgroundColor: secondaryColor }
//                               },
//                           },
//                            '& .MuiPaginationItem-icon': { color: primaryColor }
//                       }}
//                   />
//               </Box>
//           )}
//         </Box>
//         {/* END: New Styled Pagination */}

//       {/* Add/Edit Dialogs */}
//       <Dialog open={open || editOpen} onClose={editOpen ? handleEditClose : handleClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: primaryColor, fontWeight: "bold", fontSize: '2rem' }}>
//           {editOpen ? "Edit Department" : "Add New Department"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Department Code"
//             value={editOpen ? editDepartment?.code : newDepartment.code}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, code: e.target.value })
//                 : setNewDepartment({ ...newDepartment, code: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <TextField
//             fullWidth
//             label="Department Name"
//             value={editOpen ? editDepartment?.name : newDepartment.name}
//             onChange={(e) =>
//               editOpen
//                 ? setEditDepartment({ ...editDepartment, name: e.target.value })
//                 : setNewDepartment({ ...newDepartment, name: e.target.value })
//             }
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Department Head</InputLabel>
//             <Select
//               label="Department Head"
//               value={editOpen ? editDepartment?.head : newDepartment.head}
//               onChange={(e) =>
//                 editOpen
//                   ? setEditDepartment({ ...editDepartment, head: e.target.value })
//                   : setNewDepartment({ ...newDepartment, head: e.target.value })
//               }
//               disabled={loadingEmployeesDropdown}
//             >
//               <MenuItem value="">
//                 <em>
//                   {loadingEmployeesDropdown ? (
//                     <CircularProgress size={20} />
//                   ) : (
//                     employeesDropdownError || "Select Head"
//                   )}
//                 </em>
//               </MenuItem>
//               {!loadingEmployeesDropdown &&
//                 !employeesDropdownError &&
//                 employeesDropdown.map((emp) => (
//                   <MenuItem key={emp.emp_id} value={emp.emp_id}>
//                     {emp.label}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button
//             onClick={editOpen ? handleEditClose : handleClose}
//             sx={{ color: cancelButtonColor }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={editOpen ? handleEditDepartment : handleAddDepartment}
//             variant="contained"
//             disabled={submitting}
//             sx={{
//               backgroundColor: primaryColor,
//               "&:hover": { backgroundColor: primaryDarkColor },
//             }}
//           >
//             {submitting ? <CircularProgress size={24} sx={{ color: textColorOnPrimary }} /> : (editOpen ? "Save Changes" : "Save")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }



import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Skeleton,
  Pagination,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const primaryColor = "#8C257C";
const primaryDarkColor = "#6d1d60";
const secondaryColor = "#F58E35";
const textColorOnPrimary = "#FFFFFF";
const cancelButtonColor = "#757575";

const StyledHeaderCell = (props) => (
  <TableCell
    {...props}
    sx={{
      backgroundColor: primaryColor,
      color: textColorOnPrimary,
      fontWeight: "bold",
      whiteSpace: "nowrap",
    }}
  />
);

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newDepartment, setNewDepartment] = useState({ name: "", code: "", head: "" });
  const [editDepartment, setEditDepartment] = useState(null);

  const [employeesDropdown, setEmployeesDropdown] = useState([]);
  const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
  const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/departments/");
      const formattedData = response.data.map((dept) => ({
        id: dept.department_id,
        name: dept.department_name,
        code: dept.department_code,
        headId: dept.department_head,
        headName: dept.department_head_name,
      }));
      setDepartments(formattedData);
    } catch (error) {
      console.error("Error fetching departments:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Error",
        text: "Could not fetch departments from the server.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesDropdown = async () => {
    setLoadingEmployeesDropdown(true);
    setEmployeesDropdownError(null);
    try {
      const response = await axiosInstance.get("/employee-dropdown/");
      setEmployeesDropdown(response.data || []);
    } catch (error) {
      console.error("Error fetching employees dropdown:", error);
      setEmployeesDropdownError("Failed to load employees.");
    } finally {
      setLoadingEmployeesDropdown(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployeesDropdown();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDepartments = departments.filter(
    (department) =>
      department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department?.headName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department?.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredDepartments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const startEntry = filteredDepartments.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredDepartments.length);

  const handleOpen = () => {
    setNewDepartment({ name: "", code: "", head: "" });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleEditOpen = (department) => {
    const headEmployee = employeesDropdown.find(
      (emp) => emp.value === department.headId?.toString()
    );

    setEditDepartment({
      id: department.id,
      name: department.name,
      code: department.code || "",
      head: headEmployee ? headEmployee.emp_id : "",
    });
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditDepartment(null);
    setEditOpen(false);
  };

  const handleAddDepartment = async () => {
    if (!newDepartment.name.trim() || !newDepartment.code.trim() || !newDepartment.head) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all required fields.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        department_name: newDepartment.name.trim(),
        department_code: newDepartment.code.trim(),
        company_id: 2,
        department_head: newDepartment.head,
        added_by: 3,
      };
      await axiosInstance.post("/departments/", payload);
      fetchDepartments();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Department Added",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding department:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "Failed to add department. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditDepartment = async () => {
    if (!editDepartment || !editDepartment.name.trim() || !editDepartment.code.trim() || !editDepartment.head) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please ensure all fields are filled correctly.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setSubmitting(true);
    const updatedData = {
      department_name: editDepartment.name.trim(),
      department_code: editDepartment.code.trim(),
      company_id: 2,
      department_head: editDepartment.head,
      added_by: 3,
    };
    try {
      await axiosInstance.patch(`/departments/${editDepartment.id}/`, updatedData);
      fetchDepartments();
      handleEditClose();
      Swal.fire({
        icon: "success",
        title: "Department Updated",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating department:", error);
      Swal.fire({
        icon: "error",
        title: "Update Error",
        text: "Failed to update department. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDepartment = (department) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/departments/${department.id}/`);
          fetchDepartments();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `Department "${department.name}" has been deleted.`,
            timer: 3000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting department:", error);
          Swal.fire({
            icon: "error",
            title: "Deletion Error",
            text: "Failed to delete department.",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const renderSkeletons = () => {
    return Array.from(new Array(rowsPerPage)).map((_, index) => (
      <TableRow key={index}>
        <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
        <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
        <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
        <TableCell sx={{ py: 2 }}><Skeleton variant="text" /></TableCell>
        <TableCell align="center" sx={{ py: 2 }}>
          <Skeleton variant="rectangular" width={70} height={30} />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
        Department
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={isMobile ? "column" : "row"}
        gap={2}
        mb={2}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: primaryColor,
            color: textColorOnPrimary,
            "&:hover": { backgroundColor: primaryDarkColor },
            alignSelf: isMobile ? "stretch" : "auto",
          }}
        >
          Add New
        </Button>
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={handleSearch}
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

      <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledHeaderCell>SR. NO.</StyledHeaderCell>
              <StyledHeaderCell>DEPT. CODE</StyledHeaderCell>
              <StyledHeaderCell>DEPT. NAME</StyledHeaderCell>
              <StyledHeaderCell>HEAD</StyledHeaderCell>
              <StyledHeaderCell align="center">ACTIONS</StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              renderSkeletons()
            ) : paginatedData.length > 0 ? (
              paginatedData.map((department, index) => (
                <TableRow key={department.id} hover>
                  <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.code || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.name}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem", py: 2 }}>{department.headName || "N/A"}</TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <IconButton
                        onClick={() => handleEditOpen(department)}
                        size="small"
                        sx={{ color: secondaryColor }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteDepartment(department)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
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
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                              sx={{
                                  backgroundColor: primaryColor,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: primaryDarkColor },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${filteredDepartments.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredDepartments.length / rowsPerPage)}
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
          )}
        </Box>

      <Dialog open={open || editOpen} onClose={editOpen ? handleEditClose : handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: primaryColor, fontWeight: "bold", fontSize: '2rem' }}>
          {editOpen ? "Edit Department" : "Add New Department"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Department Code"
            value={editOpen ? editDepartment?.code : newDepartment.code}
            onChange={(e) =>
              editOpen
                ? setEditDepartment({ ...editDepartment, code: e.target.value })
                : setNewDepartment({ ...newDepartment, code: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Department Name"
            value={editOpen ? editDepartment?.name : newDepartment.name}
            onChange={(e) =>
              editOpen
                ? setEditDepartment({ ...editDepartment, name: e.target.value })
                : setNewDepartment({ ...newDepartment, name: e.target.value })
            }
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Department Head</InputLabel>
            <Select
              label="Department Head"
              value={editOpen ? editDepartment?.head : newDepartment.head}
              onChange={(e) =>
                editOpen
                  ? setEditDepartment({ ...editDepartment, head: e.target.value })
                  : setNewDepartment({ ...newDepartment, head: e.target.value })
              }
              disabled={loadingEmployeesDropdown}
            >
              <MenuItem value="">
                <em>
                  {loadingEmployeesDropdown ? (
                    <CircularProgress size={20} />
                  ) : (
                    employeesDropdownError || "Select Head"
                  )}
                </em>
              </MenuItem>
              {!loadingEmployeesDropdown &&
                !employeesDropdownError &&
                employeesDropdown.map((emp) => (
                  <MenuItem key={emp.emp_id} value={emp.emp_id}>
                    {emp.label} ({emp.emp_id})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={editOpen ? handleEditClose : handleClose}
            sx={{ color: cancelButtonColor }}
          >
            Cancel
          </Button>
          <Button
            onClick={editOpen ? handleEditDepartment : handleAddDepartment}
            variant="contained"
            disabled={submitting}
            sx={{
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: primaryDarkColor },
            }}
          >
            {submitting ? <CircularProgress size={24} sx={{ color: textColorOnPrimary }} /> : (editOpen ? "Save Changes" : "Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}