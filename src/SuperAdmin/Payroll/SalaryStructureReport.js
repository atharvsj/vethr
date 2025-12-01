import React, { useState, useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TextField,
  Box,
  Grid,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const SalaryStructureReport = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('srNo');
  const [order, setOrder] = useState('asc');

  const rows = [
    {
      srNo: 2,
      employeeName: 'V0006 / Kumar Patil',
      department: 'Sales',
      effectiveDate: '2016-09-12',
      ctc: 1054965,
      basic: 51669,
      hra: 21529,
      conveyance: 6459,
      medical: 6459,
      pf: 1800,
      esic: 0,
      pt: 200,
      pf_367: 551,
      pf_pension: 1250,
      totalEarning: 150000,
      totalDeductions: 5000,
      netPay: 145000,
    },
    {
      srNo: 3,
      employeeName: 'V0017 / Ganesh Mohite',
      department: 'Sales',
      effectiveDate: '2017-04-01',
      ctc: 1201457,
      basic: 58993,
      hra: 24580,
      conveyance: 7374,
      medical: 7374,
      pf: 1800,
      esic: 0,
      pt: 200,
      pf_367: 551,
      pf_pension: 1250,
      totalEarning: 160000,
      totalDeductions: 5500,
      netPay: 154500,
    },
    {
      srNo: 4,
      employeeName: 'V0020 / Rupali Mali',
      department: 'Purchase',
      effectiveDate: '2017-05-10',
      ctc: 751920,
      basic: 36517,
      hra: 15215,
      conveyance: 4565,
      medical: 4565,
      pf: 1800,
      esic: 0,
      pt: 200,
      pf_367: 551,
      pf_pension: 1250,
      totalEarning: 110000,
      totalDeductions: 4800,
      netPay: 105200,
    },
    {
      srNo: 5,
      employeeName: 'V0075 / Shailesh Jadhav',
      department: 'Operations',
      effectiveDate: '2018-07-23',
      ctc: 603396,
      basic: 29090,
      hra: 11221,
      conveyance: 3636,
      medical: 3636,
      pf: 1800,
      esic: 0,
      pt: 200,
      pf_367: 551,
      pf_pension: 1250,
      totalEarning: 90000,
      totalDeductions: 4200,
      netPay: 85800,
    },
    {
      srNo: 6,
      employeeName: 'V0077 / Akshada Chavan',
      department: 'Marketing',
      effectiveDate: '2018-08-09',
      ctc: 580596,
      basic: 27950,
      hra: 11646,
      conveyance: 3494,
      medical: 3494,
      pf: 1800,
      esic: 0,
      pt: 200,
      pf_367: 551,
      pf_pension: 1250,
      totalEarning: 88000,
      totalDeductions: 4000,
      netPay: 84000,
    },
  ];

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) =>
        row.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        row.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, rows]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, orderBy, order]);

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  const columns = [
    { id: 'srNo', label: 'SR NO' },
    { id: 'employeeName', label: 'EMPLOYEE ID/NAME' },
    { id: 'department', label: 'DEPARTMENT' },
    { id: 'effectiveDate', label: 'EFFECTIVE DATE' },
    { id: 'ctc', label: 'CTC' },
    { id: 'basic', label: 'BASIC' },
    { id: 'hra', label: 'HRA' },
    { id: 'conveyance', label: 'CONVEYANCE ALLOWANCE' },
    { id: 'medical', label: 'MEDICAL' },
    { id: 'pf', label: 'PF' },
    { id: 'esic', label: 'ESIC' },
    { id: 'pt', label: 'PT' },
    { id: 'pf_367', label: 'PF-3.67%' },
    { id: 'pf_pension', label: 'PF (PENSION 8.33%)' },
    { id: 'totalEarning', label: 'TOTAL EARNING' },
    { id: 'totalDeductions', label: 'TOTAL DEDUCTIONS' },
    { id: 'netPay', label: 'NET PAY' },
  ];

  return (
    <Container sx={{ width: '100%' }}>
     
      <Paper elevation={3}>
      <Typography variant="h5" sx={{ mt: 4, mb: 3, ml: 4 }}>
  Salary Structure Report
</Typography>

        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            size="small"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </Box>

        <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      whiteSpace: 'nowrap',
                      minWidth: 100,
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
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
              {paginatedRows.map((row, idx) => (
                <TableRow key={idx}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 200,
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

        {/* Pagination Controls */}
        <Grid container justifyContent="space-between" alignItems="center" spacing={2} p={2} flexWrap="wrap">
  <Grid item>
    <Box display="flex" alignItems="center">
      <Typography sx={{ mr: 1 }}>Rows / Page:</Typography>
      <FormControl size="small">
        <Select
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        >
          {[5, 10, 15, 20].map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Grid>

  <Grid item>
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          sx={{
            color: '#7C3AED',
            borderColor: '#7C3AED',
            '&:hover': {
              backgroundColor: '#7C3AED',
              borderColor: '#7C3AED',
              color: 'white',
            },
          }}
        >
          Previous
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Page {page + 1} of {totalPages}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          sx={{
            color: '#7C3AED',
            borderColor: '#7C3AED',
            '&:hover': {
              backgroundColor: '#7C3AED',
              borderColor: '#7C3AED',
              color: 'white',
            },
          }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  </Grid>
</Grid>

      </Paper>
    </Container>
  );
};

export default SalaryStructureReport;
