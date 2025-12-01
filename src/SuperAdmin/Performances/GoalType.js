import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Grid,
} from '@mui/material';

export default function GoalType() {
  // Initial goal types state
  const [goalTypes, setGoalTypes] = useState([
    { id: 1, goal: 'Achieve Sales Target', createdAt: '2023-01-01' },
    { id: 2, goal: 'Improve Team Efficiency', createdAt: '2023-02-01' },
  ]);

  // States for search query, pagination, and new goal type
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newGoalType, setNewGoalType] = useState({
    goal: '',
  });

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle page change for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle new goal type input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalType({ ...newGoalType, [name]: value });
  };

  // Add new goal type to the list
  const handleAddGoalType = () => {
    if (newGoalType.goal.trim()) {
      const newGoalData = {
        id: goalTypes.length + 1,
        ...newGoalType,
        createdAt: new Date().toISOString().split('T')[0], // Current date
      };
      setGoalTypes([newGoalData, ...goalTypes]); // Add the new goal type
      setNewGoalType({ goal: '' }); // Reset form field
    }
  };

  // Filter goal types based on search query
  const filteredGoalTypes = goalTypes.filter((row) =>
    row.goal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom align="center">
        Goal Types
      </Typography>

      {/* Grid layout for the left (form) and right (table) side */}
      <Grid container spacing={3}>
        {/* Left Section - Add New Goal Type Form */}
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              padding: 2,
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: 3,
              backgroundColor: '#fafafa',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add New Goal
            </Typography>

            {/* Form to Add New Goal */}
            <TextField
              label="Goal"
              variant="outlined"
              fullWidth
              name="goal"
              value={newGoalType.goal}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />

            {/* Add Goal Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddGoalType}
              disabled={!newGoalType.goal.trim()}
              fullWidth
            >
              Add Goal
            </Button>
          </Box>
        </Grid>

        {/* Right Section - Goal Types List */}
        <Grid item xs={12} sm={6}>
          <Box>
            {/* Search Bar for Filtering Goal Types */}
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Search Goal Types"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
              />
            </Box>

            {/* Table to Display Goal Types */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Goal</strong></TableCell>
                    <TableCell><strong>Created At</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredGoalTypes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.goal}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredGoalTypes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
