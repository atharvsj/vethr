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
//   TableRow
// } from '@mui/material';


// export default function MonthlyReport() {
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [reportData, setReportData] = useState(null);
//   const [months, setMonths] = useState([]);

//   const employees = [
//     'Prasad Shinde',
//     // Add more employees as needed
//   ];

//   // Generate available months (current and past months)
//   useEffect(() => {
//     const generateMonths = () => {
//       const currentDate = new Date();
//       const currentYear = currentDate.getFullYear();
//       const currentMonth = currentDate.getMonth();
//       const availableMonths = [];

//       // Generate months for current year up to current month
//       for (let month = 0; month <= currentMonth; month++) {
//         availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
//       }

//       // Add months from previous year if needed
//       const previousYear = currentYear - 1;
//       for (let month = 11; month > currentMonth; month--) {
//         availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
//       }

//       setMonths(availableMonths);
//       // Set default to current month
//       setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
//     };

//     generateMonths();
//   }, []);

//   const mockData = [
//     { day: 'Tuesday', date: '2024-10-01', status: 'Present', clockIn: '09:48 am', clockOut: '05:20 pm', totalWork: '8:67:39' },
//     { day: 'Wednesday', date: '2024-10-02', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
//     { day: 'Thursday', date: '2024-10-03', status: 'Present', clockIn: '09:22 am', clockOut: '06:38 pm', totalWork: '8:34' },
//     { day: 'Friday', date: '2024-10-04', status: 'Casual Leave (CL)', clockIn: '', clockOut: '', totalWork: '' },
//     { day: 'Saturday', date: '2024-10-05', status: 'Absent', clockIn: '', clockOut: '', totalWork: '' },
//     { day: 'Sunday', date: '2024-10-06', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
//     { day: 'Monday', date: '2024-10-07', status: 'Present', clockIn: '09:27 am', clockOut: '06:44 pm', totalWork: '4:57' },
//     { day: 'Tuesday', date: '2024-10-08', status: 'Present + Casual Leave (CL)', clockIn: '09:35 am', clockOut: '06:57 pm', totalWork: '8:36' },
//     { day: 'Wednesday', date: '2024-10-09', status: 'Absent', clockIn: '', clockOut: '', totalWork: '' },
//     { day: 'Thursday', date: '2024-10-10', status: 'Present', clockIn: '02:19 pm', clockOut: '01:41 pm', totalWork: '6:48:11' },
//     { day: 'Friday', date: '2024-10-11', status: 'Present', clockIn: '07:55 am', clockOut: '08:10 pm', totalWork: '12:15' },
//     { day: 'Saturday', date: '2024-10-12', status: 'Off Saturday', clockIn: '', clockOut: '', totalWork: '' },
//     { day: 'Sunday', date: '2024-10-13', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
//   ];

//   const handleSearch = () => {
//     if (selectedEmployee && selectedMonth) {
//       setReportData(mockData);
//     } else {
//       alert('Please select both employee and month');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'present':
//         return '#4CAF50';
//       case 'absent':
//         return '#F44336';
//       case 'holiday':
//         return '#FF9800';
//       case 'off saturday':
//         return '#2196F3';
//       default:
//         return '#757575';
//     }
//   };

//   const formatMonth = (monthStr) => {
//     const [year, month] = monthStr.split('-');
//     return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>
      
//       <Box sx={{ 
//         display: 'flex', 
//         gap: 2, 
//         mb: 4,
//         alignItems: 'center'
//       }}>
//         <Box sx={{ 
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1,
//           bgcolor: '#f5f5f5',
//           p: 1,
//           borderRadius: 1,
//           flex: 1
//         }}>
//           <Typography sx={{ color: '#666', minWidth: 80 }}>Employee</Typography>
//           <Select
//             value={selectedEmployee}
//             onChange={(e) => setSelectedEmployee(e.target.value)}
//             sx={{ 
//               flex: 1,
//               bgcolor: 'white',
//               '& .MuiSelect-select': { py: 1 }
//             }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>Select Employee</MenuItem>
//             {employees.map((emp) => (
//               <MenuItem key={emp} value={emp}>{emp}</MenuItem>
//             ))}
//           </Select>
//         </Box>

//         <Box sx={{ 
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1,
//           bgcolor: '#f5f5f5',
//           p: 1,
//           borderRadius: 1,
//           flex: 1
//         }}>
//           <Typography sx={{ color: '#666', minWidth: 80 }}>Select Month</Typography>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             sx={{ 
//               flex: 1,
//               bgcolor: 'white',
//               '& .MuiSelect-select': { py: 1 }
//             }}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>Select Month</MenuItem>
//             {months.map((month) => (
//               <MenuItem key={month} value={month}>
//                 {formatMonth(month)}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         <Button 
//           variant="contained"
//           onClick={handleSearch}
//           sx={{ 
//             px: 4,
//             py: 1,
//             bgcolor: '#1976d2',
//             '&:hover': { bgcolor: '#1565c0' }
//           }}
//         >
//           Search
//         </Button>
//       </Box>

//       {reportData && (
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>STATUS</TableCell>
//                 <TableCell>CLOCK IN</TableCell>
//                 <TableCell>CLOCK OUT</TableCell>
//                 <TableCell>TOTAL WORK</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.day}</TableCell>
//                   <TableCell>{row.date}</TableCell>
//                   <TableCell>
//                     <Typography 
//                       sx={{ 
//                         color: getStatusColor(row.status),
//                         fontWeight: 500
//                       }}
//                     >
//                       {row.status}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>{row.clockIn}</TableCell>
//                   <TableCell>{row.clockOut}</TableCell>
//                   <TableCell>{row.totalWork}</TableCell>
//                 </TableRow>
//               ))}
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
// } ///




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

// Reusable component for professional, centered table cells
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


export default function MonthlyReport() {
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
          ) : ( <MenuItem disabled>Loading employees...</MenuItem> )}
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