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

// export default Documents;
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';
// 1. Import SweetAlert2
import Swal from 'sweetalert2';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', file: null, fileName: '' });
  const [editMode, setEditMode] = useState(false);
  const [editDocId, setEditDocId] = useState(null);
  const { employeeId } = useContext(EmployeeContext);
  const userId = employeeId;
  const companyId = 2; // Assuming this is static

  const fetchDocuments = useCallback(async () => {
    if (!userId) return; // Don't fetch if no user ID
    try {
      const response = await axiosInstance.get(`/api/document_details/?user_id=${userId}`);
      if (response.data.status === 'success') {
        const docs = response.data.docs.map((doc) => ({
          id: doc.document_id,
          name: doc.document_name,
          type: doc.document_type,
          // Correct the base URL if needed
          fileUrl: `https://raasbackend.vetrinahealthcare.com${doc.document_file}`,
        }));
        setDocuments(docs);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not load documents. Please try refreshing the page.',
      });
    }
  }, [userId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm({
        ...form,
        file: files[0],
        fileName: files[0].name,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    // 2. Use Swal for validation
    if (!form.name || !form.type) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please provide both a Document Name and Document Type.'
        });
        return;
    }
    if (!editMode && !form.file) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing File',
            text: 'Please choose a file to upload for the new document.'
        });
        return;
    }

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('company_id', companyId);
    formData.append('document_name', form.name);
    formData.append('document_type', form.type);
    if (form.file) {
      formData.append('document_file', form.file);
    }

    const action = editMode ? 'Updating' : 'Adding';

    // 3. Add loading state with Swal
    Swal.fire({
        title: `${action} Document...`,
        text: 'Please wait.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
      if (editMode && editDocId !== null) {
        formData.append('document_id', editDocId);
        await axiosInstance.patch('/api/document_details/', formData);
      } else {
        await axiosInstance.post('/api/document_details/', formData);
      }
      
      Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Document has been ${editMode ? 'updated' : 'added'} successfully.`
      });
      
      await fetchDocuments();
      resetForm();
    } catch (error) {
      console.error('Error saving document:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
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
      fileName: 'Choose a new file to replace (optional)',
    });
    setEditDocId(doc.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    // 4. Add confirmation dialog before deleting
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
          await axiosInstance.delete('/api/document_details/', {
            data: { document_id: id },
          });
          Swal.fire(
            'Deleted!',
            'The document has been deleted.',
            'success'
          );
          await fetchDocuments();
        } catch (error) {
          console.error('Error deleting document:', error);
          const errorMessage = error.response?.data?.message || 'Failed to delete the document.';
          Swal.fire(
            'Error!',
            errorMessage,
            'error'
          );
        }
      }
    });
  };

  const resetForm = () => {
    setForm({ name: '', type: '', file: null, fileName: '' });
    setEditMode(false);
    setEditDocId(null);
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Documents
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>DOCUMENT NAME</strong></TableCell>
              <TableCell><strong>DOCUMENT TYPE</strong></TableCell>
              <TableCell><strong>DOCUMENT FILE</strong></TableCell>
              <TableCell align="right"><strong>ACTIONS</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {documents.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} align="center">No documents found.</TableCell>
                </TableRow>
            ) : (
                documents.map((doc) => (
                    <TableRow key={doc.id}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                        <Button
                            variant="text"
                            size="small"
                            href={doc.fileUrl}
                            target="_blank" // Open in new tab
                            rel="noopener noreferrer" // Security best practice
                            download
                        >
                            Download
                        </Button>
                        </TableCell>
                        <TableCell align="right">
                        <IconButton title="Edit" size="small" color="primary" onClick={() => handleEdit(doc)}>
                            <Edit fontSize="small" />
                        </IconButton>
                        <IconButton title="Delete" size="small" color="error" onClick={() => handleDelete(doc.id)}>
                            <Delete fontSize="small" />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer> 
     
      <Box mt={3}>
        <Typography variant="subtitle1">
          {editMode ? 'Edit Document' : 'Add New Document'}
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
          <TextField
            label="Document Name"
            name="name"
            required
            size="small"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Document Type"
            name="type"
            required
            size="small"
            value={form.type}
            onChange={handleChange}
          />
          <Button variant="outlined" component="label" size="small">
            {form.fileName || 'Choose file...'}
            <input
              type="file"
              name="file"
              accept=".png,.jpg,.jpeg,.gif,.txt,.pdf,.xls,.xlsx,.doc,.docx"
              hidden
              onChange={handleChange}
            />
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" mt={1} display="block">
          Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editMode ? 'Update Document' : 'Add Document'}
          </Button>
          {editMode && (
            <Button variant="text" onClick={resetForm} sx={{ ml: 2 }}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Documents;