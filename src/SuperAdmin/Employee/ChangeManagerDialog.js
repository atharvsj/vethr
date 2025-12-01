// src/components/Employees/ChangeManagerDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { Close as CloseIcon } from "@mui/icons-material";
import Swal from 'sweetalert2';
import axiosInstance from "../../utils/axiosInstance";

const ChangeManagerDialog = ({ open, onClose, employees, onManagerChanged }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newManager, setNewManager] = useState('');

  const handleSave = async () => {
    if (!selectedEmployee || !newManager) {
      Swal.fire('Incomplete', 'Please select both an employee and a new manager.', 'warning');
      return;
    }
    try {
      await axiosInstance.put("api/change_manager/", { user_id: selectedEmployee, manager_id: newManager });
      Swal.fire('Success', 'Manager changed successfully!', 'success');
      onManagerChanged(); // This will trigger a refetch in the parent
      onClose();
    } catch (error) {
      console.error("Error changing manager:", error);
      Swal.fire('Error', 'Failed to change manager.', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Change Manager
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Employee</InputLabel>
              <Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} label="Select Employee">
                {employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select New Manager</InputLabel>
              <Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">
                {employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeManagerDialog;