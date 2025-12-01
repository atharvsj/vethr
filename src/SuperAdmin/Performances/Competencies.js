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

export default function Competencies() {
  // Initial categories state
  const [categories, setCategories] = useState([
    { id: 1, category: 'Software Development', type: 'Technical', createdAt: '2023-01-01' },
    { id: 2, category: 'Leadership', type: 'Organizational', createdAt: '2023-02-01' },
  ]);

  // States for search query, pagination, and new category
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newCategory, setNewCategory] = useState({
    category: '',
    type: '', // "Technical" or "Organizational"
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

  // Handle new category input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // Add new category to the list
  const handleAddCategory = () => {
    if (newCategory.category.trim() && newCategory.type) {
      const newCategoryData = {
        id: categories.length + 1,
        ...newCategory,
        createdAt: new Date().toISOString().split('T')[0], // Current date
      };
      setCategories([newCategoryData, ...categories]); // Add the new category
      setNewCategory({ category: '', type: '' }); // Reset form fields
    }
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter((row) =>
    row.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom align="center">
        Competencies
      </Typography>

      {/* Grid layout for the left (form) and right (table) side */}
      <Grid container spacing={3}>
        {/* Left Section - Add New Category Form */}
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
              Add New Category
            </Typography>

            {/* Form to Add New Category */}
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="category"
              value={newCategory.category}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />

            {/* Category Type Selection (Technical or Organizational) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
              <Button
                variant={newCategory.type === 'Technical' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setNewCategory({ ...newCategory, type: 'Technical' })}
                sx={{ marginBottom: 1 }}
              >
                Technical
              </Button>
              <Button
                variant={newCategory.type === 'Organizational' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setNewCategory({ ...newCategory, type: 'Organizational' })}
              >
                Organizational
              </Button>
            </Box>

            {/* Add Category Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              disabled={!newCategory.category.trim() || !newCategory.type}
              fullWidth
            >
              Add Category
            </Button>
          </Box>
        </Grid>

        {/* Right Section - Categories List */}
        <Grid item xs={12} sm={6}>
          <Box>
            {/* Search Bar for Filtering Categories */}
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Search Categories"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
              />
            </Box>

            {/* Table to Display Categories */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Created At</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCategories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.category}</TableCell>
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
              count={filteredCategories.length}
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
