"use client"
import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, CircularProgress
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

// Helper to format dates from various formats to 'YYYY-MM-DD' for input fields
const formatDateForInput = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return '';
  // Handles 'DD-MM-YYYY'
  const parts = dateString.split('-');
  if (parts.length === 3 && parts[2].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  // Handles 'YYYY-MM-DDTHH:mm:ss' from API
  if (dateString.includes('T')) {
    return dateString.split('T')[0];
  }
  return dateString;
};

// The component now accepts an 'onBack' prop
const ContractTopBar = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");

  const [contractData, setContractData] = useState({
    joining_date: "",
    department_id: "",
    designation_id: "",
    gross_salary: "",
    office_shift_id: "",
    probation: "",
    // Store these in the background for the PATCH request
    probation_end_date: "",
    manager: null,
    role_description: ""
  });

  // State for the dynamic dropdowns
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [officeShifts, setOfficeShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial data fetch for contract, departments, and shifts
  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }

    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [contractRes, deptRes, shiftRes] = await Promise.all([
          axiosInstance.post('api/contract_details/', { user_id: employeeId, type: 1 }),
          axiosInstance.get('api/desig_dept_dropdown/'),
          axiosInstance.get('api/office_shift_dropdown/')
        ]);

        if (contractRes.data.contract_details?.length > 0) {
          const details = contractRes.data.contract_details[0];
          setContractData(prev => ({
            ...prev,
            ...details,
            // Map incoming API fields to our new state fields
            joining_date: formatDateForInput(details.contract_date),
            gross_salary: details.basic_salary,
            probation_end_date: formatDateForInput(details.probation_end_date),
          }));
        }
        
        if (deptRes.data.status === 'success') setDepartments(deptRes.data.dept_data);
        if (shiftRes.data.status === 'success') setOfficeShifts(shiftRes.data.office_shift_data);

      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [employeeId]);
  
  // Effect to fetch designations when department changes
  useEffect(() => {
      const fetchDesignations = async () => {
        if (!contractData.department_id) {
            setDesignations([]);
            return;
        };
        try {
            const response = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${contractData.department_id}`);
            if(response.data.status === 'success') {
                setDesignations(response.data.desig_data);
            }
        } catch (error) {
            console.error("Failed to fetch designations:", error);
            setDesignations([]);
        }
      }
      fetchDesignations();
  }, [contractData.department_id])


  const handleDepartmentChange = (e) => {
    setContractData(prev => ({
        ...prev,
        department_id: e.target.value,
        designation_id: ""
    }));
  };

  const handleChange = (e) => {
    setContractData({ ...contractData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!employeeId) return alert("No user specified.");

    const patchPayload = {
      user_id: Number(employeeId),
      company_id: 2,
      type: 1,
      department_id: Number(contractData.department_id),
      designation_id: Number(contractData.designation_id),
      // Map state fields back to the API's expected field names
      basic_salary: Number(contractData.gross_salary), 
      contract_date: contractData.joining_date,
      office_shift_id: Number(contractData.office_shift_id),
      probation: contractData.probation === 'Y' ? 1 : 0,
      probation_end_date: contractData.probation_end_date,
      manager: contractData.manager,
      role_description: contractData.role_description,
    };

    try {
      const response = await axiosInstance.patch('api/contract_details/', patchPayload);
      if (response.data.status === 'success') {
        alert('Contract saved successfully!');
      } else {
        alert(`Failed to save contract: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving contract:", error);
      alert("An error occurred while saving the contract.");
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Set Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField name="joining_date" label="Joining Date" type="date" value={contractData.joining_date || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select name="department_id" label="Department" value={contractData.department_id || ''} onChange={handleDepartmentChange}>
                {departments.map(dept => (
                    <MenuItem key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</MenuItem>
                ))}
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
           <FormControl fullWidth disabled={!contractData.department_id}>
              <InputLabel>Designation</InputLabel>
              <Select name="designation_id" label="Designation" value={contractData.designation_id || ''} onChange={handleChange}>
                  {designations.map(desig => (
                      <MenuItem key={desig.desig_id} value={desig.desig_id}>{desig.desig_name}</MenuItem>
                  ))}
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="gross_salary" label="Gross Salary" type="number" value={contractData.gross_salary || ''} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Office Shift</InputLabel>
            <Select name="office_shift_id" label="Office Shift" value={contractData.office_shift_id || ''} onChange={handleChange}>
               {officeShifts.map(shift => (
                <MenuItem key={shift.office_shift_id} value={shift.office_shift_id}>
                  {shift.office_shift_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Probation</InputLabel>
            <Select name="probation" label="Probation" value={contractData.probation || ''} onChange={handleChange}>
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* Container for the buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Contract
        </Button>
      </Box>
    </Box>
  );
};

export default ContractTopBar;