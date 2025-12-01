


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert
// } from '@mui/material';

// export default function MonthlyReport() {
//   // State for form inputs
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');

//   // State for data and UI
//   const [employees, setEmployees] = useState([]); // To store fetched employees
//   const [months, setMonths] = useState([]); // To store generated months
//   const [reportData, setReportData] = useState(null); // To store API response
//   const [isLoading, setIsLoading] = useState(false); // To handle loading state for report search
//   const [error, setError] = useState(null); // To handle errors

//   // Effect to fetch the list of employees on component mount
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         // As requested, the employee ID is variable, taken from a source like localStorage.
//         // For this example, we'll use the provided ID 'V0921'.
//         // In a real app: const loggedInUserId = localStorage.getItem('userId');
//         const loggedInUserId = 'V0921'; 

//         if (!loggedInUserId) {
//           setError('User ID not found. Cannot load employee list.');
//           return;
//         }

//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`);

//         // Assuming the API returns an array of objects like [{ emp_id, emp_name }]
//         setEmployees(response.data);
//       } catch (err) {
//         console.error("Failed to fetch employees:", err);
//         setError('Failed to load employee list. Please try refreshing the page.');
//       }
//     };

//     fetchEmployees();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // Effect to generate available months
//   useEffect(() => {
//     const generateMonths = () => {
//       const availableMonths = [];
//       const currentDate = new Date();
//       let year = currentDate.getFullYear();
//       let month = currentDate.getMonth();

//       // Generate the last 12 months including the current one
//       for (let i = 0; i < 12; i++) {
//         const date = new Date(year, month - i, 1);
//         const monthStr = String(date.getMonth() + 1).padStart(2, '0');
//         const yearStr = date.getFullYear();
//         availableMonths.push(`${yearStr}-${monthStr}`);
//       }

//       setMonths(availableMonths);
//       // Set default selected month to the current month
//       if (availableMonths.length > 0) {
//         setSelectedMonth(availableMonths[0]);
//       }
//     };

//     generateMonths();
//   }, []);

//   // Handler for the "Search" button click
//   const handleSearch = async () => {
//     if (!selectedEmployee || !selectedMonth) {
//       setError('Please select both an employee and a month to generate the report.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setReportData(null); // Clear previous results

//     try {
//       const payload = {
//         employee_id: selectedEmployee,
//         month: selectedMonth, // Format is "YYYY-MM"
//       };

//       const response = await axios.post(
//         'https://tdtlworld.com/hrms-backend/emp_monthly_report/',
//         payload
//       );

//       setReportData(response.data);
//     } catch (err) {
//       console.error("Failed to fetch monthly report:", err);
//       setError('An error occurred while fetching the report. Please try again.');
//       setReportData([]); // Set to empty array to show "No data" message
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to get color based on attendance status
//   const getStatusColor = (status) => {
//     if (!status) return '#757575'; // Default Grey
//     const lowerStatus = status.toLowerCase();
//     if (lowerStatus.includes('present')) return '#4CAF50'; // Green for Present
//     if (lowerStatus.includes('absent')) return '#F44336'; // Red for Absent
//     if (lowerStatus.includes('holiday')) return '#FF9800'; // Orange for Holiday
//     if (lowerStatus.includes('off')) return '#2196F3'; // Blue for Off days
//     if (lowerStatus.includes('leave')) return '#673AB7'; // Purple for Leave
//     return '#757575'; // Default Grey for other statuses
//   };

//   // Helper function to format month string for display (e.g., "October 2024")
//   const formatMonthForDisplay = (monthStr) => {
//     if (!monthStr) return '';
//     const [year, month] = monthStr.split('-');
//     return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
//   };

//   return (
//     <Box sx={{ p: 3, fontFamily: 'sans-serif' }}>
//       <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
//         View Monthly Report
//       </Typography>

//       {/* Form Controls */}
//       <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center' }}>
//         {/* Employee Select */}
//         <Select
//           value={selectedEmployee}
//           onChange={(e) => setSelectedEmployee(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: 'white' }}
//         >
//           <MenuItem value="" disabled><em>Select Employee</em></MenuItem>
//           {employees.length > 0 ? (
//             employees.map((emp) => (
//               // Assuming API returns emp_id and emp_name
//               <MenuItem key={emp.emp_id} value={emp.emp_id}>{emp.emp_name}</MenuItem>
//             ))
//           ) : (
//             <MenuItem disabled>Loading employees...</MenuItem>
//           )}
//         </Select>

//         {/* Month Select */}
//         <Select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: 'white' }}
//         >
//           <MenuItem value="" disabled><em>Select Month</em></MenuItem>
//           {months.map((month) => (
//             <MenuItem key={month} value={month}>
//               {formatMonthForDisplay(month)}
//             </MenuItem>
//           ))}
//         </Select>

//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           disabled={isLoading || !selectedEmployee}
//           sx={{ px: 5, py: 1.5, minWidth: '120px' }}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
//         </Button>
//       </Box>

//       {/* Error Display */}
//       {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

//       {/* Report Table */}
//       {reportData && (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CLOCK IN</TableCell>
//                 <TableCell>CLOCK OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.length > 0 ? (
//                 reportData.map((row, index) => (
//                   <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                     <TableCell>{row.day || '--'}</TableCell>
//                     <TableCell>{row.date || '--'}</TableCell>
//                     <TableCell>
//                       <Typography
//                         component="span"
//                         sx={{
//                           color: 'white',
//                           bgcolor: getStatusColor(row.status),
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: '12px',
//                           fontSize: '0.75rem',
//                           fontWeight: 'bold',
//                           display: 'inline-block',
//                           whiteSpace: 'nowrap',
//                         }}
//                       >
//                         {row.status || 'N/A'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{row.clock_in || '--'}</TableCell>
//                     <TableCell>{row.clock_out || '--'}</TableCell>
//                     <TableCell>{row.total_work || '--'}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                     No report data found for the selected criteria.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert
// } from '@mui/material';

// export default function MonthlyReport() {
//   // State for form inputs
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');

//   // State for data and UI
//   const [employees, setEmployees] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [reportData, setReportData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Effect to fetch the list of employees using fetch and Authorization header
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         // 1. Get credentials from localStorage
//         const loggedInUserId = localStorage.getItem('loggedInUser');
//         const accessToken = localStorage.getItem('accessToken');

//         // 2. Validate that the credentials exist
//         if (!loggedInUserId || !accessToken) {
//           setError("User session details not found. Please log in again.");
//           return;
//         }

//         // 3. Construct the API URL and headers
//         const url = `https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`;
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         };

//         // 4. Make the API call using fetch
//         const response = await fetch(url, { method: 'GET', headers });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch employees. Server responded with status ${response.status}.`);
//         }

//         const data = await response.json();
//         // The data is [{"name":"Prasad Shinde","employee_id":"V0921"}]
//         setEmployees(data);

//       } catch (err) {
//         console.error("Error fetching employees:", err);
//         setError(err.message);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Effect to generate available months
//   useEffect(() => {
//     const generateMonths = () => {
//       const availableMonths = [];
//       const currentDate = new Date();
//       let year = currentDate.getFullYear();
//       let month = currentDate.getMonth();

//       for (let i = 0; i < 12; i++) {
//         const date = new Date(year, month - i, 1);
//         const monthStr = String(date.getMonth() + 1).padStart(2, '0');
//         const yearStr = date.getFullYear();
//         availableMonths.push(`${yearStr}-${monthStr}`);
//       }

//       setMonths(availableMonths);
//       if (availableMonths.length > 0) {
//         setSelectedMonth(availableMonths[0]);
//       }
//     };

//     generateMonths();
//   }, []);

//   // Handler for the "Search" button click
//   const handleSearch = async () => {
//     if (!selectedEmployee || !selectedMonth) {
//       setError('Please select both an employee and a month.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setReportData(null);

//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         throw new Error("User session token expired or not found. Please log in again.");
//       }

//       const url = 'https://tdtlworld.com/hrms-backend/emp_monthly_report/';
//       const payload = {
//         employee_id: selectedEmployee,
//         month: selectedMonth,
//       };
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch report. Server responded with status ${response.status}.`);
//       }

//       const data = await response.json();
//       setReportData(data);

//     } catch (err) {
//       console.error("Error fetching report:", err);
//       setError(err.message);
//       setReportData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper functions
//   const getStatusColor = (status) => {
//     if (!status) return '#757575';
//     const lowerStatus = status.toLowerCase();
//     if (lowerStatus.includes('present')) return '#4CAF50';
//     if (lowerStatus.includes('absent')) return '#F44336';
//     if (lowerStatus.includes('holiday')) return '#FF9800';
//     if (lowerStatus.includes('off')) return '#2196F3';
//     if (lowerStatus.includes('leave')) return '#673AB7';
//     return '#757575';
//   };

//   const formatMonthForDisplay = (monthStr) => {
//     if (!monthStr) return '';
//     const [year, month] = monthStr.split('-');
//     return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
//   };

//   return (
//     <Box sx={{ p: 3, fontFamily: 'sans-serif' }}>
//       <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
//         View Monthly Report
//       </Typography>

//       {/* Form Controls */}
//       <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center' }}>
//         <Select
//           value={selectedEmployee}
//           onChange={(e) => setSelectedEmployee(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: 'white' }}
//         >
//           <MenuItem value="" disabled><em>Select Employee</em></MenuItem>
//           {employees.length > 0 ? (
//             employees.map((emp) => (
//               // THE FIX IS HERE: using `emp.employee_id` for the key/value
//               // and `emp.name` for the display text, to match your API response.
//               <MenuItem key={emp.employee_id} value={emp.employee_id}>
//                 {emp.name}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem disabled>Loading employees...</MenuItem>
//           )}
//         </Select>

//         <Select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: 'white' }}
//         >
//           <MenuItem value="" disabled><em>Select Month</em></MenuItem>
//           {months.map((month) => (
//             <MenuItem key={month} value={month}>
//               {formatMonthForDisplay(month)}
//             </MenuItem>
//           ))}
//         </Select>

//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           disabled={isLoading || !selectedEmployee}
//           sx={{ px: 5, py: 1.5, minWidth: '120px' }}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
//         </Button>
//       </Box>

//       {/* Error Display */}
//       {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

//       {/* Report Table */}
//       {reportData && (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CLOCK IN</TableCell>
//                 <TableCell>CLOCK OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.length > 0 ? (
//                 reportData.map((row, index) => (
//                   <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                     <TableCell>{row.day || '--'}</TableCell>
//                     <TableCell>{row.date || '--'}</TableCell>
//                     <TableCell>
//                       <Typography
//                         component="span"
//                         sx={{
//                           color: 'white',
//                           bgcolor: getStatusColor(row.status),
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: '12px',
//                           fontSize: '0.75rem',
//                           fontWeight: 'bold',
//                           display: 'inline-block',
//                           whiteSpace: 'nowrap',
//                         }}
//                       >
//                         {row.status || 'N/A'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{row.clock_in || '--'}</TableCell>
//                     <TableCell>{row.clock_out || '--'}</TableCell>
//                     <TableCell>{row.total_work || '--'}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                     No report data found for the selected criteria.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert
// } from '@mui/material';

// // You can change this to any year you want the dropdown to start from.
// const START_YEAR = 2022;

// export default function MonthlyReportLM() {
//   // State for form inputs
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');

//   // State for data and UI
//   const [employees, setEmployees] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [reportData, setReportData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Effect to fetch the list of employees using fetch and Authorization header
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const loggedInUserId = localStorage.getItem('loggedInUser');
//         const accessToken = localStorage.getItem('accessToken');

//         if (!loggedInUserId || !accessToken) {
//           setError("User session details not found. Please log in again.");
//           return;
//         }

//         const url = `https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`;
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         };

//         const response = await fetch(url, { method: 'GET', headers });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch employees. Server responded with status ${response.status}.`);
//         }

//         const data = await response.json();
//         setEmployees(data);

//       } catch (err) {
//         console.error("Error fetching employees:", err);
//         setError(err.message);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Effect to generate all available months from a start year to the current month
//   useEffect(() => {
//     const generateMonths = () => {
//       const availableMonths = [];
//       const currentDate = new Date();
//       const currentYear = currentDate.getFullYear();
//       const currentMonthIndex = currentDate.getMonth(); // 0-indexed (0 for Jan)

//       // Loop from the current year down to the defined START_YEAR
//       for (let year = currentYear; year >= START_YEAR; year--) {
//         // Determine the last month for the current year in the loop
//         // If it's the current year, start from the current month.
//         // If it's a past year, start from December (index 11).
//         const startMonthIndex = (year === currentYear) ? currentMonthIndex : 11;

//         // Loop through the months of the year in reverse
//         for (let monthIndex = startMonthIndex; monthIndex >= 0; monthIndex--) {
//           const monthNumber = monthIndex + 1; // Convert 0-indexed to 1-indexed
//           const monthStr = String(monthNumber).padStart(2, '0');
//           availableMonths.push(`${year}-${monthStr}`);
//         }
//       }

//       setMonths(availableMonths);
//       // Set the default selection to the most recent month
//       if (availableMonths.length > 0) {
//         setSelectedMonth(availableMonths[0]);
//       }
//     };

//     generateMonths();
//   }, []);

//   // Handler for the "Search" button click
//   const handleSearch = async () => {
//     if (!selectedEmployee || !selectedMonth) {
//       setError('Please select both an employee and a month.');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setReportData(null);

//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!accessToken) {
//         throw new Error("User session token expired or not found. Please log in again.");
//       }

//       const url = 'https://tdtlworld.com/hrms-backend/emp_monthly_report/';
//       const payload = {
//         employee_id: selectedEmployee,
//         month: selectedMonth,
//       };
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//       };

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch report. Server responded with status ${response.status}.`);
//       }

//       const data = await response.json();
//       setReportData(data);

//     } catch (err) {
//       console.error("Error fetching report:", err);
//       setError(err.message);
//       setReportData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper functions
//   const getStatusColor = (status) => {
//     if (!status) return '#757575';
//     const lowerStatus = status.toLowerCase();
//     if (lowerStatus.includes('present')) return '#4CAF50';
//     if (lowerStatus.includes('absent')) return '#F44336';
//     if (lowerStatus.includes('holiday')) return '#FF9800';
//     if (lowerStatus.includes('off')) return '#2196F3';
//     if (lowerStatus.includes('leave')) return '#673AB7';
//     return '#757575';
//   };

//   const formatMonthForDisplay = (monthStr) => {
//     if (!monthStr) return '';
//     const [year, month] = monthStr.split('-');
//     return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
//   };

//   return (
//     <Box sx={{ p: 3, fontFamily: 'sans-serif' }}>
//       <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
//         View Monthly Report
//       </Typography>

//       {/* Form Controls */}
//       <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center' }}>
//         <Select
//           value={selectedEmployee}
//           onChange={(e) => setSelectedEmployee(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: 'white' }}
//         >
//           <MenuItem value="" disabled><em>Select Employee</em></MenuItem>
//           {employees.length > 0 ? (
//             employees.map((emp) => (
//               <MenuItem key={emp.employee_id} value={emp.employee_id}>
//                 {emp.name}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem disabled>Loading employees...</MenuItem>
//           )}
//         </Select>

//         <Select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: 'white' }}
//         >
//           <MenuItem value="" disabled><em>Select Month</em></MenuItem>
//           {months.map((month) => (
//             <MenuItem key={month} value={month}>
//               {formatMonthForDisplay(month)}
//             </MenuItem>
//           ))}
//         </Select>

//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           disabled={isLoading || !selectedEmployee}
//           sx={{ px: 5, py: 1.5, minWidth: '120px' }}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
//         </Button>
//       </Box>

//       {/* Error Display */}
//       {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

//       {/* Report Table */}
//       {reportData && (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' } }}>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CLOCK IN</TableCell>
//                 <TableCell>CLOCK OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.length > 0 ? (
//                 reportData.map((row, index) => (
//                   <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
//                     <TableCell>{row.day || '--'}</TableCell>
//                     <TableCell>{row.date || '--'}</TableCell>
//                     <TableCell>
//                       <Typography
//                         component="span"
//                         sx={{
//                           color: 'white',
//                           bgcolor: getStatusColor(row.status),
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: '12px',
//                           fontSize: '0.75rem',
//                           fontWeight: 'bold',
//                           display: 'inline-block',
//                           whiteSpace: 'nowrap',
//                         }}
//                       >
//                         {row.status || 'N/A'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{row.clock_in || '--'}</TableCell>
//                     <TableCell>{row.clock_out || '--'}</TableCell>
//                     <TableCell>{row.total_work || '--'}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                     No report data found for the selected criteria.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }///


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';

// You can change this to any year you want the dropdown to start from.
const START_YEAR = 2022;

// --- HELPER FUNCTIONS ---

const formatTime = (timeString) => {
  if (!timeString || timeString === '00:00' || timeString === '00:00:00') {
    return null;
  }
  try {
    const today = new Date();
    const [hours, minutes] = timeString.split(':');
    today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    return today.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  } catch (error) {
    console.error("Could not format time:", timeString, error);
    return null;
  }
};

const getStatusColor = (status) => {
  if (!status) return '#757575';
  const lowerStatus = status.toLowerCase();
  if (lowerStatus.includes('present')) return '#4CAF50';
  if (lowerStatus.includes('absent')) return '#F44336';
  if (lowerStatus.includes('holiday')) return '#FF9800';
  if (lowerStatus.includes('off')) return '#2196F3';
  if (lowerStatus.includes('leave')) return '#673AB7';
  return '#757575';
};

const formatMonthForDisplay = (monthStr) => {
  if (!monthStr) return '';
  const [year, month] = monthStr.split('-');
  return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
};

// --- UPDATED COMPONENT TO ALWAYS CENTER CONTENT ---
const ReportCell = ({ children, ...props }) => {
  const isEmpty = !children;

  return (
    <TableCell align="center" {...props}>
      {isEmpty ? (
        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          —
        </Typography>
      ) : (
        children
      )}
    </TableCell>
  );
};


export default function MonthlyReportLM() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [employees, setEmployees] = useState([]);
  const [months, setMonths] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const loggedInUserId = localStorage.getItem('loggedInUser');
        const accessToken = localStorage.getItem('accessToken');
        if (!loggedInUserId || !accessToken) {
          setError("User session details not found. Please log in again.");
          return;
        }
        const url = `https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        };
        const response = await fetch(url, { method: 'GET', headers });
        if (!response.ok) {
          throw new Error(`Failed to fetch employees. Server responded with status ${response.status}.`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err.message);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const generateMonths = () => {
      const availableMonths = [];
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonthIndex = currentDate.getMonth();
      for (let year = currentYear; year >= START_YEAR; year--) {
        const startMonthIndex = (year === currentYear) ? currentMonthIndex : 11;
        for (let monthIndex = startMonthIndex; monthIndex >= 0; monthIndex--) {
          const monthNumber = monthIndex + 1;
          const monthStr = String(monthNumber).padStart(2, '0');
          availableMonths.push(`${year}-${monthStr}`);
        }
      }
      setMonths(availableMonths);
      if (availableMonths.length > 0) {
        setSelectedMonth(availableMonths[0]);
      }
    };
    generateMonths();
  }, []);

  const handleSearch = async () => {
    if (!selectedEmployee || !selectedMonth) {
      setError('Please select both an employee and a month.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReportData(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error("User session token expired or not found. Please log in again.");
      }
      const url = 'https://tdtlworld.com/hrms-backend/emp_monthly_report/';
      const payload = { employee_id: selectedEmployee, month: selectedMonth };
      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` };
      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload) });
      if (!response.ok) {
        throw new Error(`Failed to fetch report. Server responded with status ${response.status}.`);
      }
      const data = await response.json();
      const fetchedData = data.data || [];
      const reversedData = fetchedData.slice().reverse();
      setReportData(reversedData);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(err.message);
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'sans-serif' }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
        View Monthly Report
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center' }}>
        <Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} displayEmpty fullWidth sx={{ bgcolor: 'white' }}>
          <MenuItem value="" disabled><em>Select Employee</em></MenuItem>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <MenuItem key={emp.employee_id} value={emp.employee_id}>{emp.name}</MenuItem>
            ))
          ) : (<MenuItem disabled>Loading employees...</MenuItem>)}
        </Select>
        <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} displayEmpty fullWidth sx={{ bgcolor: 'white' }}>
          <MenuItem value="" disabled><em>Select Month</em></MenuItem>
          {months.map((month) => (
            <MenuItem key={month} value={month}>{formatMonthForDisplay(month)}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleSearch} disabled={isLoading || !selectedEmployee} sx={{ px: 5, py: 1.5, minWidth: '120px' }}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </Button>
      </Box>

      {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

      {reportData && (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
          <Table stickyHeader>
            <TableHead>
              {/* --- UPDATED HEADER CELLS TO BE CENTERED --- */}
              <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' } }}>
                <TableCell align="center">SR. NO.</TableCell>
                <TableCell align="center">DAY</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center">PUNCH IN</TableCell>
                <TableCell align="center">PUNCH OUT</TableCell>
                <TableCell align="center">TOTAL WORK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.length > 0 ? (
                reportData.map((row, index) => (
                  <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                    <ReportCell>{index + 1}</ReportCell>
                    <ReportCell>{row.day}</ReportCell>
                    <ReportCell>{row.date}</ReportCell>
                    {/* --- UPDATED STATUS CELL TO BE CENTERED --- */}
                    <TableCell align="center">
                      <Typography component="span" sx={{ color: 'white', bgcolor: getStatusColor(row.status), px: 1.5, py: 0.5, borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {row.status || 'N/A'}
                      </Typography>
                    </TableCell>
                    <ReportCell>{formatTime(row.clock_in)}</ReportCell>
                    <ReportCell>{formatTime(row.clock_out)}</ReportCell>
                    <ReportCell>{row.total_work}</ReportCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    No report data found for the selected criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}