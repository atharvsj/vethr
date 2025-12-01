// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   Select,
// // //   MenuItem,
// // //   Paper,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow
// // // } from '@mui/material';


// // // export default function MonthlyReport() {
// // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // //   const [selectedMonth, setSelectedMonth] = useState('');
// // //   const [reportData, setReportData] = useState(null);
// // //   const [months, setMonths] = useState([]);

// // //   const employees = [
// // //     'Prasad Shinde',
// // //     'Anagha Dolase',
// // //     'QADIRULLA HUSSAINI SYED',
// // //     // Add more employees as needed
// // //   ];

// // //   // Generate available months (current and past months)
// // //   useEffect(() => {
// // //     const generateMonths = () => {
// // //       const currentDate = new Date();
// // //       const currentYear = currentDate.getFullYear();
// // //       const currentMonth = currentDate.getMonth();
// // //       const availableMonths = [];

// // //       // Generate months for current year up to current month
// // //       for (let month = 0; month <= currentMonth; month++) {
// // //         availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
// // //       }

// // //       // Add months from previous year if needed
// // //       const previousYear = currentYear - 1;
// // //       for (let month = 11; month > currentMonth; month--) {
// // //         availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
// // //       }

// // //       setMonths(availableMonths);
// // //       // Set default to current month
// // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // //     };

// // //     generateMonths();
// // //   }, []);

// // //   const mockData = [
// // //     { day: 'Tuesday', date: '2024-10-01', status: 'Present', clockIn: '09:48 am', clockOut: '05:20 pm', totalWork: '8:67:39' },
// // //     { day: 'Wednesday', date: '2024-10-02', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
// // //     { day: 'Thursday', date: '2024-10-03', status: 'Present', clockIn: '09:22 am', clockOut: '06:38 pm', totalWork: '8:34' },
// // //     { day: 'Friday', date: '2024-10-04', status: 'Casual Leave (CL)', clockIn: '', clockOut: '', totalWork: '' },
// // //     { day: 'Saturday', date: '2024-10-05', status: 'Absent', clockIn: '', clockOut: '', totalWork: '' },
// // //     { day: 'Sunday', date: '2024-10-06', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
// // //     { day: 'Monday', date: '2024-10-07', status: 'Present', clockIn: '09:27 am', clockOut: '06:44 pm', totalWork: '4:57' },
// // //     { day: 'Tuesday', date: '2024-10-08', status: 'Present + Casual Leave (CL)', clockIn: '09:35 am', clockOut: '06:57 pm', totalWork: '8:36' },
// // //     { day: 'Wednesday', date: '2024-10-09', status: 'Absent', clockIn: '', clockOut: '', totalWork: '' },
// // //     { day: 'Thursday', date: '2024-10-10', status: 'Present', clockIn: '02:19 pm', clockOut: '01:41 pm', totalWork: '6:48:11' },
// // //     { day: 'Friday', date: '2024-10-11', status: 'Present', clockIn: '07:55 am', clockOut: '08:10 pm', totalWork: '12:15' },
// // //     { day: 'Saturday', date: '2024-10-12', status: 'Off Saturday', clockIn: '', clockOut: '', totalWork: '' },
// // //     { day: 'Sunday', date: '2024-10-13', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
// // //   ];

// // //   const handleSearch = () => {
// // //     if (selectedEmployee && selectedMonth) {
// // //       setReportData(mockData);
// // //     } else {
// // //       alert('Please select both employee and month');
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status.toLowerCase()) {
// // //       case 'present':
// // //         return '#4CAF50';
// // //       case 'absent':
// // //         return '#F44336';
// // //       case 'holiday':
// // //         return '#FF9800';
// // //       case 'off saturday':
// // //         return '#2196F3';
// // //       default:
// // //         return '#757575';
// // //     }
// // //   };

// // //   const formatMonth = (monthStr) => {
// // //     const [year, month] = monthStr.split('-');
// // //     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
// // //   };

// // //   return (
// // //     <Box sx={{ p: 3 }}>
// // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // //       <Box sx={{ 
// // //         display: 'flex', 
// // //         gap: 2, 
// // //         mb: 4,
// // //         alignItems: 'center'
// // //       }}>
// // //         <Box sx={{ 
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           gap: 1,
// // //           bgcolor: '#f5f5f5',
// // //           p: 1,
// // //           borderRadius: 1,
// // //           flex: 1
// // //         }}>
// // //           <Typography sx={{ color: '#666', minWidth: 80 }}>Employee</Typography>
// // //           <Select
// // //             value={selectedEmployee}
// // //             onChange={(e) => setSelectedEmployee(e.target.value)}
// // //             sx={{ 
// // //               flex: 1,
// // //               bgcolor: 'white',
// // //               '& .MuiSelect-select': { py: 1 }
// // //             }}
// // //             displayEmpty
// // //           >
// // //             <MenuItem value="" disabled>Select Employee</MenuItem>
// // //             {employees.map((emp) => (
// // //               <MenuItem key={emp} value={emp}>{emp}</MenuItem>
// // //             ))}
// // //           </Select>
// // //         </Box>

// // //         <Box sx={{ 
// // //           display: 'flex',
// // //           alignItems: 'center',
// // //           gap: 1,
// // //           bgcolor: '#f5f5f5',
// // //           p: 1,
// // //           borderRadius: 1,
// // //           flex: 1
// // //         }}>
// // //           <Typography sx={{ color: '#666', minWidth: 80 }}>Select Month</Typography>
// // //           <Select
// // //             value={selectedMonth}
// // //             onChange={(e) => setSelectedMonth(e.target.value)}
// // //             sx={{ 
// // //               flex: 1,
// // //               bgcolor: 'white',
// // //               '& .MuiSelect-select': { py: 1 }
// // //             }}
// // //             displayEmpty
// // //           >
// // //             <MenuItem value="" disabled>Select Month</MenuItem>
// // //             {months.map((month) => (
// // //               <MenuItem key={month} value={month}>
// // //                 {formatMonth(month)}
// // //               </MenuItem>
// // //             ))}
// // //           </Select>
// // //         </Box>

// // //         <Button 
// // //           variant="contained"
// // //           onClick={handleSearch}
// // //           sx={{ 
// // //             px: 4,
// // //             py: 1,
// // //             bgcolor: '#1976d2',
// // //             '&:hover': { bgcolor: '#1565c0' }
// // //           }}
// // //         >
// // //           Search
// // //         </Button>
// // //       </Box>

// // //       {reportData && (
// // //         <TableContainer component={Paper} sx={{ mt: 2 }}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// // //                 <TableCell>DAY</TableCell>
// // //                 <TableCell>DATE</TableCell>
// // //                 <TableCell>STATUS</TableCell>
// // //                 <TableCell>CLOCK IN</TableCell>
// // //                 <TableCell>CLOCK OUT</TableCell>
// // //                 <TableCell>TOTAL WORK</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {reportData.map((row, index) => (
// // //                 <TableRow key={index}>
// // //                   <TableCell>{row.day}</TableCell>
// // //                   <TableCell>{row.date}</TableCell>
// // //                   <TableCell>
// // //                     <Typography 
// // //                       sx={{ 
// // //                         color: getStatusColor(row.status),
// // //                         fontWeight: 500
// // //                       }}
// // //                     >
// // //                       {row.status}
// // //                     </Typography>
// // //                   </TableCell>
// // //                   <TableCell>{row.clockIn}</TableCell>
// // //                   <TableCell>{row.clockOut}</TableCell>
// // //                   <TableCell>{row.totalWork}</TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}
// // //     </Box>
// // //   );
// // // }


// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Button,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   Paper,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow
// // // // // // // } from '@mui/material';
// // // // // // // import axios from 'axios';

// // // // // // // export default function MonthlyReport() {
// // // // // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // // // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // // // // //   const [reportData, setReportData] = useState(null);
// // // // // // //   const [months, setMonths] = useState([]);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const employees = [
// // // // // // //     'Prasad Shinde',
// // // // // // //   ];

// // // // // // //   useEffect(() => {
// // // // // // //     const generateMonths = () => {
// // // // // // //       const currentDate = new Date();
// // // // // // //       const currentYear = currentDate.getFullYear();
// // // // // // //       const currentMonth = currentDate.getMonth();
// // // // // // //       const availableMonths = [];

// // // // // // //       for (let month = 0; month <= currentMonth; month++) {
// // // // // // //         availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       const previousYear = currentYear - 1;
// // // // // // //       for (let month = 11; month > currentMonth; month--) {
// // // // // // //         availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       setMonths(availableMonths);
// // // // // // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // // // // // //     };

// // // // // // //     generateMonths();
// // // // // // //   }, []);


// // // // // // //   const handleSearch = async () => {
// // // // // // //     if (!selectedEmployee || !selectedMonth) {
// // // // // // //       alert('Please select both employee and month');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const token = 'your_api_token_here'; // Replace with actual token

// // // // // // //       const response = await axios.get('https://tdtlworld.com/hrms-backend/monthly-attendence/', {
// // // // // // //         headers: {
// // // // // // //           Authorization: `Bearer ${token}`
// // // // // // //         },
// // // // // // //         params: {
// // // // // // //           employee: selectedEmployee,
// // // // // // //           month: selectedMonth
// // // // // // //         }
// // // // // // //       });

// // // // // // //       setReportData(response.data || []);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error fetching data:', error);
// // // // // // //       alert('Failed to fetch report data. Please check your authentication.');
// // // // // // //     }
// // // // // // //     setLoading(false);
// // // // // // //   };


// // // // // // //   const getStatusColor = (status) => {
// // // // // // //     switch (status.toLowerCase()) {
// // // // // // //       case 'present': return '#4CAF50';
// // // // // // //       case 'absent': return '#F44336';
// // // // // // //       case 'holiday': return '#FF9800';
// // // // // // //       case 'off saturday': return '#2196F3';
// // // // // // //       default: return '#757575';
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const formatMonth = (monthStr) => {
// // // // // // //     const [year, month] = monthStr.split('-');
// // // // // // //     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box sx={{ p: 3 }}>
// // // // // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // // // // // //       <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
// // // // // // //         <Select
// // // // // // //           value={selectedEmployee}
// // // // // // //           onChange={(e) => setSelectedEmployee(e.target.value)}
// // // // // // //           displayEmpty
// // // // // // //         >
// // // // // // //           <MenuItem value="" disabled>Select Employee</MenuItem>
// // // // // // //           {employees.map((emp) => (
// // // // // // //             <MenuItem key={emp} value={emp}>{emp}</MenuItem>
// // // // // // //           ))}
// // // // // // //         </Select>

// // // // // // //         <Select
// // // // // // //           value={selectedMonth}
// // // // // // //           onChange={(e) => setSelectedMonth(e.target.value)}
// // // // // // //           displayEmpty
// // // // // // //         >
// // // // // // //           <MenuItem value="" disabled>Select Month</MenuItem>
// // // // // // //           {months.map((month) => (
// // // // // // //             <MenuItem key={month} value={month}>{formatMonth(month)}</MenuItem>
// // // // // // //           ))}
// // // // // // //         </Select>

// // // // // // //         <Button onClick={handleSearch} disabled={loading}>
// // // // // // //           {loading ? 'Loading...' : 'Search'}
// // // // // // //         </Button>
// // // // // // //       </Box>

// // // // // // //       {reportData && (
// // // // // // //         <TableContainer component={Paper}>
// // // // // // //           <Table>
// // // // // // //             <TableHead>
// // // // // // //               <TableRow>
// // // // // // //                 <TableCell>DAY</TableCell>
// // // // // // //                 <TableCell>DATE</TableCell>
// // // // // // //                 <TableCell>STATUS</TableCell>
// // // // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // // // //               </TableRow>
// // // // // // //             </TableHead>
// // // // // // //             <TableBody>
// // // // // // //               {reportData.map((row, index) => (
// // // // // // //                 <TableRow key={index}>
// // // // // // //                   <TableCell>{row.day}</TableCell>
// // // // // // //                   <TableCell>{row.date}</TableCell>
// // // // // // //                   <TableCell style={{ color: getStatusColor(row.status) }}>{row.status}</TableCell>
// // // // // // //                   <TableCell>{row.clockIn || '-'}</TableCell>
// // // // // // //                   <TableCell>{row.clockOut || '-'}</TableCell>
// // // // // // //                   <TableCell>{row.totalWork || '-'}</TableCell>
// // // // // // //                 </TableRow>
// // // // // // //               ))}
// // // // // // //             </TableBody>
// // // // // // //           </Table>
// // // // // // //         </TableContainer>
// // // // // // //       )}
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // }






// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Button,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   Paper,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow,
// // // // // // //   CircularProgress
// // // // // // // } from '@mui/material';

// // // // // // // export default function MonthlyReport() {
// // // // // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // // // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // // // // //   const [reportData, setReportData] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [months, setMonths] = useState([]);

// // // // // // //   const employees = ['Prasad Shinde'];

// // // // // // //   useEffect(() => {
// // // // // // //     const generateMonths = () => {
// // // // // // //       const currentDate = new Date();
// // // // // // //       const currentYear = currentDate.getFullYear();
// // // // // // //       const currentMonth = currentDate.getMonth();
// // // // // // //       const availableMonths = [];

// // // // // // //       for (let month = 0; month <= currentMonth; month++) {
// // // // // // //         availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       const previousYear = currentYear - 1;
// // // // // // //       for (let month = 11; month > currentMonth; month--) {
// // // // // // //         availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       setMonths(availableMonths);
// // // // // // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // // // // // //     };
// // // // // // //     generateMonths();
// // // // // // //   }, []);

// // // // // // //   const fetchReportData = async () => {
// // // // // // //     if (!selectedEmployee || !selectedMonth) {
// // // // // // //       alert('Please select both employee and month');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.get('https://tdtlworld.com/hrms-backend/monthly-attendence/', {
// // // // // // //         headers: {
// // // // // // //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NzM1OTI5LCJpYXQiOjE3Mzg3MzQxMjksImp0aSI6ImY2ZjMwZGNkZGMwNDRiNmViZWU2ZjAwNmFlZDEyYzU4IiwidXNlcl9pZCI6NDg5fQ.gdDVkdAV3NCIGy0PU4dolqYrQ2XIhUd9iWcAytJcaIY`
// // // // // // //         },
// // // // // // //         params: { employee: selectedEmployee, month: selectedMonth }
// // // // // // //       });
// // // // // // //       setReportData(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error fetching data:', error);
// // // // // // //       alert('Failed to fetch report data');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box sx={{ p: 3 }}>
// // // // // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // // // // // //       <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
// // // // // // //         <Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} displayEmpty sx={{ flex: 1 }}>
// // // // // // //           <MenuItem value="" disabled>Select Employee</MenuItem>
// // // // // // //           {employees.map((emp) => <MenuItem key={emp} value={emp}>{emp}</MenuItem>)}
// // // // // // //         </Select>

// // // // // // //         <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} displayEmpty sx={{ flex: 1 }}>
// // // // // // //           <MenuItem value="" disabled>Select Month</MenuItem>
// // // // // // //           {months.map((month) => <MenuItem key={month} value={month}>{month}</MenuItem>)}
// // // // // // //         </Select>

// // // // // // //         <Button variant="contained" onClick={fetchReportData} sx={{ px: 4 }}>Search</Button>
// // // // // // //       </Box>

// // // // // // //       {loading ? <CircularProgress /> : reportData && (
// // // // // // //         <TableContainer component={Paper}>
// // // // // // //           <Table>
// // // // // // //             <TableHead>
// // // // // // //               <TableRow>
// // // // // // //                 <TableCell>DAY</TableCell>
// // // // // // //                 <TableCell>DATE</TableCell>
// // // // // // //                 <TableCell>STATUS</TableCell>
// // // // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // // // //               </TableRow>
// // // // // // //             </TableHead>
// // // // // // //             <TableBody>
// // // // // // //               {reportData.map((row, index) => (
// // // // // // //                 <TableRow key={index}>
// // // // // // //                   <TableCell>{row.day}</TableCell>
// // // // // // //                   <TableCell>{row.date}</TableCell>
// // // // // // //                   <TableCell>{row.status}</TableCell>
// // // // // // //                   <TableCell>{row.clockIn || 'N/A'}</TableCell>
// // // // // // //                   <TableCell>{row.clockOut || 'N/A'}</TableCell>
// // // // // // //                   <TableCell>{row.totalWork || 'N/A'}</TableCell>
// // // // // // //                 </TableRow>
// // // // // // //               ))}
// // // // // // //             </TableBody>
// // // // // // //           </Table>
// // // // // // //         </TableContainer>
// // // // // // //       )}
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // }



// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Button,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   Paper,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow,
// // // // // // //   CircularProgress
// // // // // // // } from '@mui/material';

// // // // // // // export default function MonthlyReport() {
// // // // // // //   const [employees, setEmployees] = useState([]);
// // // // // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // // // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // // // // //   const [reportData, setReportData] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [months, setMonths] = useState([]);

// // // // // // //   useEffect(() => {
// // // // // // //     const fetchEmployees = async () => {
// // // // // // //       try {
// // // // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/employees/', {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NzM1OTI5LCJpYXQiOjE3Mzg3MzQxMjksImp0aSI6ImY2ZjMwZGNkZGMwNDRiNmViZWU2ZjAwNmFlZDEyYzU4IiwidXNlcl9pZCI6NDg5fQ.gdDVkdAV3NCIGy0PU4dolqYrQ2XIhUd9iWcAytJcaIY`
// // // // // // //           }
// // // // // // //         });
// // // // // // //         setEmployees(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error('Error fetching employees:', error);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     const fetchMonths = async () => {
// // // // // // //       try {
// // // // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/available-months/', {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NzM1OTI5LCJpYXQiOjE3Mzg3MzQxMjksImp0aSI6ImY2ZjMwZGNkZGMwNDRiNmViZWU2ZjAwNmFlZDEyYzU4IiwidXNlcl9pZCI6NDg5fQ.gdDVkdAV3NCIGy0PU4dolqYrQ2XIhUd9iWcAytJcaIY`
// // // // // // //           }
// // // // // // //         });
// // // // // // //         setMonths(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error('Error fetching months:', error);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchEmployees();
// // // // // // //     fetchMonths();
// // // // // // //   }, []);

// // // // // // //   const fetchReportData = async () => {
// // // // // // //     if (!selectedEmployee || !selectedMonth) {
// // // // // // //       alert('Please select both employee and month');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.get('https://tdtlworld.com/hrms-backend/monthly-attendence/', {
// // // // // // //         headers: {
// // // // // // //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4NzM1OTI5LCJpYXQiOjE3Mzg3MzQxMjksImp0aSI6ImY2ZjMwZGNkZGMwNDRiNmViZWU2ZjAwNmFlZDEyYzU4IiwidXNlcl9pZCI6NDg5fQ.gdDVkdAV3NCIGy0PU4dolqYrQ2XIhUd9iWcAytJcaIY`
// // // // // // //         },
// // // // // // //         params: { employee: selectedEmployee, month: selectedMonth }
// // // // // // //       });
// // // // // // //       setReportData(response.data);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error fetching data:', error);
// // // // // // //       alert('Failed to fetch report data');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box sx={{ p: 3 }}>
// // // // // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // // // // // //       <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
// // // // // // //         <Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} displayEmpty sx={{ flex: 1 }}>
// // // // // // //           <MenuItem value="" disabled>Select Employee</MenuItem>
// // // // // // //           {employees.map((emp) => <MenuItem key={emp.id} value={emp.name}>{emp.name}</MenuItem>)}
// // // // // // //         </Select>

// // // // // // //         <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} displayEmpty sx={{ flex: 1 }}>
// // // // // // //           <MenuItem value="" disabled>Select Month</MenuItem>
// // // // // // //           {months.map((month) => <MenuItem key={month} value={month}>{month}</MenuItem>)}
// // // // // // //         </Select>

// // // // // // //         <Button variant="contained" onClick={fetchReportData} sx={{ px: 4 }}>Search</Button>
// // // // // // //       </Box>

// // // // // // //       {loading ? <CircularProgress /> : reportData && (
// // // // // // //         <TableContainer component={Paper}>
// // // // // // //           <Table>
// // // // // // //             <TableHead>
// // // // // // //               <TableRow>
// // // // // // //                 <TableCell>DAY</TableCell>
// // // // // // //                 <TableCell>DATE</TableCell>
// // // // // // //                 <TableCell>STATUS</TableCell>
// // // // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // // // //               </TableRow>
// // // // // // //             </TableHead>
// // // // // // //             <TableBody>
// // // // // // //               {reportData.map((row, index) => (
// // // // // // //                 <TableRow key={index}>
// // // // // // //                   <TableCell>{row.day}</TableCell>
// // // // // // //                   <TableCell>{row.date}</TableCell>
// // // // // // //                   <TableCell>{row.status}</TableCell>
// // // // // // //                   <TableCell>{row.clockIn || 'N/A'}</TableCell>
// // // // // // //                   <TableCell>{row.clockOut || 'N/A'}</TableCell>
// // // // // // //                   <TableCell>{row.totalWork || 'N/A'}</TableCell>
// // // // // // //                 </TableRow>
// // // // // // //               ))}
// // // // // // //             </TableBody>
// // // // // // //           </Table>
// // // // // // //         </TableContainer>
// // // // // // //       )}
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // }







// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Button,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   Paper,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow
// // // // // // // } from '@mui/material';

// // // // // // // export default function MonthlyReport() {
// // // // // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // // // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // // // // //   const [reportData, setReportData] = useState(null);
// // // // // // //   const [months, setMonths] = useState([]);

// // // // // // //   const employees = [
// // // // // // //     'Prasad Shinde',
// // // // // // //     // Add more employees as needed
// // // // // // //   ];

// // // // // // //   // Generate available months (current and past months)
// // // // // // //   useEffect(() => {
// // // // // // //     const generateMonths = () => {
// // // // // // //       const currentDate = new Date();
// // // // // // //       const currentYear = currentDate.getFullYear();
// // // // // // //       const currentMonth = currentDate.getMonth();
// // // // // // //       const availableMonths = [];

// // // // // // //       // Generate months for current year up to current month
// // // // // // //       for (let month = 0; month <= currentMonth; month++) {
// // // // // // //         availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       // Add months from previous year if needed
// // // // // // //       const previousYear = currentYear - 1;
// // // // // // //       for (let month = 11; month > currentMonth; month--) {
// // // // // // //         availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       setMonths(availableMonths);
// // // // // // //       // Set default to current month
// // // // // // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // // // // // //     };

// // // // // // //     generateMonths();
// // // // // // //   }, []);

// // // // // // //   const handleSearch = async () => {
// // // // // // //     if (selectedEmployee && selectedMonth) {
// // // // // // //       try {
// // // // // // //         const accessToken = localStorage.getItem('accessToken'); // Get token from local storage
// // // // // // //         if (!accessToken) {
// // // // // // //           throw new Error('Access token not found');
// // // // // // //         }

// // // // // // //         // Make the API call
// // // // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/monthly-attendence/', {
// // // // // // //           headers: {
// // // // // // //             Authorization: `Bearer ${accessToken}`
// // // // // // //           },
// // // // // // //           params: {
// // // // // // //             employee: selectedEmployee,
// // // // // // //             month: selectedMonth
// // // // // // //           }

// // // // // // //         });

// // // // // // //         setReportData(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error('Error fetching report data:', error);
// // // // // // //         alert('Failed to fetch report data. Please try again later.');
// // // // // // //       }
// // // // // // //     } else {
// // // // // // //       alert('Please select both employee and month');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getStatusColor = (status) => {
// // // // // // //     switch (status.toLowerCase()) {
// // // // // // //       case 'present':
// // // // // // //         return '#4CAF50';
// // // // // // //       case 'absent':
// // // // // // //         return '#F44336';
// // // // // // //       case 'holiday':
// // // // // // //         return '#FF9800';
// // // // // // //       case 'off saturday':
// // // // // // //         return '#2196F3';
// // // // // // //       default:
// // // // // // //         return '#757575';
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const formatMonth = (monthStr) => {
// // // // // // //     const [year, month] = monthStr.split('-');
// // // // // // //     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box sx={{ p: 3 }}>
// // // // // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // // // // // //       <Box sx={{
// // // // // // //         display: 'flex',
// // // // // // //         gap: 2,
// // // // // // //         mb: 4,
// // // // // // //         alignItems: 'center'
// // // // // // //       }}>
// // // // // // //         <Box sx={{
// // // // // // //           display: 'flex',
// // // // // // //           alignItems: 'center',
// // // // // // //           gap: 1,
// // // // // // //           bgcolor: '#f5f5f5',
// // // // // // //           p: 1,
// // // // // // //           borderRadius: 1,
// // // // // // //           flex: 1
// // // // // // //         }}>
// // // // // // //           <Typography sx={{ color: '#666', minWidth: 80 }}>Employee</Typography>
// // // // // // //           <Select
// // // // // // //             value={selectedEmployee}
// // // // // // //             onChange={(e) => setSelectedEmployee(e.target.value)}
// // // // // // //             sx={{
// // // // // // //               flex: 1,
// // // // // // //               bgcolor: 'white',
// // // // // // //               '& .MuiSelect-select': { py: 1 }
// // // // // // //             }}
// // // // // // //             displayEmpty
// // // // // // //           >
// // // // // // //             <MenuItem value="" disabled>Select Employee</MenuItem>
// // // // // // //             {employees.map((emp) => (
// // // // // // //               <MenuItem key={emp} value={emp}>{emp}</MenuItem>
// // // // // // //             ))}
// // // // // // //           </Select>
// // // // // // //         </Box>

// // // // // // //         <Box sx={{
// // // // // // //           display: 'flex',
// // // // // // //           alignItems: 'center',
// // // // // // //           gap: 1,
// // // // // // //           bgcolor: '#f5f5f5',
// // // // // // //           p: 1,
// // // // // // //           borderRadius: 1,
// // // // // // //           flex: 1
// // // // // // //         }}>
// // // // // // //           <Typography sx={{ color: '#666', minWidth: 80 }}>Select Month</Typography>
// // // // // // //           <Select
// // // // // // //             value={selectedMonth}
// // // // // // //             onChange={(e) => setSelectedMonth(e.target.value)}
// // // // // // //             sx={{
// // // // // // //               flex: 1,
// // // // // // //               bgcolor: 'white',
// // // // // // //               '& .MuiSelect-select': { py: 1 }
// // // // // // //             }}
// // // // // // //             displayEmpty
// // // // // // //           >
// // // // // // //             <MenuItem value="" disabled>Select Month</MenuItem>
// // // // // // //             {months.map((month) => (
// // // // // // //               <MenuItem key={month} value={month}>
// // // // // // //                 {formatMonth(month)}
// // // // // // //               </MenuItem>
// // // // // // //             ))}
// // // // // // //           </Select>
// // // // // // //         </Box>

// // // // // // //         <Button
// // // // // // //           variant="contained"
// // // // // // //           onClick={handleSearch}
// // // // // // //           sx={{
// // // // // // //             px: 4,
// // // // // // //             py: 1,
// // // // // // //             bgcolor: '#1976d2',
// // // // // // //             '&:hover': { bgcolor: '#1565c0' }
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           Search
// // // // // // //         </Button>
// // // // // // //       </Box>



// // // // // // //       {reportData && (
// // // // // // //         <TableContainer component={Paper} sx={{ mt: 2 }}>
// // // // // // //           <Table>
// // // // // // //             <TableHead>
// // // // // // //               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// // // // // // //                 <TableCell>DAY</TableCell>
// // // // // // //                 <TableCell>DATE</TableCell>
// // // // // // //                 <TableCell>STATUS</TableCell>
// // // // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // // // //               </TableRow>
// // // // // // //             </TableHead>
// // // // // // //             <TableBody>
// // // // // // //               {reportData.map((row, index) => (
// // // // // // //                 <TableRow key={index}>
// // // // // // //                   <TableCell>{row.day}</TableCell>
// // // // // // //                   <TableCell>{row.date}</TableCell>
// // // // // // //                   <TableCell>
// // // // // // //                     <Typography
// // // // // // //                       sx={{
// // // // // // //                         color: getStatusColor(row.status),
// // // // // // //                         fontWeight: 500
// // // // // // //                       }}
// // // // // // //                     >
// // // // // // //                       {row.status}
// // // // // // //                     </Typography>
// // // // // // //                   </TableCell>
// // // // // // //                   <TableCell>{row.clockIn}</TableCell>
// // // // // // //                   <TableCell>{row.clockOut}</TableCell>
// // // // // // //                   <TableCell>{row.totalWork}</TableCell>
// // // // // // //                 </TableRow>
// // // // // // //               ))}
// // // // // // //             </TableBody>
// // // // // // //           </Table>
// // // // // // //         </TableContainer>
// // // // // // //       )}
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // }


// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Button,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   Paper,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow
// // // // // // // } from '@mui/material';

// // // // // // // export default function MonthlyReport() {
// // // // // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // // // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // // // // //   const [reportData, setReportData] = useState(null);
// // // // // // //   const [months, setMonths] = useState([]);

// // // // // // //   const employees = [
// // // // // // //     'Prasad Shinde',
// // // // // // //     'Anagha Dolase',
// // // // // // //     'QADIRULLA HUSSAINI SYED',

// // // // // // //     // Add more employees as needed
// // // // // // //   ];

// // // // // // //   useEffect(() => {
// // // // // // //     const generateMonths = () => {
// // // // // // //       const currentDate = new Date();
// // // // // // //       const currentYear = currentDate.getFullYear();
// // // // // // //       const currentMonth = currentDate.getMonth();
// // // // // // //       const availableMonths = [];

// // // // // // //       for (let month = 0; month <= currentMonth; month++) {
// // // // // // //         availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       const previousYear = currentYear - 1;
// // // // // // //       for (let month = 11; month > currentMonth; month--) {
// // // // // // //         availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
// // // // // // //       }

// // // // // // //       setMonths(availableMonths);
// // // // // // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // // // // // //     };

// // // // // // //     generateMonths();
// // // // // // //   }, []);

// // // // // // //   const handleSearch = async () => {
// // // // // // //     if (selectedEmployee && selectedMonth) {
// // // // // // //       try {
// // // // // // //         const accessToken = localStorage.getItem('accessToken');
// // // // // // //         if (!accessToken) {
// // // // // // //           throw new Error('Access token not found');
// // // // // // //         }

// // // // // // //         const response = await axios.get('https://tdtlworld.com/hrms-backend/today-attendence/', {
// // // // // // //           headers: { Authorization: `Bearer ${accessToken}` },
// // // // // // //           params: { employee: selectedEmployee, month: selectedMonth }
// // // // // // //         });

// // // // // // //         setReportData(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error('Error fetching report data:', error);
// // // // // // //         alert('Failed to fetch report data. Please try again later.');
// // // // // // //       }
// // // // // // //     } else {
// // // // // // //       alert('Please select both employee and month');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const getStatusColor = (status) => {
// // // // // // //     switch (status.toLowerCase()) {
// // // // // // //       case 'present': return '#4CAF50';
// // // // // // //       case 'absent': return '#F44336';
// // // // // // //       case 'holiday': return '#FF9800';
// // // // // // //       case 'off saturday': return '#2196F3';
// // // // // // //       default: return '#757575';
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const formatMonth = (monthStr) => {
// // // // // // //     const [year, month] = monthStr.split('-');
// // // // // // //     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box sx={{ p: 3 }}>
// // // // // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>
// // // // // // //       <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
// // // // // // //         <Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} displayEmpty>
// // // // // // //           <MenuItem value="" disabled>Select Employee</MenuItem>
// // // // // // //           {employees.map((emp) => (<MenuItem key={emp} value={emp}>{emp}</MenuItem>))}
// // // // // // //         </Select>

// // // // // // //         <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} displayEmpty>
// // // // // // //           <MenuItem value="" disabled>Select Month</MenuItem>
// // // // // // //           {months.map((month) => (<MenuItem key={month} value={month}>{formatMonth(month)}</MenuItem>))}
// // // // // // //         </Select>

// // // // // // //         <Button variant="contained" onClick={handleSearch}>Search</Button>
// // // // // // //       </Box>

// // // // // // //       {reportData && (
// // // // // // //         <TableContainer component={Paper} sx={{ mt: 2 }}>
// // // // // // //           <Table>
// // // // // // //             <TableHead>
// // // // // // //               <TableRow>
// // // // // // //                 <TableCell>DAY</TableCell>
// // // // // // //                 <TableCell>DATE</TableCell>
// // // // // // //                 <TableCell>STATUS</TableCell>
// // // // // // //                 <TableCell>CLOCK IN</TableCell>
// // // // // // //                 <TableCell>CLOCK OUT</TableCell>
// // // // // // //                 <TableCell>TOTAL WORK</TableCell>
// // // // // // //               </TableRow>
// // // // // // //             </TableHead>
// // // // // // //             <TableBody>
// // // // // // //               {reportData.map((row, index) => (
// // // // // // //                 <TableRow key={index}>
// // // // // // //                   <TableCell>{row.day}</TableCell>
// // // // // // //                   <TableCell>{row.date}</TableCell>
// // // // // // //                   <TableCell>
// // // // // // //                     <Typography sx={{ color: getStatusColor(row.status), fontWeight: 500 }}>{row.status}</Typography>
// // // // // // //                   </TableCell>
// // // // // // //                   <TableCell>{row.clockIn}</TableCell>
// // // // // // //                   <TableCell>{row.clockOut}</TableCell>
// // // // // // //                   <TableCell>{row.totalWork}</TableCell>
// // // // // // //                 </TableRow>
// // // // // // //               ))}
// // // // // // //             </TableBody>
// // // // // // //           </Table>
// // // // // // //         </TableContainer>
// // // // // // //       )}
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // }



// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Button,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   Paper,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   CircularProgress
// // // // // } from '@mui/material';
// // // // // import axiosInstance from "../utils/axiosInstance";


// // // // // // Helper function to process the raw API data for the report
// // // // // const processReportData = (data) => {
// // // // //     if (!Array.isArray(data)) return [];

// // // // //     const reportMap = new Map();

// // // // //     // Group entries by date
// // // // //     data.forEach(entry => {
// // // // //         if (!reportMap.has(entry.date)) {
// // // // //             // Initialize a new entry in the map
// // // // //             reportMap.set(entry.date, {
// // // // //                 day: entry.day,
// // // // //                 date: entry.date,
// // // // //                 status: entry.status,
// // // // //                 clock_in: '',
// // // // //                 clock_out: '',
// // // // //                 total_work: entry.total_work || '',
// // // // //             });
// // // // //         }

// // // // //         // Populate clock_in and clock_out from different records for the same day
// // // // //         const existingEntry = reportMap.get(entry.date);
// // // // //         if (entry.clock_in) {
// // // // //             existingEntry.clock_in = entry.clock_in;
// // // // //         }
// // // // //         if (entry.clock_out) {
// // // // //             existingEntry.clock_out = entry.clock_out;
// // // // //         }
// // // // //     });

// // // // //     // Convert the map back to an array and sort by date
// // // // //     return Array.from(reportMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
// // // // // };


// // // // // export default function MonthlyReport() {
// // // // //   const [employees, setEmployees] = useState([]);
// // // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // // //   const [reportData, setReportData] = useState(null);
// // // // //   const [months, setMonths] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [loadingEmployees, setLoadingEmployees] = useState(true);

// // // // //   // Fetch the list of employees from the API
// // // // //   useEffect(() => {
// // // // //     const fetchEmployees = async () => {
// // // // //         try {
// // // // //             setLoadingEmployees(true);
// // // // //             const response = await axiosInstance.get('/employee-dropdown/');
// // // // //             setEmployees(response.data);
// // // // //         } catch (error) {
// // // // //             console.error("Error fetching employees:", error);
// // // // //             alert('Failed to load the employee list.');
// // // // //             setEmployees([]); // Set to empty array on error
// // // // //         } finally {
// // // // //             setLoadingEmployees(false);
// // // // //         }
// // // // //     };
// // // // //     fetchEmployees();
// // // // //   }, []);

// // // // //   // Generate available months
// // // // //   useEffect(() => {
// // // // //     const generateMonths = () => {
// // // // //       const currentDate = new Date();
// // // // //       const currentYear = currentDate.getFullYear();
// // // // //       const currentMonth = currentDate.getMonth();
// // // // //       const availableMonths = [];

// // // // //       for (let i = 0; i < 12; i++) {
// // // // //         let date = new Date(currentYear, currentMonth - i, 1);
// // // // //         availableMonths.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
// // // // //       }

// // // // //       setMonths(availableMonths);
// // // // //       // Set default to current month
// // // // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // // // //     };
// // // // //     generateMonths();
// // // // //   }, []);

// // // // //   const handleSearch = async () => {
// // // // //     if (selectedEmployee && selectedMonth) {
// // // // //       setLoading(true);
// // // // //       setReportData(null);
// // // // //       try {
// // // // //         const payload = {
// // // // //             employee_id: selectedEmployee,
// // // // //             month: selectedMonth
// // // // //         };
// // // // //         const response = await axiosInstance.post('/emp_monthly_report/', payload);
// // // // //         const processedData = processReportData(response.data);
// // // // //         setReportData(processedData);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching report:", error);
// // // // //         alert('Failed to fetch the report. Please try again.');
// // // // //         setReportData([]); // Set to empty array to show "No data" message
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     } else {
// // // // //       alert('Please select both an employee and a month.');
// // // // //     }
// // // // //   };

// // // // //   const getStatusColor = (status) => {
// // // // //     if (!status) return '#757575';
// // // // //     const lowerCaseStatus = status.toLowerCase();

// // // // //     if (lowerCaseStatus.includes('present')) return '#4CAF50';
// // // // //     if (lowerCaseStatus.includes('absent')) return '#F44336';
// // // // //     if (lowerCaseStatus.includes('holiday')) return '#FF9800';
// // // // //     if (lowerCaseStatus.includes('off')) return '#2196F3';
// // // // //     if (lowerCaseStatus.includes('leave')) return '#9C27B0';
// // // // //     return '#757575';
// // // // //   };

// // // // //   const formatMonth = (monthStr) => {
// // // // //     if (!monthStr) return "";
// // // // //     const [year, month] = monthStr.split('-');
// // // // //     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
// // // // //   };

// // // // //   return (
// // // // //     <Box sx={{ p: 3 }}>
// // // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // // // //       <Box sx={{ 
// // // // //         display: 'flex', 
// // // // //         flexWrap: 'wrap',
// // // // //         gap: 2, 
// // // // //         mb: 4,
// // // // //         alignItems: 'center'
// // // // //       }}>
// // // // //         <Box sx={{ flex: '1 1 300px' }}>
// // // // //           <Typography sx={{ color: '#666', mb: 0.5 }}>Employee</Typography>
// // // // //           <Select
// // // // //             fullWidth
// // // // //             value={selectedEmployee}
// // // // //             onChange={(e) => setSelectedEmployee(e.target.value)}
// // // // //             sx={{ bgcolor: 'white' }}
// // // // //             displayEmpty
// // // // //             disabled={loadingEmployees}
// // // // //           >
// // // // //             <MenuItem value="" disabled>
// // // // //                 {loadingEmployees ? <em>Loading...</em> : <em>Select Employee</em>}
// // // // //             </MenuItem>
// // // // //             {employees.map((emp) => (
// // // // //               <MenuItem key={emp.value} value={emp.value}>
// // // // //                 {emp.label}
// // // // //               </MenuItem>
// // // // //             ))}
// // // // //           </Select>
// // // // //         </Box>

// // // // //         <Box sx={{ flex: '1 1 300px' }}>
// // // // //           <Typography sx={{ color: '#666', mb: 0.5 }}>Select Month</Typography>
// // // // //           <Select
// // // // //             fullWidth
// // // // //             value={selectedMonth}
// // // // //             onChange={(e) => setSelectedMonth(e.target.value)}
// // // // //             sx={{ bgcolor: 'white' }}
// // // // //             displayEmpty
// // // // //           >
// // // // //             <MenuItem value="" disabled><em>Select Month</em></MenuItem>
// // // // //             {months.map((month) => (
// // // // //               <MenuItem key={month} value={month}>
// // // // //                 {formatMonth(month)}
// // // // //               </MenuItem>
// // // // //             ))}
// // // // //           </Select>
// // // // //         </Box>

// // // // //         <Button 
// // // // //           variant="contained"
// // // // //           onClick={handleSearch}
// // // // //           disabled={loading || loadingEmployees || !selectedEmployee}
// // // // //           sx={{ 
// // // // //             px: 4,
// // // // //             py: 1.5,
// // // // //             alignSelf: 'flex-end',
// // // // //           }}
// // // // //         >
// // // // //           {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
// // // // //         </Button>
// // // // //       </Box>

// // // // //       {reportData && (
// // // // //         <TableContainer component={Paper} sx={{ mt: 2 }}>
// // // // //           <Table>
// // // // //             <TableHead>
// // // // //               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// // // // //                 <TableCell sx={{ fontWeight: 'bold' }}>DAY</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: 'bold' }}>DATE</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: 'bold' }}>CLOCK IN</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: 'bold' }}>CLOCK OUT</TableCell>
// // // // //                 <TableCell sx={{ fontWeight: 'bold' }}>TOTAL WORK</TableCell>
// // // // //               </TableRow>
// // // // //             </TableHead>
// // // // //             <TableBody>
// // // // //               {reportData.length > 0 ? (
// // // // //                 reportData.map((row, index) => (
// // // // //                   <TableRow key={index} hover>
// // // // //                     <TableCell>{row.day}</TableCell>
// // // // //                     <TableCell>{row.date}</TableCell>
// // // // //                     <TableCell>
// // // // //                       <Typography 
// // // // //                         component="span"
// // // // //                         sx={{ 
// // // // //                           color: 'white',
// // // // //                           bgcolor: getStatusColor(row.status),
// // // // //                           fontWeight: 500,
// // // // //                           px: 1,
// // // // //                           py: 0.5,
// // // // //                           borderRadius: '4px',
// // // // //                           display: 'inline-block'
// // // // //                         }}
// // // // //                       >
// // // // //                         {row.status}
// // // // //                       </Typography>
// // // // //                     </TableCell>
// // // // //                     <TableCell>{row.clock_in}</TableCell>
// // // // //                     <TableCell>{row.clock_out}</TableCell>
// // // // //                     <TableCell>{row.total_work}</TableCell>
// // // // //                   </TableRow>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <TableRow>
// // // // //                     <TableCell colSpan={6} align="center">
// // // // //                         No attendance data found for the selected period.
// // // // //                     </TableCell>
// // // // //                 </TableRow>
// // // // //               )}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </TableContainer>
// // // // //       )}
// // // // //     </Box>
// // // // //   );
// // // // // }


















// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Button,
// // // //   Select,
// // // //   MenuItem,
// // // //   Paper,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   CircularProgress
// // // // } from '@mui/material';
// // // // import axiosInstance from "../utils/axiosInstance";


// // // // // Helper function to process the raw API data for the report. No changes needed.
// // // // const processReportData = (data) => {
// // // //     if (!Array.isArray(data)) return [];
// // // //     const reportMap = new Map();
// // // //     data.forEach(entry => {
// // // //         if (!reportMap.has(entry.date)) {
// // // //             reportMap.set(entry.date, {
// // // //                 day: entry.day, date: entry.date, status: entry.status,
// // // //                 clock_in: '', clock_out: '', total_work: entry.total_work || '',
// // // //             });
// // // //         }
// // // //         const existingEntry = reportMap.get(entry.date);
// // // //         if (entry.clock_in) existingEntry.clock_in = entry.clock_in;
// // // //         if (entry.clock_out) existingEntry.clock_out = entry.clock_out;
// // // //     });
// // // //     return Array.from(reportMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
// // // // };


// // // // export default function MonthlyReport() {
// // // //   const [employees, setEmployees] = useState([]);
// // // //   const [selectedEmployee, setSelectedEmployee] = useState('');
// // // //   const [selectedMonth, setSelectedMonth] = useState('');
// // // //   const [reportData, setReportData] = useState(null);
// // // //   const [months, setMonths] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [loadingEmployees, setLoadingEmployees] = useState(true);

// // // //   // *** FIX IS HERE ***
// // // //   // Fetch the list of employees the logged-in user is allowed to see.
// // // //   useEffect(() => {
// // // //     const fetchPermittedEmployees = async () => {
// // // //         setLoadingEmployees(true);
// // // //         // Step 1: Get the logged-in user's employee_id from local storage.
// // // //         const loggedInEmployeeId = localStorage.getItem("username");

// // // //         if (!loggedInEmployeeId) {
// // // //             alert("Could not find Employee ID in storage. Please log in again.");
// // // //             setLoadingEmployees(false);
// // // //             return;
// // // //         }

// // // //         try {
// // // //             // Step 2: Use the dynamic endpoint with the user's ID to get the employee list.
// // // //             const response = await axiosInstance.get(`/dropdown/${loggedInEmployeeId}/`);

// // // //             // Step 3: Format the response for the dropdown menu.
// // // //             const formattedEmployees = response.data.map(emp => ({
// // // //                 label: emp.name,
// // // //                 value: emp.employee_id
// // // //             }));

// // // //             setEmployees(formattedEmployees);

// // // //             // Optional: if only one employee is returned (the user themselves), pre-select them.
// // // //             if (formattedEmployees.length === 1) {
// // // //                 setSelectedEmployee(formattedEmployees[0].value);
// // // //             }

// // // //         } catch (error) {
// // // //             console.error("Error fetching employee list:", error);
// // // //             // This is the alert you were seeing. Now it should succeed.
// // // //             alert('Failed to load the employee list. Please check permissions or network.');
// // // //             setEmployees([]);
// // // //         } finally {
// // // //             setLoadingEmployees(false);
// // // //         }
// // // //     };

// // // //     fetchPermittedEmployees();
// // // //   }, []); // Runs once on component mount.

// // // //   // This useEffect for generating months is correct and requires no changes.
// // // //   useEffect(() => {
// // // //     const generateMonths = () => {
// // // //       const currentDate = new Date();
// // // //       const currentYear = currentDate.getFullYear();
// // // //       const currentMonth = currentDate.getMonth();
// // // //       const availableMonths = [];

// // // //       for (let i = 0; i < 12; i++) {
// // // //         let date = new Date(currentYear, currentMonth - i, 1);
// // // //         availableMonths.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
// // // //       }

// // // //       setMonths(availableMonths);
// // // //       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
// // // //     };
// // // //     generateMonths();
// // // //   }, []);

// // // //   // This function now uses the correct dynamic endpoint to fetch the report.
// // // //   const handleSearch = async () => {
// // // //     if (selectedEmployee && selectedMonth) {
// // // //       setLoading(true);
// // // //       setReportData(null);
// // // //       try {
// // // //         // Construct the URL with the ID of the employee selected from the dropdown.
// // // //         const url = `/dropdown/${selectedEmployee}/`;

// // // //         // Make a GET request with the month as a query parameter.
// // // //         const response = await axiosInstance.get(url, {
// // // //             params: { month: selectedMonth }
// // // //         });

// // // //         const processedData = processReportData(response.data);
// // // //         setReportData(processedData);
// // // //       } catch (error) {
// // // //         console.error("Error fetching report:", error);
// // // //         alert('Failed to fetch the report. Please try again.');
// // // //         setReportData([]);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     } else {
// // // //       alert('Please select both an employee and a month.');
// // // //     }
// // // //   };

// // // //   const getStatusColor = (status) => {
// // // //     if (!status) return '#757575';
// // // //     const lowerCaseStatus = status.toLowerCase();
// // // //     if (lowerCaseStatus.includes('present')) return '#4CAF50';
// // // //     if (lowerCaseStatus.includes('absent')) return '#F44336';
// // // //     if (lowerCaseStatus.includes('holiday')) return '#FF9800';
// // // //     if (lowerCaseStatus.includes('off')) return '#2196F3';
// // // //     if (lowerCaseStatus.includes('leave')) return '#9C27B0';
// // // //     return '#757575';
// // // //   };

// // // //   const formatMonth = (monthStr) => {
// // // //     if (!monthStr) return "";
// // // //     const [year, month] = monthStr.split('-');
// // // //     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
// // // //   };

// // // //   // The JSX rendering logic is correct and remains unchanged.
// // // //   return (
// // // //     <Box sx={{ p: 3 }}>
// // // //       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>

// // // //       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, alignItems: 'center' }}>
// // // //         <Box sx={{ flex: '1 1 300px' }}>
// // // //           <Typography sx={{ color: '#666', mb: 0.5 }}>Employee</Typography>
// // // //           <Select
// // // //             fullWidth
// // // //             value={selectedEmployee}
// // // //             onChange={(e) => setSelectedEmployee(e.target.value)}
// // // //             sx={{ bgcolor: 'white' }}
// // // //             displayEmpty
// // // //             disabled={loadingEmployees}
// // // //           >
// // // //             <MenuItem value="" disabled>
// // // //                 {loadingEmployees ? <em>Loading Employees...</em> : <em>Select Employee</em>}
// // // //             </MenuItem>
// // // //             {employees.map((emp) => (
// // // //               <MenuItem key={emp.value} value={emp.value}>
// // // //                 {emp.label}
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //         </Box>

// // // //         <Box sx={{ flex: '1 1 300px' }}>
// // // //           <Typography sx={{ color: '#666', mb: 0.5 }}>Select Month</Typography>
// // // //           <Select
// // // //             fullWidth
// // // //             value={selectedMonth}
// // // //             onChange={(e) => setSelectedMonth(e.target.value)}
// // // //             sx={{ bgcolor: 'white' }}
// // // //             displayEmpty
// // // //           >
// // // //             <MenuItem value="" disabled><em>Select Month</em></MenuItem>
// // // //             {months.map((month) => (
// // // //               <MenuItem key={month} value={month}>
// // // //                 {formatMonth(month)}
// // // //               </MenuItem>
// // // //             ))}
// // // //           </Select>
// // // //         </Box>

// // // //         <Button 
// // // //           variant="contained"
// // // //           onClick={handleSearch}
// // // //           disabled={loading || loadingEmployees || !selectedEmployee}
// // // //           sx={{ px: 4, py: 1.5, alignSelf: 'flex-end' }}
// // // //         >
// // // //           {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
// // // //         </Button>
// // // //       </Box>

// // // //       {reportData && (
// // // //         <TableContainer component={Paper} sx={{ mt: 2 }}>
// // // //           <Table>
// // // //             <TableHead>
// // // //               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
// // // //                 <TableCell sx={{ fontWeight: 'bold' }}>DAY</TableCell>
// // // //                 <TableCell sx={{ fontWeight: 'bold' }}>DATE</TableCell>
// // // //                 <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
// // // //                 <TableCell sx={{ fontWeight: 'bold' }}>CLOCK IN</TableCell>
// // // //                 <TableCell sx={{ fontWeight: 'bold' }}>CLOCK OUT</TableCell>
// // // //                 <TableCell sx={{ fontWeight: 'bold' }}>TOTAL WORK</TableCell>
// // // //               </TableRow>
// // // //             </TableHead>
// // // //             <TableBody>
// // // //               {reportData.length > 0 ? (
// // // //                 reportData.map((row, index) => (
// // // //                   <TableRow key={index} hover>
// // // //                     <TableCell>{row.day}</TableCell>
// // // //                     <TableCell>{row.date}</TableCell>
// // // //                     <TableCell>
// // // //                       <Typography 
// // // //                         component="span"
// // // //                         sx={{ color: 'white', bgcolor: getStatusColor(row.status), fontWeight: 500, px: 1, py: 0.5, borderRadius: '4px', display: 'inline-block' }}
// // // //                       >
// // // //                         {row.status}
// // // //                       </Typography>
// // // //                     </TableCell>
// // // //                     <TableCell>{row.clock_in}</TableCell>
// // // //                     <TableCell>{row.clock_out}</TableCell>
// // // //                     <TableCell>{row.total_work}</TableCell>
// // // //                   </TableRow>
// // // //                 ))
// // // //               ) : (
// // // //                 <TableRow>
// // // //                     <TableCell colSpan={6} align="center">
// // // //                         No attendance data found for the selected period.
// // // //                     </TableCell>
// // // //                 </TableRow>
// // // //               )}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       )}
// // // //     </Box>
// // // //   );
// // // // }


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Select,
// //   MenuItem,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   CircularProgress,
// //   Alert
// // } from '@mui/material';

// // export default function MonthlyReport() {
// //   // State for form inputs
// //   const [selectedEmployee, setSelectedEmployee] = useState('');
// //   const [selectedMonth, setSelectedMonth] = useState('');

// //   // State for data and UI
// //   const [employees, setEmployees] = useState([]); // To store fetched employees
// //   const [months, setMonths] = useState([]); // To store generated months
// //   const [reportData, setReportData] = useState(null); // To store API response
// //   const [isLoading, setIsLoading] = useState(false); // To handle loading state for report search
// //   const [error, setError] = useState(null); // To handle errors

// //   // Effect to fetch the list of employees on component mount
// //   useEffect(() => {
// //     const fetchEmployees = async () => {
// //       try {
// //         // As requested, the employee ID is variable, taken from a source like localStorage.
// //         // For this example, we'll use the provided ID 'V0921'.
// //         // In a real app: const loggedInUserId = localStorage.getItem('userId');
// //         const loggedInUserId = 'V0921'; 

// //         if (!loggedInUserId) {
// //           setError('User ID not found. Cannot load employee list.');
// //           return;
// //         }

// //         const response = await axios.get(`https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`);

// //         // Assuming the API returns an array of objects like [{ emp_id, emp_name }]
// //         setEmployees(response.data);
// //       } catch (err) {
// //         console.error("Failed to fetch employees:", err);
// //         setError('Failed to load employee list. Please try refreshing the page.');
// //       }
// //     };

// //     fetchEmployees();
// //   }, []); // Empty dependency array ensures this runs only once on mount

// //   // Effect to generate available months
// //   useEffect(() => {
// //     const generateMonths = () => {
// //       const availableMonths = [];
// //       const currentDate = new Date();
// //       let year = currentDate.getFullYear();
// //       let month = currentDate.getMonth();

// //       // Generate the last 12 months including the current one
// //       for (let i = 0; i < 12; i++) {
// //         const date = new Date(year, month - i, 1);
// //         const monthStr = String(date.getMonth() + 1).padStart(2, '0');
// //         const yearStr = date.getFullYear();
// //         availableMonths.push(`${yearStr}-${monthStr}`);
// //       }

// //       setMonths(availableMonths);
// //       // Set default selected month to the current month
// //       if (availableMonths.length > 0) {
// //         setSelectedMonth(availableMonths[0]);
// //       }
// //     };

// //     generateMonths();
// //   }, []);

// //   // Handler for the "Search" button click
// //   const handleSearch = async () => {
// //     if (!selectedEmployee || !selectedMonth) {
// //       setError('Please select both an employee and a month to generate the report.');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError(null);
// //     setReportData(null); // Clear previous results

// //     try {
// //       const payload = {
// //         employee_id: selectedEmployee,
// //         month: selectedMonth, // Format is "YYYY-MM"
// //       };

// //       const response = await axios.post(
// //         'https://tdtlworld.com/hrms-backend/emp_monthly_report/',
// //         payload
// //       );

// //       setReportData(response.data);
// //     } catch (err) {
// //       console.error("Failed to fetch monthly report:", err);
// //       setError('An error occurred while fetching the report. Please try again.');
// //       setReportData([]); // Set to empty array to show "No data" message
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Helper function to get color based on attendance status
// //   const getStatusColor = (status) => {
// //     if (!status) return '#757575'; // Default Grey
// //     const lowerStatus = status.toLowerCase();
// //     if (lowerStatus.includes('present')) return '#4CAF50'; // Green for Present
// //     if (lowerStatus.includes('absent')) return '#F44336'; // Red for Absent
// //     if (lowerStatus.includes('holiday')) return '#FF9800'; // Orange for Holiday
// //     if (lowerStatus.includes('off')) return '#2196F3'; // Blue for Off days
// //     if (lowerStatus.includes('leave')) return '#673AB7'; // Purple for Leave
// //     return '#757575'; // Default Grey for other statuses
// //   };

// //   // Helper function to format month string for display (e.g., "October 2024")
// //   const formatMonthForDisplay = (monthStr) => {
// //     if (!monthStr) return '';
// //     const [year, month] = monthStr.split('-');
// //     return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
// //   };

// //   return (
// //     <Box sx={{ p: 3, fontFamily: 'sans-serif' }}>
// //       <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
// //         View Monthly Report
// //       </Typography>

// //       {/* Form Controls */}
// //       <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center' }}>
// //         {/* Employee Select */}
// //         <Select
// //           value={selectedEmployee}
// //           onChange={(e) => setSelectedEmployee(e.target.value)}
// //           displayEmpty
// //           fullWidth
// //           sx={{ bgcolor: 'white' }}
// //         >
// //           <MenuItem value="" disabled><em>Select Employee</em></MenuItem>
// //           {employees.length > 0 ? (
// //             employees.map((emp) => (
// //               // Assuming API returns emp_id and emp_name
// //               <MenuItem key={emp.emp_id} value={emp.emp_id}>{emp.emp_name}</MenuItem>
// //             ))
// //           ) : (
// //             <MenuItem disabled>Loading employees...</MenuItem>
// //           )}
// //         </Select>

// //         {/* Month Select */}
// //         <Select
// //           value={selectedMonth}
// //           onChange={(e) => setSelectedMonth(e.target.value)}
// //           displayEmpty
// //           fullWidth
// //           sx={{ bgcolor: 'white' }}
// //         >
// //           <MenuItem value="" disabled><em>Select Month</em></MenuItem>
// //           {months.map((month) => (
// //             <MenuItem key={month} value={month}>
// //               {formatMonthForDisplay(month)}
// //             </MenuItem>
// //           ))}
// //         </Select>

// //         <Button
// //           variant="contained"
// //           onClick={handleSearch}
// //           disabled={isLoading || !selectedEmployee}
// //           sx={{ px: 5, py: 1.5, minWidth: '120px' }}
// //         >
// //           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
// //         </Button>
// //       </Box>

// //       {/* Error Display */}
// //       {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

// //       {/* Report Table */}
// //       {reportData && (
// //         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' } }}>
// //                 <TableCell>DAY</TableCell>
// //                 <TableCell>DATE</TableCell>
// //                 <TableCell>STATUS</TableCell>
// //                 <TableCell>CLOCK IN</TableCell>
// //                 <TableCell>CLOCK OUT</TableCell>
// //                 <TableCell>TOTAL WORK</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {reportData.length > 0 ? (
// //                 reportData.map((row, index) => (
// //                   <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
// //                     <TableCell>{row.day || '--'}</TableCell>
// //                     <TableCell>{row.date || '--'}</TableCell>
// //                     <TableCell>
// //                       <Typography
// //                         component="span"
// //                         sx={{
// //                           color: 'white',
// //                           bgcolor: getStatusColor(row.status),
// //                           px: 1.5,
// //                           py: 0.5,
// //                           borderRadius: '12px',
// //                           fontSize: '0.75rem',
// //                           fontWeight: 'bold',
// //                           display: 'inline-block',
// //                           whiteSpace: 'nowrap',
// //                         }}
// //                       >
// //                         {row.status || 'N/A'}
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell>{row.clock_in || '--'}</TableCell>
// //                     <TableCell>{row.clock_out || '--'}</TableCell>
// //                     <TableCell>{row.total_work || '--'}</TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
// //                     No report data found for the selected criteria.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //     </Box>
// //   );
// // }


// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Select,
// //   MenuItem,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   CircularProgress,
// //   Alert
// // } from '@mui/material';

// // export default function MonthlyReport() {
// //   // State for form inputs
// //   const [selectedEmployee, setSelectedEmployee] = useState('');
// //   const [selectedMonth, setSelectedMonth] = useState('');

// //   // State for data and UI
// //   const [employees, setEmployees] = useState([]);
// //   const [months, setMonths] = useState([]);
// //   const [reportData, setReportData] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Effect to fetch the list of employees using fetch and Authorization header
// //   useEffect(() => {
// //     const fetchEmployees = async () => {
// //       try {
// //         // 1. Get credentials from localStorage
// //         const loggedInUserId = localStorage.getItem('loggedInUser');
// //         const accessToken = localStorage.getItem('accessToken');

// //         // 2. Validate that the credentials exist
// //         if (!loggedInUserId || !accessToken) {
// //           setError("User session details not found. Please log in again.");
// //           return;
// //         }

// //         // 3. Construct the API URL and headers
// //         const url = `https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`;
// //         const headers = {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${accessToken}`
// //         };

// //         // 4. Make the API call using fetch
// //         const response = await fetch(url, { method: 'GET', headers });

// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch employees. Server responded with status ${response.status}.`);
// //         }

// //         const data = await response.json();
// //         // The data is [{"name":"Prasad Shinde","employee_id":"V0921"}]
// //         setEmployees(data);

// //       } catch (err) {
// //         console.error("Error fetching employees:", err);
// //         setError(err.message);
// //       }
// //     };

// //     fetchEmployees();
// //   }, []);

// //   // Effect to generate available months
// //   useEffect(() => {
// //     const generateMonths = () => {
// //       const availableMonths = [];
// //       const currentDate = new Date();
// //       let year = currentDate.getFullYear();
// //       let month = currentDate.getMonth();

// //       for (let i = 0; i < 12; i++) {
// //         const date = new Date(year, month - i, 1);
// //         const monthStr = String(date.getMonth() + 1).padStart(2, '0');
// //         const yearStr = date.getFullYear();
// //         availableMonths.push(`${yearStr}-${monthStr}`);
// //       }

// //       setMonths(availableMonths);
// //       if (availableMonths.length > 0) {
// //         setSelectedMonth(availableMonths[0]);
// //       }
// //     };

// //     generateMonths();
// //   }, []);

// //   // Handler for the "Search" button click
// //   const handleSearch = async () => {
// //     if (!selectedEmployee || !selectedMonth) {
// //       setError('Please select both an employee and a month.');
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError(null);
// //     setReportData(null);

// //     try {
// //       const accessToken = localStorage.getItem('accessToken');
// //       if (!accessToken) {
// //         throw new Error("User session token expired or not found. Please log in again.");
// //       }

// //       const url = 'https://tdtlworld.com/hrms-backend/emp_monthly_report/';
// //       const payload = {
// //         employee_id: selectedEmployee,
// //         month: selectedMonth,
// //       };
// //       const headers = {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${accessToken}`
// //       };

// //       const response = await fetch(url, {
// //         method: 'POST',
// //         headers: headers,
// //         body: JSON.stringify(payload)
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch report. Server responded with status ${response.status}.`);
// //       }

// //       const data = await response.json();
// //       setReportData(data);

// //     } catch (err) {
// //       console.error("Error fetching report:", err);
// //       setError(err.message);
// //       setReportData([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Helper functions
// //   const getStatusColor = (status) => {
// //     if (!status) return '#757575';
// //     const lowerStatus = status.toLowerCase();
// //     if (lowerStatus.includes('present')) return '#4CAF50';
// //     if (lowerStatus.includes('absent')) return '#F44336';
// //     if (lowerStatus.includes('holiday')) return '#FF9800';
// //     if (lowerStatus.includes('off')) return '#2196F3';
// //     if (lowerStatus.includes('leave')) return '#673AB7';
// //     return '#757575';
// //   };

// //   const formatMonthForDisplay = (monthStr) => {
// //     if (!monthStr) return '';
// //     const [year, month] = monthStr.split('-');
// //     return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
// //   };

// //   return (
// //     <Box sx={{ p: 3, fontFamily: 'sans-serif' }}>
// //       <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
// //         View Monthly Report
// //       </Typography>

// //       {/* Form Controls */}
// //       <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center' }}>
// //         <Select
// //           value={selectedEmployee}
// //           onChange={(e) => setSelectedEmployee(e.target.value)}
// //           displayEmpty
// //           fullWidth
// //           sx={{ bgcolor: 'white' }}
// //         >
// //           <MenuItem value="" disabled><em>Select Employee</em></MenuItem>
// //           {employees.length > 0 ? (
// //             employees.map((emp) => (
// //               // THE FIX IS HERE: using `emp.employee_id` for the key/value
// //               // and `emp.name` for the display text, to match your API response.
// //               <MenuItem key={emp.employee_id} value={emp.employee_id}>
// //                 {emp.name}
// //               </MenuItem>
// //             ))
// //           ) : (
// //             <MenuItem disabled>Loading employees...</MenuItem>
// //           )}
// //         </Select>

// //         <Select
// //           value={selectedMonth}
// //           onChange={(e) => setSelectedMonth(e.target.value)}
// //           displayEmpty
// //           fullWidth
// //           sx={{ bgcolor: 'white' }}
// //         >
// //           <MenuItem value="" disabled><em>Select Month</em></MenuItem>
// //           {months.map((month) => (
// //             <MenuItem key={month} value={month}>
// //               {formatMonthForDisplay(month)}
// //             </MenuItem>
// //           ))}
// //         </Select>

// //         <Button
// //           variant="contained"
// //           onClick={handleSearch}
// //           disabled={isLoading || !selectedEmployee}
// //           sx={{ px: 5, py: 1.5, minWidth: '120px' }}
// //         >
// //           {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
// //         </Button>
// //       </Box>

// //       {/* Error Display */}
// //       {error && <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</Alert>}

// //       {/* Report Table */}
// //       {reportData && (
// //         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
// //           <Table stickyHeader>
// //             <TableHead>
// //               <TableRow sx={{ '& .MuiTableCell-root': { bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' } }}>
// //                 <TableCell>DAY</TableCell>
// //                 <TableCell>DATE</TableCell>
// //                 <TableCell>STATUS</TableCell>
// //                 <TableCell>CLOCK IN</TableCell>
// //                 <TableCell>CLOCK OUT</TableCell>
// //                 <TableCell>TOTAL WORK</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {reportData.length > 0 ? (
// //                 reportData.map((row, index) => (
// //                   <TableRow key={index} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
// //                     <TableCell>{row.day || '--'}</TableCell>
// //                     <TableCell>{row.date || '--'}</TableCell>
// //                     <TableCell>
// //                       <Typography
// //                         component="span"
// //                         sx={{
// //                           color: 'white',
// //                           bgcolor: getStatusColor(row.status),
// //                           px: 1.5,
// //                           py: 0.5,
// //                           borderRadius: '12px',
// //                           fontSize: '0.75rem',
// //                           fontWeight: 'bold',
// //                           display: 'inline-block',
// //                           whiteSpace: 'nowrap',
// //                         }}
// //                       >
// //                         {row.status || 'N/A'}
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell>{row.clock_in || '--'}</TableCell>
// //                     <TableCell>{row.clock_out || '--'}</TableCell>
// //                     <TableCell>{row.total_work || '--'}</TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
// //                     No report data found for the selected criteria.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //     </Box>
// //   );
// // }

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
//                 <TableCell>PUNCH IN</TableCell>
//                 <TableCell>PUNCH OUT</TableCell>
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
// import React, { useState, useEffect } from "react";
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
//   Alert,
// } from "@mui/material";

// // You can change this to any year you want the dropdown to start from.
// const START_YEAR = 2022;

// export default function MonthlyReport() {
//   // State for form inputs
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

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
//         const loggedInUserId = localStorage.getItem("loggedInUser");
//         const accessToken = localStorage.getItem("accessToken");

//         if (!loggedInUserId || !accessToken) {
//           setError("User session details not found. Please log in again.");
//           return;
//         }

//         const url = `https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`;
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         };

//         const response = await fetch(url, { method: "GET", headers });

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch employees. Server responded with status ${response.status}.`
//           );
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
//         const startMonthIndex = year === currentYear ? currentMonthIndex : 11;

//         // Loop through the months of the year in reverse
//         for (let monthIndex = startMonthIndex; monthIndex >= 0; monthIndex--) {
//           const monthNumber = monthIndex + 1; // Convert 0-indexed to 1-indexed
//           const monthStr = String(monthNumber).padStart(2, "0");
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
//       setError("Please select both an employee and a month.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setReportData(null);

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error(
//           "User session token expired or not found. Please log in again."
//         );
//       }

//       const url = "https://tdtlworld.com/hrms-backend/emp_monthly_report/";
//       const payload = {
//         employee_id: selectedEmployee,
//         month: selectedMonth,
//       };
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch report. Server responded with status ${response.status}.`
//         );
//       }

//       const data = await response.json();

//       // 1. Sort the data by date in descending order (latest first)
//       const sortedData = data.sort(
//         (a, b) => new Date(b.date) - new Date(a.date)
//       );

//       setReportData(sortedData);
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
//     if (!status) return "#757575";
//     const lowerStatus = status.toLowerCase();
//     if (lowerStatus.includes("present")) return "#4CAF50";
//     if (lowerStatus.includes("absent")) return "#F44336";
//     if (lowerStatus.includes("holiday")) return "#FF9800";
//     if (lowerStatus.includes("off")) return "#2196F3";
//     if (lowerStatus.includes("leave")) return "#673AB7";
//     return "#757575";
//   };

//   const formatMonthForDisplay = (monthStr) => {
//     if (!monthStr) return "";
//     const [year, month] = monthStr.split("-");
//     return new Date(year, month - 1).toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });
//   };

//   /**
//    * 3. New helper function to format a date string (e.g., YYYY-MM-DD or ISO)
//    * into Indian standard DD-MM-YYYY format.
//    */
//   const formatDateToIndianStandard = (dateString) => {
//     if (!dateString) return "--";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return dateString; // Return original string if date is invalid
//       }
//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
//       const year = date.getFullYear();
//       return `${day}-${month}-${year}`;
//     } catch (error) {
//       console.error("Error formatting date:", dateString, error);
//       return dateString; // Return original string on error
//     }
//   };

//   return (
//     <Box sx={{ p: 3, fontFamily: "sans-serif" }}>
//       <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
//         View Monthly Report
//       </Typography>

//       {/* Form Controls */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//           mb: 4,
//           alignItems: "center",
//         }}
//       >
//         <Select
//           value={selectedEmployee}
//           onChange={(e) => setSelectedEmployee(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: "white" }}
//         >
//           <MenuItem value="" disabled>
//             <em>Select Employee</em>
//           </MenuItem>
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
//           sx={{ bgcolor: "white" }}
//         >
//           <MenuItem value="" disabled>
//             <em>Select Month</em>
//           </MenuItem>
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
//           sx={{ px: 5, py: 1.5, minWidth: "120px" }}
//         >
//           {isLoading ? (
//             <CircularProgress size={24} color="inherit" />
//           ) : (
//             "Search"
//           )}
//         </Button>
//       </Box>

//       {/* Error Display */}
//       {error && (
//         <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Report Table */}
//       {reportData && (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   "& .MuiTableCell-root": {
//                     bgcolor: "primary.main",
//                     color: "white",
//                     fontWeight: "bold",
//                   },
//                 }}
//               >
//                 {/* 2. Added S.NO. column */}
//                 <TableCell>S.NO.</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>PUNCH IN</TableCell>
//                 <TableCell>PUNCH OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.length > 0 ? (
//                 reportData.map((row, index) => (
//                   <TableRow
//                     key={index}
//                     hover
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
//                     }}
//                   >
//                     {/* 2. Added cell for the serial number */}
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{row.day || "--"}</TableCell>
//                     {/* 3. Used the new date formatting function */}
//                     <TableCell>
//                       {formatDateToIndianStandard(row.date)}
//                     </TableCell>
//                     <TableCell>
//                       <Typography
//                         component="span"
//                         sx={{
//                           color: "white",
//                           bgcolor: getStatusColor(row.status),
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: "12px",
//                           fontSize: "0.75rem",
//                           fontWeight: "bold",
//                           display: "inline-block",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {row.status || "N/A"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{row.clock_in || "--"}</TableCell>
//                     <TableCell>{row.clock_out || "--"}</TableCell>
//                     <TableCell>{row.total_work || "--"}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   {/* 2. Updated colSpan to match the new number of columns (7) */}
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
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



// import React, { useState, useEffect } from "react";
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
//   Alert,
// } from "@mui/material";

// // You can change this to any year you want the dropdown to start from.
// const START_YEAR = 2022;

// /**
//  * Helper function to correctly parse a "DD-MM-YYYY" string into a Date object.
//  * This is crucial for reliable sorting.
//  * @param {string} dateString - The date string in DD-MM-YYYY format.
//  * @returns {Date}
//  */
// const parseIndianDate = (dateString) => {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   // Note: parts are [DD, MM, YYYY]. new Date() needs (YYYY, MM-1, DD).
//   if (parts.length === 3) {
//     const [day, month, year] = parts;
//     return new Date(year, month - 1, day);
//   }
//   return new Date(dateString); // Fallback
// };

// /**
//  * Calculates the duration between a start and end time string (HH:MM).
//  * @param {string | null} startTime - The start time, e.g., "09:30".
//  * @param {string | null} endTime - The end time, e.g., "17:45".
//  * @returns {string} - The formatted duration in HH:MM format, e.g., "08:15", or "--" if invalid.
//  */
// const calculateWorkDuration = (startTime, endTime) => {
//   if (!startTime || !endTime) {
//     return "--";
//   }

//   try {
//     const [startHours, startMinutes] = startTime.split(":").map(Number);
//     const [endHours, endMinutes] = endTime.split(":").map(Number);

//     if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
//       return "--";
//     }

//     const totalStartMinutes = startHours * 60 + startMinutes;
//     const totalEndMinutes = endHours * 60 + endMinutes;

//     let durationInMinutes = totalEndMinutes - totalStartMinutes;

//     if (durationInMinutes < 0) {
//       return "Invalid";
//     }

//     const hours = Math.floor(durationInMinutes / 60);
//     const minutes = durationInMinutes % 60;

//     // **MODIFIED PART: Format to HH:MM with leading zeros**
//     const formattedHours = String(hours).padStart(2, "0");
//     const formattedMinutes = String(minutes).padStart(2, "0");

//     return `${formattedHours}:${formattedMinutes}`;
//   } catch (error) {
//     console.error("Could not calculate duration for:", { startTime, endTime }, error);
//     return "--";
//   }
// };

// export default function MonthlyReport() {
//   // State for form inputs
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");

//   // State for data and UI
//   const [employees, setEmployees] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [reportData, setReportData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Effect to fetch the list of employees
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const loggedInUserId = localStorage.getItem("loggedInUser");
//         const accessToken = localStorage.getItem("accessToken");

//         if (!loggedInUserId || !accessToken) {
//           setError("User session details not found. Please log in again.");
//           return;
//         }

//         const url = `https://tdtlworld.com/hrms-backend/dropdown/${loggedInUserId}/`;
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         };

//         const response = await fetch(url, { method: "GET", headers });

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch employees. Server responded with status ${response.status}.`
//           );
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

//   // Effect to generate available months
//   useEffect(() => {
//     const generateMonths = () => {
//       const availableMonths = [];
//       const currentDate = new Date();
//       const currentYear = currentDate.getFullYear();
//       const currentMonthIndex = currentDate.getMonth();

//       for (let year = currentYear; year >= START_YEAR; year--) {
//         const startMonthIndex = year === currentYear ? currentMonthIndex : 11;
//         for (let monthIndex = startMonthIndex; monthIndex >= 0; monthIndex--) {
//           const monthNumber = monthIndex + 1;
//           const monthStr = String(monthNumber).padStart(2, "0");
//           availableMonths.push(`${year}-${monthStr}`);
//         }
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
//       setError("Please select both an employee and a month.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setReportData(null);

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         throw new Error(
//           "User session token expired or not found. Please log in again."
//         );
//       }

//       const url = "https://tdtlworld.com/hrms-backend/emp_monthly_report/";
//       const payload = {
//         employee_id: selectedEmployee,
//         month: selectedMonth,
//       };
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch report. Server responded with status ${response.status}.`
//         );
//       }

//       const responseJson = await response.json();

//       if (responseJson && responseJson.data && Array.isArray(responseJson.data)) {
//         const reportArray = responseJson.data;
//         const sortedData = reportArray.sort(
//           (a, b) => parseIndianDate(b.date) - parseIndianDate(a.date)
//         );
//         setReportData(sortedData);
//       } else {
//         throw new Error("Invalid report data format received from the server.");
//       }
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
//     if (!status) return "#757575";
//     const lowerStatus = status.toLowerCase();
//     if (lowerStatus.includes("present")) return "#4CAF50";
//     if (lowerStatus.includes("absent")) return "#F44336";
//     if (lowerStatus.includes("holiday")) return "#FF9800";
//     if (lowerStatus.includes("off")) return "#2196F3";
//     if (lowerStatus.includes("leave")) return "#673AB7";
//     return "#757575";
//   };

//   const formatMonthForDisplay = (monthStr) => {
//     if (!monthStr) return "";
//     const [year, month] = monthStr.split("-");
//     return new Date(year, month - 1).toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });
//   };

//   return (
//     <Box sx={{ p: 3, fontFamily: "sans-serif" }}>
//       <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
//         View Monthly Report
//       </Typography>

//       {/* Form Controls */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//           mb: 4,
//           alignItems: "center",
//         }}
//       >
//         <Select
//           value={selectedEmployee}
//           onChange={(e) => setSelectedEmployee(e.target.value)}
//           displayEmpty
//           fullWidth
//           sx={{ bgcolor: "white" }}
//         >
//           <MenuItem value="" disabled>
//             <em>Select Employee</em>
//           </MenuItem>
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
//           sx={{ bgcolor: "white" }}
//         >
//           <MenuItem value="" disabled>
//             <em>Select Month</em>
//           </MenuItem>
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
//           sx={{ px: 5, py: 1.5, minWidth: "120px" }}
//         >
//           {isLoading ? (
//             <CircularProgress size={24} color="inherit" />
//           ) : (
//             "Search"
//           )}
//         </Button>
//       </Box>

//       {/* Error Display */}
//       {error && (
//         <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Report Table */}
//       {reportData && (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   "& .MuiTableCell-root": {
//                     bgcolor: "primary.main",
//                     color: "white",
//                     fontWeight: "bold",
//                   },
//                 }}
//               >
//                 <TableCell>S.NO.</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>PUNCH IN</TableCell>
//                 <TableCell>PUNCH OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.length > 0 ? (
//                 reportData.map((row, index) => (
//                   <TableRow
//                     key={index}
//                     hover
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
//                     }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{row.day || "--"}</TableCell>
//                     <TableCell>{row.date || "--"}</TableCell>
//                     <TableCell>
//                       <Typography
//                         component="span"
//                         sx={{
//                           color: "white",
//                           bgcolor: getStatusColor(row.status),
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: "12px",
//                           fontSize: "0.75rem",
//                           fontWeight: "bold",
//                           display: "inline-block",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {row.status || "N/A"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{row.clock_in || "--"}</TableCell>
//                     <TableCell>{row.clock_out || "--"}</TableCell>
//                     <TableCell>
//                       {calculateWorkDuration(row.clock_in, row.clock_out)}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
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






// import React, { useState, useEffect } from "react";
// import {
//   Box, Typography, Button, Select, MenuItem, Paper, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, CircularProgress,
//   Alert, TablePagination,
// } from "@mui/material";

// // --- UNIFIED STYLING HELPERS ---

// // Badge color and style for status
// const getStatusStyle = (status) => {
//   const defaultStyle = {
//     px: 1.5,
//     py: 0.5,
//     borderRadius: '16px',
//     display: 'inline-block',
//     textAlign: 'center',
//     minWidth: '80px',
//     color: 'white',
//     fontSize: '0.75rem',
//     fontWeight: 'bold',
//     textTransform: 'capitalize'
//   };

//   switch (status?.toLowerCase()) {
//     case 'present':
//       return { ...defaultStyle, bgcolor: 'success.main' };
//     case 'absent':
//       return { ...defaultStyle, bgcolor: 'error.main' };
//     case 'on leave':
//     case 'leave':
//       return { ...defaultStyle, bgcolor: 'info.main' };
//     case 'holiday':
//       return { ...defaultStyle, bgcolor: 'warning.main' };
//     case 'week off':
//     case 'off':
//       return { ...defaultStyle, bgcolor: 'primary.main' };
//     default:
//       return { ...defaultStyle, bgcolor: 'grey.500' };
//   }
// };

// // Converts "HH:MM" -> "hh:mm AM/PM" format, returns "--" if "00:00"
// const formatTo12Hour = (timeString) => {
//   if (!timeString || timeString === "00:00") return "--";
//   try {
//     const [h, m] = timeString.split(":").map(Number);
//     if (isNaN(h) || isNaN(m)) return "--";
//     const period = h >= 12 ? "PM" : "AM";
//     let hour = h % 12;
//     if (hour === 0) hour = 12;
//     return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
//   } catch {
//     return "--";
//   }
// };

// // --- OTHER HELPERS for this file ---

// const START_YEAR = 2022;

// const parseIndianDate = (dateString) => {
//   if (!dateString) return null;
//   const parts = dateString.split("-");
//   if (parts.length === 3) {
//     const [day, month, year] = parts;
//     return new Date(year, month - 1, day);
//   }
//   return new Date(dateString);
// };

// const calculateWorkDuration = (startTime, endTime) => {
//   if (!startTime || !endTime) return "--";
//   try {
//     const [sh, sm] = startTime.split(":").map(Number);
//     const [eh, em] = endTime.split(":").map(Number);
//     const start = sh * 60 + sm;
//     const end = eh * 60 + em;
//     const duration = end - start;
//     if (isNaN(duration) || duration < 0) return "--";
//     const hours = Math.floor(duration / 60);
//     const minutes = duration % 60;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
//   } catch {
//     return "--";
//   }
// };

// const formatMonthForDisplay = (monthStr) => {
//   if (!monthStr) return "";
//   const [year, month] = monthStr.split("-");
//   return new Date(year, month - 1).toLocaleString("default", { month: "long", year: "numeric" });
// };

// // --- COMPONENT ---

// export default function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const userId = localStorage.getItem("loggedInUser");
//         const token = localStorage.getItem("accessToken");
//         if (!userId || !token) throw new Error("User session not found.");
//         const res = await fetch(`https://tdtlworld.com/hrms-backend/dropdown/${userId}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Failed to load employees.");
//         const data = await res.json();
//         setEmployees(data);
//       } catch (err) {
//         setError(err.message || "An unexpected error occurred.");
//       }
//     };
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     const current = new Date();
//     const generatedMonths = [];
//     for (let y = current.getFullYear(); y >= START_YEAR; y--) {
//       const maxM = y === current.getFullYear() ? current.getMonth() : 11;
//       for (let m = maxM; m >= 0; m--) {
//         generatedMonths.push(`${y}-${String(m + 1).padStart(2, "0")}`);
//       }
//     }
//     setMonths(generatedMonths);
//     if (generatedMonths.length > 0) {
//       setSelectedMonth(generatedMonths[0]);
//     }
//   }, []);

//   const handleSearch = async () => {
//     if (!selectedEmployee || !selectedMonth) {
//       setError("Please select both an employee and a month.");
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setReportData([]);
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) throw new Error("Access token not found.");
//       const res = await fetch("https://tdtlworld.com/hrms-backend/emp_monthly_report/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ employee_id: selectedEmployee, month: selectedMonth }),
//       });
//       if (!res.ok) throw new Error(`Server responded with status ${res.status}.`);
//       const json = await res.json();
//       // const sorted = (json.data || []).sort((a, b) => parseIndianDate(b.date) - parseIndianDate(a.date));
//       setReportData(json.data);
//       setPage(0);
//     } catch (err) {
//       setError(err.message || "Failed to load report data.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChangePage = (_, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
//         View Monthly Report
//       </Typography>

//       <Paper sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
//         <Select
//           size="small"
//           value={selectedEmployee}
//           onChange={(e) => setSelectedEmployee(e.target.value)}
//           displayEmpty
//           sx={{ minWidth: 200, flexGrow: 1 }}
//         >
//           <MenuItem value=""><em>Select Employee</em></MenuItem>
//           {employees.map((emp) => (
//             <MenuItem key={emp.employee_id} value={emp.employee_id}>{emp.name}</MenuItem>
//           ))}
//         </Select>

//         <Select
//           size="small"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           displayEmpty
//           sx={{ minWidth: 200, flexGrow: 1 }}
//         >
//           <MenuItem value=""><em>Select Month</em></MenuItem>
//           {months.map((m) => (
//             <MenuItem key={m} value={m}>{formatMonthForDisplay(m)}</MenuItem>
//           ))}
//         </Select>

//         <Button
//           variant="contained"
//           onClick={handleSearch}
//           disabled={isLoading}
//           sx={{ minWidth: 120, height: 40 }}
//         >
//           {isLoading ? <CircularProgress size={24} color="inherit" /> : "Search"}
//         </Button>
//       </Paper>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//       <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }} elevation={3}>
//         <TableContainer>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {["S.NO.", "DAY", "DATE", "STATUS", "PUNCH IN", "PUNCH OUT", "TOTAL WORK"].map((head) => (
//                   <TableCell key={head} sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold' }}>
//                     {head}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}><CircularProgress /></TableCell>
//                 </TableRow>
//               ) : reportData.length > 0 ? (
//                 reportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
//                   <TableRow key={row.date || i} hover>
//                     <TableCell>{page * rowsPerPage + i + 1}</TableCell>
//                     <TableCell>{row.day || "--"}</TableCell>
//                     <TableCell>{row.date || "--"}</TableCell>
//                     <TableCell>
//                       <Box sx={getStatusStyle(row.status)}>
//                         {row.status || "N/A"}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{formatTo12Hour(row.clock_in)}</TableCell>
//                     <TableCell>{formatTo12Hour(row.clock_out)}</TableCell>
//                     <TableCell>{calculateWorkDuration(row.clock_in, row.clock_out)}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                     <Typography>No data to display. Please make a selection and click Search.</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {!isLoading && reportData.length > 0 && (
//           <TablePagination
//             component="div"
//             count={reportData.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[10, 25, 50, 100]}
//           />
//         )}
//       </Paper>
//     </Box>
//   );
// }




// import React, { useState, useEffect } from "react";
// import {
//   Box, Typography, Button, Select, MenuItem, Paper, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, CircularProgress,
//   TablePagination, TextField, InputAdornment, Skeleton, useTheme, useMediaQuery, createTheme, ThemeProvider
// } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
// import Swal from 'sweetalert2';

// // --- THEME AND STYLING ---

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
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//     },
//     body2: {
//       fontSize: '0.95rem',
//     },
//   },
// });

// const getStatusStyle = (status) => {
//   const defaultStyle = {
//     px: 1.5,
//     py: 0.5,
//     borderRadius: '16px',
//     display: 'inline-block',
//     textAlign: 'center',
//     minWidth: '80px',
//     color: 'white',
//     fontSize: '0.75rem',
//     fontWeight: 'bold',
//     textTransform: 'capitalize'
//   };

//   switch (status?.toLowerCase()) {
//     case 'present':
//       return { ...defaultStyle, bgcolor: 'success.main' };
//     case 'absent':
//       return { ...defaultStyle, bgcolor: 'error.main' };
//     case 'on leave':
//     case 'leave':
//       return { ...defaultStyle, bgcolor: 'info.main' };
//     case 'holiday':
//       return { ...defaultStyle, bgcolor: 'warning.main' };
//     case 'week off':
//     case 'off':
//       return { ...defaultStyle, bgcolor: 'primary.main' };
//     default:
//       return { ...defaultStyle, bgcolor: 'grey.500' };
//   }
// };

// // --- HELPER FUNCTIONS ---

// const formatTo12Hour = (timeString) => {
//   if (!timeString || timeString === "00:00") return "--";
//   try {
//     const [h, m] = timeString.split(":").map(Number);
//     if (isNaN(h) || isNaN(m)) return "--";
//     const period = h >= 12 ? "PM" : "AM";
//     let hour = h % 12;
//     if (hour === 0) hour = 12;
//     return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
//   } catch {
//     return "--";
//   }
// };

// const calculateWorkDuration = (startTime, endTime) => {
//   if (!startTime || !endTime) return "--";
//   try {
//     const [sh, sm] = startTime.split(":").map(Number);
//     const [eh, em] = endTime.split(":").map(Number);
//     const start = sh * 60 + sm;
//     const end = eh * 60 + em;
//     const duration = end - start;
//     if (isNaN(duration) || duration < 0) return "--";
//     const hours = Math.floor(duration / 60);
//     const minutes = duration % 60;
//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
//   } catch {
//     return "--";
//   }
// };

// const formatMonthForDisplay = (monthStr) => {
//   if (!monthStr) return "";
//   const [year, month] = monthStr.split("-");
//   return new Date(year, month - 1).toLocaleString("default", { month: "long", year: "numeric" });
// };

// const START_YEAR = 2022;

// // --- MAIN COMPONENT ---

// function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const internalTheme = useTheme();
//   const isMobile = useMediaQuery(internalTheme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const userId = localStorage.getItem("loggedInUser");
//         const token = localStorage.getItem("accessToken");
//         if (!userId || !token) throw new Error("User session not found.");
//         const res = await fetch(`https://tdtlworld.com/hrms-backend/dropdown/${userId}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Failed to load employees.");
//         const data = await res.json();
//         setEmployees(data);
//       } catch (err) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: err.message || "An unexpected error occurred.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       }
//     };
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     const current = new Date();
//     const generatedMonths = [];
//     for (let y = current.getFullYear(); y >= START_YEAR; y--) {
//       const maxM = y === current.getFullYear() ? current.getMonth() : 11;
//       for (let m = maxM; m >= 0; m--) {
//         generatedMonths.push(`${y}-${String(m + 1).padStart(2, "0")}`);
//       }
//     }
//     setMonths(generatedMonths);
//     if (generatedMonths.length > 0) {
//       setSelectedMonth(generatedMonths[0]);
//     }
//   }, []);

//   useEffect(() => {
//     const lowercasedFilter = searchTerm.toLowerCase();
//     const filtered = reportData.filter(item => {
//       return (
//         item.day?.toLowerCase().includes(lowercasedFilter) ||
//         item.date?.toLowerCase().includes(lowercasedFilter) ||
//         item.status?.toLowerCase().includes(lowercasedFilter)
//       );
//     });
//     setFilteredData(filtered);
//     setPage(0);
//   }, [searchTerm, reportData]);


//   const handleSearch = async () => {
//     if (!selectedEmployee || !selectedMonth) {
//       Swal.fire({
//         icon: 'info',
//         title: 'Missing Information',
//         text: 'Please select both an employee and a month.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setIsLoading(true);
//     setReportData([]);
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) throw new Error("Access token not found.");
//       const res = await fetch("https://tdtlworld.com/hrms-backend/emp_monthly_report/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ employee_id: selectedEmployee, month: selectedMonth }),
//       });
//       if (!res.ok) throw new Error(`Server responded with status ${res.status}.`);
//       const json = await res.json();
//       setReportData(json.data || []);
//       setPage(0);
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Load Report',
//         text: err.message || "An unexpected error occurred.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChangePage = (_, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (e) => {
//     setRowsPerPage(parseInt(e.target.value, 10));
//     setPage(0);
//   };

//   const currentData = searchTerm ? filteredData : reportData;

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" color="primary" sx={{ mb: 5, fontWeight: 'bold' }}>
//          Monthly Report
//       </Typography>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           gap: 2,
//           mb: 2,
//           flexDirection: isMobile ? 'column' : 'row',
//         }}
//       >
//         <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
//           <Select
//             size="small"
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//             displayEmpty
//             sx={{ minWidth: 200, width: isMobile ? '100%' : 'auto' }}
//           >
//             <MenuItem value=""><em>Select Employee</em></MenuItem>
//             {employees.map((emp) => (
//               <MenuItem key={emp.employee_id} value={emp.employee_id}>{emp.name}</MenuItem>
//             ))}
//           </Select>

//           <Select
//             size="small"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             displayEmpty
//             sx={{ minWidth: 200, width: isMobile ? '100%' : 'auto' }}
//           >
//             <MenuItem value=""><em>Select Month</em></MenuItem>
//             {months.map((m) => (
//               <MenuItem key={m} value={m}>{formatMonthForDisplay(m)}</MenuItem>
//             ))}
//           </Select>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSearch}
//             disabled={isLoading}
//             sx={{
//               color: 'white',
//               '&:hover': { bgcolor: 'primary.dark' },
//               height: 40,
//               width: isMobile ? '100%' : 'auto'
//             }}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : "Search"}
//           </Button>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             )
//           }}
//           sx={{ width: isMobile ? '100%' : 'auto' }}
//         />
//       </Box>

//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ bgcolor: 'primary.main' }}>
//             <TableRow>
//               {["S.NO.", "DAY", "DATE", "STATUS", "PUNCH IN", "PUNCH OUT", "TOTAL WORK"].map((head) => (
//                 <TableCell key={head} sx={{ color: 'white', fontWeight: 'bold' }}>
//                   {head}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {isLoading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="rectangular" width={80} height={25} sx={{ borderRadius: '16px' }} /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                 </TableRow>
//               ))
//             ) : currentData.length > 0 ? (
//               currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
//                 <TableRow key={row.date || i} hover>
//                   <TableCell>{page * rowsPerPage + i + 1}</TableCell>
//                   <TableCell>{row.day || "--"}</TableCell>
//                   <TableCell>{row.date || "--"}</TableCell>
//                   <TableCell>
//                     <Box sx={getStatusStyle(row.status)}>
//                       {row.status || "N/A"}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{formatTo12Hour(row.clock_in)}</TableCell>
//                   <TableCell>{formatTo12Hour(row.clock_out)}</TableCell>
//                   <TableCell>{calculateWorkDuration(row.clock_in, row.clock_out)}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                   <Typography>No data to display. Please make a selection and click Search.</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           p: 2,
//           flexDirection: isMobile ? 'column' : 'row',
//           gap: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {currentData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, currentData.length)} of {currentData.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={currentData.length}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           sx={{
//             '& .MuiTablePagination-selectIcon, & .MuiTablePagination-actions': {
//               color: 'primary.main',
//             },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }

// export default function ThemedMonthlyReport() {
//   return (
//     <ThemeProvider theme={theme}>
//       <MonthlyReport />
//     </ThemeProvider>
//   );
// }









import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Select, MenuItem, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  TablePagination, TextField, InputAdornment, Skeleton, useTheme, useMediaQuery, createTheme, ThemeProvider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';

// --- THEME AND STYLING ---

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
  typography: {
    h5: {
      fontWeight: 'bold',
    },
    body2: {
      fontSize: '0.95rem',
    },
  },
});

const getStatusStyle = (status) => {
  const defaultStyle = {
    px: 1.5,
    py: 0.5,
    borderRadius: '16px',
    display: 'inline-block',
    textAlign: 'center',
    minWidth: '80px',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  };

  switch (status?.toLowerCase()) {
    case 'present':
      return { ...defaultStyle, bgcolor: 'success.main' };
    case 'absent':
      return { ...defaultStyle, bgcolor: 'error.main' };
    case 'on leave':
    case 'leave':
      return { ...defaultStyle, bgcolor: 'info.main' };
    case 'holiday':
      return { ...defaultStyle, bgcolor: 'warning.main' };
    case 'week off':
    case 'off':
      return { ...defaultStyle, bgcolor: 'primary.main' };
    default:
      return { ...defaultStyle, bgcolor: 'grey.500' };
  }
};

// --- HELPER FUNCTIONS ---

const formatTo12Hour = (timeString) => {
  if (!timeString || timeString === "00:00") return "--";
  try {
    const [h, m] = timeString.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return "--";
    const period = h >= 12 ? "PM" : "AM";
    let hour = h % 12;
    if (hour === 0) hour = 12;
    return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
  } catch {
    return "--";
  }
};

const calculateWorkDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return "--";
  try {
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    const duration = end - start;
    if (isNaN(duration) || duration < 0) return "--";
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  } catch {
    return "--";
  }
};

const formatMonthForDisplay = (monthStr) => {
  if (!monthStr) return "";
  const [year, month] = monthStr.split("-");
  return new Date(year, month - 1).toLocaleString("default", { month: "long", year: "numeric" });
};

const START_YEAR = 2022;

// --- MAIN COMPONENT ---

function MonthlyReport() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [employees, setEmployees] = useState([]);
  const [months, setMonths] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const internalTheme = useTheme();
  const isMobile = useMediaQuery(internalTheme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const userId = localStorage.getItem("loggedInUser");
        const token = localStorage.getItem("accessToken");
        if (!userId || !token) throw new Error("User session not found.");
        const res = await fetch(`https://vethrbackend.vetrinahealthcare.com/dropdown/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load employees.");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message || "An unexpected error occurred.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const current = new Date();
    const generatedMonths = [];
    for (let y = current.getFullYear(); y >= START_YEAR; y--) {
      const maxM = y === current.getFullYear() ? current.getMonth() : 11;
      for (let m = maxM; m >= 0; m--) {
        generatedMonths.push(`${y}-${String(m + 1).padStart(2, "0")}`);
      }
    }
    setMonths(generatedMonths);
    if (generatedMonths.length > 0) {
      setSelectedMonth(generatedMonths[0]);
    }
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = reportData.filter(item => {
      return (
        item.day?.toLowerCase().includes(lowercasedFilter) ||
        item.date?.toLowerCase().includes(lowercasedFilter) ||
        item.status?.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredData(filtered);
    setPage(0);
  }, [searchTerm, reportData]);


  const handleSearch = async () => {
    if (!selectedEmployee || !selectedMonth) {
      Swal.fire({
        icon: 'info',
        title: 'Missing Information',
        text: 'Please select both an employee and a month.',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setIsLoading(true);
    setReportData([]);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found.");
      const res = await fetch("https://tdtlworld.com/hrms-backend/emp_monthly_report/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ employee_id: selectedEmployee, month: selectedMonth }),
      });
      if (!res.ok) throw new Error(`Server responded with status ${res.status}.`);
      const json = await res.json();
      setReportData(json.data || []);
      setPage(0);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Report',
        text: err.message || "An unexpected error occurred.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const currentData = searchTerm ? filteredData : reportData;

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" color="primary" sx={{ mb: 5, fontWeight: 'bold' }}>
         Monthly Report
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mb: 2,
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
          <Select
            size="small"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200, width: isMobile ? '100%' : 'auto' }}
          >
            <MenuItem value=""><em>Select Employee</em></MenuItem>
            {employees.map((emp) => (
              <MenuItem key={emp.employee_id} value={emp.employee_id}>{emp.name}</MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200, width: isMobile ? '100%' : 'auto' }}
          >
            <MenuItem value=""><em>Select Month</em></MenuItem>
            {months.map((m) => (
              <MenuItem key={m} value={m}>{formatMonthForDisplay(m)}</MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={isLoading}
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              height: 40,
              width: isMobile ? '100%' : 'auto'
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Search"}
          </Button>
        </Box>
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              {["S.NO.", "DAY", "DATE", "STATUS", "PUNCH IN", "PUNCH OUT", "TOTAL WORK"].map((head) => (
                <TableCell key={head} sx={{ color: 'white', fontWeight: 'bold' }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={25} sx={{ borderRadius: '16px' }} /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                </TableRow>
              ))
            ) : currentData.length > 0 ? (
              currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                <TableRow key={row.date || i} hover>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{row.day || "--"}</TableCell>
                  <TableCell>{row.date || "--"}</TableCell>
                  <TableCell>
                    <Box sx={getStatusStyle(row.status)}>
                      {row.status || "N/A"}
                    </Box>
                  </TableCell>
                  <TableCell>{formatTo12Hour(row.clock_in)}</TableCell>
                  <TableCell>{formatTo12Hour(row.clock_out)}</TableCell>
                  <TableCell>{calculateWorkDuration(row.clock_in, row.clock_out)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography>No data to display. Please make a selection and click Search.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {currentData.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, currentData.length)} of {currentData.length} results
        </Typography>
        <TablePagination
          component="div"
          count={currentData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            '& .MuiTablePagination-selectIcon, & .MuiTablePagination-actions': {
              color: 'primary.main',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default function ThemedMonthlyReport() {
  return (
    <ThemeProvider theme={theme}>
      <MonthlyReport />
    </ThemeProvider>
  );
}