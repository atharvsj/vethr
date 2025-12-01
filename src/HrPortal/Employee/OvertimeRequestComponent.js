import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Box,
  Typography, Select, MenuItem, InputLabel, FormControl,
  Avatar, Button
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const columns = [
  { key: 'employee', label: 'EMPLOYEE' },
  { key: 'date', label: 'DATE' },
  { key: 'inTime', label: 'IN TIME' },
  { key: 'outTime', label: 'OUT TIME' },
  { key: 'totalHours', label: 'TOTAL HOURS' },
  { key: 'status', label: 'STATUS' },
];

const initialData = []; // Add request loan data here

const OvertimeRequestComponent = () => {
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
      const valA = a[key]?.toLowerCase?.() || a[key];
      const valB = b[key]?.toLowerCase?.() || b[key];
      return direction === 'asc' ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
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
      <Typography variant="subtitle1" sx={{ mb: 1, ml: 1 }}>List All Overtime Request</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
        <FormControl variant="standard" sx={{ minWidth: 100 }}>
          <InputLabel>Show</InputLabel>
          <Select value={entries} onChange={(e) => setEntries(e.target.value)}>
            {[10, 25, 50].map((num) => (
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
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={row.avatar || ''} sx={{ width: 32, height: 32, mr: 1 }} />
                      {row.employee}
                    </Box>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.inTime}</TableCell>
                  <TableCell>{row.outTime}</TableCell>
                  <TableCell>{row.totalHours}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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

export default OvertimeRequestComponent;
