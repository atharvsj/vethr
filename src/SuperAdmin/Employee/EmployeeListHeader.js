// src/components/Employees/EmployeeListHeader.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon, Download as DownloadIcon, SupervisorAccount as ChangeManagerIcon } from "@mui/icons-material";

const EmployeeListHeader = ({ onAdd, onChangeManager, onExport }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
      <Typography variant="h4">Employees</Typography>
      <Box>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={onExport} sx={{ mr: 2 }}>
          Export
        </Button>
        <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={onChangeManager} sx={{ mr: 2 }}>
          Change Manager
        </Button>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
          Add Employee
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeListHeader;