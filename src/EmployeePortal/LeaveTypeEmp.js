// // // import React, { useState } from 'react';
// // // import {
// // //   Box,
// // //   Paper,
// // //   Typography,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Select,
// // //   MenuItem,
// // //   TextField,
// // //   Button,
// // // } from '@mui/material';

// // // const leaveTypeData = [
// // //   { id: 1, leaveType: "Casual Leave (CL)", daysPerYear: 12, leaveAddedTill: 4, balancedLeave: 1, requiresApproval: "Yes" },
// // //   { id: 2, leaveType: "Compensatory off (Comp Off)", daysPerYear: 0, leaveAddedTill: 0, balancedLeave: 0, requiresApproval: "Yes" },
// // //   { id: 3, leaveType: "Earned leave (EL)", daysPerYear: 12, leaveAddedTill: 4, balancedLeave: 4, requiresApproval: "Yes" },
// // //   { id: 4, leaveType: "Leave without pay (LWP)", daysPerYear: 30, leaveAddedTill: 30, balancedLeave: 30, requiresApproval: "Yes" },
// // //   { id: 5, leaveType: "Maternity Leave (ML)", daysPerYear: 182, leaveAddedTill: 182, balancedLeave: 182, requiresApproval: "Yes" },
// // //   { id: 6, leaveType: "Paternity Leave (PL)", daysPerYear: 5, leaveAddedTill: 5, balancedLeave: 5, requiresApproval: "Yes" },
// // //   { id: 7, leaveType: "Restricted Holiday", daysPerYear: 2, leaveAddedTill: 2, balancedLeave: 2, requiresApproval: "Yes" },
// // // ];

// // // function LeaveType() {
// // //   const [entries, setEntries] = useState('10');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [currentPage, setCurrentPage] = useState(1);

// // //   const filteredData = leaveTypeData.filter(leave =>
// // //     leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <Box sx={{ p: 3 }}>
// // //       <Typography variant="h4" sx={{ mb: 2 }}>Leave Management</Typography>
// // //       <Typography variant="h6" sx={{ mb: 2 }}>Leave Type</Typography>
// // //       <Paper sx={{ width: '100%', mb: 2 }}>
// // //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //           <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //             <Typography sx={{ mr: 1 }}>Show</Typography>
// // //             <Select
// // //               value={entries}
// // //               onChange={(e) => setEntries(e.target.value)}
// // //               size="small"
// // //               sx={{ mr: 1 }}
// // //             >
// // //               <MenuItem value={10}>10</MenuItem>
// // //               <MenuItem value={25}>25</MenuItem>
// // //               <MenuItem value={50}>50</MenuItem>
// // //             </Select>
// // //             <Typography>entries</Typography>
// // //           </Box>
// // //           <TextField
// // //             size="small"
// // //             placeholder="Search"
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //         </Box>
// // //         <TableContainer>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// // //                 <TableCell>LEAVE TYPE</TableCell>
// // //                 <TableCell>DAYS PER YEAR</TableCell>
// // //                 <TableCell>LEAVE ADDED TILL</TableCell>
// // //                 <TableCell>BALANCED LEAVE</TableCell>
// // //                 <TableCell>REQUIRES APPROVAL</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {filteredData.map((row) => (
// // //                 <TableRow key={row.id}>
// // //                   <TableCell>{row.leaveType}</TableCell>
// // //                   <TableCell>{row.daysPerYear}</TableCell>
// // //                   <TableCell>{row.leaveAddedTill}</TableCell>
// // //                   <TableCell>{row.balancedLeave}</TableCell>
// // //                   <TableCell>{row.requiresApproval}</TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //           <Typography>
// // //             Showing {Math.min((currentPage - 1) * 10 + 1, filteredData.length)} to{' '}
// // //             {Math.min(currentPage * 10, filteredData.length)} of {filteredData.length} entries
// // //           </Typography>
// // //           <Box>
// // //             <Button
// // //               variant="outlined"
// // //               sx={{ mr: 1 }}
// // //               disabled={currentPage === 1}
// // //               onClick={() => setCurrentPage(prev => prev - 1)}
// // //             >
// // //               Previous
// // //             </Button>
// // //             <Button
// // //               variant="contained"
// // //               sx={{ mr: 1 }}
// // //             >
// // //               {currentPage}
// // //             </Button>
// // //             <Button
// // //               variant="outlined"
// // //               disabled={currentPage * 10 >= filteredData.length}
// // //               onClick={() => setCurrentPage(prev => prev + 1)}
// // //             >
// // //               Next
// // //             </Button>
// // //           </Box>
// // //         </Box>
// // //       </Paper>
// // //     </Box>
// // //   );
// // // }

// // // export default LeaveType;



// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Paper,
// //   Typography,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Select,
// //   MenuItem,
// //   TextField,
// //   Button,
// //   CircularProgress, // Added for loading indicator
// // } from '@mui/material';

// // // The old static data is removed, as we will fetch it from the API.
// // // const leaveTypeData = [ ... ];

// // function LeaveType() {
// //   // State for the data fetched from the API
// //   const [leaveData, setLeaveData] = useState([]);
  
// //   // State for UI controls
// //   const [entries, setEntries] = useState('10');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);

// //   // State for API call status
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // useEffect hook to fetch data when the component mounts
// //   useEffect(() => {
// //     const fetchLeaveData = async () => {
// //       try {
// //         // 1. Get employee_id and accessToken from localStorage
// //         const employeeId = localStorage.getItem('loggedInUser');
// //         const accessToken = localStorage.getItem('accessToken');

// //         // Basic validation
// //         if (!employeeId || !accessToken) {
// //           throw new Error("User credentials not found in local storage.");
// //         }

// //         // 2. Construct the API URL
       
// //         const url = `https://tdtlworld.com/hrms-backend/api/leave-details/?employee_id=${employeeId}`;

// //         // 3. Make the API call using fetch
// //         const response = await fetch(url, {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': `Bearer ${accessToken}`,
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error(`API call failed with status: ${response.status}`);
// //         }

// //         const apiResponse = await response.json();

// //         // 4. Transform the API data to match the table's expected structure
// //         const formattedData = apiResponse.map(item => ({
// //           id: item.leave_type_id, // Use a unique identifier from the API for the key
// //           leaveType: item.leave_type,
// //           daysPerYear: item.field_one, // As requested
// //           leaveAddedTill: item.leave_taken, // As requested
// //           balancedLeave: item.balance_leave,
// //           //requiresApproval: "Yes", // Hardcoded as it's not in the API response
// //         }));

// //         setLeaveData(formattedData);

// //       } catch (err) {
// //         setError(err.message);
// //         console.error("Failed to fetch leave data:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLeaveData();
// //   }, []); // The empty dependency array [] ensures this effect runs only once on mount

// //   // Filter data based on search term
// //   const filteredData = leaveData.filter(leave =>
// //     leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // Pagination Logic
// //   const entriesPerPage = parseInt(entries, 10);
// //   const startIndex = (currentPage - 1) * entriesPerPage;
// //   const endIndex = startIndex + entriesPerPage;
// //   const paginatedData = filteredData.slice(startIndex, endIndex);
// //   const totalPages = Math.ceil(filteredData.length / entriesPerPage);


// //   // Render a loading spinner while data is being fetched
// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //         <CircularProgress />
// //         <Typography sx={{ ml: 2 }}>Loading Leave Data...</Typography>
// //       </Box>
// //     );
// //   }

// //   // Render an error message if the API call fails
// //   if (error) {
// //     return (
// //       <Box sx={{ p: 3 }}>
// //         <Typography color="error">Error: {error}</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Typography variant="h4" sx={{ mb: 2 }}>Leave Management</Typography>
// //       <Typography variant="h6" sx={{ mb: 2 }}>Leave Type</Typography>
// //       <Paper sx={{ width: '100%', mb: 2 }}>
// //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //             <Typography sx={{ mr: 1 }}>Show</Typography>
// //             <Select
// //               value={entries}
// //               onChange={(e) => {
// //                 setEntries(e.target.value);
// //                 setCurrentPage(1); // Reset to first page on changing entries per page
// //               }}
// //               size="small"
// //               sx={{ mr: 1 }}
// //             >
// //               <MenuItem value={10}>10</MenuItem>
// //               <MenuItem value={25}>25</MenuItem>
// //               <MenuItem value={50}>50</MenuItem>
// //             </Select>
// //             <Typography>entries</Typography>
// //           </Box>
// //           <TextField
// //             size="small"
// //             placeholder="Search"
// //             value={searchTerm}
// //             onChange={(e) => {
// //               setSearchTerm(e.target.value);
// //               setCurrentPage(1); // Reset to first page on search
// //             }}
// //           />
// //         </Box>
// //         <TableContainer>
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// //                 <TableCell>LEAVE TYPE</TableCell>
// //                 <TableCell>DAYS PER YEAR</TableCell>
// //                 <TableCell>LEAVE ADDED TILL</TableCell>
// //                 <TableCell>BALANCED LEAVE</TableCell>
// //                 {/* <TableCell>REQUIRES APPROVAL</TableCell> */}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {paginatedData.length > 0 ? (
// //                 paginatedData.map((row) => (
// //                   <TableRow key={row.id}>
// //                     <TableCell>{row.leaveType}</TableCell>
// //                     <TableCell>{row.daysPerYear ?? 'N/A'}</TableCell>
// //                     <TableCell>{row.leaveAddedTill ?? 'N/A'}</TableCell>
// //                     <TableCell>{row.balancedLeave}</TableCell>
// //                     {/* <TableCell>{row.requiresApproval}</TableCell> */}
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                     <TableCell colSpan={5} align="center">
// //                         No data available
// //                     </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <Typography>
// //             Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{' '}
// //             {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
// //           </Typography>
// //           <Box>
// //             <Button
// //               variant="outlined"
// //               sx={{ mr: 1 }}
// //               disabled={currentPage === 1}
// //               onClick={() => setCurrentPage(prev => prev - 1)}
// //             >
// //               Previous
// //             </Button>
// //             <Button
// //               variant="contained"
// //               sx={{ mr: 1, cursor: 'default' }}
// //             >
// //               {currentPage}
// //             </Button>
// //             <Button
// //               variant="outlined"
// //               disabled={currentPage >= totalPages}
// //               onClick={() => setCurrentPage(prev => prev + 1)}
// //             >
// //               Next
// //             </Button>
// //           </Box>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // }

// // export default LeaveType;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   CircularProgress,
// } from '@mui/material';

// function LeaveType() {
//   // State for the data fetched from the API
//   const [leaveData, setLeaveData] = useState([]);
  
//   // State for UI controls
//   const [entries, setEntries] = useState('10');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // State for API call status
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         // 1. Get employee_id and accessToken from localStorage
//         const employeeId = localStorage.getItem('loggedInUser');
//         const accessToken = localStorage.getItem('accessToken');

//         // Basic validation
//         if (!employeeId || !accessToken) {
//           throw new Error("User credentials not found in local storage.");
//         }

//         // 2. Construct the API URL
//         const url = `https://tdtlworld.com/hrms-backend/api/leave-details/?employee_id=${employeeId}`;

//         // 3. Make the API call using fetch
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`API call failed with status: ${response.status}`);
//         }

//         const apiResponse = await response.json();

//         // *** CHANGE: Filter the raw API response to exclude specific leave types ***
//         const leaveTypesToExclude = [
//             "Compensatory Off (Comp Off)",
//             "Privilege Leave (PL)",
//             "Privilege Leave"
//         ];
        
//         const filteredApiResponse = apiResponse.filter(item =>
//           !leaveTypesToExclude.includes(item.leave_type)
//         );

//         // 4. Transform the FILTERED API data to match the table's expected structure
//         const formattedData = filteredApiResponse.map(item => ({
//           id: item.leave_type_id, // Use a unique identifier from the API for the key
//           leaveType: item.leave_type,
//           daysPerYear: item.field_one,
//           leaveAddedTill: item.leave_taken,
//           balancedLeave: item.balance_leave,
//         }));

//         setLeaveData(formattedData);

//       } catch (err) {
//         setError(err.message);
//         console.error("Failed to fetch leave data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveData();
//   }, []); // The empty dependency array [] ensures this effect runs only once on mount

//   // Filter data based on search term
//   const filteredData = leaveData.filter(leave =>
//     leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination Logic
//   const entriesPerPage = parseInt(entries, 10);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);


//   // Render a loading spinner while data is being fetched
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading Leave Data...</Typography>
//       </Box>
//     );
//   }

//   // Render an error message if the API call fails
//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">Error: {error}</Typography>
//         <Typography>Please try refreshing the page or contact support.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Leave Management</Typography>
//       <Typography variant="h6" sx={{ mb: 2 }}>Leave Type</Typography>
//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography sx={{ mr: 1 }}>Show</Typography>
//             <Select
//               value={entries}
//               onChange={(e) => {
//                 setEntries(e.target.value);
//                 setCurrentPage(1); // Reset to first page on changing entries per page
//               }}
//               size="small"
//               sx={{ mr: 1 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography>entries</Typography>
//           </Box>
//           <TextField
//             size="small"
//             placeholder="Search by Leave Type"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1); // Reset to first page on search
//             }}
//           />
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>LEAVE TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>DAYS PER YEAR</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>LEAVE TAKEN</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>BALANCE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((row) => (
//                   <TableRow key={row.id} hover>
//                     <TableCell>{row.leaveType}</TableCell>
//                     <TableCell>{row.daysPerYear ?? 'N/A'}</TableCell>
//                     <TableCell>{row.leaveAddedTill ?? 'N/A'}</TableCell>
//                     <TableCell>{row.balancedLeave}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                     <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                         <Typography>No matching leave types found.</Typography>
//                     </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{' '}
//             {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
//           </Typography>
//           <Box>
//             <Button
//               variant="outlined"
//               size="small"
//               sx={{ mr: 1 }}
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(prev => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outlined"
//               size="small"
//               disabled={currentPage >= totalPages}
//               onClick={() => setCurrentPage(prev => prev + 1)}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// // export default LeaveType;
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   CircularProgress,
// } from '@mui/material';

// function LeaveType() {
//   // State for the data fetched from the API
//   const [leaveData, setLeaveData] = useState([]);
  
//   // State for UI controls
//   const [entries, setEntries] = useState('10');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   // State for API call status
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect hook to fetch data when the component mounts
//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         // 1. Get employee_id and accessToken from localStorage
//         const employeeId = localStorage.getItem('loggedInUser');
//         const accessToken = localStorage.getItem('accessToken');

//         // Basic validation
//         if (!employeeId || !accessToken) {
//           throw new Error("User credentials not found in local storage.");
//         }

//         // 2. Construct the API URL
//         const url = `https://tdtlworld.com/hrms-backend/api/leave-details/?employee_id=${employeeId}`;

//         // 3. Make the API call using fetch
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`API call failed with status: ${response.status}`);
//         }

//         const apiResponse = await response.json();

//         // *** CHANGE: Filter the raw API response to exclude specific leave types ***
//         const leaveTypesToExclude = [
//             "Compensatory Off (Comp Off)",
//             "Privilege Leave (PL)",
//             "Privilege Leave"
//         ];
        
//         const filteredApiResponse = apiResponse.filter(item =>
//           !leaveTypesToExclude.includes(item.leave_type)
//         );

//         // 4. Transform the FILTERED API data to match the table's expected structure
//         const formattedData = filteredApiResponse.map(item => ({
//           id: item.leave_type_id, // Use a unique identifier from the API for the key
//           leaveType: item.leave_type,
//           daysPerYear: item.field_one,
//           leaveAddedTill: item.leave_taken,
//           balancedLeave: item.balance_leave,
//         }));

//         setLeaveData(formattedData);

//       } catch (err) {
//         setError(err.message);
//         console.error("Failed to fetch leave data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveData();
//   }, []); // The empty dependency array [] ensures this effect runs only once on mount

//   // Filter data based on search term
//   const filteredData = leaveData.filter(leave =>
//     leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination Logic
//   const entriesPerPage = parseInt(entries, 10);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);


//   // Render a loading spinner while data is being fetched
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading Leave Data...</Typography>
//       </Box>
//     );
//   }

//   // Render an error message if the API call fails
//   if (error) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Typography color="error">Error: {error}</Typography>
//         <Typography>Please try refreshing the page or contact support.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Leave Management</Typography>
//       <Typography variant="h6" sx={{ mb: 2 }}>Leave Type</Typography>
//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography sx={{ mr: 1 }}>Show</Typography>
//             <Select
//               value={entries}
//               onChange={(e) => {
//                 setEntries(e.target.value);
//                 setCurrentPage(1); // Reset to first page on changing entries per page
//               }}
//               size="small"
//               sx={{ mr: 1 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography>entries</Typography>
//           </Box>
//           <TextField
//             size="small"
//             placeholder="Search by Leave Type"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1); // Reset to first page on search
//             }}
//           />
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>LEAVE TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>DAYS PER YEAR</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>LEAVE TAKEN</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>BALANCE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((row) => (
//                   <TableRow key={row.id} hover>
//                     <TableCell>{row.leaveType}</TableCell>
//                     <TableCell>{row.daysPerYear ?? 'N/A'}</TableCell>
//                     <TableCell>{row.leaveAddedTill ?? 'N/A'}</TableCell>
//                     <TableCell>{row.balancedLeave}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                     <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                         <Typography>No matching leave types found.</Typography>
//                     </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{' '}
//             {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
//           </Typography>
//           <Box>
//             <Button
//               variant="outlined"
//               size="small"
//               sx={{ mr: 1 }}
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(prev => prev - 1)}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outlined"
//               size="small"
//               disabled={currentPage >= totalPages}
//               onClick={() => setCurrentPage(prev => prev + 1)}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }

// export default LeaveType;










// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Button,
//   CircularProgress,
//   Skeleton,
//   TablePagination,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
// import Swal from 'sweetalert2';

// const PageWrapper = ({ children }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box component={Paper} p={{ xs: 2, sm: 3 }}>
//         {children}
//       </Box>
//     </Box>
//   );
// };

// function LeaveType() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [leaveData, setLeaveData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       setLoading(true);
//       try {
//         const employeeId = localStorage.getItem('loggedInUser');
//         const accessToken = localStorage.getItem('accessToken');

//         if (!employeeId || !accessToken) {
//           throw new Error("User credentials not found. Please log in again.");
//         }

//         const url = `https://vethrbackend.vetrinahealthcare.com/api/leave-details/?employee_id=${employeeId}`;
//         const response = await fetch(url, {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch data. Status: ${response.status}`);
//         }

//         const apiResponse = await response.json();

//         const leaveTypesToExclude = ["Compensatory Off (Comp Off)", "Privilege Leave (PL)", "Privilege Leave"];
//         const filteredApiResponse = apiResponse.filter(item =>
//           !leaveTypesToExclude.includes(item.leave_type)
//         );

//         const formattedData = filteredApiResponse.map(item => ({
//           id: item.leave_type_id,
//           leaveType: item.leave_type,
//           daysPerYear: item.field_one,
//           leaveTaken: item.leave_taken,
//           balance: item.balance_leave,
//         }));

//         setLeaveData(formattedData);

//       } catch (err) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Fetch Error',
//           text: err.message || "An unexpected error occurred.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       } finally {
//         setTimeout(() => setLoading(false), 500);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = leaveData.filter(leave =>
//     leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const renderSkeletons = () => {
//     return Array.from(new Array(5)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <PageWrapper>
//       <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
//         Leave Type
//       </Typography>
      
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'space-between',
//           alignItems: isMobile ? 'stretch' : 'center',
//           gap: 2,
//           mb: 4,
//         }}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             bgcolor: '#8C257C',
//             color: 'white',
//             '&:hover': {
//               bgcolor: '#6d1d60',
//             },
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search by Leave Type..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(0);
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             width: isMobile ? '100%' : 'auto',
//           }}
//         />
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ bgcolor: '#8C257C' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>LEAVE TYPE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DAYS PER YEAR</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>LEAVE TAKEN</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>BALANCE</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               renderSkeletons()
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((row) => (
//                 <TableRow key={row.id} hover>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.leaveType}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.daysPerYear ?? 'N/A'}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.leaveTaken ?? 'N/A'}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{row.balance}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                   <Typography>No matching leave types found.</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15, 25]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         sx={{
//           '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
//              color: 'text.secondary',
//           },
//           '.MuiSvgIcon-root': {
//             color: '#8C257C',
//           },
//         }}
//       />
//     </PageWrapper>
//   );
// }

// export default LeaveType;












import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress,
  Skeleton,
  TablePagination,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

const PageWrapper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: 3 }}>
      <Box component={Paper} p={{ xs: 2, sm: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

function LeaveType() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [leaveData, setLeaveData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const employeeId = localStorage.getItem('loggedInUser');
        const accessToken = localStorage.getItem('accessToken');

        if (!employeeId || !accessToken) {
          throw new Error("User credentials not found. Please log in again.");
        }

        const url = `https://tdtlworld.com/hrms-backend/api/leave-details/?employee_id=${employeeId}`;
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const apiResponse = await response.json();

        const leaveTypesToExclude = ["Compensatory Off (Comp Off)", "Privilege Leave (PL)", "Privilege Leave"];
        const filteredApiResponse = apiResponse.filter(item =>
          !leaveTypesToExclude.includes(item.leave_type)
        );

        const formattedData = filteredApiResponse.map(item => ({
          id: item.leave_type_id,
          leaveType: item.leave_type,
          daysPerYear: item.field_one,
          leaveTaken: item.leave_taken,
          balance: item.balance_leave,
        }));

        setLeaveData(formattedData);

      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: err.message || "An unexpected error occurred.",
          timer: 3000,
          showConfirmButton: false,
        });
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchLeaveData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = leaveData.filter(leave =>
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderSkeletons = () => {
    return Array.from(new Array(5)).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
      </TableRow>
    ));
  };

  return (
    <PageWrapper>
      <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
        Leave Type
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: 2,
          mb: 4,
        }}
      >
        {/* <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#8C257C',
            color: 'white',
            '&:hover': {
              bgcolor: '#6d1d60',
            },
          }}
        >
          Add New
        </Button> */}
        <TextField
          size="small"
          placeholder="Search by Leave Type..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: isMobile ? '100%' : 'auto',
          }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ bgcolor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>LEAVE TYPE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DAYS PER YEAR</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>LEAVE TAKEN</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>BALANCE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              renderSkeletons()
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.leaveType}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.daysPerYear ?? 'N/A'}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.leaveTaken ?? 'N/A'}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{row.balance}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography>No matching leave types found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
             color: 'text.secondary',
          },
          '.MuiSvgIcon-root': {
            color: '#8C257C',
          },
        }}
      />
    </PageWrapper>
  );
}

export default LeaveType;