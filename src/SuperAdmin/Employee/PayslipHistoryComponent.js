import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Button
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const columns = [
  { key: 'employee', label: 'EMPLOYEE' },
  { key: 'netPayable', label: 'NET PAYABLE' },
  { key: 'salaryMonth', label: 'SALARY MONTH' },
  { key: 'payDate', label: 'PAY DATE' }
];

const initialData = []; // Replace with actual payslip data

const PayslipHistoryComponent = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...data].sort((a, b) => {
      const valA = a[key]?.toString()?.toLowerCase?.() || '';
      const valB = b[key]?.toString()?.toLowerCase?.() || '';
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1, ml: 1 }}>Payslip History</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
        <FormControl variant="standard" sx={{ minWidth: 100 }}>
          <InputLabel>Show</InputLabel>
          <Select value={entries} onChange={(e) => setEntries(e.target.value)}>
            {[10, 25, 50].map(num => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          size="small"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {col.label}
                  {sortConfig.key === col.key ? (
                    sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" sx={{ opacity: 0.2, ml: 0.5 }} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, entries).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell>{row.netPayable}</TableCell>
                  <TableCell>{row.salaryMonth}</TableCell>
                  <TableCell>{row.payDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No records available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography variant="body2">
          {filteredData.length === 0
            ? 'No records available'
            : `Showing 1 to ${Math.min(entries, filteredData.length)} of ${filteredData.length} records`}
        </Typography>
        <Box>
          <Button size="small" disabled>Previous</Button>
          <Button size="small" variant="contained" color="primary" sx={{ mx: 1 }}>1</Button>
          <Button size="small" disabled>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PayslipHistoryComponent;
