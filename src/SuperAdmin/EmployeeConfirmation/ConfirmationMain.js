// // // // import React, { useState } from "react";
// // // // import {
// // // //     Table, TableBody, TableCell, TableContainer,
// // // //     TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
// // // //     DialogContent, DialogActions, TextField, Snackbar, Alert, Box,
// // // //     Typography, IconButton, Tooltip, Stack
// // // // } from "@mui/material";
// // // // import { useNavigate } from "react-router-dom";
// // // // // REMOVED: AddIcon is no longer used
// // // // import EditIcon from '@mui/icons-material/Edit';
// // // // import DeleteIcon from '@mui/icons-material/Delete';

// // // // const MainConfirmation = () => {
// // // //     const [designations, setDesignations] = useState([
// // // //         { id: 1, title: "VSO" },
// // // //         { id: 2, title: "Team Lead" },
// // // //         { id: 3, title: "Manager" },
// // // //     ]);

// // // //     const navigate = useNavigate();

// // // //     // REMOVED: openAdd state is no longer needed
// // // //     const [openEdit, setOpenEdit] = useState(false);
// // // //     const [openDelete, setOpenDelete] = useState(false);

// // // //     const [selected, setSelected] = useState(null);
// // // //     // MODIFIED: Renamed state for clarity as it's only for editing now
// // // //     const [editedTitle, setEditedTitle] = useState("");
// // // //     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// // // //     const handleRowClick = () => {
// // // //         navigate("/hrms/admindashboard/employeeconfirmation");
// // // //     };

// // // //     // --- REMOVED: Add Functionality (handleAddClick and handleAddSave) ---

// // // //     // --- Edit Functionality ---
// // // //     const handleEditClick = (e, row) => {
// // // //         e.stopPropagation();
// // // //         setSelected(row);
// // // //         setEditedTitle(row.title); // Use the renamed state setter
// // // //         setOpenEdit(true);
// // // //     };

// // // //     const handleEditSave = () => {
// // // //         if (editedTitle.trim()) {
// // // //             setDesignations((prev) =>
// // // //                 prev.map((d) => (d.id === selected.id ? { ...d, title: editedTitle.trim() } : d))
// // // //             );
// // // //             setOpenEdit(false);
// // // //             setSnackbar({ open: true, message: "Designation updated!", severity: "success" });
// // // //         }
// // // //     };

// // // //     // --- Delete Functionality ---
// // // //     const handleDeleteClick = (e, row) => {
// // // //         e.stopPropagation();
// // // //         setSelected(row);
// // // //         setOpenDelete(true);
// // // //     };

// // // //     const handleDeleteConfirm = () => {
// // // //         setDesignations((prev) => prev.filter((d) => d.id !== selected.id));
// // // //         setOpenDelete(false);
// // // //         setSnackbar({ open: true, message: "Designation deleted!", severity: "error" });
// // // //     };

// // // //     return (
// // // //         <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
// // // //             {/* --- Header --- */}
// // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // //                 <Typography variant="h5" fontWeight="bold" color="primary">
// // // //                     Manage Designations
// // // //                 </Typography>
// // // //                 {/* REMOVED: Add New Designation Button */}
// // // //             </Box>

// // // //             {/* --- Table --- */}
// // // //             <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
// // // //                 <Table>
// // // //                     <TableHead>
// // // //                         <TableRow sx={{ backgroundColor: 'action.hover' }}>
// // // //                             <TableCell sx={{ fontWeight: 'bold' }}>Sr No</TableCell>
// // // //                             <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
// // // //                             <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
// // // //                         </TableRow>
// // // //                     </TableHead>
// // // //                     <TableBody>
// // // //                         {designations.map((row, index) => (
// // // //                             <TableRow
// // // //                                 key={row.id}
// // // //                                 hover
// // // //                                 sx={{ cursor: "pointer", '&:hover': { backgroundColor: 'primary.light' } }}
// // // //                                 onClick={handleRowClick}
// // // //                             >
// // // //                                 <TableCell>{index + 1}</TableCell>
// // // //                                 <TableCell>{row.title}</TableCell>
// // // //                                 <TableCell onClick={(e) => e.stopPropagation()} sx={{ textAlign: 'center' }}>
// // // //                                     <Stack direction="row" spacing={1} justifyContent="center">
// // // //                                         <Tooltip title="Edit Designation">
// // // //                                             <IconButton color="primary" onClick={(e) => handleEditClick(e, row)}>
// // // //                                                 <EditIcon />
// // // //                                             </IconButton>
// // // //                                         </Tooltip>
// // // //                                         <Tooltip title="Delete Designation">
// // // //                                             <IconButton color="error" onClick={(e) => handleDeleteClick(e, row)}>
// // // //                                                 <DeleteIcon />
// // // //                                             </IconButton>
// // // //                                         </Tooltip>
// // // //                                     </Stack>
// // // //                                 </TableCell>
// // // //                             </TableRow>
// // // //                         ))}
// // // //                     </TableBody>
// // // //                 </Table>
// // // //             </TableContainer>

// // // //             {/* --- REMOVED: Add Dialog --- */}

// // // //             {/* --- Edit Dialog --- */}
// // // //             <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
// // // //                 <DialogTitle>Edit Designation</DialogTitle>
// // // //                 <DialogContent>
// // // //                     <TextField
// // // //                         label="Designation Title"
// // // //                         value={editedTitle} // Use the renamed state variable
// // // //                         fullWidth
// // // //                         onChange={(e) => setEditedTitle(e.target.value)} // Use the renamed state setter
// // // //                         autoFocus
// // // //                         sx={{ mt: 1 }}
// // // //                     />
// // // //                 </DialogContent>
// // // //                 <DialogActions>
// // // //                     <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
// // // //                     <Button onClick={handleEditSave} variant="contained">Save Changes</Button>
// // // //                 </DialogActions>
// // // //             </Dialog>

// // // //             {/* --- Delete Confirmation Dialog --- */}
// // // //             <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
// // // //                 <DialogTitle>Confirm Deletion</DialogTitle>
// // // //                 <DialogContent>
// // // //                     <Alert severity="error" variant="outlined">
// // // //                         Are you sure you want to permanently delete the designation "<strong>{selected?.title}</strong>"? This action cannot be undone.
// // // //                     </Alert>
// // // //                 </DialogContent>
// // // //                 <DialogActions>
// // // //                     <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
// // // //                     <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
// // // //                 </DialogActions>
// // // //             </Dialog>

// // // //             {/* --- Snackbar for Notifications --- */}
// // // //             <Snackbar
// // // //                 open={snackbar.open}
// // // //                 autoHideDuration={4000}
// // // //                 onClose={() => setSnackbar({ ...snackbar, open: false })}
// // // //                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// // // //             >
// // // //                 <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
// // // //                     {snackbar.message}
// // // //                 </Alert>
// // // //             </Snackbar>
// // // //         </Paper>
// // // //     );
// // // // };

// // // // export default MainConfirmation;

// // // import React, { useState } from "react";
// // // import {
// // //     Table, TableBody, TableCell, TableContainer,
// // //     TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
// // //     DialogContent, DialogActions, TextField, Snackbar, Alert, Box,
// // //     Typography, IconButton, Tooltip, Stack
// // // } from "@mui/material";
// // // import { useNavigate } from "react-router-dom";
// // // // REMOVED: AddIcon is no longer used
// // // import EditIcon from '@mui/icons-material/Edit';
// // // import DeleteIcon from '@mui/icons-material/Delete';

// // // const MainConfirmation = () => {
// // //     const [designations, setDesignations] = useState([
// // //         { id: 1, title: "VSO" },
// // //         { id: 2, title: "Team Lead" },
// // //         { id: 3, title: "Manager" },
// // //     ]);

// // //     const navigate = useNavigate();

// // //     // REMOVED: openAdd state is no longer needed
// // //     const [openEdit, setOpenEdit] = useState(false);
// // //     const [openDelete, setOpenDelete] = useState(false);

// // //     const [selected, setSelected] = useState(null);
// // //     // MODIFIED: Renamed state for clarity as it's only for editing now
// // //     const [editedTitle, setEditedTitle] = useState("");
// // //     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// // //     const handleRowClick = () => {
// // //         navigate("/hrms/admindashboard/employeeconfirmation");
// // //     };

// // //     // --- REMOVED: Add Functionality (handleAddClick and handleAddSave) ---

// // //     // --- Edit Functionality ---
// // //     const handleEditClick = (e, row) => {
// // //         e.stopPropagation();
// // //         setSelected(row);
// // //         setEditedTitle(row.title); // Use the renamed state setter
// // //         setOpenEdit(true);
// // //     };

// // //     const handleEditSave = () => {
// // //         if (editedTitle.trim()) {
// // //             setDesignations((prev) =>
// // //                 prev.map((d) => (d.id === selected.id ? { ...d, title: editedTitle.trim() } : d))
// // //             );
// // //             setOpenEdit(false);
// // //             setSnackbar({ open: true, message: "Designation updated!", severity: "success" });
// // //         }
// // //     };

// // //     // --- Delete Functionality ---
// // //     const handleDeleteClick = (e, row) => {
// // //         e.stopPropagation();
// // //         setSelected(row);
// // //         setOpenDelete(true);
// // //     };

// // //     const handleDeleteConfirm = () => {
// // //         setDesignations((prev) => prev.filter((d) => d.id !== selected.id));
// // //         setOpenDelete(false);
// // //         setSnackbar({ open: true, message: "Designation deleted!", severity: "error" });
// // //     };

// // //     return (
// // //         <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
// // //             {/* --- Header --- */}
// // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //                 <Typography variant="h5" fontWeight="bold" color="primary">
// // //                     Manage Designations
// // //                 </Typography>
// // //                 {/* REMOVED: Add New Designation Button */}
// // //             </Box>

// // //             {/* --- Table --- */}
// // //             <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
// // //                 <Table>
// // //                     <TableHead>
// // //                         <TableRow sx={{ backgroundColor: 'action.hover' }}>
// // //                             <TableCell sx={{ fontWeight: 'bold' }}>Sr No</TableCell>
// // //                             <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
// // //                             <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
// // //                         </TableRow>
// // //                     </TableHead>
// // //                     <TableBody>
// // //                         {designations.map((row, index) => (
// // //                             <TableRow
// // //                                 key={row.id}
// // //                                 hover
// // //                                 sx={{ cursor: "pointer", '&:hover': { backgroundColor: 'primary.light' } }}
// // //                                 onClick={handleRowClick}
// // //                             >
// // //                                 <TableCell>{index + 1}</TableCell>
// // //                                 <TableCell>{row.title}</TableCell>
// // //                                 <TableCell onClick={(e) => e.stopPropagation()} sx={{ textAlign: 'center' }}>
// // //                                     <Stack direction="row" spacing={1} justifyContent="center">
// // //                                         <Tooltip title="Edit Designation">
// // //                                             <IconButton color="primary" onClick={(e) => handleEditClick(e, row)}>
// // //                                                 <EditIcon />
// // //                                             </IconButton>
// // //                                         </Tooltip>
// // //                                         <Tooltip title="Delete Designation">
// // //                                             <IconButton color="error" onClick={(e) => handleDeleteClick(e, row)}>
// // //                                                 <DeleteIcon />
// // //                                             </IconButton>
// // //                                         </Tooltip>
// // //                                     </Stack>
// // //                                 </TableCell>
// // //                             </TableRow>
// // //                         ))}
// // //                     </TableBody>
// // //                 </Table>
// // //             </TableContainer>

// // //             {/* --- REMOVED: Add Dialog --- */}

// // //             {/* --- Edit Dialog --- */}
// // //             <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs">
// // //                 <DialogTitle>Edit Designation</DialogTitle>
// // //                 <DialogContent>
// // //                     <TextField
// // //                         label="Designation Title"
// // //                         value={editedTitle} // Use the renamed state variable
// // //                         fullWidth
// // //                         onChange={(e) => setEditedTitle(e.target.value)} // Use the renamed state setter
// // //                         autoFocus
// // //                         sx={{ mt: 1 }}
// // //                     />
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
// // //                     <Button onClick={handleEditSave} variant="contained">Save Changes</Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             {/* --- Delete Confirmation Dialog --- */}
// // //             <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
// // //                 <DialogTitle>Confirm Deletion</DialogTitle>
// // //                 <DialogContent>
// // //                     <Alert severity="error" variant="outlined">
// // //                         Are you sure you want to permanently delete the designation "<strong>{selected?.title}</strong>"? This action cannot be undone.
// // //                     </Alert>
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
// // //                     <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             {/* --- Snackbar for Notifications --- */}
// // //             <Snackbar
// // //                 open={snackbar.open}
// // //                 autoHideDuration={4000}
// // //                 onClose={() => setSnackbar({ ...snackbar, open: false })}
// // //                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// // //             >
// // //                 <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
// // //                     {snackbar.message}
// // //                 </Alert>
// // //             </Snackbar>
// // //         </Paper>
// // //     );
// // // };

// // // export default MainConfirmation;


// // import React, { useState, useEffect } from "react";
// // import {
// //     Table, TableBody, TableCell, TableContainer, TableHead,
// //     TableRow, Paper, Box, Typography, CircularProgress, Alert
// // } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import axios from 'axios';

// // const MainConfirmation = () => {
// //     const [designations, setDesignations] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchDesignations = async () => {
// //             try {
// //                 setLoading(true);
// //                 setError(null);
// //                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/");
// //                 // Map the API response to a format the component can use
// //                 const formattedData = response.data.map(d => ({
// //                     id: d.designation_id,
// //                     name: d.designation_name,
// //                     // keep the rest of the data in case it's needed
// //                     ...d 
// //                 }));
// //                 setDesignations(formattedData);
// //             } catch (err) {
// //                 setError("Failed to fetch designations. Please try again later.");
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchDesignations();
// //     }, []); // Empty dependency array means this runs once on component mount

// //     const handleRowClick = (designationData) => {
// //         // Navigate to the confirmation detail page, passing the designation data
// //         navigate("/hrms/admindashboard/employeeconfirmation", { 
// //             state: { designation: designationData } 
// //         });
// //     };

// //     return (
// //         <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //                 <Typography variant="h5" fontWeight="bold" color="primary">
// //                     Manage Designations
// //                 </Typography>
// //             </Box>

// //             {loading ? (
// //                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
// //                     <CircularProgress />
// //                 </Box>
// //             ) : error ? (
// //                 <Alert severity="error">{error}</Alert>
// //             ) : (
// //                 <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
// //                     <Table>
// //                         <TableHead>
// //                             <TableRow sx={{ backgroundColor: 'action.hover' }}>
// //                                 <TableCell sx={{ fontWeight: 'bold' }}>Sr No</TableCell>
// //                                 <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
// //                                 <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {designations.map((row, index) => (
// //                                 <TableRow
// //                                     key={row.id}
// //                                     hover
// //                                     sx={{ cursor: "pointer", '&:hover': { backgroundColor: 'primary.light' } }}
// //                                     onClick={() => handleRowClick(row)}
// //                                 >
// //                                     <TableCell>{index + 1}</TableCell>
// //                                     <TableCell>{row.name}</TableCell>
// //                                     <TableCell>{row.department_name}</TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             )}
// //         </Paper>
// //     );
// // };

// // export default MainConfirmation;


// // import React, { useState, useEffect } from "react";
// // import {
// //     Table, TableBody, TableCell, TableContainer, TableHead,
// //     TableRow, Paper, Box, Typography, CircularProgress, Alert
// // } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import axios from 'axios';

// // const MainConfirmation = () => {
// //     const [designations, setDesignations] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchDesignations = async () => {
// //             try {
// //                 setLoading(true);
// //                 setError(null);

// //                 // 1. Get the access token from local storage
// //                 // Note: Replace 'accessToken' with the key you use to store the token.
// //                 const accessToken = localStorage.getItem('accessToken');

// //                 // 2. Check if the token exists before making the call
// //                 if (!accessToken) {
// //                     setError("Authentication Error: No access token found. Please log in.");
// //                     setLoading(false);
// //                     return; // Stop execution if no token is available
// //                 }

// //                 // 3. Make the API call with the Authorization header
// //                 const response = await axios.get(
// //                     "https://tdtlworld.com/hrms-backend/ci_designations/",
// //                     {
// //                         headers: {
// //                             'Content-Type': 'application/json',
// //                             'Authorization': `Bearer ${accessToken}`
// //                         }
// //                     }
// //                 );

// //                 // Map the API response to a format the component can use
// //                 const formattedData = response.data.map(d => ({
// //                     id: d.designation_id,
// //                     name: d.designation_name,
// //                     // keep the rest of the data in case it's needed
// //                     ...d
// //                 }));
// //                 setDesignations(formattedData);

// //             } catch (err) {
// //                 // 4. Enhanced error handling for authentication issues
// //                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
// //                     setError("Authentication failed. Your session may have expired. Please log in again.");
// //                 } else {
// //                     setError("Failed to fetch designations. Please try again later.");
// //                 }
// //                 console.error("API Error:", err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchDesignations();
// //     }, []); // Empty dependency array means this runs once on component mount

// //     const handleRowClick = (designationData) => {
// //         // Navigate to the confirmation detail page, passing the designation data
// //         navigate("/hrms/admindashboard/employeeconfirmation", {
// //             state: { designation: designationData }
// //         });
// //     };

// //     return (
// //         <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //                 <Typography variant="h5" fontWeight="bold">
// //                     Manage Designations
// //                 </Typography>
// //             </Box>

// //             {loading ? (
// //                 <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
// //                     <CircularProgress />
// //                 </Box>
// //             ) : error ? (
// //                 <Alert severity="error">{error}</Alert>
// //             ) : (
// //                 <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
// //                     <Table>
// //                         <TableHead>
// //                             <TableRow sx={{ backgroundColor: 'action.hover' }}>
// //                                 <TableCell sx={{ fontWeight: 'bold' }}>Sr No</TableCell>
// //                                 <TableCell sx={{ fontWeight: 'bold' }}>Designation</TableCell>
// //                                 <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {designations.map((row, index) => (
// //                                 <TableRow
// //                                     key={row.id}
// //                                     hover
// //                                     sx={{ cursor: "pointer", '&:hover': { backgroundColor: 'primary.light' } }}
// //                                     onClick={() => handleRowClick(row)}
// //                                 >
// //                                     <TableCell>{index + 1}</TableCell>
// //                                     <TableCell>{row.name}</TableCell>
// //                                     <TableCell>{row.department_name}</TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             )}
// //         </Paper>
// //     );
// // };

// // export default MainConfirmation;





// // import React, { useState, useEffect, useCallback } from "react";
// // import {
// //     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
// //     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
// //     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField, Autocomplete, TableFooter
// // } from "@mui/material";
// // import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
// // import { useTheme } from '@mui/material/styles';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// // function TabPanel({ children, value, index, ...other }) {
// //     return (
// //         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
// //             {value === index && <Box sx={{ p: 3, mt: 2 }}>{children}</Box>}
// //         </div>
// //     );
// // }

// // const CombinedConfirmationPage = () => {
// //     const theme = useTheme();
// //     const navigate = useNavigate();

// //     const [designations, setDesignations] = useState([]);
// //     const [selectedDesignation, setSelectedDesignation] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     const [viewingDesignation, setViewingDesignation] = useState(null);

// //     const [activeTab, setActiveTab] = useState(0);
// //     const [phaseParameters, setPhaseParameters] = useState([]);
// //     const [detailsLoading, setDetailsLoading] = useState(true);
// //     const [parameterLibrary, setParameterLibrary] = useState([]);
// //     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [isSaving, setIsSaving] = useState(false);
// //     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
// //     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// //     const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
// //     const [comments, setComments] = useState({
// //         phase1: { lineManager: "", head: "", hr: "" },
// //         phase2: { lineManager: "", head: "", hr: "" },
// //         phase3: { lineManager: "", head: "", hr: "" },
// //         phase4: { lineManager: "", head: "", hr: "" },
// //     });
// //     const [overallComments, setOverallComments] = useState({
// //         lineManager: "",
// //         head: "",
// //         hr: ""
// //     });

// //     const [kpiData, setKpiData] = useState([
// //         { kpi: "A", target: 1, ach: 1, rating: 5 },
// //         { kpi: "B", target: 2, ach: 5, rating: 7 },
// //         { kpi: "C", target: 3, ach: 6, rating: 9 },
// //     ]);
// //     const [kraData, setKraData] = useState([
// //         { parameter: "HADC", totalRating: 10 },
// //         { parameter: "QCP", totalRating: 10 },
// //     ]);
// //     const [phaseWiseData, setPhaseWiseData] = useState(null);

// //     useEffect(() => {
// //         const fetchDesignations = async () => {
// //             try {
// //                 setLoading(true);
// //                 setError(null);
// //                 const accessToken = localStorage.getItem('accessToken');
// //                 if (!accessToken) {
// //                     setError("Authentication Error: No access token found. Please log in.");
// //                     setLoading(false);
// //                     return;
// //                 }
// //                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
// //                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
// //                 });
// //                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
// //                 setDesignations(formattedData);
// //             } catch (err) {
// //                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
// //                     setError("Authentication failed. Your session may have expired. Please log in again.");
// //                 } else {
// //                     setError("Failed to fetch designations. Please try again later.");
// //                 }
// //                 console.error("API Error:", err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchDesignations();
// //     }, []);

// //     const getAuthHeaders = () => {
// //         const accessToken = localStorage.getItem('accessToken');
// //         if (!accessToken) {
// //             setSnackbar({ open: true, message: "Authentication token not found. Please log in.", severity: "error" });
// //             navigate('/login');
// //             return null;
// //         }
// //         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
// //     };

// //     const fetchPhaseWiseData = async () => {
// //         const headers = getAuthHeaders();
// //         if (!headers) return;
// //         try {
// //             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=494", { headers });
// //             if (response.data.status === "success") {
// //                 setPhaseWiseData(response.data.data);
// //             }
// //         } catch (error) {
// //             console.error("Failed to fetch phase-wise data:", error);
// //             setSnackbar({ open: true, message: "Could not load phase-wise performance data.", severity: "error" });
// //         }
// //     };

// //     useEffect(() => {
// //         if (viewingDesignation) {
// //             fetchPhaseWiseData();
// //         }
// //     }, [viewingDesignation]);

// //     const fetchPhaseParameters = useCallback(async () => {
// //         if (!viewingDesignation || activeTab > 3) return;
// //         setDetailsLoading(true);
// //         const headers = getAuthHeaders();
// //         if (!headers) { setDetailsLoading(false); return; }
// //         const phase = activeTab + 1;
// //         try {
// //             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
// //             setPhaseParameters(response.data.data || []);
// //         } catch (error) {
// //             console.error("Failed to fetch phase parameters:", error);
// //             setSnackbar({ open: true, message: "Could not load parameters for this phase.", severity: "error" });
// //             setPhaseParameters([]);
// //         } finally {
// //             setDetailsLoading(false);
// //         }
// //     }, [activeTab, viewingDesignation, navigate]);

// //     useEffect(() => {
// //         fetchPhaseParameters();
// //     }, [fetchPhaseParameters]);

// //     const handleOpenSelectDialog = async () => {
// //         const headers = getAuthHeaders();
// //         if (!headers) return;
// //         try {
// //             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
// //             setParameterLibrary(response.data || []);
// //             setOpenSelectParameterDialog(true);
// //         } catch (error) {
// //             console.error("Failed to fetch parameter library:", error);
// //             setSnackbar({ open: true, message: "Could not load parameter library.", severity: "error" });
// //         }
// //     };

// //     const handleAddSelectedParameters = async () => {
// //         const headers = getAuthHeaders();
// //         if (!headers) return;
// //         setIsSubmitting(true);
// //         const designation_id = viewingDesignation.id;
// //         const created_by = 1;
// //         const phase = activeTab + 1;
// //         const requests = selectedLibraryParameters.map(paramId => {
// //             const payload = { parameter_id: paramId, designation_id, phase, created_by };
// //             return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
// //         });
// //         try {
// //             await Promise.all(requests);
// //             setSnackbar({ open: true, message: `Parameters added successfully to Phase ${phase}!`, severity: "success" });
// //             setOpenSelectParameterDialog(false);
// //             setSelectedLibraryParameters([]);
// //             fetchPhaseParameters();
// //         } catch (error) {
// //             console.error("Failed to save parameters:", error);
// //             setSnackbar({ open: true, message: "An error occurred while saving.", severity: "error" });
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     const handleDeleteParameter = async (parameterToDelete) => {
// //         if (!window.confirm(`Are you sure you want to delete "${parameterToDelete.para_name}" from this phase?`)) return;
// //         const headers = getAuthHeaders();
// //         if (!headers) return;
// //         setIsSubmitting(true);
// //         const idToDelete = parameterToDelete.dp_id;
// //         try {
// //             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${idToDelete}/`, { headers });
// //             setSnackbar({ open: true, message: "Parameter deleted successfully from this phase.", severity: "success" });
// //             fetchPhaseParameters();
// //         } catch (error) {
// //             console.error("Failed to delete parameter:", error);
// //             setSnackbar({ open: true, message: "Could not delete the parameter.", severity: "error" });
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     const handleKpiChange = (index, field, value) => {
// //         const newData = [...kpiData];
// //         const isNumeric = ["target", "ach", "rating"].includes(field);
// //         newData[index][field] = isNumeric ? Number(value) : value;
// //         setKpiData(newData);
// //     };
// //     const handleKraChange = (index, field, value) => {
// //         const newData = [...kraData];
// //         newData[index][field] = field === "totalRating" ? Number(value) : value;
// //         setKraData(newData);
// //     };
// //     const calculateAverage = (lineManager, head, hr) => {
// //         const values = [lineManager, head, hr].filter((val) => val && !isNaN(val));
// //         if (values.length === 0) return "0.0";
// //         const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0);
// //         return (sum / values.length).toFixed(1);
// //     };
// //     const calculatePhaseTotal = (phase) => {
// //         let lineManagerTotal = 0, headTotal = 0, hrTotal = 0;
// //         let lmCount = 0, headCount = 0, hrCount = 0;
// //         phaseParameters.forEach((param, index) => {
// //             const rating = ratings[phase]?.[index] || {};
// //             if (rating.lineManager && !isNaN(rating.lineManager)) { lineManagerTotal += Number.parseFloat(rating.lineManager); lmCount++; }
// //             if (rating.head && !isNaN(rating.head)) { headTotal += Number.parseFloat(rating.head); headCount++; }
// //             if (rating.hr && !isNaN(rating.hr)) { hrTotal += Number.parseFloat(rating.hr); hrCount++; }
// //         });
// //         return {
// //             lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : "0.0",
// //             head: headCount > 0 ? (headTotal / headCount).toFixed(1) : "0.0",
// //             hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : "0.0",
// //         };
// //     };

// //     const updateRating = (phase, paramIndex, rater, value) => {
// //         const numericValue = value.replace(/[^0-9.]/g, "");
// //         if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
// //             setRatings((prev) => ({ ...prev, [phase]: { ...prev[phase], [paramIndex]: { ...prev[phase]?.[paramIndex], [rater]: numericValue } } }));
// //         }
// //     };
// //     const updateComment = (phase, rater, value) => {
// //         setComments((prev) => ({ ...prev, [phase]: { ...prev[phase], [rater]: value } }));
// //     };

// //     const handleOverallCommentChange = (rater, value) => {
// //         setOverallComments(prev => ({ ...prev, [rater]: value }));
// //     };

// //     const handleTabChange = (event, newValue) => setActiveTab(newValue);

// //     const handleSaveForm = async () => {
// //         setIsSaving(true);
// //         const headers = getAuthHeaders();
// //         if (!headers) {
// //             setIsSaving(false);
// //             return;
// //         }

// //         if (activeTab === 4) { // Logic for Overall Analysis Tab
// //             try {
// //                 const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
// //                 const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
// //                 const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
// //                 const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
       
// //                 let value4AEE = 0;
// //                 if (phaseWiseData) {
// //                     const scoreKeys = [
// //                         'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
// //                         'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
// //                         'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
// //                     ];
// //                     const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
// //                     const maxPhaseScorePerSlot = 40;
// //                     const totalMaxScore = 12 * maxPhaseScorePerSlot;
// //                     if (totalMaxScore > 0) {
// //                         value4AEE = (totalApiScore / totalMaxScore) * 10;
// //                     }
// //                 }
       
// //                 const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
// //                 const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

// //                 const allComments = [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ');

// //                 const payload = {
// //                     user_id: 12, // NOTE: This is hardcoded, replace with dynamic user ID if available
// //                     emp_id: viewingDesignation.id,
// //                     performance_analysis: allComments || "No detailed comments provided.",
// //                     kra_kpi_total: kpiKraAverage,
// //                     average: finalAverage,
// //                     percent_achievement: achievementPercentage,
// //                     comment_by_lm: overallComments.lineManager || "No comment.",
// //                     comment_by_hr: overallComments.hr || "No comment.",
// //                     comment_by_head: overallComments.head || "No comment."
// //                 };

// //                 await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
// //                 setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });

// //             } catch (error) {
// //                 console.error("Failed to save overall analysis:", error);
// //                 const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
// //                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
// //             } finally {
// //                 setIsSaving(false);
// //             }

// //         } else { // Logic for Phase 1-4 Tabs
// //             if (phaseParameters.length === 0) {
// //                 setSnackbar({ open: true, message: "There are no parameters to save in this phase.", severity: "warning" });
// //                 setIsSaving(false);
// //                 return;
// //             }

// //             const requests = phaseParameters.map(param => {
// //                 const payload = {
// //                     parameter_id: param.parameter_id,
// //                     designation_id: viewingDesignation.id,
// //                     phase: activeTab + 1,
// //                     created_by: 1 // NOTE: This is hardcoded, replace with dynamic user ID if available
// //                 };
// //                 return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
// //             });

// //             try {
// //                 await Promise.all(requests);
// //                 setSnackbar({ open: true, message: `Phase ${activeTab + 1} data saved successfully!`, severity: "success" });
// //             } catch (error) {
// //                 console.error("Failed to save form data:", error);
// //                 const errorMessage = error.response?.data?.message || "An error occurred while saving the form.";
// //                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
// //             } finally {
// //                 setIsSaving(false);
// //             }
// //         }
// //     };

// //     const handleLibraryParameterSelect = (event) => {
// //         const { value, checked } = event.target;
// //         const paramId = parseInt(value, 10);
// //         setSelectedLibraryParameters((prev) => checked ? [...prev, paramId] : prev.filter((id) => id !== paramId));
// //     };

// //     const handleViewDetailsClick = () => {
// //         if (selectedDesignation) {
// //             setViewingDesignation(selectedDesignation);
// //             setActiveTab(0);
// //         }
// //     };

// //     const handleBackClick = () => {
// //         setViewingDesignation(null);
// //         setSelectedDesignation(null);
// //         setPhaseParameters([]);
// //         setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
// //         setComments({
// //             phase1: { lineManager: "", head: "", hr: "" },
// //             phase2: { lineManager: "", head: "", hr: "" },
// //             phase3: { lineManager: "", head: "", hr: "" },
// //             phase4: { lineManager: "", head: "", hr: "" },
// //         });
// //     };

// //     const renderPhaseTable = (phaseKey, phaseTitle, dayRange) => (
// //         <Box>
// //             <Card sx={{ mb: 3 }}>
// //                 <CardHeader title={`${phaseTitle} (${dayRange}) for ${viewingDesignation?.name || 'Designation'}`} titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
// //                 <CardContent>
// //                     {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
// //                         <TableContainer component={Paper} variant="outlined">
// //                             <Table>
// //                                 <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
// //                                     <TableRow>
// //                                         <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell>
// //                                         <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>Parameters</TableCell>
// //                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Line Manager</TableCell>
// //                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Head</TableCell>
// //                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>HR</TableCell>
// //                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Average</TableCell>
// //                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
// //                                     </TableRow>
// //                                 </TableHead>
// //                                 <TableBody>
// //                                     {phaseParameters.length > 0 ? phaseParameters.map((param, index) => {
// //                                         const rating = ratings[phaseKey]?.[index] || {};
// //                                         const average = calculateAverage(rating.lineManager, rating.head, rating.hr);
// //                                         return (
// //                                             <TableRow key={param.dp_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
// //                                                 <TableCell>{index + 1}</TableCell>
// //                                                 <TableCell>{param.para_name}</TableCell>
// //                                                 <TableCell align="center"><TextField type="number" value={rating.lineManager || ""} onChange={(e) => updateRating(phaseKey, index, "lineManager", e.target.value)} size="small" sx={{ width: '60px' }} /></TableCell>
// //                                                 <TableCell align="center"><TextField type="number" value={rating.head || ""} onChange={(e) => updateRating(phaseKey, index, "head", e.target.value)} size="small" sx={{ width: '60px' }} /></TableCell>
// //                                                 <TableCell align="center"><TextField type="number" value={rating.hr || ""} onChange={(e) => updateRating(phaseKey, index, "hr", e.target.value)} size="small" sx={{ width: '60px' }} /></TableCell>
// //                                                 <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{average}</TableCell>
// //                                                 <TableCell align="center">
// //                                                     <Tooltip title="Delete Parameter from this Phase">
// //                                                         <span><IconButton size="small" onClick={() => handleDeleteParameter(param)} color="error" disabled={isSubmitting}><DeleteIcon /></IconButton></span>
// //                                                     </Tooltip>
// //                                                 </TableCell>
// //                                             </TableRow>
// //                                         )
// //                                     }) : (<TableRow><TableCell colSpan={7} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
// //                                     <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
// //                                         <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Total</TableCell>
// //                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>{calculatePhaseTotal(phaseKey).lineManager}</TableCell>
// //                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>{calculatePhaseTotal(phaseKey).head}</TableCell>
// //                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>{calculatePhaseTotal(phaseKey).hr}</TableCell>
// //                                         <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{calculateAverage(calculatePhaseTotal(phaseKey).lineManager, calculatePhaseTotal(phaseKey).head, calculatePhaseTotal(phaseKey).hr)}</TableCell>
// //                                         <TableCell></TableCell>
// //                                     </TableRow>
// //                                 </TableBody>
// //                             </Table>
// //                         </TableContainer>
// //                     )}
// //                 </CardContent>
// //             </Card>
// //             <Card variant="outlined">
// //                 <CardHeader title="Phase Comments" />
// //                 <CardContent>
// //                     <Grid container spacing={2}>
// //                         <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments[phaseKey].lineManager} onChange={(e) => updateComment(phaseKey, "lineManager", e.target.value)} /></Grid>
// //                         <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments[phaseKey].head} onChange={(e) => updateComment(phaseKey, "head", e.target.value)} /></Grid>
// //                         <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments[phaseKey].hr} onChange={(e) => updateComment(phaseKey, "hr", e.target.value)} /></Grid>
// //                     </Grid>
// //                 </CardContent>
// //             </Card>
// //         </Box>
// //     );

// //     const renderOverallAnalysis = () => {
// //         const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
// //         const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
// //         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
// //         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
// //         const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
// //         const anyCommentsExist = phaseKeys.some(key => comments[key].lineManager || comments[key].head || comments[key].hr);

// //         const totals = {
// //             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
// //             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
// //             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
// //         };

// //         let value4AEE = 0;
// //         let percent4AEE = 0;
// //         if (phaseWiseData) {
// //             const scoreKeys = [
// //                 'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
// //                 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
// //                 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
// //             ];
// //             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
// //             const maxPhaseScorePerSlot = 40;
// //             const totalMaxScore = 12 * maxPhaseScorePerSlot;

// //             if (totalMaxScore > 0) {
// //                 value4AEE = (totalApiScore / totalMaxScore) * 10;
// //                 percent4AEE = (totalApiScore / totalMaxScore) * 100;
// //             }
// //         }

// //         const valueKpiKra = parseFloat(kpiKraAverage);
// //         const percentKpiKra = valueKpiKra * 10;
// //         const totalValue = (value4AEE + valueKpiKra) / 2;
// //         const percentTotal = totalValue * 10;

// //         return (
// //             <Box><Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
// //                 <Grid container spacing={3}>
// //                     <Grid item xs={12} lg={4}>
// //                         <Card sx={{ height: "100%" }}>
// //                             <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
// //                             <CardContent>
// //                                 <TableContainer>
// //                                     <Table size="small">
// //                                         <TableHead>
// //                                             <TableRow>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell>
// //                                             </TableRow>
// //                                         </TableHead>
// //                                         <TableBody>
// //                                             {phaseWiseData && phaseKeys.map((phase, index) => {
// //                                                 const lm = phaseWiseData[`phase${index + 1}_lm`] || 0;
// //                                                 const head = phaseWiseData[`phase${index + 1}_head`] || 0;
// //                                                 const hr = phaseWiseData[`phase${index + 1}_hr`] || 0;
// //                                                 const total = lm + head + hr;
// //                                                 return (
// //                                                     <TableRow key={phase}>
// //                                                         <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
// //                                                         <TableCell align="right">{lm.toFixed(1)}</TableCell>
// //                                                         <TableCell align="right">{head.toFixed(1)}</TableCell>
// //                                                         <TableCell align="right">{hr.toFixed(1)}</TableCell>
// //                                                         <TableCell align="right" sx={{ fontWeight: "bold" }}>{total.toFixed(1)}</TableCell>
// //                                                     </TableRow>
// //                                                 );
// //                                             })}
// //                                         </TableBody>
// //                                         <TableFooter>
// //                                             <TableRow>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
// //                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell>
// //                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell>
// //                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell>
// //                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell>
// //                                             </TableRow>
// //                                         </TableFooter>
// //                                     </Table>
// //                                 </TableContainer>
// //                             </CardContent>
// //                         </Card>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6} lg={4}>
// //                         <Card sx={{ height: "100%" }}><CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold" }} align="center">Target</TableCell><TableCell sx={{ fontWeight: "bold" }} align="center">Ach</TableCell><TableCell sx={{ fontWeight: "bold" }} align="center">Rating</TableCell></TableRow></TableHead><TableBody>{kpiData.map((row, index) => (<TableRow key={index}><TableCell sx={{ p: 0.5 }}><TextField size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6} lg={4}>
// //                         <Card sx={{ height: "100%" }}><CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold" }} align="center">Total Rating</TableCell></TableRow></TableHead><TableBody>{kraData.map((row, index) => (<TableRow key={index}><TableCell sx={{ p: 0.5 }}><TextField size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card>
// //                     </Grid>

// //                     {anyCommentsExist && (
// //                         <Grid item xs={12} sx={{ mt: 2 }}>
// //                             <Card>
// //                                 <CardHeader title="Phase Comments Summary" />
// //                                 <CardContent>
// //                                     <Grid container spacing={2}>
// //                                         {phaseKeys.map((phaseKey, index) => {
// //                                             const phaseComments = comments[phaseKey];
// //                                             const hasComments = phaseComments.lineManager || phaseComments.head || phaseComments.hr;
// //                                             if (!hasComments) return null;

// //                                             return (
// //                                                 <Grid item xs={12} md={6} key={phaseKey}>
// //                                                     <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
// //                                                         <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
// //                                                             {["Phase 1: Align", "Phase 2: Accelerate", "Phase 3: Achieve", "Phase 4: Aspire"][index]}
// //                                                         </Typography>
// //                                                         {phaseComments.lineManager && (
// //                                                             <Box sx={{ mb: 1 }}>
// //                                                                 <Typography variant="body2" color="text.secondary" component="span" fontWeight="bold">Line Manager: </Typography>
// //                                                                 <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>{phaseComments.lineManager}</Typography>
// //                                                             </Box>
// //                                                         )}
// //                                                         {phaseComments.head && (
// //                                                             <Box sx={{ mb: 1 }}>
// //                                                                 <Typography variant="body2" color="text.secondary" component="span" fontWeight="bold">Head: </Typography>
// //                                                                 <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>{phaseComments.head}</Typography>
// //                                                             </Box>
// //                                                         )}
// //                                                         {phaseComments.hr && (
// //                                                             <Box>
// //                                                                 <Typography variant="body2" color="text.secondary" component="span" fontWeight="bold">HR: </Typography>
// //                                                                 <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>{phaseComments.hr}</Typography>
// //                                                             </Box>
// //                                                         )}
// //                                                     </Paper>
// //                                                 </Grid>
// //                                             );
// //                                         })}
// //                                     </Grid>
// //                                 </CardContent>
// //                             </Card>
// //                         </Grid>
// //                     )}
                   
// //                     <Grid item xs={12} sx={{ mt: 2 }}>
// //                         <Card>
// //                             <CardHeader title="All Total" />
// //                             <CardContent>
// //                                 <TableContainer>
// //                                     <Table>
// //                                         <TableHead>
// //                                             <TableRow>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>% achieve</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>% achieve</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>% achieve</TableCell>
// //                                             </TableRow>
// //                                         </TableHead>
// //                                         <TableBody>
// //                                             <TableRow>
// //                                                 <TableCell>{value4AEE.toFixed(1)}</TableCell>
// //                                                 <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
// //                                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
// //                                                 <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
// //                                                 <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
// //                                             </TableRow>
// //                                         </TableBody>
// //                                     </Table>
// //                                 </TableContainer>
// //                             </CardContent>
// //                         </Card>
// //                     </Grid>

// //                     <Grid item xs={12} sx={{ mt: 2 }}>
// //                         <Card variant="outlined">
// //                             <CardHeader title="Overall Comments" />
// //                             <CardContent>
// //                                 <Grid container spacing={2}>
// //                                     <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
// //                                     <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
// //                                     <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
// //                                 </Grid>
// //                             </CardContent>
// //                         </Card>
// //                     </Grid>

// //                 </Grid>
// //             </Box>
// //         );
// //     };

// //     const availableParamsForSelection = parameterLibrary.filter(
// //         libParam => !phaseParameters.some(phaseParam => phaseParam.parameter_id === libParam.parameter_id)
// //     );

// //     return (
// //         <Container maxWidth="2xl" sx={{ py: 3 }}>
// //             <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //                     <Typography variant="h5" fontWeight="bold">
// //                         Manage Employee Confirmation
// //                     </Typography>
// //                 </Box>

// //                 {loading ? (
// //                     <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
// //                 ) : error ? (
// //                     <Alert severity="error">{error}</Alert>
// //                 ) : (
// //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
// //                         <Autocomplete
// //                             fullWidth
// //                             options={designations}
// //                             getOptionLabel={(option) => option.name || ""}
// //                             value={selectedDesignation}
// //                             onChange={(event, newValue) => {
// //                                 setSelectedDesignation(newValue);
// //                             }}
// //                             renderInput={(params) => (
// //                                 <TextField {...params} label="Search and Select Designation" variant="outlined" />
// //                             )}
// //                         />
// //                         <Button
// //                             variant="contained"
// //                             onClick={handleViewDetailsClick}
// //                             disabled={!selectedDesignation}
// //                             sx={{ height: '56px', whiteSpace: 'nowrap' }}
// //                         >
// //                             View Details
// //                         </Button>
// //                     </Box>
// //                 )}
// //             </Paper>

// //             {viewingDesignation && (
// //                 <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 4 }}>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
// //                         <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick}><ArrowBackIcon /></IconButton></Tooltip>
// //                         <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>4A Review: {viewingDesignation.name}</Typography>
// //                         {activeTab < 4 && (
// //                             <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenSelectDialog}>Select Parameter</Button>
// //                         )}
// //                     </Box>
// //                     <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered>
// //                         <Tab label="Phase 1: Align" id="tab-0" />
// //                         <Tab label="Phase 2: Accelerate" id="tab-1" />
// //                         <Tab label="Phase 3: Achieve" id="tab-2" />
// //                         <Tab label="Phase 4: Aspire" id="tab-3" />
// //                         <Tab label="Overall Analysis" id="tab-4" />
// //                     </Tabs>
// //                     <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
// //                     <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
// //                     <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
// //                     <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
// //                     <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
// //                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
// //                         <Button
// //                             variant="contained"
// //                             size="large"
// //                             startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
// //                             onClick={handleSaveForm}
// //                             disabled={isSaving}
// //                         >
// //                             {isSaving ? 'Saving...' : 'Save Form'}
// //                         </Button>
// //                     </Box>

// //                     <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
// //                         <DialogTitle>Select Parameters for Phase {activeTab + 1}</DialogTitle>
// //                         <DialogContent>
// //                             <FormControl component="fieldset" variant="standard">
// //                                 {availableParamsForSelection.length > 0 ? availableParamsForSelection.map((param) => (
// //                                     <FormControlLabel
// //                                         key={param.parameter_id}
// //                                         control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} />}
// //                                         label={param.para_name}
// //                                     />
// //                                 )) : <Typography sx={{ p: 2 }}>All available parameters have been added to this phase.</Typography>}
// //                             </FormControl>
// //                         </DialogContent>
// //                         <DialogActions>
// //                             <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }}>Cancel</Button>
// //                             <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting}>
// //                                 {isSubmitting ? 'Adding...' : 'Add Selected'}
// //                             </Button>
// //                         </DialogActions>
// //                     </Dialog>
// //                 </Paper>
// //             )}

// //             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
// //                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
// //                     {snackbar.message}
// //                 </Alert>
// //             </Snackbar>
// //         </Container>
// //     );
// // };

// // export default CombinedConfirmationPage;











// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField, Autocomplete, TableFooter
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: 3, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();

//     const [designations, setDesignations] = useState([]);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [viewingDesignation, setViewingDesignation] = useState(null);

//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//     const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//     const [comments, setComments] = useState({
//         phase1: { lineManager: "", head: "", hr: "" },
//         phase2: { lineManager: "", head: "", hr: "" },
//         phase3: { lineManager: "", head: "", hr: "" },
//         phase4: { lineManager: "", head: "", hr: "" },
//     });
//     const [overallComments, setOverallComments] = useState({
//         lineManager: "",
//         head: "",
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
//         const fetchDesignations = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
//                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
//                 setDesignations(formattedData);
//             } catch (err) {
//                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//                     setError("Authentication failed. Your session may have expired. Please log in again.");
//                 } else {
//                     setError("Failed to fetch designations. Please try again later.");
//                 }
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignations();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             setSnackbar({ open: true, message: "Authentication token not found. Please log in.", severity: "error" });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     const fetchPhaseWiseData = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=494", { headers });
//             if (response.data.status === "success") {
//                 setPhaseWiseData(response.data.data);
//             }
//         } catch (error) {
//             console.error("Failed to fetch phase-wise data:", error);
//             setSnackbar({ open: true, message: "Could not load phase-wise performance data.", severity: "error" });
//         }
//     };

//     useEffect(() => {
//         if (viewingDesignation) {
//             fetchPhaseWiseData();
//         }
//     }, [viewingDesignation]);

//     const fetchPhaseParameters = useCallback(async () => {
//         if (!viewingDesignation || activeTab > 3) return;
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         const phase = activeTab + 1;
//         try {
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);
//         } catch (error) {
//             console.error("Failed to fetch phase parameters:", error);
//             setSnackbar({ open: true, message: "Could not load parameters for this phase.", severity: "error" });
//             setPhaseParameters([]);
//         } finally {
//             setDetailsLoading(false);
//         }
//     }, [activeTab, viewingDesignation, navigate]);

//     useEffect(() => {
//         fetchPhaseParameters();
//     }, [fetchPhaseParameters]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             console.error("Failed to fetch parameter library:", error);
//             setSnackbar({ open: true, message: "Could not load parameter library.", severity: "error" });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         setIsSubmitting(true);
//         const designation_id = viewingDesignation.id;
//         const created_by = 1;
//         const phase = activeTab + 1;
//         const requests = selectedLibraryParameters.map(paramId => {
//             const payload = { parameter_id: paramId, designation_id, phase, created_by };
//             return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
//         });
//         try {
//             await Promise.all(requests);
//             setSnackbar({ open: true, message: `Parameters added successfully to Phase ${phase}!`, severity: "success" });
//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//             fetchPhaseParameters();
//         } catch (error) {
//             console.error("Failed to save parameters:", error);
//             setSnackbar({ open: true, message: "An error occurred while saving.", severity: "error" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         if (!window.confirm(`Are you sure you want to delete "${parameterToDelete.para_name}" from this phase?`)) return;
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         setIsSubmitting(true);
//         const idToDelete = parameterToDelete.dp_id;
//         try {
//             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${idToDelete}/`, { headers });
//             setSnackbar({ open: true, message: "Parameter deleted successfully from this phase.", severity: "success" });
//             fetchPhaseParameters();
//         } catch (error) {
//             console.error("Failed to delete parameter:", error);
//             setSnackbar({ open: true, message: "Could not delete the parameter.", severity: "error" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

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
//     const calculateAverage = (lineManager, head, hr) => {
//         const values = [lineManager, head, hr].filter((val) => val && !isNaN(val));
//         if (values.length === 0) return "0.0";
//         const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0);
//         return (sum / values.length).toFixed(1);
//     };
//     const calculatePhaseTotal = (phase) => {
//         let lineManagerTotal = 0, headTotal = 0, hrTotal = 0;
//         let lmCount = 0, headCount = 0, hrCount = 0;
//         phaseParameters.forEach((param, index) => {
//             const rating = ratings[phase]?.[index] || {};
//             if (rating.lineManager && !isNaN(rating.lineManager)) { lineManagerTotal += Number.parseFloat(rating.lineManager); lmCount++; }
//             if (rating.head && !isNaN(rating.head)) { headTotal += Number.parseFloat(rating.head); headCount++; }
//             if (rating.hr && !isNaN(rating.hr)) { hrTotal += Number.parseFloat(rating.hr); hrCount++; }
//         });
//         return {
//             lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : "0.0",
//             head: headCount > 0 ? (headTotal / headCount).toFixed(1) : "0.0",
//             hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : "0.0",
//         };
//     };

//     const updateRating = (phase, paramIndex, rater, value) => {
//         const numericValue = value.replace(/[^0-9.]/g, "");
//         if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//             setRatings((prev) => ({ ...prev, [phase]: { ...prev[phase], [paramIndex]: { ...prev[phase]?.[paramIndex], [rater]: numericValue } } }));
//         }
//     };
//     const updateComment = (phase, rater, value) => {
//         setComments((prev) => ({ ...prev, [phase]: { ...prev[phase], [rater]: value } }));
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     const handleTabChange = (event, newValue) => setActiveTab(newValue);

//     const handleSaveForm = async () => {
//         setIsSaving(true);
//         const headers = getAuthHeaders();
//         if (!headers) {
//             setIsSaving(false);
//             return;
//         }

//         if (activeTab === 4) { // Logic for Overall Analysis Tab
//             try {
//                 const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//                 const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//                 const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//                 const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
       
//                 let value4AEE = 0;
//                 if (phaseWiseData) {
//                     const scoreKeys = [
//                         'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                         'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                         'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//                     ];
//                     const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                     const maxPhaseScorePerSlot = 40;
//                     const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                     if (totalMaxScore > 0) {
//                         value4AEE = (totalApiScore / totalMaxScore) * 10;
//                     }
//                 }
       
//                 const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//                 const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//                 const allComments = [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ');

//                 const payload = {
//                     user_id: 12, // NOTE: This is hardcoded, replace with dynamic user ID if available
//                     emp_id: viewingDesignation.id,
//                     performance_analysis: allComments || "No detailed comments provided.",
//                     kra_kpi_total: kpiKraAverage,
//                     average: finalAverage,
//                     percent_achievement: achievementPercentage,
//                     comment_by_lm: overallComments.lineManager || "No comment.",
//                     comment_by_hr: overallComments.hr || "No comment.",
//                     comment_by_head: overallComments.head || "No comment."
//                 };

//                 await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//                 setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });

//             } catch (error) {
//                 console.error("Failed to save overall analysis:", error);
//                 const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
//             } finally {
//                 setIsSaving(false);
//             }

//         } else { // Logic for Phase 1-4 Tabs
//             if (phaseParameters.length === 0) {
//                 setSnackbar({ open: true, message: "There are no parameters to save in this phase.", severity: "warning" });
//                 setIsSaving(false);
//                 return;
//             }

//             const requests = phaseParameters.map(param => {
//                 const payload = {
//                     parameter_id: param.parameter_id,
//                     designation_id: viewingDesignation.id,
//                     phase: activeTab + 1,
//                     created_by: 1 // NOTE: This is hardcoded, replace with dynamic user ID if available
//                 };
//                 return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
//             });

//             try {
//                 await Promise.all(requests);
//                 setSnackbar({ open: true, message: `Phase ${activeTab + 1} data saved successfully!`, severity: "success" });
//             } catch (error) {
//                 console.error("Failed to save form data:", error);
//                 const errorMessage = error.response?.data?.message || "An error occurred while saving the form.";
//                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
//             } finally {
//                 setIsSaving(false);
//             }
//         }
//     };

//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         const paramId = parseInt(value, 10);
//         setSelectedLibraryParameters((prev) => checked ? [...prev, paramId] : prev.filter((id) => id !== paramId));
//     };

//     const handleViewDetailsClick = () => {
//         if (selectedDesignation) {
//             setViewingDesignation(selectedDesignation);
//             setActiveTab(0);
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setSelectedDesignation(null);
//         setPhaseParameters([]);
//         setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//         setComments({
//             phase1: { lineManager: "", head: "", hr: "" },
//             phase2: { lineManager: "", head: "", hr: "" },
//             phase3: { lineManager: "", head: "", hr: "" },
//             phase4: { lineManager: "", head: "", hr: "" },
//         });
//     };

//     const renderPhaseTable = (phaseKey, phaseTitle, dayRange) => (
//         <Box>
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title={`${phaseTitle} (${dayRange}) for ${viewingDesignation?.name || 'Designation'}`} titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
//                 <CardContent>
//                     {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
//                         <TableContainer component={Paper} variant="outlined">
//                             <Table>
//                                 <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
//                                     <TableRow>
//                                         <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>Parameters</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Line Manager</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Head</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>HR</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Average</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {phaseParameters.length > 0 ? phaseParameters.map((param, index) => {
//                                         const rating = ratings[phaseKey]?.[index] || {};
//                                         const average = calculateAverage(rating.lineManager, rating.head, rating.hr);
//                                         return (
//                                             <TableRow key={param.dp_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
//                                                 <TableCell>{index + 1}</TableCell>
//                                                 <TableCell>{param.para_name}</TableCell>
//                                                 <TableCell align="center"><TextField type="number" value={rating.lineManager || ""} onChange={(e) => updateRating(phaseKey, index, "lineManager", e.target.value)} size="small" sx={{ width: '60px' }} /></TableCell>
//                                                 <TableCell align="center"><TextField type="number" value={rating.head || ""} onChange={(e) => updateRating(phaseKey, index, "head", e.target.value)} size="small" sx={{ width: '60px' }} /></TableCell>
//                                                 <TableCell align="center"><TextField type="number" value={rating.hr || ""} onChange={(e) => updateRating(phaseKey, index, "hr", e.target.value)} size="small" sx={{ width: '60px' }} /></TableCell>
//                                                 <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{average}</TableCell>
//                                                 <TableCell align="center">
//                                                     <Tooltip title="Delete Parameter from this Phase">
//                                                         <span><IconButton size="small" onClick={() => handleDeleteParameter(param)} color="error" disabled={isSubmitting}><DeleteIcon /></IconButton></span>
//                                                     </Tooltip>
//                                                 </TableCell>
//                                             </TableRow>
//                                         )
//                                     }) : (<TableRow><TableCell colSpan={7} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                                     <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
//                                         <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Total</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>{calculatePhaseTotal(phaseKey).lineManager}</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>{calculatePhaseTotal(phaseKey).head}</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>{calculatePhaseTotal(phaseKey).hr}</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{calculateAverage(calculatePhaseTotal(phaseKey).lineManager, calculatePhaseTotal(phaseKey).head, calculatePhaseTotal(phaseKey).hr)}</TableCell>
//                                         <TableCell></TableCell>
//                                     </TableRow>
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     )}
//                 </CardContent>
//             </Card>
//             <Card variant="outlined">
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments[phaseKey].lineManager} onChange={(e) => updateComment(phaseKey, "lineManager", e.target.value)} /></Grid>
//                         <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments[phaseKey].head} onChange={(e) => updateComment(phaseKey, "head", e.target.value)} /></Grid>
//                         <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments[phaseKey].hr} onChange={(e) => updateComment(phaseKey, "hr", e.target.value)} /></Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>
//         </Box>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//         const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//         const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
//         const anyCommentsExist = phaseKeys.some(key => comments[key].lineManager || comments[key].head || comments[key].hr);

//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0;
//         let percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = [
//                 'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//             ];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             const maxPhaseScorePerSlot = 40;
//             const totalMaxScore = 12 * maxPhaseScorePerSlot;

//             if (totalMaxScore > 0) {
//                 value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 percent4AEE = (totalApiScore / totalMaxScore) * 100;
//             }
//         }

//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} lg={6}>
//                         <Card sx={{ height: "100%", }}>
//                             <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer >
//                                     <Table size="small">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {phaseWiseData && phaseKeys.map((phase, index) => {
//                                                 const lm = phaseWiseData[`phase${index + 1}_lm`] || 0;
//                                                 const head = phaseWiseData[`phase${index + 1}_head`] || 0;
//                                                 const hr = phaseWiseData[`phase${index + 1}_hr`] || 0;
//                                                 const total = lm + head + hr;
//                                                 return (
//                                                     <TableRow key={phase}>
//                                                         <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                         <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                         <TableCell align="right" sx={{ fontWeight: "bold" }}>{total.toFixed(1)}</TableCell>
//                                                     </TableRow>
//                                                 );
//                                             })}
//                                         </TableBody>
//                                         <TableFooter>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell>
//                                             </TableRow>
//                                         </TableFooter>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '15%' }}>KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Target</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kpiData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '60%' }}>KRA Parameter</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%' }}>Total Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kraData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     {anyCommentsExist && (
//                         <Grid item xs={12} sx={{ mt: 2 }}>
//                             <Card>
//                                 <CardHeader title="Phase Comments Summary" />
//                                 <CardContent>
//                                     <Grid container spacing={2}>
//                                         {phaseKeys.map((phaseKey, index) => {
//                                             const phaseComments = comments[phaseKey];
//                                             const hasComments = phaseComments.lineManager || phaseComments.head || phaseComments.hr;
//                                             if (!hasComments) return null;

//                                             return (
//                                                 <Grid item xs={12} md={6} key={phaseKey}>
//                                                     <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                                                         <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                                                             {["Phase 1: Align", "Phase 2: Accelerate", "Phase 3: Achieve", "Phase 4: Aspire"][index]}
//                                                         </Typography>
//                                                         {phaseComments.lineManager && (
//                                                             <Box sx={{ mb: 1 }}>
//                                                                 <Typography variant="body2" color="text.secondary" component="span" fontWeight="bold">Line Manager: </Typography>
//                                                                 <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>{phaseComments.lineManager}</Typography>
//                                                             </Box>
//                                                         )}
//                                                         {phaseComments.head && (
//                                                             <Box sx={{ mb: 1 }}>
//                                                                 <Typography variant="body2" color="text.secondary" component="span" fontWeight="bold">Head: </Typography>
//                                                                 <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>{phaseComments.head}</Typography>
//                                                             </Box>
//                                                         )}
//                                                         {phaseComments.hr && (
//                                                             <Box>
//                                                                 <Typography variant="body2" color="text.secondary" component="span" fontWeight="bold">HR: </Typography>
//                                                                 <Typography variant="body2" component="span" sx={{ whiteSpace: 'pre-wrap' }}>{phaseComments.hr}</Typography>
//                                                             </Box>
//                                                         )}
//                                                     </Paper>
//                                                 </Grid>
//                                             );
//                                         })}
//                                     </Grid>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     )}
                   
//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card>
//                             <CardHeader title="All Total" />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             <TableRow>
//                                                 <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                                 <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                                 <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card variant="outlined">
//                             <CardHeader title="Overall Comments" />
//                             <CardContent>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                                 </Grid>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                 </Grid>
//             </Box>
//         );
//     };

//     const availableParamsForSelection = parameterLibrary.filter(
//         libParam => !phaseParameters.some(phaseParam => phaseParam.parameter_id === libParam.parameter_id)
//     );

//     return (
//         <Container maxWidth="2xl" sx={{ py: 3 }}>
//             <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="h5" fontWeight="bold">
//                         Manage Employee Confirmation
//                     </Typography>
//                 </Box>

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
//                 ) : error ? (
//                     <Alert severity="error">{error}</Alert>
//                 ) : (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
//                         <Autocomplete
//                             fullWidth
//                             options={designations}
//                             getOptionLabel={(option) => option.name || ""}
//                             value={selectedDesignation}
//                             onChange={(event, newValue) => {
//                                 setSelectedDesignation(newValue);
//                             }}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Search and Select Designation" variant="outlined" />
//                             )}
//                         />
//                         <Button
//                             variant="contained"
//                             onClick={handleViewDetailsClick}
//                             disabled={!selectedDesignation}
//                             sx={{ height: '56px', whiteSpace: 'nowrap' }}
//                         >
//                             View Details
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             {viewingDesignation && (
//                 <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 4 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
//                         <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick}><ArrowBackIcon /></IconButton></Tooltip>
//                         <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>4A Review: {viewingDesignation.name}</Typography>
//                         {activeTab < 4 && (
//                             <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenSelectDialog}>Select Parameter</Button>
//                         )}
//                     </Box>
//                     <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered>
//                         <Tab label="Phase 1: Align" id="tab-0" />
//                         <Tab label="Phase 2: Accelerate" id="tab-1" />
//                         <Tab label="Phase 3: Achieve" id="tab-2" />
//                         <Tab label="Phase 4: Aspire" id="tab-3" />
//                         <Tab label="Overall Analysis" id="tab-4" />
//                     </Tabs>
//                     <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                     <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                     <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                     <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                     <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                         <Button
//                             variant="contained"
//                             size="large"
//                             startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                             onClick={handleSaveForm}
//                             disabled={isSaving}
//                         >
//                             {isSaving ? 'Saving...' : 'Save Form'}
//                         </Button>
//                     </Box>

//                     <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                         <DialogTitle>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                         <DialogContent>
//                             <FormControl component="fieldset" variant="standard">
//                                 {availableParamsForSelection.length > 0 ? availableParamsForSelection.map((param) => (
//                                     <FormControlLabel
//                                         key={param.parameter_id}
//                                         control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} />}
//                                         label={param.para_name}
//                                     />
//                                 )) : <Typography sx={{ p: 2 }}>All available parameters have been added to this phase.</Typography>}
//                             </FormControl>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }}>Cancel</Button>
//                             <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting}>
//                                 {isSubmitting ? 'Adding...' : 'Add Selected'}
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             )}

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;



// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField, Autocomplete, TableFooter
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: 3, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();

//     const [designations, setDesignations] = useState([]);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [viewingDesignation, setViewingDesignation] = useState(null);

//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//     const [overallComments, setOverallComments] = useState({
//         lineManager: "",
//         head: "",
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
//         const fetchDesignations = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
//                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
//                 setDesignations(formattedData);
//             } catch (err) {
//                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//                     setError("Authentication failed. Your session may have expired. Please log in again.");
//                 } else {
//                     setError("Failed to fetch designations. Please try again later.");
//                 }
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignations();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             setSnackbar({ open: true, message: "Authentication token not found. Please log in.", severity: "error" });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     const fetchPhaseParameters = useCallback(async () => {
//         if (!viewingDesignation || activeTab > 3) return;
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         const phase = activeTab + 1;
//         try {
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);
//         } catch (error) {
//             console.error("Failed to fetch phase parameters:", error);
//             setSnackbar({ open: true, message: "Could not load parameters for this phase.", severity: "error" });
//             setPhaseParameters([]);
//         } finally {
//             setDetailsLoading(false);
//         }
//     }, [activeTab, viewingDesignation, navigate]);

//     useEffect(() => {
//         fetchPhaseParameters();
//     }, [fetchPhaseParameters]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             console.error("Failed to fetch parameter library:", error);
//             setSnackbar({ open: true, message: "Could not load parameter library.", severity: "error" });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         setIsSubmitting(true);
//         // The API call to "save_Desigwise_parameters" has been removed as requested.
//         // The following logic simulates a successful addition for UI purposes.
//         try {
//             // This is a placeholder to simulate the async operation.
//             await new Promise(resolve => setTimeout(resolve, 500));
           
//             // Manually update the phaseParameters state to reflect the changes in the UI.
//             const newParameters = selectedLibraryParameters.map(paramId => {
//                 const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
//                 // Create a mock structure for the newly added parameter.
//                 return {
//                     dp_id: `new-${paramId}-${Date.now()}`, // A temporary unique ID
//                     parameter_id: paramId,
//                     para_name: paramDetails ? paramDetails.para_name : "New Parameter",
//                 };
//             });

//             setPhaseParameters(prev => [...prev, ...newParameters]);
//             setSnackbar({ open: true, message: `Parameters added to Phase ${activeTab + 1}!`, severity: "success" });
//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//             // No need to call fetchPhaseParameters() as we are updating the state manually.
//         } catch (error) {
//             console.error("Error during simulated parameter addition:", error);
//             setSnackbar({ open: true, message: "An error occurred while adding parameters.", severity: "error" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         if (!window.confirm(`Are you sure you want to delete "${parameterToDelete.para_name}" from this phase?`)) return;
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         setIsSubmitting(true);
//         const idToDelete = parameterToDelete.dp_id;
//         try {
//             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${idToDelete}/`, { headers });
//             setSnackbar({ open: true, message: "Parameter deleted successfully from this phase.", severity: "success" });
//             fetchPhaseParameters();
//         } catch (error) {
//             console.error("Failed to delete parameter:", error);
//             setSnackbar({ open: true, message: "Could not delete the parameter.", severity: "error" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

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

//     const handleTabChange = (event, newValue) => setActiveTab(newValue);

//     const handleSaveForm = async () => {
//         setIsSaving(true);
//         const headers = getAuthHeaders();
//         if (!headers) {
//             setIsSaving(false);
//             return;
//         }

//         if (activeTab === 4) {
//             try {
//                 const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//                 const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//                 const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//                 const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
       
//                 let value4AEE = 0;
//                 if (phaseWiseData) {
//                     const scoreKeys = [
//                         'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                         'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                         'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//                     ];
//                     const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                     const maxPhaseScorePerSlot = 40;
//                     const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                     if (totalMaxScore > 0) {
//                         value4AEE = (totalApiScore / totalMaxScore) * 10;
//                     }
//                 }
       
//                 const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//                 const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//                 const allComments = [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ');

//                 const payload = {
//                     user_id: 12,
//                     emp_id: viewingDesignation.id,
//                     performance_analysis: allComments || "No detailed comments provided.",
//                     kra_kpi_total: kpiKraAverage,
//                     average: finalAverage,
//                     percent_achievement: achievementPercentage,
//                     comment_by_lm: overallComments.lineManager || "No comment.",
//                     comment_by_hr: overallComments.hr || "No comment.",
//                     comment_by_head: overallComments.head || "No comment."
//                 };

//                 await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//                 setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });

//             } catch (error) {
//                 console.error("Failed to save overall analysis:", error);
//                 const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
//             } finally {
//                 setIsSaving(false);
//             }

//         } else {
//             if (phaseParameters.length === 0) {
//                 setSnackbar({ open: true, message: "There are no parameters to save in this phase.", severity: "warning" });
//                 setIsSaving(false);
//                 return;
//             }

//             const requests = phaseParameters.map(param => {
//                 const payload = {
//                     parameter_id: param.parameter_id,
//                     designation_id: viewingDesignation.id,
//                     phase: activeTab + 1,
//                     created_by: 1
//                 };
//                 return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
//             });

//             try {
//                 await Promise.all(requests);
//                 setSnackbar({ open: true, message: `Phase ${activeTab + 1} data saved successfully!`, severity: "success" });
//             } catch (error) {
//                 console.error("Failed to save form data:", error);
//                 const errorMessage = error.response?.data?.message || "An error occurred while saving the form.";
//                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
//             } finally {
//                 setIsSaving(false);
//             }
//         }
//     };

//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         const paramId = parseInt(value, 10);
//         setSelectedLibraryParameters((prev) => checked ? [...prev, paramId] : prev.filter((id) => id !== paramId));
//     };

//     const handleViewDetailsClick = () => {
//         if (selectedDesignation) {
//             setViewingDesignation(selectedDesignation);
//             setActiveTab(0);
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setSelectedDesignation(null);
//         setPhaseParameters([]);
//     };

//     const renderPhaseTable = (phaseKey, phaseTitle, dayRange) => (
//         <Box>
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title={`${phaseTitle} (${dayRange}) for ${viewingDesignation?.name || 'Designation'}`} titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
//                 <CardContent>
//                     {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
//                         <TableContainer component={Paper} variant="outlined">
//                             <Table>
//                                 <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
//                                     <TableRow>
//                                         <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', width: '60%' }}>Parameters</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {phaseParameters.length > 0 ? phaseParameters.map((param, index) => {
//                                         return (
//                                             <TableRow key={param.dp_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
//                                                 <TableCell>{index + 1}</TableCell>
//                                                 <TableCell>{param.para_name}</TableCell>
//                                                 <TableCell align="center">
//                                                     <Tooltip title="Delete Parameter from this Phase">
//                                                         <span><IconButton size="small" onClick={() => handleDeleteParameter(param)} color="error" disabled={isSubmitting}><DeleteIcon /></IconButton></span>
//                                                     </Tooltip>
//                                                 </TableCell>
//                                             </TableRow>
//                                         )
//                                     }) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     )}
//                 </CardContent>
//             </Card>
//         </Box>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//         const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//         const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
       
//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0;
//         let percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = [
//                 'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//             ];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             const maxPhaseScorePerSlot = 40;
//             const totalMaxScore = 12 * maxPhaseScorePerSlot;

//             if (totalMaxScore > 0) {
//                 value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 percent4AEE = (totalApiScore / totalMaxScore) * 100;
//             }
//         }

//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} lg={6}>
//                         <Card sx={{ height: "100%", }}>
//                             <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer >
//                                     <Table size="small">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {phaseKeys.map((phase, index) => {
//                                                 const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0;
//                                                 const head = phaseWiseData?.[`phase${index + 1}_head`] || 0;
//                                                 const hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
//                                                 const total = lm + head + hr;
//                                                 return (
//                                                     <TableRow key={phase}>
//                                                         <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                         <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                         <TableCell align="right" sx={{ fontWeight: "bold" }}>{total.toFixed(1)}</TableCell>
//                                                     </TableRow>
//                                                 );
//                                             })}
//                                         </TableBody>
//                                         <TableFooter>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell>
//                                             </TableRow>
//                                         </TableFooter>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '15%' }}>KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Target</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kpiData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '60%' }}>KRA Parameter</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%' }}>Total Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kraData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card>
//                             <CardHeader title="All Total" />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             <TableRow>
//                                                 <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                                 <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                                 <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card variant="outlined">
//                             <CardHeader title="Overall Comments" />
//                             <CardContent>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                                 </Grid>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                 </Grid>
//             </Box>
//         );
//     };

//     const availableParamsForSelection = parameterLibrary.filter(
//         libParam => !phaseParameters.some(phaseParam => phaseParam.parameter_id === libParam.parameter_id)
//     );

//     return (
//         <Container maxWidth="2xl" sx={{ py: 3 }}>
//             <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="h5" fontWeight="bold">
//                         Manage Employee Confirmation
//                     </Typography>
//                 </Box>

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
//                 ) : error ? (
//                     <Alert severity="error">{error}</Alert>
//                 ) : (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
//                         <Autocomplete
//                             fullWidth
//                             options={designations}
//                             getOptionLabel={(option) => option.name || ""}
//                             value={selectedDesignation}
//                             onChange={(event, newValue) => {
//                                 setSelectedDesignation(newValue);
//                             }}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Search and Select Designation" variant="outlined" />
//                             )}
//                         />
//                         <Button
//                             variant="contained"
//                             onClick={handleViewDetailsClick}
//                             disabled={!selectedDesignation}
//                             sx={{ height: '56px', whiteSpace: 'nowrap' }}
//                         >
//                             View Details
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             {viewingDesignation && (
//                 <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 4 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
//                         <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick}><ArrowBackIcon /></IconButton></Tooltip>
//                         <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>4A Review: {viewingDesignation.name}</Typography>
//                         {activeTab < 4 && (
//                             <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenSelectDialog}>Select Parameter</Button>
//                         )}
//                     </Box>
//                     <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered>
//                         <Tab label="Phase 1: Align" id="tab-0" />
//                         <Tab label="Phase 2: Accelerate" id="tab-1" />
//                         <Tab label="Phase 3: Achieve" id="tab-2" />
//                         <Tab label="Phase 4: Aspire" id="tab-3" />
//                         {/* <Tab label="Overall Analysis" id="tab-4" /> */}
//                     </Tabs>
//                     <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                     <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                     <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                     <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                     <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                         <Button
//                             variant="contained"
//                             size="large"
//                             startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                             onClick={handleSaveForm}
//                             disabled={isSaving}
//                         >
//                             {isSaving ? 'Saving...' : 'Save Form'}
//                         </Button>
//                     </Box>

//                     <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                         <DialogTitle>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                         <DialogContent>
//                             <FormControl component="fieldset" variant="standard">
//                                 {availableParamsForSelection.length > 0 ? availableParamsForSelection.map((param) => (
//                                     <FormControlLabel
//                                         key={param.parameter_id}
//                                         control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} />}
//                                         label={param.para_name}
//                                     />
//                                 )) : <Typography sx={{ p: 2 }}>All available parameters have been added to this phase.</Typography>}
//                             </FormControl>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }}>Cancel</Button>
//                             <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting}>
//                                 {isSubmitting ? 'Adding...' : 'Add Selected'}
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             )}

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;




// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField, Autocomplete, TableFooter
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: 3, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();

//     const [designations, setDesignations] = useState([]);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [viewingDesignation, setViewingDesignation] = useState(null);
//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [allDesignationParameters, setAllDesignationParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [isDirty, setIsDirty] = useState(false);

//     const [overallComments, setOverallComments] = useState({
//         lineManager: "",
//         head: "",
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
//         const fetchDesignations = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
//                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
//                 setDesignations(formattedData);
//             } catch (err) {
//                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//                     setError("Authentication failed. Your session may have expired. Please log in again.");
//                 } else {
//                     setError("Failed to fetch designations. Please try again later.");
//                 }
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignations();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             setSnackbar({ open: true, message: "Authentication token not found. Please log in.", severity: "error" });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     const fetchPhaseParameters = useCallback(async () => {
//         if (!viewingDesignation || activeTab > 3) return;
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         const phase = activeTab + 1;
//         try {
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);
//         } catch (error) {
//             console.error("Failed to fetch phase parameters:", error);
//             setSnackbar({ open: true, message: "Could not load parameters for this phase.", severity: "error" });
//             setPhaseParameters([]);
//         } finally {
//             setDetailsLoading(false);
//         }
//     }, [activeTab, viewingDesignation, navigate]);

//     useEffect(() => {
//         if (viewingDesignation) {
//             fetchPhaseParameters();
//         }
//     }, [fetchPhaseParameters, viewingDesignation]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             console.error("Failed to fetch parameter library:", error);
//             setSnackbar({ open: true, message: "Could not load parameter library.", severity: "error" });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         setIsSubmitting(true);
//         try {
//             await new Promise(resolve => setTimeout(resolve, 500));
           
//             const newParameters = selectedLibraryParameters.map(paramId => {
//                 const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
//                 return {
//                     dp_id: `new-${paramId}-${Date.now()}`,
//                     parameter_id: paramId,
//                     para_name: paramDetails ? paramDetails.para_name : "New Parameter",
//                 };
//             });

//             setPhaseParameters(prev => [...prev, ...newParameters]);
//             setAllDesignationParameters(prev => [...prev, ...newParameters]);
//             setIsDirty(true);

//             setSnackbar({ open: true, message: `Parameters added to Phase ${activeTab + 1}!`, severity: "success" });
//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//         } catch (error) {
//             console.error("Error during simulated parameter addition:", error);
//             setSnackbar({ open: true, message: "An error occurred while adding parameters.", severity: "error" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         if (!window.confirm(`Are you sure you want to delete "${parameterToDelete.para_name}" from this phase?`)) return;
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         setIsSubmitting(true);
//         const idToDelete = parameterToDelete.dp_id;
//         try {
//             if (!String(idToDelete).startsWith('new-')) {
//                 await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${idToDelete}/`, { headers });
//             }
//             setSnackbar({ open: true, message: "Parameter deleted successfully from this phase.", severity: "success" });
//             setPhaseParameters(prev => prev.filter(p => p.dp_id !== idToDelete));
//             setAllDesignationParameters(prev => prev.filter(p => p.dp_id !== idToDelete));
//             setIsDirty(true);
//         } catch (error) {
//             console.error("Failed to delete parameter:", error);
//             setSnackbar({ open: true, message: "Could not delete the parameter.", severity: "error" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//         setIsDirty(true);
//     };
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//         setIsDirty(true);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//         setIsDirty(true);
//     };

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//         setIsDirty(false);
//     };

//     const handleSaveForm = async () => {
//         setIsSaving(true);
//         const headers = getAuthHeaders();
//         if (!headers) {
//             setIsSaving(false);
//             return;
//         }

//         if (activeTab === 4) {
//             try {
//                 const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//                 const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//                 const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//                 const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
       
//                 let value4AEE = 0;
//                 if (phaseWiseData) {
//                     const scoreKeys = [
//                         'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                         'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                         'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//                     ];
//                     const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                     const maxPhaseScorePerSlot = 40;
//                     const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                     if (totalMaxScore > 0) {
//                         value4AEE = (totalApiScore / totalMaxScore) * 10;
//                     }
//                 }
       
//                 const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//                 const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//                 const allComments = [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ');

//                 const payload = {
//                     user_id: 12,
//                     emp_id: viewingDesignation.id,
//                     performance_analysis: allComments || "No detailed comments provided.",
//                     kra_kpi_total: kpiKraAverage,
//                     average: finalAverage,
//                     percent_achievement: achievementPercentage,
//                     comment_by_lm: overallComments.lineManager || "No comment.",
//                     comment_by_hr: overallComments.hr || "No comment.",
//                     comment_by_head: overallComments.head || "No comment."
//                 };

//                 await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//                 setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });
//                 setIsDirty(false);

//             } catch (error) {
//                 console.error("Failed to save overall analysis:", error);
//                 const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
//             } finally {
//                 setIsSaving(false);
//             }

//         } else {
//             if (phaseParameters.length === 0) {
//                 setSnackbar({ open: true, message: "There are no parameters to save in this phase.", severity: "warning" });
//                 setIsSaving(false);
//                 return;
//             }

//             const requests = phaseParameters.map(param => {
//                 const payload = {
//                     parameter_id: param.parameter_id,
//                     designation_id: viewingDesignation.id,
//                     phase: activeTab + 1,
//                     created_by: 1
//                 };
//                 return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
//             });

//             try {
//                 await Promise.all(requests);
//                 setSnackbar({ open: true, message: `Phase ${activeTab + 1} data saved successfully!`, severity: "success" });
//                 setIsDirty(false);
//             } catch (error) {
//                 console.error("Failed to save form data:", error);
//                 const errorMessage = error.response?.data?.message || "An error occurred while saving the form.";
//                 setSnackbar({ open: true, message: errorMessage, severity: "error" });
//             } finally {
//                 setIsSaving(false);
//             }
//         }
//     };

//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         const paramId = parseInt(value, 10);
//         setSelectedLibraryParameters((prev) => checked ? [...prev, paramId] : prev.filter((id) => id !== paramId));
//     };

//     const handleViewDetailsClick = async () => {
//         if (selectedDesignation) {
//             setViewingDesignation(selectedDesignation);
//             setActiveTab(0);
//             setDetailsLoading(true);

//             const headers = getAuthHeaders();
//             if (!headers) {
//                 setDetailsLoading(false);
//                 return;
//             }

//             try {
//                 const phasePromises = [1, 2, 3, 4].map(phase =>
//                     axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${selectedDesignation.id}`, { headers })
//                 );
//                 const responses = await Promise.all(phasePromises);
//                 const allParams = responses.flatMap(response => response.data.data || []);
//                 setAllDesignationParameters(allParams);
//                 setPhaseParameters(responses[0].data.data || []);
//                 setIsDirty(false);
//             } catch (error) {
//                 console.error("Failed to fetch all designation parameters:", error);
//                 setSnackbar({ open: true, message: "Could not load complete parameter data for this designation.", severity: "error" });
//             } finally {
//                 setDetailsLoading(false);
//             }
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setSelectedDesignation(null);
//         setPhaseParameters([]);
//         setAllDesignationParameters([]);
//         setIsDirty(false);
//     };

//     const renderPhaseTable = (phaseKey, phaseTitle, dayRange) => (
//         <Box>
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title={`${phaseTitle} (${dayRange}) for ${viewingDesignation?.name || 'Designation'}`} titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
//                 <CardContent>
//                     {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
//                         <TableContainer component={Paper} variant="outlined">
//                             <Table>
//                                 <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
//                                     <TableRow>
//                                         <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', width: '60%' }}>Parameters</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {phaseParameters.length > 0 ? phaseParameters.map((param, index) => (
//                                         <TableRow key={param.dp_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
//                                             <TableCell>{index + 1}</TableCell>
//                                             <TableCell>{param.para_name}</TableCell>
//                                             <TableCell align="center">
//                                                 <Tooltip title="Delete Parameter from this Phase">
//                                                     <span><IconButton size="small" onClick={() => handleDeleteParameter(param)} color="error" disabled={isSubmitting}><DeleteIcon /></IconButton></span>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     )) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     )}
//                 </CardContent>
//             </Card>
//         </Box>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//         const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//         const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
       
//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0;
//         let percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = [
//                 'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//             ];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             const maxPhaseScorePerSlot = 40;
//             const totalMaxScore = 12 * maxPhaseScorePerSlot;

//             if (totalMaxScore > 0) {
//                 value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 percent4AEE = (totalApiScore / totalMaxScore) * 100;
//             }
//         }

//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} lg={6}>
//                         <Card sx={{ height: "100%", }}>
//                             <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer >
//                                     <Table size="small">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {phaseKeys.map((phase, index) => {
//                                                 const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0;
//                                                 const head = phaseWiseData?.[`phase${index + 1}_head`] || 0;
//                                                 const hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
//                                                 const total = lm + head + hr;
//                                                 return (
//                                                     <TableRow key={phase}>
//                                                         <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                         <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                         <TableCell align="right" sx={{ fontWeight: "bold" }}>{total.toFixed(1)}</TableCell>
//                                                     </TableRow>
//                                                 );
//                                             })}
//                                         </TableBody>
//                                         <TableFooter>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell>
//                                             </TableRow>
//                                         </TableFooter>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '15%' }}>KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Target</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kpiData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '60%' }}>KRA Parameter</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%' }}>Total Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kraData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card>
//                             <CardHeader title="All Total" />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             <TableRow>
//                                                 <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                                 <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                                 <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card variant="outlined">
//                             <CardHeader title="Overall Comments" />
//                             <CardContent>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                                 </Grid>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                 </Grid>
//             </Box>
//         );
//     };

//     return (
//         <Container maxWidth="2xl" sx={{ py: 3 }}>
//             <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="h5" fontWeight="bold">
//                         Manage Employee Confirmation
//                     </Typography>
//                 </Box>

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
//                 ) : error ? (
//                     <Alert severity="error">{error}</Alert>
//                 ) : (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
//                         <Autocomplete
//                             fullWidth
//                             options={designations}
//                             getOptionLabel={(option) => option.name || ""}
//                             value={selectedDesignation}
//                             onChange={(event, newValue) => {
//                                 setSelectedDesignation(newValue);
//                             }}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Search and Select Designation" variant="outlined" />
//                             )}
//                         />
//                         <Button
//                             variant="contained"
//                             onClick={handleViewDetailsClick}
//                             disabled={!selectedDesignation}
//                             sx={{ height: '56px', whiteSpace: 'nowrap' }}
//                         >
//                             View Details
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             {viewingDesignation && (
//                 <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 4 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
//                         <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick}><ArrowBackIcon /></IconButton></Tooltip>
//                         <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>4A Review: {viewingDesignation.name}</Typography>
//                         {activeTab < 4 && (
//                             <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenSelectDialog}>Select Parameter</Button>
//                         )}
//                     </Box>
//                     <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered>
//                         <Tab label="Phase 1: Align" id="tab-0" />
//                         <Tab label="Phase 2: Accelerate" id="tab-1" />
//                         <Tab label="Phase 3: Achieve" id="tab-2" />
//                         <Tab label="Phase 4: Aspire" id="tab-3" />
//                         <Tab label="Overall Analysis" id="tab-4" />
//                     </Tabs>
//                     <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                     <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                     <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                     <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                     <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                         <Button
//                             variant="contained"
//                             size="large"
//                             startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                             onClick={handleSaveForm}
//                             disabled={isSaving || !isDirty}
//                         >
//                             {isSaving ? 'Saving...' : 'Save Form'}
//                         </Button>
//                     </Box>

//                     <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                         <DialogTitle>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                         <DialogContent>
//                             <FormControl component="fieldset" variant="standard">
//                                 {parameterLibrary.length > 0 ? parameterLibrary.map((param) => {
//                                     const isAlreadyAdded = allDesignationParameters.some(
//                                         p => p.parameter_id === param.parameter_id
//                                     );

//                                     return (
//                                         <FormControlLabel
//                                             key={param.parameter_id}
//                                             disabled={isAlreadyAdded}
//                                             control={
//                                                 <Checkbox
//                                                     checked={isAlreadyAdded || selectedLibraryParameters.includes(param.parameter_id)}
//                                                     onChange={handleLibraryParameterSelect}
//                                                     value={param.parameter_id}
//                                                 />
//                                             }
//                                             label={
//                                                 <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
//                                                     {param.para_name}
//                                                     {isAlreadyAdded && (
//                                                         <Tooltip title="Already added to this designation">
//                                                             <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18, ml: 1 }} />
//                                                         </Tooltip>
//                                                     )}
//                                                 </Box>
//                                             }
//                                         />
//                                     );
//                                 }) : <Typography sx={{ p: 2 }}>Parameter library is empty.</Typography>}
//                             </FormControl>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }}>Cancel</Button>
//                             <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting}>
//                                 {isSubmitting ? 'Adding...' : 'Add Selected'}
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             )}

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;






// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField, Autocomplete, TableFooter
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: 3, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();

//     const [designations, setDesignations] = useState([]);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [viewingDesignation, setViewingDesignation] = useState(null);
//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [allDesignationParameters, setAllDesignationParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [isDirty, setIsDirty] = useState(false);

//     const [overallComments, setOverallComments] = useState({
//         lineManager: "",
//         head: "",
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
//         const fetchDesignations = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
//                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
//                 setDesignations(formattedData);
//             } catch (err) {
//                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
//                     setError("Authentication failed. Your session may have expired. Please log in again.");
//                 } else {
//                     setError("Failed to fetch designations. Please try again later.");
//                 }
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignations();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             setSnackbar({ open: true, message: "Authentication token not found. Please log in.", severity: "error" });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     const fetchPhaseParameters = useCallback(async () => {
//         if (!viewingDesignation || activeTab > 3) return;
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         const phase = activeTab + 1;
//         try {
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);
//         } catch (error) {
//             console.error("Failed to fetch phase parameters:", error);
//             setSnackbar({ open: true, message: "Could not load parameters for this phase.", severity: "error" });
//             setPhaseParameters([]);
//         } finally {
//             setDetailsLoading(false);
//         }
//     }, [activeTab, viewingDesignation, navigate]);

//     useEffect(() => {
//         if (viewingDesignation) {
//             fetchPhaseParameters();
//         }
//     }, [fetchPhaseParameters, viewingDesignation]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             console.error("Failed to fetch parameter library:", error);
//             setSnackbar({ open: true, message: "Could not load parameter library.", severity: "error" });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         setIsSubmitting(true);
//         const headers = getAuthHeaders();
//         if (!headers) {
//             setIsSubmitting(false);
//             return;
//         }

//         const requests = selectedLibraryParameters.map(paramId => {
//             const payload = {
//                 parameter_id: paramId,
//                 designation_id: viewingDesignation.id,
//                 phase: activeTab + 1,
//                 created_by: 1
//             };
//             return axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", payload, { headers });
//         });

//         try {
//             await Promise.all(requests);
           
//             await Swal.fire({
//                 title: 'Success!',
//                 text: 'Parameters have been added successfully.',
//                 icon: 'success',
//                 timer: 2000,
//                 showConfirmButton: false
//             });

//             fetchPhaseParameters();
           
//             const newlyAddedParams = selectedLibraryParameters.map(paramId => {
//                  const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
//                  return { parameter_id: paramId, para_name: paramDetails ? paramDetails.para_name : "Loading..." };
//             });
//             setAllDesignationParameters(prev => [...prev, ...newlyAddedParams]);

//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//         } catch (error) {
//             console.error("Failed to save parameters:", error);
//             const errorMessage = error.response?.data?.message || "An error occurred while saving.";
//             Swal.fire({
//                 title: 'Error!',
//                 text: `Could not save parameters. ${errorMessage}`,
//                 icon: 'error',
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: `You won't be able to revert this!`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (!result.isConfirmed) return;
       
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         const idToDelete = parameterToDelete.dp_id;
//         try {
//             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${idToDelete}/`, { headers });
//             Swal.fire('Deleted!', 'The parameter has been deleted.', 'success');
//             setPhaseParameters(prev => prev.filter(p => p.dp_id !== idToDelete));
//             setAllDesignationParameters(prev => prev.filter(p => p.parameter_id !== parameterToDelete.parameter_id));
//         } catch (error) {
//             console.error("Failed to delete parameter:", error);
//             Swal.fire('Error!', 'Could not delete the parameter.', 'error');
//         }
//     };

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//         setIsDirty(true);
//     };
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//         setIsDirty(true);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//         setIsDirty(true);
//     };

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//         setIsDirty(false);
//     };

//     const handleSaveForm = async () => {
//         if (activeTab !== 4) return;

//         setIsSaving(true);
//         const headers = getAuthHeaders();
//         if (!headers) {
//             setIsSaving(false);
//             return;
//         }

//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
   
//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = [ 'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr' ];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 const maxPhaseScorePerSlot = 40;
//                 const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                 if (totalMaxScore > 0) {
//                     value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 }
//             }
   
//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);
//             const allComments = [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ');

//             const payload = {
//                 user_id: 12,
//                 emp_id: viewingDesignation.id,
//                 performance_analysis: allComments || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: overallComments.lineManager || "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: overallComments.head || "No comment."
//             };

//             await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//             setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });
//             setIsDirty(false);

//         } catch (error) {
//             console.error("Failed to save overall analysis:", error);
//             const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//             setSnackbar({ open: true, message: errorMessage, severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         const paramId = parseInt(value, 10);
//         setSelectedLibraryParameters((prev) => checked ? [...prev, paramId] : prev.filter((id) => id !== paramId));
//     };

//     const handleViewDetailsClick = async () => {
//         if (selectedDesignation) {
//             setViewingDesignation(selectedDesignation);
//             setActiveTab(0);
//             setDetailsLoading(true);

//             const headers = getAuthHeaders();
//             if (!headers) {
//                 setDetailsLoading(false);
//                 return;
//             }

//             try {
//                 const phasePromises = [1, 2, 3, 4].map(phase =>
//                     axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${selectedDesignation.id}`, { headers })
//                 );
//                 const responses = await Promise.all(phasePromises);
//                 const allParams = responses.flatMap(response => response.data.data || []);
//                 setAllDesignationParameters(allParams);
//                 setPhaseParameters(responses[0].data.data || []);
//                 setIsDirty(false);
//             } catch (error) {
//                 console.error("Failed to fetch all designation parameters:", error);
//                 setSnackbar({ open: true, message: "Could not load complete parameter data for this designation.", severity: "error" });
//             } finally {
//                 setDetailsLoading(false);
//             }
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setSelectedDesignation(null);
//         setPhaseParameters([]);
//         setAllDesignationParameters([]);
//         setIsDirty(false);
//     };

//     const renderPhaseTable = (phaseKey, phaseTitle, dayRange) => (
//         <Box>
//             <Card sx={{ mb: 3 }}>
//                 <CardHeader title={`${phaseTitle} (${dayRange}) for ${viewingDesignation?.name || 'Designation'}`} titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
//                 <CardContent>
//                     {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box> : (
//                         <TableContainer component={Paper} variant="outlined">
//                             <Table>
//                                 <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
//                                     <TableRow>
//                                         <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', width: '60%' }}>Parameters</TableCell>
//                                         <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {phaseParameters.length > 0 ? phaseParameters.map((param, index) => (
//                                         <TableRow key={param.dp_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
//                                             <TableCell>{index + 1}</TableCell>
//                                             <TableCell>{param.para_name}</TableCell>
//                                             <TableCell align="center">
//                                                 <Tooltip title="Delete Parameter from this Phase">
//                                                     <span><IconButton size="small" onClick={() => handleDeleteParameter(param)} color="error" disabled={isSubmitting}><DeleteIcon /></IconButton></span>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     )) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     )}
//                 </CardContent>
//             </Card>
//         </Box>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//         const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//         const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
       
//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0;
//         let percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = [
//                 'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//             ];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             const maxPhaseScorePerSlot = 40;
//             const totalMaxScore = 12 * maxPhaseScorePerSlot;

//             if (totalMaxScore > 0) {
//                 value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 percent4AEE = (totalApiScore / totalMaxScore) * 100;
//             }
//         }

//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} lg={6}>
//                         <Card sx={{ height: "100%", }}>
//                             <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer >
//                                     <Table size="small">
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {phaseKeys.map((phase, index) => {
//                                                 const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0;
//                                                 const head = phaseWiseData?.[`phase${index + 1}_head`] || 0;
//                                                 const hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
//                                                 const total = lm + head + hr;
//                                                 return (
//                                                     <TableRow key={phase}>
//                                                         <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                         <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                         <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                         <TableCell align="right" sx={{ fontWeight: "bold" }}>{total.toFixed(1)}</TableCell>
//                                                     </TableRow>
//                                                 );
//                                             })}
//                                         </TableBody>
//                                         <TableFooter>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell>
//                                                 <TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell>
//                                             </TableRow>
//                                         </TableFooter>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '15%' }}>KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Target</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%' }}>Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kpiData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}>
//                         <Card sx={{ height: "100%" }}>
//                             <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold", width: '60%' }}>KRA Parameter</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%' }}>Total Rating</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {kraData.map((row, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                         <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} />
//                                                     </TableCell>
//                                                     <TableCell sx={{ p: 0.5 }}>
//                                                         <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                     </TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card>
//                             <CardHeader title="All Total" />
//                             <CardContent>
//                                 <TableContainer>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>% Ach</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             <TableRow>
//                                                 <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                                 <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                                 <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                                 <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                     <Grid item xs={12} sx={{ mt: 2 }}>
//                         <Card variant="outlined">
//                             <CardHeader title="Overall Comments" />
//                             <CardContent>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                                     <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                                 </Grid>
//                             </CardContent>
//                         </Card>
//                     </Grid>

//                 </Grid>
//             </Box>
//         );
//     };

//     return (
//         <Container maxWidth="2xl" sx={{ py: 3 }}>
//             <Paper sx={{ width: "100%", p: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                     <Typography variant="h5" fontWeight="bold">
//                         Manage Employee Confirmation
//                     </Typography>
//                 </Box>

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
//                 ) : error ? (
//                     <Alert severity="error">{error}</Alert>
//                 ) : (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
//                         <Autocomplete
//                             fullWidth
//                             options={designations}
//                             getOptionLabel={(option) => option.name || ""}
//                             value={selectedDesignation}
//                             onChange={(event, newValue) => {
//                                 setSelectedDesignation(newValue);
//                             }}
//                             renderInput={(params) => (
//                                 <TextField {...params} label="Search and Select Designation" variant="outlined" />
//                             )}
//                         />
//                         <Button
//                             variant="contained"
//                             onClick={handleViewDetailsClick}
//                             disabled={!selectedDesignation}
//                             sx={{ height: '56px', whiteSpace: 'nowrap' }}
//                         >
//                             View Details
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             {viewingDesignation && (
//                 <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 4 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
//                         <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick}><ArrowBackIcon /></IconButton></Tooltip>
//                         <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>4A Review: {viewingDesignation.name}</Typography>
//                         {activeTab < 4 && (
//                             <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenSelectDialog}>Select Parameter</Button>
//                         )}
//                     </Box>
//                     <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered>
//                         <Tab label="Phase 1: Align" id="tab-0" />
//                         <Tab label="Phase 2: Accelerate" id="tab-1" />
//                         <Tab label="Phase 3: Achieve" id="tab-2" />
//                         <Tab label="Phase 4: Aspire" id="tab-3" />
//                         <Tab label="Overall Analysis" id="tab-4" />
//                     </Tabs>
//                     <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                     <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                     <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                     <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                     <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
                   
//                     {activeTab === 4 && (
//                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                             <Button
//                                 variant="contained"
//                                 size="large"
//                                 startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
//                                 onClick={handleSaveForm}
//                                 disabled={isSaving || !isDirty}
//                             >
//                                 {isSaving ? 'Saving...' : 'Save Form'}
//                             </Button>
//                         </Box>
//                     )}

//                     <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                         <DialogTitle>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                         <DialogContent>
//                             <FormControl component="fieldset" variant="standard">
//                                 {parameterLibrary.length > 0 ? parameterLibrary.map((param) => {
//                                     const isAlreadyAdded = allDesignationParameters.some(
//                                         p => p.parameter_id === param.parameter_id
//                                     );
//                                     return (
//                                         <FormControlLabel
//                                             key={param.parameter_id}
//                                             disabled={isAlreadyAdded}
//                                             control={
//                                                 <Checkbox
//                                                     checked={isAlreadyAdded || selectedLibraryParameters.includes(param.parameter_id)}
//                                                     onChange={handleLibraryParameterSelect}
//                                                     value={param.parameter_id}
//                                                 />
//                                             }
//                                             label={param.para_name}
//                                         />
//                                     );
// }) : <Typography sx={{ p: 2 }}>Parameter library is empty.</Typography>}
//                             </FormControl>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }}>Cancel</Button>
//                             <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting}>
//                                 {isSubmitting ? 'Adding...' : 'Add Selected'}
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             )}

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;









// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField, Autocomplete, TableFooter, useMediaQuery
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, Search as SearchIcon } from "@mui/icons-material";
// import { useTheme } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: { xs: 1, sm: 3 }, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const [designations, setDesignations] = useState([]);
//     const [selectedDesignation, setSelectedDesignation] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [viewingDesignation, setViewingDesignation] = useState(null);
//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [allDesignationParameters, setAllDesignationParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [isDirty, setIsDirty] = useState(false);

//     const [overallComments, setOverallComments] = useState({ lineManager: "", head: "", hr: "" });
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

//     // Common styles based on the theme requirements
//     const primaryButtonStyles = {
//         backgroundColor: '#8C257C',
//         color: 'white',
//         '&:hover': { backgroundColor: '#6d1d60' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     const tableHeaderStyles = {
//         backgroundColor: '#8C257C',
//         '& .MuiTableCell-head': {
//             color: 'white',
//             fontWeight: 'bold',
//         }
//     };

//     useEffect(() => {
//         const fetchDesignations = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
//                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
//                 setDesignations(formattedData);
//             } catch (err) {
//                 setError("Failed to fetch designations. Please try again later.");
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignations();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             Swal.fire({ icon: 'error', title: 'Authentication Error', text: 'Token not found. Please log in again.', timer: 3000, showConfirmButton: false });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     const fetchPhaseParameters = useCallback(async () => {
//         if (!viewingDesignation || activeTab > 3) return;
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         const phase = activeTab + 1;
//         try {
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Loading Error', text: 'Could not load parameters for this phase.', timer: 3000, showConfirmButton: false });
//         } finally {
//             setDetailsLoading(false);
//         }
//     }, [activeTab, viewingDesignation, navigate]);

//     useEffect(() => {
//         if (viewingDesignation) fetchPhaseParameters();
//     }, [fetchPhaseParameters, viewingDesignation]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load parameter library.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         setIsSubmitting(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setIsSubmitting(false); return; }
        
//         const requests = selectedLibraryParameters.map(paramId => axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", {
//             parameter_id: paramId,
//             designation_id: viewingDesignation.id,
//             phase: activeTab + 1,
//             created_by: 1
//         }, { headers }));

//         try {
//             await Promise.all(requests);
//             await Swal.fire({ title: 'Success!', text: 'Parameters added successfully.', icon: 'success', timer: 3000, showConfirmButton: false });
//             fetchPhaseParameters();
//             const newlyAddedParams = selectedLibraryParameters.map(paramId => {
//                  const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
//                  return { parameter_id: paramId, para_name: paramDetails ? paramDetails.para_name : "..." };
//             });
//             setAllDesignationParameters(prev => [...prev, ...newlyAddedParams]);
//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//         } catch (error) {
//             Swal.fire({ title: 'Error!', text: `Could not save parameters. ${error.response?.data?.message || ""}`, icon: 'error' });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: `This action cannot be undone!`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (!result.isConfirmed) return;
       
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${parameterToDelete.dp_id}/`, { headers });
//             Swal.fire({ title: 'Deleted!', text: 'The parameter has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
//             setPhaseParameters(prev => prev.filter(p => p.dp_id !== parameterToDelete.dp_id));
//         } catch (error) {
//             Swal.fire({ title: 'Error!', text: 'Could not delete the parameter.', icon: 'error' });
//         }
//     };

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//         setIsDirty(true);
//     };
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//         setIsDirty(true);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//         setIsDirty(true);
//     };

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//         setIsDirty(false);
//     };

//     const handleSaveForm = async () => {
//         if (activeTab !== 4) return;
//         setIsSaving(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setIsSaving(false); return; }

//         try {
//             const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
//             const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((s, r) => s + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
   
//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 if (totalApiScore > 0) {
//                     value4AEE = (totalApiScore / (12 * 40)) * 10;
//                 }
//             }
   
//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: 12, emp_id: viewingDesignation.id, performance_analysis: [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ') || "No comments.",
//                 kra_kpi_total: kpiKraAverage, average: finalAverage, percent_achievement: achievementPercentage,
//                 comment_by_lm: overallComments.lineManager || "N/A", comment_by_hr: overallComments.hr || "N/A", comment_by_head: overallComments.head || "N/A"
//             };

//             await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Overall analysis saved successfully!', timer: 3000, showConfirmButton: false });
//             setIsDirty(false);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Save Error', text: error.response?.data?.message || "An error occurred while saving.", timer: 3000, showConfirmButton: false });
//         } finally {
//             setIsSaving(false);
//         }
//     };
    
//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         setSelectedLibraryParameters(prev => checked ? [...prev, parseInt(value, 10)] : prev.filter(id => id !== parseInt(value, 10)));
//     };

//     const handleViewDetailsClick = async () => {
//         if (!selectedDesignation) return;
//         setViewingDesignation(selectedDesignation);
//         setActiveTab(0);
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         try {
//             const responses = await Promise.all([1, 2, 3, 4].map(phase =>
//                 axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${selectedDesignation.id}`, { headers })
//             ));
//             setAllDesignationParameters(responses.flatMap(res => res.data.data || []));
//             setPhaseParameters(responses[0].data.data || []);
//             setIsDirty(false);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Data Load Error', text: 'Could not load complete parameter data.', timer: 3000, showConfirmButton: false });
//         } finally {
//             setDetailsLoading(false);
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setSelectedDesignation(null);
//         setIsDirty(false);
//     };

//     const renderPhaseTable = (phaseTitle, dayRange) => (
//         <Card variant="outlined">
//             <CardHeader title={`${phaseTitle} (${dayRange})`} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />
//             <CardContent>
//                 {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box> : (
//                     <TableContainer>
//                         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                             <TableHead sx={tableHeaderStyles}>
//                                 <TableRow><TableCell>Sr. No.</TableCell><TableCell>Parameters</TableCell><TableCell align="center">Actions</TableCell></TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {phaseParameters.length > 0 ? phaseParameters.map((param, index) => (
//                                     <TableRow key={param.dp_id} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{index + 1}</TableCell>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{param.para_name}</TableCell>
//                                         <TableCell align="center"><Box display="flex" justifyContent="center" gap={0.5}><IconButton size="small" onClick={() => handleDeleteParameter(param)} disabled={isSubmitting}><DeleteIcon color="error" /></IconButton></Box></TableCell>
//                                     </TableRow>
//                                 )) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 )}
//             </CardContent>
//         </Card>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
//         const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
        
//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0, percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             if (totalApiScore > 0) {
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//                 percent4AEE = (totalApiScore / (12 * 40)) * 100;
//             }
//         }
        
//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         const analysisCardHeader = (title) => <CardHeader title={title} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />;
//         const textFieldStyles = { '& .MuiInput-underline:before, & .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '4px' } };

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 2, color: "#8C257C", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} lg={6}><Card sx={{ height: '100%' }}>{analysisCardHeader("Phase-wise Performance")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>Phase</TableCell><TableCell align="right">Line Manager</TableCell><TableCell align="right">Head</TableCell><TableCell align="right">HR</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
//                             <TableBody>{phaseKeys.map((phase, index) => {
//                                 const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0, head = phaseWiseData?.[`phase${index + 1}_head`] || 0, hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
//                                 return (<TableRow key={phase} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
//                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                     <TableCell align="right">{lm.toFixed(1)}</TableCell><TableCell align="right">{head.toFixed(1)}</TableCell><TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                     <TableCell align="right" sx={{ fontWeight: "bold" }}>{(lm + head + hr).toFixed(1)}</TableCell></TableRow>);
//                             })}</TableBody>
//                             <TableFooter><TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell></TableRow></TableFooter>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KPI")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KPI</TableCell><TableCell align="center">Target</TableCell><TableCell align="center">Ach</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
//                             <TableBody>{kpiData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} /></TableCell>
//                             </TableRow>))}</TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KRA")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KRA</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
//                             <TableBody>{kraData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} /></TableCell>
//                             </TableRow>))}</TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Final Score")}
//                         <CardContent><TableContainer><Table><TableHead sx={tableHeaderStyles}><TableRow><TableCell>4AEE Program</TableCell><TableCell>% Ach</TableCell><TableCell>KRA/KPI</TableCell><TableCell>% Ach</TableCell><TableCell>Total</TableCell><TableCell>% Ach</TableCell></TableRow></TableHead>
//                             <TableBody><TableRow sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
//                                 <TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                             </TableRow></TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Overall Comments")}
//                         <CardContent><Grid container spacing={2}>
//                             <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                             <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                             <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                         </Grid></CardContent></Card>
//                     </Grid>
//                 </Grid>
//             </Box>
//         );
//     };

//     return (
//         <Container maxWidth="xl" sx={{ py: 3 }}>
//             <Box component={Paper} p={3}>
//                 <Typography variant="h4" fontWeight="bold" sx={{ color: '#8C257C', mb: 5 }}>
//                     Confirmation Form
//                 </Typography>

//                 {!viewingDesignation ? (
//                     <Box>
//                         {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>
//                         : error ? <Alert severity="error">{error}</Alert>
//                         : ( <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 2, mt: 3 }}>
//                             <Autocomplete fullWidth options={designations} getOptionLabel={(option) => option.name || ""} value={selectedDesignation} onChange={(event, newValue) => setSelectedDesignation(newValue)}
//                                 renderInput={(params) => <TextField {...params} label="Search and Select Designation" variant="outlined" InputProps={{ ...params.InputProps, startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }} />}
//                             />
//                             <Button variant="contained" onClick={handleViewDetailsClick} disabled={!selectedDesignation} sx={{ ...primaryButtonStyles, height: '56px', whiteSpace: 'nowrap', width: isMobile ? '100%' : 'auto' }}>
//                                 View Details
//                             </Button>
//                         </Box> )}
//                     </Box>
//                 ) : (
//                     <Box sx={{ mt: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2, flexWrap: 'wrap', gap: 1 }}>
//                             <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick} sx={{ color: '#8C257C' }}><ArrowBackIcon /></IconButton></Tooltip>
//                             <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: '#8C257C' }}>4AEE Review: {viewingDesignation.name}</Typography>
//                             {activeTab < 4 && <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenSelectDialog} sx={primaryButtonStyles}>Select Parameter</Button>}
//                         </Box>
//                         <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered TabIndicatorProps={{ sx: { backgroundColor: '#8C257C' } }} sx={{ '& .Mui-selected': { color: '#8C257C !important', fontWeight: 'bold' } }}>
//                             <Tab label="Phase 1: Align" id="tab-0" /><Tab label="Phase 2: Accelerate" id="tab-1" />
//                             <Tab label="Phase 3: Achieve" id="tab-2" /><Tab label="Phase 4: Aspire" id="tab-3" /><Tab label="Overall Analysis" id="tab-4" />
//                         </Tabs>
//                         <TabPanel value={activeTab} index={0}>{renderPhaseTable("Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                         <TabPanel value={activeTab} index={1}>{renderPhaseTable("Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                         <TabPanel value={activeTab} index={2}>{renderPhaseTable("Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                         <TabPanel value={activeTab} index={3}>{renderPhaseTable("Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                         <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
                   
//                         {activeTab === 4 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                                 <Button variant="contained" size="large" startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} onClick={handleSaveForm} disabled={isSaving || !isDirty} sx={primaryButtonStyles}>
//                                     {isSaving ? 'Saving...' : 'Save Form'}
//                                 </Button>
//                             </Box>
//                         )}
//                     </Box>
//                 )}
//             </Box>

//             <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                 <DialogContent dividers>
//                     <FormControl component="fieldset" variant="standard">
//                         {parameterLibrary.length > 0 ? parameterLibrary.map(param => (
//                             <FormControlLabel key={param.parameter_id} disabled={allDesignationParameters.some(p => p.parameter_id === param.parameter_id)}
//                                 control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} sx={{ '&.Mui-checked': { color: '#8C257C' } }}/>}
//                                 label={param.para_name}
//                             />
//                         )) : <Typography sx={{ p: 2 }}>Parameter library is empty or failed to load.</Typography>}
//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }} sx={{ color: '#757575' }}>Cancel</Button>
//                     <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting} sx={primaryButtonStyles}>
//                         {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Add Selected'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>{snackbar.message}</Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;





// import React, { useState, useEffect } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, Visibility as ViewIcon } from "@mui/icons-material";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: { xs: 1, sm: 3 }, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const navigate = useNavigate();

//     const [designations, setDesignations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [viewingDesignation, setViewingDesignation] = useState(null);
//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [allDesignationParameters, setAllDesignationParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [isDirty, setIsDirty] = useState(false);

//     const [overallComments, setOverallComments] = useState({ lineManager: "", head: "", hr: "" });
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

//     const primaryButtonStyles = {
//         backgroundColor: '#8C257C',
//         color: 'white',
//         '&:hover': { backgroundColor: '#6d1d60' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     const tableHeaderStyles = {
//         backgroundColor: '#8C257C',
//         '& .MuiTableCell-head': {
//             color: 'white',
//             fontWeight: 'bold',
//         }
//     };

//     useEffect(() => {
//         const fetchDesignations = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", {
//                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` }
//                 });
//                 const formattedData = response.data.map(d => ({ id: d.designation_id, name: d.designation_name, ...d }));
//                 setDesignations(formattedData);
//             } catch (err) {
//                 setError("Failed to fetch designations. Please try again later.");
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignations();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             Swal.fire({ icon: 'error', title: 'Authentication Error', text: 'Token not found. Please log in again.', timer: 3000, showConfirmButton: false });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     useEffect(() => {
//         const fetchPhaseParameters = async () => {
//             if (!viewingDesignation || activeTab > 3) return;
//             setDetailsLoading(true);
//             const headers = getAuthHeaders();
//             if (!headers) {
//                 setDetailsLoading(false);
//                 return;
//             }
//             const phase = activeTab + 1;
//             try {
//                 const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//                 setPhaseParameters(response.data.data || []);
//             } catch (error) {
//                 Swal.fire({ icon: 'error', title: 'Loading Error', text: 'Could not load parameters for this phase.', timer: 3000, showConfirmButton: false });
//             } finally {
//                 setDetailsLoading(false);
//             }
//         };

//         if (viewingDesignation) {
//             fetchPhaseParameters();
//         }
//     }, [activeTab, viewingDesignation]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load parameter library.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         setIsSubmitting(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setIsSubmitting(false); return; }
        
//         const requests = selectedLibraryParameters.map(paramId => axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", {
//             parameter_id: paramId,
//             designation_id: viewingDesignation.id,
//             phase: activeTab + 1,
//             created_by: 1
//         }, { headers }));

//         try {
//             await Promise.all(requests);
//             await Swal.fire({ title: 'Success!', text: 'Parameters added successfully.', icon: 'success', timer: 3000, showConfirmButton: false });
//             // Re-fetch parameters for the current phase after adding new ones
//             const phase = activeTab + 1;
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);
            
//             const newlyAddedParams = selectedLibraryParameters.map(paramId => {
//                  const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
//                  return { parameter_id: paramId, para_name: paramDetails ? paramDetails.para_name : "..." };
//             });
//             setAllDesignationParameters(prev => [...prev, ...newlyAddedParams]);
//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//         } catch (error) {
//             Swal.fire({ title: 'Error!', text: `Could not save parameters. ${error.response?.data?.message || ""}`, icon: 'error' });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: `This action cannot be undone!`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (!result.isConfirmed) return;
       
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${parameterToDelete.dp_id}/`, { headers });
//             Swal.fire({ title: 'Deleted!', text: 'The parameter has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
//             setPhaseParameters(prev => prev.filter(p => p.dp_id !== parameterToDelete.dp_id));
//         } catch (error) {
//             Swal.fire({ title: 'Error!', text: 'Could not delete the parameter.', icon: 'error' });
//         }
//     };

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//         setIsDirty(true);
//     };
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//         setIsDirty(true);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//         setIsDirty(true);
//     };

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//         setIsDirty(false);
//     };

//     const handleSaveForm = async () => {
//         if (activeTab !== 4) return;
//         const headers = getAuthHeaders();
//         if (!headers) return;

//         try {
//             const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
//             const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((s, r) => s + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
   
//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 if (totalApiScore > 0) {
//                     value4AEE = (totalApiScore / (12 * 40)) * 10;
//                 }
//             }
   
//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: 12, emp_id: viewingDesignation.id, performance_analysis: [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ') || "No comments.",
//                 kra_kpi_total: kpiKraAverage, average: finalAverage, percent_achievement: achievementPercentage,
//                 comment_by_lm: overallComments.lineManager || "N/A", comment_by_hr: overallComments.hr || "N/A", comment_by_head: overallComments.head || "N/A"
//             };

//             await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Overall analysis saved successfully!', timer: 3000, showConfirmButton: false });
//             setIsDirty(false);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Save Error', text: error.response?.data?.message || "An error occurred while saving.", timer: 3000, showConfirmButton: false });
//         }
//     };
    
//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         setSelectedLibraryParameters(prev => checked ? [...prev, parseInt(value, 10)] : prev.filter(id => id !== parseInt(value, 10)));
//     };

//     const handleViewDetailsClick = async (designation) => {
//         if (!designation) return;
//         setViewingDesignation(designation);
//         setActiveTab(0);
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         try {
//             const responses = await Promise.all([1, 2, 3, 4].map(phase =>
//                 axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${designation.id}`, { headers })
//             ));
//             setAllDesignationParameters(responses.flatMap(res => res.data.data || []));
//             setPhaseParameters(responses[0].data.data || []);
//             setIsDirty(false);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Data Load Error', text: 'Could not load complete parameter data.', timer: 3000, showConfirmButton: false });
//         } finally {
//             setDetailsLoading(false);
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setIsDirty(false);
//     };

//     const renderPhaseTable = (phaseTitle, dayRange) => (
//         <Card variant="outlined">
//             <CardHeader title={`${phaseTitle} (${dayRange})`} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />
//             <CardContent>
//                 {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box> : (
//                     <TableContainer>
//                         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                             <TableHead sx={tableHeaderStyles}>
//                                 <TableRow><TableCell>Sr. No.</TableCell><TableCell>Parameters</TableCell><TableCell align="center">Actions</TableCell></TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {phaseParameters.length > 0 ? phaseParameters.map((param, index) => (
//                                     <TableRow key={param.dp_id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{index + 1}</TableCell>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{param.para_name}</TableCell>
//                                         <TableCell align="center"><Box display="flex" justifyContent="center" gap={0.5}><IconButton size="small" onClick={() => handleDeleteParameter(param)} disabled={isSubmitting}><DeleteIcon color="error" /></IconButton></Box></TableCell>
//                                     </TableRow>
//                                 )) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 )}
//             </CardContent>
//         </Card>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
//         const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
        
//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0, percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             if (totalApiScore > 0) {
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//                 percent4AEE = (totalApiScore / (12 * 40)) * 100;
//             }
//         }
        
//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         const analysisCardHeader = (title) => <CardHeader title={title} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />;
//         const textFieldStyles = { '& .MuiInput-underline:before, & .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '4px' } };

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 2, color: "#8C257C", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} lg={6}><Card sx={{ height: '100%' }}>{analysisCardHeader("Phase-wise Performance")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>Phase</TableCell><TableCell align="right">Line Manager</TableCell><TableCell align="right">Head</TableCell><TableCell align="right">HR</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
//                             <TableBody>{phaseKeys.map((phase, index) => {
//                                 const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0, head = phaseWiseData?.[`phase${index + 1}_head`] || 0, hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
//                                 return (<TableRow key={phase} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                     <TableCell align="right">{lm.toFixed(1)}</TableCell><TableCell align="right">{head.toFixed(1)}</TableCell><TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                     <TableCell align="right" sx={{ fontWeight: "bold" }}>{(lm + head + hr).toFixed(1)}</TableCell></TableRow>);
//                             })}
//                             <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell></TableRow>
//                             </TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KPI")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KPI</TableCell><TableCell align="center">Target</TableCell><TableCell align="center">Ach</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
//                             <TableBody>{kpiData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} /></TableCell>
//                             </TableRow>))}</TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KRA")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KRA</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
//                             <TableBody>{kraData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} /></TableCell>
//                             </TableRow>))}</TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Final Score")}
//                         <CardContent><TableContainer><Table><TableHead sx={tableHeaderStyles}><TableRow><TableCell>4AEE Program</TableCell><TableCell>% Ach</TableCell><TableCell>KRA/KPI</TableCell><TableCell>% Ach</TableCell><TableCell>Total</TableCell><TableCell>% Ach</TableCell></TableRow></TableHead>
//                             <TableBody><TableRow sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                 <TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                             </TableRow></TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Overall Comments")}
//                         <CardContent><Grid container spacing={2}>
//                             <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                             <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                             <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                         </Grid></CardContent></Card>
//                     </Grid>
//                 </Grid>
//             </Box>
//         );
//     };

//     return (
//         <Container maxWidth="xl" sx={{ py: 3 }}>
//             <Box component={Paper} p={3}>
//                 <Typography variant="h4" fontWeight="bold" sx={{ color: '#8C257C', mb: 5 }}>
//                     Confirmation Form
//                 </Typography>

//                 {!viewingDesignation ? (
//                     <Box>
//                         {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>
//                         : error ? <Alert severity="error">{error}</Alert>
//                         : (
//                             <TableContainer component={Paper}>
//                                 <Table>
//                                     <TableHead sx={tableHeaderStyles}>
//                                         <TableRow>
//                                             <TableCell>SR. NO.</TableCell>
//                                             <TableCell>DESIGNATION</TableCell>
//                                             <TableCell>DEPARTMENT NAME</TableCell>
//                                             <TableCell>PHASE 1</TableCell>
//                                             <TableCell>PHASE 2</TableCell>
//                                             <TableCell>PHASE 3</TableCell>
//                                             <TableCell>PHASE 4</TableCell>
//                                             <TableCell align="center">ACTION</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {designations.map((designation, index) => (
//                                             <TableRow key={designation.designation_id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                                 <TableCell>{index + 1}</TableCell>
//                                                 <TableCell>{designation.designation_name}</TableCell>
//                                                 <TableCell>{designation.department_name}</TableCell>
//                                                 <TableCell></TableCell>
//                                                 <TableCell></TableCell>
//                                                 <TableCell></TableCell>
//                                                 <TableCell></TableCell>
//                                                 <TableCell align="center">
//                                                     <IconButton onClick={() => handleViewDetailsClick(designation)} sx={{ color: '#8C257C' }}>
//                                                         <ViewIcon />
//                                                     </IconButton>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         )}
//                     </Box>
//                 ) : (
//                     <Box sx={{ mt: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2, flexWrap: 'wrap', gap: 1 }}>
//                             <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick} sx={{ color: '#8C257C' }}><ArrowBackIcon /></IconButton></Tooltip>
//                             <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: '#8C257C' }}>4AEE Review: {viewingDesignation.name}</Typography>
//                             {activeTab < 4 && <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenSelectDialog} sx={primaryButtonStyles}>Select Parameter</Button>}
//                         </Box>
//                         <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered TabIndicatorProps={{ sx: { backgroundColor: '#8C257C' } }} sx={{ '& .Mui-selected': { color: '#8C257C !important', fontWeight: 'bold' } }}>
//                             <Tab label="Phase 1: Align" id="tab-0" /><Tab label="Phase 2: Accelerate" id="tab-1" />
//                             <Tab label="Phase 3: Achieve" id="tab-2" /><Tab label="Phase 4: Aspire" id="tab-3" />
//                             {/* <Tab label="Overall Analysis" id="tab-4" /> */}
//                         </Tabs>
//                         <TabPanel value={activeTab} index={0}>{renderPhaseTable("Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                         <TabPanel value={activeTab} index={1}>{renderPhaseTable("Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                         <TabPanel value={activeTab} index={2}>{renderPhaseTable("Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                         <TabPanel value={activeTab} index={3}>{renderPhaseTable("Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                         <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
                   
//                         {activeTab === 4 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                                 <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={handleSaveForm} disabled={!isDirty} sx={primaryButtonStyles}>
//                                     Save Form
//                                 </Button>
//                             </Box>
//                         )}
//                     </Box>
//                 )}
//             </Box>

//             <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                 <DialogContent dividers>
//                     <FormControl component="fieldset" variant="standard">
//                         {parameterLibrary.length > 0 ? parameterLibrary.map(param => (
//                             <FormControlLabel key={param.parameter_id} disabled={allDesignationParameters.some(p => p.parameter_id === param.parameter_id)}
//                                 control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} sx={{ '&.Mui-checked': { color: '#8C257C' } }}/>}
//                                 label={param.para_name}
//                             />
//                         )) : <Typography sx={{ p: 2 }}>Parameter library is empty or failed to load.</Typography>}
//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }} sx={{ color: '#757575' }}>Cancel</Button>
//                     <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting} sx={primaryButtonStyles}>
//                         {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Add Selected'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>{snackbar.message}</Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;







// import React, { useState, useEffect } from "react";
// import {
//     Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
//     TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
//     DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField
// } from "@mui/material";
// import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, Visibility as ViewIcon } from "@mui/icons-material";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

// function TabPanel({ children, value, index, ...other }) {
//     return (
//         <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: { xs: 1, sm: 3 }, mt: 2 }}>{children}</Box>}
//         </div>
//     );
// }

// const CombinedConfirmationPage = () => {
//     const navigate = useNavigate();

//     const [designations, setDesignations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [viewingDesignation, setViewingDesignation] = useState(null);
//     const [activeTab, setActiveTab] = useState(0);
//     const [phaseParameters, setPhaseParameters] = useState([]);
//     const [allDesignationParameters, setAllDesignationParameters] = useState([]);
//     const [detailsLoading, setDetailsLoading] = useState(true);
//     const [parameterLibrary, setParameterLibrary] = useState([]);
//     const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [isDirty, setIsDirty] = useState(false);

//     const [overallComments, setOverallComments] = useState({ lineManager: "", head: "", hr: "" });
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

//     const primaryButtonStyles = {
//         backgroundColor: '#8C257C',
//         color: 'white',
//         '&:hover': { backgroundColor: '#6d1d60' },
//         '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//     };

//     const tableHeaderStyles = {
//         backgroundColor: '#8C257C',
//         '& .MuiTableCell-head': {
//             color: 'white',
//             fontWeight: 'bold',
//         }
//     };

//     useEffect(() => {
//         const fetchDesignationsAndStatus = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const accessToken = localStorage.getItem('accessToken');
//                 if (!accessToken) {
//                     setError("Authentication Error: No access token found. Please log in.");
//                     setLoading(false);
//                     return;
//                 }
//                 const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };

//                 const [designationsResponse, phaseStatusResponse] = await Promise.all([
//                     axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", { headers }),
//                     axios.get("https://tdtlworld.com/hrms-backend/api/check_phasewise_parameters/", { headers })
//                 ]);

//                 const designationsData = designationsResponse.data;
//                 const phaseStatusData = phaseStatusResponse.data.data;

//                 const mergedData = designationsData.map(desig => {
//                     const status = phaseStatusData.find(s => s.designation_id === desig.designation_id);
//                     return {
//                         ...desig,
//                         id: desig.designation_id,
//                         name: desig.designation_name,
//                         phase1: status ? status.phase1 : 'No',
//                         phase2: status ? status.phase2 : 'No',
//                         phase3: status ? status.phase3 : 'No',
//                         phase4: status ? status.phase4 : 'No',
//                     };
//                 });

//                 setDesignations(mergedData);

//             } catch (err) {
//                 setError("Failed to fetch designations. Please try again later.");
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDesignationsAndStatus();
//     }, []);

//     const getAuthHeaders = () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             Swal.fire({ icon: 'error', title: 'Authentication Error', text: 'Token not found. Please log in again.', timer: 3000, showConfirmButton: false });
//             navigate('/login');
//             return null;
//         }
//         return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
//     };

//     useEffect(() => {
//         const fetchPhaseParameters = async () => {
//             if (!viewingDesignation || activeTab > 3) return;
//             setDetailsLoading(true);
//             const headers = getAuthHeaders();
//             if (!headers) {
//                 setDetailsLoading(false);
//                 return;
//             }
//             const phase = activeTab + 1;
//             try {
//                 const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//                 setPhaseParameters(response.data.data || []);
//             } catch (error) {
//                 Swal.fire({ icon: 'error', title: 'Loading Error', text: 'Could not load parameters for this phase.', timer: 3000, showConfirmButton: false });
//             } finally {
//                 setDetailsLoading(false);
//             }
//         };

//         if (viewingDesignation) {
//             fetchPhaseParameters();
//         }
//     }, [activeTab, viewingDesignation]);

//     const handleOpenSelectDialog = async () => {
//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//             setParameterLibrary(response.data || []);
//             setOpenSelectParameterDialog(true);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load parameter library.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleAddSelectedParameters = async () => {
//         setIsSubmitting(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setIsSubmitting(false); return; }

//         const requests = selectedLibraryParameters.map(paramId => axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", {
//             parameter_id: paramId,
//             designation_id: viewingDesignation.id,
//             phase: activeTab + 1,
//             created_by: 1
//         }, { headers }));

//         try {
//             await Promise.all(requests);
//             await Swal.fire({ title: 'Success!', text: 'Parameters added successfully.', icon: 'success', timer: 3000, showConfirmButton: false });
//             const phase = activeTab + 1;
//             const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
//             setPhaseParameters(response.data.data || []);

//             const newlyAddedParams = selectedLibraryParameters.map(paramId => {
//                 const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
//                 return { parameter_id: paramId, para_name: paramDetails ? paramDetails.para_name : "..." };
//             });
//             setAllDesignationParameters(prev => [...prev, ...newlyAddedParams]);
//             setOpenSelectParameterDialog(false);
//             setSelectedLibraryParameters([]);
//         } catch (error) {
//             Swal.fire({ title: 'Error!', text: `Could not save parameters. ${error.response?.data?.message || ""}`, icon: 'error' });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteParameter = async (parameterToDelete) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: `This action cannot be undone!`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (!result.isConfirmed) return;

//         const headers = getAuthHeaders();
//         if (!headers) return;
//         try {
//             await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${parameterToDelete.dp_id}/`, { headers });
//             Swal.fire({ title: 'Deleted!', text: 'The parameter has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
//             setPhaseParameters(prev => prev.filter(p => p.dp_id !== parameterToDelete.dp_id));

//             // Re-fetch the parameter library to ensure it's up-to-date
//             try {
//                 const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
//                 setParameterLibrary(response.data || []);
//             } catch (libraryError) {
//                 console.error("Failed to refresh parameter library after deletion:", libraryError);
//                 setSnackbar({ open: true, message: "Could not refresh parameter library.", severity: "warning" });
//             }

//         } catch (error) {
//             Swal.fire({ title: 'Error!', text: 'Could not delete the parameter.', icon: 'error' });
//         }
//     };

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//         setIsDirty(true);
//     };
//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//         setIsDirty(true);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//         setIsDirty(true);
//     };

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//         setIsDirty(false);
//     };

//     const handleSaveForm = async () => {
//         if (activeTab !== 4) return;
//         const headers = getAuthHeaders();
//         if (!headers) return;

//         try {
//             const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
//             const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((s, r) => s + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 if (totalApiScore > 0) {
//                     value4AEE = (totalApiScore / (12 * 40)) * 10;
//                 }
//             }

//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: 12, emp_id: viewingDesignation.id, performance_analysis: [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ') || "No comments.",
//                 kra_kpi_total: kpiKraAverage, average: finalAverage, percent_achievement: achievementPercentage,
//                 comment_by_lm: overallComments.lineManager || "N/A", comment_by_hr: overallComments.hr || "N/A", comment_by_head: overallComments.head || "N/A"
//             };

//             await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Overall analysis saved successfully!', timer: 3000, showConfirmButton: false });
//             setIsDirty(false);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Save Error', text: error.response?.data?.message || "An error occurred while saving.", timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleLibraryParameterSelect = (event) => {
//         const { value, checked } = event.target;
//         setSelectedLibraryParameters(prev => checked ? [...prev, parseInt(value, 10)] : prev.filter(id => id !== parseInt(value, 10)));
//     };

//     const handleViewDetailsClick = async (designation) => {
//         if (!designation) return;
//         setViewingDesignation(designation);
//         setActiveTab(0);
//         setDetailsLoading(true);
//         const headers = getAuthHeaders();
//         if (!headers) { setDetailsLoading(false); return; }
//         try {
//             const responses = await Promise.all([1, 2, 3, 4].map(phase =>
//                 axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${designation.id}`, { headers })
//             ));
//             setAllDesignationParameters(responses.flatMap(res => res.data.data || []));
//             setPhaseParameters(responses[0].data.data || []);
//             setIsDirty(false);
//         } catch (error) {
//             Swal.fire({ icon: 'error', title: 'Data Load Error', text: 'Could not load complete parameter data.', timer: 3000, showConfirmButton: false });
//         } finally {
//             setDetailsLoading(false);
//         }
//     };

//     const handleBackClick = () => {
//         setViewingDesignation(null);
//         setIsDirty(false);
//     };

//     const renderPhaseTable = (phaseTitle, dayRange) => (
//         <Card variant="outlined">
//             <CardHeader title={`${phaseTitle} (${dayRange})`} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />
//             <CardContent>
//                 {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box> : (
//                     <TableContainer>
//                         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                             <TableHead sx={tableHeaderStyles}>
//                                 <TableRow><TableCell>Sr. No.</TableCell><TableCell>Parameters</TableCell><TableCell align="center">Actions</TableCell></TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {phaseParameters.length > 0 ? phaseParameters.map((param, index) => (
//                                     <TableRow key={param.dp_id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{index + 1}</TableCell>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{param.para_name}</TableCell>
//                                         <TableCell align="center"><Box display="flex" justifyContent="center" gap={0.5}><IconButton size="small" onClick={() => handleDeleteParameter(param)} disabled={isSubmitting}><DeleteIcon color="error" /></IconButton></Box></TableCell>
//                                     </TableRow>
//                                 )) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 )}
//             </CardContent>
//         </Card>
//     );

//     const renderOverallAnalysis = () => {
//         const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
//         const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
//         const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
//         const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//         const totals = {
//             lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
//             head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
//             hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
//         };

//         let value4AEE = 0, percent4AEE = 0;
//         if (phaseWiseData) {
//             const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//             const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//             if (totalApiScore > 0) {
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//                 percent4AEE = (totalApiScore / (12 * 40)) * 100;
//             }
//         }

//         const valueKpiKra = parseFloat(kpiKraAverage);
//         const percentKpiKra = valueKpiKra * 10;
//         const totalValue = (value4AEE + valueKpiKra) / 2;
//         const percentTotal = totalValue * 10;

//         const analysisCardHeader = (title) => <CardHeader title={title} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />;
//         const textFieldStyles = { '& .MuiInput-underline:before, & .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '4px' } };

//         return (
//             <Box><Typography variant="h5" sx={{ mb: 2, color: "#8C257C", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} lg={6}><Card sx={{ height: '100%' }}>{analysisCardHeader("Phase-wise Performance")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>Phase</TableCell><TableCell align="right">Line Manager</TableCell><TableCell align="right">Head</TableCell><TableCell align="right">HR</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
//                             <TableBody>{phaseKeys.map((phase, index) => {
//                                 const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0, head = phaseWiseData?.[`phase${index + 1}_head`] || 0, hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
//                                 return (<TableRow key={phase} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                     <TableCell align="right">{lm.toFixed(1)}</TableCell><TableCell align="right">{head.toFixed(1)}</TableCell><TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                     <TableCell align="right" sx={{ fontWeight: "bold" }}>{(lm + head + hr).toFixed(1)}</TableCell></TableRow>);
//                             })}
//                                 <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell></TableRow>
//                             </TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KPI")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KPI</TableCell><TableCell align="center">Target</TableCell><TableCell align="center">Ach</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
//                             <TableBody>{kpiData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} /></TableCell>
//                             </TableRow>))}</TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KRA")}
//                         <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KRA</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
//                             <TableBody>{kraData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell>
//                                 <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} /></TableCell>
//                             </TableRow>))}</TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Final Score")}
//                         <CardContent><TableContainer><Table><TableHead sx={tableHeaderStyles}><TableRow><TableCell>4AEE Program</TableCell><TableCell>% Ach</TableCell><TableCell>KRA/KPI</TableCell><TableCell>% Ach</TableCell><TableCell>Total</TableCell><TableCell>% Ach</TableCell></TableRow></TableHead>
//                             <TableBody><TableRow sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                 <TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                 <TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                 <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                             </TableRow></TableBody>
//                         </Table></TableContainer></CardContent></Card>
//                     </Grid>
//                     <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Overall Comments")}
//                         <CardContent><Grid container spacing={2}>
//                             <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
//                             <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
//                             <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
//                         </Grid></CardContent></Card>
//                     </Grid>
//                 </Grid>
//             </Box>
//         );
//     };

//     return (
//         <Container maxWidth="xl" sx={{ py: 3 }}>
//             <Box component={Paper} p={3}>
//                 <Typography variant="h4" fontWeight="bold" sx={{ color: '#8C257C', mb: 5 }}>
//                     Confirmation Form
//                 </Typography>

//                 {!viewingDesignation ? (
//                     <Box>
//                         {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>
//                             : error ? <Alert severity="error">{error}</Alert>
//                                 : (
//                                     <TableContainer component={Paper}>
//                                         <Table>
//                                             <TableHead sx={tableHeaderStyles}>
//                                                 <TableRow>
//                                                     <TableCell>SR. NO.</TableCell>
//                                                     <TableCell>DESIGNATION</TableCell>
//                                                     <TableCell>DEPARTMENT NAME</TableCell>
//                                                     <TableCell>PHASE 1</TableCell>
//                                                     <TableCell>PHASE 2</TableCell>
//                                                     <TableCell>PHASE 3</TableCell>
//                                                     <TableCell>PHASE 4</TableCell>
//                                                     <TableCell align="center">ACTION</TableCell>
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {designations.map((designation, index) => (
//                                                     <TableRow key={designation.designation_id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
//                                                         <TableCell>{index + 1}</TableCell>
//                                                         <TableCell>{designation.designation_name}</TableCell>
//                                                         <TableCell>{designation.department_name}</TableCell>
//                                                         <TableCell>{designation.phase1}</TableCell>
//                                                         <TableCell>{designation.phase2}</TableCell>
//                                                         <TableCell>{designation.phase3}</TableCell>
//                                                         <TableCell>{designation.phase4}</TableCell>
//                                                         <TableCell align="center">
//                                                             <IconButton onClick={() => handleViewDetailsClick(designation)} sx={{ color: '#8C257C' }}>
//                                                                 <ViewIcon />
//                                                             </IconButton>
//                                                         </TableCell>
//                                                     </TableRow>
//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                 )}
//                     </Box>
//                 ) : (
//                     <Box sx={{ mt: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2, flexWrap: 'wrap', gap: 1 }}>
//                             <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick} sx={{ color: '#8C257C' }}><ArrowBackIcon /></IconButton></Tooltip>
//                             <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: '#8C257C' }}>4AEE Review: {viewingDesignation.name}</Typography>
//                             {activeTab < 4 && <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenSelectDialog} sx={primaryButtonStyles}>Select Parameter</Button>}
//                         </Box>
//                         <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered TabIndicatorProps={{ sx: { backgroundColor: '#8C257C' } }} sx={{ '& .Mui-selected': { color: '#8C257C !important', fontWeight: 'bold' } }}>
//                             <Tab label="Phase 1: Align" id="tab-0" /><Tab label="Phase 2: Accelerate" id="tab-1" />
//                             <Tab label="Phase 3: Achieve" id="tab-2" /><Tab label="Phase 4: Aspire" id="tab-3" />
//                             {/* <Tab label="Overall Analysis" id="tab-4" /> */}
//                         </Tabs>
//                         <TabPanel value={activeTab} index={0}>{renderPhaseTable("Phase 1: Align", "Day 1 to 30")}</TabPanel>
//                         <TabPanel value={activeTab} index={1}>{renderPhaseTable("Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//                         <TabPanel value={activeTab} index={2}>{renderPhaseTable("Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//                         <TabPanel value={activeTab} index={3}>{renderPhaseTable("Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//                         <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>

//                         {activeTab === 4 && (
//                             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                                 <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={handleSaveForm} disabled={!isDirty} sx={primaryButtonStyles}>
//                                     Save Form
//                                 </Button>
//                             </Box>
//                         )}
//                     </Box>
//                 )}
//             </Box>

//             <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Select Parameters for Phase {activeTab + 1}</DialogTitle>
//                 <DialogContent dividers>
//                     <FormControl component="fieldset" variant="standard">
//                         {parameterLibrary.length > 0 ? parameterLibrary.map(param => (
//                             <FormControlLabel key={param.parameter_id} disabled={allDesignationParameters.some(p => p.parameter_id === param.parameter_id)}
//                                 control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} sx={{ '&.Mui-checked': { color: '#8C257C' } }} />}
//                                 label={param.para_name}
//                             />
//                         )) : <Typography sx={{ p: 2 }}>Parameter library is empty or failed to load.</Typography>}
//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }} sx={{ color: '#757575' }}>Cancel</Button>
//                     <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting} sx={primaryButtonStyles}>
//                         {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Add Selected'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>{snackbar.message}</Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default CombinedConfirmationPage;












import React, { useState, useEffect } from "react";
import {
    Container, Paper, Typography, Box, Tabs, Tab, Button, FormControl, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Grid, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, Checkbox, FormControlLabel, CardHeader, Tooltip, Snackbar, Alert, CircularProgress, TextField
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: { xs: 1, sm: 3 }, mt: 2 }}>{children}</Box>}
        </div>
    );
}

const CombinedConfirmationPage = () => {
    const navigate = useNavigate();

    const [designations, setDesignations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewingDesignation, setViewingDesignation] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [phaseParameters, setPhaseParameters] = useState([]);
    const [allDesignationParameters, setAllDesignationParameters] = useState([]);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [parameterLibrary, setParameterLibrary] = useState([]);
    const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [isDirty, setIsDirty] = useState(false);

    const [overallComments, setOverallComments] = useState({ lineManager: "", head: "", hr: "" });
    const [kpiData, setKpiData] = useState([
        { kpi: "A", target: 1, ach: 1, rating: 5 },
        { kpi: "B", target: 2, ach: 5, rating: 7 },
        { kpi: "C", target: 3, ach: 6, rating: 9 },
    ]);
    const [kraData, setKraData] = useState([
        { parameter: "HADC", totalRating: 10 },
        { parameter: "QCP", totalRating: 10 },
    ]);
    const [phaseWiseData, setPhaseWiseData] = useState(null);

    const primaryButtonStyles = {
        backgroundColor: '#8C257C',
        color: 'white',
        '&:hover': { backgroundColor: '#6d1d60' },
        '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
    };

    const tableHeaderStyles = {
        backgroundColor: '#8C257C',
        '& .MuiTableCell-head': {
            color: 'white',
            fontWeight: 'bold',
        }
    };

    useEffect(() => {
        const fetchDesignationsAndStatus = async () => {
            try {
                setLoading(true);
                setError(null);
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    setError("Authentication Error: No access token found. Please log in.");
                    setLoading(false);
                    return;
                }
                const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };

                const [designationsResponse, phaseStatusResponse] = await Promise.all([
                    axios.get("https://tdtlworld.com/hrms-backend/ci_designations/", { headers }),
                    axios.get("https://tdtlworld.com/hrms-backend/api/check_phasewise_parameters/", { headers })
                ]);

                const designationsData = designationsResponse.data;
                const phaseStatusData = phaseStatusResponse.data.data;

                const mergedData = designationsData.map(desig => {
                    const status = phaseStatusData.find(s => s.designation_id === desig.designation_id);
                    return {
                        ...desig,
                        id: desig.designation_id,
                        name: desig.designation_name,
                        phase1: status ? status.phase1 : 'No',
                        phase2: status ? status.phase2 : 'No',
                        phase3: status ? status.phase3 : 'No',
                        phase4: status ? status.phase4 : 'No',
                    };
                });

                setDesignations(mergedData);

            } catch (err) {
                setError("Failed to fetch designations. Please try again later.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDesignationsAndStatus();
    }, []);

    const getAuthHeaders = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            Swal.fire({ icon: 'error', title: 'Authentication Error', text: 'Token not found. Please log in again.', timer: 3000, showConfirmButton: false });
            navigate('/login');
            return null;
        }
        return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
    };

    useEffect(() => {
        const fetchPhaseParameters = async () => {
            if (!viewingDesignation || activeTab > 3) return;
            setDetailsLoading(true);
            const headers = getAuthHeaders();
            if (!headers) {
                setDetailsLoading(false);
                return;
            }
            const phase = activeTab + 1;
            try {
                const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
                setPhaseParameters(response.data.data || []);
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Loading Error', text: 'Could not load parameters for this phase.', timer: 3000, showConfirmButton: false });
            } finally {
                setDetailsLoading(false);
            }
        };

        if (viewingDesignation) {
            fetchPhaseParameters();
        }
    }, [activeTab, viewingDesignation]);

    const handleOpenSelectDialog = async () => {
        const headers = getAuthHeaders();
        if (!headers) return;
        try {
            const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
            setParameterLibrary(response.data || []);
            setOpenSelectParameterDialog(true);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Could not load parameter library.', timer: 3000, showConfirmButton: false });
        }
    };

    const handleAddSelectedParameters = async () => {
        setIsSubmitting(true);
        const headers = getAuthHeaders();
        if (!headers) { setIsSubmitting(false); return; }

        const requests = selectedLibraryParameters.map(paramId => axios.post("https://tdtlworld.com/hrms-backend/apis/save_Desigwise_parameters/", {
            parameter_id: paramId,
            designation_id: viewingDesignation.id,
            phase: activeTab + 1,
            created_by: 1
        }, { headers }));

        try {
            await Promise.all(requests);
            await Swal.fire({ title: 'Success!', text: 'Parameters added successfully.', icon: 'success', timer: 3000, showConfirmButton: false });
            const phase = activeTab + 1;
            const response = await axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${viewingDesignation.id}`, { headers });
            setPhaseParameters(response.data.data || []);

            const newlyAddedParams = selectedLibraryParameters.map(paramId => {
                const paramDetails = parameterLibrary.find(p => p.parameter_id === paramId);
                return { parameter_id: paramId, para_name: paramDetails ? paramDetails.para_name : "..." };
            });
            setAllDesignationParameters(prev => [...prev, ...newlyAddedParams]);
            setOpenSelectParameterDialog(false);
            setSelectedLibraryParameters([]);
        } catch (error) {
            Swal.fire({ title: 'Error!', text: `Could not save parameters. ${error.response?.data?.message || ""}`, icon: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteParameter = async (parameterToDelete) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        const headers = getAuthHeaders();
        if (!headers) return;
        try {
            await axios.delete(`https://tdtlworld.com/hrms-backend/apis/delete_desigwise_para/${parameterToDelete.dp_id}/`, { headers });
            Swal.fire({ title: 'Deleted!', text: 'The parameter has been deleted.', icon: 'success', timer: 3000, showConfirmButton: false });
            setPhaseParameters(prev => prev.filter(p => p.dp_id !== parameterToDelete.dp_id));
            
            try {
                const response = await axios.get("https://tdtlworld.com/hrms-backend/apis/confirmation_parameter/", { headers });
                setParameterLibrary(response.data || []);
            } catch (libraryError) {
                console.error("Failed to refresh parameter library after deletion:", libraryError);
                setSnackbar({ open: true, message: "Could not refresh parameter library.", severity: "warning" });
            }

        } catch (error) {
            Swal.fire({ title: 'Error!', text: 'Could not delete the parameter.', icon: 'error' });
        }
    };

    const handleKpiChange = (index, field, value) => {
        const newData = [...kpiData];
        newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
        setKpiData(newData);
        setIsDirty(true);
    };
    const handleKraChange = (index, field, value) => {
        const newData = [...kraData];
        newData[index][field] = field === "totalRating" ? Number(value) : value;
        setKraData(newData);
        setIsDirty(true);
    };

    const handleOverallCommentChange = (rater, value) => {
        setOverallComments(prev => ({ ...prev, [rater]: value }));
        setIsDirty(true);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setIsDirty(false);
    };

    const handleSaveForm = async () => {
        if (activeTab !== 4) return;
        const headers = getAuthHeaders();
        if (!headers) return;

        try {
            const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
            const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
            const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
            const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((s, r) => s + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

            let value4AEE = 0;
            if (phaseWiseData) {
                const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
                const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
                if (totalApiScore > 0) {
                    value4AEE = (totalApiScore / (12 * 40)) * 10;
                }
            }

            const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
            const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

            const payload = {
                user_id: 12, emp_id: viewingDesignation.id, performance_analysis: [overallComments.lineManager, overallComments.head, overallComments.hr].filter(Boolean).join(' | ') || "No comments.",
                kra_kpi_total: kpiKraAverage, average: finalAverage, percent_achievement: achievementPercentage,
                comment_by_lm: overallComments.lineManager || "N/A", comment_by_hr: overallComments.hr || "N/A", comment_by_head: overallComments.head || "N/A"
            };

            await axios.post("https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/", payload, { headers });
            Swal.fire({ icon: 'success', title: 'Success', text: 'Overall analysis saved successfully!', timer: 3000, showConfirmButton: false });
            setIsDirty(false);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Save Error', text: error.response?.data?.message || "An error occurred while saving.", timer: 3000, showConfirmButton: false });
        }
    };

    const handleLibraryParameterSelect = (event) => {
        const { value, checked } = event.target;
        setSelectedLibraryParameters(prev => checked ? [...prev, parseInt(value, 10)] : prev.filter(id => id !== parseInt(value, 10)));
    };

    const handleViewDetailsClick = async (designation) => {
        if (!designation) return;
        setViewingDesignation(designation);
        setActiveTab(0);
        setDetailsLoading(true);
        const headers = getAuthHeaders();
        if (!headers) { setDetailsLoading(false); return; }
        try {
            const responses = await Promise.all([1, 2, 3, 4].map(phase =>
                axios.get(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${designation.id}`, { headers })
            ));
            setAllDesignationParameters(responses.flatMap(res => res.data.data || []));
            setPhaseParameters(responses[0].data.data || []);
            setIsDirty(false);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Data Load Error', text: 'Could not load complete parameter data.', timer: 3000, showConfirmButton: false });
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleBackClick = () => {
        setViewingDesignation(null);
        setIsDirty(false);
    };

    const renderPhaseTable = (phaseTitle, dayRange) => (
        <Card variant="outlined">
            <CardHeader title={`${phaseTitle} (${dayRange})`} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />
            <CardContent>
                {detailsLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box> : (
                    <TableContainer>
                        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                            <TableHead sx={tableHeaderStyles}>
                                <TableRow><TableCell>Sr. No.</TableCell><TableCell>Parameters</TableCell><TableCell align="center">Actions</TableCell></TableRow>
                            </TableHead>
                            <TableBody>
                                {phaseParameters.length > 0 ? phaseParameters.map((param, index) => (
                                    <TableRow key={param.dp_id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                                        <TableCell sx={{ fontSize: '0.95rem' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: '0.95rem' }}>{param.para_name}</TableCell>
                                        <TableCell align="center"><Box display="flex" justifyContent="center" gap={0.5}><IconButton size="small" onClick={() => handleDeleteParameter(param)} disabled={isSubmitting}><DeleteIcon color="error" /></IconButton></Box></TableCell>
                                    </TableRow>
                                )) : (<TableRow><TableCell colSpan={3} align="center">No parameters defined for this phase.</TableCell></TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );

    const renderOverallAnalysis = () => {
        const kpiRatings = kpiData.map(item => Number(item.rating) || 0);
        const kraRatings = kraData.map(item => Number(item.totalRating) || 0);
        const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter(r => r > 0);
        const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

        const totals = {
            lm: (phaseWiseData?.phase1_lm || 0) + (phaseWiseData?.phase2_lm || 0) + (phaseWiseData?.phase3_lm || 0) + (phaseWiseData?.phase4_lm || 0),
            head: (phaseWiseData?.phase1_head || 0) + (phaseWiseData?.phase2_head || 0) + (phaseWiseData?.phase3_head || 0) + (phaseWiseData?.phase4_head || 0),
            hr: (phaseWiseData?.phase1_hr || 0) + (phaseWiseData?.phase2_hr || 0) + (phaseWiseData?.phase3_hr || 0) + (phaseWiseData?.phase4_hr || 0),
        };

        let value4AEE = 0, percent4AEE = 0;
        if (phaseWiseData) {
            const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
            const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
            if (totalApiScore > 0) {
                value4AEE = (totalApiScore / (12 * 40)) * 10;
                percent4AEE = (totalApiScore / (12 * 40)) * 100;
            }
        }

        const valueKpiKra = parseFloat(kpiKraAverage);
        const percentKpiKra = valueKpiKra * 10;
        const totalValue = (value4AEE + valueKpiKra) / 2;
        const percentTotal = totalValue * 10;

        const analysisCardHeader = (title) => <CardHeader title={title} titleTypographyProps={{ variant: 'h6', color: '#8C257C', fontWeight: 'bold' }} />;
        const textFieldStyles = { '& .MuiInput-underline:before, & .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '4px' } };

        return (
            <Box><Typography variant="h5" sx={{ mb: 2, color: "#8C257C", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}><Card sx={{ height: '100%' }}>{analysisCardHeader("Phase-wise Performance")}
                        <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>Phase</TableCell><TableCell align="right">Line Manager</TableCell><TableCell align="right">Head</TableCell><TableCell align="right">HR</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
                            <TableBody>{phaseKeys.map((phase, index) => {
                                const lm = phaseWiseData?.[`phase${index + 1}_lm`] || 0, head = phaseWiseData?.[`phase${index + 1}_head`] || 0, hr = phaseWiseData?.[`phase${index + 1}_hr`] || 0;
                                return (<TableRow key={phase} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                                    <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
                                    <TableCell align="right">{lm.toFixed(1)}</TableCell><TableCell align="right">{head.toFixed(1)}</TableCell><TableCell align="right">{hr.toFixed(1)}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>{(lm + head + hr).toFixed(1)}</TableCell></TableRow>);
                            })}
                                <TableRow sx={{ backgroundColor: 'rgba(0,0,0,0.04)' }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.lm.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.head.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{totals.hr.toFixed(1)}</TableCell><TableCell align="right" sx={{ fontWeight: "bold" }}>{(totals.lm + totals.head + totals.hr).toFixed(1)}</TableCell></TableRow>
                            </TableBody>
                        </Table></TableContainer></CardContent></Card>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KPI")}
                        <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KPI</TableCell><TableCell align="center">Target</TableCell><TableCell align="center">Ach</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
                            <TableBody>{kpiData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                                <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell>
                                <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} /></TableCell>
                                <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} /></TableCell>
                                <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} /></TableCell>
                            </TableRow>))}</TableBody>
                        </Table></TableContainer></CardContent></Card>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}><Card sx={{ height: "100%" }}>{analysisCardHeader("KRA")}
                        <CardContent><TableContainer><Table size="small"><TableHead sx={tableHeaderStyles}><TableRow><TableCell>KRA</TableCell><TableCell align="center">Rating</TableCell></TableRow></TableHead>
                            <TableBody>{kraData.map((row, index) => (<TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                                <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell>
                                <TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} /></TableCell>
                            </TableRow>))}</TableBody>
                        </Table></TableContainer></CardContent></Card>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Final Score")}
                        <CardContent><TableContainer><Table><TableHead sx={tableHeaderStyles}><TableRow><TableCell>4AEE Program</TableCell><TableCell>% Ach</TableCell><TableCell>KRA/KPI</TableCell><TableCell>% Ach</TableCell><TableCell>Total</TableCell><TableCell>% Ach</TableCell></TableRow></TableHead>
                            <TableBody><TableRow sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                                <TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell>
                                <TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
                            </TableRow></TableBody>
                        </Table></TableContainer></CardContent></Card>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined">{analysisCardHeader("Overall Comments")}
                        <CardContent><Grid container spacing={2}>
                            <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={overallComments.lineManager} onChange={(e) => handleOverallCommentChange("lineManager", e.target.value)} /></Grid>
                            <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={overallComments.head} onChange={(e) => handleOverallCommentChange("head", e.target.value)} /></Grid>
                            <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid>
                        </Grid></CardContent></Card>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box component={Paper} p={3}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#8C257C', mb: 5 }}>
                    Confirmation Form
                </Typography>

                {!viewingDesignation ? (
                    <Box>
                        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>
                            : error ? <Alert severity="error">{error}</Alert>
                                : (
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead sx={tableHeaderStyles}>
                                                <TableRow>
                                                    <TableCell>SR. NO.</TableCell>
                                                    <TableCell>DESIGNATION</TableCell>
                                                    <TableCell>DEPARTMENT NAME</TableCell>
                                                    <TableCell>PHASE 1</TableCell>
                                                    <TableCell>PHASE 2</TableCell>
                                                    <TableCell>PHASE 3</TableCell>
                                                    <TableCell>PHASE 4</TableCell>
                                                    <TableCell align="center">ACTION</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {designations.map((designation, index) => (
                                                    <TableRow key={designation.designation_id} sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{designation.designation_name}</TableCell>
                                                        <TableCell>{designation.department_name}</TableCell>
                                                        <TableCell>{designation.phase1}</TableCell>
                                                        <TableCell>{designation.phase2}</TableCell>
                                                        <TableCell>{designation.phase3}</TableCell>
                                                        <TableCell>{designation.phase4}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton onClick={() => handleViewDetailsClick(designation)} sx={{ color: '#8C257C' }}>
                                                                <ViewIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                    </Box>
                ) : (
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: 1, borderColor: 'divider', pb: 2, flexWrap: 'wrap', gap: 1 }}>
                            <Tooltip title="Go Back To Selection"><IconButton onClick={handleBackClick} sx={{ color: '#8C257C' }}><ArrowBackIcon /></IconButton></Tooltip>
                            <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: '#8C257C' }}>4AEE Review: {viewingDesignation.name}</Typography>
                            {activeTab < 4 && <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenSelectDialog} sx={primaryButtonStyles}>Select Parameter</Button>}
                        </Box>
                        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" centered TabIndicatorProps={{ sx: { backgroundColor: '#8C257C' } }} sx={{ '& .Mui-selected': { color: '#8C257C !important', fontWeight: 'bold' } }}>
                            <Tab label="Phase 1: Align" id="tab-0" /><Tab label="Phase 2: Accelerate" id="tab-1" />
                            <Tab label="Phase 3: Achieve" id="tab-2" /><Tab label="Phase 4: Aspire" id="tab-3" />
                            {/* <Tab label="Overall Analysis" id="tab-4" /> */}
                        </Tabs>
                        <TabPanel value={activeTab} index={0}>{renderPhaseTable("Phase 1: Align", "Day 1 to 30")}</TabPanel>
                        <TabPanel value={activeTab} index={1}>{renderPhaseTable("Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
                        <TabPanel value={activeTab} index={2}>{renderPhaseTable("Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
                        <TabPanel value={activeTab} index={3}>{renderPhaseTable("Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
                        <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>

                        {activeTab === 4 && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                                <Button variant="contained" size="large" startIcon={<SaveIcon />} onClick={handleSaveForm} disabled={!isDirty} sx={primaryButtonStyles}>
                                    Save Form
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>

            <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Select Parameters for Phase {activeTab + 1}</DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset" variant="standard">
                        {parameterLibrary.length > 0 ? parameterLibrary.map(param => (
                            <FormControlLabel key={param.parameter_id} 
                                disabled={phaseParameters.some(p => p.parameter_id === param.parameter_id)}
                                control={<Checkbox checked={selectedLibraryParameters.includes(param.parameter_id)} onChange={handleLibraryParameterSelect} value={param.parameter_id} sx={{ '&.Mui-checked': { color: '#8C257C' } }} />}
                                label={param.para_name}
                            />
                        )) : <Typography sx={{ p: 2 }}>Parameter library is empty or failed to load.</Typography>}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]); }} sx={{ color: '#757575' }}>Cancel</Button>
                    <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0 || isSubmitting} sx={primaryButtonStyles}>
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Add Selected'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
};

export default CombinedConfirmationPage;