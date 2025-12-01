// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Button,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   Divider,
// // // // //   FormControl,
// // // // //   Grid,
// // // // //   InputLabel,
// // // // //   MenuItem,
// // // // //   Select,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   TextField,
// // // // //   Typography,
// // // // // } from '@mui/material';
// // // // // import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// // // // // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// // // // // const AssetsEmp = () => {
// // // // //   const [showForm, setShowForm] = useState(false);
// // // // //   const [purchaseDate, setPurchaseDate] = useState(null);
// // // // //   const [warrantyEndDate, setWarrantyEndDate] = useState(null);

// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// // // // //       <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
// // // // //         <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
// // // // //           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // // //             <Typography variant="subtitle1" fontWeight="bold">
// // // // //               List All Assets
// // // // //             </Typography>
// // // // //             <Button
// // // // //               variant="contained"
// // // // //               sx={{ backgroundColor: '#8b5cf6', textTransform: 'none' }}
// // // // //               onClick={() => setShowForm(!showForm)}
// // // // //             >
// // // // //               {showForm ? '− Hide' : '+ Add New'}
// // // // //             </Button>
// // // // //           </Box>

// // // // //           {showForm && (
// // // // //             <>
// // // // //               {/* Container for form and image section */}
// // // // //               <Box
// // // // //                 display="flex"
// // // // //                 flexDirection={{ xs: 'column', md: 'row' }}
// // // // //                 gap={2}
// // // // //                 mb={5}
// // // // //               >
// // // // //                 {/* Left: Asset form */}
// // // // //                 <Box
// // // // //                   flex={2}
// // // // //                   p={2}
// // // // //                   sx={{ border: '1px solid #eee', borderRadius: 2, backgroundColor: '#fafafa' }}
// // // // //                 >
// // // // //                   <Grid container spacing={2}>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <TextField label="Asset Name" required fullWidth />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <FormControl required fullWidth>
// // // // //                         <InputLabel>Category</InputLabel>
// // // // //                         <Select defaultValue="">
// // // // //                           <MenuItem value="">Select</MenuItem>
// // // // //                           <MenuItem value="Electronics">Electronics</MenuItem>
// // // // //                           <MenuItem value="Furniture">Furniture</MenuItem>
// // // // //                         </Select>
// // // // //                       </FormControl>
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <FormControl required fullWidth>
// // // // //                         <InputLabel>Brand</InputLabel>
// // // // //                         <Select defaultValue="">
// // // // //                           <MenuItem value="">Select</MenuItem>
// // // // //                           <MenuItem value="HP">HP</MenuItem>
// // // // //                           <MenuItem value="Dell">Dell</MenuItem>
// // // // //                         </Select>
// // // // //                       </FormControl>
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <TextField label="Manufacturer" fullWidth />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <TextField label="Serial Number" fullWidth />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <TextField label="Asset Code" fullWidth />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <FormControl fullWidth>
// // // // //                         <InputLabel>Is Working?</InputLabel>
// // // // //                         <Select defaultValue="Yes">
// // // // //                           <MenuItem value="Yes">Yes</MenuItem>
// // // // //                           <MenuItem value="No">No</MenuItem>
// // // // //                         </Select>
// // // // //                       </FormControl>
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <DatePicker
// // // // //                         label="Purchase Date"
// // // // //                         value={purchaseDate}
// // // // //                         onChange={(newValue) => setPurchaseDate(newValue)}
// // // // //                         renderInput={(params) => <TextField {...params} fullWidth />}
// // // // //                       />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <TextField label="Invoice Number" fullWidth />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={4}>
// // // // //                       <DatePicker
// // // // //                         label="Warranty End Date"
// // // // //                         value={warrantyEndDate}
// // // // //                         onChange={(newValue) => setWarrantyEndDate(newValue)}
// // // // //                         renderInput={(params) => <TextField {...params} fullWidth />}
// // // // //                       />
// // // // //                     </Grid>
// // // // //                     <Grid item xs={12} md={8}>
// // // // //                       <TextField label="Asset Note" fullWidth multiline rows={2} />
// // // // //                     </Grid>
// // // // //                   </Grid>

// // // // //                   {/* Buttons */}
// // // // //                   <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
// // // // //                     <Button variant="outlined" color="secondary">
// // // // //                       Reset
// // // // //                     </Button>
// // // // //                     <Button variant="contained" sx={{ backgroundColor: '#8b5cf6' }}>
// // // // //                       Save
// // // // //                     </Button>
// // // // //                   </Box>
// // // // //                 </Box>

// // // // //                 {/* Right: Asset Image Upload */}
// // // // //                 <Box
// // // // //                   flex={1}
// // // // //                   p={2}
// // // // //                   sx={{
// // // // //                     border: '1px solid #eee',
// // // // //                     borderRadius: 2,
// // // // //                     backgroundColor: '#fafafa',
// // // // //                     minWidth: '250px',
// // // // //                   }}
// // // // //                 >
// // // // //                   <Typography variant="subtitle1" fontWeight="bold" mb={1}>
// // // // //                     Asset Image
// // // // //                   </Typography>
// // // // //                   <Typography variant="body2" mb={1}>
// // // // //                     Attachment *
// // // // //                   </Typography>
// // // // //                   <Button variant="outlined" component="label" fullWidth>
// // // // //                     Choose file...
// // // // //                     <input type="file" hidden accept=".jpg,.jpeg,.png,.gif" />
// // // // //                   </Button>
// // // // //                   <Typography variant="caption" display="block" mt={1}>
// // // // //                     Upload files only: gif, png, jpg, jpeg
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             </>
// // // // //           )}

// // // // //           {/* Table container section */}
// // // // //           <Box>
// // // // //             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // // //               <FormControl size="small">
// // // // //                 <InputLabel>Show</InputLabel>
// // // // //                 <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
// // // // //                   <MenuItem value={10}>10</MenuItem>
// // // // //                   <MenuItem value={25}>25</MenuItem>
// // // // //                   <MenuItem value={50}>50</MenuItem>
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //               <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
// // // // //             </Box>

// // // // //             <TableContainer>
// // // // //               <Table size="small">
// // // // //                 <TableHead sx={{ backgroundColor: '#f9fafb' }}>
// // // // //                   <TableRow>
// // // // //                     {['ASSET NAME', 'CATEGORY', 'BRAND', 'ASSET CODE', 'IS WORKING?', '👤 EMPLOYEE', '📅 CREATED AT'].map(
// // // // //                       (header) => (
// // // // //                         <TableCell key={header} sx={{ fontWeight: 'bold' }}>
// // // // //                           {header}
// // // // //                         </TableCell>
// // // // //                       )
// // // // //                     )}
// // // // //                   </TableRow>
// // // // //                 </TableHead>
// // // // //                 <TableBody>
// // // // //                   <TableRow>
// // // // //                     <TableCell colSpan={7} align="center">
// // // // //                       No records available
// // // // //                     </TableCell>
// // // // //                   </TableRow>
// // // // //                 </TableBody>
// // // // //               </Table>
// // // // //             </TableContainer>

// // // // //             <Divider sx={{ my: 2 }} />

// // // // //             <Box display="flex" justifyContent="space-between">
// // // // //               <Typography variant="body2">No records available</Typography>
// // // // //               <Box>
// // // // //                 <Button size="small" disabled>
// // // // //                   Previous
// // // // //                 </Button>
// // // // //                 <Button size="small">Next</Button>
// // // // //               </Box>
// // // // //             </Box>
// // // // //           </Box>
// // // // //         </CardContent>
// // // // //       </Card>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // };

// // // // // export default AssetsEmp;


// // // // import React from 'react';
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   Card,
// // // //   CardContent,
// // // //   Divider,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   MenuItem,
// // // //   Select,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   TextField,
// // // //   Typography,
// // // // } from '@mui/material';

// // // // const AssetsEmp = () => {
// // // //   return (
// // // //     <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
// // // //       <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
// // // //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // //           <Typography variant="subtitle1" fontWeight="bold">
// // // //             List All Assets
// // // //           </Typography>
// // // //         </Box>

// // // //         {/* Table controls */}
// // // //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // // //           <FormControl size="small">
// // // //             <InputLabel>Show</InputLabel>
// // // //             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
// // // //               <MenuItem value={10}>10</MenuItem>
// // // //               <MenuItem value={25}>25</MenuItem>
// // // //               <MenuItem value={50}>50</MenuItem>
// // // //             </Select>
// // // //           </FormControl>
// // // //           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
// // // //         </Box>

// // // //         {/* Table section */}
// // // //         <TableContainer>
// // // //           <Table size="small">
// // // //             <TableHead sx={{ backgroundColor: '#f9fafb' }}>
// // // //               <TableRow>
// // // //                 {[
// // // //                   'ASSET NAME',
// // // //                   'CATEGORY',
// // // //                   'BRAND',
// // // //                   'ASSET CODE',
// // // //                   'IS WORKING?',
// // // //                   '👤 EMPLOYEE',
// // // //                   '📅 CREATED AT',
// // // //                 ].map((header) => (
// // // //                   <TableCell key={header} sx={{ fontWeight: 'bold' }}>
// // // //                     {header}
// // // //                   </TableCell>
// // // //                 ))}
// // // //               </TableRow>
// // // //             </TableHead>
// // // //             <TableBody>
// // // //               <TableRow>
// // // //                 <TableCell colSpan={7} align="center">
// // // //                   No records available
// // // //                 </TableCell>
// // // //               </TableRow>
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>

// // // //         <Divider sx={{ my: 2 }} />

// // // //         {/* Pagination footer */}
// // // //         <Box display="flex" justifyContent="space-between">
// // // //           <Typography variant="body2">No records available</Typography>
// // // //           <Box>
// // // //             <Button size="small" disabled>
// // // //               Previous
// // // //             </Button>
// // // //             <Button size="small">Next</Button>
// // // //           </Box>
// // // //         </Box>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default AssetsEmp;


// // // import React, { useState } from 'react';
// // // import {
// // //   Box,
// // //   Button,
// // //   Card,
// // //   CardContent,
// // //   Chip,
// // //   Divider,
// // //   FormControl,
// // //   InputLabel,
// // //   MenuItem,
// // //   Select,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   TextField,
// // //   Typography,
// // // } from '@mui/material';

// // // // --- Sample Data to Demonstrate Functionality ---
// // // // Each asset now has an 'id' for unique identification and a 'status'
// // // // to track whether it's 'pending', 'received', or 'not_received'.
// // // const initialAssets = [
// // //   {
// // //     id: 1,
// // //     name: 'Laptop Pro 15"',
// // //     category: 'Electronics',
// // //     brand: 'TechCorp',
// // //     code: 'TC-LP-001',
// // //     isWorking: 'Yes',
// // //     employee: 'John Doe',
// // //     createdAt: '2023-10-26',
// // //     status: 'pending',
// // //   },
// // //   {
// // //     id: 2,
// // //     name: 'Ergonomic Chair',
// // //     category: 'Furniture',
// // //     brand: 'ComfortSeat',
// // //     code: 'CS-CH-052',
// // //     isWorking: 'Yes',
// // //     employee: 'Jane Smith',
// // //     createdAt: '2023-10-25',
// // //     status: 'received',
// // //   },
// // //   {
// // //     id: 3,
// // //     name: 'Wireless Mouse',
// // //     category: 'Accessories',
// // //     brand: 'ClickFast',
// // //     code: 'CF-MS-300',
// // //     isWorking: 'No',
// // //     employee: 'Peter Jones',
// // //     createdAt: '2023-10-24',
// // //     status: 'not_received',
// // //   },
// // //   {
// // //     id: 4,
// // //     name: 'Company Smartphone',
// // //     category: 'Electronics',
// // //     brand: 'ConnectAll',
// // //     code: 'CA-SP-G9',
// // //     isWorking: 'Yes',
// // //     employee: 'Susan Williams',
// // //     createdAt: '2023-10-23',
// // //     status: 'pending',
// // //   },
// // // ];

// // // const AssetsEmp = () => {
// // //   // State to hold and manage the list of assets
// // //   const [assets, setAssets] = useState(initialAssets);

// // //   // Function to handle status changes when a button is clicked
// // //   const handleStatusChange = (assetId, newStatus) => {
// // //     setAssets((currentAssets) =>
// // //       currentAssets.map((asset) =>
// // //         asset.id === assetId ? { ...asset, status: newStatus } : asset
// // //       )
// // //     );
// // //   };

// // //   return (
// // //     <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
// // //       <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
// // //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // //           <Typography variant="subtitle1" fontWeight="bold">
// // //             List All Assets
// // //           </Typography>
// // //         </Box>

// // //         {/* Table controls */}
// // //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// // //           <FormControl size="small">
// // //             <InputLabel>Show</InputLabel>
// // //             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
// // //               <MenuItem value={10}>10</MenuItem>
// // //               <MenuItem value={25}>25</MenuItem>
// // //               <MenuItem value={50}>50</MenuItem>
// // //             </Select>
// // //           </FormControl>
// // //           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
// // //         </Box>

// // //         {/* Table section */}
// // //         <TableContainer>
// // //           <Table size="small">
// // //             <TableHead sx={{ backgroundColor: '#f9fafb' }}>
// // //               <TableRow>
// // //                 {[
// // //                   'ASSET NAME',
// // //                   'CATEGORY',
// // //                   'BRAND',
// // //                   'ASSET CODE',
// // //                   'IS WORKING?',
// // //                   '👤 EMPLOYEE',
// // //                   '📅 CREATED AT',
// // //                   'ACTION', // New "Action" column header
// // //                 ].map((header) => (
// // //                   <TableCell key={header} sx={{ fontWeight: 'bold' }}>
// // //                     {header}
// // //                   </TableCell>
// // //                 ))}
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {assets.length > 0 ? (
// // //                 assets.map((asset) => (
// // //                   <TableRow key={asset.id} hover>
// // //                     <TableCell>{asset.name}</TableCell>
// // //                     <TableCell>{asset.category}</TableCell>
// // //                     <TableCell>{asset.brand}</TableCell>
// // //                     <TableCell>{asset.code}</TableCell>
// // //                     <TableCell>{asset.isWorking}</TableCell>
// // //                     <TableCell>{asset.employee}</TableCell>
// // //                     <TableCell>{asset.createdAt}</TableCell>
// // //                     <TableCell>
// // //                       {/* --- Action Cell Logic --- */}
// // //                       {/* If status is 'pending', show buttons */}
// // //                       {asset.status === 'pending' && (
// // //                         <Box display="flex" gap={1}>
// // //                           <Button
// // //                             variant="outlined"
// // //                             color="success"
// // //                             size="small"
// // //                             onClick={() => handleStatusChange(asset.id, 'received')}
// // //                           >
// // //                             Received
// // //                           </Button>
// // //                           <Button
// // //                             variant="outlined"
// // //                             color="error"
// // //                             size="small"
// // //                             onClick={() => handleStatusChange(asset.id, 'not_received')}
// // //                           >
// // //                             Not Received
// // //                           </Button>
// // //                         </Box>
// // //                       )}
// // //                       {/* If status is 'received', show a green Chip */}
// // //                       {asset.status === 'received' && (
// // //                         <Chip label="Received" color="success" size="small" />
// // //                       )}
// // //                       {/* If status is 'not_received', show a red Chip */}
// // //                       {asset.status === 'not_received' && (
// // //                         <Chip label="Not Received" color="error" size="small" />
// // //                       )}
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 ))
// // //               ) : (
// // //                 <TableRow>
// // //                   {/* Updated colSpan to 8 to account for the new column */}
// // //                   <TableCell colSpan={8} align="center">
// // //                     No records available
// // //                   </TableCell>
// // //                 </TableRow>
// // //               )}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>

// // //         <Divider sx={{ my: 2 }} />

// // //         {/* Pagination footer */}
// // //         <Box display="flex" justifyContent="space-between" alignItems="center">
// // //           <Typography variant="body2">
// // //             {assets.length > 0
// // //               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
// // //               : 'No records available'}
// // //           </Typography>
// // //           <Box>
// // //             <Button size="small" disabled>
// // //               Previous
// // //             </Button>
// // //             <Button size="small">Next</Button>
// // //           </Box>
// // //         </Box>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default AssetsEmp;


// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   CardContent,
// //   Chip,
// //   Divider,
// //   FormControl,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Typography,
// // } from '@mui/material';
// // import axios from 'axios';

// // const AssetsEmp = () => {
// //   const [assets, setAssets] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch assets on component mount
// //   useEffect(() => {
// //     const fetchAssets = async () => {
// //       try {
// //         const res = await axios.get('https://tdtlworld.com/hrms-backend/employee_assets/V0921/');
// //         const formatted = res.data.map((item) => ({
// //           id: item.id,
// //           name: item.assets_name,
// //           category: item.category_name || 'N/A',
// //           brand: item.manufacturer || 'N/A',
// //           code: item.company_asset_code,
// //           isWorking: item.is_working,
// //           employee: item.employee_name || 'N/A',
// //           createdAt: item.created_at?.split(' ')[0],
// //           status: item.employee_confirmation === 'accepted'
// //             ? 'received'
// //             : item.returned === 'N'
// //               ? 'pending'
// //               : 'not_received',
// //         }));
// //         setAssets(formatted);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching assets:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchAssets();
// //   }, []);

// //   const handleStatusChange = async (assetId, newStatus) => {
// //     try {
// //       await axios.patch(`https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`, {
// //         action: newStatus,
// //       });

// //       setAssets((currentAssets) =>
// //         currentAssets.map((asset) =>
// //           asset.id === assetId ? { ...asset, status: newStatus } : asset
// //         )
// //       );
// //     } catch (error) {
// //       console.error('Error updating asset status:', error);
// //     }
// //   };

// //   return (
// //     <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
// //       <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
// //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //           <Typography variant="subtitle1" fontWeight="bold">
// //             List All Assets
// //           </Typography>
// //         </Box>

// //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //           <FormControl size="small">
// //             <InputLabel>Show</InputLabel>
// //             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
// //               <MenuItem value={10}>10</MenuItem>
// //               <MenuItem value={25}>25</MenuItem>
// //               <MenuItem value={50}>50</MenuItem>
// //             </Select>
// //           </FormControl>
// //           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
// //         </Box>

// //         <TableContainer>
// //           <Table size="small">
// //             <TableHead sx={{ backgroundColor: '#f9fafb' }}>
// //               <TableRow>
// //                 {[
// //                   'ASSET NAME',
// //                   'CATEGORY',
// //                   'BRAND',
// //                   'ASSET CODE',
// //                   'IS WORKING?',
// //                   '👤 EMPLOYEE',
// //                   '📅 CREATED AT',
// //                   'ACTION',
// //                 ].map((header) => (
// //                   <TableCell key={header} sx={{ fontWeight: 'bold' }}>
// //                     {header}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {!loading && assets.length > 0 ? (
// //                 assets.map((asset) => (
// //                   <TableRow key={asset.id} hover>
// //                     <TableCell>{asset.name}</TableCell>
// //                     <TableCell>{asset.category}</TableCell>
// //                     <TableCell>{asset.brand}</TableCell>
// //                     <TableCell>{asset.code}</TableCell>
// //                     <TableCell>{asset.isWorking}</TableCell>
// //                     <TableCell>{asset.employee}</TableCell>
// //                     <TableCell>{asset.createdAt}</TableCell>
// //                     <TableCell>
// //                       {asset.status === 'pending' && (
// //                         <Box display="flex" gap={1}>
// //                           <Button
// //                             variant="outlined"
// //                             color="success"
// //                             size="small"
// //                             onClick={() => handleStatusChange(asset.id, 'received')}
// //                           >
// //                             Received
// //                           </Button>
// //                           <Button
// //                             variant="outlined"
// //                             color="error"
// //                             size="small"
// //                             onClick={() => handleStatusChange(asset.id, 'not_received')}
// //                           >
// //                             Not Received
// //                           </Button>
// //                         </Box>
// //                       )}
// //                       {asset.status === 'received' && (
// //                         <Chip label="Received" color="success" size="small" />
// //                       )}
// //                       {asset.status === 'not_received' && (
// //                         <Chip label="Not Received" color="error" size="small" />
// //                       )}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={8} align="center">
// //                     {loading ? 'Loading...' : 'No records available'}
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         <Divider sx={{ my: 2 }} />

// //         <Box display="flex" justifyContent="space-between" alignItems="center">
// //           <Typography variant="body2">
// //             {assets.length > 0
// //               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
// //               : 'No records available'}
// //           </Typography>
// //           <Box>
// //             <Button size="small" disabled>
// //               Previous
// //             </Button>
// //             <Button size="small">Next</Button>
// //           </Box>
// //         </Box>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default AssetsEmp;



// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   CardContent,
// //   Chip,
// //   Divider,
// //   FormControl,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Typography,
// // } from '@mui/material';

// // const AssetsEmp = () => {
// //   const [assets, setAssets] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const employeeCode = localStorage.getItem("loggedInUser");
// //   console.log("logged in user", employeeCode);

// //   // Fetch assets from API
// //   const fetchAssets = async () => {
// //     try {
// //       const response = await axios.get(
// //         `https://tdtlworld.com/hrms-backend/employee_assets/${employeeCode}/`
// //       );
// //       const mappedAssets = response.data.map((item) => ({
// //         id: item.id,
// //         name: item.assets_name,
// //         category: item.category_name || '—',
// //         brand: item.manufacturer || '—',
// //         code: item.company_asset_code || '—',
// //         isWorking: item.is_working || '—',
// //         employee: item.employee_name || '—',
// //         createdAt: item.created_at.split(' ')[0],
// //         status:
// //           item.employee_confirmation === 'accepted'
// //             ? 'received'
// //             : item.returned === 'Y'
// //               ? 'not_received'
// //               : 'pending',
// //       }));
// //       setAssets(mappedAssets);
// //     } catch (error) {
// //       console.error('Error fetching assets:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle confirm action
// //   const handleStatusChange = async (assetId, newStatus) => {
// //     try {
// //       await axios.patch(
// //         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
// //         {
// //           action: newStatus === 'received' ? 'received' : 'not_received',
// //         }
// //       );

// //       setAssets((prevAssets) =>
// //         prevAssets.map((asset) =>
// //           asset.id === assetId ? { ...asset, status: newStatus } : asset
// //         )
// //       );
// //     } catch (error) {
// //       console.error('Failed to update asset status:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAssets();
// //   }, []);

// //   return (
// //     <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
// //       <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
// //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //           <Typography variant="subtitle1" fontWeight="bold">
// //             List All Assets
// //           </Typography>
// //         </Box>

// //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
// //           <FormControl size="small">
// //             <InputLabel>Show</InputLabel>
// //             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
// //               <MenuItem value={10}>10</MenuItem>
// //               <MenuItem value={25}>25</MenuItem>
// //               <MenuItem value={50}>50</MenuItem>
// //             </Select>
// //           </FormControl>
// //           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
// //         </Box>

// //         <TableContainer>
// //           <Table size="small">
// //             <TableHead sx={{ backgroundColor: '#f9fafb' }}>
// //               <TableRow>
// //                 {[
// //                   'ASSET NAME',
// //                   'CATEGORY',
// //                   'BRAND',
// //                   'ASSET CODE',
// //                   'IS WORKING?',
// //                   '👤 EMPLOYEE',
// //                   '📅 CREATED AT',
// //                   'ACTION',
// //                 ].map((header) => (
// //                   <TableCell key={header} sx={{ fontWeight: 'bold' }}>
// //                     {header}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {loading ? (
// //                 <TableRow>
// //                   <TableCell colSpan={8} align="center">
// //                     Loading...
// //                   </TableCell>
// //                 </TableRow>
// //               ) : assets.length > 0 ? (
// //                 assets.map((asset) => (
// //                   <TableRow key={asset.id} hover>
// //                     <TableCell>{asset.name}</TableCell>
// //                     <TableCell>{asset.category}</TableCell>
// //                     <TableCell>{asset.brand}</TableCell>
// //                     <TableCell>{asset.code}</TableCell>
// //                     <TableCell>{asset.isWorking}</TableCell>
// //                     <TableCell>{asset.employee}</TableCell>
// //                     <TableCell>{asset.createdAt}</TableCell>
// //                     <TableCell>
// //                       {asset.status === 'pending' && (
// //                         <Box display="flex" gap={1}>
// //                           <Button
// //                             variant="outlined"
// //                             color="success"
// //                             size="small"
// //                             onClick={() => handleStatusChange(asset.id, 'received')}
// //                           >
// //                             Received
// //                           </Button>
// //                           <Button
// //                             variant="outlined"
// //                             color="error"
// //                             size="small"
// //                             onClick={() => handleStatusChange(asset.id, 'not_received')}
// //                           >
// //                             Not Received
// //                           </Button>
// //                         </Box>
// //                       )}
// //                       {asset.status === 'received' && (
// //                         <Chip label="Received" color="success" size="small" />
// //                       )}
// //                       {asset.status === 'not_received' && (
// //                         <Chip label="Not Received" color="error" size="small" />
// //                       )}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={8} align="center">
// //                     No records available
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         <Divider sx={{ my: 2 }} />

// //         <Box display="flex" justifyContent="space-between" alignItems="center">
// //           <Typography variant="body2">
// //             {assets.length > 0
// //               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
// //               : 'No records available'}
// //           </Typography>
// //           <Box>
// //             <Button size="small" disabled>
// //               Previous
// //             </Button>
// //             <Button size="small">Next</Button>
// //           </Box>
// //         </Box>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default AssetsEmp;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

const AssetsLM = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const employeeCode = localStorage.getItem('loggedInUser');
  console.log('logged in user', employeeCode);

  // Fetch assets from API
  const fetchAssets = async () => {
    try {
      const response = await axios.get(
        `https://tdtlworld.com/hrms-backend/employee_assets/${employeeCode}/`
      );
      // Map API response to a more manageable state structure
      const mappedAssets = response.data.map((item) => {
        let status;
        // Determine the confirmation status
        if (item.employee_confirmation === 'accepted') {
          status = 'received';
        } else if (item.employee_confirmation === 'rejected') {
          status = 'not_received';
        } else {
          status = 'pending';
        }

        return {
          id: item.id,
          name: item.assets_name,
          category: item.category_name || '—',
          brand: item.manufacturer || '—',
          code: item.company_asset_code || '—',
          isWorking: item.is_working || '—',
          employee: item.employee_name || '—',
          createdAt: item.created_at.split(' ')[0],
          status: status, // Can be 'pending', 'received', 'not_received'
          returned: item.returned, // Can be 'Y' or 'N'
        };
      });
      setAssets(mappedAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle confirm/reject action
  const handleStatusChange = async (assetId, newStatus) => {
    try {
      await axios.patch(
        `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
        {
          action: newStatus, // Action will be 'received' or 'not_received'
        }
      );

      // Update the local state to reflect the change immediately
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.id === assetId ? { ...asset, status: newStatus } : asset
        )
      );
    } catch (error) {
      console.error('Failed to update asset status:', error);
    }
  };

  // Handle return asset action
  const handleReturnAsset = async (assetId) => {
    try {
      await axios.patch(
        `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
        {
          action: 'return',
        }
      );

      // Update the local state to show 'Returned' status
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.id === assetId ? { ...asset, returned: 'Y' } : asset
        )
      );
    } catch (error) {
      console.error('Failed to return asset:', error);
    }
  };

  useEffect(() => {
    if (employeeCode) {
      fetchAssets();
    } else {
      setLoading(false); // Stop loading if no user is found
    }
  }, [employeeCode]);

  return (
    <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            List All Assets
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <FormControl size="small">
            <InputLabel>Show</InputLabel>
            <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f9fafb' }}>
              <TableRow>
                {[
                  'ASSET NAME',
                  'CATEGORY',
                  'BRAND',
                  'ASSET CODE',
                  'IS WORKING?',
                  '👤 EMPLOYEE',
                  '📅 CREATED AT',
                  'ACTION',
                  'RETURN ASSET', // New Column Header
                ].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: 'bold' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : assets.length > 0 ? (
                assets.map((asset) => (
                  <TableRow key={asset.id} hover>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.brand}</TableCell>
                    <TableCell>{asset.code}</TableCell>
                    <TableCell>{asset.isWorking}</TableCell>
                    <TableCell>{asset.employee}</TableCell>
                    <TableCell>{asset.createdAt}</TableCell>
                    <TableCell>
                      {asset.status === 'pending' && (
                        <Box display="flex" gap={1}>
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => handleStatusChange(asset.id, 'received')}
                          >
                            Received
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleStatusChange(asset.id, 'not_received')}
                          >
                            Not Received
                          </Button>
                        </Box>
                      )}
                      {asset.status === 'received' && (
                        <Chip label="Received" color="success" size="small" />
                      )}
                      {asset.status === 'not_received' && (
                        <Chip label="Not Received" color="error" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      {/* Logic for the Return Asset column */}
                      {asset.status === 'received' && asset.returned === 'N' && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleReturnAsset(asset.id)}
                        >
                          Return Asset
                        </Button>
                      )}
                      {asset.returned === 'Y' && (
                        <Chip label="Returned" color="info" size="small" />
                      )}
                      {/* Show placeholder if asset is not yet received or already returned */}
                      {asset.status !== 'received' && asset.returned !== 'Y' && '—'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No records available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">
            {assets.length > 0
              ? `Showing 1 to ${assets.length} of ${assets.length} entries`
              : 'No records available'}
          </Typography>
          <Box>
            <Button size="small" disabled>
              Previous
            </Button>
            <Button size="small">Next</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssetsLM;

// import React, { useEffect, useState, useMemo, useCallback } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Divider,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Snackbar,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from '@mui/material';

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionInProgress, setActionInProgress] = useState(null); // Tracks ID of asset being actioned on
//   const [searchQuery, setSearchQuery] = useState('');
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   // Memoize employeeId to prevent re-renders unless it changes
//   const employeeId = useMemo(() => localStorage.getItem('loggedInUser'), []);

//   const fetchAssets = useCallback(async () => {
//     if (!employeeId) {
//       setLoading(false);
//       setSnackbar({ open: true, message: 'Employee ID not found. Cannot fetch assets.', severity: 'error' });
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/employee_assets/${employeeId}/`);
//       const mappedAssets = response.data.map((item) => ({
//         id: item.id,
//         name: item.assets_name,
//         category: item.category_name || '—',
//         brand: item.manufacturer || '—',
//         code: item.company_asset_code || '—',
//         isWorking: item.is_working || '—',
//         createdAt: item.created_at.split('T')[0],
//         status: item.employee_confirmation || 'pending',
//         returned: item.returned,
//         returnRequestStatus: item.return_request_status,
//       }));
//       setAssets(mappedAssets);
//     } catch (error) {
//       console.error('Error fetching assets:', error);
//       const message = error.response?.data?.message || 'Error fetching assets.';
//       setSnackbar({ open: true, message, severity: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [employeeId]);

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleApiAction = async (assetId, actionType, successMessage, errorMessage) => {
//     setActionInProgress(assetId);
//     try {
//       const response = await axios.patch(
//         `${API_BASE_URL}/employee_confirm_asset/${assetId}/`,
//         { action: actionType }
//       );
//       setSnackbar({
//         open: true,
//         message: response.data.message || successMessage,
//         severity: 'success',
//       });
//       fetchAssets(); // Re-fetch all assets to get the latest state from the server
//     } catch (error) {
//       console.error(errorMessage, error);
//       const message = error.response?.data?.message || errorMessage;
//       setSnackbar({ open: true, message, severity: 'error' });
//     } finally {
//       setActionInProgress(null);
//     }
//   };

//   const handleStatusChange = (assetId, action) => {
//     handleApiAction(
//       assetId,
//       action,
//       'Asset status updated successfully.',
//       'Failed to update asset status.'
//     );
//   };

//   const handleReturnAssetRequest = (assetId) => {
//     handleApiAction(
//       assetId,
//       'return',
//       'Return request sent successfully.',
//       'Failed to send return request.'
//     );
//   };

//   useEffect(() => {
//     fetchAssets();
//   }, [fetchAssets]);

//   const filteredAssets = useMemo(() => {
//     if (!searchQuery) return assets;
//     const lower = searchQuery.toLowerCase();
//     return assets.filter((asset) =>
//       Object.values(asset).some((val) => String(val).toLowerCase().includes(lower))
//     );
//   }, [assets, searchQuery]);

//   const getStatusChip = (status) => {
//     switch (status) {
//       case 'accepted':
//         return <Chip label="Confirmed" color="success" size="small" />;
//       case 'rejected':
//         return <Chip label="Rejected" color="error" size="small" />;
//       default:
//         return <Chip label="Pending" color="warning" size="small" />;
//     }
//   };

//   // Renders the correct UI component for the "Return Asset" column based on asset state
//   const renderReturnActionCell = (asset) => {
//     // If an action on this specific asset is in progress, show a spinner
//     if (actionInProgress === asset.id) {
//       return <CircularProgress size={24} />;
//     }
//     // Final state: Asset has been successfully returned
//     if (asset.returned === 'Y') {
//       return <Chip label="Returned" color="success" size="small" />;
//     }
//     // Intermediate state: Return request has been sent and is awaiting admin approval
//     if (asset.returnRequestStatus === 'requested') {
//       return <Chip label="Request Sent" color="info" variant="outlined" size="small" />;
//     }
//     // Final state: Admin has denied the return request
//     if (asset.returnRequestStatus === 'denied') {
//       return <Chip label="Return Denied" color="error" size="small" />;
//     }
//     // Prerequisite state: Asset must be confirmed as received before it can be returned
//     if (asset.status !== 'accepted') {
//       return <Chip label="Confirm receipt first" size="small" />;
//     }
//     // Actionable state: Asset is confirmed, not returned yet. Show the button.
//     return (
//       <Button
//         variant="outlined"
//         color="primary"
//         size="small"
//         onClick={() => handleReturnAssetRequest(asset.id)}
//       >
//         Return Asset
//       </Button>
//     );
//   };

//   return (
//     <Card elevation={0} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
//       <CardContent sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6" fontWeight="bold">My Assigned Assets</Typography>
//         </Box>

//         <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} mb={2}>
//           <FormControl size="small">
//             <InputLabel>Show</InputLabel>
//             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             sx={{ width: { xs: '100%', sm: 250 } }}
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </Box>

//         <TableContainer>
//           <Table size="small">
//             <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//               <TableRow>
//                 {['ASSET NAME', 'CATEGORY', 'BRAND', 'ASSET CODE', 'IS WORKING?', 'ASSIGNED ON', 'CONFIRMATION', 'RETURN ASSET'].map((header) => (
//                   <TableCell key={header} sx={{ fontWeight: 'bold' }}>{header}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center"><CircularProgress /></TableCell>
//                 </TableRow>
//               ) : filteredAssets.length > 0 ? (
//                 filteredAssets.map((asset) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell>{asset.name}</TableCell>
//                     <TableCell>{asset.category}</TableCell>
//                     <TableCell>{asset.brand}</TableCell>
//                     <TableCell>{asset.code}</TableCell>
//                     <TableCell><Chip label={asset.isWorking} size="small" /></TableCell>
//                     <TableCell>{asset.createdAt}</TableCell>
//                     <TableCell>
//                       {actionInProgress === asset.id ? (
//                         <CircularProgress size={24} />
//                       ) : asset.status === 'pending' ? (
//                         <Box display="flex" gap={1}>
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() => handleStatusChange(asset.id, 'received')}
//                           >Received</Button>
//                           <Button
//                             variant="outlined"
//                             color="error"
//                             size="small"
//                             onClick={() => handleStatusChange(asset.id, 'not_received')}
//                           >Not Received</Button>
//                         </Box>
//                       ) : (
//                         getStatusChip(asset.status)
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {renderReturnActionCell(asset)}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">No assigned assets found.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Divider sx={{ my: 2 }} />
//         <Typography variant="body2">
//           Showing {filteredAssets.length} of {assets.length} assets
//         </Typography>
//       </CardContent>

//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//         <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Card>
//   );
// };

// export default AssetsEmp;