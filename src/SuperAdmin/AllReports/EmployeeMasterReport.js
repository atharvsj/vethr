import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, CircularProgress, Alert,
  TextField, Button, Container, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from 'xlsx';

// Helper function to format dates, handling nulls
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-GB");
};

// Main component
const EmployeeMasterDataReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const headerGroups = [
    { name: 'Basic Info', colspan: 5, subHeaders: ['Sr No.', 'Employee ID', 'Name', 'Contact Number (Personal)', 'Email Id (Personal)'] },
    { name: 'Personal Details', colspan: 7, subHeaders: ['Gender', 'Date of Birth', 'Age', 'Marital Status', 'Blood Group', 'Education', 'Degree'] },
    { name: 'Permanent Address', colspan: 7, subHeaders: ['Address', 'Country', 'State', 'District', 'Tehsil', 'Village', 'Pin code'] },
    { name: 'Work Details', colspan: 8, subHeaders: ['Department', 'Designation', 'Division', 'Sub-Division', 'Headquarter', 'Line Manager', 'D.O.J.', 'Status'] },
    { name: 'Bank Account Details', colspan: 6, subHeaders: ['Account Holder Name', 'Account Number', 'Bank Name', 'IFSC', 'Swift Code', 'Bank Branch'] },
    { name: 'Emergency Contact', colspan: 2, subHeaders: ['Emergency Contact Name', 'Emergency Contact Number'] },
    { name: 'Employment Lifecycle', colspan: 2, subHeaders: ['Exit Date', 'No. of Asset Allocated'] },
  ];
  const flatHeaders = headerGroups.flatMap(g => g.subHeaders);

  const handleFetchReport = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setReportData([]);
    try {
      const response = await axiosInstance.get("/api/employee_master_report/");
      setReportData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to fetch master data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      setPage(0);
    }
  };

  const handleExport = () => {
    if (filteredData.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee_Master_Report");
    XLSX.writeFile(workbook, "Employee_Master_Report.xlsx");
  };

  const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
  const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

  const filteredData = useMemo(() =>
    reportData.filter(row =>
      (row["Name"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row["Employee ID"]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row["Department"]?.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [reportData, searchTerm]
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  const purpleButtonStyle = {
    backgroundColor: '#673ab7', color: '#fff', height: 40,
    '&:hover': { backgroundColor: '#5e35b1' },
    '&.Mui-disabled': { backgroundColor: '#b39ddb', color: '#f5f5f5' }
  };

  const headerCellStyle = { fontWeight: 'bold', backgroundColor: '#e3f2fd', textAlign: 'center', border: '1px solid #ddd' };
  const cellStyle = { border: '1px solid #ddd' };

  return (
    <Container disableGutters>
      <Box p={2}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Employee Master Data Report =
        </Typography>

        {/* --- FIXED: Replaced layout with the consistent Grid system --- */}
        <Grid container spacing={2} mb={2} alignItems="center">
          {/* Rows Dropdown */}
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Rows</InputLabel>
              <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle} disabled={loading}>
              Generate Report
            </Button>
            <Button variant="contained" onClick={handleExport} sx={purpleButtonStyle} disabled={filteredData.length === 0}>
              Export Report
            </Button>
          </Grid>

          {/* Search Field */}
          <Grid item xs={12} sm={12} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>

        {/* --- TABLE & PAGINATION --- */}
        <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2, maxHeight: '70vh' }}>
          <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                {headerGroups.map((group) => (
                  <TableCell key={group.name} colSpan={group.colspan} sx={headerCellStyle}>
                    {group.name}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {flatHeaders.map((subHeader) => (
                  <TableCell key={subHeader} sx={{ ...headerCellStyle, top: 57 }}>{subHeader}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={flatHeaders.length} align="center"><CircularProgress /></TableCell></TableRow>
              ) : error ? (
                <TableRow><TableCell colSpan={flatHeaders.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
              ) : !hasSearched ? (
                <TableRow><TableCell colSpan={flatHeaders.length} align="center">Click "Generate Report" to view data.</TableCell></TableRow>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow key={row["Employee ID"] || index}>
                    {flatHeaders.map(header => {
                      let cellValue = row[header] ?? "N/A";
                      if (header === 'Sr No.') cellValue = page * rowsPerPage + index + 1;
                      if (header === 'Date of Birth' || header === 'D.O.J.' || header === 'Exit Date') cellValue = formatDate(cellValue);
                      if (header === 'Gender') cellValue = row[header] === "1" ? "Male" : (row[header] === "2" ? "Female" : "N/A");
                      return <TableCell key={header} sx={cellStyle}>{cellValue}</TableCell>;
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={flatHeaders.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredData.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
            <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
              Previous
            </Button>
            <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
            <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EmployeeMasterDataReport;