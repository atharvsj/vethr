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
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from '@mui/icons-material';

// export default function ResignationManagement() {
//   const [resignations, setResignations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     department: '',
//     resignationDate: null,
//     noticeDate: null,
//     resignationReason: '',
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [resignationToDelete, setResignationToDelete] = useState(null);

//   const departments = ['Integrated Technology Services', 'Human Resources', 'Finance', 'Marketing', 'Operations'];

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleReset = () => {
//     setFormData({
//       employeeName: '',
//       department: '',
//       resignationDate: null,
//       noticeDate: null,
//       resignationReason: '',
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.employeeName || !formData.department || !formData.resignationDate || !formData.noticeDate || !formData.resignationReason) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     if (editingId) {
//       setResignations(resignations.map(resignation => 
//         resignation.id === editingId ? { ...resignation, ...formData } : resignation
//       ));
//     } else {
//       const newResignation = {
//         id: Date.now(),
//         ...formData,
//       };
//       setResignations([...resignations, newResignation]);
//     }
    
//     handleReset();
//     setShowForm(false);
//   };

//   const handleEdit = (resignation) => {
//     setFormData({
//       employeeName: resignation.employeeName,
//       department: resignation.department,
//       resignationDate: resignation.resignationDate,
//       noticeDate: resignation.noticeDate,
//       resignationReason: resignation.resignationReason,
//     });
//     setEditingId(resignation.id);
//     setShowForm(true);
//   };

//   const handleDelete = (resignation) => {
//     setResignationToDelete(resignation);
//     setDeleteConfirmOpen(true);
//   };

//   const confirmDelete = () => {
//     setResignations(resignations.filter(resignation => resignation.id !== resignationToDelete.id));
//     setDeleteConfirmOpen(false);
//   };

//   const filteredResignations = resignations.filter(resignation =>
//     Object.values(resignation).some(value =>
//       value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h5">Resignation Management</Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => {
//               setShowForm(!showForm);
//               handleReset();
//             }}
//           >
//             {showForm ? 'Hide Form' : 'Add Resignation'}
//           </Button>
//         </Box>

//         {showForm && (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>{editingId ? 'Edit Resignation' : 'Submit Resignation'}</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     required
//                     label="Employee Name"
//                     value={formData.employeeName}
//                     onChange={(e) => handleInputChange('employeeName', e.target.value)}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth required>
//                     <InputLabel>Department</InputLabel>
//                     <Select
//                       value={formData.department}
//                       onChange={(e) => handleInputChange('department', e.target.value)}
//                       label="Department"
//                     >
//                       {departments.map((dept) => (
//                         <MenuItem key={dept} value={dept}>{dept}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Resignation Date"
//                     value={formData.resignationDate}
//                     onChange={(date) => handleInputChange('resignationDate', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth required />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <DatePicker
//                     label="Notice Date"
//                     value={formData.noticeDate}
//                     onChange={(date) => handleInputChange('noticeDate', date)}
//                     renderInput={(params) => <TextField {...params} fullWidth required />}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     required
//                     label="Resignation Reason"
//                     multiline
//                     rows={4}
//                     value={formData.resignationReason}
//                     onChange={(e) => handleInputChange('resignationReason', e.target.value)}
//                   />
//                 </Grid>
//               </Grid>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
//                 <Button onClick={handleReset}>Reset</Button>
//                 <Button type="submit" variant="contained">{editingId ? 'Update' : 'Submit'}</Button>
//               </Box>
//             </form>
//           </Paper>
//         )}

//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom>Resignation List</Typography>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <Select
//                 size="small"
//                 value={entriesPerPage}
//                 onChange={(e) => setEntriesPerPage(e.target.value)}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>EMPLOYEE NAME</TableCell>
//                   <TableCell>DEPARTMENT</TableCell>
//                   <TableCell>RESIGNATION DATE</TableCell>
//                   <TableCell>NOTICE DATE</TableCell>
//                   <TableCell>REASON</TableCell>
//                   <TableCell>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredResignations.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center">No records available</TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredResignations.slice(0, entriesPerPage).map((resignation) => (
//                     <TableRow key={resignation.id}>
//                       <TableCell>{resignation.employeeName}</TableCell>
//                       <TableCell>{resignation.department}</TableCell>
//                       <TableCell>{resignation.resignationDate.toLocaleDateString()}</TableCell>
//                       <TableCell>{resignation.noticeDate.toLocaleDateString()}</TableCell>
//                       <TableCell>{resignation.resignationReason}</TableCell>
//                       <TableCell>
//                         <IconButton onClick={() => handleEdit(resignation)} size="small">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton onClick={() => handleDelete(resignation)} size="small">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//             <Typography variant="body2">
//               Showing {Math.min(filteredResignations.length, entriesPerPage)} of {resignations.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button disabled={true}>Previous</Button>
//               <Button disabled={true}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         <Dialog
//           open={deleteConfirmOpen}
//           onClose={() => setDeleteConfirmOpen(false)}
//         >
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             Are you sure you want to delete this resignation record?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
//             <Button onClick={confirmDelete} color="error">Delete</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Grid, Tooltip, TablePagination
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

export default function ResignationManagementHead() {
  const [resignations, setResignations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    resignationDate: null,
    resignationReason: '',
  });
  const [refreshKey, setRefreshKey] = useState(0);

  // State for MUI TablePagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const employeeId = localStorage.getItem("loggedInUser");

  const fetchResignations = useCallback(() => {
    if (!employeeId) return;

    axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
      .then(res => {
        const apiData = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        const transformed = apiData.map((item, idx) => ({
          id: item.id || Date.now() + idx,
          resignationDate: new Date(item.resignation_date.split('-').reverse().join('-')),
          resignationReason: item.reason,
          status: item.status || 'Pending'
        }));
        setResignations(transformed);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setResignations([]);
      });
  }, [employeeId]);

  useEffect(() => {
    fetchResignations();
  }, [fetchResignations, refreshKey]);

  // Handlers for pagination events
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      resignationDate: null,
      resignationReason: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { resignationDate, resignationReason } = formData;

    if (!resignationDate || !resignationReason) {
      alert('Please fill in all required fields');
      return;
    }

    const formattedDate = resignationDate.toLocaleDateString('en-GB').split('/').join('-');

    try {
      await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
        reason: resignationReason,
        resignation_date: formattedDate,
      });
      alert("Resignation submitted successfully.");
      handleReset();
      setShowForm(false);
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit resignation.");
    }
  };

  const filteredResignations = resignations.filter(resignation =>
    Object.values(resignation).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const isAddButtonDisabled = resignations.some(resignation => {
    const status = resignation.status?.toLowerCase();
    return status === 'pending' || status === 'approved';
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Resignation Management</Typography>
          <Tooltip title={isAddButtonDisabled ? "You cannot add a new resignation while one is pending or approved." : ""}>
            <span>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setShowForm(!showForm);
                  handleReset();
                }}
                disabled={isAddButtonDisabled}
                sx={{ bgcolor: '#8C257C', '&:hover': { bgcolor: '#7a216c' } }}
              >
                {showForm ? 'Hide Form' : 'Add Resignation'}
              </Button>
            </span>
          </Tooltip>
        </Box>

        {showForm && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Submit Resignation</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Resignation Date"
                    value={formData.resignationDate}
                    onChange={(date) => handleInputChange('resignationDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth required label="Resignation Reason"
                    multiline rows={4}
                    value={formData.resignationReason}
                    onChange={(e) => handleInputChange('resignationReason', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  onClick={handleReset} 
                  variant="outlined"
                  sx={{ color: '#F58E35', borderColor: '#F58E35', '&:hover': { borderColor: '#e07e2d', backgroundColor: 'rgba(245, 142, 53, 0.04)' } }}
                >
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  variant="contained"
                  sx={{ bgcolor: '#8C257C', '&:hover': { bgcolor: '#7a216c' } }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        )}

        <Paper sx={{ p: 3, overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>Resignation List</Typography>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </Box>

          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                {/* === CHANGE 1: Added Sr. No. column header === */}
                <TableRow sx={{ '& th': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
                  <TableCell sx={{ width: '10%' }}>Sr. No.</TableCell>
                  <TableCell>Resignation Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResignations.length === 0 ? (
                  <TableRow>
                    {/* === CHANGE 2: Updated colSpan for the empty state === */}
                    <TableCell colSpan={4} align="center">No records available</TableCell>
                  </TableRow>
                ) : (
                  filteredResignations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    // === CHANGE 3: Added index to map for calculating Sr. No. ===
                    .map((resignation, index) => (
                      <TableRow key={resignation.id} hover>
                        {/* === CHANGE 4: Added the cell to display the calculated Sr. No. === */}
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>
                          {resignation.resignationDate instanceof Date && !isNaN(resignation.resignationDate)
                            ? resignation.resignationDate.toLocaleDateString('en-GB')
                            : 'Invalid Date'}
                        </TableCell>
                        <TableCell>{resignation.resignationReason}</TableCell>
                        <TableCell>{resignation.status}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredResignations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
