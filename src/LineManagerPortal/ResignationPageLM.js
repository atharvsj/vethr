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

import React, { useState, useEffect, useCallback } from 'react'; // === CHANGE 1: Import useCallback ===
import {
  Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Select, MenuItem, Grid, Tooltip
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

export default function ResignationManagementLM() {
  const [resignations, setResignations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    resignationDate: null,
    resignationReason: '',
  });

  // === CHANGE 2: Add a "refresh trigger" state ===
  // We will change this state to force the useEffect to re-run and fetch data.
  const [refreshKey, setRefreshKey] = useState(0);

  const employeeId = localStorage.getItem("loggedInUser");

  // === CHANGE 3: Centralize the data fetching logic into its own function ===
  // useCallback ensures this function isn't recreated on every render, which is good practice.
  const fetchResignations = useCallback(() => {
    if (!employeeId) return;

    axios.get(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`)
      .then(res => {
        // Ensure we always work with an array, even if the API returns a single object
        const apiData = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);

        const transformed = apiData.map((item, idx) => ({
          // Using item.id from the backend is better if available, otherwise fallback
          id: item.id || Date.now() + idx,
          // Properly handle potential invalid dates from API
          resignationDate: new Date(item.resignation_date.split('-').reverse().join('-')),
          resignationReason: item.reason,
          status: item.status || 'Pending'
        }));
        setResignations(transformed);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        // If the fetch fails (e.g., 404 for no resignations), set to an empty array
        setResignations([]);
      });
  }, [employeeId]); // This function depends on employeeId

  // === CHANGE 4: Update useEffect to use the centralized function and the refresh key ===
  useEffect(() => {
    fetchResignations();
  }, [fetchResignations, refreshKey]); // Re-runs when employeeId changes or when we trigger a refresh

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      resignationDate: null,
      resignationReason: '',
    });
  };

  // === CHANGE 5: Simplify the handleSubmit function ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { resignationDate, resignationReason } = formData;

    if (!resignationDate || !resignationReason) {
      alert('Please fill in all required fields');
      return;
    }

    // Format date from Date object to 'dd-mm-yyyy' string
    const formattedDate = resignationDate.toLocaleDateString('en-GB').split('/').join('-');

    try {
      await axios.post(`https://tdtlworld.com/hrms-backend/employee_resignations/${employeeId}/`, {
        reason: resignationReason,
        resignation_date: formattedDate,
      });

      alert("Resignation submitted successfully.");
      handleReset();
      setShowForm(false);

      // Instead of manually re-fetching, just trigger the useEffect to run again!
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

  // ✅ CORRECT LOGIC: Disable Add button if ANY status is "Pending" or "Approved"
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
                <Button onClick={handleReset}>Reset</Button>
                <Button type="submit" variant="contained">Submit</Button>
              </Box>
            </form>
          </Paper>
        )}

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Resignation List</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
              <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
            </Box>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Resignation Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResignations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">No records available</TableCell>
                  </TableRow>
                ) : (
                  filteredResignations.slice(0, entriesPerPage).map((resignation) => (
                    <TableRow key={resignation.id}>
                      <TableCell>
                        {resignation.resignationDate instanceof Date
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="body2">
              Showing {Math.min(filteredResignations.length, entriesPerPage)} of {filteredResignations.length} entries
            </Typography>
            {/* Note: Pagination logic is not implemented, just showing disabled buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button disabled>Previous</Button>
              <Button disabled>Next</Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}