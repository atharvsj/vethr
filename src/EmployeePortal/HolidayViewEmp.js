// import React, { useState } from 'react';
// import { Box, Typography, Button, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead,
//   TableRow, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// export default function HolidayView() {
//   const [entries, setEntries] = useState('10');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   const holidayData = [
//     { id: 1, date: '2024-01-01', day: 'Monday', holiday: 'New Year', type: 'Restricted Holiday' },
//     { id: 2, date: '2024-01-26', day: 'Friday', holiday: 'Republic Day', type: 'National Holiday' },
//     { id: 3, date: '2024-03-25', day: 'Monday', holiday: 'Holi', type: 'Restricted Holiday' },
//     { id: 4, date: '2024-08-15', day: 'Thursday', holiday: 'Independence Day', type: 'National Holiday' },
//     { id: 5, date: '2024-10-02', day: 'Wednesday', holiday: 'Gandhi Jayanti', type: 'National Holiday' },
//     { id: 6, date: '2024-12-25', day: 'Wednesday', holiday: 'Christmas', type: 'Restricted Holiday' },
//   ];

//   const filteredData = holidayData.filter(holiday =>
//     holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     holiday.date.includes(searchTerm) ||
//     holiday.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Holidays</Typography>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <FormControl sx={{ minWidth: 120 }}>
//             <InputLabel id="entries-select-label">Show entries</InputLabel>
//             <Select
//               labelId="entries-select-label"
//               id="entries-select"
//               value={entries}
//               label="Show entries"
//               onChange={(e) => setEntries(e.target.value)}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>HOLIDAY</TableCell>
//                 <TableCell>TYPE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((holiday) => (
//                   <TableRow key={holiday.id}>
//                     <TableCell>{holiday.date}</TableCell>
//                     <TableCell>{holiday.day}</TableCell>
//                     <TableCell>{holiday.holiday}</TableCell>
//                     <TableCell>
//                       <Box sx={{
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: '16px',
//                         display: 'inline-block',
//                         bgcolor: holiday.type === 'National Holiday' ? 'primary.main' : 'success.main',
//                         color: 'white',
//                       }}>
//                         {holiday.type}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
//           <Button
//             onClick={() => handleChangePage(null, page - 1)}
//             disabled={page === 0}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={() => handleChangePage(null, page + 1)}
//             disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
//           >
//             Next
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Button, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TextField, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress, Alert
// } from '@mui/material';

// // To test this component, you can manually set the employeeId in your browser's developer console:
// // localStorage.setItem('loggedInUser', 'V0921');

// export default function HolidayView() {
//   // State for API data, loading, and errors
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for table controls
//   const [entries, setEntries] = useState('10');
//   const [page, setPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const rowsPerPage = parseInt(entries, 10);

//   // Helper function to get the day of the week from a date string (e.g., "2024-01-01")
//   const getDayOfWeek = (dateString) => {
//     const date = new Date(dateString);
//     // Add time zone offset to prevent date from shifting due to UTC conversion
//     const adjustedDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
//     const options = { weekday: 'long' };
//     return new Intl.DateTimeFormat('en-US', options).format(adjustedDate);
//   };

//   useEffect(() => {
//     const fetchHolidays = async () => {
//       // Get employeeId from localStorage, with a fallback for demonstration
//       const employeeId = localStorage.getItem('loggedInUser');

//       if (!employeeId) {
//         setError("Employee ID not found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`);

//         const apiData = response.data.data;

//         if (Array.isArray(apiData)) {
//             // Map the API data to the format required by the frontend
//             const formattedData = apiData.map(holiday => ({
//               id: holiday.holiday_id,
//               date: holiday.start_date,
//               day: getDayOfWeek(holiday.start_date),
//               holiday: holiday.event_name,
//               type: holiday.is_publish === 1 ? 'Published' : 'Restricted'
//             }));
//             setHolidays(formattedData);
//         } else {
//             throw new Error("Received invalid data format from the server.");
//         }
//       } catch (err) {
//         console.error("Failed to fetch holidays:", err);
//         setError(err.response?.data?.message || err.message || "An error occurred while fetching holiday data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, []); // Empty dependency array ensures this runs once on component mount

//   // Filter holidays based on the search term
//   const filteredData = holidays.filter(holiday =>
//     holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     holiday.date.includes(searchTerm) ||
//     holiday.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEntriesChange = (event) => {
//     setEntries(event.target.value);
//     setPage(0); // Reset to the first page when changing rows per page
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on a new search
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Sliced data for the current page
//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Holidays</Typography>
//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel id="entries-select-label">Show</InputLabel>
//             <Select
//               labelId="entries-select-label"
//               id="entries-select"
//               value={entries}
//               label="Show"
//               onChange={handleEntriesChange}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>HOLIDAY</TableCell>
//                 <TableCell>TYPE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : error ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                     <Alert severity="error">{error}</Alert>
//                   </TableCell>
//                 </TableRow>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((holiday) => (
//                   <TableRow hover key={holiday.id}>
//                     <TableCell>{holiday.date}</TableCell>
//                     <TableCell>{holiday.day}</TableCell>
//                     <TableCell>{holiday.holiday}</TableCell>
//                     <TableCell>
//                       <Box sx={{
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: '16px',
//                         display: 'inline-block',
//                         color: 'white',
//                         bgcolor: holiday.type === 'Published' ? 'success.main' : 'warning.main',
//                         fontSize: '0.75rem',
//                         fontWeight: 'bold',
//                       }}>
//                         {holiday.type}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                     <Typography>No holidays found.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//            <Typography variant="body2" sx={{ mr: 2 }}>
//             Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} entries
//           </Typography>
//           <Button
//             onClick={(e) => handleChangePage(e, page - 1)}
//             disabled={page === 0 || loading}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={(e) => handleChangePage(e, page + 1)}
//             disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1 || loading}
//           >
//             Next
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


// 



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box, Typography, Button, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TextField, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress, Alert
// } from '@mui/material';

// export default function HolidayView() {
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [entries, setEntries] = useState('10');
//   const [page, setPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const rowsPerPage = parseInt(entries, 10);

//   useEffect(() => {
//     const fetchHolidays = async () => {
//       const employeeId = localStorage.getItem('loggedInUser');

//       if (!employeeId) {
//         setError("Employee ID not found. Please log in to view holidays.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`);
//         const apiData = response.data;

//         if (Array.isArray(apiData)) {
//           const formattedData = apiData.map(holiday => ({
//             id: holiday.holiday_id,
//             startDate: holiday.start_date.split('T')[0], // Remove T00:00:00
//             endDate: holiday.end_date.split('T')[0],     // Remove T00:00:00
//             holiday: holiday.event_name,
//             type: holiday.is_publish === 1 ? 'Published' : 'Restricted'
//           }));
//           setHolidays(formattedData);
//         } else {
//           throw new Error("Received an unexpected data format from the server.");
//         }
//       } catch (err) {
//         console.error("Failed to fetch holidays:", err);
//         setError(err.response?.data?.message || err.message || "An error occurred while fetching holiday data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, []);

//   const filteredData = holidays.filter(holiday =>
//     holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     holiday.startDate.includes(searchTerm) ||
//     holiday.endDate.includes(searchTerm) ||
//     holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEntriesChange = (event) => {
//     setEntries(event.target.value);
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalColumns = 5;

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>Holidays</Typography>
//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel id="entries-select-label">Show</InputLabel>
//             <Select
//               labelId="entries-select-label"
//               id="entries-select"
//               value={entries}
//               label="Show"
//               onChange={handleEntriesChange}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </Box>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Sr No</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>START DATE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>END DATE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>HOLIDAY</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>TYPE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : error ? (
//                 <TableRow>
//                   <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                     <Alert severity="error">{error}</Alert>
//                   </TableCell>
//                 </TableRow>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((holiday, index) => (
//                   <TableRow hover key={holiday.id}>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{holiday.startDate}</TableCell>
//                     <TableCell>{holiday.endDate}</TableCell>
//                     <TableCell>{holiday.holiday}</TableCell>
//                     <TableCell>
//                       <Box sx={{
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: '16px',
//                         display: 'inline-block',
//                         color: 'white',
//                         backgroundColor: holiday.type === 'Published' ? 'success.main' : 'warning.main',
//                         fontSize: '0.75rem',
//                         fontWeight: 'bold',
//                         textAlign: 'center',
//                         minWidth: '80px',
//                         border: '1px solid',
//                         borderColor: holiday.type === 'Published' ? 'success.main' : 'warning.main',
//                       }}>
//                         {holiday.type}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                     <Typography>No holidays found.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//           <Typography variant="body2" sx={{ mr: 2 }}>
//             Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} entries
//           </Typography>
//           <Button onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0 || loading}>Previous</Button>
//           <Button onClick={(e) => handleChangePage(e, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1 || loading}>Next</Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   CircularProgress,
//   Alert,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
// } from '@mui/material';
// import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//   },
// });

// const TableRowsSkeleton = ({ rowsNum }) => {
//   return [...Array(rowsNum)].map((_, index) => (
//     <TableRow key={index}>
//       <TableCell><Skeleton variant="text" /></TableCell>
//       <TableCell><Skeleton variant="text" /></TableCell>
//       <TableCell><Skeleton variant="text" /></TableCell>
//       <TableCell><Skeleton variant="text" /></TableCell>
//       <TableCell><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
//     </TableRow>
//   ));
// };

// export default function HolidayViewWrapper() {
//   return (
//     <ThemeProvider theme={theme}>
//       <HolidayView />
//     </ThemeProvider>
//   );
// }

// function HolidayView() {
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');

//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchHolidays = async () => {
//       const employeeId = localStorage.getItem('loggedInUser');

//       if (!employeeId) {
//         setError("Employee ID not found. Please log in to view holidays.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`);
//         const apiData = response.data;

//         if (Array.isArray(apiData)) {
//           const formattedData = apiData.map(holiday => ({
//             id: holiday.holiday_id,
//             startDate: holiday.start_date.split('T')[0],
//             endDate: holiday.end_date.split('T')[0],
//             holiday: holiday.event_name,
//             type: holiday.is_publish === 1 ? 'Published' : 'Restricted'
//           }));
//           setHolidays(formattedData);
//         } else {
//           throw new Error("Received an unexpected data format from the server.");
//         }
//       } catch (err) {
//         console.error("Failed to fetch holidays:", err);
//         setError(err.response?.data?.message || err.message || "An error occurred while fetching holiday data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = holidays.filter(holiday =>
//     holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     holiday.startDate.includes(searchTerm) ||
//     holiday.endDate.includes(searchTerm) ||
//     holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalColumns = 5;

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
//         Holidays
//       </Typography>

//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 2,
//         flexDirection: isMobile ? 'column' : 'row',
//         gap: 2,
//       }}>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             backgroundColor: '#8C257C',
//             color: '#FFFFFF',
//             '&:hover': {
//               backgroundColor: '#6d1d60',
//             },
//             alignSelf: isMobile ? 'stretch' : 'auto',
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{
//             width: isMobile ? '100%' : 'auto',
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Sr No</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>START DATE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>END DATE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>HOLIDAY</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>TYPE</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRowsSkeleton rowsNum={rowsPerPage} />
//             ) : error ? (
//               <TableRow>
//                 <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                   <Alert severity="error">{error}</Alert>
//                 </TableCell>
//               </TableRow>
//             ) : paginatedData.length > 0 ? (
//               paginatedData.map((holiday, index) => (
//                 <TableRow hover key={holiday.id}>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.startDate}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.endDate}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.holiday}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>
//                     <Box sx={{
//                       px: 1.5,
//                       py: 0.5,
//                       borderRadius: '16px',
//                       display: 'inline-block',
//                       color: 'white',
//                       backgroundColor: holiday.type === 'Published' ? 'success.main' : 'warning.main',
//                       fontSize: '0.75rem',
//                       fontWeight: 'bold',
//                       textAlign: 'center',
//                       minWidth: '80px',
//                       border: '1px solid',
//                       borderColor: holiday.type === 'Published' ? 'success.dark' : 'warning.dark',
//                     }}>
//                       {holiday.type}
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
//                   <Typography>No holidays found.</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: isMobile ? 'column' : 'row',
//         mt: 2,
//         gap: 2,
//         '& .MuiTablePagination-root': {
//             color: '#8C257C',
//         },
//         '& .MuiSvgIcon-root': {
//             color: '#8C257C',
//         }
//       }}>
//         <Typography variant="body2" color="text.secondary">
//           Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredData.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//         />
//       </Box>
//     </Box>
//   );
// }




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Alert,
  TablePagination,
  Skeleton,
  useTheme,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';


const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
      dark: '#6d1d60',
    },
    secondary: {
      main: '#F58E35',
    },
  },
});

const TableRowsSkeleton = ({ rowsNum }) => {
  return [...Array(rowsNum)].map((_, index) => (
    <TableRow key={index}>
      <TableCell><Skeleton variant="text" /></TableCell>
      <TableCell><Skeleton variant="text" /></TableCell>
      <TableCell><Skeleton variant="text" /></TableCell>
      <TableCell><Skeleton variant="text" /></TableCell>
      <TableCell><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
    </TableRow>
  ));
};

export default function HolidayViewWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <HolidayView />
    </ThemeProvider>
  );
}

function HolidayView() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchHolidays = async () => {
      const employeeId = localStorage.getItem('loggedInUser');

      if (!employeeId) {
        setError("Employee ID not found. Please log in to view holidays.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`);
        const apiData = response.data;

        if (Array.isArray(apiData)) {
          const formattedData = apiData.map(holiday => ({
            id: holiday.holiday_id,
            startDate: holiday.start_date.split('T')[0],
            endDate: holiday.end_date.split('T')[0],
            holiday: holiday.event_name,
            type: holiday.is_publish === 1 ? 'Published' : 'Restricted'
          }));
          setHolidays(formattedData);
        } else {
          throw new Error("Received an unexpected data format from the server.");
        }
      } catch (err) {
        console.error("Failed to fetch holidays:", err);
        setError(err.response?.data?.message || err.message || "An error occurred while fetching holiday data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = holidays.filter(holiday =>
    holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.startDate.includes(searchTerm) ||
    holiday.endDate.includes(searchTerm) ||
    holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalColumns = 5;

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 4 }}>
        Holidays
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: isMobile ? '100%' : 'auto',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ backgroundColor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Sr No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>START DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>END DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>HOLIDAY</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>TYPE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsSkeleton rowsNum={rowsPerPage} />
            ) : error ? (
              <TableRow>
                <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
                  <Alert severity="error">{error}</Alert>
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((holiday, index) => (
                <TableRow hover key={holiday.id}>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.startDate}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.endDate}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.holiday}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>
                    <Box sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '16px',
                      display: 'inline-block',
                      color: 'white',
                      backgroundColor: holiday.type === 'Published' ? 'success.main' : 'warning.main',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      minWidth: '80px',
                      border: '1px solid',
                      borderColor: holiday.type === 'Published' ? 'success.dark' : 'warning.dark',
                    }}>
                      {holiday.type}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
                  <Typography>No holidays found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        mt: 2,
        gap: 2,
        '& .MuiTablePagination-root': {
            color: '#8C257C',
        },
        '& .MuiSvgIcon-root': {
            color: '#8C257C',
        }
      }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 25]}
        />
      </Box>
    </Box>
  );
}