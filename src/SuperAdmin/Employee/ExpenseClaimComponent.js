import React, { useState, useEffect, useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';
import axiosInstance from "../../utils/axiosInstance";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Tooltip, TextField, Box, Typography,
  Select, MenuItem, InputLabel, FormControl, Button
} from '@mui/material';
import { ArrowDownward, ArrowUpward, ArrowForward } from '@mui/icons-material';

const columns = [
  { key: 'accountTitle', label: 'ACCOUNT TITLE' },
  { key: 'payee', label: 'PAYEE' },
  { key: 'amount', label: 'AMOUNT' },
  { key: 'category', label: 'CATEGORY' },
  { key: 'ref', label: 'REF#' },
  { key: 'paymentMethod', label: 'PAYMENT METHOD' },
  { key: 'date', label: 'DATE' },
];

const ExpenseClaimComponent = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [entries, setEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { employeeId } = useContext(EmployeeContext);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post('/api/timesheet_agenda/', {
          user_id: employeeId,
          type: 2
        });
        if (response.data.status === 'success') {
          const transformed = response.data.timesheet_data.map((item, idx) => ({
            accountTitle: item.accountTitle || `Title ${idx + 1}`,
            payee: item.payee || `Payee ${idx + 1}`,
            amount: item.amount || '0.00',
            category: item.category || 'N/A',
            ref: item.ref || `REF-${idx + 1}`,
            paymentMethod: item.paymentMethod || 'N/A',
            date: item.date || '2025-01-01',
          }));
          setData(transformed);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [employeeId]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...data].sort((a, b) => {
      const valA = a[key]?.toLowerCase?.() || '';
      const valB = b[key]?.toLowerCase?.() || '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some(val =>
      val.toLowerCase?.().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Show</InputLabel>
          <Select
            value={entries}
            label="Show"
            onChange={(e) => {
              setEntries(e.target.value);
              setCurrentPage(1); // Reset to first page
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
            setCurrentPage(1); // Reset to first page
          }}
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
                  sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {col.label}
                  {sortConfig.key === col.key ? (
                    sortConfig.direction === 'asc'
                      ? <ArrowUpward fontSize="small" />
                      : <ArrowDownward fontSize="small" />
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
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.key === 'accountTitle' && hoveredRow === idx ? (
                      <Tooltip title="View Details">
                        <IconButton>
                          <ArrowForward />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      row[col.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No records available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ExpenseClaimComponent;
