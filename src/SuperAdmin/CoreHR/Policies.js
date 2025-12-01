// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   Select, MenuItem, FormControl, InputLabel, CircularProgress, List, ListItem, ListItemText, useTheme, useMediaQuery,
//   // --- ADDITION: Import Snackbar and Alert for pop-ups ---
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Add, Edit, Delete } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct

// // Base URL for accessing the PDF files from the backend
// const PDF_BASE_URL = "https://tdtlworld.com/hrms-backend//media/policies/";

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedPolicy, setSelectedPolicy] = useState(null);
//   const [ackDialogOpen, setAckDialogOpen] = useState(false);
//   const [acknowledges, setAcknowledges] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [policyFileUrl, setPolicyFileUrl] = useState(null);
//   const [isFileLoading, setIsFileLoading] = useState(false);

//   // --- ADDITION: State for the notification pop-up (Snackbar) ---
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success", // can be 'success', 'error', 'warning', 'info'
//   });

//   // --- API Integration ---
//   useEffect(() => {
//     let objectUrl;

//     const fetchPolicyFile = async () => {
//       if (!selectedPolicy?.attachment?.file_name) {
//         setPolicyFileUrl(null);
//         return;
//       }

//       setIsFileLoading(true);
//       setPolicyFileUrl(null);

//       try {
//         const fileName = selectedPolicy.attachment.file_name;
//         const fileUrlPath = `media/policies/${encodeURIComponent(fileName)}`;

//         const response = await axiosInstance.get(fileUrlPath, {
//           responseType: "blob",
//         });

//         const blob = new Blob([response.data], { type: response.headers['content-type'] });
//         objectUrl = URL.createObjectURL(blob);
//         setPolicyFileUrl(objectUrl);

//       } catch (err) {
//         console.error("Policy file fetch failed:", err);
//         setPolicyFileUrl(null);
//       } finally {
//         setIsFileLoading(false);
//       }
//     };

//     fetchPolicyFile();

//     return () => {
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl);
//       }
//     };
//   }, [selectedPolicy]);


//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");

//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);

//       setPolicies(fetchedPolicies);
//       if (fetchedPolicies && fetchedPolicies.length > 0) {
//         setSelectedPolicy(fetchedPolicies[0]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       alert("Please fill in the required Title and Description fields.");
//       return;
//     }
//     if (!editId && !formValues.attachment) {
//       alert("Please choose a file attachment for the new policy.");
//       return;
//     }

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2);

//     if (formValues.attachment && formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         // --- ADDITION: Show success pop-up for editing ---
//         showSnackbar("Policy updated successfully!", "success");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         // --- ADDITION: Show success pop-up for adding ---
//         showSnackbar("New policy added successfully!", "success");
//       }
//       setOpenForm(false);
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       // --- ADDITION: Show error pop-up ---
//       showSnackbar("Failed to save policy. Please try again.", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (policyId) => {
//     if (window.confirm("Are you sure you want to delete this policy?")) {
//       try {
//         await axiosInstance.delete(`/policies/${policyId}/`);
//         fetchPolicies();
//         // --- ADDITION: Show success pop-up for deleting ---
//         showSnackbar("Policy deleted successfully!", "success");
//       } catch (error) {
//         console.error("Failed to delete policy:", error);
//         // --- ADDITION: Show error pop-up ---
//         showSnackbar("Failed to delete policy. Please try again.", "error");
//       }
//     }
//   };


//   const handleViewAcknowledges = async (policyId) => {
//     if (!policyId) return;
//     try {
//       const response = await axiosInstance.get(`/acknowledge_policy/${policyId}/`);
//       setAcknowledges(response.data.data || []);
//       setAckDialogOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch acknowledgements:", error);
//       setAcknowledges([]);
//       setAckDialogOpen(true);
//     }
//   };

//   // --- UI Handlers ---

//   // --- ADDITION: Handlers for the Snackbar pop-up ---
//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       setFormValues((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleDownload = () => {
//     if (!policyFileUrl || !selectedPolicy?.attachment?.file_name) {
//       console.error("No file URL or filename available for download.");
//       return;
//     }
//     const link = document.createElement('a');
//     link.href = policyFileUrl;
//     link.setAttribute('download', selectedPolicy.attachment.file_name);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handlePageChange = (_, value) => setPage(value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setPage(1);
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / rowsPerPage));
//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         flexDirection={isMobile ? "column" : "row"}
//         justifyContent={isMobile ? "flex-start" : "space-between"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         mb={2}
//         gap={isMobile ? 2 : 0}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
//         >
//           {viewMode ? "Policy Viewer" : "List All Policies"}
//         </Typography>

//         <Box display="flex" flexDirection="row" gap={1}>
//           <Button
//             variant="outlined"
//             onClick={() => setViewMode(!viewMode)}
//             sx={{
//               fontSize: "0.75rem",
//               padding: "4px 10px",
//               minWidth: "auto",
//               color: "#9c27b0",
//               borderColor: "#9c27b0",
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: "#f3e5f5", borderColor: "#7b1fa2" },
//             }}
//           >
//             {viewMode ? "Back to Table" : "View Policy"}
//           </Button>

//           {!viewMode && (
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={handleOpenForm}
//               sx={{
//                 fontSize: "0.75rem",
//                 padding: "4px 10px",
//                 minWidth: "auto",
//                 backgroundColor: "#9c27b0",
//                 color: "#fff",
//                 whiteSpace: "nowrap",
//                 "&:hover": { backgroundColor: "#7b1fa2" },
//               }}
//             >
//               Add New Policy
//             </Button>
//           )}
//         </Box>

//       </Box>
//       {!viewMode ? (
//         <>
//           <Box
//             display="flex"
//             justifyContent="flex-start"
//             alignItems="center"
//             mb={2}
//             gap={2}
//           >
//             <FormControl size="small" sx={{ minWidth: 80 }}>
//               <InputLabel>Show</InputLabel>
//               <Select
//                 value={rowsPerPage}
//                 onChange={handleRowsPerPageChange}
//                 label="Show"
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={15}>15</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               size="small"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', width: '80px' }}>SR.NO</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>TITLE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>CREATED AT</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center"><CircularProgress /></TableCell>
//                   </TableRow>
//                 ) : paginatedPolicies.length > 0 ? (
//                   paginatedPolicies.map((policy, index) => (
//                     <TableRow key={policy.policy_id}>
//                       <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{policy.title}</TableCell>
//                       <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                       <TableCell align="center">
//                         <Box display="flex" justifyContent="center" gap={1}>
//                           <IconButton onClick={() => handleEdit(policy)} sx={{ color: "#9c27b0" }}><Edit /></IconButton>
//                           <IconButton onClick={() => handleDelete(policy.policy_id)} sx={{ color: "#ef1000ff" }}><Delete /></IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No policies found.</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ mt: 2 }}>
//             {isMobile ? (
//               <>
//                 <Typography variant="body2" color="text.secondary" mb={1}>
//                   {filteredPolicies.length > 0
//                     ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                       page * rowsPerPage,
//                       filteredPolicies.length
//                     )} of ${filteredPolicies.length} records`
//                     : "No records found"}
//                 </Typography>

//                 <Typography
//                   component="div"
//                   variant="body2"
//                   align="center"
//                   sx={{ mb: 1 }}
//                 >
//                   Page {page} of {totalPages}
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 2,
//                   }}
//                 >
//                   <Button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1 || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       px: 2,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Previous
//                   </Button>

//                   <Button
//                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={page >= totalPages || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       px: 2,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary">
//                   {filteredPolicies.length > 0
//                     ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                       page * rowsPerPage,
//                       filteredPolicies.length
//                     )} of ${filteredPolicies.length} records`
//                     : "No records found"}
//                 </Typography>

//                 <Box>
//                   <Button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1 || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       mx: 0.5,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Previous
//                   </Button>

//                   <Typography component="span" mx={1} variant="body2">
//                     Page {page} of {totalPages}
//                   </Typography>

//                   <Button
//                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={page >= totalPages || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       mx: 0.5,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         </>
//       ) : (
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ maxHeight: { xs: '40vh', md: 600 }, overflowY: "auto", p: 1 }}>
//               <List>
//                 {policies.map((policy) => (
//                   <ListItem key={policy.policy_id} button selected={selectedPolicy?.policy_id === policy.policy_id} onClick={() => setSelectedPolicy(policy)}>
//                     <ListItemText primary={policy.title} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ height: { xs: '60vh', md: 600 }, p: 2, display: "flex", flexDirection: "column" }}>
//               {selectedPolicy ? (
//                 <>
//                   <Typography variant="h6" gutterBottom>{selectedPolicy.title}</Typography>
//                   <Box sx={{ flexGrow: 1, border: "1px solid #ccc", borderRadius: 1, overflow: "hidden", my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     {isFileLoading ? (
//                       <CircularProgress />
//                     ) : policyFileUrl ? (
//                       (() => {
//                         const fileName = selectedPolicy.attachment.file_name.toLowerCase();
//                         if (fileName.endsWith('.pdf')) {
//                           return <iframe title={selectedPolicy.title} src={`${policyFileUrl}#toolbar=0`} width="100%" height="100%" style={{ border: "none" }} />;
//                         } else if (/\.(png|jpg|jpeg|gif)$/.test(fileName)) {
//                           return <img src={policyFileUrl} alt={selectedPolicy.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />;
//                         } else {
//                           return <Typography p={2}>Preview not available. Please download the file to view.</Typography>;
//                         }
//                       })()
//                     ) : (
//                       <Typography p={2}>Could not load policy file.</Typography>
//                     )}
//                   </Box>
//                   {/* <Box display="flex" gap={1} mt={1}>
//                     <Button
//                       variant="contained"
//                       sx={{ alignSelf: "flex-start", backgroundColor: "#9c27b0", "&:hover": { backgroundColor: "#7b1fa2" } }}
//                       onClick={() => handleViewAcknowledges(selectedPolicy.policy_id)}
//                     >
//                       View Acknowledges
//                     </Button>
//                     <Button
//                       variant="contained"
//                       onClick={handleDownload}
//                       disabled={!policyFileUrl || isFileLoading}
//                       sx={{ alignSelf: "flex-start", backgroundColor: "#9c27b0", "&:hover": { backgroundColor: "#7b1fa2" } }}

//                     >
//                       Download Policy
//                     </Button>
//                   </Box> */}
//                   <Box display="flex" gap={1} mt={1}>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         alignSelf: "flex-start",
//                         backgroundColor: "#9c27b0",
//                         "&:hover": { backgroundColor: "#7b1fa2" },
//                         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" }, // text size
//                         px: { xs: 1.5, sm: 2, md: 3 }, // padding X
//                         py: { xs: 0.5, sm: 0.8, md: 1 }, // padding Y
//                         minWidth: { xs: "100px", sm: "120px", md: "150px" }, // width control
//                       }}
//                       onClick={() => handleViewAcknowledges(selectedPolicy.policy_id)}
//                     >
//                       View Acknowledges
//                     </Button>

//                     <Button
//                       variant="contained"
//                       onClick={handleDownload}
//                       disabled={!policyFileUrl || isFileLoading}
//                       sx={{
//                         alignSelf: "flex-start",
//                         backgroundColor: "#9c27b0",
//                         "&:hover": { backgroundColor: "#7b1fa2" },
//                         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
//                         px: { xs: 1.5, sm: 2, md: 3 },
//                         py: { xs: 0.5, sm: 0.8, md: 1 },
//                         minWidth: { xs: "100px", sm: "120px", md: "150px" },
//                       }}
//                     >
//                       Download Policy
//                     </Button>
//                   </Box>

//                 </>
//               ) : (
//                 <Typography>Select a policy to view.</Typography>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       )}

//       {/* Form Modal */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle> {editId ? "Edit Policy" : "Add New Policy"}  </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={2}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf,.doc,.docx,.png,.jpg" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span">Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2 }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : formValues.attachment?.file_name || "No file chosen"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#f44336", borderColor: "#f44336", border: "1px solid", "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: "#9c27b0", color: "white", "&:hover": { backgroundColor: "#7b1fa2" } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Acknowledge Dialog */}
//       <Dialog open={ackDialogOpen} onClose={() => setAckDialogOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           View All Acknowledge
//           <TextField size="small" placeholder="Search by Name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ ml: 2 }} />
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
//             <TableContainer component={Paper}>
//               <Table size="small" stickyHeader>
//                 <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableRow>
//                     <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
//                     <TableCell><strong>EMPLOYEE ID</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGED</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGE DATE</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).map((ack, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{ack.employee_name}</TableCell>
//                       <TableCell>{ack.emp_id}</TableCell>
//                       <TableCell>{ack.acknowledge}</TableCell>
//                       <TableCell>{ack.acknowledged_date}</TableCell>
//                     </TableRow>
//                   ))}
//                   {acknowledges.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={4} align="center">No acknowledgements found.</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAckDialogOpen(false)} variant="outlined" sx={{ borderColor: "red", color: "red", "&:hover": { backgroundColor: "#ffe6e6", borderColor: "darkred" } }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* --- ADDITION: Snackbar component for notifications --- */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000} // Hide after 6 seconds
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//           variant="filled" // Use filled variant for better visibility
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };









// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   Select, MenuItem, FormControl, InputLabel, CircularProgress, List, ListItem, ListItemText, useTheme, useMediaQuery,
//   Snackbar, Alert,
// } from "@mui/material";
// import { Add, Edit, Delete, Visibility } from "@mui/icons-material"; // Added Visibility icon
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// import Swal from 'sweetalert2';

// // Base URL for accessing the PDF files from the backend (if needed for direct links, but we'll fetch blobs)
// // const PDF_BASE_URL = "https://tdtlworld.com/hrms-backend//media/policies/"; // This is now less critical

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedPolicy, setSelectedPolicy] = useState(null); // Holds the currently selected policy for detailed viewing
//   const [ackDialogOpen, setAckDialogOpen] = useState(false);
//   const [acknowledges, setAcknowledges] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [policyFileUrl, setPolicyFileUrl] = useState(null); // URL for the currently viewed policy's file blob
//   const [isFileLoading, setIsFileLoading] = useState(false);

//   // const [snackbar, setSnackbar] = useState({
//   //   open: false,
//   //   message: "",
//   //   severity: "success",
//   // });

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- API Integration ---

//   // Fetches the policy list (without waiting for individual attachments)
// const fetchPolicies = async () => {
//   setLoading(true);
//   try {
//     const response = await axiosInstance.get("/policies/");
//     let fetchedPolicies = response.data.data || [];
//     fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//     setPolicies(fetchedPolicies);

//     // If in view mode, and no policy is selected, select the first one.
//     // Or if the previously selected policy is no longer in the list, clear it.
//     if (viewMode) {
//       if (!selectedPolicy && fetchedPolicies.length > 0) {
//         setSelectedPolicy(fetchedPolicies[0]);
//       } else if (
//         selectedPolicy &&
//         !fetchedPolicies.some((p) => p.policy_id === selectedPolicy.policy_id)
//       ) {
//         setSelectedPolicy(null);
//       }
//     } else {
//       setSelectedPolicy(null); // Clear selected policy if not in view mode
//     }
//   } catch (error) {
//     console.error("Failed to fetch policies:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Failed to Load",
//       text: "Could not fetch policies. Please try again later.",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchPolicies();
//   }, [viewMode]); // Re-fetch policies when view mode changes

//   // Effect to fetch the actual file when a policy is selected for viewing
//   useEffect(() => {
//     let objectUrl;

// const fetchPolicyFile = async () => {
//   // Clear previous file URL and loading state
//   setPolicyFileUrl(null);
//   setIsFileLoading(true);

//   if (
//     !selectedPolicy ||
//     !selectedPolicy.attachment ||
//     !selectedPolicy.attachment.file_name
//   ) {
//     setIsFileLoading(false);
//     return;
//   }

//   try {
//     const fileName = selectedPolicy.attachment.file_name;
//     // Assuming the backend endpoint for media is accessible this way.
//     // Adjust `media/policies/` if your backend serves files differently.
//     const fileUrlPath = `media/policies/${encodeURIComponent(fileName)}`;

//     const response = await axiosInstance.get(fileUrlPath, {
//       responseType: "blob", // Important for handling binary data
//     });

//     const blob = new Blob([response.data], {
//       type: response.headers["content-type"],
//     });
//     objectUrl = URL.createObjectURL(blob);
//     setPolicyFileUrl(objectUrl);
//   } catch (err) {
//     console.error("Policy file fetch failed:", err);
//     setPolicyFileUrl(null);
//     Swal.fire({
//       icon: "error",
//       title: "Failed to Load File",
//       text: "Could not load the policy file. Please try again later.",
//     });
//   } finally {
//     setIsFileLoading(false);
//   }
// };

//     if (viewMode && selectedPolicy) { // Only fetch if in view mode and a policy is selected
//       fetchPolicyFile();
//     } else {
//       setPolicyFileUrl(null); // Clear URL if no policy is selected or not in view mode
//     }

//     return () => {
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl); // Clean up the object URL to prevent memory leaks
//       }
//     };
//   }, [selectedPolicy, viewMode]); // Re-run when selectedPolicy or viewMode changes


// const handleSubmit = async () => {
//   if (!formValues.title || !formValues.description) {
//     Swal.fire({
//       icon: "warning",
//       title: "Missing Fields",
//       text: "Please fill in the required Title and Description fields.",
//     });
//     return;
//   }

//   if (!editId && !formValues.attachment) {
//     Swal.fire({
//       icon: "warning",
//       title: "File Required",
//       text: "Please choose a file attachment for the new policy.",
//     });
//     return;
//   }

//   setIsSubmitting(true);

//   const formData = new FormData();
//   formData.append("title", formValues.title);
//   formData.append("description", formValues.description);
//   formData.append("added_by", 2); // Assuming fixed value or from context

//   if (formValues.attachment && formValues.attachment instanceof File) {
//     formData.append("attachment", formValues.attachment);
//   } else if (
//     editId &&
//     formValues.attachment &&
//     formValues.attachment.file_name
//   ) {
//     // If editing with existing file info, do nothing
//   }

//   try {
//     if (editId) {
//       await axiosInstance.patch(`/policies/${editId}/`, formData);
//       Swal.fire({
//         icon: "success",
//         title: "Updated",
//         text: "Policy updated successfully!",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } else {
//       await axiosInstance.post("/policies/", formData);
//       Swal.fire({
//         icon: "success",
//         title: "Created",
//         text: "New policy added successfully!",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//     setOpenForm(false);
//     fetchPolicies(); // Refresh policies
//   } catch (error) {
//     console.error("Failed to save policy:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Save Failed",
//       text: "Failed to save policy. Please try again.",
//     });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleDelete = async (policyId) => {
//     Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#9c27b0",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!"
// }).then(async (result) => {
//   if (result.isConfirmed) {
//     try {
//       await axiosInstance.delete(`/policies/${policyId}/`);
//       fetchPolicies();
//       showSwal("success", "Deleted!", "Policy has been deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete policy:", error);
//       showSwal("error", "Error", "Failed to delete policy. Please try again.");
//     }
//   }
// });
//   };


// const handleViewAcknowledges = async (policyId) => {
//   if (!policyId) return;
//   try {
//     const response = await axiosInstance.get(`/acknowledge_policy/${policyId}/`);
//     setAcknowledges(response.data.data || []);
//     setAckDialogOpen(true);
//   } catch (error) {
//     console.error("Failed to fetch acknowledgements:", error);
//     setAcknowledges([]);
//     setAckDialogOpen(true); // Still open dialog, but show no data
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Failed to fetch acknowledgements.",
//     });
//   }
// };

//   const showSwal = (icon, title, text) => {
//   Swal.fire({
//     icon: icon,
//     title: title,
//     text: text,
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true,
//   });
// };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   const handleEdit = (policy) => {
//     // When editing, we don't need to re-fetch the attachment if it's already there.
//     // The form will display the existing file name if present.
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       // Pass the existing attachment object (which has file_name)
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       setFormValues((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

// const handleDownload = () => {
//   if (!policyFileUrl || !selectedPolicy?.attachment?.file_name) {
//     Swal.fire({
//       icon: "warning",
//       title: "No File Available",
//       text: "There is no file available for download.",
//     });
//     return;
//   }

//   const link = document.createElement("a");
//   link.href = policyFileUrl;
//   link.setAttribute("download", selectedPolicy.attachment.file_name);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);

//   Swal.fire({
//     icon: "success",
//     title: "Download Started",
//     text: `${selectedPolicy.attachment.file_name} is being downloaded.`,
//     timer: 2000,
//     showConfirmButton: false,
//   });
// };

//   const handlePageChange = (_, value) => setPage(value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setPage(1);
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / rowsPerPage));

//   const handleViewPolicy = (policy) => {
//     // Implement logic to view the policy details.
//     // For example, you could switch to view mode and select this policy.
//     setViewMode(true);
//     setSelectedPolicy(policy);
// };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         flexDirection={isMobile ? "column" : "row"}
//         justifyContent={isMobile ? "flex-start" : "space-between"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         mb={2}
//         gap={isMobile ? 2 : 0}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
//         >
//           {viewMode ? "Policy Viewer" : "List All Policies"}
//         </Typography>

//         <Box display="flex" flexDirection="row" gap={1}>
//           {/* <Button
//             variant="outlined"
//             onClick={() => {
//               setViewMode(!viewMode);
//               // When switching to view mode, select the first policy if available
//               if (!viewMode && policies.length > 0 && !selectedPolicy) {
//                 setSelectedPolicy(policies[0]);
//               } else if (viewMode) { // If switching back to table mode
//                 setSelectedPolicy(null); // Clear selected policy
//                 setPolicyFileUrl(null); // Clear the file preview
//               }
//             }}
//             sx={{
//               fontSize: "0.75rem",
//               padding: "4px 10px",
//               minWidth: "auto",
//               color: "#9c27b0",
//               borderColor: "#9c27b0",
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: "#f3e5f5", borderColor: "#7b1fa2" },
//             }}
//           >
//             {viewMode ? "Back to Table" : "View Policy"}
//           </Button> */}

//           {!viewMode && (
//             <Button
//               variant="contained"
//               startIcon={<Add />}
//               onClick={handleOpenForm}
//               sx={{
//                 fontSize: "0.75rem",
//                 padding: "4px 10px",
//                 minWidth: "auto",
//                 backgroundColor: "#9c27b0",
//                 color: "#fff",
//                 whiteSpace: "nowrap",
//                 "&:hover": { backgroundColor: "#7b1fa2" },
//               }}
//             >
//               Add New Policy
//             </Button>
//           )}
//         </Box>

//       </Box>
//       {!viewMode ? (
//         <>
//           <Box
//             display="flex"
//             justifyContent="flex-start"
//             alignItems="center"
//             mb={2}
//             gap={2}
//           >
//             <FormControl size="small" sx={{ minWidth: 80 }}>
//               <InputLabel>Show</InputLabel>
//               <Select
//                 value={rowsPerPage}
//                 onChange={handleRowsPerPageChange}
//                 label="Show"
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={15}>15</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               size="small"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', width: '80px' }}>SR.NO</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>TITLE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>CREATED AT</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center"><CircularProgress /></TableCell>
//                   </TableRow>
//                 ) : paginatedPolicies.length > 0 ? (
//                   paginatedPolicies.map((policy, index) => (
//                     <TableRow key={policy.policy_id}>
//                       <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{policy.title}</TableCell>
//                       <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                       <TableCell align="center">
//                         <Box display="flex" justifyContent="center" gap={1}>
//                           <IconButton onClick={() => handleViewPolicy(policy)} sx={{ color: "#1976d2" }}><Visibility /></IconButton> 
//                           <IconButton onClick={() => handleEdit(policy)} sx={{ color: "#9c27b0" }}><Edit /></IconButton>
//                           <IconButton onClick={() => handleDelete(policy.policy_id)} sx={{ color: "#ef1000ff" }}><Delete /></IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No policies found.</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ mt: 2 }}>
//             {isMobile ? (
//               <>
//                 <Typography variant="body2" color="text.secondary" mb={1}>
//                   {filteredPolicies.length > 0
//                     ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                       page * rowsPerPage,
//                       filteredPolicies.length
//                     )} of ${filteredPolicies.length} records`
//                     : "No records found"}
//                 </Typography>

//                 <Typography
//                   component="div"
//                   variant="body2"
//                   align="center"
//                   sx={{ mb: 1 }}
//                 >
//                   Page {page} of {totalPages}
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 2,
//                   }}
//                 >
//                   <Button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1 || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       px: 2,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Previous
//                   </Button>

//                   <Button
//                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={page >= totalPages || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       px: 2,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary">
//                   {filteredPolicies.length > 0
//                     ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                       page * rowsPerPage,
//                       filteredPolicies.length
//                     )} of ${filteredPolicies.length} records`
//                     : "No records found"}
//                 </Typography>

//                 <Box>
//                   <Button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1 || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       mx: 0.5,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Previous
//                   </Button>

//                   <Typography component="span" mx={1} variant="body2">
//                     Page {page} of {totalPages}
//                   </Typography>

//                   <Button
//                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={page >= totalPages || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       mx: 0.5,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         </>
//       ) : (
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ maxHeight: { xs: '40vh', md: 600 }, overflowY: "auto", p: 1 }}>
//               <List>
//                 {policies.length === 0 && !loading ? (
//                   <ListItem>
//                     <ListItemText primary="No policies available to view." />
//                   </ListItem>
//                 ) : loading ? (
//                   <Box display="flex" justifyContent="center" py={2}><CircularProgress size={20} /></Box>
//                 ) : (
//                   policies.map((policy) => (
//                     <ListItem
//                       key={policy.policy_id}
//                       button
//                       selected={selectedPolicy?.policy_id === policy.policy_id}
//                       onClick={() => setSelectedPolicy(policy)}
//                     >
//                       <ListItemText primary={policy.title} />
//                     </ListItem>
//                   ))
//                 )}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ height: { xs: '60vh', md: 600 }, p: 2, display: "flex", flexDirection: "column" }}>
//               {selectedPolicy ? (
//                 <>
//                   <Typography variant="h6" gutterBottom>{selectedPolicy.title}</Typography>
//                   <Box sx={{ flexGrow: 1, border: "1px solid #ccc", borderRadius: 1, overflow: "hidden", my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
//                     {isFileLoading ? (
//                       <CircularProgress />
//                     ) : policyFileUrl ? (
//                       (() => {
//                         const fileName = selectedPolicy.attachment?.file_name?.toLowerCase();
//                         if (fileName?.endsWith('.pdf')) {
//                           return <iframe title={selectedPolicy.title} src={`${policyFileUrl}#toolbar=0`} width="100%" height="100%" style={{ border: "none" }} />;
//                         } else if (/\.(png|jpg|jpeg|gif)$/.test(fileName)) {
//                           return <img src={policyFileUrl} alt={selectedPolicy.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />;
//                         } else {
//                           return <Typography p={2} color="text.secondary">Preview not available for this file type. Please download to view.</Typography>;
//                         }
//                       })()
//                     ) : (
//                       selectedPolicy.attachment ? (
//                         <Typography p={2} color="text.secondary">Could not load policy file for preview. It might be corrupted or the link is invalid.</Typography>
//                       ) : (
//                         <Typography p={2} color="text.secondary">No attachment for this policy.</Typography>
//                       )
//                     )}
//                   </Box>
//                   <Box display="flex" gap={1} mt={1}>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         alignSelf: "flex-start",
//                         backgroundColor: "#9c27b0",
//                         "&:hover": { backgroundColor: "#7b1fa2" },
//                         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
//                         px: { xs: 1.5, sm: 2, md: 3 },
//                         py: { xs: 0.5, sm: 0.8, md: 1 },
//                         minWidth: { xs: "100px", sm: "120px", md: "150px" },
//                       }}
//                       onClick={() => handleViewAcknowledges(selectedPolicy.policy_id)}
//                       disabled={!selectedPolicy.policy_id}
//                     >
//                       View Acknowledges
//                     </Button>

//                     <Button
//                       variant="contained"
//                       onClick={handleDownload}
//                       disabled={!policyFileUrl || isFileLoading || !selectedPolicy.attachment}
//                       sx={{
//                         alignSelf: "flex-start",
//                         backgroundColor: "#9c27b0",
//                         "&:hover": { backgroundColor: "#7b1fa2" },
//                         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
//                         px: { xs: 1.5, sm: 2, md: 3 },
//                         py: { xs: 0.5, sm: 0.8, md: 1 },
//                         minWidth: { xs: "100px", sm: "120px", md: "150px" },
//                       }}
//                     >
//                       Download Policy
//                     </Button>
//                   </Box>

//                 </>
//               ) : (
//                 <Typography p={2} color="text.secondary">Select a policy from the left to view its details and attachment.</Typography>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       )}

//       {/* Form Modal */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle> {editId ? "Edit Policy" : "Add New Policy"}  </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={2}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf,.doc,.docx,.png,.jpg,image/*" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span">Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2 }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#f44336", borderColor: "#f44336", border: "1px solid", "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: "#9c27b0", color: "white", "&:hover": { backgroundColor: "#7b1fa2" } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Acknowledge Dialog */}
//       <Dialog open={ackDialogOpen} onClose={() => setAckDialogOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           View All Acknowledge
//           <TextField size="small" placeholder="Search by Name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ ml: 2 }} />
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
//             <TableContainer component={Paper}>
//               <Table size="small" stickyHeader>
//                 <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableRow>
//                     <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
//                     <TableCell><strong>EMPLOYEE ID</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGED</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGE DATE</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).map((ack, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{ack.employee_name}</TableCell>
//                       <TableCell>{ack.emp_id}</TableCell>
//                       <TableCell>{ack.acknowledge ? "Yes" : "No"}</TableCell> {/* Assuming 'acknowledge' is boolean */}
//                       <TableCell>{ack.acknowledged_date}</TableCell>
//                     </TableRow>
//                   ))}
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={4} align="center">No acknowledgements found.</TableCell>
//                       </TableRow>
//                     )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAckDialogOpen(false)} variant="outlined" sx={{ borderColor: "red", color: "red", "&:hover": { backgroundColor: "#ffe6e6", borderColor: "darkred" } }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>


//     </Box>
//   );
// }














// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   Select, MenuItem, FormControl, InputLabel, CircularProgress, List, ListItem, ListItemText, useTheme, useMediaQuery,
//   Snackbar, Alert,
// } from "@mui/material";
// import { Add, Edit, Delete, Visibility, ArrowBack } from "@mui/icons-material"; // Added Visibility and ArrowBack icon
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// import Swal from 'sweetalert2';

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [viewMode, setViewMode] = useState(false); // Controls if the main view is table or single policy view
//   const [selectedPolicy, setSelectedPolicy] = useState(null); // Holds the currently selected policy for detailed viewing
//   const [ackDialogOpen, setAckDialogOpen] = useState(false);
//   const [acknowledges, setAcknowledges] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // For searching acknowledges
//   const [isSubmitting, setIsSubmitting] = useState(false); // For form submission loading state

//   const [policyFileUrl, setPolicyFileUrl] = useState(null); // URL for the currently viewed policy's file blob
//   const [isFileLoading, setIsFileLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Helper for SweetAlert2 notifications
//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   // Fetches the policy list
//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id); // Sort by newest first
//       setPolicies(fetchedPolicies);

//       // Important: If selectedPolicy exists and is no longer in fetchedPolicies (e.g., it was deleted),
//       // then clear selectedPolicy and switch back to table view.
//       if (selectedPolicy && !fetchedPolicies.some(p => p.policy_id === selectedPolicy.policy_id)) {
//         setSelectedPolicy(null);
//         setPolicyFileUrl(null);
//         setViewMode(false); // Go back to table view if the selected policy is gone
//       }
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch on component mount
//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // Effect to fetch the actual file when a policy is selected for viewing
//   useEffect(() => {
//     let objectUrl; // Declare here so it's accessible in cleanup

//     const fetchPolicyFile = async () => {
//       setPolicyFileUrl(null); // Clear previous URL
//       setIsFileLoading(true);

//       if (
//         !selectedPolicy ||
//         !selectedPolicy.attachment ||
//         !selectedPolicy.attachment.file_name
//       ) {
//         setIsFileLoading(false);
//         return; // No file to fetch
//       }

//       try {
//         const fileName = selectedPolicy.attachment.file_name;
//         // Construct the file path as expected by your backend
//         const fileUrlPath = `media/policies/${encodeURIComponent(fileName)}`;

//         const response = await axiosInstance.get(fileUrlPath, {
//           responseType: "blob", // Important for handling binary data
//         });

//         const blob = new Blob([response.data], {
//           type: response.headers["content-type"],
//         });
//         objectUrl = URL.createObjectURL(blob); // Create a blob URL
//         setPolicyFileUrl(objectUrl);
//       } catch (err) {
//         console.error("Policy file fetch failed:", err);
//         setPolicyFileUrl(null);
//         Swal.fire({
//           icon: "error",
//           title: "Failed to Load File",
//           text: "Could not load the policy file. It might be missing or there was a network error.",
//         });
//       } finally {
//         setIsFileLoading(false);
//       }
//     };

//     // Only fetch if in view mode and a policy is actually selected
//     if (viewMode && selectedPolicy) {
//       fetchPolicyFile();
//     } else {
//       // If not in view mode or no policy selected, ensure file URL is cleared
//       setPolicyFileUrl(null);
//       setIsFileLoading(false);
//     }

//     // Cleanup function for object URL
//     return () => {
//       if (objectUrl) {
//         URL.revokeObjectURL(objectUrl); // Revoke URL to prevent memory leaks
//       }
//     };
//   }, [selectedPolicy, viewMode]); // Re-run when selectedPolicy or viewMode changes

//   // Form Submission (Add/Edit)
//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill in the required Title and Description fields.",
//       });
//       return;
//     }

//     // For new policies, a file attachment is mandatory
//     if (!editId && !formValues.attachment) {
//       Swal.fire({
//         icon: "warning",
//         title: "File Required",
//         text: "Please choose a file attachment for the new policy.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2); // Assuming fixed value or from context

//     // Only append 'attachment' if it's a new File object
//     // This prevents sending the old attachment object back on edit if no new file was selected.
//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       setOpenForm(false);
//       fetchPolicies(); // Refresh policies list after save
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: "Failed to save policy. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete Policy
//   const handleDelete = async (policyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#9c27b0",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/policies/${policyId}/`);
//           fetchPolicies(); // Re-fetch policies to update list
//           showSwal("success", "Deleted!", "Policy has been deleted successfully!");
//           // The fetchPolicies useEffect will handle clearing selectedPolicy if it was the one deleted.
//         } catch (error) {
//           console.error("Failed to delete policy:", error);
//           showSwal("error", "Error", "Failed to delete policy. Please try again.");
//         }
//       }
//     });
//   };

//   // Fetch and display acknowledgements for a policy
//   const handleViewAcknowledges = async (policyId) => {
//     if (!policyId) return;
//     try {
//       const response = await axiosInstance.get(`/acknowledge_policy/${policyId}/`);
//       setAcknowledges(response.data.data || []);
//       setAckDialogOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch acknowledgements:", error);
//       setAcknowledges([]); // Clear previous acknowledges
//       setAckDialogOpen(true); // Still open dialog, but show no data message
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch acknowledgements. Please try again.",
//       });
//     }
//   };

//   // Open Add/Edit Form
//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   // Handle Edit Policy
//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       // When editing, pass the existing attachment object (which has file_name)
//       // This allows the UI to show the current file name without needing to re-download.
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   // Handle input changes in the form
//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       setFormValues((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle file download
//   const handleDownload = () => {
//     if (!policyFileUrl || !selectedPolicy?.attachment?.file_name) {
//       Swal.fire({
//         icon: "warning",
//         title: "No File Available",
//         text: "There is no file available for download for this policy.",
//       });
//       return;
//     }

//     const link = document.createElement("a");
//     link.href = policyFileUrl;
//     link.setAttribute("download", selectedPolicy.attachment.file_name);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     showSwal("success", "Download Started", `${selectedPolicy.attachment.file_name} is being downloaded.`);
//   };

//   // Pagination and Search Logic
//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / rowsPerPage));

//   const handlePageChange = (_, value) => setPage(value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setPage(1); // Reset to first page when rows per page changes
//   };

//   // This is the function called when the "Eye" icon is clicked
//   const handleViewPolicy = (policy) => {
//     setViewMode(true); // Switch to the single policy view
//     setSelectedPolicy(policy); // Set the policy to be displayed
//     // The useEffect will automatically fetch and display the file
//   };

//   // Function to go back to the policy list table
//   const handleBackToList = () => {
//     setViewMode(false); // Switch back to table view
//     setSelectedPolicy(null); // Clear the selected policy
//     setPolicyFileUrl(null); // Clear any loaded file preview
//   };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         flexDirection={isMobile ? "column" : "row"}
//         justifyContent={isMobile ? "flex-start" : "space-between"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         mb={2}
//         gap={isMobile ? 2 : 0}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
//         >
//           {viewMode ? (
//             <Box display="flex" alignItems="center" gap={1}>
//               <IconButton
//                 onClick={handleBackToList}
//                 sx={{
//                   color: "#9c27b0",
//                   "&:hover": { backgroundColor: "#f3e5f5" },
//                   p: 0.5, // Smaller padding for icon button
//                 }}
//               >
//                 <ArrowBack />
//               </IconButton>
//               Policy Viewer
//             </Box>
//           ) : (
//             "List All Policies"
//           )}
//         </Typography>

//         {!viewMode && ( // Only show "Add New Policy" button in table view
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               fontSize: "0.75rem",
//               padding: "4px 10px",
//               minWidth: "auto",
//               backgroundColor: "#9c27b0",
//               color: "#fff",
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: "#7b1fa2" },
//             }}
//           >
//             Add New Policy
//           </Button>
//         )}
//       </Box>

//       {/* Conditional Rendering: Table View vs. Single Policy View */}
//       {!viewMode ? (
//         <>
//           {/* Search and Rows Per Page Controls */}
//           <Box
//             display="flex"
//             justifyContent="flex-start"
//             alignItems="center"
//             mb={2}
//             gap={2}
//           >
//             <FormControl size="small" sx={{ minWidth: 80 }}>
//               <InputLabel>Show</InputLabel>
//               <Select
//                 value={rowsPerPage}
//                 onChange={handleRowsPerPageChange}
//                 label="Show"
//               >
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={15}>15</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               size="small"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {/* Policies Table */}
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', width: '80px' }}>SR.NO</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>TITLE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>CREATED AT</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center"><CircularProgress /></TableCell>
//                   </TableRow>
//                 ) : paginatedPolicies.length > 0 ? (
//                   paginatedPolicies.map((policy, index) => (
//                     <TableRow key={policy.policy_id}>
//                       <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{policy.title}</TableCell>
//                       <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                       <TableCell align="center">
//                         <Box display="flex" justifyContent="center" gap={1}>
//                           {/* Eye icon to view a specific policy */}
//                           <IconButton onClick={() => handleViewPolicy(policy)} sx={{ color: "#1976d2" }}><Visibility /></IconButton>
//                           <IconButton onClick={() => handleEdit(policy)} sx={{ color: "#9c27b0" }}><Edit /></IconButton>
//                           <IconButton onClick={() => handleDelete(policy.policy_id)} sx={{ color: "#ef1000ff" }}><Delete /></IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">No policies found.</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination Controls */}
//           <Box sx={{ mt: 2 }}>
//             {isMobile ? (
//               <>
//                 <Typography variant="body2" color="text.secondary" mb={1}>
//                   {filteredPolicies.length > 0
//                     ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                       page * rowsPerPage,
//                       filteredPolicies.length
//                     )} of ${filteredPolicies.length} records`
//                     : "No records found"}
//                 </Typography>

//                 <Typography
//                   component="div"
//                   variant="body2"
//                   align="center"
//                   sx={{ mb: 1 }}
//                 >
//                   Page {page} of {totalPages}
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 2,
//                   }}
//                 >
//                   <Button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1 || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       px: 2,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Previous
//                   </Button>

//                   <Button
//                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={page >= totalPages || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       px: 2,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary">
//                   {filteredPolicies.length > 0
//                     ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                       page * rowsPerPage,
//                       filteredPolicies.length
//                     )} of ${filteredPolicies.length} records`
//                     : "No records found"}
//                 </Typography>

//                 <Box>
//                   <Button
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1 || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       mx: 0.5,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Previous
//                   </Button>

//                   <Typography component="span" mx={1} variant="body2">
//                     Page {page} of {totalPages}
//                   </Typography>

//                   <Button
//                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={page >= totalPages || filteredPolicies.length === 0}
//                     size="small"
//                     sx={{
//                       mx: 0.5,
//                       color: "#fff",
//                       backgroundColor: "#9c27b0",
//                       "&:hover": { backgroundColor: "#7b1fa2" },
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         </>
//       ) : (
//         // Single Policy View Mode
//         <Grid container spacing={2}>
//           {/* Policy List on Left (Optional in this single-view approach, could remove if only one policy at a time) */}
//           {/* Keeping it for now as it was in your original code, but it makes more sense to show a single policy */}
//           {/* If you want to ONLY show the clicked policy and not a list, you'd remove this Grid item */}
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ maxHeight: { xs: '40vh', md: 600 }, overflowY: "auto", p: 1 }}>
//               <List>
//                 {policies.length === 0 && !loading ? (
//                   <ListItem>
//                     <ListItemText primary="No policies available to view." />
//                   </ListItem>
//                 ) : loading ? (
//                   <Box display="flex" justifyContent="center" py={2}><CircularProgress size={20} /></Box>
//                 ) : (
//                   policies.map((policy) => (
//                     <ListItem
//                       key={policy.policy_id}
//                       button
//                       // Ensure selected state is only for the actual selected policy
//                       selected={selectedPolicy?.policy_id === policy.policy_id}
//                       onClick={() => setSelectedPolicy(policy)} // Allows switching between policies if the list is visible
//                     >
//                       <ListItemText primary={policy.title} />
//                     </ListItem>
//                   ))
//                 )}
//               </List>
//             </Paper>
//           </Grid>

//           {/* Selected Policy Details and Viewer */}
//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ height: { xs: '60vh', md: 600 }, p: 2, display: "flex", flexDirection: "column" }}>
//               {selectedPolicy ? (
//                 <>
//                   <Typography variant="h6" gutterBottom>{selectedPolicy.title}</Typography>
//                   <Typography variant="body2" color="text.secondary" mb={2}>{selectedPolicy.description}</Typography>
//                   <Box sx={{ flexGrow: 1, border: "1px solid #ccc", borderRadius: 1, overflow: "hidden", my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
//                     {isFileLoading ? (
//                       <CircularProgress />
//                     ) : policyFileUrl ? (
//                       (() => {
//                         const fileName = selectedPolicy.attachment?.file_name?.toLowerCase();
//                         if (fileName?.endsWith('.pdf')) {
//                           // Added #toolbar=0 to hide PDF toolbar
//                           return <iframe title={selectedPolicy.title} src={`${policyFileUrl}#toolbar=0`} width="100%" height="100%" style={{ border: "none" }} />;
//                         } else if (/\.(png|jpg|jpeg|gif)$/.test(fileName)) {
//                           return <img src={policyFileUrl} alt={selectedPolicy.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />;
//                         } else {
//                           return <Typography p={2} color="text.secondary">Preview not available for this file type. Please download to view.</Typography>;
//                         }
//                       })()
//                     ) : (
//                       selectedPolicy.attachment ? (
//                         <Typography p={2} color="text.secondary">Could not load policy file for preview. It might be corrupted or the link is invalid.</Typography>
//                       ) : (
//                         <Typography p={2} color="text.secondary">No attachment for this policy.</Typography>
//                       )
//                     )}
//                   </Box>
//                   <Box display="flex" gap={1} mt={1}>
//                     <Button
//                       variant="contained"
//                       sx={{
//                         alignSelf: "flex-start",
//                         backgroundColor: "#9c27b0",
//                         "&:hover": { backgroundColor: "#7b1fa2" },
//                         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
//                         px: { xs: 1.5, sm: 2, md: 3 },
//                         py: { xs: 0.5, sm: 0.8, md: 1 },
//                         minWidth: { xs: "100px", sm: "120px", md: "150px" },
//                       }}
//                       onClick={() => handleViewAcknowledges(selectedPolicy.policy_id)}
//                       disabled={!selectedPolicy.policy_id}
//                     >
//                       View Acknowledges
//                     </Button>

//                     <Button
//                       variant="contained"
//                       onClick={handleDownload}
//                       disabled={!policyFileUrl || isFileLoading || !selectedPolicy.attachment}
//                       sx={{
//                         alignSelf: "flex-start",
//                         backgroundColor: "#9c27b0",
//                         "&:hover": { backgroundColor: "#7b1fa2" },
//                         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
//                         px: { xs: 1.5, sm: 2, md: 3 },
//                         py: { xs: 0.5, sm: 0.8, md: 1 },
//                         minWidth: { xs: "100px", sm: "120px", md: "150px" },
//                       }}
//                     >
//                       Download Policy
//                     </Button>
//                   </Box>

//                 </>
//               ) : (
//                 <Typography p={2} color="text.secondary">Select a policy from the left or use the "Eye" icon in the list to view its details and attachment.</Typography>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       )}

//       {/* Form Modal (Add/Edit Policy) */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle> {editId ? "Edit Policy" : "Add New Policy"}  </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={2}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf,.doc,.docx,.png,.jpg,image/*" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span">Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2 }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#f44336", borderColor: "#f44336", border: "1px solid", "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: "#9c27b0", color: "white", "&:hover": { backgroundColor: "#7b1fa2" } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Acknowledge Dialog */}
//       <Dialog open={ackDialogOpen} onClose={() => setAckDialogOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           View All Acknowledge
//           <TextField size="small" placeholder="Search by Name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ ml: 2 }} />
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
//             <TableContainer component={Paper}>
//               <Table size="small" stickyHeader>
//                 <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableRow>
//                     <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
//                     <TableCell><strong>EMPLOYEE ID</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGED</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGE DATE</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).map((ack, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{ack.employee_name}</TableCell>
//                       <TableCell>{ack.emp_id}</TableCell>
//                       <TableCell>{ack.acknowledge ? "Yes" : "No"}</TableCell> {/* Assuming 'acknowledge' is boolean */}
//                       <TableCell>{ack.acknowledged_date}</TableCell>
//                     </TableRow>
//                   ))}
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={4} align="center">No acknowledgements found.</TableCell>
//                       </TableRow>
//                     )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAckDialogOpen(false)} variant="outlined" sx={{ borderColor: "red", color: "red", "&:hover": { backgroundColor: "#ffe6e6", borderColor: "darkred" } }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }







// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   Select, MenuItem, FormControl, InputLabel, CircularProgress, List, ListItem, ListItemText, useTheme, useMediaQuery,
//   Snackbar, Alert,
// } from "@mui/material";
// import { Add, Edit, Delete, Visibility } from "@mui/icons-material"; // Added Visibility icon
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance"; 
// import Swal from 'sweetalert2';

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [ackDialogOpen, setAckDialogOpen] = useState(false);
//   const [acknowledges, setAcknowledges] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // For searching acknowledges
//   const [isSubmitting, setIsSubmitting] = useState(false); // For form submission loading state

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Helper for SweetAlert2 notifications
//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   // Fetches the policy list
//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id); // Sort by newest first
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch on component mount
//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // Form Submission (Add/Edit)
//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill in the required Title and Description fields.",
//       });
//       return;
//     }

//     // For new policies, a file attachment is mandatory
//     if (!editId && !formValues.attachment) {
//       Swal.fire({
//         icon: "warning",
//         title: "File Required",
//         text: "Please choose a file attachment for the new policy.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2); // Assuming fixed value or from context

//     // Only append 'attachment' if it's a new File object
//     // This prevents sending the old attachment object back on edit if no new file was selected.
//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       setOpenForm(false);
//       fetchPolicies(); // Refresh policies list after save
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: "Failed to save policy. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete Policy
//   const handleDelete = async (policyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#9c27b0",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/policies/${policyId}/`);
//           fetchPolicies(); // Re-fetch policies to update list
//           showSwal("success", "Deleted!", "Policy has been deleted successfully!");
//         } catch (error) {
//           console.error("Failed to delete policy:", error);
//           showSwal("error", "Error", "Failed to delete policy. Please try again.");
//         }
//       }
//     });
//   };

//   // Fetch and display acknowledgements for a policy
//   const handleViewAcknowledges = async (policyId) => {
//     if (!policyId) return;
//     try {
//       const response = await axiosInstance.get(`/acknowledge_policy/${policyId}/`);
//       setAcknowledges(response.data.data || []);
//       setAckDialogOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch acknowledgements:", error);
//       setAcknowledges([]); // Clear previous acknowledges
//       setAckDialogOpen(true); // Still open dialog, but show no data message
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch acknowledgements. Please try again.",
//       });
//     }
//   };

//   // Open Add/Edit Form
//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   // Handle Edit Policy
//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       // When editing, pass the existing attachment object (which has file_name)
//       // This allows the UI to show the current file name without needing to re-download.
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   // Handle input changes in the form
//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       setFormValues((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Pagination and Search Logic
//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / rowsPerPage));

//   const handlePageChange = (_, value) => setPage(value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setPage(1); // Reset to first page when rows per page changes
//   };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         flexDirection={isMobile ? "column" : "row"}
//         justifyContent={isMobile ? "flex-start" : "space-between"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         mb={2}
//         gap={isMobile ? 2 : 0}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
//         >
//           List All Policies
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={handleOpenForm}
//           sx={{
//             fontSize: "0.75rem",
//             padding: "4px 10px",
//             minWidth: "auto",
//             backgroundColor: "#9c27b0",
//             color: "#fff",
//             whiteSpace: "nowrap",
//             "&:hover": { backgroundColor: "#7b1fa2" },
//           }}
//         >
//           Add New Policy
//         </Button>
//       </Box>

//       {/* Search and Rows Per Page Controls */}
//       <Box
//         display="flex"
//         justifyContent="flex-start"
//         alignItems="center"
//         mb={2}
//         gap={2}
//       >
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel>Show</InputLabel>
//           <Select
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//             label="Show"
//           >
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={15}>15</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Policies Table */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', width: '80px' }}>SR.NO</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px' }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center"><CircularProgress /></TableCell>
//               </TableRow>
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id}>
//                   <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                                    <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={1}>
//                       <IconButton
//                         onClick={() => handleViewAcknowledges(policy.policy_id)}
//                         sx={{ color: "#1976d2" }} // Style for the eye icon
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => handleEdit(policy)} sx={{ color: "#9c27b0" }}><Edit /></IconButton>
//                       <IconButton onClick={() => handleDelete(policy.policy_id)} sx={{ color: "#ef1000ff" }}><Delete /></IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Controls */}
//       <Box sx={{ mt: 2 }}>
//         {isMobile ? (
//           <>
//             <Typography variant="body2" color="text.secondary" mb={1}>
//               {filteredPolicies.length > 0
//                 ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                   page * rowsPerPage,
//                   filteredPolicies.length
//                 )} of ${filteredPolicies.length} records`
//                 : "No records found"}
//             </Typography>

//             <Typography
//               component="div"
//               variant="body2"
//               align="center"
//               sx={{ mb: 1 }}
//             >
//               Page {page} of {totalPages}
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: 2,
//               }}
//             >
//               <Button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1 || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   px: 2,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Previous
//               </Button>

//               <Button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={page >= totalPages || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   px: 2,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="body2" color="text.secondary">
//               {filteredPolicies.length > 0
//                 ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                   page * rowsPerPage,
//                   filteredPolicies.length
//                 )} of ${filteredPolicies.length} records`
//                 : "No records found"}
//             </Typography>

//             <Box>
//               <Button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1 || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   mx: 0.5,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Previous
//               </Button>

//               <Typography component="span" mx={1} variant="body2">
//                 Page {page} of {totalPages}
//               </Typography>

//               <Button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={page >= totalPages || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   mx: 0.5,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* Form Modal (Add/Edit Policy) */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle> {editId ? "Edit Policy" : "Add New Policy"}  </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={2}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf,.doc,.docx,.png,.jpg,image/*" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span">Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2 }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#f44336", borderColor: "#f44336", border: "1px solid", "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: "#9c27b0", color: "white", "&:hover": { backgroundColor: "#7b1fa2" } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Acknowledge Dialog */}
//       <Dialog open={ackDialogOpen} onClose={() => setAckDialogOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           View All Acknowledge
//           <TextField size="small" placeholder="Search by Name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ ml: 2 }} />
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
//             <TableContainer component={Paper}>
//               <Table size="small" stickyHeader>
//                 <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableRow>
//                     <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
//                     <TableCell><strong>EMPLOYEE ID</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGED</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGE DATE</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).map((ack, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{ack.employee_name}</TableCell>
//                       <TableCell>{ack.emp_id}</TableCell>
//                       <TableCell>{ack.acknowledge ? "Yes" : "No"}</TableCell>
//                       <TableCell>{ack.acknowledged_date}</TableCell>
//                     </TableRow>
//                   ))}
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={4} align="center">No acknowledgements found.</TableCell>
//                       </TableRow>
//                     )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAckDialogOpen(false)} variant="outlined" sx={{ borderColor: "red", color: "red", "&:hover": { backgroundColor: "#ffe6e6", borderColor: "darkred" } }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
















// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   Select, MenuItem, FormControl, InputLabel, CircularProgress, List, ListItem, ListItemText, useTheme, useMediaQuery,
// } from "@mui/material";
// import { Add, Edit, Delete, Visibility, Description } from "@mui/icons-material"; // Added Description icon
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [ackDialogOpen, setAckDialogOpen] = useState(false);
//   const [acknowledges, setAcknowledges] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // For searching acknowledges
//   const [isSubmitting, setIsSubmitting] = useState(false); // For form submission loading state

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Helper for SweetAlert2 notifications
//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   // Fetches the policy list
//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id); // Sort by newest first
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch on component mount
//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   // Form Submission (Add/Edit)
//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill in the required Title and Description fields.",
//       });
//       return;
//     }

//     // For new policies, a file attachment is mandatory
//     if (!editId && !formValues.attachment) {
//       Swal.fire({
//         icon: "warning",
//         title: "File Required",
//         text: "Please choose a file attachment for the new policy.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2); // Assuming fixed value or from context

//     // Only append 'attachment' if it's a new File object
//     // This prevents sending the old attachment object back on edit if no new file was selected.
//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       setOpenForm(false);
//       fetchPolicies(); // Refresh policies list after save
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: "Failed to save policy. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Delete Policy
//   const handleDelete = async (policyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#9c27b0",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/policies/${policyId}/`);
//           fetchPolicies(); // Re-fetch policies to update list
//           showSwal("success", "Deleted!", "Policy has been deleted successfully!");
//         } catch (error) {
//           console.error("Failed to delete policy:", error);
//           showSwal("error", "Error", "Failed to delete policy. Please try again.");
//         }
//       }
//     });
//   };

//   // --- NEW FUNCTION: Handle viewing the policy attachment ---
//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       // IMPORTANT: Adjust the base URL if your frontend is on a different domain/port
//       // than where your backend serves static files.
//       // Example: If API is at https://tdtlworld.com/hrms-backend/policies/
//       // and file_url is /media/image.jpg, then fullUrl should be https://tdtlworld.com/hrms-backend/media/image.jpg
//       // If your frontend and backend static files are served from the same base domain,
//       // you might not need to prepend anything.
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`; // Adjust this line if necessary
//       window.open(fullUrl, "_blank");
//     } else {
//       Swal.fire({
//         icon: "info",
//         title: "No Attachment",
//         text: "This policy does not have an attachment to view.",
//       });
//     }
//   };

//   // --- RE-PURPOSED FUNCTION: Fetch and display acknowledgements for a policy ---
//   // This is now triggered by the new 'Description' icon
//   const handleViewAcknowledges = async (policyId) => {
//     if (!policyId) return;
//     try {
//       const response = await axiosInstance.get(`/acknowledge_policy/${policyId}/`);
//       setAcknowledges(response.data.data || []);
//       setAckDialogOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch acknowledgements:", error);
//       setAcknowledges([]); // Clear previous acknowledges
//       setAckDialogOpen(true); // Still open dialog, but show no data message
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch acknowledgements. Please try again.",
//       });
//     }
//   };

//   // Open Add/Edit Form
//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   // Handle Edit Policy
//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       // When editing, pass the existing attachment object (which has file_name)
//       // This allows the UI to show the current file name without needing to re-download.
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   // Handle input changes in the form
//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       setFormValues((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Pagination and Search Logic
//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / rowsPerPage));

//   const handlePageChange = (_, value) => setPage(value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setPage(1); // Reset to first page when rows per page changes
//   };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         flexDirection={isMobile ? "column" : "row"}
//         justifyContent={isMobile ? "flex-start" : "space-between"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         mb={2}
//         gap={isMobile ? 2 : 0}
//       >
//         <Typography
//           variant="h6"
//           sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
//         >
//           Policies Management 
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={handleOpenForm}
//           sx={{
//             fontSize: "0.75rem",
//             padding: "4px 10px",
//             minWidth: "auto",
//             backgroundColor: "#9c27b0",
//             color: "#fff",
//             whiteSpace: "nowrap",
//             "&:hover": { backgroundColor: "#7b1fa2" },
//           }}
//         >
//           Add New Policy
//         </Button>
//       </Box>

//       {/* Search and Rows Per Page Controls */}
//       <Box
//         display="flex"
//         justifyContent="flex-start"
//         alignItems="center"
//         mb={2}
//         gap={2}
//       >
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel>Show</InputLabel>
//           <Select
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//             label="Show"
//           >
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={15}>15</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Policies"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Policies Table */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', width: '80px' }}>SR.NO</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px' }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center"><CircularProgress /></TableCell>
//               </TableRow>
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id}>
//                   <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={1}>
//                       {/* New Icon for viewing Acknowledgements */}
//                       <IconButton
//                         onClick={() => handleViewAcknowledges(policy.policy_id)}
//                         sx={{ color: "#0288d1" }} // A different shade of blue for this icon
//                         title="View Acknowledgements"
//                       >
//                         <Description />
//                       </IconButton>
//                       {/* Eye icon for viewing Attachment */}
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : Swal.fire({
//                                 icon: "info",
//                                 title: "No Attachment",
//                                 text: "This policy does not have an attachment to view.",
//                               })
//                         }
//                         sx={{ color: "#1976d2" }} // Original blue for the eye icon
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => handleEdit(policy)} sx={{ color: "#9c27b0" }} title="Edit Policy"><Edit /></IconButton>
//                       {/* <IconButton onClick={() => handleDelete(policy.policy_id)} sx={{ color: "#ef1000ff" }} title="Delete Policy"><Delete /></IconButton> */}
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Controls */}
//       <Box sx={{ mt: 2 }}>
//         {isMobile ? (
//           <>
//             <Typography variant="body2" color="text.secondary" mb={1}>
//               {filteredPolicies.length > 0
//                 ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                   page * rowsPerPage,
//                   filteredPolicies.length
//                 )} of ${filteredPolicies.length} records`
//                 : "No records found"}
//             </Typography>

//             <Typography
//               component="div"
//               variant="body2"
//               align="center"
//               sx={{ mb: 1 }}
//             >
//               Page {page} of {totalPages}
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: 2,
//               }}
//             >
//               <Button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1 || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   px: 2,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Previous
//               </Button>

//               <Button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={page >= totalPages || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   px: 2,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="body2" color="text.secondary">
//               {filteredPolicies.length > 0
//                 ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
//                   page * rowsPerPage,
//                   filteredPolicies.length
//                 )} of ${filteredPolicies.length} records`
//                 : "No records found"}
//             </Typography>

//             <Box>
//               <Button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1 || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   mx: 0.5,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Previous
//               </Button>

//               <Typography component="span" mx={1} variant="body2">
//                 Page {page} of {totalPages}
//               </Typography>

//               <Button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={page >= totalPages || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{
//                   mx: 0.5,
//                   color: "#fff",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": { backgroundColor: "#7b1fa2" },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* Form Modal (Add/Edit Policy) */}
//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle> {editId ? "Edit Policy" : "Add New Policy"} </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={2}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf,.doc,.docx,.png,.jpg,image/*" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span">Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2 }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#f44336", borderColor: "#f44336", border: "1px solid", "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: "#9c27b0", color: "white", "&:hover": { backgroundColor: "#7b1fa2" } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Acknowledge Dialog */}
//       <Dialog open={ackDialogOpen} onClose={() => setAckDialogOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           Policy Acknowledgements
//           <TextField size="small" placeholder="Search by Name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ ml: 2 }} />
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
//             <TableContainer component={Paper}>
//               <Table size="small" stickyHeader>
//                 <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableRow>
//                     <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
//                     <TableCell><strong>EMPLOYEE ID</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGED</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGE DATE</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).map((ack, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{ack.employee_name}</TableCell>
//                       <TableCell>{ack.emp_id}</TableCell>
//                       <TableCell>{ack.acknowledge ? "Yes" : "No"}</TableCell>
//                       <TableCell>{ack.acknowledged_date ? ack.acknowledged_date.split(' ')[0] : ''}</TableCell>
//                     </TableRow>
//                   ))}
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={4} align="center">No acknowledgements found.</TableCell>
//                       </TableRow>
//                     )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAckDialogOpen(false)} variant="outlined" sx={{ borderColor: "red", color: "red", "&:hover": { backgroundColor: "#ffe6e6", borderColor: "darkred" } }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


















// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   Select, MenuItem, FormControl, InputLabel, CircularProgress, useTheme, useMediaQuery,
// } from "@mui/material";
// import { Add, Edit, Delete, Visibility, Description } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- New Color Theme ---
// const THEME = {
//   primary: '#8C257C', // Purple
//   primaryDark: '#6d1d60', // Darker Purple for hover
//   secondary: '#F58E35', // Orange
//   textOnPrimary: '#FFFFFF', // White text for purple background
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(1);
//   const [ackDialogOpen, setAckDialogOpen] = useState(false);
//   const [acknowledges, setAcknowledges] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields",
//         text: "Please fill in the required Title and Description fields.",
//       });
//       return;
//     }

//     if (!editId && !formValues.attachment) {
//       Swal.fire({
//         icon: "warning",
//         title: "File Required",
//         text: "Please choose a PDF file attachment for the new policy.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       setOpenForm(false);
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Save Failed",
//         text: "Failed to save policy. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (policyId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: THEME.primary, // Themed confirm button
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/policies/${policyId}/`);
//           fetchPolicies();
//           showSwal("success", "Deleted!", "Policy has been deleted successfully!");
//         } catch (error) {
//           console.error("Failed to delete policy:", error);
//           showSwal("error", "Error", "Failed to delete policy. Please try again.");
//         }
//       }
//     });
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       Swal.fire({
//         icon: "info",
//         title: "No Attachment",
//         text: "This policy does not have an attachment to view.",
//       });
//     }
//   };

//   const handleViewAcknowledges = async (policyId) => {
//     if (!policyId) return;
//     try {
//       const response = await axiosInstance.get(`/acknowledge_policy/${policyId}/`);
//       setAcknowledges(response.data.data || []);
//       setAckDialogOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch acknowledgements:", error);
//       setAcknowledges([]);
//       setAckDialogOpen(true);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to fetch acknowledgements. Please try again.",
//       });
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   // --- MODIFIED: Handle input changes with PDF validation ---
//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       const file = files[0];
//       // Validation check for PDF
//       if (file && file.type !== "application/pdf") {
//         showSwal('error', 'Invalid File Type', 'Please upload a PDF file only.');
//         e.target.value = null; // Clear the file input
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / rowsPerPage));

//   const handlePageChange = (_, value) => setPage(value);
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(e.target.value);
//     setPage(1);
//   };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         flexDirection={isMobile ? "column" : "row"}
//         justifyContent={isMobile ? "flex-start" : "space-between"}
//         alignItems={isMobile ? "flex-start" : "center"}
//         mb={2}
//         gap={isMobile ? 2 : 0}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             fontSize: "1.8rem",
//             fontWeight: "bold",
//             color: THEME.primary, // Themed title color
//           }}
//         >
//           Policies Management
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={handleOpenForm}
//           sx={{
//             fontSize: "0.75rem",
//             padding: "4px 10px",
//             minWidth: "auto",
//             backgroundColor: THEME.primary, // Themed button color
//             color: THEME.textOnPrimary,
//             whiteSpace: "nowrap",
//             "&:hover": { backgroundColor: THEME.primaryDark }, // Themed hover color
//           }}
//         >
//           Add New Policy
//         </Button>
//       </Box>

//       <Box
//         display="flex"
//         justifyContent="flex-start"
//         alignItems="center"
//         mb={2}
//         gap={2}
//       >
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel>Show</InputLabel>
//           <Select
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//             label="Show"
//           >
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={15}>15</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Policies"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           {/* --- MODIFIED: Themed Table Header --- */}
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', width: '80px', color: THEME.textOnPrimary }}>SR.NO</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center"><CircularProgress sx={{ color: THEME.primary }} /></TableCell>
//               </TableRow>
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={1}>
//                       <IconButton
//                         onClick={() => handleViewAcknowledges(policy.policy_id)}
//                         sx={{ color: "#0288d1" }}
//                         title="View Acknowledgements"
//                       >
//                         <Description />
//                       </IconButton>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : Swal.fire({
//                                 icon: "info",
//                                 title: "No Attachment",
//                                 text: "This policy does not have an attachment to view.",
//                               })
//                         }
//                         sx={{ color: THEME.secondary }} // Themed view icon
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => handleEdit(policy)} sx={{ color: THEME.primary }} title="Edit Policy"><Edit /></IconButton>
//                       {/* <IconButton onClick={() => handleDelete(policy.policy_id)} sx={{ color: "#ef1000ff" }} title="Delete Policy"><Delete /></IconButton> */}
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ mt: 2 }}>
//         {isMobile ? (
//           <>
//             <Typography variant="body2" color="text.secondary" mb={1}>
//               {filteredPolicies.length > 0
//                 ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredPolicies.length)} of ${filteredPolicies.length} records`
//                 : "No records found"}
//             </Typography>

//             <Typography component="div" variant="body2" align="center" sx={{ mb: 1 }}>
//               Page {page} of {totalPages}
//             </Typography>

//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//               <Button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1 || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{ px: 2, color: THEME.textOnPrimary, backgroundColor: THEME.primary, "&:hover": { backgroundColor: THEME.primaryDark } }}
//               >
//                 Previous
//               </Button>
//               <Button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={page >= totalPages || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{ px: 2, color: THEME.textOnPrimary, backgroundColor: THEME.primary, "&:hover": { backgroundColor: THEME.primaryDark } }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </>
//         ) : (
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="body2" color="text.secondary">
//               {filteredPolicies.length > 0
//                 ? `Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(page * rowsPerPage, filteredPolicies.length)} of ${filteredPolicies.length} records`
//                 : "No records found"}
//             </Typography>

//             <Box>
//               <Button
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1 || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{ mx: 0.5, color: THEME.textOnPrimary, backgroundColor: THEME.primary, "&:hover": { backgroundColor: THEME.primaryDark } }}
//               >
//                 Previous
//               </Button>
//               <Typography component="span" mx={1} variant="body2">
//                 Page {page} of {totalPages}
//               </Typography>
//               <Button
//                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={page >= totalPages || filteredPolicies.length === 0}
//                 size="small"
//                 sx={{ mx: 0.5, color: THEME.textOnPrimary, backgroundColor: THEME.primary, "&:hover": { backgroundColor: THEME.primaryDark } }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Box>

//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary }}>{editId ? "Edit Policy" : "Add New Policy"}</DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={2}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 {/* --- MODIFIED: Input now only accepts PDFs --- */}
//                 <input accept=".pdf" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span" sx={{ borderColor: THEME.secondary, color: THEME.secondary, '&:hover': { borderColor: THEME.secondary } }}>Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2 }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#f44336", borderColor: "#f44336", border: "1px solid", "&:hover": { backgroundColor: "#ffebee", borderColor: "#d32f2f" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: THEME.primary, color: THEME.textOnPrimary, "&:hover": { backgroundColor: THEME.primaryDark } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={ackDialogOpen} onClose={() => setAckDialogOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: THEME.primary }}>
//           Policy Acknowledgements
//           <TextField size="small" placeholder="Search by Name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ ml: 2 }} />
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: 600, overflowY: "auto" }}>
//             <TableContainer component={Paper}>
//               <Table size="small" stickyHeader>
//                 <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableRow>
//                     <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
//                     <TableCell><strong>EMPLOYEE ID</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGED</strong></TableCell>
//                     <TableCell><strong>ACKNOWLEDGE DATE</strong></TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).map((ack, index) => (
//                     <TableRow key={index} hover>
//                       <TableCell>{ack.employee_name}</TableCell>
//                       <TableCell>{ack.emp_id}</TableCell>
//                       <TableCell>{ack.acknowledge ? "Yes" : "No"}</TableCell>
//                       <TableCell>{ack.acknowledged_date ? ack.acknowledged_date.split(' ')[0] : ''}</TableCell>
//                     </TableRow>
//                   ))}
//                   {acknowledges.filter((ack) =>
//                     ack.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     ack.emp_id.toLowerCase().includes(searchQuery.toLowerCase())
//                   ).length === 0 && (
//                       <TableRow>
//                         <TableCell colSpan={4} align="center">No acknowledgements found.</TableCell>
//                       </TableRow>
//                     )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAckDialogOpen(false)} variant="outlined" sx={{ borderColor: "red", color: "red", "&:hover": { backgroundColor: "#ffe6e6", borderColor: "darkred" } }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

















// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   CircularProgress, useTheme, useMediaQuery, Skeleton, TablePagination
// } from "@mui/material";
// import { Add, Edit, Visibility } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- Brand Color Theme ---
// const THEME = {
//   primary: '#8C257C', // Purple
//   primaryDark: '#6d1d60', // Darker Purple for hover
//   secondary: '#F58E35', // Orange
//   textOnPrimary: '#FFFFFF', // White text for purple background
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0); // MUI TablePagination is 0-indexed
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page set to 10
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       showSwal("warning", "Missing Fields", "Please fill in the required Title and Description fields.");
//       return;
//     }

//     if (!editId && !formValues.attachment) {
//       showSwal("warning", "File Required", "Please choose a PDF file attachment for the new policy.");
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       setOpenForm(false);
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       showSwal("error", "Save Failed", "Failed to save policy. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       const file = files[0];
//       if (file && file.type !== "application/pdf") {
//         showSwal('error', 'Invalid File Type', 'Please upload a PDF file only.');
//         e.target.value = null;
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box p={3} component={Paper}>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="flex-start"
//         mb={2}
//         gap={2}
//       >
//         <Typography variant="h5" sx={{ color: THEME.primary, fontWeight: 'bold' }}>
//           Policies Management
//         </Typography>

//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           width="100%"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: THEME.primaryDark },
//             }}
//           >
//             Add New Policy
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search Policies"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
//                         }
//                         sx={{ color: THEME.secondary }}
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => handleEdit(policy)} sx={{ color: THEME.primary }} title="Edit Policy"><Edit /></IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
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
//           p: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//           Showing {filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredPolicies.length)} of {filteredPolicies.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredPolicies.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             '& .MuiSvgIcon-root': { color: THEME.primary },
//             '& .Mui-disabled': { opacity: 0.5 },
//           }}
//         />
//       </Box>

//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>{editId ? "Edit Policy" : "Add New Policy"}</DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={1}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span" sx={{ borderColor: THEME.secondary, color: THEME.secondary, '&:hover': { borderColor: THEME.secondary, backgroundColor: '#fff8f0' } }}>Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#757575", "&:hover": { backgroundColor: "#f5f5f5" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: THEME.primary, color: THEME.textOnPrimary, "&:hover": { backgroundColor: THEME.primaryDark } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }















// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   CircularProgress, useTheme, useMediaQuery, Skeleton, TablePagination
// } from "@mui/material";
// import { Add, Edit, Visibility } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- Brand Color Theme ---
// const THEME = {
//   primary: '#8C257C', // Purple
//   primaryDark: '#6d1d60', // Darker Purple for hover
//   secondary: '#F58E35', // Orange
//   textOnPrimary: '#FFFFFF', // White text for purple background
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0); // MUI TablePagination is 0-indexed
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page set to 10
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const handleSubmit = async () => {
//     if (!formValues.title || !formValues.description) {
//       showSwal("warning", "Missing Fields", "Please fill in the required Title and Description fields.");
//       return;
//     }

//     if (!editId && !formValues.attachment) {
//       showSwal("warning", "File Required", "Please choose a PDF file attachment for the new policy.");
//       return;
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", formValues.description);
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       setOpenForm(false);
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       showSwal("error", "Save Failed", "Failed to save policy. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setOpenForm(true);
//   };

//   const handleEdit = (policy) => {
//     setFormValues({
//       title: policy.title,
//       description: policy.description,
//       attachment: policy.attachment
//     });
//     setEditId(policy.policy_id);
//     setOpenForm(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "attachment") {
//       const file = files[0];
//       if (file && file.type !== "application/pdf") {
//         showSwal('error', 'Invalid File Type', 'Please upload a PDF file only.');
//         e.target.value = null;
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box p={3} component={Paper}>
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="flex-start"
//         mb={2}
//         gap={2}
//       >
//         <Typography variant="h4" sx={{ color: THEME.primary, fontWeight: 'bold' , mb:4}}>
//           Policies
//         </Typography>

//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           width="100%"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: THEME.primaryDark },
//             }}
//           >
//             Add New Policy
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search Policies"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
//                         }
//                         sx={{ color: THEME.secondary }}
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                       <IconButton onClick={() => handleEdit(policy)} sx={{ color: THEME.primary }} title="Edit Policy"><Edit /></IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
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
//           p: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//           Showing {filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredPolicies.length)} of {filteredPolicies.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredPolicies.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             '& .MuiSvgIcon-root': { color: THEME.primary },
//             '& .Mui-disabled': { opacity: 0.5 },
//           }}
//         />
//       </Box>

//       <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>{editId ? "Edit Policy" : "Add New Policy"}</DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={1}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField label="Title" fullWidth required name="title" value={formValues.title} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField label="Description" fullWidth required name="description" multiline rows={4} value={formValues.description} onChange={handleFormChange} />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button variant="outlined" component="span" sx={{ borderColor: THEME.secondary, color: THEME.secondary, '&:hover': { borderColor: THEME.secondary, backgroundColor: '#fff8f0' } }}>Choose File</Button>
//                   <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : (formValues.attachment && typeof formValues.attachment === 'object' && formValues.attachment.file_name)
//                         ? formValues.attachment.file_name
//                         : "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={() => setOpenForm(false)} disabled={isSubmitting} sx={{ color: "#757575", "&:hover": { backgroundColor: "#f5f5f5" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: THEME.primary, color: THEME.textOnPrimary, "&:hover": { backgroundColor: THEME.primaryDark } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }














// import React, { useState, useEffect } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   CircularProgress, useTheme, useMediaQuery, Skeleton, TablePagination
// } from "@mui/material";
// import { Add, Visibility } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- Brand Color Theme ---
// const THEME = {
//   primary: '#8C257C', // Purple
//   primaryDark: '#6d1d60', // Darker Purple for hover
//   secondary: '#F58E35', // Orange
//   textOnPrimary: '#FFFFFF', // White text for purple background
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({}); // State to hold validation errors

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const showSwal = (icon, title, text) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load",
//         text: "Could not fetch policies. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formValues.title.trim()) {
//       newErrors.title = "Title is required.";
//     }
//     if (!editId && !formValues.attachment) {
//       newErrors.attachment = "File attachment is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return; // Stop submission if validation fails
//     }

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", ""); // Description is removed from form but may be expected by API
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       handleCloseForm();
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       showSwal("error", "Save Failed", "Failed to save policy. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setErrors({}); // Clear previous errors
//     setOpenForm(true);
//   };
 
//   const handleCloseForm = () => {
//     setOpenForm(false);
//     setErrors({}); // Also clear errors on close
//   };


//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;

//     // Clear error for the field being changed
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }

//     if (name === "attachment") {
//       const file = files[0];
//       if (file && file.type !== "application/pdf") {
//         showSwal('error', 'Invalid File Type', 'Please upload a PDF file only.');
//         e.target.value = null;
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box p={3} component={Paper}>
//       <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
//         <Typography variant="h4" sx={{ color: THEME.primary, fontWeight: 'bold' , mb:4}}>
//           Policies
//         </Typography>

//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           width="100%"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: THEME.primaryDark },
//             }}
//           >
//             Add New Policy
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search Policies"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>
//                     {(() => {
//                       const date = new Date(policy.created_at);
//                       const day = String(date.getDate()).padStart(2, '0');
//                       const month = String(date.getMonth() + 1).padStart(2, '0');
//                       const year = date.getFullYear();
//                       return `${day}/${month}/${year}`;
//                     })()}
//                   </TableCell>

//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
//                         }
//                         sx={{ color: THEME.secondary }}
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
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
//           p: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//           Showing {filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredPolicies.length)} of {filteredPolicies.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredPolicies.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             '& .MuiSvgIcon-root': { color: THEME.primary },
//             '& .Mui-disabled': { opacity: 0.5 },
//           }}
//         />
//       </Box>

//       <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>{editId ? "Edit Policy" : "Add New Policy"}</DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={1}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Title"
//                   fullWidth
//                   required
//                   name="title"
//                   value={formValues.title}
//                   onChange={handleFormChange}
//                   error={!!errors.title}
//                   helperText={errors.title || ""}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <input accept=".pdf" style={{ display: "none" }} id="attachment" type="file" name="attachment" onChange={handleFormChange} />
//                 <label htmlFor="attachment">
//                   <Button
//                     variant="outlined"
//                     component="span"
//                     sx={{
//                       borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                       color: errors.attachment ? 'error.main' : THEME.secondary,
//                       '&:hover': {
//                         borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                         backgroundColor: '#fff8f0'
//                       }
//                     }}
//                   >
//                     Choose File
//                   </Button>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       ml: 2,
//                       color: errors.attachment ? 'error.main' : 'text.secondary'
//                     }}
//                   >
//                     {formValues.attachment instanceof File
//                       ? formValues.attachment.name
//                       : "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//                 {errors.attachment && (
//                     <Typography color="error" variant="caption" display="block" sx={{mt: 1}}>
//                         {errors.attachment}
//                     </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleCloseForm} disabled={isSubmitting} sx={{ color: "#757575", "&:hover": { backgroundColor: "#f5f5f5" } }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting} sx={{ backgroundColor: THEME.primary, color: THEME.textOnPrimary, "&:hover": { backgroundColor: THEME.primaryDark } }}>
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }











// import React, { useState, useEffect, useRef } from "react"; // 1. Import useRef
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   CircularProgress, useTheme, useMediaQuery, Skeleton, TablePagination
// } from "@mui/material";
// import { Add, Visibility } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- Brand Color Theme ---
// const THEME = {
//   primary: '#8C257C',
//   primaryDark: '#6d1d60',
//   secondary: '#F58E35',
//   textOnPrimary: '#FFFFFF',
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const dialogRef = useRef(null); // 2. Create a ref for the Dialog

//   const showSwal = (icon, title, text, targetEl = document.body) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       // Use the target element to control where the alert is rendered
//       target: targetEl,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       showSwal("error", "Failed to Load", "Could not fetch policies. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formValues.title.trim()) {
//       newErrors.title = "Title is required.";
//     }
//     if (!editId && !formValues.attachment) {
//       newErrors.attachment = "File attachment is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", "");
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       handleCloseForm();
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       showSwal("error", "Save Failed", "Failed to save policy. Please try again.", dialogRef.current);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setErrors({});
//     setOpenForm(true);
//   };
 
//   const handleCloseForm = () => {
//     setOpenForm(false);
//     setErrors({});
//   };

//   // --- THIS FUNCTION CONTAINS THE FIX ---
//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }

//     if (name === "attachment") {
//       const file = files[0];
//       if (!file) return;

//       if (file.type !== "application/pdf") {
//         // 4. Use the dialogRef to target the alert correctly
//         showSwal(
//             'error', 
//             'Invalid File Type', 
//             'Please upload a PDF file only.', 
//             dialogRef.current // This tells Swal to render inside the dialog
//         );
        
//         e.target.value = null; // Clear the invalid file from input
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box p={3} component={Paper}>
//       {/* ... (rest of the JSX code for table and search bar is unchanged) ... */}
//       <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
//         <Typography variant="h4" sx={{ color: THEME.primary, fontWeight: 'bold' , mb:4}}>
//           Policies
//         </Typography>

//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           width="100%"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: THEME.primaryDark },
//             }}
//           >
//             Add New Policy
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search Policies"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>
//                     {new Date(policy.created_at).toLocaleDateString('en-GB', {
//                       day: '2-digit',
//                       month: '2-digit',
//                       year: 'numeric'
//                     })}
//                   </TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
//                         }
//                         sx={{ color: THEME.secondary }}
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={filteredPolicies.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 15, 25]}
//       />


//       {/* 3. Attach the ref to the Dialog component */}
//       <Dialog ref={dialogRef} open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>
//             {editId ? "Edit Policy" : "Add New Policy"}
//         </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={1}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Title"
//                   fullWidth
//                   required
//                   name="title"
//                   value={formValues.title}
//                   onChange={handleFormChange}
//                   error={!!errors.title}
//                   helperText={errors.title || ""}
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <input
//                   accept=".pdf"
//                   style={{ display: "none" }}
//                   id="attachment-upload"
//                   type="file"
//                   name="attachment"
//                   onChange={handleFormChange}
//                 />
//                 <label htmlFor="attachment-upload">
//                   <Button
//                     variant="outlined"
//                     component="span"
//                     sx={{
//                       borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                       color: errors.attachment ? 'error.main' : THEME.secondary,
//                       '&:hover': {
//                         borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                         backgroundColor: '#fff8f0'
//                       }
//                     }}
//                   >
//                     Choose File
//                   </Button>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       ml: 2,
//                       color: errors.attachment ? 'error.main' : 'text.secondary'
//                     }}
//                   >
//                     {formValues.attachment?.name || "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//                 {errors.attachment && (
//                     <Typography color="error" variant="caption" display="block" sx={{mt: 1}}>
//                         {errors.attachment}
//                     </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleCloseForm} disabled={isSubmitting} sx={{ color: "#757575" }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               "&:hover": { backgroundColor: THEME.primaryDark }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }















//   import React, { useState, useEffect, useRef } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   CircularProgress, useTheme, useMediaQuery, Skeleton, TablePagination
// } from "@mui/material";
// import { Add, Visibility } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- Brand Color Theme ---
// const THEME = {
//   primary: '#8C257C',
//   primaryDark: '#6d1d60',
//   secondary: '#F58E35',
//   textOnPrimary: '#FFFFFF',
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const dialogRef = useRef(null);

//   const showSwal = (icon, title, text, targetEl = document.body) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       target: targetEl,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       showSwal("error", "Failed to Load", "Could not fetch policies. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formValues.title.trim()) {
//       newErrors.title = "Title is required.";
//     }
//     if (!editId && !formValues.attachment) {
//       newErrors.attachment = "File attachment is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", "");
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       handleCloseForm();
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       showSwal("error", "Save Failed", "Failed to save policy. Please try again.", dialogRef.current);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setErrors({});
//     setOpenForm(true);
//   };

//   const handleCloseForm = () => {
//     setOpenForm(false);
//     setErrors({});
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }

//     if (name === "attachment") {
//       const file = files[0];
//       if (!file) return;

//       if (file.type !== "application/pdf") {
//         showSwal(
//           'error',
//           'Invalid File Type',
//           'Please upload a PDF file only.',
//           dialogRef.current
//         );

//         e.target.value = null;
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box p={3} component={Paper}>
//       <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
//         <Typography variant="h4" sx={{ color: THEME.primary, fontWeight: 'bold', mb: 4 }}>
//           Policies
//         </Typography>

//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           width="100%"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: THEME.primaryDark },
//             }}
//           >
//             Add New Policy
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search Policies"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   {/* <TableCell>{new Date(policy.created_at).toLocaleDateString()}</TableCell> */}
//                   <TableCell>
//                   {new Date(policy.created_at).toLocaleDateString('en-GB', {
//                     day: '2-digit',
//                     month: '2-digit',
//                     year: 'numeric'
//                   })}
//                 </TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
//                         }
//                         sx={{ color: THEME.secondary }}
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* --- FOOTER WITH PAGINATION --- */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           p: 2,
//           borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredPolicies.length)} of {filteredPolicies.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredPolicies.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           // This removes the "1-5 of 10" text, as we have our own Typography for it.
//           labelDisplayedRows={() => ''}
//         />
//       </Box>

//       <Dialog ref={dialogRef} open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>
//           {editId ? "Edit Policy" : "Add New Policy"}
//         </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={1}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Title"
//                   fullWidth
//                   required
//                   name="title"
//                   value={formValues.title}
//                   onChange={handleFormChange}
//                   error={!!errors.title}
//                   helperText={errors.title || ""}
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <input
//                   accept=".pdf"
//                   style={{ display: "none" }}
//                   id="attachment-upload"
//                   type="file"
//                   name="attachment"
//                   onChange={handleFormChange}
//                 />
//                 <label htmlFor="attachment-upload">
//                   <Button
//                     variant="outlined"
//                     component="span"
//                     sx={{
//                       borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                       color: errors.attachment ? 'error.main' : THEME.secondary,
//                       '&:hover': {
//                         borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                         backgroundColor: '#fff8f0'
//                       }
//                     }}
//                   >
//                     Choose File
//                   </Button>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       ml: 2,
//                       color: errors.attachment ? 'error.main' : 'text.secondary'
//                     }}
//                   >
//                     {formValues.attachment?.name || "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//                 {errors.attachment && (
//                   <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
//                     {errors.attachment}
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleCloseForm} disabled={isSubmitting} sx={{ color: "#757575" }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               "&:hover": { backgroundColor: THEME.primaryDark }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }







// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
//   Grid, Paper, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
//   CircularProgress, useTheme, useMediaQuery, Skeleton, TablePagination
// } from "@mui/material";
// import { Add, Visibility } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// // --- Brand Color Theme ---
// const THEME = {
//   primary: '#8C257C',
//   primaryDark: '#6d1d60',
//   secondary: '#F58E35',
//   textOnPrimary: '#FFFFFF',
// };

// export default function PoliciesManagement() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
//   const [editId, setEditId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const dialogRef = useRef(null);

//   const showSwal = (icon, title, text, targetEl = document.body) => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       text: text,
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       target: targetEl,
//     });
//   };

//   const fetchPolicies = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/policies/");
//       let fetchedPolicies = response.data.data || [];
//       fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
//       setPolicies(fetchedPolicies);
//     } catch (error) {
//       console.error("Failed to fetch policies:", error);
//       showSwal("error", "Failed to Load", "Could not fetch policies. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPolicies();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formValues.title.trim()) {
//       newErrors.title = "Title is required.";
//     }
//     if (!editId && !formValues.attachment) {
//       newErrors.attachment = "File attachment is required.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("title", formValues.title);
//     formData.append("description", "");
//     formData.append("added_by", 2);

//     if (formValues.attachment instanceof File) {
//       formData.append("attachment", formValues.attachment);
//     }

//     try {
//       if (editId) {
//         await axiosInstance.patch(`/policies/${editId}/`, formData);
//         showSwal("success", "Updated", "Policy updated successfully!");
//       } else {
//         await axiosInstance.post("/policies/", formData);
//         showSwal("success", "Created", "New policy added successfully!");
//       }
//       handleCloseForm();
//       fetchPolicies();
//     } catch (error) {
//       console.error("Failed to save policy:", error);
//       showSwal("error", "Save Failed", "Failed to save policy. Please try again.", dialogRef.current);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewAttachment = (fileUrl) => {
//     if (fileUrl) {
//       const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
//       window.open(fullUrl, "_blank");
//     } else {
//       showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
//     }
//   };

//   const handleOpenForm = () => {
//     setFormValues({ title: "", description: "", attachment: null });
//     setEditId(null);
//     setErrors({});
//     setOpenForm(true);
//   };

//   const handleCloseForm = () => {
//     setOpenForm(false);
//     setErrors({});
//   };

//   const handleFormChange = (e) => {
//     const { name, value, files } = e.target;

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }

//     if (name === "attachment") {
//       const file = files[0];
//       if (!file) return;

//       if (file.type !== "application/pdf") {
//         showSwal(
//           'error',
//           'Invalid File Type',
//           'Please upload a PDF file only.',
//           dialogRef.current
//         );

//         e.target.value = null;
//         setFormValues((prev) => ({ ...prev, attachment: null }));
//         return;
//       }
//       setFormValues((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFormValues((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const filteredPolicies = policies.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedPolicies = filteredPolicies.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const startEntry = filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredPolicies.length);

//   return (
//     <Box p={3} component={Paper}>
//       <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
//         <Typography variant="h4" sx={{ color: THEME.primary, fontWeight: 'bold', mb: 4 }}>
//           Policies
//         </Typography>
    
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems={isMobile ? "flex-start" : "center"}
//           width="100%"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenForm}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               whiteSpace: "nowrap",
//               "&:hover": { backgroundColor: THEME.primaryDark },
//             }}
//           >
//             Add New Policy
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search Policies"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Box>
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead sx={{ backgroundColor: THEME.primary }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
//               <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedPolicies.length > 0 ? (
//               paginatedPolicies.map((policy, index) => (
//                 <TableRow key={policy.policy_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{policy.title}</TableCell>
//                   <TableCell>
//                   {new Date(policy.created_at).toLocaleDateString('en-GB', {
//                     day: '2-digit',
//                     month: '2-digit',
//                     year: 'numeric'
//                   })}
//                 </TableCell>
//                   <TableCell align="center">
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton
//                         onClick={() =>
//                           policy.attachment && policy.attachment.file_url
//                             ? handleViewAttachment(policy.attachment.file_url)
//                             : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
//                         }
//                         sx={{ color: THEME.secondary }}
//                         title="View Attachment"
//                       >
//                         <Visibility />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No policies found.</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* --- FOOTER WITH PAGINATION --- */}
//       <Box
//         sx={{
//           p: 2,
//           borderTop: '1px solid',
//           borderColor: 'divider',
//         }}
//       >
//         <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
//           <Typography variant="body2" color="text.secondary">
//              Showing {startEntry} to {endEntry} of {filteredPolicies.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredPolicies.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Box>
//       </Box>

//       <Dialog ref={dialogRef} open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>
//           {editId ? "Edit Policy" : "Add New Policy"}
//         </DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" mt={1}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Title"
//                   fullWidth
//                   required
//                   name="title"
//                   value={formValues.title}
//                   onChange={handleFormChange}
//                   error={!!errors.title}
//                   helperText={errors.title || ""}
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <input
//                   accept=".pdf"
//                   style={{ display: "none" }}
//                   id="attachment-upload"
//                   type="file"
//                   name="attachment"
//                   onChange={handleFormChange}
//                 />
//                 <label htmlFor="attachment-upload">
//                   <Button
//                     variant="outlined"
//                     component="span"
//                     sx={{
//                       borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                       color: errors.attachment ? 'error.main' : THEME.secondary,
//                       '&:hover': {
//                         borderColor: errors.attachment ? 'error.main' : THEME.secondary,
//                         backgroundColor: '#fff8f0'
//                       }
//                     }}
//                   >
//                     Choose File
//                   </Button>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       ml: 2,
//                       color: errors.attachment ? 'error.main' : 'text.secondary'
//                     }}
//                   >
//                     {formValues.attachment?.name || "No file chosen (PDF only)"}
//                   </Typography>
//                 </label>
//                 {errors.attachment && (
//                   <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
//                     {errors.attachment}
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleCloseForm} disabled={isSubmitting} sx={{ color: "#757575" }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             sx={{
//               backgroundColor: THEME.primary,
//               color: THEME.textOnPrimary,
//               "&:hover": { backgroundColor: THEME.primaryDark }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }









import React, { useState, useEffect, useRef } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography, IconButton, InputAdornment,
  CircularProgress, useTheme, useMediaQuery, Skeleton, Pagination,
  FormControl, Select, MenuItem
} from "@mui/material";
import { Add, Visibility } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../utils/axiosInstance";
import Swal from 'sweetalert2';

const THEME = {
  primary: '#8C257C',
  primaryDark: '#6d1d60',
  secondary: '#F58E35',
  textOnPrimary: '#FFFFFF',
};

export default function PoliciesManagement() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [formValues, setFormValues] = useState({ title: "", description: "", attachment: null });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dialogRef = useRef(null);

  const showSwal = (icon, title, text, targetEl = document.body) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      target: targetEl,
    });
  };

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/policies/");
      let fetchedPolicies = response.data.data || [];
      fetchedPolicies.sort((a, b) => b.policy_id - a.policy_id);
      setPolicies(fetchedPolicies);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
      showSwal("error", "Failed to Load", "Could not fetch policies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!editId && !formValues.attachment) {
      newErrors.attachment = "File attachment is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", "");
    formData.append("added_by", 2);

    if (formValues.attachment instanceof File) {
      formData.append("attachment", formValues.attachment);
    }

    try {
      if (editId) {
        await axiosInstance.patch(`/policies/${editId}/`, formData);
        showSwal("success", "Updated", "Policy updated successfully!");
      } else {
        await axiosInstance.post("/policies/", formData);
        showSwal("success", "Created", "New policy added successfully!");
      }
      handleCloseForm();
      fetchPolicies();
    } catch (error) {
      console.error("Failed to save policy:", error);
      showSwal("error", "Save Failed", "Failed to save policy. Please try again.", dialogRef.current);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewAttachment = (fileUrl) => {
    if (fileUrl) {
      const fullUrl = `https://tdtlworld.com/hrms-backend${fileUrl}`;
      window.open(fullUrl, "_blank");
    } else {
      showSwal("info", "No Attachment", "This policy does not have an attachment to view.");
    }
  };

  const handleOpenForm = () => {
    setFormValues({ title: "", description: "", attachment: null });
    setEditId(null);
    setErrors({});
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    if (name === "attachment") {
      const file = files[0];
      if (!file) return;

      if (file.type !== "application/pdf") {
        showSwal(
          'error',
          'Invalid File Type',
          'Please upload a PDF file only.',
          dialogRef.current
        );

        e.target.value = null;
        setFormValues((prev) => ({ ...prev, attachment: null }));
        return;
      }
      setFormValues((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredPolicies = policies.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPolicies = filteredPolicies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startEntry = filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredPolicies.length);

  return (
    <Box p={3} component={Paper}>
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
        <Typography variant="h4" sx={{ color: THEME.primary, fontWeight: 'bold', mb: 4 }}>
          Policies
        </Typography>
    
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          width="100%"
          gap={2}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenForm}
            sx={{
              backgroundColor: THEME.primary,
              color: THEME.textOnPrimary,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: THEME.primaryDark },
            }}
          >
            Add New Policy
          </Button>

          <TextField
            size="small"
            placeholder="Search Policies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
          <TableHead sx={{ backgroundColor: THEME.primary }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>SR. NO.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>TITLE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>CREATED AT</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME.textOnPrimary }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center"><Skeleton variant="rectangular" width={120} height={30} /></TableCell>
                </TableRow>
              ))
            ) : paginatedPolicies.length > 0 ? (
              paginatedPolicies.map((policy, index) => (
                <TableRow key={policy.policy_id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{policy.title}</TableCell>
                  <TableCell>
                  {new Date(policy.created_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <IconButton
                        onClick={() =>
                          policy.attachment && policy.attachment.file_url
                            ? handleViewAttachment(policy.attachment.file_url)
                            : showSwal("info", "No Attachment", "This policy does not have an attachment to view.")
                        }
                        sx={{ color: THEME.secondary }}
                        title="View Attachment"
                      >
                        <Visibility />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No policies found.</TableCell>
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
                                  backgroundColor: THEME.primary,
                                  color: 'white',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.3s',
                                  '&:hover': {
                                      backgroundColor: THEME.primaryDark,
                                  },
                                  '& .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                  },
                                  '& .MuiSvgIcon-root': {
                                      color: 'white',
                                  },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => (
                                  <MenuItem key={value} value={value}>{value}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${filteredPolicies.length} results`}
                      </Typography>
                  </Box>

                  <Pagination
                      count={Math.ceil(filteredPolicies.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton
                      showLastButton
                      sx={{
                          '& .MuiPaginationItem-root': {
                              borderRadius: '4px',
                              transition: 'background-color 0.3s, color 0.3s',
                              '&:hover': {
                                  backgroundColor: THEME.secondary,
                                  color: 'white',
                              }
                          },
                          '& .MuiPaginationItem-page':{
                              color: THEME.primary,
                              '&.Mui-selected': {
                                  backgroundColor: THEME.primary,
                                  color: 'white',
                                  '&:hover': {
                                      backgroundColor: THEME.secondary,
                                  }
                              },
                          },
                           '& .MuiPaginationItem-icon': {
                              color: THEME.primary,
                          }
                      }}
                  />
              </Box>
          )}
      </Box>

      <Dialog ref={dialogRef} open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: THEME.primary, fontWeight: 'bold' }}>
          {editId ? "Edit Policy" : "Add New Policy"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off" mt={1}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  required
                  name="title"
                  value={formValues.title}
                  onChange={handleFormChange}
                  error={!!errors.title}
                  helperText={errors.title || ""}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept=".pdf"
                  style={{ display: "none" }}
                  id="attachment-upload"
                  type="file"
                  name="attachment"
                  onChange={handleFormChange}
                />
                <label htmlFor="attachment-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      borderColor: errors.attachment ? 'error.main' : THEME.secondary,
                      color: errors.attachment ? 'error.main' : THEME.secondary,
                      '&:hover': {
                        borderColor: errors.attachment ? 'error.main' : THEME.secondary,
                        backgroundColor: '#fff8f0'
                      }
                    }}
                  >
                    Choose File
                  </Button>
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 2,
                      color: errors.attachment ? 'error.main' : 'text.secondary'
                    }}
                  >
                    {formValues.attachment?.name || "No file chosen (PDF only)"}
                  </Typography>
                </label>
                {errors.attachment && (
                  <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                    {errors.attachment}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button onClick={handleCloseForm} disabled={isSubmitting} sx={{ color: "#757575" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              backgroundColor: THEME.primary,
              color: THEME.textOnPrimary,
              "&:hover": { backgroundColor: THEME.primaryDark }
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}