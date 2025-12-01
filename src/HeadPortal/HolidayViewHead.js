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









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Alert,
  InputAdornment, Skeleton, TablePagination, useTheme, useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// To test this component, you can manually set the employeeId in your browser's developer console:
// localStorage.setItem('loggedInUser', 'V0921');

export default function HolidayViewHead() {
  // State for API data, loading, and errors
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for table controls
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Helper function to format date to dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
            startDate: formatDate(holiday.start_date),
            endDate: formatDate(holiday.end_date),
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
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#8C257C' }}>
        Holidays
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: isMobile ? '100%' : 'auto' }}
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
          <TableHead sx={{ bgcolor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR NO.</TableCell>
               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>HOLIDAY</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>START DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>END DATE</TableCell>
             
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>TYPE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(totalColumns)].map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={totalColumns} align="center" sx={{ py: 4 }}>
                  <Alert severity="error" sx={{ justifyContent: 'center' }}>{error}</Alert>
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((holiday, index) => (
                <TableRow hover key={holiday.id}>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.holiday}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.startDate}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.endDate}</TableCell>
                  
                  <TableCell sx={{ fontSize: '0.95rem' }}>
                    <Box sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '16px',
                      display: 'inline-block',
                      color: 'white',
                      bgcolor: holiday.type === 'Published' ? 'success.main' : 'warning.main',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      minWidth: '80px',
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '& .MuiSvgIcon-root': {
            color: '#8C257C',
          },
        }}
      />
    </Box>
  );
}