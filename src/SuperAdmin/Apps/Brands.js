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

// const Brands = () => {
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [brandName, setBrandName] = useState('');

//   const brands = [
//     { name: 'Cement', created_at: '15/04/2024' },
//     { name: 'Construction', created_at: '15/04/2024' },
//     { name: 'Electronic Goods', created_at: '19/11/2021' },
//     { name: 'Home Appliance', created_at: '15/04/2024' },
//     { name: 'Mouse', created_at: '15/02/2022' },
//   ];

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredBrands = brands
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

//   const visibleRows = filteredBrands.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleSubmit = () => {
//     if (!brandName.trim()) return;
//     alert(`Brand submitted: ${brandName}`);
//     setBrandName('');
//   };

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left Side: Form */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Add New <Typography component="span">Brand</Typography>
//             </Typography>
//             <TextField
//               label="Asset Brand"
//               placeholder="Asset Brand"
//               fullWidth
//               size="small"
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               required
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: '#7C3AED', color: 'white', '&:hover': { backgroundColor: '#6D28D9' } }}
//               fullWidth
//               onClick={handleSubmit}
//             >
//               Save
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right Side: Brand Table */}
//         <Grid item xs={12} md={8}>
        
//   <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3 }}>
//     <Typography variant="h6" fontWeight="bold" gutterBottom>
//       List All <Typography component="span">Brands</Typography>
//     </Typography>

//     <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
//       <TextField
//         select
//         label="Show"
//         size="small"
//         value={rowsPerPage}
//         onChange={handleChangeRowsPerPage}
//         style={{ width: 100 }}
//       >
//         {[5, 10, 25, 50].map(option => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>

//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         onChange={(e) => setSearch(e.target.value)}
//       />
//     </Box>

//     <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//       <Table>
//         <TableHead sx={{ backgroundColor: '#f5f6fa' }}>
//           <TableRow>
//             <TableCell>
//               <TableSortLabel
//                 active={true}
//                 direction={orderDirection}
//                 onClick={handleSort}
//               >
//                 Brand
//               </TableSortLabel>
//             </TableCell>
//             <TableCell>Created At</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {visibleRows.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.name}</TableCell>
//               <TableCell>{item.created_at}</TableCell>
//             </TableRow>
//           ))}
//           {visibleRows.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={2} align="center">
//                 No records found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       <Box px={2} py={1}>
//         Showing {page * rowsPerPage + 1} to{' '}
//         {Math.min((page + 1) * rowsPerPage, filteredBrands.length)} of{' '}
//         {filteredBrands.length} records
//       </Box>

//       <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end" px={2} pb={2}>
//         <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//           <Grid item>
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => setPage(page - 1)}
//               disabled={page === 0}
//               sx={{
//                 color: '#7C3AED',
//                 borderColor: '#7C3AED',
//                 '&:hover': {
//                   backgroundColor: '#7C3AED',
//                   borderColor: '#7C3AED',
//                   color: 'white',
//                 },
//               }}
//             >
//               Previous
//             </Button>
//           </Grid>

//           <Grid item>
//             Page {page + 1} of {Math.max(1, Math.ceil(filteredBrands.length / rowsPerPage))}
//           </Grid>

//           <Grid item>
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => setPage(page + 1)}
//               disabled={page >= Math.ceil(filteredBrands.length / rowsPerPage) - 1}
//               sx={{
//                 color: '#7C3AED',
//                 borderColor: '#7C3AED',
//                 '&:hover': {
//                   backgroundColor: '#7C3AED',
//                   borderColor: '#7C3AED',
//                   color: 'white',
//                 },
//               }}
//             >
//               Next
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </TableContainer>
//   </Paper>
// </Grid>

        
//       </Grid>
//     </Box>
//   );
// };

// export default Brands;




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

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/';
// const BRANDS_API_URL = `${API_BASE_URL}assets-brand/`;
// // Note: The POST API provided was for 'assets-category'. Assuming for 'Brands' component,
// // you'd want to POST to 'assets-brand' and the payload should be for a brand.
// // If you indeed want to post to 'assets-category' from this 'Brands' component,
// // you'll need to adjust the `handleAddBrand` function and its payload.
// // For this implementation, I will assume the POST is for creating a new brand.

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       // Handle cases like "2025-05-30 07:48:48" which is valid
//       // but also potentially "Invalid Date" if the format is unexpected.
//       // Let's try to parse it directly if it's in a common format.
//       const parts = dateString.split(/[- :]/);
//       if (parts.length >= 3) {
//         // Assuming YYYY-MM-DD or YYYY/MM/DD format
//         const year = parseInt(parts[0], 10);
//         const month = parseInt(parts[1], 10) -1; // Month is 0-indexed
//         const day = parseInt(parts[2], 10);
//         const newDate = new Date(year, month, day);
//         if (!isNaN(newDate.getTime())) {
//             const d = String(newDate.getDate()).padStart(2, '0');
//             const m = String(newDate.getMonth() + 1).padStart(2, '0');
//             const y = newDate.getFullYear();
//             return `${d}/${m}/${y}`;
//         }
//       }
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e, "Original date:", dateString);
//     return dateString; // return original if formatting fails
//   }
// };

// const Brands = () => {
//   const [allBrands, setAllBrands] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [brandName, setBrandName] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchBrands = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(BRANDS_API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       // API returns an array of objects like: { value: ..., label: ..., created_at: ... }
//       // Transform it to { id: ..., name: ..., created_at: ... }
//       const transformedData = data.map(item => ({
//         id: item.value, // Use 'value' as a unique ID
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllBrands(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch brands:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBrands();
//   }, [fetchBrands]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredBrands = allBrands
//     .filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
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

//   const handleAddBrand = async () => {
//     if (!brandName.trim()) {
//         alert('Brand name cannot be empty.');
//         return;
//     }
//     setSubmitting(true);
//     setSubmitError(null);
//     try {
//       // Assuming the POST payload for creating a brand is { category_name: "..." }
//       // The provided POST payload was {"category_name": "Electronics "}, which seems for categories.
//       // Adjust this if the actual brand creation payload is different.
//       const payload = { category_name: brandName.trim() };

//       const response = await fetch(BRANDS_API_URL, { // POSTing to the same BRANDS_API_URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add Authorization header if needed, e.g.:
//           // 'Authorization': `Bearer YOUR_TOKEN_HERE`
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to add brand. Server returned an error.' }));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
//       // const addedBrand = await response.json(); // Response from POST
//       // console.log('Add Brand Success:', addedBrand);
//       setBrandName('');
//       alert('Brand added successfully!');
//       fetchBrands(); // Refresh the list
//     } catch (e) {
//       setSubmitError(e.message);
//       alert(`Error adding brand: ${e.message}`);
//       console.error("Failed to add brand:", e);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const visibleRows = filteredBrands.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredBrands.length / rowsPerPage));
//   const startRecord = filteredBrands.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredBrands.length);


//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left Side: Form */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 2, height: '100%' }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Add New <Typography component="span">Brand</Typography>
//             </Typography>
//             <TextField
//               label="Asset Brand"
//               placeholder="Asset Brand"
//               fullWidth
//               size="small"
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               required
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
//               sx={{ backgroundColor: '#7C3AED', color: 'white', '&:hover': { backgroundColor: '#6D28D9' } }}
//               fullWidth
//               onClick={handleAddBrand}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right Side: Brand Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               List All <Typography component="span">Brands</Typography>
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
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(0); // Reset to first page on search
//                 }}
//               />
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f6fa' }}>
//                   <TableRow>
//                     <TableCell>
//                       <TableSortLabel
//                         active={true} // Assuming 'Brand' is always the sortable column
//                         direction={orderDirection}
//                         onClick={handleSort}
//                       >
//                         Brand
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
//                         <Typography>Loading brands...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={2} align="center">
//                         <Typography color="error">Error loading brands: {error}</Typography>
//                         <Button onClick={fetchBrands} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item) => (
//                       <TableRow key={item.id}> {/* Use unique ID from API */}
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
//                  <Typography variant="body2">
//                     Showing {startRecord} to {endRecord} of {filteredBrands.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center">
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
//                           backgroundColor: 'rgba(124, 58, 237, 0.08)',
//                           borderColor: '#6D28D9',
//                         },
//                          '&.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)',
//                             borderColor: 'rgba(0, 0, 0, 0.12)',
//                         }
//                       }}
//                     >
//                       Previous
//                     </Button>
//                      <Typography variant="body2" sx={{ mx: 1 }}>
//                         Page {page + 1} of {totalPages}
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

// export default Brands;











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

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/';
// const BRANDS_API_URL = `${API_BASE_URL}assets-brand/`;

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

// const Brands = () => {
//   const [allBrands, setAllBrands] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [brandName, setBrandName] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchBrands = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(BRANDS_API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllBrands(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch brands:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBrands();
//   }, [fetchBrands]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredBrands = allBrands
//     .filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
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

//   const handleAddBrand = async () => {
//     if (!brandName.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Brand name cannot be empty.',
//       });
//       return;
//     }
//     setSubmitting(true);
//     setSubmitError(null);
//     try {
//       // NOTE: The API might expect a different key, e.g., 'brand_name'.
//       // Changed from 'category_name' to 'brand_name' for logical consistency.
//       const payload = { brand_name: brandName.trim() };

//       const response = await fetch(BRANDS_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to add brand. Server returned an error.' }));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
//       setBrandName('');
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Brand added successfully.',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       fetchBrands(); // Refresh the list
//     } catch (e) {
//       setSubmitError(e.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error adding brand: ${e.message}`,
//       });
//       console.error("Failed to add brand:", e);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const visibleRows = filteredBrands.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredBrands.length / rowsPerPage));
//   const startRecord = filteredBrands.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredBrands.length);


//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         {/* Left Side: Form */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 3, height: '100%' }}>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//               Add New <Typography component="span" sx={{ color: THEME_ORANGE }}>Brand</Typography>
//             </Typography>
//             <TextField
//               label="Asset Brand"
//               placeholder="Asset Brand"
//               fullWidth
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               required
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
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               fullWidth
//               onClick={handleAddBrand}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Right Side: Brand Table */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               List All <Typography component="span" sx={{ color: THEME_ORANGE }}>Brands</Typography>
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
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(0);
//                 }}
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
//                         Brand
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
//                         <Typography>Loading brands...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading brands: {error}</Typography>
//                         <Button onClick={fetchBrands} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id} hover>
//                          <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
//                  <Typography variant="body2">
//                     Showing {startRecord} to {endRecord} of {filteredBrands.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0 || loading}
//                       sx={{
//                         mr:1,
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
//                      <Typography variant="body2" sx={{ mx: 1 }}>
//                         Page {page + 1} of {totalPages}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page >= totalPages - 1 || loading}
//                        sx={{
//                         ml:1,
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

// export default Brands;














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
// import Swal from 'sweetalert2';

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/';
// const BRANDS_API_URL = `${API_BASE_URL}assets-brand/`;

// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString;
//   }
// };

// const Brands = () => {
//   const [allBrands, setAllBrands] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [brandName, setBrandName] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchBrands = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(BRANDS_API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllBrands(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch brands:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBrands();
//   }, [fetchBrands]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredBrands = allBrands
//     .filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
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

//   const handleAddBrand = async () => {
//     if (!brandName.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Brand name cannot be empty.',
//       });
//       return;
//     }
//     setSubmitting(true);
//     setSubmitError(null);
//     try {
//       const payload = { brand_name: brandName.trim() };

//       const response = await fetch(BRANDS_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to add brand. Server returned an error.' }));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
//       setBrandName('');
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Brand added successfully.',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       fetchBrands();
//     } catch (e) {
//       setSubmitError(e.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error adding brand: ${e.message}`,
//       });
//       console.error("Failed to add brand:", e);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const visibleRows = filteredBrands.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredBrands.length / rowsPerPage));
//   const startRecord = filteredBrands.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredBrands.length);


//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3,}}>
//             <Typography variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//               Add New <Typography component="span" variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}}>Brand</Typography>
//             </Typography>
//             <br />
//             <TextField
//               label="Asset Brand"
//               placeholder="Asset Brand"
//               fullWidth
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               required
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
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               fullWidth
//               onClick={handleAddBrand}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
//             <Typography variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//               List All <Typography component="span" variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}}>Brands</Typography>
//             </Typography>

//             <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(0);
//                 }}
//               />
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
//                         BRAND
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <CircularProgress />
//                         <Typography>Loading brands...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading brands: {error}</Typography>
//                         <Button onClick={fetchBrands} variant="outlined" sx={{mt: 1}}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id} hover>
//                          <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
//                  <Typography variant="body2">
//                     Showing {startRecord} to {endRecord} of {filteredBrands.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0 || loading}
//                       sx={{
//                         mr:1,
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
//                      <Typography variant="body2" sx={{ mx: 1 }}>
//                         Page {page + 1} of {totalPages}
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => setPage(page + 1)}
//                       disabled={page >= totalPages - 1 || loading}
//                        sx={{
//                         ml:1,
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

// export default Brands;




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

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/';
// const BRANDS_API_URL = `${API_BASE_URL}assets-brand/`;

// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString;
//   }
// };

// const Brands = () => {
//   const [allBrands, setAllBrands] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [brandName, setBrandName] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchBrands = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(BRANDS_API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllBrands(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch brands:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBrands();
//   }, [fetchBrands]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredBrands = allBrands
//     .filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
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

//   const handleAddBrand = async () => {
//     if (!brandName.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Brand name cannot be empty.',
//       });
//       return;
//     }
//     setSubmitting(true);
//     setSubmitError(null);
//     try {
//       const payload = { category_name: brandName.trim() }; // <-- Changed here

//       const response = await fetch(BRANDS_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to add brand. Server returned an error.' }));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
//       setBrandName('');
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Brand added successfully.',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       fetchBrands();
//     } catch (e) {
//       setSubmitError(e.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error adding brand: ${e.message}`,
//       });
//       console.error("Failed to add brand:", e);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const visibleRows = filteredBrands.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const totalPages = Math.max(1, Math.ceil(filteredBrands.length / rowsPerPage));
//   const startRecord = filteredBrands.length === 0 ? 0 : page * rowsPerPage + 1;
//   const endRecord = Math.min((page + 1) * rowsPerPage, filteredBrands.length);

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }} gutterBottom>
//               Add New <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }}>Brand</Typography>
//             </Typography>
//             <br />
//             <TextField
//               label="Asset Brand"
//               placeholder="Asset Brand"
//               fullWidth
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               required
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
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               fullWidth
//               onClick={handleAddBrand}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }} gutterBottom>
//               List All <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }}>Brands</Typography>
//             </Typography>

//             <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(0);
//                 }}
//               />
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
//                         BRAND
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <CircularProgress />
//                         <Typography>Loading brands...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading brands: {error}</Typography>
//                         <Button onClick={fetchBrands} variant="outlined" sx={{ mt: 1 }}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id} hover>
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
//                   Showing {startRecord} to {endRecord} of {filteredBrands.length} records
//                 </Typography>
//                 <Box display="flex" alignItems="center">
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setPage(page - 1)}
//                     disabled={page === 0 || loading}
//                     sx={{
//                       mr: 1,
//                       color: THEME_PURPLE,
//                       borderColor: THEME_PURPLE,
//                       '&:hover': {
//                         backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                         borderColor: THEME_PURPLE_HOVER,
//                       },
//                       '&.Mui-disabled': {
//                         color: 'rgba(0, 0, 0, 0.26)',
//                         borderColor: 'rgba(0, 0, 0, 0.12)',
//                       }
//                     }}
//                   >
//                     Previous
//                   </Button>
//                   <Typography variant="body2" sx={{ mx: 1 }}>
//                     Page {page + 1} of {totalPages}
//                   </Typography>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setPage(page + 1)}
//                     disabled={page >= totalPages - 1 || loading}
//                     sx={{
//                       ml: 1,
//                       color: THEME_PURPLE,
//                       borderColor: THEME_PURPLE,
//                       '&:hover': {
//                         backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                         borderColor: THEME_PURPLE_HOVER,
//                       },
//                       '&.Mui-disabled': {
//                         color: 'rgba(0, 0, 0, 0.26)',
//                         borderColor: 'rgba(0, 0, 0, 0.12)',
//                       }
//                     }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Brands;






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

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/';
// const BRANDS_API_URL = `${API_BASE_URL}assets-brand/`;

// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#701d63';

// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return 'Invalid Date';
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (e) {
//     console.error("Error formatting date:", e);
//     return dateString;
//   }
// };

// const Brands = () => {
//   const [allBrands, setAllBrands] = useState([]);
//   const [orderDirection, setOrderDirection] = useState('asc');
//   const [search, setSearch] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [brandName, setBrandName] = useState('');

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);

//   const fetchBrands = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(BRANDS_API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.value,
//         name: item.label,
//         created_at: formatDate(item.created_at),
//       }));
//       setAllBrands(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch brands:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchBrands();
//   }, [fetchBrands]);

//   const handleSort = () => {
//     setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
//   };

//   const filteredBrands = allBrands
//     .filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => {
//       const nameA = String(a.name || '');
//       const nameB = String(b.name || '');
//       return orderDirection === 'asc'
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });
  
//   const totalCount = filteredBrands.length;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddBrand = async () => {
//     if (!brandName.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Input Required',
//         text: 'Brand name cannot be empty.',
//       });
//       return;
//     }
//     setSubmitting(true);
//     setSubmitError(null);
//     try {
//       // The API seems to expect 'category_name' based on the original code
//       const payload = { category_name: brandName.trim() }; 

//       const response = await fetch(BRANDS_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to add brand. Server returned an error.' }));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
//       setBrandName('');
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Brand added successfully.',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       fetchBrands();
//     } catch (e) {
//       setSubmitError(e.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: `Error adding brand: ${e.message}`,
//       });
//       console.error("Failed to add brand:", e);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const visibleRows = filteredBrands.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box p={3}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 3 }}>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }} gutterBottom>
//               Add New <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }}>Brand</Typography>
//             </Typography>
//             <br />
//             <TextField
//               label="Asset Brand"
//               placeholder="Asset Brand"
//               fullWidth
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               required
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
//               sx={{
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//               }}
//               fullWidth
//               onClick={handleAddBrand}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//             </Button>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
//             <Typography variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }} gutterBottom>
//               List All <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: "#8C257C" }}>Brands</Typography>
//             </Typography>

//             <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
//               <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(0);
//                 }}
//               />
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
//                         BRAND
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <CircularProgress />
//                         <Typography>Loading brands...</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={3} align="center">
//                         <Typography color="error">Error loading brands: {error}</Typography>
//                         <Button onClick={fetchBrands} variant="outlined" sx={{ mt: 1 }}>Retry</Button>
//                       </TableCell>
//                     </TableRow>
//                   ) : visibleRows.length > 0 ? (
//                     visibleRows.map((item, index) => (
//                       <TableRow key={item.id} hover>
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
//                    sx={{
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

// export default Brands;




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

const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/';
const BRANDS_API_URL = `${API_BASE_URL}assets-brand/`;

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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};

const Brands = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [brandName, setBrandName] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(BRANDS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const transformedData = data.map(item => ({
        id: item.value,
        name: item.label,
        created_at: formatDate(item.created_at),
      }));
      setAllBrands(transformedData);
    } catch (e) {
      setError(e.message);
      console.error("Failed to fetch brands:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSort = () => {
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredBrands = allBrands
    .filter(item => item.name && item.name.toLowerCase().includes(search.toLowerCase()))
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

  const handleAddBrand = async () => {
    if (!brandName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Brand name cannot be empty.',
      });
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = { category_name: brandName.trim() }; 

      const response = await fetch(BRANDS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to add brand. Server returned an error.' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      setBrandName('');
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Brand added successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      fetchBrands();
    } catch (e) {
      setSubmitError(e.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error adding brand: ${e.message}`,
      });
      console.error("Failed to add brand:", e);
    } finally {
      setSubmitting(false);
    }
  };

  const paginatedBrands = filteredBrands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const startEntry = filteredBrands.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredBrands.length);

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }} gutterBottom>
              Add New <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Brand</Typography>
            </Typography>
            <br />
            <TextField
              label="Asset Brand"
              placeholder="Asset Brand"
              fullWidth
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
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
              sx={{
                backgroundColor: THEME_PURPLE,
                color: 'white',
                '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
              }}
              fullWidth
              onClick={handleAddBrand}
              disabled={submitting}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }} gutterBottom>
              List All <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Brands</Typography>
            </Typography>

            <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
              />
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
                        BRAND
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
                        <Typography>Loading brands...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography color="error">Error loading brands: {error}</Typography>
                        <Button onClick={fetchBrands} variant="outlined" sx={{ mt: 1 }}>Retry</Button>
                      </TableCell>
                    </TableRow>
                  ) : paginatedBrands.length > 0 ? (
                    paginatedBrands.map((item, index) => (
                      <TableRow key={item.id} hover>
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
                  {filteredBrands.length > 0 && (
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
                                {`Showing ${startEntry} to ${endEntry} of ${filteredBrands.length} results`}
                              </Typography>
                          </Box>
                          <Pagination
                              count={Math.ceil(filteredBrands.length / rowsPerPage)}
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


export default Brands;