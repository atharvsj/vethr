import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import * as XLSX from "xlsx";

export default function Monitoring() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [employees] = useState([
    {
      id: 101,
      name: "Alice Johnson",
      department: "Development",
      designation: "Software Engineer",
      manager: "John Smith",
      project: "Project A",
    },
    {
      id: 102,
      name: "Bob Williams",
      department: "Marketing",
      designation: "Marketing Specialist",
      manager: "Jane Doe",
      project: "Project B",
    },
    // Add more sample data as needed
  ]);

  const handleExportEmployees = () => {
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "EmployeeMonitoringData.xlsx");
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = Object.values(employee)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDepartment =
      department === "all" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Employee Monitoring</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExportEmployees}
            sx={{ mr: 2 }}
          >
            Export Data
          </Button>
        </Box>
      </Box>

      <TextField
        label="Search Employees"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: "50%" }}
      />

      <FormControl sx={{ mb: 2, width: "50%" }}>
        <InputLabel>Department</InputLabel>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          label="Department"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Development">Development</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          {/* Add more departments as needed */}
        </Select>
      </FormControl>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Project</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar>{employee.name[0]}</Avatar>
                      <Typography variant="body2">{employee.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.manager}</TableCell>
                  <TableCell>{employee.project}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ mx: 2, alignSelf: "center" }}>
          Page {currentPage}
        </Typography>
        <Button
          variant="contained"
          disabled={currentPage * rowsPerPage >= filteredEmployees.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
