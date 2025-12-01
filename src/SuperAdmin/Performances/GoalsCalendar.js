import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Grid,
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up localizer for react-big-calendar
const localizer = momentLocalizer(require('moment'));

const GoalsCalendar = () => {
  const [goals, setGoals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({ goalTitle: '', status: '', dueDate: '' });
  const [selectedGoal, setSelectedGoal] = useState(null); // To store selected goal for the popup

  useEffect(() => {
    const fetchGoals = () => {
      // Sample data for goals
      const data = [
        { id: 1, goalTitle: 'Complete React Course', status: 'Not-Started', dueDate: new Date('2024-11-10') },
        { id: 2, goalTitle: 'Write Documentation', status: 'In-Progress', dueDate: new Date('2024-11-12') },
        { id: 3, goalTitle: 'Deploy Web App', status: 'Completed', dueDate: new Date('2024-11-13') },
      ];
      setGoals(data);
    };

    fetchGoals();
  }, []);

  const handleOpenDialog = () => {
    setNewGoal({ goalTitle: '', status: '', dueDate: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleStatusChange = (e) => {
    setNewGoal({ ...newGoal, status: e.target.value });
  };

  const handleSaveGoal = () => {
    const newGoalData = { ...newGoal, id: goals.length + 1, dueDate: new Date(newGoal.dueDate) };
    setGoals((prev) => [...prev, newGoalData]);
    setOpenDialog(false);
  };

  const handleGoalClick = (event) => {
    // Set selected goal for popup when a goal is clicked
    setSelectedGoal(event);
  };

  const handleCloseGoalPopup = () => {
    setSelectedGoal(null); // Close goal info popup
  };

  // Format events to be compatible with react-big-calendar
  const events = goals.map((goal) => ({
    title: `${goal.goalTitle} - ${goal.status}`,
    start: goal.dueDate,
    end: goal.dueDate,
    status: goal.status,
    goalTitle: goal.goalTitle,
    id: goal.id,
  }));

  // Get status color based on goal status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';  // Green for Completed
      case 'In-Progress':
        return '#1976d2';  // Blue for In Progress
      case 'Not-Started':
        return '#bdbdbd';  // Light Gray for Not-Started
      default:
        return '#757575';  // Default Gray color
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom align="center">
        Goals Calendar
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Button to open the dialog */}
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Create New Goal
          </Button>
        </Grid>

        {/* Calendar Section */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: '500px',
                width: '100%',
                marginBottom: 20,
              }}
              onSelectEvent={handleGoalClick} // Open goal info on click
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: getStatusColor(event.status),
                  color: 'white',
                  borderRadius: '5px',
                },
              })}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog for Creating New Goal */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Title"
            type="text"
            fullWidth
            name="goalTitle"
            value={newGoal.goalTitle}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          
          {/* Radio Buttons for Status */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <RadioGroup
              name="status"
              value={newGoal.status}
              onChange={handleStatusChange}
              row
            >
              <FormControlLabel value="Not-Started" control={<Radio />} label="Not Started" />
              <FormControlLabel value="In-Progress" control={<Radio />} label="In Progress" />
              <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
            </RadioGroup>
          </FormControl>

          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            name="dueDate"
            value={newGoal.dueDate}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveGoal} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Popup for Goal Info */}
      {selectedGoal && (
        <Dialog open={true} onClose={handleCloseGoalPopup}>
          <DialogTitle>{selectedGoal.goalTitle}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Status: <Chip label={selectedGoal.status} color={getStatusColor(selectedGoal.status)} />
            </Typography>
            <Typography variant="body1">Due Date: {selectedGoal.start.toDateString()}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseGoalPopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default GoalsCalendar;
 