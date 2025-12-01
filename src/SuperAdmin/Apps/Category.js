// import React, { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Typography,
//   TextField,
//   MenuItem,
//   Grid,
//   Button,
// } from '@mui/material';

// const Category = () => {
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [newCategory, setNewCategory] = useState('');

//   const categories = [
//     { name: 'Cement', created_at: '15/04/2024' },
//     { name: 'Construction', created_at: '15/04/2024' },
//     { name: 'Electronic Goods', created_at: '19/11/2021' },
//     { name: 'Home Appliance', created_at: '15/04/2024' },
//     { name: 'Mouse', created_at: '15/02/2022' },
//   ];

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredCategories = categories
//     .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) =>
//       orderDirection === 'asc'
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name)
//     );

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const visibleRows = filteredCategories.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleAddCategory = () => {
//     if (newCategory.trim()) {
//       console.log('Add Category:', newCategory);
//       setNewCategory('');
//     }
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left side: Add Category Form */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Add New <Typography component="span">Category</Typography>
//             </Typography>
//             <TextField
//               fullWidth
//               required
//               label="Category"
//               placeholder="Asset Category"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ backgroundColor: '#7C3AED', color: 'white', '&:hover': { backgroundColor: '#6D28D9' } }}
//               onClick={handleAddCategory}
//             >
//               Save
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right side: Category Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               List All <Typography component="span">Categories</Typography>
//             </Typography>

//             <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
//               <TextField
//                 select
//                 label="Show"
//                 size="small"
//                 value={rowsPerPage}
//                 onChange={handleChangeRowsPerPage}
//                 style={{ width: 100 }}
//               >
//                 {[5, 10, 25, 50].map(option => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f6fa' }}>
//                   <TableRow>
//                     <TableCell>
//                       <TableSortLabel
//                         active={true}
//                         direction={orderDirection}
//                         onClick={handleSort}
//                       >
//                         Category
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell>Created At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {visibleRows.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell>{item.created_at}</TableCell>
//                     </TableRow>
//                   ))}
//                   {visibleRows.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={2} align="center">
//                         No records found.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>

//               <Box px={2} py={1}>
//                 Showing {page * rowsPerPage + 1} to{' '}
//                 {Math.min((page + 1) * rowsPerPage, filteredCategories.length)} of{' '}
//                 {filteredCategories.length} records
//               </Box>

//               <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end" px={2} pb={2}>
//                 <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//                   <Grid item>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0}
//                       sx={{
//                         color: '#7C3AED',
//                         borderColor: '#7C3AED',
//                         '&:hover': {
//                           backgroundColor: '#7C3AED',
//                           borderColor: '#7C3AED',
//                           color: 'white',
//                         },
//                       }}
//                     >
//                       Previous
//                     </Button>
//                   </Grid>

//                   <Grid item>
//                     Page {page + 1} of {Math.max(1, Math.ceil(filteredCategories.length / rowsPerPage))}
//                   </Grid>

//                   <Grid item>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page >= Math.ceil(filteredCategories.length / rowsPerPage) - 1}
//                       sx={{
//                         color: '#7C3AED',
//                         borderColor: '#7C3AED',
//                         '&:hover': {
//                           backgroundColor: '#7C3AED',
//                           borderColor: '#7C3AED',
//                           color: 'white',
//                         },
//                       }}
//                     >
//                       Next
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Category;







// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Typography,
//   TextField,
//   MenuItem,
//   Grid,
//   Button,
//   CircularProgress,
// } from '@mui/material';

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets-category/';

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString; // return original if formatting fails
//   }
// };

// const Category = () => {
//   const [allCategories, setAllCategories] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [newCategory, setNewCategory] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchCategories = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       // Assuming API returns an array of objects like: { value: ..., label: ..., created_at: ... }
//       // We need to transform it to { name: ..., created_at: ... }
//       const transformedData = data.map(item => ({
//         // Use 'id' or 'value' for key if available and unique
//         id: item.value || item.id || item.label, // Fallback for key
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllCategories(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch categories:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredCategories = allCategories
//     .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       // Ensure names are strings before calling localeCompare
//       const nameA = String(a.name || '');
//       const nameB = String(b.name || '');
//       return orderDirection === 'asc'
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.trim()) {
//       setSubmitting(true);
//       setSubmitError(null);
//       try {
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add Authorization header if needed, e.g.:
//             // 'Authorization': `Bearer YOUR_TOKEN_HERE`
//           },
//           body: JSON.stringify({ category_name: newCategory.trim() }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ message: 'Failed to add category. Unknown error.' }));
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }
//         // const addedCategory = await response.json(); // Contains the newly added category
//         // console.log('Add Category Success:', addedCategory);
//         setNewCategory('');
//         alert('Category added successfully!');
//         fetchCategories(); // Refresh the list
//       } catch (e) {
//         setSubmitError(e.message);
//         alert(`Error adding category: ${e.message}`);
//         console.error("Failed to add category:", e);
//       } finally {
//         setSubmitting(false);
//       }
//     } else {
//       alert('Category name cannot be empty.');
//     }
//   };

//   const visibleRows = filteredCategories.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredCategories.length / rowsPerPage));
//   const startRecord = filteredCategories.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredCategories.length);


//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left side: Add Category Form */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Add New <Typography component="span">Category</Typography>
//             </Typography>
//             <TextField
//               fullWidth
//               required
//               label="Category"
//               placeholder="Asset Category"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               sx={{ mb: 2 }}
//               disabled={submitting}
//             />
//             {submitError && (
//               <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//                 Error: {submitError}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ backgroundColor: '#7C3AED', color: 'white', '&:hover': { backgroundColor: '#6D28D9' } }}
//               onClick={handleAddCategory}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right side: Category Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               List All <Typography component="span">Categories</Typography>
//             </Typography>

//             <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
//               <TextField
//                 select
//                 label="Show"
//                 size="small"
//                 value={rowsPerPage}
//                 onChange={handleChangeRowsPerPage}
//                 style={{ width: 100 }}
//               >
//                 {[5, 10, 25, 50].map(option => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 onChange={(e) => setSearch(e.target.value)}
//                 value={search}
//               />
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f6fa' }}>
//                   <TableRow>
//                     <TableCell>
//                       <TableSortLabel
//                         active={true} // Assuming 'Category' is always the sortable column
//                         direction={orderDirection}
//                         onClick={handleSort}
//                       >
//                         Category
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell>Created At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={2} align="center">
//                         <CircularProgress />
//                         <Typography>Loading categories...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={2} align="center">
//                         <Typography color="error">Error loading categories: {error}</Typography>
//                         <Button onClick={fetchCategories} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id || index}> {/* Use a unique key from data if available */}
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.created_at}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={2} align="center">
//                         No records found.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>

//               <Box px={2} py={1} display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body2">
//                   Showing {startRecord} to {endRecord} of {filteredCategories.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center" spacing={1}>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0 || loading}
//                       sx={{
//                         mr:1,
//                         color: '#7C3AED',
//                         borderColor: '#7C3AED',
//                         '&:hover': {
//                           backgroundColor: 'rgba(124, 58, 237, 0.08)', // Lighter purple for hover
//                           borderColor: '#6D28D9',
//                         },
//                          '&.Mui-disabled': { // More specific selector for disabled state
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Previous
//                     </Button>
//                     <Typography variant="body2" sx={{ mx: 1 }}>
//                       Page {page + 1} of {totalPages}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page >= totalPages - 1 || loading}
//                        sx={{
//                         ml:1,
//                         color: '#7C3AED',
//                         borderColor: '#7C3AED',
//                         '&:hover': {
//                            backgroundColor: 'rgba(124, 58, 237, 0.08)',
//                            borderColor: '#6D28D9',
//                         },
//                         '&.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Next
//                     </Button>
//                 </Box>
//               </Box>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Category;












// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Typography,
//   TextField,
//   MenuItem,
//   Grid,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets-category/';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63'; // A slightly darker purple for hover effects

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString; // return original if formatting fails
//   }
// };

// const Category = () => {
//   const [allCategories, setAllCategories] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [newCategory, setNewCategory] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchCategories = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value || item.id || item.label,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllCategories(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch categories:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredCategories = allCategories
//     .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       const nameA = String(a.name || '');
//       const nameB = String(b.name || '');
//       return orderDirection === 'asc'
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.trim()) {
//       setSubmitting(true);
//       setSubmitError(null);
//       try {
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ category_name: newCategory.trim() }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ message: 'Failed to add category. Unknown error.' }));
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }
//         setNewCategory('');
//         Swal.fire({ // Success alert
//           icon: 'success',
//           title: 'Success!',
//           text: 'Category added successfully.',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         fetchCategories(); // Refresh the list
//       } catch (e) {
//         setSubmitError(e.message);
//         Swal.fire({ // Error alert
//           icon: 'error',
//           title: 'Oops...',
//           text: `Error adding category: ${e.message}`,
//         });
//         console.error("Failed to add category:", e);
//       } finally {
//         setSubmitting(false);
//       }
//     } else {
//       Swal.fire({ // Warning alert
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Category name cannot be empty.',
//       });
//     }
//   };

//   const visibleRows = filteredCategories.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredCategories.length / rowsPerPage));
//   const startRecord = filteredCategories.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredCategories.length);

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left side: Add Category Form */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Add New <Typography component="span" sx={{ color: THEME_ORANGE }}>Category</Typography>
//             </Typography>
//             <TextField
//               fullWidth
//               required
//               label="Category"
//               placeholder="Asset Category"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               sx={{ mb: 2 }}
//               disabled={submitting}
//             />
//             {submitError && (
//               <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//                 Error: {submitError}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               onClick={handleAddCategory}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right side: Category Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               List All <Typography component="span" sx={{ color: THEME_ORANGE }}>Categories</Typography>
//             </Typography>

//             <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
//               <TextField
//                 select
//                 label="Show"
//                 size="small"
//                 value={rowsPerPage}
//                 onChange={handleChangeRowsPerPage}
//                 style={{ width: 100 }}
//               >
//                 {[5, 10, 25, 50].map(option => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 onChange={(e) => setSearch(e.target.value)}
//                 value={search}
//               />
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//                   <TableRow>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr.No.</TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
//                       <TableSortLabel
//                         active={true}
//                         direction={orderDirection}
//                         onClick={handleSort}
//                         sx={{
//                           color: 'white !important',
//                           '& .MuiTableSortLabel-icon': {
//                             color: 'white !important',
//                           },
//                         }}
//                       >
//                         Category
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <CircularProgress />
//                         <Typography>Loading categories...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading categories: {error}</Typography>
//                         <Button onClick={fetchCategories} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id || index} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.created_at}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         No records found.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>

//               <Box px={2} py={1} display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body2">
//                   Showing {startRecord} to {endRecord} of {filteredCategories.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center" spacing={1}>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0 || loading}
//                       sx={{
//                         mr: 1,
//                         color: THEME_PURPLE,
//                         borderColor: THEME_PURPLE,
//                         '&:hover': {
//                           backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                           borderColor: THEME_PURPLE_HOVER,
//                         },
//                          '&.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Previous
//                     </Button>
//                     <Typography variant="body2" sx={{ mx: 1 }}>
//                       Page {page + 1} of {totalPages}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page >= totalPages - 1 || loading}
//                        sx={{
//                         ml: 1,
//                         color: THEME_PURPLE,
//                         borderColor: THEME_PURPLE,
//                         '&:hover': {
//                            backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                            borderColor: THEME_PURPLE_HOVER,
//                         },
//                         '&.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Next
//                     </Button>
//                 </Box>
//               </Box>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Category;
















// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   CircularProgress,
// } from '@mui/material';
// import Swal from 'sweetalert2';

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets-category/';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#701d63'; // A slightly darker purple for hover effects

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString; // return original if formatting fails
//   }
// };

// const Category = () => {
//   const [allCategories, setAllCategories] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [newCategory, setNewCategory] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchCategories = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value || item.id || item.label,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllCategories(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch categories:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredCategories = allCategories
//     .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       const nameA = String(a.name || '');
//       const nameB = String(b.name || '');
//       return orderDirection === 'asc'
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.trim()) {
//       setSubmitting(true);
//       setSubmitError(null);
//       try {
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ category_name: newCategory.trim() }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ message: 'Failed to add category. Unknown error.' }));
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }
//         setNewCategory('');
//         Swal.fire({ // Success alert
//           icon: 'success',
//           title: 'Success!',
//           text: 'Category added successfully.',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         fetchCategories(); // Refresh the list
//       } catch (e) {
//         setSubmitError(e.message);
//         Swal.fire({ // Error alert
//           icon: 'error',
//           title: 'Oops...',
//           text: `Error adding category: ${e.message}`,
//         });
//         console.error("Failed to add category:", e);
//       } finally {
//         setSubmitting(false);
//       }
//     } else {
//       Swal.fire({ // Warning alert
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Category name cannot be empty.',
//       });
//     }
//   };

//   const visibleRows = filteredCategories.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredCategories.length / rowsPerPage));
//   const startRecord = filteredCategories.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredCategories.length);

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left side: Add Category Form */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" fontWeight="bold" sx={{color:"#8C257C"}}>
//               Add New <Typography variant="h5"  component="span" fontWeight="bold"  sx={{color:"#8C257C", }}>Category</Typography>
//             </Typography>
//             <br />
//             <TextField
//               fullWidth
//               required
//               label="Category"
//               placeholder="Asset Category"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               sx={{ mb: 2 }}
//               disabled={submitting}
//             />
//             {submitError && (
//               <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//                 Error: {submitError}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               onClick={handleAddCategory}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right side: Category Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
//             <Box mb={2}>
//               <Typography variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//                 List All <Typography component="span" variant="h5" fontWeight="bold" sx={{color:"#8C257C"}}>Categories</Typography>
//               </Typography>
//               <Box display="flex" justifyContent="flex-end">
//                   <TextField
//                     label="Search"
//                     variant="outlined"
//                     size="small"
//                     onChange={(e) => setSearch(e.target.value)}
//                     value={search}
//                   />
//               </Box>
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//                   <TableRow>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR.NO.</TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
//                       <TableSortLabel
//                         active={true}
//                         direction={orderDirection}
//                         onClick={handleSort}
//                         sx={{
//                           color: 'white !important',
//                           '& .MuiTableSortLabel-icon': {
//                             color: 'white !important',
//                           },
//                         }}
//                       >
//                         CATEGORY
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <CircularProgress />
//                         <Typography>Loading categories...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading categories: {error}</Typography>
//                         <Button onClick={fetchCategories} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id || index} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.created_at}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         No records found.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>

//               <Box px={2} py={1} display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body2">
//                   Showing {startRecord} to {endRecord} of {filteredCategories.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center" spacing={1}>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0 || loading}
//                       sx={{
//                         mr: 1,
//                         color: THEME_PURPLE,
//                         borderColor: THEME_PURPLE,
//                         '&:hover': {
//                           backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                           borderColor: THEME_PURPLE_HOVER,
//                         },
//                          '&.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Previous
//                     </Button>
//                     <Typography variant="body2" sx={{ mx: 1 }}>
//                       Page {page + 1} of {totalPages}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page >= totalPages - 1 || loading}
//                        sx={{
//                         ml: 1,
//                         color: THEME_PURPLE,
//                         borderColor: THEME_PURPLE,
//                         '&:hover': {
//                            backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                            borderColor: THEME_PURPLE_HOVER,
//                         },
//                         '&.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Next
//                     </Button>
//                 </Box>
//               </Box>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Category;







// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   CircularProgress,
//   TablePagination, // Import TablePagination
// } from '@mui/material';
// import Swal from 'sweetalert2';

// const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets-category/';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#701d63'; // A slightly darker purple for hover effects

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString; // return original if formatting fails
//   }
// };

// const Category = () => {
//   const [allCategories, setAllCategories] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [newCategory, setNewCategory] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchCategories = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value || item.id || item.label,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllCategories(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch categories:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredCategories = allCategories
//     .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       const nameA = String(a.name || '');
//       const nameB = String(b.name || '');
//       return orderDirection === 'asc'
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });
  
//   const totalCount = filteredCategories.length;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory.trim()) {
//       setSubmitting(true);
//       setSubmitError(null);
//       try {
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ category_name: newCategory.trim() }),
//         });
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ message: 'Failed to add category. Unknown error.' }));
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }
//         setNewCategory('');
//         Swal.fire({ // Success alert
//           icon: 'success',
//           title: 'Success!',
//           text: 'Category added successfully.',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         fetchCategories(); // Refresh the list
//       } catch (e) {
//         setSubmitError(e.message);
//         Swal.fire({ // Error alert
//           icon: 'error',
//           title: 'Oops...',
//           text: `Error adding category: ${e.message}`,
//         });
//         console.error("Failed to add category:", e);
//       } finally {
//         setSubmitting(false);
//       }
//     } else {
//       Swal.fire({ // Warning alert
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Category name cannot be empty.',
//       });
//     }
//   };

//   const visibleRows = filteredCategories.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left side: Add Category Form */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" fontWeight="bold" sx={{color:"#8C257C"}}>
//               Add New <Typography variant="h5"  component="span" fontWeight="bold"  sx={{color:"#8C257C", }}>Category</Typography>
//             </Typography>
//             <br />
//             <TextField
//               fullWidth
//               required
//               label="Category"
//               placeholder="Asset Category"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               sx={{ mb: 2 }}
//               disabled={submitting}
//             />
//             {submitError && (
//               <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//                 Error: {submitError}
//               </Typography>
//             )}
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               onClick={handleAddCategory}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right side: Category Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
//             <Box mb={2}>
//               <Typography variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//                 List All <Typography component="span" variant="h5" fontWeight="bold" sx={{color:"#8C257C"}}>Categories</Typography>
//               </Typography>
//               <Box display="flex" justifyContent="flex-end">
//                   <TextField
//                     label="Search"
//                     variant="outlined"
//                     size="small"
//                     onChange={(e) => setSearch(e.target.value)}
//                     value={search}
//                   />
//               </Box>
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//                   <TableRow>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
//                       <TableSortLabel
//                         active={true}
//                         direction={orderDirection}
//                         onClick={handleSort}
//                         sx={{
//                           color: 'white !important',
//                           '& .MuiTableSortLabel-icon': {
//                             color: 'white !important',
//                           },
//                         }}
//                       >
//                         CATEGORY
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <CircularProgress />
//                         <Typography>Loading categories...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading categories: {error}</Typography>
//                         <Button onClick={fetchCategories} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id || index} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{item.name}</TableCell>
//                         <TableCell>{item.created_at}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         No records found.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//               {/* --- NEW FOOTER --- */}
//               <Box
//                 sx={{
//                   p: 2,
//                   borderTop: "1px solid",
//                   borderColor: "divider",
//                   backgroundColor: "background.paper",
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   flexWrap: 'wrap', // Ensures responsiveness
//                   gap: 2 // Adds space between items on smaller screens
//                 }}
//               >
//                 {/* Left side: "Showing X to Y of Z results" */}
//                 <Typography variant="body2" color="text.secondary">
//                   Showing {totalCount === 0 ? 0 : page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, totalCount)} of {totalCount} results
//                 </Typography>
                
//                 {/* Right side: MUI TablePagination */}
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 15, 25]}
//                   component="div"
//                   count={totalCount}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   rowsPerPage={rowsPerPage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   // Styling to make it more compact
//                   sx={{
//                     // Removes the border and padding from the component itself
//                     // as the parent Box already handles it.
//                     '.MuiToolbar-root': {
//                       p: 0,
//                     }
//                   }}
//                 />
//               </Box>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Category;





import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import Swal from 'sweetalert2';

const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets-category/';

// Define the color theme constants
const THEME_PURPLE = '#8C257C';
const THEME_PURPLE_HOVER = '#6d1d60';
const THEME_ORANGE = '#F58E35';
const TEXT_ON_PRIMARY = '#FFFFFF';


const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString; // return original if formatting fails
  }
};

const Category = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [newCategory, setNewCategory] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const transformedData = data.map(item => ({
        id: item.value || item.id || item.label,
        name: item.label,
        created_at: formatDate(item.created_at),
      }));
      setAllCategories(transformedData);
    } catch (e) {
      setError(e.message);
      console.error("Failed to fetch categories:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSort = () => {
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredCategories = allCategories
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const nameA = String(a.name || '');
      const nameB = String(b.name || '');
      return orderDirection === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category_name: newCategory.trim() }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to add category. Unknown error.' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        setNewCategory('');
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Category added successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
        fetchCategories();
      } catch (e) {
        setSubmitError(e.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error adding category: ${e.message}`,
        });
        console.error("Failed to add category:", e);
      } finally {
        setSubmitting(false);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Category name cannot be empty.',
      });
    }
  };
  
  const paginatedCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const startEntry = filteredCategories.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredCategories.length);

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{color: THEME_PURPLE}}>
              Add New <Typography variant="h5"  component="span" fontWeight="bold"  sx={{color: THEME_PURPLE}}>Category</Typography>
            </Typography>
            <br />
            <TextField
              fullWidth
              required
              label="Category"
              placeholder="Asset Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              sx={{ mb: 2 }}
              disabled={submitting}
            />
            {submitError && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                Error: {submitError}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: THEME_PURPLE,
                color: 'white',
                '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
              }}
              onClick={handleAddCategory}
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
            <Box mb={2}>
              <Typography variant="h5"  fontWeight="bold" sx={{color:THEME_PURPLE}} gutterBottom>
                List All <Typography component="span" variant="h5" fontWeight="bold" sx={{color:THEME_PURPLE}}>Categories</Typography>
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                  <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
              </Box>
            </Box>

            <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
              <Table>
                <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
                  <TableRow>
                    <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>SR. NO.</TableCell>
                    <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>
                      <TableSortLabel
                        active={true}
                        direction={orderDirection}
                        onClick={handleSort}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        CATEGORY
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>CREATED AT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                        <Typography>Loading categories...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography color="error">Error loading categories: {error}</Typography>
                        <Button onClick={fetchCategories} variant="outlined" sx={{mt: 1}}>Retry</Button>
                      </TableCell>
                    </TableRow>
                  ) : paginatedCategories.length > 0 ? (
                    paginatedCategories.map((item, index) => (
                      <TableRow key={item.id || index} hover>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.created_at}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No records found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                  {filteredCategories.length > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <FormControl variant="outlined" size="small">
                                  <Select
                                      value={rowsPerPage}
                                      onChange={handleChangeRowsPerPage}
                                      sx={{
                                          backgroundColor: THEME_PURPLE,
                                          color: 'white',
                                          borderRadius: '4px',
                                          '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
                                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                          '& .MuiSvgIcon-root': { color: 'white' },
                                      }}
                                  >
                                      {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                                  </Select>
                              </FormControl>
                              <Typography variant="body2" color="text.secondary">
                                {`Showing ${startEntry} to ${endEntry} of ${filteredCategories.length} results`}
                              </Typography>
                          </Box>
                          <Pagination
                              count={Math.ceil(filteredCategories.length / rowsPerPage)}
                              page={page + 1}
                              onChange={handlePaginationChange}
                              showFirstButton showLastButton
                              sx={{
                                  '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
                                  '& .MuiPaginationItem-page': {
                                      color: THEME_PURPLE,
                                      '&.Mui-selected': {
                                          backgroundColor: THEME_PURPLE,
                                          color: 'white',
                                          '&:hover': { backgroundColor: THEME_ORANGE }
                                      },
                                  },
                                  '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
                              }}
                          />
                      </Box>
                  )}
              </Box>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Category;