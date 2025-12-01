"use client"

// import React, { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
//   Paper,
//   IconButton,
//   Tooltip,
//   Link as MuiLink,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Stack,
//   Divider,
// } from "@mui/material"
// import {
//   CloudUpload as CloudUploadIcon,
//   Visibility as VisibilityIcon,
//   Delete as DeleteIcon,
//   Sync as SyncIcon,
// } from "@mui/icons-material"
// import axiosInstance from "../utils/axiosInstance";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// // The component now accepts an 'onBack' prop
// const DocumentManager = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [documents, setDocuments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);

//   // State for the "Add New Document" form
//   const [newFile, setNewFile] = useState(null);
//   const [newDocumentName, setNewDocumentName] = useState("");
//   const [newDocumentType, setNewDocumentType] = useState("");

//   const fetchDocuments = async () => {
//     if (!employeeId) {
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);
//       if (response.data.status === "success") {
//         setDocuments(response.data.docs || []);
//       } else {
//         setDocuments([]);
//       }
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       setDocuments([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, [employeeId]);

//   // --- CRUD OPERATIONS ---

//   const handleAddNewDocument = async () => {
//     if (!newFile || !newDocumentName || !newDocumentType || !employeeId) {
//       alert("Please provide a document name, type, and choose a file.");
//       return;
//     }

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("user_id", employeeId);
//     formData.append("company_id", 2);
//     formData.append("document_file", newFile);
//     formData.append("document_type", newDocumentType);
//     formData.append("document_name", newDocumentName);

//     try {
//       await axiosInstance.post("/api/document_details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Document uploaded successfully!");
//       setNewFile(null);
//       setNewDocumentName("");
//       setNewDocumentType("");
//       fetchDocuments();
//     } catch (error) {
//       console.error("Error uploading new document:", error);
//       alert("Failed to upload document.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleReplaceFile = async (event, documentToUpdate) => {
//     const file = event.target.files[0];
//     if (!file || !employeeId) return;

//     const formData = new FormData();
//     formData.append("document_id", documentToUpdate.document_id);
//     formData.append("user_id", employeeId);
//     formData.append("company_id", 2);
//     formData.append("document_file", file);
//     formData.append("document_name", documentToUpdate.document_name);
//     formData.append("document_type", documentToUpdate.document_type);

//     try {
//       await axiosInstance.patch("/api/document_details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Document replaced successfully!");
//       fetchDocuments();
//     } catch (error) {
//       console.error("Error replacing document:", error);
//       alert("Failed to replace document.");
//     }
//   };

//   const handleDelete = async (documentId) => {
//     if (!window.confirm("Are you sure you want to delete this document?")) return;

//     try {
//       await axiosInstance.delete("/api/document_details/", {
//         data: { document_id: documentId, user_id: employeeId },
//       });
//       alert("Document deleted successfully!");
//       fetchDocuments();
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       alert("Failed to delete document.");
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Documents
//       </Typography>
//       <Paper elevation={2} sx={{ mb: 4 }}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold" } }}>
//                 <TableCell>DOCUMENT NAME</TableCell>
//                 <TableCell align="center">ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={2} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : documents.length > 0 ? (
//                 documents.map((doc) => (
//                   <TableRow key={doc.document_id}>
//                     <TableCell>{doc.document_name}</TableCell>
//                     <TableCell align="center">
//                       <Stack direction="row" spacing={1} justifyContent="center">
//                         <Tooltip title="Download/View">
//                           <MuiLink href={`${API_BASE_URL}${doc.document_file}`} target="_blank" rel="noopener noreferrer">
//                             <IconButton color="primary"><VisibilityIcon /></IconButton>
//                           </MuiLink>
//                         </Tooltip>
//                         <Tooltip title="Replace File (Edit)">
//                           <IconButton color="info" component="label">
//                             <SyncIcon />
//                             <input type="file" hidden onChange={(e) => handleReplaceFile(e, doc)} />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton color="error" onClick={() => handleDelete(doc.document_id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={2} align="center">
//                     No documents found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
      
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Add New Document
//       </Typography>
//       <Paper elevation={2} sx={{ p: 3 }}>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Document Name"
//               variant="outlined"
//               fullWidth
//               required
//               value={newDocumentName}
//               onChange={(e) => setNewDocumentName(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Document Type"
//               variant="outlined"
//               fullWidth
//               required
//               value={newDocumentType}
//               onChange={(e) => setNewDocumentType(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Button variant="contained" component="label" fullWidth>
//               {newFile ? newFile.name.substring(0, 25) + '...' : "Choose File..."}
//               <input type="file" hidden onChange={(e) => setNewFile(e.target.files[0])} />
//             </Button>
//           </Grid>
//         </Grid>
//         <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
//           Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
//         </Typography>
//         <Divider sx={{ my: 2 }} />
//         {/* Container for the buttons */}
//         <Stack direction="row" spacing={2}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={onBack}
//             >
//               Back
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               disabled={isUploading}
//               onClick={handleAddNewDocument}
//             >
//               {isUploading ? <CircularProgress size={24} color="inherit" /> : "Add Document"}
//             </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default DocumentManager;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
//   Paper,
//   IconButton,
//   Tooltip,
//   Link as MuiLink,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Stack,
//   Divider,
//   Alert,
// } from "@mui/material";
// import {
//   CloudUpload as CloudUploadIcon,
//   Visibility as VisibilityIcon,
//   Delete as DeleteIcon,
//   Sync as SyncIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../utils/axiosInstance";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// // The component now accepts an 'onBack' prop
// const DocumentManager = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [documents, setDocuments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);

//   // State for the "Add New Document" form
//   const [newFile, setNewFile] = useState(null);
//   const [newDocumentName, setNewDocumentName] = useState("");
//   const [newDocumentType, setNewDocumentType] = useState("");

//   // 1. State for handling messages
//   const [tableMessage, setTableMessage] = useState({ text: "", type: "" });
//   const [formMessage, setFormMessage] = useState({ text: "", type: "" });

//   const fetchDocuments = async () => {
//     if (!employeeId) {
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);
//       if (response.data.status === "success") {
//         setDocuments(response.data.docs || []);
//       } else {
//         setDocuments([]);
//       }
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       setDocuments([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, [employeeId]);

//   // --- CRUD OPERATIONS ---

//   const handleAddNewDocument = async () => {
//     setFormMessage({ text: "", type: "" }); // Clear previous form messages
//     if (!newFile || !newDocumentName || !newDocumentType || !employeeId) {
//       setFormMessage({ text: "Please provide a document name, type, and choose a file.", type: "error" });
//       return;
//     }

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("user_id", employeeId);
//     formData.append("company_id", 2);
//     formData.append("document_file", newFile);
//     formData.append("document_type", newDocumentType);
//     formData.append("document_name", newDocumentName);

//     try {
//       await axiosInstance.post("/api/document_details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setFormMessage({ text: "Document uploaded successfully!", type: "success" });
//       setNewFile(null);
//       setNewDocumentName("");
//       setNewDocumentType("");
//       fetchDocuments();
//     } catch (error) {
//       console.error("Error uploading new document:", error);
//       const errorMessage = error.response?.data?.message || "Failed to upload document.";
//       setFormMessage({ text: errorMessage, type: "error" });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleReplaceFile = async (event, documentToUpdate) => {
//     setTableMessage({ text: "", type: "" }); // Clear previous table messages
//     const file = event.target.files[0];
//     if (!file || !employeeId) return;

//     const formData = new FormData();
//     formData.append("document_id", documentToUpdate.document_id);
//     formData.append("user_id", employeeId);
//     formData.append("company_id", 2);
//     formData.append("document_file", file);
//     formData.append("document_name", documentToUpdate.document_name);
//     formData.append("document_type", documentToUpdate.document_type);

//     try {
//       await axiosInstance.patch("/api/document_details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setTableMessage({ text: "Document replaced successfully!", type: "success" });
//       fetchDocuments();
//     } catch (error) {
//       console.error("Error replacing document:", error);
//       const errorMessage = error.response?.data?.message || "Failed to replace document.";
//       setTableMessage({ text: errorMessage, type: "error" });
//     }
//   };

//   const handleDelete = async (documentId) => {
//     setTableMessage({ text: "", type: "" }); // Clear previous table messages
//     if (!window.confirm("Are you sure you want to delete this document?")) return;

//     try {
//       await axiosInstance.delete("/api/document_details/", {
//         data: { document_id: documentId, user_id: employeeId },
//       });
//       setTableMessage({ text: "Document deleted successfully!", type: "success" });
//       fetchDocuments();
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       const errorMessage = error.response?.data?.message || "Failed to delete document.";
//       setTableMessage({ text: errorMessage, type: "error" });
//     }
//   };

//   // --- Handlers to clear form message on input change ---
//   const handleNameChange = (e) => {
//     setFormMessage({ text: "", type: "" });
//     setNewDocumentName(e.target.value);
//   }
//   const handleTypeChange = (e) => {
//     setFormMessage({ text: "", type: "" });
//     setNewDocumentType(e.target.value);
//   }
//   const handleFileChange = (e) => {
//     setFormMessage({ text: "", type: "" });
//     setNewFile(e.target.files[0]);
//   }


//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Documents
//       </Typography>
      
//       {/* 2. Alert for table actions */}
//       {tableMessage.text && (
//         <Alert
//           severity={tableMessage.type}
//           onClose={() => setTableMessage({ text: '', type: '' })}
//           sx={{ mb: 2 }}
//         >
//           {tableMessage.text}
//         </Alert>
//       )}

//       <Paper elevation={2} sx={{ mb: 4 }}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold" } }}>
//                 <TableCell>DOCUMENT NAME</TableCell>
//                 <TableCell align="center">ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={2} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : documents.length > 0 ? (
//                 documents.map((doc) => (
//                   <TableRow key={doc.document_id}>
//                     <TableCell>{doc.document_name}</TableCell>
//                     <TableCell align="center">
//                       <Stack direction="row" spacing={1} justifyContent="center">
//                         <Tooltip title="Download/View">
//                           <MuiLink href={`${API_BASE_URL}${doc.document_file}`} target="_blank" rel="noopener noreferrer">
//                             <IconButton color="primary"><VisibilityIcon /></IconButton>
//                           </MuiLink>
//                         </Tooltip>
//                         <Tooltip title="Replace File (Edit)">
//                           <IconButton color="info" component="label">
//                             <SyncIcon />
//                             <input type="file" hidden onChange={(e) => handleReplaceFile(e, doc)} />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton color="error" onClick={() => handleDelete(doc.document_id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={2} align="center">
//                     No documents found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
      
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Add New Document
//       </Typography>
//       <Paper elevation={2} sx={{ p: 3 }}>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Document Name"
//               variant="outlined"
//               fullWidth
//               required
//               value={newDocumentName}
//               onChange={handleNameChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Document Type"
//               variant="outlined"
//               fullWidth
//               required
//               value={newDocumentType}
//               onChange={handleTypeChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Button variant="contained" component="label" fullWidth>
//               {newFile ? newFile.name.substring(0, 25) + '...' : "Choose File..."}
//               <input type="file" hidden onChange={handleFileChange} />
//             </Button>
//           </Grid>
//         </Grid>
//         <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
//           Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
//         </Typography>
//         <Divider sx={{ my: 2 }} />
        
//         {/* 3. Container for the buttons and form message */}
//         <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
//           {formMessage.text && (
//             <Alert
//               severity={formMessage.type}
//               onClose={() => setFormMessage({ text: '', type: '' })}
//               sx={{ flex: '1 1 auto', mr: 'auto' }}
//             >
//               {formMessage.text}
//             </Alert>
//           )}
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={onBack}
//           >
//             Back
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={isUploading}
//             onClick={handleAddNewDocument}
//           >
//             {isUploading ? <CircularProgress size={24} color="inherit" /> : "Add Document"}
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default DocumentManager;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
//   Paper,
//   IconButton,
//   Tooltip,
//   Link as MuiLink, // Keep MuiLink if you still use it elsewhere, though for the eye icon we'll use a standard link
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Stack,
//   Divider,
//   Alert,
// } from "@mui/material";
// import {
//   CloudUpload as CloudUploadIcon,
//   Visibility as VisibilityIcon,
//   Delete as DeleteIcon,
//   Sync as SyncIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../utils/axiosInstance";
 
// // The component now accepts an 'onBack' prop
// const DocumentManager = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");
 
//   const [documents, setDocuments] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isViewing, setIsViewing] = useState(null); // To track which document is being viewed
 
//   // State for the "Add New Document" form
//   const [newFile, setNewFile] = useState(null);
//   const [newDocumentName, setNewDocumentName] = useState("");
//   const [newDocumentType, setNewDocumentType] = useState("");
 
//   // 1. State for handling messages
//   const [tableMessage, setTableMessage] = useState({ text: "", type: "" });
//   const [formMessage, setFormMessage] = useState({ text: "", type: "" });
 
//   const fetchDocuments = async () => {
//     if (!employeeId) {
//       setIsLoading(false);
//       setTableMessage({ text: "Employee ID not found. Cannot fetch documents.", type: "error" });
//       return;
//     }
//     setIsLoading(true);
//     setTableMessage({ text: "", type: "" }); // Clear previous messages
//     try {
//       // Use the specific API for listing documents, which you've already integrated
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);
//       if (response.data.status === "success") {
//         setDocuments(response.data.docs || []);
//         if (response.data.docs && response.data.docs.length === 0) {
//             setTableMessage({ text: "No documents found.", type: "info" });
//         }
//       } else {
//         setDocuments([]);
//         setTableMessage({ text: response.data.message || "Failed to fetch documents.", type: "error" });
//       }
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       setDocuments([]);
//       setTableMessage({ text: "Error connecting to the server to fetch documents.", type: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     fetchDocuments();
//   }, [employeeId]);
 
//   // --- CRUD OPERATIONS ---
 
//   const handleAddNewDocument = async () => {
//     setFormMessage({ text: "", type: "" }); // Clear previous form messages
//     if (!newFile || !newDocumentName || !newDocumentType || !employeeId) {
//       setFormMessage({ text: "Please provide a document name, type, and choose a file.", type: "error" });
//       return;
//     }
 
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("user_id", employeeId);
//     formData.append("company_id", 2); // Assuming company_id is always 2
//     formData.append("document_file", newFile);
//     formData.append("document_type", newDocumentType);
//     formData.append("document_name", newDocumentName);
 
//     try {
//       await axiosInstance.post("/api/document_details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setFormMessage({ text: "Document uploaded successfully!", type: "success" });
//       setNewFile(null);
//       setNewDocumentName("");
//       setNewDocumentType("");
//       fetchDocuments(); // Re-fetch documents to show the new one
//     } catch (error) {
//       console.error("Error uploading new document:", error);
//       const errorMessage = error.response?.data?.message || "Failed to upload document.";
//       setFormMessage({ text: errorMessage, type: "error" });
//     } finally {
//       setIsUploading(false);
//     }
//   };
 
//   const handleReplaceFile = async (event, documentToUpdate) => {
//     setTableMessage({ text: "", type: "" }); // Clear previous table messages
//     const file = event.target.files[0];
//     if (!file || !employeeId) {
//         setTableMessage({ text: "No file selected or employee ID missing.", type: "error" });
//         return;
//     }
 
//     // Optional: Add client-side file type validation here if needed
//     // For example: if (!['image/jpeg', 'application/pdf'].includes(file.type)) { /* error */ }
 
//     const formData = new FormData();
//     formData.append("document_id", documentToUpdate.document_id);
//     formData.append("user_id", employeeId);
//     formData.append("company_id", 2); // Assuming company_id is always 2
//     formData.append("document_file", file);
//     formData.append("document_name", documentToUpdate.document_name);
//     formData.append("document_type", documentToUpdate.document_type);
 
//     try {
//       await axiosInstance.patch("/api/document_details/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setTableMessage({ text: "Document replaced successfully!", type: "success" });
//       fetchDocuments(); // Re-fetch documents to show the updated one
//     } catch (error) {
//       console.error("Error replacing document:", error);
//       const errorMessage = error.response?.data?.message || "Failed to replace document.";
//       setTableMessage({ text: errorMessage, type: "error" });
//     }
//   };
 
//   const handleDelete = async (documentId) => {
//     setTableMessage({ text: "", type: "" }); // Clear previous table messages
//     if (!window.confirm("Are you sure you want to delete this document?")) return;
//     if (!employeeId) {
//         setTableMessage({ text: "Employee ID not found. Cannot delete document.", type: "error" });
//         return;
//     }
 
//     try {
//       await axiosInstance.delete("/api/document_details/", {
//         data: { document_id: documentId, user_id: employeeId },
//       });
//       setTableMessage({ text: "Document deleted successfully!", type: "success" });
//       fetchDocuments(); // Re-fetch documents to update the list
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       const errorMessage = error.response?.data?.message || "Failed to delete document.";
//       setTableMessage({ text: errorMessage, type: "error" });
//     }
//   };
 
//   // --- New function to handle viewing document ---
//   const handleViewDocument = async (docId) => {
//     setTableMessage({ text: "", type: "" }); // Clear previous table messages
//     if (!employeeId) {
//       setTableMessage({ text: "Employee ID not found. Cannot view document.", type: "error" });
//       return;
//     }
//     setIsViewing(docId); // Set the document being viewed to show a loader
 
//     try {
//       // Use the provided API endpoint to get document details specific to the user
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);
 
//       if (response.data.status === "success" && response.data.docs) {
//         // Find the specific document by its ID from the fetched list
//         const foundDoc = response.data.docs.find(doc => doc.document_id === docId);
 
//         if (foundDoc && foundDoc.document_file) {
//           // Construct the full URL, assuming the domain is missing from the document_file string
//           // If the document_file string already contains the full domain, adjust this line
//           const fullDocumentUrl = `https://${foundDoc.document_file}`;
//           window.open(fullDocumentUrl, "_blank");
//         } else {
//           setTableMessage({ text: "Document file not found or invalid.", type: "error" });
//         }
//       } else {
//         setTableMessage({ text: response.data.message || "Failed to retrieve document details.", type: "error" });
//       }
//     } catch (error) {
//       console.error("Error fetching document for view:", error);
//       setTableMessage({ text: "Error connecting to the server to view document.", type: "error" });
//     } finally {
//       setIsViewing(null); // Reset the viewing state
//     }
//   };
 
 
//   // --- Handlers to clear form message on input change ---
//   const handleNameChange = (e) => {
//     setFormMessage({ text: "", type: "" });
//     setNewDocumentName(e.target.value);
//   }
//   const handleTypeChange = (e) => {
//     setFormMessage({ text: "", type: "" });
//     setNewDocumentType(e.target.value);
//   }
//   const handleFileChange = (e) => {
//     setFormMessage({ text: "", type: "" });
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//         // Optional: Client-side file type validation for new uploads
//         const allowedTypes = ['png', 'jpg', 'jpeg', 'gif', 'txt', 'pdf', 'xls', 'xlsx', 'doc', 'docx'];
//         const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
 
//         if (!allowedTypes.includes(fileExtension)) {
//             setFormMessage({ text: "Unsupported file type. Please upload a valid document.", type: "error" });
//             setNewFile(null); // Clear the file input
//             return;
//         }
//     }
//     setNewFile(selectedFile);
//   }
 
 
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Documents
//       </Typography>
 
//       {/* 2. Alert for table actions */}
//       {tableMessage.text && (
//         <Alert
//           severity={tableMessage.type}
//           onClose={() => setTableMessage({ text: '', type: '' })}
//           sx={{ mb: 2 }}
//         >
//           {tableMessage.text}
//         </Alert>
//       )}
 
//       <Paper elevation={2} sx={{ mb: 4 }}>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold" } }}>
//                 <TableCell>DOCUMENT NAME</TableCell>
//                 <TableCell align="center">ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={2} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : documents.length > 0 ? (
//                 documents.map((doc) => (
//                   <TableRow key={doc.document_id}>
//                     <TableCell>{doc.document_name}</TableCell>
//                     <TableCell align="center">
//                       <Stack direction="row" spacing={1} justifyContent="center">
//                         <Tooltip title="View Document">
//                           {/* Use an IconButton with onClick handler */}
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleViewDocument(doc.document_id)}
//                             disabled={isViewing === doc.document_id} // Disable while viewing this specific doc
//                           >
//                             {isViewing === doc.document_id ? (
//                                 <CircularProgress size={20} color="inherit" />
//                             ) : (
//                                 <VisibilityIcon />
//                             )}
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Replace File (Edit)">
//                           <IconButton color="info" component="label">
//                             <SyncIcon />
//                             <input type="file" hidden onChange={(e) => handleReplaceFile(e, doc)} />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton color="error" onClick={() => handleDelete(doc.document_id)}>
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={2} align="center">
//                     {/* No documents found message is now handled by tableMessage */}
//                     {!tableMessage.text && "No documents found."}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
 
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Add New Document
//       </Typography>
//       <Paper elevation={2} sx={{ p: 3 }}>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Document Name"
//               variant="outlined"
//               fullWidth
//               required
//               value={newDocumentName}
//               onChange={handleNameChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Document Type"
//               variant="outlined"
//               fullWidth
//               required
//               value={newDocumentType}
//               onChange={handleTypeChange}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Button variant="contained" component="label" fullWidth>
//               {newFile ? newFile.name.substring(0, 25) + '...' : "Choose File..."}
//               <input type="file" hidden onChange={handleFileChange} />
//             </Button>
//           </Grid>
//         </Grid>
//         <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>
//           Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
//         </Typography>
//         <Divider sx={{ my: 2 }} />
 
//         {/* 3. Container for the buttons and form message */}
//         <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
//           {formMessage.text && (
//             <Alert
//               severity={formMessage.type}
//               onClose={() => setFormMessage({ text: '', type: '' })}
//               sx={{ flex: '1 1 auto', mr: 'auto' }}
//             >
//               {formMessage.text}
//             </Alert>
//           )}
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={onBack}
//           >
//             Back
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={isUploading || !newFile || !newDocumentName || !newDocumentType} // Disable if fields are empty
//             onClick={handleAddNewDocument}
//           >
//             {isUploading ? <CircularProgress size={24} color="inherit" /> : "Add Document"}
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };
 
// export default DocumentManager




import React, { useState, useEffect } from "react";

import {

  Box,

  Typography,

  Button,

  Grid,

  CircularProgress,

  Paper,

  IconButton,

  Tooltip,

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  TextField,

  Stack,

  Divider,

  Alert,

} from "@mui/material";

import {

  CloudUpload as CloudUploadIcon,

  Visibility as VisibilityIcon,

  Delete as DeleteIcon,

  Sync as SyncIcon,

} from "@mui/icons-material";

import axiosInstance from "../utils/axiosInstance";

 

// The component now accepts an 'onBack' prop

const DocumentManager = ({ onBack }) => {

  // Retrieve employee ID and email from localStorage

  const employeeId = localStorage.getItem("loggedInEmpId");

  // Corrected: Fetch email using the key "EmailID" as per your login session setup

  const employeeEmail = localStorage.getItem("EmailID");

 

  // State for the existing "Documents" table (API: /api/document_details/)

  const [documents, setDocuments] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [isUploading, setIsUploading] = useState(false);

  const [isViewing, setIsViewing] = useState(null); // To track which document is being viewed (for first table)

 

  // State for the NEW "My Documents" table (API: /fetch_documents/)

  const [myDocuments, setMyDocuments] = useState([]);

  const [isLoadingMyDocuments, setIsLoadingMyDocuments] = useState(true);

  const [isViewingMyDoc, setIsViewingMyDoc] = useState(null); // To track which document is being viewed (for second table)

 

  // State for the "Add New Document" form

  const [newFile, setNewFile] = useState(null);

  const [newDocumentName, setNewDocumentName] = useState("");

  const [newDocumentType, setNewDocumentType] = useState("");

 

  // State for handling messages

  const [tableMessage, setTableMessage] = useState({ text: "", type: "" }); // For the first "My Uploaded Documents" table

  const [myDocumentsTableMessage, setMyDocumentsTableMessage] = useState({ text: "", type: "" }); // For the "Company Provided Documents" table

  const [formMessage, setFormMessage] = useState({ text: "", type: "" }); // For the "Add New Document" form

 

  // Function to fetch documents for the first table (user-uploaded documents)

  const fetchDocuments = async () => {

    if (!employeeId) {

      setIsLoading(false);

      setTableMessage({ text: "Employee ID not found. Cannot fetch documents.", type: "error" });

      return;

    }

    setIsLoading(true);

    setTableMessage({ text: "", type: "" }); // Clear previous messages

    try {

      const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);

      if (response.data.status === "success") {

        setDocuments(response.data.docs || []);

        if (response.data.docs && response.data.docs.length === 0) {

          setTableMessage({ text: "No documents found.", type: "info" });

        }

      } else {

        setDocuments([]);

        setTableMessage({ text: response.data.message || "Failed to fetch documents.", type: "error" });

      }

    } catch (error) {

      console.error("Error fetching documents:", error);

      setDocuments([]);

      setTableMessage({ text: "Error connecting to the server to fetch documents.", type: "error" });

    } finally {

      setIsLoading(false);

    }

  };

 

  // Function to fetch documents for the second table ("Company Provided Documents" from specific API)

  const fetchMyDocuments = async () => {

    if (!employeeEmail) {

      setIsLoadingMyDocuments(false);

      setMyDocumentsTableMessage({ text: "Employee email not found. Cannot fetch 'Company Provided Documents'.", type: "error" });

      return;

    }

    setIsLoadingMyDocuments(true);

    setMyDocumentsTableMessage({ text: "", type: "" }); // Clear previous messages

    try {

      // Use axiosInstance for consistency, assuming it's configured for cross-origin requests

      const response = await axiosInstance.post(

        "https://raasbackend.vetrinahealthcare.com/fetch_documents/",

        { email_id: employeeEmail } // Using the correctly fetched employeeEmail

      );

 

      if (response.data.status === "success" && response.data.documents) {

        // Transform the object into an array for easy mapping in the table

        const transformedDocs = Object.entries(response.data.documents).map(([type, url]) => ({

          // Format the document name nicely (e.g., "aadhar" -> "Aadhar", "passport_photo" -> "Passport Photo")

          document_name: type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),

          document_url: url,

        }));

        setMyDocuments(transformedDocs);

        if (transformedDocs.length === 0) {

          setMyDocumentsTableMessage({ text: "No 'Company Provided Documents' found.", type: "info" });

        }

      } else {

        setMyDocuments([]);

        setMyDocumentsTableMessage({ text: response.data.message || "Failed to fetch 'Company Provided Documents'.", type: "error" });

      }

    } catch (error) {

      console.error("Error fetching 'Company Provided Documents':", error);

      setMyDocuments([]);

      setMyDocumentsTableMessage({ text: "Error connecting to the server to fetch 'Company Provided Documents'.", type: "error" });

    } finally {

      setIsLoadingMyDocuments(false);

    }

  };

 

  // Effect hook to fetch data when component mounts or employeeId/employeeEmail changes

  useEffect(() => {

    fetchDocuments();

    fetchMyDocuments(); // Call the new fetch function for "Company Provided Documents"

  }, [employeeId, employeeEmail]); // Re-run if employeeId or employeeEmail changes

 

  // --- CRUD OPERATIONS (for first table: /api/document_details/) ---

 

  const handleAddNewDocument = async () => {

    setFormMessage({ text: "", type: "" }); // Clear previous form messages

    if (!newFile || !newDocumentName || !newDocumentType || !employeeId) {

      setFormMessage({ text: "Please provide a document name, type, and choose a file.", type: "error" });

      return;

    }

 

    setIsUploading(true);

    const formData = new FormData();

    formData.append("user_id", employeeId);

    formData.append("company_id", 2); // Assuming company_id is always 2

    formData.append("document_file", newFile);

    formData.append("document_type", newDocumentType);

    formData.append("document_name", newDocumentName);

 

    try {

      await axiosInstance.post("/api/document_details/", formData, {

        headers: { "Content-Type": "multipart/form-data" },

      });

      setFormMessage({ text: "Document uploaded successfully!", type: "success" });

      setNewFile(null);

      setNewDocumentName("");

      setNewDocumentType("");

      fetchDocuments(); // Re-fetch documents to show the new one in the first table

    } catch (error) {

      console.error("Error uploading new document:", error);

      const errorMessage = error.response?.data?.message || "Failed to upload document.";

      setFormMessage({ text: errorMessage, type: "error" });

    } finally {

      setIsUploading(false);

    }

  };

 

  const handleReplaceFile = async (event, documentToUpdate) => {

    setTableMessage({ text: "", type: "" }); // Clear previous table messages

    const file = event.target.files[0];

    if (!file || !employeeId) {

      setTableMessage({ text: "No file selected or employee ID missing.", type: "error" });

      return;

    }

 

    const formData = new FormData();

    formData.append("document_id", documentToUpdate.document_id);

    formData.append("user_id", employeeId);

    formData.append("company_id", 2); // Assuming company_id is always 2

    formData.append("document_file", file);

    formData.append("document_name", documentToUpdate.document_name);

    formData.append("document_type", documentToUpdate.document_type);

 

    try {

      await axiosInstance.patch("/api/document_details/", formData, {

        headers: { "Content-Type": "multipart/form-data" },

      });

      setTableMessage({ text: "Document replaced successfully!", type: "success" });

      fetchDocuments(); // Re-fetch documents to show the updated one in the first table

    } catch (error) {

      console.error("Error replacing document:", error);

      const errorMessage = error.response?.data?.message || "Failed to replace document.";

      setTableMessage({ text: errorMessage, type: "error" });

    }

  };

 

  const handleDelete = async (documentId) => {

    setTableMessage({ text: "", type: "" }); // Clear previous table messages

    if (!window.confirm("Are you sure you want to delete this document?")) return;

    if (!employeeId) {

      setTableMessage({ text: "Employee ID not found. Cannot delete document.", type: "error" });

      return;

    }

 

    try {

      await axiosInstance.delete("/api/document_details/", {

        data: { document_id: documentId, user_id: employeeId },

      });

      setTableMessage({ text: "Document deleted successfully!", type: "success" });

      fetchDocuments(); // Re-fetch documents to update the list in the first table

    } catch (error) {

      console.error("Error deleting document:", error);

      const errorMessage = error.response?.data?.message || "Failed to delete document.";

      setTableMessage({ text: errorMessage, type: "error" });

    }

  };

 

  // --- Function to handle viewing document (for first table) ---

  const handleViewDocument = async (docId) => {

    setTableMessage({ text: "", type: "" }); // Clear previous table messages

    if (!employeeId) {

      setTableMessage({ text: "Employee ID not found. Cannot view document.", type: "error" });

      return;

    }

    setIsViewing(docId); // Set the document being viewed to show a loader

 

    try {

      // Use the provided API endpoint to get document details specific to the user

      const response = await axiosInstance.get(`/api/document_details/?user_id=${employeeId}`);

 

      if (response.data.status === "success" && response.data.docs) {

        // Find the specific document by its ID from the fetched list

        const foundDoc = response.data.docs.find(doc => doc.document_id === docId);

 

        if (foundDoc && foundDoc.document_file) {

          // Construct the full URL, assuming the domain is missing from the document_file string

          const fullDocumentUrl = `https://${foundDoc.document_file}`;

          window.open(fullDocumentUrl, "_blank");

        } else {

          setTableMessage({ text: "Document file not found or invalid.", type: "error" });

        }

      } else {

        setTableMessage({ text: response.data.message || "Failed to retrieve document details.", type: "error" });

      }

    } catch (error) {

      console.error("Error fetching document for view:", error);

      setTableMessage({ text: "Error connecting to the server to view document.", type: "error" });

    } finally {

      setIsViewing(null); // Reset the viewing state

    }

  };

 

  // NEW: Function to handle viewing document for "Company Provided Documents" table

  const handleViewMyDocument = (docUrl, docName) => {

    setMyDocumentsTableMessage({ text: "", type: "" }); // Clear previous messages

    if (!docUrl) {

      setMyDocumentsTableMessage({ text: `Document URL for ${docName} not found.`, type: "error" });

      return;

    }

    // Directly open the URL as the new API provides the full link

    window.open(docUrl, "_blank");

  };

 

  // --- Handlers to clear form message on input change for the Add New Document form ---

  const handleNameChange = (e) => {

    setFormMessage({ text: "", type: "" });

    setNewDocumentName(e.target.value);

  }

  const handleTypeChange = (e) => {

    setFormMessage({ text: "", type: "" });

    setNewDocumentType(e.target.value);

  }

  const handleFileChange = (e) => {

    setFormMessage({ text: "", type: "" });

    const selectedFile = e.target.files[0];

    if (selectedFile) {

      // Client-side file type validation for new uploads

      const allowedTypes = ['png', 'jpg', 'jpeg', 'gif', 'txt', 'pdf', 'xls', 'xlsx', 'doc', 'docx'];

      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

 

      if (!allowedTypes.includes(fileExtension)) {

        setFormMessage({ text: "Unsupported file type. Please upload a valid document.", type: "error" });

        setNewFile(null); // Clear the file input

        return;

      }

    }

    setNewFile(selectedFile);

  }

 

  return (

    <Box sx={{ p: 3 }}>

      {/* First Table: My Uploaded Documents */}

      <Typography variant="h5" sx={{ mb: 2 }}>

        My Uploaded Documents

      </Typography>

 

      {/* Alert for the first table actions */}

      {tableMessage.text && (

        <Alert

          severity={tableMessage.type}

          onClose={() => setTableMessage({ text: '', type: '' })}

          sx={{ mb: 2 }}

        >

          {tableMessage.text}

        </Alert>

      )}

 

      <Paper elevation={2} sx={{ mb: 4 }}>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold" } }}>

                <TableCell>DOCUMENT NAME</TableCell>

                <TableCell align="center">ACTION</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {isLoading ? (

                <TableRow>

                  <TableCell colSpan={2} align="center">

                    <CircularProgress />

                  </TableCell>

                </TableRow>

              ) : documents.length > 0 ? (

                documents.map((doc) => (

                  <TableRow key={doc.document_id}>

                    <TableCell>{doc.document_name}</TableCell>

                    <TableCell align="center">

                      <Stack direction="row" spacing={1} justifyContent="center">

                        <Tooltip title="View Document">

                          <IconButton

                            color="primary"

                            onClick={() => handleViewDocument(doc.document_id)}

                            disabled={isViewing === doc.document_id}

                          >

                            {isViewing === doc.document_id ? (

                              <CircularProgress size={20} color="inherit" />

                            ) : (

                              <VisibilityIcon />

                            )}

                          </IconButton>

                        </Tooltip>

                        <Tooltip title="Replace File (Edit)">

                          <IconButton color="info" component="label">

                            <SyncIcon />

                            <input type="file" hidden onChange={(e) => handleReplaceFile(e, doc)} />

                          </IconButton>

                        </Tooltip>

                        <Tooltip title="Delete">

                          <IconButton color="error" onClick={() => handleDelete(doc.document_id)}>

                            <DeleteIcon />

                          </IconButton>

                        </Tooltip>

                      </Stack>

                    </TableCell>

                  </TableRow>

                ))

              ) : (

                <TableRow>

                  <TableCell colSpan={2} align="center">

                    {!tableMessage.text && "No documents found."}

                  </TableCell>

                </TableRow>

              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

 

      {/* NEW: Second Table: Company Provided Documents (Fetched from specific API) */}

      <Typography variant="h5" sx={{ mb: 2 }}>

        Company Provided Documents

      </Typography>

 

      {/* Alert for the second table actions */}

      {myDocumentsTableMessage.text && (

        <Alert

          severity={myDocumentsTableMessage.type}

          onClose={() => setMyDocumentsTableMessage({ text: '', type: '' })}

          sx={{ mb: 2 }}

        >

          {myDocumentsTableMessage.text}

        </Alert>

      )}

 

      <Paper elevation={2} sx={{ mb: 4 }}>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow sx={{ "& .MuiTableCell-head": { fontWeight: "bold" } }}>

                <TableCell>DOCUMENT NAME</TableCell>

                <TableCell align="center">ACTION</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {isLoadingMyDocuments ? (

                <TableRow>

                  <TableCell colSpan={2} align="center">

                    <CircularProgress />

                  </TableCell>

                </TableRow>

              ) : myDocuments.length > 0 ? (

                myDocuments.map((doc, index) => (

                  <TableRow key={doc.document_name || index}> {/* Use document_name as key, or index if not unique */}

                    <TableCell>{doc.document_name}</TableCell>

                    <TableCell align="center">

                      <Tooltip title="View Document">

                        <IconButton

                          color="primary"

                          onClick={() => handleViewMyDocument(doc.document_url, doc.document_name)}

                          // The new API's view is direct, no complex loading state needed for the icon itself

                          // If it was a multi-step fetch, you'd use isViewingMyDoc

                        >

                            <VisibilityIcon />

                        </IconButton>

                      </Tooltip>

                      {/* As per the API, these documents are read-only, so no edit/delete actions */}

                    </TableCell>

                  </TableRow>

                ))

              ) : (

                <TableRow>

                  <TableCell colSpan={2} align="center">

                    {!myDocumentsTableMessage.text && "No company provided documents found."}

                  </TableCell>

                </TableRow>

              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

 

      {/* Existing Add New Document Section */}

      <Typography variant="h5" sx={{ mb: 2 }}>

        Add New Document

      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>

        <Grid container spacing={3} alignItems="center">

          <Grid item xs={12} sm={4}>

            <TextField

              label="Document Name"

              variant="outlined"

              fullWidth

              required

              value={newDocumentName}

              onChange={handleNameChange}

            />

          </Grid>

          <Grid item xs={12} sm={4}>

            <TextField

              label="Document Type"

              variant="outlined"

              fullWidth

              required

              value={newDocumentType}

              onChange={handleTypeChange}

            />

          </Grid>

          <Grid item xs={12} sm={4}>

            <Button variant="contained" component="label" fullWidth>

              {newFile ? newFile.name.substring(0, 25) + '...' : "Choose File..."}

              <input type="file" hidden onChange={handleFileChange} />

            </Button>

          </Grid>

        </Grid>

        <Typography variant="caption" display="block" sx={{ mt: 1, color: "text.secondary" }}>

          Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx

        </Typography>

        <Divider sx={{ my: 2 }} />

 

        {/* Container for the buttons and form message */}

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">

          {formMessage.text && (

            <Alert

              severity={formMessage.type}

              onClose={() => setFormMessage({ text: '', type: '' })}

              sx={{ flex: '1 1 auto', mr: 'auto' }}

            >

              {formMessage.text}

            </Alert>

          )}

          <Button

            variant="outlined"

            color="secondary"

            onClick={onBack}

          >

            Back

          </Button>

          <Button

            variant="contained"

            color="primary"

            disabled={isUploading || !newFile || !newDocumentName || !newDocumentType}

            onClick={handleAddNewDocument}

          >

            {isUploading ? <CircularProgress size={24} color="inherit" /> : "Add Document"}

          </Button>

        </Stack>

      </Paper>

    </Box>

  );

};

 

export default DocumentManager;