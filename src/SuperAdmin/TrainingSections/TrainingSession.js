// "use client";

// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   IconButton,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// export default function TrainingSession() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedSession, setSelectedSession] = useState(null);

//   const [trainers, setTrainers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [trainings, setTrainings] = useState([]);

//   const [newSession, setNewSession] = useState({
//     trainingSkills: "",
//     trainer: "",
//     startDate: null,
//     endDate: null,
//     employees: [],
//     trainingCost: "",
//     status: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     // Fetch Trainers
//     fetch("https://tdtlworld.com/hrms-backend/trainers/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           const trainerOptions = data.data.map((trainer) => ({
//             id: trainer.id, // Store the trainer ID
//             value: `${trainer.first_name.trim()} ${trainer.last_name.trim()}`,
//             label: `${trainer.first_name.trim()} ${trainer.last_name.trim()}`,
//           }));
//           setTrainers(trainerOptions);
//         }
//       });

//     // Fetch Employees
//     fetch("https://tdtlworld.com/hrms-backend/employee-dropdown/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setEmployees(data);
//         }
//       });
//   }, []);

//   useEffect(() => {
//     const fetchTrainings = async () => {
//       const token = localStorage.getItem("accessToken");

//       try {
//         const response = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainings/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();
//         console.log("API response:", data);

//         // Check if the response is an array or wrapped in a `data` field
//         if (Array.isArray(data)) {
//           setTrainings(data);
//         } else if (Array.isArray(data.data)) {
//           setTrainings(data.data);
//         } else {
//           console.warn("Unexpected data format", data);
//           setTrainings([]);
//         }
//       } catch (error) {
//         console.error("Error fetching trainings:", error);
//         setTrainings([]);
//       }
//     };

//     fetchTrainings();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number.parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleAddNewSession = async () => {
//     const token = localStorage.getItem("accessToken");

//     // Find the trainer ID based on the selected trainer name
//     const selectedTrainer = trainers.find(
//       (trainer) => trainer.value === newSession.trainer
//     );
//     const trainerId = selectedTrainer ? selectedTrainer.id || 1 : 1; // Default to 1 if not found

//     // Get employee IDs from the selected employees
//     const selectedEmployeeIds = [];
//     if (Array.isArray(newSession.employees) && employees.length > 0) {
//       newSession.employees.forEach((empName) => {
//         const emp = employees.find((e) => e.label === empName);
//         if (emp && emp.value) {
//           selectedEmployeeIds.push(emp.value);
//         }
//       });
//     }

//     // Format dates properly
//     const startDate = newSession.startDate
//       ? new Date(newSession.startDate).toISOString().split("T")[0]
//       : null;
//     const endDate = newSession.endDate
//       ? new Date(newSession.endDate).toISOString().split("T")[0]
//       : null;

//     // Prepare the payload
//     const trainingData = {
//       company_id: 2, // Static
//       employee_id:
//         selectedEmployeeIds.length > 0 ? selectedEmployeeIds.join(",") : "0",
//       training_type_id: 127, // Static
//       associated_goals: "None",
//       trainer_id: trainerId,
//       start_date: startDate,
//       finish_date: endDate,
//       training_cost: newSession.trainingCost || "0.00",
//       training_status: newSession.status === "Completed" ? 1 : 0,
//       description: "Training session",
//       performance: "0",
//       remarks: "No remarks",
//       created_at:
//         new Date().toISOString().split("T")[0] +
//         " " +
//         new Date().toTimeString().split(" ")[0].substring(0, 8), // Added created_at in format "YYYY-MM-DD HH:MM:SS"
//       training_skills: newSession.trainingSkills || "General Training",
//     };

//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/trainings/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(trainingData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Training session added successfully:", result);

//         // Refresh the trainings list
//         const fetchResponse = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainings/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await fetchResponse.json();
//         if (Array.isArray(data)) {
//           setTrainings(data);
//         } else if (Array.isArray(data.data)) {
//           setTrainings(data.data);
//         }

//         setOpenDialog(false);
//         resetForm();
//       } else {
//         console.error("Failed to add training session:", result);
//         alert("Failed to add training session. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding training session:", error);
//       alert("An error occurred while adding the training session.");
//     }
//   };

//   const handleEditSession = (session) => {
//     setIsEditMode(true);
//     setSelectedSession(session);

//     // Format the session data for the form
//     setNewSession({
//       trainingSkills: session.training_skills || "",
//       trainer: session.trainer_name || "",
//       startDate: session.start_date ? new Date(session.start_date) : null,
//       endDate: session.finish_date ? new Date(session.finish_date) : null,
//       employees: session.employee_names || [],
//       trainingCost: session.training_cost || "",
//       status: session.training_status === 1 ? "Completed" : "Pending",
//     });

//     setOpenDialog(true);
//   };

//   const handleSaveSession = async () => {
//     if (!selectedSession) return;

//     const token = localStorage.getItem("accessToken");

//     // Find the trainer ID based on the selected trainer name
//     const selectedTrainer = trainers.find(
//       (trainer) => trainer.value === newSession.trainer
//     );
//     const trainerId = selectedTrainer ? selectedTrainer.id || 1 : 1; // Default to 1 if not found

//     // Get employee IDs from the selected employees
//     const selectedEmployeeIds = [];
//     if (Array.isArray(newSession.employees) && employees.length > 0) {
//       newSession.employees.forEach((empName) => {
//         const emp = employees.find((e) => e.label === empName);
//         if (emp && emp.value) {
//           selectedEmployeeIds.push(emp.value);
//         }
//       });
//     }

//     // Format dates properly
//     const startDate = newSession.startDate
//       ? new Date(newSession.startDate).toISOString().split("T")[0]
//       : null;
//     const endDate = newSession.endDate
//       ? new Date(newSession.endDate).toISOString().split("T")[0]
//       : null;

//     // Prepare the payload
//     const trainingData = {
//       training_id: selectedSession.training_id,
//       company_id: selectedSession.company_id || 2,
//       employee_id:
//         selectedEmployeeIds.length > 0 ? selectedEmployeeIds.join(",") : "0",
//       training_type_id: selectedSession.training_type_id || 127,
//       associated_goals: "None", // Changed from null to a string value
//       trainer_id: trainerId,
//       start_date: startDate,
//       finish_date: endDate,
//       training_cost: newSession.trainingCost || "0.00",
//       training_status: newSession.status === "Completed" ? 1 : 0,
//       description: selectedSession.description || "Training session",
//       performance: selectedSession.performance || "0",
//       remarks: "No remarks", // Changed from empty to a non-blank value
//       created_at:
//         selectedSession.created_at ||
//         new Date().toISOString().split("T")[0] +
//           " " +
//           new Date().toTimeString().split(" ")[0].substring(0, 8), // Added created_at
//       training_skills: newSession.trainingSkills || "General Training",
//     };

//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/trainings/${selectedSession.training_id}/`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(trainingData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Training session updated successfully:", result);

//         // Refresh the trainings list
//         const fetchResponse = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainings/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await fetchResponse.json();
//         if (Array.isArray(data)) {
//           setTrainings(data);
//         } else if (Array.isArray(data.data)) {
//           setTrainings(data.data);
//         }

//         setOpenDialog(false);
//         resetForm();
//       } else {
//         console.error("Failed to update training session:", result);
//         alert("Failed to update training session. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating training session:", error);
//       alert("An error occurred while updating the training session.");
//     }
//   };

//   const resetForm = () => {
//     setNewSession({
//       trainingSkills: "",
//       trainer: "",
//       startDate: null,
//       endDate: null,
//       employees: [],
//       trainingCost: "",
//       status: "",
//     });
//     setIsEditMode(false);
//     setSelectedSession(null);
//   };

//   const handleChangeNewSession = (e) => {
//     const { name, value } = e.target;
//     setNewSession((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     resetForm();
//   };

//   const handleDeleteSession = async (id) => {
//     if (!id) return;

//     const token = localStorage.getItem("accessToken");

//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/trainings/${id}/`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         console.log("Training session deleted successfully");

//         // Update the local state to remove the deleted session
//         setTrainings(trainings.filter((session) => session.training_id !== id));
//       } else {
//         const result = await response.json();
//         console.error("Failed to delete training session:", result);
//         alert("Failed to delete training session. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error deleting training session:", error);
//       alert("An error occurred while deleting the training session.");
//     }
//   };

//   const filteredData = trainings.filter((session) => {
//     const skills = session.training_skills?.toLowerCase() || "";
//     const trainer = session.trainer_name?.toLowerCase() || "";
//     const employeeNames = Array.isArray(session.employee_names)
//       ? session.employee_names.join(", ").toLowerCase()
//       : "";

//     const query = searchQuery.toLowerCase();
//     return (
//       skills.includes(query) ||
//       trainer.includes(query) ||
//       employeeNames.includes(query)
//     );
//   });

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           mb: 2,
//         }}
//       >
//         <TextField
//           label="Search"
//           variant="outlined"
//           size="small"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           sx={{ width: { xs: "100%", sm: "40%" }, mb: { xs: 2, sm: 0 } }}
//         />
//         <IconButton
//           color="primary"
//           onClick={handleOpenDialog}
//           sx={{ alignSelf: "flex-start" }}
//         >
//           <AddIcon />
//         </IconButton>
//       </Box>

//       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Training Skills</TableCell>
//               <TableCell>Trainer</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Employees</TableCell>
//               <TableCell>Training Cost</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((session) => (
//                 <TableRow key={session.training_id}>
//                   <TableCell>{session.training_skills || "N/A"}</TableCell>
//                   <TableCell>{session.trainer_name}</TableCell>
//                   <TableCell>{session.start_date}</TableCell>
//                   <TableCell>{session.finish_date}</TableCell>
//                   <TableCell>
//                     {Array.isArray(session.employee_names)
//                       ? session.employee_names.join(", ")
//                       : ""}
//                   </TableCell>
//                   <TableCell>{session.training_cost}</TableCell>
//                   <TableCell>
//                     {session.training_status === 1 ? "Completed" : "Pending"}
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="secondary"
//                       onClick={() => handleDeleteSession(session.training_id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleEditSession(session)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       {/* Dialog for adding/editing session */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
//         <DialogTitle>
//           {isEditMode ? "Edit" : "Add"} Training Session
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Training Skills"
//             fullWidth
//             name="trainingSkills"
//             value={newSession.trainingSkills}
//             onChange={handleChangeNewSession}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Trainer</InputLabel>
//             <Select
//               name="trainer"
//               value={newSession.trainer}
//               onChange={handleChangeNewSession}
//               label="Trainer"
//             >
//               {trainers.map((trainer) => (
//                 <MenuItem key={trainer.value} value={trainer.value}>
//                   {trainer.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {/* Date Picker for Start Date */}
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <DatePicker
//                   label="Start Date"
//                   value={newSession.startDate}
//                   onChange={(newDate) =>
//                     setNewSession((prev) => ({ ...prev, startDate: newDate }))
//                   }
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>

//               {/* Date Picker for End Date */}
//               <Grid item xs={12} sm={6}>
//                 <DatePicker
//                   label="End Date"
//                   value={newSession.endDate}
//                   onChange={(newDate) =>
//                     setNewSession((prev) => ({ ...prev, endDate: newDate }))
//                   }
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>
//             </Grid>
//           </LocalizationProvider>

//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Employees</InputLabel>
//             <Select
//               multiple
//               name="employees"
//               value={newSession.employees || []}
//               onChange={handleChangeNewSession}
//               input={<OutlinedInput label="Employees" />}
//               renderValue={(selected) => selected.join(", ")}
//             >
//               {employees.map((emp) => (
//                 <MenuItem key={emp.value} value={emp.label}>
//                   <Checkbox
//                     checked={newSession.employees?.indexOf(emp.label) > -1}
//                   />
//                   <ListItemText primary={emp.label} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Training Cost"
//             fullWidth
//             name="trainingCost"
//             value={newSession.trainingCost}
//             onChange={handleChangeNewSession}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Status</InputLabel>
//             <Select
//               name="status"
//               value={newSession.status}
//               onChange={handleChangeNewSession}
//             >
//               <MenuItem value="Scheduled">Scheduled</MenuItem>
//               <MenuItem value="Ongoing">Ongoing</MenuItem>
//               <MenuItem value="Completed">Completed</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={isEditMode ? handleSaveSession : handleAddNewSession}
//             color="primary"
//           >
//             {isEditMode ? "Save" : "Add Session"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   IconButton,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// export default function TrainingSession() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedSession, setSelectedSession] = useState(null);

//   const [trainers, setTrainers] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [trainings, setTrainings] = useState([]);

//   const [newSession, setNewSession] = useState({
//     training_skills: "",
//     trainer: "",
//     startDate: null,
//     endDate: null,
//     employees: [],
//     trainingCost: "",
//     status: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     // Fetch Trainers
//     fetch("https://tdtlworld.com/hrms-backend/trainers/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           const trainerOptions = data.data.map((trainer) => ({
//             id: trainer.id, // Store the trainer ID
//             value: `${trainer.first_name.trim()} ${trainer.last_name.trim()}`,
//             label: `${trainer.first_name.trim()} ${trainer.last_name.trim()}`,
//           }));
//           setTrainers(trainerOptions);
//         }
//       });

//     // Fetch Employees
//     fetch("https://tdtlworld.com/hrms-backend/employee-dropdown/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setEmployees(data);
//         }
//       });
//   }, []);

//   useEffect(() => {
//     const fetchTrainings = async () => {
//       const token = localStorage.getItem("accessToken");

//       try {
//         const response = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainings/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();
//         console.log("API response:", data);

//         // Check if the response is an array or wrapped in a `data` field
//         if (Array.isArray(data)) {
//           setTrainings(data);
//         } else if (Array.isArray(data.data)) {
//           setTrainings(data.data);
//         } else {
//           console.warn("Unexpected data format", data);
//           setTrainings([]);
//         }
//       } catch (error) {
//         console.error("Error fetching trainings:", error);
//         setTrainings([]);
//       }
//     };

//     fetchTrainings();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number.parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleAddNewSession = async () => {
//     const token = localStorage.getItem("accessToken");

//     // Find the trainer ID based on the selected trainer name
//     const selectedTrainer = trainers.find(
//       (trainer) => trainer.value === newSession.trainer
//     );
//     const trainerId = selectedTrainer ? selectedTrainer.id || 1 : 1; // Default to 1 if not found

//     const selectedSkill = skills.find(
//   (skill) => skill.value === newSession.training_skills
// );

// const skillLabel = selectedSkill ? selectedSkill.label : "";


//     // Get employee IDs from the selected employees
//     const selectedEmployeeIds = [];
//     if (Array.isArray(newSession.employees) && employees.length > 0) {
//       newSession.employees.forEach((empName) => {
//         const emp = employees.find((e) => e.label === empName);
//         if (emp && emp.value) {
//           selectedEmployeeIds.push(emp.value);
//         }
//       });
//     }

//     // Format dates properly
//     const startDate = newSession.startDate
//       ? new Date(newSession.startDate).toISOString().split("T")[0]
//       : null;
//     const endDate = newSession.endDate
//       ? new Date(newSession.endDate).toISOString().split("T")[0]
//       : null;

//     // Prepare the payload
//     const trainingData = {
//       company_id: 2, // Static
//       employee_id:
//         selectedEmployeeIds.length > 0 ? selectedEmployeeIds.join(",") : "0",
//       training_type_id: 127, // Static
//       associated_goals: "None",
//       trainer_id: trainerId,
//       start_date: startDate,
//       finish_date: endDate,
//       training_cost: newSession.trainingCost || "0.00",
//       training_status: newSession.status === "Completed" ? 1 : 0,
//       description: "Training session",
//       performance: "0",
//       remarks: "No remarks",
//       created_at:
//         new Date().toISOString().split("T")[0] +
//         " " +
//         new Date().toTimeString().split(" ")[0].substring(0, 8), // Added created_at in format "YYYY-MM-DD HH:MM:SS"
//       training_skills: skillLabel,

//     };

//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/trainings/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(trainingData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Training session added successfully:", result);

//         // Refresh the trainings list
//         const fetchResponse = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainings/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await fetchResponse.json();
//         if (Array.isArray(data)) {
//           setTrainings(data);
//         } else if (Array.isArray(data.data)) {
//           setTrainings(data.data);
//         }

//         setOpenDialog(false);
//         resetForm();
//       } else {
//         console.error("Failed to add training session:", result);
//         alert("Failed to add training session. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding training session:", error);
//       alert("An error occurred while adding the training session.");
//     }
//   };

//   const handleEditSession = (session) => {
//     setIsEditMode(true);
//     setSelectedSession(session);

//     // Format the session data for the form
//     setNewSession({
//       trainingSkills: session.training_skills || "",
//       trainer: session.trainer_name || "",
//       startDate: session.start_date ? new Date(session.start_date) : null,
//       endDate: session.finish_date ? new Date(session.finish_date) : null,
//       employees: session.employee_names || [],
//       trainingCost: session.training_cost || "",
//       status: 
//   session.training_status === 0
//     ? "Scheduled"
//     : session.training_status === 1
//     ? "Ongoing"
//     : session.training_status === 2
//     ? "Completed"
//     : "",

//     });

//     setOpenDialog(true);
//   };

//   const handleSaveSession = async () => {
//     if (!selectedSession) return;

//     const token = localStorage.getItem("accessToken");

//     // Find the trainer ID based on the selected trainer name
//     const selectedTrainer = trainers.find(
//       (trainer) => trainer.value === newSession.trainer
//     );
//     const trainerId = selectedTrainer ? selectedTrainer.id || 1 : 1; // Default to 1 if not found

//     // Get employee IDs from the selected employees
//     const selectedEmployeeIds = [];
//     if (Array.isArray(newSession.employees) && employees.length > 0) {
//       newSession.employees.forEach((empName) => {
//         const emp = employees.find((e) => e.label === empName);
//         if (emp && emp.value) {
//           selectedEmployeeIds.push(emp.value);
//         }
//       });
//     }

//     const selectedSkill = skills.find(
//   (skill) => skill.value === newSession.training_skills
// );
// const skillLabel = selectedSkill ? selectedSkill.label : "";


//     // Format dates properly
//     const startDate = newSession.startDate
//       ? new Date(newSession.startDate).toISOString().split("T")[0]
//       : null;
//     const endDate = newSession.endDate
//       ? new Date(newSession.endDate).toISOString().split("T")[0]
//       : null;

//     // Prepare the payload
//     const trainingData = {
//       training_id: selectedSession.training_id,
//       company_id: selectedSession.company_id || 2,
//       employee_id:
//         selectedEmployeeIds.length > 0 ? selectedEmployeeIds.join(",") : "0",
//       training_type_id: selectedSession.training_type_id || 127,
//       associated_goals: "None", 
//       trainer_id: trainerId,
//       start_date: startDate,
//       finish_date: endDate,
//       training_cost: newSession.trainingCost || "0.00",
//       training_status:  newSession.status === "Scheduled"
//     ? 0
//     : newSession.status === "Ongoing"
//     ? 1
//     : newSession.status === "Completed"
//     ? 2
//     : 0,
//       description: selectedSession.description || "Training session",
//       performance: selectedSession.performance || "0",
//       remarks: "No remarks", 
//       created_at:
//         selectedSession.created_at ||
//         new Date().toISOString().split("T")[0] +
//           " " +
//           new Date().toTimeString().split(" ")[0].substring(0, 8), // Added created_at
//       training_skills: skillLabel,

//     };

//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/trainings/${selectedSession.training_id}/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(trainingData),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Training session updated successfully:", result);

//         // Refresh the trainings list
//         const fetchResponse = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainings/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await fetchResponse.json();
//         if (Array.isArray(data)) {
//           setTrainings(data);
//         } else if (Array.isArray(data.data)) {
//           setTrainings(data.data);
//         }

//         setOpenDialog(false);
//         resetForm();
//       } else {
//         console.error("Failed to update training session:", result);
//         alert("Failed to update training session. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error updating training session:", error);
//       alert("An error occurred while updating the training session.");
//     }
//   };

//   const resetForm = () => {
//     setNewSession({
//       trainingSkills: "",
//       trainer: "",
//       startDate: null,
//       endDate: null,
//       employees: [],
//       trainingCost: "",
//       status: "",
//     });
//     setIsEditMode(false);
//     setSelectedSession(null);
//   };

//   //const [skills, setSkills] = useState([]);
//   const [skills, setSkills] = useState([]);
// const [loadingSkills, setLoadingSkills] = useState(true);

// useEffect(() => {
//   const fetchSkills = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/training-skills/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setSkills(data);
//     } catch (error) {
//       console.error("Error fetching skills:", error);
//     } finally {
//       setLoadingSkills(false);
//     }
//   };

//   fetchSkills();
// }, []);



//   const handleChangeNewSession = (e) => {
//   const { name, value } = e.target;
//   setNewSession((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     resetForm();
//   };

//   const handleDeleteSession = async (id) => {
//     if (!id) return;

//     const token = localStorage.getItem("accessToken");

//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/trainings/${id}/`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         console.log("Training session deleted successfully");

//         // Update the local state to remove the deleted session
//         setTrainings(trainings.filter((session) => session.training_id !== id));
//       } else {
//         const result = await response.json();
//         console.error("Failed to delete training session:", result);
//         alert("Failed to delete training session. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error deleting training session:", error);
//       alert("An error occurred while deleting the training session.");
//     }
//   };

//   const filteredData = trainings.filter((session) => {
//     const skills = session.training_skills?.toLowerCase() || "";
//     const trainer = session.trainer_name?.toLowerCase() || "";
//     const employeeNames = Array.isArray(session.employee_names)
//       ? session.employee_names.join(", ").toLowerCase()
//       : "";

//     const query = searchQuery.toLowerCase();
//     return (
//       skills.includes(query) ||
//       trainer.includes(query) ||
//       employeeNames.includes(query)
//     );
//   });

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: "space-between",
//           mb: 2,
//         }}
//       >
//         <TextField
//           label="Search"
//           variant="outlined"
//           size="small"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           sx={{ width: { xs: "100%", sm: "40%" }, mb: { xs: 2, sm: 0 } }}
//         />
//         <IconButton
//           color="primary"
//           onClick={handleOpenDialog}
//           sx={{ alignSelf: "flex-start" }}
//         >
//           <AddIcon />
//         </IconButton>
//       </Box>

//       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Training Skills</TableCell>
//               <TableCell>Trainer</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Employees</TableCell>
//               <TableCell>Training Cost</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((session) => (
//                 <TableRow key={session.training_id}>
//                   <TableCell>{session.training_skills || "N/A"}</TableCell>
//                   <TableCell>{session.trainer_name}</TableCell>
//                   <TableCell>{session.start_date}</TableCell>
//                   <TableCell>{session.finish_date}</TableCell>
//                   <TableCell>
//                     {Array.isArray(session.employee_names)
//                       ? session.employee_names.join(", ")
//                       : ""}
//                   </TableCell>
//                   <TableCell>{session.training_cost}</TableCell>
//                   {/* <TableCell>
//                     {session.training_status === 1 ? "Completed" : "Pending"}
//                   </TableCell> */}
//                   <TableCell>
//   {session.training_status === 0
//     ? "Scheduled"
//     : session.training_status === 1
//     ? "Ongoing"
//     : session.training_status === 2
//     ? "Completed"
//     : "Unknown"}
// </TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="secondary"
//                       onClick={() => handleDeleteSession(session.training_id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleEditSession(session)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       {/* Dialog for adding/editing session */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
//         <DialogTitle>
//           {isEditMode ? "Edit" : "Add"} Training Session
//         </DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ mb: 2 }}>
//   <InputLabel>Training Skill</InputLabel>
//   <Select
//   name="training_skills"
//   value={newSession.training_skills}
//   onChange={handleChangeNewSession}
//   label="Training Skill"
// >
//   {skills.map((skill) => (
//     <MenuItem key={skill.value} value={skill.value}>
//       {skill.label}
//     </MenuItem>
//   ))}
// </Select>

// </FormControl>


//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Trainer</InputLabel>
//             <Select
//               name="trainer"
//               value={newSession.trainer}
//               onChange={handleChangeNewSession}
//               label="Trainer"
//             >
//               {trainers.map((trainer) => (
//                 <MenuItem key={trainer.value} value={trainer.value}>
//                   {trainer.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           {/* Date Picker for Start Date */}
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <DatePicker
//                   label="Start Date"
//                   value={newSession.startDate}
//                   onChange={(newDate) =>
//                     setNewSession((prev) => ({ ...prev, startDate: newDate }))
//                   }
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>

//               {/* Date Picker for End Date */}
//               <Grid item xs={12} sm={6}>
//                 <DatePicker
//                   label="End Date"
//                   value={newSession.endDate}
//                   onChange={(newDate) =>
//                     setNewSession((prev) => ({ ...prev, endDate: newDate }))
//                   }
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>
//             </Grid>
//           </LocalizationProvider>

//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Employees</InputLabel>
//             <Select
//               multiple
//               name="employees"
//               value={newSession.employees || []}
//               onChange={handleChangeNewSession}
//               input={<OutlinedInput label="Employees" />}
//               renderValue={(selected) => selected.join(", ")}
//             >
//               {employees.map((emp) => (
//                 <MenuItem key={emp.value} value={emp.label}>
//                   <Checkbox
//                     checked={newSession.employees?.indexOf(emp.label) > -1}
//                   />
//                   <ListItemText primary={emp.label} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             label="Training Cost"
//             fullWidth
//             name="trainingCost"
//             value={newSession.trainingCost}
//             onChange={handleChangeNewSession}
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Status</InputLabel>
//             <Select
//               name="status"
//               value={newSession.status}
//               onChange={handleChangeNewSession}
//             >
//               <MenuItem value="Scheduled">Scheduled</MenuItem>
//               <MenuItem value="Ongoing">Ongoing</MenuItem>
//               <MenuItem value="Completed">Completed</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={isEditMode ? handleSaveSession : handleAddNewSession}
//             color="primary"
//           >
//             {isEditMode ? "Save" : "Add Session"}
//           </Button>
//         </DialogActions>
//       </Dialog>
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
  Paper,
  TablePagination,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
  Skeleton,
  Alert,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Chip,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  AttachMoney as MoneyIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material"

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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={100} />
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={80} />
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={80} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={150} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={60} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rounded" width={80} height={24} />
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </TableCell>
  </TableRow>
)

export default function TrainingSession() {
  // State management
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)

  // Data states
  const [trainers, setTrainers] = useState([])
  const [employees, setEmployees] = useState([])
  const [trainings, setTrainings] = useState([])
  const [skills, setSkills] = useState([])

  // Loading states
  const [loading, setLoading] = useState(true)
  const [trainersLoading, setTrainersLoading] = useState(true)
  const [employeesLoading, setEmployeesLoading] = useState(true)
  const [trainingsLoading, setTrainingsLoading] = useState(true)
  const [skillsLoading, setSkillsLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Error states
  const [error, setError] = useState(null)
  const [dialogError, setDialogError] = useState(null)
  const [apiErrors, setApiErrors] = useState({
    trainers: null,
    employees: null,
    trainings: null,
    skills: null,
  })

  const [newSession, setNewSession] = useState({
    training_skills: "",
    trainer: "",
    startDate: null,
    endDate: null,
    employees: [],
    trainingCost: "",
    status: "",
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Optimized API call function with retry logic
  const apiCall = async (url, options = {}, retries = 3) => {
    const token = localStorage.getItem("accessToken")
    const defaultOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, defaultOptions)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        if (i === retries - 1) throw error
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  }

  // Fetch all data concurrently for better performance
  const fetchAllData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [trainersData, employeesData, trainingsData, skillsData] = await Promise.allSettled([
        apiCall("https://tdtlworld.com/hrms-backend/trainers/"),
        apiCall("https://tdtlworld.com/hrms-backend/employee-dropdown/"),
        apiCall("https://tdtlworld.com/hrms-backend/trainings/"),
        apiCall("https://tdtlworld.com/hrms-backend/api/training-skills/"),
      ])

      // Handle trainers
      if (trainersData.status === "fulfilled" && trainersData.value?.data) {
        const trainerOptions = trainersData.value.data.map((trainer) => ({
          id: trainer.id,
          value: `${trainer.first_name.trim()} ${trainer.last_name.trim()}`,
          label: `${trainer.first_name.trim()} ${trainer.last_name.trim()}`,
        }))
        setTrainers(trainerOptions)
        setApiErrors((prev) => ({ ...prev, trainers: null }))
      } else {
        setApiErrors((prev) => ({ ...prev, trainers: "Failed to load trainers" }))
      }
      setTrainersLoading(false)

      // Handle employees
      if (employeesData.status === "fulfilled" && Array.isArray(employeesData.value)) {
        setEmployees(employeesData.value)
        setApiErrors((prev) => ({ ...prev, employees: null }))
      } else {
        setApiErrors((prev) => ({ ...prev, employees: "Failed to load employees" }))
      }
      setEmployeesLoading(false)

      // Handle trainings
      if (trainingsData.status === "fulfilled") {
        const data = trainingsData.value
        if (Array.isArray(data)) {
          setTrainings(data)
        } else if (Array.isArray(data.data)) {
          setTrainings(data.data)
        } else {
          setTrainings([])
        }
        setApiErrors((prev) => ({ ...prev, trainings: null }))
      } else {
        setApiErrors((prev) => ({ ...prev, trainings: "Failed to load trainings" }))
      }
      setTrainingsLoading(false)

      // Handle skills
      if (skillsData.status === "fulfilled") {
        setSkills(skillsData.value)
        setApiErrors((prev) => ({ ...prev, skills: null }))
      } else {
        setApiErrors((prev) => ({ ...prev, skills: "Failed to load skills" }))
      }
      setSkillsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchAllData()
  }, [refreshKey])

  // Refresh data function
  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(0) // Reset to first page when searching
  }

  const handleAddNewSession = async () => {
    if (!validateForm()) return

    setSubmitLoading(true)
    setDialogError(null)

    try {
      const selectedTrainer = trainers.find((trainer) => trainer.value === newSession.trainer)
      const trainerId = selectedTrainer ? selectedTrainer.id || 1 : 1

      const selectedSkill = skills.find((skill) => skill.value === newSession.training_skills)
      const skillLabel = selectedSkill ? selectedSkill.label : ""

      const selectedEmployeeIds = []
      if (Array.isArray(newSession.employees) && employees.length > 0) {
        newSession.employees.forEach((empName) => {
          const emp = employees.find((e) => e.label === empName)
          if (emp && emp.value) {
            selectedEmployeeIds.push(emp.value)
          }
        })
      }

      const startDate = newSession.startDate ? new Date(newSession.startDate).toISOString().split("T")[0] : null
      const endDate = newSession.endDate ? new Date(newSession.endDate).toISOString().split("T")[0] : null

      const trainingData = {
        company_id: 2,
        employee_id: selectedEmployeeIds.length > 0 ? selectedEmployeeIds.join(",") : "0",
        training_type_id: 127,
        associated_goals: "None",
        trainer_id: trainerId,
        start_date: startDate,
        finish_date: endDate,
        training_cost: newSession.trainingCost || "0.00",
        training_status: newSession.status === "Completed" ? 1 : 0,
        description: "Training session",
        performance: "0",
        remarks: "No remarks",
        created_at:
          new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].substring(0, 8),
        training_skills: skillLabel,
      }

      const result = await apiCall("https://tdtlworld.com/hrms-backend/trainings/", {
        method: "POST",
        body: JSON.stringify(trainingData),
      })

      console.log("Training session added successfully:", result)

      // Refresh trainings data
      const data = await apiCall("https://tdtlworld.com/hrms-backend/trainings/")
      if (Array.isArray(data)) {
        setTrainings(data)
      } else if (Array.isArray(data.data)) {
        setTrainings(data.data)
      }

      setOpenDialog(false)
      resetForm()
    } catch (error) {
      console.error("Error adding training session:", error)
      setDialogError("Failed to add training session. Please try again.")
    } finally {
      setSubmitLoading(false)
    }
  }

  const validateForm = () => {
    if (!newSession.training_skills) {
      setDialogError("Please select a training skill.")
      return false
    }
    if (!newSession.trainer) {
      setDialogError("Please select a trainer.")
      return false
    }
    if (!newSession.startDate) {
      setDialogError("Please select a start date.")
      return false
    }
    if (!newSession.endDate) {
      setDialogError("Please select an end date.")
      return false
    }
    if (!newSession.status) {
      setDialogError("Please select a status.")
      return false
    }
    return true
  }

  const handleEditSession = (session) => {
    setIsEditMode(true)
    setSelectedSession(session)

    setNewSession({
      training_skills: session.training_skills || "",
      trainer: session.trainer_name || "",
      startDate: session.start_date ? new Date(session.start_date) : null,
      endDate: session.finish_date ? new Date(session.finish_date) : null,
      employees: session.employee_names || [],
      trainingCost: session.training_cost || "",
      status:
        session.training_status === 0
          ? "Scheduled"
          : session.training_status === 1
            ? "Ongoing"
            : session.training_status === 2
              ? "Completed"
              : "",
    })

    setOpenDialog(true)
  }

  const handleSaveSession = async () => {
    if (!selectedSession || !validateForm()) return

    setSubmitLoading(true)
    setDialogError(null)

    try {
      const selectedTrainer = trainers.find((trainer) => trainer.value === newSession.trainer)
      const trainerId = selectedTrainer ? selectedTrainer.id || 1 : 1

      const selectedEmployeeIds = []
      if (Array.isArray(newSession.employees) && employees.length > 0) {
        newSession.employees.forEach((empName) => {
          const emp = employees.find((e) => e.label === empName)
          if (emp && emp.value) {
            selectedEmployeeIds.push(emp.value)
          }
        })
      }

      const selectedSkill = skills.find((skill) => skill.value === newSession.training_skills)
      const skillLabel = selectedSkill ? selectedSkill.label : ""

      const startDate = newSession.startDate ? new Date(newSession.startDate).toISOString().split("T")[0] : null
      const endDate = newSession.endDate ? new Date(newSession.endDate).toISOString().split("T")[0] : null

      const trainingData = {
        training_id: selectedSession.training_id,
        company_id: selectedSession.company_id || 2,
        employee_id: selectedEmployeeIds.length > 0 ? selectedEmployeeIds.join(",") : "0",
        training_type_id: selectedSession.training_type_id || 127,
        associated_goals: "None",
        trainer_id: trainerId,
        start_date: startDate,
        finish_date: endDate,
        training_cost: newSession.trainingCost || "0.00",
        training_status:
          newSession.status === "Scheduled"
            ? 0
            : newSession.status === "Ongoing"
              ? 1
              : newSession.status === "Completed"
                ? 2
                : 0,
        description: selectedSession.description || "Training session",
        performance: selectedSession.performance || "0",
        remarks: "No remarks",
        created_at:
          selectedSession.created_at ||
          new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].substring(0, 8),
        training_skills: skillLabel,
      }

      const result = await apiCall(`https://tdtlworld.com/hrms-backend/trainings/${selectedSession.training_id}/`, {
        method: "PATCH",
        body: JSON.stringify(trainingData),
      })

      console.log("Training session updated successfully:", result)

      // Refresh trainings data
      const data = await apiCall("https://tdtlworld.com/hrms-backend/trainings/")
      if (Array.isArray(data)) {
        setTrainings(data)
      } else if (Array.isArray(data.data)) {
        setTrainings(data.data)
      }

      setOpenDialog(false)
      resetForm()
    } catch (error) {
      console.error("Error updating training session:", error)
      setDialogError("Failed to update training session. Please try again.")
    } finally {
      setSubmitLoading(false)
    }
  }

  const resetForm = () => {
    setNewSession({
      training_skills: "",
      trainer: "",
      startDate: null,
      endDate: null,
      employees: [],
      trainingCost: "",
      status: "",
    })
    setIsEditMode(false)
    setSelectedSession(null)
    setDialogError(null)
  }

  const handleChangeNewSession = (e) => {
    const { name, value } = e.target
    setNewSession((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (dialogError) setDialogError(null)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    resetForm()
  }

  const handleDeleteSession = async (id) => {
    if (!id) return

    setDeleteLoading(true)
    try {
      await apiCall(`https://tdtlworld.com/hrms-backend/trainings/${id}/`, { method: "DELETE" })

      console.log("Training session deleted successfully")
      setTrainings(trainings.filter((session) => session.training_id !== id))
    } catch (error) {
      console.error("Error deleting training session:", error)
      setError("Failed to delete training session. Please try again.")
    } finally {
      setDeleteLoading(false)
    }
  }

  const filteredData = trainings.filter((session) => {
    const skills = session.training_skills?.toLowerCase() || ""
    const trainer = session.trainer_name?.toLowerCase() || ""
    const employeeNames = Array.isArray(session.employee_names) ? session.employee_names.join(", ").toLowerCase() : ""

    const query = searchQuery.toLowerCase()
    return skills.includes(query) || trainer.includes(query) || employeeNames.includes(query)
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "warning"
      case 1:
        return "info"
      case 2:
        return "success"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <ScheduleIcon />
      case 1:
        return <PlayArrowIcon />
      case 2:
        return <CheckCircleIcon />
      default:
        return <ScheduleIcon />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Scheduled"
      case 1:
        return "Ongoing"
      case 2:
        return "Completed"
      default:
        return "Unknown"
    }
  }

  if (loading) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
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
            <Skeleton variant="text" width={200} height={40} />
            <Skeleton variant="text" width={300} height={20} sx={{ mt: 1 }} />
          </CardContent>
        </Card>
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
                  {Array.from(new Array(8)).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
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
      </Box>
    )
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
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
            Training Sessions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all training sessions and employee development programs
          </Typography>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* API Errors */}
      {Object.values(apiErrors).some((error) => error) && (
        <Alert
          severity="warning"
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          Some data failed to load. Please refresh to try again.
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
          placeholder="Search by skills, trainer, or employees..."
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
            onClick={handleOpenDialog}
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
            Add Training Session
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(36, 73, 239, 0.02)",
          border: "1px solid rgba(36, 73, 239, 0.1)",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AssignmentIcon fontSize="small" />
          Total Sessions: {trainings.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon fontSize="small" />
          Filtered: {filteredData.length}
        </Typography>
      </Box>

      {/* Table Section */}
      {trainingsLoading ? (
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
                  {Array.from(new Array(8)).map((_, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
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
      ) : !error && trainings.length === 0 && !searchQuery ? (
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px dashed rgba(0,0,0,0.1)",
          }}
        >
          <SchoolIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No training sessions available at the moment.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add Training Session" to create your first training session.
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
            <Table stickyHeader aria-label="training sessions table">
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
                  <TableCell sx={{ fontWeight: "bold" }}>Training Skills</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Trainer</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Employees</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Training Cost</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchQuery ? "No training sessions match your search." : "No training sessions found."}
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
                ) : (
                  filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((session) => (
                    <TableRow
                      key={session.training_id}
                      hover
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
                          <SchoolIcon sx={{ mr: 1, color: "rgba(36, 73, 239, 0.7)", fontSize: 20 }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {session.training_skills || "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PersonIcon sx={{ mr: 1, color: "rgba(218, 18, 202, 0.7)", fontSize: 20 }} />
                          <Typography variant="body2">{session.trainer_name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2">
                            {session.start_date ? new Date(session.start_date).toLocaleDateString() : "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2">
                            {session.finish_date ? new Date(session.finish_date).toLocaleDateString() : "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <GroupIcon sx={{ mr: 1, color: "rgba(36, 73, 239, 0.7)", fontSize: 20 }} />
                          <Tooltip
                            title={
                              Array.isArray(session.employee_names) ? session.employee_names.join(", ") : "No employees"
                            }
                            arrow
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                maxWidth: 150,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {Array.isArray(session.employee_names)
                                ? session.employee_names.join(", ")
                                : "No employees"}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <MoneyIcon sx={{ mr: 1, color: "rgba(76, 175, 80, 0.7)", fontSize: 20 }} />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ${session.training_cost}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(session.training_status)}
                          color={getStatusColor(session.training_status)}
                          size="small"
                          icon={getStatusIcon(session.training_status)}
                          sx={{
                            fontWeight: 500,
                            borderRadius: 1.5,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Edit Session">
                            <IconButton
                              color="primary"
                              onClick={() => handleEditSession(session)}
                              size="small"
                              sx={{
                                bgcolor: "rgba(36, 73, 239, 0.1)",
                                "&:hover": { bgcolor: "rgba(36, 73, 239, 0.2)" },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Session">
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteSession(session.training_id)}
                              disabled={deleteLoading}
                              size="small"
                              sx={{
                                bgcolor: "rgba(244, 67, 54, 0.1)",
                                "&:hover": { bgcolor: "rgba(244, 67, 54, 0.2)" },
                              }}
                            >
                              {deleteLoading ? (
                                <CircularProgress size={16} color="inherit" />
                              ) : (
                                <DeleteIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredData.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={filteredData.length}
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

      {/* Dialog for adding/editing session */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
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
            {isEditMode ? <EditIcon /> : <AddIcon />}
            {isEditMode ? "Edit" : "Add"} Training Session
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

          <Grid container spacing={3}>
            {/* Training Skills */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Training Skill</InputLabel>
                <Select
                  name="training_skills"
                  value={newSession.training_skills}
                  onChange={handleChangeNewSession}
                  label="Training Skill"
                  disabled={skillsLoading}
                  startAdornment={<SchoolIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  {skillsLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Loading skills...
                    </MenuItem>
                  ) : (
                    skills.map((skill) => (
                      <MenuItem key={skill.value} value={skill.value}>
                        {skill.label}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Trainer */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Trainer</InputLabel>
                <Select
                  name="trainer"
                  value={newSession.trainer}
                  onChange={handleChangeNewSession}
                  label="Trainer"
                  disabled={trainersLoading}
                  startAdornment={<PersonIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  {trainersLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Loading trainers...
                    </MenuItem>
                  ) : (
                    trainers.map((trainer) => (
                      <MenuItem key={trainer.value} value={trainer.value}>
                        {trainer.label}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Pickers */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={newSession.startDate}
                  onChange={(newDate) => setNewSession((prev) => ({ ...prev, startDate: newDate }))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={newSession.endDate}
                  onChange={(newDate) => setNewSession((prev) => ({ ...prev, endDate: newDate }))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* Employees */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Employees</InputLabel>
                <Select
                  multiple
                  name="employees"
                  value={newSession.employees || []}
                  onChange={handleChangeNewSession}
                  input={<OutlinedInput label="Employees" />}
                  renderValue={(selected) => selected.join(", ")}
                  disabled={employeesLoading}
                  startAdornment={<GroupIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  {employeesLoading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Loading employees...
                    </MenuItem>
                  ) : (
                    employees.map((emp) => (
                      <MenuItem key={emp.value} value={emp.label}>
                        <Checkbox checked={newSession.employees?.indexOf(emp.label) > -1} />
                        <ListItemText primary={emp.label} />
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Training Cost */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Training Cost"
                fullWidth
                name="trainingCost"
                value={newSession.trainingCost}
                onChange={handleChangeNewSession}
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={newSession.status}
                  onChange={handleChangeNewSession}
                  label="Status"
                  startAdornment={<AssignmentIcon sx={{ mr: 1, color: "action.active" }} />}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Ongoing">Ongoing</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
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
            disabled={submitLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={isEditMode ? handleSaveSession : handleAddNewSession}
            variant="contained"
            disabled={submitLoading}
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
            {submitLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Add Session"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
