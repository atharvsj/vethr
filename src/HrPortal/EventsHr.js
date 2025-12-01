// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
// } from '@mui/icons-material';

// const departments = [
//   'Integrated Technology Services',
//   'Human Resources',
//   'Finance',
//   'Operations'
// ];

// export default function DocumentManagement() {
//   const [documents, setDocuments] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [formData, setFormData] = useState({
//     department: '',
//     documentName: '',
//     documentType: '',
//     documentFile: null
//   });
//   const [errors, setErrors] = useState({});

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     // Clear error when user types
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//       if (allowedTypes.includes(file.type)) {
//         setFormData(prev => ({ ...prev, documentFile: file }));
//         if (errors.documentFile) {
//           setErrors(prev => ({ ...prev, documentFile: '' }));
//         }
//       } else {
//         setErrors(prev => ({ ...prev, documentFile: 'Invalid file type' }));
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.department) newErrors.department = 'Department is required';
//     if (!formData.documentName) newErrors.documentName = 'Document name is required';
//     if (!formData.documentType) newErrors.documentType = 'Document type is required';
//     if (!formData.documentFile && !editIndex) newErrors.documentFile = 'Document file is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       if (editIndex !== null) {
//         // Update existing document
//         const updatedDocuments = [...documents];
//         updatedDocuments[editIndex] = {
//           ...formData,
//           documentFile: formData.documentFile || updatedDocuments[editIndex].documentFile
//         };
//         setDocuments(updatedDocuments);
//       } else {
//         // Add new document
//         setDocuments(prev => [...prev, { ...formData }]);
//       }
//       handleCloseDialog();
//     }
//   };

//   const handleOpenDialog = (index = null) => {
//     if (index !== null) {
//       setFormData(documents[index]);
//       setEditIndex(index);
//     } else {
//       setFormData({
//         department: '',
//         documentName: '',
//         documentType: '',
//         documentFile: null
//       });
//       setEditIndex(null);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setFormData({
//       department: '',
//       documentName: '',
//       documentType: '',
//       documentFile: null
//     });
//     setEditIndex(null);
//     setErrors({});
//   };

//   const handleDelete = (index) => {
//     const updatedDocuments = documents.filter((_, i) => i !== index);
//     setDocuments(updatedDocuments);
//   };

//   const filteredDocuments = documents.filter(doc =>
//     Object.values(doc).some(value => 
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6">List All System Documents</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//           >
//             Add New
//           </Button>
//         </Box>
        
//         <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography>Show</Typography>
//             <Select
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(e.target.value)}
//               size="small"
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography>entries</Typography>
//           </Box>
//           <TextField
//             placeholder="Search..."
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>

//         <TableContainer component={Paper} sx={{ m: 2 }}>
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
//                 filteredDocuments.map((doc, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{doc.department}</TableCell>
//                     <TableCell>{doc.documentName}</TableCell>
//                     <TableCell>{doc.documentType}</TableCell>
//                     <TableCell>{doc.documentFile?.name}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleOpenDialog(index)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDelete(index)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Typography variant="h6">
//               {editIndex !== null ? 'Edit Document' : 'Add New Document'}
//             </Typography>
//             <IconButton onClick={handleCloseDialog} size="small">
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth error={!!errors.department}>
//                 <InputLabel>Department</InputLabel>
//                 <Select
//                   value={formData.department}
//                   onChange={(e) => handleInputChange('department', e.target.value)}
//                   label="Department"
//                 >
//                   {departments.map((dept) => (
//                     <MenuItem key={dept} value={dept}>
//                       {dept}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.department && (
//                   <Typography color="error" variant="caption">
//                     {errors.department}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Document Name"
//                 value={formData.documentName}
//                 onChange={(e) => handleInputChange('documentName', e.target.value)}
//                 error={!!errors.documentName}
//                 helperText={errors.documentName}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Document Type"
//                 value={formData.documentType}
//                 onChange={(e) => handleInputChange('documentType', e.target.value)}
//                 error={!!errors.documentType}
//                 helperText={errors.documentType}
//                 placeholder="E.g. Payslip"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <input
//                 accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx"
//                 style={{ display: 'none' }}
//                 id="document-file"
//                 type="file"
//                 onChange={handleFileChange}
//               />
//               <label htmlFor="document-file">
//                 <Button variant="outlined" component="span" fullWidth>
//                   Choose File
//                 </Button>
//               </label>
//               {formData.documentFile && (
//                 <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                   Selected: {formData.documentFile.name}
//                 </Typography>
//               )}
//               {errors.documentFile && (
//                 <Typography color="error" variant="caption">
//                   {errors.documentFile}
//                 </Typography>
//               )}
//               <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
//                 Upload files only: png, jpg, jpeg, gif, pdf, doc, docx
//               </Typography>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} variant="outlined">
//             Reset
//           </Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }













import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  TablePagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const departments = [
  'Integrated Technology Services',
  'Human Resources',
  'Finance',
  'Operations'
];

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    department: '',
    documentName: '',
    documentType: '',
    documentFile: null
  });
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf'];
      if (allowedTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, documentFile: file }));
        if (errors.documentFile) {
          setErrors(prev => ({ ...prev, documentFile: '' }));
        }
      } else {
        setErrors(prev => ({ ...prev, documentFile: 'Invalid file type. Only PDF is allowed.' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.documentName) newErrors.documentName = 'Document name is required';
    if (!formData.documentType) newErrors.documentType = 'Document type is required';
    if (!formData.documentFile && editIndex === null) newErrors.documentFile = 'Document file is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (editIndex !== null) {
        const updatedDocuments = [...documents];
        updatedDocuments[editIndex] = {
          ...formData,
          documentFile: formData.documentFile || updatedDocuments[editIndex].documentFile
        };
        setDocuments(updatedDocuments);
      } else {
        setDocuments(prev => [...prev, { ...formData }]);
      }
      handleCloseDialog();
    }
  };

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      // Find the actual item from the unfiltered list
      const originalItem = documents[index];
      setFormData(originalItem);
      setEditIndex(index);
    } else {
      setFormData({
        department: '',
        documentName: '',
        documentType: '',
        documentFile: null
      });
      setEditIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      department: '',
      documentName: '',
      documentType: '',
      documentFile: null
    });
    setEditIndex(null);
    setErrors({});
  };

  const handleDelete = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDocuments = documents.filter(doc =>
    Object.values(doc).some(value => 
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const paginatedDocuments = filteredDocuments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box component={Paper} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
        Document Management
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: '#8C257C',
            color: 'white',
            '&:hover': { backgroundColor: '#6d1d60' },
            width: isMobile ? '100%' : 'auto',
          }}
        >
          Add New
        </Button>
        <TextField
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: isMobile ? '100%' : 'auto' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ backgroundColor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR NO.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DEPARTMENT</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DOCUMENT NAME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DOCUMENT TYPE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>DOCUMENT FILE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No records available</TableCell>
              </TableRow>
            ) : (
              paginatedDocuments.map((doc, index) => {
                const originalIndex = documents.findIndex(d => d === doc);
                return (
                  <TableRow key={originalIndex} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.department}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.documentName}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.documentType}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{doc.documentFile?.name}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <IconButton sx={{ color: '#8C257C' }} onClick={() => handleOpenDialog(originalIndex)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(originalIndex)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
          Showing {filteredDocuments.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredDocuments.length)} of {filteredDocuments.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filteredDocuments.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 25]}
          sx={{
            '& .MuiSvgIcon-root': { color: '#8C257C' },
          }}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: '#8C257C', fontWeight: 'bold' }}>
              {editIndex !== null ? 'Edit Document' : 'Add New Document'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  label="Department"
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
                {errors.department && <Typography color="error" variant="caption">{errors.department}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Document Name" value={formData.documentName} onChange={(e) => handleInputChange('documentName', e.target.value)} error={!!errors.documentName} helperText={errors.documentName} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Document Type" value={formData.documentType} onChange={(e) => handleInputChange('documentType', e.target.value)} error={!!errors.documentType} helperText={errors.documentType} placeholder="E.g. Payslip" />
            </Grid>
            <Grid item xs={12}>
              <input accept=".pdf" style={{ display: 'none' }} id="document-file" type="file" onChange={handleFileChange} />
              <label htmlFor="document-file">
                <Button variant="outlined" component="span" fullWidth>Choose File</Button>
              </label>
              {formData.documentFile && <Typography variant="caption" display="block" sx={{ mt: 1 }}>Selected: {formData.documentFile.name}</Typography>}
              {errors.documentFile && <Typography color="error" variant="caption">{errors.documentFile}</Typography>}
              <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>Upload PDF files only.</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ color: '#757575', borderColor: '#757575', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', borderColor: '#757575' } }}
          >
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: '#8C257C', color: 'white', '&:hover': { backgroundColor: '#6d1d60' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}