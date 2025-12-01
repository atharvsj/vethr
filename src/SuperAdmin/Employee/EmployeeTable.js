// src/components/Employees/EmployeeTable.js
import React, { useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, FormControl, InputLabel, Select,
  MenuItem, Avatar, Chip, IconButton, Tooltip, Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

const getInitials = (name = "") => {
  const nameParts = name.split(' ').filter(Boolean);
  if (nameParts.length === 0) return '';
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
};

const EmployeeTable = ({ employees, onEdit, onDelete, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const filteredEmployees = employees.filter((e) =>
    Object.values(e).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Rows</InputLabel>
          <Select value={rowsPerPage} label="Rows" onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setCurrentPage(1); }}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>EMPLOYEE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DEPARTMENT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DESIGNATION</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>JOIN DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>MANAGER</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEmployees.map((employee, index) => (
              <TableRow key={employee.user_id} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
                <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar alt={employee.employee_name} src={employee.profile_photo}>{getInitials(employee.employee_name)}</Avatar>
                    <Typography variant="body2">{employee.employee_name}</Typography>
                    {hoveredRowId === employee.user_id && (
                      <IconButton color="primary" onClick={() => onNavigate(employee.user_id)} size="small">
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{employee.department_name || 'N/A'}</TableCell>
                <TableCell>{employee.designation_name || 'N/A'}</TableCell>
                <TableCell>{employee.join_date}</TableCell>
                <TableCell>
                  <Chip label={employee.status === 1 ? "Active" : "Inactive"} color={employee.status === 1 ? "success" : "error"} size="small" />
                </TableCell>
                <TableCell>{employee.manager}</TableCell>
                <TableCell>
                  <Tooltip title="Edit"><IconButton onClick={() => onEdit(employee)} color="primary"><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => onDelete(employee.user_id)} color="error"><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Typography>Showing {filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0} - {Math.min(indexOfLastEmployee, filteredEmployees.length)} of {filteredEmployees.length}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
            <Typography sx={{ mx: 2 }}>Page {currentPage}</Typography>
            <Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EmployeeTable;