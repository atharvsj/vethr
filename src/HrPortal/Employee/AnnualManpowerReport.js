import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// Sample data - replace with your actual data source (e.g., API fetch)
const reportData = [
  { id: 1, department: 'Human Resource', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 2, department: 'Operations', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 3, department: 'Account and Finance', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 4, department: 'Purchase', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 5, department: 'Marketing', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 6, department: 'QA AND QC', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 7, department: 'Production', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 8, department: 'Sales', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 9, department: 'Research & Development', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 10, department: 'Information Technology', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 11, department: 'Factory', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
  { id: 12, department: 'Total', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 },
];

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default function AnnualManpowerReport() {
  // In a real app, you would fetch reportData using useEffect and useState

  // Calculate totals for the "Total" row if not pre-calculated
  // This is a simplified example; robust calculation might be needed based on your data structure
  const totalRowData = { ...reportData.find(row => row.department === 'Total') }; // Get a copy
  if (totalRowData) {
    months.forEach(month => {
      const monthKey = month.toLowerCase();
      totalRowData[monthKey] = reportData
        .filter(row => row.department !== 'Total')
        .reduce((sum, row) => sum + (row[monthKey] || 0), 0);
    });
    totalRowData.total = reportData
        .filter(row => row.department !== 'Total')
        .reduce((sum, row) => sum + (row.total || 0), 0); // Or sum of month totals
  }


  const tableHeaderCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5', // Light grey background for header
    borderRight: '1px solid #e0e0e0', // Vertical line for all headers
    padding: '8px 12px', // Adjust padding for a tighter look
    textAlign: 'center', // Center align header text
  };

  const tableBodyCellStyle = {
    borderRight: '1px solid #e0e0e0',
    padding: '8px 12px',
    textAlign: 'center', // Center align numeric data
  };

  const departmentCellStyle = {
    ...tableBodyCellStyle,
    textAlign: 'left', // Department name left-aligned
    minWidth: '200px', // Ensure department column has enough width
  };
  const srNoCellStyle = {
    ...tableBodyCellStyle,
    textAlign: 'left', // SR.NO left-aligned
    minWidth: '60px',
  };


  return (
    <Box sx={{ p: { xs: 1, md: 2 }, backgroundColor: '#ffffff' /* White background for the page */ }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
        Annual Manpower Report
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 1 }}>
        <TableContainer sx={{ maxHeight: { xs: '70vh', md: 'auto' } }}> {/* Max height for scroll on smaller screens */}
          <Table stickyHeader size="small" aria-label="annual manpower report table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...tableHeaderCellStyle, minWidth: '60px', textAlign: 'left' }}>SR. NO.</TableCell>
                <TableCell sx={{ ...tableHeaderCellStyle, minWidth: '200px', textAlign: 'left' }}>DEPARTMENT</TableCell>
                {months.map((month) => (
                  <TableCell key={month} sx={{ ...tableHeaderCellStyle, minWidth: '50px' }}>{month}</TableCell>
                ))}
                <TableCell sx={{ ...tableHeaderCellStyle, minWidth: '60px', borderRight: 'none' /* No right border for last header */ }}>TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((row, index) => {
                const isTotalRow = row.department === 'Total';
                const dataToDisplay = isTotalRow && totalRowData ? totalRowData : row;

                return (
                  <TableRow
                    hover
                    key={row.id || index}
                    sx={{
                      backgroundColor: isTotalRow ? '#f0f0f0' : 'inherit', // Slightly different background for Total row
                      '& td, & th': { fontWeight: isTotalRow ? 'bold' : 'normal' }, // Bold text for Total row
                    }}
                  >
                    <TableCell sx={srNoCellStyle}>{dataToDisplay.id}</TableCell>
                    <TableCell sx={departmentCellStyle}>{dataToDisplay.department}</TableCell>
                    {months.map((month) => (
                      <TableCell key={`${dataToDisplay.id}-${month}`} sx={tableBodyCellStyle}>
                        {dataToDisplay[month.toLowerCase()] !== undefined ? dataToDisplay[month.toLowerCase()] : 0}
                      </TableCell>
                    ))}
                    <TableCell sx={{ ...tableBodyCellStyle, borderRight: 'none', fontWeight: 'bold' /* Ensure total is bold */ }}>
                      {dataToDisplay.total !== undefined ? dataToDisplay.total : 0}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
     
    </Box>
  );
}