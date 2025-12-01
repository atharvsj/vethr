// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
// } from '@mui/icons-material';

// export default function DocumentManagement() {
//   const [documents, setDocuments] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     department: '',
//     documentName: '',
//     documentType: '',
//     documentFile: null
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [documentToDelete, setDocumentToDelete] = useState(null);

//   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance'];
//   const allowedFileTypes = ['png', 'jpg', 'jpeg', 'gif', 'txt', 'pdf', 'xls', 'xlsx', 'doc', 'docx'];

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       if (allowedFileTypes.includes(fileExtension)) {
//         handleInputChange('documentFile', file);
//       } else {
//         alert('Invalid file type. Please upload a supported file format.');
//       }
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       department: '',
//       documentName: '',
//       documentType: '',
//       documentFile: null
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.department || !formData.documentName || !formData.documentType || !formData.documentFile) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     if (editingId) {
//       setDocuments(documents.map(doc => 
//         doc.id === editingId ? { ...doc, ...formData, fileName: formData.documentFile.name } : doc
//       ));
//     } else {
//       const newDocument = {
//         id: Date.now(),
//         ...formData,
//         fileName: formData.documentFile.name
//       };
//       setDocuments([...documents, newDocument]);
//     }
    
//     handleReset();
//     setShowForm(false);
//   };

//   const handleEdit = (document) => {
//     setFormData({
//       department: document.department,
//       documentName: document.documentName,
//       documentType: document.documentType,
//       documentFile: { name: document.fileName }
//     });
//     setEditingId(document.id);
//     setShowForm(true);
//   };

//   const handleDelete = (document) => {
//     setDocumentToDelete(document);
//     setDeleteConfirmOpen(true);
//   };

//   const confirmDelete = () => {
//     setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));
//     setDeleteConfirmOpen(false);
//   };

//   const filteredDocuments = documents.filter(doc =>
//     Object.values(doc).some(value =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h5">General Documents</Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => {
//             setShowForm(!showForm);
//             handleReset();
//           }}
//         >
//           {showForm ? 'Hide' : 'Add New'}
//         </Button>
//       </Box>

//       {showForm && (
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>{editingId ? 'Edit Document' : 'Add New Document'}</Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Department</InputLabel>
//                   <Select
//                     value={formData.department}
//                     onChange={(e) => handleInputChange('department', e.target.value)}
//                     label="Department"
//                   >
//                     {departments.map((dept) => (
//                       <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   required
//                   label="Document Name"
//                   value={formData.documentName}
//                   onChange={(e) => handleInputChange('documentName', e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   required
//                   label="Document Type"
//                   placeholder="Eg. Payslip"
//                   value={formData.documentType}
//                   onChange={(e) => handleInputChange('documentType', e.target.value)}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <input
//                   accept={allowedFileTypes.map(type => `.${type}`).join(',')}
//                   style={{ display: 'none' }}
//                   id="document-file"
//                   type="file"
//                   onChange={handleFileChange}
//                 />
//                 <label htmlFor="document-file">
//                   <Button variant="outlined" component="span" fullWidth>
//                     {formData.documentFile ? formData.documentFile.name : 'Choose file...'}
//                   </Button>
//                 </label>
//                 <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                   Upload files only: {allowedFileTypes.join(', ')}
//                 </Typography>
//               </Grid>
//             </Grid>
//             <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//               <Button onClick={handleReset}>Reset</Button>
//               <Button type="submit" variant="contained">{editingId ? 'Update' : 'Save'}</Button>
//             </Box>
//           </form>
//         </Paper>
//       )}

//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>List All System Documents</Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//             <Select
//               size="small"
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(e.target.value)}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//           </Box>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>DEPARTMENT</TableCell>
//                 <TableCell>DOCUMENT NAME</TableCell>
//                 <TableCell>DOCUMENT TYPE</TableCell>
//                 <TableCell>DOCUMENT FILE</TableCell>
//                 <TableCell>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredDocuments.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">No records available</TableCell>
//                 </TableRow>
//               ) : (
//                 filteredDocuments.map((doc) => (
//                   <TableRow key={doc.id}>
//                     <TableCell>{doc.department}</TableCell>
//                     <TableCell>{doc.documentName}</TableCell>
//                     <TableCell>{doc.documentType}</TableCell>
//                     <TableCell>{doc.fileName}</TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleEdit(doc)} size="small">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={() => handleDelete(doc)} size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//           <Typography variant="body2">
//             Showing {Math.min(filteredDocuments.length, entriesPerPage)} of {documents.length} entries
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Button disabled={true}>Previous</Button>
//             <Button disabled={true}>Next</Button>
//           </Box>
//         </Box>
//       </Paper>

//       <Dialog
//         open={deleteConfirmOpen}
//         onClose={() => setDeleteConfirmOpen(false)}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this document?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
//           <Button onClick={confirmDelete} color="error">Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }












import React from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

// --- Main Component ---
export default function DocumentManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [documents, setDocuments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    department: '',
    documentName: '',
    documentType: '',
    documentFile: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // --- Pagination State ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const departments = ['Integrated Technology Services', 'Human Resources', 'Finance'];
  const allowedFileTypes = ['png', 'jpg', 'jpeg', 'pdf', 'xls', 'xlsx', 'doc', 'docx'];

  // --- Handlers ---
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (allowedFileTypes.includes(fileExtension)) {
        handleInputChange('documentFile', file);
      } else {
        alert(`Invalid file type. Please upload one of: ${allowedFileTypes.join(', ')}`);
        event.target.value = null; // Clear the input
      }
    }
  };

  const handleReset = () => {
    setFormData({
      department: '',
      documentName: '',
      documentType: '',
      documentFile: null,
    });
    setEditingId(null);
  };
  
  const handleOpenDialog = () => {
    handleReset();
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.department || !formData.documentName || !formData.documentType || !formData.documentFile) {
      alert('Please fill in all required fields and upload a file.');
      return;
    }
    
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      if (editingId) {
        setDocuments(
          documents.map((doc) =>
            doc.id === editingId ? { ...doc, ...formData, fileName: formData.documentFile.name } : doc
          )
        );
      } else {
        const newDocument = {
          id: Date.now(),
          ...formData,
          fileName: formData.documentFile.name,
        };
        setDocuments([...documents, newDocument]);
      }
      setSubmitting(false);
      handleCloseDialog();
    }, 1000); // Simulate network delay
  };

  const handleEdit = (document) => {
    setFormData({
      department: document.department,
      documentName: document.documentName,
      documentType: document.documentType,
      documentFile: { name: document.fileName }, // Placeholder for file object
    });
    setEditingId(document.id);
    setOpenDialog(true);
  };

  const handleDelete = (document) => {
    setDocumentToDelete(document);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setDocuments(documents.filter((doc) => doc.id !== documentToDelete.id));
    setDeleteConfirmOpen(false);
    setDocumentToDelete(null);
  };

  const filteredDocuments = documents.filter((doc) =>
    Object.values(doc).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // --- Style Constants ---
  const primaryColor = '#8C257C';
  const primaryDarkColor = '#6d1d60';
  const textColorOnPrimary = '#FFFFFF';

  return (
    <Box component={Paper} p={3}>
      {/* Page Title */}
      <Typography variant="h5" sx={{ color: primaryColor, fontWeight: 'bold', mb: 2 }}>
         Documents
      </Typography>

      {/* Action Bar: Add Button & Search */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: primaryColor,
            color: textColorOnPrimary,
            width: isMobile ? '100%' : 'auto',
            '&:hover': {
              backgroundColor: primaryDarkColor,
            },
          }}
        >
          Add New
        </Button>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: isMobile ? '100%' : 'auto',
          }}
        />
      </Box>

      {/* Documents Table */}
      <TableContainer sx={{ whiteSpace: 'nowrap' }}>
        <Table sx={{ minWidth: '100%' }}>
          <TableHead sx={{ backgroundColor: primaryColor }}>
            <TableRow>
              <TableCell sx={{ color: textColorOnPrimary, fontWeight: 'bold' }}>SR NO.</TableCell>
              <TableCell sx={{ color: textColorOnPrimary, fontWeight: 'bold' }}>DEPARTMENT</TableCell>
              <TableCell sx={{ color: textColorOnPrimary, fontWeight: 'bold' }}>DOCUMENT NAME</TableCell>
              <TableCell sx={{ color: textColorOnPrimary, fontWeight: 'bold' }}>DOCUMENT TYPE</TableCell>
              <TableCell sx={{ color: textColorOnPrimary, fontWeight: 'bold' }}>DOCUMENT FILE</TableCell>
              <TableCell sx={{ color: textColorOnPrimary, fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No records available
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((doc, index) => (
                  <TableRow key={doc.id} hover>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.department}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.documentName}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.documentType}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.fileName}</TableCell>
                    <TableCell>
                       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <IconButton onClick={() => handleEdit(doc)} size="small" sx={{ color: primaryColor }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(doc)} size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                       </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredDocuments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                color: 'text.secondary',
            },
            '& .MuiSvgIcon-root': {
                color: primaryColor,
            },
        }}
      />
      
      {/* Add/Edit Document Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>
          {editingId ? 'Edit Document' : 'Add New Document'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="document-form">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    label="Department"
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Document Name"
                  value={formData.documentName}
                  onChange={(e) => handleInputChange('documentName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Document Type"
                  placeholder="Eg. Payslip"
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept={allowedFileTypes.map((type) => `.${type}`).join(',')}
                  style={{ display: 'none' }}
                  id="document-file-input"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="document-file-input">
                  <Button variant="outlined" component="span" fullWidth>
                    {formData.documentFile ? formData.documentFile.name : 'Choose file...'}
                  </Button>
                </label>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Supported files: {allowedFileTypes.join(', ')}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="document-form"
            variant="contained"
            disabled={submitting}
            sx={{
              backgroundColor: primaryColor,
              color: textColorOnPrimary,
              '&:hover': { backgroundColor: primaryDarkColor },
            }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : (editingId ? 'Update' : 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this document? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: '#757575' }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}