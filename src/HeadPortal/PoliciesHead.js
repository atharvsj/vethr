// // // // import React, { useState, useEffect } from 'react';
// // // // import { 
// // // //   Box, 
// // // //   Typography, 
// // // //   Button, 
// // // //   Paper, 
// // // //   Table, 
// // // //   TableBody, 
// // // //   TableCell, 
// // // //   TableContainer, 
// // // //   TableHead, 
// // // //   TableRow,
// // // //   MenuItem,
// // // //   Select,
// // // //   TextField
// // // // } from '@mui/material';
// // // // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // // // import axiosInstance from '../utils/axiosInstance';

// // // // export default function PoliciesView() {
// // // //   const [entries, setEntries] = useState('10');
// // // //   const [policiesData, setPoliciesData] = useState([]);
// // // //   const [loading, setLoading] = useState(false);

// // // //   useEffect(() => {
// // // //     const fetchPolicies = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const response = await axiosInstance.get('policies/');
// // // //         const data = response.data;
// // // //         const policiesArray = Array.isArray(data) ? data : data?.data || [];

// // // //         setPoliciesData(policiesArray);
// // // //       } catch (err) {
// // // //         console.error('Error fetching policies:', err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchPolicies();
// // // //   }, []);

// // // //   const handleOpenPdf = (content, title) => {
// // // //     const blob = new Blob([content], { type: 'application/pdf' });
// // // //     const url = window.URL.createObjectURL(blob);
// // // //     const link = document.createElement('a');
// // // //     link.href = url;
// // // //     link.download = `${title}.pdf`;
// // // //     document.body.appendChild(link);
// // // //     link.click();
// // // //     document.body.removeChild(link);
// // // //     window.URL.revokeObjectURL(url);
// // // //   };

// // // //   return (
// // // //     <Box sx={{ p: 3 }}>
// // // //       <Typography variant="h5" sx={{ mb: 3 }}>Policies</Typography>

// // // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // //           <Typography sx={{ mr: 1 }}>Show</Typography>
// // // //           <Select
// // // //             value={entries}
// // // //             size="small"
// // // //             sx={{ mr: 1, minWidth: 70 }}
// // // //             onChange={(e) => setEntries(e.target.value)}
// // // //           >
// // // //             <MenuItem value={10}>10</MenuItem>
// // // //             <MenuItem value={25}>25</MenuItem>
// // // //             <MenuItem value={50}>50</MenuItem>
// // // //           </Select>
// // // //           <Typography>entries</Typography>
// // // //         </Box>

// // // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // // //           <TextField
// // // //             size="small"
// // // //             placeholder="Search"
// // // //             sx={{ minWidth: 200 }}
// // // //           />
// // // //           {/* <Button 
// // // //             variant="contained" 
// // // //             color="primary"
// // // //             sx={{ textTransform: 'none' }}
// // // //           >
// // // //             + View Policies
// // // //           </Button> */}
// // // //         </Box>
// // // //       </Box>

// // // //       <Paper sx={{ width: '100%', mb: 2 }}>
// // // //         <TableContainer>
// // // //           <Table>
// // // //             <TableHead>
// // // //               <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
// // // //                 <TableCell>TITLE</TableCell>
// // // //                 <TableCell>CREATED AT</TableCell>
// // // //                 <TableCell>ADDED BY</TableCell>
// // // //                 <TableCell align="center">ACTIONS</TableCell>
// // // //               </TableRow>
// // // //             </TableHead>
// // // //             <TableBody>
// // // //               {policiesData.map((row) => (
// // // //                 <TableRow 
// // // //                   key={row.id}
// // // //                   hover
// // // //                 >
// // // //                   <TableCell>
// // // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // //                       <AccountCircleIcon sx={{ mr: 1 }} />
// // // //                       {row.title}
// // // //                     </Box>
// // // //                   </TableCell>
// // // //                   <TableCell>{row.created_at}</TableCell>
// // // //                   <TableCell>{row.added_by}</TableCell>
// // // //                   <TableCell align="center">
// // // //                     <Button 
// // // //                       variant="outlined" 
// // // //                       size="small" 
// // // //                       onClick={() => handleOpenPdf(row.attachment, row.title)}
// // // //                     >
// // // //                       Download
// // // //                     </Button>
// // // //                   </TableCell>
// // // //                 </TableRow>
// // // //               ))}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //         <Box sx={{ 
// // // //           p: 2, 
// // // //           display: 'flex', 
// // // //           justifyContent: 'space-between', 
// // // //           alignItems: 'center',
// // // //           borderTop: '1px solid rgba(224, 224, 224, 1)' 
// // // //         }}>
// // // //           <Typography>
// // // //             Showing {policiesData.length ? 1 : 0} to {policiesData.length} of {policiesData.length} records
// // // //           </Typography>
// // // //           <Box sx={{ display: 'flex', gap: 1 }}>
// // // //             <Button 
// // // //               variant="contained" 
// // // //               disabled
// // // //               size="small"
// // // //               sx={{ 
// // // //                 bgcolor: 'grey.300',
// // // //                 color: 'grey.700',
// // // //                 '&:disabled': { color: 'grey.700' }
// // // //               }}
// // // //             >
// // // //               Previous
// // // //             </Button>
// // // //             <Button 
// // // //               variant="contained"
// // // //               size="small"
// // // //               sx={{ 
// // // //                 bgcolor: '#1976d2',
// // // //                 color: 'white',
// // // //                 minWidth: '40px',
// // // //                 p: 0
// // // //               }}
// // // //             >
// // // //               1
// // // //             </Button>
// // // //             <Button 
// // // //               variant="contained" 
// // // //               disabled
// // // //               size="small"
// // // //               sx={{ 
// // // //                 bgcolor: 'grey.300',
// // // //                 color: 'grey.700',
// // // //                 '&:disabled': { color: 'grey.700' }
// // // //               }}
// // // //             >
// // // //               Next
// // // //             </Button>
// // // //           </Box>
// // // //         </Box>
// // // //       </Paper>
// // // //     </Box>
// // // //   );
// // // // }


// // // import React, { useState, useEffect } from 'react';
// // // import { 
// // //   Box, 
// // //   Typography, 
// // //   Button, 
// // //   Paper, 
// // //   Table, 
// // //   TableBody, 
// // //   TableCell, 
// // //   TableContainer, 
// // //   TableHead, 
// // //   TableRow,
// // //   MenuItem,
// // //   Select,
// // //   TextField,
// // //   CircularProgress // Added for loading state
// // // } from '@mui/material';
// // // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // // import axiosInstance from '../utils/axiosInstance'; // Assuming this is correctly configured

// // // export default function PoliciesView() {
// // //   const [entries, setEntries] = useState('10'); // This controls items shown on the current page
// // //   const [policiesData, setPoliciesData] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [searchTerm, setSearchTerm] = useState(""); // State for search term

// // //   useEffect(() => {
// // //     const fetchPolicies = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const response = await axiosInstance.get('policies/');
// // //         const responseData = response.data;
// // //         // Robustly extract policies array, works if data is root array or nested under 'data' property
// // //         const policiesArray = Array.isArray(responseData) 
// // //           ? responseData 
// // //           : (responseData && Array.isArray(responseData.data)) 
// // //             ? responseData.data 
// // //             : [];
// // //         setPoliciesData(policiesArray);
// // //       } catch (err) {
// // //         console.error('Error fetching policies:', err);
// // //         setPoliciesData([]); // Clear data or set an error state for UI
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPolicies();
// // //   }, []);

// // //   const handleViewPdf = (attachmentContent, title) => {
// // //     if (!attachmentContent) {
// // //       alert(`No attachment available for policy: "${title}".`);
// // //       return;
// // //     }

// // //     try {
// // //       let pdfBlob;

// // //       // Case 1: Attachment is a URL string (most common for list items)
// // //       // Handles absolute URLs and root-relative URLs
// // //       if (typeof attachmentContent === 'string' && 
// // //           (attachmentContent.startsWith('http://') || 
// // //            attachmentContent.startsWith('https://') || 
// // //            attachmentContent.startsWith('/'))) {
// // //         window.open(attachmentContent, '_blank');
// // //         return; // Exit early, no blob URL needed
// // //       }
// // //       // Case 2: Attachment is a base64 data URI string
// // //       else if (typeof attachmentContent === 'string' && attachmentContent.startsWith('data:application/pdf;base64,')) {
// // //         const byteCharacters = atob(attachmentContent.substring('data:application/pdf;base64,'.length));
// // //         const byteNumbers = new Array(byteCharacters.length);
// // //         for (let i = 0; i < byteCharacters.length; i++) {
// // //           byteNumbers[i] = byteCharacters.charCodeAt(i);
// // //         }
// // //         const byteArray = new Uint8Array(byteNumbers);
// // //         pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
// // //       }
// // //       // Case 3: Attachment is already a Blob (e.g., if API returned it directly, or from a file input)
// // //       else if (attachmentContent instanceof Blob && attachmentContent.type === 'application/pdf') {
// // //         pdfBlob = attachmentContent;
// // //       }
// // //       // Case 4: Attachment is an ArrayBuffer
// // //       else if (attachmentContent instanceof ArrayBuffer) {
// // //         pdfBlob = new Blob([attachmentContent], { type: 'application/pdf' });
// // //       }
// // //       // Case 5: Fallback - try to create a blob directly.
// // //       // This part assumes 'attachmentContent' is suitable for new Blob([attachmentContent]).
// // //       // This might be relevant if 'attachmentContent' is a binary string (not common/recommended in JS).
// // //       else {
// // //         console.warn("Attachment content for PDF is of an unexpected type. Attempting to create Blob directly. Type:", typeof attachmentContent);
// // //         pdfBlob = new Blob([attachmentContent], { type: 'application/pdf' });
// // //       }

// // //       // If after all checks, pdfBlob is not valid or empty
// // //       if (!pdfBlob || pdfBlob.size === 0) {
// // //         alert(`The document "${title}" appears to be empty or could not be processed for viewing.`);
// // //         return;
// // //       }

// // //       const pdfUrl = window.URL.createObjectURL(pdfBlob);
// // //       const newTab = window.open(pdfUrl, '_blank'); // Open in new tab for viewing

// // //       // Regarding window.URL.revokeObjectURL(pdfUrl):
// // //       // Revoking too early might prevent the PDF from loading in the new tab.
// // //       // Browsers generally clean up object URLs when the document that created them is closed.
// // //       // For robust cleanup in SPAs with many such operations, one might manage these URLs
// // //       // (e.g., revoke on newTab.onunload, or after a timeout), but it adds complexity.
// // //       // For this case, we'll rely on browser cleanup or revoke if the tab fails to open.

// // //       if (!newTab) {
// // //         alert('Failed to open PDF. Your browser might be blocking pop-ups. Please check your settings.');
// // //         window.URL.revokeObjectURL(pdfUrl); // Clean up if the tab didn't open
// // //       }

// // //     } catch (error) {
// // //       console.error('Error preparing PDF for viewing:', error);
// // //       alert(`Could not display PDF "${title}". Error: ${error.message}`);
// // //     }
// // //   };

// // //   // Client-side filtering based on search term
// // //   const filteredPolicies = policiesData.filter(policy => 
// // //     policy.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //     (policy.added_by && policy.added_by.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
// // //     (policy.created_at && policy.created_at.toLowerCase().includes(searchTerm.toLowerCase()))
// // //   );

// // //   // Apply "entries per page" limit (basic pagination for the first page)
// // //   const entriesPerPage = parseInt(entries, 10);
// // //   const policiesToDisplay = filteredPolicies.slice(0, entriesPerPage);

// // //   const numFiltered = filteredPolicies.length;
// // //   const numDisplayed = policiesToDisplay.length;

// // //   return (
// // //     <Box sx={{ p: 3 }}>
// // //       <Typography variant="h5" sx={{ mb: 3 }}>Policies</Typography>

// // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
// // //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //           <Typography sx={{ mr: 1 }}>Show</Typography>
// // //           <Select
// // //             value={entries}
// // //             size="small"
// // //             sx={{ mr: 1, minWidth: 70 }}
// // //             onChange={(e) => setEntries(e.target.value)}
// // //           >
// // //             <MenuItem value={10}>10</MenuItem>
// // //             <MenuItem value={25}>25</MenuItem>
// // //             <MenuItem value={50}>50</MenuItem>
// // //             <MenuItem value={filteredPolicies.length > 50 ? filteredPolicies.length : 100}>All</MenuItem> 
// // //           </Select>
// // //           <Typography>entries</Typography>
// // //         </Box>

// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // //           <TextField
// // //             size="small"
// // //             placeholder="Search Policies"
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             sx={{ minWidth: { xs: '100%', sm: 200 } }} // Responsive width
// // //           />
// // //           {/* Original "View Policies" button was commented out, maintaining that.
// // //           <Button 
// // //             variant="contained" 
// // //             color="primary"
// // //             sx={{ textTransform: 'none' }}
// // //           >
// // //             + View Policies 
// // //           </Button> */}
// // //         </Box>
// // //       </Box>

// // //       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
// // //         <TableContainer sx={{ maxHeight: 600 }}> {/* Scrollable table area */}
// // //           <Table stickyHeader> {/* Makes header stick during scroll */}
// // //             <TableHead>
// // //               <TableRow sx={{ backgroundColor: 'grey.200' }}> {/* Use theme color */}
// // //                 <TableCell>TITLE</TableCell>
// // //                 <TableCell>CREATED AT</TableCell>
// // //                 <TableCell>ADDED BY</TableCell>
// // //                 <TableCell align="center">ACTIONS</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {loading ? (
// // //                 <TableRow>
// // //                   <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
// // //                     <CircularProgress />
// // //                     <Typography variant="body2" sx={{ mt: 1 }}>Loading Policies...</Typography>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ) : policiesToDisplay.length > 0 ? (
// // //                 policiesToDisplay.map((row) => (
// // //                   <TableRow 
// // //                     key={row.id || `${row.title}-${Math.random()}`} // Use ID or fallback to a generated key
// // //                     hover
// // //                   >
// // //                     <TableCell>
// // //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                         <AccountCircleIcon sx={{ mr: 1, color: 'action.active' }} />
// // //                         {row.title || 'N/A'}
// // //                       </Box>
// // //                     </TableCell>
// // //                     <TableCell>
// // //                       {row.created_at ? new Date(row.created_at).toLocaleDateString() : 'N/A'}
// // //                     </TableCell>
// // //                     <TableCell>{row.added_by || 'N/A'}</TableCell>
// // //                     <TableCell align="center">
// // //                       <Button 
// // //                         variant="outlined" 
// // //                         size="small" 
// // //                         onClick={() => handleViewPdf(row.attachment, row.title)}
// // //                         disabled={!row.attachment} // Disable button if no attachment
// // //                       >
// // //                         View
// // //                       </Button>
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 ))
// // //               ) : (
// // //                 <TableRow>
// // //                   <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
// // //                     <Typography>
// // //                       {policiesData.length === 0 && !searchTerm ? "No policies available." : "No policies match your search criteria."}
// // //                     </Typography>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               )}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>

// // //         {/* Pagination controls - UI mostly static as full pagination logic is not implemented */}
// // //         <Box sx={{ 
// // //           p: 2, 
// // //           display: 'flex', 
// // //           justifyContent: 'space-between', 
// // //           alignItems: 'center',
// // //           borderTop: '1px solid rgba(224, 224, 224, 1)' 
// // //         }}>
// // //           <Typography variant="body2">
// // //             Showing {numDisplayed > 0 ? 1 : 0} to {numDisplayed} of {numFiltered} records
// // //           </Typography>
// // //           <Box sx={{ display: 'flex', gap: 1 }}>
// // //             <Button 
// // //               variant="contained" 
// // //               disabled // Full pagination not implemented
// // //               size="small"
// // //               sx={{ 
// // //                 '&:disabled': { 
// // //                   bgcolor: 'action.disabledBackground', 
// // //                   color: 'text.disabled' 
// // //                 }
// // //               }}
// // //             >
// // //               Previous
// // //             </Button>
// // //             <Button 
// // //               variant="contained"
// // //               size="small"
// // //               sx={{ 
// // //                 minWidth: '40px',
// // //                 p: '4px 8px'
// // //               }}
// // //               // This should be part of dynamic pagination if implemented
// // //             >
// // //               1 
// // //             </Button>
// // //             <Button 
// // //               variant="contained" 
// // //               disabled // Full pagination not implemented
// // //               size="small"
// // //               sx={{ 
// // //                 '&:disabled': { 
// // //                   bgcolor: 'action.disabledBackground', 
// // //                   color: 'text.disabled' 
// // //                 }
// // //               }}
// // //             >
// // //               Next
// // //             </Button>
// // //           </Box>
// // //         </Box>
// // //       </Paper>
// // //     </Box>
// // //   );
// // // }

// // import React, { useState } from "react";
// // import {
// //   Box, Button, Grid, Paper, Typography, List, ListItem, ListItemText,
// //   Checkbox, FormControlLabel, Alert, TextField
// // } from "@mui/material";
// // import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// // const mockPolicies = Array.from({ length: 10 }).map((_, index) => ({
// //   id: index + 1,
// //   title: `${(index + 1).toString().padStart(3, "0")} - POLICY TITLE ${index + 1}`
// // }));

// // export default function PolicyViewer() {
// //   const [selectedPolicy, setSelectedPolicy] = useState(mockPolicies[0]);
// //   const [acknowledgedPolicies, setAcknowledgedPolicies] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [checkboxChecked, setCheckboxChecked] = useState(false);

// //   const isAcknowledged = acknowledgedPolicies.includes(selectedPolicy.id);
// //   const allAcknowledged = acknowledgedPolicies.length === mockPolicies.length;

// //   const handleSubmit = () => {
// //     if (!isAcknowledged && checkboxChecked) {
// //       setAcknowledgedPolicies((prev) => [...prev, selectedPolicy.id]);
// //       setCheckboxChecked(false); // reset checkbox
// //     }
// //   };

// //   const handlePolicySelect = (policy) => {
// //     setSelectedPolicy(policy);
// //     setCheckboxChecked(acknowledgedPolicies.includes(policy.id)); // pre-check if already acknowledged
// //   };

// //   const filteredPolicies = mockPolicies.filter((policy) =>
// //     policy.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <Box p={3}>
// //       <Typography variant="h4" fontWeight="bold" mb={2}>
// //         Policy Viewer
// //       </Typography>

// //       {!allAcknowledged && (
// //         <Alert
// //           icon={<WarningAmberIcon fontSize="inherit" />}
// //           severity="warning"
// //           sx={{ mb: 2, bgcolor: "#fff3e0", color: "#e65100", border: "1px solid #ffe0b2" }}
// //         >
// //           <strong>Alert!</strong> You Need to Accept All Policy to Avail your Attendance and Payroll
// //         </Alert>
// //       )}

// //       <Grid container spacing={2}>
// //         {/* Left Panel */}
// //         <Grid item xs={4}>
// //           <Paper elevation={3} sx={{ maxHeight: 600, overflowY: "auto", p: 2 }}>
// //             <TextField
// //               fullWidth
// //               placeholder="Search Policy..."
// //               size="small"
// //               variant="outlined"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               sx={{ mb: 1 }}
// //             />
// //             <List>
// //               {filteredPolicies.map((policy) => (
// //                 <ListItem
// //                   key={policy.id}
// //                   button
// //                   selected={selectedPolicy?.id === policy.id}
// //                   onClick={() => handlePolicySelect(policy)}
// //                 >
// //                   <ListItemText
// //                     primary={policy.title}
// //                     primaryTypographyProps={{
// //                       fontWeight: acknowledgedPolicies.includes(policy.id) ? "bold" : "normal",
// //                       color: acknowledgedPolicies.includes(policy.id) ? "green" : "inherit",
// //                     }}
// //                   />
// //                 </ListItem>
// //               ))}
// //               {filteredPolicies.length === 0 && (
// //                 <Typography variant="body2" color="text.secondary" p={2}>
// //                   No matching policies found.
// //                 </Typography>
// //               )}
// //             </List>
// //           </Paper>
// //         </Grid>

// //         {/* Right Panel */}
// //         <Grid item xs={8}>
// //           <Paper
// //             elevation={3}
// //             sx={{
// //               height: 600,
// //               p: 2,
// //               display: "flex",
// //               flexDirection: "column",
// //               justifyContent: "flex-start",
// //               bgcolor: "#fafafa"
// //             }}
// //           >
// //             <Typography variant="subtitle1" gutterBottom>
// //               {selectedPolicy?.title}
// //             </Typography>

// //             <Paper
// //               variant="outlined"
// //               sx={{
// //                 height: 380,
// //                 overflow: "auto",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 border: "1px solid #ccc",
// //                 mb: 2
// //               }}
// //             >
// //               <Box textAlign="left" p={2}>
// //                 <Typography variant="h6" fontWeight="bold">Unexpected Application Error!</Typography>
// //                 <Typography variant="subtitle1" fontWeight="bold">404 Not Found</Typography>
// //                 <Typography mt={1} fontSize="0.9rem">
// //                   👨‍💻 Hey developer 👋<br />
// //                   You can provide a way better UX than this when your app throws errors by providing your own <code>ErrorBoundary</code> or <code>errorElement</code> prop on your route.
// //                 </Typography>
// //               </Box>
// //             </Paper>

// //             <FormControlLabel
// //               control={
// //                 <Checkbox
// //                   checked={checkboxChecked}
// //                   onChange={(e) => setCheckboxChecked(e.target.checked)}
// //                   disabled={isAcknowledged}
// //                   sx={{
// //                     color: "#primary",
// //                     "&.Mui-checked": { color: "#primary" }
// //                   }}
// //                 />
// //               }
// //               label="I acknowledge that I have read, understand, and agree to the policies."
// //             />

// //  <Button
// //   size="small"
// //   variant="contained"
// //   onClick={handleSubmit}
// //   disabled={isAcknowledged || !checkboxChecked}
// //   sx={{
// //     mt: 1,
// //     backgroundColor: "#primary",
// //     textTransform: "none",
// //     fontWeight: "bold",
// //     fontSize: "0.75rem",
// //     padding: "4px 12px",
// //     width: "calc(100% - 90%)", // increase width relative to container (or use fixed width)
// //     minWidth: "88px", // base width (64px default + ~24px ~1cm)
// //     "&:hover": {
// //       backgroundColor: "#651fff"
// //     }
// //   }}
// // >
// //   Submit
// // </Button>



// //           </Paper>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box, Button, Grid, Paper, Typography, List, ListItem, ListItemText,
//   Checkbox, FormControlLabel, Alert, TextField, CircularProgress
// } from "@mui/material";
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';



// export default function PolicyViewer() {
//   const [policies, setPolicies] = useState([]);
//   const [selectedPolicy, setSelectedPolicy] = useState(null);
//   const [acknowledgedPolicies, setAcknowledgedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [checkboxChecked, setCheckboxChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [alertMsg, setAlertMsg] = useState("");

//   useEffect(() => {
//     fetchPolicies();
//   }, []);



//   const EMPLOYEE_ID = localStorage.getItem("loggedInUser");
//   console.log("Employee ID:", EMPLOYEE_ID);


//   const fetchPolicies = async () => {
//     try {
//       const res = await axios.get(`https://tdtlworld.com/hrms-backend/policies/assigned/${EMPLOYEE_ID}/`);
//       const fetchedPolicies = res.data.policies || [];
//       setPolicies(fetchedPolicies);
//       setAlertMsg(res.data.alert || "");

//       const acknowledged = fetchedPolicies
//         .filter((p) => p.acknowledged)
//         .map((p) => p.policy_id);

//       setAcknowledgedPolicies(acknowledged);
//       setSelectedPolicy(fetchedPolicies[0] || null);
//     } catch (error) {
//       console.error("Failed to fetch policies", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedPolicy || checkboxChecked === false || acknowledgedPolicies.includes(selectedPolicy.policy_id)) return;

//     try {
//       await axios.post(`https://tdtlworld.com/hrms-backend/policies/acknowledge/${EMPLOYEE_ID}/`, {
//         policy_id: `${selectedPolicy.policy_id}`
//       });
//       setAcknowledgedPolicies((prev) => [...prev, selectedPolicy.policy_id]);
//       setCheckboxChecked(false);
//     } catch (err) {
//       console.error("Failed to acknowledge policy", err);
//     }
//   };

//   const handlePolicySelect = (policy) => {
//     setSelectedPolicy(policy);
//     setCheckboxChecked(acknowledgedPolicies.includes(policy.policy_id));
//   };

//   const filteredPolicies = policies.filter((policy) =>
//     policy.policy_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const isAcknowledged = selectedPolicy && acknowledgedPolicies.includes(selectedPolicy.policy_id);
//   const allAcknowledged = acknowledgedPolicies.length === policies.length;

//   return (
//     <Box p={3}>
//       <Typography variant="h4" fontWeight="bold" mb={2}>Policy Viewer</Typography>

//       {!allAcknowledged && alertMsg && (
//         <Alert
//           icon={<WarningAmberIcon fontSize="inherit" />}
//           severity="warning"
//           sx={{ mb: 2, bgcolor: "#fff3e0", color: "#e65100", border: "1px solid #ffe0b2" }}
//         >
//           <strong>Alert!</strong> {alertMsg}
//         </Alert>
//       )}

//       <Grid container spacing={2}>
//         {/* Left Panel */}
//         <Grid item xs={4}>
//           <Paper elevation={3} sx={{ maxHeight: 600, overflowY: "auto", p: 2 }}>
//             <TextField
//               fullWidth
//               placeholder="Search Policy..."
//               size="small"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ mb: 1 }}
//             />
//             {loading ? (
//               <Box p={3} textAlign="center"><CircularProgress /></Box>
//             ) : (
//               <List>
//                 {filteredPolicies.map((policy) => (
//                   <ListItem
//                     key={policy.policy_id}
//                     button
//                     selected={selectedPolicy?.policy_id === policy.policy_id}
//                     onClick={() => handlePolicySelect(policy)}
//                   >
//                     <ListItemText
//                       primary={policy.policy_name}
//                       primaryTypographyProps={{
//                         fontWeight: acknowledgedPolicies.includes(policy.policy_id) ? "bold" : "normal",
//                         color: acknowledgedPolicies.includes(policy.policy_id) ? "green" : "inherit",
//                       }}
//                     />
//                   </ListItem>
//                 ))}
//                 {filteredPolicies.length === 0 && (
//                   <Typography variant="body2" color="text.secondary" p={2}>
//                     No matching policies found.
//                   </Typography>
//                 )}
//               </List>
//             )}
//           </Paper>
//         </Grid>

//         {/* Right Panel */}
//         <Grid item xs={8}>
//           <Paper
//             elevation={3}
//             sx={{
//               height: 600,
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "flex-start",
//               bgcolor: "#fafafa"
//             }}
//           >
//             <Typography variant="subtitle1" gutterBottom>
//               {selectedPolicy?.policy_name || "Select a policy"}
//             </Typography>

//             <Paper
//               variant="outlined"
//               sx={{
//                 height: 380,
//                 overflow: "auto",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 border: "1px solid #ccc",
//                 mb: 2
//               }}
//             >
//               <Box textAlign="left" p={2}>
//                 <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
//                   {selectedPolicy?.attachment_text || "No policy document found."}
//                 </Typography>
//               </Box>
//             </Paper>

//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={checkboxChecked}
//                   onChange={(e) => setCheckboxChecked(e.target.checked)}
//                   disabled={isAcknowledged}
//                   sx={{
//                     color: "#primary",
//                     "&.Mui-checked": { color: "#primary" }
//                   }}
//                 />
//               }
//               label="I acknowledge that I have read, understand, and agree to the policies."
//             />

//             <Button
//               size="small"
//               variant="contained"
//               onClick={handleSubmit}
//               disabled={isAcknowledged || !checkboxChecked}
//               sx={{
//                 mt: 1,
//                 backgroundColor: "#primary",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 fontSize: "0.75rem",
//                 padding: "4px 12px",
//                 width: "calc(100% - 90%)",
//                 minWidth: "88px",
//                 "&:hover": {
//                   backgroundColor: "#651fff"
//                 }
//               }}
//             >
//               Submit
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaSearch } from 'react-icons/fa';

// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   InputAdornment,
//   Chip,
//   IconButton,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   TablePagination
// } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DownloadIcon from '@mui/icons-material/Download';
// import CloseIcon from '@mui/icons-material/Close';

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// export default function PoliciesHead() {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPolicyForView, setSelectedPolicyForView] = useState(null);
//   const [viewerUrl, setViewerUrl] = useState(null);
//   const [isViewerLoading, setIsViewerLoading] = useState(false);
//   const [viewerContentType, setViewerContentType] = useState(null);
//   const [isAcknowledging, setIsAcknowledging] = useState(false);
//   const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

//   const EMPLOYEE_ID = localStorage.getItem("loggedInUser") || "1";

//   useEffect(() => {
//     const fetchPolicies = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${API_BASE_URL}/policies/assigned/${EMPLOYEE_ID}/`);
//         const policiesData = (res.data.policies || []).sort((a, b) => {
//           if (a.acknowledged === b.acknowledged) {
//             return b.policy_id - a.policy_id;
//           }
//           return a.acknowledged ? 1 : -1;
//         });
//         setPolicies(policiesData);
//       } catch (err) {
//         setError("Could not load policies. Please try again later.");
//         console.error("Failed to fetch policies", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicies();
//   }, [EMPLOYEE_ID]);

//   useEffect(() => {
//     if (!selectedPolicyForView || !selectedPolicyForView.attachment_text) {
//       setViewerUrl(null); setViewerContentType(null); return;
//     }
//     const loadContent = async () => {
//       setIsViewerLoading(true);
//       try {
//         const rawText = selectedPolicyForView.attachment_text;
//         const filePathFromApi = rawText.startsWith("Text for ") ? rawText.substring("Text for ".length) : rawText;
//         const fileExtension = filePathFromApi.split(".").pop().toLowerCase();
//         const fullUrl = `${API_BASE_URL}/media/${filePathFromApi}`;
//         if (fileExtension === "pdf") {
//           const response = await axios.get(fullUrl, { responseType: "blob" });
//           const objectUrl = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
//           setViewerUrl(objectUrl); setViewerContentType("pdf");
//         } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileExtension)) {
//           setViewerUrl(fullUrl); setViewerContentType("image");
//         } else { setViewerContentType("unsupported"); }
//       } catch (error) { console.error("Failed to fetch policy content.", error); setViewerContentType("error"); }
//       finally { setIsViewerLoading(false); }
//     };
//     loadContent();
//     return () => { if (viewerUrl && viewerUrl.startsWith("blob:")) URL.revokeObjectURL(viewerUrl); };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedPolicyForView]);

//   const filteredPolicies = policies.filter((policy) =>
//     (policy?.policy_name || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const currentPolicies = filteredPolicies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const handleViewClick = (policy) => { setSelectedPolicyForView(policy); setIsModalOpen(true); setIsCheckboxChecked(false); };
//   const handleCloseModal = () => { setIsModalOpen(false); setSelectedPolicyForView(null); setIsCheckboxChecked(false); };

//   const handleDownload = async (policy) => {
//     if (!policy || !policy.attachment_text) {
//       alert("No attachment found for this policy.");
//       return;
//     }
//     document.body.style.cursor = 'wait';
//     try {
//       const rawText = policy.attachment_text;
//       const filePathFromApi = rawText.startsWith("Text for ") ? rawText.substring("Text for ".length) : rawText;
//       const fullUrl = `${API_BASE_URL}/media/${filePathFromApi}`;
//       const fileName = filePathFromApi.split('/').pop();
//       const response = await axios.get(fullUrl, { responseType: 'blob' });
//       const blob = new Blob([response.data]);
//       const link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(link.href);
//     } catch (error) {
//       console.error("Failed to download the policy.", error);
//       alert("Could not download the file. It may not exist or there was a network error.");
//     } finally {
//       document.body.style.cursor = 'default';
//     }
//   };

//   const handleSubmitAcknowledgment = async () => {
//     if (!selectedPolicyForView || !isCheckboxChecked || selectedPolicyForView.acknowledged) return;
//     setIsAcknowledging(true);
//     try {
//       await axios.post(`${API_BASE_URL}/policies/acknowledge/${EMPLOYEE_ID}/`, { policy_id: `${selectedPolicyForView.policy_id}` });
//       setPolicies(currentPolicies => currentPolicies.map(p => p.policy_id === selectedPolicyForView.policy_id ? { ...p, acknowledged: true } : p));
//       handleCloseModal();
//     } catch (err) {
//       console.error("Failed to acknowledge policy", err);
//       alert("Failed to acknowledge the policy.");
//     } finally {
//       setIsAcknowledging(false);
//     }
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>;
//   if (error) return <Typography color="error" align="center" sx={{ p: 3 }}>{error}</Typography>;

//   return (
//     <>
//       <style>{`
//         .responsive-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         .responsive-table thead {
//           background-color: #8C257C;
//         }
//         .responsive-table thead th {
//             color: #ffffff;
//             font-weight: 600;
//         }
//         .responsive-table th, .responsive-table td {
//           padding: 16px;
//           text-align: left;
//           border-bottom: 1px solid #e0e0e0;
//         }
//         .responsive-table tbody tr:hover {
//           background-color: #f9f9f9;
//         }
//         .actions-cell {
//           display: flex;
//           gap: 8px;
//           justify-content: center;
//         }
       
//         @media (max-width: 768px) {
//           .responsive-table thead {
//             display: none;
//           }
//           .responsive-table tr {
//             display: block;
//             margin-bottom: 1rem;
//             border: 1px solid #e0e0e0;
//             border-radius: 8px;
//             box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//           }
//           .responsive-table td {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             text-align: right;
//             border-bottom: 1px solid #f0f0f0;
//             padding: 12px 16px;
//           }
//           .responsive-table td:last-child {
//             border-bottom: none;
//           }
//           .responsive-table td::before {
//             content: attr(data-label);
//             font-weight: 600;
//             text-align: left;
//             margin-right: 1rem;
//           }
//           .responsive-table td[data-label="ACTIONS"] {
//             justify-content: center;
//           }
//           .responsive-table td[data-label="ACTIONS"]::before {
//             display: none;
//           }
//         }
//       `}</style>

//       <Container maxWidth="100%" sx={{ py: 4 }}>
        

//         <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, boxShadow: 3 }}>
//           <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#8C257C' }}>
//           Policies
//         </Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            
//             <TextField
//               size="small"
//               placeholder="Search policies..."
//               value={searchTerm}
//               onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
//               InputProps={{ startAdornment: <InputAdornment position="start"><FaSearch color="gray" /></InputAdornment> }}
//             />
//           </Box>

//           <Box sx={{ overflowX: 'auto' }}>
//             <table className="responsive-table">
//               <thead>
//                 <tr>
//                   <th>SR. NO.</th>
//                   <th>TITLE</th>
//                   <th>STATUS</th>
//                   <th style={{ textAlign: 'center' }}>ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentPolicies.length > 0 ? (
//                   currentPolicies.map((policy, index) => (
//                     <tr key={policy.policy_id}>
//                       <td data-label="SR. NO.">{page * rowsPerPage + index + 1}</td>
//                       <td data-label="TITLE">{policy.policy_name || 'No Title'}</td>
//                       <td data-label="STATUS">
//                         <Chip
//                           label={policy.acknowledged ? 'Acknowledged' : 'Pending'}
//                           color={policy.acknowledged ? 'success' : 'default'}
//                           sx={!policy.acknowledged ? { backgroundColor: '#F58E35', color: 'white' } : {}}
//                           size="small"
//                         />
//                       </td>
//                       <td data-label="ACTIONS" className="actions-cell">
//                         <IconButton title="View Policy" color="primary" onClick={() => handleViewClick(policy)}>
//                           <VisibilityIcon />
//                         </IconButton>
//                         <IconButton title="Download Policy" sx={{ color: 'success.main' }} onClick={() => handleDownload(policy)}>
//                           <DownloadIcon />
//                         </IconButton>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>
//                       No policies found matching your search.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredPolicies.length)} of {filteredPolicies.length} entries
//             </Typography>
//             <TablePagination
//                 component="div"
//                 count={filteredPolicies.length}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//             />
//           </Box>
//         </Paper>
//       </Container>

//       <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontWeight: 'bold' }}>
//           {selectedPolicyForView?.policy_name || 'Policy Viewer'}
//           <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent dividers sx={{ p: 0, height: '70vh', bgcolor: '#f0f0f0', overflow: 'hidden' }}>
//           {isViewerLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box> : <>
//             {viewerContentType === "pdf" && viewerUrl && <iframe src={`${viewerUrl}#toolbar=0`} title="Policy" width="100%" height="100%" style={{ border: "none" }} />}
//             {viewerContentType === "image" && viewerUrl && <img src={viewerUrl} alt="Policy" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: 'block', margin: 'auto' }} />}
//             {viewerContentType === "unsupported" && <Typography p={3}>Preview is not available for this file type.</Typography>}
//             {viewerContentType === "error" && <Typography p={3} color="error">Could not load the document.</Typography>}
//             {!viewerContentType && <Typography p={3}>No document attached.</Typography>}
//           </>}
//         </DialogContent>
//         <DialogActions sx={{ p: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
//           {selectedPolicyForView && !selectedPolicyForView.acknowledged && (
//             <FormControlLabel
//               control={<Checkbox checked={isCheckboxChecked} onChange={(e) => setIsCheckboxChecked(e.target.checked)} sx={{ '&.Mui-checked': { color: '#8C257C' } }} />}
//               label="I have read and understood this policy."
//             />
//           )}
//           <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 }, ml: 'auto' }}>
//             <Button startIcon={<DownloadIcon />} onClick={() => handleDownload(selectedPolicyForView)}>Download</Button>
//             {selectedPolicyForView && !selectedPolicyForView.acknowledged ? (
//               <Button variant="contained" onClick={handleSubmitAcknowledgment} disabled={!isCheckboxChecked || isAcknowledging} sx={{ 
//                 backgroundColor: '#8C257C', 
//                 '&:hover': { backgroundColor: '#731e65' } 
//               }}>
//                 {isAcknowledging ? <CircularProgress size={24} color="inherit" /> : 'Acknowledge'}
//               </Button>
//             ) : (
//               <Button variant="outlined" onClick={handleCloseModal}>Close</Button>
//             )}
//           </Box>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from 'react-icons/fa';

import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  TablePagination
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

export default function PoliciesHead() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicyForView, setSelectedPolicyForView] = useState(null);
  const [viewerUrl, setViewerUrl] = useState(null);
  const [isViewerLoading, setIsViewerLoading] = useState(false);
  const [viewerContentType, setViewerContentType] = useState(null);
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const EMPLOYEE_ID = localStorage.getItem("loggedInUser") || "1";

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_BASE_URL}/policies/assigned/${EMPLOYEE_ID}/`);
        const policiesData = (res.data.policies || []).sort((a, b) => {
          if (a.acknowledged === b.acknowledged) {
            return b.policy_id - a.policy_id;
          }
          return a.acknowledged ? 1 : -1;
        });
        setPolicies(policiesData);
      } catch (err) {
        setError("Could not load policies. Please try again later.");
        console.error("Failed to fetch policies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, [EMPLOYEE_ID]);

  useEffect(() => {
    if (!selectedPolicyForView || !selectedPolicyForView.attachment_text) {
      setViewerUrl(null); setViewerContentType(null); return;
    }
    const loadContent = async () => {
      setIsViewerLoading(true);
      try {
        const rawText = selectedPolicyForView.attachment_text;
        const filePathFromApi = rawText.startsWith("Text for ") ? rawText.substring("Text for ".length) : rawText;
        const fileExtension = filePathFromApi.split(".").pop().toLowerCase();
        const fullUrl = `${API_BASE_URL}/media/${filePathFromApi}`;
        if (fileExtension === "pdf") {
          const response = await axios.get(fullUrl, { responseType: "blob" });
          const objectUrl = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
          setViewerUrl(objectUrl); setViewerContentType("pdf");
        } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileExtension)) {
          setViewerUrl(fullUrl); setViewerContentType("image");
        } else { setViewerContentType("unsupported"); }
      } catch (error) { console.error("Failed to fetch policy content.", error); setViewerContentType("error"); }
      finally { setIsViewerLoading(false); }
    };
    loadContent();
    return () => { if (viewerUrl && viewerUrl.startsWith("blob:")) URL.revokeObjectURL(viewerUrl); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPolicyForView]);

  const filteredPolicies = policies.filter((policy) =>
    (policy?.policy_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentPolicies = filteredPolicies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleViewClick = (policy) => { setSelectedPolicyForView(policy); setIsModalOpen(true); setIsCheckboxChecked(false); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedPolicyForView(null); setIsCheckboxChecked(false); };

  const handleSubmitAcknowledgment = async () => {
    if (!selectedPolicyForView || !isCheckboxChecked || selectedPolicyForView.acknowledged) return;
    setIsAcknowledging(true);
    try {
      await axios.post(`${API_BASE_URL}/policies/acknowledge/${EMPLOYEE_ID}/`, { policy_id: `${selectedPolicyForView.policy_id}` });
      setPolicies(currentPolicies => currentPolicies.map(p => p.policy_id === selectedPolicyForView.policy_id ? { ...p, acknowledged: true } : p));
      handleCloseModal();
    } catch (err) {
      console.error("Failed to acknowledge policy", err);
      alert("Failed to acknowledge the policy.");
    } finally {
      setIsAcknowledging(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ p: 3 }}>{error}</Typography>;

  return (
    <>
      <style>{`
        .responsive-table {
          width: 100%;
          border-collapse: collapse;
        }
        .responsive-table thead {
          background-color: #8C257C;
        }
        .responsive-table thead th {
            color: #ffffff;
            font-weight: 600;
        }
        .responsive-table th, .responsive-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        .responsive-table tbody tr:hover {
          background-color: #f9f9f9;
        }
        .actions-cell {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
       
        @media (max-width: 768px) {
          .responsive-table thead {
            display: none;
          }
          .responsive-table tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          .responsive-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: right;
            border-bottom: 1px solid #f0f0f0;
            padding: 12px 16px;
          }
          .responsive-table td:last-child {
            border-bottom: none;
          }
          .responsive-table td::before {
            content: attr(data-label);
            font-weight: 600;
            text-align: left;
            margin-right: 1rem;
          }
          .responsive-table td[data-label="ACTIONS"] {
            justify-content: center;
          }
          .responsive-table td[data-label="ACTIONS"]::before {
            display: none;
          }
        }
      `}</style>

      <Container maxWidth="100%" sx={{ py: 4 }}>
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#8C257C' }}>
            Policies
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
              InputProps={{ startAdornment: <InputAdornment position="start"><FaSearch color="gray" /></InputAdornment> }}
            />
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>SR. NO.</th>
                  <th>TITLE</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentPolicies.length > 0 ? (
                  currentPolicies.map((policy, index) => (
                    <tr key={policy.policy_id}>
                      <td data-label="SR. NO.">{page * rowsPerPage + index + 1}</td>
                      <td data-label="TITLE">{policy.policy_name || 'No Title'}</td>
                      <td data-label="STATUS">
                        <Chip
                          label={policy.acknowledged ? 'Acknowledged' : 'Pending'}
                          color={policy.acknowledged ? 'success' : 'default'}
                          sx={!policy.acknowledged ? { backgroundColor: '#F58E35', color: 'white' } : {}}
                          size="small"
                        />
                      </td>
                      <td data-label="ACTIONS" className="actions-cell">
                        <IconButton title="View Policy" color="primary" onClick={() => handleViewClick(policy)}>
                          <VisibilityIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>
                      No policies found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredPolicies.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredPolicies.length)} of {filteredPolicies.length} entries
            </Typography>
            <TablePagination
                component="div"
                count={filteredPolicies.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 25]}
            />
          </Box>
        </Paper>
      </Container>

      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {selectedPolicyForView?.policy_name || 'Policy Viewer'}
          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, height: '70vh', bgcolor: '#f0f0f0', overflow: 'hidden' }}>
          {isViewerLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box> : <>
            {/* toolbar=0 helps hide the browser's PDF toolbar which contains download/print */}
            {viewerContentType === "pdf" && viewerUrl && <iframe src={`${viewerUrl}#toolbar=0`} title="Policy" width="100%" height="100%" style={{ border: "none" }} />}
            {viewerContentType === "image" && viewerUrl && <img src={viewerUrl} alt="Policy" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: 'block', margin: 'auto' }} />}
            {viewerContentType === "unsupported" && <Typography p={3}>Preview is not available for this file type.</Typography>}
            {viewerContentType === "error" && <Typography p={3} color="error">Could not load the document.</Typography>}
            {!viewerContentType && <Typography p={3}>No document attached.</Typography>}
          </>}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {selectedPolicyForView && !selectedPolicyForView.acknowledged && (
            <FormControlLabel
              control={<Checkbox checked={isCheckboxChecked} onChange={(e) => setIsCheckboxChecked(e.target.checked)} sx={{ '&.Mui-checked': { color: '#8C257C' } }} />}
              label="I have read and understood this policy."
            />
          )}
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 }, ml: 'auto' }}>
            {selectedPolicyForView && !selectedPolicyForView.acknowledged ? (
              <Button variant="contained" onClick={handleSubmitAcknowledgment} disabled={!isCheckboxChecked || isAcknowledging} sx={{ 
                backgroundColor: '#8C257C', 
                '&:hover': { backgroundColor: '#731e65' } 
              }}>
                {isAcknowledging ? <CircularProgress size={24} color="inherit" /> : 'Acknowledge'}
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleCloseModal}>Close</Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}