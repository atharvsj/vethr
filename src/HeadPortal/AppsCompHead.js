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
//           <Typography variant="h6">List All Events</Typography>
//           {/* <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//           >
//             Add New
//           </Button> */}
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
//                 <TableCell>EVENT TITLE</TableCell>
//                 <TableCell>EMPLOYEES</TableCell>
//                 <TableCell>EVENT DATE</TableCell>
//                 <TableCell>EVENT TIME</TableCell>
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

// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
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
//   Typography
// } from '@mui/material';

// export default function DocumentManagementHead() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [entriesPerPage, setEntriesPerPage] = useState(10);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Card sx={{ mb: 3 }}>
//         <Box
//           sx={{
//             p: 2,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <Typography variant="h6">List All Events</Typography>
//         </Box>

//         <Box
//           sx={{
//             px: 2,
//             py: 1,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
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
//                 <TableCell>EVENT TITLE</TableCell>
//                 <TableCell>EMPLOYEES</TableCell>
//                 <TableCell>EVENT DATE</TableCell>
//                 <TableCell>EVENT TIME</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No records available
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//     </Box>
//   );
// }












import React, { useState } from 'react';
import {
  Box,
  Card,
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
  TablePagination,
} from '@mui/material';

export default function DocumentManagementHead() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(0);

  // Dummy data (you can replace this with API data later)
  const rows = [];

  // Filtered data based on search term
  const filteredRows = rows.filter(
    (row) =>
      row.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.employees?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedRows = filteredRows.slice(
    page * entriesPerPage,
    page * entriesPerPage + entriesPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeEntriesPerPage = (event) => {
    setEntriesPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#8C257C',
            color: 'white',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            List All Events
          </Typography>
        </Box>

        {/* Search and Entries Selection */}
        <Box
          sx={{
            px: 2,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            bgcolor: '#F8F8F8',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Show</Typography>
            <Select
              value={entriesPerPage}
              onChange={handleChangeEntriesPerPage}
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography>entries</Typography>
          </Box>

          <TextField
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 250,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#8C257C' },
                '&:hover fieldset': { borderColor: '#F58E35' },
              },
            }}
          />
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ m: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#8C257C' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>SR No.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>EVENT TITLE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>EMPLOYEES</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>EVENT DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>EVENT TIME</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No records available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{page * entriesPerPage + index + 1}</TableCell>
                    <TableCell>{row.eventTitle}</TableCell>
                    <TableCell>{row.employees}</TableCell>
                    <TableCell>{row.eventDate}</TableCell>
                    <TableCell>{row.eventTime}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination + Total Rows */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            pb: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Total Rows: {filteredRows.length}
          </Typography>

          <TablePagination
            component="div"
            count={filteredRows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={entriesPerPage}
            onRowsPerPageChange={handleChangeEntriesPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                marginTop: '8px',
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
