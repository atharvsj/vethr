import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';

const YtdEmployeeSalaryReport = () => {
  const [employee, setEmployee] = useState('');
  const [year, setYear] = useState('');

  const employees = ['John Doe', 'Jane Smith', 'Michael Brown'];
  const years = ['2023', '2024', '2025'];

  const tableData = [
    { item: 'Earnings', values: Array(12).fill('') },
    { item: 'Arrears', values: Array(12).fill(0) },
    { item: 'Basic', values: Array(12).fill(0) },
    { item: 'Conveyance Allowance', values: Array(12).fill(0) },
    { item: 'DA', values: Array(12).fill(0) },
    { item: 'HRA', values: Array(12).fill(0) },
    { item: 'Medical', values: Array(12).fill(0) },
    { item: 'Washing', values: Array(12).fill(0) },
    { item: 'Total Earnings', values: Array(12).fill(0) },

    { item: 'Deduction', values: Array(12).fill('') },
    { item: 'Advance', values: Array(12).fill(0) },
    { item: 'ESIC', values: Array(12).fill(0) },
    { item: 'Loans', values: Array(12).fill(0) },
    { item: 'MLWF', values: Array(12).fill(0) },
    { item: 'Other Deduction', values: Array(12).fill(0) },
    { item: 'PF', values: Array(12).fill(0) },
    { item: 'PT', values: Array(12).fill(0) },
    { item: 'TDS', values: Array(12).fill(0) },
    { item: 'Total Deduction', values: Array(12).fill(0) },

    { item: 'Annual Earnings', values: Array(12).fill('') },
    { item: 'Total Annual Earnings', values: Array(12).fill(0) },

    { item: 'Half Yearly',values: Array(12).fill('') },
    { item: 'Total Half Yearly Earnings', values: Array(12).fill(0) },

    { item: 'Quarterly Earnings', values: Array(12).fill('') },
    { item: 'Total Quarterly Earnings', values: Array(12).fill(0) },
    { item: 'Total Net Pay', values: Array(12).fill(0) },
  ];

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <Container maxWidth="lg">
      <Box p={3} component={Paper} elevation={2} mt={4}>
        <Typography variant="h6" mb={3}>
          YTD Employee Salary Report
        </Typography>

        {/* Form */}
        <Box display="flex" gap={2} mb={3} alignItems="center">
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Select Employee</InputLabel>
            <Select
              value={employee}
              label="Select Employee"
              onChange={(e) => setEmployee(e.target.value)}
            >
              {employees.map((emp, idx) => (
                <MenuItem key={idx} value={emp}>
                  {emp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 150 }}>
            <InputLabel>Select Year</InputLabel>
            <Select
              value={year}
              label="Select Year"
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((yr, idx) => (
                <MenuItem key={idx} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: 80, height: 40 }}
          >
            Submit
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">SR. NO.</TableCell>
                <TableCell>ITEM</TableCell>
                {months.map((month, idx) => (
                  <TableCell key={idx} align="center">{month}</TableCell>
                ))}
                <TableCell align="center">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center">
                    {!row.isHeading ? idx + 1 : ''}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: row.isHeading ? 'bold' : 'normal',
                      textTransform: row.isHeading ? 'uppercase' : 'none',
                    }}
                  >
                    {row.item}
                  </TableCell>
                  {row.values ? (
                    row.values.map((val, valIdx) => (
                      <TableCell key={valIdx} align="center">{val}</TableCell>
                    ))
                  ) : (
                    months.map((_, idx) => (
                      <TableCell key={idx} align="center"></TableCell>
                    ))
                  )}
                  <TableCell align="center">
                    {row.values ? row.values.reduce((acc, curr) => acc + (Number(curr) || 0), 0) : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default YtdEmployeeSalaryReport;
