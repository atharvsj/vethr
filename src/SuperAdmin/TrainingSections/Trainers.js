// // src/SuperAdmin/TrainingSections/Trainers.js

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   Pagination,
//   IconButton,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// // Sample data for trainers
// const generateTrainerData = () => {
//   return [
//     { id: 1, firstName: "John", lastName: "Doe", contact: "123-456-7890", email: "john.doe@example.com", address: "123 Main St", expertise: "React, Node.js" },
//     { id: 2, firstName: "Jane", lastName: "Smith", contact: "234-567-8901", email: "jane.smith@example.com", address: "456 Oak St", expertise: "Python, Django" },
//     { id: 3, firstName: "Alice", lastName: "Brown", contact: "345-678-9012", email: "alice.brown@example.com", address: "789 Pine St", expertise: "Java, Spring Boot" },
//     { id: 4, firstName: "Bob", lastName: "Johnson", contact: "456-789-0123", email: "bob.johnson@example.com", address: "321 Birch St", expertise: "PHP, Laravel" },
//     { id: 5, firstName: "Charlie", lastName: "Davis", contact: "567-890-1234", email: "charlie.davis@example.com", address: "654 Cedar St", expertise: "Angular, Node.js" },
//     { id: 6, firstName: "Emily", lastName: "Clark", contact: "678-901-2345", email: "emily.clark@example.com", address: "987 Maple St", expertise: "C#, .NET" },
//     { id: 7, firstName: "David", lastName: "White", contact: "789-012-3456", email: "david.white@example.com", address: "123 Elm St", expertise: "React, Express" },
//     { id: 8, firstName: "Sarah", lastName: "Lewis", contact: "890-123-4567", email: "sarah.lewis@example.com", address: "432 Pine St", expertise: "Vue.js, Firebase" },
//     { id: 9, firstName: "Michael", lastName: "Martinez", contact: "901-234-5678", email: "michael.martinez@example.com", address: "765 Oak St", expertise: "JavaScript, TypeScript" },
//     { id: 10, firstName: "Olivia", lastName: "Harris", contact: "012-345-6789", email: "olivia.harris@example.com", address: "876 Birch St", expertise: "Ruby on Rails" },
//     { id: 11, firstName: "James", lastName: "Miller", contact: "123-456-7890", email: "james.miller@example.com", address: "234 Maple St", expertise: "Node.js, MongoDB" },
//     { id: 12, firstName: "Lily", lastName: "Roberts", contact: "234-567-8901", email: "lily.roberts@example.com", address: "123 Pine St", expertise: "PHP, WordPress" }
//   ];
// };

// export default function Trainers() {
//   const [trainers, setTrainers] = useState(generateTrainerData());
//   const [filteredTrainers, setFilteredTrainers] = useState(trainers);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newTrainer, setNewTrainer] = useState({
//     firstName: "",
//     lastName: "",
//     contact: "",
//     email: "",
//     address: "",
//     expertise: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1); // To handle pagination
//   const trainersPerPage = 5;  // Updated to show 5 entries per page
//   const [error, setError] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false); // Track whether we're in edit mode
//   const [editingTrainerId, setEditingTrainerId] = useState(null); // Store ID of the trainer being edited

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter the trainers based on the search query
//     const filtered = trainers.filter((trainer) => {
//       return (
//         trainer.firstName.toLowerCase().includes(query) ||
//         trainer.lastName.toLowerCase().includes(query) ||
//         trainer.contact.includes(query) ||
//         trainer.email.toLowerCase().includes(query) ||
//         trainer.address.toLowerCase().includes(query) ||
//         trainer.expertise.toLowerCase().includes(query)
//       );
//     });
//     setFilteredTrainers(filtered);
//     setPage(1); // Reset pagination to first page after search
//   };

//   // Handle dialog open and close
//   const handleDialogOpen = (trainer = null) => {
//     if (trainer) {
//       setIsEditMode(true);
//       setEditingTrainerId(trainer.id);
//       setNewTrainer(trainer); // Populate with existing trainer data for editing
//     } else {
//       setIsEditMode(false);
//       setEditingTrainerId(null);
//       setNewTrainer({
//         firstName: "",
//         lastName: "",
//         contact: "",
//         email: "",
//         address: "",
//         expertise: "",
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setError(""); // Clear error when dialog closes
//   };

//   // Handle input changes in the Add/Edit Trainer form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Prevent input if the value is longer than 10 characters for the contact
//     if (name === "contact" && value.length > 10) return;

//     // Allow only numeric values for the contact
//     if (name === "contact" && !/^\d*$/.test(value)) return;

//     setNewTrainer((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Validate the input fields
//   const validateInput = () => {
//     const { firstName, lastName, contact, email, address, expertise } = newTrainer;

//     // Email validation (standard format)
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return "Please enter a valid email address.";
//     }

//     // Contact number validation (should be 10 digits and not all zeros)
//     const contactRegex = /^[0-9]{10}$/;
//     if (!contactRegex.test(contact)) {
//       return "Mobile number should be 10 digits.";
//     }
//     if (contact === "0000000000") {
//       return "Mobile number cannot be all zeros.";
//     }

//     // Check for empty required fields
//     if (!firstName || !lastName || !contact || !email || !address || !expertise) {
//       return "Please fill all fields.";
//     }

//     return null;
//   };

//   // Add the new trainer to the list or update existing trainer
//   const handleSaveTrainer = () => {
//     const validationError = validateInput();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     if (isEditMode) {
//       // Update existing trainer
//       const updatedTrainers = trainers.map((trainer) =>
//         trainer.id === editingTrainerId ? { ...trainer, ...newTrainer } : trainer
//       );
//       setTrainers(updatedTrainers);
//       setFilteredTrainers(updatedTrainers);
//     } else {
//       // Add new trainer
//       const newTrainerData = { ...newTrainer, id: trainers.length + 1 };
//       setTrainers([...trainers, newTrainerData]);
//       setFilteredTrainers([...trainers, newTrainerData]);
//     }

//     setNewTrainer({
//       firstName: "",
//       lastName: "",
//       contact: "",
//       email: "",
//       address: "",
//       expertise: "",
//     });
//     setOpenDialog(false);
//   };

//   // Delete trainer
//   const handleDeleteTrainer = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this trainer?");
//     if (confirmDelete) {
//       const updatedTrainers = trainers.filter((trainer) => trainer.id !== id);
//       setTrainers(updatedTrainers);
//       setFilteredTrainers(updatedTrainers); // Update filtered list after deletion
//     }
//   };

//   // Pagination logic
//   const indexOfLastTrainer = page * trainersPerPage;
//   const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
//   const currentTrainers = filteredTrainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

//   // Change page
//   const handleChangePage = (event, value) => {
//     setPage(value);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", mb: 2 }}>
//         <h2>Trainers</h2>
//         <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
//           <TextField
//             label="Search Trainers"
//             variant="outlined"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             sx={{ width: { xs: "100%", sm: 300 } }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleDialogOpen()}
//             startIcon={<AddIcon />}
//             sx={{ width: { xs: "100%", sm: "auto" } }}
//           >
//             Add New Trainer
//           </Button>
//         </Box>
//       </Box>

//       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Trainer Name</TableCell>
//               <TableCell>Contact</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Expertise</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentTrainers.map((trainer) => (
//               <TableRow key={trainer.id}>
//                 <TableCell>{`${trainer.firstName} ${trainer.lastName}`}</TableCell>
//                 <TableCell>{trainer.contact}</TableCell>
//                 <TableCell>{trainer.email}</TableCell>
//                 <TableCell>{trainer.address}</TableCell>
//                 <TableCell>{trainer.expertise}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleDialogOpen(trainer)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDeleteTrainer(trainer.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//         <Pagination
//           count={Math.ceil(filteredTrainers.length / trainersPerPage)}
//           page={page}
//           onChange={handleChangePage}
//           color="primary"
//         />
//       </Box>

//       {/* Add/Edit Trainer Dialog */}
//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>{isEditMode ? "Edit Trainer" : "Add New Trainer"}</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="First Name"
//                 fullWidth
//                 name="firstName"
//                 value={newTrainer.firstName}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Last Name"
//                 fullWidth
//                 name="lastName"
//                 value={newTrainer.lastName}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Contact"
//                 fullWidth
//                 name="contact"
//                 value={newTrainer.contact}
//                 onChange={handleInputChange}
//                 inputProps={{ maxLength: 10 }} // Restrict input to 10 characters
//                 error={Boolean(error && error.includes("Mobile"))}
//                 helperText={error && error.includes("Mobile") && error}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 fullWidth
//                 name="email"
//                 value={newTrainer.email}
//                 onChange={handleInputChange}
//                 error={Boolean(error && error.includes("email"))}
//                 helperText={error && error.includes("email") && error}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 fullWidth
//                 name="address"
//                 value={newTrainer.address}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Expertise"
//                 fullWidth
//                 name="expertise"
//                 value={newTrainer.expertise}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             {error && <Box color="red">{error}</Box>}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveTrainer} color="primary">
//             {isEditMode ? "Update Trainer" : "Add Trainer"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   IconButton,
//   Pagination,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function Trainers() {
//   //const [trainers] = useState([]); // Empty static list
//   const [filteredTrainers] = useState([]); // No filtering required
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newTrainer, setNewTrainer] = useState({
//     firstName: "",
//     lastName: "",
//     contact: "",
//     email: "",
//     address: "",
//     expertise: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const trainersPerPage = 5;
//   const [error, setError] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);

//   const [editTrainerId, setEditTrainerId] = useState(null);

//   const [trainers, setTrainers] = useState([]);

//   useEffect(() => {
//     const fetchTrainers = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await fetch(
//           "https://tdtlworld.com/hrms-backend/trainers/",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch trainers");
//         }

//         const result = await response.json();
//         setTrainers(result.data || []);
//       } catch (error) {
//         console.error("Error fetching trainer data:", error);
//       }
//     };

//     fetchTrainers();
//   }, []);

//   const handleSearchChange = () => {};

//   const handleDialogOpen = () => {
//     setIsEditMode(false);
//     setNewTrainer({
//       firstName: "",
//       lastName: "",
//       contact: "",
//       email: "",
//       address: "",
//       expertise: "",
//     });
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setError("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTrainer({
//       ...newTrainer,
//       [name]: value,
//     });
//   };

//   const handleSaveTrainer = async () => {
//     // Validate all fields are filled
//     if (
//       !newTrainer.firstName ||
//       !newTrainer.lastName ||
//       !newTrainer.contact ||
//       !newTrainer.email ||
//       !newTrainer.address ||
//       !newTrainer.expertise
//     ) {
//       setError("All fields are mandatory");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await fetch(
//         isEditMode
//           ? `https://tdtlworld.com/hrms-backend/trainers/${editTrainerId}/`
//           : "https://tdtlworld.com/hrms-backend/trainers/",
//         {
//           method: isEditMode ? "PATCH" : "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             first_name: newTrainer.firstName,
//             last_name: newTrainer.lastName,
//             contact_number: newTrainer.contact,
//             email: newTrainer.email,
//             address: newTrainer.address,
//             expertise: newTrainer.expertise,
//             company_id: 2,
//             created_at:
//               new Date().toISOString().split("T")[0] +
//               " " +
//               new Date().toTimeString().split(" ")[0].substring(0, 8),
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create trainer");
//       }

//       const result = await response.json();
//       console.log("Trainer created successfully:", result);

//       // Add the new trainer to the list
//       setTrainers([...trainers, result.data]);

//       // Close the dialog and reset form
//       setOpenDialog(false);
//       setError("");

//       // Refresh the trainers list
//       const fetchTrainers = async () => {
//         try {
//           const token = localStorage.getItem("accessToken");
//           const response = await fetch(
//             "https://tdtlworld.com/hrms-backend/trainers/",
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (!response.ok) {
//             throw new Error("Failed to fetch trainers");
//           }

//           const result = await response.json();
//           setTrainers(result.data || []);
//         } catch (error) {
//           console.error("Error fetching trainer data:", error);
//         }
//       };

//       fetchTrainers();
//     } catch (error) {
//       console.error("Error creating trainer:", error);
//       setError(error.message || "Failed to create trainer");
//     }
//   };

//   const handleEditTrainer = (trainer) => {
//     setIsEditMode(true);
//     setNewTrainer({
//       firstName: trainer.first_name,
//       lastName: trainer.last_name,
//       contact: trainer.contact_number,
//       email: trainer.email,
//       address: trainer.address,
//       expertise: trainer.expertise,
//     });
//     setOpenDialog(true);
//     setEditTrainerId(trainer.trainer_id); // You also need to define this state
//   };

//   const handleDeleteTrainer = async (trainerId) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/trainers/${trainerId}/`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete trainer");
//       }

//       // Refresh trainer list
//       setTrainers(trainers.filter((t) => t.trainer_id !== trainerId));
//     } catch (error) {
//       console.error("Error deleting trainer:", error);
//       alert(error.message || "Failed to delete trainer");
//     }
//   };

//   const handleChangePage = (event, value) => {
//     setPage(value);
//   };

//   //const currentTrainers = [];

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
//         <h2>Trainers</h2>
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <TextField
//             label="Search Trainers"
//             variant="outlined"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             sx={{ width: { xs: "100%", sm: 300 } }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleDialogOpen}
//             startIcon={<AddIcon />}
//             sx={{ width: { xs: "100%", sm: "auto" } }}
//           >
//             Add New Trainer
//           </Button>
//         </Box>
//       </Box>

//       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Trainer Name</TableCell>
//               <TableCell>Contact</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Expertise</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {trainers.map((trainer) => (
//               <TableRow key={trainer.trainer_id}>
//                 <TableCell>{`${trainer.first_name} ${trainer.last_name}`}</TableCell>
//                 <TableCell>{trainer.contact_number}</TableCell>
//                 <TableCell>{trainer.email}</TableCell>
//                 <TableCell>{trainer.address}</TableCell>
//                 <TableCell>{trainer.expertise}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={() => {
//                       handleEditTrainer(trainer);
//                     }}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => {
//                       handleDeleteTrainer(trainer.trainer_id);
//                     }}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//         <Pagination
//           count={Math.ceil(filteredTrainers.length / trainersPerPage)}
//           page={page}
//           onChange={handleChangePage}
//           color="primary"
//         />
//       </Box>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>
//           {isEditMode ? "Edit Trainer" : "Add New Trainer"}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="First Name"
//                 fullWidth
//                 name="firstName"
//                 value={newTrainer.firstName}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Last Name"
//                 fullWidth
//                 name="lastName"
//                 value={newTrainer.lastName}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Contact"
//                 fullWidth
//                 name="contact"
//                 value={newTrainer.contact}
//                 onChange={handleInputChange}
//                 inputProps={{ maxLength: 10 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 fullWidth
//                 name="email"
//                 value={newTrainer.email}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 fullWidth
//                 name="address"
//                 value={newTrainer.address}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Expertise"
//                 fullWidth
//                 name="expertise"
//                 value={newTrainer.expertise}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//             {error && <Box color="red">{error}</Box>}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveTrainer} color="primary">
//             {isEditMode ? "Update Trainer" : "Add Trainer"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Skeleton,
  Alert,
  CircularProgress,
  TablePagination,
  Avatar,
  Chip,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  SupervisorAccount as TrainerIcon,
} from "@mui/icons-material"

// Skeleton component for table rows
const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
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
        <Skeleton variant="text" width={150} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" width={200} />
    </TableCell>
    <TableCell>
      <Skeleton variant="rounded" width={100} height={24} />
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </TableCell>
  </TableRow>
)

export default function Trainers() {
  const [trainers, setTrainers] = useState([])
  const [filteredTrainers, setFilteredTrainers] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newTrainer, setNewTrainer] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    expertise: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [error, setError] = useState("")
  const [dialogError, setDialogError] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [editTrainerId, setEditTrainerId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const fetchTrainers = async () => {
    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("https://tdtlworld.com/hrms-backend/trainers/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch trainers: ${response.statusText} (${response.status})`)
      }

      const result = await response.json()
      const trainersData = result.data || []
      setTrainers(trainersData)
      setFilteredTrainers(trainersData)
    } catch (error) {
      console.error("Error fetching trainer data:", error)
      setError(error.message || "An unknown error occurred while fetching data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrainers()
  }, [refreshKey])

  useEffect(() => {
    const filtered = trainers.filter((trainer) => {
      const searchTerm = searchQuery.toLowerCase()
      const fullName = `${trainer.first_name} ${trainer.last_name}`.toLowerCase()
      return (
        fullName.includes(searchTerm) ||
        trainer.email?.toLowerCase().includes(searchTerm) ||
        trainer.expertise?.toLowerCase().includes(searchTerm) ||
        trainer.contact_number?.includes(searchTerm)
      )
    })
    setFilteredTrainers(filtered)
    setPage(0)
  }, [searchQuery, trainers])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  const handleDialogOpen = () => {
    setIsEditMode(false)
    setNewTrainer({
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      address: "",
      expertise: "",
    })
    setDialogError("")
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setDialogError("")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTrainer({
      ...newTrainer,
      [name]: value,
    })
    if (dialogError) setDialogError("")
  }

  const validateForm = () => {
    if (!newTrainer.firstName.trim()) {
      setDialogError("First name is required.")
      return false
    }
    if (!newTrainer.lastName.trim()) {
      setDialogError("Last name is required.")
      return false
    }
    if (!newTrainer.contact.trim()) {
      setDialogError("Contact number is required.")
      return false
    }
    if (!newTrainer.email.trim()) {
      setDialogError("Email is required.")
      return false
    }
    if (!newTrainer.address.trim()) {
      setDialogError("Address is required.")
      return false
    }
    if (!newTrainer.expertise.trim()) {
      setDialogError("Expertise is required.")
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newTrainer.email)) {
      setDialogError("Please enter a valid email address.")
      return false
    }

    // Phone validation
    if (newTrainer.contact.length < 10) {
      setDialogError("Contact number must be at least 10 digits.")
      return false
    }

    return true
  }

  const handleSaveTrainer = async () => {
    if (!validateForm()) return

    setSubmitLoading(true)
    setDialogError("")

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(
        isEditMode
          ? `https://tdtlworld.com/hrms-backend/trainers/${editTrainerId}/`
          : "https://tdtlworld.com/hrms-backend/trainers/",
        {
          method: isEditMode ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: newTrainer.firstName,
            last_name: newTrainer.lastName,
            contact_number: newTrainer.contact,
            email: newTrainer.email,
            address: newTrainer.address,
            expertise: newTrainer.expertise,
            company_id: 2,
            created_at:
              new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].substring(0, 8),
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }))
        throw new Error(errorData.message || `Failed to ${isEditMode ? "update" : "create"} trainer`)
      }

      const result = await response.json()
      console.log(`Trainer ${isEditMode ? "updated" : "created"} successfully:`, result)

      // Close the dialog and reset form
      setOpenDialog(false)
      setDialogError("")

      // Refresh the trainers list
      fetchTrainers()
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} trainer:`, error)
      setDialogError(error.message || `Failed to ${isEditMode ? "update" : "create"} trainer`)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleEditTrainer = (trainer) => {
    setIsEditMode(true)
    setNewTrainer({
      firstName: trainer.first_name,
      lastName: trainer.last_name,
      contact: trainer.contact_number,
      email: trainer.email,
      address: trainer.address,
      expertise: trainer.expertise,
    })
    setEditTrainerId(trainer.trainer_id)
    setDialogError("")
    setOpenDialog(true)
  }

  const handleDeleteTrainer = async (trainerId) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) {
      return
    }

    setDeleteLoading(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`https://tdtlworld.com/hrms-backend/trainers/${trainerId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete trainer")
      }

      // Refresh trainer list
      setTrainers(trainers.filter((t) => t.trainer_id !== trainerId))
    } catch (error) {
      console.error("Error deleting trainer:", error)
      setError(error.message || "Failed to delete trainer")
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()
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
            Trainers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all trainers and their expertise areas
          </Typography>
        </CardContent>
      </Card>

      {error && (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
          onClose={() => setError("")}
        >
          {error}
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
          placeholder="Search trainers by name, email, or expertise..."
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
            onClick={handleDialogOpen}
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
            Add New Trainer
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
          <TrainerIcon fontSize="small" />
          Total Trainers: {trainers.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon fontSize="small" />
          Filtered: {filteredTrainers.length}
        </Typography>
      </Box>

      {loading ? (
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
                  {["Trainer Name", "Contact", "Email", "Address", "Expertise", "Actions"].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
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
      ) : !error && trainers.length === 0 && !searchQuery ? (
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px dashed rgba(0,0,0,0.1)",
          }}
        >
          <TrainerIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No trainers available at the moment.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add New Trainer" to create your first trainer profile.
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
            <Table stickyHeader aria-label="trainers table">
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
                  <TableCell sx={{ fontWeight: "bold" }}>Trainer Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Expertise</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTrainers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchQuery ? "No trainers match your search." : "No trainers found."}
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
                  filteredTrainers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trainer) => (
                    <TableRow
                      key={trainer.trainer_id}
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
                          <Avatar
                            sx={{
                              bgcolor: "rgba(36, 73, 239, 0.89)",
                              mr: 2,
                              width: 40,
                              height: 40,
                              fontSize: "0.875rem",
                            }}
                          >
                            {getInitials(trainer.first_name, trainer.last_name)}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {`${trainer.first_name} ${trainer.last_name}`}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PhoneIcon sx={{ mr: 1, color: "rgba(36, 73, 239, 0.7)", fontSize: 18 }} />
                          <Typography variant="body2">{trainer.contact_number}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EmailIcon sx={{ mr: 1, color: "rgba(218, 18, 202, 0.7)", fontSize: 18 }} />
                          <Typography variant="body2">{trainer.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationIcon sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
                          <Tooltip title={trainer.address} arrow>
                            <Typography
                              variant="body2"
                              sx={{
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {trainer.address}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={trainer.expertise}
                          color="primary"
                          size="small"
                          icon={<SchoolIcon />}
                          sx={{
                            fontWeight: 500,
                            borderRadius: 1.5,
                            bgcolor: "rgba(36, 73, 239, 0.1)",
                            color: "rgba(36, 73, 239, 0.89)",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Edit Trainer">
                            <IconButton
                              color="primary"
                              onClick={() => handleEditTrainer(trainer)}
                              size="small"
                              sx={{
                                bgcolor: "rgba(36, 73, 239, 0.1)",
                                "&:hover": { bgcolor: "rgba(36, 73, 239, 0.2)" },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Trainer">
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteTrainer(trainer.trainer_id)}
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

          {filteredTrainers.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={filteredTrainers.length}
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

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
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
            <TrainerIcon />
            {isEditMode ? "Edit Trainer" : "Add New Trainer"}
          </Box>
          <IconButton onClick={handleDialogClose} sx={{ color: "white" }}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                name="firstName"
                value={newTrainer.firstName}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                name="lastName"
                value={newTrainer.lastName}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                fullWidth
                name="contact"
                value={newTrainer.contact}
                onChange={handleInputChange}
                inputProps={{ maxLength: 15 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                type="email"
                value={newTrainer.email}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                name="address"
                value={newTrainer.address}
                onChange={handleInputChange}
                multiline
                rows={2}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Expertise"
                fullWidth
                name="expertise"
                value={newTrainer.expertise}
                onChange={handleInputChange}
                multiline
                rows={2}
                placeholder="e.g., React Development, Project Management, Data Science..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <Button
            onClick={handleDialogClose}
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
            onClick={handleSaveTrainer}
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
              "Update Trainer"
            ) : (
              "Add Trainer"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
