// import React, { useState } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';


// const Headquarters = () => {
//     const [headquarters, setHeadquarters] = useState([
//         {
//             id: 1,
//             name: 'Mumbai HQ',
//             headquarterCode: 'MHQ', // Renamed from divisionCode
//             description: 'Main office in Mumbai',
//             createdAt: '23-01-2025',
//         },
//         {
//             id: 2,
//             name: 'Delhi HQ',
//             headquarterCode: 'DHQ', // Renamed from divisionCode
//             description: 'Main office in Delhi',
//             createdAt: '23-01-2025',
//         },
//     ]);

//     const [searchQuery, setSearchQuery] = useState('');
//     const [open, setOpen] = useState(false);
//     const [name, setName] = useState('');
//     const [headquarterCode, setHeadquarterCode] = useState(''); // Renamed state
//     const [description, setDescription] = useState('');
//     const [editingId, setEditingId] = useState(null); // To track if we are adding or editing

//     // Opens the dialog in "add" mode
//     const handleOpenDialog = () => {
//         setEditingId(null);
//         setName('');
//         setHeadquarterCode('');
//         setDescription('');
//         setOpen(true);
//     };

//     // Closes the dialog and resets state
//     const handleCloseDialog = () => {
//         setOpen(false);
//         setEditingId(null);
//         // Delay resetting fields to avoid visual glitch during closing animation
//         setTimeout(() => {
//             setName('');
//             setHeadquarterCode('');
//             setDescription('');
//         }, 150);
//     };

//     // Handles both saving a new record and updating an existing one
//     const handleSave = () => {
//         if (!name || !headquarterCode || !description) {
//             alert("Please fill all fields.");
//             return;
//         }

//         if (editingId !== null) {
//             // Update existing headquarter
//             setHeadquarters(
//                 headquarters.map((hq) =>
//                     hq.id === editingId
//                         ? { ...hq, name, headquarterCode, description }
//                         : hq
//                 )
//             );
//         } else {
//             // Add a new headquarter
//             const newHQ = {
//                 id: Date.now(),
//                 name,
//                 headquarterCode,
//                 description,
//                 createdAt: new Date().toLocaleDateString('en-GB'),
//             };
//             setHeadquarters([...headquarters, newHQ]);
//         }
//         handleCloseDialog();
//     };

//     // Deletes a headquarter after confirmation
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this headquarter?")) {
//             setHeadquarters(headquarters.filter((hq) => hq.id !== id));
//         }
//     };

//     // Opens the dialog in "edit" mode and populates it with existing data
//     const handleEdit = (id) => {
//         const hqToEdit = headquarters.find((h) => h.id === id);
//         if (hqToEdit) {
//             setEditingId(id);
//             setName(hqToEdit.name);
//             setHeadquarterCode(hqToEdit.headquarterCode);
//             setDescription(hqToEdit.description);
//             setOpen(true);
//         }
//     };

//     // Filters headquarters based on the search query
//     const filteredHQs = headquarters.filter((hq) =>
//         hq.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <Box p={4}>
//             <Typography variant="h4" gutterBottom>
//                 Headquarter Management
//             </Typography>

//             {/* Search and Add Button */}
//             <Grid container spacing={2} alignItems="center" mb={3}>
//                 <Grid item xs={12} md={8}>
//                     <TextField
//                         fullWidth
//                         placeholder="Search Headquarter"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         size="small"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ whiteSpace: 'nowrap', height: '100%' }}
//                         onClick={handleOpenDialog}
//                     >
//                         ADD NEW HEADQUARTER
//                     </Button>
//                 </Grid>
//             </Grid>

//             {/* Table */}
//             <Paper elevation={3}>
//                 <TableContainer>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                             <TableRow>
//                                 <TableCell><strong>Headquarter Name</strong></TableCell>
//                                 <TableCell><strong>Headquarter Code</strong></TableCell>
//                                 <TableCell><strong>Created Date</strong></TableCell>
//                                 <TableCell><strong>Actions</strong></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {filteredHQs.length > 0 ? (
//                                 filteredHQs.map((hq) => (
//                                     <TableRow key={hq.id}>
//                                         <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
//                                             {hq.name}
//                                         </TableCell>
//                                         <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
//                                             {hq.headquarterCode}
//                                         </TableCell>
//                                         <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
//                                             {hq.createdAt}
//                                         </TableCell>
//                                         <TableCell>
//                                             <IconButton color="primary" onClick={() => handleEdit(hq.id)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={4} align="center">
//                                         No records found
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Paper>

//             {/* Add/Edit Dialog */}
//             <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle>{editingId ? 'Edit Headquarter' : 'Add New Headquarter'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Headquarter Name"
//                         fullWidth
//                         variant="outlined"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Headquarter Code"
//                         fullWidth
//                         variant="outlined"
//                         value={headquarterCode}
//                         onChange={(e) => setHeadquarterCode(e.target.value)}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Description"
//                         fullWidth
//                         variant="outlined"
//                         multiline
//                         minRows={2}
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     <Button onClick={handleSave} variant="contained" color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;



// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Alert
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import dayjs from 'dayjs';

// // Base URL for the API
// const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

// const Headquarters = () => {
//     // State Management
//     const [headquarters, setHeadquarters] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [open, setOpen] = useState(false);

//     // Form state
//     const [name, setName] = useState('');
//     const [headquarterCode, setHeadquarterCode] = useState('');
//     const [description, setDescription] = useState('');
//     const [editingId, setEditingId] = useState(null);

//     // UI State
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch data from the API
//     const fetchHeadquarters = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(API_URL);
//             // Map API data to a consistent internal format (camelCase)
//             const formattedData = response.data.map(hq => ({
//                 id: hq.headquarter_id,
//                 name: hq.headquarter_name,
//                 // The GET API returns `headquarter_division_code`, let's map it
//                 headquarterCode: hq.headquarter_division_code,
//                 description: hq.description,
//                 createdAt: dayjs(hq.created_at).format('DD-MM-YYYY'),
//             }));
//             setHeadquarters(formattedData);
//         } catch (err) {
//             setError('Failed to fetch headquarters. Please try again later.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch data on component mount
//     useEffect(() => {
//         fetchHeadquarters();
//     }, []);

//     // Opens the dialog in "add" mode
//     const handleOpenDialog = () => {
//         setEditingId(null);
//         setName('');
//         setHeadquarterCode('');
//         setDescription('');
//         setOpen(true);
//     };

//     // Opens the dialog in "edit" mode and populates it with existing data
//     const handleEdit = (id) => {
//         const hqToEdit = headquarters.find((h) => h.id === id);
//         if (hqToEdit) {
//             setEditingId(id);
//             setName(hqToEdit.name);
//             setHeadquarterCode(hqToEdit.headquarterCode);
//             setDescription(hqToEdit.description);
//             setOpen(true);
//         }
//     };

//     // Closes the dialog
//     const handleCloseDialog = () => {
//         setOpen(false);
//     };

//     // Handles both saving a new record and updating an existing one
//     const handleSave = async () => {
//         if (!name || !headquarterCode || !description) {
//             alert("Please fill all required fields.");
//             return;
//         }

//         const payload = {
//             headquarter_name: name,
//             headquarter_division_code: headquarterCode,
//             description: description,
//         };

//         try {
//             if (editingId) {
//                 // Update existing headquarter (assuming PUT endpoint)
//                 await axios.put(`${API_URL}${editingId}/`, payload);
//             } else {
//                 // Add new headquarter
//                 await axios.post(API_URL, payload);
//             }
//             // Refresh data and close dialog
//             fetchHeadquarters();
//             handleCloseDialog();
//         } catch (err) {
//             setError(`Failed to save headquarter: ${err.message}`);
//             console.error("Save operation failed:", err);
//         }
//     };

//     // Deletes a headquarter after confirmation
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this headquarter?")) {
//             try {
//                 await axios.delete(`${API_URL}${id}/`);
//                 // Refresh data from server
//                 fetchHeadquarters();
//             } catch (err) {
//                 setError(`Failed to delete headquarter: ${err.message}`);
//                 console.error("Delete operation failed:", err);
//             }
//         }
//     };

//     // Filters headquarters based on the search query
//     const filteredHQs = headquarters.filter((hq) =>
//         hq.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <Box p={4}>
//             <Typography variant="h4" gutterBottom>
//                 Headquarter Management
//             </Typography>

//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//             {/* Search and Add Button */}
//             <Grid container spacing={2} alignItems="center" mb={3}>
//                 <Grid item xs={12} md={8}>
//                     <TextField
//                         fullWidth
//                         placeholder="Search Headquarter"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         size="small"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ whiteSpace: 'nowrap', height: '100%' }}
//                         onClick={handleOpenDialog}
//                     >
//                         ADD NEW HEADQUARTER
//                     </Button>
//                 </Grid>
//             </Grid>

//             {/* Table */}
//             <Paper elevation={3}>
//                 <TableContainer>
//                     <Table>
//                         <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                             <TableRow>
//                                 <TableCell><strong>Headquarter Name</strong></TableCell>
//                                 <TableCell><strong>Headquarter Code</strong></TableCell>
//                                 <TableCell><strong>Created Date</strong></TableCell>
//                                 <TableCell align="right"><strong>Actions</strong></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={4} align="center">
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : filteredHQs.length > 0 ? (
//                                 filteredHQs.map((hq) => (
//                                     <TableRow key={hq.id} hover>
//                                         <TableCell>{hq.name}</TableCell>
//                                         <TableCell>{hq.headquarterCode}</TableCell>
//                                         <TableCell>{hq.createdAt}</TableCell>
//                                         <TableCell align="right">
//                                             <IconButton color="primary" onClick={() => handleEdit(hq.id)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={4} align="center">
//                                         No records found
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Paper>

//             {/* Add/Edit Dialog */}
//             <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle>{editingId ? 'Edit Headquarter' : 'Add New Headquarter'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Headquarter Name"
//                         fullWidth
//                         variant="outlined"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Headquarter Code"
//                         fullWidth
//                         variant="outlined"
//                         value={headquarterCode}
//                         onChange={(e) => setHeadquarterCode(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Description"
//                         fullWidth
//                         variant="outlined"
//                         multiline
//                         minRows={2}
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     <Button onClick={handleSave} variant="contained" color="primary">
//                         {editingId ? 'Update' : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;    ///// 







// import React, { useState, useEffect, useMemo } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Alert,
//     Select,         // Added for pagination
//     MenuItem,       // Added for pagination
//     FormControl,    // Added for pagination
//     InputLabel      // Added for pagination
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import dayjs from 'dayjs';

// // Base URL for the API
// const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

// const Headquarters = () => {
//     // State Management
//     const [headquarters, setHeadquarters] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [open, setOpen] = useState(false);

//     // Form state
//     const [name, setName] = useState('');
//     const [headquarterCode, setHeadquarterCode] = useState('');
//     const [description, setDescription] = useState('');
//     const [editingId, setEditingId] = useState(null);

//     // UI State
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // --- NEW: State for pagination ---
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     // Fetch data from the API
//     const fetchHeadquarters = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(API_URL);
//             const formattedData = response.data.map(hq => ({
//                 id: hq.headquarter_id,
//                 name: hq.headquarter_name,
//                headquarterCode: hq.headquarter_code,
//                 description: hq.description,
//                 createdAt: dayjs(hq.created_at).format('DD-MM-YYYY'),
//             }));
//             setHeadquarters(formattedData);
//         } catch (err) {
//             setError('Failed to fetch headquarters. Please try again later.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchHeadquarters();
//     }, []);

//     const handleOpenDialog = () => {
//         setEditingId(null);
//         setName('');
//         setHeadquarterCode('');
//         setDescription('');
//         setOpen(true);
//     };

//     const handleEdit = (id) => {
//         const hqToEdit = headquarters.find((h) => h.id === id);
//         if (hqToEdit) {
//             setEditingId(id);
//             setName(hqToEdit.name);
//             setHeadquarterCode(hqToEdit.headquarterCode);
//             setDescription(hqToEdit.description);
//             setOpen(true);
//         }
//     };

//     const handleCloseDialog = () => {
//         setOpen(false);
//     };

//     const handleSave = async () => {
//         if (!name || !headquarterCode || !description) {
//             alert("Please fill all required fields.");
//             return;
//         }

//         const payload = {
//             headquarter_name: name,
//             headquarter_division_code: headquarterCode,
//             description: description,
//         };

//         try {
//             if (editingId) {
//                 await axios.put(`${API_URL}${editingId}/`, payload);
//             } else {
//                 await axios.post(API_URL, payload);
//             }
//             fetchHeadquarters();
//             handleCloseDialog();
//         } catch (err) {
//             setError(`Failed to save headquarter: ${err.message}`);
//             console.error("Save operation failed:", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this headquarter?")) {
//             try {
//                 await axios.delete(`${API_URL}${id}/`);
//                 fetchHeadquarters();
//             } catch (err) {
//                 setError(`Failed to delete headquarter: ${err.message}`);
//                 console.error("Delete operation failed:", err);
//             }
//         }
//     };

//     const filteredHQs = headquarters.filter((hq) =>
//         hq.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // --- NEW: Pagination Logic ---
//     const paginatedHQs = useMemo(() =>
//         filteredHQs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//         [filteredHQs, page, rowsPerPage]
//     );
//     const totalPages = Math.ceil(filteredHQs.length / rowsPerPage);

//     // --- NEW: Reusable purple button style ---
//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7",
//         color: "#fff",
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Headquarter Management
//             </Typography>

//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//             <Grid container spacing={2} alignItems="center" mb={2}>
//                 <Grid item xs={12} md={8}>
//                     <TextField
//                         fullWidth
//                         placeholder="Search Headquarter"
//                         value={searchQuery}
//                         onChange={(e) => {
//                             setSearchQuery(e.target.value);
//                             setPage(0); // Reset page on new search
//                         }}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         size="small"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     {/* --- UPDATED: Button color --- */}
//                     <Button
//                         variant="contained"
//                         sx={purpleButtonStyle}
//                         fullWidth
//                         onClick={handleOpenDialog}
//                     >
//                         ADD NEW HEADQUARTER
//                     </Button>
//                 </Grid>
//             </Grid>

//             <Paper elevation={3} sx={{ p: 2 }}>
//                 {/* --- NEW: Rows per page dropdown --- */}
//                 <Box sx={{ mb: 2 }}>
//                     <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//                         <InputLabel>Rows</InputLabel>
//                         <Select
//                             value={rowsPerPage}
//                             label="Rows"
//                             onChange={(e) => {
//                                 setRowsPerPage(parseInt(e.target.value, 10));
//                                 setPage(0);
//                             }}
//                         >
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//                 <TableContainer>
//                     <Table>
//                         {/* --- UPDATED: Table Head style --- */}
//                         <TableHead>
//                             <TableRow>
//                                 {/* --- NEW: SR. NO. Column --- */}
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', width: '80px' }}>SR. NO.</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Headquarter Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Headquarter Code</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Created Date</TableCell>
//                                 <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center">
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                                 // --- UPDATED: Map over paginatedHQs ---
//                             ) : paginatedHQs.length > 0 ? (
//                                 paginatedHQs.map((hq, index) => (
//                                     <TableRow key={hq.id} hover>
//                                         {/* --- NEW: SR. NO. Cell with correct calculation --- */}
//                                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell>{hq.name}</TableCell>
//                                         <TableCell>{hq.headquarterCode}</TableCell>
//                                         <TableCell>{hq.createdAt}</TableCell>
//                                         <TableCell align="right">
//                                             {/* --- UPDATED: Edit icon color --- */}
//                                             <IconButton sx={{ color: '#673ab7' }} onClick={() => handleEdit(hq.id)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center">
//                                         No records found
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* --- NEW: Pagination Controls --- */}
//                 {filteredHQs.length > 0 && (
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(p => p - 1)}
//                             disabled={page === 0}
//                             sx={purpleButtonStyle}
//                         >
//                             Previous
//                         </Button>
//                         <Typography>
//                             Page {page + 1} of {totalPages > 0 ? totalPages : 1}
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(p => p + 1)}
//                             disabled={page >= totalPages - 1}
//                             sx={purpleButtonStyle}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle>{editingId ? 'Edit Headquarter' : 'Add New Headquarter'}</DialogTitle>
//                 <DialogContent>
//                     <TextField autoFocus margin="dense" label="Headquarter Name" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
//                     <TextField margin="dense" label="Headquarter Code" fullWidth variant="outlined" value={headquarterCode} onChange={(e) => setHeadquarterCode(e.target.value)} required />
//                     <TextField margin="dense" label="Description" fullWidth variant="outlined" multiline minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     {/* --- UPDATED: Button color --- */}
//                     <Button onClick={handleSave} variant="contained" sx={purpleButtonStyle}>
//                         {editingId ? 'Update' : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;












// import React, { useState, useEffect, useMemo } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     CircularProgress,
//     Alert,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import dayjs from 'dayjs';

// // Base URL for the API
// const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

// const Headquarters = () => {
//     // --- State Management ---
//     const [headquarters, setHeadquarters] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [open, setOpen] = useState(false);

//     // Form state
//     const [name, setName] = useState('');
//     const [headquarterCode, setHeadquarterCode] = useState('');
//     const [description, setDescription] = useState('');
//     const [editingId, setEditingId] = useState(null);

//     // UI State
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Pagination State
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 entries

//     // --- NEW: Standardized Color Palette & Styles ---
//     const primaryColor = '#8C257C'; // Standard Purple
//     // const secondaryColor = '#F58E35'; // Standard Orange (for future use)

//     const primaryButtonStyle = {
//         backgroundColor: primaryColor,
//         color: '#fff',
//         '&:hover': {
//             backgroundColor: '#7a206c', // Darker shade for hover
//         },
//     };

//     const tableHeaderStyle = {
//         backgroundColor: primaryColor,
//         color: '#fff',
//         fontWeight: 'bold',
//     };

//     // --- Data Fetching ---
//     const fetchHeadquarters = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(API_URL);
//             const formattedData = response.data.map(hq => ({
//                 id: hq.headquarter_id,
//                 name: hq.headquarter_name,
//                 headquarterCode: hq.headquarter_code,
//                 description: hq.description,
//                 createdAt: dayjs(hq.created_at).format('DD-MM-YYYY'),
//             }));
//             setHeadquarters(formattedData);
//         } catch (err) {
//             setError('Failed to fetch headquarters. Please try again later.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchHeadquarters();
//     }, []);


//     // --- Dialog and Form Handlers ---
//     const handleOpenDialog = () => {
//         setEditingId(null);
//         setName('');
//         setHeadquarterCode('');
//         setDescription('');
//         setOpen(true);
//     };

//     const handleEdit = (id) => {
//         const hqToEdit = headquarters.find((h) => h.id === id);
//         if (hqToEdit) {
//             setEditingId(id);
//             setName(hqToEdit.name);
//             setHeadquarterCode(hqToEdit.headquarterCode);
//             setDescription(hqToEdit.description);
//             setOpen(true);
//         }
//     };

//     const handleCloseDialog = () => {
//         setOpen(false);
//     };

//     // --- CRUD Operations ---
//     const handleSave = async () => {
//         if (!name || !headquarterCode || !description) {
//             alert("Please fill all required fields.");
//             return;
//         }

//         const payload = {
//             headquarter_name: name,
//             headquarter_division_code: headquarterCode, // Assuming this is correct
//             description: description,
//         };

//         try {
//             if (editingId) {
//                 await axios.put(`${API_URL}${editingId}/`, payload);
//             } else {
//                 await axios.post(API_URL, payload);
//             }
//             fetchHeadquarters();
//             handleCloseDialog();
//         } catch (err) {
//             setError(`Failed to save headquarter: ${err.message}`);
//             console.error("Save operation failed:", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this headquarter?")) {
//             try {
//                 await axios.delete(`${API_URL}${id}/`);
//                 fetchHeadquarters();
//             } catch (err) {
//                 setError(`Failed to delete headquarter: ${err.message}`);
//                 console.error("Delete operation failed:", err);
//             }
//         }
//     };

//     // --- Filtering and Pagination Logic ---
//     const filteredHQs = useMemo(() =>
//         headquarters.filter((hq) =>
//             hq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             hq.headquarterCode.toLowerCase().includes(searchQuery.toLowerCase())
//         ), [headquarters, searchQuery]);

//     const paginatedHQs = useMemo(() =>
//         filteredHQs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//         [filteredHQs, page, rowsPerPage]
//     );
//     const totalPages = Math.ceil(filteredHQs.length / rowsPerPage);

//     return (
//         <Box p={3}>
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Headquarter Management
//             </Typography>

//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//             <Paper elevation={3} sx={{ p: 2 }}>
//                 {/* --- UPDATED: Top Controls Layout (Add Button & Search) --- */}
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
//                     <Button
//                         variant="contained"
//                         sx={primaryButtonStyle}
//                         onClick={handleOpenDialog}
//                     >
//                         ADD NEW HEADQUARTER
//                     </Button>
//                     <Box sx={{ minWidth: 300 }}>
//                         <TextField
//                             fullWidth
//                             placeholder="Search by Name or Code"
//                             value={searchQuery}
//                             onChange={(e) => {
//                                 setSearchQuery(e.target.value);
//                                 setPage(0); // Reset page on new search
//                             }}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon />
//                                     </InputAdornment>
//                                 ),
//                             }}
//                             size="small"
//                         />
//                     </Box>
//                 </Box>

//                 <TableContainer>
//                     <Table>
//                         {/* --- UPDATED: Table Head with new standard style --- */}
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell sx={{ ...tableHeaderStyle, width: '80px' }}>SR. NO.</TableCell>
//                                 <TableCell sx={tableHeaderStyle}>Headquarter Name</TableCell>
//                                 <TableCell sx={tableHeaderStyle}>Headquarter Code</TableCell>
//                                 <TableCell sx={tableHeaderStyle}>Created Date</TableCell>
//                                 <TableCell align="right" sx={tableHeaderStyle}>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center">
//                                         <CircularProgress sx={{ color: primaryColor }} />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : paginatedHQs.length > 0 ? (
//                                 paginatedHQs.map((hq, index) => (
//                                     <TableRow key={hq.id} hover>
//                                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell>{hq.name}</TableCell>
//                                         <TableCell>{hq.headquarterCode}</TableCell>
//                                         <TableCell>{hq.createdAt}</TableCell>
//                                         <TableCell align="right">
//                                             <IconButton sx={{ color: primaryColor }} onClick={() => handleEdit(hq.id)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center">
//                                         No records found
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* --- NEW: Standardized Bottom Controls Layout --- */}
//                 {filteredHQs.length > 0 && (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, flexWrap: 'wrap', gap: 2 }}>
//                         {/* Bottom Left: Total Rows & Rows per Page */}
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                                 Total Rows: {filteredHQs.length}
//                             </Typography>
//                             <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
//                                 <InputLabel>Rows</InputLabel>
//                                 <Select
//                                     value={rowsPerPage}
//                                     label="Rows"
//                                     onChange={(e) => {
//                                         setRowsPerPage(parseInt(e.target.value, 10));
//                                         setPage(0);
//                                     }}
//                                 >
//                                     <MenuItem value={10}>10</MenuItem>
//                                     <MenuItem value={25}>25</MenuItem>
//                                     <MenuItem value={50}>50</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>

//                         {/* Bottom Right: Pagination */}
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Button
//                                 variant="contained"
//                                 onClick={() => setPage(p => Math.max(0, p - 1))}
//                                 disabled={page === 0}
//                                 sx={primaryButtonStyle}
//                             >
//                                 Previous
//                             </Button>
//                             <Typography>
//                                 Page {page + 1} of {totalPages > 0 ? totalPages : 1}
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
//                                 disabled={page >= totalPages - 1}
//                                 sx={primaryButtonStyle}
//                             >
//                                 Next
//                             </Button>
//                         </Box>
//                     </Box>
//                 )}
//             </Paper>

//             <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle>{editingId ? 'Edit Headquarter' : 'Add New Headquarter'}</DialogTitle>
//                 <DialogContent>
//                     <TextField autoFocus margin="dense" label="Headquarter Name" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
//                     <TextField margin="dense" label="Headquarter Code" fullWidth variant="outlined" value={headquarterCode} onChange={(e) => setHeadquarterCode(e.target.value)} required />
//                     <TextField margin="dense" label="Description" fullWidth variant="outlined" multiline minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     <Button onClick={handleSave} variant="contained" sx={primaryButtonStyle}>
//                         {editingId ? 'Update' : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;










// import React, { useState, useEffect, useMemo } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Alert,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

// const Headquarters = () => {
//     const [headquarters, setHeadquarters] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [open, setOpen] = useState(false);

//     const [name, setName] = useState('');
//     const [headquarterCode, setHeadquarterCode] = useState('');
//     const [headquarterAddress, setHeadquarterAddress] = useState('');
//     const [description, setDescription] = useState('');
//     const [editingId, setEditingId] = useState(null);

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const fetchHeadquarters = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get(API_URL);
//             const formattedData = response.data.map(hq => ({
//                 id: hq.headquarter_id,
//                 name: hq.headquarter_name,
//                 headquarterCode: hq.headquarter_code,
//                 address: hq.headquarter_address,
//                 description: hq.description,
//                 createdAt: dayjs(hq.created_at).format('DD-MM-YYYY'),
//             }));
//             setHeadquarters(formattedData);
//         } catch (err) {
//             setError('Failed to fetch headquarters. Please try again later.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchHeadquarters();
//     }, []);

//     const handleOpenDialog = () => {
//         setEditingId(null);
//         setName('');
//         setHeadquarterCode('');
//         setHeadquarterAddress('');
//         setDescription('');
//         setOpen(true);
//     };

//     const handleEdit = (id) => {
//         const hqToEdit = headquarters.find((h) => h.id === id);
//         if (hqToEdit) {
//             setEditingId(id);
//             setName(hqToEdit.name);
//             setHeadquarterCode(hqToEdit.headquarterCode);
//             setHeadquarterAddress(hqToEdit.address);
//             setDescription(hqToEdit.description);
//             setOpen(true);
//         }
//     };

//     const handleCloseDialog = () => {
//         setOpen(false);
//     };

//     const handleSave = async () => {
//         if (!name || !headquarterCode || !description || !headquarterAddress) {
//             alert("Please fill all required fields.");
//             return;
//         }

//         const payload = {
//             headquarter_name: name,
//             headquarter_code: headquarterCode,
//             headquarter_address: headquarterAddress,
//             description: description,
//         };

//         try {
//             if (editingId) {
//                 await axios.patch(`${API_URL}${editingId}/`, payload);
//             } else {
//                 await axios.post(API_URL, payload);
//             }
//             fetchHeadquarters();
//             handleCloseDialog();
//         } catch (err) {
//             setError(`Failed to save headquarter: ${err.message}`);
//             console.error("Save operation failed:", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this headquarter?")) {
//             try {
//                 await axios.delete(`${API_URL}${id}/`);
//                 fetchHeadquarters();
//             } catch (err) {
//                 setError(`Failed to delete headquarter: ${err.message}`);
//                 console.error("Delete operation failed:", err);
//             }
//         }
//     };

//     const filteredHQs = headquarters.filter((hq) =>
//         hq.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const paginatedHQs = useMemo(() =>
//         filteredHQs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredHQs, page, rowsPerPage]
//     );
//     const totalPages = Math.ceil(filteredHQs.length / rowsPerPage);

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7",
//         color: "#fff",
//         "&:hover": { backgroundColor: "#5e35b1" },
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Headquarter Management
//             </Typography>

//             {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//             <Grid container spacing={2} alignItems="center" mb={2}>
//                 <Grid item xs={12} md={8}>
//                     <TextField
//                         fullWidth
//                         placeholder="Search Headquarter"
//                         value={searchQuery}
//                         onChange={(e) => {
//                             setSearchQuery(e.target.value);
//                             setPage(0);
//                         }}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         size="small"
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Button
//                         variant="contained"
//                         sx={purpleButtonStyle}
//                         fullWidth
//                         onClick={handleOpenDialog}
//                     >
//                         ADD NEW HEADQUARTER
//                     </Button>
//                 </Grid>
//             </Grid>

//             <Paper elevation={3} sx={{ p: 2 }}>
//                 <Box sx={{ mb: 2 }}>
//                     <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//                         <InputLabel>Rows</InputLabel>
//                         <Select
//                             value={rowsPerPage}
//                             label="Rows"
//                             onChange={(e) => {
//                                 setRowsPerPage(parseInt(e.target.value, 10));
//                                 setPage(0);
//                             }}
//                         >
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Box>
//                 <TableContainer>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', width: '80px' }}>SR. NO.</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Headquarter Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Headquarter Code</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Created Date</TableCell>
//                                 <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center">
//                                         <CircularProgress />
//                                     </TableCell>
//                                 </TableRow>
//                             ) : paginatedHQs.length > 0 ? (
//                                 paginatedHQs.map((hq, index) => (
//                                     <TableRow key={hq.id} hover>
//                                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell>{hq.name}</TableCell>
//                                         <TableCell>{hq.headquarterCode}</TableCell>
//                                         <TableCell>{hq.createdAt}</TableCell>
//                                         <TableCell align="right">
//                                             <IconButton sx={{ color: '#673ab7' }} onClick={() => handleEdit(hq.id)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={5} align="center">
//                                         No records found
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {filteredHQs.length > 0 && (
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(p => p - 1)}
//                             disabled={page === 0}
//                             sx={purpleButtonStyle}
//                         >
//                             Previous
//                         </Button>
//                         <Typography>
//                             Page {page + 1} of {totalPages > 0 ? totalPages : 1}
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             onClick={() => setPage(p => p + 1)}
//                             disabled={page >= totalPages - 1}
//                             sx={purpleButtonStyle}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>

//             <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle>{editingId ? 'Edit Headquarter' : 'Add New Headquarter'}</DialogTitle>
//                 <DialogContent>
//                     <TextField autoFocus margin="dense" label="Headquarter Name" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
//                     <TextField margin="dense" label="Headquarter Code" fullWidth variant="outlined" value={headquarterCode} onChange={(e) => setHeadquarterCode(e.target.value)} required />
//                     <TextField margin="dense" label="Headquarter Address" fullWidth variant="outlined" value={headquarterAddress} onChange={(e) => setHeadquarterAddress(e.target.value)} required />
//                     <TextField margin="dense" label="Description" fullWidth variant="outlined" multiline minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     <Button onClick={handleSave} variant="contained" sx={purpleButtonStyle}>
//                         {editingId ? 'Update' : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;






// import React from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Skeleton,
//     TablePagination,
//     useTheme,
//     useMediaQuery,
// } from '@mui/material';
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Search as SearchIcon,
//     Add,
// } from '@mui/icons-material';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

// const Headquarters = () => {
//     // --- State Management ---
//     const [headquarters, setHeadquarters] = React.useState([]);
//     const [searchTerm, setSearchTerm] = React.useState('');
//     const [openDialog, setOpenDialog] = React.useState(false);
//     const [formState, setFormState] = React.useState({
//         name: '',
//         headquarterCode: '',
//         headquarterAddress: '',
//         description: '',
//     });
//     const [editingId, setEditingId] = React.useState(null);
//     const [loading, setLoading] = React.useState(true);
//     const [isSubmitting, setIsSubmitting] = React.useState(false);
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);

//     // --- Theme and Responsiveness ---
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//     const primaryColor = "#8C257C";
//     const primaryDarkColor = "#6d1d60";

//     // --- Styles ---
//     const primaryButtonStyle = {
//         backgroundColor: primaryColor,
//         color: "#FFFFFF",
//         "&:hover": { backgroundColor: primaryDarkColor },
//     };

//     // --- Data Fetching ---
//     const fetchHeadquarters = async () => {
//         if (!loading) setLoading(true);
//         try {
//             const response = await axios.get(API_URL);
//             const formattedData = response.data.map(hq => ({
//                 id: hq.headquarter_id,
//                 name: hq.headquarter_name,
//                 headquarterCode: hq.headquarter_code,
//                 address: hq.headquarter_address,
//                 description: hq.description,
//                 createdAt: dayjs(hq.created_at).format('DD-MM-YYYY'),
//             }));
//             setHeadquarters(formattedData);
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Error',
//                 text: 'Failed to fetch headquarters. Please try again later.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     React.useEffect(() => {
//         fetchHeadquarters();
//     }, []);

//     // --- Dialog Handlers ---
//     const handleOpenDialog = (hq = null) => {
//         if (hq) {
//             setEditingId(hq.id);
//             setFormState({
//                 name: hq.name,
//                 headquarterCode: hq.headquarterCode,
//                 headquarterAddress: hq.address,
//                 description: hq.description,
//             });
//         } else {
//             setEditingId(null);
//             setFormState({
//                 name: '',
//                 headquarterCode: '',
//                 headquarterAddress: '',
//                 description: '',
//             });
//         }
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         if (isSubmitting) return;
//         setOpenDialog(false);
//     };

//     // --- Form Handlers ---
//     const handleFormChange = (e) => {
//         setFormState({ ...formState, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         const { name, headquarterCode, headquarterAddress, description } = formState;
//         if (!name || !headquarterCode || !headquarterAddress || !description) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Validation Error',
//                 text: 'Please fill all required fields.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             return;
//         }

//         setIsSubmitting(true);
//         const payload = {
//             headquarter_name: name,
//             headquarter_code: headquarterCode,
//             headquarter_address: headquarterAddress,
//             description: description,
//         };

//         try {
//             const promise = editingId
//                 ? axios.patch(`${API_URL}${editingId}/`, payload)
//                 : axios.post(API_URL, payload);

//             await promise;
//             fetchHeadquarters();
//             handleCloseDialog();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: `Headquarter has been ${editingId ? 'updated' : 'saved'} successfully.`,
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Save Error',
//                 text: `Failed to save headquarter: ${err.message}`,
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             console.error("Save operation failed:", err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // --- Delete Handler ---
//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: primaryColor,
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await axios.delete(`${API_URL}${id}/`);
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Deleted!',
//                         text: 'The headquarter has been deleted.',
//                         timer: 3000,
//                         showConfirmButton: false,
//                     });
//                     fetchHeadquarters();
//                 } catch (err) {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Delete Error',
//                         text: `Failed to delete headquarter: ${err.message}`,
//                         timer: 3000,
//                         showConfirmButton: false,
//                     });
//                     console.error("Delete operation failed:", err);
//                 }
//             }
//         });
//     };

//     // --- Filtering and Pagination ---
//     const filteredData = headquarters.filter((hq) =>
//         hq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         hq.headquarterCode.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const paginatedData = filteredData.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: primaryColor, fontWeight: 'bold', mb: 4 }}>
//                 Headquarter 
//             </Typography>

//             <Box
//                 mb={2}
//                 display="flex"
//                 flexDirection={isMobile ? "column" : "row"}
//                 justifyContent="space-between"
//                 alignItems={isMobile ? "stretch" : "center"}
//                 gap={2}
//             >
//                 <Button
//                     variant="contained"
//                     sx={primaryButtonStyle}
//                     startIcon={<Add />}
//                     onClick={() => handleOpenDialog()}
//                 >
//                     Add New
//                 </Button>
//                 <TextField
//                     size="small"
//                     placeholder="Search ..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                     sx={{ width: isMobile ? "100%" : "auto" }}
//                 />
//             </Box>

//             <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: primaryColor }}>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>Name</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>Code</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>Created Date</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }} align="center">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(5)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center">
//                                         <Skeleton variant="rectangular" width={120} height={30} />
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             paginatedData.map((hq, index) => (
//                                 <TableRow key={hq.id} hover>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{hq.name}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{hq.headquarterCode}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{hq.createdAt}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                             <IconButton size="small" sx={{ color: primaryColor }} onClick={() => handleOpenDialog(hq)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton size="small" color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                         {!loading && paginatedData.length === 0 && (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">No records found</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box
//                 mt={2}
//                 display="flex"
//                 flexDirection={isMobile ? "column" : "row"}
//                 justifyContent="space-between"
//                 alignItems="center"
//                 gap={2}
//             >
//                 <Typography variant="body2" color="text.secondary">
//                     Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//                 </Typography>
//                 <TablePagination
//                     component="div"
//                     count={filteredData.length}
//                     page={page}
//                     onPageChange={(e, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(e) => {
//                         setRowsPerPage(parseInt(e.target.value, 10));
//                         setPage(0);
//                     }}
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     sx={{
//                         "& .MuiSvgIcon-root": { color: primaryColor },
//                     }}
//                 />
//             </Box>

//             <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
//                     {editingId ? 'Edit Headquarter' : 'Add New Headquarter'}
//                 </DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField name="name" label="Headquarter Name" fullWidth value={formState.name} onChange={handleFormChange} required />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField name="headquarterCode" label="Headquarter Code" fullWidth value={formState.headquarterCode} onChange={handleFormChange} required />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField name="headquarterAddress" label="Headquarter Address" fullWidth value={formState.headquarterAddress} onChange={handleFormChange} required />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField name="description" label="Description" fullWidth multiline minRows={2} value={formState.description} onChange={handleFormChange} required />
//                         </Grid>
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions sx={{ p: '16px 24px' }}>
//                     <Button
//                         onClick={handleCloseDialog}
//                         sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//                         disabled={isSubmitting}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleSave}
//                         variant="contained"
//                         sx={primaryButtonStyle}
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : (editingId ? 'Update' : 'Save')}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;











// import React from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     InputAdornment,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Skeleton,
//     TablePagination,
//     useTheme,
//     useMediaQuery,
// } from '@mui/material';
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Search as SearchIcon,
//     Add,
// } from '@mui/icons-material';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

// const Headquarters = () => {
//     // --- State Management ---
//     const [headquarters, setHeadquarters] = React.useState([]);
//     const [searchTerm, setSearchTerm] = React.useState('');
//     const [openDialog, setOpenDialog] = React.useState(false);
//     // Change 1: Removed description from form state
//     const [formState, setFormState] = React.useState({
//         name: '',
//         headquarterCode: '',
//         headquarterAddress: '',
//     });
//     const [editingId, setEditingId] = React.useState(null);
//     const [loading, setLoading] = React.useState(true);
//     const [isSubmitting, setIsSubmitting] = React.useState(false);
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);

//     // --- Theme and Responsiveness ---
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//     const primaryColor = "#8C257C";
//     const primaryDarkColor = "#6d1d60";

//     // --- Styles ---
//     const primaryButtonStyle = {
//         backgroundColor: primaryColor,
//         color: "#FFFFFF",
//         "&:hover": { backgroundColor: primaryDarkColor },
//     };

//     // --- Data Fetching ---
//     const fetchHeadquarters = async () => {
//         if (!loading) setLoading(true);
//         try {
//             const response = await axios.get(API_URL);
            
//             // Change 3: Sort data to show latest entries on top
//             const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//             const formattedData = sortedData.map(hq => ({
//                 id: hq.headquarter_id,
//                 name: hq.headquarter_name,
//                 headquarterCode: hq.headquarter_code,
//                 address: hq.headquarter_address,
//                 description: hq.description, // Keeping this for potential future use, but it's not in the form
//                 // Change 3: Update date format to DD/MM/YYYY
//                 createdAt: dayjs(hq.created_at).format('DD/MM/YYYY'),
//             }));
//             setHeadquarters(formattedData);
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Error',
//                 text: 'Failed to fetch headquarters. Please try again later.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     React.useEffect(() => {
//         fetchHeadquarters();
//     }, []);

//     // --- Dialog Handlers ---
//     const handleOpenDialog = (hq = null) => {
//         if (hq) {
//             setEditingId(hq.id);
//             // Change 1 & 2: Removed description from form state when editing
//             setFormState({
//                 name: hq.name,
//                 headquarterCode: hq.headquarterCode,
//                 headquarterAddress: hq.address,
//             });
//         } else {
//             setEditingId(null);
//             // Change 1: Removed description from form state when adding
//             setFormState({
//                 name: '',
//                 headquarterCode: '',
//                 headquarterAddress: '',
//             });
//         }
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         if (isSubmitting) return;
//         setOpenDialog(false);
//     };

//     // --- Form Handlers ---
//     const handleFormChange = (e) => {
//         setFormState({ ...formState, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         // Change 1 & 2: Removed description from destructuring and validation
//         const { name, headquarterCode, headquarterAddress } = formState;
//         if (!name || !headquarterCode || !headquarterAddress) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Validation Error',
//                 text: 'Please fill all required fields.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             return;
//         }

//         setIsSubmitting(true);
//         // Change 1 & 2: Removed description from the payload sent to the API
//         const payload = {
//             headquarter_name: name,
//             headquarter_code: headquarterCode,
//             headquarter_address: headquarterAddress,
//         };

//         try {
//             const promise = editingId
//                 ? axios.patch(`${API_URL}${editingId}/`, payload)
//                 : axios.post(API_URL, payload);

//             await promise;
//             fetchHeadquarters();
//             handleCloseDialog();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: `Headquarter has been ${editingId ? 'updated' : 'saved'} successfully.`,
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Save Error',
//                 text: `Failed to save headquarter: ${err.message}`,
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             console.error("Save operation failed:", err);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // --- Delete Handler ---
//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: primaryColor,
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await axios.delete(`${API_URL}${id}/`);
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Deleted!',
//                         text: 'The headquarter has been deleted.',
//                         timer: 3000,
//                         showConfirmButton: false,
//                     });
//                     fetchHeadquarters();
//                 } catch (err) {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Delete Error',
//                         text: `Failed to delete headquarter: ${err.message}`,
//                         timer: 3000,
//                         showConfirmButton: false,
//                     });
//                     console.error("Delete operation failed:", err);
//                 }
//             }
//         });
//     };

//     // --- Filtering and Pagination ---
//     const filteredData = headquarters.filter((hq) =>
//         hq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         hq.headquarterCode.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const paginatedData = filteredData.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: primaryColor, fontWeight: 'bold', mb: 4 }}>
//                 Headquarter
//             </Typography>

//             <Box
//                 mb={2}
//                 display="flex"
//                 flexDirection={isMobile ? "column" : "row"}
//                 justifyContent="space-between"
//                 alignItems={isMobile ? "stretch" : "center"}
//                 gap={2}
//             >
//                 <Button
//                     variant="contained"
//                     sx={primaryButtonStyle}
//                     startIcon={<Add />}
//                     onClick={() => handleOpenDialog()}
//                 >
//                     Add New
//                 </Button>
//                 <TextField
//                     size="small"
//                     placeholder="Search ..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                     sx={{ width: isMobile ? "100%" : "auto" }}
//                 />
//             </Box>

//             <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: primaryColor }}>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>Name</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>Code</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }}>Created Date</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: '#FFFFFF', textTransform: 'uppercase' }} align="center">Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(5)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center">
//                                         <Skeleton variant="rectangular" width={120} height={30} />
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             paginatedData.map((hq, index) => (
//                                 <TableRow key={hq.id} hover>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{hq.name}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{hq.headquarterCode}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{hq.createdAt}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                             <IconButton size="small" sx={{ color: primaryColor }} onClick={() => handleOpenDialog(hq)}>
//                                                 <EditIcon />
//                                             </IconButton>
//                                             <IconButton size="small" color="error" onClick={() => handleDelete(hq.id)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                         {!loading && paginatedData.length === 0 && (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">No records found</TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box
//                 mt={2}
//                 display="flex"
//                 flexDirection={isMobile ? "column" : "row"}
//                 justifyContent="space-between"
//                 alignItems="center"
//                 gap={2}
//             >
//                 <Typography variant="body2" color="text.secondary">
//                     Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//                 </Typography>
//                 <TablePagination
//                     component="div"
//                     count={filteredData.length}
//                     page={page}
//                     onPageChange={(e, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(e) => {
//                         setRowsPerPage(parseInt(e.target.value, 10));
//                         setPage(0);
//                     }}
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     sx={{
//                         "& .MuiSvgIcon-root": { color: primaryColor },
//                     }}
//                 />
//             </Box>

//             <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
//                     {editingId ? 'Edit Headquarter' : 'Add New Headquarter'}
//                 </DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField name="name" label="Headquarter Name" fullWidth value={formState.name} onChange={handleFormChange} required />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField name="headquarterCode" label="Headquarter Code" fullWidth value={formState.headquarterCode} onChange={handleFormChange} required />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField name="headquarterAddress" label="Headquarter Address" fullWidth value={formState.headquarterAddress} onChange={handleFormChange} required />
//                         </Grid>
//                         {/* Change 1 & 2: Removed the Description TextField from the dialog */}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions sx={{ p: '16px 24px' }}>
//                     <Button
//                         onClick={handleCloseDialog}
//                         sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//                         disabled={isSubmitting}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleSave}
//                         variant="contained"
//                         sx={primaryButtonStyle}
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : (editingId ? 'Update' : 'Save')}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Headquarters;







import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    CircularProgress,
    Skeleton,
    // --- START: NEW PAGINATION IMPORTS ---
    Pagination,
    FormControl,
    Select,
    MenuItem,
    // --- END: NEW PAGINATION IMPORTS ---
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Add,
} from '@mui/icons-material';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const API_URL = 'https://tdtlworld.com/hrms-backend/api/headquarters/';

const Headquarters = () => {
    // --- State Management ---
    const [headquarters, setHeadquarters] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: '',
        headquarterCode: '',
        headquarterAddress: '',
    });
    const [editingId, setEditingId] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5); // Default to 5 to match new style

    // --- Theme and Responsiveness ---
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryHoverColor = "#6d1d60";
    // --- START: NEW PAGINATION COLOR ---
    const secondaryColor = "#F58E35"; // Added for hover effects
    const textOnPrimary = "#FFFFFF";
    // --- END: NEW PAGINATION COLOR ---

    // --- Styles ---
    const primaryButtonStyle = {
        backgroundColor: primaryColor,
        color: textOnPrimary,
        "&:hover": { backgroundColor: primaryHoverColor },
    };

    // --- Data Fetching ---
    const fetchHeadquarters = async () => {
        if (!loading) setLoading(true);
        try {
            const response = await axios.get(API_URL);
            const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const formattedData = sortedData.map(hq => ({
                id: hq.headquarter_id,
                name: hq.headquarter_name,
                headquarterCode: hq.headquarter_code,
                address: hq.headquarter_address,
                description: hq.description,
                createdAt: dayjs(hq.created_at).format('DD/MM/YYYY'),
            }));
            setHeadquarters(formattedData);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Fetch Error',
                text: 'Failed to fetch headquarters. Please try again later.',
                timer: 3000,
                showConfirmButton: false,
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchHeadquarters();
    }, []);

    // --- Dialog Handlers ---
    const handleOpenDialog = (hq = null) => {
        if (hq) {
            setEditingId(hq.id);
            setFormState({
                name: hq.name,
                headquarterCode: hq.headquarterCode,
                headquarterAddress: hq.address,
            });
        } else {
            setEditingId(null);
            setFormState({
                name: '',
                headquarterCode: '',
                headquarterAddress: '',
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        if (isSubmitting) return;
        setOpenDialog(false);
    };

    // --- Form Handlers ---
    const handleFormChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const { name, headquarterCode, headquarterAddress } = formState;
        if (!name || !headquarterCode || !headquarterAddress) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'Please fill all required fields.',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }

        setIsSubmitting(true);
        const payload = {
            headquarter_name: name,
            headquarter_code: headquarterCode,
            headquarter_address: headquarterAddress,
        };

        try {
            const promise = editingId
                ? axios.patch(`${API_URL}${editingId}/`, payload)
                : axios.post(API_URL, payload);

            await promise;
            fetchHeadquarters();
            handleCloseDialog();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `Headquarter has been ${editingId ? 'updated' : 'saved'} successfully.`,
                timer: 3000,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Save Error',
                text: `Failed to save headquarter: ${err.message}`,
                timer: 3000,
                showConfirmButton: false,
            });
            console.error("Save operation failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Delete Handler ---
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: primaryColor,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}${id}/`);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The headquarter has been deleted.',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    fetchHeadquarters();
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Error',
                        text: `Failed to delete headquarter: ${err.message}`,
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    console.error("Delete operation failed:", err);
                }
            }
        });
    };

    // --- Filtering and Pagination ---
    const filteredData = headquarters.filter((hq) =>
        hq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hq.headquarterCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    
    // --- START: NEW PAGINATION HANDLERS AND CALCULATIONS ---
    const handlePaginationChange = (event, newPage) => {
        setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);
    // --- END: NEW PAGINATION HANDLERS AND CALCULATIONS ---


    return (
        <Box component={Paper} p={3}>
            <Typography variant="h4" sx={{ color: primaryColor, fontWeight: 'bold', mb: 4 }}>
                Headquarter
            </Typography>

            <Box
                mb={2}
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "stretch" : "center"}
                gap={2}
            >
                <Button
                    variant="contained"
                    sx={primaryButtonStyle}
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Add New
                </Button>
                <TextField
                    size="small"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(0); // Reset page on new search
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: isMobile ? "100%" : "auto" }}
                />
            </Box>

            <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: primaryColor }}>
                            <TableCell sx={{ fontWeight: 'bold', color: textOnPrimary, textTransform: 'uppercase' }}>SR. NO.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: textOnPrimary, textTransform: 'uppercase' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: textOnPrimary, textTransform: 'uppercase' }}>Code</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: textOnPrimary, textTransform: 'uppercase' }}>Created Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: textOnPrimary, textTransform: 'uppercase' }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center">
                                        <Skeleton variant="rectangular" width={80} height={30} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            paginatedData.map((hq, index) => (
                                <TableRow key={hq.id} hover>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{hq.name}</TableCell>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{hq.headquarterCode}</TableCell>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{hq.createdAt}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="center" gap={0.5}>
                                            <IconButton size="small" sx={{ color: primaryColor }} onClick={() => handleOpenDialog(hq)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" color="error" onClick={() => handleDelete(hq.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {!loading && paginatedData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No records found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- START: NEW STYLED PAGINATION (REPLACES TablePagination) --- */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Skeleton variant="text" width={200} />
                        <Skeleton variant="rectangular" width={300} height={40} />
                    </Box>
                ) : (
                    filteredData.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                        sx={{
                                            backgroundColor: primaryColor,
                                            color: 'white',
                                            borderRadius: '4px',
                                            '&:hover': { backgroundColor: primaryHoverColor },
                                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            '& .MuiSvgIcon-root': { color: 'white' },
                                        }}
                                    >
                                        {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                                    </Select>
                                </FormControl>
                                <Typography variant="body2" color="text.secondary">
                                    {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                                </Typography>
                            </Box>
                            <Pagination
                                count={Math.ceil(filteredData.length / rowsPerPage)}
                                page={page + 1}
                                onChange={handlePaginationChange}
                                showFirstButton showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: 'white' },
                                    '& .MuiPaginationItem-page': {
                                        color: primaryColor,
                                        '&.Mui-selected': {
                                            backgroundColor: primaryColor,
                                            color: 'white',
                                            '&:hover': { backgroundColor: secondaryColor }
                                        },
                                    },
                                    '& .MuiPaginationItem-icon': { color: primaryColor }
                                }}
                            />
                        </Box>
                    )
                )}
            </Box>
            {/* --- END: NEW STYLED PAGINATION --- */}

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
                    {editingId ? 'Edit Headquarter' : 'Add New Headquarter'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField name="name" label="Headquarter Name" fullWidth value={formState.name} onChange={handleFormChange} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="headquarterCode" label="Headquarter Code" fullWidth value={formState.headquarterCode} onChange={handleFormChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="headquarterAddress" label="Headquarter Address" fullWidth value={formState.headquarterAddress} onChange={handleFormChange} required />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: '16px 24px' }}>
                    <Button
                        onClick={handleCloseDialog}
                        sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={primaryButtonStyle}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : (editingId ? 'Update' : 'Save')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Headquarters;