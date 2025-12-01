import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';

const statusMap = {
  "0": "Not Started",
  "1": "In Progress",
  "2": "Completed",
  "3": "On Hold"
};

export default function TasksViewHead() {
  const [entries, setEntries] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('https://tdtlworld.com/hrms-backend/api/tasks/');
        console.log("API response:", res.data);
  
        if (Array.isArray(res.data.tasks)) {
          setTasks(res.data.tasks); // ✅ fix: access .tasks
        } else {
          console.error("Invalid data format from API:", res.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);
  
  
  
  const taskStats = [
    { title: "TOTAL COMPLETED", count: tasks.filter(task => task.task_status === "2").length, color: "success.main" },
    { title: "TOTAL IN PROGRESS", count: tasks.filter(task => task.task_status === "1").length, color: "primary.main" },
    { title: "TOTAL NOT STARTED", count: tasks.filter(task => task.task_status === "0").length, color: "warning.main" },
    { title: "TOTAL ON HOLD", count: tasks.filter(task => task.task_status === "3").length, color: "error.main" },
  ];

  const filteredTasks = tasks.filter(task =>
    !searchTerm || task.task_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Tasks</Typography>
      
      <Grid container spacing={2}>
        {taskStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="h4" color={stat.color}>{stat.count}</Typography>
                <Box sx={{ ml: 1, color: 'text.secondary' }}>
                  <AssignmentIcon />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>List of all Tasks</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="entries-select-label">Show entries</InputLabel>
            <Select
              labelId="entries-select-label"
              id="entries-select"
              value={entries}
              label="Show entries"
              onChange={(e) => setEntries(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TITLE</TableCell>
                <TableCell>ASSIGNED TO</TableCell>
                <TableCell>START DATE</TableCell>
                <TableCell>END DATE</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>PROGRESS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredTasks.length > 0 ? (
    filteredTasks.slice(0, Number(entries)).map(task => (
      <TableRow key={task.task_id}>
        <TableCell>{task.task_name}</TableCell>
        <TableCell>{task.assigned_to}</TableCell>
        <TableCell>{task.start_date}</TableCell>
        <TableCell>{task.end_date}</TableCell>
        <TableCell>{statusMap[Number(task.task_status)] || 'Unknown'}</TableCell>
        <TableCell>{task.task_progress}%</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">No records available</TableCell>
    </TableRow>
  )}
</TableBody>

          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
          <Button variant="outlined">Next</Button>
        </Box>
      </Paper>
    </Box>
  );
}
