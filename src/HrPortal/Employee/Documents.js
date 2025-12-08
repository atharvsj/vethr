// import React, { useEffect, useState ,useContext} from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   IconButton,
//   Typography,
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance'; // Adjust path if needed


// const Documents = () => {
//   const [documents, setDocuments] = useState([]);
//   const [form, setForm] = useState({ name: '', type: '', file: null });
//   const [editMode, setEditMode] = useState(false);
//   const [editDocId, setEditDocId] = useState(null);
//    const [hoveredRow, setHoveredRow] = useState(null);
//    const { employeeId } = useContext(EmployeeContext);
   
//    const userId = employeeId ;
//    const companyId = 2;


//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${userId}`);
//       if (response.data.status === 'success') {
//         const docs = response.data.docs.map((doc) => ({
//           id: doc.document_id,
//           name: doc.document_name,
//           type: doc.document_type,
//           fileUrl: `https://tdtlworld.com/hrms-backend${doc.document_file}/`,
//         }));
//         setDocuments(docs);
//       }
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm({
//       ...form,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('user_id', userId);
//     formData.append('company_id', companyId);
//     formData.append('document_name', form.name);
//     formData.append('document_type', form.type);
//     if (form.file) {
//       formData.append('document_file', form.file);
//     }

//     try {
//       if (editMode && editDocId !== null) {
//         formData.append('document_id', editDocId);
//         await axiosInstance.patch('/api/document_details/', formData);
//       } else {
//         await axiosInstance.post('/api/document_details/', formData);
//       }
//       fetchDocuments();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving document:', error);
//     }
//   };

//   const handleEdit = (doc) => {
//     setForm({
//       name: doc.name,
//       type: doc.type,
//       file: null, // Reset file input
//     });
//     setEditDocId(doc.id);
//     setEditMode(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete('/api/document_details/', {
//         data: { document_id: id },
//       });
//       fetchDocuments();
//     } catch (error) {
//       console.error('Error deleting document:', error);
//     }
//   };

//   const resetForm = () => {
//     setForm({ name: '', type: '', file: null });
//     setEditMode(false);
//     setEditDocId(null);
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" gutterBottom>
//         Documents
//       </Typography>

//       {/* <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>DOCUMENT NAME</strong></TableCell>
//               <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
//               <TableCell><strong>DOCUMENT FILE</strong></TableCell>
//               <TableCell><strong>ACTIONS</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody >
//             {documents.map((doc) => (
//               <TableRow key={doc.id}>
//                 <TableCell>{doc.name}</TableCell>
//                 <TableCell>{doc.type}</TableCell>
//                 <TableCell>
//                   <a href={doc.fileUrl} download>
//                     Download
//                   </a>
//                 </TableCell>
//                 <TableCell>
//                   <IconButton title="Edit" size="small" color="primary" onClick={() => handleEdit(doc)}>
//                     <Edit fontSize="small" />
//                   </IconButton>
//                   <IconButton title="Delete" size="small" color="error" onClick={() => handleDelete(doc.id)}>
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>  */}

//        <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>DOCUMENT NAME</strong></TableCell>
//               <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
//               <TableCell><strong>DOCUMENT FILE</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {documents.map((doc) => (
//               <TableRow
//                 key={doc.id}
//                 onMouseEnter={() => setHoveredRow(doc.id)}
//                 onMouseLeave={() => setHoveredRow(null)}
//               >
//                 <TableCell>
//                   {hoveredRow === doc.id ? (
//                     <>
//                        <IconButton title="Edit" size="small" color="primary" onClick={() => handleEdit(doc)}>
//                     <Edit fontSize="small" />
//                   </IconButton>
//                   <IconButton title="Delete" size="small" color="error" onClick={() => handleDelete(doc.id)}>
//                     <Delete fontSize="small" />
//                   </IconButton>
//                     </>
//                   ) : (
//                     doc.name
//                   )}
//                 </TableCell>
//                 <TableCell>{doc.type}</TableCell>
//                 <TableCell>
//                   <a href={doc.fileUrl} download>
//                     Download
//                   </a>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer> 
     

//       <Box mt={3}>
//         <Typography variant="subtitle1">
//           {editMode ? 'Edit Document' : 'Add New Document'}
//         </Typography>
//         <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
//           <TextField
//             label="Document Name"
//             name="name"
//             required
//             value={form.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Document Type"
//             name="type"
//             required
//             value={form.type}
//             onChange={handleChange}
//           />
//           <Button variant="contained" component="label">
//             Choose file...
//             <input
//               type="file"
//               name="file"
//               accept=".png,.jpg,.jpeg,.gif,.txt,.pdf,.xls,.xlsx,.doc,.docx"
//               hidden
//               onChange={handleChange}
//             />
//           </Button>
//         </Box>
//         <Typography variant="caption" color="text.secondary" mt={1} display="block">
//           Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
//         </Typography>
//         <Box mt={2}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             {editMode ? 'Update Document' : 'Add Document'}
//           </Button>
//           {editMode && (
//             <Button onClick={resetForm} sx={{ ml: 2 }}>
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// // export default Documents;
// import React, { useEffect, useState, useContext, useCallback } from 'react';
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   IconButton,
//   Typography,
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';
// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// const Documents = () => {
//   const [documents, setDocuments] = useState([]);
//   const [form, setForm] = useState({ name: '', type: '', file: null, fileName: '' });
//   const [editMode, setEditMode] = useState(false);
//   const [editDocId, setEditDocId] = useState(null);
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;
//   const companyId = 2; // Assuming this is static

//   const fetchDocuments = useCallback(async () => {
//       console.log('User ID:', userId); // Log the user ID
//     if (!userId) return; // Don't fetch if no user ID
//     try {
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${userId}`);
//       if (response.data.status === 'success') {
//         const docs = response.data.docs.map((doc) => ({
//           id: doc.document_id,
//           name: doc.document_name,
//           type: doc.document_type,
//           // Correct the base URL if needed
//           fileUrl: `https://raasbackend.vetrinahealthcare.com${doc.document_file}`,
//         }));
//         setDocuments(docs);
//       }
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load documents. Please try refreshing the page.',
//       });
//     }
//   }, [userId]);

//   useEffect(() => {
//     fetchDocuments();
//   }, [fetchDocuments]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0]) {
//       setForm({
//         ...form,
//         file: files[0],
//         fileName: files[0].name,
//       });
//     } else {
//       setForm({
//         ...form,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     // Add validation for userId
//     if (!userId) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'User ID is not available. Please refresh the page and try again.'
//         });
//         return;
//     }

//     // 2. Use Swal for validation
//     if (!form.name || !form.type) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Missing Fields',
//             text: 'Please provide both a Document Name and Document Type.'
//         });
//         return;
//     }
//     if (!editMode && !form.file) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Missing File',
//             text: 'Please choose a file to upload for the new document.'
//         });
//         return;
//     }

//     const formData = new FormData();
//     formData.append('user_id', userId);
//     formData.append('company_id', companyId);
//     formData.append('document_name', form.name);
//     formData.append('document_type', form.type);
//     if (form.file) {
//       formData.append('document_file', form.file);
//     }

//     const action = editMode ? 'Updating' : 'Adding';

//     // 3. Add loading state with Swal
//     Swal.fire({
//         title: `${action} Document...`,
//         text: 'Please wait.',
//         allowOutsideClick: false,
//         didOpen: () => {
//             Swal.showLoading();
//         }
//     });

//     try {
//       if (editMode && editDocId !== null) {
//         formData.append('document_id', editDocId);
//         await axiosInstance.patch('/api/document_details/', formData);
//       } else {
//         await axiosInstance.post('/api/document_details/', formData);
//       }
      
//       Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: `Document has been ${editMode ? 'updated' : 'added'} successfully.`
//       });
      
//       await fetchDocuments();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving document:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//           icon: 'error',
//           title: 'Operation Failed',
//           text: errorMessage
//       });
//     }
//   };
//   const handleEdit = (doc) => {
//     setForm({
//       name: doc.name,
//       type: doc.type,
//       file: null,
//       fileName: 'Choose a new file to replace (optional)',
//     });
//     setEditDocId(doc.id);
//     setEditMode(true);
//   };

//   const handleDelete = async (id) => {
//     // 4. Add confirmation dialog before deleting
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/document_details/', {
//             data: { document_id: id },
//           });
//           Swal.fire(
//             'Deleted!',
//             'The document has been deleted.',
//             'success'
//           );
//           await fetchDocuments();
//         } catch (error) {
//           console.error('Error deleting document:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the document.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };

//   const resetForm = () => {
//     setForm({ name: '', type: '', file: null, fileName: '' });
//     setEditMode(false);
//     setEditDocId(null);
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" gutterBottom>
//         Documents
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>DOCUMENT NAME</strong></TableCell>
//               <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
//               <TableCell><strong>DOCUMENT FILE</strong></TableCell>
//               <TableCell align="right"><strong>ACTIONS</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody >
//             {documents.length === 0 ? (
//                 <TableRow>
//                     <TableCell colSpan={4} align="center">No documents found.</TableCell>
//                 </TableRow>
//             ) : (
//                 documents.map((doc) => (
//                     <TableRow key={doc.id}>
//                         <TableCell>{doc.name}</TableCell>
//                         <TableCell>{doc.type}</TableCell>
//                         <TableCell>
//                         <Button
//                             variant="text"
//                             size="small"
//                             href={doc.fileUrl}
//                             target="_blank" // Open in new tab
//                             rel="noopener noreferrer" // Security best practice
//                             download
//                         >
//                             Download
//                         </Button>
//                         </TableCell>
//                         <TableCell align="right">
//                         <IconButton title="Edit" size="small" color="primary" onClick={() => handleEdit(doc)}>
//                             <Edit fontSize="small" />
//                         </IconButton>
//                         <IconButton title="Delete" size="small" color="error" onClick={() => handleDelete(doc.id)}>
//                             <Delete fontSize="small" />
//                         </IconButton>
//                         </TableCell>
//                     </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer> 
     
//       <Box mt={3}>
//         <Typography variant="subtitle1">
//           {editMode ? 'Edit Document' : 'Add New Document'}
//         </Typography>
//         <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
//           <TextField
//             label="Document Name"
//             name="name"
//             required
//             size="small"
//             value={form.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Document Type"
//             name="type"
//             required
//             size="small"
//             value={form.type}
//             onChange={handleChange}
//           />
//           <Button variant="outlined" component="label" size="small">
//             {form.fileName || 'Choose file...'}
//             <input
//               type="file"
//               name="file"
//               accept=".png,.jpg,.jpeg,.gif,.txt,.pdf,.xls,.xlsx,.doc,.docx"
//               hidden
//               onChange={handleChange}
//             />
//           </Button>
//         </Box>
//         <Typography variant="caption" color="text.secondary" mt={1} display="block">
//           Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
//         </Typography>
//         <Box mt={2}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             {editMode ? 'Update Document' : 'Add Document'}
//           </Button>
//           {editMode && (
//             <Button variant="text" onClick={resetForm} sx={{ ml: 2 }}>
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Documents;



// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
//   IconButton,
//   Typography,
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// const Documents = () => {
//   const [documents, setDocuments] = useState([]);
//   const [form, setForm] = useState({ name: '', type: '', file: null, fileName: '' });
//   const [editMode, setEditMode] = useState(false);
//   const [editDocId, setEditDocId] = useState(null);
  
//   // Get userId from localStorage instead of context
//   const userId = localStorage.getItem('loggedInUser') || localStorage.getItem('loggedInEmpId');
//   const companyId = 2;

//   const fetchDocuments = useCallback(async () => {
//     console.log('User ID:', userId);
//     if (!userId) {
//       console.warn('User ID not found in localStorage');
//       return;
//     }
//     try {
//       const response = await axiosInstance.get(`/api/document_details/?user_id=${userId}`);
//       if (response.data.status === 'success') {
//         const docs = response.data.docs.map((doc) => ({
//           id: doc.document_id,
//           name: doc.document_name,
//           type: doc.document_type,
//           fileUrl: `https://raasbackend.vetrinahealthcare.com${doc.document_file}`,
//         }));
//         setDocuments(docs);
//       }
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load documents. Please try refreshing the page.',
//       });
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchDocuments();
//     }
//   }, [userId, fetchDocuments]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0]) {
//       setForm({
//         ...form,
//         file: files[0],
//         fileName: files[0].name,
//       });
//     } else {
//       setForm({
//         ...form,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'User ID is not available. Please refresh the page and try again.'
//       });
//       return;
//     }

//     if (!form.name || !form.type) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please provide both a Document Name and Document Type.'
//       });
//       return;
//     }

//     if (!editMode && !form.file) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing File',
//         text: 'Please choose a file to upload for the new document.'
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('user_id', userId);
//     formData.append('company_id', companyId);
//     formData.append('document_name', form.name);
//     formData.append('document_type', form.type);
//     if (form.file) {
//       formData.append('document_file', form.file);
//     }

//     const action = editMode ? 'Updating' : 'Adding';

//     Swal.fire({
//       title: `${action} Document...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       if (editMode && editDocId !== null) {
//         formData.append('document_id', editDocId);
//         await axiosInstance.patch('/api/document_details/', formData);
//       } else {
//         await axiosInstance.post('/api/document_details/', formData);
//       }

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Document has been ${editMode ? 'updated' : 'added'} successfully.`
//       });

//       await fetchDocuments();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving document:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage
//       });
//     }
//   };

//   const handleEdit = (doc) => {
//     setForm({
//       name: doc.name,
//       type: doc.type,
//       file: null,
//       fileName: 'Choose a new file to replace (optional)',
//     });
//     setEditDocId(doc.id);
//     setEditMode(true);
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/document_details/', {
//             data: { document_id: id },
//           });
//           Swal.fire('Deleted!', 'The document has been deleted.', 'success');
//           await fetchDocuments();
//         } catch (error) {
//           console.error('Error deleting document:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the document.';
//           Swal.fire('Error!', errorMessage, 'error');
//         }
//       }
//     });
//   };

//   const resetForm = () => {
//     setForm({ name: '', type: '', file: null, fileName: '' });
//     setEditMode(false);
//     setEditDocId(null);
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" gutterBottom>
//         Documents
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>DOCUMENT NAME</strong></TableCell>
//               <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
//               <TableCell><strong>DOCUMENT FILE</strong></TableCell>
//               <TableCell align="right"><strong>ACTIONS</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {documents.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No documents found.</TableCell>
//               </TableRow>
//             ) : (
//               documents.map((doc) => (
//                 <TableRow key={doc.id}>
//                   <TableCell>{doc.name}</TableCell>
//                   <TableCell>{doc.type}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="text"
//                       size="small"
//                       href={doc.fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       download
//                     >
//                       Download
//                     </Button>
//                   </TableCell>
//                   <TableCell align="right">
//                     <IconButton title="Edit" size="small" color="primary" onClick={() => handleEdit(doc)}>
//                       <Edit fontSize="small" />
//                     </IconButton>
//                     <IconButton title="Delete" size="small" color="error" onClick={() => handleDelete(doc.id)}>
//                       <Delete fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box mt={3}>
//         <Typography variant="subtitle1">
//           {editMode ? 'Edit Document' : 'Add New Document'}
//         </Typography>
//         <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
//           <TextField
//             label="Document Name"
//             name="name"
//             required
//             size="small"
//             value={form.name}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Document Type"
//             name="type"
//             required
//             size="small"
//             value={form.type}
//             onChange={handleChange}
//           />
//           <Button variant="outlined" component="label" size="small">
//             {form.fileName || 'Choose file...'}
//             <input
//               type="file"
//               name="file"
//               accept=".png,.jpg,.jpeg,.gif,.txt,.pdf,.xls,.xlsx,.doc,.docx"
//               hidden
//               onChange={handleChange}
//             />
//           </Button>
//         </Box>
//         <Typography variant="caption" color="text.secondary" mt={1} display="block">
//           Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
//         </Typography>
//         <Box mt={2}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             {editMode ? 'Update Document' : 'Add Document'}
//           </Button>
//           {editMode && (
//             <Button variant="text" onClick={resetForm} sx={{ ml: 2 }}>
//               Cancel
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Documents;



import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from './EmployeeContext';
import axios from 'axios';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, IconButton, Typography, CircularProgress, Divider
} from '@mui/material';
import { Edit, Delete, Description } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';

const PRIMARY_COLOR = "#8C257C";

const formatPredefinedDocName = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
const ensureAbsoluteUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

const Documents = ({ onNext, onBack }) => {
  const { id } = useParams(); // Extract ID from URL
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', file: null, fileName: '' });
  const [editMode, setEditMode] = useState(false);
  const [editDocId, setEditDocId] = useState(null);
  const [errors, setErrors] = useState({});
  const [predefinedDocuments, setPredefinedDocuments] = useState([]);
  const [isLoadingPredefined, setIsLoadingPredefined] = useState(true);

  const { employeeId } = useContext(EmployeeContext);
  
  // Priority: URL param > context > localStorage
  const userId = id || employeeId || localStorage.getItem('loggedInUser') || localStorage.getItem('loggedInEmpId');
  const companyId = 2;

  const fetchUploadedDocuments = useCallback(async () => {
    if (!userId) {
      console.warn('User ID not available');
      return;
    }
    try {
      const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/document_details/?user_id=${encodeURIComponent(userId)}`);
      if (response.data.status === 'success') {
        const docs = response.data.docs.map((doc) => ({
          id: doc.document_id,
          name: doc.document_name,
          type: doc.document_type,
          fileUrl: ensureAbsoluteUrl(doc.document_file),
        }));
        setUploadedDocuments(docs);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load documents. Please refresh the page.'
      });
    }
  }, [userId]);

  const fetchPredefinedDocuments = useCallback(async () => {
    if (!userId) {
      setIsLoadingPredefined(false);
      return;
    }
    setIsLoadingPredefined(true);
    try {
      const detailsResponse = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/document_details/?user_id=${encodeURIComponent(userId)}`);
      if (detailsResponse.data.status !== 'success' || !detailsResponse.data.email) {
        throw new Error("Could not retrieve user email.");
      }
      const userEmail = detailsResponse.data.email;

      const documentsResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: userEmail });

      if (documentsResponse.data.status === 'success' && documentsResponse.data.documents) {
        const formattedDocs = Object.entries(documentsResponse.data.documents).map(([key, url]) => ({
          name: formatPredefinedDocName(key),
          url: ensureAbsoluteUrl(url),
        }));
        setPredefinedDocuments(formattedDocs);
      }
    } catch (error) {
      console.error('Error fetching predefined documents:', error);
    } finally {
      setIsLoadingPredefined(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUploadedDocuments();
      fetchPredefinedDocuments();
    }
  }, [userId, fetchUploadedDocuments, fetchPredefinedDocuments]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm({ ...form, file: files[0], fileName: files[0].name });
      setErrors(prev => ({ ...prev, file: false }));
    } else {
      setForm({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!form.name.trim()) {
      newErrors.name = true;
      isValid = false;
    }
    if (!form.type.trim()) {
      newErrors.type = true;
      isValid = false;
    }
    if (!editMode && !form.file) {
      newErrors.file = true;
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      Swal.fire({ icon: 'error', title: 'Missing Info', text: 'Please fill all document fields.' });
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'User ID Missing',
        text: 'User ID is not available. Please refresh the page.'
      });
      return;
    }

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('company_id', companyId);
    formData.append('document_name', form.name);
    formData.append('document_type', form.type);
    if (form.file) formData.append('document_file', form.file);

    Swal.fire({
      title: editMode ? 'Updating...' : 'Uploading...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const apiUrl = `https://tdtlworld.com/hrms-backend/api/document_details/?user_id=${encodeURIComponent(userId)}`;

      if (editMode && editDocId !== null) {
        formData.append('document_id', editDocId);
        await axiosInstance.patch(apiUrl, formData);
      } else {
        await axiosInstance.post(apiUrl, formData);
      }

      Swal.close();
      await fetchUploadedDocuments();
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Document has been ${editMode ? 'updated' : 'added'} successfully.`
      });
    } catch (error) {
      console.error('Error saving document:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save document.';
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: errorMessage
      });
    }
  };

  const handleEdit = (doc) => {
    setForm({
      name: doc.name,
      type: doc.type,
      file: null,
      fileName: 'Choose a new file to replace (optional)'
    });
    setEditDocId(doc.id);
    setEditMode(true);
    setErrors({});
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete('https://tdtlworld.com/hrms-backend/api/document_details/', {
            data: { document_id: id, user_id: userId }
          });
          await fetchUploadedDocuments();
          Swal.fire('Deleted!', 'The document has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting document:', error);
          Swal.fire('Error!', 'Failed to delete the document.', 'error');
        }
      }
    });
  };

  const resetForm = () => {
    setForm({ name: '', type: '', file: null, fileName: '' });
    setEditMode(false);
    setEditDocId(null);
    setErrors({});
  };

  const handleFinish = () => {
    if (uploadedDocuments.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Documents',
        text: 'Please upload at least one document before finishing.',
        confirmButtonColor: PRIMARY_COLOR
      });
      return;
    }
    if (onNext) onNext();
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold">
        Manage Uploaded Documents
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>DOCUMENT NAME</strong></TableCell>
              <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
              <TableCell><strong>FILE</strong></TableCell>
              <TableCell align="right"><strong>ACTIONS</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No documents uploaded yet.</TableCell>
              </TableRow>
            ) : (
              uploadedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Description fontSize="small" sx={{ mr: 0.5 }} /> View
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      title="Edit"
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(doc)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      title="Delete"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mb={4} p={3} sx={{ border: '1px dashed #ccc', borderRadius: 2, bgcolor: '#fafafa' }}>
        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
          {editMode ? 'Edit Document' : 'Add New Document'}
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-start" mt={1}>
          <TextField
            label="Document Name"
            name="name"
            size="small"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Document Type"
            name="type"
            size="small"
            value={form.type}
            onChange={handleChange}
            error={!!errors.type}
            sx={{ minWidth: 200 }}
          />

          <Box>
            <Button
              variant="outlined"
              component="label"
              size="medium"
              sx={{ textTransform: 'none', height: 40, borderColor: errors.file ? 'red' : 'inherit' }}
            >
              {form.fileName || 'Choose file...'}
              <input
                type="file"
                name="file"
                accept=".png,.jpg,.jpeg,.pdf,.docx"
                hidden
                onChange={handleChange}
              />
            </Button>
          </Box>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: PRIMARY_COLOR, height: 40 }}
          >
            {editMode ? 'Update' : 'Upload'}
          </Button>
          {editMode && (
            <Button variant="text" onClick={resetForm} sx={{ height: 40 }}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold">
        Company & Statutory Documents
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
              <TableCell align="right"><strong>ACTION</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadingPredefined ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : predefinedDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">No pre-defined documents found.</TableCell>
              </TableRow>
            ) : (
              predefinedDocuments.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell align="right">
                    {doc.url ? (
                      <Button
                        variant="contained"
                        size="small"
                        href={doc.url}
                        target="_blank"
                        sx={{ bgcolor: PRIMARY_COLOR }}
                      >
                        View / Download
                      </Button>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Not Available
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
        <Button
          onClick={onBack}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: '8px',
            borderColor: '#ccc',
            color: '#555',
            '&:hover': { borderColor: '#8C257C', color: '#8C257C' }
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleFinish}
          variant="contained"
          size="large"
          sx={{
            background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`,
            color: 'white',
            borderRadius: '8px'
          }}
        >
          Finish & Generate PDF
        </Button>
      </Box>
    </Box>
  );
};

export default Documents;