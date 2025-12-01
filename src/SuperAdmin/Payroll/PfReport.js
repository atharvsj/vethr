import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputAdornment,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PfReport = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const employees = [
    { id: 'V0001', name: 'Mangesh Chadigachkar', pfNumber: '0', days: '0', salary: '0', basic: '0', empContribution: '0', empPf: '0', employerPfPension: '0', employerPfEoli: '0', employerPfAdmin: '0', total: '0' },
    { id: 'V0006', name: 'Kumar Patil', pfNumber: '0', days: '0', salary: '0', basic: '0', empContribution: '0', empPf: '0', employerPfPension: '0', employerPfEoli: '0', employerPfAdmin: '0', total: '0' },
    { id: 'V0017', name: 'Ganesh Mohite', pfNumber: '0', days: '0', salary: '0', basic: '0', empContribution: '0', empPf: '0', employerPfPension: '0', employerPfEoli: '0', employerPfAdmin: '0', total: '0' },
    { id: 'V0020', name: 'Rupali Mali', pfNumber: '0', days: '0', salary: '0', basic: '0', empContribution: '0', empPf: '0', employerPfPension: '0', employerPfEoli: '0', employerPfAdmin: '0', total: '0' },
    { id: 'V0075', name: 'Shailesh Jadhav', pfNumber: '0', days: '0', salary: '0', basic: '0', empContribution: '0', empPf: '0', employerPfPension: '0', employerPfEoli: '0', employerPfAdmin: '0', total: '0' },
    { id: 'V0077', name: 'Akshada Chavan', pfNumber: '0', days: '0', salary: '0', basic: '0', empContribution: '0', empPf: '0', employerPfPension: '0', employerPfEoli: '0', employerPfAdmin: '0', total: '0' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected:', month, year);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedEmployees = filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        PF Report
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="h6">Select Month</Typography>
        <TextField
          select
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ minWidth: 120 }}
          size="small"
        >
          {months.map((option, index) => (
            <MenuItem key={option} value={index + 1}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ minWidth: 120 }}
          size="small"
        >
          {years.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" size="medium">
          Submit
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Vetrina Healthcare Pvt. Ltd. PF Details - {month ? months[month - 1] : 'Month'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2">
          Show{' '}
          <TextField
            select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setPage(0);
            }}
            size="small"
            sx={{ minWidth: 80, mx: 1 }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </TextField>{' '}
          entries
        </Typography>

        <TextField
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper sx={{ width: '90%', overflowX: 'auto' }}>
        <Box sx={{ minWidth: 1500 }}>
          <Table aria-label="pf report table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                {[
                  'SR NO',
                  'EMPLOYEE ID/NAME',
                  'PF NUMBER',
                  'NUMBER OF DAYS',
                  'SALARY PER MONTH',
                  'BASIC',
                  'EMPLOYEE CONTRIBUTION 12%',
                  'EMPLOYER PF 3.87%',
                  'EMPLOYER PF(PENSION) 8.33%',
                  'EMPLOYER PF(EOLI) 0.50%',
                  'EMPLOYER PF(ADMIN) 0.50%',
                  'TOTAL',
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    <strong>{header}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEmployees.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 250 }}>
  {employee.id} / {employee.name}
</TableCell>
                  <TableCell>{employee.pfNumber}</TableCell>
                  <TableCell>{employee.days}</TableCell>
                  <TableCell>{employee.salary}</TableCell>
                  <TableCell>{employee.basic}</TableCell>
                  <TableCell>{employee.empContribution}</TableCell>
                  <TableCell>{employee.empPf}</TableCell>
                  <TableCell>{employee.employerPfPension}</TableCell>
                  <TableCell>{employee.employerPfEoli}</TableCell>
                  <TableCell>{employee.employerPfAdmin}</TableCell>
                  <TableCell>{employee.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Box sx={{ mt: 2 }}>
        <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              sx={{
                color: '#7C3AED',
                borderColor: '#7C3AED',
                '&:hover': {
                  backgroundColor: '#7C3AED',
                  borderColor: '#7C3AED',
                  color: 'white',
                }
              }}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            Page {page + 1} of {Math.max(1, Math.ceil(filteredEmployees.length / rowsPerPage))}
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= Math.ceil(filteredEmployees.length / rowsPerPage) - 1}
              sx={{
                color: '#7C3AED',
                borderColor: '#7C3AED',
                '&:hover': {
                  backgroundColor: '#7C3AED',
                  borderColor: '#7C3AED',
                  color: 'white',
                }
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PfReport;
