import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';

function PayrollPageLM() {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEntriesChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
      >
        Payroll
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
      >
        Pay Slip History
      </Typography>

      {/* Employee Details Section */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Emp. Id:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                1368
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Emp. Name:
              </Typography>
              <Typography variant="body2">Prasad Shinde</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Designation:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Software Engineer
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                UAN No.:
              </Typography>
              <Typography variant="body2">N/A</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Entries & Search Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>
            Show
          </Typography>
          <Select
            value={entriesPerPage}
            onChange={handleEntriesChange}
            size="small"
            sx={{ minWidth: 80 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>
            entries
          </Typography>
        </Box>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ maxWidth: 300 }}
        />
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>SALARY MONTH</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>NET PAYABLE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>PAY DATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} align="center">
                No records available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" disabled sx={{ mr: 1 }}>
          Previous
        </Button>
        <Button variant="contained" disabled>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default PayrollPageLM;