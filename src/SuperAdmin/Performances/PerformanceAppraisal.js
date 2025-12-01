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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Chart.js setup
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PerformanceAppraisal() {
  const [performanceAppraisals, setPerformanceAppraisals] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      designation: 'Software Engineer',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      appraisalRatings: [4.5, 4.2, 4.8],
      addedBy: 'Admin',
      addedOn: '2024-11-25',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      designation: 'Product Manager',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
      appraisalRatings: [4.0, 4.3, 4.5],
      addedBy: 'Admin',
      addedOn: '2024-11-22',
    },
    // More employees here...
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAppraisal, setShowAppraisal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    profilePicture: '',
    appraisalRatings: [0, 0, 0],
  });

  const recordsPerPage = 8;

  const filteredAppraisals = performanceAppraisals.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentRecords = filteredAppraisals.slice(
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

  const handleOpenAppraisal = (employee) => {
    setSelectedEmployee(employee);
    setShowAppraisal(true);
  };

  const handleCloseAppraisal = () => {
    setShowAppraisal(false);
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

  const handleAddNewAppraisal = () => {
    const newId = performanceAppraisals.length + 1;
    const newEmployeeData = {
      ...newEmployee,
      id: newId,
      addedBy: 'Admin',
      addedOn: new Date().toISOString().split('T')[0],
    };
    setPerformanceAppraisals([...performanceAppraisals, newEmployeeData]);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      designation: '',
      profilePicture: '',
      appraisalRatings: [0, 0, 0],
    });
  };

  const handleUpdateEmployee = (employee) => {
    setNewEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    setPerformanceAppraisals(performanceAppraisals.filter((emp) => emp.id !== employeeId));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh', overflow: 'hidden' }}>
      {/* Left Side: Performance Appraisal List */}
      <Box
        sx={{
          width: { xs: '100%', md: showAppraisal || showForm ? '50%' : '100%' },
          padding: 2,
          transition: 'width 0.3s ease-in-out',
          overflowY: 'auto', // Allow scroll within this section if needed
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Add New Appraisal Button */}
          {!showForm && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ fontSize: '1rem', padding: '10px 20px' }}
            >
              Add New Appraisal
            </Button>
          )}
          {/* Search Bar */}
          <TextField
            label="Search by Name or Designation"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: { xs: '100%', sm: '40%' },
              marginTop: { xs: '1rem', sm: 0 },
            }}
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
                    Avg Rating: {calculateAverageRating(employee.appraisalRatings).toFixed(1)} ⭐
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleOpenAppraisal(employee)}
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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Pagination
            count={Math.ceil(filteredAppraisals.length / recordsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>

      {/* Right Side: Appraisal Details */}
      {showAppraisal && (
        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: 2, backgroundColor: '#f4f4f4', overflowY: 'auto' }}>
          <Typography variant="h4">{`${selectedEmployee?.firstName} ${selectedEmployee?.lastName} - Appraisal Details`}</Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="h6">Designation: {selectedEmployee?.designation}</Typography>
          <Typography variant="body1" paragraph>
            Added By: {selectedEmployee?.addedBy} on {selectedEmployee?.addedOn}
          </Typography>

          <Bar
            data={generateChartData(selectedEmployee?.appraisalRatings)}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Appraisal Ratings',
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
              },
              scales: {
                x: {
                  ticks: { display: true },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                    min: 0,
                    max: 5,
                  },
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={handleCloseAppraisal}
          >
            Close
          </Button>
        </Box>
      )}

      {/* Form to Add New Employee */}
      {showForm && (
        <Box sx={{ width: { xs: '100%', md: '50%' }, padding: 2, backgroundColor: '#fff', overflowY: 'auto' }}>
          <Typography variant="h4">Add New Employee</Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <TextField
            label="First Name"
            variant="outlined"
            name="firstName"
            value={newEmployee.firstName}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={newEmployee.lastName}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Designation"
            variant="outlined"
            name="designation"
            value={newEmployee.designation}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Profile Picture URL"
            variant="outlined"
            name="profilePicture"
            value={newEmployee.profilePicture}
            onChange={handleFormChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Slider
            value={newEmployee.appraisalRatings[0]}
            onChange={(e, newValue) =>
              setNewEmployee((prev) => ({
                ...prev,
                appraisalRatings: [newValue, prev.appraisalRatings[1], prev.appraisalRatings[2]],
              }))
            }
            min={0}
            max={5}
            step={0.1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toFixed(1)}⭐`}
            sx={{ marginBottom: 2 }}
          />

          {/* Buttons for Submit or Cancel */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleAddNewAppraisal}>
              Add Employee
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancelForm}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
