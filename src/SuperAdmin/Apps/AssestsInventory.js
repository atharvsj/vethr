// import React, { useState, useEffect, useMemo } from 'react';

// // Import Material-UI components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Alert,
//   Box,
//   Container,
//   TextField,         // For the search bar
//   TablePagination,   // For pagination
//   InputAdornment     // To add icons to input fields
// } from '@mui/material';

// // Import an icon for the search bar
// import SearchIcon from '@mui/icons-material/Search';

// // The main component
// const AssestsInventory = () => {
//   // State for the original fetched data
//   const [inventoryData, setInventoryData] = useState([]);
//   // State to manage the loading status
//   const [loading, setLoading] = useState(true);
//   // State to store any potential errors
//   const [error, setError] = useState(null);

//   // --- NEW: State for Pagination and Search ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   // The API endpoint URL
//   const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets_inventory/';

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (e) {
//         setError(e.message);
//         console.error("Failed to fetch inventory data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []); // The empty dependency array [] ensures this effect runs only once

//   // --- NEW: Handlers for pagination and search ---

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on a new search
//   };

//   // --- NEW: Memoized filtering of data ---
//   // This avoids re-filtering on every render, only when data or search term changes
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return inventoryData;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return inventoryData.filter(item =>
//       // Check if any of the main text fields include the search term
//       item.Category_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Brand_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Product_name?.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [inventoryData, searchTerm]);


//   // --- Conditional Rendering ---

//   // 1. Loading state
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Loading Inventory...
//         </Typography>
//       </Box>
//     );
//   }

//   // 2. Error state
//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           <strong>Failed to load data.</strong> Please try again later.
//           <br />
//           <small>Error: {error}</small>
//         </Alert>
//       </Container>
//     );
//   }

//   // 3. Main render with data, search, and pagination
//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Assets Inventory
//       </Typography>

//       {/* --- NEW: Search Bar --- */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: '200px' }}
//         />
//       </Box>

//       <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
//         <TableContainer sx={{ maxHeight: 640 }}>
//           <Table stickyHeader sx={{ minWidth: 650 }} aria-label="assets inventory table">
//             <TableHead sx={{
//               '& .MuiTableCell-root': {
//                 backgroundColor: '#7C3AED', // Purple header
//                 color: 'white',
//                 fontWeight: 'bold',
//               }
//             }}>
//               <TableRow>
//                 <TableCell align="center">Sr. No.</TableCell>
//                 <TableCell>Category Name</TableCell>
//                 <TableCell>Brand Name</TableCell>
//                 <TableCell>Product Name</TableCell>
//                 <TableCell align="center">Total Purchased</TableCell>
//                 <TableCell align="center">Assigned</TableCell>
//                 <TableCell align="center">Returned</TableCell>
//                 <TableCell align="center">In Stock</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* --- MODIFIED: Use sliced and filtered data --- */}
//               {filteredData.length > 0 ? (
//                 (rowsPerPage > 0
//                   ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   : filteredData
//                 ).map((row, index) => (
//                   <TableRow
//                     key={`${row.Category_name}-${row.Brand_name}-${row.Product_name}`} // Using a more unique key
//                     hover
//                     sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                   >
//                     {/* Calculate Sr. No. based on page and index */}
//                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.Category_name}</TableCell>
//                     <TableCell>{row.Brand_name}</TableCell>
//                     <TableCell>{row.Product_name}</TableCell>
//                     <TableCell align="center">{row.TotalPurchased}</TableCell>
//                     <TableCell align="center">{row.Assigned}</TableCell>
//                     <TableCell align="center">{row.Returned}</TableCell>
//                     <TableCell align="center">{row.InStock}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">
//                     No results found for "{searchTerm}"
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* --- NEW: Pagination Component --- */}
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//           component="div"
//           count={filteredData.length} // Count is based on filtered data
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default AssestsInventory;












// import React, { useState, useEffect, useMemo } from 'react';

// // Import Material-UI components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Alert,
//   Box,
//   Container,
//   TextField,
//   TablePagination,
//   InputAdornment
// } from '@mui/material';

// // Import an icon for the search bar
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';

// // The main component
// const AssestsInventory = () => {
//   // State for the original fetched data
//   const [inventoryData, setInventoryData] = useState([]);
//   // State to manage the loading status
//   const [loading, setLoading] = useState(true);
//   // State to store any potential errors
//   const [error, setError] = useState(null);

//   // State for Pagination and Search
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   // The API endpoint URL
//   const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets_inventory/';

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (e) {
//         setError(e.message);
//         console.error("Failed to fetch inventory data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []); // The empty dependency array [] ensures this effect runs only once

//   // Handlers for pagination and search
//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on a new search
//   };

//   // Memoized filtering of data to avoid re-filtering on every render
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return inventoryData;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return inventoryData.filter(item =>
//       item.Category_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Brand_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Product_name?.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [inventoryData, searchTerm]);


//   // Conditional Rendering

//   // 1. Loading state
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Loading Inventory...
//         </Typography>
//       </Box>
//     );
//   }

//   // 2. Error state
//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           <strong>Failed to load data.</strong> Please try again later.
//           <br />
//           <small>Error: {error}</small>
//         </Alert>
//       </Container>
//     );
//   }

//   // 3. Main render with data, search, and pagination
//   return (
//     <Container sx={{ mt: 4, maxWidth: '100% !important' }}>
//        {/* Updated Title with Orange accent */}
//       <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
//         Assets <Typography component="span" variant="h4" fontWeight="bold" sx={{ color: THEME_ORANGE }}>Inventory</Typography>
//       </Typography>

//       <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3, p: 2 }}>
//          {/* Search Bar */}
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//             <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 InputProps={{
//                     startAdornment: (
//                     <InputAdornment position="start">
//                         <SearchIcon />
//                     </InputAdornment>
//                     ),
//                 }}
//                 sx={{ width: '300px' }}
//             />
//         </Box>

//         <TableContainer sx={{ maxHeight: 640 }}>
//           <Table stickyHeader sx={{ minWidth: 650 }} aria-label="assets inventory table">
//             {/* Updated Table Head with theme color */}
//             <TableHead sx={{
//               '& .MuiTableCell-root': {
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 fontWeight: 'bold',
//               }
//             }}>
//               <TableRow>
//                 <TableCell align="center">Sr. No.</TableCell>
//                 <TableCell>Category Name</TableCell>
//                 <TableCell>Brand Name</TableCell>
//                 <TableCell>Product Name</TableCell>
//                 <TableCell align="center">Total Purchased</TableCell>
//                 <TableCell align="center">Assigned</TableCell>
//                 <TableCell align="center">Returned</TableCell>
//                 <TableCell align="center">In Stock</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.length > 0 ? (
//                 (rowsPerPage > 0
//                   ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   : filteredData
//                 ).map((row, index) => (
//                   <TableRow
//                     key={`${row.Category_name}-${row.Brand_name}-${row.Product_name}-${index}`}
//                     hover
//                     sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                   >
//                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.Category_name}</TableCell>
//                     <TableCell>{row.Brand_name}</TableCell>
//                     <TableCell>{row.Product_name}</TableCell>
//                     <TableCell align="center">{row.TotalPurchased}</TableCell>
//                     <TableCell align="center">{row.Assigned}</TableCell>
//                     <TableCell align="center">{row.Returned}</TableCell>
//                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.InStock}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">
//                     <Typography py={4}>No results found for "{searchTerm}"</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Paper>
//     </Container>
//   );
// };

// export default AssestsInventory;






// import React, { useState, useEffect, useMemo } from 'react';

// // Import Material-UI components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Alert,
//   Box,
//   Container,
//   TextField,
//   TablePagination,
//   InputAdornment
// } from '@mui/material';

// // Import an icon for the search bar
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';

// // The main component
// const AssestsInventory = () => {
//   // State for the original fetched data
//   const [inventoryData, setInventoryData] = useState([]);
//   // State to manage the loading status
//   const [loading, setLoading] = useState(true);
//   // State to store any potential errors
//   const [error, setError] = useState(null);

//   // State for Pagination and Search
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   // The API endpoint URL
//   const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets_inventory/';

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (e) {
//         setError(e.message);
//         console.error("Failed to fetch inventory data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []); // The empty dependency array [] ensures this effect runs only once

//   // Handlers for pagination and search
//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to the first page
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on a new search
//   };

//   // Memoized filtering of data to avoid re-filtering on every render
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return inventoryData;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return inventoryData.filter(item =>
//       item.Category_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Brand_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Product_name?.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [inventoryData, searchTerm]);


//   // Conditional Rendering

//   // 1. Loading state
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Loading Inventory...
//         </Typography>
//       </Box>
//     );
//   }

//   // 2. Error state
//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           <strong>Failed to load data.</strong> Please try again later.
//           <br />
//           <small>Error: {error}</small>
//         </Alert>
//       </Container>
//     );
//   }

//   // 3. Main render with data, search, and pagination
//   return (
//     <Container sx={{ mt: 1, maxWidth: '100% !important' }}>
//        {/* Updated Title with Orange accent */}
//       <Typography variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//                     Asset <Typography component="span" variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}}>Inventory</Typography>
//                   </Typography>

//          {/* Search Bar */}
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//             <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 InputProps={{
//                     startAdornment: (
//                     <InputAdornment position="start">
//                         <SearchIcon />
//                     </InputAdornment>
//                     ),
//                 }}
//                 sx={{ width: '300px' }}
//             />
//         </Box>

//         <TableContainer sx={{ maxHeight: 640 }}>
//           <Table stickyHeader sx={{ minWidth: 650 }} aria-label="assets inventory table">
//             {/* Updated Table Head with theme color */}
//             <TableHead sx={{
//               '& .MuiTableCell-root': {
//                 backgroundColor: THEME_PURPLE,
//                 color: 'white',
//                 fontWeight: 'bold',
//               }
//             }}>
//               <TableRow>
//                 <TableCell align="center">SR. NO.</TableCell>
//                 <TableCell>CATEGORY NAME</TableCell>
//                 <TableCell>BRAND NAME</TableCell>
//                 <TableCell>PRODUCT NAME</TableCell>
//                 <TableCell align="center">TOTAL PURCHASED</TableCell>
//                 <TableCell align="center">ASSIGNED</TableCell>
//                 <TableCell align="center">RETURNED</TableCell>
//                 <TableCell align="center">IN STOCK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.length > 0 ? (
//                 (rowsPerPage > 0
//                   ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   : filteredData
//                 ).map((row, index) => (
//                   <TableRow
//                     key={`${row.Category_name}-${row.Brand_name}-${row.Product_name}-${index}`}
//                     hover
//                     sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                   >
//                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.Category_name}</TableCell>
//                     <TableCell>{row.Brand_name}</TableCell>
//                     <TableCell>{row.Product_name}</TableCell>
//                     <TableCell align="center">{row.TotalPurchased}</TableCell>
//                     <TableCell align="center">{row.Assigned}</TableCell>
//                     <TableCell align="center">{row.Returned}</TableCell>
//                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.InStock}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">
//                     <Typography py={4}>No results found for "{searchTerm}"</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//     </Container>
//   );
// };

// export default AssestsInventory;










// import React, { useState, useEffect, useMemo } from 'react';

// // Import Material-UI components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Alert,
//   Box,
//   Container,
//   TextField,
//   TablePagination,
//   InputAdornment
// } from '@mui/material';

// // Import an icon for the search bar
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';

// // The main component
// const AssestsInventory = () => {
//   // State for the original fetched data
//   const [inventoryData, setInventoryData] = useState([]);
//   // State to manage the loading status
//   const [loading, setLoading] = useState(true);
//   // State to store any potential errors
//   const [error, setError] = useState(null);

//   // State for Pagination and Search
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   // The API endpoint URL
//   const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets_inventory/';

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (e) {
//         setError(e.message);
//         console.error("Failed to fetch inventory data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []); // The empty dependency array [] ensures this effect runs only once

//   // Handlers for pagination
//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     // Handle the 'All' option, if selected
//     const value = parseInt(event.target.value, 10);
//     setRowsPerPage(value === -1 ? inventoryData.length : value);
//     setPage(0); // Reset to the first page
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on a new search
//   };

//   // Memoized filtering of data to avoid re-filtering on every render
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return inventoryData;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return inventoryData.filter(item =>
//       item.Category_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Brand_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Product_name?.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [inventoryData, searchTerm]);
  
//   const totalCount = filteredData.length;

//   // Conditional Rendering

//   // 1. Loading state
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Loading Inventory...
//         </Typography>
//       </Box>
//     );
//   }

//   // 2. Error state
//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           <strong>Failed to load data.</strong> Please try again later.
//           <br />
//           <small>Error: {error}</small>
//         </Alert>
//       </Container>
//     );
//   }

//   // 3. Main render with data, search, and pagination
//   return (
//     <Container sx={{ mt: 1, maxWidth: '100% !important' }}>
//        {/* Updated Title */}
//       <Typography variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//         Asset <Typography component="span" variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}}>Inventory</Typography>
//       </Typography>

//       {/* Search Bar */}
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//           <TextField
//               label="Search"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               InputProps={{
//                   startAdornment: (
//                   <InputAdornment position="start">
//                       <SearchIcon />
//                   </InputAdornment>
//                   ),
//               }}
//               sx={{ width: '300px' }}
//           />
//       </Box>
      
//       {/* Wrap TableContainer and new Footer in a Paper component */}
//       <Paper sx={{ boxShadow: 1 }}>
//         <TableContainer sx={{ maxHeight: 640 }}>
//             <Table stickyHeader sx={{ minWidth: 650 }} aria-label="assets inventory table">
//               {/* Updated Table Head with theme color */}
//               <TableHead sx={{
//                 '& .MuiTableCell-root': {
//                   backgroundColor: THEME_PURPLE,
//                   color: 'white',
//                   fontWeight: 'bold',
//                 }
//               }}>
//                 <TableRow>
//                   <TableCell align="center">SR. NO.</TableCell>
//                   <TableCell>CATEGORY NAME</TableCell>
//                   <TableCell>BRAND NAME</TableCell>
//                   <TableCell>ASSET RODUCT NAME</TableCell>
//                   <TableCell align="center">TOTAL PURCHASED</TableCell>
//                   <TableCell align="center">ASSIGNED</TableCell>
//                   <TableCell align="center">RETURNED</TableCell>
//                   <TableCell align="center">IN STOCK</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   (rowsPerPage > 0
//                     ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     : filteredData
//                   ).map((row, index) => (
//                     <TableRow
//                       key={`${row.Category_name}-${row.Brand_name}-${row.Product_name}-${index}`}
//                       hover
//                       sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                     >
//                       <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.Category_name}</TableCell>
//                       <TableCell>{row.Brand_name}</TableCell>
//                       <TableCell>{row.Product_name}</TableCell>
//                       <TableCell align="center">{row.TotalPurchased}</TableCell>
//                       <TableCell align="center">{row.Assigned}</TableCell>
//                       <TableCell align="center">{row.Returned}</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.InStock}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center">
//                       <Typography py={4}>No results found for "{searchTerm}"</Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>

//         {/* --- NEW FOOTER --- */}
//         <Box
//           sx={{
//             p: 2,
//             borderTop: "1px solid",
//             borderColor: "divider",
//             backgroundColor: "background.paper",
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap', // Ensures responsiveness
//             gap: 2 // Adds space between items on smaller screens
//           }}
//         >
//           {/* Left side: "Showing X to Y of Z results" */}
//           <Typography variant="body2" color="text.secondary">
//             Showing {totalCount === 0 ? 0 : page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, totalCount)} of {totalCount} results
//           </Typography>
          
//           {/* Right side: MUI TablePagination */}
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: totalCount }]}
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={handlePageChange}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleRowsPerPageChange}
//             sx={{
//               // Removes the border and padding from the component itself
//               // as the parent Box already handles it.
//               '.MuiToolbar-root': {
//                 p: 0,
//               }
//             }}
//           />
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default AssestsInventory;






// import React, { useState, useEffect, useMemo } from 'react';

// // Import Material-UI components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Alert,
//   Box,
//   Container,
//   TextField,
//   InputAdornment,
//   FormControl,
//   Select,
//   MenuItem,
//   Pagination,
// } from '@mui/material';

// // Import an icon for the search bar
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#6d1d60';
// const THEME_ORANGE = '#F58E35';


// // The main component
// const AssestsInventory = () => {
//   // State for the original fetched data
//   const [inventoryData, setInventoryData] = useState([]);
//   // State to manage the loading status
//   const [loading, setLoading] = useState(true);
//   // State to store any potential errors
//   const [error, setError] = useState(null);

//   // State for Pagination and Search
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');

//   // The API endpoint URL
//   const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets_inventory/';

//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (e) {
//         setError(e.message);
//         console.error("Failed to fetch inventory data:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []);

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return inventoryData;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return inventoryData.filter(item =>
//       item.Category_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Brand_name?.toLowerCase().includes(lowercasedFilter) ||
//       item.Product_name?.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [inventoryData, searchTerm]);
  
//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Loading Inventory...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">
//           <strong>Failed to load data.</strong> Please try again later.
//           <br />
//           <small>Error: {error}</small>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ mt: 1, maxWidth: '100% !important' }}>
//       <Typography variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//         Asset <Typography component="span" variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}}>Inventory</Typography>
//       </Typography>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//           <TextField
//               label="Search"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               InputProps={{
//                   startAdornment: (
//                   <InputAdornment position="start">
//                       <SearchIcon />
//                   </InputAdornment>
//                   ),
//               }}
//               sx={{ width: '300px' }}
//           />
//       </Box>
      
//       <Paper sx={{ boxShadow: 1 }}>
//         <TableContainer sx={{ maxHeight: 640 }}>
//             <Table stickyHeader sx={{ minWidth: 650 }} aria-label="assets inventory table">
//               <TableHead sx={{
//                 '& .MuiTableCell-root': {
//                   backgroundColor: THEME_PURPLE,
//                   color: 'white',
//                   fontWeight: 'bold',
//                 }
//               }}>
//                 <TableRow>
//                   <TableCell align="center">SR. NO.</TableCell>
//                   <TableCell>ASSET PRODUCT NAME</TableCell>
//                   <TableCell>BRAND NAME</TableCell>
//                   <TableCell>CATEGORY NAME</TableCell>
//                   <TableCell align="center">TOTAL PURCHASED</TableCell>
//                   <TableCell align="center">ASSIGNED</TableCell>
//                   <TableCell align="center">RETURNED</TableCell>
//                   <TableCell align="center">AVAILABLE STOCK</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedData.length > 0 ? (
//                   paginatedData.map((row, index) => (
//                     <TableRow
//                       key={`${row.Category_name}-${row.Brand_name}-${row.Product_name}-${index}`}
//                       hover
//                       sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
//                     >
//                       <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.Category_name}</TableCell>
//                       <TableCell>{row.Brand_name}</TableCell>
//                       <TableCell>{row.Product_name}</TableCell>
//                       <TableCell align="center">{row.TotalPurchased}</TableCell>
//                       <TableCell align="center">{row.Assigned}</TableCell>
//                       <TableCell align="center">{row.Returned}</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.InStock}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center">
//                       <Typography py={4}>No results found for "{searchTerm}"</Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>

//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <FormControl variant="outlined" size="small">
//                             <Select
//                                 value={rowsPerPage}
//                                 onChange={handleRowsPerPageChange}
//                                 sx={{
//                                     backgroundColor: THEME_PURPLE,
//                                     color: 'white',
//                                     borderRadius: '4px',
//                                     '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//                                     '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                     '& .MuiSvgIcon-root': { color: 'white' },
//                                 }}
//                             >
//                                 {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                             </Select>
//                         </FormControl>
//                         <Typography variant="body2" color="text.secondary">
//                           {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
//                         </Typography>
//                     </Box>
//                     <Pagination
//                         count={Math.ceil(filteredData.length / rowsPerPage)}
//                         page={page + 1}
//                         onChange={handlePaginationChange}
//                         showFirstButton showLastButton
//                         sx={{
//                             '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
//                             '& .MuiPaginationItem-page': {
//                                 color: THEME_PURPLE,
//                                 '&.Mui-selected': {
//                                     backgroundColor: THEME_PURPLE,
//                                     color: 'white',
//                                     '&:hover': { backgroundColor: THEME_ORANGE }
//                                 },
//                             },
//                             '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
//                         }}
//                     />
//                 </Box>
//             )}
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default AssestsInventory;








import React, { useState, useEffect, useMemo } from 'react';

// Import Material-UI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Alert,
  Box,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';

// Import an icon for the search bar and close button
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Define the color theme constants
const THEME_PURPLE = '#8C257C';
const THEME_PURPLE_HOVER = '#6d1d60';
const THEME_ORANGE = '#F58E35';

// The main component
const AssestsInventory = () => {
  // State for the original fetched data
  const [inventoryData, setInventoryData] = useState([]);
  // State to manage the loading status
  const [loading, setLoading] = useState(true);
  // State to store any potential errors
  const [error, setError] = useState(null);

  // State for Pagination and Search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // State for the View Details modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // The API endpoint URL
  const API_URL = 'https://tdtlworld.com/hrms-backend/api/assets_inventory/';

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setInventoryData(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch inventory data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Handlers for the modal
  const handleViewDetailsClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return inventoryData;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return inventoryData.filter(item =>
      item.Category_name?.toLowerCase().includes(lowercasedFilter) ||
      item.Brand_name?.toLowerCase().includes(lowercasedFilter) ||
      item.Product_name?.toLowerCase().includes(lowercasedFilter)
    );
  }, [inventoryData, searchTerm]);
  
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading Inventory...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          <strong>Failed to load data.</strong> Please try again later.
          <br />
          <small>Error: {error}</small>
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 1, maxWidth: '100% !important' }}>
      <Typography variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
        Asset <Typography component="span" variant="h4"  fontWeight="bold" sx={{color:"#8C257C"}}>Inventory</Typography>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                      <SearchIcon />
                  </InputAdornment>
                  ),
              }}
              sx={{ width: '300px' }}
          />
      </Box>
      
      <Paper sx={{ boxShadow: 1 }}>
        <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="assets inventory table">
              <TableHead sx={{
                '& .MuiTableCell-root': {
                  backgroundColor: THEME_PURPLE,
                  color: 'white',
                  fontWeight: 'bold',
                }
              }}>
                <TableRow>
                  <TableCell align="center">SR. NO.</TableCell>
                  <TableCell>ASSET PRODUCT NAME</TableCell>
                  <TableCell align="center">AVAILABLE STOCK</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <TableRow
                      key={`${row.Category_name}-${row.Brand_name}-${row.Product_name}-${index}`}
                      hover
                      sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}
                    >
                      <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.Product_name}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{row.InStock}</TableCell>
                      <TableCell align="center">
                          <Button 
                              variant="contained" 
                              size="small"
                              onClick={() => handleViewDetailsClick(row)}
                              sx={{
                                  backgroundColor: THEME_ORANGE,
                                  '&:hover': {
                                      backgroundColor: '#e47a2e'
                                  }
                              }}
                          >
                              View
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography py={4}>No results found for "{searchTerm}"</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
        </TableContainer>

        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
            {filteredData.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <FormControl variant="outlined" size="small">
                            <Select
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
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
                          {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                        </Typography>
                    </Box>
                    <Pagination
                        count={Math.ceil(filteredData.length / rowsPerPage)}
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
      </Paper>
      
      {/* View Details Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
          <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
            Asset Details
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedRowData && (
              <Box>
                <Typography variant="h6" gutterBottom>{selectedRowData.Product_name}</Typography>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Brand Name</TableCell>
                            <TableCell>{selectedRowData.Brand_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
                            <TableCell>{selectedRowData.Category_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total Purchased</TableCell>
                            <TableCell>{selectedRowData.TotalPurchased}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Assigned</TableCell>
                            <TableCell>{selectedRowData.Assigned}</TableCell>
                        </TableRow>
                       
                    </TableBody>
                </Table>
              </Box>
            )}
          </DialogContent>
         
      </Dialog>

    </Container>
  );
};

export default AssestsInventory;