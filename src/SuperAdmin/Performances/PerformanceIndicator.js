import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Pagination,
  Divider,
  Slider,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';  // Import Bar chart from Chart.js
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Chart.js setup
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PerformanceIndicator() {
  const [performanceIndicators, setPerformanceIndicators] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      designation: 'Software Engineer',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      projectRatings: [4.5, 4.2, 4.8],
      addedBy: 'Admin',
      addedOn: '2024-11-25',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      designation: 'Product Manager',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
      projectRatings: [4.0, 4.3, 4.5],
      addedBy: 'Admin',
      addedOn: '2024-11-22',
    },
    // More employees here...
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showKPI, setShowKPI] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    profilePicture: '',
    projectRatings: [0, 0, 0],
  });

  const recordsPerPage = 8;

  const filteredPerformanceIndicators = performanceIndicators.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentRecords = filteredPerformanceIndicators.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };

  const handleOpenKPI = (employee) => {
    setSelectedEmployee(employee);
    setShowKPI(true);
  };

  const handleCloseKPI = () => {
    setShowKPI(false);
    setSelectedEmployee(null);
  };

  const generateChartData = (ratings) => {
    return {
      labels: ['Project 1', 'Project 2', 'Project 3'],
      datasets: [
        {
          label: 'Ratings',
          data: ratings,
          backgroundColor: ['rgba(75,192,192,0.8)', 'rgba(255,159,64,0.8)', 'rgba(153,102,255,0.8)'],
          borderColor: ['rgba(75,192,192,1)', 'rgba(255,159,64,1)', 'rgba(153,102,255,1)'],
          borderWidth: 1,
        },
      ],
    };
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewKPI = () => {
    // If we are editing, update the existing employee
    if (newEmployee.id) {
      setPerformanceIndicators((prev) =>
        prev.map((employee) =>
          employee.id === newEmployee.id ? { ...employee, ...newEmployee } : employee
        )
      );
    } else {
      // Add a new employee if no id is present
      const newId = performanceIndicators.length + 1;
      const newEmployeeData = {
        ...newEmployee,
        id: newId,
        addedBy: 'Admin',
        addedOn: new Date().toISOString().split('T')[0],
      };
      setPerformanceIndicators([...performanceIndicators, newEmployeeData]);
    }

    // Reset form state
    setShowForm(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      designation: '',
      profilePicture: '',
      projectRatings: [0, 0, 0],
    });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      designation: '',
      profilePicture: '',
      projectRatings: [0, 0, 0],
    });
  };

  const handleUpdateEmployee = (employee) => {
    setNewEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    setPerformanceIndicators(performanceIndicators.filter((emp) => emp.id !== employeeId));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh' }}>
      {/* Left Side: Performance Indicator List */}
      <Box
        sx={{
          width: { xs: '100%', md: showKPI || showForm ? '50%' : '100%' },
          padding: 2,
          transition: 'width 0.3s ease-in-out',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          {/* Add New KPI Button */}
          {!showForm && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ fontSize: '1rem', padding: '10px 20px' }}
            >
              Add New KPI
            </Button>
          )}
          {/* Search Bar */}
          <TextField
            label="Search by Name or Designation"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', sm: '40%' } }}
          />
        </Box>

        <Grid container spacing={3}>
          {currentRecords.map((employee) => (
            <Grid item xs={12} sm={6} md={4} key={employee.id}>
              <Card sx={{ maxWidth: 270, boxShadow: 3, margin: 'auto', height: '250px', width: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={employee.profilePicture}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  sx={{
                    borderRadius: '50%',
                    width: 90,
                    height: 90,
                    objectFit: 'cover',
                    margin: '16px auto',
                  }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6">{`${employee.firstName} ${employee.lastName}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {employee.designation}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Avg Rating: {calculateAverageRating(employee.projectRatings).toFixed(1)} ⭐
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleOpenKPI(employee)}
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleUpdateEmployee(employee)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={Math.ceil(filteredPerformanceIndicators.length / recordsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>

      {/* Right Side: KPI Details */}
      {showKPI && selectedEmployee && (
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: 2,
            backgroundColor: '#f5f5f5',
            boxShadow: 3,
            overflowY: 'auto',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <Typography variant="h5">{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</Typography>
            <Button variant="outlined" onClick={handleCloseKPI}>
              Close
            </Button>
          </Box>
          <Typography variant="h6">{selectedEmployee.designation}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
            Added By: {selectedEmployee.addedBy}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Added On: {selectedEmployee.addedOn}
          </Typography>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          <Typography variant="h6">Project Ratings</Typography>
          <Bar data={generateChartData(selectedEmployee.projectRatings)} options={{ responsive: true }} />
        </Box>
      )}

      {/* Add New KPI Form */}
      {showForm && (
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: 3,
            backgroundColor: '#f5f5f5',
            boxShadow: 3,
            overflowY: 'auto',
            transition: 'width 0.3s ease-in-out',
          }}
        >
          <Typography variant="h5">{newEmployee.id ? 'Edit KPI' : 'Add New KPI'}</Typography>

          <TextField
            label="First Name"
            name="firstName"
            value={newEmployee.firstName}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={newEmployee.lastName}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Designation"
            name="designation"
            value={newEmployee.designation}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Profile Picture URL"
            name="profilePicture"
            value={newEmployee.profilePicture}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Project Ratings
          </Typography>
          <Slider
            value={newEmployee.projectRatings[0]}
            onChange={(e, newValue) => handleFormChange({ target: { name: 'projectRatings', value: [newValue, ...newEmployee.projectRatings.slice(1)] } })}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            sx={{ marginTop: 1 }}
          />
          <Slider
            value={newEmployee.projectRatings[1]}
            onChange={(e, newValue) => handleFormChange({ target: { name: 'projectRatings', value: [newEmployee.projectRatings[0], newValue, ...newEmployee.projectRatings.slice(2)] } })}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            sx={{ marginTop: 1 }}
          />
          <Slider
            value={newEmployee.projectRatings[2]}
            onChange={(e, newValue) => handleFormChange({ target: { name: 'projectRatings', value: [...newEmployee.projectRatings.slice(0, 2), newValue] } })}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            sx={{ marginTop: 1 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleAddNewKPI}>
              {newEmployee.id ? 'Update' : 'Add'}
            </Button>
            <Button variant="outlined" onClick={handleCancelForm}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
