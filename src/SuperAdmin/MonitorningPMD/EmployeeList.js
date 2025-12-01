import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(
    JSON.parse(localStorage.getItem("isDrawerOpen")) ?? true
  );

  const navigate = useNavigate();

  // Retrieve the employees' data from localStorage
  const employeesUnder =
    JSON.parse(localStorage.getItem("employeesUnder")) || [];

  // Combine first and last name and map the employee data
  const employees = employeesUnder.map((employee) => ({
    id: employee.employee_id,
    name: `${employee.first_name} ${employee.last_name}`,
    email: employee.email,
  }));

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDrawer = () => {
    const newState = !isDrawerOpen;
    setDrawerOpen(newState);
    localStorage.setItem("isDrawerOpen", JSON.stringify(newState));
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("isDrawerOpen"));
    if (savedState !== null) {
      setDrawerOpen(savedState);
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Outlet />

        <Container maxWidth="lg" sx={{ mt: -2, mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "1.875rem" }, // Resp
              // ive typography
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            All Employees
          </Typography>

          {/* Search Box */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
            <TextField
              variant="outlined"
              label="Search Employee"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                width: "100%",
                maxWidth: 200,
              }}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
          </Box>

          {/* Responsive Table Layout */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee Id</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Complete Details</TableCell>
                      <TableCell>Report</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id} sx={{ height: "50px" }}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              textTransform: "none",
                              padding: "8px 16px",
                              marginRight: 2,
                              fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font size for button
                            }}
                            onClick={() =>
                              navigate(
                                `/daily-monitoring/${employee.id}/${employee.name}`,
                                {
                                  state: {
                                    id: employee.id,
                                    name: employee.name,
                                  },
                                }
                              )
                            }
                          >
                            View Details
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              textTransform: "none",
                              padding: "8px 16px",
                              marginRight: 2,
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            }}
                            onClick={() =>
                              navigate(`/view-report/${employee.id}`, {
                                state: { id: employee.id, name: employee.name },
                              })
                            }
                          >
                            View Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default EmployeeList;
