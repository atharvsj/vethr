 
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   IconButton,
//   styled,
//   TablePagination,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import AddIcon from "@mui/icons-material/Add";

// // Styled components for a cleaner look
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   backgroundColor: "#f4f6f8",
// });

// // A more extensive list of initial parameters to demonstrate pagination
// const initialParameters = [
//   "Communication Skills",
//   "Technical Proficiency",
//   "Team Collaboration",
//   "Problem Solving",
//   "Leadership Quality",
//   "Time Management",
//   "Adaptability",
//   "Creativity and Innovation",
//   "Work Ethic",
//   "Customer Focus",
// ];

// const ParameterManager = () => {
//   // A simple array to hold all parameters
//   const [parameters, setParameters] = useState(initialParameters);

//   // State for the Add/Edit dialog
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [currentParameter, setCurrentParameter] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);

//   // State for pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   /**
//    * Opens the dialog for adding or editing a parameter.
//    */
//   const handleOpenDialog = (param = "", index = null) => {
//     setCurrentParameter(param);
//     setEditingIndex(index);
//     setDialogOpen(true);
//   };

//   /**
//    * Closes the dialog and resets its state.
//    */
//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setCurrentParameter("");
//     setEditingIndex(null);
//   };

//   /**
//    * Handles both adding a new parameter and updating an existing one.
//    */
//   const handleAddOrUpdate = () => {
//     if (!currentParameter.trim()) return;

//     let updatedParameters;
//     if (editingIndex !== null) {
//       // Editing an existing parameter
//       updatedParameters = [...parameters];
//       updatedParameters[editingIndex] = currentParameter.trim();
//     } else {
//       // Adding a new parameter
//       updatedParameters = [...parameters, currentParameter.trim()];
//     }
//     setParameters(updatedParameters);
//     handleCloseDialog();
//   };

//   /**
//    * Deletes a parameter and adjusts the page if necessary.
//    */
//   const handleDelete = (indexToDelete) => {
//     const updatedParameters = parameters.filter(
//       (_, index) => index !== indexToDelete
//     );
//     setParameters(updatedParameters);

//     // If the last item on a page is deleted, go back to the previous page
//     if (page > 0 && page * rowsPerPage >= updatedParameters.length) {
//       setPage(page - 1);
//     }
//   };

//   // --- PAGINATION HANDLERS ---
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   const dialogTitle = editingIndex !== null ? "Edit Parameter" : "Add New Parameter";

//   return (
//     <Box sx={{ p: 3, maxWidth: "100%", margin: "auto" }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         {/* --- HEADER --- */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Typography variant="h4" component="h1" fontWeight="bold">
//             Manage Parameters
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//           >
//             Add Parameter
//           </Button>
//         </Box>

//         {/* --- PARAMETERS TABLE --- */}
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell sx={{ width: "10%" }}>S.No.</StyledHeaderCell>
//                 <StyledHeaderCell>Parameter Name</StyledHeaderCell>
//                 <StyledHeaderCell align="center" sx={{ width: "20%" }}>
//                   Actions
//                 </StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {parameters.length > 0 ? (
//                 parameters
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((param, index) => {
//                     // Calculate the original index for edit/delete functionality
//                     const originalIndex = page * rowsPerPage + index;
//                     return (
//                       <TableRow key={originalIndex} hover>
//                         <TableCell>{originalIndex + 1}</TableCell>
//                         <TableCell>{param}</TableCell>
//                         <TableCell align="center">
//                           <IconButton
//                             color="primary"
//                             aria-label="edit"
//                             onClick={() => handleOpenDialog(param, originalIndex)}
//                           >
//                             <Edit />
//                           </IconButton>
//                           <IconButton
//                             color="error"
//                             aria-label="delete"
//                             onClick={() => handleDelete(originalIndex)}
//                           >
//                             <Delete />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                     <Typography variant="subtitle1" color="text.secondary">
//                       No parameters added. Click "Add Parameter" to begin.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* --- PAGINATION CONTROLS --- */}
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={parameters.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       {/* --- ADD/EDIT DIALOG --- */}
//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>{dialogTitle}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Parameter Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentParameter}
//             onChange={(e) => setCurrentParameter(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && currentParameter.trim()) {
//                 handleAddOrUpdate();
//               }
//             }}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '0 24px 16px' }}>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleAddOrUpdate}
//             disabled={!currentParameter.trim()}
//           >
//             {editingIndex !== null ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ParameterManager;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   IconButton,
//   styled,
//   TablePagination,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import AddIcon from "@mui/icons-material/Add";

// // Define the API endpoint
// const API_URL = "https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/";

// // Styled components for a cleaner look
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   backgroundColor: "#f4f6f8",
// });

// const ParameterManager = () => {
//   // State for the list of parameters, now expecting an array of objects
//   const [parameters, setParameters] = useState([]);

//   // State for loading and error handling
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for the Add/Edit dialog
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [currentParameterName, setCurrentParameterName] = useState("");
//   const [editingParameter, setEditingParameter] = useState(null);

//   // State for pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   /**
//    * Fetches all parameters from the API.
//    */
//   const fetchParameters = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(API_URL);
//       // Assuming the API returns an array of parameters directly
//       setParameters(response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch parameters:", err);
//       setError("Failed to load parameters. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch parameters when the component mounts
//   useEffect(() => {
//     fetchParameters();
//   }, []);

//   /**
//    * Opens the dialog for adding or editing a parameter.
//    */
//   const handleOpenDialog = (param = null) => {
//     if (param) {
//       // Editing an existing parameter
//       setEditingParameter(param);
//       setCurrentParameterName(param.para_name);
//     } else {
//       // Adding a new parameter
//       setEditingParameter(null);
//       setCurrentParameterName("");
//     }
//     setDialogOpen(true);
//   };

//   /**
//    * Closes the dialog and resets its state.
//    */
//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingParameter(null);
//     setCurrentParameterName("");
//   };

//   /**
//    * Handles both adding a new parameter and updating an existing one.
//    */
//   const handleAddOrUpdate = async () => {
//     if (!currentParameterName.trim()) return;

//     try {
//       if (editingParameter) {
//         // --- UPDATE (PUT) ---
//         const payload = {
//           parameter_id: editingParameter.parameter_id,
//           para_name: currentParameterName.trim(),
//         };
//         await axios.put(API_URL, payload);
//       } else {
//         // --- ADD (POST) ---
//         const payload = { para_name: currentParameterName.trim() };
//         await axios.post(API_URL, payload);
//       }
//       // Refresh the data and close the dialog
//       await fetchParameters();
//       handleCloseDialog();
//     } catch (err) {
//       console.error("Failed to save parameter:", err);
//       setError("Failed to save the parameter. It might already exist.");
//     }
//   };

//   /**
//    * Deletes a parameter.
//    */
//   const handleDelete = async (parameterId) => {
//     // Optional: Add a confirmation dialog for a better user experience
//     if (!window.confirm("Are you sure you want to delete this parameter?")) {
//       return;
//     }

//     try {
//       // --- DELETE ---
//       // The API expects the ID in the body, which is unusual for DELETE.
//       // We use the `data` property in axios config for this.
//       await axios.delete(API_URL, {
//         data: { parameter_id: parameterId },
//       });
//       // Refresh the data
//       await fetchParameters();
//     } catch (err) {
//       console.error("Failed to delete parameter:", err);
//       setError("Failed to delete the parameter.");
//     }
//   };

//   // --- PAGINATION HANDLERS ---
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   const dialogTitle = editingParameter ? "Edit Parameter" : "Add New Parameter";

//   return (
//     <Box sx={{ p: 3, maxWidth: "100%", margin: "auto" }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         {/* --- HEADER --- */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <Typography variant="h4" component="h1" fontWeight="bold">
//             Manage Parameters
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//           >
//             Add Parameter
//           </Button>
//         </Box>

//         {/* --- ERROR ALERT --- */}
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//         {/* --- PARAMETERS TABLE --- */}
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell sx={{ width: "10%" }}>S.No.</StyledHeaderCell>
//                 <StyledHeaderCell>Parameter Name</StyledHeaderCell>
//                 <StyledHeaderCell align="center" sx={{ width: "20%" }}>
//                   Actions
//                 </StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                     <CircularProgress />
//                     <Typography>Loading Parameters...</Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : parameters.length > 0 ? (
//                 parameters
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((param, index) => (
//                     <TableRow key={param.parameter_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{param.para_name}</TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           color="primary"
//                           aria-label="edit"
//                           onClick={() => handleOpenDialog(param)}
//                         >
//                           <Edit />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           aria-label="delete"
//                           onClick={() => handleDelete(param.parameter_id)}
//                         >
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                     <Typography variant="subtitle1" color="text.secondary">
//                       No parameters found. Click "Add Parameter" to begin.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* --- PAGINATION CONTROLS --- */}
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={parameters.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       {/* --- ADD/EDIT DIALOG --- */}
//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>{dialogTitle}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Parameter Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentParameterName}
//             onChange={(e) => setCurrentParameterName(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && currentParameterName.trim()) {
//                 handleAddOrUpdate();
//               }
//             }}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '0 24px 16px' }}>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleAddOrUpdate}
//             disabled={!currentParameterName.trim()}
//           >
//             {editingParameter ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ParameterManager;    ///// 






// import React, { useState, useEffect, useMemo } from "react"; // Added useMemo
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   IconButton,
//   styled,
//   TablePagination,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { Edit, Delete, Search as SearchIcon } from "@mui/icons-material"; // Added SearchIcon
// import AddIcon from "@mui/icons-material/Add";

// // Define the API endpoint
// const API_URL = "https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/";

// // Styled components for a cleaner look
// const StyledHeaderCell = styled(TableCell)({
//   fontWeight: "bold",
//   backgroundColor: "#e3f2fd", // Changed for consistency
// });

// const ParameterManager = () => {
//   // State for the list of parameters
//   const [parameters, setParameters] = useState([]);

//   // State for loading and error handling
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for the Add/Edit dialog
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [currentParameterName, setCurrentParameterName] = useState("");
//   const [editingParameter, setEditingParameter] = useState(null);

//   // State for pagination and search
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState(""); // --- NEW: State for search ---

//   const fetchParameters = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(API_URL);
//       setParameters(response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch parameters:", err);
//       setError("Failed to load parameters. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParameters();
//   }, []);

//   const handleOpenDialog = (param = null) => {
//     if (param) {
//       setEditingParameter(param);
//       setCurrentParameterName(param.para_name);
//     } else {
//       setEditingParameter(null);
//       setCurrentParameterName("");
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingParameter(null);
//     setCurrentParameterName("");
//   };

//   const handleAddOrUpdate = async () => {
//     if (!currentParameterName.trim()) return;

//     try {
//       if (editingParameter) {
//         const payload = {
//           parameter_id: editingParameter.parameter_id,
//           para_name: currentParameterName.trim(),
//         };
//         await axios.put(API_URL, payload);
//       } else {
//         const payload = { para_name: currentParameterName.trim() };
//         await axios.post(API_URL, payload);
//       }
//       await fetchParameters();
//       handleCloseDialog();
//     } catch (err) {
//       console.error("Failed to save parameter:", err);
//       setError("Failed to save the parameter. It might already exist.");
//     }
//   };

//   const handleDelete = async (parameterId) => {
//     if (!window.confirm("Are you sure you want to delete this parameter?")) {
//       return;
//     }

//     try {
//       await axios.delete(API_URL, {
//         data: { parameter_id: parameterId },
//       });
//       await fetchParameters();
//     } catch (err) {
//       console.error("Failed to delete parameter:", err);
//       setError("Failed to delete the parameter.");
//     }
//   };
  
//   // --- NEW: Filter parameters based on search term ---
//   const filteredParameters = useMemo(() => {
//     return parameters.filter(param => 
//       param.para_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [parameters, searchTerm]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const dialogTitle = editingParameter ? "Edit Parameter" : "Add New Parameter";
  
//   // --- NEW: Reusable purple button style ---
//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: "100%", margin: "auto" }}>
//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Typography variant="h5" component="h1" fontWeight="bold">
//             Manage Parameters
//           </Typography>
//           {/* --- UPDATED: Button color --- */}
//           <Button
//             variant="contained"
//             sx={purpleButtonStyle}
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//           >
//             Add Parameter
//           </Button>
//         </Box>

//         {/* --- NEW: Search Bar --- */}
//         <Box sx={{ mb: 2 }}>
//             <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Search by parameter name..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setPage(0); // Reset page on new search
//                 }}
//                 InputProps={{
//                     startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
//                 }}
//             />
//         </Box>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <StyledHeaderCell sx={{ width: "10%" }}>S.No.</StyledHeaderCell>
//                 <StyledHeaderCell>Parameter Name</StyledHeaderCell>
//                 <StyledHeaderCell align="center" sx={{ width: "20%" }}>
//                   Actions
//                 </StyledHeaderCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//                 // --- UPDATED: Use filteredParameters for mapping ---
//               ) : filteredParameters.length > 0 ? (
//                 filteredParameters
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((param, index) => (
//                     <TableRow key={param.parameter_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{param.para_name}</TableCell>
//                       <TableCell align="center">
//                         {/* --- UPDATED: Edit icon color --- */}
//                         <IconButton
//                           sx={{ color: '#673ab7' }}
//                           aria-label="edit"
//                           onClick={() => handleOpenDialog(param)}
//                         >
//                           <Edit />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           aria-label="delete"
//                           onClick={() => handleDelete(param.parameter_id)}
//                         >
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                     <Typography variant="subtitle1" color="text.secondary">
//                       {searchTerm ? "No results found." : "No parameters found. Click 'Add Parameter' to begin."}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* --- UPDATED: Use filteredParameters.length for count --- */}
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredParameters.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>{dialogTitle}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Parameter Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentParameterName}
//             onChange={(e) => setCurrentParameterName(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && currentParameterName.trim()) {
//                 handleAddOrUpdate();
//               }
//             }}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '0 24px 16px' }}>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           {/* --- UPDATED: Button color --- */}
//           <Button
//             variant="contained"
//             sx={purpleButtonStyle}
//             onClick={handleAddOrUpdate}
//             disabled={!currentParameterName.trim()}
//           >
//             {editingParameter ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ParameterManager;









import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  TablePagination,
  CircularProgress,
  Skeleton,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import { Edit, Delete, Search as SearchIcon, Add } from "@mui/icons-material";

// Define the API endpoint
const API_URL = "https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/";

// 🎨 Define Theme Colors
const THEME_COLORS = {
  primary: "#8C257C",
  primaryDark: "#6d1d60",
  secondary: "#F58E35",
  textOnPrimary: "#FFFFFF",
};

const ParameterManager = () => {
  // State for the list of parameters, loading, and submission
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for the Add/Edit dialog
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentParameterName, setCurrentParameterName] = useState("");
  const [editingParameter, setEditingParameter] = useState(null);

  // State for pagination and search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // 📱 Responsive Behavior
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ⚙️ Logic & Behavior: Fetching data
  const fetchParameters = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setParameters(response.data || []);
    } catch (err) {
      console.error("Failed to fetch parameters:", err);
      Swal.fire({
        icon: "error",
        title: "Fetch Error",
        text: "Failed to load parameters. Please try again later.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParameters();
  }, [fetchParameters]);

  // Dialog handlers
  const handleOpenDialog = (param = null) => {
    if (param) {
      setEditingParameter(param);
      setCurrentParameterName(param.para_name);
    } else {
      setEditingParameter(null);
      setCurrentParameterName("");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingParameter(null);
    setCurrentParameterName("");
  };

  // ⚙️ Logic & Behavior: CRUD operations with SweetAlert2
  const handleAddOrUpdate = async () => {
    if (!currentParameterName.trim()) return;
    setIsSubmitting(true);

    try {
      const payload = { para_name: currentParameterName.trim() };
      let response;
      if (editingParameter) {
        payload.parameter_id = editingParameter.parameter_id;
        response = await axios.put(API_URL, payload);
      } else {
        response = await axios.post(API_URL, payload);
      }
      
      // Assuming a successful API call returns a meaningful message
      const successMessage = response.data?.message || `Parameter successfully ${editingParameter ? 'updated' : 'added'}!`;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
        timer: 3000,
        showConfirmButton: false,
      });

      await fetchParameters();
      handleCloseDialog();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to save the parameter. It might already exist.";
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (parameterId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: THEME_COLORS.primary,
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (!result.isConfirmed) return;

    try {
      await axios.delete(API_URL, { data: { parameter_id: parameterId } });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The parameter has been deleted.",
        timer: 3000,
        showConfirmButton: false,
      });
      await fetchParameters();
    } catch (err) {
       const errorMessage = err.response?.data?.message || "Failed to delete the parameter.";
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: errorMessage,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  // Memoized filtering for performance
  const filteredParameters = useMemo(() => {
    return parameters.filter((param) =>
      param.para_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [parameters, searchTerm]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dialogTitle = editingParameter ? "Edit Parameter" : "Add New Parameter";
  const paginatedData = filteredParameters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
    // 🧱 Layout Structure: Main Wrapper
    <Box component={Paper} p={3} elevation={3}>
      {/* 🧱 Layout Structure: Page Title */}
      <Typography
        variant="h4"
        sx={{
          color: THEME_COLORS.primary,
          fontWeight: "bold",
          mb: 5,
        }}
      >
        Manage Parameters
      </Typography>

      {/* 🧱 Layout Structure: Button & Search Bar Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: THEME_COLORS.primary,
            color: THEME_COLORS.textOnPrimary,
            alignSelf: isMobile ? "stretch" : "auto",
            "&:hover": { backgroundColor: THEME_COLORS.primaryDark },
          }}
        >
          Add Parameter
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

      {/* 📋 Table Design */}
      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table>
          <TableHead sx={{ backgroundColor: THEME_COLORS.primary }}>
            <TableRow>
              <TableCell sx={{ color: THEME_COLORS.textOnPrimary, fontWeight: "bold" }}>S.No.</TableCell>
              <TableCell sx={{ color: THEME_COLORS.textOnPrimary, fontWeight: "bold" }}>Parameter Name</TableCell>
              <TableCell align="center" sx={{ color: THEME_COLORS.textOnPrimary, fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // 📋 Table Design: Skeleton Loader
              [...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" width={40} /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={100} height={30} sx={{ mx: 'auto' }}/>
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((param, index) => (
                <TableRow key={param.parameter_id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{param.para_name}</TableCell>
                  <TableCell>
                    {/* Action buttons centered with a gap */}
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <IconButton
                        sx={{ color: THEME_COLORS.primary }}
                        onClick={() => handleOpenDialog(param)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(param.parameter_id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {searchTerm ? "No results found." : "No parameters available."}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📊 Pagination & Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          pt: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
            {`Showing ${filteredParameters.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredParameters.length)} of ${filteredParameters.length} results`}
        </Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={filteredParameters.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiSvgIcon-root': { color: THEME_COLORS.primary },
            '& .Mui-selected': { backgroundColor: 'rgba(140, 37, 124, 0.1) !important' },
          }}
        />
      </Box>

      {/* 🧾 Dialog / Form Styling */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: THEME_COLORS.primary, fontWeight: "bold" }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Parameter Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentParameterName}
            onChange={(e) => setCurrentParameterName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && currentParameterName.trim()) {
                handleAddOrUpdate();
              }
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 16px" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddOrUpdate}
            disabled={!currentParameterName.trim() || isSubmitting}
            sx={{
              backgroundColor: THEME_COLORS.primary,
              color: THEME_COLORS.textOnPrimary,
              "&:hover": { backgroundColor: THEME_COLORS.primaryDark },
              minWidth: 90
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : editingParameter ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParameterManager;