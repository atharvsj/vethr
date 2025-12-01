import React, { useState } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField,
  TablePagination, InputAdornment, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

// Define theme colors for consistency as per the prompt
const themeColors = {
  primary: '#8C257C',
  primaryDark: '#6d1d60',
  textOnPrimary: '#FFFFFF',
};

// Helper function to format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

export default function HolidayView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Added more data to make pagination functional and showcase the design
  const holidayData = [
    { id: 1, date: '2024-01-01', day: 'Monday', holiday: 'New Year', type: 'Restricted Holiday' },
    { id: 2, date: '2024-01-26', day: 'Friday', holiday: 'Republic Day', type: 'National Holiday' },
    { id: 3, date: '2024-03-25', day: 'Monday', holiday: 'Holi', type: 'Restricted Holiday' },
    { id: 4, date: '2024-04-09', day: 'Tuesday', holiday: 'Ugadi', type: 'Restricted Holiday' },
    { id: 5, date: '2024-05-01', day: 'Wednesday', holiday: 'May Day', type: 'National Holiday' },
    { id: 6, date: '2024-08-15', day: 'Thursday', holiday: 'Independence Day', type: 'National Holiday' },
    { id: 7, date: '2024-09-07', day: 'Saturday', holiday: 'Ganesh Chaturthi', type: 'Restricted Holiday' },
    { id: 8, date: '2024-10-02', day: 'Wednesday', holiday: 'Gandhi Jayanti', type: 'National Holiday' },
    { id: 9, date: '2024-10-11', day: 'Friday', holiday: 'Dussehra', type: 'Restricted Holiday' },
    { id: 10, date: '2024-11-01', day: 'Friday', holiday: 'Diwali', type: 'National Holiday' },
    { id: 11, date: '2024-12-25', day: 'Wednesday', holiday: 'Christmas', type: 'Restricted Holiday' },
  ];

  const filteredData = holidayData.filter(holiday =>
    holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(holiday.date).includes(searchTerm) || // Search formatted date
    holiday.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ** THE FIX IS HERE **
  // 1. Get the theme object
  const theme = useTheme();
  // 2. Use the theme object to create the media query string
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    // Main container with Paper styling
    <Box component={Paper} p={3}>
      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{
          color: themeColors.primary,
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Holidays 2024
      </Typography>

      {/* Header section with "Add" button and Search bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          mb: 2,
        }}
      >
        
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
            ),
          }}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        />
      </Box>

      {/* Table Container */}
      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          {/* Table Head with custom styling */}
          <TableHead sx={{ bgcolor: themeColors.primary }}>
            <TableRow>
              <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: 'bold' }}>SR NO.</TableCell>
              <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: 'bold' }}>DATE</TableCell>
              <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: 'bold' }}>DAY</TableCell>
              <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: 'bold' }}>HOLIDAY</TableCell>
              <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: 'bold' }}>TYPE</TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((holiday, index) => (
                <TableRow
                  key={holiday.id}
                  sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                >
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(holiday.date)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.day}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.holiday}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>
                    <Box sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '16px',
                      display: 'inline-block',
                      bgcolor: holiday.type === 'National Holiday' ? themeColors.primary : 'success.main',
                      color: 'white',
                      fontSize: '0.8rem',
                    }}>
                      {holiday.type}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
            // Styling pagination action icons to match the theme
            '.MuiIconButton-root:not(.Mui-disabled)': {
                color: themeColors.primary
            }
        }}
      />
    </Box>
  );
}