import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const ConfirmationList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const data = [
    { empId: 'V0001', name: 'Mangesh Ghadigaonkar', department: '', designation: '', city: '', doj: '01-01-2015', probation: 180, confirmationDate: '01-07-2015', status: 'On Roll' , confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0006', name: 'Kumar Patil', department: 'Sales', designation: 'Zonal Sales Manager', city: '', doj: '12-09-2016', probation: 180, confirmationDate: '12-03-2017', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0017', name: 'Ganesh Mohite', department: 'Sales', designation: 'Zonal Sales Manager', city: '', doj: '01-04-2017', probation: 180, confirmationDate: '01-10-2017', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0020', name: 'Rupali Mali', department: 'Purchase', designation: 'Purchase Manager', city: '', doj: '10-05-2017', probation: 180, confirmationDate: '10-11-2017', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0075', name: 'Shailesh Jadhav', department: 'Operations', designation: 'Operation Executive - Godown', city: '', doj: '23-07-2018', probation: 180, confirmationDate: '23-01-2019', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0077', name: 'Akshada Chavan', department: 'Marketing', designation: 'Graphic Designer', city: '', doj: '09-08-2018', probation: 180, confirmationDate: '09-02-2019', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0089', name: 'Yogesh Bisen', department: 'Sales', designation: 'Area Sales Manager', city: '', doj: '12-10-2018', probation: 180, confirmationDate: '12-04-2019', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0123', name: 'Ashish Shahare', department: 'Sales', designation: '', city: '', doj: '01-04-2019', probation: 180, confirmationDate: '01-10-2019', status: 'On Roll' , confirmedBy: 'Manager A',activeStatus: 'Active'},
    { empId: 'V0130', name: 'Ashwini Deshpande', department: 'Human Resource Generalist', designation: '', city: '', doj: '01-06-2019', probation: 180, confirmationDate: '01-12-2019', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' },
    { empId: 'V0155', name: 'Ashok Bhange', department: 'Sales', designation: 'Sr. Area Sales Manager', city: '', doj: '18-11-2019', probation: 180, confirmationDate: '18-05-2020', status: 'On Roll', confirmedBy: 'Manager A',activeStatus: 'Active' }
  ];

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Confirmation List
        </Typography>

        <Paper elevation={2}>
          {/* Top Controls */}
          <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            <FormControl size="small" sx={{ width: 100 }}>
              <InputLabel>Show</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                label="Show"
              >
                {[5, 25, 50].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 200 }}
            />
          </Box>

          {/* Table */}
          <TableContainer>
  <Table sx={{ width: '100%' }}>
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>SR NO</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>EMP ID</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>EMPLOYEE NAME</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>DEPARTMENT</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>DESIGNATION</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>CITY</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>D.O.J.</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>PROBATION PERIOD</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>CONFIRMATION DATE</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>CONFIRMATION STATUS</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>CONFIRMED BY</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>STATUS</TableCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
        <TableRow key={index}>
          <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{page * rowsPerPage + index + 1}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.empId}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.department}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.designation}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.city}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.doj}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.probation}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.confirmationDate}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.status}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.confirmedBy || '-'}</TableCell>
          <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.activeStatus || 'Active'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

{/* Pagination */}
<Box display="flex" justifyContent="flex-end" alignItems="center" p={2} gap={1}>
  {/* Previous Button */}
  <button
    disabled={page === 0}
    onClick={() => {
      if (page > 0) setPage((prev) => prev - 1);
    }}
    style={{
      padding: '6px 12px',
      border: '1px solid',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: page === 0 ? 'default' : 'pointer',
      color: '#7C3AED',
      borderColor: '#7C3AED',
      backgroundColor: 'transparent',
      transition: 'all 0.3s',
    }}
    onMouseOver={(e) => {
      if (page > 0) {
        e.currentTarget.style.backgroundColor = '#7C3AED';
        e.currentTarget.style.color = 'white';
      }
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#7C3AED';
    }}
  >
    Previous
  </button>

  {/* Page Number */}
  <Typography variant="body1" sx={{ mx: 2 }}>
    {page + 1}
  </Typography>

  {/* Next Button */}
  <button
    disabled={(page + 1) * rowsPerPage >= filteredData.length}
    onClick={() => {
      if ((page + 1) * rowsPerPage < filteredData.length) setPage((prev) => prev + 1);
    }}
    style={{
      padding: '6px 12px',
      border: '1px solid',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: (page + 1) * rowsPerPage >= filteredData.length ? 'default' : 'pointer',
      color: '#7C3AED',
      borderColor: '#7C3AED',
      backgroundColor: 'transparent',
      transition: 'all 0.3s',
    }}
    onMouseOver={(e) => {
      if ((page + 1) * rowsPerPage < filteredData.length) {
        e.currentTarget.style.backgroundColor = '#7C3AED';
        e.currentTarget.style.color = 'white';
      }
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#7C3AED';
    }}
  >
    Next
  </button>
</Box>



        </Paper>
      </Box>
    </Container>
  );
};

export default ConfirmationList;
