// src/components/Employees/EmployeeFormDialog.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton,
  Avatar, CircularProgress, InputAdornment, Autocomplete
} from '@mui/material';
import { Close as CloseIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
import Swal from 'sweetalert2';

// NOTE: This component receives all necessary dropdown data as props
const EmployeeFormDialog = ({ open, onClose, isEditMode, employeeData, onSaveSuccess, sharedData }) => {
  const { departments, allEmployeesForDropdown, officeShifts, divisions, roles, talentPool, countries } = sharedData;
  const employeeDialogRef = useRef(null);

  const [currentEmployee, setCurrentEmployee] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // State for dynamic dropdowns within the form
  const [designations, setDesignations] = useState([]);
  const [states, setStates] = useState([]);
  const [employeeHubs, setEmployeeHubs] = useState([]);

  // Effect to populate form when in edit mode or for a new employee
  useEffect(() => {
    const initializeForm = async () => {
        if (open) {
            if (isEditMode && employeeData) {
                // Pre-fetch dependent dropdowns for edit mode
                if (employeeData.country_id) {
                    const country = countries.find(c => c.country_id === employeeData.country_id);
                    if (country) {
                        const statesRes = await axiosInstance.get(`api/states/?country_name=${country.country_name}`);
                        setStates(statesRes.data.data || []);
                    }
                }
                 if (employeeData.state_id) {
                    const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${employeeData.state_id}/`);
                    setEmployeeHubs(hubsRes.data.data || []);
                }
                 if (employeeData.department_id) {
                    const desigRes = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${employeeData.department_id}/`);
                    setDesignations(desigRes.data.desig_data || []);
                }
                setCurrentEmployee({ ...employeeData });
            } else {
                // Logic for adding a new employee
                const response = await axiosInstance.get("api/get_max_employee_id/");
                const maxEmpId = response.data.employee_id[0];
                const numericPart = parseInt(maxEmpId.substring(1), 10);
                const nextEmpId = "V" + (numericPart + 1);
                setCurrentEmployee({
                    emp_id: nextEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
                    avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: nextEmpId,
                    password: "", role: "", grossSalary: "", department_id: "", designation_id: "",
                    manager_id: "", country_id: "", state_id: "", employee_hub_id: "", division_id: "",
                    is_probation: "n",
                });
            }
        }
    };
    initializeForm();
  }, [open, isEditMode, employeeData, countries]); // Re-run if these change

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };
  
  // All cascading dropdown handlers are now neatly inside this component
  const handleCountryChange = async (event) => { /* ... same as before ... */ };
  const handleStateChange = async (event) => { /* ... same as before ... */ };
  const handleDeptChange = async (event) => { /* ... same as before ... */ };

  const handleSave = async () => {
    setIsSaving(true);
    // ... all save logic from the original component
    setIsSaving(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth ref={employeeDialogRef}>
      <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}<IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* All the Grid items for the form go here, just like in your original code */}
          <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ''} onChange={handleInputChange} /></Grid>
          {/* ... etc ... */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;