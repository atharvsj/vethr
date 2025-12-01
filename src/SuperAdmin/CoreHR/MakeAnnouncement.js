
// // // import { useState, useEffect, useRef } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   TextField,
// // //   Button,
// // //   Paper,
// // //   Grid,
// // //   Table,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   TableCell,
// // //   TableBody,
// // //   IconButton,
// // //   Checkbox,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // //   Chip,
// // //   OutlinedInput,
// // //   ListItemText,
// // //   Divider,
// // // } from "@mui/material";
// // // import {
// // //   Search as SearchIcon,
// // //   Edit as EditIcon,
// // //   Delete as DeleteIcon,
// // //   Person as PersonIcon,
// // //   Group as GroupIcon,
// // // } from "@mui/icons-material";
// // // import axios from "axios";

// // // const MakeAnnouncement = () => {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [employees, setEmployees] = useState([]);
// // //   const [selectedEmployees, setSelectedEmployees] = useState([]);
// // //   const [departments, setDepartments] = useState([]);
// // //   const [selectedDepartment, setSelectedDepartment] = useState("");
// // //   const [title, setTitle] = useState("");
// // //   const [startDate, setStartDate] = useState("");
// // //   const [endDate, setEndDate] = useState("");
// // //   const [summary, setSummary] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [isActive, setIsActive] = useState(false);
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [announcements, setAnnouncements] = useState([]);

// // //   // Already existing (assumed)
// // //   const companyId = 101;
// // //   const publishedBy = 3;

// // //   useEffect(() => {
// // //     const fetchEmployees = async () => {
// // //       try {
// // //         const token = localStorage.getItem("accessToken");
// // //         const response = await axios.get(
// // //           "https://tdtlworld.com/hrms-backend/employee-dropdown/",
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           }
// // //         );
// // //         setEmployees(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching employees:", error);
// // //       }
// // //     };

// // //     fetchEmployees();
// // //   }, []);

// // //   const handleEmployeeChange = (event) => {
// // //     setSelectedEmployees(event.target.value);
// // //   };

// // //   useEffect(() => {
// // //     const fetchDepartments = async () => {
// // //       try {
// // //         const token = localStorage.getItem("accessToken");
// // //         const response = await axios.get(
// // //           "https://tdtlworld.com/hrms-backend/departments/",
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           }
// // //         );
// // //         setDepartments(response.data);
// // //       } catch (error) {
// // //         console.error("Error fetching departments:", error);
// // //       }
// // //     };

// // //     fetchDepartments();
// // //   }, []);

// // //   const handleDepartmentChange = (event) => {
// // //     setSelectedDepartment(event.target.value);
// // //   };

// // //   const fetchAnnouncements = async () => {
// // //     try {
// // //       const token = localStorage.getItem("accessToken");
// // //       const response = await axios.get(
// // //         "https://tdtlworld.com/hrms-backend/announcements/",
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       const sortedAnnouncements = [...response.data.data].sort((a, b) => {
// // //         return b.announcement_id - a.announcement_id;
// // //       });

// // //       setAnnouncements(sortedAnnouncements);
// // //     } catch (error) {
// // //       console.error("Error fetching announcements:", error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAnnouncements();
// // //   }, []);

// // //   const handleAddAnnouncement = async () => {
// // //     try {
// // //       const token = localStorage.getItem("accessToken");

// // //       const payload = {
// // //         employee_id: selectedEmployees,
// // //         company_id: companyId,
// // //         department_id: selectedDepartment,
// // //         title: title,
// // //         start_date: startDate,
// // //         end_date: endDate,
// // //         published_by: publishedBy,
// // //         summary: summary,
// // //         description: description,
// // //         is_active: isActive,
// // //       };

// // //       const response = await axios.post(
// // //         "https://tdtlworld.com/hrms-backend/announcements/",
// // //         payload,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       console.log("Announcement added:", response.data);
// // //       alert("Announcement added successfully!");
// // //       fetchAnnouncements();
// // //       resetForm();
// // //     } catch (error) {
// // //       console.error("Error adding announcement:", error);
// // //       alert("Failed to add announcement. Please check the form.");
// // //     }
// // //   };

// // //   const formRef = useRef(null);

// // //   const handleEditAnnouncement = (announcement) => {
// // //     console.log("Editing announcement:", announcement);

// // //     // Find the department_id by matching department_name
// // //     const matchedDepartment = departments.find(
// // //       (dept) => dept.department_name === announcement.department_name
// // //     );

// // //     setSelectedDepartment(
// // //       matchedDepartment ? matchedDepartment.department_id : ""
// // //     );
// // //     setTitle(announcement.title);
// // //     // setStartDate(announcement.start_date);
// // //     //setEndDate(announcement.end_date);
// // //     setSummary(announcement.summary);
// // //     setDescription(announcement.description);
// // //     setIsActive(announcement.is_active);
// // //     setEditingId(announcement.announcement_id);

// // //     setStartDate(
// // //       announcement.start_date ? announcement.start_date.split("T")[0] : ""
// // //     );
// // //     setEndDate(
// // //       announcement.end_date ? announcement.end_date.split("T")[0] : ""
// // //     );

// // //     // Extract employee names and trim spaces
// // //     const employeeNames = announcement.employee_name
// // //       .split(",")
// // //       .map((name) => name.trim());

// // //     // Match names to employee IDs using the 'employees' list
// // //     const matchedEmployeeIds = employees
// // //       .filter((emp) => employeeNames.includes(emp.label.trim()))
// // //       .map((emp) => emp.value);

// // //     setSelectedEmployees(matchedEmployeeIds);

// // //     // Scroll to form
// // //     formRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   };

// // //   const handleUpdateAnnouncement = async () => {
// // //     try {
// // //       const token = localStorage.getItem("accessToken");

// // //       const payload = {
// // //         employee_id: selectedEmployees,
// // //         company_id: companyId,
// // //         department_id: selectedDepartment,
// // //         title,
// // //         start_date: startDate,
// // //         end_date: endDate,
// // //         published_by: publishedBy,
// // //         summary,
// // //         description,
// // //         is_active: isActive,
// // //       };

// // //       const response = await axios.patch(
// // //         `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
// // //         payload,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       console.log("Announcement updated:", response.data);
// // //       alert("Announcement updated successfully!");
// // //       fetchAnnouncements();
// // //       resetForm();
// // //     } catch (error) {
// // //       console.error("Error updating announcement:", error);
// // //       alert("Failed to update announcement.");
// // //     }
// // //   };

// // //   const handleDeleteAnnouncement = async (id) => {
// // //     const confirmed = window.confirm(
// // //       "Are you sure you want to delete this announcement?"
// // //     );
// // //     if (!confirmed) return;

// // //     try {
// // //       const token = localStorage.getItem("accessToken");

// // //       const response = await axios.delete(
// // //         `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );

// // //       console.log("Announcement deleted:", response.data);
// // //       alert("Announcement deleted successfully!");
// // //       fetchAnnouncements();
// // //     } catch (error) {
// // //       console.error("Error deleting announcement:", error);
// // //       alert("Failed to delete announcement.");
// // //     }
// // //   };

// // //   const resetForm = () => {
// // //     setTitle("");
// // //     setStartDate("");
// // //     setEndDate("");
// // //     setSummary("");
// // //     setDescription("");
// // //     setIsActive(false);
// // //     setSelectedDepartment("");
// // //     setSelectedEmployees([]);
// // //     setEditingId(null);
// // //   };

// // //   const filteredAnnouncements = announcements.filter((item) => {
// // //     const search = searchTerm.toLowerCase();
// // //     return (
// // //       (item.title?.toLowerCase() || "").includes(search) ||
// // //       (item.department_name?.toLowerCase() || "").includes(search) ||
// // //       (item.description?.toLowerCase() || "").includes(search) ||
// // //       (item.employee_name?.toLowerCase() || "").includes(search)
// // //     );
// // //   });

// // //   return (
// // //     <Box sx={{ mt: 2 }}>
// // //       <Typography variant="h4" gutterBottom ref={formRef}>
// // //         Make Announcement
// // //       </Typography>

// // //       <Paper sx={{ p: 3, mb: 3 }}>
// // //         <Typography variant="h6" gutterBottom>
// // //           Add New Announcement
// // //         </Typography>

// // //         <Grid container spacing={2}>
// // //           <Grid item xs={12} sm={6}>
// // //             <FormControl fullWidth>
// // //               <InputLabel>Department</InputLabel>
// // //               <Select
// // //                 label="Department"
// // //                 value={selectedDepartment}
// // //                 onChange={handleDepartmentChange}
// // //               >
// // //                 {departments.map((dept) => (
// // //                   <MenuItem key={dept.department_id} value={dept.department_id}>
// // //                     {dept.department_name}
// // //                   </MenuItem>
// // //                 ))}
// // //               </Select>
// // //             </FormControl>
// // //           </Grid>

// // //           <Grid item xs={12} sm={6}>
// // //             <TextField
// // //               fullWidth
// // //               label="Announcement Title"
// // //               value={title}
// // //               onChange={(e) => setTitle(e.target.value)}
// // //             />
// // //           </Grid>

// // //           <Grid item xs={12} sm={6}>
// // //             <TextField
// // //               fullWidth
// // //               type="date"
// // //               label="Start Date"
// // //               InputLabelProps={{ shrink: true }}
// // //               value={startDate}
// // //               onChange={(e) => setStartDate(e.target.value)}
// // //             />
// // //           </Grid>

// // //           <Grid item xs={12} sm={6}>
// // //             <TextField
// // //               fullWidth
// // //               type="date"
// // //               label="End Date"
// // //               InputLabelProps={{ shrink: true }}
// // //               value={endDate}
// // //               onChange={(e) => setEndDate(e.target.value)}
// // //             />
// // //           </Grid>

// // //           <Grid item xs={12}>
// // //             <TextField
// // //               fullWidth
// // //               label="Summary"
// // //               value={summary}
// // //               onChange={(e) => setSummary(e.target.value)}
// // //             />
// // //           </Grid>

// // //           <Grid item xs={12}>
// // //             <TextField
// // //               fullWidth
// // //               label="Announcement Description"
// // //               multiline
// // //               rows={1}
// // //               value={description}
// // //               onChange={(e) => setDescription(e.target.value)}
// // //             />
// // //           </Grid>

// // //           <Grid item xs={12}>
// // //             <label>
// // //               <Checkbox
// // //                 checked={isActive}
// // //                 onChange={(e) => setIsActive(e.target.checked)}
// // //               />
// // //               Active
// // //             </label>
// // //           </Grid>

// // //           {/* Employee Selection Section */}
// // //           <Grid item xs={12}>
// // //             <Divider sx={{ my: 2 }} />
// // //             <Typography variant="h6" gutterBottom>
// // //               Employee Selection
// // //             </Typography>
// // //           </Grid>

// // //           <Grid item xs={12}>
// // //             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// // //               <Button
// // //                 variant="outlined"
// // //                 startIcon={<GroupIcon />}
// // //                 sx={{ mr: 2 }}
// // //                 onClick={() => {
// // //                   if (selectedEmployees.length === employees.length) {
// // //                     setSelectedEmployees([]); // Unselect all
// // //                   } else {
// // //                     const allIds = employees.map((emp) => emp.value); // Select all
// // //                     setSelectedEmployees(allIds);
// // //                   }
// // //                 }}
// // //               >
// // //                 {selectedEmployees.length === employees.length
// // //                   ? "Unselect All Employees"
// // //                   : "Select All Employees"}
// // //               </Button>

// // //               <Typography variant="body2" color="text.secondary">
// // //                 {selectedEmployees.length} of {employees.length} employees
// // //                 selected
// // //               </Typography>
// // //             </Box>

// // //             <FormControl fullWidth>
// // //               <InputLabel id="employee-select-label">
// // //                 Select Employees
// // //               </InputLabel>
// // //               <Select
// // //                 labelId="employee-select-label"
// // //                 id="employee-select"
// // //                 multiple
// // //                 value={selectedEmployees}
// // //                 onChange={handleEmployeeChange}
// // //                 input={<OutlinedInput label="Select Employees" />}
// // //                 renderValue={(selected) => (
// // //                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
// // //                     {selected.map((id) => {
// // //                       const emp = employees.find((e) => e.value === id);
// // //                       return (
// // //                         <Chip
// // //                           key={id}
// // //                           label={emp ? emp.label : `Employee ${id}`}
// // //                           size="small"
// // //                         />
// // //                       );
// // //                     })}
// // //                   </Box>
// // //                 )}
// // //               >
// // //                 {employees.map((emp) => (
// // //                   <MenuItem key={emp.value} value={emp.value}>
// // //                     <Checkbox
// // //                       checked={selectedEmployees.indexOf(emp.value) > -1}
// // //                     />
// // //                     <ListItemText primary={emp.label} secondary={emp.email} />
// // //                   </MenuItem>
// // //                 ))}
// // //               </Select>
// // //             </FormControl>
// // //           </Grid>

// // //           <Grid item xs={12}>
// // //             <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
// // //               <Button
// // //                 variant="contained"
// // //                 //color={editingId ? "warning" : "primary"}
// // //                 color={"primary"}
// // //                 onClick={
// // //                   editingId ? handleUpdateAnnouncement : handleAddAnnouncement
// // //                 }
// // //               >
// // //                 {editingId ? "Update Announcement" : "Add Announcement"}
// // //               </Button>

// // //               <Button variant="outlined" onClick={resetForm}>
// // //                 Cancel
// // //               </Button>
// // //             </Box>
// // //           </Grid>
// // //         </Grid>
// // //       </Paper>

// // //       <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
// // //         <SearchIcon />
// // //         <TextField
// // //           fullWidth
// // //           placeholder="Search Announcements"
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //         />
// // //       </Box>

// // //       <TableContainer component={Paper}>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Title</TableCell>
// // //               <TableCell>Department</TableCell>
// // //               <TableCell>Announcement Text</TableCell>
// // //               <TableCell>Employees</TableCell>
// // //               <TableCell>Actions</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {filteredAnnouncements.map((item) => (
// // //               <TableRow key={item.announcement_id}>
// // //                 <TableCell>{item.title}</TableCell>
// // //                 <TableCell>{item.department_name}</TableCell>
// // //                 <TableCell>{item.description}</TableCell>
// // //                 <TableCell>
// // //                   {item.employee_name ? (
// // //                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
// // //                       {item.employee_name.split(",").map((name, idx) => (
// // //                         <Chip
// // //                           key={idx}
// // //                           label={name.trim()}
// // //                           icon={<PersonIcon />}
// // //                           size="small"
// // //                         />
// // //                       ))}
// // //                     </Box>
// // //                   ) : (
// // //                     <Typography variant="body2" color="text.secondary">
// // //                       No employees selected
// // //                     </Typography>
// // //                   )}
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <IconButton
// // //                     color="primary"
// // //                     onClick={() => handleEditAnnouncement(item)}
// // //                   >
// // //                     <EditIcon />
// // //                   </IconButton>
// // //                   <IconButton
// // //                     color="error"
// // //                     onClick={() =>
// // //                       handleDeleteAnnouncement(item.announcement_id)
// // //                     }
// // //                   >
// // //                     <DeleteIcon />
// // //                   </IconButton>
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     </Box>
// // //   );
// // // };

// // // export default MakeAnnouncement;


// // import { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   Paper,
// //   Grid,
// //   Table,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// // } from "@mui/material";
// // import {
// //   Search as SearchIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Add as AddIcon,
// // } from "@mui/icons-material";
// // import axios from "axios";

// // const MakeAnnouncement = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [departments, setDepartments] = useState([]);
// //   const [announcements, setAnnouncements] = useState([]);
// //   const [dialogOpen, setDialogOpen] = useState(false);

// //   // Form State
// //   const [selectedDepartment, setSelectedDepartment] = useState("");
// //   const [title, setTitle] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [summary, setSummary] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [editingId, setEditingId] = useState(null);

// //   // Hardcoded values (as in original code)
// //   const companyId = 101;
// //   const publishedBy = 3;

// //   // Fetch departments for the dropdown
// //   useEffect(() => {
// //     const fetchDepartments = async () => {
// //       try {
// //         const token = localStorage.getItem("accessToken");
// //         const response = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/departments/",
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setDepartments(response.data);
// //       } catch (error) {
// //         console.error("Error fetching departments:", error);
// //       }
// //     };
// //     fetchDepartments();
// //   }, []);

// //   // Fetch all announcements
// //   const fetchAnnouncements = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       const response = await axios.get(
// //         "https://tdtlworld.com/hrms-backend/announcements/",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       // Sort by newest first
// //       const sortedAnnouncements = [...response.data.data].sort(
// //         (a, b) => b.announcement_id - a.announcement_id
// //       );
// //       setAnnouncements(sortedAnnouncements);
// //     } catch (error) {
// //       console.error("Error fetching announcements:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAnnouncements();
// //   }, []);

// //   // Reset form fields
// //   const resetForm = () => {
// //     setTitle("");
// //     setStartDate("");
// //     setEndDate("");
// //     setSummary("");
// //     setDescription("");
// //     setSelectedDepartment("");
// //     setEditingId(null);
// //   };

// //   // Open dialog for adding
// //   const handleOpenAddDialog = () => {
// //     resetForm();
// //     setDialogOpen(true);
// //   };

// //   // Open dialog for editing
// //   const handleOpenEditDialog = (announcement) => {
// //     setEditingId(announcement.announcement_id);
// //     const matchedDepartment = departments.find(
// //       (dept) => dept.department_name === announcement.department_name
// //     );
// //     setSelectedDepartment(matchedDepartment ? matchedDepartment.department_id : "");
// //     setTitle(announcement.title);
// //     setSummary(announcement.summary);
// //     setDescription(announcement.description);
// //     // Format dates for the date input field
// //     setStartDate(announcement.start_date ? announcement.start_date.split("T")[0] : "");
// //     setEndDate(announcement.end_date ? announcement.end_date.split("T")[0] : "");
// //     setDialogOpen(true);
// //   };

// //   // Close dialog and reset form
// //   const handleCloseDialog = () => {
// //     setDialogOpen(false);
// //     resetForm();
// //   };

// //   // Handle save (either add or update)
// //   const handleSave = () => {
// //     if (editingId) {
// //       handleUpdateAnnouncement();
// //     } else {
// //       handleAddAnnouncement();
// //     }
// //   };

// //   const handleAddAnnouncement = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       const payload = {
// //         company_id: companyId,
// //         department_id: selectedDepartment,
// //         title,
// //         start_date: startDate,
// //         end_date: endDate,
// //         published_by: publishedBy,
// //         summary,
// //         description,
// //       };
// //       await axios.post(
// //         "https://tdtlworld.com/hrms-backend/announcements/",
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Announcement added successfully!");
// //       fetchAnnouncements();
// //       handleCloseDialog();
// //     } catch (error) {
// //       console.error("Error adding announcement:", error);
// //       alert("Failed to add announcement. Please check the form.");
// //     }
// //   };

// //   const handleUpdateAnnouncement = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       const payload = {
// //         company_id: companyId,
// //         department_id: selectedDepartment,
// //         title,
// //         start_date: startDate,
// //         end_date: endDate,
// //         published_by: publishedBy,
// //         summary,
// //         description,
// //       };
// //       await axios.patch(
// //         `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Announcement updated successfully!");
// //       fetchAnnouncements();
// //       handleCloseDialog();
// //     } catch (error) {
// //       console.error("Error updating announcement:", error);
// //       alert("Failed to update announcement.");
// //     }
// //   };

// //   const handleDeleteAnnouncement = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this announcement?")) return;
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       await axios.delete(
// //         `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Announcement deleted successfully!");
// //       fetchAnnouncements();
// //     } catch (error) {
// //       console.error("Error deleting announcement:", error);
// //       alert("Failed to delete announcement.");
// //     }
// //   };

// //   const filteredAnnouncements = announcements.filter((item) => {
// //     const search = searchTerm.toLowerCase();
// //     return (
// //       (item.title?.toLowerCase() || "").includes(search) ||
// //       (item.department_name?.toLowerCase() || "").includes(search) ||
// //       (item.description?.toLowerCase() || "").includes(search)
// //     );
// //   });

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// //         <Typography variant="h4">Announcements</Typography>
// //         <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
// //           Add New Announcement
// //         </Button>
// //       </Box>

// //       <Paper sx={{p: 2, mb: 3}}>
// //         <TextField
// //             fullWidth
// //             placeholder="Search Announcements by Title, Department, or Description"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             InputProps={{
// //                 startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
// //             }}
// //         />
// //       </Paper>

// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
// //             <TableRow>
// //               <TableCell><strong>Title</strong></TableCell>
// //               <TableCell><strong>Department</strong></TableCell>
// //               <TableCell><strong>Description</strong></TableCell>
// //               <TableCell align="center"><strong>Actions</strong></TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {filteredAnnouncements.length > 0 ? (
// //                 filteredAnnouncements.map((item) => (
// //                 <TableRow key={item.announcement_id}>
// //                   <TableCell>{item.title}</TableCell>
// //                   <TableCell>{item.department_name}</TableCell>
// //                   <TableCell>{item.description}</TableCell>
// //                   <TableCell align="center">
// //                     <IconButton color="primary" onClick={() => handleOpenEditDialog(item)}>
// //                       <EditIcon />
// //                     </IconButton>
// //                     <IconButton color="error" onClick={() => handleDeleteAnnouncement(item.announcement_id)}>
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))
// //             ) : (
// //                 <TableRow>
// //                     <TableCell colSpan={4} align="center">No Announcements Found</TableCell>
// //                 </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Add/Edit Dialog */}
// //       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
// //         <DialogTitle>{editingId ? "Edit Announcement" : "Add New Announcement"}</DialogTitle>
// //         <DialogContent>
// //           <Grid container spacing={2} sx={{ mt: 1 }}>
// //             <Grid item xs={12} sm={6}>
// //               <FormControl fullWidth>
// //                 <InputLabel>Department</InputLabel>
// //                 <Select
// //                   label="Department"
// //                   value={selectedDepartment}
// //                   onChange={(e) => setSelectedDepartment(e.target.value)}
// //                 >
// //                   {departments.map((dept) => (
// //                     <MenuItem key={dept.department_id} value={dept.department_id}>
// //                       {dept.department_name}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Announcement Title"
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 type="date"
// //                 label="Start Date"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 type="date"
// //                 label="End Date"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={endDate}
// //                 onChange={(e) => setEndDate(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Summary"
// //                 value={summary}
// //                 onChange={(e) => setSummary(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Announcement Description"
// //                 multiline
// //                 rows={3}
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //               />
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2 }}>
// //           <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
// //           <Button onClick={handleSave} variant="contained" color="primary">
// //             {editingId ? "Update" : "Save"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default MakeAnnouncement;


// // import { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   Paper,
// //   Grid,
// //   Table,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   IconButton,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// // } from "@mui/material";
// // import {
// //   Search as SearchIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Add as AddIcon,
// // } from "@mui/icons-material";
// // import axios from "axios";

// // const MakeAnnouncement = () => {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [departments, setDepartments] = useState([]);
// //   const [announcements, setAnnouncements] = useState([]);
// //   const [dialogOpen, setDialogOpen] = useState(false);

// //   // Form State
// //   const [selectedDepartment, setSelectedDepartment] = useState("");
// //   const [title, setTitle] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [summary, setSummary] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [editingId, setEditingId] = useState(null);

// //   // Hardcoded values (as in original code)
// //   const companyId = 101;
// //   const publishedBy = 3;

// //   // Fetch departments for the dropdown
// //   useEffect(() => {
// //     const fetchDepartments = async () => {
// //       try {
// //         const token = localStorage.getItem("accessToken");
// //         const response = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/departments/",
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setDepartments(response.data);
// //       } catch (error) {
// //         console.error("Error fetching departments:", error);
// //       }
// //     };
// //     fetchDepartments();
// //   }, []);

// //   // Fetch all announcements
// //   const fetchAnnouncements = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       const response = await axios.get(
// //         "https://tdtlworld.com/hrms-backend/announcements/",
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       // Sort by newest first
// //       const sortedAnnouncements = [...response.data.data].sort(
// //         (a, b) => b.announcement_id - a.announcement_id
// //       );
// //       setAnnouncements(sortedAnnouncements);
// //     } catch (error) {
// //       console.error("Error fetching announcements:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAnnouncements();
// //   }, []);

// //   // Reset form fields
// //   const resetForm = () => {
// //     setTitle("");
// //     setStartDate("");
// //     setEndDate("");
// //     setSummary("");
// //     setDescription("");
// //     setSelectedDepartment("");
// //     setEditingId(null);
// //   };

// //   // Open dialog for adding
// //   const handleOpenAddDialog = () => {
// //     resetForm();
// //     setDialogOpen(true);
// //   };

// //   // Open dialog for editing
// //   const handleOpenEditDialog = (announcement) => {
// //     setEditingId(announcement.announcement_id);
// //     const matchedDepartment = departments.find(
// //       (dept) => dept.department_name === announcement.department_name
// //     );
// //     setSelectedDepartment(matchedDepartment ? matchedDepartment.department_id : "");
// //     setTitle(announcement.title);
// //     setSummary(announcement.summary);
// //     setDescription(announcement.description);
// //     // Format dates for the date input field
// //     setStartDate(announcement.start_date ? announcement.start_date.split("T")[0] : "");
// //     setEndDate(announcement.end_date ? announcement.end_date.split("T")[0] : "");
// //     setDialogOpen(true);
// //   };

// //   // Close dialog and reset form
// //   const handleCloseDialog = () => {
// //     setDialogOpen(false);
// //     resetForm();
// //   };

// //   // Handle save (either add or update)
// //   const handleSave = () => {
// //     if (editingId) {
// //       handleUpdateAnnouncement();
// //     } else {
// //       handleAddAnnouncement();
// //     }
// //   };

// //   const handleAddAnnouncement = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");

// //       // --- CHANGE 1: Find the department name from the selected ID ---
// //       const selectedDeptObject = departments.find(
// //         (dept) => dept.department_id === selectedDepartment
// //       );

// //       if (!selectedDeptObject) {
// //         alert("Please select a department.");
// //         return;
// //       }

// //       const payload = {
// //         company_id: companyId,
// //         department_name: selectedDeptObject.department_name, // Use the name here
// //         title,
// //         start_date: startDate,
// //         end_date: endDate,
// //         published_by: publishedBy,
// //         summary,
// //         description,
// //       };

// //       await axios.post(
// //         "https://tdtlworld.com/hrms-backend/announcements/",
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Announcement added successfully!");
// //       fetchAnnouncements();
// //       handleCloseDialog();
// //     } catch (error) {
// //       console.error("Error adding announcement:", error);
// //       alert("Failed to add announcement. Please check the form.");
// //     }
// //   };

// //   const handleUpdateAnnouncement = async () => {
// //     try {
// //       const token = localStorage.getItem("accessToken");

// //       // --- CHANGE 2: Find the department name from the selected ID ---
// //       const selectedDeptObject = departments.find(
// //         (dept) => dept.department_id === selectedDepartment
// //       );

// //       if (!selectedDeptObject) {
// //         alert("Please select a department.");
// //         return;
// //       }

// //       const payload = {
// //         company_id: companyId,
// //         department_name: selectedDeptObject.department_name, // Use the name here
// //         title,
// //         start_date: startDate,
// //         end_date: endDate,
// //         published_by: publishedBy,
// //         summary,
// //         description,
// //       };

// //       await axios.patch(
// //         `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Announcement updated successfully!");
// //       fetchAnnouncements();
// //       handleCloseDialog();
// //     } catch (error) {
// //       console.error("Error updating announcement:", error);
// //       alert("Failed to update announcement.");
// //     }
// //   };

// //   const handleDeleteAnnouncement = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this announcement?")) return;
// //     try {
// //       const token = localStorage.getItem("accessToken");
// //       await axios.delete(
// //         `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Announcement deleted successfully!");
// //       fetchAnnouncements();
// //     } catch (error) {
// //       console.error("Error deleting announcement:", error);
// //       alert("Failed to delete announcement.");
// //     }
// //   };

// //   const filteredAnnouncements = announcements.filter((item) => {
// //     const search = searchTerm.toLowerCase();
// //     return (
// //       (item.title?.toLowerCase() || "").includes(search) ||
// //       (item.department_name?.toLowerCase() || "").includes(search) ||
// //       (item.description?.toLowerCase() || "").includes(search)
// //     );
// //   });

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// //         <Typography variant="h4">Announcements</Typography>
// //         <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
// //           Add New Announcement
// //         </Button>
// //       </Box>

// //       <Paper sx={{p: 2, mb: 3}}>
// //         <TextField
// //             fullWidth
// //             placeholder="Search Announcements by Title, Department, or Description"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             InputProps={{
// //                 startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
// //             }}
// //         />
// //       </Paper>

// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
// //             <TableRow>
// //               <TableCell><strong>Title</strong></TableCell>
// //               <TableCell><strong>Department</strong></TableCell>
// //               <TableCell><strong>Description</strong></TableCell>
// //               <TableCell align="center"><strong>Actions</strong></TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {filteredAnnouncements.length > 0 ? (
// //                 filteredAnnouncements.map((item) => (
// //                 <TableRow key={item.announcement_id}>
// //                   <TableCell>{item.title}</TableCell>
// //                   <TableCell>{item.department_name}</TableCell>
// //                   <TableCell>{item.description}</TableCell>
// //                   <TableCell align="center">
// //                     <IconButton color="primary" onClick={() => handleOpenEditDialog(item)}>
// //                       <EditIcon />
// //                     </IconButton>
// //                     <IconButton color="error" onClick={() => handleDeleteAnnouncement(item.announcement_id)}>
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))
// //             ) : (
// //                 <TableRow>
// //                     <TableCell colSpan={4} align="center">No Announcements Found</TableCell>
// //                 </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Add/Edit Dialog */}
// //       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
// //         <DialogTitle>{editingId ? "Edit Announcement" : "Add New Announcement"}</DialogTitle>
// //         <DialogContent>
// //           <Grid container spacing={2} sx={{ mt: 1 }}>
// //             <Grid item xs={12} sm={6}>
// //               <FormControl fullWidth>
// //                 <InputLabel>Department</InputLabel>
// //                 <Select
// //                   label="Department"
// //                   value={selectedDepartment}
// //                   onChange={(e) => setSelectedDepartment(e.target.value)}
// //                 >
// //                   {departments.map((dept) => (
// //                     <MenuItem key={dept.department_id} value={dept.department_id}>
// //                       {dept.department_name}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Announcement Title"
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 type="date"
// //                 label="Start Date"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 type="date"
// //                 label="End Date"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={endDate}
// //                 onChange={(e) => setEndDate(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Summary"
// //                 value={summary}
// //                 onChange={(e) => setSummary(e.target.value)}
// //               />
// //             </Grid>
// //             <Grid item xs={12}>
// //               <TextField
// //                 fullWidth
// //                 label="Announcement Description"
// //                 multiline
// //                 rows={3}
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //               />
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2 }}>
// //           <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
// //           <Button onClick={handleSave} variant="contained" color="primary">
// //             {editingId ? "Update" : "Save"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default MakeAnnouncement;     ////// 



// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import axios from "axios";

// const MakeAnnouncement = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   // Form State
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [summary, setSummary] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // Pagination State
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Hardcoded values
//   const companyId = 101;
//   const publishedBy = 3;

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/departments/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const fetchAnnouncements = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const sortedAnnouncements = [...response.data.data].sort(
//         (a, b) => b.announcement_id - a.announcement_id
//       );
//       setAnnouncements(sortedAnnouncements);
//     } catch (error) {
//       console.error("Error fetching announcements:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const resetForm = () => {
//     setTitle("");
//     setStartDate("");
//     setEndDate("");
//     setSummary("");
//     setDescription("");
//     setSelectedDepartment("");
//     setEditingId(null);
//   };

//   const handleOpenAddDialog = () => {
//     resetForm();
//     setDialogOpen(true);
//   };

//   const handleOpenEditDialog = (announcement) => {
//     setEditingId(announcement.announcement_id);
//     const matchedDepartment = departments.find(
//       (dept) => dept.department_name === announcement.department_name
//     );
//     setSelectedDepartment(matchedDepartment ? matchedDepartment.department_id : "");
//     setTitle(announcement.title);
//     setSummary(announcement.summary);
//     setDescription(announcement.description);
//     setStartDate(announcement.start_date ? announcement.start_date.split("T")[0] : "");
//     setEndDate(announcement.end_date ? announcement.end_date.split("T")[0] : "");
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     resetForm();
//   };

//   const handleSave = () => {
//     if (editingId) {
//       handleUpdateAnnouncement();
//     } else {
//       handleAddAnnouncement();
//     }
//   };

//   const handleAddAnnouncement = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const selectedDeptObject = departments.find(
//         (dept) => dept.department_id === selectedDepartment
//       );
//       if (!selectedDeptObject) {
//         alert("Please select a department.");
//         return;
//       }

//       const payload = {
//         company_id: companyId,
//         department_name: selectedDeptObject.department_name,
//         title,
//         start_date: startDate,
//         end_date: endDate,
//         published_by: publishedBy,
//         summary,
//         description,
//       };

//       await axios.post(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement added successfully!");
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error adding announcement:", error);
//       alert("Failed to add announcement. Please check the form.");
//     }
//   };

//   const handleUpdateAnnouncement = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const selectedDeptObject = departments.find(
//         (dept) => dept.department_id === selectedDepartment
//       );

//       if (!selectedDeptObject) {
//         alert("Please select a department.");
//         return;
//       }

//       const payload = {
//         company_id: companyId,
//         department_name: selectedDeptObject.department_name,
//         title,
//         start_date: startDate,
//         end_date: endDate,
//         published_by: publishedBy,
//         summary,
//         description,
//       };

//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement updated successfully!");
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error updating announcement:", error);
//       alert("Failed to update announcement.");
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this announcement?")) return;
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement deleted successfully!");
//       fetchAnnouncements();
//     } catch (error) {
//       console.error("Error deleting announcement:", error);
//       alert("Failed to delete announcement.");
//     }
//   };

//   const filteredAnnouncements = announcements.filter((item) => {
//     const search = searchTerm.toLowerCase();
//     return (
//       (item.title?.toLowerCase() || "").includes(search) ||
//       (item.department_name?.toLowerCase() || "").includes(search) ||
//       (item.description?.toLowerCase() || "").includes(search)
//     );
//   });

//   const paginatedAnnouncements = useMemo(() =>
//     filteredAnnouncements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [filteredAnnouncements, page, rowsPerPage]
//   );
//   const totalPages = Math.ceil(filteredAnnouncements.length / rowsPerPage);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Announcements</Typography>
//         <Button variant="contained" sx={purpleButtonStyle} startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
//           Add New Announcement
//         </Button>
//       </Box>

//       <Paper sx={{ p: 2, mb: 3 }}>
//         <TextField
//           fullWidth
//           placeholder="Search Announcements by Title, Department, or Description"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(0);
//           }}
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//           }}
//         />
//       </Paper>

//       <Paper elevation={3} sx={{ p: 2 }}>
//         <Box sx={{ mb: 2 }}>
//           <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               label="Rows"
//               onChange={(e) => {
//                 setRowsPerPage(parseInt(e.target.value, 10));
//                 setPage(0);
//               }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <TableContainer>
//           {/* --- THIS IS THE KEY CHANGE --- */}
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', width: '80px' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Title</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Department</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Description</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedAnnouncements.length > 0 ? (
//                 paginatedAnnouncements.map((item, index) => (
//                   <TableRow key={item.announcement_id}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{item.title}</TableCell>
//                     <TableCell>{item.department_name}</TableCell>
//                     <TableCell>{item.description}</TableCell>
//                     <TableCell align="center">
//                       <IconButton sx={{ color: '#673ab7' }} onClick={() => handleOpenEditDialog(item)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDeleteAnnouncement(item.announcement_id)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">No Announcements Found</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {filteredAnnouncements.length > 0 && (
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//             <Button
//               variant="contained"
//               onClick={() => setPage(p => p - 1)}
//               disabled={page === 0}
//               sx={purpleButtonStyle}
//             >
//               Previous
//             </Button>
//             <Typography>
//               Page {page + 1} of {totalPages > 0 ? totalPages : 1}
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => setPage(p => p + 1)}
//               disabled={page >= totalPages - 1}
//               sx={purpleButtonStyle}
//             >
//               Next
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle>{editingId ? "Edit Announcement" : "Add New Announcement"}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   label="Department"
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem key={dept.department_id} value={dept.department_id}>
//                       {dept.department_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Announcement Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth type="date" label="Start Date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth type="date" label="End Date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField fullWidth label="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField fullWidth label="Announcement Description" multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
//           <Button onClick={handleSave} variant="contained" sx={purpleButtonStyle}>
//             {editingId ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MakeAnnouncement;


// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import axios from "axios";

// const MakeAnnouncement = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   // Form State
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [summary, setSummary] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // Pagination State
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Hardcoded values
//   const companyId = 101;
//   const publishedBy = 3;

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/departments/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const fetchAnnouncements = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const sortedAnnouncements = [...response.data.data].sort(
//         (a, b) => b.announcement_id - a.announcement_id
//       );
//       setAnnouncements(sortedAnnouncements);
//     } catch (error) {
//       console.error("Error fetching announcements:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const resetForm = () => {
//     setTitle("");
//     setStartDate("");
//     setEndDate("");
//     setSummary("");
//     setDescription("");
//     setSelectedDepartment("");
//     setEditingId(null);
//   };

//   const handleOpenAddDialog = () => {
//     resetForm();
//     setDialogOpen(true);
//   };

//   const handleOpenEditDialog = (announcement) => {
//     setEditingId(announcement.announcement_id);
//     const matchedDepartment = departments.find(
//       (dept) => dept.department_name === announcement.department_name
//     );
//     setSelectedDepartment(
//       matchedDepartment ? matchedDepartment.department_id : ""
//     );
//     setTitle(announcement.title);
//     setSummary(announcement.summary);
//     setDescription(announcement.description);
//     setStartDate(
//       announcement.start_date ? announcement.start_date.split("T")[0] : ""
//     );
//     setEndDate(
//       announcement.end_date ? announcement.end_date.split("T")[0] : ""
//     );
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     resetForm();
//   };

//   const handleSave = () => {
//     if (editingId) {
//       handleUpdateAnnouncement();
//     } else {
//       handleAddAnnouncement();
//     }
//   };

//   const handleAddAnnouncement = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const selectedDeptObject = departments.find(
//         (dept) => dept.department_id === selectedDepartment
//       );
//       if (!selectedDeptObject) {
//         alert("Please select a department.");
//         return;
//       }

//       const payload = {
//         company_id: companyId,
//         department_name: selectedDeptObject.department_name,
//         title,
//         start_date: startDate,
//         end_date: endDate,
//         published_by: publishedBy,
//         summary,
//         description,
//       };

//       await axios.post(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement added successfully!");
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error adding announcement:", error);
//       alert("Failed to add announcement. Please check the form.");
//     }
//   };

//   const handleUpdateAnnouncement = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const selectedDeptObject = departments.find(
//         (dept) => dept.department_id === selectedDepartment
//       );

//       if (!selectedDeptObject) {
//         alert("Please select a department.");
//         return;
//       }

//       const payload = {
//         company_id: companyId,
//         department_name: selectedDeptObject.department_name,
//         title,
//         start_date: startDate,
//         end_date: endDate,
//         published_by: publishedBy,
//         summary,
//         description,
//       };

//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement updated successfully!");
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error updating announcement:", error);
//       alert("Failed to update announcement.");
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this announcement?"))
//       return;
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement deleted successfully!");
//       fetchAnnouncements();
//     } catch (error) {
//       console.error("Error deleting announcement:", error);
//       alert("Failed to delete announcement.");
//     }
//   };

//   const filteredAnnouncements = announcements.filter((item) => {
//     const search = searchTerm.toLowerCase();
//     return (
//       (item.title?.toLowerCase() || "").includes(search) ||
//       (item.department_name?.toLowerCase() || "").includes(search) ||
//       (item.description?.toLowerCase() || "").includes(search)
//     );
//   });

//   const paginatedAnnouncements = useMemo(
//     () =>
//       filteredAnnouncements.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       ),
//     [filteredAnnouncements, page, rowsPerPage]
//   );
//   const totalPages = Math.ceil(filteredAnnouncements.length / rowsPerPage);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     // RESPONSIVE CHANGE: Added responsive padding to the main container
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       {/* RESPONSIVE CHANGE: Header now stacks on mobile and button becomes full-width */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 3,
//           gap: 2,
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Announcements
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ ...purpleButtonStyle, width: { xs: "100%", sm: "auto" } }}
//           startIcon={<AddIcon />}
//           onClick={handleOpenAddDialog}
//         >
//           Add New Announcement
//         </Button>
//       </Box>

//       <Paper sx={{ p: 2, mb: 3 }}>
//         <TextField
//           fullWidth
//           placeholder="Search Announcements by Title, Department, or Description"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(0);
//           }}
//           InputProps={{
//             startAdornment: (
//               <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
//             ),
//           }}
//         />
//       </Paper>

//       <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, overflow: "hidden" }}>
//         <Box sx={{ mb: 2 }}>
//           <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Rows</InputLabel>
//             <Select
//               value={rowsPerPage}
//               label="Rows"
//               onChange={(e) => {
//                 setRowsPerPage(parseInt(e.target.value, 10));
//                 setPage(0);
//               }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         {/* RESPONSIVE CHANGE: TableContainer makes the table horizontally scrollable on small screens */}
//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 {/* RESPONSIVE CHANGE: whiteSpace: 'nowrap' prevents text from wrapping, improving readability when scrolling */}
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#e3f2fd",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   SR. NO.
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#e3f2fd",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Title
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#e3f2fd",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Department
//                 </TableCell>
//                 <TableCell
//                   sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}
//                 >
//                   Description
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#e3f2fd",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedAnnouncements.length > 0 ? (
//                 paginatedAnnouncements.map((item, index) => (
//                   <TableRow key={item.announcement_id}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ whiteSpace: "nowrap" }}>
//                       {item.title}
//                     </TableCell>
//                     <TableCell sx={{ whiteSpace: "nowrap" }}>
//                       {item.department_name}
//                     </TableCell>
//                     <TableCell>{item.description}</TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         sx={{ color: "#673ab7" }}
//                         onClick={() => handleOpenEditDialog(item)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() =>
//                           handleDeleteAnnouncement(item.announcement_id)
//                         }
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No Announcements Found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {filteredAnnouncements.length > 0 && (
//           // RESPONSIVE CHANGE: Pagination controls now wrap and center on small screens
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: { xs: "center", sm: "flex-end" },
//               alignItems: "center",
//               p: 2,
//               gap: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               onClick={() => setPage((p) => p - 1)}
//               disabled={page === 0}
//               sx={purpleButtonStyle}
//             >
//               Previous
//             </Button>
//             <Typography>
//               Page {page + 1} of {totalPages > 0 ? totalPages : 1}
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => setPage((p) => p + 1)}
//               disabled={page >= totalPages - 1}
//               sx={purpleButtonStyle}
//             >
//               Next
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       <Dialog
//         open={dialogOpen}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           {editingId ? "Edit Announcement" : "Add New Announcement"}
//         </DialogTitle>
//         <DialogContent>
//           {/* NOTE: This Grid layout is already responsive. xs={12} makes fields full-width on mobile, sm={6} makes them half-width on larger screens. */}
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   label="Department"
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem
//                       key={dept.department_id}
//                       value={dept.department_id}
//                     >
//                       {dept.department_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Announcement Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Start Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="End Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Summary"
//                 value={summary}
//                 onChange={(e) => setSummary(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Announcement Description"
//                 multiline
//                 rows={3}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} variant="outlined">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             sx={purpleButtonStyle}
//           >
//             {editingId ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MakeAnnouncement;













// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import axios from "axios";

// const MakeAnnouncement = () => {
//   // State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   // Form State
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [summary, setSummary] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // Pagination State
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10 entries

//   // Hardcoded values
//   const companyId = 101;
//   const publishedBy = 3;

//   // --- Color Scheme ---
//   const purpleColor = "#8C257C";
//   // const orangeColor = "#F58E35"; // Available for use

//   const purpleButtonStyle = {
//     backgroundColor: purpleColor,
//     color: "#fff",
//     "&:hover": { backgroundColor: "#79206b" }, // Darker shade for hover
//   };
  
//   const tableHeaderStyle = {
//     fontWeight: "bold",
//     backgroundColor: purpleColor,
//     color: "#fff",
//     whiteSpace: "nowrap",
//   };

//   // --- Data Fetching ---
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/departments/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const fetchAnnouncements = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const sortedAnnouncements = [...response.data.data].sort(
//         (a, b) => b.announcement_id - a.announcement_id
//       );
//       setAnnouncements(sortedAnnouncements);
//     } catch (error) {
//       console.error("Error fetching announcements:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   // --- Form & Dialog Handlers ---
//   const resetForm = () => {
//     setTitle("");
//     setStartDate("");
//     setEndDate("");
//     setSummary("");
//     setDescription("");
//     setSelectedDepartment("");
//     setEditingId(null);
//   };

//   const handleOpenAddDialog = () => {
//     resetForm();
//     setDialogOpen(true);
//   };

//   const handleOpenEditDialog = (announcement) => {
//     setEditingId(announcement.announcement_id);
//     const matchedDepartment = departments.find(
//       (dept) => dept.department_name === announcement.department_name
//     );
//     setSelectedDepartment(
//       matchedDepartment ? matchedDepartment.department_id : ""
//     );
//     setTitle(announcement.title);
//     setSummary(announcement.summary);
//     setDescription(announcement.description);
//     setStartDate(
//       announcement.start_date ? announcement.start_date.split("T")[0] : ""
//     );
//     setEndDate(
//       announcement.end_date ? announcement.end_date.split("T")[0] : ""
//     );
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     resetForm();
//   };

//   const handleSave = () => {
//     if (editingId) {
//       handleUpdateAnnouncement();
//     } else {
//       handleAddAnnouncement();
//     }
//   };

//   // --- CRUD Operations ---
//   const handleAddAnnouncement = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const selectedDeptObject = departments.find(
//         (dept) => dept.department_id === selectedDepartment
//       );
//       if (!selectedDeptObject) {
//         alert("Please select a department.");
//         return;
//       }

//       const payload = {
//         company_id: companyId,
//         department_name: selectedDeptObject.department_name,
//         title,
//         start_date: startDate,
//         end_date: endDate,
//         published_by: publishedBy,
//         summary,
//         description,
//       };

//       await axios.post(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement added successfully!");
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error adding announcement:", error);
//       alert("Failed to add announcement. Please check the form.");
//     }
//   };

//   const handleUpdateAnnouncement = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const selectedDeptObject = departments.find(
//         (dept) => dept.department_id === selectedDepartment
//       );
//       if (!selectedDeptObject) {
//         alert("Please select a department.");
//         return;
//       }
//       const payload = {
//         company_id: companyId,
//         department_name: selectedDeptObject.department_name,
//         title,
//         start_date: startDate,
//         end_date: endDate,
//         published_by: publishedBy,
//         summary,
//         description,
//       };

//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement updated successfully!");
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error updating announcement:", error);
//       alert("Failed to update announcement.");
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this announcement?"))
//       return;
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Announcement deleted successfully!");
//       fetchAnnouncements();
//     } catch (error) {
//       console.error("Error deleting announcement:", error);
//       alert("Failed to delete announcement.");
//     }
//   };

//   // --- Filtering and Pagination Logic ---
//   const filteredAnnouncements = announcements.filter((item) => {
//     const search = searchTerm.toLowerCase();
//     return (
//       (item.title?.toLowerCase() || "").includes(search) ||
//       (item.department_name?.toLowerCase() || "").includes(search) ||
//       (item.description?.toLowerCase() || "").includes(search)
//     );
//   });

//   const paginatedAnnouncements = useMemo(
//     () =>
//       filteredAnnouncements.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       ),
//     [filteredAnnouncements, page, rowsPerPage]
//   );
  
//   const totalPages = Math.ceil(filteredAnnouncements.length / rowsPerPage);
//   const totalEntries = filteredAnnouncements.length;
//   const startIndex = page * rowsPerPage + 1;
//   const endIndex = Math.min((page + 1) * rowsPerPage, totalEntries);


//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           alignItems: { xs: "flex-start", sm: "center" },
//           mb: 3,
//           gap: 2,
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Announcements
//         </Typography>
//         <Button
//           variant="contained"
//           sx={{ ...purpleButtonStyle, width: { xs: "100%", sm: "auto" } }}
//           startIcon={<AddIcon />}
//           onClick={handleOpenAddDialog}
//         >
//           Add New Announcement
//         </Button>
//       </Box>

//       <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, overflow: "hidden" }}>
//         {/* Top Controls: Entries per page and Search */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Typography variant="body2">Show</Typography>
//             <FormControl variant="outlined" size="small">
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(0);
//                 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <Typography variant="body2">entries</Typography>
//           </Box>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(0);
//             }}
//             InputProps={{
//               startAdornment: (
//                 <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
//               ),
//             }}
//             sx={{ width: { xs: "100%", sm: 300 } }}
//           />
//         </Box>

//         {/* Table */}
//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={tableHeaderStyle}>SR. NO.</TableCell>
//                 <TableCell sx={tableHeaderStyle}>Title</TableCell>
//                 <TableCell sx={tableHeaderStyle}>Department</TableCell>
//                 <TableCell sx={{...tableHeaderStyle, whiteSpace: 'normal'}}>Description</TableCell>
//                 <TableCell align="center" sx={tableHeaderStyle}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedAnnouncements.length > 0 ? (
//                 paginatedAnnouncements.map((item, index) => (
//                   <TableRow key={item.announcement_id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ whiteSpace: "nowrap" }}>{item.title}</TableCell>
//                     <TableCell sx={{ whiteSpace: "nowrap" }}>{item.department_name}</TableCell>
//                     <TableCell>{item.description}</TableCell>
//                     <TableCell align="center">
//                       <IconButton
//                         sx={{ color: purpleColor }}
//                         onClick={() => handleOpenEditDialog(item)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteAnnouncement(item.announcement_id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No Announcements Found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Bottom Controls: Entry count and Pagination */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: "center",
//             p: 2,
//             gap: 2,
//           }}
//         >
//           <Typography variant="body2">
//             {totalEntries > 0 ? `Showing ${startIndex} to ${endIndex} of ${totalEntries} entries` : "No entries to show"}
//           </Typography>
          
//           {totalEntries > rowsPerPage && (
//              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={() => setPage((p) => p - 1)}
//                 disabled={page === 0}
//                 sx={purpleButtonStyle}
//               >
//                 Previous
//               </Button>
//               <Typography>
//                 Page {page + 1} of {totalPages}
//               </Typography>
//               <Button
//                 variant="contained"
//                 onClick={() => setPage((p) => p + 1)}
//                 disabled={page >= totalPages - 1}
//                 sx={purpleButtonStyle}
//               >
//                 Next
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Paper>

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle>
//           {editingId ? "Edit Announcement" : "Add New Announcement"}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   label="Department"
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem key={dept.department_id} value={dept.department_id}>
//                       {dept.department_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Announcement Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Start Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="End Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Summary"
//                 value={summary}
//                 onChange={(e) => setSummary(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Announcement Description"
//                 multiline
//                 rows={3}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} variant="outlined">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             sx={purpleButtonStyle}
//           >
//             {editingId ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MakeAnnouncement;









// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Table,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   useTheme,
//   useMediaQuery,
//   TablePagination,
//   Skeleton,
//   CircularProgress,
//   InputAdornment,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MakeAnnouncement = () => {
//   // --- State Management ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [departments, setDepartments] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- Form State ---
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [title, setTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [summary, setSummary] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);

//   // --- Pagination State ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // --- Hardcoded values ---
//   const companyId = 101;
//   const publishedBy = 3;

//   // --- Theme & Responsive Design ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- Color Scheme ---
//   const primaryColor = "#8C257C";
//   const primaryDarkColor = "#6d1d60";
//   const secondaryColor = "#F58E35";
//   const textOnPrimary = "#FFFFFF";
//   const cancelColor = "#757575";

//   // --- Style Objects ---
//   const primaryButtonStyle = {
//     backgroundColor: primaryColor,
//     color: textOnPrimary,
//     "&:hover": { backgroundColor: primaryDarkColor },
//   };

//   const tableHeaderStyle = {
//     backgroundColor: primaryColor,
//     color: textOnPrimary,
//     fontWeight: "bold",
//     whiteSpace: "nowrap",
//   };
  
//   const cancelButtonstyle = {
//     color: cancelColor,
//     borderColor: cancelColor,
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.04)",
//       borderColor: cancelColor,
//     },
//   };

//   // --- Data Fetching ---
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/departments/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setDepartments(response.data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const fetchAnnouncements = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "https://tdtlworld.com/hrms-backend/announcements/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const sortedAnnouncements = [...response.data.data].sort(
//         (a, b) => b.announcement_id - a.announcement_id
//       );
//       setAnnouncements(sortedAnnouncements);
//     } catch (error) {
//       console.error("Error fetching announcements:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   // --- Form & Dialog Handlers ---
//   const resetForm = () => {
//     setTitle("");
//     setStartDate("");
//     setEndDate("");
//     setSummary("");
//     setDescription("");
//     setSelectedDepartment("");
//     setEditingId(null);
//   };

//   const handleOpenAddDialog = () => {
//     resetForm();
//     setDialogOpen(true);
//   };

//   const handleOpenEditDialog = (announcement) => {
//     setEditingId(announcement.announcement_id);
//     const matchedDepartment = departments.find(
//       (dept) => dept.department_name === announcement.department_name
//     );
//     setSelectedDepartment(
//       matchedDepartment ? matchedDepartment.department_id : ""
//     );
//     setTitle(announcement.title);
//     setSummary(announcement.summary);
//     setDescription(announcement.description);
//     setStartDate(
//       announcement.start_date ? announcement.start_date.split("T")[0] : ""
//     );
//     setEndDate(
//       announcement.end_date ? announcement.end_date.split("T")[0] : ""
//     );
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     resetForm();
//   };
  
//   const showPopup = (icon, title, text) => {
//     Swal.fire({
//       icon,
//       title,
//       text,
//       timer: 3000,
//       showConfirmButton: false,
//     });
//   };

//   // --- CRUD Operations ---
//   const handleSave = async () => {
//     setIsSubmitting(true);
//     const token = localStorage.getItem("accessToken");
//     const selectedDeptObject = departments.find(
//       (dept) => dept.department_id === selectedDepartment
//     );

//     if (!selectedDeptObject) {
//       showPopup("error", "Validation Error", "Please select a department.");
//       setIsSubmitting(false);
//       return;
//     }

//     const payload = {
//       company_id: companyId,
//       department_name: selectedDeptObject.department_name,
//       title,
//       start_date: startDate,
//       end_date: endDate,
//       published_by: publishedBy,
//       summary,
//       description,
//     };

//     try {
//       if (editingId) {
//         // Update logic
//         await axios.patch(
//           `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         showPopup("success", "Success", "Announcement updated successfully!");
//       } else {
//         // Add logic
//         await axios.post(
//           "https://tdtlworld.com/hrms-backend/announcements/",
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         showPopup("success", "Success", "Announcement added successfully!");
//       }
//       fetchAnnouncements();
//       handleCloseDialog();
//     } catch (error) {
//       console.error(`Error ${editingId ? 'updating' : 'adding'} announcement:`, error);
//       showPopup("error", "Error", `Failed to ${editingId ? 'update' : 'add'} announcement.`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: primaryColor,
//       cancelButtonColor: cancelColor,
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("accessToken");
//         await axios.delete(
//           `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         showPopup("success", "Deleted!", "Announcement has been deleted.");
//         fetchAnnouncements();
//       } catch (error) {
//         console.error("Error deleting announcement:", error);
//         showPopup("error", "Error!", "Failed to delete announcement.");
//       }
//     }
//   };


//   // --- Filtering and Pagination Logic ---
//   const filteredAnnouncements = useMemo(() => 
//     announcements.filter((item) => {
//       const search = searchTerm.toLowerCase();
//       return (
//         (item.title?.toLowerCase() || "").includes(search) ||
//         (item.department_name?.toLowerCase() || "").includes(search) ||
//         (item.description?.toLowerCase() || "").includes(search)
//       );
//     }), [announcements, searchTerm]);

//   const paginatedAnnouncements = useMemo(
//     () =>
//       filteredAnnouncements.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//       ),
//     [filteredAnnouncements, page, rowsPerPage]
//   );
  
//   // --- Event Handlers for Pagination ---
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
//         Make Announcements
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <Button
//           variant="contained"
//           sx={{ ...primaryButtonStyle, width: isMobile ? "100%" : "auto" }}
//           startIcon={<AddIcon />}
//           onClick={handleOpenAddDialog}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(0);
//           }}
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

//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ backgroundColor: primaryColor }}>
//             <TableRow>
//               <TableCell sx={tableHeaderStyle}>SR. NO.</TableCell>
//               <TableCell sx={tableHeaderStyle}>TITLE</TableCell>
//               <TableCell sx={tableHeaderStyle}>DEPARTMENT</TableCell>
//               <TableCell sx={{...tableHeaderStyle, whiteSpace: 'normal'}}>DESCRIPTION</TableCell>
//               <TableCell align="center" sx={tableHeaderStyle}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center">
//                     <Skeleton variant="rectangular" width={120} height={30} />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedAnnouncements.length > 0 ? (
//               paginatedAnnouncements.map((item, index) => (
//                 <TableRow key={item.announcement_id} hover>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{item.title}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{item.department_name}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem', whiteSpace: 'normal' }}>{item.description}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         sx={{ color: primaryColor }}
//                         onClick={() => handleOpenEditDialog(item)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteAnnouncement(item.announcement_id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No Announcements Found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mt: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {paginatedAnnouncements.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredAnnouncements.length)} of {filteredAnnouncements.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredAnnouncements.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             '& .MuiSvgIcon-root': {
//               color: primaryColor
//             },
//             '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//               color: 'text.secondary',
//             }
//           }}
//         />
//       </Box>

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
//           {editingId ? "Edit Announcement" : "Add New Announcement"}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   label="Department"
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem key={dept.department_id} value={dept.department_id}>
//                       {dept.department_name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Announcement Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="Start Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="End Date"
//                 InputLabelProps={{ shrink: true }}
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Summary"
//                 value={summary}
//                 onChange={(e) => setSummary(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Announcement Description"
//                 multiline
//                 rows={3}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2, gap: 1 }}>
//           <Button onClick={handleCloseDialog} variant="outlined" sx={cancelButtonstyle}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             sx={primaryButtonStyle}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} sx={{ color: textOnPrimary }} /> : (editingId ? "Update" : "Save")}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MakeAnnouncement;





import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
  // --- START: PAGINATION IMPORTS MODIFIED ---
  Pagination,
  // --- END: PAGINATION IMPORTS MODIFIED ---
  Skeleton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  // --- State Management ---
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Form State ---
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // --- Pagination State ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Changed for new style

  // --- Hardcoded values ---
  const companyId = 101;
  const publishedBy = 3;

  // --- Theme & Responsive Design ---
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- Color Scheme ---
  const primaryColor = "#8C257C";
  const primaryDarkColor = "#6d1d60";
  const secondaryColor = "#F58E35";
  const textOnPrimary = "#FFFFFF";
  const cancelColor = "#757575";

  // --- Style Objects ---
  const primaryButtonStyle = {
    backgroundColor: primaryColor,
    color: textOnPrimary,
    "&:hover": { backgroundColor: primaryDarkColor },
  };

  const tableHeaderStyle = {
    backgroundColor: primaryColor,
    color: textOnPrimary,
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };
  
  const cancelButtonstyle = {
    color: cancelColor,
    borderColor: cancelColor,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      borderColor: cancelColor,
    },
  };

  // --- Data Fetching ---
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://tdtlworld.com/hrms-backend/departments/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://tdtlworld.com/hrms-backend/announcements/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sortedAnnouncements = [...response.data.data].sort(
        (a, b) => b.announcement_id - a.announcement_id
      );
      setAnnouncements(sortedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // --- Form & Dialog Handlers ---
  const resetForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setSummary("");
    setDescription("");
    setSelectedDepartment("");
    setEditingId(null);
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (announcement) => {
    setEditingId(announcement.announcement_id);
    const matchedDepartment = departments.find(
      (dept) => dept.department_name === announcement.department_name
    );
    setSelectedDepartment(
      matchedDepartment ? matchedDepartment.department_id : ""
    );
    setTitle(announcement.title);
    setSummary(announcement.summary);
    setDescription(announcement.description);
    setStartDate(
      announcement.start_date ? announcement.start_date.split("T")[0] : ""
    );
    setEndDate(
      announcement.end_date ? announcement.end_date.split("T")[0] : ""
    );
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };
  
  const showPopup = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
      timer: 3000,
      showConfirmButton: false,
    });
  };

  // --- CRUD Operations ---
  const handleSave = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const selectedDeptObject = departments.find(
      (dept) => dept.department_id === selectedDepartment
    );

    if (!selectedDeptObject) {
      showPopup("error", "Validation Error", "Please select a department.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      company_id: companyId,
      department_name: selectedDeptObject.department_name,
      title,
      start_date: startDate,
      end_date: endDate,
      published_by: publishedBy,
      summary,
      description,
    };

    try {
      if (editingId) {
        await axios.patch(
          `https://tdtlworld.com/hrms-backend/announcements/${editingId}/`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showPopup("success", "Success", "Announcement updated successfully!");
      } else {
        await axios.post(
          "https://tdtlworld.com/hrms-backend/announcements/",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showPopup("success", "Success", "Announcement added successfully!");
      }
      fetchAnnouncements();
      handleCloseDialog();
    } catch (error) {
      console.error(`Error ${editingId ? 'updating' : 'adding'} announcement:`, error);
      showPopup("error", "Error", `Failed to ${editingId ? 'update' : 'add'} announcement.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: cancelColor,
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(
          `https://tdtlworld.com/hrms-backend/announcements/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showPopup("success", "Deleted!", "Announcement has been deleted.");
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
        showPopup("error", "Error!", "Failed to delete announcement.");
      }
    }
  };

  // --- Filtering and Pagination Logic ---
  const filteredAnnouncements = useMemo(() => 
    announcements.filter((item) => {
      const search = searchTerm.toLowerCase();
      return (
        (item.title?.toLowerCase() || "").includes(search) ||
        (item.department_name?.toLowerCase() || "").includes(search) ||
        (item.description?.toLowerCase() || "").includes(search)
      );
    }), [announcements, searchTerm]);

  const paginatedAnnouncements = useMemo(
    () =>
      filteredAnnouncements.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [filteredAnnouncements, page, rowsPerPage]
  );
  
  // --- START: NEW PAGINATION HANDLERS AND CALCULATIONS ---
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const startEntry = filteredAnnouncements.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredAnnouncements.length);
  // --- END: NEW PAGINATION HANDLERS AND CALCULATIONS ---

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold", mb: 5 }}>
        Make Announcements
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{ ...primaryButtonStyle, width: isMobile ? "100%" : "auto" }}
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add New
        </Button>
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
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

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead>
             <TableRow sx={{ backgroundColor: primaryColor }}>
              <TableCell sx={tableHeaderStyle}>SR. NO.</TableCell>
              <TableCell sx={tableHeaderStyle}>TITLE</TableCell>
              <TableCell sx={tableHeaderStyle}>DEPARTMENT</TableCell>
              <TableCell sx={{...tableHeaderStyle, whiteSpace: 'normal'}}>DESCRIPTION</TableCell>
              <TableCell align="center" sx={tableHeaderStyle}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={80} height={30} />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedAnnouncements.length > 0 ? (
              paginatedAnnouncements.map((item, index) => (
                <TableRow key={item.announcement_id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{item.title}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{item.department_name}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem', whiteSpace: 'normal' }}>{item.description}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <IconButton
                        sx={{ color: primaryColor }}
                        onClick={() => handleOpenEditDialog(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteAnnouncement(item.announcement_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No Announcements Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- START: NEW STYLED PAGINATION (REPLACES TablePagination) --- */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width={200} />
                <Skeleton variant="rectangular" width={300} height={40} />
            </Box>
        ) : (
          filteredAnnouncements.length > 0 && (
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
                       {`Showing ${startEntry} to ${endEntry} of ${filteredAnnouncements.length} results`}
                    </Typography>
                </Box>
                <Pagination
                    count={Math.ceil(filteredAnnouncements.length / rowsPerPage)}
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
      {/* --- END: NEW STYLED PAGINATION --- */}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
          {editingId ? "Edit Announcement" : "Add New Announcement"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.department_id} value={dept.department_id}>
                      {dept.department_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Announcement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Announcement Description"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleCloseDialog} variant="outlined" sx={cancelButtonstyle}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={primaryButtonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} sx={{ color: textOnPrimary }} /> : (editingId ? "Update" : "Save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MakeAnnouncement;