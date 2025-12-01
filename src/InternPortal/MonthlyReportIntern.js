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
  TableRow
} from '@mui/material';


export default function MonthlyReport() {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [reportData, setReportData] = useState(null);
  const [months, setMonths] = useState([]);

  const employees = [
    'Gayatri Kashid',
    // Add more employees as needed
  ];

  // Generate available months (current and past months)
  useEffect(() => {
    const generateMonths = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const availableMonths = [];

      // Generate months for current year up to current month
      for (let month = 0; month <= currentMonth; month++) {
        availableMonths.push(`${currentYear}-${String(month + 1).padStart(2, '0')}`);
      }

      // Add months from previous year if needed
      const previousYear = currentYear - 1;
      for (let month = 11; month > currentMonth; month--) {
        availableMonths.unshift(`${previousYear}-${String(month + 1).padStart(2, '0')}`);
      }

      setMonths(availableMonths);
      // Set default to current month
      setSelectedMonth(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
    };

    generateMonths();
  }, []);

  const mockData = [
    { day: 'Tuesday', date: '2024-10-01', status: 'Present', clockIn: '09:48 am', clockOut: '05:20 pm', totalWork: '8:67:39' },
    { day: 'Wednesday', date: '2024-10-02', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
    { day: 'Thursday', date: '2024-10-03', status: 'Present', clockIn: '09:22 am', clockOut: '06:38 pm', totalWork: '8:34' },
    { day: 'Friday', date: '2024-10-04', status: 'Casual Leave (CL)', clockIn: '', clockOut: '', totalWork: '' },
    { day: 'Saturday', date: '2024-10-05', status: 'Absent', clockIn: '', clockOut: '', totalWork: '' },
    { day: 'Sunday', date: '2024-10-06', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
    { day: 'Monday', date: '2024-10-07', status: 'Present', clockIn: '09:27 am', clockOut: '06:44 pm', totalWork: '4:57' },
    { day: 'Tuesday', date: '2024-10-08', status: 'Present + Casual Leave (CL)', clockIn: '09:35 am', clockOut: '06:57 pm', totalWork: '8:36' },
    { day: 'Wednesday', date: '2024-10-09', status: 'Absent', clockIn: '', clockOut: '', totalWork: '' },
    { day: 'Thursday', date: '2024-10-10', status: 'Present', clockIn: '02:19 pm', clockOut: '01:41 pm', totalWork: '6:48:11' },
    { day: 'Friday', date: '2024-10-11', status: 'Present', clockIn: '07:55 am', clockOut: '08:10 pm', totalWork: '12:15' },
    { day: 'Saturday', date: '2024-10-12', status: 'Off Saturday', clockIn: '', clockOut: '', totalWork: '' },
    { day: 'Sunday', date: '2024-10-13', status: 'Holiday', clockIn: '', clockOut: '', totalWork: '' },
  ];

  const handleSearch = () => {
    if (selectedEmployee && selectedMonth) {
      setReportData(mockData);
    } else {
      alert('Please select both employee and month');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return '#4CAF50';
      case 'absent':
        return '#F44336';
      case 'holiday':
        return '#FF9800';
      case 'off saturday':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    return `${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>View Monthly Report</Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 4,
        alignItems: 'center'
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#f5f5f5',
          p: 1,
          borderRadius: 1,
          flex: 1
        }}>
          <Typography sx={{ color: '#666', minWidth: 80 }}>Employee</Typography>
          <Select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            sx={{ 
              flex: 1,
              bgcolor: 'white',
              '& .MuiSelect-select': { py: 1 }
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Employee</MenuItem>
            {employees.map((emp) => (
              <MenuItem key={emp} value={emp}>{emp}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#f5f5f5',
          p: 1,
          borderRadius: 1,
          flex: 1
        }}>
          <Typography sx={{ color: '#666', minWidth: 80 }}>Select Month</Typography>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ 
              flex: 1,
              bgcolor: 'white',
              '& .MuiSelect-select': { py: 1 }
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Month</MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {formatMonth(month)}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Button 
          variant="contained"
          onClick={handleSearch}
          sx={{ 
            px: 4,
            py: 1,
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' }
          }}
        >
          Search
        </Button>
      </Box>

      {reportData && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell>DAY</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>CLOCK IN</TableCell>
                <TableCell>CLOCK OUT</TableCell>
                <TableCell>TOTAL WORK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.day}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Typography 
                      sx={{ 
                        color: getStatusColor(row.status),
                        fontWeight: 500
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.clockIn}</TableCell>
                  <TableCell>{row.clockOut}</TableCell>
                  <TableCell>{row.totalWork}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
