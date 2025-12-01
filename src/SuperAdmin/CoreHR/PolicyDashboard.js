// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Grid, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow,
//   TextField, Button, Container, CssBaseline, Card,
//   CardContent, Chip, Avatar, ToggleButton,
//   ToggleButtonGroup, CircularProgress, TablePagination
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   HighlightOff as HighlightOffIcon,
//   Search as SearchIcon,
//   Pending as PendingIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';

// // --- COLOR CONSTANTS ---
// const THEME_COLORS = {
//   purple: '#8C257C', // Primary / Header BG
//   orange: '#F58E35', // Secondary / Warning
//   white: '#ffffff',
//   headerText: '#ffffff',
// };

// // --- HELPER FUNCTION (No changes) ---
// const formatDateTime = (datetimeString) => {
//   if (!datetimeString) return 'N/A';
//   try {
//     const date = new Date(datetimeString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     return `${year}-${month}-${day} `;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // --- DETAIL VIEW COMPONENT (STYLED WITH NEW COLORS) ---
// const AcknowledgementDetailView = ({ details, onBack }) => {
//   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
//   // Pagination state for detail view (optional, but good for standardization)
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const employeeName = details.length > 0 ? details[0].employee_name.trim() : 'N/A';
//   const employeeCode = details.length > 0 ? details[0].employee_code : 'N/A';

//   const filteredDetails = useMemo(() => {
//     if (detailStatusFilter === 'All') return details;
//     return details.filter(d => (d.status === 'Acknowledged' ? 'Acknowledged' : 'Pending') === detailStatusFilter);
//   }, [details, detailStatusFilter]);

//   // Reset page on filter change
//   useEffect(() => {
//     setPage(0);
//   }, [detailStatusFilter]);

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) setDetailStatusFilter(newFilter);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Pagination slicing
//   const paginatedDetails = filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Container maxWidth={false} sx={{ mt: 4 }}>
//       <Card variant="outlined" sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//             {/* Left Section (Title + Avatar) */}
//             <Grid item>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <Avatar sx={{ bgcolor: THEME_COLORS.purple, width: 56, height: 56 }}>
//                   <AssignmentTurnedInIcon />
//                 </Avatar>
//                 <div>
//                   <Typography variant="h5" sx={{ fontWeight: 600 }}>Policy Details</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {`For ${employeeName} (${employeeCode})`}
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>

//             {/* Right Section (Filter + Back Button) */}
//             <Grid item>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                 <ToggleButtonGroup
//                   value={detailStatusFilter}
//                   exclusive
//                   onChange={handleFilterChange}
//                   size="small"
//                   sx={{
//                     '& .Mui-selected': {
//                       backgroundColor: `${THEME_COLORS.purple} !important`,
//                       color: `${THEME_COLORS.white} !important`,
//                     }
//                   }}
//                 >
//                   <ToggleButton value="All">All</ToggleButton>
//                   <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                   <ToggleButton value="Pending">Pending</ToggleButton>
//                 </ToggleButtonGroup>

//                 <Button
//                   variant="contained"
//                   startIcon={<ArrowBackIcon />}
//                   onClick={onBack}
//                   sx={{
//                     backgroundColor: THEME_COLORS.purple,
//                     '&:hover': { filter: 'brightness(0.9)' }
//                   }}
//                 >
//                   Back to List
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Table Section */}
//           <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: THEME_COLORS.purple }}>
//                   <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.headerText }}>SR</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.headerText }}>Policy Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.headerText }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.headerText }}>Acknowledgement Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedDetails.length > 0 ? (
//                   paginatedDetails.map((record, index) => {
//                     // Calculate actual serial number based on page
//                     const serialNumber = page * rowsPerPage + index + 1;
//                     return (
//                       <TableRow key={index} hover>
//                         <TableCell>{serialNumber}</TableCell>
//                         <TableCell>{record.policy_name}</TableCell>
//                         <TableCell>
//                           {record.status === 'Acknowledged' ? (
//                             <Chip
//                               label="Acknowledged"
//                               size="small"
//                               icon={<CheckCircleIcon />}
//                               sx={{ bgcolor: THEME_COLORS.purple, color: 'white', '& .MuiChip-icon': { color: 'white' } }}
//                             />
//                           ) : (
//                             <Chip
//                               label="Pending"
//                               size="small"
//                               icon={<PendingIcon />}
//                               sx={{ bgcolor: THEME_COLORS.orange, color: 'white', '& .MuiChip-icon': { color: 'white' } }}
//                             />
//                           )}
//                         </TableCell>
//                         <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
//                       </TableRow>
//                     );
//                   })
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
//                       <Typography color="text.secondary">
//                         No policies match the selected filter.
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Standardized Footer: Total Left, Pagination Right */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               Total Rows: {filteredDetails.length}
//             </Typography>
//             <TablePagination
//               component="div"
//               count={filteredDetails.length}
//               page={page}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               rowsPerPageOptions={[5, 10, 25]}
//             />
//           </Box>

//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// // --- TABLE VIEW COMPONENT (STANDARDIZED LAYOUT & COLORS) ---
// const AcknowledgementTableView = ({
//   records,
//   onRowClick,
//   search,
//   onSearchChange,
//   loading,
//   statusFilter,
//   onStatusChange,
//   // Pagination props passed from main component
//   page,
//   onPageChange,
//   rowsPerPage,
//   onRowsPerPageChange
// }) => {

//   // Sliced records for current page
//   const paginatedRecords = loading ? [] : records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Container maxWidth="xl" sx={{ mt: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//         {/* Header Section with Title, Filters, and Search */}
//         <Box p={2} borderBottom="1px solid #e0e0e0">
//           <Typography variant="h5" component="h1" sx={{ fontWeight: '600', mb: 2, color: THEME_COLORS.purple }}>
//             Policy Acknowledged Status
//           </Typography>
//           <Grid container spacing={2} justifyContent="space-between" alignItems="center">
//             {/* Left Side: Filters */}
//             <Grid item xs={12} md={8}>
//               <ToggleButtonGroup
//                 value={statusFilter}
//                 exclusive
//                 onChange={onStatusChange}
//                 aria-label="status filter"
//                 size="small"
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   "& .MuiToggleButton-root": {
//                     flex: { xs: "1 1 auto", sm: "initial" }, // Responsive sizing
//                     fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                   },
//                   "& .Mui-selected": {
//                     backgroundColor: `${THEME_COLORS.purple} !important`,
//                     color: `${THEME_COLORS.white} !important`,
//                   },
//                 }}
//               >
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
//                 <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
//               </ToggleButtonGroup>
//             </Grid>
//             {/* Right Side: Search Bar */}
//             <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
//               <TextField
//                 label="Search by Employee Name"
//                 variant="outlined"
//                 size="small"
//                 value={search}
//                 onChange={onSearchChange}
//                 sx={{
//                   width: { xs: '100%', md: '300px' },
//                   '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: THEME_COLORS.purple } },
//                   '& label.Mui-focused': { color: THEME_COLORS.purple }
//                 }}
//                 InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} /> }}
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Table Section */}
//         <TableContainer sx={{ maxHeight: '65vh' }}> {/* Fixed height for sticky header */}
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{
//                 '& .MuiTableCell-head': {
//                   backgroundColor: THEME_COLORS.purple,
//                   color: THEME_COLORS.headerText,
//                   fontWeight: 'bold'
//                 }
//               }}>
//                 <TableCell>SR</TableCell>
//                 <TableCell>EMPLOYEE NAME</TableCell>
//                 <TableCell>EMPLOYEE CODE</TableCell>
//                 <TableCell align="center">TOTAL POLICIES</TableCell>
//                 <TableCell align="center">ACKNOWLEDGED</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>LAST ACKNOWLEDGEMENT</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5 }}><CircularProgress sx={{ color: THEME_COLORS.purple }} /><Typography sx={{ mt: 1 }}>Loading Data...</Typography></TableCell></TableRow>
//               ) : paginatedRecords.length > 0 ? (
//                 paginatedRecords.map((row, index) => {
//                   // Calculate actual serial number based on page
//                   const serialNumber = page * rowsPerPage + index + 1;
//                   return (
//                     <TableRow key={row.employee_code} hover onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
//                       <TableCell>{serialNumber}</TableCell>
//                       <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
//                       <TableCell>{row.employee_code}</TableCell>
//                       <TableCell align="center">{row.total_policies}</TableCell>
//                       <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
//                       <TableCell>
//                         {row.status === 'Acknowledged' ? (
//                           <Chip label="Acknowledged" size="small" icon={<CheckCircleIcon />} sx={{ bgcolor: THEME_COLORS.purple, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
//                         ) : row.status === 'Partially Acknowledged' ? (
//                           <Chip label="Partially" size="small" icon={<PendingIcon />} sx={{ bgcolor: THEME_COLORS.orange, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
//                         ) : (
//                           <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />
//                         )}
//                       </TableCell>
//                       <TableCell>{formatDateTime(row.last_acknowledge_date)}</TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5 }}><Typography color="text.secondary">No results found for the selected criteria.</Typography></TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Standardized Footer: Total Left, Pagination Right */}
//         {!loading && (
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderTop: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
//             <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//               Total Rows: {records.length}
//             </Typography>
//             <TablePagination
//               component="div"
//               count={records.length}
//               page={page}
//               onPageChange={onPageChange}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={onRowsPerPageChange}
//               rowsPerPageOptions={[10, 25, 50, 100]}
//               sx={{
//                 border: 'none',
//                 '& .MuiTablePagination-toolbar': { paddingRight: 0 } //Align closer to edge
//               }}
//             />
//           </Box>
//         )}
//       </Card>
//     </Container>
//   );
// };

// // --- MAIN EXPORTED COMPONENT ---
// export default function PolicyAcknowledgementViewer() {
//   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');

//   // Pagination State for Main Table
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get('/policy-dashboard/')
//       .then(response => {
//         const data = response.data || {};
//         setPolicyData({
//           acknowledged: data.acknowledged || [],
//           partially_acknowledged: data.partially_acknowledged || [],
//           not_acknowledged: data.not_acknowledged || []
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching acknowledgements:", error);
//         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleRowClick = (record) => {
//     if (!record || !record.employee_code) return;
//     // Consider adding a loading state for details fetch here if needed
//     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
//       .then(response => { setSelectedEmployeeDetails(response.data.data || []); })
//       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails([]); });
//   };

//   const handleStatusChange = (event, newValue) => {
//     if (newValue !== null) {
//       setStatusFilter(newValue);
//       setPage(0); // Reset to first page on filter change
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(0); // Reset to first page on search change
//   };

//   // Pagination Handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredRecords = useMemo(() => {
//     let sourceData = [];
//     switch (statusFilter) {
//       case 'Acknowledged':
//         sourceData = policyData.acknowledged;
//         break;
//       case 'Partially Acknowledged':
//         sourceData = policyData.partially_acknowledged;
//         break;
//       case 'Not Acknowledged':
//         sourceData = policyData.not_acknowledged;
//         break;
//       default:
//         sourceData = [];
//     }
//     // Deduplicate based on employee_code just in case
//     const uniqueRecords = Array.from(
//       new Map(sourceData.map(item => [item.employee_code, item])).values()
//     );
//     const searchedRecords = search
//       ? uniqueRecords.filter(item =>
//         item.employee_name.toLowerCase().includes(search.toLowerCase()) ||
//         item.employee_code.toLowerCase().includes(search.toLowerCase()) // Added search by code too
//       )
//       : uniqueRecords;
//     return searchedRecords.sort((a, b) => {
//       if (!a.last_acknowledge_date) return 1;
//       if (!b.last_acknowledge_date) return -1;
//       return new Date(b.last_acknowledge_date) - new Date(a.last_acknowledge_date);
//     });

//   }, [search, statusFilter, policyData]);

//   const handleBackToList = () => {
//     setSelectedEmployeeDetails(null);
//   };

//   return (
//     <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
//       <CssBaseline />
//       {selectedEmployeeDetails ? (
//         <AcknowledgementDetailView
//           details={selectedEmployeeDetails}
//           onBack={handleBackToList}
//         />
//       ) : (
//         <AcknowledgementTableView
//           records={filteredRecords}
//           onRowClick={handleRowClick}
//           search={search}
//           onSearchChange={handleSearchChange}
//           loading={loading}
//           statusFilter={statusFilter}
//           onStatusChange={handleStatusChange}
//           // Pass pagination props
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )}
//     </Box>
//   );
// }








// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Grid, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow,
//   TextField, Button, Container, CssBaseline, Card,
//   CardContent, Chip, Avatar, ToggleButton,
//   ToggleButtonGroup, CircularProgress, TablePagination
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   HighlightOff as HighlightOffIcon,
//   Search as SearchIcon,
//   Pending as PendingIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';

// // --- THEME COLORS ---
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';

// // --- HELPER FUNCTION (No changes) ---
// const formatDateTime = (datetimeString) => {
//   if (!datetimeString) return 'N/A';
//   try {
//     const date = new Date(datetimeString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     return `${year}-${month}-${day} `;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // --- DETAIL VIEW COMPONENT (STYLED WITH NEW COLORS) ---
// const AcknowledgementDetailView = ({ details, onBack }) => {
//   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
//   const employeeName = details.length > 0 ? details[0].employee_name.trim() : 'N/A';
//   const employeeCode = details.length > 0 ? details[0].employee_code : 'N/A';
  
//   // Pagination state for detail view (Optional for standardization, added for consistency)
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const filteredDetails = useMemo(() => {
//     if (detailStatusFilter === 'All') return details;
//     return details.filter(d => (d.status === 'Acknowledged' ? 'Acknowledged' : 'Pending') === detailStatusFilter);
//   }, [details, detailStatusFilter]);

//   // Reset page on filter change
//   useEffect(() => {
//     setPage(0);
//   }, [detailStatusFilter]);

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) setDetailStatusFilter(newFilter);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Slice data for pagination
//   const paginatedDetails = filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Container maxWidth={false} sx={{ mt: 4 }}>
//       <Card variant="outlined" sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//             {/* Left Section (Title + Avatar) */}
//             <Grid item>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <Avatar sx={{ bgcolor: THEME_PURPLE, width: 56, height: 56 }}>
//                   <AssignmentTurnedInIcon />
//                 </Avatar>
//                 <div>
//                   <Typography variant="h5" sx={{ fontWeight: 600 }}>Policy Details</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {`For ${employeeName} (${employeeCode})`}
//                   </Typography>
//                 </div>
//               </Box>
//             </Grid>

//             {/* Right Section (Filter + Back Button) */}
//             <Grid item>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                 <ToggleButtonGroup
//                   value={detailStatusFilter}
//                   exclusive
//                   onChange={handleFilterChange}
//                   size="small"
//                   sx={{
//                     '& .Mui-selected': {
//                       backgroundColor: THEME_PURPLE,
//                       color: 'white',
//                       '&:hover': { backgroundColor: '#6f1d63' } // Slightly darker purple
//                     }
//                   }}
//                 >
//                   <ToggleButton value="All">All</ToggleButton>
//                   <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                   <ToggleButton value="Pending">Pending</ToggleButton>
//                 </ToggleButtonGroup>

//                 <Button
//                   variant="contained"
//                   startIcon={<ArrowBackIcon />}
//                   onClick={onBack}
//                   sx={{
//                     backgroundColor: THEME_PURPLE,
//                     '&:hover': { backgroundColor: '#6f1d63' }
//                   }}
//                 >
//                   Back to List
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Table Section */}
//           <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: THEME_PURPLE }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Policy Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acknowledgement Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedDetails.length > 0 ? (
//                   paginatedDetails.map((record, index) => (
//                     <TableRow key={index} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{record.policy_name}</TableCell>
//                       <TableCell>
//                         {record.status === 'Acknowledged' ? (
//                           <Chip
//                             label="Acknowledged"
//                             size="small"
//                             icon={<CheckCircleIcon />}
//                             sx={{ bgcolor: THEME_PURPLE, color: 'white' }}
//                           />
//                         ) : (
//                           <Chip
//                             label="Pending"
//                             size="small"
//                             icon={<PendingIcon />}
//                             sx={{ bgcolor: THEME_ORANGE, color: 'white', '& .MuiChip-icon': { color: 'white' } }}
//                           />
//                         )}
//                       </TableCell>
//                       <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
//                       <Typography color="text.secondary">
//                         No policies match the selected filter.
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* Pagination for Detail View */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
//                 Total Rows: {filteredDetails.length}
//              </Typography>
//              <TablePagination
//                 component="div"
//                 count={filteredDetails.length}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[5, 10, 25]}
//               />
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// // --- TABLE VIEW COMPONENT (STANDARDIZED UI) ---
// const AcknowledgementTableView = ({ 
//   records, 
//   onRowClick, 
//   search, 
//   onSearchChange, 
//   loading, 
//   statusFilter, 
//   onStatusChange,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   totalCount
// }) => {

//   // Slice records for current page
//   const paginatedRecords = records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//   <Container maxWidth="lg" sx={{ mt: 2 }}>
//     <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      
//       {/* Top Toolbar: Title/Filter Left, Search Right */}
//       <Box p={2} borderBottom="1px solid #e0e0e0">
//         <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          
//           {/* Left: Title and Toggle Buttons */}
//           <Grid item xs={12} md={8}>
//             <Typography variant="h5" component="h1" sx={{ fontWeight: '600', mb: 1, color: THEME_PURPLE }}>
//               Policy Acknowledged Status
//             </Typography>
//             <ToggleButtonGroup
//               value={statusFilter}
//               exclusive
//               onChange={onStatusChange}
//               aria-label="status filter"
//               size="small"
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 "& .MuiToggleButton-root": {
//                   // flex: { xs: "1 1 100%", sm: "1 1 auto" }, // Optional: keep if you want full width on mobile
//                   fontSize: { xs: "0.75rem", sm: "0.875rem" },
//                   px: 2,
//                 },
//                 "& .Mui-selected": {
//                   backgroundColor: THEME_PURPLE,
//                   color: "white",
//                   "&:hover": { backgroundColor: '#6f1d63' },
//                 },
//               }}
//             >
//               <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//               <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
//               <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
//             </ToggleButtonGroup>
//           </Grid>

//           {/* Right: Search Bar */}
//           <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
//             <TextField
//               label="Search by Employee Name" 
//               variant="outlined" 
//               size="small" 
//               fullWidth={true} // Adjust if you don't want full width on large screens
//               sx={{ maxWidth: { md: '300px' } }}
//               value={search} 
//               onChange={onSearchChange}
//               sx={{ 
//                 '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: THEME_PURPLE } }, 
//                 '& label.Mui-focused': { color: THEME_PURPLE } 
//               }}
//               InputProps={{ startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} /> }}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       <TableContainer sx={{ maxHeight: '65vh' }}> {/* Set a max height if desired */}
//         <Table stickyHeader>
//           <TableHead>
//             {/* Applied THEME_PURPLE to header background and white text */}
//             <TableRow sx={{ '& th': { backgroundColor: THEME_PURPLE, color: 'white', fontWeight: 'bold' } }}>
//               <TableCell>SR</TableCell>
//               <TableCell>EMPLOYEE NAME</TableCell>
//               <TableCell>EMPLOYEE CODE</TableCell>
//               <TableCell align="center">TOTAL POLICIES</TableCell>
//               <TableCell align="center">ACKNOWLEDGED</TableCell>
//               <TableCell>STATUS</TableCell>
//               <TableCell>LAST ACKNOWLEDGEMENT</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5 }}><CircularProgress sx={{ color: THEME_PURPLE }} /><Typography sx={{ mt: 1 }}>Loading Data...</Typography></TableCell></TableRow>
//             ) : paginatedRecords.length > 0 ? (
//               paginatedRecords.map((row, index) => (
//                 <TableRow key={row.employee_code} hover onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
//                   {/* Calculate Correct SR based on page */}
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
//                   <TableCell>{row.employee_code}</TableCell>
//                   <TableCell align="center">{row.total_policies}</TableCell>
//                   <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell> 
//                   <TableCell>
//                     {row.status === 'Acknowledged' ? (
//                       <Chip label="Acknowledged" size="small" icon={<CheckCircleIcon />} sx={{ bgcolor: THEME_PURPLE, color: 'white' }} />
//                     ) : row.status === 'Partially Acknowledged' ? (
//                       // Use THEME_ORANGE for Partially
//                       <Chip label="Partially" size="small" icon={<PendingIcon />} sx={{ bgcolor: THEME_ORANGE, color: 'white', '& .MuiChip-icon': { color: 'white' } }} />
//                     ) : (
//                       // Keep error (red) for Not Acknowledged, or use Orange if preferred
//                       <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />
//                     )}
//                   </TableCell>
//                   <TableCell>{formatDateTime(row.last_acknowledge_date)}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5 }}><Typography color="text.secondary">No results found for the selected criteria.</Typography></TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Footer: Total Left, Pagination Right */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0', bgcolor: '#f9fafb' }}>
//         <Box sx={{ pl: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
//                 Total Rows: {totalCount}
//             </Typography>
//         </Box>
//         <TablePagination
//             component="div"
//             count={totalCount}
//             page={page}
//             onPageChange={onPageChange}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={onRowsPerPageChange}
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             sx={{
//                 '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                     fontSize: '0.875rem',
//                 }
//             }}
//         />
//       </Box>
//     </Card>
//   </Container>
// )};

// // --- MAIN EXPORTED COMPONENT ---
// export default function PolicyAcknowledgementViewer() {
//   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');

//   // Pagination States (Default 10 entries)
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get('/policy-dashboard/')
//       .then(response => {
//         const data = response.data || {};
//         setPolicyData({
//           acknowledged: data.acknowledged || [],
//           partially_acknowledged: data.partially_acknowledged || [],
//           not_acknowledged: data.not_acknowledged || []
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching acknowledgements:", error);
//         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleRowClick = (record) => {
//     if (!record || !record.employee_code) return;
//     // Optional: Reset detail view pagination when opening a new detail
//     // setDetailPage(0); 
//     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
//       .then(response => { setSelectedEmployeeDetails(response.data.data || []); })
//       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails([]); });
//   };

//   const handleStatusChange = (event, newValue) => {
//     if (newValue !== null) {
//       setStatusFilter(newValue);
//       setPage(0); // Reset to first page on filter change
//     }
//   };

//   const handleSearchChange = (e) => {
//       setSearch(e.target.value);
//       setPage(0); // Reset to first page on search
//   };

//   // Pagination Handlers
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredRecords = useMemo(() => {
//     let sourceData = [];
//     switch (statusFilter) {
//       case 'Acknowledged':
//         sourceData = policyData.acknowledged;
//         break;
//       case 'Partially Acknowledged':
//         sourceData = policyData.partially_acknowledged;
//         break;
//       case 'Not Acknowledged':
//         sourceData = policyData.not_acknowledged;
//         break;
//       default:
//         sourceData = [];
//     }
//     const uniqueRecords = Array.from(
//       new Map(sourceData.map(item => [item.employee_code, item])).values()
//     );
//     const searchedRecords = search
//       ? uniqueRecords.filter(item =>
//         item.employee_name.toLowerCase().includes(search.toLowerCase())
//       )
//       : uniqueRecords;
    
//     return searchedRecords.sort((a, b) => {
//       if (!a.last_acknowledge_date) return 1;
//       if (!b.last_acknowledge_date) return -1;
//       return new Date(b.last_acknowledge_date) - new Date(a.last_acknowledge_date);
//     });

//   }, [search, statusFilter, policyData]);

//   const handleBackToList = () => {
//     setSelectedEmployeeDetails(null);
//   };

//   return (
//     <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
//       <CssBaseline />
//       {selectedEmployeeDetails ? (
//         <AcknowledgementDetailView
//           details={selectedEmployeeDetails}
//           onBack={handleBackToList}
//         />
//       ) : (
//         <AcknowledgementTableView
//           records={filteredRecords} // Pass all filtered records
//           totalCount={filteredRecords.length} // Pass total count for pagination
//           onRowClick={handleRowClick}
//           search={search}
//           onSearchChange={handleSearchChange}
//           loading={loading}
//           statusFilter={statusFilter}
//           onStatusChange={handleStatusChange}
//           // Pass Pagination Props
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )}
//     </Box>
//   );
// }










// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Grid, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow,
//   TextField, Button, Container, CssBaseline, Card,
//   CardContent, Chip, Avatar, ToggleButton,
//   ToggleButtonGroup, Skeleton, TablePagination
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   HighlightOff as HighlightOffIcon,
//   Search as SearchIcon,
//   Pending as PendingIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';

// const formatDateTime = (datetimeString) => {
//   if (!datetimeString) return 'N/A';
//   try {
//     const date = new Date(datetimeString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// const AcknowledgementDetailView = ({ details, onBack }) => {
//   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
//   const employeeName = details.length > 0 ? details[0].employee_name.trim() : 'N/A';
//   const employeeCode = details.length > 0 ? details[0].employee_code : 'N/A';

//   const filteredDetails = useMemo(() => {
//     if (detailStatusFilter === 'All') return details;
//     return details.filter(d => (d.status === 'Acknowledged' ? 'Acknowledged' : 'Pending') === detailStatusFilter);
//   }, [details, detailStatusFilter]);

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) setDetailStatusFilter(newFilter);
//   };

//   return (
//    <Container maxWidth={false} sx={{ mt: 4 }}>
//     <Card variant="outlined" sx={{ borderRadius: 2 }}>
//       <CardContent>
//         <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{ bgcolor: '#8C257C', width: 56, height: 56 }}>
//                 <AssignmentTurnedInIcon />
//               </Avatar>
//               <div>
//                 <Typography variant="h5" sx={{ fontWeight: 600 }}>Policy Details</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {`For ${employeeName} (${employeeCode})`}
//                 </Typography>
//               </div>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <ToggleButtonGroup
//                 value={detailStatusFilter}
//                 exclusive
//                 onChange={handleFilterChange}
//                 size="small"
//                 sx={{
//                   '& .MuiToggleButton-root.Mui-selected': {
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     '&:hover': { backgroundColor: '#F58E35' }
//                   }
//                 }}
//               >
//                 <ToggleButton value="All">All</ToggleButton>
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Pending">Pending</ToggleButton>
//               </ToggleButtonGroup>
//               <Button
//                 variant="contained"
//                 startIcon={<ArrowBackIcon />}
//                 onClick={onBack}
//                 sx={{
//                   backgroundColor: '#8C257C',
//                   '&:hover': { backgroundColor: '#F58E35' }
//                 }}
//               >
//                 Back to List
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead sx={{ bgcolor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Policy Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acknowledgement Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredDetails.length > 0 ? (
//                 filteredDetails.map((record, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{record.policy_name}</TableCell>
//                     <TableCell>
//                       {record.status === 'Acknowledged' ? (
//                         <Chip
//                           label="Acknowledged"
//                           size="small"
//                           icon={<CheckCircleIcon />}
//                           sx={{ bgcolor: '#8C257C', color: 'white' }}
//                         />
//                       ) : (
//                         <Chip
//                           label="Pending"
//                           color="warning"
//                           size="small"
//                           icon={<PendingIcon />}
//                         />
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">
//                       No policies match the selected filter.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   </Container>
//   );
// };

// const AcknowledgementTableView = ({
//   records, paginatedRecords, onRowClick, search, onSearchChange, loading,
//   statusFilter, onStatusChange, page, rowsPerPage, onPageChange, onRowsPerPageChange
// }) => {
//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//         <Box p={2} borderBottom="1px solid #e0e0e0">
//           <Grid container spacing={2} justifyContent="space-between" alignItems="center">
//             <Grid item xs={12} sm={8} md={8}>
//               <Typography variant="h5" component="h1" sx={{ fontWeight: '600', color: '#8C257C' }}>
//                 Policy Acknowledged Status
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={4} md={4}>
//               <TextField
//                 label="Search by Employee Name"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 value={search}
//                 onChange={onSearchChange}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused fieldset': { borderColor: '#8C257C' }
//                   },
//                   '& label.Mui-focused': { color: '#8C257C' }
//                 }}
//                 InputProps={{
//                   startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                 }}
//               />
//             </Grid>
//           </Grid>
//           <Grid container sx={{ mt: 2 }}>
//             <Grid item xs={12}>
//               <ToggleButtonGroup
//                 value={statusFilter}
//                 exclusive
//                 onChange={onStatusChange}
//                 aria-label="status filter"
//                 size="small"
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   "& .MuiToggleButton-root": {
//                     flex: { xs: "1 1 100%", sm: "1 1 auto" },
//                     fontSize: { xs: "0.7rem", sm: "0.85rem" },
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 0.5, sm: 1 },
//                   },
//                   "& .MuiToggleButton-root.Mui-selected": {
//                     backgroundColor: "#8C257C",
//                     color: "white",
//                     "&:hover": { backgroundColor: "#F58E35" },
//                   },
//                 }}
//               >
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
//                 <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
//               </ToggleButtonGroup>
//             </Grid>
//           </Grid>
//         </Box>
//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>SR</TableCell>
//                 <TableCell>EMPLOYEE NAME</TableCell>
//                 <TableCell>EMPLOYEE CODE</TableCell>
//                 <TableCell align="center">TOTAL POLICIES</TableCell>
//                 <TableCell align="center">ACKNOWLEDGED</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>LAST ACKNOWLEDGEMENT</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell colSpan={7}><Skeleton animation="wave" variant="text" /></TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedRecords.length > 0 ? (
//                 paginatedRecords.map((row, index) => (
//                   <TableRow key={row.employee_code} hover onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
//                     <TableCell>{row.employee_code}</TableCell>
//                     <TableCell align="center">{row.total_policies}</TableCell>
//                     <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
//                     <TableCell>
//                       {row.status === 'Acknowledged' ? (
//                         <Chip label="Acknowledged" size="small" icon={<CheckCircleIcon />} sx={{ bgcolor: '#8C257C', color: 'white' }} />
//                       ) : row.status === 'Partially Acknowledged' ? (
//                         <Chip label="Partially" color="warning" size="small" icon={<PendingIcon />} sx={{ backgroundColor: '#F58E35', color: 'white' }} />
//                       ) : (
//                         <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDateTime(row.last_acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">No results found for the selected criteria.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box display="flex" justifyContent="space-between" alignItems="center" p={2} flexWrap="wrap" gap={2}>
//           <Typography variant="body2" sx={{ color: '#8C257C' }}>
//             Total Rows: {records.length}
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 50]}
//             component="div"
//             count={records.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={onPageChange}
//             onRowsPerPageChange={onRowsPerPageChange}
//             sx={{
//               '& .Mui-selected': {
//                 backgroundColor: 'rgba(140, 37, 124, 0.08) !important'
//               },
//               '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                 color: '#8C257C'
//               },
//               '& .MuiSvgIcon-root': {
//                 color: '#8C257C'
//               }
//             }}
//           />
//         </Box>
//       </Card>
//     </Container>
//   );
// };

// export default function PolicyAcknowledgementViewer() {
//   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get('/policy-dashboard/')
//       .then(response => {
//         const data = response.data || {};
//         setPolicyData({
//           acknowledged: data.acknowledged || [],
//           partially_acknowledged: data.partially_acknowledged || [],
//           not_acknowledged: data.not_acknowledged || []
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching acknowledgements:", error);
//         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleRowClick = (record) => {
//     if (!record || !record.employee_code) return;
//     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
//       .then(response => { setSelectedEmployeeDetails(response.data.data || []); })
//       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails([]); });
//   };

//   const handleStatusChange = (event, newValue) => {
//     if (newValue !== null) {
//       setStatusFilter(newValue);
//       setPage(0);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredRecords = useMemo(() => {
//     let sourceData = [];
//     switch (statusFilter) {
//       case 'Acknowledged':
//         sourceData = policyData.acknowledged;
//         break;
//       case 'Partially Acknowledged':
//         sourceData = policyData.partially_acknowledged;
//         break;
//       case 'Not Acknowledged':
//         sourceData = policyData.not_acknowledged;
//         break;
//       default:
//         sourceData = [];
//     }
//     const uniqueRecords = Array.from(
//       new Map(sourceData.map(item => [item.employee_code, item])).values()
//     );
//     const searchedRecords = search
//       ? uniqueRecords.filter(item =>
//         item.employee_name.toLowerCase().includes(search.toLowerCase())
//       )
//       : uniqueRecords;
//     return searchedRecords.sort((a, b) => {
//       if (!a.last_acknowledge_date) return 1;
//       if (!b.last_acknowledge_date) return -1;
//       return new Date(b.last_acknowledge_date) - new Date(a.last_acknowledge_date);
//     });
//   }, [search, statusFilter, policyData]);

//   const paginatedRecords = useMemo(() => {
//     const startIndex = page * rowsPerPage;
//     return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
//   }, [filteredRecords, page, rowsPerPage]);

//   const handleBackToList = () => {
//     setSelectedEmployeeDetails(null);
//   };

//   return (
//     <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
//       <CssBaseline />
//       {selectedEmployeeDetails ? (
//         <AcknowledgementDetailView
//           details={selectedEmployeeDetails}
//           onBack={handleBackToList}
//         />
//       ) : (
//         <AcknowledgementTableView
//           records={filteredRecords}
//           paginatedRecords={paginatedRecords}
//           onRowClick={handleRowClick}
//           search={search}
//           onSearchChange={handleSearchChange}
//           loading={loading}
//           statusFilter={statusFilter}
//           onStatusChange={handleStatusChange}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )}
//     </Box>
//   );
// }













// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Grid, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow,
//   TextField, Button, Container, CssBaseline, Card,
//   CardContent, Chip, Avatar, ToggleButton,
//   ToggleButtonGroup, Skeleton, TablePagination
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   HighlightOff as HighlightOffIcon,
//   Search as SearchIcon,
//   Pending as PendingIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';

// const formatDateTime = (datetimeString) => {
//   if (!datetimeString) return 'N/A';
//   try {
//     const date = new Date(datetimeString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };


// const AcknowledgementDetailView = ({ details, onBack }) => {
//   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
//   const employeeName = details.length > 0 ? details[0].employee_name.trim() : 'N/A';
//   const employeeCode = details.length > 0 ? details[0].employee_code : 'N/A';

//   const filteredDetails = useMemo(() => {
//     if (detailStatusFilter === 'All') return details;
//     return details.filter(d => (d.status === 'Acknowledged' ? 'Acknowledged' : 'Pending') === detailStatusFilter);
//   }, [details, detailStatusFilter]);

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) setDetailStatusFilter(newFilter);
//   };

//   return (
//    <Container maxWidth={false} sx={{ mt: 4 }}>
//     <Card variant="outlined" sx={{ borderRadius: 2 }}>
//       <CardContent>
//         <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{ bgcolor: '#8C257C', width: 56, height: 56 }}>
//                 <AssignmentTurnedInIcon />
//               </Avatar>
//               <div>
//                 <Typography variant="h5" sx={{ fontWeight: 600 }}>Policy Details</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {`For ${employeeName} (${employeeCode})`}
//                 </Typography>
//               </div>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <ToggleButtonGroup
//                 value={detailStatusFilter}
//                 exclusive
//                 onChange={handleFilterChange}
//                 size="small"
//                 sx={{
//                   '& .MuiToggleButton-root.Mui-selected': {
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     '&:hover': { backgroundColor: '#F58E35' }
//                   }
//                 }}
//               >
//                 <ToggleButton value="All">All</ToggleButton>
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Pending">Pending</ToggleButton>
//               </ToggleButtonGroup>
//               <Button
//                 variant="contained"
//                 startIcon={<ArrowBackIcon />}
//                 onClick={onBack}
//                 sx={{
//                   backgroundColor: '#8C257C',
//                   '&:hover': { backgroundColor: '#F58E35' }
//                 }}
//               >
//                 Back to List
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead sx={{ bgcolor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Policy Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acknowledgement Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredDetails.length > 0 ? (
//                 filteredDetails.map((record, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{record.policy_name}</TableCell>
//                     <TableCell>
//                       {record.status === 'Acknowledged' ? (
//                         <Chip
//                           label="Acknowledged"
//                           size="small"
//                           icon={<CheckCircleIcon />}
//                           sx={{ bgcolor: '#8C257C', color: 'white' }}
//                         />
//                       ) : (
//                         <Chip
//                           label="Pending"
//                           color="warning"
//                           size="small"
//                           icon={<PendingIcon />}
//                         />
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">
//                       No policies match the selected filter.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   </Container>
//   );
// };

// const AcknowledgementTableView = ({
//   records, paginatedRecords, onRowClick, search, onSearchChange, loading,
//   statusFilter, onStatusChange, page, rowsPerPage, onPageChange, onRowsPerPageChange
// }) => {
//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//         <Box p={2} borderBottom="1px solid ">
//           <Grid container spacing={2} justifyContent="space-between" alignItems="center">
//             <Grid item xs={12}>
//               <Typography variant="h4" component="h1" sx={{ fontWeight: '600', color: '#8C257C', mb:3 }}>
//                 Policy Dashboard
//               </Typography>
//             </Grid>
//           </Grid>
//           <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={8}>
//                <ToggleButtonGroup
//                 value={statusFilter}
//                 exclusive
//                 onChange={onStatusChange}
//                 aria-label="status filter"
//                 size="small"
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
               
//                   "& .MuiToggleButton-root": {
//                     flex: { xs: "1 1 100%", sm: "1 1 auto" },
//                     fontSize: { xs: "0.7rem", sm: "0.85rem" },
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 0.5, sm: 1 },
//                   },
//                   "& .MuiToggleButton-root.Mui-selected": {
//                     backgroundColor: "#8C257C",
//                     color: "white",
//                     "&:hover": { backgroundColor: "#F58E35" },
//                   },
//                 }}
//               >
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
//                 <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
//               </ToggleButtonGroup>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Search by Employee Name"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 value={search}
//                 onChange={onSearchChange}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused fieldset': { borderColor: '#8C257C' }
//                   },
//                   '& label.Mui-focused': { color: '#8C257C' }
//                 }}
//                 InputProps={{
//                   startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>SR</TableCell>
//                 <TableCell>EMPLOYEE NAME</TableCell>
//                 <TableCell>EMPLOYEE CODE</TableCell>
//                 <TableCell align="center">TOTAL POLICIES</TableCell>
//                 <TableCell align="center">ACKNOWLEDGED</TableCell>
//                 <TableCell>LAST ACKNOWLEDGEMENT</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell colSpan={6}><Skeleton animation="wave" variant="text" /></TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedRecords.length > 0 ? (
//                 paginatedRecords.map((row, index) => (
//                   <TableRow key={row.employee_code} hover onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
//                     <TableCell>{row.employee_code}</TableCell>
//                     <TableCell align="center">{row.total_policies}</TableCell>
//                     <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
//                     <TableCell>{formatDateTime(row.last_acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">No results found for the selected criteria.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box display="flex" justifyContent="space-between" alignItems="center" p={2} flexWrap="wrap" gap={2}>
//           <Typography variant="body2" sx={{ color: '#8C257C' }}>
//             Total Rows: {records.length}
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 50]}
//             component="div"
//             count={records.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={onPageChange}
//             onRowsPerPageChange={onRowsPerPageChange}
//             sx={{
//               '& .Mui-selected': {
//                 backgroundColor: 'rgba(140, 37, 124, 0.08) !important'
//               },
//               '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                 color: '#8C257C'
//               },
//               '& .MuiSvgIcon-root': {
//                 color: '#8C257C'
//               }
//             }}
//           />
//         </Box>
//       </Card>
//     </Container>
//   );
// };

// export default function PolicyAcknowledgementViewer() {
//   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get('/policy-dashboard/')
//       .then(response => {
//         const data = response.data || {};
//         setPolicyData({
//           acknowledged: data.acknowledged || [],
//           partially_acknowledged: data.partially_acknowledged || [],
//           not_acknowledged: data.not_acknowledged || []
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching acknowledgements:", error);
//         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleRowClick = (record) => {
//     if (!record || !record.employee_code) return;
//     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
//       .then(response => { setSelectedEmployeeDetails(response.data.data || []); })
//       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails([]); });
//   };

//   const handleStatusChange = (event, newValue) => {
//     if (newValue !== null) {
//       setStatusFilter(newValue);
//       setPage(0);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredRecords = useMemo(() => {
//     let sourceData = [];
//     switch (statusFilter) {
//       case 'Acknowledged':
//         sourceData = policyData.acknowledged;
//         break;
//       case 'Partially Acknowledged':
//         sourceData = policyData.partially_acknowledged;
//         break;
//       case 'Not Acknowledged':
//         sourceData = policyData.not_acknowledged;
//         break;
//       default:
//         sourceData = [];
//     }
//     const uniqueRecords = Array.from(
//       new Map(sourceData.map(item => [item.employee_code, item])).values()
//     );
//     const searchedRecords = search
//       ? uniqueRecords.filter(item =>
//         item.employee_name.toLowerCase().includes(search.toLowerCase())
//       )
//       : uniqueRecords;
//     return searchedRecords.sort((a, b) => {
//       if (!a.last_acknowledge_date) return 1;
//       if (!b.last_acknowledge_date) return -1;
//       return new Date(b.last_acknowledge_date) - new Date(a.last_acknowledge_date);
//     });
//   }, [search, statusFilter, policyData]);

//   const paginatedRecords = useMemo(() => {
//     const startIndex = page * rowsPerPage;
//     return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
//   }, [filteredRecords, page, rowsPerPage]);

//   const handleBackToList = () => {
//     setSelectedEmployeeDetails(null);
//   };

//   return (
//     <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
//       <CssBaseline />
//       {selectedEmployeeDetails ? (
//         <AcknowledgementDetailView
//           details={selectedEmployeeDetails}
//           onBack={handleBackToList}
//         />
//       ) : (
//         <AcknowledgementTableView
//           records={filteredRecords}
//           paginatedRecords={paginatedRecords}
//           onRowClick={handleRowClick}
//           search={search}
//           onSearchChange={handleSearchChange}
//           loading={loading}
//           statusFilter={statusFilter}
//           onStatusChange={handleStatusChange}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )}
//     </Box>
//   );
// }





	
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Grid, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow,
//   TextField, Button, Container, CssBaseline, Card,
//   CardContent, Chip, Avatar, ToggleButton,
//   ToggleButtonGroup, Skeleton, Pagination // Added Pagination
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   HighlightOff as HighlightOffIcon,
//   Search as SearchIcon,
//   Pending as PendingIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';

// const formatDateTime = (datetimeString) => {
//   if (!datetimeString) return 'N/A';
//   try {
//     const date = new Date(datetimeString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// const AcknowledgementDetailView = ({ details, onBack }) => {
//   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
//   const employeeName = details.employee_name ? details.employee_name.trim() : 'N/A';
//   const employeeCode = details.employee_id || 'N/A';

//   const filteredDetails = useMemo(() => {
//     switch (detailStatusFilter) {
//       case 'Acknowledged':
//         return details.acknowledged_policies || [];
//       case 'Pending':
//         return details.pending_policies || [];
//       default:
//         return details.all_policies || [];
//     }
//   }, [details, detailStatusFilter]);

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) setDetailStatusFilter(newFilter);
//   };

//   return (
//    <Container maxWidth={false} sx={{ mt: 4 }}>
//     <Card variant="outlined" sx={{ borderRadius: 2 }}>
//       <CardContent>
//         <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{ bgcolor: '#8C257C', width: 56, height: 56 }}>
//                 <AssignmentTurnedInIcon />
//               </Avatar>
//               <div>
//                 <Typography variant="h5" sx={{ fontWeight: 600 }}>Policy Details</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {`For ${employeeName} (${employeeCode})`}
//                 </Typography>
//               </div>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <ToggleButtonGroup
//                 value={detailStatusFilter}
//                 exclusive
//                 onChange={handleFilterChange}
//                 size="small"
//                 sx={{
//                   '& .MuiToggleButton-root.Mui-selected': {
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     '&:hover': { backgroundColor: '#F58E35' }
//                   }
//                 }}
//               >
//                 <ToggleButton value="All">All</ToggleButton>
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Pending">Pending</ToggleButton>
//               </ToggleButtonGroup>
//               <Button
//                 variant="contained"
//                 startIcon={<ArrowBackIcon />}
//                 onClick={onBack}
//                 sx={{
//                   backgroundColor: '#8C257C',
//                   '&:hover': { backgroundColor: '#F58E35' }
//                 }}
//               >
//                 Back to List
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead sx={{ bgcolor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Policy Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acknowledgement Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredDetails.length > 0 ? (
//                 filteredDetails.map((record, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{record.policy_name}</TableCell>
//                     <TableCell>
//                       {detailStatusFilter === 'Acknowledged' || record.status === 'Acknowledged' ? (
//                         <Chip
//                           label="Acknowledged"
//                           size="small"
//                           icon={<CheckCircleIcon />}
//                           sx={{ bgcolor: '#8C257C', color: 'white' }}
//                         />
//                       ) : (
//                         <Chip
//                           label="Pending"
//                           color="warning"
//                           size="small"
//                           icon={<PendingIcon />}
//                         />
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">
//                       No policies match the selected filter.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   </Container>
//   );
// };

// const AcknowledgementTableView = ({
//   records, paginatedRecords, onRowClick, search, onSearchChange, loading,
//   statusFilter, onStatusChange, page, rowsPerPage, onPageChange
// }) => {
//   const renderStatusChip = (status) => {
//     switch (status) {
//       case 'Acknowledged':
//         return <Chip label="Acknowledged" color="success" size="small" icon={<CheckCircleIcon />} />;
//       case 'Partially Acknowledged':
//         return <Chip label="Partially" color="warning" size="small" icon={<PendingIcon />} />;
//       case 'Not Acknowledged':
//         return <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />;
//       default:
//         return null;
//     }
//   };

//   const totalPages = Math.ceil(records.length / rowsPerPage);
//   const startEntry = paginatedRecords.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, records.length);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//         <Box p={2} borderBottom="1px solid ">
//           <Grid container spacing={2} justifyContent="space-between" alignItems="center">
//             <Grid item xs={12}>
//               <Typography variant="h4" component="h1" sx={{ fontWeight: '600', color: '#8C257C', mb:3 }}>
//                 Policy Dashboard
//               </Typography>
//             </Grid>
//           </Grid>
//           <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={8}>
//                <ToggleButtonGroup
//                 value={statusFilter}
//                 exclusive
//                 onChange={onStatusChange}
//                 aria-label="status filter"
//                 size="small"
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
               
//                   "& .MuiToggleButton-root": {
//                     flex: { xs: "1 1 100%", sm: "1 1 auto" },
//                     fontSize: { xs: "0.7rem", sm: "0.85rem" },
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 0.5, sm: 1 },
//                   },
//                   "& .MuiToggleButton-root.Mui-selected": {
//                     backgroundColor: "#8C257C",
//                     color: "white",
//                     "&:hover": { backgroundColor: "#F58E35" },
//                   },
//                 }}
//               >
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
//                 <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
//               </ToggleButtonGroup>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Search by Employee Name"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 value={search}
//                 onChange={onSearchChange}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused fieldset': { borderColor: '#8C257C' }
//                   },
//                   '& label.Mui-focused': { color: '#8C257C' }
//                 }}
//                 InputProps={{
//                   startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>SR</TableCell>
//                 <TableCell>EMPLOYEE NAME</TableCell>
//                 <TableCell>EMPLOYEE CODE</TableCell>
//                 <TableCell align="center">TOTAL POLICIES</TableCell>
//                 <TableCell align="center">ACKNOWLEDGED</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>LAST ACKNOWLEDGEMENT</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell colSpan={7}><Skeleton animation="wave" variant="text" /></TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedRecords.length > 0 ? (
//                 paginatedRecords.map((row, index) => (
//                   <TableRow key={row.employee_code} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
//                     <TableCell>{row.employee_code}</TableCell>
//                     <TableCell align="center">{row.total_policies}</TableCell>
//                     <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
//                     <TableCell onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
//                       {renderStatusChip(statusFilter)}
//                     </TableCell>
//                     <TableCell>{formatDateTime(row.last_acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">No results found for the selected criteria.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box p={2}>
//            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
//               <Typography variant="body2" color="text.secondary">
//                 Showing {startEntry} to {endEntry} of {records.length} entries
//               </Typography>
//               {totalPages > 1 && (
//                 <Pagination
//                   count={totalPages}
//                   page={page + 1}
//                   onChange={onPageChange}
//                   sx={{ '& .Mui-selected': { backgroundColor: '#8C257C', color: 'white' } }}
//                   size="small"
//                   showFirstButton
//                   showLastButton
//                 />
//               )}
//             </Box>
//         </Box>
//       </Card>
//     </Container>
//   );
// };

// export default function PolicyAcknowledgementViewer() {
//   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get('/policy-dashboard/')
//       .then(response => {
//         const data = response.data || {};
//         setPolicyData({
//           acknowledged: data.acknowledged || [],
//           partially_acknowledged: data.partially_acknowledged || [],
//           not_acknowledged: data.not_acknowledged || []
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching acknowledgements:", error);
//         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleRowClick = (record) => {
//     if (!record || !record.employee_code) return;
//     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
//       .then(response => { setSelectedEmployeeDetails(response.data || {}); })
//       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails({}); });
//   };

//   const handleStatusChange = (event, newValue) => {
//     if (newValue !== null) {
//       setStatusFilter(newValue);
//       setPage(0);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
//   };

//   const filteredRecords = useMemo(() => {
//     let sourceData = [];
//     switch (statusFilter) {
//       case 'Acknowledged':
//         sourceData = policyData.acknowledged;
//         break;
//       case 'Partially Acknowledged':
//         sourceData = policyData.partially_acknowledged;
//         break;
//       case 'Not Acknowledged':
//         sourceData = policyData.not_acknowledged;
//         break;
//       default:
//         sourceData = [];
//     }
//     const uniqueRecords = Array.from(
//       new Map(sourceData.map(item => [item.employee_code, item])).values()
//     );
//     const searchedRecords = search
//       ? uniqueRecords.filter(item =>
//         item.employee_name.toLowerCase().includes(search.toLowerCase())
//       )
//       : uniqueRecords;
//     return searchedRecords.sort((a, b) => {
//       if (!a.last_acknowledge_date) return 1;
//       if (!b.last_acknowledge_date) return -1;
//       return new Date(b.last_acknowledge_date) - new Date(a.last_acknowledge_date);
//     });
//   }, [search, statusFilter, policyData]);

//   const paginatedRecords = useMemo(() => {
//     const startIndex = page * rowsPerPage;
//     return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
//   }, [filteredRecords, page, rowsPerPage]);

//   const handleBackToList = () => {
//     setSelectedEmployeeDetails(null);
//   };

//   return (
//     <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
//       <CssBaseline />
//       {selectedEmployeeDetails ? (
//         <AcknowledgementDetailView
//           details={selectedEmployeeDetails}
//           onBack={handleBackToList}
//         />
//       ) : (
//         <AcknowledgementTableView
//           records={filteredRecords}
//           paginatedRecords={paginatedRecords}
//           onRowClick={handleRowClick}
//           search={search}
//           onSearchChange={handleSearchChange}
//           loading={loading}
//           statusFilter={statusFilter}
//           onStatusChange={handleStatusChange}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//         />
//       )}
//     </Box>
//   );
// }












// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Box, Typography, Paper, Grid, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow,
//   TextField, Button, Container, CssBaseline, Card,
//   CardContent, Chip, Avatar, ToggleButton,
//   ToggleButtonGroup, Skeleton, TablePagination
// } from '@mui/material';
// import {
//   ArrowBack as ArrowBackIcon,
//   CheckCircle as CheckCircleIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   HighlightOff as HighlightOffIcon,
//   Search as SearchIcon,
//   Pending as PendingIcon,
// } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';

// const formatDateTime = (datetimeString) => {
//   if (!datetimeString) return 'N/A';
//   try {
//     const date = new Date(datetimeString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// const AcknowledgementDetailView = ({ details, onBack }) => {
//   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const employeeName = details.employee_name ? details.employee_name.trim() : 'N/A';
//   const employeeCode = details.employee_id || 'N/A';

//   const filteredDetails = useMemo(() => {
//     switch (detailStatusFilter) {
//       case 'Acknowledged':
//         return details.acknowledged_policies || [];
//       case 'Pending':
//         return details.pending_policies || [];
//       default:
//         return details.all_policies || [];
//     }
//   }, [details, detailStatusFilter]);

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) {
//       setDetailStatusFilter(newFilter);
//       setPage(0);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const paginatedDetails = filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const startEntry = filteredDetails.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredDetails.length);

//   return (
//    <Container maxWidth={false} sx={{ mt: 4 }}>
//     <Card variant="outlined" sx={{ borderRadius: 2 }}>
//       <CardContent>
//         <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{ bgcolor: '#8C257C', width: 56, height: 56 }}>
//                 <AssignmentTurnedInIcon />
//               </Avatar>
//               <div>
//                 <Typography variant="h5" sx={{ fontWeight: 600 , color:'#8C257C'}}>Policy Details</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {`For ${employeeName} (${employeeCode})`}
//                 </Typography>
//               </div>
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <ToggleButtonGroup
//                 value={detailStatusFilter}
//                 exclusive
//                 onChange={handleFilterChange}
//                 size="small"
//                 sx={{
//                   '& .MuiToggleButton-root.Mui-selected': {
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     '&:hover': { backgroundColor: '#F58E35' }
//                   }
//                 }}
//               >
//                 <ToggleButton value="All">All</ToggleButton>
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Pending">Pending</ToggleButton>
//               </ToggleButtonGroup>
//               <Button
//                 variant="contained"
//                 startIcon={<ArrowBackIcon />}
//                 onClick={onBack}
//                 sx={{
//                   backgroundColor: '#8C257C',
//                   '&:hover': { backgroundColor: '#F58E35' }
//                 }}
//               >
//                 Back to List
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead sx={{ bgcolor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Policy Name</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acknowledgement Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedDetails.length > 0 ? (
//                 paginatedDetails.map((record, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{record.policy_name}</TableCell>
//                     <TableCell>
//                       {detailStatusFilter === 'Acknowledged' || (detailStatusFilter !== 'Pending' && record.status === 'Acknowledged') ? (
//                         <Chip
//                           label="Acknowledged"
//                           size="small"
//                           icon={<CheckCircleIcon />}
//                           sx={{ bgcolor: '#8C257C', color: 'white' }}
//                         />
//                       ) : (
//                         <Chip
//                           label="Pending"
//                           color="warning"
//                           size="small"
//                           icon={<PendingIcon />}
//                         />
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">
//                       No policies match the selected filter.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} p={2}>
//               <Typography variant="body2" color="text.secondary">
//                  Showing {startEntry} to {endEntry} of {filteredDetails.length} results
//               </Typography>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredDetails.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//           </Box>
//       </CardContent>
//     </Card>
//   </Container>
//   );
// };

// const AcknowledgementTableView = ({
//   records, paginatedRecords, onRowClick, search, onSearchChange, loading,
//   statusFilter, onStatusChange, page, rowsPerPage, onPageChange, onRowsPerPageChange
// }) => {
//   const renderStatusChip = (status) => {
//     switch (status) {
//       case 'Acknowledged':
//         return <Chip label="Acknowledged" color="success" size="small" icon={<CheckCircleIcon />} />;
//       case 'Partially Acknowledged':
//         return <Chip label="Partially" color="warning" size="small" icon={<PendingIcon />} />;
//       case 'Not Acknowledged':
//         return <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />;
//       default:
//         return null;
//     }
//   };

//   const startEntry = records.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, records.length);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//         <Box p={2} borderBottom="1px solid ">
//           <Grid container spacing={2} justifyContent="space-between" alignItems="center">
//             <Grid item xs={12}>
//               <Typography variant="h4" component="h1" sx={{ fontWeight: '600', color: '#8C257C', mb:3 }}>
//                 Policy Dashboard
//               </Typography>
//             </Grid>
//           </Grid>
//           <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={8}>
//                <ToggleButtonGroup
//                 value={statusFilter}
//                 exclusive
//                 onChange={onStatusChange}
//                 aria-label="status filter"
//                 size="small"
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   "& .MuiToggleButton-root": {
//                     flex: { xs: "1 1 100%", sm: "1 1 auto" },
//                     fontSize: { xs: "0.7rem", sm: "0.85rem" },
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 0.5, sm: 1 },
//                   },
//                   "& .MuiToggleButton-root.Mui-selected": {
//                     backgroundColor: "#8C257C",
//                     color: "white",
//                     "&:hover": { backgroundColor: "#F58E35" },
//                   },
//                 }}
//               >
//                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
//                 <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
//                 <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
//               </ToggleButtonGroup>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Search by Employee Name"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 value={search}
//                 onChange={onSearchChange}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused fieldset': { borderColor: '#8C257C' }
//                   },
//                   '& label.Mui-focused': { color: '#8C257C' }
//                 }}
//                 InputProps={{
//                   startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>SR. NO.</TableCell>
//                 <TableCell>EMPLOYEE NAME</TableCell>
//                 <TableCell>EMPLOYEE CODE</TableCell>
//                 <TableCell align="center">TOTAL POLICIES</TableCell>
//                 <TableCell align="center">ACKNOWLEDGED</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CREATED DATE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell colSpan={7}><Skeleton animation="wave" variant="text" /></TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedRecords.length > 0 ? (
//                 paginatedRecords.map((row, index) => (
//                   <TableRow key={row.employee_code} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
//                     <TableCell>{row.employee_code}</TableCell>
//                     <TableCell align="center">{row.total_policies}</TableCell>
//                     <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
//                     <TableCell onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
//                       {renderStatusChip(statusFilter)}
//                     </TableCell>
//                     <TableCell>{formatDateTime(row.created_at)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary">No results found for the selected criteria.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} p={2}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {startEntry} to {endEntry} of {records.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={records.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={onPageChange}
//                 onRowsPerPageChange={onRowsPerPageChange}
//             />
//         </Box>
//       </Card>
//     </Container>
//   );
// };

// export default function PolicyAcknowledgementViewer() {
//   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     setLoading(true);
//     axiosInstance.get('/policy-dashboard/')
//       .then(response => {
//         const data = response.data || {};
//         setPolicyData({
//           acknowledged: data.acknowledged || [],
//           partially_acknowledged: data.partially_acknowledged || [],
//           not_acknowledged: data.not_acknowledged || []
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching acknowledgements:", error);
//         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleRowClick = (record) => {
//     if (!record || !record.employee_code) return;
//     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
//       .then(response => { setSelectedEmployeeDetails(response.data || {}); })
//       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails({}); });
//   };

//   const handleStatusChange = (event, newValue) => {
//     if (newValue !== null) {
//       setStatusFilter(newValue);
//       setPage(0);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredRecords = useMemo(() => {
//     let sourceData = [];
//     switch (statusFilter) {
//       case 'Acknowledged':
//         sourceData = policyData.acknowledged;
//         break;
//       case 'Partially Acknowledged':
//         sourceData = policyData.partially_acknowledged;
//         break;
//       case 'Not Acknowledged':
//         sourceData = policyData.not_acknowledged;
//         break;
//       default:
//         sourceData = [];
//     }
//     const uniqueRecords = Array.from(
//       new Map(sourceData.map(item => [item.employee_code, item])).values()
//     );
//     const searchedRecords = search
//       ? uniqueRecords.filter(item =>
//         item.employee_name.toLowerCase().includes(search.toLowerCase())
//       )
//       : uniqueRecords;
//     return searchedRecords.sort((a, b) => {
//       const dateA = a.created_at ? new Date(a.created_at) : 0;
//       const dateB = b.created_at ? new Date(b.created_at) : 0;
//       return dateB - dateA;
//     });
//   }, [search, statusFilter, policyData]);

//   const paginatedRecords = useMemo(() => {
//     const startIndex = page * rowsPerPage;
//     return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
//   }, [filteredRecords, page, rowsPerPage]);

//   const handleBackToList = () => {
//     setSelectedEmployeeDetails(null);
//   };

//   return (
//     <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
//       <CssBaseline />
//       {selectedEmployeeDetails ? (
//         <AcknowledgementDetailView
//           details={selectedEmployeeDetails}
//           onBack={handleBackToList}
//         />
//       ) : (
//         <AcknowledgementTableView
//           records={filteredRecords}
//           paginatedRecords={paginatedRecords}
//           onRowClick={handleRowClick}
//           search={search}
//           onSearchChange={handleSearchChange}
//           loading={loading}
//           statusFilter={statusFilter}
//           onStatusChange={handleStatusChange}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       )}
//     </Box>
//   );
// }






  // import React, { useState, useEffect, useMemo } from 'react';
  // import {
  //   Box, Typography, Paper, Grid, Table, TableBody,
  //   TableCell, TableContainer, TableHead, TableRow,
  //   TextField, Button, Container, CssBaseline, Card,
  //   CardContent, Chip, Avatar, ToggleButton,
  //   ToggleButtonGroup, Skeleton, TablePagination
  // } from '@mui/material';
  // import {
  //   ArrowBack as ArrowBackIcon,
  //   CheckCircle as CheckCircleIcon,
  //   AssignmentTurnedIn as AssignmentTurnedInIcon,
  //   HighlightOff as HighlightOffIcon,
  //   Search as SearchIcon,
  //   Pending as PendingIcon,
  // } from '@mui/icons-material';
  // import axiosInstance from '../../utils/axiosInstance';

  // const formatDateTime = (datetimeString) => {
  //   if (!datetimeString) return 'N/A';
  //   try {
  //     const date = new Date(datetimeString);
  //     if (isNaN(date.getTime())) return 'N/A';
  //     const day = String(date.getDate()).padStart(2, '0');
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const year = date.getFullYear();
  //     return `${day}-${month}-${year}`;
  //   } catch (error) {
  //     return 'N/A';
  //   }
  // };

  // const AcknowledgementDetailView = ({ details, onBack }) => {
  //   const [detailStatusFilter, setDetailStatusFilter] = useState('All');
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const employeeName = details.employee_name ? details.employee_name.trim() : 'N/A';
  //   const employeeCode = details.employee_id || 'N/A';

  //   const filteredDetails = useMemo(() => {
  //     switch (detailStatusFilter) {
  //       case 'Acknowledged':
  //         return details.acknowledged_policies || [];
  //       case 'Pending':
  //         return details.pending_policies || [];
  //       default:
  //         return details.all_policies || [];
  //     }
  //   }, [details, detailStatusFilter]);

  //   const handleFilterChange = (event, newFilter) => {
  //     if (newFilter !== null) {
  //       setDetailStatusFilter(newFilter);
  //       setPage(0);
  //     }
  //   };

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  //   const paginatedDetails = filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  //   const startEntry = filteredDetails.length > 0 ? page * rowsPerPage + 1 : 0;
  //   const endEntry = Math.min((page + 1) * rowsPerPage, filteredDetails.length);

  //   return (
  //   <Container maxWidth={false} sx={{ mt: 4 }}>
  //     <Card variant="outlined" sx={{ borderRadius: 2 }}>
  //       <CardContent>
  //         <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
  //           <Grid item>
  //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //               <Avatar sx={{ bgcolor: '#8C257C', width: 56, height: 56 }}>
  //                 <AssignmentTurnedInIcon />
  //               </Avatar>
  //               <div>
  //                 <Typography variant="h5" sx={{ fontWeight: 600 , color:'#8C257C'}}>Policy Details</Typography>
  //                 <Typography variant="body2" color="text.secondary">
  //                   {`For ${employeeName} (${employeeCode})`}
  //                 </Typography>
  //               </div>
  //             </Box>
  //           </Grid>
  //           <Grid item>
  //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //               <ToggleButtonGroup
  //                 value={detailStatusFilter}
  //                 exclusive
  //                 onChange={handleFilterChange}
  //                 size="small"
  //                 sx={{
  //                   '& .MuiToggleButton-root.Mui-selected': {
  //                     backgroundColor: '#8C257C',
  //                     color: 'white',
  //                     '&:hover': { backgroundColor: '#F58E35' }
  //                   }
  //                 }}
  //               >
  //                 <ToggleButton value="All">All</ToggleButton>
  //                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
  //                 <ToggleButton value="Pending">Pending</ToggleButton>
  //               </ToggleButtonGroup>
  //               <Button
  //                 variant="contained"
  //                 startIcon={<ArrowBackIcon />}
  //                 onClick={onBack}
  //                 sx={{
  //                   backgroundColor: '#8C257C',
  //                   '&:hover': { backgroundColor: '#F58E35' }
  //                 }}
  //               >
  //                 Back to List
  //               </Button>
  //             </Box>
  //           </Grid>
  //         </Grid>
  //         <TableContainer component={Paper} variant="outlined">
  //           <Table>
  //             <TableHead sx={{ bgcolor: '#8C257C' }}>
  //               <TableRow>
  //                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
  //                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Policy Name</TableCell>
  //                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
  //                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acknowledgement Date</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <TableBody>
  //               {paginatedDetails.length > 0 ? (
  //                 paginatedDetails.map((record, index) => (
  //                   <TableRow key={index} hover>
  //                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
  //                     <TableCell>{record.policy_name}</TableCell>
  //                     <TableCell>
  //                       {detailStatusFilter === 'Acknowledged' || (detailStatusFilter !== 'Pending' && record.status === 'Acknowledged') ? (
  //                         <Chip
  //                           label="Acknowledged"
  //                           size="small"
  //                           icon={<CheckCircleIcon />}
  //                           sx={{ bgcolor: '#8C257C', color: 'white' }}
  //                         />
  //                       ) : (
  //                         <Chip
  //                           label="Pending"
  //                           color="warning"
  //                           size="small"
  //                           icon={<PendingIcon />}
  //                         />
  //                       )}
  //                     </TableCell>
  //                     <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
  //                   </TableRow>
  //                 ))
  //               ) : (
  //                 <TableRow>
  //                   <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
  //                     <Typography color="text.secondary">
  //                       No policies match the selected filter.
  //                     </Typography>
  //                   </TableCell>
  //                 </TableRow>
  //               )}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //         <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} p={2}>
  //               <Typography variant="body2" color="text.secondary">
  //                 Showing {startEntry} to {endEntry} of {filteredDetails.length} results
  //               </Typography>
  //               <TablePagination
  //                 rowsPerPageOptions={[5, 10, 15, 25]}
  //                 component="div"
  //                 count={filteredDetails.length}
  //                 rowsPerPage={rowsPerPage}
  //                 page={page}
  //                 onPageChange={handleChangePage}
  //                 onRowsPerPageChange={handleChangeRowsPerPage}
  //               />
  //           </Box>
  //       </CardContent>
  //     </Card>
  //   </Container>
  //   );
  // };

  // const AcknowledgementTableView = ({
  //   records, paginatedRecords, onRowClick, search, onSearchChange, loading,
  //   statusFilter, onStatusChange, page, rowsPerPage, onPageChange, onRowsPerPageChange
  // }) => {
  //   const renderStatusChip = (status) => {
  //     switch (status) {
  //       case 'Acknowledged':
  //         return <Chip label="Acknowledged" color="success" size="small" icon={<CheckCircleIcon />} />;
  //       case 'Partially Acknowledged':
  //         return <Chip label="Partially" color="warning" size="small" icon={<PendingIcon />} />;
  //       case 'Not Acknowledged':
  //         return <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />;
  //       default:
  //         return null;
  //     }
  //   };

  //   const startEntry = records.length > 0 ? page * rowsPerPage + 1 : 0;
  //   const endEntry = Math.min((page + 1) * rowsPerPage, records.length);

  //   return (
  //     <Box p={3} component={Paper}>
  //       <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
  //               <Typography variant="h4" component="h1" sx={{ fontWeight: '600', color: '#8C257C', mb:3 }}>
  //                 Policy Dashboard
  //               </Typography>
  //           <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
  //             <Grid item xs={12} sm={8}>
  //               <ToggleButtonGroup
  //                 value={statusFilter}
  //                 exclusive
  //                 onChange={onStatusChange}
  //                 aria-label="status filter"
  //                 size="small"
  //                 sx={{
  //                   display: "flex",
  //                   flexWrap: "wrap",
  //                   "& .MuiToggleButton-root": {
  //                     flex: { xs: "1 1 100%", sm: "1 1 auto" },
  //                     fontSize: { xs: "0.7rem", sm: "0.85rem" },
  //                     px: { xs: 1, sm: 2 },
  //                     py: { xs: 0.5, sm: 1 },
  //                   },
  //                   "& .MuiToggleButton-root.Mui-selected": {
  //                     backgroundColor: "#8C257C",
  //                     color: "white",
  //                     "&:hover": { backgroundColor: "#F58E35" },
  //                   },
  //                 }}
  //               >
  //                 <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
  //                 <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
  //                 <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
  //               </ToggleButtonGroup>
  //             </Grid>
  //             <Grid item xs={12} sm={4}>
  //               <TextField
  //                 label="Search by Employee Name"
  //                 variant="outlined"
  //                 size="small"
  //                 fullWidth
  //                 value={search}
  //                 onChange={onSearchChange}
  //                 sx={{
  //                   '& .MuiOutlinedInput-root': {
  //                     '&.Mui-focused fieldset': { borderColor: '#8C257C' }
  //                   },
  //                   '& label.Mui-focused': { color: '#8C257C' }
  //                 }}
  //                 InputProps={{
  //                   startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
  //                 }}
  //               />
  //             </Grid>
  //           </Grid>
  //         </Box>
  //         <TableContainer>
  //           <Table stickyHeader>
  //             <TableHead>
  //               <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
  //                 <TableCell>SR. NO.</TableCell>
  //                 <TableCell>EMPLOYEE NAME</TableCell>
  //                 <TableCell>EMPLOYEE CODE</TableCell>
  //                 <TableCell align="center">TOTAL POLICIES</TableCell>
  //                 <TableCell align="center">ACKNOWLEDGED</TableCell>
  //                 <TableCell>STATUS</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <TableBody>
  //               {loading ? (
  //                 Array.from(new Array(rowsPerPage)).map((_, index) => (
  //                   <TableRow key={index}>
  //                     <TableCell colSpan={6}><Skeleton animation="wave" variant="text" /></TableCell>
  //                   </TableRow>
  //                 ))
  //               ) : paginatedRecords.length > 0 ? (
  //                 paginatedRecords.map((row, index) => (
  //                   <TableRow key={row.employee_code} hover>
  //                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
  //                     <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
  //                     <TableCell>{row.employee_code}</TableCell>
  //                     <TableCell align="center">{row.total_policies}</TableCell>
  //                     <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
  //                     <TableCell onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
  //                       {renderStatusChip(statusFilter)}
  //                     </TableCell>
  //                   </TableRow>
  //                 ))
  //               ) : (
  //                 <TableRow>
  //                   <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
  //                     <Typography color="text.secondary">No results found for the selected criteria.</Typography>
  //                   </TableCell>
  //                 </TableRow>
  //               )}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //         <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} p={2}>
  //             <Typography variant="body2" color="text.secondary">
  //                 Showing {startEntry} to {endEntry} of {records.length} results
  //             </Typography>
  //             <TablePagination
  //                 rowsPerPageOptions={[5, 10, 15, 25]}
  //                 component="div"
  //                 count={records.length}
  //                 rowsPerPage={rowsPerPage}
  //                 page={page}
  //                 onPageChange={onPageChange}
  //                 onRowsPerPageChange={onRowsPerPageChange}
  //             />
  //         </Box>
  //       </Box>
  //   );
  // };

  // export default function PolicyAcknowledgementViewer() {
  //   const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
  //   const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [search, setSearch] = useState('');
  //   const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);

  //   useEffect(() => {
  //     setLoading(true);
  //     axiosInstance.get('/policy-dashboard/')
  //       .then(response => {
  //         const data = response.data || {};
  //         setPolicyData({
  //           acknowledged: data.acknowledged || [],
  //           partially_acknowledged: data.partially_acknowledged || [],
  //           not_acknowledged: data.not_acknowledged || []
  //         });
  //       })
  //       .catch(error => {
  //         console.error("Error fetching acknowledgements:", error);
  //         setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }, []);

  //   const handleRowClick = (record) => {
  //     if (!record || !record.employee_code) return;
  //     axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
  //       .then(response => { setSelectedEmployeeDetails(response.data || {}); })
  //       .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails({}); });
  //   };

  //   const handleStatusChange = (event, newValue) => {
  //     if (newValue !== null) {
  //       setStatusFilter(newValue);
  //       setPage(0);
  //     }
  //   };

  //   const handleSearchChange = (event) => {
  //     setSearch(event.target.value);
  //     setPage(0);
  //   };

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  //   const filteredRecords = useMemo(() => {
  //     let sourceData = [];
  //     switch (statusFilter) {
  //       case 'Acknowledged':
  //         sourceData = policyData.acknowledged;
  //         break;
  //       case 'Partially Acknowledged':
  //         sourceData = policyData.partially_acknowledged;
  //         break;
  //       case 'Not Acknowledged':
  //         sourceData = policyData.not_acknowledged;
  //         break;
  //       default:
  //         sourceData = [];
  //     }
  //     const uniqueRecords = Array.from(
  //       new Map(sourceData.map(item => [item.employee_code, item])).values()
  //     );
  //     const searchedRecords = search
  //       ? uniqueRecords.filter(item =>
  //         item.employee_name.toLowerCase().includes(search.toLowerCase())
  //       )
  //       : uniqueRecords;
  //     return searchedRecords.sort((a, b) => {
  //       const dateA = a.created_at ? new Date(a.created_at) : 0;
  //       const dateB = b.created_at ? new Date(b.created_at) : 0;
  //       return dateB - dateA;
  //     });
  //   }, [search, statusFilter, policyData]);

  //   const paginatedRecords = useMemo(() => {
  //     const startIndex = page * rowsPerPage;
  //     return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
  //   }, [filteredRecords, page, rowsPerPage]);

  //   const handleBackToList = () => {
  //     setSelectedEmployeeDetails(null);
  //   };

  //   return (
  //     <Box sx={{ minHeight: '100vh', py: 2 }}>
  //       <CssBaseline />
  //       {selectedEmployeeDetails ? (
  //         <AcknowledgementDetailView
  //           details={selectedEmployeeDetails}
  //           onBack={handleBackToList}
  //         />
  //       ) : (
  //         <AcknowledgementTableView
  //           records={filteredRecords}
  //           paginatedRecords={paginatedRecords}
  //           onRowClick={handleRowClick}
  //           search={search}
  //           onSearchChange={handleSearchChange}
  //           loading={loading}
  //           statusFilter={statusFilter}
  //           onStatusChange={handleStatusChange}
  //           page={page}
  //           rowsPerPage={rowsPerPage}
  //           onPageChange={handleChangePage}
  //           onRowsPerPageChange={handleChangeRowsPerPage}
  //         />
  //       )}
  //     </Box>
  //   );
  // }






  import React, { useState, useEffect, useMemo } from 'react';
import {
    Box, Typography, Paper, Grid, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    TextField, Button, Container, CssBaseline, Card,
    CardContent, Chip, Avatar, ToggleButton,
    ToggleButtonGroup, Skeleton, FormControl, Select, MenuItem, Pagination
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    CheckCircle as CheckCircleIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
    HighlightOff as HighlightOffIcon,
    Search as SearchIcon,
    Pending as PendingIcon,
} from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';

// THEME constant for consistent styling
const THEME = {
    primary: '#8C257C',
    primaryDark: '#6d1d60',
    secondary: '#F58E35',
    textOnPrimary: '#FFFFFF',
};

const formatDateTime = (datetimeString) => {
    if (!datetimeString) return 'N/A';
    try {
        const date = new Date(datetimeString);
        if (isNaN(date.getTime())) return 'N/A';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    } catch (error) {
        return 'N/A';
    }
};

const AcknowledgementDetailView = ({ details, onBack }) => {
    const [detailStatusFilter, setDetailStatusFilter] = useState('All');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const employeeName = details.employee_name ? details.employee_name.trim() : 'N/A';
    const employeeCode = details.employee_id || 'N/A';

    const filteredDetails = useMemo(() => {
        switch (detailStatusFilter) {
            case 'Acknowledged':
                return details.acknowledged_policies || [];
            case 'Pending':
                return details.pending_policies || [];
            default:
                return details.all_policies || [];
        }
    }, [details, detailStatusFilter]);

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setDetailStatusFilter(newFilter);
            setPage(0);
        }
    };

    const handlePaginationChange = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedDetails = filteredDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const startEntry = filteredDetails.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredDetails.length);

    return (
        <Container maxWidth={false} sx={{ mt: 4 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                    {/* ... (rest of your CardContent remains the same) */}
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: THEME.primary, width: 56, height: 56 }}>
                                    <AssignmentTurnedInIcon />
                                </Avatar>
                                <div>
                                    <Typography variant="h5" sx={{ fontWeight: 600, color: THEME.primary }}>Policy Details</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`For ${employeeName} (${employeeCode})`}
                                    </Typography>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <ToggleButtonGroup
                                    value={detailStatusFilter}
                                    exclusive
                                    onChange={handleFilterChange}
                                    size="small"
                                    sx={{
                                        '& .MuiToggleButton-root.Mui-selected': {
                                            backgroundColor: THEME.primary,
                                            color: 'white',
                                            '&:hover': { backgroundColor: THEME.secondary }
                                        }
                                    }}
                                >
                                    <ToggleButton value="All">All</ToggleButton>
                                    <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
                                    <ToggleButton value="Pending">Pending</ToggleButton>
                                </ToggleButtonGroup>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIcon />}
                                    onClick={onBack}
                                    sx={{
                                        backgroundColor: THEME.primary,
                                        '&:hover': { backgroundColor: THEME.secondary }
                                    }}
                                >
                                    Back to List
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead sx={{ bgcolor: THEME.primary }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>POLICY NAME</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ACKNOWLEDGEMENT DATE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedDetails.length > 0 ? (
                                    paginatedDetails.map((record, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{record.policy_name}</TableCell>
                                            <TableCell>
                                                {detailStatusFilter === 'Acknowledged' || (detailStatusFilter !== 'Pending' && record.status === 'Acknowledged') ? (
                                                    <Chip
                                                        label="Acknowledged"
                                                        size="small"
                                                        icon={<CheckCircleIcon />}
                                                        sx={{ bgcolor: THEME.primary, color: 'white' }}
                                                    />
                                                ) : (
                                                    <Chip
                                                        label="Pending"
                                                        color="warning"
                                                        size="small"
                                                        icon={<PendingIcon />}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{formatDateTime(record.acknowledge_date)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                                            <Typography color="text.secondary">
                                                No policies match the selected filter.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* START: New Styled Pagination */}
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                        sx={{
                                            backgroundColor: THEME.primary,
                                            color: 'white',
                                            borderRadius: '4px',
                                            transition: 'background-color 0.3s',
                                            '&:hover': {
                                                backgroundColor: THEME.primaryDark,
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: 'white',
                                            },
                                        }}
                                    >
                                        {[5, 10, 15, 25].map((value) => (
                                            <MenuItem key={value} value={value}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Typography variant="body2" color="text.secondary">
                                    {`Showing ${startEntry} to ${endEntry} of ${filteredDetails.length} results`}
                                </Typography>
                            </Box>
                            <Pagination
                                count={Math.ceil(filteredDetails.length / rowsPerPage)}
                                page={page + 1}
                                onChange={handlePaginationChange}
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '4px',
                                        transition: 'background-color 0.3s, color 0.3s',
                                        '&:hover': {
                                            backgroundColor: THEME.secondary,
                                            color: 'white',
                                        }
                                    },
                                    '& .MuiPaginationItem-page': {
                                        color: THEME.primary,
                                        '&.Mui-selected': {
                                            backgroundColor: THEME.primary,
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: THEME.secondary,
                                            }
                                        },
                                    },
                                    '& .MuiPaginationItem-icon': {
                                        color: THEME.primary,
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    {/* END: New Styled Pagination */}

                </CardContent>
            </Card>
        </Container>
    );
};

const AcknowledgementTableView = ({
    records, paginatedRecords, onRowClick, search, onSearchChange, loading,
    statusFilter, onStatusChange, page, rowsPerPage, onPageChange, onRowsPerPageChange
}) => {
    const renderStatusChip = (status) => {
        switch (status) {
            case 'Acknowledged':
                return <Chip label="Acknowledged" color="success" size="small" icon={<CheckCircleIcon />} />;
            case 'Partially Acknowledged':
                return <Chip label="Partially" color="warning" size="small" icon={<PendingIcon />} />;
            case 'Not Acknowledged':
                return <Chip label="Not Acknowledged" color="error" size="small" icon={<HighlightOffIcon />} />;
            default:
                return null;
        }
    };

    const handlePaginationChange = (event, newPage) => {
        onPageChange(event, newPage - 1);
    };

    const startEntry = records.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, records.length);

    return (
        <Box p={3} component={Paper}>
            {/* ... (rest of your Table View remains the same) */}
            <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: '600', color: '#8C257C', mb: 3 }}>
                    Policy Dashboard
                </Typography>
                <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={8}>
                        <ToggleButtonGroup
                            value={statusFilter}
                            exclusive
                            onChange={onStatusChange}
                            aria-label="status filter"
                            size="small"
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                "& .MuiToggleButton-root": {
                                    flex: { xs: "1 1 100%", sm: "1 1 auto" },
                                    fontSize: { xs: "0.7rem", sm: "0.85rem" },
                                    px: { xs: 1, sm: 2 },
                                    py: { xs: 0.5, sm: 1 },
                                },
                                "& .MuiToggleButton-root.Mui-selected": {
                                    backgroundColor: "#8C257C",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#F58E35" },
                                },
                            }}
                        >
                            <ToggleButton value="Acknowledged">Acknowledged</ToggleButton>
                            <ToggleButton value="Partially Acknowledged">Partially</ToggleButton>
                            <ToggleButton value="Not Acknowledged">Not Acknowledged</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Search by Employee Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={search}
                            onChange={onSearchChange}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': { borderColor: '#8C257C' }
                                },
                                '& label.Mui-focused': { color: '#8C257C' }
                            }}
                            InputProps={{
                                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
                            <TableCell>SR. NO.</TableCell>
                            <TableCell>EMPLOYEE NAME</TableCell>
                            <TableCell>EMPLOYEE CODE</TableCell>
                            <TableCell align="center">TOTAL POLICIES</TableCell>
                            <TableCell align="center">ACKNOWLEDGED</TableCell>
                            <TableCell>STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={6}><Skeleton animation="wave" variant="text" /></TableCell>
                                </TableRow>
                            ))
                        ) : paginatedRecords.length > 0 ? (
                            paginatedRecords.map((row, index) => (
                                <TableRow key={row.employee_code} hover>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{row.employee_name}</TableCell>
                                    <TableCell>{row.employee_code}</TableCell>
                                    <TableCell align="center">{row.total_policies}</TableCell>
                                    <TableCell align="center">{Math.round(row.acknowledged_count)}</TableCell>
                                    <TableCell onClick={() => onRowClick(row)} sx={{ cursor: 'pointer' }}>
                                        {renderStatusChip(statusFilter)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                    <Typography color="text.secondary">No results found for the selected criteria.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* START: New Styled Pagination */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Skeleton variant="text" width={200} />
                        <Skeleton variant="rectangular" width={300} height={40} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormControl variant="outlined" size="small">
                                <Select
                                    value={rowsPerPage}
                                    onChange={onRowsPerPageChange}
                                    sx={{
                                        backgroundColor: THEME.primary,
                                        color: 'white',
                                        borderRadius: '4px',
                                        transition: 'background-color 0.3s',
                                        '&:hover': {
                                            backgroundColor: THEME.primaryDark,
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {[5, 10, 15, 25].map((value) => (
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography variant="body2" color="text.secondary">
                                {`Showing ${startEntry} to ${endEntry} of ${records.length} results`}
                            </Typography>
                        </Box>
                        <Pagination
                            count={Math.ceil(records.length / rowsPerPage)}
                            page={page + 1}
                            onChange={handlePaginationChange}
                            showFirstButton
                            showLastButton
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': {
                                        backgroundColor: THEME.secondary,
                                        color: 'white',
                                    }
                                },
                                '& .MuiPaginationItem-page': {
                                    color: THEME.primary,
                                    '&.Mui-selected': {
                                        backgroundColor: THEME.primary,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: THEME.secondary,
                                        }
                                    },
                                },
                                '& .MuiPaginationItem-icon': {
                                    color: THEME.primary,
                                }
                            }}
                        />
                    </Box>
                )}
            </Box>
            {/* END: New Styled Pagination */}
        </Box>
    );
};


export default function PolicyAcknowledgementViewer() {
    const [policyData, setPolicyData] = useState({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
    const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('Partially Acknowledged');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/policy-dashboard/')
            .then(response => {
                const data = response.data || {};
                setPolicyData({
                    acknowledged: data.acknowledged || [],
                    partially_acknowledged: data.partially_acknowledged || [],
                    not_acknowledged: data.not_acknowledged || []
                });
            })
            .catch(error => {
                console.error("Error fetching acknowledgements:", error);
                setPolicyData({ acknowledged: [], partially_acknowledged: [], not_acknowledged: [] });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleRowClick = (record) => {
        if (!record || !record.employee_code) return;
        axiosInstance.get(`/policy-dashboard/${record.employee_code}/`)
            .then(response => { setSelectedEmployeeDetails(response.data || {}); })
            .catch(error => { console.error(`Error fetching details for ${record.employee_code}:`, error); setSelectedEmployeeDetails({}); });
    };

    const handleStatusChange = (event, newValue) => {
        if (newValue !== null) {
            setStatusFilter(newValue);
            setPage(0);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredRecords = useMemo(() => {
        let sourceData = [];
        switch (statusFilter) {
            case 'Acknowledged':
                sourceData = policyData.acknowledged;
                break;
            case 'Partially Acknowledged':
                sourceData = policyData.partially_acknowledged;
                break;
            case 'Not Acknowledged':
                sourceData = policyData.not_acknowledged;
                break;
            default:
                sourceData = [];
        }
        const uniqueRecords = Array.from(
            new Map(sourceData.map(item => [item.employee_code, item])).values()
        );
        const searchedRecords = search
            ? uniqueRecords.filter(item =>
                item.employee_name.toLowerCase().includes(search.toLowerCase())
            )
            : uniqueRecords;
        return searchedRecords.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : 0;
            const dateB = b.created_at ? new Date(b.created_at) : 0;
            return dateB - dateA;
        });
    }, [search, statusFilter, policyData]);

    const paginatedRecords = useMemo(() => {
        const startIndex = page * rowsPerPage;
        return filteredRecords.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredRecords, page, rowsPerPage]);

    const handleBackToList = () => {
        setSelectedEmployeeDetails(null);
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 2 }}>
            <CssBaseline />
            {selectedEmployeeDetails ? (
                <AcknowledgementDetailView
                    details={selectedEmployeeDetails}
                    onBack={handleBackToList}
                />
            ) : (
                <AcknowledgementTableView
                    records={filteredRecords}
                    paginatedRecords={paginatedRecords}
                    onRowClick={handleRowClick}
                    search={search}
                    onSearchChange={handleSearchChange}
                    loading={loading}
                    statusFilter={statusFilter}
                    onStatusChange={handleStatusChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Box>
    );
}

