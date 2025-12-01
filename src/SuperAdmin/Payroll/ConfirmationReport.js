import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Container,
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
  Button,
  Stack,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const rowsData = [
  { srNo: 1, empId: 'V0001', empName: 'Mangesh Ghadigaonkar', dept: 'HR', designation: 'Manager', city: 'Mumbai', doj: '01-01-2015', confDate: '01-07-2015', probation: 180, approvedBy: 'CEO' },
  { srNo: 2, empId: 'V0006', empName: 'Kumar Patil', dept: 'Sales', designation: 'Zonal Sales Manager', city: 'Pune', doj: '12-09-2016', confDate: '12-03-2017', probation: 180, approvedBy: 'MD' },
  { srNo: 3, empId: 'V0017', empName: 'Ganesh Mohite', dept: 'Sales', designation: 'Zonal Sales Manager', city: 'Nashik', doj: '01-04-2017', confDate: '01-10-2017', probation: 180, approvedBy: 'Director' },
  { srNo: 4, empId: 'V0020', empName: 'Sneha Kulkarni', dept: 'Marketing', designation: 'Executive', city: 'Nagpur', doj: '10-10-2018', confDate: '10-04-2019', probation: 180, approvedBy: 'CMO' },
  { srNo: 5, empId: 'V0025', empName: 'Ravi Shinde', dept: 'IT', designation: 'Developer', city: 'Mumbai', doj: '05-01-2020', confDate: '05-07-2020', probation: 180, approvedBy: 'CTO' },
  { srNo: 6, empId: 'V0030', empName: 'Neha Deshmukh', dept: 'Finance', designation: 'Analyst', city: 'Pune', doj: '15-02-2021', confDate: '15-08-2021', probation: 180, approvedBy: 'CFO' },
  { srNo: 7, empId: 'V0035', empName: 'Ankit Rane', dept: 'Support', designation: 'Associate', city: 'Aurangabad', doj: '20-03-2022', confDate: '20-09-2022', probation: 180, approvedBy: 'HR Head' },
  { srNo: 8, empId: 'V0040', empName: 'Deepika Jadhav', dept: 'Admin', designation: 'Coordinator', city: 'Mumbai', doj: '11-11-2022', confDate: '11-05-2023', probation: 180, approvedBy: 'Admin Head' },
];

const columns = [
  { id: 'srNo', label: 'SR NO' },
  { id: 'empId', label: 'EMP ID' },
  { id: 'empName', label: 'EMPLOYEE NAME' },
  { id: 'dept', label: 'DEPARTMENT' },
  { id: 'designation', label: 'DESIGNATION' },
  { id: 'city', label: 'CITY' },
  { id: 'doj', label: 'D.O.J.' },
  { id: 'confDate', label: 'CONFIRMATION DATE' },
  { id: 'probation', label: 'PROBATION PERIOD' },
  { id: 'approvedBy', label: 'APPROVED BY' },
];

const ConfirmationReport = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedRows = [...rowsData]
    .filter(
      (row) =>
        row.empName.toLowerCase().includes(search.toLowerCase()) ||
        row.empId.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const { key, direction } = sortConfig;
      if (!key) return 0;
      const aVal = a[key]?.toString().toLowerCase() || '';
      const bVal = b[key]?.toString().toLowerCase() || '';
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  const paginatedRows = sortedRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  return (
    <Container sx={{ width: '100%' }}>
      <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" fontWeight="bold">Confirmation Report</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <FormControl variant="standard" size="small">
            <InputLabel>Show</InputLabel>
            <Select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(+e.target.value);
                setPage(1);
              }}
              label="Show"
              sx={{ width: 80 }}
            >
              {[5, 25, 50, 100].map((num) => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            variant="standard"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Box>

        <TableContainer  sx={{
    mt: 2, width: '100%', overflowX: 'auto'// Enable horizontal scrolling when necessary
  }}>
  <Table size="small" sx={{ minWidth: 1000 }}>
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            onClick={() => handleSort(col.id)}
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              fontSize: '0.85rem'
            }}
          >
            {col.label}
            {sortConfig.key === col.id ? (
              sortConfig.direction === 'asc' ? (
                <ArrowUpward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />
              ) : (
                <ArrowDownward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />
              )
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {paginatedRows.map((row) => (
        <TableRow key={row.empId}>
          {columns.map((col) => (
            <TableCell 
              key={col.id} 
              sx={{ 
                whiteSpace: 'nowrap', 
                fontSize: '0.85rem' 
              }}
            >
              {row[col.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2">
            Showing {((page - 1) * rowsPerPage) + 1} to{' '}
            {Math.min(page * rowsPerPage, sortedRows.length)} of {sortedRows.length} entries
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: '#9c27b0', color: '#fff', '&:hover': { bgcolor: '#7b1fa2' } }}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            <Pagination
  count={totalPages}
  page={page}
  onChange={() => {}}
  renderItem={(item) =>
    item.type === 'page' ? (
      <Button
        key={item.page}
        variant={item.page === page ? 'contained' : 'outlined'}
        size="small"
        disabled
        sx={{
          minWidth: 32,
          px: 1,
          bgcolor: item.page === page ? '#e1bee7' : undefined, // light vibrant purple
          color: item.page === page ? '#4a148c' : undefined,   // dark purple text
          borderColor: item.page === page ? '#ce93d8' : undefined,
        }}
      >
        {item.page}
      </Button>
    ) : null
  }
/>




            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: '#9c27b0', color: '#fff', '&:hover': { bgcolor: '#7b1fa2' } }}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Paper>
      </Container>
  );
};

export default ConfirmationReport;
