import React, { useState, useEffect, useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';
import axiosInstance from "../../utils/axiosInstance";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Tooltip, TextField, Avatar, Box, Typography,
  Select, MenuItem, InputLabel, FormControl, Button
} from '@mui/material';
import {
  ArrowDownward, ArrowUpward, ArrowForward
} from '@mui/icons-material';
 // Update path based on your project

const columns = [
  { key: 'name', label: 'EMPLOYEE' },
  { key: 'amount', label: 'AMOUNT' },
  { key: 'monthYear', label: 'MONTH & YEAR' },
  { key: 'oneTimeDeduct', label: 'ONE TIME DEDUCT' },
  { key: 'emi', label: 'EMI' },
  { key: 'createdAt', label: 'CREATED AT' },
];

const RequestLoanComponent = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { employeeId } = useContext(EmployeeContext);

  // Fetch data
  useEffect(() => {
    axiosInstance.post('/api/timesheet_agenda/', {
      user_id:employeeId ,
      type: 3
    }).then((response) => {
      if (response.data.status === 'success') {
        // Example static transformation if API lacks these keys
        const transformed = response.data.timesheet_data.map((item, idx) => ({
          name: `Employee ${idx + 1}`,
          avatar: `https://i.pravatar.cc/40?img=${idx + 1}`,
          amount: '5000',
          monthYear: 'May 2025',
          oneTimeDeduct: 'No',
          emi: '1000',
          createdAt: '2025-05-01',
        }));
        setData(transformed);
      }
    }).catch(console.error);
  }, [employeeId]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    const sorted = [...data].sort((a, b) => {
      const valA = a[key]?.toLowerCase?.() || a[key];
      const valB = b[key]?.toLowerCase?.() || b[key];
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sorted);
    setSortConfig({ key, direction });
  };

  // Filter and paginate
  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.amount.toString().includes(searchQuery.toLowerCase()) ||
      row.monthYear.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <Box>
      {/* Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Show</InputLabel>
          <Select
            value={entries}
            onChange={(e) => {
              setEntries(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="standard"
          size="small"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  sx={{ cursor: 'pointer', fontWeight: 'bold' }}
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
            {paginatedData.map((row, idx) => (
              <TableRow
                key={idx}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                sx={{ cursor: 'pointer', transition: '0.3s' }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={row.avatar} alt={row.name} sx={{ width: 32, height: 32, mr: 1 }} />
                    {hoveredRow === idx ? (
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <ArrowForward fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Typography fontWeight="bold">{row.name}</Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.monthYear}</TableCell>
                <TableCell>{row.oneTimeDeduct}</TableCell>
                <TableCell>{row.emi}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
        <Typography variant="body2">
          Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
        </Typography>

        <Box>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            sx={{ textTransform: 'none', mr: 1 }}
          >
            Previous
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 'bold', pointerEvents: 'none' }}
          >
            {currentPage}
          </Button>

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            sx={{ textTransform: 'none', ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestLoanComponent;
