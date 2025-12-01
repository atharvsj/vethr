import React, { useState, useEffect,useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';
import axiosInstance from "../../utils/axiosInstance";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton,
  Tooltip, TextField, Avatar, Box, Typography,
  Select, MenuItem, InputLabel, FormControl, Button
} from '@mui/material';
import { ArrowDownward, ArrowUpward, ArrowForward } from '@mui/icons-material';


const columns = [
  { key: 'name', label: 'EMPLOYEE' },
  { key: 'type', label: 'LEAVE TYPE' },
  { key: 'duration', label: 'LEAVE DURATION' },
  { key: 'days', label: 'DAYS' },
  { key: 'applied', label: 'APPLIED ON' },
  { key: 'status', label: 'STATUS' },
];

const LeaveRequestComponent = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [entries, setEntries] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const { employeeId } = useContext(EmployeeContext);
   
   

  // Fetch leave data
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axiosInstance.post('/api/timesheet_agenda/', {
          user_id:employeeId  ,
          type: 1,
        });

        if (response.data.status === 'success') {
          const formattedData = response.data.timesheet_data.map(item => ({
            name: item.employee,
            email: item.email,
            avatar: `https://i.pravatar.cc/40?u=${item.email}`,
            type: item.leave_type,
            duration: `${item.from_date} To ${item.to_date}`,
            days: item.is_half_day === 1 ? 'Half Day' : 'Full Day',
            applied: item.created_at.split(' ')[0],
            status: item.status,
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch leave data:', error);
      }
    };

    fetchLeaveData();
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

  const filteredData = data.filter(
    (row) =>
      row.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.applied.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase())
     

  );

  const totalPages = Math.ceil(filteredData.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search or entries change
  }, [searchQuery, entries]);

  return (
    <Box>
      {/* Controls Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Show</InputLabel>
          <Select
            value={entries}
            label="Show"
            onChange={(e) => setEntries(e.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="standard"
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
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
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={row.avatar} alt={row.name} sx={{ width: 32, height: 32, mr: 1 }} />
                    {hoveredRow === idx ? (
                      <Tooltip title="View Details">
                        <IconButton>
                          <ArrowForward />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Box>
                        <Typography fontWeight="bold">{row.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{row.email}</Typography>
                      </Box>
                    )}
                  </Box>
                </TableCell>

                <TableCell>{row.type}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>{row.applied}</TableCell>
                <TableCell>
                  <span style={{
                    backgroundColor:
                      row.status === 2 ? '#d4edda' :
                      row.status === 1 ? '#fff3cd' :
                      '#f8d7da',
                    color:
                      row.status === 2 ? '#155724' :
                      row.status === 1 ? '#856404' :
                      '#721c24',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}>
                    {row.status === 2 ? 'Approved' : row.status === 1 ? 'Pending' : 'Rejected'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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
      sx={{
        textTransform: 'none',
        '&:active': {
          backgroundColor: 'primary.dark',
        },
        mr: 1
      }}
    >
      Previous
    </Button>

    <Button
      size="small"
      variant=""
      color="primary"
      sx={{
        fontWeight: 'bold',
        borderWidth: '2px',
        textTransform: 'none',
        pointerEvents: 'none', // make it non-clickable (just display)
      }}
    >
      {currentPage}
    </Button>

    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages || totalPages === 0}
      sx={{
        textTransform: 'none',
        '&:active': {
          backgroundColor: 'primary.dark',
        },
        ml: 1
      }}
    >
      Next
    </Button>
  </Box>
</Box>

    </Box>
  );
};

export default LeaveRequestComponent;
