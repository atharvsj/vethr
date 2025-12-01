import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  Button,
  TableSortLabel,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
    },
  },
});

const BankStatement = () => {
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('srNo');
  const [order, setOrder] = useState('asc');

  const rows = [
    { srNo: 1, empId: 'V0001', empName: 'Mangesh Ghadigaonkar', month: '', year: '', bank: '', accNo: '', ifsc: '', netPay: '' },
    { srNo: 2, empId: 'V0006', empName: 'Kumar Patil', month: '', year: '', bank: 'ICICI BANK', accNo: '72301502486', ifsc: 'ICIC0000011', netPay: '' },
    { srNo: 3, empId: 'V0017', empName: 'Ganesh Mohite', month: '', year: '', bank: 'HDFC BANK', accNo: '5010012959867', ifsc: 'HDFC0003675', netPay: '' },
    { srNo: 4, empId: 'V0020', empName: 'Rupali Mali', month: '', year: '', bank: 'STATE BANK OF INDIA', accNo: '38997945436', ifsc: 'SBIN0018048', netPay: '' },
    { srNo: 5, empId: 'V0075', empName: 'Shailesh Jadhav', month: '', year: '', bank: 'SOUTH INDIAN BANK', accNo: '82905300001466', ifsc: 'SIBL0000829', netPay: '' },
    { srNo: 6, empId: 'V0077', empName: 'Akshada Chavan', month: '', year: '', bank: 'AXIS BANK', accNo: '91501034620968', ifsc: 'UTIB0002774', netPay: '' },
    { srNo: 7, empId: 'V0089', empName: 'Yogesh Bisen', month: '', year: '', bank: 'AXIS BANK', accNo: '918010036323824', ifsc: 'UTIB0000808', netPay: '' },
    { srNo: 8, empId: 'V0123', empName: 'Ashish Shahare', month: '', year: '', bank: 'AXIS BANK', accNo: '918010046081727', ifsc: 'UTIB0000315', netPay: '' },
    { srNo: 9, empId: 'V0130', empName: 'Ashwini Deshpande', month: '', year: '', bank: 'KOTAK MAHINDRA BANK', accNo: '2013828985', ifsc: 'KKBK0001771', netPay: '' },
    { srNo: 10, empId: 'V0155', empName: 'Ashok Bhange', month: '', year: '', bank: 'STATE BANK OF INDIA', accNo: '36246392161', ifsc: 'SBIN0061383', netPay: '' },
    ...Array.from({ length: 50 }, (_, idx) => ({
      srNo: idx + 11,
      empId: `V01${idx + 56}`,
      empName: `Employee ${idx + 11}`,
      month: '',
      year: '',
      bank: '',
      accNo: '',
      ifsc: '',
      netPay: '',
    })),
  ];

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.empName.toLowerCase().includes(search.toLowerCase()) ||
      row.empId.toLowerCase().includes(search.toLowerCase())
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const currentRows = sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <ThemeProvider theme={purpleTheme}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Bank Statement
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <FormControl variant="standard" size="small">
            <InputLabel>Show</InputLabel>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} label="Show" style={{ width: 80 }}>
              {[10, 25, 50, 100].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            variant="standard"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { id: 'srNo', label: 'SR NO' },
                  { id: 'empId', label: 'EMPLOYEE ID' },
                  { id: 'empName', label: 'EMPLOYEE NAME' },
                  { id: 'month', label: 'MONTH' },
                  { id: 'year', label: 'YEAR' },
                  { id: 'bank', label: 'BANK NAME' },
                  { id: 'accNo', label: 'ACCOUNT NO' },
                  { id: 'ifsc', label: 'IFSC CODE' },
                  { id: 'netPay', label: 'NET PAY' },
                ].map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((row) => (
                <TableRow key={row.srNo}>
                  <TableCell>{row.srNo}</TableCell>
                  <TableCell>{row.empId}</TableCell>
                  <TableCell>{row.empName}</TableCell>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.bank}</TableCell>
                  <TableCell>{row.accNo}</TableCell>
                  <TableCell>{row.ifsc}</TableCell>
                  <TableCell>{row.netPay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="flex-end" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            color="primary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            sx={{ marginRight: 1 }}
          >
            Previous
          </Button>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            shape="square"
            sx={{ marginRight: 2 }}
          />

          <Button
            variant="outlined"
            color="primary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default BankStatement;
