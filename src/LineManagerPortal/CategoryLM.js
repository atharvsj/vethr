import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
} from '@mui/material';

const CategoryLM = () => {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const categories = [
    { name: 'Cement', created_at: '15/04/2024' },
    { name: 'Construction', created_at: '15/04/2024' },
    { name: 'Electronic Goods', created_at: '19/11/2021' },
    { name: 'Home Appliance', created_at: '15/04/2024' },
    { name: 'Mouse', created_at: '15/02/2022' },
  ];

  const handleSort = () => {
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const filteredCategories = categories
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      orderDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        List All <Typography component="span">Categories</Typography>
      </Typography>

      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          select
          label="Show"
          size="small"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          style={{ width: 100 }}
        >
          {[5, 10, 25, 50].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f6fa' }}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={orderDirection}
                  onClick={handleSort}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.created_at}</TableCell>
              </TableRow>
            ))}
            {visibleRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box px={2} py={1}>
          Showing {page * rowsPerPage + 1} to{' '}
          {Math.min((page + 1) * rowsPerPage, filteredCategories.length)} of{' '}
          {filteredCategories.length} records
        </Box>

        <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end" px={2} pb={2}>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPage(page - 1)}
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
              Page {page + 1} of {Math.max(1, Math.ceil(filteredCategories.length / rowsPerPage))}
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(filteredCategories.length / rowsPerPage) - 1}
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
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CategoryLM;
