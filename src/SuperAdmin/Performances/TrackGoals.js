import React, { useState } from 'react';
import {
  Button,
  Box,
  Grid,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Drawer,
  Divider,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Doughnut } from 'react-chartjs-2';

// Chart.js setup
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  Title
} from 'chart.js';
ChartJS.register(ArcElement, ChartTooltip, Legend, Title);

export default function TrackGoals() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      goalType: 'Personal',
      subject: 'Learn React',
      startDate: '2024-01-01',
      endDate: '2024-06-01',
      goalRating: 4,
      progress: 75,
      addedBy: 'Admin',
      addedOn: '2024-01-01',
    },
    {
      id: 2,
      goalType: 'Professional',
      subject: 'Complete Project X',
      startDate: '2024-02-01',
      endDate: '2024-12-01',
      goalRating: 3,
      progress: 40,
      addedBy: 'Admin',
      addedOn: '2024-02-01',
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    goalType: '',
    subject: '',
    startDate: '',
    endDate: '',
    progress: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state
  const recordsPerPage = 8;

  // Doughnut Chart Data
  const getDoughnutChartData = (type) => {
    let filteredData;
    if (type === 'Active Goals') {
      filteredData = goals.filter(goal => goal.progress > 0 && goal.progress < 100);
    } else if (type === 'Overall Progress') {
      filteredData = goals;
    } else if (type === 'Aligned Goals') {
      filteredData = goals.filter(goal => goal.goalType === 'Professional');
    }

    const totalProgress = filteredData.reduce((acc, goal) => acc + goal.progress, 0);
    const totalGoals = filteredData.length;
    const avgProgress = totalGoals === 0 ? 0 : totalProgress / totalGoals;

    return {
      labels: ['Completed', 'In Progress', 'Not Started'],
      datasets: [
        {
          data: [
            avgProgress, 
            100 - avgProgress, 
            0 
          ],
          backgroundColor: filteredData[0]?.goalType === 'Professional'
            ? ['#2196f3', '#ff9800', '#f44336']
            : ['#4caf50', '#ff9800', '#f44336'],
          hoverOffset: 4,
          cutout: '70%',
          borderWidth: 8,
        }
      ],
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `${avgProgress.toFixed(2)}%`,
          font: {
            size: 20,
            weight: 'bold',
            color: '#333',
          },
          padding: {
            top: 20,
          },
        },
      },
    };
  };

  const getChartInfo = (type) => {
    let filteredData;
    if (type === 'Active Goals') {
      filteredData = goals.filter(goal => goal.progress > 0 && goal.progress < 100);
    } else if (type === 'Overall Progress') {
      filteredData = goals;
    } else if (type === 'Aligned Goals') {
      filteredData = goals.filter(goal => goal.goalType === 'Professional');
    }

    const totalGoals = filteredData.length;
    const totalProgress = filteredData.reduce((acc, goal) => acc + goal.progress, 0);
    const avgProgress = totalGoals === 0 ? 0 : totalProgress / totalGoals;

    return {
      totalGoals,
      avgProgress
    };
  };

  // CRUD Operations
  const handleUpdateGoal = (id) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, progress: goal.progress + 10 } : goal
    );
    setGoals(updatedGoals);
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
  };

  const handleMoveGoalUp = (id) => {
    const goalIndex = goals.findIndex(goal => goal.id === id);
    if (goalIndex > 0) {
      const updatedGoals = [...goals];
      const [movedGoal] = updatedGoals.splice(goalIndex, 1);
      updatedGoals.splice(goalIndex - 1, 0, movedGoal);
      setGoals(updatedGoals);
    }
  };

  const handleMoveGoalDown = (id) => {
    const goalIndex = goals.findIndex(goal => goal.id === id);
    if (goalIndex < goals.length - 1) {
      const updatedGoals = [...goals];
      const [movedGoal] = updatedGoals.splice(goalIndex, 1);
      updatedGoals.splice(goalIndex + 1, 0, movedGoal);
      setGoals(updatedGoals);
    }
  };

  // Add New Goal
  const handleAddGoal = () => {
    const newGoalData = { ...newGoal, id: goals.length + 1, addedOn: new Date().toISOString() };
    setGoals([...goals, newGoalData]);
    setNewGoal({ goalType: '', subject: '', startDate: '', endDate: '', progress: 0 });
    setDrawerOpen(false); // Close the drawer after adding the goal
  };

  // Search functionality
  const filteredGoals = goals.filter(goal =>
    goal.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.goalType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', backgroundColor: '#f0f0f0' }}>
      {/* Top bar with Add Goal and Search */}
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>Add New Goal</Button>
        <TextField
          label="Search Goals"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Main Content with Table and Charts */}
      <Box sx={{ flex: 1, padding: 2, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {['Active Goals', 'Overall Progress', 'Aligned Goals'].map((type) => {
            const { totalGoals, avgProgress } = getChartInfo(type);
            return (
              <Grid item xs={12} sm={4} key={type}>
                <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Doughnut data={getDoughnutChartData(type)} options={{ responsive: true, maintainAspectRatio: true }} />
                  <Typography variant="body2" align="center">{type}</Typography>
                  <Typography variant="h6" align="center">{avgProgress.toFixed(2)}%</Typography>
                  <Typography variant="caption" align="center">{totalGoals} Goals</Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Goals Table */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Goal Type</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGoals.slice(0, recordsPerPage).map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.goalType}</TableCell>
                  <TableCell>{goal.subject}</TableCell>
                  <TableCell>{goal.startDate}</TableCell>
                  <TableCell>{goal.endDate}</TableCell>
                  <TableCell>
                    <LinearProgress variant="determinate" value={goal.progress} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleMoveGoalUp(goal.id)}>
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton onClick={() => handleMoveGoalDown(goal.id)}>
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton onClick={() => handleUpdateGoal(goal.id)}>
                      <UpdateIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteGoal(goal.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Goal Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: 400 }}
      >
        <Box sx={{ padding: 2, width: 400 }}>
          <Typography variant="h6" gutterBottom>Add New Goal</Typography>
          <Divider />
          <TextField
            label="Goal Type"
            fullWidth
            margin="normal"
            value={newGoal.goalType}
            onChange={(e) => setNewGoal({ ...newGoal, goalType: e.target.value })}
          />
          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            value={newGoal.subject}
            onChange={(e) => setNewGoal({ ...newGoal, subject: e.target.value })}
          />
          <TextField
            label="Start Date"
            fullWidth
            margin="normal"
            type="date"
            value={newGoal.startDate}
            onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            fullWidth
            margin="normal"
            type="date"
            value={newGoal.endDate}
            onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Progress"
            fullWidth
            margin="normal"
            type="number"
            value={newGoal.progress}
            onChange={(e) => setNewGoal({ ...newGoal, progress: parseInt(e.target.value) })}
          />
          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddGoal}>Add Goal</Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
